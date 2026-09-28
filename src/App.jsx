import { useEffect, useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  FolderSearch,
  HandCoins,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Menu,
  PackageSearch,
  Search,
  ShieldCheck,
  Smartphone,
  UserCircle2,
  Wallet
} from 'lucide-react'

const initialItems = [
  {
    id: 1,
    name: 'Tas Hitam',
    category: 'Tas',
    location: 'Perpustakaan Pusat',
    date: '2026-09-20',
    status: 'Menunggu diambil',
    description: 'Tas hitam berisi buku dan laptop, ditemukan di ruang baca lantai 2.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Kunci Motor',
    category: 'Aksesori',
    location: 'Parkiran Utara',
    date: '2026-09-18',
    status: 'Diklaim',
    description: 'Kunci motor dengan gantungan pink ditemukan dekat gerbang parkir.',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80'
  }
]

const categories = ['Semua', 'Tas', 'Elektronik', 'Aksesori', 'Dompet', 'Dokumen']

const stats = [
  { label: 'Barang terlapor', value: '248', icon: PackageSearch },
  { label: 'Sudah diklaim', value: '182', icon: CheckCircle2 },
  { label: 'Belum diambil', value: '66', icon: FolderSearch },
  { label: 'Keamanan aktif', value: '24/7', icon: ShieldCheck }
]

const demoUsers = [
  { name: 'Alya Putri', email: 'alya@campus.ac.id', password: '123456', faculty: 'Teknik Informatika' },
  { name: 'Rizky Maulana', email: 'rizky@campus.ac.id', password: 'password', faculty: 'Akuntansi' }
]

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('campusUser') || 'null'))
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('campusItems') || JSON.stringify(initialItems)))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('campusUser', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('campusItems', JSON.stringify(items))
  }, [items])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} user={user} />} />
        <Route path="/register" element={<RegisterPage onLogin={setUser} />} />
        <Route
          path="/*"
          element={user ? <DashboardLayout user={user} setUser={setUser} items={items} setItems={setItems} menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  )
}

function DashboardLayout({ user, setUser, items, setItems, menuOpen, setMenuOpen }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('campusUser')
    navigate('/login')
  }

  const navItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Barang Hilang', to: '/items' },
    { label: 'Laporkan', to: '/report' },
    { label: 'Notifikasi', to: '/notifications' }
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f7ff,_#f8fafc_30%,_#edf2f7_100%)]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-campus-500 text-white shadow-soft">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-campus-700">Campus</p>
              <h1 className="text-lg font-extrabold text-slate-800">Lost & Found</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-campus-500 text-white shadow-soft' : 'text-slate-600 hover:bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-campus-300 hover:text-campus-700">
              <BellRing className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-campus-100 text-campus-700">
                <UserCircle2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-[11px] text-slate-500">{user.faculty}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-slate-200 bg-white p-2 shadow-sm md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive ? 'bg-campus-500 text-white' : 'bg-slate-50 text-slate-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
              >
                Keluar
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/items" element={<ItemsPage items={items} />} />
          <Route path="/report" element={<ReportPage setItems={setItems} />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage({ items }) {
  const featured = items.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] bg-gradient-to-br from-campus-700 via-campus-600 to-sky-400 p-8 text-white shadow-soft sm:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            <ShieldCheck className="h-3.5 w-3.5" />
            Sistem berbasis kampus
          </div>

          <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-5xl">
            Cari barang hilangmu dengan lebih cepat
          </h2>
          <p className="mt-4 max-w-lg text-base text-sky-50/90">
            Platform Lost & Found kampus untuk melaporkan, mengecek, dan mengembalikan barang dengan aman.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-campus-700 transition hover:bg-slate-100">
              Lapor barang hilang
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              <Search className="h-4 w-4" />
              Cari barang
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.slice(0, 3).map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-xs text-sky-50/80">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Statistik</h3>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Aktif</span>
          </div>

          <div className="mt-6 space-y-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-campus-100 text-campus-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="text-xl font-extrabold text-slate-800">{value}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-campus-700">+12%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <FeatureCard icon={PackageSearch} title="Pelaporan cepat" text="Laporkan barang hilang dalam hitungan menit dengan form yang sederhana." />
        <FeatureCard icon={Search} title="Pencarian smart" text="Filter berdasarkan lokasi, nama, kategori, dan status barang." />
        <FeatureCard icon={HandCoins} title="Verifikasi aman" text="Sistem validasi dan status klaim untuk menjaga keamanan barang." />
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-campus-700">Barang terbaru</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-800">Temuan terkini</h3>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-campus-300 hover:text-campus-700">
            Lihat semua
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-campus-100 px-2.5 py-1 text-xs font-semibold text-campus-700">{item.category}</span>
                  <span className="text-xs font-medium text-slate-500">{item.date}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">{item.name}</h4>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-campus-600" />
                  {item.location}
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-campus-700">
                  Detail barang <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ItemsPage({ items }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'Semua' || item.category === category
      return matchesQuery && matchesCategory
    })
  }, [items, query, category])

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-campus-700">Katalog</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Barang hilang di kampus</h2>
          </div>

          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama barang atau lokasi..."
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? 'bg-campus-500 text-white shadow-soft'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-campus-300 hover:text-campus-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
            <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-campus-100 px-2.5 py-1 text-xs font-semibold text-campus-700">{item.category}</span>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  {item.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-campus-600" />
                {item.location}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-xs font-medium text-slate-500">Ditemukan: {item.date}</span>
                <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">
                  Klaim barang
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function ReportPage({ setItems }) {
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
      return
    }

    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      location: form.location,
      date: form.date,
      status: 'Menunggu diambil',
      description: form.description,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
    }

    setItems((prev) => [newItem, ...prev])
    setForm({ name: '', category: 'Tas', location: '', date: '', description: '' })
    alert('Laporan barang hilang berhasil dikirim!')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-campus-800 p-8 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Laporkan</p>
        <h2 className="mt-3 text-3xl font-extrabold">Barang yang hilang atau ditemukan</h2>
        <p className="mt-4 text-slate-200">
          Isi informasi dengan lengkap agar petugas kampus dapat memverifikasi dan menghubungi pemilik barang dengan cepat.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <PackageSearch className="h-5 w-5 text-sky-300" />
            <div>
              <p className="font-semibold">Verifikasi cepat</p>
              <p className="text-sm text-slate-300">Tim kampus mengecek laporan dalam 1x24 jam.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <MapPin className="h-5 w-5 text-sky-300" />
            <div>
              <p className="font-semibold">Lokasi pencarian</p>
              <p className="text-sm text-slate-300">Pilih area dan titik penemuan yang paling akurat.</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="text-2xl font-extrabold text-slate-800">Form laporan</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Nama barang</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Contoh: Tas sekolah" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Kategori</span>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white">
              <option>Tas</option>
              <option>Elektronik</option>
              <option>Aksesori</option>
              <option>Dompet</option>
              <option>Dokumen</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Tanggal</span>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Lokasi penemuan / kehilangan</span>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Contoh: Gedung A, lantai 2" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Deskripsi</span>
            <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Jelaskan ciri-ciri barang, warna, atau detail penting..." />
          </label>
        </div>

        <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-campus-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-campus-600">
          Kirim laporan
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

function NotificationsPage() {
  const notifications = [
    { title: 'Barang berhasil diverifikasi', detail: 'Tas hitam di Perpustakaan Pusat siap diklaim oleh pemilik.', time: '10 menit lalu' },
    { title: 'Permintaan validasi baru', detail: 'Kunci motor parkiran utara menunggu konfirmasi pemilik.', time: '1 jam lalu' },
    { title: 'Update status barang', detail: 'Laptop ASUS telah dikonfirmasi oleh petugas keamanan.', time: '2 jam lalu' }
  ]

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-campus-700">Notifikasi</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Aktivitas terbaru</h2>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-campus-100 text-campus-700">
              <BellRing className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoginPage({ onLogin, user }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'alya@campus.ac.id', password: '123456' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const matchedUser = demoUsers.find((item) => item.email === form.email && item.password === form.password)

    if (!matchedUser) {
      setError('Email atau password salah. Gunakan akun demo.')
      return
    }

    onLogin(matchedUser)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#dff7ff,_#eef9ff_30%,_#f8fafc_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-campus-700 via-campus-600 to-sky-400 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_38%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">Campus</p>
                <h1 className="text-2xl font-extrabold">Lost & Found</h1>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">Portal mahasiswa</p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight">Selamat datang di sistem pelaporan barang hilang kampus.</h2>
              <p className="mt-4 max-w-md text-sky-50/90">
                Lacak, laporkan, dan klaim barang hilang dengan proses yang cepat, aman, dan mudah diakses.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <InfoBadge icon={PackageSearch} label="Barang" value="248" />
              <InfoBadge icon={CheckCircle2} label="Terklaim" value="182" />
              <InfoBadge icon={ShieldCheck} label="Aman" value="24/7" />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-campus-700">Masuk</p>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">Halo, mahasiswa!</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Email kampus</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-campus-400 focus-within:bg-white">
                <Mail className="h-4 w-4 text-slate-500" />
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none" placeholder="you@example.com" />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-campus-400 focus-within:bg-white">
                <KeyRound className="h-4 w-4 text-slate-500" />
                <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none" placeholder="Masukkan password" />
              </div>
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-campus-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-campus-600">
              Masuk
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
              <span className="flex-1 border-t border-slate-200" />
              atau
              <span className="flex-1 border-t border-slate-200" />
            </div>

            <button type="button" onClick={() => navigate('/register')} className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-campus-300 hover:text-campus-700">
              Buat akun baru
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function RegisterPage({ onLogin }) {
  const navigate = useNavigate()
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

    onLogin(user)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#eefbff,_#f8fafc_55%,_#eef2f7_100%)] px-4 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-campus-700">Daftar</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Buat akun mahasiswa</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Nama lengkap</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Masukkan nama lengkap" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email kampus</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="nama@campus.ac.id" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Fakultas / Program studi</span>
            <input type="text" name="faculty" value={form.faculty} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Contoh: Teknik Informatika" required />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-campus-400 focus:bg-white" placeholder="Buat password" required />
          </label>

          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-campus-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-campus-600">
            Daftar sekarang
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-center text-sm text-slate-600">
            Sudah punya akun?{' '}
            <button type="button" onClick={() => navigate('/login')} className="font-semibold text-campus-700">
              Masuk di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-campus-100 text-campus-700">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function InfoBadge({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xl font-extrabold">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-sky-100">{label}</p>
    </div>
  )
}

export default App
