import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

export interface FashionProduct {
  id: number
  title: string
  category: string
  desc: string
  match: string
  theme: string
  price: string
  img: string
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&h=500&q=80'

interface ProductCardProps {
  product?: FashionProduct
  item?: FashionProduct
  handleAddToBag?: (product: FashionProduct) => void
  onAddToBag?: (product: FashionProduct) => void
}

export function ProductCard({ product, item, handleAddToBag, onAddToBag }: ProductCardProps) {
  const activeItem = item || product
  if (!activeItem) return null

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(activeItem.img)

  const clickHandler = () => {
    if (handleAddToBag) {
      handleAddToBag(activeItem)
    } else if (onAddToBag) {
      onAddToBag(activeItem)
    }
  }

  return (
    <article className="group flex flex-col h-full">
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full font-sans">
        
        {/* Image Frame with rounded corners */}
        <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-slate-100/50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img
            src={imageSrc}
            alt={activeItem.title}
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

          {/* Metric and Theme Badges */}
          <div className="absolute left-3 right-3 top-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 text-[10px] font-semibold shadow-sm">
              {activeItem.match}
            </span>
            {activeItem.theme && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-800 px-3 py-1 text-[10px] font-semibold shadow-sm">
                {activeItem.theme}
              </span>
            )}
          </div>
        </div>

        {/* Content Info */}
        <div className="flex flex-1 flex-col justify-between pt-4">
          <div>
            <p className="text-slate-500 text-xs font-bold tracking-wider uppercase">
              {activeItem.category}
            </p>
            <h3 className="text-slate-800 font-semibold text-lg mt-1 line-clamp-1 leading-snug">
              {activeItem.title}
            </h3>
            <p className="text-slate-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
              {activeItem.desc}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between border-t border-slate-100/50 pt-3">
              <span className="text-xs text-slate-400 font-medium">Estimated Payout</span>
              <span className="text-xl font-bold text-slate-800">{activeItem.price}</span>
            </div>

            <button
              type="button"
              onClick={clickHandler}
              className="bg-[#234233] hover:bg-black text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 w-full mt-4 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
