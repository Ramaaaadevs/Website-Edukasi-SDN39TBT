// src/data/alur-belajar.js
import Image from "next/image";
// Import JSON Soal
import soalPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";

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
      tipe: "kuis",
      judul: "Latihan Konsep Dasar",
      soal: soalPecahan.slice(0, 3), 
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
      soal: soalPecahan.slice(3, 6), 
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
      soal: soalPecahan.slice(3, 6), // (Sesuaikan index slice jika soalnya beda)
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
      soal: soalPecahan.slice(3, 6),
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
      soal: soalPecahan.slice(3, 6),
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
      soal: soalPecahan.slice(0, 3), // (Ganti dengan soalPerbandingan jika sudah ada)
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
      soal: soalPecahan.slice(0, 3), 
    },
    {
      tipe: "selesai",
      judul: "Materi Selesai",
      isi: "Materi perbandingan selesai dipelajari.",
    }
  ],

  // --- BANGUN RUANG ---
  "bangun-ruang": [
    {
      tipe: "materi",
      judul: "Mengenal Kubus",
      isi: <p>Kubus adalah bangun ruang yang semua sisinya berbentuk persegi.</p>
    },
    {
      tipe: "selesai",
      judul: "Siap Ujian",
      isi: "Lanjut ke evaluasi bangun ruang.",
    }
  ],

  // =========================================
  // IPA (ILMU PENGETAHUAN ALAM)
  // =========================================

  "makhluk-hidup": [
    {
      tipe: "materi",
      judul: "Ekosistem",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan lingkungannya.</p>
          <div className="flex justify-center my-6">
            <Image src="/img-ipa/MHL.jpeg" alt="Ekosistem" width={500} height={300} className="rounded-xl shadow-lg border border-gray-200"/>
          </div>
        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Selesai",
      isi: "Hebat! Kamu makin paham tentang alam sekitar.",
    }
  ],

  "benda-sifat": [
    {
      tipe: "materi",
      judul: "Wujud Benda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Benda dikelompokkan menjadi 3: <strong>Padat, Cair, Gas</strong>.</p>
          <div className="flex justify-center my-6">
            <Image src="/img-ipa/wujud-benda.jpg" alt="Wujud Benda" width={500} height={300} className="rounded-xl shadow-lg border border-gray-200"/>
          </div>
          <ul className="list-disc pl-8 space-y-2">
            <li>Padat: Bentuk tetap.</li>
            <li>Cair: Mengikuti wadah.</li>
            <li>Gas: Mengisi ruangan.</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Tebak Wujud Benda",
      soal: [], 
    },
    {
      tipe: "selesai",
      judul: "Selesai",
      isi: "Lanjut ke materi berikutnya!",
    }
  ],

  "gaya-energi": [
    {
      tipe: "materi",
      judul: "Gaya Magnet",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Magnet punya kutub Utara (U) dan Selatan (S).</p>
          <div className="flex justify-center my-6">
            <Image src="/img-ipa/magnet.jpg" alt="Magnet" width={500} height={300} className="rounded-xl shadow-lg border border-gray-200"/>
          </div>
        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Selesai",
      isi: "Kamu sudah belajar dasar gaya magnet.",
    }
  ],

  // =========================================
  // BAHASA INGGRIS (DIPERBAIKI)
  // =========================================
  
  "vocab": [ 
    // --- SESI 1: GREETING & TIME (Tips -> Latihan 1-3) ---
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
      soal: soalBingGreeting.slice(0, 3), // Mengambil soal no 1-3
    },

    // --- SESI 2: INTRODUCTION (Tips -> Latihan 4-6) ---
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
      soal: soalBingGreeting.slice(3, 6), // Mengambil soal no 4-6
    },

    // --- SESI 3: PARTING (Tips -> Latihan 7-9) ---
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
      soal: soalBingGreeting.slice(6, 9), // Mengambil soal no 7-9
    },

    // --- SELESAI ---
    {
      tipe: "selesai",
      judul: "Materi Greeting Selesai!",
      isi: "Good job! Kamu sudah siap untuk ujian akhir.",
    }
  ],

  // --- MATERI CADANGAN (Supaya tidak error ID ganda) ---
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