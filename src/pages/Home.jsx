import { ArrowRight, CheckCircle2, FolderSearch, PackageSearch, ShieldCheck } from 'lucide-react'

const stats = [
  { label: 'Barang terlapor', value: '248', icon: PackageSearch },
  { label: 'Sudah diklaim', value: '182', icon: CheckCircle2 },
  { label: 'Belum diambil', value: '66', icon: FolderSearch },
  { label: 'Keamanan aktif', value: '24/7', icon: ShieldCheck }
]

const featured = [
  {
    id: 1,
    name: 'Tas Hitam',
    category: 'Tas',
    location: 'Perpustakaan Pusat',
    date: '2026-09-20',
    status: 'Menunggu diambil',
    description: 'Tas hitam berisi buku dan laptop',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Kunci Motor',
    category: 'Aksesori',
    location: 'Parkiran Utara',
    date: '2026-09-18',
    status: 'Diklaim',
    description: 'Kunci motor dengan gantungan pink',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Laptop ASUS',
    category: 'Elektronik',
    location: 'Laboratorium 3',
    date: '2026-09-17',
    status: 'Sedang diverifikasi',
    description: 'Laptop ASUS warna abu-abu',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
  }
]

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-400 p-8 text-white shadow-xl sm:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            Sistem berbasis kampus
          </div>
          <h2 className="max-w-lg text-4xl font-extrabold leading-tight sm:text-5xl">
            Cari barang hilangmu dengan lebih cepat
          </h2>
          <p className="mt-4 max-w-lg text-base text-blue-50/90">
            Platform Lost & Found kampus untuk melaporkan, mengecek, dan mengembalikan barang dengan aman.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-gray-100">
              Lapor barang hilang
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20">
              Cari barang
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Statistik</h3>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Aktif</span>
          </div>
          <div className="mt-6 space-y-4">
            {stats.slice(0, 4).map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-xl font-extrabold text-gray-800">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">Barang terbaru</p>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-800">Temuan terkini</h3>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[28px] border border-gray-200 bg-gray-50 shadow-md hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{item.category}</span>
                  <span className="text-xs font-medium text-gray-500">{item.date}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                <p className="mt-2 text-sm text-gray-600">{item.location}</p>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800">
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
