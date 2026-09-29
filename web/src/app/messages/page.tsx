import { Card } from "@/components/ui";

export default function MessagesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Messages</h1>
      <div className="mt-6">
        <Card>
          <p className="text-zinc-600 dark:text-zinc-400">
            Per-project communication with the studio and assigned consultant.
          </p>
        </Card>
      </div>
    </main>
  );
}
