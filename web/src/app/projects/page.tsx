"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import {
  deleteProject,
  loadProjects,
  type DesignProject,
} from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<DesignProject[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setProjects(loadProjects()), 0);
    return () => clearTimeout(t);
  }, []);

  function onDelete(id: string) {
    setProjects(deleteProject(id));
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button href="/design-studio">Create New Design</Button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No designs yet"
            description="Create your first design to start the journey: Design → Measurements → Consultation → Approval → Production."
            actionHref="/design-studio"
            actionLabel="Create New Design"
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Card>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold">{p.name}</h2>
                  <Badge tone="brand">{p.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {p.garmentType} · {p.fabric} · {p.colourName}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {p.sleeve} sleeves · {p.neckline} · {p.length}
                </p>
                {p.description && (
                  <p className="mt-2 text-sm">{p.description}</p>
                )}
                <div className="mt-4 flex gap-4 text-sm">
                  <Link
                    href="/measurements"
                    className="font-medium text-brand-700 underline dark:text-brand-300"
                  >
                    Add measurements
                  </Link>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="font-medium text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
