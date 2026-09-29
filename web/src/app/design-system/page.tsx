"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  FileUpload,
  Input,
  JourneyTrack,
  Modal,
  RadioCard,
  Select,
  Textarea,
} from "@/components/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [choice, setChoice] = useState<"a" | "b">("a");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
        Xtravon Studio · internal
      </p>
      <h1 className="mt-2 text-3xl font-bold">Design system</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Preview of every primitive in <code>components/ui</code>. If it is not
        here, do not invent a new pattern — extend one.
      </p>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button href="/" size="sm">
            Link button
          </Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Draft</Badge>
          <Badge tone="brand">Design Approved</Badge>
          <Badge tone="gold">Ready</Badge>
          <Badge tone="success">Delivered</Badge>
          <Badge tone="warning">Awaiting Fitting</Badge>
          <Badge tone="danger">Cancelled</Badge>
        </div>
      </Section>

      <Section title="Cards">
        <Card>
          <h3 className="font-semibold">Wedding Outfit — Oba</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Agbada · Ankara · Royal Blue
          </p>
        </Card>
      </Section>

      <Section title="Form fields">
        <Input label="Design name" id="ds-name" placeholder="Wedding Outfit — Oba" />
        <Input label="With error" id="ds-err" error="Give your design a name." />
        <Select label="Fabric" id="ds-fabric" options={["Ankara", "Cotton", "Silk"]} />
        <Textarea label="Description" id="ds-desc" rows={3} />
        <div className="grid gap-3 sm:grid-cols-2">
          <RadioCard name="ds-mode" value="a" checked={choice === "a"} label="Start from scratch" onChange={setChoice} />
          <RadioCard name="ds-mode" value="b" checked={choice === "b"} label="Use a template" onChange={setChoice} />
        </div>
        <FileUpload label="Inspiration image" onFile={() => {}} />
      </Section>

      <Section title="Journey track">
        <JourneyTrack
          steps={["Design", "Consultation", "Production", "Fitting", "Delivery"]}
          current={2}
        />
      </Section>

      <Section title="Modal">
        <Button variant="secondary" onClick={() => setModalOpen(true)}>
          Open modal
        </Button>
        {modalOpen && (
          <Modal title="Example modal" onClose={() => setModalOpen(false)}>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Used for confirmations such as APPROVE & START PRODUCTION.
            </p>
            <div className="mt-4 flex gap-3">
              <Button size="sm" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </Section>

      <Section title="Empty state">
        <EmptyState
          title="No designs yet"
          description="Create your first design to start the journey."
          actionHref="/design-studio"
          actionLabel="Create New Design"
        />
      </Section>
    </main>
  );
}
