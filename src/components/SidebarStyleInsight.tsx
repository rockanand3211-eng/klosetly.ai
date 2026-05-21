import type { CollectionGender } from '../types'

interface SidebarStyleInsightProps {
  gender: CollectionGender
}

const insightByGender: Record<
  CollectionGender,
  {
    consistency: number
    delta: string
    weeklyBars: number[]
    trendLabel: string
    trendBody: string
    goalLabel: string
  }
> = {
  men: {
    consistency: 87,
    delta: '+8%',
    weeklyBars: [58, 65, 72, 78, 81, 85, 87],
    goalLabel: "Men's Style Goal",
    trendLabel: 'AI Insight:',
    trendBody:
      'Broad-shoulder silhouette optimization is trending this week among college students.',
  },
  women: {
    consistency: 84,
    delta: '+6%',
    weeklyBars: [62, 71, 68, 79, 84, 81, 84],
    goalLabel: 'Weekly Fashion Goal',
    trendLabel: 'Trend Alert:',
    trendBody:
      'High-contrast layering is reducing return rates by 22% this week.',
  },
}

export function SidebarStyleInsight({ gender }: SidebarStyleInsightProps) {
  const insight = insightByGender[gender]

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-gradient-to-b from-emerald-500/20 to-transparent p-[1px]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[11px] bg-slate-800/40 p-4 backdrop-blur-sm transition-all duration-500 ease-out">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-300/90">
            AI Wardrobe Optimizer
          </p>
        </div>

        <p className="mt-3 text-xs font-medium text-slate-400">{insight.goalLabel}</p>
        <h3 className="mt-0.5 text-sm font-semibold text-white">Style Consistency</h3>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tabular-nums text-white">
              {insight.consistency}%
            </span>
            <span className="text-[10px] font-medium text-emerald-400">
              {insight.delta}
            </span>
          </div>

          <div
            className="flex h-10 items-end gap-1"
            role="img"
            aria-label="Style consistency trend over the past week"
          >
            {insight.weeklyBars.map((value, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-500 ${
                  i === insight.weeklyBars.length - 1
                    ? 'bg-emerald-400'
                    : 'bg-emerald-500/30'
                }`}
                style={{ height: `${(value / 100) * 40}px` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${insight.consistency}%` }}
          />
        </div>

        <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-400">
          <span className="font-medium text-slate-300">{insight.trendLabel}</span>{' '}
          {insight.trendBody}
        </p>

        <button
          type="button"
          className="mt-4 w-full text-left text-xs font-semibold text-slate-300 transition-colors duration-300 ease-in-out hover:text-emerald-400"
        >
          View Insights →
        </button>
      </div>
    </div>
  )
}
