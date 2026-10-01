"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Card, EmptyState, Input } from "@/components/ui";
import {
  deleteApiKey,
  loadApiKeys,
  saveApiKey,
  type ApiKeyEntry,
} from "@/lib/settings";

function mask(key: string) {
  if (key.length <= 8) return "••••••••";
  return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
}

export default function AdminSettingsPage() {
  const [entries, setEntries] = useState<ApiKeyEntry[]>([]);
  const [label, setLabel] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setEntries(loadApiKeys()), 0);
    return () => clearTimeout(t);
  }, []);

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim() || !keyValue.trim()) {
      setError("Give the key a label and paste the key value.");
      return;
    }
    setEntries(
      saveApiKey({
        id: crypto.randomUUID(),
        label: label.trim(),
        key: keyValue.trim(),
        createdAt: new Date().toISOString(),
      })
    );
    setLabel("");
    setKeyValue("");
    setError("");
  }

  function onDelete(id: string) {
    setEntries(deleteApiKey(id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Settings — API keys</h1>
        <Badge tone="warning">MVP stub — browser storage only</Badge>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Store integration keys here (e.g. Supabase anon key, email provider,
        payment provider). Keys are kept in this browser only for now — Phase 2
        moves secrets to secure server-side storage. Never paste a
        service-role/secret key into a shared computer.
      </p>

      <div className="mt-8">
        <Card>
          <h2 className="font-semibold">Add API key</h2>
          <form onSubmit={onAdd} className="mt-4 space-y-4">
            <Input
              label="Label"
              id="api-label"
              placeholder="Supabase anon key"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <Input
              label="Key value"
              id="api-key"
              type="password"
              placeholder="Paste key…"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              error={error}
            />
            <Button type="submit" size="sm">
              Save key
            </Button>
          </form>
        </Card>
      </div>

      <div className="mt-8">
        {entries.length === 0 ? (
          <EmptyState
            title="No API keys saved"
            description="Add your first key above. It stays in this browser until Phase 2 backend storage lands."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Card>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold">{entry.label}</h2>
                    <Badge tone="brand">Saved</Badge>
                  </div>
                  <p className="mt-2 font-mono text-sm">
                    {revealed[entry.id] ? entry.key : mask(entry.key)}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <button
                      onClick={() =>
                        setRevealed((r) => ({
                          ...r,
                          [entry.id]: !r[entry.id],
                        }))
                      }
                      className="font-medium text-brand-700 underline dark:text-brand-300"
                    >
                      {revealed[entry.id] ? "Hide" : "Reveal"}
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
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
      </div>
    </div>
  );
}
