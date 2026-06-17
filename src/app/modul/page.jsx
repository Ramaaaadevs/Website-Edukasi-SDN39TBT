"use client"; 

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// CUSTOM SELECT COMPONENT FOR HIGH-QUALITY DROPDOWNS
function CustomSelect({ value, options, onChange, themeColor = "blue", compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = options.find((opt) => opt.value === value) || options[0];

  const hoverBg = themeColor === "blue" ? "hover:bg-blue-50 text-blue-900" : "hover:bg-orange-50 text-orange-900";
  const activeBg = themeColor === "blue" ? "bg-blue-600 text-white" : "bg-orange-500 text-white";

  return (
    <div className="relative w-full text-left select-none animate-fadeIn" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 rounded-xl flex items-center justify-between font-bold text-xs md:text-sm text-gray-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer ${
          compact ? "py-2 px-3" : "py-3 px-4"
        } ${
          isOpen ? (themeColor === "blue" ? "border-blue-500 ring-2 ring-blue-100" : "border-orange-500 ring-2 ring-orange-100") : "border-gray-200"
        }`}
      >
        <span className="truncate">{activeOption?.label || ""}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl py-1 overflow-hidden max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                  isSelected ? activeBg : `text-gray-600 ${hoverBg}`
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// DATA MATA PELAJARAN
// Kita ubah strukturnya. Sekarang setiap mapel punya data khusus untuk kelas 5 dan 6.
const databaseMapel = [
  { 
    id: 1, 
    judul: "Matematika", 
    slug: "matematika", 
    icon: "📐", 
    warna: "bg-red-100 text-red-500", 
    infoKelas: {
      "5": { jumlahBab: 3 },
      "6": { jumlahBab: 4 },
      "semua": { jumlahBab: 4 }
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
      "6": { jumlahBab: 3, deskripsi: "Tata Surya & Listrik" },
      "semua": { jumlahBab: 3, deskripsi: "Materi IPA Lengkap" }
    }
  },
  { 
    id: 3, 
    judul: "Komputer", 
    slug: "komputer", 
    icon: "💻", 
    warna: "bg-blue-100 text-blue-500", 
    infoKelas: {
      "5": { jumlahBab: 0, deskripsi: "Dasar Komputer" },
      "6": { jumlahBab: 0, deskripsi: "Dasar Komputer" },
      "semua": { jumlahBab: 0, deskripsi: "Dasar Komputer" }
    }
  },
  { 
    id: 4, 
    judul: "Bahasa Inggris", 
    slug: "bahasa-inggris", 
    icon: "🅰️", 
    warna: "bg-yellow-100 text-yellow-600", 
    infoKelas: {
      "5": { jumlahBab: 3, deskripsi: "Daily Conversation" },
      "6": { jumlahBab: 2, deskripsi: "Grammar & Tenses" },
      "semua": { jumlahBab: 3, deskripsi: "Bahasa Inggris Lengkap" }
    }
  },
];

export function HalamanModulContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial class from search parameters (default "5")
  const kelasParam = searchParams.get("kelas");
  const initialKelas = kelasParam === "6" ? "6" : (kelasParam === "semua" ? "semua" : "5");

  const [kelasTerpilih, setKelasTerpilih] = useState(initialKelas);

  // Sync state with query parameters
  useEffect(() => {
    const currentParam = searchParams.get("kelas");
    const syncKelas = currentParam === "6" ? "6" : (currentParam === "semua" ? "semua" : "5");
    setKelasTerpilih(syncKelas);
  }, [searchParams]);

  const handleGantiKelas = (val) => {
    setKelasTerpilih(val);
    router.push(`/modul?kelas=${val}`);
  };

  const opsiKelas = [
    { value: "5", label: "Kelas 5 SD" },
    { value: "6", label: "Kelas 6 SD" },
    { value: "semua", label: "Semua Kelas" }
  ];

  return (
    <div className="page-container">
      
      {/* 1. HEADER SECTION */}
      <div className="modul-header-wrapper">
        <header className="modul-header-box flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="relative z-10 max-w-xl">
            <h1 className="modul-title">Siap belajar hari ini?</h1>
            <p className="modul-subtitle mb-4">
              Kamu sedang melihat materi untuk <span className="font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-base align-middle">
                {kelasTerpilih === "semua" ? "Semua Kelas SD" : `Kelas ${kelasTerpilih} SD`}
              </span>
            </p>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-gray-500 font-bold text-sm">Pilih Kelas:</span>
              <div className="w-44">
                <CustomSelect
                  value={kelasTerpilih}
                  options={opsiKelas}
                  onChange={handleGantiKelas}
                  themeColor="blue"
                  compact={true}
                />
              </div>
            </div>
          </div>
          
          {/* Hiasan Kanan Header */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
            <div className="hidden md:block absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-50 to-transparent opacity-50" />
            <div className="hidden md:block text-8xl absolute -right-4 -bottom-8 opacity-20 rotate-12 grayscale hover:grayscale-0 transition-all duration-500 select-none">
              🎒
            </div>
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
            // Count total chapters based on selected class filter
            const jumlahBab = mapel.infoKelas[kelasTerpilih]?.jumlahBab || 0;

            return (
              <Link 
                href={`/modul/${mapel.slug}?kelas=${kelasTerpilih}`} 
                key={mapel.id}
              >
                <div className="card-mapel group cursor-pointer">
                  
                  <div className={`card-mapel-icon ${mapel.warna} group-hover:scale-110 transition-transform`}>
                    {mapel.icon}
                  </div>
                  
                  <h3 className="card-mapel-title">{mapel.judul}</h3>
                  
                  <span className="card-chip">
                    {jumlahBab} Bab Materi
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

export default function HalamanModul() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold text-gray-400">Loading Modul...</div>}>
      <HalamanModulContent />
    </Suspense>
  );
}