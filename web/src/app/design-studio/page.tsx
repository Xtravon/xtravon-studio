"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveProject, type StartMode } from "@/lib/projects";

const templates = [
  "None",
  "Agbada",
  "Kaftan",
  "Senator",
  "Suit",
  "Evening Gown",
  "Ankara Set",
  "Corporate Uniform",
  "School Uniform",
];

const garmentTypes = [
  "Agbada",
  "Kaftan",
  "Suit",
  "Gown",
  "Shirt",
  "Trousers",
  "Uniform",
  "Other",
];

const fabrics = [
  "Cotton",
  "Ankara",
  "Linen",
  "Silk",
  "Wool",
  "Denim",
  "Aso-Oke",
  "Other",
];

const sleeves = ["Short", "Long", "Three-quarter", "Sleeveless"];
const necklines = ["Round", "V-neck", "Collar", "Mandarin", "Boat", "Off-shoulder"];
const lengths = ["Short", "Regular", "Long", "Extra-long"];

const inputCls =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950";
const labelCls = "block text-sm font-medium";

export default function DesignStudioPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [startMode, setStartMode] = useState<StartMode>("scratch");
  const [template, setTemplate] = useState("None");
  const [garmentType, setGarmentType] = useState("Agbada");
  const [fabric, setFabric] = useState("Ankara");
  const [colourName, setColourName] = useState("Royal Blue");
  const [colourHex, setColourHex] = useState("#1d4ed8");
  const [sleeve, setSleeve] = useState("Long");
  const [neckline, setNeckline] = useState("Round");
  const [length, setLength] = useState("Regular");
  const [description, setDescription] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [inspirationName, setInspirationName] = useState("");
  const [inspirationDataUrl, setInspirationDataUrl] = useState("");
  const [error, setError] = useState("");

  function onFile(file: File | undefined) {
    if (!file) return;
    setInspirationName(file.name);
    if (file.size > 1_500_000) {
      setInspirationDataUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setInspirationDataUrl(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Give your design a name, e.g. Wedding Outfit — Oba.");
      return;
    }
    saveProject({
      id: crypto.randomUUID(),
      name: name.trim(),
      startMode,
      template,
      garmentType,
      fabric,
      colourName: colourName.trim() || "Custom",
      colourHex,
      sleeve,
      neckline,
      length,
      description: description.trim(),
      specialInstructions: specialInstructions.trim(),
      inspirationName,
      inspirationDataUrl,
      status: "Draft",
      createdAt: new Date().toISOString(),
    });
    router.push("/projects");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Design Studio</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Describe what you want in simple words. Add a template or inspiration
        image if you have one.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className={labelCls} htmlFor="name">
            Design name
          </label>
          <input
            id="name"
            className={inputCls}
            placeholder="Wedding Outfit — Oba"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <fieldset>
          <legend className={labelCls}>How do you want to start?</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["scratch", "Start from scratch"],
                ["template", "Use a template"],
                ["inspiration", "Upload inspiration"],
              ] as [StartMode, string][]
            ).map(([mode, label]) => (
              <label
                key={mode}
                className={`cursor-pointer rounded-xl border p-4 text-sm font-medium ${
                  startMode === mode
                    ? "border-zinc-950 bg-zinc-100 dark:border-zinc-50 dark:bg-zinc-900"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  className="mr-2"
                  checked={startMode === mode}
                  onChange={() => setStartMode(mode)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="template">
              Template
            </label>
            <select
              id="template"
              className={inputCls}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              {templates.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="garment">
              Garment type
            </label>
            <select
              id="garment"
              className={inputCls}
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
            >
              {garmentTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="inspiration">
            Inspiration image (optional)
          </label>
          <input
            id="inspiration"
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          {inspirationName && (
            <p className="mt-2 text-sm text-zinc-500">
              {inspirationName}
              {inspirationDataUrl ? "" : " (preview not stored — file over 1.5MB)"}
            </p>
          )}
          {inspirationDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={inspirationDataUrl}
              alt="Inspiration preview"
              className="mt-3 max-h-48 rounded-lg border"
            />
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="description">
            Describe what you want
          </label>
          <textarea
            id="description"
            rows={4}
            className={inputCls}
            placeholder="Navy blue agbada with gold embroidery for a wedding..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="fabric">
              Fabric
            </label>
            <select
              id="fabric"
              className={inputCls}
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
            >
              {fabrics.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="colourName">
              Colour
            </label>
            <div className="flex gap-2">
              <input
                id="colourName"
                className={inputCls}
                value={colourName}
                onChange={(e) => setColourName(e.target.value)}
              />
              <input
                type="color"
                aria-label="Colour picker"
                className="h-10 w-12 rounded border"
                value={colourHex}
                onChange={(e) => setColourHex(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls} htmlFor="sleeve">
              Sleeves
            </label>
            <select
              id="sleeve"
              className={inputCls}
              value={sleeve}
              onChange={(e) => setSleeve(e.target.value)}
            >
              {sleeves.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="neckline">
              Neckline
            </label>
            <select
              id="neckline"
              className={inputCls}
              value={neckline}
              onChange={(e) => setNeckline(e.target.value)}
            >
              {necklines.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="length">
              Length
            </label>
            <select
              id="length"
              className={inputCls}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              {lengths.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="special">
            Special instructions
          </label>
          <textarea
            id="special"
            rows={3}
            className={inputCls}
            placeholder="Extra pockets, longer sleeves, matching cap..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="rounded-full bg-zinc-950 px-6 py-3 font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
          >
            Save Design
          </button>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium dark:border-zinc-700"
          >
            View My Projects
          </Link>
        </div>
      </form>
    </main>
  );
}
