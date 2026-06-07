import type { OutfitOccasion } from '../types'

const occasions: { id: OutfitOccasion; label: string }[] = [
  { id: 'casual', label: 'Casual' },
  { id: 'formal', label: 'Formal' },
  { id: 'party', label: 'Party' },
  { id: 'workout', label: 'Workout' },
]

interface OccasionFilterTabsProps {
  active: OutfitOccasion
  onChange: (occasion: OutfitOccasion) => void
}

export function OccasionFilterTabs({ active, onChange }: OccasionFilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter outfits by occasion"
    >
      {occasions.map(({ id, label }) => {
        const isActive = active === id

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out sm:px-5 ${
              isActive
                ? 'border-[#00F0A0]/45 bg-[#00F0A0]/12 text-[#00F0A0] shadow-[0_0_24px_rgba(0,240,160,0.18)] hover:scale-[1.02]'
                : 'border-slate-700/60 bg-slate-800/40 text-slate-400 hover:scale-[1.02] hover:border-slate-600 hover:bg-slate-800/70 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
