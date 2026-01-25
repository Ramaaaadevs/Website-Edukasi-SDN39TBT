"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock, FileText, AlertCircle } from "lucide-react";

// IMPORT DATA SOAL
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";
// Import soalIpa...

export default function HalamanUjianAkhir() {
  const { mapelSlug, kelasId } = useParams();
  const router = useRouter();

  // STATE UTAMA
  const [soalUjian, setSoalUjian] = useState([]);
  const [indexSoal, setIndexSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({});
  const [waktuSisa, setWaktuSisa] = useState(1200); // 20 Menit
  const [loading, setLoading] = useState(true);
  
  // STATE BARU: STATUS UJIAN (belum-mulai | sedang-jalan)
  const [ujianDimulai, setUjianDimulai] = useState(false);

  // LOGIC PILIH SOAL (Sama seperti sebelumnya)
  useEffect(() => {
    let rawData = [];
    const kelas = parseInt(kelasId);

    if (kelas === 5) {
      if (mapelSlug === "matematika") rawData = soalMtkPecahan;
      else if (mapelSlug === "bahasa-inggris") rawData = soalBingGreeting;
    } 
    
    if (rawData.length > 0) {
      const dataRapih = rawData.map((item, idx) => {
        const isArrayPilihan = Array.isArray(item.pilihan);
        let kunci = item["JAWABAN BENAR"] || item.kunciJawaban;
        
        if (isArrayPilihan && kunci.length > 1) {
           const indexJawaban = item.pilihan.indexOf(kunci);
           if (indexJawaban !== -1) kunci = ["A", "B", "C", "D"][indexJawaban];
        }

        return {
          id: item.id || idx,
          PERTANYAAN: item.PERTANYAAN || item.pertanyaan,
          A: isArrayPilihan ? item.pilihan[0] : (item.A || item.a),
          B: isArrayPilihan ? item.pilihan[1] : (item.B || item.b),
          C: isArrayPilihan ? item.pilihan[2] : (item.C || item.c),
          D: isArrayPilihan ? item.pilihan[3] : (item.D || item.d),
          "JAWABAN BENAR": kunci
        };
      });

      const acak = [...dataRapih].sort(() => 0.5 - Math.random());
      setSoalUjian(acak.slice(0, 25));
    }

    setLoading(false);
  }, [mapelSlug, kelasId]);

  // TIMER (Hanya jalan kalau ujianDimulai = true)
  useEffect(() => {
    if (loading || !ujianDimulai) return; // Stop timer kalau belum mulai

    const timer = setInterval(() => {
      setWaktuSisa((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSelesai();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, ujianDimulai]); // Dependency ditambah ujianDimulai

  const formatWaktu = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  
  const formatJudul = (s) => s ? s.replace(/-/g, " ").toUpperCase() : "";

  const handlePilihJawaban = (opsi) => {
    setJawabanUser({ ...jawabanUser, [indexSoal]: opsi });
  };

  const handleNext = () => indexSoal < soalUjian.length - 1 && setIndexSoal(indexSoal + 1);
  const handlePrev = () => indexSoal > 0 && setIndexSoal(indexSoal - 1);

  const handleSelesai = () => {
    let benar = 0;
    soalUjian.forEach((soal, idx) => {
      if (jawabanUser[idx] === soal["JAWABAN BENAR"]) benar++;
    });
    const skorAkhir = Math.round((benar / soalUjian.length) * 100);

    localStorage.setItem("hasilUjian", JSON.stringify({
      mapelSlug,
      babSlug: `Ujian Akhir Kelas ${kelasId}`,
      nilai: skorAkhir,
      benar,
      salah: soalUjian.length - benar,
      totalSoal: soalUjian.length,
      jawabanUser,
      soalUjian 
    }));

    router.push("/result");
  };

  // 1. TAMPILAN LOADING
  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-gray-400">Menyiapkan Ujian...</div>;
  
  // 2. TAMPILAN DATA KOSONG
  if (soalUjian.length === 0) return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
       <div className="text-6xl mb-4 grayscale opacity-30">📂</div>
       <h2 className="text-2xl font-bold text-gray-700 mb-2">Soal Belum Tersedia</h2>
       <button onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">Kembali</button>
    </div>
  );

  // ==========================================
  // 3. TAMPILAN HALAMAN "READY" (LOBBY)
  // ==========================================
  if (!ujianDimulai) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 text-center border-4 border-white ring-4 ring-blue-50 relative overflow-hidden">
          
          {/* Hiasan Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          
          <div className="mb-6">
             <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">
               🚀
             </div>
             <h1 className="text-3xl font-black text-[#2E2856] mb-1">
               SIAP UJIAN?
             </h1>
             <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
               Kelas {kelasId} • {formatJudul(mapelSlug)}
             </p>
          </div>

          {/* Info Box */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 text-left space-y-3">
             <div className="flex items-center gap-3 text-gray-700">
                <FileText className="text-blue-500" size={20} />
                <span className="font-bold">Total Soal:</span>
                <span className="ml-auto font-mono bg-white px-2 py-0.5 rounded border text-sm">25 Butir</span>
             </div>
             <div className="flex items-center gap-3 text-gray-700">
                <Clock className="text-orange-500" size={20} />
                <span className="font-bold">Waktu:</span>
                <span className="ml-auto font-mono bg-white px-2 py-0.5 rounded border text-sm">20 Menit</span>
             </div>
             <div className="flex items-start gap-3 text-gray-700 pt-2 border-t border-gray-200 mt-2">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Dilarang menyontek atau membuka buku. Kerjakan dengan jujur ya!
                </p>
             </div>
          </div>

          {/* Tombol Start */}
          <button 
            onClick={() => setUjianDimulai(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black text-xl shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-xl transition-all active:scale-95"
          >
            MULAI SEKARANG ➔
          </button>
          
          <button 
             onClick={() => router.back()}
             className="mt-4 text-gray-400 text-sm font-bold hover:text-gray-600 transition"
          >
             Batal / Kembali
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // 4. TAMPILAN UJIAN (SOAL BERJALAN)
  // ==========================================
  const soalAktif = soalUjian[indexSoal];
  const progress = ((indexSoal + 1) / soalUjian.length) * 100;

  return (
    <div className="h-screen bg-gray-50 font-sans flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between shrink-0 z-20">
         <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Ujian Kelas {kelasId}</span>
            <span className="text-lg font-bold text-blue-900 capitalize">{mapelSlug.replace("-", " ")}</span>
         </div>
         <div className={`font-mono font-bold px-4 py-2 rounded-xl border ${waktuSisa < 300 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
            ⏰ {formatWaktu(waktuSisa)}
         </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-1.5 shrink-0">
        <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full flex flex-col justify-center items-center p-4 overflow-y-auto">
        <div className="w-full max-w-4xl">
            
            {/* Pertanyaan */}
            <div className="mb-8 text-center">
               <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
                  Soal {indexSoal + 1} / {soalUjian.length}
               </span>
               <h2 className="text-2xl md:text-3xl font-bold text-[#2E2856] leading-relaxed">
                 {soalAktif.PERTANYAAN}
               </h2>
            </div>

            {/* Pilihan Jawaban */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((opsi) => (
                <button
                  key={opsi}
                  onClick={() => handlePilihJawaban(opsi)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 group w-full
                    ${jawabanUser[indexSoal] === opsi 
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200" 
                      : "border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 text-gray-600"
                    }
                  `}
                >
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-colors
                     ${jawabanUser[indexSoal] === opsi ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"}
                  `}>
                    {opsi}
                  </span>
                  <span className="text-lg">{soalAktif[opsi]}</span>
                </button>
              ))}
            </div>

        </div>
      </main>

      {/* FOOTER */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0 z-20">
         <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={indexSoal === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition ${indexSoal === 0 ? "text-gray-300 cursor-not-allowed bg-gray-50" : "text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
            >
              <ChevronLeft size={20}/> Prev
            </button>

            {indexSoal === soalUjian.length - 1 ? (
              <button onClick={handleSelesai} className="flex-1 md:flex-none bg-[#00CBB8] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-500 transition transform hover:scale-105">
                Selesai Ujian
              </button>
            ) : (
              <button onClick={handleNext} className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
                Next Soal
              </button>
            )}
         </div>
      </div>
      
    </div>
  );
}