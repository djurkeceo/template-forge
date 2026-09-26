import type { ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LayoutDashboard, PanelLeftClose, PanelLeftOpen, Settings, Users, X } from 'lucide-react';
import { cn } from '../lib/utils';
import type { View } from '../App';

interface SidebarProps {
  view: View;
  onNavigate: (v: View) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const ITEMS: Array<{ id: View; label: string; hint: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Overview', hint: 'KPIs and revenue', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', hint: 'Searchable records', icon: Users },
  { id: 'settings', label: 'Settings', hint: 'Workspace prefs', icon: Settings },
];

// Collapsible rail: width animates (240 ↔ 76), labels cross-fade instead of
// snapping. On mobile the same content renders in a slide-over drawer.
export function Sidebar({ view, onNavigate, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps): ReactElement {
  const reduce = useReducedMotion();
  const width = collapsed ? 76 : 240;

  return (
    <>
      {/* Desktop rail */}
      <motion.aside
        aria-label="Primary"
        initial={false}
        animate={{ width }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
        style={{ width }}
        className="hidden shrink-0 flex-col overflow-hidden border-r border-line bg-white md:flex dark:border-night-line dark:bg-night-raised"
      >
        <div className="flex h-16 items-center gap-2.5 px-5">
          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink">
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M2 11l3-5 2.5 3 2-2 2.5 4z" fill="#BE123C" />
            </svg>
          </span>
          {!collapsed && <span className="font-display text-[17px] font-bold tracking-tight">Meridian</span>}
        </div>

        <nav className="flex flex-col gap-1 px-3" aria-label="Views">
          {ITEMS.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-ember-tint text-ember-deep dark:bg-ember/15 dark:text-red-200'
                    : 'text-ink-soft hover:bg-ink/5 dark:text-gray-300 dark:hover:bg-white/5',
                )}
              >
                <item.icon size={18} aria-hidden="true" className="shrink-0" />
                {!collapsed && (
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="truncate">{item.label}</span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-3">
          {!collapsed && (
            <div className="rounded-md border border-line p-3 text-xs leading-relaxed text-ink-faint dark:border-night-line dark:text-gray-400">
              <p className="font-bold text-ink dark:text-white">Trial ends in 9 days</p>
              <p className="mt-0.5">Upgrade to keep every record past March.</p>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/5 dark:text-gray-300 dark:hover:bg-white/5"
          >
            {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile drawer — AnimatePresence lets the sheet slide back out. */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" aria-label="Close menu" onClick={onCloseMobile} className="absolute inset-0 bg-ink/60" />
          <motion.nav
            aria-label="Views"
            initial={reduce ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '-100%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-level2 dark:bg-night-raised"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-[17px] font-bold">Meridian</span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-md text-ink-soft hover:bg-ink/5 dark:text-gray-300"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-3">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  aria-current={view === item.id ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold',
                    view === item.id
                      ? 'bg-ember-tint text-ember-deep dark:bg-ember/15 dark:text-red-200'
                      : 'text-ink-soft dark:text-gray-300',
                  )}
                >
                  <item.icon size={18} aria-hidden="true" />
                  <span>
                    {item.label}
                    <span className="block text-xs font-normal opacity-70">{item.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        </div>
      )}
      </AnimatePresence>
    </>
  );
}
