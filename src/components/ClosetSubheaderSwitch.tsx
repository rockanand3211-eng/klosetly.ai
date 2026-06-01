export type ClosetViewMode = 'browse' | 'upload'

interface ClosetSubheaderSwitchProps {
  mode: ClosetViewMode
  onChange: (mode: ClosetViewMode) => void
}

export function ClosetSubheaderSwitch({
  mode,
  onChange,
}: ClosetSubheaderSwitchProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full p-1"
      role="tablist"
      aria-label="Closet view mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'browse'}
        onClick={() => onChange('browse')}
        className={`rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-all ${
          mode === 'browse'
            ? 'bg-[#2C4A3F] text-white shadow-sm'
            : 'border border-[#2C4A3F] bg-transparent text-[#1E293B] hover:bg-[#2C4A3F]/5'
        }`}
      >
        Browse Collection
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'upload'}
        onClick={() => onChange('upload')}
        className={`rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-all ${
          mode === 'upload'
            ? 'bg-[#2C4A3F] text-white shadow-sm'
            : 'border border-[#2C4A3F] bg-transparent text-[#1E293B] hover:bg-[#2C4A3F]/5'
        }`}
      >
        Upload Your Own Items
      </button>
    </div>
  )
}
