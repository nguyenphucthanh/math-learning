import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { divisions, evalExpr, exerciseGroups, numbers, quickChecks, roundTo, savings, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lineAnswers = (question: WordQuestion) => question.lines.map((line) => blankAnswers(line));
const words = (id: string) => lineAnswers(find(id, "loi-van"));
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const nbsp = (text: string) => text.replace(/ /g, " ");

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
      ["so-100000", 5],
      ["bon-phep-tinh", 5],
      ["bieu-thuc", 6],
      ["giai-toan", 2],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("evalExpr", () => {
  it("thứ tự phép tính và ngoặc", () => {
    expect(evalExpr("8 + 3 × 2")).toBe(14);
    expect(evalExpr("(8 + 3) × 2")).toBe(22);
    expect(evalExpr("20 − 6 − 4")).toBe(10);
    expect(evalExpr("36 : 6 × 2")).toBe(12);
  });

  it("chữ và số có NBSP", () => {
    expect(evalExpr("c + m × n", { c: 1450, m: 205, n: 4 })).toBe(2270);
    expect(evalExpr("60 000 + 5 000 × 7")).toBe(95000);
  });
});

describe("các số đến 100 000", () => {
  it("làm tròn: quy tắc chữ số bên phải", () => {
    expect(roundTo(7346, 10)).toBe(7350);
    expect(roundTo(69871, 10)).toBe(69870);
    expect(roundTo(72305, 10000)).toBe(70000);
    expect(roundTo(48261, 10000)).toBe(50000);
  });

  it("so-chan-le: hai số lẻ là 72 305 và 69 871", () => {
    expect(numbers.filter((value) => value % 2 === 1)).toEqual([72305, 69871]);
    expect(nbsp(chosen("so-chan-le"))).toBe("72 305 và 69 871");
  });

  it("so-sap-xep: từ bé đến lớn", () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(answers("so-sap-xep")).toEqual(sorted);
    expect(sorted).toEqual([69871, 70986, 72058, 72305]);
  });

  it("so-tron-chuc và so-tron-chuc-nghin", () => {
    expect(answers("so-tron-chuc")).toEqual([69870]);
    expect(answers("so-tron-chuc-nghin")).toEqual([70000]);
  });

  it("so-nha: số chẵn lớn nhất có ba chữ số", () => {
    const [answer] = answers("so-nha");
    expect(answer % 2).toBe(0);
    expect(answer).toBeLessThan(1000);
    expect(answer + 2).toBeGreaterThanOrEqual(1000);
    expect(answer).toBe(998);
  });
});

describe("bốn phép tính", () => {
  it("dt-tru và dt-cong", () => {
    const sub = find("dt-tru", "dat-tinh");
    const add = find("dt-cong", "dat-tinh");
    expect([sub.op, sub.a - sub.b]).toEqual(["-", 76141]);
    expect(add.a + add.b).toBe(84011);
  });

  it("dt-nhan: 7 506 × 8 rồi thử lại bằng chia", () => {
    expect(words("dt-nhan")).toEqual([[7506 * 8], [7506]]);
    expect(7506 * 8).toBe(60048);
  });

  it("dt-chia-du: 64 573 : 9 = 7 174 dư 7, thử lại ra 64 573", () => {
    const { a, d } = divisions.remainder;
    expect(words("dt-chia-du")).toEqual([[Math.floor(a / d), a % d], [a]]);
    expect(Math.floor(a / d) * d + (a % d)).toBe(a);
    expect(a % d).toBeLessThan(d);
    expect(words("dt-chia-du")[0]).toEqual([7174, 7]);
  });

  it("dt-chia-het: chia hết", () => {
    const { a, d } = divisions.exact;
    expect(a % d).toBe(0);
    expect(answers("dt-chia-het")).toEqual([5208]);
    expect(5208 * 6).toBe(a);
  });
});

describe("biểu thức", () => {
  it("bt-chu-1: m = 674, n = 395", () => {
    expect(answers("bt-chu-1")).toEqual([674 + 395 - 280]);
  });

  it("bt-chu-2: c = 1 450, m = 205, n = 4", () => {
    expect(answers("bt-chu-2")).toEqual([1450 + 205 * 4]);
    expect(answers("bt-chu-2")).toEqual([2270]);
  });

  it("bt-ngoac và bt-ba-so", () => {
    expect(answers("bt-ngoac")).toEqual([(14720 - 6335) * 7]);
    expect(answers("bt-ba-so")).toEqual([36285 + 7940 + 2060]);
  });

  it("bt-tiet-kiem: Hà 95 000, Mai 90 000, Nam 88 000; Hà nhiều nhất", () => {
    expect(words("bt-tiet-kiem")).toEqual([[60000 + 5000 * 7], [30000 + 20000 * 3], [6000 * 8 + 40000]]);
    expect(savings.map((item) => item.name)).toEqual(["Hà", "Mai", "Nam"]);
    expect(chosen("bt-tiet-kiem-chon")).toBe("Hà");
  });
});

describe("giải toán", () => {
  it("gt-khan-gia: nam rồi hơn nữ", () => {
    const male = 41528 - 12365;
    expect(words("gt-khan-gia")).toEqual([[male], [male - 12365]]);
    expect(male - 12365).toBe(16798);
  });

  it("gt-tra-lai: tiền vở, tiền hai món, tiền trả lại", () => {
    const books = 4 * 6500;
    const both = 7500 + books;
    expect(words("gt-tra-lai")).toEqual([[books], [both], [50000 - both]]);
    expect(50000 - both).toBe(16500);
  });
});

describe("suy nghĩ thêm", () => {
  it("st-thu-tu: 35 000, không phải 80 000", () => {
    expect(15000 + 5000 * 4).toBe(35000);
    expect((15000 + 5000) * 4).toBe(80000);
    expect(chosen("st-thu-tu")).toContain("nhân 5 000 × 4 trước");
  });

  it("st-uoc-luong: gần 80 000", () => {
    expect(roundTo(38912, 10000) + roundTo(41087, 10000)).toBe(80000);
    expect(38912 + 41087).toBe(79999);
    expect(nbsp(chosen("st-uoc-luong"))).toBe("80 000");
  });

  it("st-du: dư khi chia cho 6 chỉ từ 0 đến 5", () => {
    const possible = new Set(Array.from({ length: 60 }, (_, index) => index % 6));
    expect(chosen("st-du")).toBe("6");
    expect(possible.has(6)).toBe(false);
  });
});

describe("khởi động và câu thử", () => {
  it("khởi động", () => {
    expect(nbsp(chosen("kd-chan-le"))).toBe("4 802");
    expect(answers("kd-lam-tron")).toEqual([7350]);
    expect(answers("kd-thu-tu")).toEqual([12 + 4 * 5]);
  });

  it("câu thử", () => {
    expect(answers("thu-chan-le")).toEqual([101]);
    expect(answers("thu-lam-tron")).toEqual([50000]);
    expect(answers("thu-thu-lai")).toEqual([38]);
    expect(38 % 5).toBe(3);
    expect(Math.floor(38 / 5)).toBe(7);
    expect(answers("thu-thu-tu")).toEqual([80 - 6 * 5]);
    expect(words("thu-tien-thoi")).toEqual([[3 * 4000], [20000 - 12000]]);
  });
});
