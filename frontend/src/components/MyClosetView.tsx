import { useState } from 'react'
import { closetProducts } from '../data/closetProducts'
import { ClosetSubheaderSwitch, type ClosetViewMode } from './ClosetSubheaderSwitch'
import { ProductCardGrid } from './ProductCardGrid'
import { UploadSection } from './UploadSection'
import { Wallet, ShoppingBag, Leaf } from 'lucide-react'

interface MyClosetViewProps {
  onUploadPreprocessComplete: () => void
}

export function MyClosetView({ onUploadPreprocessComplete }: MyClosetViewProps) {
  const [mode, setMode] = useState<ClosetViewMode>('browse')

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="w-full">
      {/* Fixed Navigation Header Bar */}
      <div className="fixed top-[120px] lg:top-[72px] left-0 right-0 z-40 bg-[#F1F5F4]/95 border-b border-slate-200/80 shadow-sm backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between gap-2">
            
            {/* Element A: Wallet */}
            <button
              type="button"
              onClick={() => handleNavigate('/wallet')}
              className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#2C4A3F] hover:opacity-80 transition-opacity"
            >
              <Wallet className="h-4 w-4 shrink-0 text-[#2C4A3F]/80" />
              <span>K$ Wallet: RS 120</span>
            </button>

            {/* Element B: Thrift Bag */}
            <button
              type="button"
              onClick={() => handleNavigate('/thriftbag')}
              className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#2C4A3F] hover:opacity-80 transition-opacity border-x border-slate-200/80"
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#2C4A3F]/80" />
              <span>Thrift Bag: 3 Items</span>
            </button>

            {/* Element C: XP/Rewards */}
            <button
              type="button"
              onClick={() => handleNavigate('/rewards')}
              className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#2C4A3F] hover:opacity-80 transition-opacity"
            >
              <Leaf className="h-4 w-4 shrink-0 text-emerald-600 fill-emerald-600/20" />
              <span>450 XP</span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Closet Content with top padding to prevent fixed header overlap */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#2C4A3F] sm:text-5xl">
            My Closet
          </h1>
          <p className="mt-3 font-sans text-sm text-[#64748B]">
            Your curated outfit sets — offload pieces you no longer wear via
            thriftIt.
          </p>
          <div className="mt-6 flex justify-center">
            <ClosetSubheaderSwitch mode={mode} onChange={setMode} />
          </div>
        </header>

        {mode === 'browse' ? (
          <ProductCardGrid
            products={closetProducts}
            cardAction="thrift-it"
            ariaLabel="Personal virtual wardrobe thrift items"
          />
        ) : (
          <div role="tabpanel" aria-label="Upload your own items">
            <UploadSection
              variant="luxury"
              onPreprocessComplete={onUploadPreprocessComplete}
            />
          </div>
        )}
      </div>
    </div>
  )
}
