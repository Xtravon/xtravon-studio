import { Card } from "@/components/ui";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="mt-6">
        <Card>
          <p className="text-zinc-600 dark:text-zinc-400">
            Account, design library, saved fabrics and colours, repeat orders.
          </p>
        </Card>
      </div>
    </main>
  );
}
