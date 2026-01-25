"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function HalamanPilihKelasUjian() {
  const { mapelSlug } = useParams();

  // Hanya Kelas 5 dan 6 dengan warna beda
  const daftarKelas = [
    { 
      id: 5, 
      label: "Kelas 5", 
      style: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-400" 
    },
    { 
      id: 6, 
      label: "Kelas 6", 
      style: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400" 
    }
  ];

  // Helper Judul
  const formatJudul = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER (TIDAK BERUBAH) */}
        <div className="mb-10">
          <Link 
            href="/ujian" 
            className="flex items-center text-gray-400 hover:text-blue-600 font-bold mb-4 transition w-fit"
          >
            <ChevronLeft size={20}/> Ganti Mata Pelajaran
          </Link>
          
          <div className="inline-block bg-white border border-gray-200 text-gray-600 px-4 py-1 rounded-full font-bold text-sm mb-2 capitalize">
            Mapel: {formatJudul(mapelSlug)}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-[#2E2856]">
            Pilih Kelas
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Pilih kelasmu untuk memulai ujian.
          </p>
        </div>

        {/* AREA KELAS (DITENGAHIN & GANTI CSS KOTAK) */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
          {daftarKelas.map((item) => (
            <Link 
              key={item.id} 
              href={`/ujian/${mapelSlug}/${item.id}`}
              className={`group w-64 h-64 rounded-3xl border-4 ${item.style} flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer`}
            >
              <div className="text-6xl font-black mb-2 opacity-80 group-hover:scale-110 transition-transform">
                {item.id}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">
                {item.label}
              </h3>
              <span className="mt-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Mulai Ujian ➔
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}