import { useCallback, useEffect, useState } from 'react'
import { AiStylistView } from './components/AiStylistView'
import { HomeHeroView } from './components/HomeHeroView'
import { MyClosetView } from './components/MyClosetView'
import { ProfileForm } from './components/ProfileForm'
import { ProductActionDrawer } from './components/ProductActionDrawer'
import { ShopView } from './components/ShopView'
import { StyleLoader } from './components/StyleLoader'
import { ClosetBackdrop } from './components/layout/ClosetBackdrop'
import { LuxuryNavBar } from './components/layout/LuxuryNavBar'
import { WardrobeView } from './components/WardrobeView'
import type {
  AppView,
  CollectionGender,
  Outfit,
  ProductCategory,
  StyleProfile,
} from './types'

const ANALYSIS_DURATION_MS = 4000

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [collection, setCollection] = useState<CollectionGender>('men')
  const [category, setCategory] = useState<ProductCategory>('all')
  const [, setStyleProfile] = useState<StyleProfile | null>(null)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false)
  const [drawerOutfit, setDrawerOutfit] = useState<Outfit | null>(null)

  const handleAddToBag = (outfit: Outfit) => setDrawerOutfit(outfit)
  const closeProductDrawer = () => setDrawerOutfit(null)

  const handleUploadPreprocessComplete = useCallback(() => {
    setIsAnalyzing(true)
    setCurrentView('ai-stylist')
  }, [])

  const showPageBackdrop =
    currentView === 'shop' || currentView === 'my-closet'

  useEffect(() => {
    if (!isAnalyzing) return

    const id = window.setTimeout(() => {
      setIsAnalyzing(false)
      setIsProfileComplete(true)
    }, ANALYSIS_DURATION_MS)

    return () => window.clearTimeout(id)
  }, [isAnalyzing])

  const handleProfileSubmit = (profile: StyleProfile) => {
    setStyleProfile(profile)
    setIsProfileFormOpen(false)
    setIsAnalyzing(true)
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeHeroView
            onExploreCollection={() => setCurrentView('shop')}
            onViewTrends={() => setCurrentView('shop')}
            onThriftSelling={() => setCurrentView('my-closet')}
          />
        )
      case 'shop':
        return <ShopView />
      case 'my-closet':
        return (
          <MyClosetView
            onUploadPreprocessComplete={handleUploadPreprocessComplete}
          />
        )
      case 'wishlist':
        return (
          <div className="mx-auto max-w-lg px-4 py-24 text-center">
            <h1 className="font-serif text-3xl text-[#2C4A3F]">Wishlist</h1>
            <p className="mt-3 font-sans text-sm text-[#64748B]">
              Saved pieces will appear here.
            </p>
          </div>
        )
      case 'notification':
        return (
          <div className="mx-auto max-w-lg px-4 py-24 text-center">
            <h1 className="font-serif text-3xl text-[#2C4A3F]">Notifications</h1>
            <p className="mt-3 font-sans text-sm text-[#64748B]">
              You have 1 new style update waiting.
            </p>
          </div>
        )
      case 'ai-stylist':
        if (isProfileComplete) {
          return (
            <div key="wardrobe-stylist" className="app-content-enter">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <WardrobeView />
              </div>
            </div>
          )
        }
        return (
          <AiStylistView
            collection={collection}
            onCollectionChange={setCollection}
            category={category}
            onCategoryChange={setCategory}
            isProfileComplete={isProfileComplete}
            onAddToBag={handleAddToBag}
            onUploadPreprocessComplete={handleUploadPreprocessComplete}
            onCompleteProfile={() => setIsProfileFormOpen(true)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen bg-[#F5F7F6]">
      {showPageBackdrop && <ClosetBackdrop />}

      <div
        className={`relative z-10 min-h-screen ${
          showPageBackdrop ? 'closet-glass-layer' : ''
        }`}
      >
        <LuxuryNavBar activeView={currentView} onNavigate={setCurrentView} />

        <main className="min-h-screen pt-24 lg:pt-20">{renderView()}</main>
      </div>

      {isAnalyzing && (
        <div
          key="style-analyzing"
          className="fixed inset-0 z-[55] flex items-center justify-center bg-[#2C4A3F]/75 backdrop-blur-xl app-overlay-enter"
          role="dialog"
          aria-modal="true"
          aria-label="Analyzing your style profile"
        >
          <div className="relative app-content-enter">
            <StyleLoader />
          </div>
        </div>
      )}

      <ProfileForm
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        onSubmit={handleProfileSubmit}
      />

      <ProductActionDrawer
        isOpen={drawerOutfit !== null}
        outfit={drawerOutfit}
        onClose={closeProductDrawer}
      />
    </div>
  )
}

export default App
