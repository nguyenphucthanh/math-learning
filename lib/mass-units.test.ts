import { describe, expect, it } from "vitest";
import { convertMass, explainMass, massHint, parseMass, toKg } from "./mass-units";

describe("đổi đơn vị khối lượng", () => {
  it("đổi được cả hai chiều, nhiều bậc", () => {
    expect(convertMass("3 yến", "kg")).toBe(30);
    expect(convertMass("60 kg", "yến")).toBe(6);
    expect(convertMass("5 tạ", "kg")).toBe(500);
    expect(convertMass("4 tạ", "yến")).toBe(40);
    expect(convertMass("2 tấn", "kg")).toBe(2000);
    expect(convertMass("3 tấn", "tạ")).toBe(30);
    expect(convertMass("3 tấn", "yến")).toBe(300);
    expect(convertMass("9 000 kg", "tấn")).toBe(9);
  });

  it("đổi được số đo ghép", () => {
    expect(convertMass("4 yến 5 kg", "kg")).toBe(45);
    expect(convertMass("5 tạ 5 kg", "kg")).toBe(505);
    expect(convertMass("6 tấn 40 kg", "kg")).toBe(6040);
    expect(convertMass("3 tạ 2 yến", "yến")).toBe(32);
    expect(convertMass("5 tấn 2 tạ", "tạ")).toBe(52);
    expect(convertMass("4 tấn 50 yến", "yến")).toBe(450);
    expect(toKg("1 tạ 17 kg")).toBe(117);
  });

  it("đọc được số có khoảng trắng", () => {
    expect(parseMass("3 090 kg")).toEqual([[3090, "kg"]]);
    expect(convertMass("190 tấn", "kg")).toBe(190000);
  });

  it("báo lỗi khi kết quả lẻ hoặc sai cú pháp", () => {
    expect(() => convertMass("45 kg", "yến")).toThrow();
    expect(() => convertMass("5 kg", "tạ")).toThrow();
    expect(() => parseMass("hai yến")).toThrow();
  });

  it("gợi ý và lời giải nói đúng đẳng thức", () => {
    expect(massHint("3 yến", "kg")).toBe("Nhớ lại: 1 yến = 10 kg.");
    expect(massHint("60 kg", "yến")).toBe("Nhớ lại: 1 yến = 10 kg.");
    expect(massHint("3 tấn", "yến")).toBe("Nhớ lại: 1 tấn = 100 yến.");
    expect(massHint("5 tạ 4 yến", "yến")).toBe("Nhớ lại: 1 tạ = 10 yến.");
    expect(explainMass("3 yến", "kg")).toBe("3 × 10 = 30, nên 3 yến = 30 kg.");
    expect(explainMass("60 kg", "yến")).toBe("60 : 10 = 6, nên 60 kg = 6 yến.");
    expect(explainMass("4 yến 5 kg", "kg")).toBe("4 yến = 40 kg. Cộng thêm 5 kg: 40 + 5 = 45 kg.");
    expect(explainMass("4 tấn 50 yến", "yến")).toBe("4 tấn = 400 yến. Cộng thêm 50 yến: 400 + 50 = 450 yến.");
  });
});
