import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lines = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);

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
      ["hoat-dong", 7],
      ["luyen-tap-cong", 7],
      ["luyen-tap-tru", 9],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("nhân một số với một tổng", () => {
  it("a × (b + c): hai cách ra cùng kết quả", () => {
    for (const [id, a, b, c] of [["hd-1a", 52, 3, 4], ["hd-1c", 35, 6, 2]] as const) {
      const [first, second] = lines(id);
      expect(first, id).toEqual([b + c, a * (b + c)]);
      expect(second, id).toEqual([a * b, a * c, a * (b + c)]);
      expect(a * b + a * c, id).toBe(a * (b + c));
    }
  });

  it("(a + b) × c: hai cách ra cùng kết quả", () => {
    for (const [id, a, b, c] of [["hd-1b", 14, 26, 6], ["hd-1d", 18, 13, 5]] as const) {
      const [first, second] = lines(id);
      expect(first, id).toEqual([a + b, (a + b) * c]);
      expect(second, id).toEqual([a * c, b * c, (a + b) * c]);
      expect(a * c + b * c, id).toBe((a + b) * c);
    }
  });

  it("m = 3, n = 6, p = 4", () => {
    const [m, nn, p] = [3, 6, 4];
    expect(answers("hd-2a")).toEqual([m * (nn + p), (m + nn) * p, m * nn + m * p, m * p + nn * p]);
    const question = find("hd-2b", "trac-nghiem") as ChoiceQuestion;
    expect(question.options[question.answerIndex]).toBe("m × (n + p) và m × n + m × p");
    expect(m * (nn + p)).toBe(m * nn + m * p);
    expect(m * (nn + p)).not.toBe((m + nn) * p);
    expect(m * (nn + p)).not.toBe(m * p + nn * p);
    expect((m + nn) * p).not.toBe(m * nn + m * p);
  });

  it("hai khối lớp học vẽ: 7 lớp × 15 = 105", () => {
    const [first, second] = lines("hd-3");
    expect(first).toEqual([3 + 4, (3 + 4) * 15]);
    expect(second).toEqual([3 * 15, 4 * 15, 105]);
  });
});

describe("luyện tập: phép cộng", () => {
  it("a × b + a × c = a × (b + c)", () => {
    for (const [id, a, b, c] of [["lt-1a", 73, 3, 6], ["lt-1b", 125, 4, 2]] as const) {
      const [first, second] = lines(id);
      expect(first, id).toEqual([a * b, a * c, a * (b + c)]);
      expect(second, id).toEqual([b + c, a * (b + c)]);
    }
  });

  it("tính thuận tiện", () => {
    expect(answers("lt-2a")).toEqual([7 + 3, 58 * 7 + 58 * 3]);
    expect(answers("lt-2b")).toEqual([8 + 2, 24 * 8 + 24 * 2]);
    expect(answers("lt-2c")).toEqual([34 + 66, 34 * 4 + 66 * 4]);
    expect(answers("lt-3")).toEqual([3 + 5 + 2, 241 * 3 + 241 * 5 + 241 * 2]);
  });

  it("thùng hàng: 3 × (42 + 58) = 300", () => {
    expect(lines("lt-4")).toEqual([[42 + 58], [3 * 42 + 3 * 58]]);
    expect(3 * 42 + 3 * 58).toBe((42 + 58) * 3);
  });
});

describe("luyện tập: phép trừ", () => {
  it("so sánh hai biểu thức", () => {
    expect(answers("lt-5a")).toEqual([31 * (8 - 5), 31 * 8 - 31 * 5]);
    expect(31 * (8 - 5)).toBe(31 * 8 - 31 * 5);
    expect(answers("lt-5b")).toEqual([(9 - 4) * 7, 9 * 7 - 4 * 7]);
    expect((9 - 4) * 7).toBe(9 * 7 - 4 * 7);
  });

  it("bảng a, b, c", () => {
    for (const [id, a, b, c] of [["lt-6a", 6, 9, 4], ["lt-6b", 12, 10, 3], ["lt-6c", 15, 8, 5]] as const) {
      expect(answers(id), id).toEqual([a * (b - c), a * b - a * c]);
      expect(a * (b - c), id).toBe(a * b - a * c);
    }
  });

  it("dấu so sánh là =", () => {
    const question = find("lt-7", "trac-nghiem");
    expect(question.options[question.answerIndex]).toBe("=");
  });

  it("tính thuận tiện", () => {
    expect(answers("lt-8a")).toEqual([9 - 8, 57 * 9 - 57 * 8]);
    expect(answers("lt-8b")).toEqual([7 - 2, 129 * 7 - 129 * 2]);
  });

  it("vải hoa: (8 − 3) × 25 = 125", () => {
    expect(lines("lt-9")).toEqual([[8 - 3], [(8 - 3) * 25]]);
    expect(8 * 25 - 3 * 25).toBe(125);
  });
});

describe("suy nghĩ thêm", () => {
  it("Nam quên nhân 4 với 5", () => {
    expect(4 * (3 + 5)).toBe(32);
    expect(4 * 3 + 5).toBe(17);
    expect(find("sn-1", "trac-nghiem").options[0]).toContain("32");
  });

  it("25 × 12 và 99 × 7", () => {
    expect(answers("sn-2")).toEqual([25 * 10, 25 * 2, 25 * 12]);
    expect(answers("sn-3")).toEqual([100 * 7, 1 * 7, 99 * 7]);
  });

  it("5 × (2 × 3) khác 5 × 2 × 5 × 3", () => {
    expect(5 * (2 * 3)).toBe(30);
    expect(5 * 2 * 5 * 3).toBe(150);
    expect(find("sn-4", "trac-nghiem").options[0]).toContain("150");
  });
});

describe("khởi động và câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-bang-nhan")).toEqual([8 * 7, 15 * 4]);
    expect(answers("kd-nhan-tron")).toEqual([20 * 3, 45 * 2]);
    expect(answers("kd-ngoac")).toEqual([(4 + 6) * 3, 3 * (9 - 4)]);
    expect(answers("thu-nhan-tong")).toEqual([4]);
    expect(5 * (3 + 4)).toBe(5 * 3 + 5 * 4);
    expect(answers("thu-tong-nhan")).toEqual([6]);
    expect((2 + 6) * 7).toBe(2 * 7 + 6 * 7);
    expect(answers("thu-thuan-tien")).toEqual([38 * 6 + 38 * 4]);
    expect(answers("thu-nhan-hieu")).toEqual([2]);
    expect(6 * (5 - 2)).toBe(6 * 5 - 6 * 2);
  });
});
