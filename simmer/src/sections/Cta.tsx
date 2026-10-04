import { useState, type FormEvent, type ReactElement } from 'react';
import { BellRing, CheckCircle2, Send, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { emailError } from '../lib/validation';
import { StoreBadges } from '../components/StoreBadges';

// Pre-launch email capture with real validation. Error announces via
// role="alert", success swaps the panel to a confirmation (role="status").
export function Cta(): ReactElement {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    const err = emailError(email);
    setError(err);
    if (err !== null) return;
    // Template mock: swap for POST to your waitlist endpoint (see README).
    setDone(true);
  }

  return (
    <section id="download" aria-labelledby="cta-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-card bg-char px-6 py-12 text-cream sm:px-12 dark:bg-paprika-deep"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-paprika/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-butter/20 blur-3xl" />
        </div>
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[13px] font-bold">
              <BellRing size={14} aria-hidden="true" />
              Launching this spring
            </p>
            <h2 id="cta-title" className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Dinner is solved. Be first in the kitchen.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/75">
              Leave your email for launch day plus the five most-cooked launch-week
              recipes. Or skip the line — download the beta below.
            </p>
            <div className="mt-6">
              <StoreBadges compact />
            </div>
          </div>

          <div className="rounded-card bg-cream p-5 text-char sm:p-6 dark:bg-char-deep dark:text-cream">
            {done ? (
              <div role="status" className="flex flex-col items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-basil-tint text-basil-deep dark:bg-basil-deep dark:text-cream">
                  <CheckCircle2 size={22} aria-hidden="true" />
                </span>
                <p className="font-display text-lg font-bold">You’re on the list.</p>
                <p className="text-sm leading-relaxed text-char/65 dark:text-cream/65">
                  Invite heading to {email.trim()}. First five recipes land on launch morning.
                </p>
                <button
                  type="button"
                  onClick={() => { setEmail(''); setDone(false); setError(null); }}
                  className="text-sm font-bold text-paprika-deep underline underline-offset-4 dark:text-butter"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <label htmlFor="cta-email" className="text-sm font-bold">Email for launch day</label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="cta-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error !== null && emailError(e.target.value) === null) setError(null); }}
                    aria-invalid={error !== null}
                    aria-describedby={error !== null ? 'cta-error' : 'cta-hint'}
                    className={`w-full rounded-xl border-2 px-4 py-3 text-[15px] placeholder:text-char/35 dark:placeholder:text-cream/35 ${
                      error !== null ? 'border-red-600 bg-red-50 dark:bg-red-950/40' : 'border-crust bg-white dark:border-white/15 dark:bg-white/5'
                    }`}
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-paprika px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Send size={16} aria-hidden="true" />
                    Notify me
                  </button>
                </div>
                {error !== null ? (
                  <p id="cta-error" role="alert" className="mt-2.5 flex items-start gap-1.5 text-[13px] font-semibold text-red-700 dark:text-red-300">
                    <XCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                ) : (
                  <p id="cta-hint" className="mt-2.5 text-[13px] text-char/55 dark:text-cream/55">
                    One launch email plus the recipes. Nothing else, ever.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
