import { cn } from "@/lib/utils";

interface SectionProps {
  variant: 'light' | 'dark';
  knight?: {
    src: string;
    position: 'left' | 'right';
    flip?: boolean;
    hero?: boolean; // Make knight bigger for hero sections
  };
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ variant, knight, label, children, className }: SectionProps) {
  return (
    <section className={cn(
      'section',
      variant === 'light' ? 'section-light' : 'section-dark',
      className
    )}>
      {knight && (
        <img
          src={`/assets/images/${knight.src}`}
          alt=""
          loading="lazy"
          className={cn(
            knight.hero ? 'hero-knight' : 'knight-companion',
            knight.position === 'left' ? 'left-[60px]' : 'right-[60px]',
            'bottom-[40px]',
            knight.flip && 'scale-x-[-1]'
          )}
        />
      )}
      {label && <span className="section-label">{label}</span>}
      <div className="relative z-20">
        {children}
      </div>
    </section>
  );
}
