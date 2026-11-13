import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { divisionPairs, doanThang, duDoan, exerciseGroups, gao, nuoc, quickChecks, readings, ruot, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

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
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("nối cặp: rightOrder là hoán vị, không số nào đứng đúng chỗ", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, i) => i));
      question.rightOrder.forEach((value, index) => expect(value, question.id).not.toBe(index));
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["viet-thuong", 4],
      ["so-tu-nhien", 7],
      ["bai-toan", 7],
      ["doan-thang", 4],
      ["suy-nghi-them", 5],
    ]);
  });
});

describe("viết thương thành phân số: tử số là số bị chia, mẫu số là số chia", () => {
  it("mọi ô điền dạng a : b = ?/? khớp phép chia trong đề", () => {
    for (const question of questions) {
      if (question.kind !== "dien-so") continue;
      const text = question.parts.filter((p): p is string => typeof p === "string").join(" ");
      const matches = [...text.matchAll(/(\d+) : (\d+) =/g)];
      const nums = blankAnswers(question.parts);
      if (!matches.length || !/\/ ?[^]*$/.test(text) || question.id.startsWith("thu-ad")) continue;
      matches.forEach((match, i) => {
        const [a, b] = [Number(match[1]), Number(match[2])];
        const start = i * (nums.length / matches.length);
        expect(nums[start], question.id).toBe(a);
        expect(nums[start + 1], question.id).toBe(b);
        if (nums.length / matches.length === 3) expect(nums[start + 2], question.id).toBe(Math.floor(a / b));
      });
    }
  });

  it("phép chia hết: kết quả là số tự nhiên bằng phép chia nguyên", () => {
    for (const [id, a, b] of [["tn-1", 48, 16], ["tn-2", 35, 7], ["tn-3", 29, 29], ["tn-4", 0, 8], ["thu-24", 24, 24]] as const) {
      expect(a % b, id).toBe(0);
      expect(answers(id)).toEqual([a, b, a / b]);
    }
    expect(34 / 17).toBe(2);
    expect(20 / 5).toBe(4);
    expect(42 / 42).toBe(1);
    expect(0 / 6).toBe(0);
  });

  it("số tự nhiên viết thành phân số mẫu số 1", () => {
    for (const [id, a] of [["tn-5", 25], ["tn-6", 63], ["tn-7", 0], ["thu-40", 40]] as const) expect(answers(id)).toEqual([a, 1]);
  });

  it("các phép chia viết thương thành phân số", () => {
    expect(answers("th-1")).toEqual([8, 15, 27, 40]);
    expect(answers("th-2")).toEqual([19, 6, 53, 12]);
    expect(answers("th-3")).toEqual([14, 25, 3, 100]);
    expect(answers("th-4")).toEqual([64, 9]);
    expect(answers("thu-2-3")).toEqual([2, 3]);
    expect(answers("kd-1")).toEqual([3, 4]);
  });
});

describe("bài toán và số đo", () => {
  it("trắc nghiệm chia đều", () => {
    expect(chosen("bt-1")).toBe("3/4 thùng");
    expect(chosen("bt-2")).toBe("4/3 cái bánh");
    expect(chosen("thu-7-5")).toBe("7/5 cái bánh");
  });

  it("nối phép chia với phân số", () => {
    for (const pair of divisionPairs) {
      const [a, b] = pair.left.split(" : ").map(Number);
      expect(pair.right).toBe(`${a}/${b}`);
    }
  });

  it("nối cách đọc với số đo", () => {
    expect(readings.map((r) => r.value)).toEqual(["2/3 kg", "5/8 m²", "6/5 tấn", "7/10 l"]);
  });

  it("lời văn: cân gạo và rót nước", () => {
    const total = gao.weights.reduce((a, b) => a + b, 0);
    expect(total).toBe(5);
    expect(wordAnswers("bt-5")).toEqual([[total], [total, gao.bags]]);
    expect(wordAnswers("bt-6")).toEqual([[nuoc.liters, nuoc.cups]]);
    expect(wordAnswers("bt-7")).toEqual([[ruot.liters, ruot.cups]]);
    expect(nuoc.liters).toBeGreaterThan(nuoc.cups);
    expect(ruot.liters).toBeLessThan(ruot.cups);
    expect(2 + 5).toBe(7);
  });

  it("đoạn thẳng: đếm đoạn, không đếm điểm", () => {
    const parts = doanThang.labels.length - 1;
    expect(parts).toBe(6);
    const at = (name: string) => doanThang.labels.indexOf(name);
    expect(answers("dt-1")).toEqual([at("D"), parts]);
    expect(answers("dt-2")).toEqual([at("G"), parts]);
    expect(answers("dt-3")).toEqual([at("H"), parts]);
    expect(answers("dt-4")).toEqual([at("E"), parts]);
    expect(answers("thu-ad")).toEqual([at("D"), parts]);
  });
});

describe("suy nghĩ thêm", () => {
  it("hơn hay kém 1 theo tử số và mẫu số", () => {
    for (const item of duDoan) {
      const answer = chosen(item.id);
      expect(answer, item.id).toBe(item.cakes < item.friends ? "Ít hơn 1 cái" : "Nhiều hơn 1 cái");
    }
  });
});
