import { forwardRef, type HTMLAttributes, type ReactElement, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// shadcn/ui Table: semantic table elements, sticky-header ready, row hover.
// Small screens: parent adds overflow-x-auto (see CustomersView).
export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table(
  { className, ...props },
  ref,
): ReactElement {
  return (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cn('w-full min-w-[720px] caption-bottom text-sm', className)} {...props} />
    </div>
  );
});

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): ReactElement {
  return <thead className={cn('[&_tr]:border-b [&_tr]:border-line dark:[&_tr]:border-night-line', className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): ReactElement {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>): ReactElement {
  return (
    <tr
      className={cn(
        'border-b border-line transition-colors last:border-0 hover:bg-ink/[0.025] data-[state=selected]:bg-ink/5 dark:border-night-line dark:hover:bg-white/[0.03]',
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>): ReactElement {
  return (
    <th
      className={cn(
        'h-10 whitespace-nowrap px-4 text-left align-middle text-xs font-semibold text-ink-faint dark:text-gray-400 [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>): ReactElement {
  return <td className={cn('whitespace-nowrap px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />;
}
