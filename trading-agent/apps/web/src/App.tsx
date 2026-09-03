import { useEffect, useState } from 'react'

type ServiceState = {
  service: string
  status: 'ok' | 'loading' | 'error'
  timestamp?: string
  mode?: 'paper' | 'live'
}

const apiBase = 'http://localhost:4000'
const dataBase = 'http://localhost:8001'

function App() {
  const [apiHealth, setApiHealth] = useState<ServiceState>({ service: 'api', status: 'loading' })
  const [dataHealth, setDataHealth] = useState<ServiceState>({ service: 'data-service', status: 'loading' })

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const [apiResponse, dataResponse] = await Promise.all([
          fetch(`${apiBase}/api/health`),
          fetch(`${dataBase}/api/health`),
        ])

        const apiJson = await apiResponse.json()
        const dataJson = await dataResponse.json()

        setApiHealth({ ...apiJson, status: 'ok' })
        setDataHealth({ ...dataJson, status: 'ok' })
      } catch (error) {
        console.error('Startup health check failed:', error)
        setApiHealth({ service: 'api', status: 'error' })
        setDataHealth({ service: 'data-service', status: 'error' })
      }
    }

    void loadHealth()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-400">TradeLens</p>
            <h1 className="mt-2 text-2xl font-semibold">Paper-first trading dashboard</h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            PAPER MODE
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/40">
            <p className="text-sm text-slate-400">API status</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-semibold text-white">{apiHealth.status === 'ok' ? 'Online' : apiHealth.status === 'loading' ? 'Checking...' : 'Offline'}</span>
              <span className={`h-3 w-3 rounded-full ${apiHealth.status === 'ok' ? 'bg-emerald-400' : apiHealth.status === 'loading' ? 'bg-amber-400' : 'bg-rose-400'}`} />
            </div>
            <p className="mt-3 text-xs text-slate-500">{apiHealth.timestamp ?? 'Awaiting heartbeat'}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/40">
            <p className="text-sm text-slate-400">Data service</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-semibold text-white">{dataHealth.status === 'ok' ? 'Synced' : dataHealth.status === 'loading' ? 'Checking...' : 'Offline'}</span>
              <span className={`h-3 w-3 rounded-full ${dataHealth.status === 'ok' ? 'bg-emerald-400' : dataHealth.status === 'loading' ? 'bg-amber-400' : 'bg-rose-400'}`} />
            </div>
            <p className="mt-3 text-xs text-slate-500">{dataHealth.timestamp ?? 'Awaiting heartbeat'}</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 shadow-lg shadow-cyan-950/20">
            <p className="text-sm text-cyan-200">Risk note</p>
            <div className="mt-3 text-xl font-semibold text-cyan-50">Not financial advice</div>
            <p className="mt-2 text-sm text-cyan-100/90">Educational use only. Markets are probabilistic and losses are possible.</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Portfolio overview</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">₹4,20,000</h2>
              </div>
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-right">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">Day P&amp;L</div>
                <div className="mt-1 text-lg font-semibold text-emerald-300">+₹6,840</div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['Watchlist', '12 symbols'],
                ['Open positions', '4'],
                ['Max daily loss', '3%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <p className="mt-2 text-xl font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Risk meter</p>
            <div className="mt-5 flex items-end gap-2">
              <div className="w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500" style={{ width: '62%' }} />
              </div>
              <span className="text-sm font-semibold text-amber-300">62%</span>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>Position sizing: 2% max</li>
              <li>Stop-losses: enforced</li>
              <li>Daily circuit: 5% loss cap</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Next session outlook</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Bullish bias with moderate confidence</h3>
            </div>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              76% confidence
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-slate-300">
            Technical setup, volume confirmation, and sentiment indicators suggest a constructive next-session backdrop. This is a probabilistic estimate, not a recommendation or guarantee.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
