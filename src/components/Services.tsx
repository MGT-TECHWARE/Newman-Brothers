import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SERVICES = [
  {
    number: '01',
    title: 'Custom Decks',
    description:
      'Cedar, composite, and hardwood decks engineered for the Pacific Northwest — cable railings, multi-level layouts, integrated lighting.',
    image: '/images/service-decks.jpg',
    alt: 'Composite deck with modern metal railing',
  },
  {
    number: '02',
    title: 'Fences',
    description:
      'Privacy, perimeter, and accent fencing in cedar, vinyl, and metal — built plumb, dug deep, and finished to last.',
    image: '/images/service-fences.jpg',
    alt: 'Cedar privacy fence installation',
  },
  {
    number: '03',
    title: 'Concrete',
    description:
      'Walkways, patios, slabs, and stamped concrete. Clean pours, proper prep, and finishes that hold up to the rain.',
    image: '/images/service-concrete.jpg',
    alt: 'Freshly poured concrete patio',
  },
  {
    number: '04',
    title: 'Remodels',
    description:
      'Interior and exterior remodels — kitchens, baths, siding, trim, and everything in between. One crew, start to finish.',
    image: '/images/service-remodels.jpg',
    alt: 'Multi-level deck remodel with integrated stairs',
  },
  {
    number: '05',
    title: 'Restoration',
    description:
      'Deck and concrete cleaning, sanding, staining, and sealing. Protect the investment you already made.',
    image: '/images/service-restoration.jpg',
    alt: 'Floor sander refinishing a wooden deck',
  },
  {
    number: '06',
    title: 'Structures',
    description:
      'Pergolas, patio covers, sheds, and gazebos — custom-built to match your home and your plans.',
    image: '/images/service-structures.jpg',
    alt: 'Custom gazebo attached to a backyard deck',
  },
];

export default function Services() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28">
      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <p className="font-heading text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
            What We Do
          </p>
          <h2 className="font-heading text-[clamp(1.875rem,1.4rem+3vw,4.5rem)] leading-none uppercase text-primary mb-2">
            Our Expertise
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-[55ch] leading-relaxed">
            Six trades. One crew. Every project finished to the same standard.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="group bg-surface rounded-lg overflow-hidden border border-border"
            >
              <div className="relative h-[220px] sm:h-[260px] md:h-[280px] overflow-hidden bg-surface-alt">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  width={640}
                  height={480}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 w-9 h-9 bg-accent text-black rounded-full flex items-center justify-center font-heading text-xs font-bold shadow-md"
                >
                  {service.number}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-heading text-lg sm:text-xl uppercase text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
