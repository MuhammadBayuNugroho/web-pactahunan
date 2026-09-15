"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, Role } from "@/lib/context/AppContext";

const LIST_RANTING = [
  "Kecapi I",
  "Kecapi II",
  "Kecapi III",
  "Tahunan",
  "Mantingan",
  "Langon",
  "Sukodono",
  "Tegalsambi",
  "Petekeyan",
  "Mangunan",
  "Semat",
  "Teluk Awur",
  "Senenan",
  "Krapyak",
  "Platar",
  "Ngabul",
  "Demangan"
];

const LIST_KOMISARIAT = [
  "MTs Al Hidayah",
  "MTs Mada Nusantara",
  "MA Mada Nusantara",
  "MTs NU Nahdlatul Fata",
  "MA NU Nahdlatul Fata",
  "MA Masalikil Huda",
  "MA Al Anwar",
  "MTs Al Anwar",
  "MTs Al Ikhlas",
  "MTs Zumratul Wildan",
  "SMK Al Hidayah",
  "MA Zumratul Wildan",
  "MTs Masalikil Huda",
  "MA Mafatihul Akhlaq",
  "MTs Mafatihul Akhlaq"
];

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useApp();
  const [pin, setPin] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("admin_ranting");
  const [selectedPimpinan, setSelectedPimpinan] = useState("Mantingan");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Update default selected pimpinan when role changes
  useEffect(() => {
    if (selectedRole === "admin_ranting") {
      setSelectedPimpinan(LIST_RANTING[0]);
    } else if (selectedRole === "admin_komisariat") {
      setSelectedPimpinan(LIST_KOMISARIAT[0]);
    }
  }, [selectedRole]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin_ranting" || user.role === "admin_komisariat") {
        router.push("/dashboard/ranting");
      } else {
        router.push("/dashboard/pac");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    setSubmitting(true);
    setErrorMsg("");

    const success = await login(pin, selectedPimpinan, selectedRole);
    setSubmitting(false);

    if (success) {
      if (selectedRole === "admin_ranting" || selectedRole === "admin_komisariat") {
        router.push("/dashboard/ranting");
      } else {
        router.push("/dashboard/pac");
      }
    } else {
      setErrorMsg("PIN Administrator salah. Akses ditolak.");
    }
  };

  const activePimpinanList = selectedRole === "admin_ranting" ? LIST_RANTING : LIST_KOMISARIAT;

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md space-y-4">
        {/* Back Link */}
        <div className="flex items-center justify-between px-2">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-brand-purple flex items-center gap-1.5 transition"
          >
            <i className="fas fa-arrow-left text-[10px]"></i> Kembali ke Beranda
          </Link>
          <span className="text-[11px] font-bold text-slate-400">Portal Keamanan</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-150 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-900/5 space-y-6 relative overflow-hidden"
        >
          {/* Overlay watermark */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.03] pointer-events-none">
            <Image src="/assets/images/logo-bersama.png" alt="Logo watermark" fill className="object-contain" />
          </div>

          <div className="text-center space-y-1.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center mx-auto text-lg shadow-md shadow-violet-200">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Admin & Portal Login</h2>
            <p className="text-xs text-slate-500 font-medium">Konsol autentikasi pimpinan IPNU IPPNU se-Kecamatan Tahunan</p>
          </div>

          <div className="space-y-4 relative z-10">
            {/* Role Select */}
            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Peran / Level Otoritas
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  const role = e.target.value as Role;
                  setSelectedRole(role);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-brand-purple transition"
              >
                <option value="admin_ranting">Pimpinan Ranting Desa (17 Ranting)</option>
                <option value="admin_komisariat">Pimpinan Komisariat Sekolah (15 PK)</option>
                <option value="admin_pac">Pengurus Harian PAC Tahunan</option>
                <option value="super_admin">Super Admin / Departemen IT</option>
              </select>
            </div>

            {/* Entity Select (PR/PK specific) */}
            {(selectedRole === "admin_ranting" || selectedRole === "admin_komisariat") && (
              <div className="space-y-1">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {selectedRole === "admin_ranting" ? "Nama Pimpinan Ranting (Desa)" : "Nama Pimpinan Komisariat (Sekolah)"}
                </label>
                <select
                  value={selectedPimpinan}
                  onChange={(e) => setSelectedPimpinan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-brand-purple transition"
                >
                  {activePimpinanList.map((p) => (
                    <option key={p} value={p}>
                      {selectedRole === "admin_ranting" ? `PR IPNU IPPNU ${p}` : `PK IPNU IPPNU ${p}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* PIN Input */}
            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                PIN Keamanan
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 tracking-widest font-mono font-bold focus:outline-none focus:border-brand-purple transition placeholder-slate-300"
                />
              </div>
              {errorMsg && (
                <p className="text-[11px] font-extrabold text-red-500 flex items-center gap-1.5 pt-1">
                  <i className="fas fa-exclamation-circle"></i> {errorMsg}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider transition duration-300 shadow-md shadow-violet-200 flex items-center justify-center gap-2 relative z-10"
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Memverifikasi PIN...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Masuk Ke Dashboard
              </>
            )}
          </button>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-400 leading-normal text-center">
            <span className="font-bold text-slate-500">Bantuan Akses:</span> Hubungi Sekretariat PAC Tahunan jika PIN kepengurusan Anda belum aktif atau lupa PIN.
          </div>
        </form>
      </div>
    </div>
  );
}
