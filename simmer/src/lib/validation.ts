// Notify-me email validation. Format-only client check with a friendly
// error string; success state is handled in the CTA section.

export function emailError(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return 'Enter your email so we can ping you at launch.';
  if (trimmed.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'That address doesn’t look complete — check the spelling and try again.';
  }
  return null;
}
