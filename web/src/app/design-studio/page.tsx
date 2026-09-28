import Link from "next/link";

export default function DesignStudioPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold">Design Studio</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Start from scratch, a template, or an inspiration image. Customise
        colour, fabric, style, sleeves, neckline, length, and special
        instructions.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/measurements"
          className="rounded-full bg-zinc-950 px-6 py-3 font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
        >
          Continue to Measurements
        </Link>
        <Link
          href="/consultations"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium dark:border-zinc-700"
        >
          Get Design Help
        </Link>
      </div>
    </main>
  );
}
