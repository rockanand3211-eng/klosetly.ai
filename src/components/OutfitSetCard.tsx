import { useState } from 'react'
import type { GridViewContext, PremiumOutfit } from '../types'
import { ThriftItIcon } from './icons/ThriftItIcon'
import { useInView } from '../hooks/useInView'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&h=800&q=80'

interface OutfitSetCardProps {
  outfit: PremiumOutfit
  currentView: GridViewContext
  staggerIndex?: number
  onAction?: (outfit: PremiumOutfit) => void
}

export function OutfitSetCard({
  outfit,
  currentView,
  staggerIndex = 0,
  onAction,
}: OutfitSetCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(outfit.imagePlaceholder)
  const { ref, inView } = useInView<HTMLElement>()

  const isShop = currentView === 'shop'

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${staggerIndex * 60}ms` }}
      className={`flex flex-col justify-between rounded-2xl border border-white/60 bg-white p-4 font-sans shadow-[0_20px_40px_rgba(44,74,63,0.04)] transition-all duration-500 hover:scale-[1.01] dark:bg-neutral-900 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      data-outfit-id={outfit.id}
    >
      <div className="flex flex-1 flex-col">
        <div className="group relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F1F5F4]">
          {!imageLoaded && (
            <div
              className="absolute inset-0 animate-pulse bg-[#E8EDEA]"
              aria-hidden
            />
          )}
          <img
            src={imageSrc}
            alt={outfit.description}
            data-image-prompt={outfit.description}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              if (imageSrc !== FALLBACK_IMAGE) {
                setImageSrc(FALLBACK_IMAGE)
                setImageLoaded(false)
              }
            }}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-serif text-xl font-bold leading-snug text-[#1E293B] dark:text-white">
            {outfit.title}
          </h3>
          <p className="font-sans text-sm text-[#64748B]">{outfit.category}</p>
          <p className="mt-1 line-clamp-2 font-sans text-sm leading-relaxed text-[#64748B]">
            {outfit.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {outfit.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F1F5F4] px-2.5 py-0.5 font-sans text-[10px] font-semibold text-[#2C4A3F]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-3 font-sans text-lg font-bold text-[#1E293B] dark:text-white">
            {outfit.price}
          </p>
        </div>
      </div>

      {isShop ? (
        <button
          type="button"
          onClick={() => onAction?.(outfit)}
          className="mt-4 w-full shrink-0 rounded-full bg-[#2C4A3F] py-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#243d34]"
          aria-label={`Buy ${outfit.title} now`}
        >
          Buy Now
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onAction?.(outfit)}
          className="mt-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#A3BCAB] py-3 font-sans text-sm font-semibold text-[#1E293B] transition-opacity hover:opacity-90"
          aria-label={`List ${outfit.title} on thrift marketplace`}
        >
          <ThriftItIcon className="h-4 w-4 shrink-0" />
          <span>thriftIt</span>
        </button>
      )}
    </article>
  )
}
