import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xtravon Studio — Create It. Consult. Watch It Come to Life.",
  description:
    "Digital fashion studio: design, consult, approve, track production, fit and receive your custom garment.",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/design-studio", label: "Design Studio" },
  { href: "/projects", label: "My Projects" },
  { href: "/consultations", label: "Consultations" },
  { href: "/measurements", label: "Measurements" },
  { href: "/orders", label: "Orders" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              XTRAVON STUDIO
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-500">
            Imagine it. Design it. Consult. Create. Track it. Wear it.
          </div>
        </footer>
      </body>
    </html>
  );
}
