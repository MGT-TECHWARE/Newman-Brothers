import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail } from 'lucide-react';

const BUSINESS_EMAIL = 'todd@newmanbrothers.com';
const BUSINESS_PHONE_DISPLAY = '503-310-4757';
const BUSINESS_PHONE_TEL = '5033104757';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELDS = [
  { id: 'name', type: 'text', label: 'Your Name', required: true, autoComplete: 'name' },
  { id: 'phone', type: 'tel', label: 'Phone Number', required: true, autoComplete: 'tel' },
  { id: 'email', type: 'email', label: 'Email (optional)', required: false, autoComplete: 'email' },
] as const;

export default function Contact() {
  const { ref, isInView } = useScrollReveal();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real users won't fill a hidden field.
    if (String(data.get('company') ?? '').length > 0) {
      setStatus('sent');
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `New project inquiry from ${name || 'a website visitor'}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      '',
      'Project details:',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Detect whether the mailto opens a client. If the tab stays focused we
    // assume nothing happened and fall back to the error state with contact info.
    const startTs = Date.now();
    const onBlur = () => {
      setStatus('sent');
      window.removeEventListener('blur', onBlur);
    };
    window.addEventListener('blur', onBlur);

    try {
      window.location.href = mailto;
    } catch {
      setStatus('error');
      setErrorMessage(
        `We couldn't open your email app. Please email ${BUSINESS_EMAIL} or call ${BUSINESS_PHONE_DISPLAY}.`,
      );
      return;
    }

    // If the browser never blurred within 1.2s, assume mailto was blocked.
    setTimeout(() => {
      if (Date.now() - startTs >= 1000) {
        window.removeEventListener('blur', onBlur);
        setStatus((prev) => (prev === 'sending' ? 'error' : prev));
        setErrorMessage(
          `If your email app didn't open, please email ${BUSINESS_EMAIL} directly or call ${BUSINESS_PHONE_DISPLAY}. Your message is still in the form above.`,
        );
      }
    }, 1500);
  }

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%]">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 min-w-0"
          >
            <div>
              <p className="font-heading text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
                Get In Touch
              </p>
              <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.75vw,3rem)] leading-none uppercase text-primary max-w-[18ch]">
                Tell Us About Your Project
              </h2>
            </div>
            <p className="text-base text-text-muted leading-relaxed">
              Deck, fence, patio, or a whole-home remodel &mdash; we&apos;d love to hear the plan
              and get you a fair number.
            </p>

            <div className="flex flex-col gap-4 min-w-0">
              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                className="flex items-center gap-4 text-lg font-heading font-medium hover:text-accent transition-colors focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span
                  aria-hidden="true"
                  className="w-11 h-11 bg-surface-alt border border-border rounded-full flex items-center justify-center shrink-0"
                >
                  <Phone size={18} />
                </span>
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-start sm:items-center gap-4 text-base sm:text-lg font-heading font-medium hover:text-accent transition-colors focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent min-w-0"
              >
                <span
                  aria-hidden="true"
                  className="w-11 h-11 bg-surface-alt border border-border rounded-full flex items-center justify-center shrink-0"
                >
                  <Mail size={18} />
                </span>
                <span className="break-all min-w-0">{BUSINESS_EMAIL}</span>
              </a>
            </div>

            <div className="mt-2 pt-4 border-t border-border text-sm text-text-muted flex flex-col gap-1">
              <p><strong>Location:</strong> Tigard, OR</p>
              <p><strong>Serving:</strong> Washington County &amp; the greater Portland metro</p>
              <p><strong>License:</strong> CCB #260013 &middot; Bonded &amp; Insured</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="bg-surface p-6 sm:p-8 md:p-10 rounded-lg border border-border"
          >
            {/* Honeypot — hidden from real users + assistive tech */}
            <div aria-hidden="true" className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" style={{ left: '-9999px' }}>
              <label htmlFor="company">Company (leave blank)</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {FIELDS.map((field) => (
              <div key={field.id} className="relative mb-6">
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder=" "
                  required={field.required}
                  autoComplete={field.autoComplete}
                  inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                  className="peer w-full py-4 bg-transparent border-b-2 border-border font-body text-base text-text
                             focus:outline-none focus:border-accent transition-colors"
                />
                <label
                  htmlFor={field.id}
                  className="absolute top-4 left-0 text-base text-text-muted pointer-events-none
                             transition-all duration-200
                             peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-accent peer-focus:tracking-wide
                             peer-not-placeholder-shown:top-[-0.75rem] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-accent peer-not-placeholder-shown:tracking-wide"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="relative mb-6">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder=" "
                required
                className="peer w-full py-4 bg-transparent border-b-2 border-border font-body text-base text-text
                           focus:outline-none focus:border-accent transition-colors resize-y min-h-[6rem]"
              />
              <label
                htmlFor="message"
                className="absolute top-4 left-0 text-base text-text-muted pointer-events-none
                           transition-all duration-200
                           peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-accent peer-focus:tracking-wide
                           peer-not-placeholder-shown:top-[-0.75rem] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-accent peer-not-placeholder-shown:tracking-wide"
              >
                Tell Us About Your Project
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className={`w-full inline-flex items-center justify-center gap-2 px-7 py-3
                         font-heading text-sm font-bold uppercase tracking-[0.08em] rounded-sm
                         transition-all duration-200 cursor-pointer disabled:cursor-not-allowed
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                         ${status === 'sent'
                           ? 'bg-green-700 border-2 border-green-700 text-white'
                           : 'bg-dark border-2 border-dark text-white hover:bg-dark-light hover:border-dark-light hover:-translate-y-0.5 hover:shadow-lg'
                         }`}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Opening your email\u2026'}
              {status === 'sent' && '\u2713 Sent — send from your email app'}
              {status === 'error' && 'Try Again'}
            </button>

            <div aria-live="polite" className="mt-3 text-center min-h-[1.25rem]">
              {status === 'idle' && (
                <p className="text-xs text-text-muted">
                  Submitting will open your email app with the message pre-filled.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-600 leading-relaxed">{errorMessage}</p>
              )}
              {status === 'sent' && (
                <p className="text-xs text-green-700">
                  Thanks — we&apos;ll get back to you shortly.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
