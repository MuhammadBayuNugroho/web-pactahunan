"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp, Role } from "@/lib/context/AppContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useApp();
  const [pin, setPin] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("admin_ranting");
  const [selectedPimpinan, setSelectedPimpinan] = useState("Mantingan");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const listPimpinan = [
    "Mantingan",
    "Senenan",
    "Tahunan",
    "Tegalsambi",
    "Demangan",
    "Ngabul",
    "Langon",
    "Sukodono",
    "Kecapi",
    "Petekeyan",
    "MA Hasyim Asy'ari",
    "SMK NU Tahunan"
  ];

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

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-150 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100 space-y-6 relative overflow-hidden"
        >
          {/* Overlay watermark */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 opacity-[0.03] pointer-events-none">
            <Image src="/assets/images/logo-bersama.png" alt="Logo watermark" fill className="object-contain" />
          </div>

          <div className="text-center space-y-2 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center mx-auto text-xl shadow-md shadow-violet-100">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Admin & Portal Login</h2>
            <p className="text-xs text-slate-400">Pilih peran kepengurusan dan masukkan PIN keamanan.</p>
          </div>

          <div className="space-y-4 relative z-10">
            {/* Role Select */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Peran / Level Otoritas</label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  const role = e.target.value as Role;
                  setSelectedRole(role);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
              >
                <option value="admin_ranting">Admin Ranting (Desa)</option>
                <option value="admin_komisariat">Admin Komisariat (Sekolah)</option>
                <option value="admin_pac">Admin PAC Harian</option>
                <option value="super_admin">Super Admin (IT)</option>
              </select>
            </div>

            {/* Entity Select (PR/PK specific) */}
            {(selectedRole === "admin_ranting" || selectedRole === "admin_komisariat") && (
              <div className="space-y-1">
                <label className="block text-[9px] font-extrabold text-slate-400 uppercase">Nama Pimpinan PR/PK</label>
                <select
                  value={selectedPimpinan}
                  onChange={(e) => setSelectedPimpinan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-purple transition"
                >
                  {listPimpinan.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* PIN Input */}
            <div className="space-y-1">
              <label className="block text-[9px] font-extrabold text-slate-400 uppercase">PIN Keamanan</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-5 text-sm text-slate-900 tracking-widest font-bold focus:outline-none focus:border-brand-purple transition placeholder-slate-300"
                />
              </div>
              {errorMsg && (
                <p className="text-[10px] font-extrabold text-red-500 flex items-center gap-1.5 pt-1">
                  <i className="fas fa-exclamation-circle"></i> {errorMsg}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-sm uppercase tracking-widest transition duration-300 shadow-md shadow-violet-100 flex items-center justify-center gap-2 relative z-10"
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

          <p className="text-center text-[9px] text-slate-400 leading-normal">
            PIN didistribusikan secara internal oleh PAC. Hubungi Sekretariat PAC Tahunan jika PIN ranting Anda hilang/belum diaktifkan.
          </p>
        </form>
      </div>
    </div>
  );
}
