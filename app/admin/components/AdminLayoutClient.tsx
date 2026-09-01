"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 min-h-screen lg:ml-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
