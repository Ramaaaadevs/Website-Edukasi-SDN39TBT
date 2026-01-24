"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 

// 1. IMPORT DATA SOAL
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json"; 

export default function HalamanEvaluasi() {
  const { mapelSlug, babSlug } = useParams();
  const router = useRouter();

  // Ubah 'let dataSoal' menjadi State agar hasil random tersimpan
  const [soalUjian, setSoalUjian] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOGIC: LOAD & NORMALISASI DATA (Agar format Bing & MTK jadi sama)
  useEffect(() => {
    let rawData = [];

    // Pilih Source Data
    if (mapelSlug === 'bahasa-inggris' || mapelSlug === 'vocab') {
       rawData = soalBingGreeting;
    } else if (mapelSlug === 'matematika') {
       rawData = soalMtkPecahan;
    } else {
       rawData = soalMtkPecahan; // Default
    }

    if (rawData.length > 0) {
      // NORMALISASI: Ubah semua format menjadi format huruf besar (PERTANYAAN, A, B, C, D)
      // Ini agar UI kamu di bawah tidak perlu diubah-ubah lagi.
      const dataRapih = rawData.map((item, index) => {
        // Cek apakah formatnya Array (biasanya Bing) atau Object (MTK)
        const isArrayPilihan = Array.isArray(item.pilihan);
        
        // Deteksi Kunci Jawaban
        let kunci = item["JAWABAN BENAR"] || item.kunciJawaban;
        // Jika kunci jawabannya teks panjang (misal: "Good Morning"), kita ubah jadi huruf (A/B/C/D)
        if (isArrayPilihan && kunci.length > 1) {
           const indexJawaban = item.pilihan.indexOf(kunci);
           if (indexJawaban !== -1) kunci = ["A", "B", "C", "D"][indexJawaban];
        }

        return {
          id: item.id || index,
          // Ambil pertanyaan (support huruf besar/kecil)
          PERTANYAAN: item.PERTANYAAN || item.pertanyaan,
          // Mapping Pilihan A, B, C, D
          A: isArrayPilihan ? item.pilihan[0] : (item.A || item.a),
          B: isArrayPilihan ? item.pilihan[1] : (item.B || item.b),
          C: isArrayPilihan ? item.pilihan[2] : (item.C || item.c),
          D: isArrayPilihan ? item.pilihan[3] : (item.D || item.d),
          "JAWABAN BENAR": kunci
        };
      });

      // ACAK & AMBIL 25 SOAL
      const acak = [...dataRapih].sort(() => 0.5 - Math.random());
      setSoalUjian(acak.slice(0, 25));
    }
    setLoading(false);
  }, [mapelSlug, babSlug]);


  const [indexSoal, setIndexSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({}); 
  const [waktuBerjalan, setWaktuBerjalan] = useState(0); 

  // --- TIMER ---
  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setWaktuBerjalan((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loading]);

  const formatWaktu = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handlePilihJawaban = (opsi) => {
    setJawabanUser({ ...jawabanUser, [indexSoal]: opsi });
  };

  const handleNext = () => {
    if (indexSoal < soalUjian.length - 1) setIndexSoal(indexSoal + 1);
  };

  const handlePrev = () => {
    if (indexSoal > 0) setIndexSoal(indexSoal - 1);
  };

  // --- FINISH QUIZ ---
  const handleSelesai = () => {
    // 1. Hitung Nilai
    let benar = 0;
    soalUjian.forEach((soal, idx) => {
      if (jawabanUser[idx] === soal["JAWABAN BENAR"]) benar++;
    });
    const skorAkhir = Math.round((benar / soalUjian.length) * 100);

    // 2. Simpan Data
    const hasilUjian = {
      skor: skorAkhir,
      benar: benar,
      totalSoal: soalUjian.length,
      waktu: waktuBerjalan,
      jawabanUser: jawabanUser,
      mapelSlug: mapelSlug,
      babSlug: babSlug,
      // Simpan soal yg sudah dinormalisasi agar pembahasan aman
      soalUjian: soalUjian 
    };
    
    localStorage.setItem("hasilUjianTerbaru", JSON.stringify(hasilUjian)); // Simpan ke key terbaru
    localStorage.setItem("hasilUjian", JSON.stringify(hasilUjian)); // Backup ke key lama jika ada logic lain yg pakai

    // 3. Pindah Halaman
    router.push("/result");
  };

  // Loading State (PENTING: Mencegah error 'undefined' saat data belum siap)
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Memuat Soal...</div>;
  if (soalUjian.length === 0) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Soal tidak ditemukan.</div>;

  const soalAktif = soalUjian[indexSoal];
  const progress = ((indexSoal + 1) / soalUjian.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* HEADER */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
         <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-bold">
            Soal {indexSoal + 1} / {soalUjian.length}
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
              {/* Data sudah dinormalisasi, jadi aman panggil soalAktif["A"] dst */}
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

            {indexSoal === soalUjian.length - 1 ? (
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