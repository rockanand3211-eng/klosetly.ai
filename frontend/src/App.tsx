import { useCallback, useEffect, useState } from 'react'
import { AiStylistView } from './components/AiStylistView'
import { HomeHeroView } from './components/HomeHeroView'
import { MyClosetView } from './components/MyClosetView'
import { ProfileForm } from './components/ProfileForm'
import { ProfileLockOverlay } from './components/ProfileLockOverlay'
import { ProductActionDrawer } from './components/ProductActionDrawer'
import { ShopView } from './components/ShopView'
import { StyleLoader } from './components/StyleLoader'
import { ClosetBackdrop } from './components/layout/ClosetBackdrop'
import { LuxuryNavBar } from './components/layout/LuxuryNavBar'
import { WardrobeView } from './components/WardrobeView'
import { WalletView } from './components/WalletView'
import { ThriftBagView } from './components/ThriftBagView'
import { RewardsView } from './components/RewardsView'
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
  const [shoppingBag, setShoppingBag] = useState<any[]>([])
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  const handleAddToBag = (product: any) => {
    setShoppingBag((prevBag) => {
      const exists = prevBag.find(item => item.id === product.id);
      if (exists) {
        return prevBag.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevBag, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: any, delta: number) => {
    setShoppingBag(prevBag => prevBag.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: any) => {
    setShoppingBag(prevBag => prevBag.filter(item => item.id !== id));
  };

  // Handle calculations with multi-item quantities and active coupons
  const calculateSubtotal = () => {
    return shoppingBag.reduce((total, item) => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;
      return total + (priceNum * item.quantity);
    }, 0);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'KLOS96') {
      setAppliedDiscount(500); // flat ₹500 discount for the demo representation
      alert("Coupon 'KLOS96' Applied Successfully! ₹500 Discount Saved.");
    } else {
      alert("Invalid Coupon Code.");
    }
  };

  const navigateTo = (view: AppView, path: string) => {
    window.history.pushState({}, '', path)
    setCurrentView(view)
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/wallet') {
        setCurrentView('wallet')
      } else if (path === '/thriftbag') {
        setCurrentView('thriftbag')
      } else if (path === '/rewards') {
        setCurrentView('rewards')
      } else if (path === '/my-closet') {
        setCurrentView('my-closet')
      } else if (path === '/shop') {
        setCurrentView('shop')
      } else if (path === '/') {
        setCurrentView('home')
      } else {
        // Simple fallback
        setCurrentView('home')
      }
    }

    window.addEventListener('popstate', handlePopState)
    handlePopState()

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleOpenOutfitDrawer = (outfit: Outfit) => setDrawerOutfit(outfit)
  const closeProductDrawer = () => setDrawerOutfit(null)

  const handleUploadPreprocessComplete = useCallback(() => {
    setIsAnalyzing(true)
    setCurrentView('ai-stylist')
  }, [])

  const isStylistLocked =
    currentView === 'ai-stylist' &&
    !isProfileComplete &&
    !isAnalyzing &&
    !isProfileFormOpen

  const showPageBackdrop =
    currentView === 'shop' ||
    currentView === 'my-closet' ||
    currentView === 'wallet' ||
    currentView === 'thriftbag' ||
    currentView === 'rewards'

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
            onExploreCollection={() => navigateTo('shop', '/shop')}
            onViewTrends={() => navigateTo('shop', '/shop')}
            onThriftSelling={() => navigateTo('my-closet', '/my-closet')}
          />
        )
      case 'shop':
        return <ShopView onAddToBag={handleAddToBag} />
      case 'my-closet':
        return (
          <MyClosetView
            onUploadPreprocessComplete={handleUploadPreprocessComplete}
          />
        )
      case 'wallet':
        return (
          <WalletView
            onBackToCloset={() => navigateTo('my-closet', '/my-closet')}
          />
        )
      case 'thriftbag':
        return (
          <ThriftBagView
            onBackToCloset={() => navigateTo('my-closet', '/my-closet')}
          />
        )
      case 'rewards':
        return (
          <RewardsView
            onBackToCloset={() => navigateTo('my-closet', '/my-closet')}
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
            onAddToBag={handleOpenOutfitDrawer}
            onUploadPreprocessComplete={handleUploadPreprocessComplete}
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
        <LuxuryNavBar
          shoppingBagCount={shoppingBag.length}
          onBagClick={() => setIsBagOpen(true)}
          activeView={
            currentView === 'wallet' || currentView === 'thriftbag' || currentView === 'rewards'
              ? 'my-closet'
              : currentView
          }
          onNavigate={(view) => {
            const pathMap: Record<AppView, string> = {
              home: '/',
              shop: '/shop',
              'my-closet': '/my-closet',
              notification: '/notification',
              wishlist: '/wishlist',
              'ai-stylist': '/ai-stylist',
              wallet: '/wallet',
              thriftbag: '/thriftbag',
              rewards: '/rewards',
            }
            navigateTo(view, pathMap[view] || '/')
          }}
        />

        <main className="min-h-screen pt-24 lg:pt-20">{renderView()}</main>
      </div>

      {isStylistLocked && (
        <ProfileLockOverlay
          onCompleteProfile={() => setIsProfileFormOpen(true)}
          onUploadPreprocessComplete={handleUploadPreprocessComplete}
          onClose={() => navigateTo('home', '/')}
        />
      )}

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

      {/* Slide-over Bag Panel Overlay Container */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ease-in-out ${isBagOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Translucent Backdrop Blur Shadow */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isBagOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={() => setIsBagOpen(false)} 
        />

        {/* Drawer Body Panel */}
        <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl border-l border-white/40 flex flex-col justify-between transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isBagOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Drawer Header Section */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>Shopping Bag</span>
              <span className="text-sm bg-black text-white px-2.5 py-0.5 rounded-full font-medium">{shoppingBag.reduce((sum, i) => sum + i.quantity, 0)}</span>
            </h3>
            <button onClick={() => setIsBagOpen(false)} className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Dynamic Scrollable Body Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {shoppingBag.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-slate-500 font-medium">Your digital bag is empty.</p>
              </div>
            ) : (
              shoppingBag.map((item, index) => (
                <div key={item.id || index} className="flex items-center gap-4 bg-white p-3 border border-slate-100 rounded-2xl shadow-sm relative animate-fadeIn">
                  <img src={item.img} alt={item.title} className="w-20 h-24 object-cover rounded-xl" />
                  
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.theme}</p>
                    <p className="text-base font-bold text-slate-800 mt-1">{item.price}</p>
                    
                    {/* Dynamic Quantity Controller Buttons Placement */}
                    <div className="flex items-center gap-3 mt-3 bg-slate-50 w-max rounded-lg px-2 py-1 border border-slate-200/60">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-500 hover:text-black font-bold text-sm px-1.5">-</button>
                      <span className="text-sm font-semibold text-slate-800 min-w-[12px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-500 hover:text-black font-bold text-sm px-1.5">+</button>
                    </div>
                  </div>

                  {/* Elegant Absolute Remove Icon action */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Dynamic Bill Summary Footer Block */}
          {shoppingBag.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              {/* High-End Coupon Wrapper Block Layout */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-800/10 rounded-2xl mb-2 flex items-center justify-between gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (Try KLOS96)..." 
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase font-semibold tracking-wider text-slate-800 placeholder-slate-400 focus:outline-none focus:border-black"
                  />
                </div>
                <button 
                  onClick={applyCoupon}
                  className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all uppercase"
                >
                  Apply
                </button>
              </div>

              {/* Dynamic Bill Balance calculations */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between font-medium text-slate-600 text-sm">
                  <span>Bag Subtotal</span>
                  <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between font-medium text-emerald-700 text-sm">
                    <span>Coupon Discount</span>
                    <span>- ₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between font-bold text-slate-900 text-lg border-t border-dashed border-slate-200 pt-2">
                  <span>Total Payable</span>
                  <span>₹{(calculateSubtotal() - appliedDiscount).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">Inclusive of all domestic taxes and delivery metrics calculations.</p>
              <button 
                onClick={() => alert(`Redirecting to payment gateway for ₹${(calculateSubtotal() - appliedDiscount).toLocaleString('en-IN')}`)}
                className="w-full bg-[#234233] hover:bg-black text-white py-3.5 rounded-xl font-semibold tracking-wide shadow-lg active:scale-[0.98] transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
