import { useState, type FormEvent, type ReactElement } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';

interface SettingsViewProps {
  theme: 'light' | 'dark';
  onTheme: (t: 'light' | 'dark') => void;
}

// Settings: profile form with inline save confirmation, working
// notification switches, and appearance picker wired to the real theme.
export function SettingsView({ theme, onTheme }: SettingsViewProps): ReactElement {
  const [name, setName] = useState('Robin Ash');
  const [email, setEmail] = useState('robin@alderline.example');
  const [saved, setSaved] = useState(false);
  const [payouts, setPayouts] = useState(true);
  const [trials, setTrials] = useState(true);
  const [digest, setDigest] = useState(false);

  function onSave(e: FormEvent): void {
    e.preventDefault();
    // Mock persistence — a real app PUTs to /api/workspace here.
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="grid max-w-4xl gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Workspace profile</CardTitle>
          <CardDescription>How the dashboard addresses you in receipts and emails</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="set-name" className="text-sm font-semibold">Display name</label>
              <Input id="set-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="set-email" className="text-sm font-semibold">Receipt email</label>
              <Input id="set-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" autoComplete="email" />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Button type="submit">Save changes</Button>
              {saved && (
                <p role="status" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  <Check size={15} aria-hidden="true" />
                  Saved
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what pings you — toggles apply instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-line dark:divide-night-line">
            {[
              { label: 'Payout sent', hint: 'Every Friday when money moves', value: payouts, set: setPayouts },
              { label: 'Trial started', hint: 'The moment a workspace begins a trial', value: trials, set: setTrials },
              { label: 'Weekly digest', hint: 'Monday summary of MRR, churn and health', value: digest, set: setDigest },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold">{row.label}</p>
                  <p className="text-[13px] text-ink-faint dark:text-gray-400">{row.hint}</p>
                </div>
                <Switch checked={row.value} onCheckedChange={row.set} label={`${row.label} notifications`} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Both themes are fully styled — pick the one that matches your demo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Color theme">
            {(['light', 'dark'] as const).map((t) => {
              const active = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTheme(t)}
                  aria-pressed={active}
                  className={`rounded-md border-2 p-3 text-left transition-all ${
                    active ? 'border-ember' : 'border-line hover:border-ink/30 dark:border-night-line'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-16 rounded-sm border border-line dark:border-night-line ${
                      t === 'light' ? 'bg-paper' : 'bg-night'
                    }`}
                  >
                    <span className={`mx-3 mt-3 block h-2 w-16 rounded-full ${t === 'light' ? 'bg-ink/70' : 'bg-white/70'}`} />
                    <span className="mx-3 mt-2 block h-2 w-10 rounded-full bg-ember" />
                  </span>
                  <span className="mt-2 block text-sm font-bold capitalize">{t}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
