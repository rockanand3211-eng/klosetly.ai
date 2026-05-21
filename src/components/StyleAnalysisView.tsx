import { AlertTriangle, BarChart3 } from 'lucide-react'
import {
  analysisMetrics,
  returnRiskOutfits,
} from '../data/returnRiskOutfits'
import { AnalysisMetricCard } from './AnalysisMetricCard'
import { ReturnRiskCard } from './ReturnRiskCard'

export function StyleAnalysisView() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/80 to-indigo-950/40 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
            <BarChart3 className="h-5 w-5 text-indigo-300" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Wardrobe Intelligence Report
            </h2>
            <p className="text-sm text-slate-400">
              AI breakdown based on your uploads, purchase history, and fit profile.
            </p>
          </div>
        </div>
      </div>

      <section aria-labelledby="analysis-metrics">
        <h3
          id="analysis-metrics"
          className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500"
        >
          Fit &amp; Style Metrics
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {analysisMetrics.map((metric, index) => (
            <AnalysisMetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              gradient={metric.color}
              invertRisk={metric.invertRisk}
              index={index}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="return-risk-heading">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" strokeWidth={2} />
              <h3
                id="return-risk-heading"
                className="text-lg font-semibold text-white"
              >
                Highest Return Probability
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              Outfits flagged due to historic size discrepancies. Review alternatives
              before checkout to lower cancellation rates.
            </p>
          </div>
          <span className="inline-flex shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            {returnRiskOutfits.length} items need review
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {returnRiskOutfits.map((outfit, index) => (
            <ReturnRiskCard
              key={outfit.id}
              outfit={outfit}
              staggerIndex={index}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
