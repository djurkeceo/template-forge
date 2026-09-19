import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';

// Two deliberately different button treatments — solid marine slab for the
// primary action, outlined verdant ticket for secondary — so the page never
// falls into "every button looks identical" territory.

type Common = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsLink;

const SIZES: Record<NonNullable<Common['size']>, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const VARIANTS: Record<NonNullable<Common['variant']>, string> = {
  // Hard offset shadow: the brand's one playful-but-deliberate motif.
  primary:
    'bg-ink text-white border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0E7C5A] dark:bg-marigold dark:text-ink dark:border-marigold dark:shadow-none dark:hover:bg-marigold-soft',
  secondary:
    'bg-transparent text-ink border-2 border-verdant rounded-ticket hover:bg-verdant hover:text-white dark:text-white dark:hover:bg-verdant dark:hover:text-white',
  ghost: 'text-fog underline-offset-4 hover:text-ink hover:underline dark:text-gray-300',
};

export function Button(props: ButtonProps): ReactElement {
  const { children, variant = 'primary', size = 'md', ...rest } = props;
  const cls = [
    'inline-flex items-center justify-center gap-2 font-semibold',
    'rounded-ticket transition-all duration-150 active:translate-x-0 active:translate-y-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    SIZES[size],
    VARIANTS[variant],
  ].join(' ');

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as AsLink;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as AsButton)}>
      {children}
    </button>
  );
}
