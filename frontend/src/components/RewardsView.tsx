import { Award, Leaf, Zap, ChevronLeft, CheckCircle2 } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  xpReward: number
  status: 'completed' | 'in-progress'
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ac1',
    title: 'Thrift Pioneer',
    description: 'List your first item on the Closetly thrift marketplace.',
    xpReward: 150,
    status: 'completed',
  },
  {
    id: 'ac2',
    title: 'Zero Waste Starter',
    description: 'Upload 5 items from your physical wardrobe to virtual closet.',
    xpReward: 200,
    status: 'completed',
  },
  {
    id: 'ac3',
    title: 'Circular Matchmaker',
    description: 'Purchase an AI-recommended vintage/thrifted article.',
    xpReward: 100,
    status: 'completed',
  },
  {
    id: 'ac4',
    title: 'Sustainable Closet MVP',
    description: 'Keep your average garment utilization score above 75% for 30 days.',
    xpReward: 300,
    status: 'in-progress',
  },
]

interface RewardsViewProps {
  onBackToCloset: () => void
}

export function RewardsView({ onBackToCloset }: RewardsViewProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <button
        type="button"
        onClick={onBackToCloset}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#2C4A3F] hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Closet</span>
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-[#2C4A3F] sm:text-4xl">
          XP & Rewards
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Earn XP by thriting, uploading, and maintaining a high utilization score.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Status card */}
        <div className="md:col-span-2 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Level</p>
              <h2 className="text-2xl font-bold text-[#2C4A3F] font-serif mt-0.5">Level 4: Green Stylist</h2>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center text-xs font-medium text-[#2C4A3F] mb-2">
              <span>{450} / 500 XP</span>
              <span className="text-slate-400">50 XP to Level 5</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-1000"
                style={{ width: '90%' }}
              />
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="rounded-3xl border border-white/60 bg-[#2C4A3F] p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <Zap className="h-7 w-7 text-amber-300" />
            <h3 className="font-serif text-lg font-semibold mt-4">Rewards Tier</h3>
            <p className="text-xs text-[#A3BCAB] mt-1">Silver Stylist Tier Active</p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-[#A3BCAB] uppercase tracking-wider">Discount Rate</p>
              <p className="text-xl font-bold">5% Off Retail</p>
            </div>
            <Award className="h-8 w-8 text-amber-300/80" />
          </div>
        </div>
      </div>

      {/* Achievements list */}
      <div className="mt-10">
        <h3 className="font-serif text-xl font-semibold text-[#2C4A3F] mb-6">
          Style Challenges
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((ac) => (
            <div
              key={ac.id}
              className={`rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-md flex gap-4 transition-all hover:shadow-md ${
                ac.status === 'completed' ? 'border-emerald-100 bg-emerald-50/10' : ''
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                ac.status === 'completed' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-amber-50 text-amber-600'
              }`}>
                {ac.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Zap className="h-5 w-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-[#1E293B] truncate">{ac.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    ac.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    +{ac.xpReward} XP
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {ac.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
