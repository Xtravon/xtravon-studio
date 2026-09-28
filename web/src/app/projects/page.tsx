"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        <Link
          href="/design-studio"
          className="rounded-full bg-zinc-950 px-6 py-3 font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
        >
          Create New Design
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 text-zinc-600 dark:text-zinc-400">
          No designs yet. Create your first design to start the journey:
          Design → Measurements → Consultation → Approval → Production.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{p.name}</h2>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-900">
                  {p.status}
                </span>
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
              <div className="mt-4 flex gap-3 text-sm">
                <Link
                  href="/measurements"
                  className="font-medium underline"
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
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
