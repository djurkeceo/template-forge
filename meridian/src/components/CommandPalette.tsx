import { useEffect, useState, type ReactElement } from 'react';
import { Command } from 'cmdk';
import { Download, LayoutDashboard, Moon, PanelLeftOpen, Settings, Sun, Users } from 'lucide-react';
import type { Customer } from '../data/mock';
import { customersToCSV, downloadCSV } from '../lib/csv';
import type { View } from '../App';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (v: View) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  customers: Customer[];
  onPickCustomer: (query: string) => void;
}

// Cmd/Ctrl+K palette (cmdk): navigation, workspace actions, and live
// customer search. cmdk owns filtering, arrow-key movement and ARIA roles;
// Enter on a customer jumps to the table pre-filtered by their name.
export function CommandPalette(props: CommandPaletteProps): ReactElement {
  const { open, onOpenChange, onNavigate, theme, onToggleTheme, onToggleSidebar, customers, onPickCustomer } = props;
  const [search, setSearch] = useState('');

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // Clearing search is an event consequence, not an effect: runs on close.
  function handleOpenChange(next: boolean): void {
    if (!next) setSearch('');
    onOpenChange(next);
  }

  function go(v: View): void {
    onNavigate(v);
    handleOpenChange(false);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={handleOpenChange}
      label="Command palette"
      contentClassName="fixed left-1/2 top-[16vh] z-[60] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-line bg-white shadow-level2 dark:border-night-line dark:bg-night-raised dark:shadow-level2-dark"
      overlayClassName="fixed inset-0 z-[55] bg-ink/50 backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 dark:border-night-line">
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search customers…"
          className="h-12 bg-transparent text-[15px] placeholder:text-ink-faint/70 dark:placeholder:text-gray-500"
        />
        <kbd className="rounded border border-line px-1.5 font-mono text-[11px] text-ink-faint dark:border-night-line dark:text-gray-500">
          esc
        </kbd>
      </div>
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-ink-faint dark:text-gray-400">
          No matches. Try a customer name or “theme”.
        </Command.Empty>

        <Command.Group heading="Go to" className="px-2 py-1.5 text-xs font-semibold text-ink-faint dark:text-gray-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1">
          <Item onSelect={() => go('overview')} icon={<LayoutDashboard size={15} />} label="Overview" hint="KPIs and revenue" />
          <Item onSelect={() => go('customers')} icon={<Users size={15} />} label="Customers" hint="Searchable table" />
          <Item onSelect={() => go('settings')} icon={<Settings size={15} />} label="Settings" hint="Workspace prefs" />
        </Command.Group>

        <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-semibold text-ink-faint dark:text-gray-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1">
          <Item
            onSelect={() => { onToggleTheme(); handleOpenChange(false); }}
            icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          />
          <Item
            onSelect={() => { onToggleSidebar(); handleOpenChange(false); }}
            icon={<PanelLeftOpen size={15} />}
            label="Toggle sidebar"
          />
          <Item
            onSelect={() => { downloadCSV('meridian-customers.csv', customersToCSV(customers)); handleOpenChange(false); }}
            icon={<Download size={15} />}
            label="Export customers CSV"
            hint={`${customers.length} rows`}
          />
        </Command.Group>

        <Command.Group heading="Customers" className="px-2 py-1.5 text-xs font-semibold text-ink-faint dark:text-gray-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1">
          {customers.slice(0, 8).map((c) => (
            <Command.Item
              key={c.id}
              value={`${c.name} ${c.company} ${c.email}`}
              onSelect={() => {
                onPickCustomer(c.name);
                go('customers');
              }}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm aria-selected:bg-ink/5 dark:aria-selected:bg-white/10"
            >
              <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/10 font-display text-[11px] font-bold dark:bg-white/10">
                {c.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold">{c.name}</span>
                <span className="block truncate text-xs text-ink-faint dark:text-gray-400">{c.company}</span>
              </span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({ onSelect, icon, label, hint }: { onSelect: () => void; icon: ReactElement; label: string; hint?: string }): ReactElement {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm aria-selected:bg-ink/5 dark:aria-selected:bg-white/10"
    >
      <span aria-hidden="true" className="text-ink-faint dark:text-gray-400">{icon}</span>
      <span className="font-medium">{label}</span>
      {hint !== undefined && <span className="ml-auto text-xs text-ink-faint dark:text-gray-500">{hint}</span>}
    </Command.Item>
  );
}
