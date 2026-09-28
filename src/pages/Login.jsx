import { useState } from 'react'
import { Mail, KeyRound, ArrowRight, Compass } from 'lucide-react'

const DEMO_USERS = [
  { name: 'Alya Putri', email: 'alya@campus.ac.id', password: '123456', faculty: 'Teknik Informatika' },
  { name: 'Rizky Maulana', email: 'rizky@campus.ac.id', password: 'password', faculty: 'Akuntansi' }
]

export default function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState('alya@campus.ac.id')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!user) {
      setError('Email atau password salah')
      return
    }
    localStorage.setItem('campusUser', JSON.stringify(user))
    onLogin(user)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-400 p-10 text-white lg:flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Compass className="h-8 w-8" />
            <div>
              <p className="text-xs font-semibold uppercase">Campus</p>
              <h1 className="text-2xl font-extrabold">Lost & Found</h1>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Selamat datang di sistem pelaporan barang hilang kampus</h2>
            <p className="mt-4 max-w-md text-blue-50/90">Lacak, laporkan, dan klaim barang hilang dengan proses yang cepat, aman, dan mudah diakses.</p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-blue-700">Masuk</p>
            <h3 className="mt-2 text-3xl font-extrabold text-gray-800">Halo, mahasiswa!</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-gray-700">Email kampus</span>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <Mail className="h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none"
                  placeholder="you@campus.ac.id"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white">
                <KeyRound className="h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none"
                  placeholder="Masukkan password"
                />
              </div>
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600">
              Masuk
              <ArrowRight className="h-4 w-4" />
            </button>

            <button type="button" onClick={onRegisterClick} className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700">
              Buat akun baru
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-700 uppercase">Demo Akun</p>
            <div className="mt-2 space-y-1 text-xs text-blue-600">
              <p>📧 alya@campus.ac.id / 123456</p>
              <p>📧 rizky@campus.ac.id / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
