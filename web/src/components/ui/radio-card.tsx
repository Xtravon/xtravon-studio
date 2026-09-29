"use client";

export function RadioCard<T extends string>({
  name,
  value,
  checked,
  label,
  onChange,
}: {
  name: string;
  value: T;
  checked: boolean;
  label: string;
  onChange: (value: T) => void;
}) {
  return (
    <label
      className={`cursor-pointer rounded-xl border p-4 text-sm font-medium ${
        checked
          ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950"
          : "border-zinc-300 dark:border-zinc-700"
      }`}
    >
      <input
        type="radio"
        name={name}
        className="mr-2 accent-[#7f2041]"
        checked={checked}
        onChange={() => onChange(value)}
      />
      {label}
    </label>
  );
}
