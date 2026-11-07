import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answerOf = (id: string) => blankAnswers(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const bigOf = (total: number, diff: number) => (total + diff) / 2;
const smallOf = (total: number, diff: number) => (total - diff) / 2;

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

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.options[question.answerIndex], question.id).toBeDefined();
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("câu nối có thứ tự cột phải là hoán vị và không trùng vị trí đáp án", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      const sorted = [...question.rightOrder].sort((a, b) => a - b);
      expect(sorted, question.id).toEqual(question.pairs.map((_, index) => index));
      expect(question.rightOrder.some((value, index) => value === index), question.id).toBe(false);
    }
  });
});

describe("đáp án tính lại", () => {
  it("khởi động", () => {
    expect(answerOf("kd-1")).toEqual([35 - 5]);
    expect(answerOf("kd-2")).toEqual([30 / 2]);
    expect(answerOf("kd-3")).toEqual([12 + 3]);
  });

  it("câu tìm hai số: đáp án có tổng và hiệu đúng, thứ tự theo đề hỏi", () => {
    // [id, tổng, hiệu, số lớn hỏi trước?]
    const cases: [string, number, number, boolean][] = [
      ["a-1", 60, 8, true],
      ["a-2", 18, 4, true],
      ["b-1", 36, 8, false],
      ["b-2", 150, 20, true],
      ["b-3", 36 / 2, 6, true],
      ["b-4", 24, 2, false],
      ["tt-4", 44, 10, true],
    ];
    for (const [id, total, diff, bigFirst] of cases) {
      const big = bigOf(total, diff);
      const small = smallOf(total, diff);
      expect(big + small, id).toBe(total);
      expect(big - small, id).toBe(diff);
      expect(answerOf(id), id).toEqual(bigFirst ? [big, small] : [small, big]);
    }
  });

  it("đáp án sách giáo khoa và số liệu cụ thể", () => {
    expect(answerOf("a-1")).toEqual([34, 26]);
    expect(answerOf("a-2")).toEqual([11, 7]);
    expect(answerOf("b-1")).toEqual([14, 22]);
    expect(answerOf("b-2")).toEqual([85, 65]);
    expect(answerOf("b-3")).toEqual([12, 6]);
    expect(answerOf("b-4")).toEqual([11, 13]);
    expect(answerOf("tt-4")).toEqual([27, 17]);
  });

  it("câu chu vi: hai lần (dài + rộng) bằng chu vi", () => {
    const [long, wide] = answerOf("b-3");
    expect(2 * (long + wide)).toBe(36);
    expect(long - wide).toBe(6);
  });

  it("hai số lẻ liên tiếp", () => {
    const [small, big] = answerOf("b-4");
    expect(small % 2).toBe(1);
    expect(big % 2).toBe(1);
    expect(big - small).toBe(2);
    expect(small + big).toBe(24);
  });

  it("trắc nghiệm a-3, tt-1, tt-3, tt-5", () => {
    expect(chosen("a-3")).toBe(String(bigOf(30, 6)));
    expect(bigOf(50, 10)).toBeGreaterThan(50 / 2);
    expect(chosen("tt-1")).toBe("Lớn hơn 25");
    expect(answerOf("tt-2")).toEqual([bigOf(50, 10)]);
    // tt-3: 52 là hai lần số bé
    expect(60 - 8).toBe(52);
    expect(smallOf(60, 8)).toBe(26);
    expect(chosen("tt-3")).toContain("Quên chia 2");
    // tt-5: 15 và 4 không cùng chẵn lẻ
    expect((15 - 4) % 2).toBe(1);
    expect(chosen("tt-5")).toContain("không chia hết cho 2");
  });

  it("câu nối: tổng và hiệu của từng đề", () => {
    const question = find("b-5", "noi-cap");
    const total = (text: string) => Number(/Tổng (\d+)/.exec(text)![1]);
    const diff = (text: string) => Number(/hiệu (\d+)/.exec(text)![1]);
    expect(question.pairs.map((item) => [total(item.right), diff(item.right)])).toEqual([
      [70, 6],
      [40 / 2, 4],
      [20, 2],
      [30, 4],
    ]);
  });

  it("câu thử trong lý thuyết", () => {
    expect(answerOf("thu-cach-1")).toEqual([smallOf(30, 4)]);
    expect(answerOf("thu-cach-2")).toEqual([bigOf(30, 4)]);
    expect(answerOf("thu-cong-thuc")).toEqual([smallOf(70, 10)]);
    const [long] = answerOf("thu-chu-vi");
    expect(long).toBe(bigOf(30 / 2, 5));
    expect(2 * (long + (30 / 2 - long))).toBe(30);
  });

  it("lời giải mẫu nhắc đúng số", () => {
    expect(find("a-1", "dien-so").explanation).toContain("60 − 8 = 52");
    expect(find("a-1", "dien-so").explanation).toContain("52 : 2 = 26");
    expect(find("b-3", "dien-so").explanation).toContain("36 : 2 = 18");
    expect(find("b-2", "dien-so").explanation).toContain("130 : 2 = 65");
  });
});
