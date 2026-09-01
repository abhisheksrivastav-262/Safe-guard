"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "../actions/auth";

export default function AdminHeader({
  setSidebarOpen,
}: {
  setSidebarOpen?: (val: boolean) => void;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  // ...

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    const segment = pathname.split("/")[2];
    if (!segment) return "Dashboard";
    
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-[#0A1931]">{getPageTitle()}</h2>
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
