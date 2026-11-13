import type { Question } from "@/components/exercises/types";
import type { BieuDoCotProps } from "@/components/math/bieu-do-cot";
import type { KiemDemRow } from "@/components/math/kiem-dem";
import { describe, expect, it } from "vitest";
import { chauCay, chonHop, dayNgan, docSach, exerciseGroups, giaiToan, mucTien, quickChecks, soNgayHon, tienThu } from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((g) => g.questions)];
const byId = (id: string) => questions.find((q) => q.id === id)!;
const blanks = (id: string) => {
  const q = byId(id);
  if (q.kind !== "dien-so") throw new Error(id);
  return q.parts.flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
};
const chosen = (id: string) => {
  const q = byId(id);
  if (q.kind !== "trac-nghiem") throw new Error(id);
  return q.options[q.answerIndex];
};
const props = <T>(id: string): T => {
  const q = byId(id);
  if (q.kind === "noi-cap" || q.kind === "so-sanh" || q.kind === "dat-tinh" || !q.illustration) throw new Error(id);
  return (q.illustration as { props: T }).props;
};
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const vals = (c: BieuDoCotProps) => c.data.map((d) => d.value!);

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm", () => {
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["day-so-lieu", 4],
      ["bieu-do-cot", 5],
      ["su-kien", 4],
      ["ket-hop", 4],
      ["suy-nghi-them", 5],
    ]);
  });
});

describe("số liệu SGK (tính lại)", () => {
  it("Bài 1: nhiều hơn 100 000 là 2 ngày, không tính 100 000", () => {
    const sgk = [180000, 70000, 125000, 80000, 100000];
    expect(sgk.filter((t) => t > 100000)).toEqual([180000, 125000]);
    expect(sgk.filter((t) => t >= 100000)).toHaveLength(3);
  });
  it("Bài 2: 36 câu, trung bình 6, nhiều nhất Mai, ít nhất Việt", () => {
    const d: Record<string, number> = { Lan: 7, "Rô-bốt": 6, Việt: 3, Nam: 6, Mai: 9, Lâm: 5 };
    const v = Object.values(d);
    expect(sum(v)).toBe(36);
    expect(sum(v) / v.length).toBe(6);
    expect(Object.keys(d).find((k) => d[k] === Math.max(...v))).toBe("Mai");
    expect(Object.keys(d).find((k) => d[k] === Math.min(...v))).toBe("Việt");
  });
  it("Bài 3: lớn nhất 12, trung bình 7", () => {
    const d = [2, 3, 5, 5, 5, 8, 8, 10, 12, 12];
    expect(d).toHaveLength(10);
    expect(sum(d)).toBe(70);
    expect(Math.max(...d)).toBe(12);
    expect(sum(d) / d.length).toBe(7);
  });
});

describe("Nhắc lại nhanh", () => {
  it("dãy, trung bình, nhiều hơn, đỉnh cột, kiểm đếm", () => {
    const day = [5, 8, 8, 12, 15];
    expect(blanks("thu-day")).toEqual([day.length, Math.max(...day), Math.min(...day)]);
    const tb = [6, 8, 10];
    expect(blanks("thu-trung-binh")).toEqual([tb.length, sum(tb) / tb.length]);
    expect(chosen("thu-hon")).toBe(`${[90000, 100000, 130000].filter((t) => t > 100000).length} ngày`);
    expect(chosen("thu-dinh-cot")).toBe(`${6 + 1} bài`);
    expect(props<{ data: { value: number }[] }>("thu-dinh-cot").data[0].value).toBe(7);
    expect(blanks("thu-kiem-dem")).toEqual([5 + 2]);
    expect(props<{ rows: KiemDemRow[] }>("thu-kiem-dem").rows[0].count).toBe(7);
    expect(blanks("thu-tong-lan")).toEqual([10 - 3]);
  });
});

describe("Dãy số liệu (Bài 49)", () => {
  it("ds-1 đến ds-4", () => {
    expect(tienThu.filter((t) => t > mucTien)).toEqual([210000, 150000]);
    expect(soNgayHon).toBe(2);
    expect(chosen("ds-1")).toBe(`${tienThu.filter((t) => t > mucTien).length} ngày`);
    expect(blanks("ds-2")).toEqual([dayNgan.length, Math.max(...dayNgan), Math.min(...dayNgan)]);
    expect(blanks("ds-2")).toEqual([8, 12, 3]);
    expect(blanks("ds-3")).toEqual([sum(chauCay), sum(chauCay) / chauCay.length]);
    expect(blanks("ds-3")).toEqual([90, 9]);
    expect(Number.isInteger(sum(chauCay) / chauCay.length)).toBe(true);
    expect(chosen("ds-4")).toBe(String(dayNgan[4]));
    expect(dayNgan[4]).toBe(7);
  });
});

describe("Biểu đồ cột (Bài 50)", () => {
  const [ha, khoa, linh, minh, nga, phu] = vals(giaiToan);
  const names = giaiToan.data.map((d) => d.label);
  it("bd-1 đến bd-5", () => {
    expect(chosen("bd-1")).toBe(`${nga} bài`);
    expect(nga).toBe(5);
    expect(chosen("bd-2")).toBe(names[vals(giaiToan).indexOf(Math.max(...vals(giaiToan)))]);
    expect(chosen("bd-2")).toBe("Linh");
    expect(chosen("bd-3")).toBe(names[vals(giaiToan).indexOf(Math.min(...vals(giaiToan)))]);
    expect(chosen("bd-3")).toBe("Minh");
    expect(blanks("bd-4")).toEqual([ha - nga]);
    expect(blanks("bd-5")).toEqual([nga]);
    expect(ha - 3).toBe(nga);
    expect([khoa, linh, minh, phu]).toEqual([6, 12, 3, 8]);
    const hidden = props<BieuDoCotProps>("bd-5").data.find((d) => d.label === "Nga")!;
    expect(hidden.value).toBeNull();
    for (const id of ["bd-1", "bd-2", "bd-3"]) expect(props<BieuDoCotProps>(id).data.every((d) => d.hideValue)).toBe(true);
    expect(giaiToan.max % giaiToan.step).toBe(0);
  });
});

describe("Số lần xuất hiện (Bài 51)", () => {
  it("sk-1 đến sk-4", () => {
    expect(chosen("sk-1")).toBe("Chọn được hộp đựng bánh; chọn được hộp đựng gôm");
    expect(blanks("sk-2")).toEqual([chonHop.banh, chonHop.gom, chonHop.banh + chonHop.gom]);
    expect(chonHop.banh + chonHop.gom).toBe(10);
    const rows = props<{ rows: KiemDemRow[] }>("sk-2").rows;
    expect(rows.map((r) => r.count)).toEqual([chonHop.banh, chonHop.gom]);
    expect(chosen("sk-3")).toBe(rows[0].count > rows[1].count ? "Chọn được hộp đựng bánh" : "Chọn được hộp đựng gôm");
    expect(blanks("sk-4")).toEqual([Math.abs(rows[0].count - rows[1].count)]);
    expect(blanks("sk-4")).toEqual([4]);
  });
});

describe("Kết hợp", () => {
  it("kh-1 đến kh-4", () => {
    const v = vals(docSach);
    const names = docSach.data.map((d) => d.label);
    expect(chosen("kh-1")).toBe(names[v.indexOf(Math.max(...v))]);
    expect(chosen("kh-1")).toBe("Lan");
    expect(blanks("kh-2")).toEqual([sum(v)]);
    expect(sum(v)).toBe(30);
    expect(blanks("kh-3")).toEqual([v.length, sum(v) / v.length]);
    expect(sum(v) / v.length).toBe(6);
    expect(chosen("kh-4")).toBe(`${v.filter((x) => x > sum(v) / v.length).length} bạn`);
    expect(v.filter((x) => x > 6)).toEqual([10, 8]);
    expect(docSach.max % docSach.step).toBe(0);
  });
});

describe("Suy nghĩ thêm", () => {
  it("sn-1 đến sn-5", () => {
    expect(chosen("sn-1")).toContain(`${4 + 6 + 8} : 3 = ${(4 + 6 + 8) / 3}`);
    expect((4 + 6 + 8) / 3).toBe(6);
    expect((4 + 6 + 8) / 2).toBe(9);
    expect([6, 7, 9, 10].filter((x) => x > 6 && x < 9)).toEqual([7]);
    expect(chosen("sn-2")).toBe("7");
    expect(chosen("sn-3")).toContain("tên");
    expect(blanks("sn-4")).toEqual([6 * 3]);
    expect(18 / 3).toBe(6);
    expect(4 + 5).not.toBe(10);
    expect(chosen("sn-5")).toContain("4 + 5 = 9");
  });
});
