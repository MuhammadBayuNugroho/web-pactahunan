"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getSpData,
  SpItem,
  MakestaItem,
  BeritaItem,
  KomentarItem,
  RepoItem,
  SettingsObj,
  mockSpData,
  mockMakestaData,
  mockBeritaData,
  mockRepoData,
} from "@/lib/api/client";

export type Role = "guest" | "anggota" | "admin_komisariat" | "admin_ranting" | "admin_pac" | "super_admin";

export interface User {
  name: string;
  role: Role;
  pimpinan?: string; // e.g. "Mantingan", "SMK NU Tahunan", or "PAC"
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "danger";
  timestamp: Date;
  read: boolean;
}

export interface AppData {
  ipnu: SpItem[];
  ippnu: SpItem[];
  makesta: MakestaItem[];
  berita: BeritaItem[];
  komentar: KomentarItem[];
  settings: SettingsObj;
  repository: RepoItem[];
}

const DEFAULT_APP_DATA: AppData = {
  ipnu: mockSpData.ipnu,
  ippnu: mockSpData.ippnu,
  makesta: mockMakestaData,
  berita: mockBeritaData,
  komentar: [],
  settings: {},
  repository: mockRepoData,
};

interface AppContextType {
  user: User | null;
  appsScriptUrl: string;
  setAppsScriptUrl: (url: string) => void;
  login: (pin: string, pimpinan: string, role: Role) => Promise<boolean>;
  logout: () => void;
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type: AppNotification["type"]) => void;
  markAllNotificationsAsRead: () => void;
  stats: {
    totalKader: number;
    totalRanting: number;
    totalKomisariat: number;
    totalMakesta: number;
    kaderIpnu: number;
    kaderIppnu: number;
  };
  setStats: React.Dispatch<React.SetStateAction<AppContextType["stats"]>>;
  toast: { title: string; message: string; show: boolean; type: "success" | "error" | "info" } | null;
  showToast: (title: string, message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
  // Global data cache — fetched once on app mount
  appData: AppData;
  dataLoading: boolean;
  dataLoaded: boolean;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appsScriptUrl, setAppsScriptUrlState] = useState<string>("");
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [toast, setToast] = useState<AppContextType["toast"]>(null);
  const [stats, setStats] = useState<AppContextType["stats"]>({
    totalKader: 1250,
    totalRanting: 17,
    totalKomisariat: 15,
    totalMakesta: 4,
    kaderIpnu: 580,
    kaderIppnu: 670,
  });

  // Global data cache
  const [appData, setAppData] = useState<AppData>(DEFAULT_APP_DATA);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load from localStorage on client side mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("appsScriptUrl");
    if (savedUrl) setAppsScriptUrlState(savedUrl);
    else {
      const defaultUrl = "https://script.google.com/macros/s/AKfycbwkcijUZyu64TO2Z_aIf3qxr3bnrlj3YNFS2kOHm1yNmU2c6_aTzLhrySrSTwM_3clH/exec";
      setAppsScriptUrlState(defaultUrl);
      localStorage.setItem("appsScriptUrl", defaultUrl);
    }

    const savedUser = localStorage.getItem("session_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch global data once on mount — shared across all pages
  useEffect(() => {
    if (!dataLoaded) {
      fetchGlobalData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGlobalData = async () => {
    setDataLoading(true);
    try {
      const data = await getSpData();
      setAppData(data);

      // Compute stats from fetched data
      let totalPeserta = 0;
      data.makesta.forEach((m) => {
        totalPeserta += m.peserta || 0;
      });

      setStats({
        totalKader: totalPeserta > 0 ? totalPeserta : 1250,
        totalRanting: 17,
        totalKomisariat: 15,
        totalMakesta: data.makesta.length || 4,
        kaderIpnu: Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
        kaderIppnu: (totalPeserta > 0 ? totalPeserta : 1250) - Math.round((totalPeserta > 0 ? totalPeserta : 1250) * 0.46),
      });
    } catch (err) {
      console.warn("Gagal memuat data global. Menggunakan data lokal.", err);
    } finally {
      setDataLoading(false);
      setDataLoaded(true);
    }
  };

  // Public method to force refresh (e.g. after admin action)
  const refreshData = async () => {
    setDataLoaded(false);
    await fetchGlobalData();
    setDataLoaded(true);
  };

  const setAppsScriptUrl = (url: string) => {
    setAppsScriptUrlState(url);
    localStorage.setItem("appsScriptUrl", url);
  };

  const login = async (pin: string, pimpinan: string, role: Role): Promise<boolean> => {
    let isValid = false;

    // Primary: Verify PIN via Google Apps Script endpoint
    try {
      const url = localStorage.getItem("appsScriptUrl") ||
        "https://script.google.com/macros/s/AKfycbwkcijUZyu64TO2Z_aIf3qxr3bnrlj3YNFS2kOHm1yNmU2c6_aTzLhrySrSTwM_3clH/exec";
      const res = await fetch(`${url}?action=verifyPin&pin=${encodeURIComponent(pin)}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        isValid = data.valid === true;
      }
    } catch {
      // Fallback: local PIN check when API is unreachable (offline / CORS error)
      const localPins = ["admin1234", "pac123", "ranting123"];
      isValid = localPins.includes(pin);
    }

    if (isValid) {
      const newUser: User = {
        name: role === "super_admin" || role === "admin_pac" ? "Pimpinan Harian PAC" : `Admin PR/PK ${pimpinan}`,
        role: role,
        pimpinan: pimpinan,
      };
      setUser(newUser);
      localStorage.setItem("session_user", JSON.stringify(newUser));
      showToast("Login Berhasil", `Selamat datang di dashboard, ${newUser.name}`, "success");
      return true;
    }

    showToast("Login Gagal", "PIN yang Anda masukkan salah.", "error");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session_user");
    showToast("Keluar Akun", "Anda telah keluar dari panel administrator.", "info");
  };

  const addNotification = (title: string, message: string, type: AppNotification["type"]) => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const showToast = (title: string, message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ title, message, show: true, type });
    setTimeout(() => {
      hideToast();
    }, 4000);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        appsScriptUrl,
        setAppsScriptUrl,
        login,
        logout,
        notifications,
        addNotification,
        markAllNotificationsAsRead,
        stats,
        setStats,
        toast,
        showToast,
        hideToast,
        appData,
        dataLoading,
        dataLoaded,
        refreshData,
      }}
    >
      {children}
      {toast && toast.show && (
        <div className="fixed bottom-5 right-5 z-50 transform transition-all duration-300 ease-in-out bg-white text-slate-900 px-5 py-4 rounded-2xl shadow-xl border border-violet-100 flex items-center gap-3 max-w-sm">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            toast.type === "success" ? "bg-emerald-50 text-emerald-600" :
            toast.type === "error" ? "bg-red-50 text-red-650" : "bg-blue-50 text-blue-600"
          }`}>
            <i className={`fas ${
              toast.type === "success" ? "fa-check-circle" :
              toast.type === "error" ? "fa-exclamation-circle" : "fa-info-circle"
            } text-lg`}></i>
          </div>
          <div>
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">{toast.title}</h5>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
