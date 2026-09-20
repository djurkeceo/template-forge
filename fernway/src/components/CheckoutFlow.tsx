import { useState, type FormEvent, type ReactElement, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, MapPin, PackageCheck, ShoppingBasket } from 'lucide-react';
import { FLAT_SHIPPING, FREE_SHIPPING_AT, formatUSD } from '../data/products';
import { digitsOnly, hasErrors, mockOrderNumber, validatePayment, validateShipping, type ErrorMap, type PaymentFields, type ShippingFields } from '../lib/validation';
import { selectResolvedLines, selectSubtotal, useShop } from '../store/shop';
import { QuantityStepper } from './QuantityStepper';
import { TileArt } from './TileArt';

type Step = 'review' | 'shipping' | 'payment' | 'done';

interface CheckoutFlowProps {
  onBackToShop: () => void;
}

const STEPS: Array<{ id: Step; label: string; icon: typeof ShoppingBasket }> = [
  { id: 'review', label: 'Review', icon: ShoppingBasket },
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'done', label: 'Confirmed', icon: PackageCheck },
];

function Field(props: {
  id: string;
  label: string;
  error: string | undefined;
  children: ReactNode;
  span?: boolean;
}): ReactElement {
  return (
    <div className={props.span === true ? 'sm:col-span-2' : ''}>
      <label htmlFor={props.id} className="text-sm font-bold text-forest dark:text-white">
        {props.label}
      </label>
      {props.children}
      {props.error !== undefined && props.error !== '' && (
        <p id={`${props.id}-error`} role="alert" className="mt-1 text-[13px] font-semibold text-red-600 dark:text-red-400">
          {props.error}
        </p>
      )}
    </div>
  );
}

const INPUT =
  'mt-1.5 w-full rounded-pod border-2 border-stone bg-white px-3.5 py-2.5 text-[15px] text-forest placeholder:text-forest/35 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500';

// Multi-step checkout: review → shipping (validated) → mock payment →
// confirmation. No gateway is called; the payment step is a clearly-marked
// insertion point (see the STRIPE comment in step 3). Every step functions
// end-to-end so buyers can demo the whole funnel today.
export function CheckoutFlow({ onBackToShop }: CheckoutFlowProps): ReactElement {
  // useShallow: the selector builds a fresh array — compare by value so the
  // component doesn't re-render in a loop (see CartDrawer).
  const lines = useShop(useShallow(selectResolvedLines));
  const subtotal = useShop(selectSubtotal);
  const setQty = useShop((s) => s.setQty);
  const removeLine = useShop((s) => s.removeLine);
  const clearCart = useShop((s) => s.clearCart);

  const [step, setStep] = useState<Step>('review');
  const [ship, setShip] = useState<ShippingFields>({ name: '', email: '', address: '', city: '', zip: '', country: '' });
  const [shipErrors, setShipErrors] = useState<ErrorMap>({});
  const [pay, setPay] = useState<PaymentFields>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
  const [payErrors, setPayErrors] = useState<ErrorMap>({});
  const [orderNo, setOrderNo] = useState('');

  const shipping = subtotal >= FREE_SHIPPING_AT || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  function inputCls(error: string | undefined): string {
    return `${INPUT} ${error !== undefined && error !== '' ? 'border-red-500' : ''}`;
  }

  function describedBy(id: string, error: string | undefined): string | undefined {
    return error !== undefined && error !== '' ? `${id}-error` : undefined;
  }

  function submitShipping(e: FormEvent): void {
    e.preventDefault();
    const errors = validateShipping(ship);
    setShipErrors(errors);
    if (!hasErrors(errors)) setStep('payment');
  }

  function submitPayment(e: FormEvent): void {
    e.preventDefault();
    const errors = validatePayment(pay);
    setPayErrors(errors);
    if (hasErrors(errors)) return;
    // MOCK ONLY — no charge happens. On success the gateway would return a
    // reference; we mint a fake one and clear the cart.
    setOrderNo(mockOrderNumber());
    clearCart();
    setStep('done');
  }

  // Empty-cart guard: checkout with nothing in it shows the empty state,
  // never a broken $0 form.
  if (lines.length === 0 && step !== 'done') {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-fern-tint text-fern-deep dark:bg-white/10 dark:text-sunbeam">
          <ShoppingBasket size={28} aria-hidden="true" />
        </span>
        <h1 className="font-display mt-4 text-2xl font-bold text-forest dark:text-white">Your cart is empty</h1>
        <p className="mt-2 text-forest/60 dark:text-gray-400">Add a plant or two before heading to checkout.</p>
        <button
          type="button"
          onClick={onBackToShop}
          className="mt-6 rounded-pod bg-forest px-6 py-3 text-sm font-bold text-white dark:bg-sunbeam dark:text-forest"
        >
          Back to the shop
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <button
        type="button"
        onClick={onBackToShop}
        className="flex items-center gap-2 text-sm font-bold text-fern-deep hover:underline hover:underline-offset-4 dark:text-sunbeam"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Continue shopping
      </button>

      {/* Step progress — aria-current marks where the shopper stands. */}
      <ol aria-label="Checkout progress" className="mt-6 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => {
          const done = i < stepIndex;
          const now = s.id === step;
          return (
            <li
              key={s.id}
              aria-current={now ? 'step' : undefined}
              className={`flex items-center gap-2 rounded-pod border px-3 py-2.5 ${
                now
                  ? 'border-forest bg-forest text-white dark:border-sunbeam dark:bg-sunbeam dark:text-forest'
                  : done
                    ? 'border-fern/40 bg-fern-tint text-fern-deep dark:border-white/10 dark:bg-white/5 dark:text-sunbeam'
                    : 'border-stone bg-white text-forest/40 dark:border-white/10 dark:bg-transparent dark:text-gray-500'
              }`}
            >
              {done ? <Check size={16} aria-hidden="true" /> : <s.icon size={16} aria-hidden="true" />}
              <span className="hidden text-[13px] font-bold sm:inline">{s.label}</span>
              <span className="text-[13px] font-bold sm:hidden">{i + 1}</span>
            </li>
          );
        })}
      </ol>

      {step === 'review' && (
        <section aria-labelledby="review-title" className="mt-8">
          <h1 id="review-title" className="font-display text-2xl font-bold text-forest dark:text-white">Review your cart</h1>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.variantId}`} className="flex gap-4 rounded-shelf border border-stone bg-white p-4 dark:border-white/10 dark:bg-forest-deep">
                <TileArt tile={l.tile} icon={l.icon} label="" className="h-24 w-20 shrink-0 rounded-pod" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-bold text-forest dark:text-white">{l.name}</p>
                  <p className="text-sm text-forest/60 dark:text-gray-400">{l.variantLabel} · {formatUSD(l.unit)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper small qty={l.qty} onChange={(q) => setQty(l.productId, l.variantId, q)} label={`Quantity of ${l.name}`} />
                    <div className="flex items-center gap-3">
                      <p className="font-bold tabular-nums text-forest dark:text-white">{formatUSD(l.total)}</p>
                      <button
                        type="button"
                        onClick={() => removeLine(l.productId, l.variantId)}
                        aria-label={`Remove ${l.name} from cart`}
                        className="text-sm font-bold text-red-600 underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Totals subtotal={subtotal} shipping={shipping} total={total} />
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep('shipping')}
              className="flex items-center gap-2 rounded-pod bg-forest px-7 py-3.5 font-bold text-white dark:bg-sunbeam dark:text-forest"
            >
              Continue to shipping
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {step === 'shipping' && (
        <section aria-labelledby="shipping-title" className="mt-8">
          <h1 id="shipping-title" className="font-display text-2xl font-bold text-forest dark:text-white">Where is it going?</h1>
          <form onSubmit={submitShipping} noValidate className="mt-4 grid gap-4 rounded-shelf border border-stone bg-white p-5 sm:grid-cols-2 sm:p-7 dark:border-white/10 dark:bg-forest-deep">
            <Field id="ship-name" label="Full name" error={shipErrors.name}>
              <input id="ship-name" autoComplete="name" value={ship.name} onChange={(e) => setShip({ ...ship, name: e.target.value })} aria-invalid={shipErrors.name !== undefined} aria-describedby={describedBy('ship-name', shipErrors.name)} placeholder="Fern Holder" className={inputCls(shipErrors.name)} />
            </Field>
            <Field id="ship-email" label="Email (for the receipt)" error={shipErrors.email}>
              <input id="ship-email" type="email" autoComplete="email" value={ship.email} onChange={(e) => setShip({ ...ship, email: e.target.value })} aria-invalid={shipErrors.email !== undefined} aria-describedby={describedBy('ship-email', shipErrors.email)} placeholder="you@example.com" className={inputCls(shipErrors.email)} />
            </Field>
            <Field id="ship-address" label="Street address" error={shipErrors.address} span>
              <input id="ship-address" autoComplete="street-address" value={ship.address} onChange={(e) => setShip({ ...ship, address: e.target.value })} aria-invalid={shipErrors.address !== undefined} aria-describedby={describedBy('ship-address', shipErrors.address)} placeholder="123 Grove Lane, Apt 4" className={inputCls(shipErrors.address)} />
            </Field>
            <Field id="ship-city" label="City" error={shipErrors.city}>
              <input id="ship-city" autoComplete="address-level2" value={ship.city} onChange={(e) => setShip({ ...ship, city: e.target.value })} aria-invalid={shipErrors.city !== undefined} aria-describedby={describedBy('ship-city', shipErrors.city)} placeholder="Portland" className={inputCls(shipErrors.city)} />
            </Field>
            <Field id="ship-zip" label="ZIP / postal code" error={shipErrors.zip}>
              <input id="ship-zip" autoComplete="postal-code" value={ship.zip} onChange={(e) => setShip({ ...ship, zip: e.target.value })} aria-invalid={shipErrors.zip !== undefined} aria-describedby={describedBy('ship-zip', shipErrors.zip)} placeholder="97205" className={inputCls(shipErrors.zip)} />
            </Field>
            <Field id="ship-country" label="Country" error={shipErrors.country} span>
              <select id="ship-country" autoComplete="country-name" value={ship.country} onChange={(e) => setShip({ ...ship, country: e.target.value })} aria-invalid={shipErrors.country !== undefined} aria-describedby={describedBy('ship-country', shipErrors.country)} className={inputCls(shipErrors.country)}>
                <option value="">Choose a country…</option>
                {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Netherlands'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <div className="flex flex-wrap justify-between gap-3 sm:col-span-2">
              <button type="button" onClick={() => setStep('review')} className="flex items-center gap-2 rounded-pod border border-stone px-5 py-3 text-sm font-bold text-forest dark:border-white/15 dark:text-white">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to review
              </button>
              <button type="submit" className="flex items-center gap-2 rounded-pod bg-forest px-7 py-3 font-bold text-white dark:bg-sunbeam dark:text-forest">
                Continue to payment
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      {step === 'payment' && (
        <section aria-labelledby="payment-title" className="mt-8">
          <h1 id="payment-title" className="font-display text-2xl font-bold text-forest dark:text-white">Payment</h1>
          {/*
            ═══ WHERE TO PLUG IN STRIPE (or any gateway) ═══
            This form is a mock: on submit it only validates formats and mints
            a fake order number. To go live:
              1. Load @stripe/stripe-js and wrap this step in <Elements>.
              2. Replace the three card inputs below with Stripe's
                 <CardNumberElement>, <CardExpiryElement>, <CardCvcElement>.
              3. In submitPayment, call stripe.confirmCardPayment(clientSecret)
                 with a PaymentIntent created on YOUR server (never expose the
                 secret key in this file), then advance to 'done' on success.
            Keep the review/shipping steps untouched — they already collect
            everything the PaymentIntent metadata needs.
          */}
          <form onSubmit={submitPayment} noValidate className="mt-4 grid gap-4 rounded-shelf border border-stone bg-white p-5 sm:grid-cols-2 sm:p-7 dark:border-white/10 dark:bg-forest-deep">
            <p className="flex items-center gap-2 rounded-pod bg-sunbeam-soft px-4 py-2.5 text-[13px] font-bold text-bark sm:col-span-2 dark:bg-white/10 dark:text-sunbeam">
              <Lock size={15} aria-hidden="true" />
              Demo checkout — no real charge. Try 4242 4242 4242 4242, any future date.
            </p>
            <Field id="pay-name" label="Name on card" error={payErrors.cardName} span>
              <input id="pay-name" autoComplete="cc-name" value={pay.cardName} onChange={(e) => setPay({ ...pay, cardName: e.target.value })} aria-invalid={payErrors.cardName !== undefined} aria-describedby={describedBy('pay-name', payErrors.cardName)} placeholder="Fern Holder" className={inputCls(payErrors.cardName)} />
            </Field>
            <Field id="pay-number" label="Card number" error={payErrors.cardNumber} span>
              <input
                id="pay-number"
                inputMode="numeric"
                autoComplete="cc-number"
                value={pay.cardNumber}
                // Group digits in fours as the shopper types (display only).
                onChange={(e) => {
                  const d = digitsOnly(e.target.value).slice(0, 16);
                  setPay({ ...pay, cardNumber: d.replace(/(.{4})/g, '$1 ').trim() });
                }}
                aria-invalid={payErrors.cardNumber !== undefined}
                aria-describedby={describedBy('pay-number', payErrors.cardNumber)}
                placeholder="4242 4242 4242 4242"
                className={inputCls(payErrors.cardNumber)}
              />
            </Field>
            <Field id="pay-expiry" label="Expiry (MM/YY)" error={payErrors.expiry}>
              <input
                id="pay-expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={pay.expiry}
                // Auto-insert the slash after MM (display only).
                onChange={(e) => {
                  const d = digitsOnly(e.target.value).slice(0, 4);
                  setPay({ ...pay, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                }}
                aria-invalid={payErrors.expiry !== undefined}
                aria-describedby={describedBy('pay-expiry', payErrors.expiry)}
                placeholder="08/28"
                className={inputCls(payErrors.expiry)}
              />
            </Field>
            <Field id="pay-cvc" label="CVC" error={payErrors.cvc}>
              <input id="pay-cvc" inputMode="numeric" autoComplete="cc-csc" value={pay.cvc} onChange={(e) => setPay({ ...pay, cvc: digitsOnly(e.target.value).slice(0, 4) })} aria-invalid={payErrors.cvc !== undefined} aria-describedby={describedBy('pay-cvc', payErrors.cvc)} placeholder="123" className={inputCls(payErrors.cvc)} />
            </Field>
            <div className="sm:col-span-2">
              <Totals subtotal={subtotal} shipping={shipping} total={total} />
            </div>
            <div className="flex flex-wrap justify-between gap-3 sm:col-span-2">
              <button type="button" onClick={() => setStep('shipping')} className="flex items-center gap-2 rounded-pod border border-stone px-5 py-3 text-sm font-bold text-forest dark:border-white/15 dark:text-white">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to shipping
              </button>
              <button type="submit" className="flex items-center gap-2 rounded-pod bg-forest px-7 py-3 font-bold text-white dark:bg-sunbeam dark:text-forest">
                <Lock size={16} aria-hidden="true" />
                Pay {formatUSD(total)}
              </button>
            </div>
          </form>
        </section>
      )}

      {step === 'done' && (
        <section aria-labelledby="done-title" className="mx-auto mt-8 max-w-lg text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-fern text-white">
            <Check size={30} aria-hidden="true" />
          </span>
          <h1 id="done-title" className="font-display mt-4 text-3xl font-bold text-forest dark:text-white">Order potted and confirmed</h1>
          <p className="mt-2 text-forest/70 dark:text-gray-300">
            Order <strong className="text-forest dark:text-white">{orderNo}</strong> is being wrapped in moss.
            A receipt is on its way to <strong className="text-forest dark:text-white">{ship.email}</strong>.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-pod border border-stone bg-white p-4 dark:border-white/10 dark:bg-forest-deep">
              <dt className="text-xs font-bold uppercase tracking-wide text-forest/50 dark:text-gray-400">Ship to</dt>
              <dd className="mt-1 text-sm font-bold text-forest dark:text-white">{ship.name || '—'}</dd>
              <dd className="text-sm text-forest/60 dark:text-gray-400">{ship.address || '—'}, {ship.city || '—'} {ship.zip || ''}</dd>
            </div>
            <div className="rounded-pod border border-stone bg-white p-4 dark:border-white/10 dark:bg-forest-deep">
              <dt className="text-xs font-bold uppercase tracking-wide text-forest/50 dark:text-gray-400">Charged</dt>
              <dd className="font-display mt-1 text-xl font-bold text-forest dark:text-white">{formatUSD(total)}</dd>
              <dd className="text-sm text-forest/60 dark:text-gray-400">Mock payment · no charge</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={onBackToShop}
            className="mt-8 rounded-pod bg-forest px-7 py-3.5 font-bold text-white dark:bg-sunbeam dark:text-forest"
          >
            Keep shopping
          </button>
        </section>
      )}
    </div>
  );
}

function Totals({ subtotal, shipping, total }: { subtotal: number; shipping: number; total: number }): ReactElement {
  return (
    <dl className="mt-4 space-y-1.5 rounded-pod border border-stone bg-mist p-4 text-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex justify-between">
        <dt className="text-forest/60 dark:text-gray-400">Subtotal</dt>
        <dd className="font-bold tabular-nums text-forest dark:text-white">{formatUSD(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-forest/60 dark:text-gray-400">Shipping</dt>
        <dd className="font-bold tabular-nums text-forest dark:text-white">
          {shipping === 0 ? 'Free' : formatUSD(shipping)}
        </dd>
      </div>
      <div className="flex justify-between border-t border-stone pt-2 dark:border-white/10">
        <dt className="font-bold text-forest dark:text-white">Total</dt>
        <dd className="font-display text-lg font-bold tabular-nums text-forest dark:text-white" aria-live="polite">{formatUSD(total)}</dd>
      </div>
    </dl>
  );
}
