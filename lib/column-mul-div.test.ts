import { formatNumber } from "./area-units";
import { describe, expect, it } from "vitest";
import { columnDiv, explainColumnDiv, readDivStep } from "./column-div";
import { columnMul, explainColumnMul, readMulColumn } from "./column-mul";

describe("columnMul", () => {
  it("2 807 × 6: có số nhớ, có chữ số 0, có cột nhớ cuối", () => {
    const columns = columnMul(2807, 6);
    expect(columns.map((column) => column.write).reverse().join("")).toBe("16842");
    expect(columns.map((column) => column.carryOut)).toEqual([4, 0, 4, 1, 0]);
    expect(readMulColumn(columns[0], 6)).toBe("7 nhân 6 bằng 42, viết 2 nhớ 4");
    expect(readMulColumn(columns[1], 6)).toBe("0 nhân 6 bằng 0, thêm 4 bằng 4, viết 4");
    expect(readMulColumn(columns[4], 6)).toBe("Hạ số nhớ 1, viết 1");
    expect(readMulColumn(columns[3], 6, true)).toBe("2 nhân 6 bằng 12, thêm 4 bằng 16, viết 16");
  });

  it("160 140 × 7: cột cuối đọc như SGK", () => {
    const columns = columnMul(160140, 7);
    expect(columns.map((column) => column.write).reverse().join("")).toBe("1120980");
    expect(readMulColumn(columns[5], 7, true)).toBe("1 nhân 7 bằng 7, thêm 4 bằng 11, viết 11");
  });

  it("kết quả đúng với mọi cặp trong khoảng", () => {
    for (let a = 1000; a < 20000; a += 137) {
      for (let b = 1; b <= 9; b++) {
        const result = columnMul(a, b).map((column) => column.write).reverse().join("");
        expect(Number(result), `${a}×${b}`).toBe(a * b);
      }
    }
  });

  it("lời giải và kiểm tra thừa số", () => {
    expect(explainColumnMul(1111, 2)).toContain("không phải nhớ");
    expect(() => columnMul(10, 12)).toThrow();
  });
});

describe("columnDiv", () => {
  it("8 305 : 4 = 2 076 dư 1, có bước thương 0", () => {
    const division = columnDiv(8305, 4);
    expect(division.quotient).toBe(2076);
    expect(division.remainder).toBe(1);
    expect(division.steps.map((step) => step.current)).toEqual([8, 3, 30, 25]);
    expect(division.steps.map((step) => step.quotientDigit)).toEqual([2, 0, 7, 6]);
    expect(readDivStep(division.steps[1], 4, false)).toContain("3 chia 4 được 0");
  });

  it("bắt đầu từ nhóm chữ số đủ lớn", () => {
    const division = columnDiv(72056, 8);
    expect(division.steps[0].current).toBe(72);
    expect(division.quotient).toBe(9007);
    expect(division.remainder).toBe(0);
  });

  it("thương nhân số chia cộng số dư bằng số bị chia, số dư nhỏ hơn số chia", () => {
    for (let a = 1; a < 100000; a += 997) {
      for (let d = 1; d <= 9; d++) {
        const { quotient, remainder } = columnDiv(a, d);
        expect(quotient * d + remainder, `${a}:${d}`).toBe(a);
        expect(remainder).toBeLessThan(d);
        expect(quotient).toBe(Math.floor(a / d));
      }
    }
  });

  it("lời giải nhắc thử lại", () => {
    expect(explainColumnDiv(83927, 4)).toContain("dư 3");
    expect(explainColumnDiv(83927, 4)).toContain(`${formatNumber(20981)} × 4 + 3 = ${formatNumber(83927)}`);
  });
});
