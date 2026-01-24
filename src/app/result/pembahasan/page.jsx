"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb } from "lucide-react";

// IMPORT DATA SOAL (Pastikan import path ini benar)
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";

export default function HalamanPembahasan() {
  const router = useRouter();
  const [hasil, setHasil] = useState(null);
  
// 2. STATE UNTUK DATA SOAL YANG AKAN DITAMPILKAN
  const [dataSoal, setDataSoal] = useState([]); 

  useEffect(() => {
    const dataString = localStorage.getItem("hasilUjianTerbaru");
    if (dataString) {
      const data = JSON.parse(dataString);
      setHasil(data);

      // 3. LOGIC MENENTUKAN SOAL BERDASARKAN MAPEL DARI LOCALSTORAGE
      if (data.mapelSlug === 'bahasa-inggris') {
        setDataSoal(soalBingGreeting);
      } else {
        setDataSoal(soalMtkPecahan); // Default Mtk
      }

    } else {
      router.push("/");
    }
  }, [router]);

  if (!hasil || dataSoal.length === 0) return null;

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 md:px-8 font-sans">
      
      {/* HEADER PEMBAHASAN */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
         <Link href="/result">
           <button className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-600 transition bg-white px-4 py-2 rounded-xl shadow-sm">
             <ArrowLeft size={20}/> Kembali ke Nilai
           </button>
         </Link>
         <h1 className="text-2xl md:text-3xl font-black text-[#2E2856]">
           Pembahasan Soal
         </h1>
         <div className="w-[120px]"></div> 
      </div>

      {/* LIST SOAL */}
      <div className="max-w-5xl mx-auto space-y-8">
        {dataSoal.map((soal, index) => {
          const jawabanBenar = soal["JAWABAN BENAR"];
          const jawabanDipilih = hasil.jawabanUser[index];
          const isCorrect = jawabanDipilih === jawabanBenar;

          return (
            <div key={index} className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
              
              {/* KIRI: SOAL & OPSI (PUTIH) */}
              <div className="flex-1 p-6 md:p-8 relative">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-yellow-500 font-bold text-xs tracking-widest uppercase">
                      Pertanyaan {index + 1}
                    </span>
                    {isCorrect ? (
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                      </div>
                    ) : (
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="text-red-500 w-6 h-6" />
                      </div>
                    )}
                 </div>

                 <h3 className="text-2xl font-black text-[#2E2856] mb-6 leading-relaxed">
                   {soal.PERTANYAAN}
                 </h3>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["A", "B", "C", "D"].map((opsi) => {
                      let buttonStyle = "bg-gray-100 text-gray-400 border-transparent"; 
                      
                      // Logic Pewarnaan Tombol
                      if (opsi === jawabanBenar) {
                        buttonStyle = "bg-green-100 text-green-700 border-green-400 ring-1 ring-green-400 font-bold";
                      } else if (opsi === jawabanDipilih && !isCorrect) {
                        buttonStyle = "bg-red-100 text-red-600 border-red-400 ring-1 ring-red-400 font-bold";
                      }

                      return (
                        <div key={opsi} className={`p-4 rounded-xl border-2 flex items-center gap-3 ${buttonStyle}`}>
                           <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-white/50`}>
                             {opsi}
                           </span>
                           <span className="text-lg">{soal[opsi]}</span>
                        </div>
                      )
                    })}
                 </div>
              </div>

              {/* KANAN: PENJELASAN (KUNING) */}
              <div className="w-full md:w-[35%] bg-[#FFC629] p-6 md:p-8 text-[#2E2856] flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-6 h-6 text-[#2E2856]" strokeWidth={2.5}/>
                      <h4 className="font-black text-lg">Mengapa Begitu?</h4>
                    </div>
                    
                    <p className="font-medium leading-relaxed opacity-90 text-sm md:text-base">
                      {soal.PEMBAHASAN || "Karena begitulah aturan matematika yang berlaku untuk soal ini. Coba pelajari lagi bab pecahan ya!"}
                    </p>
                 </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}