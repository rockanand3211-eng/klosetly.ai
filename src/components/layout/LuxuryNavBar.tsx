import { ChevronDown, Heart, Sparkles } from 'lucide-react'
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
}

export function LuxuryNavBar({ activeView, onNavigate }: LuxuryNavBarProps) {
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

        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-full transition-opacity hover:opacity-90"
          aria-label="Account menu for JD"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2C4A3F] font-sans text-xs font-semibold text-white">
            JD
          </span>
          <ChevronDown
            className="hidden h-4 w-4 text-[#64748B] sm:block"
            strokeWidth={2}
            aria-hidden
          />
        </button>
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
