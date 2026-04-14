import { useEffect, useState } from 'react';

const KEYWORDS = [
  'Custom Decks',
  'Cedar Fences',
  'Stamped Concrete',
  'Full Remodels',
  'Pergolas & Patios',
  'Restoration',
];

export default function Marquee() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div
      className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12"
      aria-hidden={hidden || undefined}
    >
      {KEYWORDS.map((word) => (
        <span key={word} className="flex items-center gap-8 sm:gap-12">
          <span className="font-heading text-sm sm:text-base uppercase tracking-[0.3em] whitespace-nowrap text-text-muted">
            {word}
          </span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Services offered by Newman Brothers"
      className="bg-surface border-y border-border py-4 sm:py-5 overflow-hidden"
    >
      {reducedMotion ? (
        <div className="flex justify-center">
          <Row />
        </div>
      ) : (
        <div className="flex animate-[nb-marquee_42s_linear_infinite] will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      )}

      <style>{`
        @keyframes nb-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
