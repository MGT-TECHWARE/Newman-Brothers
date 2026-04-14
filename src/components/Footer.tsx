const LOGO_URL = '/images/logo-dark-bg.png';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const CONTACT_LINKS = [
  { label: '503-310-4757', href: 'tel:5033104757' },
  { label: 'todd@newmanbrothers.com', href: 'mailto:todd@newmanbrothers.com' },
  { label: 'Tigard, OR', href: null },
  { label: 'CCB #260013', href: null },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-10 sm:py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto w-[92%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1.4fr] gap-8 md:gap-10 pb-6 sm:pb-8 border-b border-white/10 mb-6 sm:mb-8">
          <div>
            <img
              src={LOGO_URL}
              alt="Newman Brothers LLC"
              width={280}
              height={232}
              className="h-14 sm:h-16 mb-3 w-auto"
            />
            <p className="text-xs sm:text-sm opacity-70 leading-relaxed max-w-[40ch]">
              Tigard&apos;s trusted builder for decks, fences, concrete, and remodels.
              Expert craftsmanship, friendly service, and a handshake at the end.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-accent mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-accent mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm opacity-75">
              {CONTACT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="hover:opacity-100 hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-sm break-all"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 text-xs opacity-60">
          <p>&copy; {year} Newman Brothers LLC. All rights reserved.</p>
          <p>Tigard, OR &middot; Bonded &amp; Insured &middot; CCB #260013</p>
        </div>
      </div>
    </footer>
  );
}
