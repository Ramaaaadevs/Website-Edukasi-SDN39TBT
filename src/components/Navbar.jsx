"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar-container relative">
      <div className="navbar-content">
        
        {/* LOGO KIRI */}
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <span><Image src="/images/IconLogo.png" alt="Logo" width={75} height={75} /></span> 
          <span>60KUIZ</span>
        </Link>

        {/* MENU DESKTOP (Tersembunyi di Mobile) */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          <Link href="/" className="nav-link">
            Beranda
          </Link>
          
          <Link href="/modul" className="nav-link">
            Belajar Materi
          </Link>

          <Link href="/leaderboard" className="nav-link">
            Papan Juara
          </Link>
          
          {/* Tombol yang lebih menonjol buat Ujian */}
          <Link href="/ujian" className="nav-btn-highlight">
            Ujian Akhir
          </Link>

          <Link href="/about" className="nav-link">
            Tentang Kami
          </Link>
        </div>

        {/* HAMBURGER TOGGLE BUTTON (Hanya muncul di Mobile) */}
        <button 
          onClick={toggleMenu}
          className="p-2 text-blue-900 md:hidden hover:bg-gray-100 rounded-xl transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* DROPDOWN MENU MOBILE (Slide Down) */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-b-4 border-blue-100 shadow-lg md:hidden flex flex-col p-6 gap-4 z-50 animate-in slide-in-from-top-5 duration-200">
          <Link 
            href="/" 
            className="text-lg font-bold text-gray-600 hover:text-yellow-500 py-2 border-b border-gray-100 transition"
            onClick={closeMenu}
          >
            Beranda
          </Link>
          
          <Link 
            href="/modul" 
            className="text-lg font-bold text-gray-600 hover:text-yellow-500 py-2 border-b border-gray-100 transition"
            onClick={closeMenu}
          >
            Belajar Materi
          </Link>

          <Link 
            href="/leaderboard" 
            className="text-lg font-bold text-gray-600 hover:text-yellow-500 py-2 border-b border-gray-100 transition"
            onClick={closeMenu}
          >
            Papan Juara
          </Link>

          <Link 
            href="/about" 
            className="text-lg font-bold text-gray-600 hover:text-yellow-500 py-2 border-b border-gray-100 transition"
            onClick={closeMenu}
          >
            Tentang Kami
          </Link>
          
          <Link 
            href="/ujian" 
            className="w-full text-center bg-yellow-400 text-blue-950 py-3 rounded-xl font-bold shadow-md hover:bg-yellow-500 active:translate-y-0.5 border-b-4 border-yellow-600 transition"
            onClick={closeMenu}
          >
            Ujian Akhir
          </Link>
        </div>
      )}
    </nav>
  );
}