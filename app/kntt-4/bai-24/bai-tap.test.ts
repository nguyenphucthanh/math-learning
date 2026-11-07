import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
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
/** Các số trong một dãy tổng "a + b + c =", bỏ dấu tách lớp. */
const operands = (text: string) =>
  text
    .replace(/=.*$/, "")
    .replace(/ /g, "")
    .split("+")
    .map((part) => Number(part.trim()));
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

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
    expect(answerOf("kd-1")).toEqual([100 - 47]);
    expect(answerOf("kd-2")).toEqual([250 + 750]);
    expect(answerOf("kd-3")).toEqual([45000 + 75000]);
  });

  it("câu đổi chỗ: đáp án bằng tổng của hai số hạng", () => {
    const pairs: Record<string, [number, number]> = { "gh-1": [318, 245], "gh-2": [6305, 428], "gh-3": [91, 5872] };
    for (const [id, [a, b]] of Object.entries(pairs)) expect(answerOf(id), id).toEqual([a + b]);
  });

  it("câu tính thuận tiện: đáp án bằng tổng các số hạng trong đề", () => {
    const ids = questions.map((question) => question.id).filter((id) => id.startsWith("tt-"));
    expect(ids).toHaveLength(12);
    for (const id of ids) {
      const question = find(id, "dien-so");
      expect(answerOf(id), id).toEqual([sum(operands(question.parts[0] as string))]);
    }
  });

  it("câu tính thuận tiện chỉ có 3 hoặc 4 số hạng", () => {
    for (const question of questions) {
      if (!question.id.startsWith("tt-") || question.kind !== "dien-so") continue;
      expect(operands(question.parts[0] as string).length, question.id).toBeGreaterThanOrEqual(3);
      expect(operands(question.parts[0] as string).length, question.id).toBeLessThanOrEqual(4);
    }
  });

  it("tính chất kết hợp", () => {
    expect(answerOf("kh-1")).toEqual([3480 + 4573 + 520]);
    expect(answerOf("kh-2")).toEqual([25000 + (45000 + 55000)]);
  });

  it("điền số hoặc chữ", () => {
    expect(answerOf("dc-1")).toEqual([384]);
    expect(answerOf("dc-2")).toEqual([2318]);
    expect(answerOf("dc-4")).toEqual([62]);
    // 38 + z + 62 = (38 + 62) + z với mọi z
    for (const z of [0, 1, 7, 100]) expect(38 + z + 62).toBe(38 + answerOf("dc-4")[0] + z);
    // 529 + ? = 384 + 529 và ? + 407 = 407 + 2 318
    expect(529 + answerOf("dc-1")[0]).toBe(384 + 529);
    expect(answerOf("dc-2")[0] + 407).toBe(407 + 2318);
    expect(chosen("dc-3")).toBe("n");
  });

  it("sơ đồ: hai biểu thức cùng giá trị khi a = 18, b = 6", () => {
    const a = 18;
    const b = 6;
    expect(answerOf("sd-3")).toEqual([a + b + 5]);
    expect(answerOf("sd-4")).toEqual([a + (b + 5)]);
    expect(chosen("sd-1")).toBe("a + (b + 5)");
    expect(chosen("sd-2")).toBe("a + b + 5");
  });

  it("bài toán quãng đường", () => {
    const question = find("bt-1", "loi-van") as WordQuestion;
    expect(question.lines.map((line) => blankAnswers(line))).toEqual([[245 + 130 + 155]]);
  });

  it("câu thử trong lý thuyết", () => {
    expect(blankAnswers(quickChecks.giaoHoan.parts)).toEqual([135]);
    expect(135 + 264).toBe(264 + blankAnswers(quickChecks.giaoHoan.parts)[0]);
    expect(blankAnswers(quickChecks.ketHop.parts)).toEqual([17]);
    expect(40 + (60 + 17)).toBe(40 + 60 + blankAnswers(quickChecks.ketHop.parts)[0]);
    expect(blankAnswers(quickChecks.thuanTien.parts)).toEqual([64 + 187 + 36]);
  });

  it("suy nghĩ thêm", () => {
    expect(480 + 275 + 20).toBe(500 + answerOf("nghi-1")[0]);
    expect(chosen("nghi-2")).toContain("mất số 49");
    // câu nghi-2: kết quả 149 đúng, lỗi nằm ở dấu = đầu tiên
    expect(36 + 49 + 64).toBe(149);
    expect(36 + 64).not.toBe(36 + 49 + 64);
    expect(chosen("nghi-3")).toContain("không trừ được");
    expect(9 - 4).toBe(5);
    expect(4 - 9).toBeLessThan(0);
  });
});
