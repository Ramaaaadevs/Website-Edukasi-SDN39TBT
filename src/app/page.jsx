import Link from "next/link";
import Credit from "@/components/Credit"; 
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
          <div className="hero-img-col">
            {/* Nanti ganti <img> dibawah:
                <Image src="/images/anak-juara.png" width={500} height={500} alt="Hero" />
            */}
            <div className="hero-img-placeholder">
                <img 
                  src="https://placehold.co/600x600/png?text=Gambar+Anak+Juara" 
                  alt="Ilustrasi"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Credit />

    </div>
  );
}