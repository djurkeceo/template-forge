import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

// shadcn/ui Dialog over Radix: focus-trapped, Escape-dismissed, labelled.
// Used for the destructive "cancel subscription" confirm in Customers.
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref): ReactElement {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-50 bg-ink/60 backdrop-blur-[2px]', className)}
      {...props}
    />
  );
});

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(function DialogContent({ className, children, ...props }, ref): ReactElement {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg bg-white p-6 shadow-level2 dark:bg-night-raised dark:shadow-level2-dark',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-sm text-ink-faint hover:text-ink dark:text-gray-400 dark:hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export function DialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>): ReactElement {
  return <DialogPrimitive.Title className={cn('font-display text-lg font-bold', className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>): ReactElement {
  return <DialogPrimitive.Description className={cn('text-sm text-ink-faint dark:text-gray-400', className)} {...props} />;
}
