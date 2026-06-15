"use client";

import Credit from "@/components/Credit";
import { Mail } from "lucide-react";

export default function HalamanAbout() {
  const timKkn = [
    {
      nama: "KEVIN RUBEN SIHOTANG",
      nim: "122300022",
      prodi: "S1 TEKNIK KELAUTAN",
      prodiSingkat: "KL",
      peran: "Ketua KKN Kelompok 60",
      foto: "/tim-kkn/kevin.webp",
      badgeWarna: "bg-blue-50 text-blue-600 border border-blue-200"
    },
    {
      nama: "DIWAN RAMADHANI DWI PUTRA",
      nim: "123140116",
      prodi: "S1 TEKNIK INFORMATIKA",
      prodiSingkat: "IF",
      peran: "Project Leader & Lead Web Developer",
      foto: "/tim-kkn/diwan.webp",
      badgeWarna: "bg-indigo-50 text-indigo-700 border border-indigo-200"
    },
    {
      nama: "Ribka Hana Josephine Situmorang",
      nim: "123140103",
      prodi: "S1 TEKNIK INFORMATIKA",
      prodiSingkat: "IF",
      peran: "Co-Project Leader & UI/UX Designer",
      foto: "/tim-kkn/ribka.webp",
      badgeWarna: "bg-rose-50 text-rose-600 border border-rose-200"
    },
    {
      nama: "BENGET SIDABUTAR",
      nim: "123450047",
      prodi: "S1 SAINS DATA",
      prodiSingkat: "SD",
      peran: "Tim Penyusun Materi Pembelajaran",
      foto: "/tim-kkn/benget.webp",
      badgeWarna: "bg-teal-50 text-teal-700 border border-teal-200"
    },
    {
      nama: "AJENG WINDI SETIA NINGSIH",
      nim: "123430093",
      prodi: "S1 TEKNIK BIOMEDIS",
      prodiSingkat: "BM",
      peran: "Tim Penyusun Materi Pembelajaran",
      foto: "/tim-kkn/aje.webp",
      badgeWarna: "bg-teal-50 text-teal-700 border border-teal-200"
    },
    {
      nama: "SYAFFA SALSABILA",
      nim: "123120027",
      prodi: "S1 TEKNIK GEOFISIKA",
      prodiSingkat: "TG",
      peran: "Tim Penyusun Materi Pembelajaran",
      foto: "/tim-kkn/syaffa.webp",
      badgeWarna: "bg-teal-50 text-teal-700 border border-teal-200"
    },
    {
      nama: "ZAHRA FEBRI AGUSTIN",
      nim: "122230074",
      prodi: "S1 TEKNIK GEOMATIKA",
      prodiSingkat: "GT",
      peran: "Tim Penyusun Materi Pembelajaran",
      foto: "/tim-kkn/zahra.webp",
      badgeWarna: "bg-teal-50 text-teal-700 border border-teal-200"
    },
    {
      nama: "YESSI YOLANDA SARAGIH",
      nim: "121420087",
      prodi: "S1 REKAYASA KEHUTANAN",
      prodiSingkat: "RK",
      peran: "Tim Penyusun Materi Pembelajaran",
      foto: "/tim-kkn/yessi.webp",
      badgeWarna: "bg-teal-50 text-teal-700 border border-teal-200"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      
      {/* HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6 text-center text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <span className="bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
          KKN PPM KELOMPOK 60 ITERA 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Tentang Kami</h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg font-medium leading-relaxed">
          Kenali tim hebat di balik aplikasi belajar interaktif 60KUIZ. Dikembangkan secara kolaboratif oleh Mahasiswa KKN PPM Kelompok 60 ITERA.
        </p>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* GRID UNTUK SELURUH TIM YANG DIGABUNG */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E2856] text-center mb-8 border-b-4 border-yellow-400 w-fit mx-auto pb-1">
            Anggota Tim Pengembang
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {timKkn.map((person, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden shadow-md border-2 border-transparent hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 h-full"
              >
                {/* Tempat Foto (Rasio Aspek 3:4) */}
                <div className="w-full aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={person.foto} 
                    alt={person.nama} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  
                  {/* Kode Jurusan Kecil di Sudut Foto */}
                  <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-tight shadow-sm">
                    {person.prodiSingkat}
                  </span>
                </div>

                {/* Konten Keterangan Kartu */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Jurusan / Program Studi */}
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded w-fit tracking-wider">
                    {person.prodi}
                  </span>

                  {/* Nama Lengkap */}
                  <h3 className="font-extrabold text-[#2E2856] text-base leading-tight mt-3 mb-1">
                    {person.nama}
                  </h3>

                  {/* NIM */}
                  <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase">
                    NIM: {person.nim}
                  </p>

                  {/* Tag Chips Peran di Bagian Bawah */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider ${person.badgeWarna}`}>
                      {person.peran}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION KONTAK DIWAN */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 border border-yellow-200/60 shadow-sm text-center mb-10">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mx-auto text-2xl mb-4 shadow-inner">
            ✉️
          </div>
          <h3 className="text-2xl font-black text-[#2E2856] mb-2">Saran & Masukan Pengguna</h3>
          <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm">
            Kami sangat terbuka atas kritik, saran, maupun masukan demi peningkatan kualitas aplikasi belajar 60KUIZ ini ke depan. Silakan hubungi penanggung jawab web kami melalui:
          </p>
          <a
            href="mailto:diwan.123140116@student.itera.ac.id"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-5 h-5" /> Hubungi via Email Saran ➔
          </a>
        </div>

      </main>

      {/* FOOTER */}
      <Credit />

    </div>
  );
}
