/*
 * Site-wide brand and contact details, in one place so the Contact page, the
 * form, the footer, and anything else that needs them can't drift apart.
 */

/*
 * The company slogan, confirmed by the client 2026-08-28.
 *
 * Deliberately kept separate from the hero tagline. The hero's "PREMIUM EVENT
 * DESIGN & FULL-SERVICE PLANNING" tells a first-time visitor what is sold
 * here, which is work the slogan cannot do; the slogan says what the company
 * is like, which is work the tagline cannot do. Replacing one with the other
 * loses something either way, so both run.
 */
export const SITE_SLOGAN = 'We Love To Party';

// TODO(client): replace with the real inbox and phone number before launch —
// no business email or phone is confirmed in PRODUCT.md yet.
export const CONTACT_EMAIL = 'hello@belloftheball.example';
export const CONTACT_PHONE = '';

/*
 * Where the consultation form posts.
 *
 * The form is a plain HTML POST, so any form-to-email service works and the
 * site stays a static build — no server, no API keys in the repo. To turn it
 * on:
 *
 *   1. Sign up at formspree.io (or web3forms.com / usebasin.com) with the
 *      site's own email address, so submissions land in that inbox.
 *   2. Create a form; the service gives you an endpoint URL.
 *   3. Paste it below and redeploy.
 *
 * Until this is set, the Contact page shows the form in a disabled state with
 * the mailto link as the way through — it never renders a form that silently
 * goes nowhere.
 *
 * Web3Forms note: it authenticates with an access key sent as a form field
 * rather than in the URL. Set FORM_ACCESS_KEY and it's included automatically.
 */
export const FORM_ENDPOINT = '';
export const FORM_ACCESS_KEY = '';

/** Subject line on the email the service sends you. */
export const FORM_SUBJECT = 'New consultation request — belloftheball.com';

export const FORM_IS_CONFIGURED = FORM_ENDPOINT.trim().length > 0;
