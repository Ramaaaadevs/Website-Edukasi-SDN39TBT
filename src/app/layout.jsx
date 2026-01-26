import Navbar from "@/components/Navbar";
import Credit from "@/components/Credit"; 
import "./globals.css";

export const metadata = {
  title: "60KUIZ",
  description: "Belajar jadi menyenangkan!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* 1. min-h-screen: Tinggi body minimal 100% layar.
         2. flex flex-col: Susun elemen (Navbar, Main, Footer) secara vertikal.
      */}
      <body className="min-h-screen flex flex-col font-sans">
        
        {/* Bagian Atas */}
        <Navbar />
        
        {/* Bagian Tengah (KONTEN) */}
        {/* flex-1: Inilah kuncinya! 
           Dia memerintahkan <main> untuk mengisi SEMUA ruang kosong yang tersisa.
           Akibatnya, Footer akan terdorong mentok ke paling bawah.
        */}
        <main className="flex-1 w-full flex flex-col bg-white"> 
          {children}
        </main>
        
      </body>
    </html>
  );
}