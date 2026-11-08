import { blanksOf } from "@/components/exercises/dat-tinh-form";
import type { DatTinhQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { budget, comboCost, evalExpr, exerciseGroups, expressions, quickChecks, solve, warmUps } from "./bai-tap";

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

  it("3 câu khởi động và 7 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["tinh-nham", 6],
      ["dat-tinh", 6],
      ["dung-sai", 4],
      ["so-sanh", 5],
      ["thuan-tien", 3],
      ["bai-toan", 5],
      ["suy-nghi-them", 2],
    ]);
  });
});

describe("evalExpr", () => {
  it("cộng trừ từ trái sang phải, có ngoặc, số tách lớp bằng NBSP", () => {
    expect(evalExpr("150 000 − 70 000 + 40 000")).toBe(120000);
    expect(evalExpr("150 000 − (70 000 + 40 000)")).toBe(40000);
    expect(evalExpr(`${formatNumber(1200000)} - ${formatNumber(200000)}`)).toBe(1000000);
  });
});

describe("tính nhẩm", () => {
  it("đáp án tính lại bằng phép tính", () => {
    expect(answers("nham-1")).toEqual([80000 + 50000]);
    expect(answers("nham-2")).toEqual([170000 - 90000]);
    expect(answers("nham-3")).toEqual([600000 + 800000]);
    expect(answers("nham-4")).toEqual([90000 + 60000 - 70000]);
    expect(answers("nham-5")).toEqual([9000000 + 5000000]);
    expect(answers("nham-6")).toEqual([140000000 - 60000000 + 50000000]);
  });
});

describe("đặt tính", () => {
  it("con điền cả kết quả, đúng bằng phép tính; phép trừ có a ≥ b", () => {
    const expected: Record<string, number> = {
      "dt-1": 8745 + 7390,
      "dt-2": 17306 - 6482,
      "dt-3": 63418 + 58927,
      "dt-4": 172640 - 94785,
      "dt-5": 384619 + 257784,
      "dt-6": 703258 - 48391,
    };
    for (const [id, value] of Object.entries(expected)) {
      const question = find(id, "dat-tinh") as DatTinhQuestion;
      const real = question.op === "-" ? question.a - question.b : question.a + question.b;
      expect(real, id).toBe(value);
      if (question.op === "-") expect(question.a, id).toBeGreaterThanOrEqual(question.b);
      const typed = Number(
        blanksOf(question)
          .map((blank) => blank.answer)
          .reverse()
          .join(""),
      );
      expect(typed, id).toBe(value);
      expect(question.explanation, id).toContain(formatNumber(value));
    }
  });
});

describe("Đúng hay Sai", () => {
  it("đúng khi biểu thức khớp kết quả viết sẵn; 2 câu đúng, 2 câu sai", () => {
    const shown: Record<string, [number, number]> = {
      "ds-1": [70000 + 50000, 100000],
      "ds-2": [160000 - 40000, 120000],
      "ds-3": [600000 + 400000 - 300000, 800000],
      "ds-4": [8000000 + 5000000 - 3000000, 10000000],
    };
    for (const [id, [real, written]] of Object.entries(shown)) {
      expect(chosen(id), id).toBe(real === written ? "Đúng" : "Sai");
    }
    expect(Object.values(shown).filter(([real, written]) => real === written)).toHaveLength(2);
    expect(chosen("thu-dung-sai")).toBe(300000 + 400000 - 500000 === 400000 ? "Đúng" : "Sai");
  });
});

describe("so sánh biểu thức", () => {
  it("lớn nhất và bé nhất trong bốn biểu thức", () => {
    const values = [80000 + 40000 + 6321, 452689 - (300000 - 50000), 367400 + 300000 - 450000, 320000 - 120000 + 5860];
    expect(expressions.map(evalExpr)).toEqual(values);
    expect(chosen("lon-nhat").startsWith("C.")).toBe(true);
    expect(values.indexOf(Math.max(...values))).toBe(2);
    expect(chosen("be-nhat").startsWith("A.")).toBe(true);
    expect(values.indexOf(Math.min(...values))).toBe(0);
  });

  it("ba dấu so sánh", () => {
    expect(168900 - (250900 - 90050)).toBe(8050);
    expect(9000 - 2500 + 1000).toBe(7500);
    expect(chosen("ss-1")).toBe(">");
    expect(21480 + 40300 - 1480).toBe(60300);
    expect(30250 + 28135 + 7450).toBe(65835);
    expect(chosen("ss-2")).toBe("<");
    expect(56800 + 4200 - 6800).toBe(54200);
    expect(50000 + 4200).toBe(54200);
    expect(chosen("ss-3")).toBe("=");
  });
});

describe("tính thuận tiện", () => {
  it("đáp án tính lại", () => {
    expect(answers("tt-1")).toEqual([24580 + 7210 + 3420 + 1790]);
    expect(answers("tt-2")).toEqual([15260 + 9340 + 4740 + 2660]);
    expect(answers("tt-3")).toEqual([38450 + 6700 - 1450]);
    expect(answers("thu-thuan-tien")).toEqual([7400 + 3600 + 5250]);
  });
});

describe("giải toán", () => {
  it("bt-quan-ao: tổng ba món 285 000, hai món 270 000, giày hơn tất 95 000", () => {
    const [sock, shoe, coat] = lineAnswers(find("bt-quan-ao", "loi-van")).map(([value]) => value);
    expect(sock).toBe(285000 - 270000);
    expect(shoe - sock).toBe(95000);
    expect(coat + shoe).toBe(270000);
    expect(coat + shoe + sock).toBe(285000);
  });

  it("bt-tra-lai: hai món rồi trả lại", () => {
    const total = 80000 + 130000;
    expect(lineAnswers(find("bt-tra-lai", "loi-van"))).toEqual([[total], [250000 - total]]);
  });

  it("bt-du-tien: chỉ một cách chọn không quá 200 000 đồng", () => {
    const sums = [45000 + 80000 + 130000, 45000 + 80000 + 60000, 45000 + 130000 + 60000, 80000 + 130000 + 60000];
    expect(sums.map((_, index) => comboCost(index))).toEqual(sums);
    expect(sums.filter((sum) => sum <= budget)).toHaveLength(1);
    expect(chosen("bt-du-tien")).toBe("Cái mũ, đôi dép, gấu bông");
  });

  it("bt-tong-hieu: tổng 684, hiệu 126", () => {
    const [twice, small, big] = lineAnswers(find("bt-tong-hieu", "loi-van")).map(([value]) => value);
    expect(twice).toBe(684 - 126);
    expect(small).toBe(twice / 2);
    expect(big).toBe(small + 126);
    expect(small + big).toBe(684);
    expect(big - small).toBe(126);
    expect(solve(684, 126)).toEqual({ small, big });
  });

  it("bt-hai-thang: tháng hai rồi cả hai tháng", () => {
    const second = 245600 + 38750;
    expect(lineAnswers(find("bt-hai-thang", "loi-van"))).toEqual([[second], [245600 + second]]);
  });
});

describe("suy nghĩ thêm", () => {
  it("st-tim-loi: tính từ trái sang phải", () => {
    expect(answers("st-tim-loi")).toEqual([150000 - 70000 + 40000]);
    expect(150000 - (70000 + 40000)).toBe(40000);
  });

  it("st-uoc-luong: làm tròn hai số rồi cộng", () => {
    expect(chosen("st-uoc-luong")).toBe(formatNumber(800000));
    expect(498702 + 301540).toBe(800242);
    expect(Math.round(498702 / 100000) * 100000 + Math.round(301540 / 100000) * 100000).toBe(800000);
  });
});

describe("khởi động và câu thử", () => {
  it("khởi động", () => {
    expect(answers("kd-nham")).toEqual([400000 + 300000 - 200000]);
    expect(answers("kd-tru")).toEqual([50003 - 4728]);
    expect(answers("kd-tong-hieu")).toEqual([(90 + 20) / 2]);
  });

  it("câu thử", () => {
    expect(answers("thu-nham")).toEqual([12000000 - 5000000 + 4000000]);
    expect(answers("thu-tru")).toEqual([60000 - 3475]);
    expect(answers("thu-tong-hieu")).toEqual([(18 - 4) / 2, (18 - 4) / 2 + 4]);
  });
});
