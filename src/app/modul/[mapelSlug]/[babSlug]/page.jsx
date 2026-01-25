"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// IMPORT DATA ALUR BELAJAR (YANG BARU KITA BUAT)
import { databaseAlurBelajar } from "@/data/alur-belajar";

export default function HalamanBelajarInteraktif() {
  const params = useParams();
  const router = useRouter();
  const { mapelSlug, babSlug } = params;

  // --- LOGIC DINAMIS ---
  // Ambil alur belajar berdasarkan babSlug dari URL
  // Jika bab tidak ditemukan, pakai data 'default'
  const alurBelajar = databaseAlurBelajar[babSlug] || databaseAlurBelajar["default"];

  // --- STATE ---
  const [stepAktif, setStepAktif] = useState(0); 
  const [indexSoalMini, setIndexSoalMini] = useState(0); 
  const [jawabanUser, setJawabanUser] = useState(null); 
  const [feedback, setFeedback] = useState(null); 

  // Amankan jika stepAktif melebihi panjang array (misal reload)
  const kontenAktif = alurBelajar[stepAktif] || alurBelajar[0];

  // --- FUNGSI NAVIGASI (SAMA SEPERTI SEBELUMNYA) ---
  const handleNextStep = () => {
    setStepAktif(stepAktif + 1);
    setIndexSoalMini(0);
    setFeedback(null);
    setJawabanUser(null);
  };

  const handleJawab = (opsi, kunciJawaban) => {
    setJawabanUser(opsi);
    if (opsi === kunciJawaban) {
      setFeedback("benar");
    } else {
      setFeedback("salah");
    }
  };

  const handleNextSoal = () => {
    const totalSoalSesiIni = kontenAktif.soal.length;
    if (indexSoalMini < totalSoalSesiIni - 1) {
      setIndexSoalMini(indexSoalMini + 1);
      setJawabanUser(null);
      setFeedback(null);
    } else {
      handleNextStep();
    }
  };

  // --- RENDER HALAMAN ---
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      
      {/* HEADER NAVIGATION */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <Link href={`/modul/${mapelSlug}?kelas=5`} className="flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Kembali ke Modul
        </Link>
        <div className="text-blue-900 font-bold text-lg hidden md:block capitalize">
           {babSlug.replace("-", " ")}: {kontenAktif.tipe === 'kuis' ? 'Latihan' : 'Materi'}
        </div>
        <div className="w-20"></div> 
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-yellow-400 h-2 transition-all duration-500"
          style={{ width: `${((stepAktif) / (alurBelajar.length - 1)) * 100}%` }}
        ></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">

          {/* 1. TAMPILAN MATERI */}
          {kontenAktif.tipe === "materi" && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                📖 Materi Belajar
              </span>
              <h1 className="text-4xl font-black text-blue-900 mb-6">{kontenAktif.judul}</h1>
              
              <div className="mb-10 text-gray-700 text-lg leading-relaxed">
                {/* Render isi materi (bisa berupa String atau JSX) */}
                {kontenAktif.isi}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNextStep}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-blue-200 shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Lanjut <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* 2. TAMPILAN KUIS */}
          {kontenAktif.tipe === "kuis" && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-8">
                 <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold">
                  ⚡ Latihan {indexSoalMini + 1} / {kontenAktif.soal.length}
                </span>
                <span className="text-gray-400 font-bold text-sm">Latihan Pemahaman</span>
              </div>

              {/* Data Soal Aktif */}
              {(() => {
                const soalSaatIni = kontenAktif.soal[indexSoalMini];
                return (
                  <>
                    <div className="text-center mb-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {soalSaatIni.PERTANYAAN}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {["A", "B", "C", "D"].map((opsi) => {
                        const isSelected = jawabanUser === opsi;
                        const isCorrectKey = soalSaatIni["JAWABAN BENAR"] === opsi;
                        
                        let btnColor = "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400";
                        if (isSelected) {
                          if (feedback === "benar") btnColor = "bg-green-100 border-2 border-green-500 text-green-800";
                          if (feedback === "salah") btnColor = "bg-red-100 border-2 border-red-500 text-red-800";
                        }
                        if (feedback === "salah" && isCorrectKey) {
                          btnColor = "bg-green-50 border-2 border-green-300 text-green-800";
                        }

                        return (
                          <button
                            key={opsi}
                            disabled={feedback !== null}
                            onClick={() => handleJawab(opsi, soalSaatIni["JAWABAN BENAR"])}
                            className={`p-6 rounded-2xl text-xl font-bold transition-all duration-200 ${btnColor} flex items-center justify-between group text-left`}
                          >
                            <span className="flex items-center gap-3 w-full">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${isSelected ? 'bg-white/50' : 'bg-gray-100'}`}>{opsi}</span>
                              <span className="flex-1">{soalSaatIni[opsi]}</span>
                            </span>
                            {isSelected && feedback === "benar" && <CheckCircle className="text-green-600 flex-shrink-0" />}
                            {isSelected && feedback === "salah" && <XCircle className="text-red-600 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {feedback && (
                      <div className={`p-4 rounded-xl mb-4 text-center animate-in slide-in-from-bottom-2 ${feedback === 'benar' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <p className="font-bold text-lg">
                          {feedback === "benar" ? "🎉 Benar!" : "😅 Kurang tepat."}
                        </p>
                        <p className="text-sm opacity-80 mt-1">{soalSaatIni.PEMBAHASAN}</p>
                      </div>
                    )}
                  </>
                );
              })()}

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

          {/* 3. TAMPILAN SELESAI */}
          {kontenAktif.tipe === "selesai" && (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto animate-in zoom-in-95">
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-3xl font-black text-blue-900 mb-4">{kontenAktif.judul}</h2>
              <p className="text-gray-600 text-lg mb-8">
                {kontenAktif.isi}
              </p>
              
              {/* Cek apakah ini default (kosong) atau beneran selesai */}
              {babSlug in databaseAlurBelajar ? (
                <Link href={`/modul/${mapelSlug}/${babSlug}/ujian`}>
                  <button className="w-full bg-yellow-400 text-yellow-900 text-xl font-black py-5 rounded-2xl shadow-yellow-200 shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform">
                    MULAI EVALUASI AKHIR 🚀
                  </button>
                </Link>
              ) : (
                <button onClick={() => router.back()} className="w-full bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200">
                  Kembali ke Daftar
                </button>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}