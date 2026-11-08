import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, isEven, quickChecks, range, twoDigitNumbers, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const plain = (text: string) => text.replace(/ /g, " ");

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("câu nào cũng có gợi ý và giải thích", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("câu trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("3 câu khởi động và 4 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["nhan-biet", 4],
      ["day-so", 7],
      ["lap-so", 3],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đáp án tính lại", () => {
  it("khởi động", () => {
    expect(answers("kd-chia")).toEqual([14 / 2, Math.floor(15 / 2), 15 % 2]);
    expect(answers("kd-tan-cung")).toEqual([2318 % 10]);
    expect(answers("kd-dem-2")).toEqual([6 + 4, 6 + 6]);
  });

  it("câu thử", () => {
    expect(15 % 2).toBe(1);
    expect(chosen("thu-chia-het")).toBe("Lẻ");
    expect(plain(chosen("thu-tan-cung"))).toBe("1 965");
    expect(isEven(1965)).toBe(false);
    expect(answers("thu-lien-tiep")).toEqual([126 + 2]);
  });

  it("nhận biết: đáp án chọn đúng chẵn hoặc lẻ", () => {
    const parse = (text: string) => Number(plain(text).replace(/\D/g, ""));
    expect(isEven(parse(chosen("nb-1")))).toBe(true);
    expect(isEven(parse(chosen("nb-2")))).toBe(false);
    expect(isEven(parse(chosen("nb-4")))).toBe(true);
    // Mỗi câu chỉ có đúng một đáp án thỏa điều kiện
    const nb1 = find("nb-1", "trac-nghiem").options.map(parse);
    expect(nb1.filter(isEven)).toHaveLength(1);
    const nb2 = find("nb-2", "trac-nghiem").options.map(parse);
    expect(nb2.filter((v) => !isEven(v))).toHaveLength(1);
    const nb4 = find("nb-4", "trac-nghiem").options.map(parse);
    expect(nb4.filter(isEven)).toHaveLength(1);
  });

  it("nb-3: đếm số chẵn, số lẻ", () => {
    const list = [24, 53, 780, 4691, 5026, 3105, 8];
    expect(answers("nb-3")).toEqual([list.filter(isEven).length, list.filter((v) => !isEven(v)).length]);
    expect(answers("nb-3")).toEqual([4, 3]);
  });

  it("dãy số: mỗi số hơn số trước 2 đơn vị", () => {
    expect(answers("ts-1")).toEqual([218 + 2, 218 + 4, 218 + 6]);
    expect(answers("ts-2")).toEqual([309 + 2, 309 + 4, 309 + 6]);
    expect(answers("ts-3")).toEqual([248 - 246, 533 - 531]);
    expect(answers("ts-4")).toEqual([96, 98, 85, 87]);
    expect([...answers("ts-1"), 226, 216, 218].every(isEven)).toBe(true);
    expect([...answers("ts-2"), 317, 307, 309].every((v) => !isEven(v))).toBe(true);
    expect([...answers("ts-4").slice(0, 2), 94].every(isEven)).toBe(true);
    expect([...answers("ts-4").slice(2), 83].every((v) => !isEven(v))).toBe(true);
  });

  it("số 0 là số chẵn", () => {
    expect(0 % 2).toBe(0);
    expect(chosen("ts-5")).toMatch(/^Số chẵn/);
  });

  it("đếm trong khoảng, tính cả hai đầu", () => {
    const count = (from: number, to: number) => {
      const numbers = range(from, to);
      return [numbers.filter(isEven).length, numbers.filter((v) => !isEven(v)).length];
    };
    expect(answers("ts-6")).toEqual(count(0, 20));
    expect(answers("ts-6")).toEqual([11, 10]);
    expect(answers("ts-7")).toEqual([11, 11]);
    expect(count(10, 31)).toEqual([11, 11]); // SGK trang 12 bài 3
    expect(answers("sn-3")).toEqual([50, 50]);
  });

  it("lập số từ thẻ số", () => {
    expect(twoDigitNumbers([3, 6, 8]).sort((a, b) => a - b)).toEqual([36, 38, 63, 68, 83, 86]);
    expect(answers("ls-1")).toEqual([4, 2]);
    expect(twoDigitNumbers([7, 4, 5]).filter(isEven).sort()).toEqual([54, 74]); // SGK trang 13 bài 4
    const cards = [2, 5, 9];
    const formed = twoDigitNumbers(cards);
    const options = find("ls-2", "trac-nghiem").options.map(Number);
    expect(options.filter((v) => formed.includes(v) && !isEven(v))).toEqual([Number(chosen("ls-2"))]);
    expect(answers("ls-3")).toEqual([71]);
    expect(Math.max(...twoDigitNumbers([1, 4, 7]).filter((v) => !isEven(v)))).toBe(71);
  });

  it("suy nghĩ thêm", () => {
    expect(2107 % 2).toBe(1);
    expect(chosen("sn-1")).toMatch(/^Sai/);
    expect(4300 % 2).toBe(0);
    expect(4306 % 2).toBe(0);
    expect(plain(chosen("sn-2"))).toMatch(/4 300 chia hết cho 2/);
  });
});
