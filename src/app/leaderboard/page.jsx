"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Trophy, Zap, Award, Calendar, Clock, RefreshCw } from "lucide-react";

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
    <div className="relative w-full text-left select-none text-gray-800" ref={containerRef}>
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

export default function HalamanLeaderboard() {
  // STATE FILTERS
  const [mapelFilter, setMapelFilter] = useState("matematika");
  const [kelasFilter, setKelasFilter] = useState("semua");
  const [activeTab, setActiveTab] = useState("accuracy"); // accuracy (Ranked) vs speed (Speedrun)

  // STATE DATA ONLINE
  const [dataPeringkat, setDataPeringkat] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataOnline = async () => {
    setLoading(true);
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjtaVplIvdxqYaNakLfHGAlkFUX2kURCGk42e4BH_-TClcGL9s2Q6LZbb_bhy2j0Sp/exec";
    
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL);
      if (!res.ok) throw new Error("Respons jaringan tidak OK");
      
      const text = await res.text();
      // Cek jika respon berupa HTML (berarti doGet belum aktif)
      if (text.trim().startsWith("<!DOCTYPE html>") || text.trim().startsWith("<html")) {
        console.warn("Respons berupa HTML (kemungkinan doGet belum di-deploy). Menggunakan data kosong.");
        setDataPeringkat([]);
        return;
      }

      const json = JSON.parse(text);
      if (!Array.isArray(json)) {
        setDataPeringkat([]);
        return;
      }
      
      // Parse data kotor dari spreadsheet
      const parsedData = json.map(item => {
        const mapelStr = String(item.mapel || "");
        const mapelSlug = mapelStr.split(" ")[0] || "random";
        
        let totalSoal = 25;
        const match = mapelStr.match(/\((\d+) Soal\)/);
        if (match) {
          totalSoal = parseInt(match[1]);
        } else if (mapelSlug === "random") {
          totalSoal = 10;
        }

        // Parse tanggal cantik
        let tanggalCantik = "-";
        if (item.tanggal) {
          try {
            tanggalCantik = new Date(item.tanggal).toLocaleDateString("id-ID");
          } catch (e) {
            tanggalCantik = String(item.tanggal).split("T")[0];
          }
        }

        return {
          nama: String(item.nama || "Juara Cilik"),
          kelas: String(item.kelas || "").trim().toUpperCase(),
          mapelSlug,
          totalSoal,
          skor: Number(item.skor || 0),
          sisaWaktu: Number(item.sisaWaktu || 0),
          kecepatanSoal: Number(item.kecepatanSoal || 99.9),
          tanggal: tanggalCantik
        };
      });

      setDataPeringkat(parsedData);
    } catch (e) {
      console.warn("Gagal memuat kuis dari Google Sheets (menggunakan data kosong):", e);
      setDataPeringkat([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOnline();
  }, []);

  // OPTIONS FILTER
  const opsiMapel = [
    { value: "matematika", label: "📐 Matematika" },
    { value: "ipa", label: "🌱 Ilmu Pengetahuan Alam" },
    { value: "bahasa-inggris", label: "🇬🇧 Bahasa Inggris" },
    { value: "komputer", label: "💻 Komputer" },
    { value: "random", label: "🎲 Random" }
  ];

  // Hitung kelas secara dinamis dari data yang didapat
  const dapatkanOpsiKelas = () => {
    const listKelas = dataPeringkat
      .map(item => String(item.kelas || "").trim())
      .filter(Boolean);
    const kelasUnik = Array.from(new Set(listKelas));
    
    // Urutkan kelas (misal 5A, 5B, 6A, 6B)
    kelasUnik.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    return [
      { value: "semua", label: "Semua Kelas" },
      ...kelasUnik.map(k => ({ value: k, label: `Kelas ${k}` }))
    ];
  };

  const opsiKelas = dapatkanOpsiKelas();

  // LOGIK FILTER & SORTING DATA
  const getFilteredData = () => {
    // 1. Filter berdasarkan kelas & mapel
    const step1 = dataPeringkat.filter(item => {
      const matchMapel = item.mapelSlug === mapelFilter;
      const matchKelas = kelasFilter === "semua" ? true : String(item.kelas) === String(kelasFilter);
      return matchMapel && matchKelas;
    });

    if (activeTab === "accuracy") {
      // 🏆 TAB 1: Bintang Akurasi (Mode Ranked)
      const targetStandardSoal = mapelFilter === "random" ? 10 : 25;
      const filtered = step1.filter(item => item.totalSoal === targetStandardSoal);

      // Urutkan berdasarkan: Skor tertinggi (desc), lalu sisa waktu terbanyak (desc / tercepat)
      return [...filtered].sort((a, b) => {
        if (b.skor !== a.skor) {
          return b.skor - a.skor;
        }
        return b.sisaWaktu - a.sisaWaktu;
      });
    } else {
      // ⚡ TAB 2: Juara Kilat (Mode Speedrun)
      // Tampilkan kustom maupun standar, syarat skor >= 80
      const filtered = step1.filter(item => item.skor >= 80);

      // Urutkan berdasarkan: Rata-rata kecepatan per soal terkecil (asc / tercepat)
      return [...filtered].sort((a, b) => {
        return a.kecepatanSoal - b.kecepatanSoal;
      });
    }
  };

  const listPeringkat = getFilteredData();
  const topThree = listPeringkat.slice(0, 3);
  const remainingList = listPeringkat.slice(3, 10); // Ambil sampai top 10

  // EMOJI AVATAR BERDASARKAN URUTAN INDEKS
  const getAvatarEmoji = (index) => {
    const emojis = ["👦", "👧", "🧑", "👨‍🎓", "👩‍🎓", "🦁", "🦊", "🦖", "🦄", "🤖"];
    return emojis[index % emojis.length];
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* 🔹 ORNAMEN BACKGROUND GRADASI KREATIF */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-600 to-indigo-800 -z-10 rounded-b-[3rem] overflow-hidden">
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-white/80 hover:text-white font-bold transition">
            <ChevronLeft size={20} className="mr-1" /> Kembali ke Home
          </Link>
          <button 
            onClick={fetchDataOnline}
            disabled={loading}
            className="text-xs text-white/70 hover:text-white font-bold transition flex items-center gap-1 border border-white/20 px-3 py-1.5 rounded-xl cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Segarkan Papan Juara
          </button>
        </div>

        <div className="text-center text-white mb-10">
          <h1 className="text-4xl font-black tracking-tight drop-shadow-md flex items-center justify-center gap-2">
            🏆 PAPAN JUARA CILIK (ONLINE)
          </h1>
          <p className="text-white/80 font-medium text-base mt-2">
            Papan peringkat tersinkronisasi langsung dari Google Sheets
          </p>
        </div>

        {/* 🔹 TOGGLE SWITCH TAB UTAMA */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-950/20 backdrop-blur-md p-1.5 rounded-2xl flex w-full max-w-md border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab("accuracy")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black transition-all cursor-pointer ${
                activeTab === "accuracy"
                  ? "bg-white text-blue-900 shadow-md scale-102"
                  : "text-white hover:text-white/95"
              }`}
            >
              <Trophy size={16} /> Bintang Akurasi (Ranked)
            </button>
            <button
              onClick={() => setActiveTab("speed")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black transition-all cursor-pointer ${
                activeTab === "speed"
                  ? "bg-white text-blue-900 shadow-md scale-102"
                  : "text-white hover:text-white/95"
              }`}
            >
              <Zap size={16} /> Juara Kilat (Speedrun)
            </button>
          </div>
        </div>

        {/* 🔹 CARD FILTERS DROPDOWN */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Mata Pelajaran:</span>
            <CustomSelect
              value={mapelFilter}
              options={opsiMapel}
              onChange={setMapelFilter}
              themeColor="blue"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Kelas Siswa:</span>
            <CustomSelect
              value={kelasFilter}
              options={opsiKelas}
              onChange={setKelasFilter}
              themeColor="orange"
            />
          </div>
        </div>

        {/* JIKA LOADING */}
        {loading ? (
          <div className="bg-white rounded-3xl py-20 text-center border shadow-sm flex flex-col items-center justify-center">
            <RefreshCw className="animate-spin text-blue-500 mb-4" size={32} />
            <p className="text-gray-400 font-bold text-sm">Menghubungkan ke Google Sheets...</p>
          </div>
        ) : (
          listPeringkat.length === 0 ? (
            <div className="bg-white rounded-3xl py-20 text-center border border-slate-200 shadow-sm animate-fadeIn">
              <div className="text-7xl mb-4">🏆</div>
              <h3 className="text-xl font-extrabold text-slate-700 mb-1">Belum Ada Juara</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto px-6">
                {activeTab === "accuracy" 
                  ? `Belum ada juara untuk kelas ${kelasFilter === "semua" ? "" : kelasFilter} di pelajaran ${mapelFilter.replace("-", " ")}.`
                  : `Belum ada juara kilat untuk kelas ${kelasFilter === "semua" ? "" : kelasFilter} di pelajaran ${mapelFilter.replace("-", " ")}.`}
              </p>
              <Link href="/ujian">
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md cursor-pointer text-sm">
                  Jadilah yang Pertama! 🚀
                </button>
              </Link>
            </div>
          ) : (
            (
              <div className="space-y-10">
                
                {/* 🔹 PODIUM VISUAL 3D (JUARA 1, 2, 3) */}
                <div className="flex items-end justify-center gap-2 sm:gap-6 pt-10 pb-6 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  
                  {/* JUARA 2 (🥈 SILVER) */}
                  {topThree[1] && (
                    <div className="flex flex-col items-center flex-1 order-1 max-w-[150px] animate-fadeIn">
                      <div className="text-3xl mb-1">{getAvatarEmoji(1)}</div>
                      <span className="text-xs sm:text-sm font-black text-slate-700 truncate w-full text-center">{topThree[1].nama}</span>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md mt-1 mb-3">
                        {activeTab === "accuracy" 
                          ? `${topThree[1].skor} Poin` 
                          : `⏱️ ${topThree[1].kecepatanSoal}s/soal`}
                      </span>
                      
                      {/* Tiang Podium */}
                      <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 h-28 rounded-t-2xl border-t-4 border-slate-300 flex flex-col items-center justify-center shadow-inner relative">
                        <span className="text-3xl font-black text-slate-400 drop-shadow-sm">2</span>
                        <span className="text-[9px] font-bold text-slate-400/80 absolute bottom-2">PERAK</span>
                      </div>
                    </div>
                  )}

                  {/* JUARA 1 (🥇 GOLD) */}
                  {topThree[0] && (
                    <div className="flex flex-col items-center flex-1 order-2 max-w-[160px] scale-105 sm:scale-110 -translate-y-2 animate-fadeIn">
                      <div className="text-4xl relative">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce duration-1000">👑</span>
                        {getAvatarEmoji(0)}
                      </div>
                      <span className="text-sm sm:text-base font-black text-blue-900 truncate w-full text-center mt-1">{topThree[0].nama}</span>
                      <span className="text-[10px] sm:text-xs text-amber-700 font-black bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md mt-1 mb-3">
                        {activeTab === "accuracy" 
                          ? `${topThree[0].skor} Poin` 
                          : `⏱️ ${topThree[0].kecepatanSoal}s/soal`}
                      </span>
                      
                      {/* Tiang Podium */}
                      <div className="w-full bg-gradient-to-t from-yellow-400 to-amber-300 h-36 rounded-t-2xl border-t-4 border-yellow-500 flex flex-col items-center justify-center shadow-lg relative">
                        <span className="text-4xl font-black text-yellow-950 drop-shadow-md">1</span>
                        <span className="text-[9px] font-black text-yellow-950/70 absolute bottom-2">EMAS</span>
                      </div>
                    </div>
                  )}

                  {/* JUARA 3 (🥉 BRONZE) */}
                  {topThree[2] && (
                    <div className="flex flex-col items-center flex-1 order-3 max-w-[150px] animate-fadeIn">
                      <div className="text-3xl mb-1">{getAvatarEmoji(2)}</div>
                      <span className="text-xs sm:text-sm font-black text-slate-700 truncate w-full text-center">{topThree[2].nama}</span>
                      <span className="text-[10px] sm:text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md mt-1 mb-3">
                        {activeTab === "accuracy" 
                          ? `${topThree[2].skor} Poin` 
                          : `⏱️ ${topThree[2].kecepatanSoal}s/soal`}
                      </span>
                      
                      {/* Tiang Podium */}
                      <div className="w-full bg-gradient-to-t from-amber-700/20 to-amber-600/10 h-20 rounded-t-2xl border-t-4 border-amber-600 flex flex-col items-center justify-center shadow-inner relative">
                        <span className="text-3xl font-black text-amber-700/80 drop-shadow-sm">3</span>
                        <span className="text-[9px] font-bold text-amber-700/70 absolute bottom-2">PERUNGGU</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* 🔹 TABEL LIST PERINGKAT 4 SAMPAI 10 */}
                {remainingList.length > 0 && (
                  <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 space-y-3">
                    <span className="text-xs font-bold text-gray-400 block px-2 uppercase tracking-wider mb-2">Peringkat Lainnya:</span>
                    
                    {remainingList.map((siswa, idx) => {
                      const rankNumber = idx + 4;
                      return (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all duration-200 group hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-black text-slate-400 group-hover:text-blue-600 shadow-sm border text-xs">
                              #{rankNumber}
                            </span>
                            <span className="text-2xl">{getAvatarEmoji(rankNumber - 1)}</span>
                            <span className="font-extrabold text-gray-700 group-hover:text-blue-900 text-sm sm:text-base capitalize">
                              {siswa.nama}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <span className="block text-sm font-black text-gray-800">
                                {activeTab === "accuracy" 
                                  ? `${siswa.skor} Poin` 
                                  : `⏱️ ${siswa.kecepatanSoal} s`}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium block">
                                {activeTab === "accuracy" 
                                  ? `XP: ${siswa.skor + (siswa.sisaWaktu || 0)}` 
                                  : `Skor: ${siswa.skor}`}
                              </span>
                            </div>
                            
                            <div className="hidden sm:flex items-center text-[10px] text-gray-400 font-bold gap-1">
                              <Calendar size={10} /> {siswa.tanggal}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )
          )
        )}

      </div>
    </div>
  );
}
