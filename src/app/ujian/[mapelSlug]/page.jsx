"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function HalamanPilihKelasUjian() {
  const { mapelSlug } = useParams();
  const router = useRouter();

  const daftarKelas = [5, 6];

  // Helper untuk format judul
  const formatJudul = (slug) => slug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/ujian" className="flex items-center text-gray-400 hover:text-blue-600 font-bold mb-4 transition w-fit">
            <ChevronLeft size={20}/> Ganti Mata Pelajaran
          </Link>
          
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold text-sm mb-2 capitalize">
            Mapel: {formatJudul(mapelSlug)}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-[#2E2856]">
            Pilih Kelasmu
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Sesuaikan dengan kelas kamu saat ini ya!
          </p>
        </div>

        {/* Grid Kelas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {daftarKelas.map((kelas) => (
            <Link 
              key={kelas} 
              href={`/ujian/${mapelSlug}/${kelas}`}
              className="group bg-white p-6 md:p-8 rounded-3xl border-2 border-transparent hover:border-blue-400 hover:bg-blue-50 shadow-sm hover:shadow-lg transition-all cursor-pointer text-center"
            >
              <div className="text-gray-300 font-black text-6xl md:text-7xl mb-2 opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all">
                {kelas}
              </div>
              <h3 className="text-xl font-bold text-gray-700 group-hover:text-blue-800">
                Kelas {kelas}
              </h3>
              <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Mulai Ujian ➔
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}