import { formatNumber } from "./area-units";
import { describe, expect, it } from "vitest";
import { columnSub, explainColumnSub, readSubColumn } from "./column-sub";

const samples: [number, number][] = [
  [438589, 235072],
  [648390, 382547],
  [36724, 3291],
  [240373, 25350],
  [52340, 3475],
  [800000, 345678],
  [500000, 370000],
  [100000, 99999],
  [725436, 289158],
  [7, 7],
];

describe("columnSub", () => {
  it("ghép các chữ số viết xuống thành đúng hiệu", () => {
    for (const [a, b] of samples) {
      const written = Number(
        columnSub(a, b)
          .map((column) => column.write)
          .reverse()
          .join(""),
      );
      expect(written, `${a} - ${b}`).toBe(a - b);
    }
  });

  it("khớp phép trừ với mọi cặp trong một lưới số", () => {
    for (let a = 0; a < 1500; a += 37) {
      for (let b = 0; b <= a; b += 41) {
        const written = Number(
          columnSub(a, b)
            .map((column) => column.write)
            .reverse()
            .join(""),
        );
        expect(written, `${a} - ${b}`).toBe(a - b);
      }
    }
  });

  it("không dư nhớ ở cột cuối", () => {
    for (const [a, b] of samples) {
      const columns = columnSub(a, b);
      expect(columns[columns.length - 1].borrowOut).toBe(0);
    }
  });

  it("ví dụ b của SGK: 648 390 − 382 547 nhớ ở hàng đơn vị, trăm và chục nghìn", () => {
    const columns = columnSub(648390, 382547);
    expect(columns.filter((column) => column.borrowOut).map((column) => column.position)).toEqual([0, 2, 4]);
  });

  it("từ chối khi số bị trừ nhỏ hơn số trừ", () => {
    expect(() => columnSub(5, 9)).toThrow();
  });
});

describe("readSubColumn", () => {
  const read = (a: number, b: number) => columnSub(a, b).map(readSubColumn);

  it("đọc đúng như SGK cho 648 390 − 382 547", () => {
    expect(read(648390, 382547)).toEqual([
      "0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1",
      "9 trừ 1 bằng 8; 8 trừ 4 bằng 4, viết 4",
      "3 không trừ được 5, lấy 13 trừ 5 bằng 8, viết 8 nhớ 1",
      "8 trừ 1 bằng 7; 7 trừ 2 bằng 5, viết 5",
      "4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6 nhớ 1",
      "6 trừ 1 bằng 5; 5 trừ 3 bằng 2, viết 2",
    ]);
  });

  it("đọc cột không nhớ và cột chỉ có số bị trừ", () => {
    expect(read(438589, 235072)[0]).toBe("9 trừ 2 bằng 7, viết 7");
    expect(read(52340, 3475)[4]).toBe("5 trừ 1 bằng 4, viết 4");
    expect(read(4765, 312)[3]).toBe("Chỉ có 4, viết 4");
  });

  it("đọc cột bớt 1 rồi vẫn không trừ được", () => {
    expect(read(725436, 289158)[1]).toBe("3 trừ 1 bằng 2; 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7 nhớ 1");
  });

  it("đọc cột số 0 phải bớt 1", () => {
    expect(read(800000, 345678)[1]).toBe("0 không trừ được 1, lấy 10 trừ 1 bằng 9; 9 trừ 7 bằng 2, viết 2 nhớ 1");
  });
});

describe("explainColumnSub", () => {
  it("nêu đúng hiệu và các hàng nhớ", () => {
    expect(explainColumnSub(648390, 382547)).toContain(`${formatNumber(648390)} − ${formatNumber(382547)} = ${formatNumber(265843)}`);
    expect(explainColumnSub(648390, 382547)).toContain("Hàng đơn vị, trăm, chục nghìn");
    expect(explainColumnSub(758964, 326521)).toContain("không phải nhớ");
  });
});
