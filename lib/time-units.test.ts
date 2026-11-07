import { describe, expect, it } from "vitest";
import { centuryOf, centuryRange, convertTime, countYears, explainTime, parseTime, timeHint, toRoman } from "./time-units";

describe("đổi đơn vị thời gian", () => {
  it("đổi được cả hai chiều và số đo ghép", () => {
    expect(convertTime("1 phút", "giây")).toBe(60);
    expect(convertTime("180 giây", "phút")).toBe(3);
    expect(convertTime("5 ngày", "giờ")).toBe(120);
    expect(convertTime("28 ngày", "tuần")).toBe(4);
    expect(convertTime("4 giờ 10 phút", "phút")).toBe(250);
    expect(convertTime("2 phút 11 giây", "giây")).toBe(131);
    expect(convertTime("4 thế kỉ", "năm")).toBe(400);
    expect(convertTime("400 năm", "thế kỉ")).toBe(4);
  });

  it("đọc được số có khoảng trắng", () => {
    expect(parseTime("1 000 năm")).toEqual([[1000, "năm"]]);
    expect(convertTime("1 000 năm", "thế kỉ")).toBe(10);
  });

  it("báo lỗi khi đổi khác họ, lẻ hoặc sai cú pháp", () => {
    expect(() => convertTime("1 năm", "ngày")).toThrow();
    expect(() => convertTime("90 giây", "phút")).toThrow();
    expect(() => parseTime("hai phút")).toThrow();
  });

  it("gợi ý và lời giải nói đúng đẳng thức", () => {
    expect(timeHint("4 phút", "giây")).toBe("Nhớ lại: 1 phút = 60 giây.");
    expect(timeHint("300 giây", "phút")).toBe("Nhớ lại: 1 phút = 60 giây.");
    expect(explainTime("4 phút", "giây")).toBe("4 × 60 = 240, nên 4 phút = 240 giây.");
    expect(explainTime("300 giây", "phút")).toBe("300 : 60 = 5, nên 300 giây = 5 phút.");
    expect(explainTime("3 giờ 5 phút", "phút")).toBe("3 giờ = 180 phút. Cộng thêm 5 phút: 180 + 5 = 185 phút.");
  });
});

describe("thế kỉ", () => {
  it("khớp các đoạn năm trong SGK", () => {
    expect(centuryRange(1)).toEqual([1, 100]);
    expect(centuryRange(2)).toEqual([101, 200]);
    expect(centuryRange(20)).toEqual([1901, 2000]);
    expect(centuryRange(21)).toEqual([2001, 2100]);
  });

  it("năm tròn trăm là năm cuối của thế kỉ", () => {
    expect(centuryOf(1)).toBe(1);
    expect(centuryOf(100)).toBe(1);
    expect(centuryOf(101)).toBe(2);
    expect(centuryOf(1900)).toBe(19);
    expect(centuryOf(1901)).toBe(20);
    expect(centuryOf(2000)).toBe(20);
    expect(centuryOf(2001)).toBe(21);
  });

  it("đáp án năm sinh trong SGK", () => {
    expect([1228, 1380, 1867, 924].map((year) => toRoman(centuryOf(year)))).toEqual(["XIII", "XIV", "XIX", "X"]);
  });

  it("viết số La Mã", () => {
    expect([1, 4, 9, 10, 14, 19, 20, 21].map(toRoman)).toEqual(["I", "IV", "IX", "X", "XIV", "XIX", "XX", "XXI"]);
  });

  it("đếm năm tính cả hai đầu", () => {
    expect(countYears(2001, 2009)).toBe(9);
  });
});
