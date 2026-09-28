import Link from "next/link";

const journey = [
  "Create a design",
  "Select inspiration or template",
  "Customise design",
  "Add fabric and colour",
  "Add measurements",
  "Request consultation",
  "Approve final design",
  "Track production",
  "Fitting",
  "Quality check",
  "Collection / Delivery",
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
        Digital fashion studio
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        Create It. Consult. Watch It Come to Life.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        Move from an idea or inspiration to a completed, personally fitted
        garment — with professional guidance and full production transparency.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/design-studio"
          className="rounded-full bg-zinc-950 px-6 py-3 font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Create Your Design
        </Link>
        <Link
          href="/design-studio"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Explore Designs
        </Link>
        <Link
          href="/consultations"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Book a Consultation
        </Link>
        <Link
          href="/orders"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Track My Order
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Your project journey</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Imagine → Create → Discuss → Approve → Watch → Fit → Receive
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((step, i) => (
            <li
              key={step}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="text-sm font-bold text-zinc-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="font-semibold">Customer creativity</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Start from scratch, a template, or an inspiration image. No fashion
            expertise needed.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="font-semibold">Professional expertise</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Chat or live consultation, design review, and explicit approval
            before production.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="font-semibold">Production transparency</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Visual tracking, progress photos, controlled change requests, and
            structured fitting.
          </p>
        </div>
      </section>
    </main>
  );
}
