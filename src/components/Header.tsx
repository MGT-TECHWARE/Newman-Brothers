import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  // Close the menu when the viewport crosses into desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Escape closes + returns focus to the hamburger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => hamburgerRef.current?.focus());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  function handleLogoClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 text-white py-3 md:py-4
          ${scrolled
            ? 'bg-black/90 backdrop-blur-md shadow-lg'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent'}`}
      >
        <div className="max-w-[1280px] mx-auto w-[92%] flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded relative z-10"
            aria-label="Newman Brothers LLC — back to top"
          >
            <img
              src="/images/logo-dark-bg.png"
              alt="Newman Brothers LLC"
              width={280}
              height={232}
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-heading font-medium uppercase tracking-[0.1em] text-sm relative
                           after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5
                           after:bg-accent after:scale-x-0 after:origin-right after:transition-transform after:duration-200
                           hover:after:scale-x-100 hover:after:origin-left
                           focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
              >
                {label}
              </a>
            ))}
            <a
              href="tel:5033104757"
              className="inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.1em]
                         bg-accent text-black border-2 border-accent rounded-sm
                         hover:bg-accent-hover hover:border-accent-hover transition-all duration-200"
            >
              503-310-4757
            </a>
          </nav>

          {/* Mobile hamburger toggle */}
          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden relative z-[70] text-white p-3 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay — rendered OUTSIDE the header so backdrop-filter on the header
          can't trap it inside a containing block. */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-0 z-[60] bg-black text-white transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 pb-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenu();
          }}
        >
          <nav className="flex flex-col items-center gap-7" aria-label="Mobile">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="font-heading font-medium uppercase tracking-[0.15em] text-3xl text-white
                           hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="tel:5033104757"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 font-heading text-base font-bold uppercase tracking-[0.1em]
                         bg-accent text-black border-2 border-accent rounded-sm
                         hover:bg-accent-hover hover:border-accent-hover transition-all duration-200"
            >
              <Phone size={18} aria-hidden="true" />
              503-310-4757
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
