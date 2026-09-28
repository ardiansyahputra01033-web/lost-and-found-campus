import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Register({ onRegister, onLoginClick }) {
  const [form, setForm] = useState({ name: '', email: '', faculty: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      name: form.name,
      email: form.email,
      faculty: form.faculty,
      password: form.password
    }
    localStorage.setItem('campusUser', JSON.stringify(user))
    onRegister(user)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase text-blue-700">Daftar</p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-800">Buat akun mahasiswa</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">Nama lengkap</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white"
              placeholder="Masukkan nama lengkap"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">Email kampus</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white"
              placeholder="nama@campus.ac.id"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">Fakultas / Program studi</span>
            <input
              type="text"
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white"
              placeholder="Teknik Informatika"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white"
              placeholder="Buat password"
              required
            />
          </label>

          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600">
            Daftar sekarang
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <button type="button" onClick={onLoginClick} className="font-semibold text-blue-700 hover:text-blue-800">
              Masuk di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
