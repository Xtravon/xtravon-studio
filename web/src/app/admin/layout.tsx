import Link from "next/link";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/admin", label: "Customers" },
  { href: "/admin", label: "Designs" },
  { href: "/consultations", label: "Consultations" },
  { href: "/admin", label: "Production" },
  { href: "/admin", label: "Fittings" },
  { href: "/admin", label: "Payments" },
  { href: "/admin", label: "Delivery" },
  { href: "/admin", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
      <aside className="hidden w-52 shrink-0 md:block">
        <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
          Admin
        </p>
        <nav className="mt-4 flex flex-col gap-1 text-sm font-medium">
          {adminNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
