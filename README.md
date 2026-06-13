# 🎓 60KUIZ — Web Edukasi Interaktif SD

> Platform belajar dan ujian online untuk siswa SD Kelas 5 & 6, dikembangkan sebagai bagian dari program **KKN PPM Kelompok 60 Periode ke-16 Institut Teknologi Sumatera**.

---

## 🚀 Live Demo

**Website →** [60kuiz.vercel.app](https://60kuiz.vercel.app)

---

## 📸 Tampilan

> *(tambahkan screenshot UI di sini jika ada)*

---

## ✨ Fitur

- 📖 **Modul Belajar Interaktif** — materi + kuis mini per sesi (step-by-step learning)
- 📝 **Ujian Akhir** — soal diacak dengan timer countdown
- 📊 **Halaman Hasil & Pembahasan** — nilai, jumlah benar/salah, dan penjelasan tiap soal
- 🎵 Backsound musik saat ujian berlangsung
- 📱 Responsive — bisa diakses dari HP maupun laptop

---

## 📚 Mata Pelajaran

| Mapel | Topik |
|-------|-------|
| Matematika | Pecahan, Perbandingan & Skala, Bangun Ruang, FPB & KPK |
| IPA | Makhluk Hidup & Lingkungan, Benda & Sifatnya, Gaya & Energi |
| Bahasa Inggris | Vocabulary, Daily Life & Reading, Grammar |
| Komputer | Dasar Komputer |

---

## 🛠️ Tech Stack

<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=0d1117" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=0d1117" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
</div>

---

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── modul/          # Halaman belajar per mapel & bab
│   ├── ujian/          # Halaman ujian akhir
│   └── result/         # Hasil & pembahasan
├── components/
│   ├── Navbar.jsx
│   └── Credit.jsx
├── data/               # Soal dalam format JSON
│   ├── mtk-kelas5-pecahan.json
│   ├── bing-kelas5-greeting.json
│   ├── soalIpa.json
│   └── random.json
└── utils/
    └── ambilSoal.js    # Helper untuk filter soal by ID
```

---

## ⚙️ Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/Ramaaaadevs/Website-Edukasi-SDN39TBT.git
cd Website-Edukasi-SDN39TBT

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 👥 Tim KKN PPM Kelompok 60

**Institut Teknologi Sumatera — Periode ke-16**

---

<p align="center">
  <i>Belajar jadi menyenangkan! 🎉</i>
</p>
