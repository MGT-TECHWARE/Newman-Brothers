import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: 'Newman Brothers rebuilt our back deck and cedar fence in a single week. The cuts are tight, the railings are plumb, and the yard was cleaner when they left than when they showed up. True pros.',
    name: 'Ryan T.',
    role: 'Homeowner, Tigard',
  },
  {
    text: "We got three quotes. Todd was the only one who walked the whole property, explained the material trade-offs, and stuck to his number. The concrete patio looks better than we imagined.",
    name: 'Melissa & Greg H.',
    role: 'Homeowners, Beaverton',
  },
  {
    text: 'Crew showed up on time every morning, hit every milestone, and the pergola they built is a showpiece. You can tell they care about the craft. Hiring them again for the deck refinish.',
    name: 'David K.',
    role: 'Homeowner, Lake Oswego',
  },
];

export default function Testimonials() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-surface-alt py-16 sm:py-20 md:py-28">
      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="font-heading text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
            What Neighbors Say
          </p>
          <h2 className="font-heading text-[clamp(1.875rem,1.4rem+3vw,4.5rem)] leading-none uppercase text-primary">
            Trusted Around Tigard
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="bg-surface p-5 sm:p-6 rounded-lg border border-border flex flex-col gap-3 sm:gap-4"
            >
              <div
                role="img"
                aria-label="5 out of 5 stars"
                className="flex gap-1 text-accent"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]" />
                ))}
              </div>
              <blockquote className="text-sm sm:text-base leading-relaxed italic flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-border">
                <div>
                  <div className="font-heading text-sm sm:text-base font-bold uppercase tracking-wide text-primary">
                    {t.name}
                  </div>
                  <div className="text-xs text-text-muted">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
