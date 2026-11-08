import { blanksOf } from "@/components/exercises/dat-tinh-form";
import type { DatTinhQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { evalExpr, exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lineAnswers = (question: WordQuestion) => question.lines.map(blankAnswers);
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

  it("câu nối cặp có thứ tự cột phải là hoán vị, không số nào đứng đúng chỗ", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      const order = question.rightOrder;
      expect([...order].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      order.forEach((value, index) => expect(value, question.id).not.toBe(index));
    }
  });

  it("3 câu khởi động và 7 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["tinh-nham", 6],
      ["cong-tru", 4],
      ["bieu-thuc", 6],
      ["nhan-chia", 5],
      ["trac-nghiem", 4],
      ["bai-toan", 4],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("evalExpr", () => {
  it("nhân chia trước cộng trừ, trái sang phải, ngoặc trước, số tách lớp bằng NBSP", () => {
    expect(evalExpr("5 000 + 6 000 × 2")).toBe(17000);
    expect(evalExpr("6 000 × 5 : 3")).toBe(10000);
    expect(evalExpr("24 000 − 4 000 × 3")).toBe(12000);
    expect(evalExpr("13 206 × (36 : 9)")).toBe(52824);
    expect(evalExpr("57 670 − (29 653 − 2 653)")).toBe(30670);
    expect(evalExpr(`${formatNumber(46000)} + ${formatNumber(4000)} + ${formatNumber(9000)}`)).toBe(59000);
  });
});

describe("tính nhẩm và biểu thức", () => {
  it("đáp án tính lại bằng phép tính", () => {
    expect(answers("nham-1")).toEqual([7000 + 6000]);
    expect(answers("nham-2")).toEqual([15000 - 8000]);
    expect(answers("nham-3")).toEqual([24000 + 40000]);
    expect(answers("nham-4")).toEqual([38000 + 2000 + 9000]);
    expect(answers("nham-5")).toEqual([82000 - 2000 - 60000]);
    expect(answers("nham-6")).toEqual([41000 + 6000 - 18000]);
    expect(answers("bt-1")).toEqual([63480 - (35420 - 5420)]);
    expect(answers("bt-2")).toEqual([18000 + 7250 + 3640]);
    expect(answers("bt-3")).toEqual([(7000 * 4) / 2]);
    expect(answers("bt-4")).toEqual([12304 * (45 / 9)]);
    expect(answers("bt-5")).toEqual([(63000 - 7000) / 8]);
    expect(answers("bt-6")).toEqual([52340 - 6130 * 5]);
  });

  it("câu khởi động và câu thử", () => {
    expect(answers("kd-nham")).toEqual([13000]);
    expect(answers("kd-nhan")).toEqual([4 * 8, 3 * 7]);
    expect(answers("kd-chia-du")).toEqual([Math.floor(23 / 4), 23 % 4]);
    expect(answers("thu-cong-tru")).toEqual([6428 + 3795]);
    expect(answers("thu-nhan")).toEqual([2305 * 4]);
    expect(answers("thu-chia")).toEqual([Math.floor(7018 / 3), 7018 % 3]);
    expect(answers("thu-thu-tu")).toEqual([5000 + 6000 * 2]);
    expect(chosen("thu-giam-lan")).toBe("Chia cho 3");
  });

  it("biểu thức không ra số lẻ hay số âm, kết quả trong phạm vi 100 000", () => {
    for (const id of ["nham-1", "nham-2", "nham-3", "nham-4", "nham-5", "nham-6", "bt-1", "bt-2", "bt-3", "bt-4", "bt-5", "bt-6"]) {
      const [value] = answers(id);
      expect(Number.isInteger(value), id).toBe(true);
      expect(value, id).toBeGreaterThan(0);
      expect(value, id).toBeLessThan(100000);
    }
  });
});

describe("đặt tính cộng, trừ", () => {
  it("con điền cả kết quả, đúng bằng phép tính; phép trừ có a ≥ b", () => {
    const expected: Record<string, number> = {
      "ct-1": 7365 + 5487,
      "ct-2": 47538 + 36094,
      "ct-3": 42061 - 953,
      "ct-4": 83417 - 25169,
    };
    for (const [id, value] of Object.entries(expected)) {
      const question = find(id, "dat-tinh") as DatTinhQuestion;
      const result = blanksOf(question).sort((x, y) => y.position - x.position).map((blank) => blank.answer).join("");
      expect(Number(result), id).toBe(value);
      expect(String(question.a).length, id).toBeGreaterThanOrEqual(String(question.b).length);
      if (question.op === "-") expect(question.a, id).toBeGreaterThanOrEqual(question.b);
    }
  });
});

describe("nhân và chia", () => {
  it("nhân: đáp án đúng bằng phép nhân", () => {
    expect(answers("nc-2")).toEqual([4062 * 8]);
    expect(answers("nc-3")).toEqual([16428 * 5]);
  });

  it("chia: thương, số dư; thương × số chia + dư = số bị chia, dư bé hơn số chia", () => {
    expect(answers("nc-4")).toEqual([72056 / 8]);
    const [quotient, remainder] = answers("nc-5");
    expect(quotient * 4 + remainder).toBe(83927);
    expect(remainder).toBeLessThan(4);
  });

  it("nối cặp: kết quả mỗi phép tính đúng", () => {
    const question = find("nc-1", "noi-cap");
    for (const pair of question.pairs) {
      expect(evalExpr(pair.right), pair.left).toBe(evalExpr(pair.left));
    }
    expect(new Set(question.pairs.map((pair) => pair.right)).size).toBe(question.pairs.length);
  });
});

describe("chọn câu trả lời đúng", () => {
  it("mỗi đáp án đúng được tính lại", () => {
    expect(chosen("tn-1")).toBe(formatNumber(47350 + 9480));
    expect(chosen("tn-2")).toBe(formatNumber(71304 - 28659));
    expect(chosen("tn-3")).toBe(formatNumber(18094 * 4));
    const quotient = Math.floor(62835 / 7);
    const remainder = 62835 % 7;
    expect(chosen("tn-4")).toBe(`Thương là ${formatNumber(quotient)} và số dư là ${remainder}`);
  });

  it("đáp án sai thật sự sai", () => {
    for (const id of ["tn-1", "tn-2", "tn-3"]) {
      const question = find(id, "trac-nghiem");
      const target = Number(question.options[question.answerIndex].replace(/\s/g, ""));
      question.options.forEach((option, index) => {
        if (index !== question.answerIndex) expect(Number(option.replace(/\s/g, "")), id).not.toBe(target);
      });
    }
    const division = find("tn-4", "trac-nghiem");
    const wrongOnes = division.options.filter((_, index) => index !== division.answerIndex);
    // Có một lựa chọn “mẹo”: thương 8 975, dư 10 khớp phép nhân nhưng số dư không bé hơn số chia.
    expect(wrongOnes).toContain("Thương là 8 975 và số dư là 10");
    expect(8975 * 7 + 10).toBe(62835);
  });
});

describe("bài toán", () => {
  it("bút và ba lô: ba lô, rồi tổng", () => {
    const [bag, total] = lineAnswers(find("bt-but", "loi-van")).map((line) => line[0]);
    expect(bag).toBe(14500 + 58000);
    expect(total).toBe(14500 + bag);
  });

  it("gạo: tổng rồi chia đều", () => {
    const [all, each] = lineAnswers(find("bt-gao", "loi-van")).map((line) => line[0]);
    expect(all).toBe(3 * 6400);
    expect(each).toBe(all / 4);
    expect(Number.isInteger(each)).toBe(true);
  });

  it("đồ chơi: giảm đi 3 lần là chia 3", () => {
    expect(lineAnswers(find("bt-do-choi", "loi-van"))).toEqual([[14760 / 3]]);
  });

  it("sách: gấp 4 rồi cộng", () => {
    const [textbooks, total] = lineAnswers(find("bt-sach", "loi-van")).map((line) => line[0]);
    expect(textbooks).toBe(3060 * 4);
    expect(total).toBe(textbooks + 3060);
  });
});

describe("suy nghĩ thêm", () => {
  it("phép tính khác biệt", () => {
    expect(chosen("sn-1")).toBe("8 000 × 4");
    const values = ["60 000 : 2", "5 000 × 6", "10 000 × 3", "8 000 × 4"].map(evalExpr);
    expect(values.filter((value) => value === 30000)).toHaveLength(3);
    expect(values[3]).toBe(32000);
  });

  it("lỗi thứ tự phép tính: nhân trước ra 12 000, trừ trước ra 60 000", () => {
    expect(evalExpr("24 000 − 4 000 × 3")).toBe(12000);
    expect((24000 - 4000) * 3).toBe(60000);
    expect(chosen("sn-2")).toContain("12 000");
  });

  it("ước lượng: 4 987 × 6 gần 30 000", () => {
    expect(chosen("sn-3")).toBe("30 000");
    expect(Math.abs(4987 * 6 - 30000)).toBeLessThan(Math.abs(4987 * 6 - 24000));
  });
});
