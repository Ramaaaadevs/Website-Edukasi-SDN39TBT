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
  const [namaSiswa, setNamaSiswa] = useState("");
  const [sudahSimpan, setSudahSimpan] = useState(false);

  const handleSimpanKeLeaderboard = () => {
    if (!namaSiswa.trim() || !hasil) return;

    const mapel = hasil.mapelSlug || "random";
    const kelas = hasil.kelasId || "5";
    const key = `${mapel}_${kelas}`;

    // Ambil data lama
    const dataLokal = JSON.parse(localStorage.getItem("papan_peringkat_lokal")) || {};
    const listPeringkat = dataLokal[key] || [];

    // Hitung kecepatan per soal
    const totalWaktuDetik = (hasil.waktuMenit || 20) * 60;
    const sisaWaktuDetik = hasil.waktuSisa !== undefined ? hasil.waktuSisa : 0;
    const waktuHabisDetik = totalWaktuDetik - sisaWaktuDetik;
    const totalSoal = hasil.totalSoal || 25;
    const kecepatanSoal = parseFloat((waktuHabisDetik / totalSoal).toFixed(1));

    // Tambahkan data baru
    const dataBaru = {
      nama: namaSiswa.trim(),
      skor: hasil.nilai,
      sisaWaktu: sisaWaktuDetik,
      totalSoal: totalSoal,
      kecepatanSoal: kecepatanSoal,
      tanggal: new Date().toLocaleDateString("id-ID")
    };

    listPeringkat.push(dataBaru);

    // Simpan maksimal 50 data untuk disortir
    dataLokal[key] = listPeringkat.slice(0, 50);

    localStorage.setItem("papan_peringkat_lokal", JSON.stringify(dataLokal));
    setSudahSimpan(true);
  };


  useEffect(() => {
    // Ambil data dari LocalStorage dengan aman
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
      
      {/* Efek Konfeti Jika Lulus (Optional) - Dinonaktifkan untuk stabilitas & performa di Smart TV */}
      {/* isLulus && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} /> */}

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

            {/* Papan Peringkat Form Input */}
            {hasil.nilai >= 70 && (
              <div className="mb-8 border-2 border-dashed rounded-3xl p-5 bg-slate-50 border-slate-200">
                {!sudahSimpan ? (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-2 text-[#2E2856]">
                      <Trophy className="text-yellow-500 fill-yellow-500" size={20} />
                      <h3 className="font-extrabold text-sm sm:text-base">Masuk Papan Juara Cilik!</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Skormu hebat! Ketik nama panggilanmu untuk dipajang di papan juara:</p>
                    <div className="flex gap-2 max-w-md mx-auto">
                      <input
                        type="text"
                        maxLength={12}
                        value={namaSiswa}
                        onChange={(e) => setNamaSiswa(e.target.value)}
                        placeholder="Ketik nama panggilan..."
                        className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white font-bold text-xs sm:text-sm text-gray-700 shadow-inner"
                      />
                      <button
                        onClick={handleSimpanKeLeaderboard}
                        disabled={!namaSiswa.trim()}
                        className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 text-yellow-950 font-black px-5 py-2 rounded-xl transition cursor-pointer text-xs sm:text-sm"
                      >
                        Simpan
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1 text-green-700">
                      <CheckCircle className="fill-green-100" size={20} />
                      <h3 className="font-extrabold text-sm sm:text-base">Berhasil Disimpan!</h3>
                    </div>
                    <p className="text-xs text-gray-500">Namamu sudah tercatat. Ayo cek posisimu di papan peringkat juara!</p>
                    <Link href="/leaderboard" className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition">
                      Lihat Papan Juara ➔
                    </Link>
                  </div>
                )}
              </div>
            )}

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
              Mapel: <span className="font-bold capitalize text-gray-600">{hasil.mapelSlug ? hasil.mapelSlug.replace(/-/g, " ") : "-"}</span> • 
              Bab: <span className="font-bold capitalize text-gray-600">{hasil.babSlug ? hasil.babSlug.replace(/-/g, " ") : "-"}</span>
           </div>

        </div>

      </div>
    </div>
  );
}