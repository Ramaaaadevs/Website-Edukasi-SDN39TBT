import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        
        {/* LOGO KIRI */}
        <Link href="/" className="nav-logo">
          {/* Bisa ganti Icon SVG atau Image disini */}
          <span><Image src="/images/IconLogo.png" alt="Logo" width={75} height={75} /></span> 
          <span>60KUIZ</span>
        </Link>

        {/* MENU KANAN */}
        <div className="nav-menu">
          <Link href="/" className="nav-link">
            Beranda
          </Link>
          
          <Link href="/modul" className="nav-link">
            Belajar Materi
          </Link>
          
          {/* Tombol yang lebih menonjol buat Ujian */}
          <Link href="/evaluasi" className="nav-btn-highlight">
            Ujian Akhir
          </Link>
        </div>

      </div>
    </nav>
  );
}