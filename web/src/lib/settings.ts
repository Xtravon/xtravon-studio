export interface ApiKeyEntry {
  id: string;
  label: string;
  key: string;
  createdAt: string;
}

const KEY = "xtravon-api-keys";

export function loadApiKeys(): ApiKeyEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ApiKeyEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApiKey(entry: ApiKeyEntry): ApiKeyEntry[] {
  const entries = [entry, ...loadApiKeys()];
  window.localStorage.setItem(KEY, JSON.stringify(entries));
  return entries;
}

export function deleteApiKey(id: string): ApiKeyEntry[] {
  const entries = loadApiKeys().filter((e) => e.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(entries));
  return entries;
}
