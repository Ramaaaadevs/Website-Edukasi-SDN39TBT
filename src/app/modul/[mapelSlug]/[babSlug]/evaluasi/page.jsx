"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 

// IMPORT DATA SOAL
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";

export default function HalamanEvaluasi() {
  const { mapelSlug, babSlug } = useParams();
  const router = useRouter();
// 2. LOGIC PILIH SOAL BERDASARKAN URL (SLUG)
  let dataSoal = [];

  if (mapelSlug === 'bahasa-inggris') {
     // Bisa ditambah logic babSlug juga kalau bab-nya banyak
     dataSoal = soalBingGreeting;
  } else if (mapelSlug === 'matematika') {
     dataSoal = soalMtkPecahan;
  } else {
     dataSoal = soalMtkPecahan; // Default fallback
  }

  const [indexSoal, setIndexSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({}); 
  const [waktuBerjalan, setWaktuBerjalan] = useState(0); 

  // --- TIMER ---
  useEffect(() => {
    const timer = setInterval(() => {
      setWaktuBerjalan((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWaktu = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handlePilihJawaban = (opsi) => {
    setJawabanUser({ ...jawabanUser, [indexSoal]: opsi });
  };

  const handleNext = () => {
    if (indexSoal < dataSoal.length - 1) setIndexSoal(indexSoal + 1);
  };

  const handlePrev = () => {
    if (indexSoal > 0) setIndexSoal(indexSoal - 1);
  };

  // --- FINISH QUIZ ---
  const handleSelesai = () => {
    // 1. Hitung Nilai
    let benar = 0;
    dataSoal.forEach((soal, idx) => {
      if (jawabanUser[idx] === soal["JAWABAN BENAR"]) benar++;
    });
    const skorAkhir = Math.round((benar / dataSoal.length) * 100);

    // 2. Simpan Data ke LocalStorage agar bisa dibaca di halaman Result & Pembahasan
    const hasilUjian = {
      skor: skorAkhir,
      benar: benar,
      totalSoal: dataSoal.length,
      waktu: waktuBerjalan,
      jawabanUser: jawabanUser,
      mapelSlug: mapelSlug,
      babSlug: babSlug
    };
    
    localStorage.setItem("hasilUjianTerbaru", JSON.stringify(hasilUjian));

    // 3. Pindah Halaman
    router.push("/result");
  };

  const soalAktif = dataSoal[indexSoal];
  const progress = ((indexSoal + 1) / dataSoal.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* HEADER */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
         <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-bold">
            Soal {indexSoal + 1} / {dataSoal.length}
         </div>
         <div className="text-gray-500 font-mono font-medium bg-gray-100 px-3 py-1 rounded-md">
            {formatWaktu(waktuBerjalan)}
         </div>
      </div>

      <div className="w-full bg-gray-200 h-1.5">
        <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 pb-32 flex flex-col justify-center">
        <div className="mb-10 text-center">
           <h2 className="text-2xl md:text-3xl font-bold text-[#2E2856] leading-relaxed">
             {soalAktif.PERTANYAAN}
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["A", "B", "C", "D"].map((opsi) => (
            <button
              key={opsi}
              onClick={() => handlePilihJawaban(opsi)}
              className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 group h-full
                ${jawabanUser[indexSoal] === opsi 
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200" 
                  : "border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 text-gray-600"
                }
              `}
            >
              <span className={`w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center text-sm font-bold border transition-colors
                 ${jawabanUser[indexSoal] === opsi ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"}
              `}>
                {opsi}
              </span>
              <span className="text-xl">{soalAktif[opsi]}</span>
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-100 flex justify-center z-20">
         <div className="max-w-4xl w-full flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={indexSoal === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition 
                ${indexSoal === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <ChevronLeft size={20}/> Sebelumnya
            </button>

            {indexSoal === dataSoal.length - 1 ? (
              <button 
                onClick={handleSelesai}
                className="bg-[#00CBB8] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-100 hover:bg-teal-500 hover:scale-105 transition"
              >
                Selesai
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition"
              >
                Selanjutnya
              </button>
            )}
         </div>
      </div>
    </div>
  );
}