import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { evalExpr, exerciseGroups, quickChecks, substitute, warmUps } from "./bai-tap";

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

describe("evalExpr", () => {
  it("tính đúng thứ tự phép tính", () => {
    expect(evalExpr("8 + 3 × 2")).toBe(14);
    expect(evalExpr("(8 + 3) × 2")).toBe(22);
    expect(evalExpr("20 − 7 + 3")).toBe(16);
    expect(evalExpr("20 − (7 + 3)")).toBe(10);
    expect(evalExpr("24 : (8 − 5)")).toBe(8);
    expect(evalExpr("35 + 5 × a", { a: 6 })).toBe(65);
    expect(evalExpr("a × 2 + b × 2", { a: 7, b: 3 })).toBe(20);
    expect(substitute("35 + 5 × a", { a: 6 })).toBe("35 + 5 × 6");
  });
});

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

  it("câu nối cặp: cột phải là hoán vị, không số nào đứng đúng chỗ, giá trị không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      const order = question.rightOrder;
      expect([...order].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      order.forEach((value, index) => expect(value, question.id).not.toBe(index));
      const rights = question.pairs.map((pair) => pair.right);
      expect(new Set(rights).size, question.id).toBe(rights.length);
    }
  });

  it("3 câu khởi động và 5 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 4],
      ["luyen-tap-1", 5],
      ["luyen-tap-2", 3],
      ["hai-buoi", 2],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án tính lại", () => {
  it("khởi động", () => {
    expect(answers("kd-thu-tu")).toEqual([8 + 3 * 2, (8 + 3) * 2]);
    expect(answers("kd-chu-vi")).toEqual([5 * 4]);
    expect(answers("kd-ngoac-tru")).toEqual([20 - (7 + 3), 20 - 7 + 3]);
  });

  it("câu thử", () => {
    expect(chosen("thu-viet")).toBe("5 + a");
    expect(answers("thu-thay")).toEqual([50 - 20]);
    expect(answers("thu-chu-vi")).toEqual([8 * 4]);
    expect(answers("thu-thu-tu")).toEqual([20 + 4 * 3]);
  });

  it("khám phá và hoạt động", () => {
    expect(chosen("hd-1")).toBe("b × 7");
    expect(answers("hd-2")).toEqual([144 / 6, (13 + 5) * 4]);
    expect(answers("hd-3")).toEqual([7 * 4, 12 * 4]);
    const match = find("hd-4", "noi-cap");
    expect(match.pairs.map((pair) => [pair.left, pair.right])).toEqual([
      ["a = 2", String(30 + 4 * 2)],
      ["a = 5", String(30 + 4 * 5)],
      ["a = 7", String(30 + 4 * 7)],
      ["a = 6", String(30 + 4 * 6)],
    ]);
  });

  it("luyện tập 1", () => {
    expect(answers("lt1-1")).toEqual([(18 + 9) * 2, (30 + 14) * 2, (42 + 25) * 2]);
    expect(answers("lt1-2")).toEqual([9 + 3 * 2, (18 + 22) / 2]);
    expect(answers("lt1-3")).toEqual([5 + 8 + 6, 7 + 8 + 9]);
    expect(answers("lt1-4a")).toEqual([18 / (4 - 1), 18 / (4 - 2), 18 / (4 - 3)]);
    const values = answers("lt1-4a");
    expect(find("lt1-4b", "trac-nghiem").options[values.indexOf(Math.max(...values))]).toBe(chosen("lt1-4b"));
    expect(chosen("lt1-4b")).toBe("m = 3");
  });

  it("luyện tập 2: có đúng hai cặp bằng nhau, đáp án chọn là cặp cùng 16", () => {
    expect(answers("lt2-1")).toEqual([48 + 65 + 77, 40 + 53 + 69]);
    const [m, n, p] = [8, 5, 3];
    const [A, B, C, D] = [m - (n - p), m * (n - p), m * n - m * p, m - n + p];
    expect(answers("lt2-2")).toEqual([A, B, C, D]);
    expect([A === D, B === C, A === B, C === D]).toEqual([true, true, false, false]);
    // Chỉ có đúng một lựa chọn là cặp cùng giá trị 16
    const pairs: Record<string, [number, number]> = { "A và D": [A, D], "B và C": [B, C], "A và B": [A, B], "C và D": [C, D] };
    const options = find("lt2-3", "trac-nghiem").options;
    expect(options.filter((option) => pairs[option].every((v) => v === 16))).toEqual([chosen("lt2-3")]);
    expect(chosen("lt2-3")).toBe("B và C");
  });

  it("Hái bưởi: giá trị từng ô", () => {
    const right = (id: string) => find(id, "noi-cap").pairs.map((pair) => Number(pair.right));
    expect(right("hb-1")).toEqual([3 * (8 - 3), 6 * 4, 50 - (25 - 7), 9 + 7, 36 - (9 + 5)]);
    expect(right("hb-2")).toEqual([24 / (7 - 3), 6 * 6, 5 + 4 * 3, (9 - 2) * 8, 12 + 4 + 9]);
  });

  it("suy nghĩ thêm", () => {
    expect(20 + 5 * 2).toBe(30);
    expect(chosen("sn-1")).toMatch(/^Phải nhân trước/);
    expect([10, 20, 30].map((a) => 40 - a)).toEqual([30, 20, 10]);
    expect(chosen("sn-2")).toBe("Càng bé");
    expect(chosen("sn-3")).toBe("a × 8");
    expect(answers("sn-4")).toEqual([(8 + 2) * 2, 8 + 2 * 2]);
  });
});

describe("đáp án SGK trang 14-18", () => {
  it("tính lại bằng evalExpr", () => {
    expect(40 - 15).toBe(25);
    expect(evalExpr("125 : m", { m: 5 })).toBe(25);
    expect(evalExpr("(b + 4) × 3", { b: 27 })).toBe(93);
    expect([5, 9].map((a) => a * 4)).toEqual([20, 36]);
    expect([2, 5, 7, 6].map((a) => evalExpr("35 + 5 × a", { a }))).toEqual([45, 60, 70, 65]);
    expect([[25, 16], [34, 28]].map(([a, b]) => (a + b) * 2)).toEqual([82, 124]);
    expect(evalExpr("a + b × 2", { a: 8, b: 2 })).toBe(12);
    expect(evalExpr("(a + b) : 2", { a: 15, b: 27 })).toBe(21);
    expect([4 + 6 + 7, 5 + 6 + 9]).toEqual([17, 20]);
    expect([0, 1, 2].map((m) => evalExpr("12 : (3 − m)", { m }))).toEqual([4, 6, 12]);
    expect([62 + 75 + 81, 50 + 61 + 72]).toEqual([218, 183]);
    const vars = { m: 9, n: 6, p: 4 };
    expect(["m − (n − p)", "m × (n − p)", "m × n − m × p", "m − n + p"].map((e) => evalExpr(e, vars))).toEqual([7, 18, 18, 7]);
  });
});
