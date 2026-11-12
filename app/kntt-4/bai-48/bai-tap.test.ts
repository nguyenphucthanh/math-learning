import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { divClaim, divParts, exerciseGroups, mulClaim, quickChecks } from "./bai-tap";

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

  it("câu trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["nhan-chia-10", 4],
      ["dat-tinh", 6],
      ["tinh-chat", 3],
      ["bai-toan", 3],
      ["dung-sai", 10],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("nhân, chia nhẩm", () => {
  it("với 10, 100, 1 000", () => {
    expect(answers("nh-1a")).toEqual([36475 * 10, 8204 * 100, 5619 * 1000]);
    expect(answers("nh-1a")).toEqual([364750, 820400, 5619000]);
    expect(answers("nh-1b")).toEqual([7245, 48030, 350]);
    expect(724500 / 100).toBe(7245);
    expect(480300 / 10).toBe(48030);
    expect(350000 / 1000).toBe(350);
  });

  it("số tròn chục, tròn trăm", () => {
    expect(answers("nh-2a")).toEqual([50 * 60, 80 * 30, 700 * 20, 600 * 50]);
    expect(answers("nh-2b")).toEqual([20, 4, 8, 60]);
    expect([800 / 40, 2400 / 600, 560 / 70, 42000 / 700]).toEqual([20, 4, 8, 60]);
  });
});

describe("đặt tính", () => {
  it("nhân và chia", () => {
    expect(answers("dt-1a")).toEqual([83406 * 7]);
    expect(answers("dt-1b")).toEqual([Math.floor(52718 / 8), 52718 % 8]);
    expect(answers("dt-1c")).toEqual([3407 * 52]);
    expect(answers("dt-1d")).toEqual([Math.floor(183546 / 36), 183546 % 36]);
    expect(answers("dt-1b")[1]).toBeLessThan(8);
    expect(answers("dt-1d")[1]).toBeLessThan(36);
  });

  it("tìm thành phần chưa biết", () => {
    expect(answers("dt-2a")[0] * 8).toBe(24336);
    expect(answers("dt-2b")[0] / 36).toBe(204);
  });

  it("divParts có dư và không dư", () => {
    expect(blankAnswers(divParts(100, 7))).toEqual([14, 2]);
    expect(blankAnswers(divParts(100, 5))).toEqual([20]);
  });
});

describe("tính thuận tiện", () => {
  it("giao hoán, kết hợp, phân phối", () => {
    expect(answers("tc-1a")).toEqual([250 * 4, 250 * 4 * 36]);
    expect(answers("tc-1a")[1]).toBe(250 * 36 * 4);
    expect(answers("tc-1b")).toEqual([125 * 8, 125 * 24 * 8]);
    expect(answers("tc-2")).toEqual([78 + 22, 78 * 25 + 25 * 22]);
    expect(answers("thu-thuan-tien")[1]).toBe(25 * 36 * 4);
    expect(answers("thu-phan-phoi")[1]).toBe(47 * 8 + 47 * 2);
  });
});

describe("bài toán", () => {
  it("cam, bút chì, trung bình", () => {
    expect(576 % 18).toBe(0);
    expect(wordAnswers("lv-1")).toEqual([[576 / 18], [18 - 11], [(576 / 18) * (18 - 11)]]);
    expect(wordAnswers("lv-1")[2]).toEqual([224]);
    expect(wordAnswers("lv-2")).toEqual([[54 / 9], [Math.floor(500 / 6), 500 % 6]]);
    expect(wordAnswers("lv-3")).toEqual([[180], [210], [(30 + 36 * 5) / 6]]);
    expect(wordAnswers("lv-3")[2]).toEqual([35]);
  });
});

describe("đúng sai và chọn đáp án", () => {
  it("phép tính đã cho", () => {
    expect(chosen("ds-1a")).toBe("Đúng");
    expect(128305 * 3).toBe(384915);
    expect(chosen("ds-1b")).toBe("Sai");
    expect(3214 * 53).not.toBe(33442);
    expect(chosen("ds-1c")).toBe("Đúng");
    expect(2172 * 25 + 20).toBe(54320);
    expect(chosen("ds-1d")).toBe("Sai");
    expect(45).toBeGreaterThanOrEqual(25);
    expect((mulClaim("x", 12, 12, 144) as ChoiceQuestion).answerIndex).toBe(0);
    expect((divClaim("y", 10, 3, 3, 1) as ChoiceQuestion).answerIndex).toBe(0);
  });

  it("hai mảnh vườn 18 × 8 và cạnh 13", () => {
    expect((18 + 8) * 2).toBe(13 * 4);
    expect(18 * 8).toBeLessThan(13 * 13);
    expect(chosen("ds-2a")).toBe("Đúng");
    expect(chosen("ds-2b")).toBe("Sai");
    expect(chosen("ds-2c")).toBe("Đúng");
  });

  it("cửa lớn nhất", () => {
    const kq = [540000 / 9, 2500 * 30, 784000 / 80, 600 * 90];
    expect(chosen("ds-3")).toBe(`Cửa ${"ABCD"[kq.indexOf(Math.max(...kq))]}`);
    expect(chosen("ds-3")).toBe("Cửa B");
  });

  it("số lẻ", () => {
    const odd = (value: number) => value % 2 === 1;
    expect([45 * 30, 12000 / 1000, 305 * 17, 900900 / 30].map(odd)).toEqual([false, false, true, false]);
    expect(chosen("ds-4")).toBe("305 × 17");
    expect(answers("ds-5")).toEqual([[36 * 25, 17 * 13, 1500 / 50, 40404 / 4, 3000 * 7, 85 * 11].filter(odd).length]);
    expect(answers("ds-5")).toHaveLength(1);
    expect(answers("ds-5")).toEqual([3]);
  });
});

describe("suy nghĩ thêm", () => {
  it("ước lượng, chữ số của thương, số dư lớn nhất", () => {
    expect(chosen("sn-1")).toBe("30 000");
    expect(612 * 49).toBeGreaterThan(20000);
    expect(612 * 49).toBeLessThan(40000);
    expect(chosen("sn-2")).toBe("4 chữ số");
    expect(String(Math.floor(98765 / 25))).toHaveLength(4);
    const [r, a] = answers("sn-3");
    expect(r).toBe(36 - 1);
    expect(a).toBe(19 * 36 + r);
    expect(Math.floor(a / 36)).toBe(19);
    expect(a % 36).toBe(35);
  });
});

describe("câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("thu-nhan-10")).toEqual([4752 * 100]);
    expect(answers("thu-chia-10")).toEqual([360000 / 1000]);
    expect(answers("thu-tron-chuc")).toEqual([500 * 60]);
    expect(answers("thu-chia-tron-chuc")).toEqual([3200 / 80]);
    expect(chosen("thu-lui-cot")).toContain("Lùi");
    expect(chosen("thu-du")).toBe("Dư 7");
    expect(215 * 3 * 10).toBe(6450);
  });
});
