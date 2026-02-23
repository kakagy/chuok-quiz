import { describe, it, expect } from "vitest";
import { encodeResult, decodeResult } from "../share";

describe("encodeResult / decodeResult", () => {
  it("round-trips a quiz result", () => {
    const data = { category: "games", score: 80, total: 10, date: "2026-02-23" };
    const encoded = encodeResult(data);
    const decoded = decodeResult(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded).toEqual(data);
  });
  it("produces URL-safe string", () => {
    const data = { category: "kpop", score: 100, total: 10, date: "2026-02-23" };
    const encoded = encodeResult(data);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });
  it("returns null for malformed input", () => {
    expect(decodeResult("not-valid-base64!!!")).toBeNull();
  });
  it("returns null for invalid data shape", () => {
    const bad = Buffer.from(JSON.stringify({ foo: "bar" })).toString("base64");
    expect(decodeResult(bad)).toBeNull();
  });
  it("returns null for out-of-range score", () => {
    const bad = Buffer.from(JSON.stringify({ category: "games", score: 200, total: 10, date: "2026-02-23" })).toString("base64");
    expect(decodeResult(bad)).toBeNull();
  });
});
