import { useState, type FormEvent, type ReactElement } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { hasContactErrors, validateContact, type ContactFields } from '../lib/validation';

const TOPICS = ['Project inquiry', 'Freelance availability', 'Speaking / workshop', 'Just saying hi'];

// Postbox — contact form with real client-side validation. Errors render
// inline and announce via role="alert"; success clears the form and
// announces via role="status". Wire `fetch` where marked to go live.
export function PostboxApp(): ReactElement {
  const [fields, setFields] = useState<ContactFields>({ name: '', email: '', topic: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [sent, setSent] = useState(false);

  function set<K extends keyof ContactFields>(key: K, value: string): void {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    const found = validateContact(fields);
    setErrors(found);
    if (hasContactErrors(found)) return;
    // TODO(buyers): POST `fields` to your form endpoint here (Formspree,
    // Resend, your own API), then setSent(true) on success.
    setSent(true);
  }

  function again(): void {
    setFields({ name: '', email: '', topic: '', message: '' });
    setErrors({});
    setSent(false);
  }

  const input = (bad: boolean): string =>
    `mt-1.5 w-full rounded-pod border-2 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/35 ${
      bad ? 'border-red-600' : 'border-ink/25 focus:border-ink'
    }`;

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-lagoon-tint text-ink">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <h2 className="font-display text-xl font-bold text-ink">Stamped and sent.</h2>
        <p className="max-w-60 text-sm text-ink/70">
          Thanks, {fields.name.split(' ')[0] ?? 'friend'} — I reply within two working days.
        </p>
        <button
          type="button"
          onClick={again}
          className="mt-1 rounded-pod border-2 border-ink bg-paper px-4 py-2 text-sm font-bold text-ink"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3.5 p-5" aria-label="Contact form">
      <div>
        <label htmlFor="pb-name" className="text-sm font-bold text-ink">Your name</label>
        <input
          id="pb-name" autoComplete="name" value={fields.name} onChange={(e) => set('name', e.target.value)}
          aria-invalid={errors.name !== undefined} aria-describedby={errors.name !== undefined ? 'pb-name-error' : undefined}
          placeholder="Fern Holder" className={input(errors.name !== undefined)}
        />
        {errors.name !== undefined && <p id="pb-name-error" role="alert" className="mt-1 text-[13px] font-semibold text-red-700">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="pb-email" className="text-sm font-bold text-ink">Email</label>
        <input
          id="pb-email" type="email" autoComplete="email" value={fields.email} onChange={(e) => set('email', e.target.value)}
          aria-invalid={errors.email !== undefined} aria-describedby={errors.email !== undefined ? 'pb-email-error' : undefined}
          placeholder="you@example.com" className={input(errors.email !== undefined)}
        />
        {errors.email !== undefined && <p id="pb-email-error" role="alert" className="mt-1 text-[13px] font-semibold text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="pb-topic" className="text-sm font-bold text-ink">What's this about?</label>
        <select
          id="pb-topic" value={fields.topic} onChange={(e) => set('topic', e.target.value)}
          aria-invalid={errors.topic !== undefined} aria-describedby={errors.topic !== undefined ? 'pb-topic-error' : undefined}
          className={input(errors.topic !== undefined)}
        >
          <option value="">Choose one…</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.topic !== undefined && <p id="pb-topic-error" role="alert" className="mt-1 text-[13px] font-semibold text-red-700">{errors.topic}</p>}
      </div>
      <div>
        <label htmlFor="pb-message" className="text-sm font-bold text-ink">Message</label>
        <textarea
          id="pb-message" rows={4} value={fields.message} onChange={(e) => set('message', e.target.value)}
          aria-invalid={errors.message !== undefined} aria-describedby={errors.message !== undefined ? 'pb-message-error' : 'pb-message-hint'}
          placeholder="The project, the timeline, the dream…" className={`${input(errors.message !== undefined)} resize-y`}
        />
        {errors.message !== undefined ? (
          <p id="pb-message-error" role="alert" className="mt-1 text-[13px] font-semibold text-red-700">{errors.message}</p>
        ) : (
          <p id="pb-message-hint" className="mt-1 text-xs text-ink/50">20 characters minimum — enough to be useful.</p>
        )}
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-pod border-2 border-ink bg-ink px-5 py-3 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <Send size={15} aria-hidden="true" />
        Drop it in the postbox
      </button>
    </form>
  );
}
