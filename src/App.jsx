import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Items from './pages/Items'
import Report from './pages/Report'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [loading, setLoading] = useState(true)
  const [showPage, setShowPage] = useState('login')

  useEffect(() => {
    const savedUser = localStorage.getItem('campusUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setShowPage('dashboard')
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setShowPage('dashboard')
    setCurrentPage('home')
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setShowPage('dashboard')
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setShowPage('login')
    localStorage.removeItem('campusUser')
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
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

  if (showPage === 'login') {
    return <Login onLogin={handleLogin} onRegisterClick={() => setShowPage('register')} />
  }

  if (showPage === 'register') {
    return <Register onRegister={handleRegister} onLoginClick={() => setShowPage('login')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar user={user} onLogout={handleLogout} onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {currentPage === 'home' && <Home />}
        {currentPage === 'items' && <Items />}
        {currentPage === 'report' && <Report />}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 Lost & Found Campus. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}
