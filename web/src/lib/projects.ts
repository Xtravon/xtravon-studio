export type StartMode = "scratch" | "template" | "inspiration";

export type ProjectStatus = "Draft" | "Design Submitted";

export interface DesignProject {
  id: string;
  name: string;
  startMode: StartMode;
  template: string;
  garmentType: string;
  fabric: string;
  colourName: string;
  colourHex: string;
  sleeve: string;
  neckline: string;
  length: string;
  description: string;
  specialInstructions: string;
  inspirationName: string;
  inspirationDataUrl: string;
  status: ProjectStatus;
  createdAt: string;
}

const KEY = "xtravon-projects";

export function loadProjects(): DesignProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DesignProject[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProject(project: DesignProject): DesignProject[] {
  const projects = [project, ...loadProjects()];
  window.localStorage.setItem(KEY, JSON.stringify(projects));
  return projects;
}

export function deleteProject(id: string): DesignProject[] {
  const projects = loadProjects().filter((p) => p.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(projects));
  return projects;
}
