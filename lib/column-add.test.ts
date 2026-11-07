import { describe, expect, it } from "vitest";
import { columnAdd, digitsOf, explainColumnAdd, readColumn } from "./column-add";

describe("cộng theo cột", () => {
  it("chữ số viết xuống ghép lại đúng tổng, với nhiều cặp số", () => {
    const pairs: [number, number][] = [
      [180510, 210365], [327456, 190835], [5839, 712], [482824, 420546], [371845, 258976], [99999, 1], [0, 0], [4768, 1575],
    ];
    for (const [a, b] of pairs) {
      const written = columnAdd(a, b).map((column) => column.write).reverse().join("");
      expect(Number(written)).toBe(a + b);
    }
  });

  it("lời đọc khớp SGK, trang 77 (327 456 + 190 835)", () => {
    expect(columnAdd(327456, 190835).map(readColumn)).toEqual([
      "6 cộng 5 bằng 11, viết 1 nhớ 1",
      "5 thêm 1 bằng 6; 6 cộng 3 bằng 9, viết 9",
      "4 cộng 8 bằng 12, viết 2 nhớ 1",
      "7 thêm 1 bằng 8; 8 cộng 0 bằng 8, viết 8",
      "2 cộng 9 bằng 11, viết 1 nhớ 1",
      "3 thêm 1 bằng 4; 4 cộng 1 bằng 5, viết 5",
    ]);
  });

  it("lời đọc khớp SGK, trang 76 (180 510 + 210 365)", () => {
    expect(columnAdd(180510, 210365).map(readColumn)).toEqual([
      "0 cộng 5 bằng 5, viết 5",
      "1 cộng 6 bằng 7, viết 7",
      "5 cộng 3 bằng 8, viết 8",
      "0 cộng 0 bằng 0, viết 0",
      "8 cộng 1 bằng 9, viết 9",
      "1 cộng 2 bằng 3, viết 3",
    ]);
  });

  it("số ngắn hơn: hàng chỉ có một chữ số", () => {
    const columns = columnAdd(5839, 712);
    expect(columns.map(readColumn)[3]).toBe("5 thêm 1 bằng 6, viết 6");
    expect(columnAdd(5000, 7).map(readColumn)[3]).toBe("Chỉ có 5, viết 5");
  });

  it("tổng đúng 10 vẫn nhớ", () => {
    const column = columnAdd(371845, 258976)[3];
    expect(column.total).toBe(10);
    expect(column.carryOut).toBe(1);
    expect(column.write).toBe(0);
  });

  it("lời giải nêu đúng các hàng nhớ", () => {
    expect(explainColumnAdd(5128, 3641)).toContain("không phải nhớ");
    expect(explainColumnAdd(4957, 865).replaceAll("\u00a0", " ")).toBe(
      "4 957 + 865 = 5 822. Hàng đơn vị, chục, trăm cộng được từ 10 trở lên, nên viết chữ số đơn vị và nhớ 1 sang hàng bên trái.",
    );
    expect(digitsOf(1205)).toEqual([5, 0, 2, 1]);
  });
});
