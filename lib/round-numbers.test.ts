import { describe, expect, it } from "vitest";
import { decidingDigit, explainRound, roundDirection, roundHint, roundToPlace } from "./round-numbers";

describe("làm tròn số", () => {
  it("các ví dụ của SGK trang 45-46", () => {
    expect(roundToPlace(2712615, 5)).toBe(2700000);
    expect(roundToPlace(18490000, 5)).toBe(18500000);
    expect(roundToPlace(2125000, 5)).toBe(2100000);
    expect(roundToPlace(2890000, 5)).toBe(2900000);
    expect(roundToPlace(189835388, 4)).toBe(189840000);
    expect(roundToPlace(5122381, 4)).toBe(5120000);
    expect(roundToPlace(531278000, 4)).toBe(531280000);
  });

  it("chữ số quyết định bằng 5 thì làm tròn lên", () => {
    expect(roundToPlace(2750000, 5)).toBe(2800000);
    expect(roundToPlace(2749999, 5)).toBe(2700000);
    expect(roundDirection(2750000, 5)).toBe("lên");
    expect(roundDirection(2749999, 5)).toBe("xuống");
  });

  it("làm tròn lên gặp chữ số 9 thì nhớ sang hàng bên trái", () => {
    expect(roundToPlace(1960000, 5)).toBe(2000000);
    expect(roundToPlace(999999, 5)).toBe(1000000);
  });

  it("khớp với cách tìm số tròn gần nhất bằng phép thử", () => {
    for (const position of [1, 2, 3, 4, 5, 6]) {
      const unit = 10 ** position;
      for (let value = 0; value < 3_000_000; value += 7919) {
        const low = Math.floor(value / unit) * unit;
        const high = low + unit;
        const expected = value - low < high - value ? low : high;
        expect(roundToPlace(value, position), `${value} đến vị trí ${position}`).toBe(expected);
      }
    }
  });

  it("chữ số quyết định và lời giải", () => {
    expect(decidingDigit(2712615, 5)).toBe(1);
    expect(explainRound(2712615, 5).replace(/\u00a0/g, " ")).toBe(
      "Chữ số hàng chục nghìn của 2 712 615 là 1, bé hơn 5 nên làm tròn xuống: 2 712 615 ≈ 2 700 000.",
    );
    expect(explainRound(4350000, 5)).toContain("bằng 5 nên làm tròn lên");
    expect(roundHint(5)).toContain("hàng chục nghìn");
  });

  it("từ chối đầu vào không hợp lệ", () => {
    expect(() => roundToPlace(12.5, 1)).toThrow();
    expect(() => roundToPlace(100, 0)).toThrow();
    expect(() => roundToPlace(100, 9)).toThrow();
  });
});
