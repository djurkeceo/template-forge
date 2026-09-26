import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// shadcn/ui's cn(): conditional classes, Tailwind-conflict resolved.
// Every primitive below composes through this.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
