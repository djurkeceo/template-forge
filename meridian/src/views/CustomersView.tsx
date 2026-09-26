import type { ReactElement } from 'react';
import type { Customer } from '../data/mock';
import { CustomersTable } from '../components/CustomersTable';
import { Skeleton } from '../components/ui/skeleton';

interface CustomersViewProps {
  loading: boolean;
  rows: Customer[];
  query: string;
  onQuery: (q: string) => void;
  onCancelPlan: (id: string) => void;
}

// Customers view: the working table in a card. Loading shows skeleton rows.
export function CustomersView({ loading, rows, query, onQuery, onCancelPlan }: CustomersViewProps): ReactElement {
  return (
    <div className="rounded-lg bg-white p-5 shadow-level1 sm:p-6 dark:bg-night-raised dark:shadow-level1-dark">
      <div className="mb-4">
        <h2 className="font-display text-lg font-bold tracking-tight">Customers</h2>
        <p className="text-[13px] text-ink-faint dark:text-gray-400">
          Search, sort, page and export. Pausing keeps the record — nothing is deleted.
        </p>
      </div>
      {loading ? <TableSkeleton /> : <CustomersTable rows={rows} query={query} onQuery={onQuery} onCancelPlan={onCancelPlan} />}
    </div>
  );
}

function TableSkeleton(): ReactElement {
  return (
    <div className="space-y-3" aria-label="Loading customers" role="status">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}
