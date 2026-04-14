import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We walk the site, listen to your plan, and give you an honest, itemized estimate — usually within 48 hours.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'Materials chosen together, permits pulled, and a start date you can build your summer around.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Tight crews, clean sites, daily updates. Same two faces on your property start to finish.',
  },
  {
    number: '04',
    title: 'Walkthrough',
    description:
      "We walk the finished job with you. Punch-list closed, yard cleaned — no handoffs, no loose ends.",
  },
];

export default function Process() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-dark text-white py-20 sm:py-28 md:py-36 relative overflow-hidden">
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%] relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-16 items-end mb-14 sm:mb-20"
        >
          <div>
            <p className="font-heading text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-accent mb-3">
              How It Works
            </p>
            <h2 className="font-heading text-[clamp(2.25rem,1.5rem+4vw,5.5rem)] leading-[0.9] uppercase">
              A Process<br />Without Surprises.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-white/70 max-w-[48ch] leading-relaxed md:pb-2">
            Four steps. No runaround. No disappearing crews. You&apos;ll know exactly
            where the project stands every single day.
          </p>
        </motion.div>

        <ol className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-10 sm:gap-y-14">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="relative grid grid-cols-[auto_1fr] gap-5 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <span
                aria-hidden="true"
                className="font-heading text-[clamp(4rem,3rem+6vw,8rem)] leading-[0.8] font-bold text-accent/30 select-none tabular-nums"
              >
                {step.number}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-1 sm:pt-2">
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-[42ch]">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
