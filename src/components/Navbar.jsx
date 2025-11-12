import { Menu, Plane, Hotel, Car, Map, Bell } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
            <Plane className="w-5 h-5 text-black" />
          </div>
          <span className="font-semibold tracking-tight">Hajj & Umrah</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#search" className="hover:text-white flex items-center gap-2"><Plane className="w-4 h-4"/> Flights</a>
          <a href="#search" className="hover:text-white flex items-center gap-2"><Hotel className="w-4 h-4"/> Stays</a>
          <a href="#search" className="hover:text-white flex items-center gap-2"><Car className="w-4 h-4"/> Transport</a>
          <a href="#map" className="hover:text-white flex items-center gap-2"><Map className="w-4 h-4"/> Ziyarah</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/10">
            <Bell className="w-5 h-5"/>
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 text-sm">Sign in</button>
          <button className="md:hidden p-2 rounded-lg hover:bg-white/10">
            <Menu className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </header>
  )
}
