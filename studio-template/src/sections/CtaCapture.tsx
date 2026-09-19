import type { ReactElement } from 'react';
import { useState, type FormEvent } from 'react';
import { CheckCircle2, MailOpen, Send, XCircle } from 'lucide-react';
import { emailError, isValidEmail } from '../lib/validation';

type Status = 'idle' | 'error' | 'success';

// Second working feature: email capture with real client-side validation.
// Error and success states are announced via aria-live; the input uses
// aria-invalid + aria-describedby so assistive tech narrates the problem.
export function CtaCapture(): ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const err = emailError(email);
    if (err !== null) {
      setStatus('error');
      setMessage(err);
      return;
    }
    // No backend in a template — simulate the round trip so buyers can
    // see the success state, then wire `fetch` here in production.
    setStatus('success');
    setMessage(`Invite on its way to ${email.trim()}. Check your inbox for the timetable importer.`);
  }

  function onChange(value: string): void {
    setEmail(value);
    // Clear the error as soon as the address becomes valid again.
    if (status === 'error' && isValidEmail(value)) {
      setStatus('idle');
      setMessage('');
    }
  }

  return (
    <section id="cta" aria-labelledby="cta-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20">
      <div className="relative overflow-hidden rounded-panel bg-verdant px-6 py-12 text-white sm:px-12 dark:bg-ink-surface dark:ring-1 dark:ring-white/10">
        {/* Abstract arcs backdrop — CSS only. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[22px] border-ink/15" />
          <div className="absolute right-24 top-8 hidden rotate-6 rounded-ticket bg-marigold px-3 py-1.5 text-xs font-bold text-ink sm:block">
            21 days free
          </div>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
              <MailOpen size={14} aria-hidden="true" />
              Bring next month&apos;s timetable
            </p>
            <h2 id="cta-title" className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              We&apos;ll import your classes before your coffee cools.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/80">
              Drop your work email and get the importer plus a 21-day studio
              trial. One afternoon, no card, your real schedule.
            </p>
          </div>

          <div className="rounded-panel bg-white p-5 text-ink shadow-lift sm:p-6">
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-verdant-tint text-verdant-deep">
                  <CheckCircle2 size={22} aria-hidden="true" />
                </span>
                <p className="font-display text-lg font-bold">You&apos;re on the list.</p>
                <p className="text-sm leading-relaxed text-fog">{message}</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('');
                    setStatus('idle');
                    setMessage('');
                  }}
                  className="text-sm font-semibold text-verdant-deep underline underline-offset-4 hover:text-verdant"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <label htmlFor="cta-email" className="text-sm font-bold">
                  Work email
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="cta-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@yourstudio.com"
                    value={email}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'cta-error' : 'cta-hint'}
                    className={`w-full rounded-ticket border-2 px-4 py-3 text-[15px] placeholder:text-fog/60 ${
                      status === 'error' ? 'border-red-500 bg-red-50' : 'border-line bg-paper'
                    }`}
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-ticket border-2 border-ink bg-ink px-5 py-3 text-sm font-bold text-white shadow-stamp transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0E7C5A]"
                  >
                    <Send size={16} aria-hidden="true" />
                    Get the importer
                  </button>
                </div>
                {status === 'error' ? (
                  <p id="cta-error" role="alert" className="mt-2.5 flex items-start gap-1.5 text-[13px] font-medium text-red-600">
                    <XCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {message}
                  </p>
                ) : (
                  <p id="cta-hint" className="mt-2.5 text-[13px] text-fog">
                    One email with the importer and trial link. No newsletter unless you ask.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
