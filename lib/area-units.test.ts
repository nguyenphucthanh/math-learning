import { describe, expect, it } from "vitest";
import { conversionHint, convertArea, explainConversion, formatNumber, parseAnswer, parseMeasure } from "./area-units";

describe("parseAnswer", () => {
  it("accepts the ways a child can type a number", () => {
    expect(parseAnswer("70000")).toBe(70000);
    expect(parseAnswer("70 000")).toBe(70000);
    expect(parseAnswer("70.000")).toBe(70000);
    expect(parseAnswer(" 5 ")).toBe(5);
  });

  it("rejects anything that is not a number", () => {
    expect(parseAnswer("")).toBeNull();
    expect(parseAnswer("abc")).toBeNull();
    expect(parseAnswer("-5")).toBeNull();
  });
});

describe("parseMeasure", () => {
  it("does not confuse m² with the end of dm² or mm²", () => {
    expect(parseMeasure("3 m² 9 dm²")).toEqual([[3, "m²"], [9, "dm²"]]);
    expect(parseMeasure("5 mm²")).toEqual([[5, "mm²"]]);
  });

  it("throws on malformed measures", () => {
    expect(() => parseMeasure("ba mét")).toThrow();
  });
});

describe("convertArea", () => {
  it("multiplies by 100 per step, not by 10", () => {
    expect(convertArea("1 m²", "dm²")).toBe(100);
    expect(convertArea("1 dm²", "cm²")).toBe(100);
    expect(convertArea("1 cm²", "mm²")).toBe(100);
    expect(convertArea("7 m²", "cm²")).toBe(70000);
  });

  it("handles mixed measures and going up the ladder", () => {
    expect(convertArea("3 m² 9 dm²", "dm²")).toBe(309);
    expect(convertArea("700 cm²", "dm²")).toBe(7);
  });

  it("throws when the result is not a whole number", () => {
    expect(() => convertArea("50 cm²", "dm²")).toThrow();
  });
});

describe("explanations", () => {
  it("formats numbers with thin grouping", () => {
    expect(formatNumber(70000)).toBe("70 000");
    expect(formatNumber(100)).toBe("100");
  });

  it("shows each step of a two-step conversion", () => {
    expect(explainConversion("7 m²", "cm²")).toBe("Đổi từng bậc: 7 m² = 700 dm² = 70 000 cm².");
  });

  it("splits a mixed measure", () => {
    expect(explainConversion("3 m² 9 dm²", "dm²")).toContain("300 + 9 = 309");
  });

  it("explains going up with a division", () => {
    expect(explainConversion("400 mm²", "cm²")).toContain("400 : 100 = 4");
    expect(conversionHint("400 mm²", "cm²")).toBe("Nhớ lại: 100 mm² = 1 cm².");
    expect(conversionHint("2 m²", "dm²")).toBe("Nhớ lại: 1 m² = 100 dm².");
  });
});
