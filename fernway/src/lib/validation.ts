// Checkout form validation. Each step validates its own fields and returns
// a per-field error map so inputs can show inline messages with
// aria-invalid + aria-describedby. Card checks are format-only — the
// payment step is a mock with a clearly-marked Stripe insertion point.

export type ErrorMap = Record<string, string | undefined>;

function required(value: string, label: string): string | undefined {
  return value.trim().length === 0 ? `${label} is required.` : undefined;
}

export interface ShippingFields {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export function validateShipping(f: ShippingFields): ErrorMap {
  const errors: ErrorMap = {
    name: required(f.name, 'Full name'),
    address: required(f.address, 'Street address'),
    city: required(f.city, 'City'),
    zip: required(f.zip, 'ZIP code'),
    country: required(f.country, 'Country'),
    email: undefined,
  };
  if (f.email.trim().length === 0) errors.email = 'Email is required for the receipt.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = 'That email doesn’t look complete.';
  if (f.zip.trim().length !== 0 && !/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/.test(f.zip.trim()))
    errors.zip = 'Check the ZIP / postal code format.';
  return errors;
}

export interface PaymentFields {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

/** Strip spaces/dashes so "4242 4242…" validates like "42424242…". */
export function digitsOnly(v: string): string {
  return v.replace(/[^0-9]/g, '');
}

export function validatePayment(f: PaymentFields): ErrorMap {
  const errors: ErrorMap = { cardName: required(f.cardName, 'Name on card') };
  const num = digitsOnly(f.cardNumber);
  if (num.length === 0) errors.cardNumber = 'Card number is required.';
  else if (num.length < 15 || num.length > 16) errors.cardNumber = 'Card numbers are 15–16 digits.';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry.trim())) {
    errors.expiry = 'Use MM/YY.';
  } else {
    // Reject obviously-past dates (mock only — a gateway re-checks this).
    const [mm, yy] = f.expiry.trim().split('/');
    const exp = new Date(2000 + Number(yy), Number(mm));
    if (exp <= new Date()) errors.expiry = 'That card looks expired.';
  }
  if (!/^\d{3,4}$/.test(f.cvc.trim())) errors.cvc = '3–4 digits.';
  return errors;
}

export function hasErrors(errors: ErrorMap): boolean {
  return Object.values(errors).some((e) => e !== undefined && e !== '');
}

/** Fake order number for the confirmation screen (replace with gateway ref). */
export function mockOrderNumber(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `FW-${n}`;
}
