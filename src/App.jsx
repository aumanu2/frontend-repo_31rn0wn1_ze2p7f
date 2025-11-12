import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import Navbar from './components/Navbar'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ value, label }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  )
}

function FeaturedList({ title, items, render }) {
  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <a className="text-amber-400 text-sm" href="#">See all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(render)}
      </div>
    </section>
  )
}

export default function App() {
  const [featured, setFeatured] = useState({ packages: [], accommodations: [], transports: [], ziyarat: [] })

  useEffect(() => {
    fetch(`${backend}/catalog/featured`).then(r => r.json()).then(setFeatured).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <section className="relative h-[72vh] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 pb-8">
          <h1 className="text-white text-3xl sm:text-5xl font-semibold tracking-tight">
            Plan, book and navigate your sacred journey
          </h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Flights, stays, transport and guided routes — all in one seamless super app for Umrah and Hajj.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:flex gap-3">
            <Stat value="100k+" label="Journeys planned" />
            <Stat value="1k+" label="Verified partners" />
            <Stat value="24/7" label="On-ground support" />
          </div>
          <div id="search" className="mt-6 bg-white rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input placeholder="From" className="px-3 py-2 rounded-lg bg-gray-100 outline-none" />
            <input placeholder="To" className="px-3 py-2 rounded-lg bg-gray-100 outline-none" />
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg">Search Flights</button>
          </div>
        </div>
      </section>

      <main className="relative max-w-7xl mx-auto px-6 -mt-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
            <h2 className="text-white text-xl font-semibold">Accommodation Finder</h2>
            <p className="text-white/70 text-sm mt-1">Search by distance to Haram, budget, and amenities with real-time availability.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featured.accommodations.slice(0,4).map((a) => (
                <div key={a.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900" />
                  <div className="p-3 text-white">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-white/70">{a.city} • {a.distance_to_haram_m ? `${a.distance_to_haram_m}m` : '—'} • SAR {a.price_per_night}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10" id="map">
            <h2 className="text-white text-xl font-semibold">Route Navigation & Ziyarah</h2>
            <p className="text-white/70 text-sm mt-1">Highlight key religious sites and plan intra-city routes.
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featured.ziyarat.slice(0,8).map((z) => (
                <div key={z.id} className="rounded-lg p-3 bg-white/5 border border-white/10 text-white">
                  <div className="aspect-square rounded-md bg-gradient-to-br from-emerald-600/40 to-emerald-900/40" />
                  <div className="mt-2 text-sm font-medium">{z.name}</div>
                  <div className="text-xs text-white/60">{z.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FeaturedList
          title="Popular Packages"
          items={featured.packages}
          render={(p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 text-white">
              <div className="aspect-video bg-gradient-to-br from-amber-700/50 to-amber-900/50" />
              <div className="p-4">
                <div className="font-medium">{p.title} • {p.city}</div>
                <div className="text-xs text-white/70">{p.nights} nights • SAR {p.price}</div>
              </div>
            </div>
          )}
        />

        <FeaturedList
          title="Transport Options"
          items={featured.transports}
          render={(t) => (
            <div key={t.id} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 text-white">
              <div className="aspect-video bg-gradient-to-br from-sky-700/40 to-sky-900/40" />
              <div className="p-4">
                <div className="font-medium capitalize">{t.type} • {t.route}</div>
                <div className="text-xs text-white/70">SAR {t.price}</div>
              </div>
            </div>
          )}
        />
      </main>

      <footer className="mt-16 py-10 text-center text-white/60">
        © {new Date().getFullYear()} Hajj & Umrah Super App
      </footer>
    </div>
  )
}
