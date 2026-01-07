import { cn } from "@/lib/utils";

interface WeekData {
  number: number;
  title: string;
  muscle: string;
  description: string;
}

const weeks: WeekData[] = [
  {
    number: 1,
    title: "Ride the Wave",
    muscle: "COMPLETION",
    description: "Never stop. Never cut. Just keep going. From day one, you build the habit of finishing no matter what happens."
  },
  {
    number: 2,
    title: "The Lens",
    muscle: "CAMERA INTIMACY",
    description: "Learn to talk TO the lens. Know who it is. The camera stops being a judge and becomes a scene partner."
  },
  {
    number: 3,
    title: "Mess Up On Purpose",
    muscle: "PERMISSION TO FAIL",
    description: "Be terrible. Do your worst accent. Make yourself laugh. Your inner child who used to play without fear? We're bringing them back."
  },
  {
    number: 4,
    title: "The Frame",
    muscle: "TECHNICAL AWARENESS",
    description: "Now — after psychological safety — you learn the technical craft. Blocking. Eye lines. Using the frame."
  },
  {
    number: 5,
    title: "Ears Wide Open",
    muscle: "LISTENING",
    description: "Reader behind you so you can't see them. Discover how interesting you are when you listen."
  },
  {
    number: 6,
    title: "Integration",
    muscle: "ALL OF IT",
    description: "Put it together. Use all your muscles. Free play. Your final tapes. See who you've become."
  }
];

interface SixMusclesSectionProps {
  className?: string;
}

export function SixMusclesSection({ className }: SixMusclesSectionProps) {
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <h2 className="text-3xl md:text-4xl font-heading text-center mb-12 md:mb-16">
        Each week builds one muscle. Through action, not theory.
      </h2>

      <div className="space-y-6">
        {weeks.map((week) => (
          <div
            key={week.number}
            className="border-l-4 border-[var(--color-gold)] bg-parchment/30 p-6 md:p-8 rounded-r-lg hover:bg-parchment/50 transition-colors"
          >
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-sm font-sans font-bold text-[var(--color-gold)] uppercase tracking-wider">
                Week {week.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading">
                {week.title}
              </h3>
            </div>

            <div className="mb-3">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[var(--color-coral)] opacity-90">
                The muscle: {week.muscle}
              </span>
            </div>

            <p className="text-base md:text-lg font-body leading-relaxed text-ink/90">
              {week.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
