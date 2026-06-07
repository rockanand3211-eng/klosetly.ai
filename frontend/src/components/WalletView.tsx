import { ArrowDownLeft, ArrowUpRight, Landmark, CreditCard, ChevronLeft } from 'lucide-react'

interface Transaction {
  id: string
  title: string
  date: string
  amount: string
  type: 'credit' | 'debit'
  status: 'Completed' | 'Pending'
}

const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    title: 'Thrift Offload: Beige Cashmere Sweater',
    date: 'Jun 05, 2026',
    amount: 'RS 60.00',
    type: 'credit',
    status: 'Completed',
  },
  {
    id: 'tx2',
    title: 'Thrift Offload: Tan Striped Button-Up',
    date: 'Jun 03, 2026',
    amount: 'RS 60.00',
    type: 'credit',
    status: 'Completed',
  },
  {
    id: 'tx3',
    title: 'Purchase: Silk-Blend Cuban Collar Shirt',
    date: 'May 28, 2026',
    amount: 'RS 40.00',
    type: 'debit',
    status: 'Completed',
  },
]

interface WalletViewProps {
  onBackToCloset: () => void
}

export function WalletView({ onBackToCloset }: WalletViewProps) {
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

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#2C4A3F] sm:text-4xl">
            K$ Wallet
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage your earnings from thriting and circular offloading.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-[#2C4A3F] to-[#1E332B] p-6 text-white shadow-[0_20px_40px_rgba(44,74,63,0.12)]">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          
          <div className="flex flex-col h-full justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A3BCAB]/80">
                Available Balance
              </p>
              <h2 className="mt-2 text-5xl font-bold tracking-tight text-white font-serif">
                RS 120<span className="text-2xl font-sans font-medium text-[#A3BCAB] ml-1">.00</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-[#2C4A3F] shadow-sm transition-all hover:scale-[1.02] hover:bg-neutral-50"
              >
                <Landmark className="h-3.5 w-3.5" />
                Transfer to Bank
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-white/20"
              >
                <CreditCard className="h-3.5 w-3.5" />
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-md">
          <h3 className="font-serif text-lg font-semibold text-[#2C4A3F] mb-4">
            Wallet Insights
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-[#64748B]">Total Earned</span>
              <span className="text-xs font-bold text-[#2C4A3F]">RS 160.00</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-[#64748B]">Pending Clearance</span>
              <span className="text-xs font-bold text-amber-600">RS 0.00</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-xs text-[#64748B]">Eco-Savings Discount</span>
              <span className="text-xs font-bold text-emerald-600">10% Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-10">
        <h3 className="font-serif text-xl font-semibold text-[#2C4A3F] mb-6">
          Recent Transactions
        </h3>
        
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {TRANSACTIONS.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between p-5 hover:bg-[#F8FAF9] transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    tx.type === 'credit' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1E293B] truncate">
                      {tx.title}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      {tx.date} • <span className="text-emerald-600 font-semibold">{tx.status}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${
                    tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
