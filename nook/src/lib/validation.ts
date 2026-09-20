// Postbox validation. Per-field errors render inline with aria-invalid +
// aria-describedby; success clears the form and announces via role="status".

export interface ContactFields {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type ContactErrors = Record<keyof ContactFields, string | undefined>;

export function validateContact(f: ContactFields): ContactErrors {
  const errors: ContactErrors = {
    name: f.name.trim().length === 0 ? 'Tell me your name so I can reply properly.' : undefined,
    email: undefined,
    topic: f.topic === '' ? 'Pick what this is about.' : undefined,
    message:
      f.message.trim().length < 20
        ? 'Give me a little more — at least 20 characters so I can actually help.'
        : undefined,
  };
  if (f.email.trim().length === 0) errors.email = 'I need an email to write back to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = 'That address doesn’t look complete.';
  return errors;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}
