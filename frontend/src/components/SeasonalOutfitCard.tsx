import { useState } from 'react'
import type { SeasonalOutfit } from '../types'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&h=500&q=80'

interface SeasonalOutfitCardProps {
  outfit: SeasonalOutfit
}

export function SeasonalOutfitCard({ outfit }: SeasonalOutfitCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(outfit.imageUrl)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 ring-1 ring-white/5 transition-all duration-300 ease-in-out hover:border-[#00F0A0]/25 hover:shadow-lg hover:shadow-[#00F0A0]/5">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
        {!imageLoaded && (
          <div className="skeleton-shimmer absolute inset-0" aria-hidden />
        )}
        <img
          src={imageSrc}
          alt={outfit.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (imageSrc !== FALLBACK_IMAGE) {
              setImageSrc(FALLBACK_IMAGE)
              setImageLoaded(false)
            }
          }}
          className={`h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-4 pb-4 pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00F0A0]/90">
            AI Curated
          </p>
          <h3 className="mt-1 text-lg font-medium tracking-tight text-white">
            {outfit.title}
          </h3>
        </div>
      </div>
      <p className="px-4 py-3 text-xs leading-relaxed text-slate-500">{outfit.note}</p>
    </article>
  )
}
