import { useMemo, useState } from 'react'
import { Layers, Shirt, Sparkles, Search, SlidersHorizontal } from 'lucide-react'
import { getCapsuleWardrobeCombinations } from '../data/wardrobeCapsule'
import type { WardrobeViewTab } from '../types'
import { CapsuleCombinationCard } from './CapsuleCombinationCard'
import { ProductCard, type FashionProduct } from './ProductCard'

const viewTabs: { id: WardrobeViewTab; label: string; icon: typeof Shirt }[] = [
  { id: 'inventory', label: 'Wardrobe Inventory', icon: Shirt },
  { id: 'capsule', label: 'AI Capsule Combinations', icon: Sparkles },
]

const FASHION_PRODUCTS: FashionProduct[] = [
  { id: 1, title: "The Minimalist Sage Over-Shirt", category: "Casual / Summer", desc: "Premium Sage Green Linen overshirt layered over an Essential White Crewneck Tee.", match: "98% Match", theme: "Earthy", price: "Rs. 149.00", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" },
  { id: 2, title: "Tokyo Street Edge Suit", category: "Streetwear / Blazer", desc: "Textured Navy Slim-Fit Blazer paired with washed tailored trousers and tan leather brogues.", match: "94% Match", theme: "Urban Contemporary", price: "Rs. 195.00", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22" },
  { id: 3, title: "Luxury Cuban Classic", category: "Evening Wear", desc: "Obsidian Black Luxury Silk-Blend Cuban Collar Short-Sleeve Shirt, paired with tailored trousers.", match: "96% Match", theme: "Quiet Luxury", price: "Rs. 135.00", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf" },
  { id: 4, title: "Oversized Drop-Shoulder Hoodie", category: "Streetwear", desc: "Heavyweight loopback cotton drop-shoulder hoodie in soft sand beige texture.", match: "91% Match", theme: "Minimalist Lounge", price: "Rs. 89.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7" },
  { id: 5, title: "Classic Tailored Camel Coat", category: "Outerwear / Winter", desc: "High-quality beige woven fabric, water-resistant finish, classic tailored long coat silhouette.", match: "97% Match", theme: "Timeless Capsule", price: "Rs. 249.00", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" },
  { id: 6, title: "Earthy Corduroy Utility Jacket", category: "Outerwear / Autumn", desc: "Vintage moss green fine-wale corduroy jacket featuring quad utility cargo pockets.", match: "93% Match", theme: "Workwear Style", price: "Rs. 120.00", img: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4" },
  { id: 7, title: "Monochrome Cropped Trackset", category: "Athleisure", desc: "Premium pastel amber cropped hoodie layered dynamically with high-waisted performance joggers.", match: "95% Match", theme: "Street Athleisure", price: "Rs. 115.00", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" },
  { id: 8, title: "Premium Tailored Slate Suit", category: "Formalwear", desc: "Dual-button sharp charcoal grey structured formal blazer matched with tapered slim dress pants.", match: "99% Match", theme: "Corporate Classic", price: "Rs. 299.00", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35" },
  { id: 9, title: "Sartorial Double-Breasted Blazer", category: "Formal Wear", desc: "Deep navy tailoring with custom brass button layout detailing, structured shoulder drape.", match: "92% Match", theme: "Modern Tailoring", price: "Rs. 185.00", img: "https://images.unsplash.com/photo-1620932934088-fbdb2920e484" },
  { id: 10, title: "Bespoke Knitted Crewneck", category: "Casual / Autumn", desc: "Off-white tightly knit cotton crewneck sweater designed for clean modular styling loops.", match: "90% Match", theme: "Cozy Minimalist", price: "Rs. 75.00", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633" },
  { id: 11, title: "Urban Aviator Bomber", category: "Outerwear", desc: "Sleek matte satin finish pilot bomber jacket featuring an integrated utility sleeve pouch setup.", match: "89% Match", theme: "Techwear Edge", price: "Rs. 110.00", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5" },
  { id: 12, title: "Vintage Distressed Denim Jacket", category: "Streetwear", desc: "Authentic washed indigo structural denim trucker jacket layered with heavy reinforcement stitching.", match: "94% Match", theme: "Heritage Casual", price: "Rs. 130.00", img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0" },
  { id: 13, title: "High-Rise Tailored Linen Trousers", category: "Resort Wear", desc: "Relaxed high-waisted linen bottoms in pure ecru cream shade with structural center pleats.", match: "96% Match", theme: "Summer Cruise", price: "Rs. 95.00", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" },
  { id: 14, title: "Cyber-Knit Lightweight Pullover", category: "Techwear", desc: "Breathable textured technical mesh knit jumper in slate grey hue with seamless ergonomics.", match: "93% Match", theme: "Future-Tech", price: "Rs. 105.00", img: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c" },
  { id: 15, title: "Premium Wool Mac Trench", category: "Outerwear / Winter", desc: "Minimalist clean single-breasted mid-length trench wrap crafted from refined charcoal wool blend.", match: "98% Match", theme: "High-End Minimalist", price: "Rs. 275.00", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a" }
]

export function WardrobeView() {
  const [activeTab, setActiveTab] = useState<WardrobeViewTab>('inventory')
  const [products] = useState<FashionProduct[]>(FASHION_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')

  const capsuleCombinations = useMemo(() => getCapsuleWardrobeCombinations(), [])

  // Search Filter logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const query = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        p.theme.toLowerCase().includes(query)
    )
  }, [products, searchQuery])

  return (
    <div className="space-y-10">
      {/* Redesigned Wardrobe Header */}
      <div className="rounded-3xl border border-white/50 bg-white/30 p-6 backdrop-blur-md transition-all duration-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Shirt className="h-6 w-6 text-emerald-800" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 sm:text-2xl font-serif">
                Your Menswear Wardrobe
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600 font-sans">
                {products.length} curated pieces organized by category—optimized
                for broad-shoulder fits and campus-ready layering.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 self-start rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-500/25">
            Pro Collection
          </span>
        </div>
      </div>

      {/* Tab Switcher Layout */}
      <div
        className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-1"
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
                  ? 'border-emerald-850 text-emerald-850 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Tab Content: Inventory */}
      {activeTab === 'inventory' && (
        <div role="tabpanel" className="space-y-8">
          {/* Header Global Search Implementation */}
          <div className="relative max-w-xl mx-auto mb-10">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-950/50">
              <Search size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your digital closet, styles, or trends..."
              className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-full shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/30 transition-all font-sans text-sm"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-950/60 cursor-pointer">
              <SlidersHorizontal size={18} />
            </span>
          </div>

          {/* Grid Layout of Redesigned ProductCards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="col-span-full rounded-2xl border border-white/50 bg-white/30 p-12 text-center text-sm text-slate-500 backdrop-blur-md font-sans">
              No items matched your search query. Try another term.
            </p>
          )}
        </div>
      )}

      {/* Tab Content: Capsule Combinations */}
      {activeTab === 'capsule' && (
        <section role="tabpanel" className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
                <Layers className="h-5 w-5 text-emerald-800" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-serif">AI Capsule Combinations</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-600 font-sans">
                  Topwear and bottomwear pairs ranked by cohesion match—generated from
                  your wardrobe inventory matrix.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-sans">
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
