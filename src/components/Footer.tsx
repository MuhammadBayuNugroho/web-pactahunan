import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 text-xs text-slate-500 text-center space-y-4">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/assets/images/logo-bersama.png"
            alt="PAC IPNU IPPNU Tahunan"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="font-extrabold text-slate-900 text-sm uppercase tracking-widest">
            PAC IPNU IPPNU TAHUNAN
          </p>
        </div>
        <p className="text-xs max-w-xl mx-auto leading-relaxed text-slate-400 font-medium">
          Portal satu pintu untuk optimalisasi monitoring legalitas kepengurusan pimpinan ranting desa dan
          pimpinan komisariat sekolah di Kecamatan Tahunan, Jepara, Jawa Tengah.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-bold">
          <a
            href="https://www.instagram.com/pac_ipnuippnutahunan/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-purple transition flex items-center gap-1.5"
          >
            <i className="fab fa-instagram text-pink-600 text-sm"></i>
            Instagram
          </a>
          <span className="text-slate-200">|</span>
          <a
            href="https://linktr.ee/pacipnuippnutahunan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-purple transition flex items-center gap-1.5"
          >
            <i className="fas fa-link text-slate-400"></i>
            Linktree PAC
          </a>
        </div>
        <p className="text-[9px] text-slate-450 pt-4 font-mono">
          © {new Date().getFullYear()} PAC IPNU IPPNU Kecamatan Tahunan. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
