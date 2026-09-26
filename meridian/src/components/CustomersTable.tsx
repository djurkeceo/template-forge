import { useMemo, useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, MoreHorizontal, Search, SearchX } from 'lucide-react';
import type { Customer, Status } from '../data/mock';
import { formatUSD } from '../data/mock';
import { customersToCSV, downloadCSV } from '../lib/csv';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type SortKey = 'company' | 'mrr' | 'seats' | 'health' | 'joined';
type StatusFilter = 'all' | Status;

interface CustomersTableProps {
  rows: Customer[];
  query: string;
  onQuery: (q: string) => void;
  onCancelPlan: (id: string) => void;
}

const STATUS_META: Record<Status, { label: string; variant: 'success' | 'muted' | 'warning' | 'ember' }> = {
  active: { label: 'Active', variant: 'success' },
  trialing: { label: 'Trialing', variant: 'muted' },
  past_due: { label: 'Past due', variant: 'warning' },
  paused: { label: 'Paused', variant: 'ember' },
};

const FILTERS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'trialing', label: 'Trialing' },
  { id: 'past_due', label: 'Past due' },
  { id: 'paused', label: 'Paused' },
];

const PAGE_SIZE = 8;

// The functional centerpiece: live search, status filter, five sortable
// columns (aria-sort announced), pagination, and CSV export of exactly the
// filtered rows. Destructive row action confirms through the Dialog.
export function CustomersTable({ rows, query, onQuery, onCancelPlan }: CustomersTableProps): ReactElement {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('company');
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [page, setPage] = useState(0);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((c) => {
      if (status !== 'all' && c.status !== status) return false;
      if (q !== '' && !`${c.name} ${c.company} ${c.email}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, query, status]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return cmp * sortDir;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const pageRows = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(key: SortKey): void {
    if (key === sortKey) {
      setSortDir((d) => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  function setFilter(f: StatusFilter): void {
    setStatus(f);
    setPage(0);
  }

  function setSearch(q: string): void {
    onQuery(q);
    setPage(0);
  }

  const confirmTarget = confirmId === null ? undefined : rows.find((r) => r.id === confirmId);

  return (
    <div>
      {/* Toolbar: live search, status pills, export */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-xs">
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <Input
            value={query}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company, email…"
            aria-label="Search customers"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={status === f.id}
              className={cn(
                'rounded-full border px-3 py-1 text-[13px] font-semibold transition-colors',
                status === f.id
                  ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink'
                  : 'border-line text-ink-soft hover:border-ink/30 dark:border-night-line dark:text-gray-300',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV('meridian-customers.csv', customersToCSV(sorted))}
          disabled={sorted.length === 0}
          className="lg:ml-auto"
        >
          <Download size={14} aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      <p className="mt-3 text-[13px] text-ink-faint dark:text-gray-400" aria-live="polite">
        {sorted.length} of {rows.length} customers
        {query.trim() !== '' && (
          <>
            {' matching '}
            <strong className="text-ink dark:text-white">“{query.trim()}”</strong>
          </>
        )}
      </p>

      {pageRows.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-lg border border-dashed border-line px-6 py-14 text-center dark:border-night-line">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink/5 text-ink-soft dark:bg-white/10 dark:text-gray-300">
            <SearchX size={20} aria-hidden="true" />
          </span>
          <p className="font-display mt-3 text-lg font-bold">No customers match</p>
          <p className="mt-1 max-w-60 text-sm text-ink-faint dark:text-gray-400">
            Try a shorter search, or clear the status filter to see everyone again.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearch(''); setFilter('all'); }}>
            Clear search and filters
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-3 overflow-hidden rounded-lg border border-line dark:border-night-line">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortHead label="Customer" k="company" sortKey={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHead label="Plan" k={null} sortKey={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHead label="Status" k={null} sortKey={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHead label="MRR" k="mrr" sortKey={sortKey} dir={sortDir} onSort={toggleSort} numeric />
                  <SortHead label="Seats" k="seats" sortKey={sortKey} dir={sortDir} onSort={toggleSort} numeric />
                  <SortHead label="Health" k="health" sortKey={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHead label="Joined" k="joined" sortKey={sortKey} dir={sortDir} onSort={toggleSort} />
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {pageRows.map((c) => (
                    <motion.tr
                      key={c.id}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="border-b border-line transition-colors last:border-0 hover:bg-ink/[0.025] dark:border-night-line dark:hover:bg-white/[0.03]"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/10 font-display text-xs font-bold text-ink-soft dark:bg-white/10 dark:text-gray-200">
                            {initials(c.name)}
                          </span>
                          <span>
                            <span className="block font-semibold">{c.name}</span>
                            <span className="block text-xs text-ink-faint dark:text-gray-400">{c.email}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{c.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_META[c.status].variant}>{STATUS_META[c.status].label}</Badge>
                      </TableCell>
                      <TableCell className="tnum font-mono font-semibold">{formatUSD(c.mrr)}</TableCell>
                      <TableCell className="tnum font-mono">{c.seats}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-16 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10"
                            role="progressbar"
                            aria-valuenow={c.health}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${c.company} health score`}
                          >
                            <span className={cn('block h-full rounded-full', c.health >= 70 ? 'bg-emerald-500' : c.health >= 50 ? 'bg-amber-500' : 'bg-ember')} style={{ width: `${c.health}%` }} />
                          </span>
                          <span className="tnum font-mono text-xs">{c.health}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-ink-faint dark:text-gray-400">{c.joined}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`Actions for ${c.company}`}
                              className="grid h-8 w-8 place-items-center rounded-md text-ink-soft hover:bg-ink/5 dark:text-gray-300 dark:hover:bg-white/10"
                            >
                              <MoreHorizontal size={16} aria-hidden="true" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{c.company}</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => void navigator.clipboard?.writeText(c.email)}>
                              Copy email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => setConfirmId(c.id)}
                              className="text-ember-deep focus:text-ember-deep dark:text-red-300"
                            >
                              Cancel subscription…
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-ink-faint dark:text-gray-400" aria-live="polite">
              Page {safePage + 1} of {pages}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Cancel confirm dialog */}
      <Dialog open={confirmId !== null} onOpenChange={(open) => { if (!open) setConfirmId(null); }}>
        <DialogContent>
          <DialogTitle>Cancel {confirmTarget?.company ?? 'subscription'}?</DialogTitle>
          <DialogDescription>
            This moves the account to Paused and stops the next invoice. The record stays
            in the table so nothing is ever lost — a real app would call the billing API here.
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmId(null)}>
              Keep it
            </Button>
            <Button
              onClick={() => {
                if (confirmId !== null) onCancelPlan(confirmId);
                setConfirmId(null);
              }}
            >
              Pause subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface SortHeadProps {
  label: string;
  k: 'company' | 'mrr' | 'seats' | 'health' | 'joined' | null;
  sortKey: string;
  dir: 1 | -1;
  onSort: (k: 'company' | 'mrr' | 'seats' | 'health' | 'joined') => void;
  numeric?: boolean;
}

// Sortable header button with aria-sort; non-sortable columns render plain.
function SortHead({ label, k, sortKey, dir, onSort, numeric }: SortHeadProps): ReactElement {
  if (k === null) return <TableHead>{label}</TableHead>;
  const active = sortKey === k;
  return (
    <TableHead aria-sort={active ? (dir === 1 ? 'ascending' : 'descending') : 'none'} className={numeric === true ? 'text-right' : ''}>
      <button
        type="button"
        onClick={() => onSort(k)}
        className="inline-flex items-center gap-1 font-semibold hover:text-ink dark:hover:text-white"
        aria-label={`Sort by ${label.toLowerCase()} ${active && dir === 1 ? 'descending' : 'ascending'}`}
      >
        {label}
        {active ? (
          dir === 1 ? <ArrowUp size={12} aria-hidden="true" /> : <ArrowDown size={12} aria-hidden="true" />
        ) : (
          <ArrowUpDown size={12} aria-hidden="true" className="opacity-40" />
        )}
      </button>
    </TableHead>
  );
}
