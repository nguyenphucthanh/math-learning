import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { divParts, exerciseGroups, quickChecks } from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const wordAnswers = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};

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

  it("trắc nghiệm có đáp án hợp lệ, lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["cong-tru", 5],
      ["nhan-chia", 6],
      ["tinh-chat", 8],
      ["bieu-thuc", 3],
      ["bai-toan", 3],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đặt tính cộng, trừ", () => {
  it("số liệu hợp lệ cho dạng dat-tinh", () => {
    for (const id of ["ct-1a", "ct-1b", "ct-1c", "ct-1d", "ct-1e"]) {
      const q = find(id, "dat-tinh");
      expect(String(q.a).length, id).toBeGreaterThanOrEqual(String(q.b).length);
      if (q.op === "-") expect(q.a, id).toBeGreaterThanOrEqual(q.b);
    }
    expect(find("ct-1c", "dat-tinh").op).toBe("-");
    expect(find("ct-1d", "dat-tinh").op).toBe("-");
  });
});

describe("nhân, chia", () => {
  it("nhân", () => {
    expect(answers("nc-1a")).toEqual([917 * 6]);
    expect(answers("nc-1b")).toEqual([408 * 35]);
    expect(answers("nc-1c")).toEqual([2765 * 48]);
  });

  it("chia, số dư bé hơn số chia, thử lại", () => {
    for (const [id, a, b] of [["nc-2a", 7546, 24], ["nc-2b", 354126, 42], ["nc-2c", 96048, 6]] as const) {
      const [q, r = 0] = answers(id);
      expect(q * b + r, id).toBe(a);
      expect(r, id).toBeLessThan(b);
    }
    expect(blankAnswers(divParts(100, 7))).toEqual([14, 2]);
    expect(blankAnswers(divParts(100, 5))).toEqual([20]);
  });
});

describe("tính chất và tính thuận tiện", () => {
  it("số ? làm hai vế bằng nhau", () => {
    expect(258 + 476).toBe(476 + answers("tc-1a")[0]);
    expect(135 + 287 + 413).toBe(answers("tc-1b")[0] + (287 + 413));
    expect(36 * 58).toBe(58 * answers("tc-1c")[0]);
    expect(127 * 25 * 4).toBe(answers("tc-1d")[0] * (25 * 4));
    expect(205 * 17 + 205 * 13).toBe(205 * (17 + answers("tc-1e")[0]));
    expect(319 + 425).toBe(425 + answers("thu-giao-hoan")[0]);
  });

  it("thuận tiện", () => {
    expect(answers("tc-2a")).toEqual([10000, 28, 7350 + 6428 + 2650 - 6400]);
    expect(answers("tc-2b")).toEqual([100, 2804 * 25 * 4]);
    expect(answers("tc-2c")).toEqual([100, 356 * 38 + 356 * 62]);
    expect(answers("thu-thuan-tien")[1]).toBe(25 * 36 * 4);
    expect(answers("thu-phan-phoi")[1]).toBe(47 * 8 + 47 * 2);
  });
});

describe("biểu thức", () => {
  it("thứ tự phép tính", () => {
    expect(answers("bt-1a")).toEqual([215 * 36, 215 * 36, 7246 + 215 * 36]);
    expect(answers("bt-1b")).toEqual([8465 - 4565, (8465 - 4565) / 15, 5138 - (8465 - 4565) / 15]);
    expect(Number.isInteger((8465 - 4565) / 15)).toBe(true);
    expect(chosen("bt-2")).toBe(String(120 - 8 * 6 + 4));
    expect(chosen("thu-thu-tu")).toBe("6 × 5");
  });
});

describe("bài toán", () => {
  it("tổng hiệu, trung bình, tiền xăng", () => {
    const [big, small] = [(47000 + 5000) / 2, (47000 - 5000) / 2];
    expect(wordAnswers("bt-lv-1")).toEqual([[big], [small]]);
    expect(big + small).toBe(47000);
    expect(big - small).toBe(5000);
    expect(wordAnswers("bt-lv-2")).toEqual([[7 * 16400], [5 * 14600], [(7 * 16400 + 5 * 14600) / 12]]);
    expect(Number.isInteger((7 * 16400 + 5 * 14600) / 12)).toBe(true);
    expect(wordAnswers("bt-lv-3")).toEqual([[4], [28], [28 * 24000]]);
    expect(answers("thu-tong-hieu")).toEqual([7, 3]);
  });
});

describe("suy nghĩ thêm", () => {
  it("ước lượng và tìm lỗi", () => {
    expect(chosen("sn-1")).toBe("30 000");
    expect(Math.abs(612 * 49 - 30000)).toBeLessThan(612 * 49);
    expect(chosen("sn-2")).toBe("200");
    expect(Math.floor(7846 / 38)).toBe(206);
    expect(306 * 4 + 306 * 20).toBe(306 * 24);
    expect(chosen("sn-3")).toMatch(/lùi sang trái/);
  });
});
