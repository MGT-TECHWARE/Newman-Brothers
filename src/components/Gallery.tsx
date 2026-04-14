import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const GALLERY_ITEMS = [
  {
    src: '/images/gallery-deck-multi.jpg',
    alt: 'Multi-level wooden deck with integrated stairs',
    label: 'Multi-Level Deck',
    span: 'md:col-span-2',
  },
  {
    src: '/images/gallery-cedar.jpg',
    alt: 'Tight grain on newly-installed wooden deck boards',
    label: 'Cedar Decking',
    span: 'md:row-span-2',
  },
  {
    src: '/images/gallery-gazebo.jpg',
    alt: 'Wooden deck integrated with matching gazebo',
    label: 'Deck & Gazebo',
    span: '',
  },
  {
    src: '/images/gallery-backyard.jpg',
    alt: 'Large backyard deck furnished with outdoor seating',
    label: 'Backyard Build',
    span: '',
  },
  {
    src: '/images/gallery-concrete.jpg',
    alt: 'Freshly finished concrete patio',
    label: 'Concrete Patio',
    span: '',
  },
  {
    src: '/images/gallery-pergola.jpg',
    alt: 'White timber pergola attached to house',
    label: 'Pergola',
    span: 'md:col-span-2',
  },
];

export default function Gallery() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-28">
      <div ref={ref} className="max-w-[1280px] mx-auto w-[92%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <p className="font-heading text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
            Recent Work
          </p>
          <h2 className="font-heading text-[clamp(1.875rem,1.4rem+3vw,4.5rem)] leading-none uppercase text-primary mb-2">
            The Portfolio
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-[55ch] leading-relaxed">
            Real projects. Real Tigard neighborhoods. Judge for yourself.
          </p>
        </motion.div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:auto-rows-[280px]"
          style={{ gridAutoFlow: 'dense' }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.li
              key={item.alt}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={`group relative overflow-hidden rounded-lg min-h-[220px] sm:min-h-[220px] md:min-h-[220px] bg-surface-alt ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
                <span className="text-white font-heading text-sm sm:text-base md:text-lg font-medium uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
