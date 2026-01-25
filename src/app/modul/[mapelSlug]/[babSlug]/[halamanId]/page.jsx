"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 

// ==========================================
// 1. PERBAIKAN IMPORT (Tambahkan soalIpa)
// ==========================================
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json"; 
import soalIpa from "@/data/soalIpa.json"; // ✅ TAMBAHAN PENTING

export default function HalamanEvaluasi() {
  const { mapelSlug, babSlug } = useParams();
  const router = useRouter();

  const [soalUjian, setSoalUjian] = useState([]);
  const [indexSoal, setIndexSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({});
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 2. PERBAIKAN LOGIKA PILIH DATA
  // ==========================================
  useEffect(() => {
    let rawData = [];

    // Cek slug URL agar data yang diambil sesuai mapelnya
    if (mapelSlug === 'bahasa-inggris' || mapelSlug === 'vocab') {
       rawData = soalBingGreeting;
    } 
    else if (mapelSlug === 'matematika') {
       rawData = soalMtkPecahan;
    } 
    else if (mapelSlug === 'ipa') {
       rawData = soalIpa; // ✅ SEKARANG IPA AKAN MENGAMBIL DATA IPA
    } 
    else {
       // Default fallback jika mapel tidak dikenali (bisa dikosongkan atau default ke mtk)
       console.log("Mapel tidak dikenal, load default");
       rawData = []; 
    }

    if (rawData.length > 0) {
      // NORMALISASI DATA (LOGIKA ASLI KAMU, TIDAK SAYA UBAH)
      const dataRapih = rawData.map((item, index) => {
        const isArray = Array.isArray(item.pilihan);
        
        // Deteksi kunci jawaban (support format array index atau string huruf)
        let kunci = item["JAWABAN BENAR"] || item.kunciJawaban;
        if (isArray && kunci && kunci.length > 1) {
             const idxKunci = item.pilihan.indexOf(kunci);
             if (idxKunci !== -1) kunci = ["A","B","C","D"][idxKunci];
        }

        return {
          id: item.id || index,
          PERTANYAAN: item.PERTANYAAN || item.pertanyaan,
          // Normalisasi opsi A,B,C,D
          A: isArray ? item.pilihan[0] : (item.A || item.a),
          B: isArray ? item.pilihan[1] : (item.B || item.b),
          C: isArray ? item.pilihan[2] : (item.C || item.c),
          D: isArray ? item.pilihan[3] : (item.D || item.d),
          "JAWABAN BENAR": kunci
        };
      });

      // Acak soal (Shuffle)
      const acak = [...dataRapih].sort(() => 0.5 - Math.random());
      setSoalUjian(acak.slice(0, 25)); // Ambil max 25 soal
    }

    setLoading(false);
  }, [mapelSlug]); // Dependency mapelSlug agar berubah saat ganti mapel

  // ==========================================
  // SISA KODE KE BAWAH TIDAK DIUBAH (SAMA SEPERTI ASLIMU)
  // ==========================================

  const handlePilihJawaban = (val) => {
    setJawabanUser({ ...jawabanUser, [indexSoal]: val });
  };

  const handleNext = () => {
    if (indexSoal < soalUjian.length - 1) setIndexSoal(indexSoal + 1);
  };

  const handlePrev = () => {
    if (indexSoal > 0) setIndexSoal(indexSoal - 1);
  };

  const handleSelesai = () => {
    let benar = 0;
    soalUjian.forEach((soal, idx) => {
       if (jawabanUser[idx] === soal["JAWABAN BENAR"]) benar++;
    });
    
    // Simpan hasil untuk halaman Result
    localStorage.setItem("hasilUjian", JSON.stringify({
      mapelSlug,
      babSlug: "Evaluasi Bab",
      nilai: Math.round((benar / soalUjian.length) * 100),
      benar,
      salah: soalUjian.length - benar,
      totalSoal: soalUjian.length,
      jawabanUser,
      soalUjian
    }));

    router.push("/result");
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-400 font-bold">Menyiapkan Soal...</div>;
  if (soalUjian.length === 0) return <div className="h-screen flex items-center justify-center text-gray-500">Soal tidak ditemukan untuk mapel ini.</div>;

  const soalAktif = soalUjian[indexSoal];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* HEADER SEDERHANA */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-20 flex justify-between items-center">
         <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Evaluasi Bab</span>
            <h1 className="text-lg font-bold text-blue-900 capitalize">{mapelSlug}</h1>
         </div>
         <div className="text-sm font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">
            {indexSoal + 1} / {soalUjian.length}
         </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full p-6 pb-24 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#2E2856] mb-8 text-center leading-relaxed">
           {soalAktif.PERTANYAAN}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["A", "B", "C", "D"].map((opsi) => (
            <button
              key={opsi}
              onClick={() => handlePilihJawaban(opsi)}
              className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center gap-3
                ${jawabanUser[indexSoal] === opsi 
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md" 
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                }
              `}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border 
                 ${jawabanUser[indexSoal] === opsi ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-200 text-gray-500"}
              `}>
                {opsi}
              </span>
              <span className="text-lg">{soalAktif[opsi]}</span>
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-100 flex justify-center z-20">
         <div className="max-w-3xl w-full flex justify-between items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={indexSoal === 0}
              className={`flex-1 py-3 rounded-xl font-bold border transition ${indexSoal === 0 ? "text-gray-300 border-gray-100" : "text-gray-600 border-gray-200 hover:bg-gray-50"}`}
            >
              <ChevronLeft size={20} className="inline mr-1"/> Prev
            </button>

            {indexSoal === soalUjian.length - 1 ? (
              <button onClick={handleSelesai} className="flex-1 py-3 rounded-xl font-bold bg-[#00CBB8] text-white shadow-lg hover:bg-teal-500 transition">
                Selesai
              </button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 rounded-xl font-bold bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition">
                Next
              </button>
            )}
         </div>
      </div>
    </div>
  );
}