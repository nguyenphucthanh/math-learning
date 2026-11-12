import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, unitValue, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const lineAnswers = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (q?.kind !== "loi-van") throw new Error(id);
  return q.lines.map((line) => blanks(line)[0]);
};
const fill = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (q?.kind !== "dien-so") throw new Error(id);
  return blanks(q.parts);
};
const chosen = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (q?.kind !== "trac-nghiem") throw new Error(id);
  return q.options[q.answerIndex];
};

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("unitValue ném lỗi khi không chia hết", () => {
    expect(() => unitValue(10, 3)).toThrow();
  });

  it("khởi động", () => {
    expect(fill("kd-chia")).toEqual([42 / 6]);
    expect(fill("kd-nhan")).toEqual([7 * 4]);
    expect(fill("kd-chia-2")).toEqual([24 / 3]);
  });

  it("câu thử", () => {
    expect(lineAnswers("thu-dang-1")).toEqual([28 / 4, (28 / 4) * 3]);
    expect(lineAnswers("thu-dang-2")).toEqual([24 / 4, 18 / (24 / 4)]);
    expect(chosen("thu-chon-phep")).toBe("7 × 4");
  });

  it("hoạt động: dạng 1 (chia rồi nhân)", () => {
    expect(lineAnswers("hd-1")).toEqual([3, 9]);
    expect(lineAnswers("hd-2")).toEqual([12, 48]);
    expect(fill("hd-3")).toEqual([12000 / 3, (12000 / 3) * 5]);
  });

  it("hoạt động: dạng 2 (chia rồi chia)", () => {
    expect(lineAnswers("hd-4")).toEqual([8000, 3]);
    expect(lineAnswers("hd-5")).toEqual([5, 4]);
  });

  it("luyện tập", () => {
    expect(lineAnswers("lt-1")).toEqual([4, 5]);
    // que: 40 : 4 = 10 cm; số que đếm theo ảnh SGK: 3, 6, 7
    expect(lineAnswers("lt-2")).toEqual([10, 30, 60, 70]);
    expect(chosen("lt-3")).toBe("15 : 3");
  });

  it("suy nghĩ thêm: ước lượng khớp phép tính", () => {
    expect((48 / 8) * 5).toBeLessThan(48);
    expect(chosen("sn-1")).toBe("Ít hơn 48");
    expect(12 / (18 / 6)).toBeLessThan(6);
    expect(chosen("sn-2")).toBe("Ít hơn 6 can");
    expect(chosen("sn-3")).toContain("Sai");
    expect(12 / (18 / 6)).not.toBe(12 / 6);
  });
});
