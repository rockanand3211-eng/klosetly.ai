import { premiumOutfits } from '../data/premiumOutfits'
import type { GridViewContext, PremiumOutfit } from '../types'
import { OutfitSetCard } from './OutfitSetCard'

interface OutfitSetGridProps {
  currentView: GridViewContext
  outfits?: PremiumOutfit[]
  ariaLabel: string
  onOutfitAction?: (outfit: PremiumOutfit) => void
}

export function OutfitSetGrid({
  currentView,
  outfits = premiumOutfits,
  ariaLabel,
  onOutfitAction,
}: OutfitSetGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      role="region"
      aria-label={ariaLabel}
    >
      {outfits.map((outfit, index) => (
        <OutfitSetCard
          key={outfit.id}
          outfit={outfit}
          currentView={currentView}
          staggerIndex={index % 6}
          onAction={onOutfitAction}
        />
      ))}
    </div>
  )
}
