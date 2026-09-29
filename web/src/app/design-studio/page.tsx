"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FileUpload,
  Input,
  RadioCard,
  Select,
  Textarea,
} from "@/components/ui";
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
        <Input
          label="Design name"
          id="name"
          placeholder="Wedding Outfit — Oba"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        />

        <fieldset>
          <legend className="block text-sm font-medium">
            How do you want to start?
          </legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["scratch", "Start from scratch"],
                ["template", "Use a template"],
                ["inspiration", "Upload inspiration"],
              ] as [StartMode, string][]
            ).map(([mode, label]) => (
              <RadioCard
                key={mode}
                name="start-mode"
                value={mode}
                checked={startMode === mode}
                label={label}
                onChange={setStartMode}
              />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Template"
            id="template"
            options={templates}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <Select
            label="Garment type"
            id="garment"
            options={garmentTypes}
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
          />
        </div>

        <FileUpload
          label="Inspiration image (optional)"
          onFile={({ name, dataUrl }) => {
            setInspirationName(name);
            setInspirationDataUrl(dataUrl);
          }}
        />

        <Textarea
          label="Describe what you want"
          id="description"
          rows={4}
          placeholder="Navy blue agbada with gold embroidery for a wedding..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Fabric"
            id="fabric"
            options={fabrics}
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
          />
          <div>
            <Input
              label="Colour"
              id="colourName"
              value={colourName}
              onChange={(e) => setColourName(e.target.value)}
            />
            <input
              type="color"
              aria-label="Colour picker"
              className="mt-2 h-10 w-12 rounded border"
              value={colourHex}
              onChange={(e) => setColourHex(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Select
            label="Sleeves"
            id="sleeve"
            options={sleeves}
            value={sleeve}
            onChange={(e) => setSleeve(e.target.value)}
          />
          <Select
            label="Neckline"
            id="neckline"
            options={necklines}
            value={neckline}
            onChange={(e) => setNeckline(e.target.value)}
          />
          <Select
            label="Length"
            id="length"
            options={lengths}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <Textarea
          label="Special instructions"
          id="special"
          rows={3}
          placeholder="Extra pockets, longer sleeves, matching cap..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <Button type="submit">Save Design</Button>
          <Button href="/projects" variant="secondary">
            View My Projects
          </Button>
        </div>
      </form>
    </main>
  );
}
