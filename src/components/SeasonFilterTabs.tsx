import type { Season } from '../types'

const seasons: { id: Season; label: string; icon: string }[] = [
  { id: 'summer', label: 'Summer', icon: '☀️' },
  { id: 'winter', label: 'Winter', icon: '❄️' },
  { id: 'rainy', label: 'Rainy', icon: '🌧️' },
]

interface SeasonFilterTabsProps {
  active: Season
  onChange: (season: Season) => void
}

export function SeasonFilterTabs({ active, onChange }: SeasonFilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter outfits by season"
    >
      {seasons.map(({ id, label, icon }) => {
        const isActive = active === id

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out sm:px-5 ${
              isActive
                ? 'border-[#00F0A0]/45 bg-[#00F0A0]/12 text-[#00F0A0] shadow-[0_0_24px_rgba(0,240,160,0.18)] hover:scale-[1.02]'
                : 'border-slate-700/60 bg-slate-800/40 text-slate-400 hover:scale-[1.02] hover:border-slate-600 hover:bg-slate-800/70 hover:text-slate-200'
            }`}
          >
            <span className="text-base leading-none" aria-hidden>
              {icon}
            </span>
            {label}
          </button>
        )
      })}
    </div>
  )
}
