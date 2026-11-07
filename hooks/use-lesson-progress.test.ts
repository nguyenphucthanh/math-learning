import { describe, expect, it } from "vitest";
import { parseProgress } from "./use-lesson-progress";

describe("parseProgress", () => {
  it("returns an empty store when nothing is saved or data is corrupt", () => {
    expect(parseProgress(null)).toEqual({});
    expect(parseProgress("{not json")).toEqual({});
    expect(parseProgress("[1,2]")).toEqual({});
  });

  it("keeps valid entries and drops broken ones", () => {
    const raw = JSON.stringify({
      "bai-18": { solved: { a: { firstTry: true }, b: { firstTry: "yes" }, c: null }, total: 3, gameWon: true },
      "bai-19": "broken",
      "bai-20": { solved: [] },
    });
    expect(parseProgress(raw)).toEqual({
      "bai-18": { solved: { a: { firstTry: true } }, total: 3, gameWon: true },
    });
  });
});
