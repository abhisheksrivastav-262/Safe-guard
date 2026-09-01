import AdminLayoutClient from "./components/AdminLayoutClient";
import { type ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard | SAFE Guard FORCE CMS",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
