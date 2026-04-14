import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_SLIDES = [
  {
    src: '/images/hero-1-backyard.jpg',
    alt: '',
  },
  {
    src: '/images/hero-2-concrete.jpg',
    alt: '',
  },
  {
    src: '/images/hero-3-multi-deck.jpg',
    alt: '',
  },
  {
    src: '/images/hero-4-gazebo.jpg',
    alt: '',
  },
];

const ROTATION_MS = 6000;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Hero() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  // Autoplay — respects reduced-motion and tab visibility.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (HERO_SLIDES.length <= 1) return;

    let interval: number | undefined;
    const start = () => {
      if (interval !== undefined) return;
      interval = window.setInterval(() => {
        setIsFirstSlide(false);
        setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
      }, ROTATION_MS);
    };
    const stop = () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
        interval = undefined;
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Parallax — image moves UP slower than page scroll (classic parallax).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (imgWrapRef.current && window.scrollY < window.innerHeight * 1.2) {
            imgWrapRef.current.style.transform = `translate3d(0, ${-window.scrollY * 0.18}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = HERO_SLIDES[slideIndex];

  return (
    <section className="relative min-h-svh flex items-center justify-center text-white overflow-hidden bg-dark">
      {/* Oversized wrapper so negative parallax never exposes the dark bg. */}
      <div
        ref={imgWrapRef}
        className="absolute inset-x-0 -top-[20%] h-[140%] will-change-transform"
        aria-hidden="true"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            // First slide renders at full opacity immediately so LCP is not delayed.
            initial={isFirstSlide ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{
              opacity: { duration: isFirstSlide ? 0 : 1.4, ease: 'easeInOut' },
              scale: { duration: 7, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            loading="eager"
            fetchPriority="high"
          />
        </AnimatePresence>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto w-[92%] text-center flex flex-col items-center justify-center pt-24 sm:pt-28 pb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-sm sm:text-base font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-accent mb-4 sm:mb-6 text-center"
        >
          Tigard, Oregon &middot; CCB #260013
        </motion.p>

        <h1 className="font-heading text-[clamp(3rem,2rem+7vw,8.5rem)] leading-[0.9] uppercase tracking-tight mb-6 sm:mb-8 max-w-[18ch] text-center mx-auto">
          {['Expert', 'Craftsmanship', 'Built to Last'].map((text, i) => (
            <span key={text} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${i === 2 ? 'text-accent' : ''}`}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5 sm:gap-6 w-full"
        >
          <p className="text-lg sm:text-xl md:text-2xl max-w-[56ch] leading-relaxed opacity-90 px-2 text-center mx-auto">
            Custom decks, fences, concrete, and remodels &mdash; built for the Pacific
            Northwest and backed by a handshake.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 font-heading text-sm font-bold uppercase tracking-[0.08em]
                         bg-accent text-black border-2 border-accent rounded-sm
                         hover:bg-accent-hover hover:border-accent-hover hover:-translate-y-0.5 hover:shadow-lg
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                         transition-all duration-200"
            >
              Get a Free Quote
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 font-heading text-sm font-bold uppercase tracking-[0.08em]
                         bg-transparent text-white border-2 border-white/40 rounded-sm
                         hover:bg-white hover:text-primary hover:border-white
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                         transition-all duration-200"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
