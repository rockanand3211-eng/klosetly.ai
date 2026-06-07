import type { Season } from '../types'
import { SeasonFilterTabs } from './SeasonFilterTabs'

interface SeasonalOutfitsSectionProps {
  selectedSeason: Season
  onSeasonChange: (season: Season) => void
}

export function SeasonalOutfitsSection({
  selectedSeason,
  onSeasonChange,
}: SeasonalOutfitsSectionProps) {
  return (
    <div className="space-y-5 border-b border-slate-800/80 pb-8">
      <div className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Post-Optimization Edit
        </p>
        <p className="text-sm text-slate-400">
          Season-aware looks tuned to your completed style profile.
        </p>
      </div>

      <SeasonFilterTabs active={selectedSeason} onChange={onSeasonChange} />
    </div>
  )
}
