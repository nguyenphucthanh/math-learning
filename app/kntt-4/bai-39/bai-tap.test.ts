import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { columnDiv } from "@/lib/column-div";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, trueFalse, warmUps } from "./bai-tap";

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
const qr = (a: number, b: number) => (a % b ? [Math.floor(a / b), a % b] : [a / b]);

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

  it("3 câu khởi động và 3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 7],
      ["luyen-tap", 7],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đặt tính chia", () => {
  it("đáp án (thương, dư) tính lại bằng phép chia và thử lại bằng phép nhân", () => {
    const expected: Record<string, [number, number]> = {
      "hd-1a": [47235, 3],
      "hd-1b": [538412, 4],
      "hd-1c": [693508, 7],
      "lt-1a": [586240, 8],
      "lt-1b": [761904, 6],
      "lt-1c": [412905, 6],
    };
    for (const [id, [a, b]] of Object.entries(expected)) {
      const result = answers(id);
      expect(result, id).toEqual(qr(a, b));
      expect(result[0] * b + (result[1] ?? 0), id).toBe(a);
      expect(result[1] ?? 0, id).toBeLessThan(b);
      expect(columnDiv(a, b).quotient, id).toBe(result[0]);
    }
    expect(answers("hd-1c")).toEqual([99072, 4]);
  });

  it("có phép chia dư và có thương chứa chữ số 0", () => {
    expect(answers("hd-1c")).toHaveLength(2);
    expect(String(answers("lt-1a")[0])).toContain("0");
  });
});

describe("Đúng, sai", () => {
  it("đáp án tính lại từ phép chia", () => {
    expect(chosen("hd-2a")).toBe("Sai"); // 28 035 : 6 = 4 672 dư 3
    expect(Math.floor(28035 / 6)).toBe(4672);
    expect(chosen("hd-2b")).toBe("Sai"); // thiếu chữ số 0
    expect(124806 / 6).toBe(20801);
    expect(chosen("hd-2c")).toBe("Đúng");
    expect([Math.floor(90546 / 9), 90546 % 9]).toEqual([10060, 6]);
  });

  it("trueFalse: kết quả đúng thì chọn Đúng, sai thì Sai", () => {
    const right = trueFalse("x", 17, 5, 3, 2) as ChoiceQuestion;
    const wrong = trueFalse("y", 17, 5, 3, 7) as ChoiceQuestion;
    expect(right.options[right.answerIndex]).toBe("Đúng");
    expect(wrong.options[wrong.answerIndex]).toBe("Sai");
  });
});

describe("bài toán", () => {
  it("thịt: trừ rồi chia", () => {
    const question = find("hd-3", "loi-van") as WordQuestion;
    expect(question.lines.map(blankAnswers)).toEqual([[300000 - 45000], [(300000 - 45000) / 3]]);
    expect((300000 - 45000) % 3).toBe(0);
    expect((300000 - 45000) / 3).toBe(85000);
  });

  it("tổng và hiệu", () => {
    const [big, small] = answers("lt-2");
    expect(big + small).toBe(52600);
    expect(big - small).toBe(6800);
  });

  it("hộp bút: thương là thùng, dư là hộp thừa", () => {
    const [boxes, left] = answers("lt-3");
    expect(boxes * 6 + left).toBe(513428);
    expect(left).toBeLessThan(6);
  });

  it("chị Lan: chia 6 phần rồi bớt một phần", () => {
    expect(360000 - 360000 / 6).toBe(300000);
    expect(chosen("lt-4")).toBe(`${formatNumber(300000)} đồng`);
  });

  it("cầu 15 tấn: chỉ xe C nhẹ hơn 15 000 kg", () => {
    const weights = [61000 / 4, 98400 / 6, 112560 / 8];
    expect(weights.map((weight) => weight <= 15000)).toEqual([false, false, true]);
    expect(chosen("lt-5")).toBe("Xe C: 112 560 : 8");
  });
});

describe("khởi động và câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-bang-chia")).toEqual([56 / 7, 42 / 6]);
    expect(answers("kd-chia-du")).toEqual(qr(38, 5));
    expect(answers("kd-chia-0")).toEqual([7280 / 8]);
    expect(answers("thu-chia-deu")).toEqual([84000 / 3]);
    expect(answers("thu-du")).toEqual(qr(94817, 4));
    expect(answers("thu-chu-so-khong")).toEqual([48072 / 8]);
    expect(48072 / 8).toBe(6009);
  });
});

describe("suy nghĩ thêm", () => {
  it("Nam thiếu chữ số 0: 24 036 : 4 = 6 009", () => {
    expect(24036 / 4).toBe(6009);
    expect(chosen("sn-1")).toContain("6 009");
  });

  it("ước lượng: 412 905 : 6 gần 68 000", () => {
    const real = 412905 / 6;
    expect(chosen("sn-2")).toBe("68 000");
    for (const option of [6800, 680000]) expect(Math.abs(real - option)).toBeGreaterThan(Math.abs(real - 68000));
  });

  it("số dư không thể là 8 khi chia cho 8", () => {
    expect(chosen("sn-3")).toBe("8");
    expect(Array.from({ length: 200 }, (_, i) => i % 8).every((r) => r < 8)).toBe(true);
  });
});
