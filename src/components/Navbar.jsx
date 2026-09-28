import { BellRing, LogOut, Menu, Compass, UserCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ user, onLogout, onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Beranda', page: 'home' },
    { label: 'Barang Hilang', page: 'items' },
    { label: 'Laporkan', page: 'report' }
  ]

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-blue-700">Campus</p>
              <h1 className="text-lg font-extrabold text-gray-800">Lost & Found</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  currentPage === item.page ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 hover:text-blue-700">
              <BellRing className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <UserCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-[11px] text-gray-500">{user.faculty}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-gray-200 bg-white p-2 md:hidden">
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page)
                    setMenuOpen(false)
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    currentPage === item.page ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={onLogout} className="mt-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white">
                Keluar
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
