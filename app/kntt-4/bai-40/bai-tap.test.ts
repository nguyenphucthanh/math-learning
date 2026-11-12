import type { ChoiceQuestion, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
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
const product = (...numbers: number[]) => numbers.reduce((total, value) => total * value, 1);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
/** Giá trị của một chuỗi "a × b × c" (bỏ dấu cách ngăn lớp). */
const value = (expr: string) => product(...expr.replace(/ /g, "").split("×").map((part) => Number(part.trim())));

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

  it("câu nối cặp có rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const question of questions.filter((item): item is MatchQuestion => item.kind === "noi-cap")) {
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      question.rightOrder.forEach((v, index) => expect(v, question.id).not.toBe(index));
    }
  });

  it("3 câu khởi động và 4 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["giao-hoan", 6],
      ["ket-hop", 7],
      ["luyen-tap", 9],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("tính chất giao hoán", () => {
  it("nối cặp: mỗi cặp là hai tích cùng thừa số, cùng giá trị", () => {
    const question = find("hd-1", "noi-cap");
    for (const { left, right } of question.pairs) {
      expect(value(left), left).toBe(value(right));
      expect(left).not.toBe(right);
    }
  });

  it("ô trống: hai vế bằng nhau", () => {
    expect(answers("hd-2a")).toEqual([7]);
    expect(7 * 6).toBe(6 * 7);
    expect(answers("hd-2b")).toEqual([10]);
    expect(answers("hd-2c")).toEqual([9]);
    expect(answers("hd-2d")).toEqual([30520]);
    expect(30520 * 4).toBe(4 * 30520);
  });

  it("8 × 15 = 15 × 8 = 120", () => {
    const [swapped, total] = find("hd-3", "loi-van").lines.map(blankAnswers);
    expect(swapped).toEqual([8]);
    expect(total).toEqual([8 * 15]);
    expect(8 * 15).toBe(120);
  });
});

describe("tính chất kết hợp", () => {
  it("tính hai cách ra cùng kết quả", () => {
    const cases: Record<string, [number, number, number]> = {
      "hd-4a": [5, 2, 6],
      "hd-4b": [8, 3, 2],
      "hd-4c": [4, 3, 3],
      "hd-4d": [9, 2, 5],
    };
    for (const [id, [a, b, c]] of Object.entries(cases)) {
      const [first, second] = (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);
      expect(first, id).toEqual([a * b, (a * b) * c]);
      expect(second, id).toEqual([b * c, a * (b * c)]);
      expect((a * b) * c, id).toBe(a * (b * c));
    }
  });

  it("thẻ cùng đội có cùng giá trị", () => {
    expect(value(chosen("hd-5a"))).toBe(6 * 5 * 4);
    expect(value(chosen("hd-5b"))).toBe(9 * 4 * 2);
    for (const [id, target] of [["hd-5a", 120], ["hd-5b", 72]] as const) {
      const question = find(id, "trac-nghiem") as ChoiceQuestion;
      const matches = question.options.filter((option) => value(option) === target);
      expect(matches, id).toEqual([chosen(id)]);
    }
  });

  it("kẹo: 5 hộp × 4 ngăn × 5 viên = 100", () => {
    const [cells, candies] = find("hd-6", "loi-van").lines.map(blankAnswers);
    expect(cells).toEqual([20]);
    expect(candies).toEqual([100]);
    expect(5 * 4 * 5).toBe(100);
  });
});

describe("luyện tập", () => {
  it("bảng a, b, c", () => {
    const cases: Record<string, [number, number, number]> = { "lt-1a": [6, 5, 3], "lt-1b": [9, 2, 4], "lt-1c": [5, 4, 5] };
    for (const [id, [a, b, c]] of Object.entries(cases)) {
      expect(answers(id), id).toEqual([a * b, b * a, (a * b) * c, a * (b * c)]);
    }
  });

  it("biết 42 150 × 7 và 295 050 × 4, suy ra không tính lại", () => {
    expect(42150 * 7).toBe(295050);
    expect(295050 * 4).toBe(1180200);
    expect(answers("lt-2")).toEqual([295050, 1180200, 1180200]);
  });

  it("nối phép tính với kết quả", () => {
    const question = find("lt-3", "noi-cap");
    for (const { left, right } of question.pairs) expect(value(left), left).toBe(Number(right));
    expect(new Set(question.pairs.map((pair) => pair.right)).size).toBe(question.pairs.length);
  });

  it("ô trống", () => {
    expect(answers("lt-4a")).toEqual([215]);
    expect(answers("lt-4b")).toEqual([30]);
    expect(7 * 40).toBe((30 + 10) * 7);
    expect(answers("lt-4c")).toEqual([12]);
    expect(answers("lt-4d")).toEqual([68, 17]);
    expect(17 * 4 * 5).toBe(5 * 68);
    expect(17 * 4 * 5).toBe(20 * 17);
  });
});

describe("suy nghĩ thêm", () => {
  it("5 × 8 × 2 = 80", () => {
    expect(5 * 8 * 2).toBe(80);
    expect(chosen("sn-1")).toContain("80");
  });

  it("phép chia không giao hoán", () => {
    expect(8 / 2).not.toBe(2 / 8);
    expect(chosen("sn-2")).toContain("8 : 2 = 4");
  });

  it("25 × 9 × 4 = 900", () => {
    expect(answers("sn-3")).toEqual([900]);
    expect(25 * 4 * 9).toBe(900);
  });
});

describe("khởi động và câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-bang-nhan")).toEqual([7 * 8, 6 * 9]);
    expect(answers("kd-nhan-tron")).toEqual([30 * 4, 120 * 7]);
    expect(answers("kd-nhan-nham")).toEqual([25 * 4, 2 * 5]);
    expect(answers("thu-giao-hoan")).toEqual([6]);
    expect(answers("thu-ket-hop")).toEqual([4]);
    expect(5 * 4 * 3).toBe(5 * (4 * 3));
    expect(answers("thu-nhom-nham")).toEqual([2 * 7 * 5]);
  });
});
