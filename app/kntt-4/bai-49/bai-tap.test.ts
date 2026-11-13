import type { Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { countBetween, countMoreThan, exerciseGroups, letters, meanOf, quickChecks, sortedAsc, sortedDesc, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (id: string) => {
  const q = find(id, "dien-so");
  return q.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
};
const wordBlanks = (id: string) => find(id, "loi-van").lines.map((line) => line.flatMap((part) => (typeof part === "string" ? [] : [part.answer])));
const chosen = (id: string) => {
  const q = find(id, "trac-nghiem");
  return q.options[q.answerIndex];
};

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm", () => {
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["hoat-dong", 4],
      ["luyen-tap", 4],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án tính lại", () => {
  it("SGK tr.36-38 (kiểm lại số liệu sách)", () => {
    const bongDa = [7, 6, 2, 4];
    expect([bongDa[3], Math.max(...bongDa), countMoreThan(bongDa, 5)]).toEqual([4, 7, 2]);
    expect(sortedAsc([1, 13, 8, 4, 5])).toEqual([1, 4, 5, 8, 13]);
    expect(sortedDesc([1, 13, 8, 4, 5])).toEqual([13, 8, 5, 4, 1]);
    const ten = [4, 3, 2, 3, 4, 5, 3, 5];
    expect([ten.length, ten[0], Math.max(...ten), Math.min(...ten)]).toEqual([8, 4, 5, 2]);
    expect(letters("Nguyệt")).toBe(6);
    expect(meanOf([20, 40, 10, 50, 30])).toBe(30);
    expect(countBetween([10, 8, 11, 10, 9, 8, 7], 9, 12)).toBe(4);
    expect(meanOf([1, 2, 2, 2, 3])).toBe(2);
  });

  it("khởi động và câu thử", () => {
    expect(blanks("kd-lon-nhat")).toEqual([12]);
    expect(blanks("kd-be-nhat")).toEqual([8]);
    expect(blanks("kd-trung-binh")).toEqual([12, 4]);
    expect(chosen("thu-dem")).toBe("5");
    expect([2, 2, 5, 5, 5].length).toBe(5);
    expect(chosen("thu-thu-n")).toBe("6");
    expect([4, 9, 6, 7][2]).toBe(6);
    expect(blanks("thu-nhieu-hon")).toEqual([2]);
    expect([3, 5, 6, 8, 5].filter((v) => v > 5)).toEqual([6, 8]);
  });

  it("hoạt động", () => {
    const g = [3, 8, 5, 1, 6];
    expect(blanks("hd-1")).toEqual([g[2], 8, g.filter((v) => v > 4).length]);
    expect(blanks("hd-1")).toEqual([5, 8, 3]);
    const b = [7, 2, 9, 2, 5, 9];
    expect(blanks("hd-2")).toEqual([2, 2, 5, 7, 9, 9, 9, 9, 7, 5, 2, 2]);
    expect(blanks("hd-2").slice(0, 6)).toEqual([...b].sort((x, y) => x - y));
    expect(blanks("hd-2").slice(6)).toEqual([...b].sort((x, y) => y - x));
    const t = [5, 3, 4, 3, 5, 4, 3];
    expect(blanks("hd-3a")).toEqual([7, 5, 5, 3]);
    expect(t.length).toBe(7);
    expect([...("Khuyên".normalize("NFC"))].length).toBe(6);
    expect(letters("Khuyên")).toBeGreaterThan(Math.max(...t));
    expect(chosen("hd-3b")).toContain("Không, vì tên Khuyên có 6");
  });

  it("luyện tập", () => {
    const d = [3, 4, 6, 7, 9, 12];
    expect(blanks("lt-1a")).toEqual([6, 3, 1]);
    expect(d.every((v, i) => i === 0 || v > d[i - 1])).toBe(true);
    expect(chosen("lt-1c")).toBe("Tăng");
    const e = [15, 25, 45, 20, 30];
    expect(e.reduce((s, v) => s + v, 0)).toBe(135);
    expect(wordBlanks("lt-2")).toEqual([[5], [135], [27]]);
    expect(135 / 5).toBe(27);
    const s = [9, 7, 10, 8, 11, 9, 6, 10];
    expect(s.filter((v) => v >= 9 && v <= 12)).toEqual([9, 10, 11, 9, 10]);
    expect(blanks("lt-3")).toEqual([8, 6, 5]);
  });

  it("suy nghĩ thêm", () => {
    expect(blanks("sn-1")).toEqual([6, 2]);
    expect(new Set([4, 4, 7, 4, 7, 7]).size).toBe(2);
    expect(chosen("sn-2")).toContain("thiếu một số 3");
    expect([...[8, 3, 5, 3, 9]].sort((a, b) => a - b)).toEqual([3, 3, 5, 8, 9]);
    expect(blanks("sn-3")).toEqual([4, 6]);
    expect((3 + 6 + 6 + 9) / 4).toBe(6);
    expect((3 + 6 + 6 + 9) / 3).not.toBe(6);
    const s = [2, 5, 5, 7, 9];
    expect([s.filter((v) => v > 5).length, s.filter((v) => v >= 5).length]).toEqual([2, 4]);
    expect(chosen("sn-4")).toMatch(/^Lan/);
  });
});
