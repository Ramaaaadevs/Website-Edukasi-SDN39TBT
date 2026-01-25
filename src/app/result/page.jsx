"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trophy, CheckCircle, XCircle, Home, RotateCcw, FileText } from "lucide-react";
// import Confetti from "react-confetti"; // Optional: Efek Konfeti (kalau belum install, hapus baris ini)

export default function HalamanResult() {
  const router = useRouter();
  
  // STATE
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 1. Set ukuran window untuk konfeti (biar fit screen)
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // 2. Ambil data dari LocalStorage dengan aman
    const dataDisimpan = localStorage.getItem("hasilUjian");

    if (dataDisimpan) {
      // Jika data ada, simpan ke state
      setHasil(JSON.parse(dataDisimpan));
      setLoading(false);
    } else {
      // Jika data KOSONG, jangan langsung redirect! 
      // Tunggu sebentar (500ms) siapa tau localStorage telat loading, baru redirect.
      const timer = setTimeout(() => {
         router.replace("/"); // Redirect aman
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [router]);

  // TAMPILAN LOADING (Penting agar tidak kedip lalu redirect)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // Jika hasil null (sudah redirect), return null aja
  if (!hasil) return null;

  // Logic Warna Skor & Pesan
  const isLulus = hasil.nilai >= 70;
  const pesan = isLulus ? "Luar Biasa!" : "Tetap Semangat!";
  const subPesan = isLulus 
    ? "Kamu berhasil menaklukkan ujian ini." 
    : "Jangan menyerah, coba pelajari materinya lagi ya.";
  const warnaNilai = isLulus ? "text-green-600" : "text-orange-500";
  const bgNilai = isLulus ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200";

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-6">
      
      {/* Efek Konfeti Jika Lulus (Optional) */}
      {isLulus && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />}

      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white ring-4 ring-blue-50 relative animate-fade-in-up">
        
        {/* Header Background */}
        <div className={`h-32 w-full ${isLulus ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-orange-400 to-red-500"} flex items-center justify-center`}>
           <Trophy className="text-white drop-shadow-md animate-bounce" size={60} />
        </div>

        <div className="px-8 pb-10 pt-2 text-center -mt-12">
           
           {/* Kotak Nilai */}
           <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 inline-block mb-6 relative">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">Nilai Akhir</span>
              <span className={`text-6xl md:text-7xl font-black ${warnaNilai}`}>
                {hasil.nilai}
              </span>
           </div>

           <h1 className="text-3xl md:text-4xl font-black text-[#2E2856] mb-2">
             {pesan}
           </h1>
           <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
             {subPesan}
           </p>

           {/* Statistik Grid */}
           <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                 <div className="bg-green-100 text-green-600 p-2 rounded-full"><CheckCircle size={24}/></div>
                 <div className="text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase">Benar</p>
                    <p className="text-xl font-black text-green-700">{hasil.benar}</p>
                 </div>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
                 <div className="bg-red-100 text-red-600 p-2 rounded-full"><XCircle size={24}/></div>
                 <div className="text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase">Salah</p>
                    <p className="text-xl font-black text-red-700">{hasil.salah}</p>
                 </div>
              </div>
           </div>

           {/* Tombol Aksi */}
           <div className="flex flex-col md:flex-row gap-3 justify-center">
              <Link 
                href="/ujian" 
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                <RotateCcw size={18}/> Coba Lagi
              </Link>
              
              {/* Tombol Pembahasan (Opsional, kalau mau dibuat nanti) */}
              <Link 
                 href="/result/pembahasan" 
                 className="flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-200 transition"
              >
                 <FileText size={18}/> Lihat Pembahasan
              </Link>

              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition"
              >
                <Home size={18}/> Ke Beranda
              </Link>
           </div>
           
           <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
              Mapel: <span className="font-bold capitalize text-gray-600">{hasil.mapelSlug ? hasil.mapelSlug.replace("-", " ") : "-"}</span> • 
              Bab: <span className="font-bold capitalize text-gray-600">{hasil.babSlug ? hasil.babSlug.replace("-", " ") : "-"}</span>
           </div>

        </div>

      </div>
    </div>
  );
}