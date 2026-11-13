import type { Question } from "@/components/exercises/types";
import { docPhanSo, docSo, phanTo, type HinhPhanSoProps } from "@/components/math/phan-so";
import { describe, expect, it } from "vitest";
import { exerciseGroups, hinhs, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
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
const figOf = (id: string): HinhPhanSoProps => {
  const q = byId(id);
  if (q.kind === "noi-cap" || q.kind === "so-sanh" || q.kind === "dat-tinh" || !q.illustration) throw new Error(id);
  return (q.illustration as { props: HinhPhanSoProps }).props;
};
const tuMau = (p: HinhPhanSoProps) => [phanTo(p.to).size, p.mau];

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

  it("hình hợp lệ: tử số không vượt mẫu số, mẫu số khác 0, vị trí tô nằm trong hình", () => {
    for (const [name, p] of Object.entries(hinhs)) {
      const to = phanTo(p.to);
      expect(p.mau, name).toBeGreaterThan(0);
      expect(to.size, name).toBeLessThanOrEqual(p.mau);
      for (const i of to) expect(i, name).toBeLessThan(p.mau);
      if ("chia" in p) expect((p as HinhPhanSoProps).chia!.length, name).toBe(p.mau);
    }
  });

  it("nhóm câu", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["viet-hinh", 5],
      ["tu-mau", 4],
      ["doc-viet", 7],
      ["to-chua-to", 4],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án", () => {
  it("khởi động: đếm phần từ hình", () => {
    expect(blanks("kd-1")).toEqual([6, 2]);
    expect(blanks("kd-2")).toEqual([5, 3]);
    expect(blanks("kd-3")).toEqual([8, 5]);
    for (const id of ["kd-1", "kd-2", "kd-3"]) expect(blanks(id)).toEqual([figOf(id).mau, phanTo(figOf(id).to).size]);
  });

  it("câu thử trong Lý thuyết", () => {
    expect(chosen("thu-doc")).toBe(tuMau(figOf("thu-doc")).join("/"));
    expect(blanks("thu-tu-mau")).toEqual([4, 7]);
    expect(blanks("thu-tu-mau")).toEqual(tuMau(figOf("thu-tu-mau")));
    expect(chosen("thu-khong-deu")).toContain("không bằng nhau");
    const lech = figOf("thu-khong-deu");
    expect(new Set(lech.chia).size).toBeGreaterThan(1);
    expect(chosen("thu-doc-phan-so")).toBe(docSo(5) === "năm" ? "Năm phần chín" : "");
    expect(docPhanSo(5, 9)).toBe("năm phần chín");
  });

  it("viết phân số từ hình: số phần tô và tổng phần lấy từ dữ liệu hình", () => {
    const expected = { "vh-1": [3, 8], "vh-2": [5, 6], "vh-3": [3, 7], "vh-4": [4, 9], "vh-5": [7, 10] };
    for (const [id, answer] of Object.entries(expected)) {
      expect(blanks(id), id).toEqual(answer);
      expect(blanks(id), id).toEqual(tuMau(figOf(id)));
    }
    // hình nhiều hàng: 3 hàng x 3 ô
    expect(figOf("vh-4").mau).toBe(3 * 3);
  });

  it("tử số và mẫu số từ đề", () => {
    expect(blanks("tm-1")).toEqual([5, 9]);
    expect(blanks("tm-2")).toEqual([8, 11]);
    expect(blanks("tm-3")).toEqual([4, 15]);
    expect(blanks("tm-4")).toEqual([13, 20]);
  });

  it("đọc và viết", () => {
    const expected = [
      [5, 12, "năm phần mười hai"],
      [11, 20, "mười một phần hai mươi"],
      [23, 45, "hai mươi ba phần bốn mươi lăm"],
      [16, 31, "mười sáu phần ba mươi mốt"],
    ] as const;
    expected.forEach(([a, b, text], i) => {
      expect(docPhanSo(a, b)).toBe(text);
      expect(blanks(`dv-${i + 3}`)).toEqual([a, b]);
      expect(byId(`dv-${i + 3}`)).toMatchObject({ prompt: `Viết phân số: ${text}.` });
    });
    expect(docPhanSo(25, 58)).toBe("hai mươi lăm phần năm mươi tám");
    expect(docPhanSo(7, 19)).toBe("bảy phần mười chín");
    expect(chosen("dv-7")).toBe(docPhanSo(7, 12).replace(/^./, (c) => c.toUpperCase()));
    for (const id of ["dv-1", "dv-2"]) {
      const q = byId(id);
      if (q.kind !== "noi-cap") throw new Error(id);
      for (const pair of q.pairs) {
        const [a, b] = pair.right.split("/").map(Number);
        expect(pair.left, id).toBe(docPhanSo(a, b));
      }
      expect([...q.rightOrder].sort(), id).toEqual(q.pairs.map((_, i) => i));
      q.rightOrder.forEach((v, i) => expect(v, id).not.toBe(i));
    }
  });

  it("phần chưa tô và phần đã tô", () => {
    const t = figOf("tc-1");
    const [to, mau] = tuMau(t);
    expect([to, mau]).toEqual([5, 12]);
    expect(chosen("tc-1")).toBe(`${mau - to}/${mau}`);
    expect(chosen("tc-1")).toBe("7/12");
    expect(chosen("tc-2")).toBe("5/12");
    const b = tuMau(figOf("tc-3"));
    expect(chosen("tc-3")).toBe(`${b[1] - b[0]}/${b[1]}`);
    expect(chosen("tc-3")).toBe("5/9");
    expect(blanks("tc-4")).toEqual([5, 5, 9]);
  });

  it("suy nghĩ thêm", () => {
    expect(chosen("sn-1")).toContain("không bằng nhau");
    const [tu, mau] = tuMau(figOf("sn-2"));
    expect(blanks("sn-2")).toEqual([mau - tu, mau - tu, mau]);
    expect(blanks("sn-2")).toEqual([5, 5, 8]);
    expect(blanks("sn-2")[0] + tu).toBe(blanks("sn-2")[2]);
    const s3 = figOf("sn-3");
    expect(tuMau(s3)).toEqual([7, 10]);
    expect((byId("sn-3") as { prompt: string }).prompt).toContain("3/7");
    expect(chosen("sn-3")).toContain("chưa tô làm tử số");
    expect(tuMau(figOf("sn-4"))).toEqual([2, 5]);
    expect((byId("sn-4") as { prompt: string }).prompt).toContain("5/2");
  });
});
