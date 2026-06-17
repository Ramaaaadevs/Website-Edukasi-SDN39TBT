"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock, FileText, AlertCircle, Volume2, VolumeX } from "lucide-react";

// IMPORT DATA SOAL
import soalMtkPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";
import soalIpa from "@/data/soalIpa.json";
import random from "@/data/random.json";

// CUSTOM SELECT COMPONENT FOR HIGH-QUALITY DROPDOWNS
function CustomSelect({ value, options, onChange, themeColor = "blue" }) {
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
    <div className="relative w-full text-left select-none" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 rounded-2xl py-3 px-4 flex items-center justify-between font-bold text-sm text-gray-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer ${
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
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl py-1 animate-fadeIn overflow-hidden max-h-60 overflow-y-auto">
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

export default function HalamanUjianAkhir() {
  const { mapelSlug, kelasId } = useParams();
  const router = useRouter();

  // STATE UTAMA
  const [soalPool, setSoalPool] = useState([]);
  const [soalUjian, setSoalUjian] = useState([]);
  const [indexSoal, setIndexSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({});
  const [waktuSisa, setWaktuSisa] = useState(1200); // Default 20 Menit
  const [loading, setLoading] = useState(true);

  // STATE KUSTOMISASI LOBBY
  const [jumlahSoal, setJumlahSoal] = useState(25);
  const [dropdownJumlah, setDropdownJumlah] = useState("25");
  const [waktuMenit, setWaktuMenit] = useState(20);
  const [dropdownWaktu, setDropdownWaktu] = useState("20");

  // STATE AUDIO & UJIAN
  const [ujianDimulai, setUjianDimulai] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // LOGIC PILIH SOAL & ATUR WAKTU
  useEffect(() => {
    let rawData = [];
    const kelas = parseInt(kelasId);

    if (kelas === 5 || kelas === 6) {
      if (mapelSlug === "matematika") rawData = soalMtkPecahan;
      else if (mapelSlug === "bahasa-inggris") rawData = soalBingGreeting;
      else if (mapelSlug === "ipa") rawData = soalIpa;
      else if (mapelSlug === "random") rawData = random;
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
          idSoalOriginal: item["ID SOAL"] || item.id || (idx + 1),
          PERTANYAAN: item.PERTANYAAN || item.pertanyaan,
          A: isArrayPilihan ? item.pilihan[0] : (item.A || item.a),
          B: isArrayPilihan ? item.pilihan[1] : (item.B || item.b),
          C: isArrayPilihan ? item.pilihan[2] : (item.C || item.c),
          D: isArrayPilihan ? item.pilihan[3] : (item.D || item.d),
          "JAWABAN BENAR": kunci,
          PEMBAHASAN: item.PEMBAHASAN || item.pembahasan || "",
          gambar: item.gambar || item.GAMBAR || null
        };
      });

      // Semua soal diikutsertakan secara penuh baik untuk Kelas 5 maupun 6
      const acak = [...dataRapih].sort(() => 0.5 - Math.random());
      setSoalPool(acak);

      // Set default sesuai konfigurasi awal
      const limitSoal = mapelSlug === "random" ? 10 : 25;
      const finalLimit = Math.min(acak.length, limitSoal);
      setJumlahSoal(finalLimit);
      if ([5, 10, 15, 20, 25].includes(finalLimit)) {
        setDropdownJumlah(String(finalLimit));
      } else {
        setDropdownJumlah("semua");
      }

      const durasiMenit = mapelSlug === "random" ? 15 : 20;
      setWaktuMenit(durasiMenit);
      setDropdownWaktu(String(durasiMenit));
    }

    setLoading(false);
  }, [mapelSlug, kelasId]);

  // LOGIC MUSIK AUTOPLAY
  useEffect(() => {
    if (ujianDimulai && audioRef.current) {
      // Set volume biar gak kaget (0.0 sampai 1.0)
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch((err) => {
        console.log("Autoplay dicegah browser (normal jika belum interaksi):", err);
      });
    }
  }, [ujianDimulai]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  // TIMER
  useEffect(() => {
    if (loading || !ujianDimulai) return;

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
  }, [loading, ujianDimulai]);

  const formatWaktu = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

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
      babSlug: mapelSlug === "random" ? "Ujian Akhir Mode Random" : `Ujian Akhir Kelas ${kelasId}`,
      nilai: skorAkhir,
      benar,
      salah: soalUjian.length - benar,
      totalSoal: soalUjian.length,
      jawabanUser,
      soalUjian
    }));

    router.push("/result");
  };

  const handleMulaiUjian = () => {
    const limit = Math.min(soalPool.length, jumlahSoal);
    setSoalUjian(soalPool.slice(0, limit));
    setWaktuSisa(waktuMenit * 60);
    setUjianDimulai(true);
  };

  const handleDropdownJumlahChange = (val) => {
    setDropdownJumlah(val);
    if (val !== "kustom") {
      if (val === "semua") {
        setJumlahSoal(soalPool.length);
      } else {
        setJumlahSoal(parseInt(val));
      }
    }
  };

  const handleDropdownWaktuChange = (val) => {
    setDropdownWaktu(val);
    if (val !== "kustom") {
      setWaktuMenit(parseInt(val));
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-gray-400">Menyiapkan Ujian...</div>;

  if (soalPool.length === 0) return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4 grayscale opacity-30">📂</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Soal Belum Tersedia</h2>
      <button onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">Kembali</button>
    </div>
  );

  // ==========================================
  // TAMPILAN HALAMAN "READY" (LOBBY)
  // ==========================================
  if (!ujianDimulai) {
    const opsiJumlah = [
      ...[5, 10, 15, 20, 25]
        .filter((num) => num <= soalPool.length)
        .map((num) => ({ value: String(num), label: `${num} Soal` })),
      { value: "semua", label: `Semua (${soalPool.length} Soal)` },
      { value: "kustom", label: "Kustom Sendiri" }
    ];

    const opsiWaktu = [
      ...[5, 10, 15, 20, 25, 30].map((min) => ({ value: String(min), label: `${min} Menit` })),
      { value: "kustom", label: "Kustom Sendiri" }
    ];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 text-center border-4 border-white ring-4 ring-blue-50 relative">

          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-[2.5rem]"></div>

          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">
              🚀
            </div>
            <h1 className="text-3xl font-black text-[#2E2856] mb-1">
              SIAP UJIAN?
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
              {mapelSlug === "random" ? "MODE RANDOM" : `Kelas ${kelasId} • ${formatJudul(mapelSlug)}`}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 text-left space-y-4">
            {/* Kustomisasi Jumlah Soal */}
            <div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <FileText className="text-blue-500" size={18} />
                <span className="font-bold text-sm">Jumlah Soal:</span>
              </div>
              
              <CustomSelect
                value={dropdownJumlah}
                options={opsiJumlah}
                onChange={handleDropdownJumlahChange}
                themeColor="blue"
              />

              {dropdownJumlah === "kustom" && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100 transition-all duration-300 animate-fadeIn">
                  <span className="text-xs font-bold text-blue-800">Atur Soal:</span>
                  <div className="flex items-center bg-white border border-blue-200 rounded-xl overflow-hidden shadow-inner">
                    <button
                      type="button"
                      onClick={() => setJumlahSoal(prev => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 bg-gray-50 hover:bg-blue-100/50 text-blue-800 font-extrabold border-r border-blue-200 transition cursor-pointer select-none text-xs"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={soalPool.length}
                      value={jumlahSoal}
                      onChange={(e) => {
                        let val = parseInt(e.target.value);
                        if (isNaN(val)) val = 1;
                        if (val > soalPool.length) val = soalPool.length;
                        if (val < 1) val = 1;
                        setJumlahSoal(val);
                      }}
                      className="w-10 text-center font-black text-xs text-gray-800 focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setJumlahSoal(prev => Math.min(soalPool.length, prev + 1))}
                      className="px-2.5 py-1 bg-gray-50 hover:bg-blue-100/50 text-blue-800 font-extrabold border-l border-blue-200 transition cursor-pointer select-none text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-blue-600 font-bold">Soal (Maks: {soalPool.length})</span>
                </div>
              )}
            </div>

            {/* Kustomisasi Durasi Waktu */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Clock className="text-orange-500" size={18} />
                <span className="font-bold text-sm">Durasi Waktu:</span>
              </div>

              <CustomSelect
                value={dropdownWaktu}
                options={opsiWaktu}
                onChange={handleDropdownWaktuChange}
                themeColor="orange"
              />

              {dropdownWaktu === "kustom" && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-orange-50 rounded-xl border border-orange-100 transition-all duration-300 animate-fadeIn">
                  <span className="text-xs font-bold text-orange-800">Atur Waktu:</span>
                  <div className="flex items-center bg-white border border-orange-200 rounded-xl overflow-hidden shadow-inner">
                    <button
                      type="button"
                      onClick={() => setWaktuMenit(prev => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 bg-gray-50 hover:bg-orange-100/50 text-orange-800 font-extrabold border-r border-orange-200 transition cursor-pointer select-none text-xs"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={waktuMenit}
                      onChange={(e) => {
                        let val = parseInt(e.target.value);
                        if (isNaN(val)) val = 1;
                        if (val > 180) val = 180;
                        if (val < 1) val = 1;
                        setWaktuMenit(val);
                      }}
                      className="w-10 text-center font-black text-xs text-gray-800 focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setWaktuMenit(prev => Math.min(180, prev + 1))}
                      className="px-2.5 py-1 bg-gray-50 hover:bg-orange-100/50 text-orange-800 font-extrabold border-l border-orange-200 transition cursor-pointer select-none text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-orange-600 font-bold">Menit (Maks: 180)</span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 text-gray-700 pt-3 border-t border-gray-200">
              <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Dilarang menyontek atau membuka buku. Kerjakan dengan jujur ya!
              </p>
            </div>
          </div>

          <button
            onClick={handleMulaiUjian}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black text-xl shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            MULAI SEKARANG ➔
          </button>

          <button
            onClick={() => router.back()}
            className="mt-4 text-gray-400 text-sm font-bold hover:text-gray-600 transition cursor-pointer"
          >
            Batal / Kembali
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN UJIAN (SOAL BERJALAN)
  // ==========================================
  const soalAktif = soalUjian[indexSoal];
  const progress = ((indexSoal + 1) / soalUjian.length) * 100;

  return (
    <div className="h-screen bg-gray-50 font-sans flex flex-col overflow-hidden">

      {/* 🔹 AUDIO PLAYER TERSEMBUNYI */}
      {/* Pastikan file 'backsound.mp3' ada di folder 'public' */}
      <audio ref={audioRef} src="/backsound.mp3" loop />

      {/* HEADER & CONTROLS */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              {mapelSlug === "random" ? "Mode Random" : `Ujian Kelas ${kelasId}`}
            </span>
            <span className="text-lg font-bold text-blue-900 capitalize">{mapelSlug.replace("-", " ")}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* 🔹 TOMBOL MUTE / UNMUTE MUSIK */}
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
            title={isMuted ? "Putar Musik" : "Matikan Musik"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* TIMER */}
          <div className={`font-mono font-bold px-4 py-2 rounded-xl border ${waktuSisa < 300 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
            ⏰ {formatWaktu(waktuSisa)}
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-1.5 shrink-0">
        <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <main className="flex-1 w-full flex flex-col justify-start items-center p-4 overflow-y-auto pt-10">
        <div className="w-full max-w-4xl">

          <div className="mb-8 text-center">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
              Soal {indexSoal + 1} / {soalUjian.length}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E2856] leading-relaxed mb-6">
              {soalAktif.PERTANYAAN}
            </h2>
            {soalAktif.gambar && (
              <div className="flex justify-center mb-6 max-h-64 md:max-h-[400px] lg:max-h-[500px] overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
                <img src={soalAktif.gambar} alt="Pertanyaan" className="object-contain max-h-64 md:max-h-[400px] lg:max-h-[500px] w-auto" loading="lazy" />
              </div>
            )}
          </div>

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

          <div className="mt-10 mb-10 flex justify-between items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={indexSoal === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition ${indexSoal === 0 ? "text-gray-300 cursor-not-allowed bg-gray-50" : "text-gray-600 hover:bg-gray-100 border border-gray-200 bg-white"}`}
            >
              <ChevronLeft size={20} /> Prev
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
      </main>
    </div>
  );
}