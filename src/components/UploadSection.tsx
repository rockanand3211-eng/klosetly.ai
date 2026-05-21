import { Camera, Sparkles, Upload } from 'lucide-react'

export function UploadSection() {
  return (
    <section className="mb-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Discover Your Perfect Style
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
            AI-powered fashion recommendations tailored for you.
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-emerald-400"
        >
          <Sparkles className="h-4 w-4" />
          AI Analysis
        </button>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 px-6 py-12 text-center transition-all duration-300 ease-in-out hover:border-emerald-500/30 hover:bg-slate-800/80 sm:px-8 sm:py-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <Upload className="h-9 w-9 text-emerald-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-white">Upload Your Photo</h3>
        <p className="mt-2 text-sm text-slate-400">
          Drop your image here or click to browse
        </p>
        <p className="mt-1 text-[10px] font-medium tracking-widest text-slate-500">
          SUPPORTS JPG, PNG UP TO 10MB
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-emerald-400"
          >
            <Upload className="h-4 w-4" />
            Choose File
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-slate-500 hover:bg-slate-700 hover:text-white"
          >
            <Camera className="h-4 w-4" />
            Take Photo
          </button>
        </div>
      </div>
    </section>
  )
}
