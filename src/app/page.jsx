"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Credit from "@/components/Credit"; 
import Image from "next/image";

export default function Beranda() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah melihat popup pembaruan ini
    const hasSeen = localStorage.getItem("hasSeenMaintenancePopup");
    if (!hasSeen) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("hasSeenMaintenancePopup", "true");
    setShowPopup(false);
  };

  return (
    <div className="home-container">
      {/* POPUP PEMBARUAN APLIKASI (Hanya muncul 1 kali) */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border-4 border-white ring-8 ring-blue-50/50 transform transition-all duration-300">
            
            {/* Header dengan Gradasi Ceria */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center text-white relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto text-3xl mb-3 backdrop-blur-sm shadow-inner animate-bounce">
                📢
              </div>
              <h3 className="text-2xl font-black tracking-tight">Kabar Gembira! ✨</h3>
              <p className="text-white/80 text-sm font-semibold mt-1">Aplikasi 60KUIZ Sudah Diperbarui</p>
            </div>

            {/* Konten Non-Teknis untuk Murid, Guru, & Orang Tua */}
            <div className="p-8 space-y-5 text-gray-700">
              <p className="text-center font-semibold text-[#2E2856] text-lg leading-relaxed">
                Halo Ayah/Bunda, Bapak/Ibu Guru, dan Sahabat Juara! Kami telah melakukan pembaruan seru agar belajar jadi makin menyenangkan:
              </p>

              <div className="space-y-4">
                {/* Poin 1: Gambar Soal */}
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 font-bold shadow-sm">
                    🖼️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856]">Gambar Soal Lebih Besar & Jelas</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Gambar diagram dan ilustrasi soal (terutama pelajaran IPA) sekarang tampil lebih besar dan tajam di layar TV maupun komputer.</p>
                  </div>
                </div>

                {/* Poin 2: Akurasi KJ */}
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-100 text-yellow-700 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 font-bold shadow-sm">
                    📝
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856]">Soal & Kunci Jawaban Lebih Tepat</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Penambahan kuis baru serta perbaikan kunci jawaban latihan matematika, IPA, dan Bahasa Inggris.</p>
                  </div>
                </div>

                {/* Poin 3: Kelancaran */}
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 text-green-700 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 font-bold shadow-sm">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856]">Aplikasi Lebih Lancar & Stabil</h4>
                    <p className="text-sm text-gray-500 mt-0.5">Belajar dan kuis berjalan lebih mulus dan stabil, bebas hambatan saat melihat hasil belajar akhir.</p>
                  </div>
                </div>
              </div>

              {/* Tombol Mulai */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleClosePopup}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-blue-950 font-black py-4 rounded-2xl text-lg shadow-lg hover:scale-102 hover:shadow-xl transition-all cursor-pointer text-center mb-3"
                >
                  Siap, Ayo Belajar! 🚀
                </button>
                <span className="text-[11px] text-gray-400 font-bold block">
                  Salam hangat dari Tim KKN PPM Kelompok 60 ITERA 2026 💙
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
      
      {/* BAGIAN TENGAH (HERO) */}
      <main className="hero-wrapper">
        <div className="hero-grid">
          
          {/* KOLOM KIRI: Teks & Tombol */}
          <div className="hero-text-col">
            <div>
              <h1 className="hero-title-primary">
                Halo Juara Cilik!
              </h1>
              <h2 className="hero-title-secondary">
                Ayo Main Sambil Belajar!
              </h2>
            </div>

            <p className="hero-desc">
              Pilih mata pelajaran yang ingin kamu pelajari, baca materi dan 
              selesaikan soal yang diberikan, dan dapatkan nilai yang paling tinggi!
            </p>

            <div>
              <Link href="/modul" className="nav-btn-highlight">
                MULAI BELAJAR
              </Link>
            </div>
          </div>

          {/* KOLOM KANAN: Tempat Gambar */}
          <div className="hero-img-col" >
                <Image src="/images/anak juara 1_1.png" width={600} height={600} alt="Hero" />     
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Credit />

    </div>
  );
}