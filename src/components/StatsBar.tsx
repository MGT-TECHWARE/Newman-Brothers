import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

interface Stat {
  target: number;
  label: string;
  suffix: string;
  /** Pre-formatted final display value for the accessible label. */
  display: string;
}

const STATS: Stat[] = [
  { target: 500, label: 'Projects Completed', suffix: '+', display: '500+' },
  { target: 15, label: 'Years in Tigard', suffix: '+', display: '15+' },
  { target: 100, label: 'Happy Neighbors', suffix: '+', display: '100+' },
  { target: 5, label: 'Star Rating', suffix: '.0', display: '5.0' },
];

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  display: string;
  active: boolean;
  key?: string;
}

function StatItem({ target, suffix, label, display, active }: StatItemProps) {
  const count = useCountUp(target, active);
  return (
    <div className="text-center py-3 sm:py-4 md:border-l md:first:border-l-0 border-white/10 px-2">
      <div
        aria-hidden="true"
        className="font-heading text-[clamp(1.75rem,1.2rem+3.25vw,4.5rem)] font-bold text-accent leading-none mb-1 tabular-nums"
      >
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-[0.08em] md:tracking-[0.1em] opacity-70 leading-tight">
        <span className="sr-only">{display} </span>
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const { ref, isInView } = useScrollReveal('-20px');

  return (
    <aside ref={ref} className="bg-dark text-white py-10 sm:py-12 md:py-16" aria-label="Newman Brothers by the numbers">
      <div className="max-w-[1280px] mx-auto w-[92%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {STATS.map((stat) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              label={stat.label}
              suffix={stat.suffix}
              display={stat.display}
              active={isInView}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
