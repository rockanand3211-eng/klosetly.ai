interface AnalysisMetricCardProps {
  label: string
  value: number
  description: string
  gradient: string
  invertRisk?: boolean
  index?: number
}

export function AnalysisMetricCard({
  label,
  value,
  description,
  gradient,
  invertRisk = false,
  index = 0,
}: AnalysisMetricCardProps) {
  const displayValue = invertRisk ? `${value}% risk` : `${value}%`
  const barWidth = invertRisk ? Math.min(100, value + 20) : value
  const ringProgress = invertRisk ? 100 - value : value
  const circumference = 2 * Math.PI * 15.5
  const strokeDash = (ringProgress / 100) * circumference

  return (
    <div
      className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-slate-600"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-white">
            {displayValue}
          </p>
        </div>
        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center"
          aria-hidden
        >
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-700"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              className={`${invertRisk ? 'text-amber-400' : 'text-emerald-400'} transition-all duration-700 ease-out`}
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-white">{value}</span>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700/80">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}
