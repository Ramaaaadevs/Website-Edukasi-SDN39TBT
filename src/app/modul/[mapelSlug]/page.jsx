"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import Link from "next/link";

// ==========================================
// 1. DATA (Database Materi)
// ==========================================
const databaseMateri = {
  "matematika": {
    judul: "Matematika",
    deskripsi: "Ayo jadi jago hitung-hitungan!",
    gradient: "from-red-400 to-red-600",
    iconUtama: "📐",
    topik: [
      {
        id: 1,
        judul: "Pecahan",
        slug: "pecahan",
        deskripsi: "Belajar operasi hitung pecahan, penyederhanaan, dan pecahan campuran.",
        icon: "🍰", 
        warnaIcon: "text-red-500 bg-red-50",
        kelas: [5,6]
      },
      {
        id: 2,
        judul: "Perbandingan & Skala",
        slug: "perbandingan",
        deskripsi: "Memahami rasio, perbandingan senilai, dan cara membaca peta.",
        icon: "⚖️",
        warnaIcon: "text-orange-500 bg-orange-50",
        kelas: [5,6]
      },
      {
        id: 3,
        judul: "Bangun Ruang",
        slug: "bangun-ruang",
        deskripsi: "Menghitung volume, luas permukaan, dan jaring-jaring kubus & balok.",
        icon: "📦",
        warnaIcon: "text-blue-500 bg-blue-50",
        kelas: [5,6]
      },
      {
        id: 4,
        judul: "FPB & KPK",
        slug: "fpb-kpk",
        deskripsi: "Belajar faktorisasi prima, pohon faktor, dan menyelesaikan masalah sehari-hari.",
        icon: "🌳", 
        warnaIcon: "text-green-500 bg-green-50",
        kelas: [6]
      }
    ]
  },
  "ipa": {
    judul: "Ilmu Pengetahuan Alam",
    deskripsi: "Menjelajahi keajaiban alam semesta!",
    gradient: "from-green-400 to-green-600",
    iconUtama: "🌱",
    topik: [
      {
        id: 1,
        judul: "Makhluk Hidup & Lingkungan",
        slug: "makhluk-hidup",
        deskripsi: "Pelajari tubuh manusia, hewan, tumbuhan, serta hubungan dalam ekosistem.",
        icon: "🦁", 
        warnaIcon: "text-emerald-500 bg-emerald-50",
        kelas: [5, 6]
      },
      {
        id: 2,
        judul: "Benda & Sifatnya",
        slug: "benda-sifat",
        deskripsi: "Eksperimen wujud zat, perubahan suhu, dan sifat-sifat cahaya.",
        icon: "🧊",
        warnaIcon: "text-cyan-500 bg-cyan-50",
        kelas: [5]
      },
      {
        id: 3,
        judul: "Gaya & Energi",
        slug: "gaya-energi",
        deskripsi: "Pahami gaya gravitasi, magnet, bunyi, dan sumber energi matahari.",
        icon: "⚡",
        warnaIcon: "text-yellow-500 bg-yellow-50",
        kelas: [5]
      }
    ]  
  },
  // --- BAGIAN INI YANG DIPERBAIKI ---
  "bahasa-inggris": { 
    judul: "Bahasa Inggris",
    deskripsi: "Let's speak English fluently!",
    gradient: "from-blue-400 to-indigo-600",
    iconUtama: "🇬🇧",
    topik: [
      {
        id: 1,
        judul: "Basic Vocabulary", 
        slug: "vocab",
        deskripsi: "Kosakata dasar tentang sekolah, lingkungan, dan benda sekitar.",
        icon: "📘", 
        warnaIcon: "text-green-500 bg-green-50",
        kelas: [4, 5, 6] // Saya tambahkan ini agar muncul di semua kelas
      },
      {
        id: 2,
        judul: "Daily Life & Reading", 
        slug: "reading",
        deskripsi: "Percakapan sehari-hari, teks bacaan, dan interaksi sosial.",
        icon: "🗣️",
        warnaIcon: "text-orange-500 bg-orange-50",
        kelas: [5, 6]
      },
      {
        id: 3,
        judul: "Grammar & Knowledge", 
        slug: "grammar",
        deskripsi: "Tata bahasa (Tenses), kesehatan, dan pengetahuan umum.",
        icon: "🧠", 
        warnaIcon: "text-purple-500 bg-purple-50",
        kelas: [5]
      }
    ]
  },
  "default": {
    judul: "Materi Belajar",
    deskripsi: "Pilih materi yang ingin kamu pelajari.",
    gradient: "from-blue-400 to-blue-600",
    iconUtama: "📚",
    topik: []
  }
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const Breadcrumb = ({ judulMapel, kelasAktif }) => (
  <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-6">
    <Link href={`/modul?kelas=${kelasAktif}`} className="hover:text-blue-600 transition-colors">
      Modul
    </Link>
    <span>/</span>
    <span className="text-blue-600 capitalize">{judulMapel}</span>
  </div>
);

const HeaderBanner = ({ data, kelasAktif, onBack, onGantiKelas }) => (
  <div className={`rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl mb-10 bg-gradient-to-r ${data.gradient}`}>
    <div className="relative z-10 w-full md:w-2/3">
      <button 
        onClick={onBack} 
        className="flex items-center text-sm font-bold opacity-80 hover:opacity-100 transition mb-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Ganti Pelajaran
      </button>

      <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-2">
        {data.judul}
      </h1>
      
      {/* --- BAGIAN DROPDOWN PILIH KELAS (DITAMBAHKAN KEMBALI) --- */}
      <div className="flex items-center gap-3 mt-4">
        <p className="text-white/90 text-lg font-medium">Materi untuk:</p>
        <div className="relative">
          <select 
            value={kelasAktif}
            onChange={(e) => onGantiKelas(e.target.value)}
            className="appearance-none bg-white/20 hover:bg-white/30 text-white font-bold py-2 pl-4 pr-10 rounded-xl border border-white/30 backdrop-blur-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          >
            {[5, 6].map((k) => (
              <option key={k} value={k} className="text-gray-800 bg-white">
                Kelas {k}
              </option>
            ))}
          </select>
          {/* Icon Panah Dropdown */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------- */}

    </div>

    <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 text-[10rem] opacity-20 rotate-12 select-none pointer-events-none">
      {data.iconUtama}
    </div>
  </div>
);

const TopicCard = ({ item, mapelSlug, kelasAktif }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-transparent hover:border-blue-200 group flex flex-col h-full">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 ${item.warnaIcon}`}>
      {item.icon}
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.judul}</h3>
    <p className="text-gray-500 text-sm mb-6 flex-1">{item.deskripsi}</p>

    <Link href={`/modul/${mapelSlug}/${item.slug}?kelas=${kelasAktif}`} className="w-full mt-auto">
      <button className="w-full py-3 rounded-xl font-bold bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        Mulai Belajar ➔
      </button>
    </Link>
  </div>
);

const EmptyState = ({ kelasAktif }) => (
  <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
    <div className="text-6xl mb-4 grayscale opacity-30">📭</div>
    <h3 className="text-xl font-bold text-gray-400">Belum ada materi untuk Kelas {kelasAktif}</h3>
    <p className="text-gray-400 text-sm">Coba cek pelajaran lain atau kembali lagi nanti ya!</p>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function HalamanSubModul() {
  const params = useParams();       
  const searchParams = useSearchParams(); 
  const router = useRouter();

  const slug = params.mapelSlug; 
  const kelasAktif = parseInt(searchParams.get("kelas")) || 5; 
  
  // Logic: Ambil data berdasarkan slug, fallback ke default jika tidak ketemu
  const dataCurrent = databaseMateri[slug] || databaseMateri["default"];

  // Logic: Filtering Kelas
  const listTopikTersedia = dataCurrent.topik.filter(item => {
    // Jika di data ada properti 'kelas', filter berdasarkan itu
    if (item.kelas) {
      return item.kelas.includes(kelasAktif);
    }
    // Jika tidak ada properti 'kelas', berarti materi ini untuk semua kelas
    return true; 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8 max-w-7xl mx-auto w-full">
        
        <Breadcrumb 
          judulMapel={dataCurrent.judul} 
          kelasAktif={kelasAktif} 
        />

        <HeaderBanner 
          data={dataCurrent} 
          kelasAktif={kelasAktif} 
          onBack={() => router.back()} 
          onGantiKelas={(kelasBaru) => {
            // Logic ganti URL saat dropdown dipilih
            router.push(`/modul/${slug}?kelas=${kelasBaru}`);
          }}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900">Pilih Topik Belajar</h2>
          <p className="text-gray-500">Selesaikan satu per satu ya!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listTopikTersedia.length > 0 ? (
            listTopikTersedia.map((item) => (
              <TopicCard 
                key={item.id} 
                item={item} 
                mapelSlug={slug} 
                kelasAktif={kelasAktif} 
              />
            ))
          ) : (
            <EmptyState kelasAktif={kelasAktif} />
          )}
        </div>

      </main>
    </div>
  );
}