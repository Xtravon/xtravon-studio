import type { ReactNode } from "react";

const tones: Record<string, string> = {
  neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  brand: "bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-200",
  gold: "bg-gold-300/30 text-gold-600 dark:text-gold-400",
  success: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
