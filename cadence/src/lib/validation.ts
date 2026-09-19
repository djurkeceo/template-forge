// Tiny validation helpers shared by the email-capture form.
// Kept separate from components so buyers can reuse them in checkout.

/** RFC-5322-lite check: good enough for client-side capture, not a verifier. */
export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 5 || trimmed.length > 120) return false;
  // No spaces, one @, at least one dot after the @.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function emailError(value: string): string | null {
  if (value.trim().length === 0) return 'Enter your work email so we can send the invite.';
  if (!isValidEmail(value)) return 'That address doesn’t look complete — check the spelling and try again.';
  return null;
}
