import { blanksOf } from "@/components/exercises/dat-tinh-form";
import type { DatTinhQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const lineAnswers = (question: WordQuestion) => question.lines.map((line) => blankAnswers(line));
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const datTinhQuestions = questions.filter((question): question is DatTinhQuestion => question.kind === "dat-tinh");

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

  it("đúng 3 câu khởi động và 18 câu bài tập chia ba nhóm", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.title, group.questions.length])).toEqual([
      ["Hoạt động", 6],
      ["Luyện tập", 9],
      ["Suy nghĩ thêm", 3],
    ]);
  });
});

describe("câu đặt tính (phép trừ)", () => {
  it("mọi câu đặt tính đều là phép trừ, số bị trừ không nhỏ hơn số trừ, hiệu cùng số chữ số với số bị trừ", () => {
    expect(datTinhQuestions.length).toBeGreaterThanOrEqual(5);
    for (const question of datTinhQuestions) {
      expect(question.op, question.id).toBe("-");
      expect(question.a, question.id).toBeGreaterThanOrEqual(question.b);
      expect(String(question.a - question.b).length, question.id).toBe(String(question.a).length);
    }
  });

  it("không có ô trống chỉ định thì con điền cả hiệu, đúng bằng a − b", () => {
    for (const question of datTinhQuestions.filter((item) => !item.hide)) {
      const blanks = blanksOf(question);
      const typed = Number(blanks.map((blank) => blank.answer).reverse().join(""));
      expect(typed, question.id).toBe(question.a - question.b);
    }
  });

  it("lời giải của câu đặt tính nêu đúng hiệu", () => {
    for (const question of datTinhQuestions.filter((item) => !item.hide)) {
      expect(question.explanation, question.id).toContain(formatNumber(question.a - question.b));
    }
  });

  it("câu có đặt tính thường: đúng các số đã định", () => {
    const expected: Record<string, number> = {
      "qc-khong-nho": 551122,
      "qc-co-nho": 436278,
      "qc-so-tru-ngan": 48865,
      "hd-1a": 41223,
      "hd-1b": 432443,
      "hd-1c": 544815,
    };
    for (const [id, result] of Object.entries(expected)) {
      const question = find(id, "dat-tinh");
      expect(question.a - question.b, id).toBe(result);
    }
  });

  it("câu tìm chữ số thiếu có đúng một nghiệm, và đó là đáp án", () => {
    const missing = datTinhQuestions.filter((question) => question.hide);
    expect(missing.map((question) => question.id)).toEqual(["lt-thieu-1", "lt-thieu-2"]);
    for (const question of missing) {
      const blanks = blanksOf(question);
      const rows = { a: String(question.a).split(""), b: String(question.b).split(""), sum: String(question.a - question.b).split("") };
      const at = (row: "a" | "b" | "sum", position: number) => rows[row].length - 1 - position;

      const solutions: number[][] = [];
      const total = 10 ** blanks.length;
      for (let attempt = 0; attempt < total; attempt++) {
        const digits = blanks.map((_, index) => Math.floor(attempt / 10 ** index) % 10);
        const copy = { a: [...rows.a], b: [...rows.b], sum: [...rows.sum] };
        blanks.forEach((blank, index) => {
          copy[blank.row][at(blank.row, blank.position)] = String(digits[index]);
        });
        // Chữ số đầu của một số không được là 0.
        if (Object.values(copy).some((row) => row[0] === "0")) continue;
        if (Number(copy.a.join("")) - Number(copy.b.join("")) === Number(copy.sum.join(""))) solutions.push(digits);
      }
      expect(solutions, question.id).toHaveLength(1);
      expect(solutions[0], question.id).toEqual(blanks.map((blank) => blank.answer));
    }
  });

  it("lt-thieu-1 và lt-thieu-2 ghi đúng phép tính", () => {
    const first = find("lt-thieu-1", "dat-tinh");
    const second = find("lt-thieu-2", "dat-tinh");
    expect(first.a - first.b).toBe(518585);
    expect(second.a - second.b).toBe(434282);
  });
});

describe("khởi động", () => {
  it("kd-thang-hang, kd-co-nho, kd-tim-so", () => {
    expect(blankAnswers(find("kd-thang-hang", "dien-so").parts)).toEqual([4765 - 312]);
    expect(blankAnswers(find("kd-co-nho", "dien-so").parts)).toEqual([524 - 276]);
    expect(blankAnswers(find("kd-tim-so", "dien-so").parts)).toEqual([450 + 250]);
  });
});

describe("câu thử trong Lý thuyết", () => {
  it("qc-doi-tien, qc-tim-so-bi-tru, qc-nhieu-hon", () => {
    expect(blankAnswers(find("qc-doi-tien", "dien-so").parts)).toEqual([600000 - 250000]);
    expect(blankAnswers(find("qc-tim-so-bi-tru", "dien-so").parts)).toEqual([320000 + 150000]);
    expect(blankAnswers(find("qc-nhieu-hon", "dien-so").parts)).toEqual([12750 - 9480]);
  });
});

describe("nhóm Hoạt động", () => {
  it("hd-video: nhiều hơn bao nhiêu thì trừ", () => {
    expect(lineAnswers(find("hd-video", "loi-van"))).toEqual([[350000 - 90000]]);
  });

  it("hd-be-nao và hd-be-bao-nhieu: bể B nhiều hơn, hơn 276 085 l", () => {
    const [a, b] = [42380, 318465];
    expect(chosen("hd-be-nao")).toBe(b > a ? "Bể B" : "Bể A");
    expect(lineAnswers(find("hd-be-bao-nhieu", "loi-van"))).toEqual([[b - a]]);
  });
});

describe("nhóm Luyện tập", () => {
  it("lt-1: bảng số bị trừ, số trừ, hiệu", () => {
    expect(blankAnswers(find("lt-1a", "dien-so").parts)).toEqual([625417 - 38205]);
    expect(blankAnswers(find("lt-1b", "dien-so").parts)).toEqual([408356 - 30042]);
    expect(blankAnswers(find("lt-1c", "dien-so").parts)).toEqual([512000 - 307000]);
    expect(blankAnswers(find("lt-1d", "dien-so").parts)).toEqual([568000 + 134000]);
  });

  it("lt-tien: hai bước, tính tổng rồi trừ", () => {
    const total = 175000 + 85000;
    expect(lineAnswers(find("lt-tien", "loi-van"))).toEqual([[total], [500000 - total]]);
  });

  it("lt-xoa-so: xoá một chữ số bất kì của 3 205 618, lấy số lớn nhất và bé nhất", () => {
    const text = "3205618";
    const results = Array.from(text, (_, index) => Number(text.slice(0, index) + text.slice(index + 1)));
    expect(results.every((value) => String(value).length === 6)).toBe(true);
    const [largest, smallest] = [Math.max(...results), Math.min(...results)];
    expect(blankAnswers(find("lt-xoa-so", "dien-so").parts)).toEqual([largest, smallest]);
    expect(blankAnswers(find("lt-xoa-hieu", "dien-so").parts)).toEqual([largest - smallest]);
  });
});

describe("suy nghĩ thêm", () => {
  /** Trừ theo cột nhưng quên bớt số nhớ ở mọi hàng. */
  function subForgettingBorrow(a: number, b: number): number {
    const x = String(a).split("").reverse().map(Number);
    const y = String(b).split("").reverse().map(Number);
    const out: number[] = [];
    for (let position = 0; position < x.length; position++) {
      const diff = x[position] - (y[position] ?? 0);
      out.push(diff < 0 ? diff + 10 : diff);
    }
    return Number(out.reverse().join(""));
  }

  it("tn-tim-loi: kết quả của An là khi quên bớt 1, và sai đầu tiên ở hàng chục", () => {
    const [a, b] = [648390, 382547];
    const wrong = subForgettingBorrow(a, b);
    expect(wrong).toBe(366853);
    expect(a - b).not.toBe(wrong);
    const places = ["Hàng đơn vị", "Hàng chục", "Hàng trăm", "Hàng nghìn"];
    const correct = String(a - b).split("").reverse();
    const mine = String(wrong).split("").reverse();
    const firstWrong = correct.findIndex((digit, index) => digit !== mine[index]);
    expect(chosen("tn-tim-loi")).toBe(places[firstWrong]);
  });

  it("tn-thu-lai: hiệu cộng số trừ bằng số bị trừ", () => {
    expect(blankAnswers(find("tn-thu-lai", "dien-so").parts)).toEqual([265843 + 382547]);
    expect(265843 + 382547).toBe(648390);
    expect(648390 - 382547).toBe(265843);
  });

  it("tn-nho-day-chuyen", () => {
    expect(blankAnswers(find("tn-nho-day-chuyen", "dien-so").parts)).toEqual([800000 - 345678]);
  });
});
