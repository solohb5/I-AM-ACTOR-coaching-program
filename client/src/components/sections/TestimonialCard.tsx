import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  attribution: string;
  photo?: string;
  className?: string;
}

export function TestimonialCard({ quote, attribution, photo, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-parchment/40 p-6 md:p-8 rounded-lg border border-ink/10",
      "hover:bg-parchment/60 transition-colors",
      className
    )}>
      {photo && (
        <div className="mb-4">
          <img
            src={photo}
            alt={attribution}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      )}

      <blockquote className="mb-4">
        <p className="text-base md:text-lg font-body leading-relaxed text-ink italic">
          "{quote}"
        </p>
      </blockquote>

      <cite className="not-italic text-sm font-sans text-ink/70">
        — {attribution}
      </cite>
    </div>
  );
}
