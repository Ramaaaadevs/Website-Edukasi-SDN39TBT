import Navbar from "@/components/Navbar"; // 1. Import Navbar
import "./globals.css";

// Metadata (Judul Tab Browser)
export const metadata = {
  title: "Web Edukasi SD",
  description: "Belajar jadi menyenangkan!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        
        {/* 2. Pasang Navbar DI ATAS children */}
        <Navbar />
        
        {/* Ini adalah isi halaman (Beranda, Modul, dll) */}
        {children}
        
      </body>
    </html>
  );
}