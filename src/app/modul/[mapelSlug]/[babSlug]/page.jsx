"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react"; // Pastikan install lucide-react jika belum

// IMPORT DATA SOAL (Gunakan data yang sama)
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan-materi.json";

// Mapping Database Soal
const databaseSoal = {
  "pecahan": soalMtkPecahan,
};

export default function HalamanBelajarInteraktif() {
  const params = useParams();
  const router = useRouter();
  const { mapelSlug, babSlug } = params;

  // Ambil soal dari JSON
  const fullListSoal = databaseSoal[babSlug] || soalMtkPecahan;

  // --- KONFIGURASI ALUR BELAJAR ---
  // Di sini kita atur urutan: Materi -> Kuis -> Materi -> Kuis
  const alurBelajar = [
    {
      tipe: "materi",
      judul: "Apa itu Pecahan?",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            Bayangkan kamu punya sebuah pizza utuh 🍕. Jika kamu memotongnya menjadi 4 bagian sama besar, maka satu potong itu disebut <strong>seperempat</strong> atau <strong>1/4</strong>.
          </p>
          <p>
            <strong>Pecahan</strong> adalah bilangan yang menggambarkan bagian dari keseluruhan. Angka di atas disebut <strong>Pembilang</strong> dan angka di bawah disebut <strong>Penyebut</strong>.
          </p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Yuk Coba Latihan Dulu!",
      // Ambil 3 soal pertama (indeks 0 sampai 3)
      soal: fullListSoal.slice(0, 3), 
    },
    {
      tipe: "materi",
      judul: "Penjumlahan Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            Bagaimana kalau kita mau menjumlahkan pecahan? 
            <br/>
            Contoh: <strong>1/4 + 2/4</strong>.
          </p>
          <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
            <strong>Ingat!</strong> Jika penyebutnya (angka bawah) sudah sama, kamu tinggal menjumlahkan pembilangnya (angka atas) saja.
          </div>
          <p>
            Jadi, 1/4 + 2/4 = <strong>3/4</strong>. Mudah kan?
          </p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Tantangan Penjumlahan!",
      // Ambil 3 soal berikutnya (indeks 3 sampai 6)
      soal: fullListSoal.slice(3, 6),
    },
    {
      tipe: "selesai",
      judul: "Materi Selesai!",
      isi: "Hebat! Kamu sudah menyelesaikan semua materi dan latihan mini. Sekarang saatnya ujian akhir untuk menguji pemahamanmu.",
    }
  ];

  // --- STATE ---
  const [stepAktif, setStepAktif] = useState(0); // Menandakan kita di step ke berapa
  
  // State khusus untuk Kuis Mini
  const [indexSoalMini, setIndexSoalMini] = useState(0); // Soal ke-brp di dalam sesi mini kuis
  const [jawabanUser, setJawabanUser] = useState(null); // Jawaban yg diklik user
  const [feedback, setFeedback] = useState(null); // 'benar' atau 'salah'

  const kontenAktif = alurBelajar[stepAktif];

  // --- FUNGSI NAVIGASI ---

  // 1. Fungsi saat tombol "Lanjut Materi" diklik
  const handleNextStep = () => {
    setStepAktif(stepAktif + 1);
    setIndexSoalMini(0); // Reset soal mini
    setFeedback(null);
    setJawabanUser(null);
  };

  // 2. Fungsi Cek Jawaban (Untuk Mini Quiz)
  const handleJawab = (opsi, kunciJawaban) => {
    setJawabanUser(opsi);
    if (opsi === kunciJawaban) {
      setFeedback("benar");
    } else {
      setFeedback("salah");
    }
  };

  // 3. Fungsi Lanjut Soal Berikutnya (Di dalam Mini Quiz)
  const handleNextSoal = () => {
    const totalSoalSesiIni = kontenAktif.soal.length;
    
    if (indexSoalMini < totalSoalSesiIni - 1) {
      // Masih ada soal di sesi ini
      setIndexSoalMini(indexSoalMini + 1);
      setJawabanUser(null);
      setFeedback(null);
    } else {
      // Soal sesi ini habis, lanjut ke Step Materi berikutnya
      handleNextStep();
    }
  };

  // --- RENDER HALAMAN ---
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      
      {/* HEADER NAVIGATION */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <Link href={`/modul/${mapelSlug}`} className="flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Kembali ke Modul
        </Link>
        <div className="text-blue-900 font-bold text-lg hidden md:block">
           Bab: {kontenAktif.tipe === 'kuis' ? 'Latihan Soal' : kontenAktif.judul}
        </div>
        <div className="w-20"></div> {/* Spacer biar tengah */}
      </div>

      {/* PROGRESS BAR GLOBAL */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-yellow-400 h-2 transition-all duration-500"
          style={{ width: `${((stepAktif) / (alurBelajar.length - 1)) * 100}%` }}
        ></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">

          {/* TAMPILAN JIKA TIPE MATERI */}
          {kontenAktif.tipe === "materi" && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                📖 Materi Belajar
              </span>
              <h1 className="text-4xl font-black text-blue-900 mb-6">{kontenAktif.judul}</h1>
              
              <div className="mb-10 text-gray-700">
                {kontenAktif.isi}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNextStep}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-blue-200 shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Lanjut Latihan <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* TAMPILAN JIKA TIPE KUIS */}
          {kontenAktif.tipe === "kuis" && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Header Kuis */}
              <div className="flex justify-between items-center mb-8">
                 <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold">
                  ⚡ Latihan {indexSoalMini + 1} / {kontenAktif.soal.length}
                </span>
                <span className="text-gray-400 font-bold">Skor tidak disimpan</span>
              </div>

              {/* Soal */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">
                  {kontenAktif.soal[indexSoalMini].PERTANYAAN}
                </h2>
              </div>

              {/* Pilihan Jawaban */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {["A", "B", "C", "D"].map((opsi) => {
                  const dataSoal = kontenAktif.soal[indexSoalMini];
                  const isSelected = jawabanUser === opsi;
                  const isCorrectKey = dataSoal["JAWABAN BENAR"] === opsi;
                  
                  // Logic warna tombol
                  let btnColor = "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400";
                  if (isSelected) {
                    if (feedback === "benar") btnColor = "bg-green-100 border-2 border-green-500 text-green-800";
                    if (feedback === "salah") btnColor = "bg-red-100 border-2 border-red-500 text-red-800";
                  }
                  // Tunjukkan jawaban benar jika user salah
                  if (feedback === "salah" && isCorrectKey) {
                    btnColor = "bg-green-100 border-2 border-green-500 text-green-800 ring-2 ring-green-300";
                  }

                  return (
                    <button
                      key={opsi}
                      disabled={feedback !== null} // Disable kalau sudah jawab
                      onClick={() => handleJawab(opsi, dataSoal["JAWABAN BENAR"])}
                      className={`p-6 rounded-2xl text-xl font-bold transition-all duration-200 ${btnColor} flex items-center justify-between group`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isSelected ? 'bg-white/50' : 'bg-gray-100'}`}>{opsi}</span>
                        {dataSoal[opsi]}
                      </span>
                      {isSelected && feedback === "benar" && <CheckCircle className="text-green-600" />}
                      {isSelected && feedback === "salah" && <XCircle className="text-red-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Tombol Lanjut */}
              {feedback && (
                <div className={`p-4 rounded-xl mb-4 text-center animate-in slide-in-from-bottom-2 ${feedback === 'benar' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  <p className="font-bold text-lg">
                    {feedback === "benar" ? "🎉 Yeay! Jawabanmu Benar!" : "😅 Ups, kurang tepat."}
                  </p>
                  <p className="text-sm opacity-80 mt-1">{kontenAktif.soal[indexSoalMini].PEMBAHASAN}</p>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button 
                  onClick={handleNextSoal}
                  disabled={!feedback}
                  className={`px-8 py-3 rounded-xl font-bold text-white transition-all transform ${!feedback ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:scale-105 shadow-lg shadow-blue-200'}`}
                >
                  {indexSoalMini < kontenAktif.soal.length - 1 ? "Soal Berikutnya" : "Lanjut Materi ➔"}
                </button>
              </div>
            </div>
          )}

          {/* TAMPILAN SELESAI / TRANSISI KE EVALUASI */}
          {kontenAktif.tipe === "selesai" && (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-3xl font-black text-blue-900 mb-4">Luar Biasa!</h2>
              <p className="text-gray-600 text-lg mb-8">
                Kamu sudah menyelesaikan sesi belajar dan latihan pemanasan. Sekarang, mari kita lihat seberapa jauh pemahamanmu.
              </p>
              
              <Link href={`/modul/${mapelSlug}/${babSlug}/evaluasi`}>
                <button className="w-full bg-yellow-400 text-yellow-900 text-xl font-black py-5 rounded-2xl shadow-yellow-200 shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform">
                  MULAI EVALUASI AKHIR 🚀
                </button>
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}