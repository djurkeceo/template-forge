import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactElement } from 'react';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// shadcn/ui DropdownMenu over Radix: arrow-key navigation, type-ahead,
// outside-click and Escape handling built in. Padded to level-2 elevation.
export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(function DropdownMenuContent({ className, ...props }, ref): ReactElement {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        ref={ref}
        sideOffset={6}
        className={cn(
          'z-50 min-w-44 overflow-hidden rounded-md bg-white p-1.5 shadow-level2 dark:bg-night-raised dark:shadow-level2-dark',
          className,
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
});

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> & { inset?: boolean }
>(function DropdownMenuItem({ className, inset, ...props }, ref): ReactElement {
  return (
    <DropdownPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-2 text-sm font-medium outline-none focus:bg-ink/5 focus:text-ink data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-white/10 dark:focus:text-white',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
});

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref): ReactElement {
  return (
    <DropdownPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2.5 text-sm font-medium outline-none focus:bg-ink/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-white/10',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <DropdownPrimitive.ItemIndicator>
          <Check size={14} aria-hidden="true" />
        </DropdownPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownPrimitive.CheckboxItem>
  );
});

export function DropdownMenuLabel({ className, ...props }: ComponentPropsWithoutRef<typeof DropdownPrimitive.Label>): ReactElement {
  return <DropdownPrimitive.Label className={cn('px-2.5 py-1.5 text-xs font-semibold text-ink-faint dark:text-gray-400', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>): ReactElement {
  return <DropdownPrimitive.Separator className={cn('-mx-1.5 my-1.5 h-px bg-line dark:bg-night-line', className)} {...props} />;
}
