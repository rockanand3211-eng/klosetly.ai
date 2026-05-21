import { Shirt } from 'lucide-react'
import { wardrobeProductCount, wardrobeSections } from '../data/wardrobeProducts'
import { ProductCard } from './ProductCard'

export function WardrobeView() {
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
  )
}
