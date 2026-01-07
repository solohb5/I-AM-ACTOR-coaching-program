import { cn } from "@/lib/utils";

interface Milestone {
  tapes: number;
  badge: string;
  unlock: string;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  { tapes: 1, badge: "🎬 First Take", unlock: "You're not a dreamer anymore" },
  { tapes: 5, badge: "🌱 Seedling", unlock: "In motion" },
  { tapes: 10, badge: "🛡️ Squire", unlock: "COMMUNITY ACCESS" },
  { tapes: 15, badge: "⚔️ Knight", unlock: "Bonus content + AI coaches" },
  { tapes: 20, badge: "🏰 Knight Captain", unlock: "Jam session VIP" },
  { tapes: 25, badge: "🔥 Knight Commander", unlock: "Final push" },
  { tapes: 30, badge: "🔴 RED KNIGHT", unlock: "$365 credit + Wall + Everything", highlight: true }
];

interface MilestoneTableProps {
  className?: string;
}

export function MilestoneTable({ className }: MilestoneTableProps) {
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {/* Desktop: Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--color-gold)]">
              <th className="text-left font-heading text-lg pb-4 px-4">Tapes</th>
              <th className="text-left font-heading text-lg pb-4 px-4">Badge</th>
              <th className="text-left font-heading text-lg pb-4 px-4">What Unlocks</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <tr
                key={milestone.tapes}
                className={cn(
                  "border-b border-ink/10 transition-colors",
                  milestone.highlight
                    ? "bg-[var(--color-gold)]/10 hover:bg-[var(--color-gold)]/20"
                    : "hover:bg-parchment/30"
                )}
              >
                <td className="font-sans font-bold text-[var(--color-coral)] py-4 px-4">
                  {milestone.tapes}
                </td>
                <td className="font-body text-lg py-4 px-4">
                  {milestone.badge}
                </td>
                <td className={cn(
                  "font-body py-4 px-4",
                  milestone.highlight && "font-bold text-[var(--color-gold)]"
                )}>
                  {milestone.unlock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card Layout */}
      <div className="md:hidden space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.tapes}
            className={cn(
              "p-4 rounded-lg border",
              milestone.highlight
                ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)]"
                : "bg-parchment/30 border-ink/10"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans font-bold text-[var(--color-coral)] text-lg">
                {milestone.tapes} {milestone.tapes === 1 ? 'Tape' : 'Tapes'}
              </span>
              <span className="text-2xl">{milestone.badge.split(' ')[0]}</span>
            </div>
            <div className="font-body text-lg mb-1">
              {milestone.badge}
            </div>
            <div className={cn(
              "font-body text-sm",
              milestone.highlight ? "font-bold text-[var(--color-gold)]" : "text-ink/70"
            )}>
              {milestone.unlock}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-heading text-2xl mt-8 text-[var(--color-gold)]">
        Nobody fails. Everyone climbs.
      </p>
    </div>
  );
}
