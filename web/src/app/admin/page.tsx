import { Badge, Card, EmptyState } from "@/components/ui";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        <Badge tone="warning">MVP stub — no backend yet</Badge>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <h2 className="font-semibold">Orders</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            New, approved, in production, completed, cancelled.
          </p>
        </Card>
        <Card>
          <h2 className="font-semibold">Production</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Stages, assignments, updates, fittings, quality checks.
          </p>
        </Card>
        <Card>
          <h2 className="font-semibold">Feature flags</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Design assistance, chat, live consults, remote fitting, photos,
            change requests, delivery, registrations.
          </p>
        </Card>
      </div>
      <div className="mt-8">
        <EmptyState
          title="Connect Supabase to go live"
          description="Boards, customer records, quotations and reports land in Phase 6. The schema is specified in docs/IMPLEMENTATION_PLAN.md Phase 2."
        />
      </div>
    </div>
  );
}
