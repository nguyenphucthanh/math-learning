import { describe, expect, it } from "vitest";
import { digitAt, hangName, lopName, positionOfIndex, positionValue } from "./hang-lop";

describe("hàng và lớp", () => {
  it("tên hàng và lớp theo từng vị trí", () => {
    expect([0, 1, 2, 3, 4, 5, 6, 7, 8].map((p) => `${hangName(p)}, ${lopName(p)}`)).toEqual([
      "hàng đơn vị, lớp đơn vị",
      "hàng chục, lớp đơn vị",
      "hàng trăm, lớp đơn vị",
      "hàng nghìn, lớp nghìn",
      "hàng chục nghìn, lớp nghìn",
      "hàng trăm nghìn, lớp nghìn",
      "hàng triệu, lớp triệu",
      "hàng chục triệu, lớp triệu",
      "hàng trăm triệu, lớp triệu",
    ]);
  });

  it("vị trí chữ số: 514 293 có chữ số 4 ở hàng nghìn", () => {
    expect(positionOfIndex(514293, 2)).toBe(3);
    expect(digitAt(514293, 3)).toBe(4);
    expect(digitAt(514293, 7)).toBe(0);
  });

  it("giá trị theo vị trí", () => {
    expect(positionValue(2, 3)).toBe(2000);
    expect(positionValue(5, 8)).toBe(500000000);
  });

  it("báo lỗi khi hàng không tồn tại", () => {
    expect(() => hangName(9)).toThrow();
    expect(() => lopName(-1)).toThrow();
  });
});
