import { useEffect, useRef } from 'react';

interface SectionTransitionProps {
  variant?: 'light-to-dark' | 'dark-to-light';
}

/**
 * RED ANTLER: Atmospheric section transition with subtle gradient fade
 * Creates premium depth between sections
 */
export function SectionTransition({ variant = 'light-to-dark' }: SectionTransitionProps) {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('transition-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const gradientClass = variant === 'light-to-dark'
    ? 'from-ivory via-parchment to-[var(--color-deep-charcoal)]'
    : 'from-[var(--color-deep-charcoal)] via-[#3A3A3A] to-ivory';

  return (
    <div
      ref={transitionRef}
      className={`relative h-32 md:h-40 transition-opacity duration-1000 opacity-0 ${gradientClass}`}
      style={{
        background: `linear-gradient(to bottom, ${
          variant === 'light-to-dark'
            ? 'hsl(var(--ivory)), hsl(var(--parchment)), var(--color-deep-charcoal)'
            : 'var(--color-deep-charcoal), #3A3A3A, hsl(var(--ivory))'
        })`,
      }}
    >
      {/* Subtle atmospheric particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-coral/20 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-bluebird/20 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
}

// Utility class for visibility animation
const style = document.createElement('style');
style.textContent = `
  .transition-visible {
    opacity: 1 !important;
  }
`;
document.head.appendChild(style);





