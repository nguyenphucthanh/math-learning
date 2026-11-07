import { blanksOf } from "@/components/exercises/dat-tinh-form";
import type { DatTinhQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { bambooValues, buckets, exerciseGroups, quickChecks, warmUps } from "./bai-tap";

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
const bucketSum = (bucket: (typeof buckets)[number]) => bucket.first + bucket.second;
/** Làm tròn đến hàng trăm nghìn. */
const roundHundredThousand = (value: number) => Math.round(value / 100000) * 100000;
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

  it("đúng 3 câu khởi động và 19 câu bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.flatMap((group) => group.questions)).toHaveLength(19);
  });
});

describe("câu đặt tính", () => {
  it("số thứ nhất không ít chữ số hơn số thứ hai", () => {
    for (const question of datTinhQuestions) {
      expect(String(question.a).length, question.id).toBeGreaterThanOrEqual(String(question.b).length);
    }
  });

  it("không có ô trống chỉ định thì con điền cả tổng, đúng bằng a + b", () => {
    for (const question of datTinhQuestions.filter((item) => !item.hide)) {
      const blanks = blanksOf(question);
      const typed = Number(blanks.map((blank) => blank.answer).reverse().join(""));
      expect(typed, question.id).toBe(question.a + question.b);
    }
  });

  it("lời giải của câu đặt tính nêu đúng tổng", () => {
    for (const question of datTinhQuestions.filter((item) => !item.hide)) {
      expect(question.explanation, question.id).toContain(formatNumber(question.a + question.b));
    }
  });

  it("câu tìm chữ số thiếu có đúng một nghiệm, và đó là đáp án", () => {
    const missing = datTinhQuestions.filter((question) => question.hide);
    expect(missing.map((question) => question.id)).toEqual(["lt-thieu-1", "lt-thieu-2"]);
    for (const question of missing) {
      const blanks = blanksOf(question);
      const rows = { a: String(question.a).split(""), b: String(question.b).split(""), sum: String(question.a + question.b).split("") };
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
        if (Number(copy.a.join("")) + Number(copy.b.join("")) === Number(copy.sum.join(""))) solutions.push(digits);
      }
      expect(solutions, question.id).toHaveLength(1);
      expect(solutions[0], question.id).toEqual(blanks.map((blank) => blank.answer));
    }
  });

  it("lt-thieu-1 và lt-thieu-2 ghi đúng phép tính", () => {
    expect(find("lt-thieu-1", "dat-tinh").a + find("lt-thieu-1", "dat-tinh").b).toBe(39833);
    expect(find("lt-thieu-2", "dat-tinh").a + find("lt-thieu-2", "dat-tinh").b).toBe(91931);
  });
});

describe("khởi động", () => {
  it("kd-hang: chữ số 8 của 180 510 ở hàng chục nghìn", () => {
    const places = ["Hàng đơn vị", "Hàng chục", "Hàng trăm", "Hàng nghìn", "Hàng chục nghìn", "Hàng trăm nghìn"];
    const position = String(180510).length - 1 - String(180510).indexOf("8");
    expect(chosen("kd-hang")).toBe(places[position]);
  });

  it("kd-doi: 201 km = 201 × 1 000 m", () => {
    expect(blankAnswers(find("kd-doi", "dien-so").parts)).toEqual([201 * 1000]);
  });
});

describe("xô sữa", () => {
  const sums = buckets.map(bucketSum);

  it("điền đúng tổng từng xô", () => {
    expect(blankAnswers(find("xo-tinh", "dien-so").parts)).toEqual(sums);
  });

  it("chọn đúng xô nhiều nhất và ít nhất, và đề có bẫy số hạng đầu", () => {
    const label = (value: number) => `Xô ${buckets[sums.indexOf(value)].label}`;
    expect(chosen("xo-nhieu")).toBe(label(Math.max(...sums)));
    expect(chosen("xo-it")).toBe(label(Math.min(...sums)));
    const mostByFirst = buckets.reduce((best, bucket) => (bucket.first > best.first ? bucket : best));
    expect(`Xô ${mostByFirst.label}`).not.toBe(chosen("xo-nhieu"));
  });
});

describe("bài toán lời văn", () => {
  it("vt-km: đổi km ra m rồi cộng", () => {
    expect(lineAnswers(find("vt-km", "loi-van"))).toEqual([[148 * 1000], [362000 + 148 * 1000]]);
  });

  it("lt-tien: chỉ hộp bút cùng cặp sách không quá 100 000 đồng", () => {
    const question = find("lt-tien", "trac-nghiem");
    const prices: Record<string, number> = { "Bộ bút màu": 18500, "Hộp bút": 12000, "Bộ thước kẻ": 16000 };
    const affordable = question.options.filter((option) => 85000 + prices[option] <= 100000);
    expect(affordable).toEqual([chosen("lt-tien")]);
  });

  it("lt-cao-cao: mỗi bước nhảy qua hai đốt, không tính điểm xuất phát", () => {
    const landings: number[] = [];
    for (let index = 0; index + 3 < bambooValues.length; index += 3) landings.push(bambooValues[index + 3]);
    expect(landings).toHaveLength(2);
    expect(lineAnswers(find("lt-cao-cao", "loi-van"))).toEqual([[landings[0]], [landings[1]], [landings[0] + landings[1]]]);
  });

  it("các đốt tre cách đều nhau", () => {
    const gaps = bambooValues.slice(1).map((value, index) => value - bambooValues[index]);
    expect(new Set(gaps).size).toBe(1);
  });
});

describe("suy nghĩ thêm", () => {
  /** Cộng theo cột nhưng quên số nhớ ở hàng chỉ định (0 là hàng đơn vị). */
  function addForgettingCarry(a: number, b: number, forgottenAt: number): number {
    const x = String(a).split("").reverse().map(Number);
    const y = String(b).split("").reverse().map(Number);
    let carry = 0;
    const out: number[] = [];
    for (let position = 0; position < Math.max(x.length, y.length) + 1; position++) {
      const total = (x[position] ?? 0) + (y[position] ?? 0) + (position === forgottenAt ? 0 : carry);
      out.push(total % 10);
      carry = total >= 10 ? 1 : 0;
    }
    return Number(out.reverse().join(""));
  }

  it("tn-tim-loi: kết quả của Lan đúng là khi quên số nhớ ở hàng chục", () => {
    expect(addForgettingCarry(6748, 395, 1)).toBe(7133);
    expect(6748 + 395).not.toBe(7133);
    expect(chosen("tn-tim-loi")).toBe("Quên cộng số nhớ ở hàng chục");
    // Lệch cột sẽ cho kết quả khác hẳn, nên đó không thể là lỗi của Lan.
    expect(6748 + 3950).not.toBe(7133);
  });

  it("tn-nham: so hai tổng", () => {
    const first = 9800 + 5300;
    const second = 10100 + 4900;
    expect(first).toBeGreaterThan(second);
    expect(chosen("tn-nham")).toBe(`${formatNumber(9800)} + ${formatNumber(5300)}`);
  });

  it("tn-uoc-luong: chọn số bằng tổng hai số làm tròn, và gần tổng thật nhất", () => {
    const [a, b] = [238410, 351290];
    const estimate = roundHundredThousand(a) + roundHundredThousand(b);
    expect(chosen("tn-uoc-luong")).toBe(formatNumber(estimate));
    const options = find("tn-uoc-luong", "trac-nghiem").options.map((option) => Number(option.replace(/\D/g, "")));
    const nearest = options.reduce((best, value) => (Math.abs(value - (a + b)) < Math.abs(best - (a + b)) ? value : best));
    expect(nearest).toBe(estimate);
  });

  it("qc-uoc-luong: tương tự với 412 360 + 289 540", () => {
    const [a, b] = [412360, 289540];
    const estimate = roundHundredThousand(a) + roundHundredThousand(b);
    expect(chosen("qc-uoc-luong")).toBe(formatNumber(estimate));
    const options = find("qc-uoc-luong", "trac-nghiem").options.map((option) => Number(option.replace(/\D/g, "")));
    const nearest = options.reduce((best, value) => (Math.abs(value - (a + b)) < Math.abs(best - (a + b)) ? value : best));
    expect(nearest).toBe(estimate);
  });

  it("qc-thang-hang: chỉ cách B thẳng hàng đơn vị", () => {
    expect(chosen("qc-thang-hang")).toBe("Cách B");
  });
});
