import { Card } from "@/components/ui";

export default function OrdersPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Orders</h1>
      <div className="mt-6">
        <Card>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track: Design Submitted → Consultation → Measurements → Fabric →
            Approved → Production → Fitting → Quality Check → Ready →
            Delivered. Includes updates, photos, change requests and quotations.
          </p>
        </Card>
      </div>
    </main>
  );
}
