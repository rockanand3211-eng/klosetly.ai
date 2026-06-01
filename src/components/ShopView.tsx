import { useMemo, useState } from 'react'
import { premiumOutfits } from '../data/premiumOutfits'
import { OutfitSetGrid } from './OutfitSetGrid'

export function ShopView() {
  const categories = useMemo(
    () => ['All', ...new Set(premiumOutfits.map((o) => o.category))],
    [],
  )
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? premiumOutfits
      : premiumOutfits.filter((o) => o.category === activeCategory)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-serif text-3xl font-semibold text-[#2C4A3F] sm:text-4xl">
          Shop All
        </h1>
        <div className="flex flex-wrap gap-3 font-sans text-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`font-medium transition-colors ${
                activeCategory === cat
                  ? 'text-[#2C4A3F] underline decoration-[#2C4A3F] decoration-2 underline-offset-4'
                  : 'text-[#64748B] hover:text-[#2C4A3F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <OutfitSetGrid
        currentView="shop"
        outfits={filtered}
        ariaLabel="Premium editorial outfit sets available for purchase"
      />
    </div>
  )
}
