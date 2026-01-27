"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HalamanPilihMapelUjian() {
  const router = useRouter();

  const daftarMapel = [
    { slug: "matematika", judul: "Matematika", icon: "📐", warna: "from-red-500 to-orange-500" },
    { slug: "ipa", judul: "Ilmu Pengetahuan Alam", icon: "🌱", warna: "from-green-500 to-emerald-500" },
    { slug: "komputer", judul: "Komputer", icon: "💻", warna: "from-purple-500 to-pink-500" },
    { slug: "bahasa-inggris", judul: "Bahasa Inggris", icon: "🇬🇧", warna: "from-blue-500 to-indigo-500" },
    { slug: "random", judul: "Random", icon: "🎲", warna: "from-yellow-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="flex items-center text-gray-400 hover:text-blue-600 font-bold mb-4 transition w-fit">
            <ChevronLeft size={20}/> Kembali ke Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-[#2E2856]">
            Ujian Akhir 
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Pilih mata pelajaran yang ingin diujikan.
          </p>
        </div>

        {/* Grid Mapel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {daftarMapel.map((mapel) => (
            <Link 
              key={mapel.slug}
              href={`/ujian/${mapel.slug}`}
              className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 cursor-pointer h-64 flex flex-col justify-between"
            >
              {/* Background Gradient Circle */}
              <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${mapel.warna} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mapel.warna} flex items-center justify-center text-3xl text-white shadow-lg mb-4`}>
                {mapel.icon}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {mapel.judul}
                </h2>
                <p className="text-gray-400 text-sm mt-2">Masuk ke pemilihan kelas ➔</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}