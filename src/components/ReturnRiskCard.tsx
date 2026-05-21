import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { ReturnRiskOutfit } from '../data/returnRiskOutfits'
import { useInView } from '../hooks/useInView'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&h=500&q=80'

interface ReturnRiskCardProps {
  outfit: ReturnRiskOutfit
  staggerIndex?: number
}

export function ReturnRiskCard({ outfit, staggerIndex = 0 }: ReturnRiskCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(outfit.imageUrl)
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${staggerIndex * 80}ms` }}
      className={`group flex flex-col transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-800 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
          {!imageLoaded && (
            <div className="skeleton-shimmer absolute inset-0" aria-hidden />
          )}
          <img
            src={imageSrc}
            alt={outfit.name}
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
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 backdrop-blur-md">
            <AlertTriangle className="h-2.5 w-2.5" />
            {outfit.returnRiskPercent}% Return Risk
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <p className="truncate text-[10px] font-semibold tracking-widest text-slate-500">
              {outfit.brand}
            </p>
            <h3 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-white">
              {outfit.name}
            </h3>
            <p className="mt-1 text-lg font-semibold text-white">${outfit.price}</p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-400">
              Size discrepancy
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {outfit.sizeDiscrepancy}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            {outfit.historicalNote}
          </p>

          <button
            type="button"
            className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 py-2.5 text-sm font-semibold text-amber-300 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-amber-500/20"
          >
            Review Size Alternative
          </button>
        </div>
      </div>
    </article>
  )
}
