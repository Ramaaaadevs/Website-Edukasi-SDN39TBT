import Image from "next/image";

export default function Credit() {
  return (
    <footer className="footer-base">
      <div className="footer-content">
        
        {/* Bagian Kiri: Copyright */}
        <div className="footer-text">
          <span className="text-xl">©</span>
          <p>Kelompok KKN PPM 60 Periode ke-16 Institut Teknologi Sumatera</p>
        </div>

        {/* Bagian Kanan: Logo Partner */}
            <div className="footer-logos">
                 <Image src="/images/logo1.png" alt="Logo 1" width={85} height={85} />
                 <Image src="/images/logo2.png" alt="Logo 2" width={100} height={100} />
                 <Image src="/images/logo3.jpeg" alt="Logo 3" width={100} height={100} />
            </div>

      </div>
    </footer>
  );
}