import { Search, MapPin, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'

const CATEGORIES = ['Semua', 'Tas', 'Elektronik', 'Aksesori', 'Dompet', 'Dokumen']

const ITEMS = [
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
  },
  {
    id: 4,
    name: 'Dompet Kulit',
    category: 'Dompet',
    location: 'Kantin Selatan',
    date: '2026-09-15',
    status: 'Menunggu diambil',
    description: 'Dompet kulit berisi KTM',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80'
  }
]

export default function Items() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')

  const filtered = useMemo(() => {
    return ITEMS.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'Semua' || item.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">Katalog</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-800">Barang hilang di kampus</h2>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama barang atau lokasi..."
              className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-md hover:shadow-lg transition">
            <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{item.category}</span>
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-semibold text-yellow-700">{item.status}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                {item.location}
              </div>
              <p className="mt-3 text-sm text-gray-600">{item.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-xs font-medium text-gray-500">Ditemukan: {item.date}</span>
                <button className="rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-700">
                  Klaim
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
