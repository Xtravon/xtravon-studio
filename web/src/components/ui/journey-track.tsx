export function JourneyTrack({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={step}
            className={`rounded-xl border p-4 ${
              active
                ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            }`}
          >
            <span className="text-sm font-bold text-zinc-400">
              {done ? "✓ " : ""}
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-1 font-medium">{step}</p>
          </li>
        );
      })}
    </ol>
  );
}
