import type { ChoiceQuestion, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { exerciseGroups, partials, placement, quickChecks, warmUps } from "./bai-tap";

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

  it("nối cặp: rightOrder là hoán vị, không số nào đứng đúng chỗ", () => {
    const question = find("hd-2", "noi-cap") as MatchQuestion;
    expect([...question.rightOrder].sort()).toEqual(question.pairs.map((_, index) => index));
    question.rightOrder.forEach((value, index) => expect(value).not.toBe(index));
    for (const pair of question.pairs) {
      const [a, b] = pair.left.split(" × ").map(Number);
      expect(pair.right).toBe(formatNumber(a * b));
    }
  });

  it("3 câu khởi động và các nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 5],
      ["luyen-tap-1", 8],
      ["luyen-tap-2", 9],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("tích riêng", () => {
  it("34 × 12 = 68 + 340", () => {
    expect(partials(34, 12)).toEqual({ first: 68, second: 340, result: 408 });
  });
  it("first + second luôn bằng a × b", () => {
    for (const [a, b] of [[134, 32], [2021, 36], [87, 23], [506, 27]]) {
      const p = partials(a, b);
      expect(p.first + p.second).toBe(a * b);
    }
  });
});

describe("đặt tính nhân", () => {
  it("đáp án bằng phép nhân", () => {
    const expected: Record<string, [number, number]> = {
      "hd-1a": [65, 28],
      "hd-1b": [152, 34],
      "hd-1c": [3014, 27],
      "lt1-1a": [360, 15],
      "lt1-1b": [58, 37],
      "lt1-1c": [72, 45],
      "lt2-1a": [45, 36],
      "lt2-1b": [73, 18],
      "lt2-1c": [506, 27],
    };
    for (const [id, [a, b]] of Object.entries(expected)) {
      expect(answers(id), id).toEqual([a * b]);
      expect(find(id, "dien-so").parts[0], id).toBe(`${formatNumber(a)} × ${b} =`);
    }
    expect(answers("hd-1a")).toEqual([1820]);
    expect(answers("hd-1b")).toEqual([5168]);
    expect(answers("hd-1c")).toEqual([81378]);
  });

  it("nhân tròn chục: mỗi ô là a × b", () => {
    expect(answers("lt1-2a")).toEqual([35 * 40, 64 * 30, 82 * 60]);
    expect(answers("lt1-2b")).toEqual([150 * 20, 380 * 70, 2400 * 50]);
    expect(answers("lt1-2b")).toEqual([3000, 26600, 120000]);
  });

  it("nối cặp, diện tích, bài toán", () => {
    expect(26 * 15).toBe(390);
    expect(answers("lt1-3a")).toEqual([1040]);
    expect(answers("lt1-3b")).toEqual([840]);
    expect((find("hd-3", "loi-van") as WordQuestion).lines.map(blankAnswers)).toEqual([[720]]);
    expect((find("lt1-4", "loi-van") as WordQuestion).lines.map(blankAnswers)).toEqual([[525000], [480000], [1005000]]);
    expect((find("lt2-3", "loi-van") as WordQuestion).lines.map(blankAnswers)).toEqual([[384], [375], [9]]);
  });

  it("chuỗi × 11 rồi − 275", () => {
    expect(answers("lt2-1d")).toEqual([594, 319]);
  });
});

describe("lùi cột và suy nghĩ thêm", () => {
  it("placement: lùi cột là Đúng, thẳng cột là Sai; tính lại tích", () => {
    expect(chosen("lt2-4a")).toBe("Đúng");
    expect(chosen("lt2-4b")).toBe("Sai");
    expect(72 + 360).toBe(36 * 12);
    expect(72 + 36).not.toBe(36 * 12);
    const wrong = placement("x", 27, 11, false) as ChoiceQuestion;
    expect(wrong.options[wrong.answerIndex]).toBe("Sai");
  });

  it("Nam thẳng cột: 3 × số = 48", () => {
    expect(answers("lt2-4c")).toEqual([16]);
    expect(16 * 2 + 16 * 1).toBe(48);
  });

  it("chọn phép nhân đúng", () => {
    expect(chosen("lt2-2")).toBe("35 × 12 = 420");
    expect(35 * 12).toBe(420);
    expect(35 * 40).not.toBe(2560);
    expect(64 * 12).not.toBe(420);
  });

  it("ước lượng, tích riêng, chữ số tận cùng", () => {
    expect(chosen("sn-1")).toBe("1 000");
    expect(48 * 21).toBe(1008);
    expect(chosen("sn-2")).toBe("860 đơn vị");
    expect(43 * 20).toBe(860);
    expect(chosen("sn-3")).toBe("1");
    expect((37 * 23) % 10).toBe(1);
  });
});

describe("khởi động và câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-mot-chu-so")).toEqual([34 * 2]);
    expect(answers("kd-nhan-10")).toEqual([340]);
    expect(answers("kd-phan-phoi")).toEqual([34 * 10, 34 * 2, 34 * 12]);
    expect(answers("thu-tich-rieng")).toEqual([45 * 3, 45 * 10, 45 * 13]);
    expect(chosen("thu-lui-cot")).toContain("Lùi sang trái");
    expect(answers("thu-tron-chuc")).toEqual([36 * 40]);
  });
});
