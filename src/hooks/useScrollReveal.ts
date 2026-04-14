import { useRef } from 'react';
import { useInView } from 'motion/react';

export function useScrollReveal(margin: string = '-60px') {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });
  return { ref, isInView };
}
