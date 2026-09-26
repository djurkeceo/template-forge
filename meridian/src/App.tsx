import { useEffect, useState, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CommandPalette } from './components/CommandPalette';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useTheme } from './hooks/useTheme';
import { CUSTOMERS, type Customer } from './data/mock';
import { CustomersView } from './views/CustomersView';
import { OverviewView } from './views/OverviewView';
import { SettingsView } from './views/SettingsView';

export type View = 'overview' | 'customers' | 'settings';

const TITLES: Record<View, { title: string; subtitle: string }> = {
  overview: { title: 'Good morning, Robin', subtitle: 'Here is Alderline at a glance — updated 9 minutes ago.' },
  customers: { title: 'Customers', subtitle: 'Every account, searchable and exportable.' },
  settings: { title: 'Settings', subtitle: 'Workspace profile, notifications and appearance.' },
};

// Demo shell: theme + sidebar + routed views with AnimatePresence
// transitions. `loading` simulates the first fetch so skeletons show
// briefly (skipped for reduced motion). Customer rows live here so the
// table's pause action and the palette's CSV share one source of truth.
export default function App(): ReactElement {
  const { theme, toggle } = useTheme();
  const reduce = usePrefersReducedMotion();
  const [view, setView] = useState<View>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Loading starts from the motion preference (derived during render, not
  // set in an effect); the timeout below only *ends* the simulated fetch.
  const [loading, setLoading] = useState<boolean>(() => !reduce);
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [customerQuery, setCustomerQuery] = useState('');

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(id);
  }, [reduce ]);

  function setTheme(t: 'light' | 'dark'): void {
    if ((t === 'dark') !== (theme === 'dark')) toggle();
  }

  function cancelPlan(id: string): void {
    setCustomers((rows) => rows.map((r) => (r.id === id ? { ...r, status: 'paused', mrr: 0 } : r)));
  }

  const meta = TITLES[view];

  return (
    <div className="flex h-screen overflow-hidden bg-paper text-ink dark:bg-night dark:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Sidebar
        view={view}
        onNavigate={setView}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileNav}
        onCloseMobile={() => setMobileNav(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          theme={theme}
          onToggleTheme={toggle}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenMobileNav={() => setMobileNav(true)}
        />

        <main id="main" className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={reduce ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
            >
              {view === 'overview' && <OverviewView loading={loading} />}
              {view === 'customers' && (
                <CustomersView loading={loading} rows={customers} query={customerQuery} onQuery={setCustomerQuery} onCancelPlan={cancelPlan} />
              )}
              {view === 'settings' && <SettingsView theme={theme} onTheme={setTheme} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigate={setView}
        theme={theme}
        onToggleTheme={toggle}
        onToggleSidebar={() => setCollapsed((c) => !c)}
        customers={customers}
        onPickCustomer={setCustomerQuery}
      />
    </div>
  );
}
