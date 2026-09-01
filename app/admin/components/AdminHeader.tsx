"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "../actions/auth";

export default function AdminHeader() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  // Derive title from pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    const segment = pathname.split("/")[2];
    if (!segment) return "Dashboard";
    
    // Convert e.g., 'hero' to 'Hero'
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:ml-64 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[#0A1931]">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-slate-600 hidden sm:block">
          Admin User
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
