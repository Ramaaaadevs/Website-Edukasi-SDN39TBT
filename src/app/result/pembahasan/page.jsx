"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, MinusCircle } from "lucide-react";

export default function HalamanPembahasan() {
  const router = useRouter();
  
  // STATE
  const [hasil, setHasil] = useState(null);
  const [dataSoal, setDataSoal] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. AMBIL DATA DARI LOCAL STORAGE
    // Pastikan kuncinya sama dengan yang disimpan di halaman ujian ("hasilUjian")
    const dataString = localStorage.getItem("hasilUjian");
    
    if (dataString) {
      const data = JSON.parse(dataString);
      setHasil(data);

      // 2. KUNCI PERBAIKAN DI SINI:
      // Jangan ambil dari JSON Import lagi! Ambil langsung dari 'soalUjian' yang tersimpan.
      // Ini menjamin soal yang muncul SAMA PERSIS dengan yang dikerjakan tadi.
      if (data.soalUjian && data.soalUjian.length > 0) {
        setDataSoal(data.soalUjian);
      } else {
        // Fallback jika data soalUjian tidak ada di localStorage (kasus lama)
        console.warn("Data soal tidak ditemukan di history.");
      }
      
      setLoading(false);
    } else {
      // Jika tidak ada data, kembalikan ke home
      router.replace("/");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-400 font-bold">
        Memuat Pembahasan...
      </div>
    );
  }

  if (!hasil || dataSoal.length === 0) return null;

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 md:px-8 font-sans">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link 
          href="/result" 
          className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-100 px-4 py-2 rounded-xl transition"
        >
          <ArrowLeft size={20} /> Kembali ke Hasil
        </Link>
        
        <div className="bg-white px-6 py-2 rounded-full shadow-sm text-sm font-bold text-gray-600 border border-blue-100">
           Mapel: <span className="text-blue-600 uppercase">{hasil.mapelSlug}</span> • 
           Benar: <span className="text-green-600">{hasil.benar}</span> • 
           Salah: <span className="text-red-500">{hasil.salah}</span>
        </div>
      </div>

      {/* LIST SOAL */}
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        {dataSoal.map((soal, index) => {
          // Logic Cek Jawaban
          // jawabanUser disimpan sebagai object { 0: "A", 1: "C" }
          // Kita akses menggunakan index soal
          const jawabanKamu = hasil.jawabanUser ? hasil.jawabanUser[index] : null;
          const kunciJawaban = soal["JAWABAN BENAR"];
          
          const isBenar = jawabanKamu === kunciJawaban;
          const isDijawab = jawabanKamu !== undefined && jawabanKamu !== null;

          // Style Card
          let borderClass = "border-transparent";
          let statusIcon = null;
          let statusText = "";
          let bgStatus = "";

          if (isBenar) {
            borderClass = "border-green-400 ring-4 ring-green-50";
            statusIcon = <CheckCircle2 className="w-6 h-6 text-green-600" />;
            statusText = "Benar";
            bgStatus = "bg-green-100 text-green-700";
          } else if (isDijawab && !isBenar) {
            borderClass = "border-red-400 ring-4 ring-red-50";
            statusIcon = <XCircle className="w-6 h-6 text-red-600" />;
            statusText = "Salah";
            bgStatus = "bg-red-100 text-red-700";
          } else {
            borderClass = "border-gray-300";
            statusIcon = <MinusCircle className="w-6 h-6 text-gray-400" />;
            statusText = "Tidak Dijawab";
            bgStatus = "bg-gray-100 text-gray-600";
          }

          return (
            <div 
              key={index} 
              className={`bg-white rounded-[2rem] shadow-lg overflow-hidden flex flex-col md:flex-row border-2 ${borderClass} animate-fade-in-up`}
            >
              
              {/* KIRI: SOAL & OPSI */}
              <div className="p-6 md:p-8 flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold shadow-md">
                      {index + 1}
                    </span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${bgStatus}`}>
                      {statusIcon} {statusText}
                    </div>
                 </div>

                 <h3 className="text-xl font-bold text-[#2E2856] mb-6 leading-relaxed">
                   {soal.PERTANYAAN}
                 </h3>

                 {/* OPSI JAWABAN */}
                 <div className="space-y-3">
                    {["A", "B", "C", "D"].map((opsi) => {
                      // Logic Warna Opsi
                      // 1. Jika ini Kunci Jawaban -> Selalu Hijau (Agar tau mana yg benar)
                      // 2. Jika ini Jawaban Salah Kamu -> Merah
                      const isKunci = opsi === kunciJawaban;
                      const isPilihanKamu = opsi === jawabanKamu;
                      
                      let buttonStyle = "bg-gray-50 border-gray-200 text-gray-600";
                      
                      if (isKunci) {
                        buttonStyle = "bg-green-100 border-green-500 text-green-800 font-bold";
                      } else if (isPilihanKamu && !isKunci) {
                        buttonStyle = "bg-red-100 border-red-500 text-red-800 font-bold opacity-80";
                      }

                      return (
                        <div key={opsi} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-colors ${buttonStyle}`}>
                           <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-white/50 border border-black/5`}>
                             {opsi}
                           </span>
                           <span className="text-lg">{soal[opsi]}</span>
                           
                           {/* Marker Icon di Opsi */}
                           {isKunci && <CheckCircle2 size={18} className="ml-auto text-green-600"/>}
                           {isPilihanKamu && !isKunci && <XCircle size={18} className="ml-auto text-red-600"/>}
                        </div>
                      )
                    })}
                 </div>
              </div>

              {/* KANAN: PENJELASAN (KUNING) */}
              <div className="w-full md:w-[35%] bg-[#FFC629] p-6 md:p-8 text-[#2E2856] flex flex-col justify-center relative overflow-hidden">
                 {/* Hiasan Background */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-xl"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400 opacity-20 rounded-full blur-xl"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 bg-white/20 w-fit px-3 py-1 rounded-lg backdrop-blur-sm">
                      <Lightbulb className="w-5 h-5 text-[#2E2856]" strokeWidth={2.5}/>
                      <h4 className="font-black text-base uppercase tracking-wider">Pembahasan</h4>
                    </div>
                    
                    <p className="font-medium leading-relaxed opacity-90 text-sm md:text-base">
                      {soal.PEMBAHASAN || soal.pembahasan || "Jawaban yang benar sudah ditandai dengan warna hijau."}
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