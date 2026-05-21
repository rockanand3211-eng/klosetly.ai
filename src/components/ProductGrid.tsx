import { TrendingUp } from 'lucide-react'
import { filterProducts } from '../data/products'
import type { CollectionGender, ProductCategory } from '../types'
import { FilterChips } from './FilterChips'
import { GenderSwitcher } from './GenderSwitcher'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  gender: CollectionGender
  onGenderChange: (gender: CollectionGender) => void
  category: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  showHeader?: boolean
}

export function ProductGrid({
  gender,
  onGenderChange,
  category,
  onCategoryChange,
  showHeader = true,
}: ProductGridProps) {
  const filtered = filterProducts(gender, category)

  return (
    <section className="mt-2 scroll-mt-6">
      <div className="mb-6">
        <GenderSwitcher active={gender} onChange={onGenderChange} />
      </div>

      {showHeader && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <TrendingUp className="h-5 w-5 shrink-0 text-emerald-400" />
            {gender === 'men' ? "Men's Picks For You" : "Women's Picks For You"}
          </h2>
          <FilterChips active={category} onChange={onCategoryChange} />
        </div>
      )}

      {!showHeader && (
        <div className="mb-8">
          <FilterChips active={category} onChange={onCategoryChange} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {filtered.length > 0 ? (
          filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              staggerIndex={index % 6}
            />
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-slate-800 bg-slate-800/40 px-6 py-10 text-center text-sm text-slate-400">
            No items in this category yet. Try another filter.
          </p>
        )}
      </div>
    </section>
  )
}
