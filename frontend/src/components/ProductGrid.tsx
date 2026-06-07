import { useMemo, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { outfitsDataset } from '@data/outfitsData'
import type {
  CollectionGender,
  Outfit,
  OutfitGarmentCategory,
  OutfitOccasion,
  ProductCategory,
  Season,
} from '../types'
import { ClothingCard } from './ClothingCard'
import { FilterChips } from './FilterChips'
import { GenderSwitcher } from './GenderSwitcher'
import { OccasionFilterTabs } from './OccasionFilterTabs'
import { SeasonFilterTabs } from './SeasonFilterTabs'
import { SeasonalOutfitsSection } from './SeasonalOutfitsSection'

interface ProductGridProps {
  gender: CollectionGender
  onGenderChange: (gender: CollectionGender) => void
  category: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  showHeader?: boolean
  isProfileComplete?: boolean
  onAddToBag: (outfit: Outfit) => void
}

const categoryMap: Record<
  Exclude<ProductCategory, 'all'>,
  OutfitGarmentCategory
> = {
  tops: 'topwear',
  bottoms: 'bottomwear',
  accessories: 'accessories',
}

export function ProductGrid({
  gender,
  onGenderChange,
  category,
  onCategoryChange,
  showHeader = true,
  isProfileComplete = false,
  onAddToBag,
}: ProductGridProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season>('summer')
  const [selectedOccasion, setSelectedOccasion] = useState<OutfitOccasion>('casual')

  const filtered = useMemo(
    () =>
      outfitsDataset.filter((item) => {
        if (
          item.gender !== gender ||
          item.season !== selectedSeason ||
          item.occasion !== selectedOccasion
        ) {
          return false
        }
        if (category === 'all') return true
        return item.category === categoryMap[category]
      }),
    [gender, category, selectedSeason, selectedOccasion],
  )

  const seasonOccasionFilters = (
    <div className="space-y-3">
      <SeasonFilterTabs active={selectedSeason} onChange={setSelectedSeason} />
      <OccasionFilterTabs active={selectedOccasion} onChange={setSelectedOccasion} />
    </div>
  )

  return (
    <section className="mt-2 scroll-mt-6">
      <div className="mb-6">
        <GenderSwitcher active={gender} onChange={onGenderChange} />
      </div>

      {showHeader && (
        <div className="mb-8 space-y-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <TrendingUp className="h-5 w-5 shrink-0 text-emerald-400" />
            {gender === 'men' ? "Men's Picks For You" : "Women's Picks For You"}
          </h2>

          {isProfileComplete ? (
            <div className="space-y-5 border-b border-slate-800/80 pb-8">
              <SeasonalOutfitsSection
                selectedSeason={selectedSeason}
                onSeasonChange={setSelectedSeason}
              />
              <OccasionFilterTabs
                active={selectedOccasion}
                onChange={setSelectedOccasion}
              />
            </div>
          ) : (
            seasonOccasionFilters
          )}

          <FilterChips active={category} onChange={onCategoryChange} />
        </div>
      )}

      {!showHeader && (
        <div className="mb-8 space-y-6">
          {seasonOccasionFilters}
          <FilterChips active={category} onChange={onCategoryChange} />
        </div>
      )}

      <div
        key={`${selectedSeason}-${selectedOccasion}-${gender}-${category}`}
        className="season-grid-enter grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        role="tabpanel"
        aria-label={`${selectedSeason} ${selectedOccasion} ${gender} outfits`}
      >
        {filtered.length > 0 ? (
          filtered.map((outfit, index) => (
            <ClothingCard
              key={outfit.id}
              outfit={outfit}
              staggerIndex={index % 6}
              onAddToBag={onAddToBag}
            />
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-slate-800 bg-slate-800/40 px-6 py-10 text-center text-sm text-slate-400">
            No items match this season and occasion. Try another filter.
          </p>
        )}
      </div>
    </section>
  )
}
