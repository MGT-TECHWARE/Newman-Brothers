import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ABOUT_IMAGE = '/images/about.jpg';

export default function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%]">
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-lg overflow-hidden"
          >
            <img
              src={ABOUT_IMAGE}
              alt="Newman Brothers crew framing a low-profile wooden deck"
              loading="lazy"
              width={960}
              height={720}
              className="w-full h-full min-h-[280px] sm:min-h-[350px] md:min-h-[400px] object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-accent text-black px-4 py-2 sm:px-5 sm:py-3 rounded-sm">
              <div className="font-heading text-2xl sm:text-3xl font-bold leading-none">15+</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.1em] opacity-90">Years in Tigard</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            <div>
              <p className="font-heading text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
                Who We Are
              </p>
              <h2 className="font-heading text-[clamp(2.25rem,1.6rem+3.25vw,4.5rem)] leading-none uppercase text-primary">
                Precision Work.<br />Friendly Service.
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed">
              Newman Brothers LLC is a family-run Tigard outfit building outdoor spaces
              that stand up to Oregon weather and raise the standard of every block we
              work on.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              From cedar decks and privacy fences to stamped concrete and full restorations,
              we handle every detail in-house &mdash; clean job site, straight cuts,
              and a handshake at the end.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
              {['Licensed CCB #260013', 'Bonded & Insured', 'Free Estimates'].map((badge) => (
                <span
                  key={badge}
                  className="font-heading text-xs sm:text-sm font-medium text-primary bg-surface px-3 py-1.5 sm:px-4 sm:py-2
                             border border-border rounded-sm tracking-wide"
                >
                  &#10003; {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
