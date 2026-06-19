"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Credit from "@/components/Credit"; 
import Image from "next/image";

export default function Beranda() {
  const [showPopup, setShowPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilInput, setProfilInput] = useState({ nama: "", kelas: "", absen: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah melihat popup pembaruan ini
    const hasSeen = localStorage.getItem("hasSeenMaintenancePopup");
    const profil = localStorage.getItem("profil_siswa");

    if (!hasSeen) {
      setShowPopup(true);
    } else if (!profil) {
      setShowProfileModal(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("hasSeenMaintenancePopup", "true");
    setShowPopup(false);

    // Setelah popup update ditutup, cek jika harus menampilkan modal registrasi profil
    const profil = localStorage.getItem("profil_siswa");
    if (!profil) {
      setShowProfileModal(true);
    }
  };

  return (
    <div className="home-container">
      {/* POPUP PEMBARUAN APLIKASI (Hanya muncul 1 kali) */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col border-4 border-white ring-8 ring-blue-50/50 transform transition-all duration-300 overflow-hidden">
            
            {/* Header dengan Gradasi Ceria (shrink-0) */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center text-white relative shrink-0">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto text-2xl mb-2 backdrop-blur-sm shadow-inner animate-bounce">
                📢
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight">Kabar Gembira! ✨</h3>
              <p className="text-white/80 text-xs md:text-sm font-semibold mt-1">Aplikasi 60KUIZ Sudah Diperbarui</p>
            </div>

            {/* Konten Scrollable untuk Murid, Guru, & Orang Tua (flex-1 overflow-y-auto) */}
            <div className="p-6 md:p-8 space-y-5 text-gray-700 overflow-y-auto flex-1 text-left">
              <p className="text-center font-bold text-[#2E2856] text-sm md:text-base leading-relaxed">
                Halo Ayah/Bunda, Bapak/Ibu Guru, dan Sahabat Juara! Kami telah melakukan pembaruan seru agar belajar jadi makin menyenangkan:
              </p>

              <div className="space-y-4">
                {/* Poin 1: Gambar Soal */}
                <div className="flex gap-3 items-start">
                  <div className="bg-blue-100 text-blue-600 w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 font-bold shadow-sm">
                    🖼️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856] text-sm md:text-base">Gambar Soal Lebih Besar & Jelas</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">Gambar diagram dan ilustrasi soal (terutama pelajaran IPA) sekarang tampil lebih besar dan tajam di layar TV maupun komputer.</p>
                  </div>
                </div>

                {/* Poin 2: Akurasi KJ */}
                <div className="flex gap-3 items-start">
                  <div className="bg-yellow-100 text-yellow-700 w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 font-bold shadow-sm">
                    📝
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856] text-sm md:text-base">Soal & Kunci Jawaban Lebih Tepat</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">Penambahan kuis baru serta perbaikan kunci jawaban latihan matematika, IPA, dan Bahasa Inggris.</p>
                  </div>
                </div>

                {/* Poin 3: Kelancaran */}
                <div className="flex gap-3 items-start">
                  <div className="bg-green-100 text-green-700 w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 font-bold shadow-sm">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856] text-sm md:text-base">Aplikasi Lebih Lancar & Stabil</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">Belajar dan kuis berjalan lebih mulus dan stabil bebas hambatan saat melihat hasil belajar akhir di SmartTV, Laptop, dan HP.</p>
                  </div>
                </div>

                {/* Poin 4: Kustomisasi Ujian */}
                <div className="flex gap-3 items-start">
                  <div className="bg-purple-100 text-purple-700 w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 font-bold shadow-sm">
                    ⏱️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2E2856] text-sm md:text-base">Atur Jumlah Soal & Waktu Ujian Akhir</h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">Kamu bisa bebas memilih total soal yang akan keluar dan durasi waktu ujian sebelum ujian akhir dimulai.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Mulai Tetap di Bawah (shrink-0) */}
            <div className="p-6 pt-4 text-center shrink-0 border-t border-gray-100 bg-gray-50 rounded-b-[2rem]">
              <button
                onClick={handleClosePopup}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-blue-950 font-black py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg shadow-lg hover:scale-102 hover:shadow-xl transition-all cursor-pointer text-center mb-3"
              >
                Siap, Ayo Belajar! 🚀
              </button>
              <span className="text-[10px] md:text-[11px] text-gray-400 font-bold block">
                Salam hangat dari Tim KKN PPM Kelompok 60 ITERA 2026 💙
              </span>
            </div>

          </div>
        </div>
      )}

      {/* MODAL PROFIL SISWA 1X */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full border-4 border-white ring-8 ring-blue-50/50 p-8 text-center relative max-h-[95vh] overflow-y-auto">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-[2.5rem]"></div>
            
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner">
              👦
            </div>
            
            <h3 className="text-2xl font-black text-[#2E2856] mb-1">Daftarkan Dirimu! ✨</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">Profil Juara Kuis</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!profilInput.nama.trim() || !profilInput.kelas.trim() || !profilInput.absen) return;
              localStorage.setItem("profil_siswa", JSON.stringify({
                nama: profilInput.nama.trim(),
                kelas: profilInput.kelas.trim().toUpperCase(),
                absen: parseInt(profilInput.absen)
              }));
              setShowSuccessModal(true);
            }} className="space-y-4 text-left">
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Nama Panggilan:</label>
                <input
                  type="text"
                  maxLength={12}
                  required
                  value={profilInput.nama}
                  onChange={(e) => setProfilInput({ ...profilInput, nama: e.target.value })}
                  placeholder="Ketik nama panggilanmu (Maks 12 huruf)..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 font-bold text-sm text-gray-800 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Kelas:</label>
                  <input
                    type="text"
                    required
                    value={profilInput.kelas}
                    onChange={(e) => setProfilInput({ ...profilInput, kelas: e.target.value.toUpperCase() })}
                    placeholder="Contoh: 5A / 6B"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 font-bold text-sm text-gray-800 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">No. Absen:</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={profilInput.absen}
                    onChange={(e) => setProfilInput({ ...profilInput, absen: e.target.value })}
                    placeholder="Contoh: 12"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 font-bold text-sm text-gray-800 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!profilInput.nama.trim() || !profilInput.kelas.trim() || !profilInput.absen}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-black py-4 rounded-xl text-base shadow-lg shadow-blue-200 hover:scale-102 transition cursor-pointer text-center"
              >
                Mulai Berpetualang! ➔
              </button>

            </form>
          </div>
        </div>
      )}

      {/* MODAL SUKSES PENDAFTARAN */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full border-4 border-white ring-8 ring-blue-50/50 p-8 text-center relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-[2.5rem]"></div>
            
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner">
              🎉
            </div>
            
            <h3 className="text-xl font-black text-green-950 mb-2">Pendaftaran Berhasil!</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Selamat datang Juara, <span className="font-extrabold text-blue-600">{profilInput.nama}</span>! Profilmu telah tersimpan secara aman di HP/Laptop ini.
            </p>
            
            <button
              onClick={() => {
                setShowSuccessModal(false);
                setShowProfileModal(false);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black py-3 rounded-xl text-sm shadow-md transition cursor-pointer text-center"
            >
              Mulai Belajar 🚀
            </button>
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