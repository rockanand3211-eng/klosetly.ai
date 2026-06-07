import { ExternalLink, Star, X } from 'lucide-react'
import { useEffect, useId } from 'react'
import type { Outfit } from '../types'

interface ProductActionDrawerProps {
  isOpen: boolean
  outfit: Outfit | null
  onClose: () => void
}

const budgetRetailers = ['Zara', 'H&M', 'Uniqlo'] as const

function budgetRetailerForBrand(brand: string): (typeof budgetRetailers)[number] {
  const normalized = brand.toLowerCase()
  if (normalized.includes('zara')) return 'Zara'
  if (normalized.includes('h&m') || normalized.includes('hm')) return 'H&M'
  return 'Uniqlo'
}

export function ProductActionDrawer({
  isOpen,
  outfit,
  onClose,
}: ProductActionDrawerProps) {
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !outfit) return null

  const budgetStore = budgetRetailerForBrand(outfit.brand)

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        aria-label="Close product drawer"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="product-drawer-enter relative flex h-full w-full max-w-md flex-col border-l border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/40"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0A0]/50 to-transparent" />

        <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <p
            id={titleId}
            className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00F0A0]"
          >
            Retail Redirect
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800">
            <div className="aspect-[4/5] w-full overflow-hidden bg-slate-950">
              <img
                src={outfit.imageUrl}
                alt={outfit.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {outfit.brand}
              </p>
              <h2 className="text-lg font-semibold leading-snug text-white">{outfit.name}</h2>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-slate-200">{outfit.rating}</span>
                <span>({outfit.reviewsCount} reviews)</span>
              </div>
              <p className="text-xl font-semibold text-white">${outfit.price}</p>
            </div>
          </div>

          <section className="mt-8 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Available Retailers
            </h3>

            <button
              type="button"
              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[#00F0A0]/30 bg-[#00F0A0]/10 px-4 py-3.5 text-left text-sm font-medium text-[#00F0A0] transition-all duration-300 hover:scale-[1.01] hover:border-[#00F0A0]/50 hover:bg-[#00F0A0]/15 hover:shadow-[0_0_20px_rgba(0,240,160,0.12)]"
            >
              <span>Buy Original from {outfit.brand} Store</span>
              <ExternalLink className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-3.5 text-left text-sm font-medium text-slate-200 transition-all duration-300 hover:scale-[1.01] hover:border-slate-600 hover:bg-slate-800"
            >
              <span>Find Budget Alternative on {budgetStore}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-300" />
            </button>

            <button
              type="button"
              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-700/80 bg-slate-800/40 px-4 py-3.5 text-left text-sm font-medium text-slate-300 transition-all duration-300 hover:scale-[1.01] hover:border-slate-600 hover:bg-slate-800/70"
            >
              <span>Compare Prices on Google Shopping</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5" />
            </button>
          </section>
        </div>

        <footer className="border-t border-slate-800 px-5 py-4">
          <p className="text-center text-[11px] leading-relaxed text-slate-500">
            Prices and inventory are dynamically tracked via DripVerse AI aggregator
            network.
          </p>
        </footer>
      </aside>
    </div>
  )
}
