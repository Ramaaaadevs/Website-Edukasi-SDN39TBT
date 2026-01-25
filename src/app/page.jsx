import Link from "next/link";
import Credit from "@/components/Credit"; 
import Image from "next/image";
// Nanti import Image dari next/image kalau gambar sudah ada

export default function Beranda() {
  return (
    <div className="home-container">
      
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