import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { type ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard | SAFE Guard FORCE CMS",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="lg:ml-64 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
