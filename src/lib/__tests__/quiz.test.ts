import { describe, it, expect } from "vitest";
import { shuffleChoices, calculateScore, getQuizPack, getAllCategories } from "../quiz";

describe("shuffleChoices", () => {
  it("returns same number of choices", () => {
    const choices = ["A", "B", "C", "D"];
    const result = shuffleChoices(choices, 0, 42);
    expect(result.shuffled).toHaveLength(4);
  });

  it("tracks the correct answer index after shuffle", () => {
    const choices = ["A", "B", "C", "D"];
    const result = shuffleChoices(choices, 0, 42);
    expect(result.shuffled[result.correctIndex]).toBe("A");
  });

  it("produces deterministic output for same seed", () => {
    const choices = ["A", "B", "C", "D"];
    const a = shuffleChoices(choices, 0, 42);
    const b = shuffleChoices(choices, 0, 42);
    expect(a.shuffled).toEqual(b.shuffled);
  });
});

describe("calculateScore", () => {
  it("returns 100 for all correct", () => {
    const answers = Array(10).fill({ correct: true });
    expect(calculateScore(answers)).toBe(100);
  });
  it("returns 0 for all wrong", () => {
    const answers = Array(10).fill({ correct: false });
    expect(calculateScore(answers)).toBe(0);
  });
  it("returns 70 for 7 out of 10", () => {
    const answers = [...Array(7).fill({ correct: true }), ...Array(3).fill({ correct: false })];
    expect(calculateScore(answers)).toBe(70);
  });
});

describe("getQuizPack", () => {
  it("returns quiz pack for valid category", () => {
    const pack = getQuizPack("games");
    expect(pack).toBeDefined();
    expect(pack!.category).toBe("games");
    expect(pack!.questions.length).toBeGreaterThan(0);
  });
  it("returns undefined for invalid category", () => {
    expect(getQuizPack("nonexistent")).toBeUndefined();
  });
});

describe("getAllCategories", () => {
  it("returns 6 categories", () => {
    expect(getAllCategories()).toHaveLength(6);
  });
  it("each category has required fields", () => {
    for (const cat of getAllCategories()) {
      expect(cat.id).toBeDefined();
      expect(cat.title).toBeDefined();
      expect(cat.icon).toBeDefined();
    }
  });
});
