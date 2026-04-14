import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const BG_IMAGE = '/images/gallery-cedar.jpg';

export default function ParallaxQuote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={ref}
      aria-label="Our promise to every customer"
      className="relative min-h-[60svh] md:min-h-[70svh] overflow-hidden flex items-center text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 will-change-transform" aria-hidden="true">
        <img
          src={BG_IMAGE}
          alt=""
          loading="lazy"
          width={1920}
          height={1280}
          className="w-full h-[120%] object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 -z-10" />

      <div className="relative z-10 max-w-[1280px] mx-auto w-[92%] grid md:grid-cols-12 gap-6 py-20 sm:py-24 md:py-32">
        <div className="md:col-span-8 lg:col-span-7">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span aria-hidden="true" className="h-px flex-none w-10 sm:w-16 bg-accent" />
            <p className="font-heading text-xs sm:text-sm tracking-[0.3em] uppercase text-accent">
              Our Promise
            </p>
          </div>
          <blockquote className="font-heading text-[clamp(2rem,1.2rem+4.5vw,5rem)] leading-[0.98] uppercase tracking-tight">
            Straight cuts,<br />
            clean sites,<br />
            <span className="text-accent">solid handshake.</span>
          </blockquote>
          <p className="mt-8 sm:mt-10 text-base sm:text-lg text-white/80 max-w-[52ch] leading-relaxed">
            That&apos;s the promise every Newman Brothers job is built on &mdash; and the
            reason most of our work comes from the neighbor of somebody we built for
            last year.
          </p>
          <footer className="mt-8 sm:mt-10 flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-white/70">
            <span aria-hidden="true" className="h-px w-8 bg-white/40" />
            Todd Newman &middot; Owner
          </footer>
        </div>
      </div>
    </section>
  );
}
