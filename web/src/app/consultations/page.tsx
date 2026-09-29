import { Card } from "@/components/ui";

export default function ConsultationsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Consultations</h1>
      <div className="mt-6">
        <Card>
          <p className="text-zinc-600 dark:text-zinc-400">
            Optional chat consultation, live booking, or proceed without
            consultation. Consultants see your design, measurements, fabric,
            colours and history.
          </p>
        </Card>
      </div>
    </main>
  );
}
