import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { columnDiv } from "@/lib/column-div";
import { describe, expect, it } from "vitest";
import { divide, exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lines = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);
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

  it("câu trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("các nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 7],
      ["luyen-tap-1", 9],
      ["luyen-tap-2", 7],
      ["suy-nghi-them", 5],
    ]);
  });
});

describe("đặt tính chia", () => {
  it("thương và số dư kiểm tra ngược bằng q × b + r = a", () => {
    const cases: Record<string, [number, number]> = {
      "hd-1a": [336, 14],
      "hd-1b": [340, 14],
      "hd-1c": [1628, 37],
      "hd-1d": [1631, 42],
      "lt1-1a": [3354, 43],
      "lt1-1b": [3375, 45],
      "lt1-1c": [31680, 44],
      "lt1-1d": [6036, 12],
      "lt1-1e": [2530, 23],
      "lt1-1f": [4140, 23],
    };
    for (const [id, [a, b]] of Object.entries(cases)) {
      const [q, r = 0] = answers(id);
      expect(q * b + r, id).toBe(a);
      expect(r, id).toBeLessThan(b);
      expect(find(id, "dien-so").parts[0], id).toContain(` : ${b} =`);
    }
    expect(answers("hd-1d")).toEqual([38, 35]);
    expect(answers("hd-1b")).toEqual([24, 4]);
  });

  it("thương có chữ số 0 ở lt1-1d, e, f", () => {
    for (const id of ["lt1-1d", "lt1-1e", "lt1-1f"]) expect(String(answers(id)[0]), id).toContain("0");
  });

  it("divide khớp columnDiv", () => {
    for (const [a, b] of [[216, 12], [218, 18], [4896, 12], [2294, 62], [1631, 42]]) {
      const { quotient, remainder } = columnDiv(a, b);
      expect(divide(a, b)).toEqual({ q: quotient, r: remainder });
      expect(quotient * b + remainder).toBe(a);
    }
  });
});

describe("chia nhẩm", () => {
  it("mỗi ô là a : b", () => {
    expect(answers("hd-2a")).toEqual([480 / 60, 630 / 90, 540 / 60]);
    expect(answers("hd-2b")).toEqual([36000 / 900, 54800 / 200, 7000 / 500]);
    expect(answers("hd-2b")).toEqual([40, 274, 14]);
    expect(answers("thu-nham")).toEqual([5600 / 700]);
  });
});

describe("biểu thức, hình chữ nhật, bài toán", () => {
  it("so sánh biểu thức", () => {
    expect(answers("lt1-2a")).toEqual([72 / (3 * 4), 72 / 3 / 4, 72 / 4 / 3]);
    expect(answers("lt1-2b")).toEqual([(24 * 60) / 12, (24 / 12) * 60, 24 * (60 / 12)]);
    expect(new Set(answers("lt1-2a")).size).toBe(1);
    expect(new Set(answers("lt1-2b")).size).toBe(1);
  });

  it("sân bóng: dài × rộng = S, chu vi", () => {
    const [length, perimeter] = [5040 / 56, (5040 / 56 + 56) * 2];
    expect(lines("lt1-3")).toEqual([[length], [length, perimeter]]);
    expect(length * 56).toBe(5040);
    expect(perimeter).toBe(292);
  });

  it("ghế, nan hoa", () => {
    expect(lines("hd-3")).toEqual([[432 / 18]]);
    expect(432 % 18).toBe(0);
    expect(lines("lt-4")).toEqual([[32 * 2], [Math.floor(2000 / 64), 2000 % 64]]);
    expect(lines("lt-4")[1]).toEqual([31, 16]);
  });

  it("bảng thừa số, số bị chia", () => {
    expect(answers("lt-1a")).toEqual([72 * 35]);
    expect(answers("lt-1b")).toEqual([1755 / 45]);
    expect(45 * answers("lt-1b")[0]).toBe(1755);
    expect(answers("lt-1c")).toEqual([6400 / 64]);
    expect(answers("lt-2a")).toEqual([Math.floor(4218 / 53), 4218 % 53]);
    expect(answers("lt-2b")).toEqual([Math.floor(2998 / 64), 2998 % 64]);
  });

  it("đội đồng diễn: 24 × 15 : 20", () => {
    expect(chosen("lt-3")).toBe("18 hàng");
    expect((24 * 15) / 20).toBe(18);
  });
});

describe("suy nghĩ thêm và câu thử", () => {
  it("ước lượng, thương đúng, số dư, số 0, xoá 0", () => {
    expect(chosen("sn-1")).toBe("60");
    expect(Math.round(3584 / 62)).toBeGreaterThan(50);
    expect(Math.floor(3584 / 62)).toBe(57);
    expect(chosen("sn-2")).toBe("6");
    expect(7 * 24).toBeGreaterThan(148);
    expect(148 - 6 * 24).toBeLessThan(24);
    expect(chosen("sn-3")).toContain("thương phải là 12");
    expect(218 - 11 * 18).toBe(20);
    expect(chosen("sn-4")).toBe("503");
    expect(6036 / 12).toBe(503);
    expect(chosen("sn-5")).toBe("Sai");
    expect(450 / 90).not.toBe(4500 / 90);
    expect(4500 / 90).toBe(450 / 9);
  });

  it("khởi động và câu thử tính lại", () => {
    expect(answers("kd-chia-mot")).toEqual([864 / 4]);
    expect(answers("kd-nhan-hai")).toEqual([6 * 18]);
    expect(chosen("kd-so-du")).toBe("3");
    expect(chosen("thu-uoc-luong")).toContain("Quá lớn");
    expect(answers("thu-du")).toEqual([12, 2]);
    expect(12 * 18 + 2).toBe(218);
    expect(answers("thu-thuong-0")).toEqual([2436 / 12]);
  });

  it("câu trắc nghiệm không dùng kiểu sai", () => {
    expect((find("kd-so-du", "trac-nghiem") as ChoiceQuestion).options).toContain("12");
  });
});
