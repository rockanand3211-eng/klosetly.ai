import { useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { BasketIcon } from '../icons/BasketIcon'
import type { AppView } from '../../types'

const NAV_LINKS: {
  id: AppView
  label: string
  badge?: number
  icon?: 'heart' | 'sparkles'
}[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'my-closet', label: 'My Closet' },
  { id: 'notification', label: 'Notification', badge: 1 },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { id: 'ai-stylist', label: 'AI Stylist', icon: 'sparkles' },
]

interface LuxuryNavBarProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
  shoppingBagCount?: number
  onBagClick?: () => void
}

export function LuxuryNavBar({ activeView, onNavigate, shoppingBagCount = 0, onBagClick }: LuxuryNavBarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock user information for localized rendering
  const userProfile = {
    name: "Anand Raj",
    email: "anand.raj@nimsuniversity.org",
    tokens: "450 Kash Tokens",
    sizePreference: "M / 32"
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/75 px-4 shadow-sm backdrop-blur-md sm:px-5">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex shrink-0 items-center gap-2"
          aria-label="Closetly home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A3BCAB]/40 text-[#2C4A3F]">
            <BasketIcon className="h-4 w-4" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-[#2C4A3F]">
            Closetly
          </span>
        </button>

        <nav
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ id, label, badge, icon }) => {
            const isActive = activeView === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`relative inline-flex items-center gap-1 font-sans text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#2C4A3F] underline decoration-[#2C4A3F] decoration-2 underline-offset-4'
                    : 'text-[#64748B] hover:text-[#2C4A3F]'
                }`}
              >
                {icon === 'heart' && (
                  <Heart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                )}
                {icon === 'sparkles' && (
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                )}
                <span className="relative">
                  {label}
                  {badge !== undefined && (
                    <span
                      className="absolute -right-4 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white"
                      aria-label={`${badge} unread`}
                    >
                      {badge}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          {/* Shopping Bag Icon Component */}
          <button 
            onClick={onBagClick}
            className="relative p-2.5 text-slate-700 hover:text-emerald-950 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {shoppingBagCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {shoppingBagCount}
              </span>
            )}
          </button>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 bg-[#1E3A2B] text-white font-bold h-10 w-10 rounded-full justify-center active:scale-95 transition-transform text-xs"
            >
              {userProfile ? `${userProfile.name.split(' ')[0][0]}${userProfile.name.split(' ')[1][0]}` : 'AR'}
            </button>
            
            {isProfileOpen && (
              <>
                {/* Fullscreen transparent click-away guard to close dropdown automatically */}
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                
                {/* Main Dropdown Container Box */}
                <div className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn transform origin-top-right">
                  
                  {/* A. User Quick Bio Info */}
                  <div className="pb-3 border-b border-slate-100 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-[#1E3A2B] text-white text-sm font-bold flex items-center justify-center shadow-md">
                      AR
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{userProfile.name}</h4>
                      <p className="text-xs text-slate-400 truncate font-medium">{userProfile.email}</p>
                    </div>
                  </div>

                  {/* B. App Core Loyalty Badges */}
                  <div className="my-3 p-2.5 bg-emerald-50/70 border border-emerald-600/10 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-950">
                    <span className="flex items-center gap-1.5">
                      🪙 {userProfile.tokens}
                    </span>
                    <span className="bg-emerald-800 text-white px-2 py-0.5 rounded-md text-[10px]">
                      VIP Fit
                    </span>
                  </div>

                  {/* C. Premium Navigation Action Grid Loops */}
                  <div className="space-y-1">
                    
                    {/* 1. Linked Accessories Hook */}
                    <button 
                      onClick={() => { alert("Opening AI Smart Accessories Store..."); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium text-left"
                    >
                      <span>🕶️</span>
                      <span className="flex-1">Go to Accessories</span>
                      <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full uppercase scale-90">New</span>
                    </button>

                    {/* 2. My Closet/Wardrobe Profile */}
                    <button 
                      onClick={() => { alert("Redirecting to your Digital Wardrobe Analytics..."); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium text-left"
                    >
                      <span>🧥</span>
                      <span>My Digital Wardrobe</span>
                    </button>

                    {/* 3. My Saved Coupons Hub */}
                    <button 
                      onClick={() => { alert("Active Available Coupons: Try using code 'KLOS96' to unlock flat savings!"); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium text-left"
                    >
                      <span>🎟️</span>
                      <span className="flex-1">Saved Coupons</span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </button>

                    {/* 4. AI Body Dimensions/Silhouette Configuration */}
                    <button 
                      onClick={() => { alert(`Current Size Preference Profile: ${userProfile.sizePreference}`); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium text-left"
                    >
                      <span>📐</span>
                      <span>Body Silhouette & Sizes</span>
                    </button>

                  </div>

                  {/* D. Bottom Sign Out Action */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => { alert("Logging account out gracefully."); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold text-left"
                    >
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav
        className="mx-auto mt-2 flex max-w-5xl items-center justify-center gap-3 overflow-x-auto rounded-xl border border-white/50 bg-white/70 px-3 py-2 backdrop-blur-md lg:hidden"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ id, label, badge }) => {
          const isActive = activeView === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`shrink-0 font-sans text-xs font-medium ${
                isActive
                  ? 'text-[#2C4A3F] underline decoration-2 underline-offset-4'
                  : 'text-[#64748B]'
              }`}
            >
              {label}
              {badge !== undefined && (
                <span className="ml-0.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
