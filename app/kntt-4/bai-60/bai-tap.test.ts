import type { Part, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { calcSpecs, dsSpecs, exerciseGroups, quickChecks, soSpecs, ssSpecs, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
const byId = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (!q) throw new Error(id);
  return q;
};

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const lcm = (x: number, y: number) => (x * y) / gcd(x, y);
/** Tổng đúng bằng mẫu số chung nhỏ nhất, độc lập với code của bài. */
const sum = (terms: [number, number][]): [number, number] => {
  const m = terms.reduce((acc, [, b]) => lcm(acc, b), 1);
  const t = terms.reduce((s, [a, b]) => s + a * (m / b), 0);
  const g = gcd(t, m);
  return [t / g, m / g];
};
const blanks = (lines: Part[][]) => lines.flat().flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
const parse = (s: string): [number, number][] => Array.from(s.matchAll(/(\d+)\/(\d+)/g), (m) => [Number(m[1]), Number(m[2])]);

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm theo tiết", () => {
    expect(exerciseGroups.map((g) => g.id)).toEqual(["cung-mau-74", "cung-mau-75", "cung-mau-76", "khac-mau-78", "luyen-tap-79", "suy-nghi-them"]);
  });
});

describe("đáp án phép cộng", () => {
  it("mọi câu tính: mẫu số lớn chia hết các mẫu số, kết quả cuối là tổng đã rút gọn", () => {
    for (const { id, kind, terms } of calcSpecs) {
      const m = Math.max(...terms.map(([, b]) => b));
      terms.forEach(([, b]) => expect(m % b, id).toBe(0));
      if (kind === "cung" || kind === "ba") expect(new Set(terms.map(([, b]) => b)).size, id).toBe(1);
      else expect(new Set(terms.map(([, b]) => b)).size, id).toBeGreaterThan(1);
      const q = byId(id) as WordQuestion;
      const ans = blanks(q.lines);
      expect(ans.slice(-2), id).toEqual(sum(terms));
    }
  });

  it("quy đồng và rút gọn từng bước", () => {
    for (const { id, kind, terms, tuTim } of calcSpecs) {
      const ans = blanks((byId(id) as WordQuestion).lines);
      if (kind === "khac") {
        const m = Math.max(...terms.map(([, b]) => b));
        const small = terms.find(([, b]) => b < m)!;
        const off = tuTim ? 1 : 0;
        if (tuTim) expect(ans[0], id).toBe(m / small[1]);
        expect(ans[off + 1], id).toBe(m);
        expect(ans[off] * small[1], id).toBe(small[0] * m);
        // tổng chưa rút gọn bằng tổng thật
        const total = [ans[off + 2], ans[off + 3]];
        expect(total[0] * sum(terms)[1], id).toBe(sum(terms)[0] * total[1]);
      }
      if (kind === "rutgon") {
        terms.forEach(([a, b], i) => {
          const [x, y] = [ans[i * 2], ans[i * 2 + 1]];
          expect(x * b, id).toBe(a * y);
          expect(gcd(x, y), id).toBe(1);
        });
      }
      if (kind === "ba-khac") expect(ans[0], id).toBe(Math.max(...terms.map(([, b]) => b)));
    }
  });

  it("số còn thiếu: ghép đáp án vào thì phép cộng đúng", () => {
    for (const { id } of soSpecs) {
      const q = byId(id);
      if (q.kind !== "dien-so") throw new Error(id);
      const text = q.parts.map((p) => (typeof p === "string" ? p : String(p.answer))).join("");
      const [[a, b], [c, d], [e, g]] = parse(text);
      expect([b, d, g], id).toEqual([b, b, b]);
      expect(a + c, id).toBe(e);
    }
  });

  it("đúng sai: đáp án khớp với việc tổng có đúng không", () => {
    for (const { id, a, c, m } of dsSpecs) {
      const q = byId(id);
      if (q.kind !== "trac-nghiem") throw new Error(id);
      const [, , shown] = parse(q.prompt);
      const [t, mm] = sum([[a, m], [c, m]]);
      const right = shown[0] * mm === t * shown[1];
      expect(q.answerIndex, id).toBe(right ? 0 : 1);
    }
    expect(dsSpecs.map((s) => byId(s.id).kind === "trac-nghiem" && (byId(s.id) as { answerIndex: number }).answerIndex)).toEqual([1, 1, 0]);
  });

  it("tính rồi so sánh", () => {
    for (const { id, rows } of ssSpecs) {
      const q = byId(id);
      if (q.kind !== "so-sanh") throw new Error(id);
      q.rows.forEach((row, i) => {
        const [a, b] = sum(parse(rows[i][0]));
        const [c, d] = sum(parse(rows[i][1]));
        expect(row.answer, `${id} ${i}`).toBe(a * d === b * c ? "=" : a * d > b * c ? ">" : "<");
      });
    }
    expect(ssSpecs[0].rows[2]).toEqual(["3/10 + 4/10", "3/10 + 5/10"]);
  });

  it("khởi động và câu thử", () => {
    const fillAns = (id: string) => blanks([(byId(id) as { parts: Part[] }).parts]);
    expect(fillAns("kd-rut")).toEqual([3, 4]);
    expect(fillAns("kd-quy")).toEqual([4, 8]);
    expect(fillAns("thu-cung")).toEqual(sum([[3, 7], [2, 7]]));
    expect(fillAns("thu-quy")).toEqual([2, 6]);
    expect(fillAns("thu-rut")).toEqual(sum([[5, 12], [3, 12]]));
  });
});
