import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function CtaBanner() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="bg-dark text-white text-center py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(244,196,66,0.08)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-[1280px] mx-auto w-[92%] relative z-10"
      >
        <h2 className="font-heading text-[clamp(1.875rem,1.4rem+3vw,4.5rem)] leading-[1.05] uppercase mb-3 max-w-[22ch] mx-auto">
          Let&apos;s Build Something.
        </h2>
        <p className="text-base sm:text-lg opacity-70 mb-6 sm:mb-8 max-w-[50ch] mx-auto leading-relaxed">
          Free estimates, straight answers, no pressure. Tell us what you&apos;re thinking
          and we&apos;ll tell you what it takes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 font-heading text-sm font-bold uppercase tracking-[0.08em]
                       bg-accent text-black border-2 border-accent rounded-sm
                       hover:bg-accent-hover hover:border-accent-hover hover:-translate-y-0.5 hover:shadow-lg
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                       transition-all duration-200"
          >
            Start Your Project
          </a>
          <a
            href="tel:5033104757"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 font-heading text-sm font-bold uppercase tracking-[0.08em]
                       bg-transparent text-white border-2 border-white/40 rounded-sm
                       hover:bg-white hover:text-primary hover:border-white
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                       transition-all duration-200"
          >
            Call 503-310-4757
          </a>
        </div>
      </motion.div>
    </section>
  );
}
