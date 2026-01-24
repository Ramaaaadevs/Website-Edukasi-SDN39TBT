"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Eye, PlayCircle } from "lucide-react"; 

export default function HalamanResult() {
  const router = useRouter();
  const [hasil, setHasil] = useState(null);

  useEffect(() => {
    // Ambil data dari LocalStorage saat halaman dimuat
    const data = localStorage.getItem("hasilUjianTerbaru");
    if (data) {
      setHasil(JSON.parse(data));
    } else {
      router.push("/"); // Redirect jika tidak ada data
    }
  }, [router]);

  if (!hasil) return null; // Loading state

  const formatWaktu = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] flex flex-col items-center justify-center p-6 font-sans">
      
      <h1 className="text-3xl md:text-4xl font-black text-[#2E2856] mb-8 text-center animate-in slide-in-from-bottom-4">
        {hasil.skor >= 70 ? "Hore! Kamu Luar Biasa!" : "Tetap Semangat! Coba Lagi Ya!"}
      </h1>

      <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-xl w-full max-w-md text-center animate-in zoom-in-95">
        <div className="flex justify-center items-end gap-2 mb-6">
          <Star className={`w-10 h-10 ${hasil.skor >= 70 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} transform -rotate-12`} />
          <Star className={`w-14 h-14 ${hasil.skor === 100 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} -mb-2`} />
          <Star className={`w-10 h-10 ${hasil.skor >= 70 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} transform rotate-12`} />
        </div>

        <p className="text-yellow-500 font-bold tracking-widest text-sm mb-2">SKOR AKHIR</p>
        <div className="text-8xl font-black text-[#2E2856] mb-8">{hasil.skor}</div>

        <div className="grid grid-cols-2 border-t border-gray-100 pt-6">
          <div className="flex flex-col items-center border-r border-gray-100">
             <span className="text-yellow-500 text-xs font-bold mb-1">JAWABAN BENAR</span>
             <span className="text-xl font-black text-[#00CBB8]">
               {hasil.benar} <span className="text-gray-400 text-base font-medium">/ {hasil.totalSoal}</span>
             </span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-yellow-500 text-xs font-bold mb-1">WAKTU</span>
             <span className="text-xl font-black text-[#2E2856]">{formatWaktu(hasil.waktu)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-8 w-full max-w-md justify-center">
          <Link href="/result/pembahasan" className="flex-1">
            <button className="w-full bg-white text-[#2E2856] py-3 px-6 rounded-full font-bold shadow-md hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Eye size={20} className="text-[#2E2856]"/> <span className="whitespace-nowrap">Lihat Jawaban</span>
            </button>
          </Link>
          
          <Link href={`/modul/${hasil.mapelSlug}`} className="flex-1">
            <button className="w-full bg-[#FFC629] text-white py-3 px-6 rounded-full font-bold shadow-md hover:bg-[#eebb27] transition flex items-center justify-center gap-2">
              <PlayCircle size={20} fill="white" className="text-[#FFC629]" /> <span className="whitespace-nowrap">Ke Materi Lain</span>
            </button>
          </Link>
      </div>
    </div>
  );
}