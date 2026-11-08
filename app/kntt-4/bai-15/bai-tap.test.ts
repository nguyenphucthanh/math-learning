import type { Part, Question } from "@/components/exercises/types";
import { parseAnswer } from "@/lib/area-units";
import { compareNumbers, withoutOneCard } from "@/lib/so-sanh";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: Part[]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const linesOf = (id: string) => find(id, "loi-van").lines;
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const digitsOf = (value: number) => String(value).split("").map(Number);
const flat = (text: string) => text.replace(/ /g, " ");

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
      ["day-so-tu-nhien", 6],
      ["lien-truoc-sau", 3],
      ["the-so", 1],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("khởi động và câu thử", () => {
  it("đếm, liền sau, số lớn nhất ba chữ số", () => {
    expect(blankAnswers(find("kd-dem", "dien-so").parts)).toEqual([6 + 2]);
    expect(blankAnswers(find("kd-sau", "dien-so").parts)).toEqual([99 + 1]);
    expect(blankAnswers(find("kd-lon", "dien-so").parts)).toEqual([Math.max(...Array.from({ length: 900 }, (_, index) => 100 + index))]);
  });

  it("liền sau và liền trước tính lại bằng phép cộng, trừ", () => {
    expect(blankAnswers(find("thu-sau", "dien-so").parts)).toEqual([9999 + 1]);
    expect(blankAnswers(find("thu-truoc", "dien-so").parts)).toEqual([10000 - 1]);
  });

  it("số bé nhất là 0, không có số lớn nhất, 0 không có liền trước", () => {
    expect(chosen("thu-be-nhat")).toBe("0");
    expect(chosen("thu-lon-nhat")).toContain("thêm 1 luôn được số lớn hơn");
    expect(chosen("thu-khong")).toContain("Không có");
  });

  it("dãy 5, 10, 15, 20, ?, ?", () => {
    expect(blankAnswers(find("thu-quy-luat", "dien-so").parts)).toEqual([25, 30]);
    expect(25 - 20).toBe(5);
  });
});

describe("Đúng/Sai", () => {
  it("dt-1: số 5 tỉ không phải số tự nhiên lớn nhất vì thêm 1 được số lớn hơn", () => {
    expect(chosen("dt-1")).toBe("Sai");
    expect(5000000001 > 5000000000).toBe(true);
  });

  it("dt-2: 0 là số tự nhiên; dt-3: dãy bắt đầu từ 2 không phải dãy số tự nhiên", () => {
    expect(chosen("dt-2")).toBe("Đúng");
    expect(chosen("dt-3")).toBe("Sai");
  });

  it("dt-4: liền sau hơn liền trước 2 đơn vị, với mọi số thử", () => {
    for (const value of [1, 7, 85, 9999, 10000, 999999]) expect(value + 1 - (value - 1)).toBe(2);
    expect(chosen("dt-4")).toBe("Đúng");
  });
});

describe("số liền trước, số liền sau", () => {
  it("dt-5: số liền trước", () => {
    const given = [270, 3000, 54321, 1000000];
    const answers = linesOf("dt-5").flatMap(blankAnswers);
    expect(answers).toEqual(given.map((value) => value - 1));
    for (const [index, answer] of answers.entries()) expect(answer + 1).toBe(given[index]);
  });

  it("lt-1: số liền sau", () => {
    const given = [38, 99, 8999, 999999];
    expect(linesOf("lt-1").flatMap(blankAnswers)).toEqual(given.map((value) => value + 1));
  });

  it("lt-2: ba số liên tiếp", () => {
    const [a, b, c] = linesOf("lt-2");
    expect([24, 25, ...blankAnswers(a)]).toEqual([24, 25, 26]);
    expect([1998, ...blankAnswers(b), 2000]).toEqual([1998, 1999, 2000]);
    expect([...blankAnswers(c).slice(0, 1), 1000000, ...blankAnswers(c).slice(1)]).toEqual([999999, 1000000, 1000001]);
  });

  it("st-2: số liền trước của 40 000", () => {
    expect(parseAnswer(chosen("st-2"))).toBe(40000 - 1);
  });
});

describe("dãy số có quy luật (lt-3)", () => {
  it("mỗi dãy có hiệu cố định và các số điền khớp", () => {
    const given = [[2021, 2022, 2023], [3, 6, 9, 12], [10, 20, 30, 40], [7, 9, 11, 13]];
    const lines = linesOf("lt-3");
    expect(lines).toHaveLength(4);
    lines.forEach((line, index) => {
      const full = [...given[index], ...blankAnswers(line)];
      const diff = full[1] - full[0];
      full.forEach((value, position) => position > 0 && expect(value - full[position - 1], `dãy ${index}`).toBe(diff));
      expect(blankAnswers(line)).toHaveLength(3);
    });
    expect(lines.map((line) => blankAnswers(line))).toEqual([[2024, 2025, 2026], [15, 18, 21], [50, 60, 70], [15, 17, 19]]);
  });

  it("st-4: số thứ 10 của dãy 5, 10, 15, … tính lại bằng vòng lặp", () => {
    let value = 5;
    for (let count = 1; count < 10; count += 1) value += 5;
    expect(blankAnswers(find("st-4", "dien-so").parts)).toEqual([value]);
  });

  it("st-1: đếm số tự nhiên từ 98 đến 104", () => {
    const all: number[] = [];
    for (let value = 98; value <= 104; value += 1) all.push(value);
    expect(blankAnswers(find("st-1", "dien-so").parts)).toEqual([all.length]);
  });
});

describe("sắp xếp (dt-6)", () => {
  it("các số tăng dần và đúng tập số trong đề", () => {
    const answers = blankAnswers(find("dt-6", "dien-so").parts);
    expect([...answers].sort((a, b) => a - b)).toEqual(answers);
    expect(answers.slice().sort((a, b) => a - b)).toEqual([100000, 99990, 99909, 100100].sort((a, b) => a - b));
    for (let index = 1; index < answers.length; index += 1) expect(compareNumbers(answers[index - 1], answers[index]).sign).toBe("<");
  });
});

describe("lấy ra một tấm thẻ (th-1)", () => {
  it("thử bỏ từng thẻ: lớn nhất và bé nhất sáu chữ số", () => {
    const cards = digitsOf(2604713);
    const options: number[] = [];
    for (const rest of withoutOneCard(cards)) {
      // Thử mọi cách xếp sáu thẻ còn lại, bỏ cách có chữ số 0 đứng đầu.
      const walk = (left: number[], used: number[]) => {
        if (left.length === 0) return void (used[0] !== 0 && options.push(Number(used.join(""))));
        left.forEach((digit, index) => walk(left.filter((_, other) => other !== index), [...used, digit]));
      };
      walk(rest, []);
    }
    expect(blankAnswers(find("th-1", "dien-so").parts)).toEqual([Math.max(...options), Math.min(...options)]);
  });

  it("câu sách LT4: thẻ 1, 9, 5, 1, 8, 9, 0 cho 998 511 và 101 589", () => {
    const cards = [1, 9, 5, 1, 8, 9, 0];
    const options: number[] = [];
    for (const rest of withoutOneCard(cards)) {
      const walk = (left: number[], used: number[]) => {
        if (left.length === 0) return void (used[0] !== 0 && options.push(Number(used.join(""))));
        left.forEach((digit, index) => walk(left.filter((_, other) => other !== index), [...used, digit]));
      };
      walk(rest, []);
    }
    expect(Math.max(...options)).toBe(998511);
    expect(Math.min(...options)).toBe(101589);
  });
});

describe("câu st-3", () => {
  it("thêm 1 vào 10^12 được số lớn hơn", () => {
    expect(10 ** 12 + 1 > 10 ** 12).toBe(true);
    expect(flat(chosen("st-3"))).toContain("thêm 1 vào số đó luôn được số lớn hơn");
  });
});

describe("đáp án trong sách SGK trang 50-51", () => {
  it("liền trước, liền sau, sắp xếp", () => {
    expect([81, 1991, 2045, 10000].map((value) => value - 1)).toEqual([80, 1990, 2044, 9999]);
    expect([19, 200, 85, 9999].map((value) => value + 1)).toEqual([20, 201, 86, 10000]);
    expect([10001, 9999, 9666, 9998].sort((a, b) => a - b)).toEqual([9666, 9998, 9999, 10001]);
  });

  it("ba số liên tiếp và dãy", () => {
    expect([6, 7, 6 + 2]).toEqual([6, 7, 8]);
    expect([98, 98 + 1, 100]).toEqual([98, 99, 100]);
    expect([100000 - 1, 100000, 100000 + 1]).toEqual([99999, 100000, 100001]);
    expect([1972 + 1, 1972 + 2, 1972 + 3]).toEqual([1973, 1974, 1975]);
    expect([8 + 2, 8 + 4, 8 + 6]).toEqual([10, 12, 14]);
    expect([9 + 2, 9 + 4, 9 + 6]).toEqual([11, 13, 15]);
    expect([25 + 5, 25 + 10, 25 + 15]).toEqual([30, 35, 40]);
  });
});

