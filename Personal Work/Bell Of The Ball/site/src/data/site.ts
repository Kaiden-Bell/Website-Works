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

/*
 * TODO(client) — fill both in before launch.
 *
 * CONTACT_EMAIL is what every mailto on the site points at, what the contact
 * page prints, and the address the consultation form's notifications should be
 * delivered to. Once the GoDaddy mailbox is live, put that address here.
 *
 * CONTACT_PHONE is optional. Leave it empty and the footer omits the link
 * rather than shipping a dead one. Write it the way it should be read —
 * "(775) 555-0142" — the tel: href strips the formatting itself.
 */
export const CONTACT_EMAIL = 'contact@belloftheballreno.com';
export const CONTACT_PHONE = '775-203-4065';

/*
 * Where the consultation form posts.
 *
 * The form is a plain HTML POST, so any form-to-email service works and the
 * site stays a static build — no server, no API keys on a server anywhere.
 * See the setup walkthrough for how to get these two values; the short version
 * is that you sign up with the business mailbox, the service gives you an
 * endpoint, and you paste it here.
 *
 * Until FORM_ENDPOINT is set, the Contact page renders the form disabled with
 * the mailto link as the way through. It never shows a form that silently goes
 * nowhere.
 */

/*
 * Which service is behind FORM_ENDPOINT.
 *
 * This is not cosmetic. The two services read different field names for the
 * same two jobs — the subject line of the email you receive, and the honeypot
 * that catches bots when JavaScript has not run:
 *
 *            subject line    honeypot
 *   formspree  _subject       _gotcha
 *   web3forms  subject        botcheck
 *
 * Set this wrong and the form still delivers, but every notification arrives
 * under the service's default subject and the no-JS honeypot stops working.
 * ContactForm.astro reads this to emit the right names.
 */
export type FormProvider = 'web3forms';
export const FORM_PROVIDER: FormProvider = 'web3forms';

/** The service's endpoint URL. Empty until it is set up. */
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Web3Forms only. It authenticates with an access key sent as a form field
 * rather than in the URL, so the endpoint is the same for everyone and this is
 * what identifies the mailbox. Formspree puts the id in the URL and needs
 * nothing here.
 *
 * This key is public — it ships in the HTML, and it has to. All it can do is
 * send mail to the address that owns it.
 */
export const FORM_ACCESS_KEY = '7bc48d4f-0a60-4cdd-8394-a8198bd55b4b';

/** Subject line on the email the service sends you. */
export const FORM_SUBJECT = 'New consultation request — belloftheballreno.com';

/** Field names the configured provider expects. */
export const FORM_FIELDS =
  FORM_PROVIDER === 'web3forms'
    ? { subject: 'subject', honeypot: 'botcheck' }
    : { subject: '_subject', honeypot: '_gotcha' };

export const FORM_IS_CONFIGURED = FORM_ENDPOINT.trim().length > 0;
