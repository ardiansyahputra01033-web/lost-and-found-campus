import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Items from './pages/Items'
import Report from './pages/Report'
import './index.css'

const initialItems = [
  {
    id: 1,
    name: 'Tas Hitam',
    category: 'Tas',
    location: 'Perpustakaan Pusat',
    date: '2026-09-20',
    status: 'Menunggu diambil',
    description: 'Tas hitam berisi buku dan laptop, ditemukan di ruang baca lantai 2.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Kunci Motor',
    category: 'Aksesori',
    location: 'Parkiran Utara',
    date: '2026-09-18',
    status: 'Diklaim',
    description: 'Kunci motor dengan gantungan pink ditemukan dekat gerbang parkir.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Laptop ASUS',
    category: 'Elektronik',
    location: 'Laboratorium 3',
    date: '2026-09-17',
    status: 'Sedang diverifikasi',
    description: 'Laptop ASUS warna abu-abu ditemukan di meja laboratorium.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Dompet Kulit',
    category: 'Dompet',
    location: 'Kantin Selatan',
    date: '2026-09-15',
    status: 'Menunggu diambil',
    description: 'Dompet kulit berisi KTM dan kartu identitas, ditemukan di meja kantin.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
  }
]

export default function App() {
  const [user, setUser] = useState(null)
  const [items, setItems] = useState(initialItems)
  const [currentPage, setCurrentPage] = useState('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('campusUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('campusUser', JSON.stringify(user))
  }, [user])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('home')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar user={user} onLogout={handleLogout} currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {currentPage === 'home' && <Home items={items} />}
        {currentPage === 'items' && <Items items={items} />}
        {currentPage === 'report' && <Report setItems={setItems} />}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 Lost & Found Campus. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}
