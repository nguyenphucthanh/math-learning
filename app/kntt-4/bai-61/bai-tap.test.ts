import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { add, banhSpec, chuoiSpec, choPhepTru, cungMauSpecs, dayGaySpecs, exerciseGroups, hinhSpecs, khacMauSpecs, noiCapOrder, noiCapSpecs, quickChecks, rutGonSpecs, sub, tanSpec, thuLaiSpec, warmUps, type F, type Sub } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blanks(find(id, "dien-so").parts);
const lineAnswers = (id: string) => find(id, "loi-van").lines.map((line) => blanks(line));

// Kiểm tra độc lập: tử/mẫu của kết quả thoả x/y = a − b theo nhân chéo, và tối giản.
const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const valid = (a: F, b: F, [x, y]: F, sign: 1 | -1 = -1) => {
  expect(x * a[1] * b[1]).toBe(y * (a[0] * b[1] + sign * b[0] * a[1]));
  expect(gcd(x, y), `${x}/${y} tối giản`).toBe(1);
  expect(y).toBeGreaterThan(0);
  expect(x).toBeGreaterThan(0);
};
const ge = (a: F, b: F) => a[0] * b[1] >= b[0] * a[1];
const allSubs: Sub[] = [...cungMauSpecs, ...khacMauSpecs, ...rutGonSpecs, banhSpec, tanSpec, thuLaiSpec, ...noiCapSpecs];

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng; nối cặp hợp lệ", () => {
    for (const question of questions) {
      if (question.kind === "trac-nghiem") {
        expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
        expect(new Set(question.options).size, question.id).toBe(question.options.length);
      }
      if (question.kind === "noi-cap") {
        expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, i) => i));
        question.rightOrder.forEach((value, i) => expect(value, `${question.id} vị trí ${i}`).not.toBe(i));
        expect(new Set(question.pairs.map((p) => p.right)).size).toBe(question.pairs.length);
      }
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["cung-mau", 6],
      ["khac-mau", 8],
      ["luyen-tap", 7],
      ["suy-nghi-them", 4],
    ]);
  });

  it("số bị trừ luôn lớn hơn hoặc bằng số trừ; mỗi tiết đúng quy tắc", () => {
    for (const { a, b } of allSubs) expect(ge(a, b), `${a} − ${b}`).toBe(true);
    for (const { a, b } of cungMauSpecs) expect(a[1]).toBe(b[1]);
    for (const { a, b } of khacMauSpecs) {
      expect(a[1]).not.toBe(b[1]);
      expect(Math.max(a[1], b[1]) % Math.min(a[1], b[1])).toBe(0);
    }
    for (const { a, b } of rutGonSpecs) expect(gcd(a[0], a[1]) > 1 || gcd(b[0], b[1]) > 1).toBe(true);
  });
});

describe("đáp án", () => {
  it("cùng mẫu số", () => {
    cungMauSpecs.forEach((s, i) => {
      const [x, y] = answers(`cm-${i + 1}`);
      valid(s.a, s.b, [x, y]);
      expect(y).toBe(s.a[1]);
      expect(x).toBe(s.a[0] - s.b[0]);
    });
    hinhSpecs.forEach((s, i) => expect(answers(`h-${i + 1}`)).toEqual([s.to - s.bot]));
    const [x, y] = lineAnswers("l-1")[0];
    valid(banhSpec.a, banhSpec.b, [x, y]);
  });

  it("khác mẫu số: quy đồng rồi trừ", () => {
    expect(lineAnswers("km-1")[0]).toEqual([khacMauSpecs[0].a[0] * 2]);
    const [x, y] = lineAnswers("km-1")[1];
    valid(khacMauSpecs[0].a, khacMauSpecs[0].b, [x, y]);
    khacMauSpecs.slice(1).forEach((s, i) => {
      const [p, q] = answers(`km-${i + 2}`);
      valid(s.a, s.b, [p, q]);
    });
  });

  it("rút gọn rồi tính cho cùng kết quả như tính thẳng", () => {
    rutGonSpecs.forEach((s, i) => {
      const [p, q] = answers(`rg-${i + 1}`);
      valid(s.a, s.b, [p, q]);
      const ra: F = [s.a[0] / gcd(...s.a), s.a[1] / gcd(...s.a)];
      const rb: F = [s.b[0] / gcd(...s.b), s.b[1] / gcd(...s.b)];
      valid(ra, rb, [p, q]);
    });
  });

  it("dây và gậy: so sánh rồi trừ", () => {
    dayGaySpecs.forEach((s, i) => {
      const gayLonHon = s.gay[0] * s.day[1] > s.day[0] * s.gay[1];
      expect(s.longer).toBe(gayLonHon ? "gậy" : "dây");
      expect(find(`dg-${i + 1}a`, "trac-nghiem").answerIndex).toBe(gayLonHon ? 0 : 1);
      const [lo, sh] = gayLonHon ? [s.gay, s.day] : [s.day, s.gay];
      const [x, y] = lineAnswers(`dg-${i + 1}b`)[0];
      valid(lo, sh, [x, y]);
    });
  });

  it("ao ếch: từng bước đúng và đi một vòng thì về số đầu", () => {
    const lines = lineAnswers("ao-1");
    let cur = chuoiSpec.start;
    chuoiSpec.steps.forEach((step, i) => {
      const [x, y] = lines[i];
      valid(cur, step.f, [x, y], step.op === "-" ? -1 : 1);
      expect(x * 1).toBe(step.op === "-" ? sub(cur, step.f)[0] : add(cur, step.f)[0]);
      cur = [x, y];
    });
    expect(cur).toEqual(chuoiSpec.start);
  });

  it("nối phép tính với kết quả", () => {
    const q = find("noi-1", "noi-cap");
    q.pairs.forEach((p, i) => {
      const [x, y] = p.right.split("/").map(Number);
      valid(noiCapSpecs[i].a, noiCapSpecs[i].b, [x, y]);
      expect(p.left).toBe(`${noiCapSpecs[i].a.join("/")} − ${noiCapSpecs[i].b.join("/")}`);
    });
    expect(noiCapOrder).toHaveLength(q.pairs.length);
  });

  it("bác Tân", () => {
    const [x, y] = lineAnswers("t-1")[0];
    valid(tanSpec.a, tanSpec.b, [x, y]);
  });

  it("suy nghĩ thêm: thử lại bằng phép cộng, trừ ngược", () => {
    const diff = sub(thuLaiSpec.a, thuLaiSpec.b);
    const [x] = answers("sn-3");
    // hiệu + số trừ = số bị trừ; mẫu số 8 viết sẵn trong đề.
    expect(x).toBe(thuLaiSpec.a[0]);
    expect(thuLaiSpec.a[1]).toBe(8);
    valid(thuLaiSpec.a, thuLaiSpec.b, diff);
    expect(add(diff, thuLaiSpec.b)).toEqual(thuLaiSpec.a);
    const q = find("sn-4", "trac-nghiem");
    q.options.forEach((o, i) => {
      const [p, r] = o.split(" − ").map((t) => t.split("/").map(Number) as F);
      expect(ge(p, r), o).toBe(i === choPhepTru.answerIndex);
    });
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
  });

  it("khởi động và câu thử", () => {
    expect(answers("kd-1")).toEqual([1 * 2]);
    expect(answers("kd-2")).toEqual([1 * 4]);
    expect(answers("kd-3")).toEqual([6 / 2]);
    expect(answers("thu-cung-mau")).toEqual([8 - 3, 9]);
    expect(answers("thu-quy-dong")).toEqual([1 * 2]);
    expect(answers("thu-rut-gon")).toEqual([5 / 5, 10 / 5]);
  });

  it("đáp án sách tr.80-82 tính lại", () => {
    expect(sub([7, 8], [2, 8])).toEqual([5, 8]);
    expect(sub([7, 8], [1, 4])).toEqual([5, 8]);
    expect([sub([9, 11], [3, 11]), sub([10, 4], [5, 4]), sub([22, 15], [8, 15])]).toEqual([[6, 11], [5, 4], [14, 15]]);
    expect([sub([3, 4], [1, 8]), sub([2, 6], [5, 18]), sub([2, 5], [3, 20]), sub([3, 8], [1, 4])]).toEqual([[5, 8], [1, 18], [1, 4], [1, 8]]);
    expect([sub([1, 2], [1, 6]), sub([3, 4], [5, 8]), sub([7, 10], [2, 5]), sub([7, 12], [1, 3])]).toEqual([[1, 3], [1, 8], [3, 10], [1, 4]]);
    expect([sub([2, 3], [2, 6]), sub([5, 6], [3, 18]), sub([8, 14], [2, 7]), sub([12, 20], [2, 5])]).toEqual([[1, 3], [2, 3], [2, 7], [1, 5]]);
    expect([sub([3, 4], [5, 12]), sub([17, 10], [6, 5]), sub([7, 12], [1, 3])]).toEqual([[1, 3], [1, 2], [1, 4]]);
    // ao ếch SGK: 5/12 → 17/24 → 7/12 → 11/12 → 1/12 → 5/12
    const a1 = add([5, 12], [7, 24]);
    const a2 = sub(a1, [1, 8]);
    const a3 = add(a2, [1, 3]);
    const a4 = sub(a3, [5, 6]);
    expect([a1, a2, a3, a4, add(a4, [1, 3])]).toEqual([[17, 24], [7, 12], [11, 12], [1, 12], [5, 12]]);
    // ô chữ: SAO THỔ
    expect([sub(sub([7, 18], [5, 18]), [1, 18]), sub([5, 18], [1, 6]), sub([3, 6], [1, 18]), sub(add([5, 22], [7, 22]), [3, 22]), add([2, 9], [1, 18]), sub(add([2, 22], [7, 22]), [1, 22])]).toEqual([[1, 18], [1, 9], [4, 9], [9, 22], [5, 18], [4, 11]]);
  });
});
