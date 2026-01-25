"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";

// DATA
import dataMateri from "@/data/mtk-kelas5-pecahan-materi.json";
import dataSoal from "@/data/mtk-kelas5-pecahan.json"; 

export default function HalamanBelajar() {
  const { mapelSlug, babSlug, halamanId } = useParams();
  
  // 1. Cari Materi berdasarkan ID dari URL
  const materiAktif = dataMateri.find(item => item.id === parseInt(halamanId));
  const indexSekarang = dataMateri.findIndex(item => item.id === parseInt(halamanId));
  const nextMateri = dataMateri[indexSekarang + 1];

  // Logic Kuis Mini
  const [jawabanUser, setJawabanUser] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  if (!materiAktif) return <div className="p-10 text-center">Halaman tidak ditemukan 😢</div>;

  // --- TAMPILAN 1: JIKA TIPE MATERI ---
  if (materiAktif.tipe === "materi") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12 font-sans">
        <div className="max-w-3xl w-full">
          {/* Tombol Kembali */}
          <Link href={`/modul/${mapelSlug}/${babSlug}`} className="inline-flex items-center text-gray-400 font-bold mb-8 hover:text-blue-600 transition">
            <ChevronLeft size={20} className="mr-1"/> Kembali ke Menu
          </Link>
          
          {/* Konten HTML (dari JSON) */}
          <div 
            className="prose prose-lg text-gray-700 mb-12 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: materiAktif.isi }} 
          />
          
          <hr className="border-gray-100 my-8"/>

          {/* Tombol Lanjut */}
          <div className="flex justify-end">
            {nextMateri ? (
              <Link href={`/modul/${mapelSlug}/${babSlug}/${nextMateri.id}`}>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2">
                  Lanjut: {nextMateri.judul} →
                </button>
              </Link>
            ) : (
              <span className="text-gray-400 font-bold">Materi Bab Ini Selesai!</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: JIKA TIPE KUIS ---
  if (materiAktif.tipe === "kuis") {
    // Ambil soal berdasarkan index yang ada di JSON materi
    const soalList = materiAktif.soal_index.map(idx => dataSoal[idx]);

    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6 md:p-10 font-sans">
         <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 relative">
            <Link href={`/modul/${mapelSlug}/${babSlug}`} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 font-bold transition">✕ Keluar</Link>
            
            <h1 className="text-3xl font-black text-gray-800 mb-2">{materiAktif.judul}</h1>
            <p className="text-gray-500 mb-10">{materiAktif.deskripsi}</p>

            {/* Loop Soal */}
            <div className="space-y-12">
              {soalList.map((soal, i) => {
                 const key = `soal-${i}`;
                 const isDijawab = jawabanUser[key];
                 const isBenar = isDijawab === soal["JAWABAN BENAR"];

                 return (
                   <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                     <div className="flex gap-4 mb-4">
                        <span className="bg-blue-100 text-blue-700 w-10 h-10 flex items-center justify-center rounded-full font-bold flex-shrink-0">{i+1}</span>
                        <p className="font-bold text-xl text-gray-800 pt-1">{soal.PERTANYAAN}</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-14">
                       {["A","B","C","D"].map(opt => (
                         <button 
                           key={opt}
                           disabled={showFeedback[key]} // Disable kalau sudah jawab
                           onClick={() => {
                             setJawabanUser({...jawabanUser, [key]: opt});
                             setShowFeedback({...showFeedback, [key]: true});
                           }}
                           className={`p-4 rounded-xl border-2 font-bold text-left transition-all flex justify-between items-center
                             ${!showFeedback[key] ? 'hover:bg-blue-50 hover:border-blue-200 border-gray-100' : ''}
                             ${showFeedback[key] && opt === soal["JAWABAN BENAR"] ? 'bg-green-100 border-green-500 text-green-800' : ''}
                             ${showFeedback[key] && jawabanUser[key] === opt && opt !== soal["JAWABAN BENAR"] ? 'bg-red-100 border-red-500 text-red-800' : ''}
                             ${showFeedback[key] && jawabanUser[key] !== opt && opt !== soal["JAWABAN BENAR"] ? 'opacity-50 border-gray-100' : ''}
                           `}
                         >
                           <span>{opt}. {soal[opt]}</span>
                           {showFeedback[key] && opt === soal["JAWABAN BENAR"] && <CheckCircle size={20}/>}
                           {showFeedback[key] && jawabanUser[key] === opt && opt !== soal["JAWABAN BENAR"] && <XCircle size={20}/>}
                         </button>
                       ))}
                     </div>
                     
                     {/* Pembahasan Muncul Setelah Jawab */}
                     {showFeedback[key] && (
                       <div className="mt-4 ml-14 bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-600 text-sm animate-in zoom-in-95">
                         <strong>💡 Pembahasan:</strong> <br/> {soal.PEMBAHASAN}
                       </div>
                     )}
                   </div>
                 )
              })}
            </div>

            {/* Tombol Lanjut (Hanya muncul jika sudah scroll ke bawah/selesai) */}
            <div className="mt-12 pt-8 border-t flex justify-end">
               {nextMateri && (
                 <Link href={`/modul/${mapelSlug}/${babSlug}/${nextMateri.id}`}>
                    <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 hover:scale-105 transition-all">
                      Selesai & Lanjut Materi Berikutnya ➔
                    </button>
                 </Link>
               )}
            </div>
         </div>
      </div>
    );
  }
  
  // --- TAMPILAN 3: JIKA EVALUASI ---
  if(materiAktif.tipe === "evaluasi") {
      return (
          <div className="min-h-screen flex items-center justify-center bg-yellow-400 p-6">
              <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">
                  <div className="text-6xl mb-6">🏆</div>
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Materi Selesai!</h1>
                  <p className="text-gray-500 mb-8">Kamu sudah siap untuk ujian akhir?</p>
                   
                   <Link href={`/modul/${mapelSlug}/${babSlug}/ujian`}>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform">
                        MULAI UJIAN 🚀
                    </button>
                   </Link>
                   
                   <Link href={`/modul/${mapelSlug}/${babSlug}`} className="block mt-4 text-gray-400 font-bold hover:text-gray-600">
                    Kembali Belajar
                   </Link>
              </div>
          </div>
      )
  }

  return null;
}