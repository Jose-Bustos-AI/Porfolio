import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---- Video helpers ----
export function isYouTubeUrl(urlString: string | undefined | null): boolean {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();
    return (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be"
    );
  } catch {
    return false;
  }
}

export function toYouTubeEmbedUrl(urlString: string): string {
  try {
    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();

    // Already an embed URL
    if ((host.includes("youtube.com") && url.pathname.startsWith("/embed/"))) {
      return url.toString();
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (host.includes("youtube.com")) {
      // shorts support: /shorts/VIDEO_ID
      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/")[2];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // https://youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      const id = url.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore
  }
  return urlString;
}

export function isLikelyDirectVideo(urlString: string | undefined | null): boolean {
  if (!urlString) return false;
  const lower = urlString.toLowerCase();
  return [".mp4", ".webm", ".ogg", ".ogv", ".mov", ".m4v"].some(ext => lower.includes(ext));
}