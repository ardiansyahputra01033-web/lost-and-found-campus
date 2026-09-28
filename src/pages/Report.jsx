import { ArrowRight, MapPin, PackageSearch } from 'lucide-react'
import { useState } from 'react'

export default function Report({ onReport }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Tas',
    location: '',
    date: '',
    description: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.location || !form.date || !form.description) {
      alert('Lengkapi semua field')
      return
    }
    alert('Laporan barang hilang berhasil dikirim!')
    setForm({ name: '', category: 'Tas', location: '', date: '', description: '' })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[30px] bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-8 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase text-blue-200">Laporkan</p>
        <h2 className="mt-3 text-3xl font-extrabold">Barang yang hilang atau ditemukan</h2>
        <p className="mt-4 text-gray-300">
          Isi informasi dengan lengkap agar petugas kampus dapat memverifikasi dan menghubungi pemilik barang dengan cepat.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <PackageSearch className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="font-semibold">Verifikasi cepat</p>
              <p className="text-sm text-gray-400">Tim kampus mengecek laporan dalam 1x24 jam</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <MapPin className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="font-semibold">Lokasi pencarian</p>
              <p className="text-sm text-gray-400">Pilih area dan titik penemuan yang paling akurat</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[30px] border border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="text-2xl font-extrabold text-gray-800">Form laporan</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Nama barang</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white" placeholder="Contoh: Tas sekolah" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Kategori</span>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white">
              <option>Tas</option>
              <option>Elektronik</option>
              <option>Aksesori</option>
              <option>Dompet</option>
              <option>Dokumen</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Tanggal</span>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Lokasi penemuan</span>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white" placeholder="Gedung A, lantai 2" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Deskripsi</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white" placeholder="Jelaskan ciri-ciri barang..." />
          </label>
        </div>
        <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600">
          Kirim laporan
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
