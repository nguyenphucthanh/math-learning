import { blanksOf } from "@/components/exercises/dat-tinh-form";
import type { DatTinhQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { pickedDigits } from "./_illustrations/o-do-so";
import { cardsStart, cardsTarget, exerciseGroups, oSoRows, quickChecks, solve, warmUps } from "./bai-tap";

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

/** Số lượt đổi chỗ hai thẻ ít nhất: số thẻ trừ số vòng hoán vị (các chữ số khác nhau). */
function minSwaps(from: number[], to: number[]) {
  const where = new Map(from.map((digit, index) => [digit, index]));
  const seen = new Set<number>();
  let cycles = 0;
  for (let start = 0; start < from.length; start++) {
    if (seen.has(start)) continue;
    cycles++;
    let at = start;
    while (!seen.has(at)) {
      seen.add(at);
      at = where.get(to[at])!;
    }
  }
  return from.length - cycles;
}

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

  it("3 câu khởi động và 5 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["cong-tru", 12],
      ["thuan-tien", 11],
      ["tong-hieu", 5],
      ["do-em", 2],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("tính nhẩm và đặt tính", () => {
  it("tính nhẩm", () => {
    expect(answers("nham-1")).toEqual([2000000 + 500000 - 300000]);
    expect(answers("nham-2")).toEqual([300000 + 200000 - 40000]);
    expect(answers("nham-3")).toEqual([30000000 + (5000 + 300000)]);
    expect(answers("nham-4")).toEqual([2000000 + (80000 - 50000)]);
  });

  it("câu Đúng hay Sai: đúng khi phép tính khớp kết quả viết sẵn", () => {
    const shown: Record<string, [number, "+" | "-", number, number]> = {
      "ds-1": [417250360, "+", 300000, 717250360],
      "ds-2": [9472800, "-", 472800, 9000000],
      "ds-3": [4215000, "-", 308000, 4523000],
      "ds-4": [52614735, "+", 208561, 52823296],
    };
    for (const [id, [a, op, b, result]] of Object.entries(shown)) {
      const real = op === "+" ? a + b : a - b;
      expect(chosen(id), id).toBe(real === result ? "Đúng" : "Sai");
    }
    expect(Object.values(shown).filter(([a, op, b, r]) => (op === "+" ? a + b : a - b) === r)).toHaveLength(2);
  });

  it("câu đặt tính: con điền cả kết quả, đúng bằng phép tính; phép trừ có a ≥ b", () => {
    const expected: Record<string, number> = {
      "dt-1": 64825 + 27396,
      "dt-2": 92221 - 64825,
      "dt-3": 215684 + 806359,
      "dt-4": 1022043 - 806359,
    };
    for (const [id, value] of Object.entries(expected)) {
      const question = find(id, "dat-tinh") as DatTinhQuestion;
      const real = question.op === "-" ? question.a - question.b : question.a + question.b;
      expect(real, id).toBe(value);
      const typed = Number(
        blanksOf(question)
          .map((blank) => blank.answer)
          .reverse()
          .join(""),
      );
      expect(typed, id).toBe(value);
      expect(question.explanation, id).toContain(formatNumber(value));
    }
    expect(find("dt-2", "dat-tinh").a).toBeGreaterThanOrEqual(find("dt-2", "dat-tinh").b);
    expect(find("dt-4", "dat-tinh").a).toBeGreaterThanOrEqual(find("dt-4", "dat-tinh").b);
  });

  it("hai cặp phép cộng và trừ ngược nhau", () => {
    expect(find("dt-2", "dat-tinh").a).toBe(find("dt-1", "dat-tinh").a + find("dt-1", "dat-tinh").b);
    expect(find("dt-2", "dat-tinh").b).toBe(find("dt-1", "dat-tinh").a);
    expect(find("dt-4", "dat-tinh").a).toBe(find("dt-3", "dat-tinh").a + find("dt-3", "dat-tinh").b);
    expect(find("dt-4", "dat-tinh").b).toBe(find("dt-3", "dat-tinh").b);
  });
});

describe("tính thuận tiện, hoá đơn, ô số", () => {
  it("tính thuận tiện", () => {
    expect(answers("tt-1")).toEqual([52614 + 2785 - 614]);
    expect(answers("tt-2")).toEqual([94300 + 1700 - 4300]);
    expect(answers("tt-3")).toEqual([41375 + 12408 + 2625]);
  });

  it("hoá đơn và quỹ", () => {
    expect(answers("hd-1")).toEqual([18000 + 45000 + 132000]);
    expect(answers("hd-2")).toEqual([63500 + 29000 + 236500]);
    expect(answers("qy-1")).toEqual([36400000 + 52750000 + 61600000]);
  });

  it("ô số: giá trị bốn biểu thức khớp ô chữ, cột tô vàng đọc ra 1918", () => {
    expect(oSoRows.map((row) => row.value)).toEqual([1000000000, 9, 31000000, 724837]);
    expect([answers("o-1")[0], answers("o-2")[0], answers("o-3")[0], answers("o-4")[0]]).toEqual(oSoRows.map((row) => row.value));
    expect(oSoRows.map((row) => String(row.value).length)).toEqual([10, 1, 8, 6]);
    expect(pickedDigits(oSoRows)).toBe("1918");
    const year = find("o-nam", "dien-so").parts.find((part) => typeof part !== "string");
    expect(year).toEqual({ answer: Number(pickedDigits(oSoRows)), year: true });
  });
});

describe("tổng và hiệu", () => {
  const cases: [string, number, number, "big-first" | "small-first"][] = [
    ["th-1", 120000, 20000, "big-first"],
    ["th-2", 168, 14, "big-first"],
    ["th-3", 360, 24, "small-first"],
    ["th-4b", 28, 6, "big-first"],
  ];

  it("hai số điền đúng thứ tự đề hỏi, cộng đúng tổng và trừ đúng hiệu", () => {
    for (const [id, total, diff, ask] of cases) {
      const { small, big } = solve(total, diff);
      const [first, second] = answers(id);
      expect([first, second], id).toEqual(ask === "big-first" ? [big, small] : [small, big]);
      expect(small + big, id).toBe(total);
      expect(big - small, id).toBe(diff);
    }
  });

  it("th-4a: chọn đề có tổng 28 và bao thứ nhất nặng hơn", () => {
    expect(chosen("th-4a")).toBe("Hai bao gạo nặng 28 kg, bao thứ nhất nặng hơn bao thứ hai 6 kg.");
  });
});

describe("Đố em", () => {
  it("do-the: ít nhất 3 lượt, tính bằng số vòng hoán vị", () => {
    expect(minSwaps(cardsStart, cardsTarget)).toBe(3);
    expect(answers("do-the")).toEqual([3]);
    expect(Number(cardsStart.join(""))).toBe(359148);
    expect(Number(cardsTarget.join(""))).toBe(149385);
  });

  it("minSwaps khớp đáp án SGK: 178 265 → 268 157 là 3 lượt", () => {
    expect(minSwaps([1, 7, 8, 2, 6, 5], [2, 6, 8, 1, 5, 7])).toBe(3);
  });

  it("do-cong: chỉ một vị trí đặt dấu cộng cho phép tính đúng", () => {
    const digits = "63472859";
    const hits: [number, number][] = [];
    for (let cut = 1; cut < digits.length; cut++) {
      const left = Number(digits.slice(0, cut));
      const right = Number(digits.slice(cut));
      if (left + right === 9206) hits.push([left, right]);
    }
    expect(hits).toEqual([[6347, 2859]]);
    expect(answers("do-cong")).toEqual([6347, 2859]);
  });
});

describe("suy nghĩ thêm", () => {
  it("st-tim-loi-dau: kết quả đúng là 6 350 000, Nam cộng thay vì trừ", () => {
    expect(6000000 + 400000 - 50000).toBe(6350000);
    expect(6000000 + 400000 + 50000).toBe(6450000);
    expect(chosen("st-tim-loi-dau")).toBe("Nam cộng 50 000 thay vì trừ 50 000");
  });

  it("st-tim-loi-chia: quên chia 2 cho ra 120 và 150", () => {
    const { small, big } = solve(150, 30);
    expect([small, big]).toEqual([60, 90]);
    expect(150 - 30).toBe(120);
    expect(120 + 30).toBe(150);
    expect(chosen("st-tim-loi-chia")).toBe("Quên chia cho 2 sau khi lấy 150 − 30");
  });

  it("st-lien-sau: 99 999 999 + 1 có 9 chữ số", () => {
    expect(answers("st-lien-sau")).toEqual([99999999 + 1]);
    expect(String(99999999 + 1)).toHaveLength(9);
  });
});

describe("khởi động và câu thử", () => {
  it("khởi động", () => {
    expect(answers("kd-cong")).toEqual([38407 + 5693]);
    expect(answers("kd-nham")).toEqual([3000000 + 400000 - 100000]);
    const { big } = solve(20, 6);
    expect(answers("kd-tong-hieu")).toEqual([big]);
  });

  it("câu thử", () => {
    expect(answers("thu-tru")).toEqual([70000 - 4215]);
    expect(answers("thu-thuan-tien")).toEqual([4600 + 15800 + 400]);
    expect(96271 - 83738).toBe(12533);
    expect(chosen("thu-thu-lai")).toBe(`${formatNumber(83738)} + ${formatNumber(12533)}`);
    expect(83738 + 12533).toBe(96271);
  });
});
