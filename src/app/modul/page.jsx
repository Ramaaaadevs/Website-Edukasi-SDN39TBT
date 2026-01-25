"use client"; 

import { useState } from "react";
import Link from "next/link";

// DATA MATA PELAJARAN
// Kita ubah strukturnya. Sekarang setiap mapel punya data khusus untuk kelas 5 dan 6.
const databaseMapel = [
  { 
    id: 1, 
    judul: "Matematika", 
    slug: "matematika", 
    icon: "📐", 
    warna: "bg-red-100 text-red-500", 
    // Data spesifik per kelas
    infoKelas: {
      "5": { jumlahBab: 3},
      "6": { jumlahBab: 8}
    }
  },
  { 
    id: 2, 
    judul: "Ilmu Pengetahuan Alam", 
    slug: "ipa", 
    icon: "🌱", 
    warna: "bg-green-100 text-green-600", 
    infoKelas: {
      "5": { jumlahBab: 3, deskripsi: "Ekosistem & Manusia" },
      "6": { jumlahBab: 9, deskripsi: "Tata Surya & Listrik" }
    }
  },
  { 
    id: 3, 
    judul: "Komputer", 
    slug: "komputer", 
    icon: "💻", 
    warna: "bg-blue-100 text-blue-500", 
    infoKelas: {
      "5": { jumlahBab: 3, deskripsi: "Dasar Ketik & Paint" },
      "6": { jumlahBab: 3, deskripsi: "Microsoft Office Dasar" }
    }
  },
  { 
    id: 4, 
    judul: "Bahasa Inggris", 
    slug: "bahasa-inggris", 
    icon: "🅰️", 
    warna: "bg-yellow-100 text-yellow-600", 
    infoKelas: {
      "5": { jumlahBab: 4, deskripsi: "Daily Conversation" },
      "6": { jumlahBab: 6, deskripsi: "Grammar & Tenses" }
    }
  },
];

export default function HalamanModul() {
  // Default Kelas 5
  const [kelasTerpilih, setKelasTerpilih] = useState("5");

  const handleGantiKelas = (e) => {
    setKelasTerpilih(e.target.value);
  };

  return (
    <div className="page-container">
      
      {/* 1. HEADER SECTION */}
      <div className="modul-header-wrapper">
        <header className="modul-header-box">
          <div className="relative z-10">
            <h1 className="modul-title">Siap belajar hari ini?</h1>
            <p className="modul-subtitle">
              Kamu sedang melihat materi untuk <span className="font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-base align-middle">Kelas {kelasTerpilih} SD</span>
            </p>
          </div>
          
          {/* Hiasan Kanan Header */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-50 to-transparent opacity-50" />
          <div className="hidden md:block text-8xl absolute -right-4 -bottom-8 opacity-20 rotate-12 grayscale hover:grayscale-0 transition-all duration-500">
            🎒
          </div>
        </header>
      </div>

      <main className="px-6 pb-20 max-w-7xl mx-auto w-full">
        
        {/* 2. FILTER ROW */}
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Pilih Pelajaran</h2>
          </div>
        </div>

        {/* 3. GRID MATA PELAJARAN */}
        <div className="modul-grid">
          {databaseMapel.map((mapel) => {
            // Ambil info detail berdasarkan kelas yang dipilih user saat ini
            const info = mapel.infoKelas[kelasTerpilih];

            return (
              // PENTING: Kita kirim data kelas lewat URL Query (?kelas=5)
              // Supaya halaman selanjutnya tahu harus buka materi kelas berapa
              <Link 
                href={`/modul/${mapel.slug}?kelas=${kelasTerpilih}`} 
                key={mapel.id}
              >
                <div className="card-mapel group">
                  
                  <div className={`card-mapel-icon ${mapel.warna} group-hover:scale-110 transition-transform`}>
                    {mapel.icon}
                  </div>
                  
                  <h3 className="card-mapel-title">{mapel.judul}</h3>
                  
                  {/* Tampilkan Jumlah Bab sesuai Kelas */}
                  <span className="card-chip">
                    {info.jumlahBab} Bab Materi
                  </span>

                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}