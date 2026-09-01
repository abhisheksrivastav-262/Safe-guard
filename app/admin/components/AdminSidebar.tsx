"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Hero Slides", href: "/admin/hero", icon: "🖼️" },
  { name: "Homepage", href: "/admin/homepage", icon: "🏠" },
  { name: "Services", href: "/admin/services", icon: "🛡️" },
  { name: "Industries", href: "/admin/industries", icon: "🏢" },
  { name: "About Content", href: "/admin/about", icon: "ℹ️" },
  { name: "Media Library", href: "/admin/media", icon: "📁" },
  { name: "Enquiries", href: "/admin/enquiries", icon: "📩" },
  { name: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
  { name: "FAQs", href: "/admin/faqs", icon: "❓" },
  { name: "Navigation", href: "/admin/navigation", icon: "🧭" },
  { name: "SEO", href: "/admin/seo", icon: "🔍" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return null;

  return (
    <div className="w-64 bg-[#0A1931] min-h-screen text-white flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-[#C5A253] font-black text-xl tracking-wide uppercase">
          SAFE Guard FORCE
        </h1>
        <p className="text-white/60 text-xs mt-1 font-medium tracking-widest">
          CMS Control
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition ${
                  isActive
                    ? "bg-[#C5A253] text-[#0A1931]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full border border-white/20 hover:bg-white/10 text-white/80 py-2.5 rounded text-xs tracking-wider uppercase transition font-bold"
        >
          <span>👁️</span> Preview Website
        </Link>
      </div>
    </div>
  );
}
