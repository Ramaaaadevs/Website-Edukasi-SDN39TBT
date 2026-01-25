// src/data/alur-belajar.js
import Image from "next/image";
// Import JSON Soal
import soalPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";
import soalIpa from "@/data/soalIpa.json";
// Import Helper Baru
import { ambilSoalById } from "@/utils/ambilSoal";

// =========================================
// DEFINISI ID SOAL (CONSTANTS)
// =========================================
// Tips: Ubah angka di dalam kurung [] sesuai "ID SOAL" di file JSON kamu.

// --- IDs Matematika ---
const MTK_PECAHAN_PENJUMLAHAN = [1, 3, 4];     // Soal no 1-3
const MTK_PECAHAN_PENGURANGAN = [8,9,1];    // Soal no 4-6 (Digunakan berulang, silakan buat ID baru nanti)
const MTK_PECAHAN_PERKALIAN = [7, 8, 9];      // Soal no 7-9
const MTK_PECAHAN_PEMBAGIAN = [4, 5, 6];  
// --- IDs Bahasa Inggris ---
const BING_GREETING_L1 = [26,29,38];       // Soal no 1-3
const BING_INTRO_L2    = [100,125,55];       // Soal no 4-6
const BING_PARTING_L3  = [7, 8, 9];       // Soal no 7-9

export const databaseAlurBelajar = {
  // =========================================
  // MATEMATIKA
  // =========================================
  
  // --- PECAHAN ---
  "pecahan": [
    {
      tipe: "materi",
      judul: "Apa itu Pecahan?",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>Bayangkan kamu punya pizza 🍕. Jika dipotong 4 bagian, satu potongnya adalah <strong>1/4</strong>.</p>
          <p>Angka atas = <strong>Pembilang</strong>, Angka bawah = <strong>Penyebut</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "materi",
      judul: "Penjumlahan Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Kalau penyebutnya sama, tinggal jumlahkan atasnya saja. Contoh: 1/5 + 2/5 = <strong>3/5</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Penjumlahan",
      // SEBELUM: soalPecahan.slice(3, 6)
      soal: ambilSoalById(soalPecahan, MTK_PECAHAN_PENJUMLAHAN), 
    },
    {
      tipe: "materi",
      judul: "Pengurangan Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Prinsipnya sama dengan penjumlahan. Jika penyebut sudah sama, kurangi pembilangnya saja.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pengurangan",
      // Menggunakan ID yang sama karena di kode lama menggunakan slice yang sama
      soal: ambilSoalById(soalPecahan, MTK_PECAHAN_PENGURANGAN), 
    },
    {
      tipe: "materi",
      judul: "Perkalian Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Atas kali atas, bawah kali bawah. Mudah kan?</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Perkalian",
      soal: ambilSoalById(soalPecahan, MTK_PECAHAN_PERKALIAN),
    },
    {
      tipe: "materi",
      judul: "Pembagian Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Ubah tanda bagi (:) jadi kali (x), lalu balik pecahan keduanya.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pembagian",
      soal: ambilSoalById(soalPecahan, MTK_PECAHAN_PEMBAGIAN),
    },
    {
      tipe: "selesai",
      judul: "Bab Pecahan Selesai!",
      isi: "Kamu hebat! Siap untuk ujian akhir?",
    }
  ],

  // --- PERBANDINGAN ---
  "perbandingan": [
    {
      tipe: "materi",
      judul: "Apa itu Perbandingan?",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Perbandingan adalah membandingkan dua nilai atau lebih dari suatu besaran yang sejenis.</p>
          <p>Contoh: Umur Andi 10 tahun, Budi 15 tahun. Perbandingannya <strong>10 : 15</strong> atau <strong>2 : 3</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "materi",
      judul: "Satuan Berbeda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Jika satuannya beda, samakan dulu! Contoh: 1 meter dan 50 cm diubah meter jadi 100 cm dulu.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman",
      // Di kode lama kamu pakai soalPecahan, pastikan nanti diganti soalPerbandingan jika sudah ada
      soal: ambilSoalById(soalPecahan, [22, 24]), 
    },
    {
      tipe: "materi",
      judul: "Skala",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Skala = Jarak Peta : Jarak Sebenarnya.</p>
          <p>Contoh: 1 : 100.000 artinya 1 cm di peta = 1 km jarak asli.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan Skala",
      soal: ambilSoalById(soalPecahan, [20,21]), 
    },
    {
      tipe: "selesai",
      judul: "Materi Selesai",
      isi: "Materi perbandingan selesai dipelajari.",
    }
  ],

  // --- BANGUN RUANG ---
// --- BANGUN RUANG ---
  "bangun-ruang": [
    // --- SESI 1: KUBUS ---
    {
      tipe: "materi",
      judul: "1. Mengenal Kubus",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong>Kubus</strong> adalah bangun ruang yang istimewa karena semua rusuknya sama panjang dan semua sisinya berbentuk persegi. 
          </p>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">Ciri-ciri Kubus:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Memiliki <strong>6 sisi</strong> berbentuk persegi.</li>
              <li>Memiliki <strong>12 rusuk</strong> yang sama panjang.</li>
              <li>Memiliki <strong>8 titik sudut</strong>.</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
            <p className="font-bold text-green-800">Rumus Volume Kubus:</p>
            <p className="text-2xl font-mono mt-2">V = s × s × s</p>
            <p className="text-sm text-gray-500 mt-1">(s = panjang rusuk)</p>
          </div>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan: Volume Kubus",
      // Pastikan ID 31 & 32 ada di file JSON kamu
      soal: ambilSoalById(soalPecahan, [31,32]), 
    },

    // --- SESI 2: BALOK ---
    {
      tipe: "materi",
      judul: "2. Mengenal Balok",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong>Balok</strong> mirip seperti kardus sepatu atau kotak pasta gigi. Sisinya berbentuk persegi panjang. 
          </p>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <h4 className="font-bold text-orange-800 mb-2">Komponen Balok:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>p</strong> = Panjang (sisi terpanjang)</li>
              <li><strong>l</strong> = Lebar (sisi miring/pendek)</li>
              <li><strong>t</strong> = Tinggi (sisi tegak)</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="font-bold text-purple-800">Rumus Volume Balok:</p>
            <p className="text-2xl font-mono mt-2">V = p × l × t</p>
            <p className="text-sm text-gray-500 mt-1">(Panjang × Lebar × Tinggi)</p>
          </div>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan: Volume Balok",
      // ID 33 ada di snippet kamu. Tambahkan soal ID 34 & 35 di JSON agar lengkap 3 soal.
      soal: ambilSoalById(soalPecahan, [33, 34, 35]), 
    },

    // --- SELESAI ---
    {
      tipe: "selesai",
      judul: "Bab Bangun Ruang Selesai!",
      isi: "Kamu sudah menguasai Kubus dan Balok. Siap untuk Evaluasi?",
    }
  ],

 // =========================================
  // IPA (ILMU PENGETAHUAN ALAM)
  // =========================================

  // --- 1. MAKHLUK HIDUP & LINGKUNGAN ---
  "makhluk-hidup": [
    {
      tipe: "materi",
      judul: "1. Apa itu Ekosistem?",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Ekosistem adalah tempat berlangsungnya hubungan timbal balik antara makhluk hidup (biotik) dan lingkungannya (abiotik).</p>
          <p>Contoh: Ekosistem sawah, sungai, atau hutan.</p>
          <div className="flex justify-center my-6">
            <Image src="/img-ipa/MHL.jpeg" alt="Ekosistem" width={500} height={300} className="rounded-xl shadow-lg border border-gray-200"/>
          </div>
        </div>
      ),
    },
    {
      tipe: "materi",
      judul: "2. Rantai Makanan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Di dalam ekosistem, terjadi proses makan dan dimakan yang disebut <strong>Rantai Makanan</strong>.</p>
          <ul className="list-disc pl-5 space-y-2 bg-green-50 p-4 rounded-xl border border-green-200">
             <li>🌱 <strong>Produsen</strong>: Tumbuhan (membuat makanan sendiri).</li>
             <li>u00f0 <strong>Konsumen</strong>: Hewan (memakan tumbuhan/hewan lain).</li>
             <li>🍄 <strong>Pengurai</strong>: Jamur/Bakteri (menguraikan sisa makhluk hidup).</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Kuis Ekosistem",
      // ID 17 (Rantai Makanan), 18 (Produsen), 19 (Pengurai), 13 (Ciri Makhluk Hidup)
      soal: ambilSoalById(soalIpa, [11,36,9]), 
    },
    {
      tipe: "selesai",
      judul: "Modul Selesai",
      isi: "Hebat! Kamu makin paham tentang alam sekitar.",
    }
  ],

  // --- 2. BENDA & SIFATNYA ---
  "benda-sifat": [
    {
      tipe: "materi",
      judul: "1. Tiga Wujud Benda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Benda di sekitar kita dikelompokkan menjadi 3 wujud:</p>
          <div className="flex justify-center my-6">
            <Image src="/img-ipa/wujud-benda.jpg" alt="Wujud Benda" width={500} height={300} className="rounded-xl shadow-lg border border-gray-200"/>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold">
            <div className="bg-gray-100 p-2 rounded">🪨 Padat</div>
            <div className="bg-blue-100 p-2 rounded">💧 Cair</div>
            <div className="bg-gray-200 p-2 rounded">💨 Gas</div>
          </div>
        </div>
      ),
    },
    {
      tipe: "materi",
      judul: "2. Sifat-Sifat Benda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Padat:</strong> Bentuknya tetap, tidak mengikuti wadah (Contoh: Batu, Kayu).</li>
            <li><strong>Cair:</strong> Mengalir, bentuk mengikuti wadah (Contoh: Air, Minyak).</li>
            <li><strong>Gas:</strong> Mengisi seluruh ruangan, menekan ke segala arah (Contoh: Udara, Asap).</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Tebak Sifat Benda",
      // Masukkan ID soal tentang benda padat/cair/gas dari file excel baru kamu
      // Jika belum ada ID-nya, biarkan array kosong dulu []
      soal: ambilSoalById(soalIpa, [44,29,6]), 
    },
    {
      tipe: "selesai",
      judul: "Modul Selesai",
      isi: "Mantap! Lanjut ke materi energi ya!",
    }
  ],

  // --- 3. GAYA & ENERGI ---
  "gaya-energi": [
    {
      tipe: "materi",
      judul: "1. Apa itu Gaya?",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Gaya adalah tarikan atau dorongan yang dapat mengubah gerak atau bentuk benda.</p>
          <p>Salah satu yang paling umum adalah <strong>Gaya Magnet</strong> . Magnet memiliki dua kutub: Utara (U) dan Selatan (S).</p>
        </div>
      ),
    },
    {
      tipe: "materi",
      judul: "2. Sumber Energi",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Energi tidak dapat diciptakan atau dimusnahkan, tapi bisa berubah bentuk.</p>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <p className="font-bold mb-2">Sumber Energi Terbesar:</p>
            <p>☀️ <strong>Matahari</strong> adalah sumber energi utama (panas & cahaya) bagi bumi. Tumbuhan butuh matahari untuk fotosintesis.</p>
          </div>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Kuis Energi",
      // ID 8 (Matahari), 9 (Sumber Energi), 12 (Panel Surya), 6 (SDA Renewable)
      soal: ambilSoalById(soalIpa, [7,30,19]), 
    },
    {
      tipe: "selesai",
      judul: "Modul Selesai",
      isi: "Kamu sudah belajar dasar gaya dan energi.",
    }
  ],
  // =========================================
  // BAHASA INGGRIS
  // =========================================
  
  "vocab": [ 
    // --- SESI 1: GREETING & TIME ---
    {
      tipe: "materi",
      judul: "1. Greeting & Time",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p><strong>Greeting</strong> adalah sapaan. Ucapkan sesuai waktunya ya:</p>
          <ul className="space-y-2 bg-blue-50 p-4 rounded-xl border border-blue-200">
            <li>🌅 <strong>Good Morning</strong>: Pagi (06.00 - 12.00)</li>
            <li>☀️ <strong>Good Afternoon</strong>: Siang/Sore (12.00 - 18.00)</li>
            <li>🌙 <strong>Good Evening</strong>: Malam (saat bertemu)</li>
            <li>😴 <strong>Good Night</strong>: Malam (saat mau tidur/pisah)</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan 1: Sapaan Dasar",
      // SEBELUM: soalBingGreeting.slice(0, 3)
      soal: ambilSoalById(soalBingGreeting, BING_GREETING_L1), 
    },

    // --- SESI 2: INTRODUCTION ---
    {
      tipe: "materi",
      judul: "2. Introduction (Perkenalan)",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Cara memperkenalkan diri dalam Bahasa Inggris:</p>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-900">
            <p><strong>"Hello, my name is Budi."</strong> (Halo, nama saya Budi)</p>
            <p><strong>"I am 10 years old."</strong> (Saya umur 10 tahun)</p>
            <p><strong>"I like playing football."</strong> (Saya suka main bola)</p>
          </div>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan 2: Perkenalan Diri",
      // SEBELUM: soalBingGreeting.slice(3, 6)
      soal: ambilSoalById(soalBingGreeting, BING_INTRO_L2), 
    },

    // --- SESI 3: PARTING ---
    {
      tipe: "materi",
      judul: "3. Parting (Perpisahan)",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Jika ingin berpisah, ucapkan:</p>
          <ul className="grid grid-cols-2 gap-2 font-semibold text-center">
            <li className="bg-red-50 p-2 rounded border border-red-100">Good Bye 👋</li>
            <li className="bg-red-50 p-2 rounded border border-red-100">See you later 🔜</li>
            <li className="bg-red-50 p-2 rounded border border-red-100">Take care ❤️</li>
            <li className="bg-red-50 p-2 rounded border border-red-100">Nice to meet you 🤝</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan 3: Salam Perpisahan",
      // SEBELUM: soalBingGreeting.slice(6, 9)
      soal: ambilSoalById(soalBingGreeting, BING_PARTING_L3), 
    },

    // --- SELESAI ---
    {
      tipe: "selesai",
      judul: "Materi Greeting Selesai!",
      isi: "Good job! Kamu sudah siap untuk ujian akhir.",
    }
  ],

  // --- MATERI CADANGAN ---
  "classroom-objects": [ 
    {
      tipe: "materi",
      judul: "Things in the Classroom",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Ayo belajar benda-benda di dalam kelas!</p>
        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Excellent!",
      isi: "Hafalkan kosa katanya ya!",
    }
  ],

  // --- DEFAULT ---
  "default": [
    {
      tipe: "materi",
      judul: "Materi Belum Tersedia",
      isi: <p>Mohon maaf, materi untuk bab ini sedang disusun oleh guru.</p>
    },
    {
      tipe: "selesai",
      judul: "Kembali",
      isi: "Silakan pilih materi lain.",
    }
  ]
};