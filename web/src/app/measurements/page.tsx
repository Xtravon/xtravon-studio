import { Card } from "@/components/ui";

export default function MeasurementsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Measurements</h1>
      <div className="mt-6">
        <Card>
          <p className="text-zinc-600 dark:text-zinc-400">
            Enter guided measurements or use professionally verified
            measurements. Save multiple profiles, e.g. My Measurements, Spouse,
            Child 1.
          </p>
        </Card>
      </div>
    </main>
  );
}
