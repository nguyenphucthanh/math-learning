import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { div, exerciseGroups, quickChecks, stories, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lineAnswers = (question: WordQuestion) => question.lines.flatMap((line) => blankAnswers(line));
const words = (id: string) => lineAnswers(find(id, "loi-van"));
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

  it("3 câu khởi động và 3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["kham-pha-hoat-dong", 3],
      ["luyen-tap", 5],
      ["suy-nghi-them", 3],
    ]);
  });

  it("câu lời văn nào cũng đúng ba dòng, trừ các câu thử", () => {
    for (const group of exerciseGroups) {
      for (const question of group.questions) {
        if (question.kind === "loi-van") expect(question.lines, question.id).toHaveLength(3);
      }
    }
  });

  it("phép chia trong bài tập chia hết", () => {
    expect(() => div(72, 8)).not.toThrow();
    expect(() => div(35, 8)).toThrow();
  });
});

describe("khám phá và hoạt động", () => {
  it("hd-trong-cay: 50, hơn 15, ít hơn 8", () => {
    const two = 50 + 15;
    const three = two - 8;
    expect(words("hd-trong-cay")).toEqual([two, three, 50 + two + three]);
    expect(words("hd-trong-cay")).toEqual([65, 57, 172]);
  });

  it("hd-mua-do: 4 × 15 000 và 3 × 6 000", () => {
    expect(words("hd-mua-do")).toEqual([4 * 15000, 3 * 6000, 4 * 15000 + 3 * 6000]);
    expect(words("hd-mua-do").at(-1)).toBe(78000);
  });

  it("hd-tui: 72 : 8 và 35 : 5, túi cam nhiều hơn 2", () => {
    expect(words("hd-tui")).toEqual([72 / 8, 35 / 5, 72 / 8 - 35 / 5]);
    expect(72 % 8).toBe(0);
    expect(35 % 5).toBe(0);
    expect(72 / 8 > 35 / 5).toBe(true);
  });
});

describe("luyện tập", () => {
  it("lt-ga: cả hai bác so với bác Hoa", () => {
    const mai = 1500 - 400;
    const lan = 1500 + 600;
    expect(words("lt-ga")).toEqual([mai, lan, 1500 + mai + lan]);
    expect(words("lt-ga").at(-1)).toBe(4700);
  });

  it("lt-dau: gấp đôi, tổng đã bán, còn lại", () => {
    const second = 35 * 2;
    const sold = 35 + second + 45;
    expect(words("lt-dau")).toEqual([second, sold, 200 - sold]);
    expect(words("lt-dau").at(-1)).toBe(50);
  });

  it("lt-quat: hơn liên tiếp rồi cộng", () => {
    const tue = 18 + 7;
    const wed = tue + 12;
    expect(words("lt-quat")).toEqual([tue, wed, 18 + tue + wed]);
    expect(words("lt-quat").at(-1)).toBe(80);
  });

  it("lt-de-chon: chọn đề có gấp đôi và lê nhiều hơn cam", () => {
    expect(chosen("lt-de-chon")).toContain("gấp đôi");
    expect(chosen("lt-de-chon")).toContain("nhiều hơn số cam");
    for (const option of find("lt-de-chon", "trac-nghiem").options) {
      expect(option).toContain("15 quả táo");
    }
  });

  it("lt-de-giai: cam 30, lê 38, cả ba 83", () => {
    expect(words("lt-de-giai")).toEqual([15 * 2, 15 * 2 + 8, 15 + 30 + 38]);
    expect(words("lt-de-giai").at(-1)).toBe(83);
  });

  it("số liệu bài toán khớp với bảng stories", () => {
    expect(stories.dau).toEqual({ all: 200, first: 35, third: 45 });
    expect(stories.sodo).toEqual({ apple: 15, pearMore: 8 });
  });
});

describe("suy nghĩ thêm", () => {
  it("st-tim-loi: tổ Ba là 42, không phải 36", () => {
    expect(40 + 6 - 4).toBe(42);
    expect(40 - 4).toBe(36);
    expect(chosen("st-tim-loi")).toContain("tổ Hai");
  });

  it("st-tim-truoc: ngày thứ Ba 40, ngày thứ Tư 25", () => {
    expect(answers("st-tim-truoc")).toEqual([20 * 2, 20 * 2 - 15]);
  });

  it("st-hop-ly: còn lại không thể nhiều hơn lúc đầu", () => {
    expect(250 > 200).toBe(true);
    expect(chosen("st-hop-ly")).toContain("nhiều hơn số lít lúc đầu");
  });
});

describe("khởi động và câu thử", () => {
  it("khởi động", () => {
    expect(answers("kd-hon")).toEqual([45 + 15]);
    expect(answers("kd-nhan")).toEqual([6 * 5000]);
    expect(answers("kd-chia")).toEqual([54 / 6]);
  });

  it("thu-ba-doi: 50, 60, 55", () => {
    expect(words("thu-ba-doi")).toEqual([50 + 10, 50 + 10 - 5]);
  });

  it("thu-viet-bai: cúc 40, lan 35, cả ba 105", () => {
    expect(words("thu-viet-bai")).toEqual([30 + 10, 30 + 10 - 5, 30 + 40 + 35]);
  });

  it("thu-con-lai: 40, 60, 40", () => {
    expect(words("thu-con-lai")).toEqual([20 * 2, 20 + 20 * 2, 100 - 60]);
  });

  it("thu-buoc-cuoi: lấy số lớn trừ số bé", () => {
    expect(chosen("thu-buoc-cuoi")).toBe("Lấy số lớn trừ số bé");
  });
});
