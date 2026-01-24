// src/data/alur-belajar.js
import Image from "next/image";
// Import JSON Soal yang sudah kamu punya
import soalPecahan from "@/data/mtk-kelas5-pecahan.json";
import soalBingGreeting from "@/data/bing-kelas5-greeting.json";
// import soalBangunRuang from "@/data/mtk-kelas5-bangunruang.json"; // (Contoh kalau sudah ada)

export const databaseAlurBelajar = {
  // --- MATEMATIKA: PECAHAN ---
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
      soal: soalPecahan.slice(0, 3), // Ambil soal no 1-3
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
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
        {
      tipe: "materi",
      judul: "Pengurangan Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Kalau penyebutnya sama, tinggal jumlahkan atasnya saja. Contoh: 1/5 + 2/5 = <strong>3/5</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pengurangan",
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
        {
      tipe: "materi",
      judul: "Perkalian Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Kalau penyebutnya sama, tinggal jumlahkan atasnya saja. Contoh: 1/5 + 2/5 = <strong>3/5</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Perkalian",
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
    {
      tipe: "materi",
      judul: "Pembagian Pecahan",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Kalau penyebutnya sama, tinggal jumlahkan atasnya saja. Contoh: 1/5 + 2/5 = <strong>3/5</strong>.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pembagian",
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
    {
      tipe: "selesai",
      judul: "Bab Pecahan Selesai!",
      isi: "Kamu hebat! Siap untuk ujian akhir?",
    }
  ],

  // --- MATEMATIKA: PERBANDINGAN (Contoh Struktur) ---
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
      judul: "Perbandingan Dua Besaran dengan Satuan yang Berbeda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Perbandingan dua besaran dengan satuan berbeda harus disamakan terlebih dahulu satuannya. Setelah satuannya sama, barulah perbandingan dapat ditentukan dengan benar.</p>
          <p>Contoh: 1 meter dan 50 cm harus diubah ke satuan yang sama sebelum dibandingkan.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pembagian",
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
    {
      tipe: "materi",
      judul: "Skala",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Skala adalah perbandingan antara jarak pada gambar atau peta dengan jarak sebenarnya. Skala digunakan untuk memperkecil atau memperbesar suatu objek agar dapat digambar pada bidang yang terbatas.</p>
            <p>Contoh: skala 1 : 100.000 artinya 1 cm pada peta mewakili 100.000 cm jarak sebenarnya.</p>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Cek Pemahaman Pembagian",
      soal: soalPecahan.slice(3, 6), // Ambil soal no 4-6
    },
    // Jika belum ada soal JSON-nya, bisa dikosongkan dulu atau pakai dummy
    {
      tipe: "selesai",
      judul: "Materi Selesai",
      isi: "Materi perbandingan selesai dipelajari.",
    }
  ],

  // --- MATEMATIKA: BANGUN RUANG ---
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

  // 1. MAKHLUK HIDUP
  "makhluk-hidup": [
    {
      tipe: "materi",
      judul: "Ekosistem",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan lingkungannya. Ada komponen biotik (hidup) dan abiotik (tak hidup).
          </p>
          
          {/* Gambar Rantai Makanan / Ekosistem */}
          <div className="flex justify-center my-6">
            <Image 
              src="/img-ipa/MHL.jpeg" 
              alt="Rantai Makanan Ekosistem"
              width={500} 
              height={300} 
              className="rounded-xl shadow-lg border border-gray-200"
            />
          </div>

        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Bab Makhluk Hidup Selesai",
      isi: "Hebat! Kamu makin paham tentang alam sekitar.",
    }
  ],

  // 2. BENDA & SIFATNYA
  "benda-sifat": [
    {
      tipe: "materi",
      judul: "Wujud Benda",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            Benda di sekitar kita dikelompokkan menjadi 3 wujud: <strong>Padat, Cair, dan Gas</strong>.
          </p>
          
          {/* Gambar Susunan Molekul */}
          <div className="flex justify-center my-6">
            <Image 
              src="/img-ipa/wujud-benda.jpg" 
              alt="Perbedaan Padat Cair Gas"
              width={500} 
              height={300} 
              className="rounded-xl shadow-lg border border-gray-200"
            />
          </div>

          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Padat:</strong> Bentuk tetap (contoh: Batu).</li>
            <li><strong>Cair:</strong> Mengikuti wadah (contoh: Air).</li>
            <li><strong>Gas:</strong> Mengisi seluruh ruangan (contoh: Udara).</li>
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

  // 3. GAYA & ENERGI
  "gaya-energi": [
    {
      tipe: "materi",
      judul: "Gaya Magnet",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            Magnet memiliki dua kutub: Utara (U) dan Selatan (S). Kutub yang senama akan tolak-menolak, kutub berbeda akan tarik-menarik.
          </p>
          
          {/* Gambar Medan Magnet */}
          <div className="flex justify-center my-6">
            <Image 
              src="/img-ipa/magnet.jpg" 
              alt="Gaya Magnet"
              width={500} 
              height={300} 
              className="rounded-xl shadow-lg border border-gray-200"
            />
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
  "greeting": [ 
    {
      tipe: "materi",
      judul: "Hello & Good Morning!",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            Greeting adalah cara kita menyapa orang lain. Sapaan bisa dilakukan saat bertemu (meeting) atau berpisah (parting).
          </p>
          <ul className="list-disc pl-6 space-y-2 bg-blue-50 p-4 rounded-xl border border-blue-200">
            <li><strong>Good Morning:</strong> Selamat Pagi (06.00 - 12.00)</li>
            <li><strong>Good Afternoon:</strong> Selamat Siang/Sore (12.00 - 18.00)</li>
            <li><strong>Good Evening:</strong> Selamat Malam (Saat bertemu malam hari)</li>
            <li><strong>Good Night:</strong> Selamat Tidur (Diucapkan saat berpisah tidur)</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "kuis",
      judul: "Latihan Greetings",
      // Mengambil soal dari file JSON yang sudah di-import di atas
      soal: soalBingGreeting, 
    },
    {
      tipe: "materi",
      judul: "Introduction (Perkenalan)",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Setelah menyapa, biasanya kita memperkenalkan diri.</p>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 font-medium text-yellow-800">
            <p>"Hello, my name is Budi." (Halo, nama saya Budi)</p>
            <p>"I am 10 years old." (Umur saya 10 tahun)</p>
            <p>"Nice to meet you." (Senang bertemu denganmu)</p>
          </div>
        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Good Job!",
      isi: "Kamu sudah bisa menyapa dalam Bahasa Inggris. Let's go to the next topic!",
    }
  ],

  // Contoh Topik Kedua (Misal: Vocab / Classroom)
  "vocab": [
    {
      tipe: "materi",
      judul: "Things in the Classroom",
      isi: (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>Ayo belajar benda-benda di dalam kelas!</p>
          <ul className="grid grid-cols-2 gap-2 text-center font-bold">
            <li className="bg-white p-2 border rounded">Book 📘 (Buku)</li>
            <li className="bg-white p-2 border rounded">Pen 🖊️ (Pulpen)</li>
            <li className="bg-white p-2 border rounded">Table 🪑 (Meja)</li>
            <li className="bg-white p-2 border rounded">Whiteboard ⬜ (Papan Tulis)</li>
          </ul>
        </div>
      ),
    },
    {
      tipe: "selesai",
      judul: "Excellent!",
      isi: "Hafalkan kosa katanya ya!",
    }
  ],
  // --- DEFAULT (Jika bab tidak ditemukan) ---
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