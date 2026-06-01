import {
  Home,
  LogOut,
  Shirt,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { CollectionGender, NavItem } from '../types'
import { SidebarStyleInsight } from './SidebarStyleInsight'

interface SidebarProps {
  activeItem: NavItem
  collection: CollectionGender
  onNavigate: (item: NavItem) => void
}

const navItems: { id: NavItem; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'wardrobe', label: 'Wardrobe', icon: Shirt },
  { id: 'style-analysis', label: 'Style Analysis', icon: TrendingUp },
]

export function Sidebar({ activeItem, collection, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6">
      <div className="mb-6 shrink-0 px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              DripVerse.AI
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Fashion Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex shrink-0 flex-col gap-1 px-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 shadow-sm ring-1 ring-emerald-500/25'
                  : 'text-slate-400 hover:scale-[1.02] hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex min-h-0 flex-1 flex-col gap-3 pt-6">
        <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-white">Upgrade to Pro</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Unlock advanced AI styling and unlimited recommendations.
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-emerald-400"
          >
            Get Started
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-indigo-500 text-sm font-semibold text-white">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Anand Raj</p>
            <p className="truncate text-xs text-slate-500">Pro Member</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-slate-800 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <SidebarStyleInsight gender={collection} />
      </div>
    </aside>
  )
}
