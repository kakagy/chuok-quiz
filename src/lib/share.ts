export interface ShareData {
  category: string;
  score: number;
  total: number;
  date: string;
}

export function encodeResult(data: ShareData): string {
  const json = JSON.stringify(data);
  const base64 = btoa(
    Array.from(new TextEncoder().encode(json), (b) => String.fromCharCode(b)).join("")
  );
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeResult(encoded: string): ShareData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    let json: string;
    if (typeof window !== "undefined") {
      json = atob(base64);
    } else {
      json = Buffer.from(base64, "base64").toString();
    }
    const data = JSON.parse(json);
    if (
      typeof data.category !== "string" ||
      typeof data.score !== "number" ||
      typeof data.total !== "number" ||
      typeof data.date !== "string" ||
      data.score < 0 || data.score > 100 ||
      data.total < 1 || data.total > 100
    ) {
      return null;
    }
    return data as ShareData;
  } catch {
    return null;
  }
}
