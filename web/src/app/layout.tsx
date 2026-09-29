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
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              XTRAVON <span className="text-brand-600 dark:text-brand-400">STUDIO</span>
            </Link>
            <nav className="hidden flex-wrap gap-x-4 gap-y-2 text-sm font-medium lg:flex">
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
            <details className="relative lg:hidden">
              <summary className="cursor-pointer rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700">
                Menu
              </summary>
              <nav className="absolute right-0 z-50 mt-2 flex w-52 flex-col rounded-xl border border-zinc-200 bg-white p-2 text-sm font-medium shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
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
