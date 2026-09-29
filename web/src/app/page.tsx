import { Button, Card, JourneyTrack } from "@/components/ui";

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
        <Button href="/design-studio">Create Your Design</Button>
        <Button href="/design-studio" variant="secondary">
          Explore Designs
        </Button>
        <Button href="/consultations" variant="secondary">
          Book a Consultation
        </Button>
        <Button href="/orders" variant="secondary">
          Track My Order
        </Button>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Your project journey</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Imagine → Create → Discuss → Approve → Watch → Fit → Receive
        </p>
        <div className="mt-6">
          <JourneyTrack steps={journey} current={0} />
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        <Card>
          <h3 className="font-semibold">Customer creativity</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Start from scratch, a template, or an inspiration image. No fashion
            expertise needed.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold">Professional expertise</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Chat or live consultation, design review, and explicit approval
            before production.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold">Production transparency</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Visual tracking, progress photos, controlled change requests, and
            structured fitting.
          </p>
        </Card>
      </section>
    </main>
  );
}
