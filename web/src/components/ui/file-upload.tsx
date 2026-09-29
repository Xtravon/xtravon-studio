"use client";

import { useState } from "react";

export interface UploadedFile {
  name: string;
  dataUrl: string;
}

export function FileUpload({
  label,
  maxSize = 1_500_000,
  onFile,
}: {
  label: string;
  maxSize?: number;
  onFile: (file: UploadedFile) => void;
}) {
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");

  function handle(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    if (file.size > maxSize) {
      setPreview("");
      onFile({ name: file.name, dataUrl: "" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      setPreview(dataUrl);
      onFile({ name: file.name, dataUrl });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        className="mt-2 text-sm"
        onChange={(e) => handle(e.target.files?.[0])}
      />
      {fileName && (
        <p className="mt-2 text-sm text-zinc-500">
          {fileName}
          {preview
            ? ""
            : ` (preview not stored — file over ${Math.round(maxSize / 1_000_000)}MB)`}
        </p>
      )}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Upload preview"
          className="mt-3 max-h-48 rounded-lg border"
        />
      )}
    </div>
  );
}
