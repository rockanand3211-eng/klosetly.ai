import { useState } from 'react'
import { ShoppingBag, Sparkles, Star } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import type { Product } from '../types'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&h=500&q=80'

interface ProductCardProps {
  product: Product
  staggerIndex?: number
}

export function ProductCard({ product, staggerIndex = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(product.imageUrl)
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${staggerIndex * 80}ms` }}
      className={`group flex flex-col transition-all duration-700 ease-out ${
        inView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
          {!imageLoaded && (
            <div
              className="skeleton-shimmer absolute inset-0"
              aria-hidden
            />
          )}
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              if (imageSrc !== FALLBACK_IMAGE) {
                setImageSrc(FALLBACK_IMAGE)
                setImageLoaded(false)
              }
            }}
            className={`h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute left-3 right-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex max-w-full items-center gap-1 truncate rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-md ${
                  tag.includes('Match')
                    ? 'bg-emerald-500/90 text-slate-950'
                    : 'bg-indigo-500/90 text-white'
                }`}
              >
                {tag.includes('AI') && (
                  <Sparkles className="h-2.5 w-2.5 shrink-0" />
                )}
                <span className="truncate">{tag}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold tracking-widest text-slate-500">
              {product.brand}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-white">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1 text-xs text-slate-400">
              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-200">{product.rating}</span>
              <span className="truncate">({product.reviewCount})</span>
            </div>
            <p className="shrink-0 text-lg font-semibold text-white">
              ${product.price}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Add ${product.name} to bag`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-emerald-400"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  )
}
