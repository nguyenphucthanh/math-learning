import type { FillQuestion, Question } from "@/components/exercises/types";
import { parseAnswer } from "@/lib/area-units";
import { digitAt, hangName, lopName } from "@/lib/hang-lop";
import { roundToPlace } from "@/lib/round-numbers";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, roundings, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const num = (text: string) => parseAnswer(text.replace(/[^\d\s .,]/g, ""))!;

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
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      question.rightOrder.forEach((value, index) => expect(value, question.id).not.toBe(index));
    }
  });

  it("3 câu khởi động và 3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["tram-nghin", 6],
      ["chuc-nghin", 7],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án làm tròn tính lại bằng roundToPlace", () => {
  it("mọi câu làm tròn đều đúng", () => {
    expect(roundings).toHaveLength(17);
    for (const { id, value, position, answer, blank = 0 } of roundings) {
      expect(roundToPlace(value, position), `${id}: ${value}`).toBe(answer);
      const question = questions.find((item) => item.id === id)!;
      const given =
        question.kind === "dien-so"
          ? blankAnswers(question.parts)
          : question.kind === "loi-van"
            ? question.lines.flatMap(blankAnswers)
            : [];
      expect(given[blank], `${id} ô ${blank}`).toBe(answer);
    }
  });

  it("câu trong sách SGK trang 45-46 đúng với quy tắc", () => {
    const sgk: [number, number, number][] = [
      [18490000, 5, 18500000],
      [2125000, 5, 2100000],
      [2890000, 5, 2900000],
      [189835388, 4, 189840000],
      [5122381, 4, 5120000],
      [531278000, 4, 531280000],
      [3121023, 5, 3100000],
      [3272353, 5, 3300000],
      [3386097, 5, 3400000],
      [3254964, 5, 3300000],
      [1167900, 5, 1200000],
      [1916800, 5, 1900000],
      [3365200, 5, 3400000],
    ];
    for (const [value, position, answer] of sgk) expect(roundToPlace(value, position)).toBe(answer);
    const options = [149000, 190001, 250001, 284910];
    expect(options.filter((value) => roundToPlace(value, 5) === 200000)).toEqual([190001]);
  });
});

describe("khởi động và câu thử", () => {
  it("hàng của chữ số 7 và dãy đếm", () => {
    expect(chosen("kd-hang")).toBe(hangName(5).replace(/^h/, "H"));
    expect(digitAt(2712615, 5)).toBe(7);
    expect(blankAnswers((find("kd-dem", "dien-so")).parts)).toEqual([200000 + 100000]);
  });

  it("tia số: 5 280 000 gần 5 300 000 hơn", () => {
    expect(num(chosen("thu-tia"))).toBe(5300000);
    expect(5300000 - 5280000).toBeLessThan(5280000 - 5200000);
  });

  it("4 350 000 làm tròn lên 4 400 000", () => {
    expect(num(chosen("thu-bang-5"))).toBe(roundToPlace(4350000, 5));
  });
});

describe("hàng và lớp của chữ số 5", () => {
  const cases: [string, number][] = [
    ["cn-1", 25640713],
    ["cn-2", 4305120],
    ["cn-3", 512806000],
  ];
  it.each(cases)("%s: %i", (id, value) => {
    const position = String(value).split("").reverse().indexOf("5");
    const expected = `${hangName(position)}, ${lopName(position)}`.replace(/^h/, "H");
    expect(chosen(id)).toBe(expected);
  });
});

describe("câu trắc nghiệm làm tròn", () => {
  it("tn-6: chỉ một số làm tròn được ba trăm nghìn", () => {
    const question = find("tn-6", "trac-nghiem");
    const matches = question.options.filter((option) => roundToPlace(num(option), 5) === 300000);
    expect(matches).toEqual([question.options[question.answerIndex]]);
  });

  it("tn-5: số dân nối đúng với số làm tròn", () => {
    const question = find("tn-5", "noi-cap");
    for (const pair of question.pairs) expect(roundToPlace(num(pair.left.split(":")[1]), 5)).toBe(num(pair.right));
  });

  it("st-1: nếu 3 450 000 thì phải làm tròn lên 3 500 000", () => {
    expect(roundToPlace(3450000, 5)).toBe(3500000);
    expect(chosen("st-1")).toContain("3 500 000");
  });

  it("st-3: 1 960 000 làm tròn thành 2 000 000", () => {
    expect(num(chosen("st-3"))).toBe(roundToPlace(1960000, 5));
  });

  it("st-4: chỉ làm tròn đến hàng trăm nghìn mới ra 3 200 000", () => {
    const hangs = ["Hàng nghìn", "Hàng chục nghìn", "Hàng trăm nghìn", "Hàng triệu"];
    const question = find("st-4", "trac-nghiem");
    expect(question.options).toEqual(hangs);
    const matches = hangs.filter((_, index) => roundToPlace(3248000, index + 3) === 3200000);
    expect(matches).toEqual([chosen("st-4")]);
  });
});

describe("số bé nhất và lớn nhất làm tròn được 500 000 (st-2)", () => {
  it("duyệt từng số để kiểm tra", () => {
    const [smallest, largest] = blankAnswers(find("st-2", "dien-so").parts);
    const all: number[] = [];
    for (let value = 300000; value <= 700000; value += 1) if (roundToPlace(value, 5) === 500000) all.push(value);
    expect(Math.min(...all)).toBe(smallest);
    expect(Math.max(...all)).toBe(largest);
  });
});
