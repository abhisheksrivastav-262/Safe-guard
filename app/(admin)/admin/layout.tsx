import AdminLayoutClient from "./components/AdminLayoutClient";
import { type ReactNode } from "react";
import "../../globals.css";

export const metadata = {
  title: "Admin Dashboard | SAFE Guard FORCE CMS",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
