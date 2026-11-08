import { describe, expect, it } from "vitest";
import { compareNumbers, explainCompare, largestFrom, smallestFrom, withoutOneCard } from "./so-sanh";

describe("compareNumbers", () => {
  it("khác số chữ số: nhiều chữ số hơn thì lớn hơn", () => {
    expect(compareNumbers(278992000, 278999)).toEqual({ sign: ">", by: "so-chu-so" });
    expect(compareNumbers(99999999, 100000000)).toEqual({ sign: "<", by: "so-chu-so" });
  });

  it("cùng số chữ số: hàng đầu tiên khác nhau quyết định", () => {
    expect(compareNumbers(230000000, 108000000)).toEqual({ sign: ">", by: "hang", position: 8 });
    expect(compareNumbers(37338449, 37839449)).toEqual({ sign: "<", by: "hang", position: 5 });
    expect(compareNumbers(37003847, 23938399)).toEqual({ sign: ">", by: "hang", position: 7 });
  });

  it("bằng nhau", () => {
    expect(compareNumbers(3405000, 3405000)).toEqual({ sign: "=", by: "bang" });
  });

  it("khớp phép so sánh của JavaScript trên nhiều cặp số", () => {
    const values = [0, 7, 99, 100, 9999, 10000, 99999, 100000, 380000982, 380999999, 99999999, 1000000000, 950000000];
    for (const a of values) {
      for (const b of values) {
        const expected = a > b ? ">" : a < b ? "<" : "=";
        expect(compareNumbers(a, b).sign, `${a} ? ${b}`).toBe(expected);
      }
    }
  });

  it("không nhận số âm hoặc số lẻ", () => {
    expect(() => compareNumbers(-1, 2)).toThrow();
    expect(() => compareNumbers(1.5, 2)).toThrow();
  });
});

describe("explainCompare", () => {
  it("nói đúng lý do", () => {
    expect(explainCompare(278992000, 278999)).toContain("nhiều chữ số hơn");
    expect(explainCompare(230000000, 108000000)).toContain("hàng trăm triệu: 2 > 1");
    expect(explainCompare(37338449, 37839449)).toContain("Các hàng bên trái giống nhau");
    expect(explainCompare(37338449, 37839449)).toContain("hàng trăm nghìn: 3 < 8");
  });
});

describe("lập số từ các thẻ", () => {
  it("lớn nhất và bé nhất, chữ số đầu khác 0", () => {
    expect(largestFrom([8, 0, 0, 9, 1, 7, 0, 3, 8])).toBe(988731000);
    expect(smallestFrom([8, 0, 0, 9, 1, 7, 0, 3, 8])).toBe(100037889);
    expect(smallestFrom([4, 0, 6, 0, 2, 9])).toBe(200469);
  });

  it("khớp với duyệt mọi cách xếp", () => {
    const cards = [3, 0, 5, 0, 8, 2];
    const all = new Set<number>();
    const walk = (rest: number[], used: number[]) => {
      if (rest.length === 0) return void (used[0] !== 0 && all.add(Number(used.join(""))));
      rest.forEach((digit, index) => walk(rest.filter((_, other) => other !== index), [...used, digit]));
    };
    walk(cards, []);
    expect(Math.max(...all)).toBe(largestFrom(cards));
    expect(Math.min(...all)).toBe(smallestFrom(cards));
  });

  it("bỏ đúng một thẻ", () => {
    expect(withoutOneCard([1, 2, 3])).toEqual([[2, 3], [1, 3], [1, 2]]);
  });
});
