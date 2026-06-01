import { useMemo, useState } from 'react'
import { Layers, Shirt, Sparkles } from 'lucide-react'
import { getCapsuleWardrobeCombinations } from '../data/wardrobeCapsule'
import { wardrobeProductCount, wardrobeSections } from '../data/wardrobeProducts'
import type { WardrobeViewTab } from '../types'
import { CapsuleCombinationCard } from './CapsuleCombinationCard'
import { ProductCard } from './ProductCard'

const viewTabs: { id: WardrobeViewTab; label: string; icon: typeof Shirt }[] = [
  { id: 'inventory', label: 'Wardrobe Inventory', icon: Shirt },
  { id: 'capsule', label: 'AI Capsule Combinations', icon: Sparkles },
]

export function WardrobeView() {
  const [activeTab, setActiveTab] = useState<WardrobeViewTab>('inventory')

  const capsuleCombinations = useMemo(() => getCapsuleWardrobeCombinations(), [])

  return (
    <div className="space-y-12">
      <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-slate-700">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/25">
              <Shirt className="h-6 w-6 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Your Menswear Wardrobe
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
                {wardrobeProductCount} curated pieces organized by category—optimized
                for broad-shoulder fits and campus-ready layering.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 self-start rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/25">
            Pro Collection
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 border-b border-slate-800 pb-1"
        role="tablist"
        aria-label="Wardrobe views"
      >
        {viewTabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'border-[#00F0A0] text-[#00F0A0]'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </button>
          )
        })}
      </div>

      {activeTab === 'inventory' && (
        <div role="tabpanel" className="space-y-12">
          {wardrobeSections.map((section) => (
            <section key={section.id} aria-labelledby={`wardrobe-${section.id}`}>
              <div className="mb-6 border-b border-slate-800 pb-4">
                <h3
                  id={`wardrobe-${section.id}`}
                  className="text-lg font-semibold text-white"
                >
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{section.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {section.products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    staggerIndex={index % 4}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {activeTab === 'capsule' && (
        <section role="tabpanel" className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00F0A0]/10 ring-1 ring-[#00F0A0]/25">
                <Layers className="h-5 w-5 text-[#00F0A0]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Capsule Combinations</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-400">
                  Topwear and bottomwear pairs ranked by cohesion match—generated from
                  your wardrobe inventory matrix.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              {capsuleCombinations.length} active pairings
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {capsuleCombinations.map((combination) => (
              <CapsuleCombinationCard key={combination.id} combination={combination} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
