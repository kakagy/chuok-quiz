import { describe, it, expect } from "vitest";
import { encodeResult, decodeResult } from "../share";

describe("encodeResult / decodeResult", () => {
  it("round-trips a quiz result", () => {
    const data = { category: "games", score: 80, total: 10, date: "2026-02-23" };
    const encoded = encodeResult(data);
    const decoded = decodeResult(encoded);
    expect(decoded).toEqual(data);
  });
  it("produces URL-safe string", () => {
    const data = { category: "kpop", score: 100, total: 10, date: "2026-02-23" };
    const encoded = encodeResult(data);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
