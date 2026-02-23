import { describe, it, expect } from "vitest";
import { getDailyQuestions, hashDate } from "../daily";

describe("hashDate", () => {
  it("returns same hash for same date", () => {
    expect(hashDate("2026-02-23")).toBe(hashDate("2026-02-23"));
  });
  it("returns different hash for different dates", () => {
    expect(hashDate("2026-02-23")).not.toBe(hashDate("2026-02-24"));
  });
});

describe("getDailyQuestions", () => {
  it("returns 10 questions", () => {
    expect(getDailyQuestions("2026-02-23")).toHaveLength(10);
  });
  it("returns same questions for same date", () => {
    const a = getDailyQuestions("2026-02-23");
    const b = getDailyQuestions("2026-02-23");
    expect(a.map(q => q.id)).toEqual(b.map(q => q.id));
  });
  it("returns different questions for different dates", () => {
    const a = getDailyQuestions("2026-02-23");
    const b = getDailyQuestions("2026-02-24");
    expect(a.map(q => q.id)).not.toEqual(b.map(q => q.id));
  });
});
