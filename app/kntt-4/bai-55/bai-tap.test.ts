import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { bangSpecs, cheHaiSpec, cheSpec, chiaSpecs, exerciseGroups, heSoSpecs, lanSpecs, nhanSpecs, noiPairs, quickChecks, soSanhRows, thieuSpecs, thuongSpec, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const wordAnswers = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);
/** Hai phân số bằng nhau (tích chéo chỉ dùng để kiểm tra, không dạy con). */
const equal = (a: number, b: number, c: number, d: number) => a * d === b * c;
const frac = (text: string): [number, number] => {
  const [x, y] = text.split("/").map(Number);
  return [x, y];
};
const evalExpr = (text: string) => Function(`return ${text.replace(/×/g, "*").replace(/:/g, "/")}`)() as number;

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      question.rightOrder.forEach((v, index) => expect(v, question.id).not.toBe(index));
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["nhan", 3],
      ["chia", 3],
      ["he-so", 3],
      ["lan", 2],
      ["thieu", 5],
      ["bang", 3],
      ["thuong", 2],
      ["che", 2],
      ["suy-nghi-them", 5],
    ]);
  });
});

describe("đáp án", () => {
  it("nhân cả tử và mẫu: đúng hệ số và là phân số bằng", () => {
    nhanSpecs.forEach(({ a, b, k }, i) => {
      const [c, d] = answers(`nh-${i + 1}`);
      expect([c, d]).toEqual([a * k, b * k]);
      expect(equal(a, b, c, d)).toBe(true);
    });
  });

  it("chia cả tử và mẫu: chia hết và là phân số bằng", () => {
    chiaSpecs.forEach(({ a, b, k }, i) => {
      expect(a % k).toBe(0);
      expect(b % k).toBe(0);
      const [c, d] = answers(`ch-${i + 1}`);
      expect([c, d]).toEqual([a / k, b / k]);
      expect(equal(a, b, c, d)).toBe(true);
    });
  });

  it("ô hệ số: hai ô cùng một số", () => {
    heSoSpecs.forEach((s, i) => {
      const [x, y] = answers(`hs-${i + 1}`);
      expect(x).toBe(y);
      expect(s.op === "×" ? s.a * x : s.a / x).toBe(s.c);
      expect(s.op === "×" ? s.b * y : s.b / y).toBe(s.d);
      expect(equal(s.a, s.b, s.c, s.d)).toBe(true);
    });
  });

  it("tìm số còn thiếu", () => {
    thieuSpecs.forEach((s, i) => {
      const [x] = answers(`tt-${i + 1}`);
      const [c, d] = s.missing === "c" ? [x, s.d] : [s.c, x];
      expect(equal(s.a, s.b, c, d)).toBe(true);
      expect(x).toBe(s.missing === "c" ? s.c : s.d);
    });
  });

  it("nối phân số bằng nhau", () => {
    const q = find("noi-1", "noi-cap");
    expect(q.pairs.map((p) => [p.left, p.right])).toEqual(noiPairs);
    for (const { left, right } of q.pairs) expect(equal(...frac(left), ...frac(right))).toBe(true);
    // Mỗi phân số bên trái chỉ bằng đúng một phân số bên phải.
    for (const { left } of q.pairs) expect(q.pairs.filter((p) => equal(...frac(left), ...frac(p.right)))).toHaveLength(1);
  });

  it("trắc nghiệm gấp/giảm: đáp án bằng phân số đã cho và các đáp án khác không bằng", () => {
    lanSpecs.forEach((s, i) => {
      const q = find(`tn-${i + 1}`, "trac-nghiem");
      const [c, d] = s.op === "giảm" ? [s.a / s.k, s.b / s.k] : [s.a * s.k, s.b * s.k];
      expect(q.options[q.answerIndex]).toBe(`${c}/${d}`);
      q.options.forEach((o, j) => expect(equal(s.a, s.b, ...frac(o)), `${q.id} ${o}`).toBe(j === q.answerIndex));
    });
  });

  it("hai băng giấy: các phân số bằng nhau", () => {
    bangSpecs.slice(0, 2).forEach((s, i) => {
      expect(answers(`bg-${i + 1}`)).toEqual([...s.top, ...s.bottom]);
      expect(equal(s.top[0], s.top[1], s.bottom[0], s.bottom[1])).toBe(true);
    });
    const [tren, duoi] = [bangSpecs[2].top, bangSpecs[2].bottom];
    expect(answers("bg-3")).toEqual([duoi[0]]);
    expect(equal(tren[0], tren[1], duoi[0], duoi[1])).toBe(true);
    expect(duoi[0]).toBe((tren[0] * 12) / tren[1]);
  });

  it("thương không đổi", () => {
    const { a, b, nhan, chia } = thuongSpec;
    expect(wordAnswers("th-1")).toEqual([[a / b], [(a * nhan) / (b * nhan)], [a / chia / (b / chia)]]);
    expect(a % chia).toBe(0);
    expect(b % chia).toBe(0);
    for (const { left, right } of soSanhRows) expect(evalExpr(left)).toBe(evalExpr(right));
    expect(find("th-2", "so-sanh").rows.every((r) => r.answer === "=")).toBe(true);
  });

  it("số bị che lấp: từng số đúng và tổng 8 + 15 + 27 = 50", () => {
    const { a, b, tu1, mau2, mau3 } = cheSpec;
    const [[x], [y], [z], [tong]] = wordAnswers("ck-1");
    expect(equal(a, b, tu1, x)).toBe(true);
    expect(equal(a, b, y, mau2)).toBe(true);
    expect(equal(a, b, z, mau3)).toBe(true);
    expect([x, y, z]).toEqual([8, 15, 27]);
    expect(tong).toBe(x + y + z);
    expect(tong).toBe(50);
  });

  it("chuỗi phân số bằng nhau 12/16 = 3/4 = 6/8", () => {
    const { a, b, mau, tu } = cheHaiSpec;
    const [[p], [q]] = wordAnswers("ck-2");
    expect(equal(a, b, p, mau)).toBe(true);
    expect(equal(a, b, tu, q)).toBe(true);
    expect([p, q]).toEqual([3, 8]);
  });

  it("suy nghĩ thêm", () => {
    // sn-1: cộng 2 vào cả hai không giữ phân số.
    expect(equal(2, 3, 4, 5)).toBe(false);
    expect(equal(2, 3, 4, 6)).toBe(true);
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
    expect(answers("sn-3").map((x, i) => equal(1, 2, x, 4 + 2 * i))).toEqual([true, true, true]);
    // sn-4: 7 và 9 không chia hết cho 2; 3/4 và 8/10 không bằng 7/9.
    const q4 = find("sn-4", "trac-nghiem");
    expect(7 % 2 !== 0 && 9 % 2 !== 0).toBe(true);
    expect(equal(7, 9, 3, 4)).toBe(false);
    expect(equal(7, 9, 8, 10)).toBe(false);
    expect(q4.options[q4.answerIndex]).toMatch(/^Không được/);
    expect(equal(3, 5, 12, 20)).toBe(true);
    expect(find("sn-5", "trac-nghiem").options[0]).toBe("Bằng nhau");
    expect(find("sn-5", "trac-nghiem").answerIndex).toBe(0);
  });

  it("khởi động và câu thử", () => {
    expect(answers("kd-nhan")).toEqual([6 * 4]);
    expect(answers("kd-chia")).toEqual([35 / 5]);
    expect(answers("kd-phan-so")).toEqual([3, 5]);
    expect(answers("thu-nhan")).toEqual([2 * 3, 5 * 3]);
    expect(answers("thu-chia")).toEqual([8 / 4, 12 / 4]);
    expect(equal(2, 3, 4, 3)).toBe(false);
    expect(find("thu-mot", "trac-nghiem").answerIndex).toBe(0);
    expect(answers("thu-thuong")).toEqual([24 / 6]);
    expect(24 / 6).toBe(12 / 3);
  });
});
