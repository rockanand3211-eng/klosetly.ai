import { useState, type CSSProperties } from 'react'
import type { CatalogProduct, ProductCardAction } from '../types'
import { ThriftItIcon } from './icons/ThriftItIcon'
import { useInView } from '../hooks/useInView'

const CARD_STYLE: CSSProperties = {
  borderRadius: '20px',
  background: '#FFFFFF',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  boxShadow: '0px 20px 40px rgba(44, 74, 63, 0.04)',
  padding: '16px',
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&h=500&q=80'

interface LuxuryProductCardProps {
  product: CatalogProduct
  /** Explicit CTA — must match parent route (shop vs my-closet) */
  cardAction: ProductCardAction
  staggerIndex?: number
  onAction?: (product: CatalogProduct) => void
}

export function LuxuryProductCard({
  product,
  cardAction,
  staggerIndex = 0,
  onAction,
}: LuxuryProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(product.imageUrl)
  const { ref, inView } = useInView<HTMLElement>()

  const formattedPrice = `$${product.price.toFixed(2)}`
  const isThrift = cardAction === 'thrift-it'

  return (
    <article
      ref={ref}
      style={{
        ...CARD_STYLE,
        transitionDelay: `${staggerIndex * 60}ms`,
      }}
      className={`flex flex-col font-sans transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div
        className="relative mb-4 aspect-[4/5] w-full overflow-hidden bg-[#F1F5F4]"
        style={{ borderRadius: '12px' }}
      >
        {!imageLoaded && (
          <div
            className="absolute inset-0 animate-pulse bg-[#E8EDEA]"
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
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ borderRadius: '12px' }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-base font-bold text-[#1E293B]">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#64748B]">
          {product.description}
        </p>
        <p className="mt-1 text-base font-bold text-[#1E293B]">
          {formattedPrice}
        </p>
      </div>

      {isThrift ? (
        <div className="mt-4 flex items-center justify-between gap-3 font-sans">
          {/* ThriftIt Button on the left */}
          <button
            type="button"
            onClick={() => onAction?.(product)}
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#A3BCAB] px-3.5 py-2.5 text-xs font-semibold text-[#1E293B] transition-opacity hover:opacity-90 shrink-0"
            aria-label={`List ${product.name} on thrift marketplace`}
          >
            <ThriftItIcon className="h-3.5 w-3.5 shrink-0" />
            <span>thriftIt</span>
          </button>

          {/* Utilization Score Widget on the right */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-[#1E293B] truncate">
              Utilization Score
            </span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden min-w-[40px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
                  style={{ width: '25%' }}
                />
              </div>
              <span className="text-[9px] text-[#64748B] font-medium whitespace-nowrap shrink-0">
                Idle (30 Days Unworn)
              </span>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onAction?.(product)}
          className="mt-4 w-full rounded-full bg-[#2C4A3F] py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#243d34]"
          aria-label={`Buy ${product.name} now`}
        >
          Buy Now
        </button>
      )}
    </article>
  )
}
