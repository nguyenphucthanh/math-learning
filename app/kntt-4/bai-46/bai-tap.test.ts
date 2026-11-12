import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, meanOf, quickChecks, sumOf, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

const find = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (!q) throw new Error(id);
  return q;
};
const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blanks((find(id) as FillQuestion).parts);
const wordAnswers = (id: string) => (find(id) as WordQuestion).lines.map(blanks);
const chosen = (id: string) => {
  const q = find(id) as ChoiceQuestion;
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

  it("số nhóm và số câu", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["hoat-dong", 6],
      ["luyen-tap", 5],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("số trung bình cộng", () => {
  it("đáp án tính lại từ số liệu", () => {
    const cases: Record<string, number[]> = {
      "hd-1a": [30, 50],
      "hd-1b": [20, 30, 40],
      "hd-1c": [6, 11, 19],
      "lt-1a": [32, 28, 30],
      "lt-1b": [21, 23, 19, 17, 25],
    };
    for (const [id, values] of Object.entries(cases)) {
      expect(answers(id), id).toEqual([sumOf(values), meanOf(values)]);
      expect(Number.isInteger(meanOf(values)), id).toBe(true);
    }
    expect(answers("hd-1a")).toEqual([80, 40]);
    expect(answers("lt-1b")).toEqual([105, 21]);
  });

  it("bài toán lời văn", () => {
    for (const [id, values] of [
      ["hd-2a", [18, 24, 27]],
      ["hd-2b", [32, 36, 38, 42]],
      ["hd-3", [80, 120, 64, 176]],
    ] as [string, number[]][]) {
      expect(wordAnswers(id), id).toEqual([[sumOf(values)], [meanOf(values)]]);
    }
    expect(wordAnswers("hd-3")).toEqual([[440], [110]]);
  });

  it("bao thóc: chia cho 8 bao, không chia cho 2", () => {
    const bags = 5 + 3;
    const kg = 250 + 134;
    expect(wordAnswers("lt-2")).toEqual([[bags], [kg], [kg / bags]]);
    expect(kg % bags).toBe(0);
    expect(kg / 2).not.toBe(kg / bags);
  });

  it("bánh giấy: ngày hai = 30 + 6", () => {
    const day2 = 30 + 6;
    expect(wordAnswers("lt-3")).toEqual([[day2], [(30 + day2) / 2]]);
  });

  it("tìm số còn lại: tổng = trung bình × số số hạng", () => {
    expect(answers("lt-4")).toEqual([16 * 2, 16 * 2 - 20]);
    expect((12 + 20) / 2).toBe(16);
    expect(answers("sn-3")).toEqual([20 * 3, 20 * 3 - 15 - 18]);
    expect((15 + 18 + 27) / 3).toBe(20);
  });

  it("câu tư duy", () => {
    expect(chosen("sn-1")).toBe("22");
    expect(meanOf([14, 22, 30])).toBe(22);
    expect(chosen("sn-2")).toContain("Chia cho 2");
    expect(meanOf([12, 18, 30])).toBe(20);
    expect((12 + 18 + 30) / 2).toBe(30);
  });

  it("khởi động và câu thử", () => {
    expect(answers("kd-cong")).toEqual([24 + 36 + 30]);
    expect(answers("kd-chia")).toEqual([90 / 3]);
    expect(answers("kd-chia-deu")).toEqual([12 / 4]);
    expect(answers("thu-tinh")).toEqual([sumOf([6, 8, 10]), meanOf([6, 8, 10])]);
    expect(chosen("thu-giua")).toBe(String(meanOf([12, 20, 28])));
    expect(chosen("thu-so-hang")).toBe("4");
    expect(meanOf([35, 37, 43, 45])).toBe(40);
    expect(answers("thu-nguoc")).toEqual([10 * 3]);
  });

  it("đáp án SGK trong phần phụ huynh", () => {
    expect(meanOf([10, 50])).toBe(30);
    expect(meanOf([13, 14, 18])).toBe(15);
    expect([meanOf([20, 30]), meanOf([10, 20, 30]), meanOf([5, 12, 19])]).toEqual([25, 20, 12]);
    expect(meanOf([15, 20, 22])).toBe(19);
    expect(meanOf([60, 188, 42, 154])).toBe(111);
    expect([meanOf([28, 24, 26]), meanOf([17, 19, 15, 13, 21])]).toEqual([26, 17]);
    expect((400 + 224) / (8 + 4)).toBe(52);
    expect((20 + 24) / 2).toBe(22);
    expect(15 * 2 - 18).toBe(12);
  });
});
