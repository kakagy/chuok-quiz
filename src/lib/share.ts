export interface ShareData {
  category: string;
  score: number;
  total: number;
  date: string;
}

export function encodeResult(data: ShareData): string {
  const json = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeResult(encoded: string): ShareData {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json);
}
