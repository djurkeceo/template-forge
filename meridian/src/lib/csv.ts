import type { Customer } from '../data/mock';

// CSV export of the CURRENTLY FILTERED rows — what you see is what downloads.
// Escapes quotes per RFC 4180; trigger via a temporary anchor (no deps).
export function customersToCSV(rows: Customer[]): string {
  const head = ['Name', 'Company', 'Email', 'Plan', 'Status', 'MRR', 'Seats', 'Joined', 'Health'];
  const esc = (v: string | number): string => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((c) =>
    [c.name, c.company, c.email, c.plan, c.status, c.mrr, c.seats, c.joined, c.health].map(esc).join(','),
  );
  return [head.map(esc).join(','), ...lines].join('\n');
}

export function downloadCSV(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
