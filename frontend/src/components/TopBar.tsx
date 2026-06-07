import { Bell, Moon, Search } from 'lucide-react'

interface TopBarProps {
  title?: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-8 border-b border-slate-800/80 bg-slate-900/80 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {(title || subtitle) && (
          <div className="min-w-0 shrink-0">
            {title && (
              <h2 className="truncate text-xl font-semibold text-white sm:text-2xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 truncate text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-wrap items-center gap-3 sm:justify-end">
          <label className="relative min-w-0 flex-1 sm:max-w-xs lg:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              strokeWidth={2}
            />
            <input
              type="search"
              placeholder="Search styles, brands..."
              className="w-full rounded-xl border border-slate-700/80 bg-slate-800/80 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-300 ease-in-out focus:border-emerald-500/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 transition-all duration-300 ease-in-out hover:scale-105 hover:border-slate-600 hover:bg-slate-700 hover:text-white"
            >
              <Bell className="h-4 w-4" strokeWidth={2} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-300 transition-all duration-300 ease-in-out hover:scale-105 hover:border-slate-600 hover:bg-slate-700 hover:text-white"
            >
              <Moon className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
