import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import {
  butSpec, cafeSpec, chaiSpec, congSpecs, dungSaiSpecs, exerciseGroups, goSpec, gcd, quickChecks, rutGonSpecs, soDoSpecs, soTuNhienSpecs, thanhGoA, thanhGoB, thuanTienSpecs, thuLaiSpec, xeSpec,
  type Calc, type F,
} from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blanks(find(id, "dien-so").parts);
const lineAnswers = (id: string) => find(id, "loi-van").lines.map((line) => blanks(line));

// Kiểm tra độc lập với code dữ liệu: nhân chéo, và kết quả phải tối giản.
const ok = ([x, y]: number[], a: F, op: "+" | "-", b: F) => {
  const s = op === "+" ? 1 : -1;
  expect(x * a[1] * b[1], `${a}${op}${b}`).toBe(y * (a[0] * b[1] + s * b[0] * a[1]));
  expect(gcd(x, y), `${x}/${y} tối giản`).toBe(1);
  expect(y).toBeGreaterThan(0);
};
const okCalc = (got: number[], c: Calc) => ok(got, c.a, c.op, c.b);
const ge = (a: F, b: F) => a[0] * b[1] >= b[0] * a[1];
/** Cộng nhiều phân số bằng nhân chéo từng bước, không qua helper của dữ liệu. */
const add = (a: F, b: F): F => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];

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
      if (question.kind === "trac-nghiem") {
        expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
        expect(new Set(question.options).size, question.id).toBe(question.options.length);
      }
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["cong", 8],
      ["tru", 6],
      ["rut-gon", 4],
      ["so-tu-nhien", 5],
      ["so-do", 5],
      ["suy-nghi-them", 3],
    ]);
  });

  it("phép trừ luôn có số bị trừ lớn hơn hoặc bằng số trừ; rút gọn có phân số rút gọn được", () => {
    for (const c of [...congSpecs, ...rutGonSpecs, ...soTuNhienSpecs, ...dungSaiSpecs, thuLaiSpec, xeSpec]) if (c.op === "-") expect(ge(c.a, c.b), `${c.a} − ${c.b}`).toBe(true);
    for (const { a, b } of rutGonSpecs) expect(gcd(a[0], a[1]) > 1 || gcd(b[0], b[1]) > 1).toBe(true);
    for (const c of soTuNhienSpecs) expect(c.a[1] === 1 || c.b[1] === 1).toBe(true);
  });
});

describe("đáp án", () => {
  it("câu thử Nhắc lại nhanh", () => {
    ok(answers("thu-cung-mau"), [3, 5], "+", [4, 5]);
    expect(answers("thu-quy-dong")).toEqual([(2 * 6) / 3]);
    expect(answers("thu-rut-gon")).toEqual([6 / 2, 10 / 2]);
    const [x, y] = answers("thu-thuan-tien");
    const total = add(add([2, 7], [5, 7]), [3, 5]);
    expect(x * total[1]).toBe(y * total[0]);
    expect(answers("thu-so-tu-nhien")).toEqual([3 * 4]);
    ok(answers("thu-so-tu-nhien-tru"), [1, 1], "-", [3, 5]);
  });

  it("cộng", () => {
    congSpecs.forEach((c, i) => okCalc(answers(`c-${i + 1}`), c));
    okCalc(answers("c-xe"), xeSpec);
    thuanTienSpecs.forEach((list, i) => {
      const total = list.reduce((acc, f) => add(acc, f), [0, 1] as F);
      const [x, y] = answers(`tt-${i + 1}`);
      expect(x * total[1]).toBe(y * total[0]);
      expect(gcd(x, y)).toBe(1);
    });
    const [first, second] = lineAnswers("c-cafe");
    ok(first, cafeSpec[0], "+", cafeSpec[1]);
    ok(second, first as F, "+", cafeSpec[2]);
  });

  it("Đ/S: đáp án đúng khớp phép tính", () => {
    dungSaiSpecs.forEach((s, i) => {
      const s2 = s.op === "+" ? 1 : -1;
      const right = [s.a[0] * s.b[1] + s2 * s.b[0] * s.a[1], s.a[1] * s.b[1]];
      const claimOk = s.claim[0] * right[1] === s.claim[1] * right[0];
      expect(find(`ds-${i + 1}`, "trac-nghiem").answerIndex).toBe(claimOk ? 0 : 1);
    });
    expect(dungSaiSpecs.some((s, i) => find(`ds-${i + 1}`, "trac-nghiem").answerIndex === 0)).toBe(true);
    expect(dungSaiSpecs.some((s, i) => find(`ds-${i + 1}`, "trac-nghiem").answerIndex === 1)).toBe(true);
  });

  it("trừ: cây gỗ và chai nước giặt", () => {
    const [g1, g2] = lineAnswers("go");
    ok(g1, goSpec.total, "-", goSpec.parts[0]);
    ok(g2, g1 as F, "-", goSpec.parts[1]);
    const [c1, c2] = lineAnswers("chai");
    ok(c1, chaiSpec.start, "-", chaiSpec.uses[0]);
    ok(c2, c1 as F, "-", chaiSpec.uses[1]);
  });

  it("rút gọn rồi tính bằng cách rút gọn từng phân số", () => {
    rutGonSpecs.forEach((c, i) => {
      const got = answers(`rg-${i + 1}`);
      okCalc(got, c);
      const ra: F = [c.a[0] / gcd(...c.a), c.a[1] / gcd(...c.a)];
      const rb: F = [c.b[0] / gcd(...c.b), c.b[1] / gcd(...c.b)];
      ok(got, ra, c.op, rb);
    });
  });

  it("số tự nhiên với phân số", () => {
    expect(answers("tn-0")).toEqual([12]);
    soTuNhienSpecs.forEach((c, i) => okCalc(answers(`tn-${i + 1}`), c));
  });

  it("sơ đồ: mỗi ô là kết quả của ô trước; không ra số âm", () => {
    const run = (id: string, start: F, steps: { op: "+" | "-"; f: F }[]) => {
      const rows = lineAnswers(id);
      expect(rows).toHaveLength(steps.length);
      let cur = start;
      steps.forEach((s, i) => {
        ok(rows[i], cur, s.op, s.f);
        cur = rows[i] as F;
      });
    };
    run("sd-but", butSpec.start, butSpec.steps);
    soDoSpecs.forEach((s, i) => run(`sd-${i + 1}`, s.start, s.steps));
    // Câu cộng rồi trừ cùng một số trở về số đầu.
    expect(lineAnswers("sd-2")[1]).toEqual(soDoSpecs[1].start);
  });

  it("thanh gỗ", () => {
    ok(answers("go-a"), thanhGoA.total, "-", thanhGoA.a);
    const [both, over] = lineAnswers("go-b");
    ok(both, thanhGoB.a, "+", thanhGoB.b);
    ok(over, both as F, "-", thanhGoB.total);
    // Hình hợp lệ: hai thanh phủ kín thanh dài (a + b lớn hơn tổng) và mỗi thanh ngắn hơn thanh dài.
    expect(ge(add(thanhGoB.a, thanhGoB.b), thanhGoB.total)).toBe(true);
    expect(ge(thanhGoB.total, thanhGoB.a) && ge(thanhGoB.total, thanhGoB.b)).toBe(true);
  });

  it("suy nghĩ thêm", () => {
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    const total = add([3, 4], [5, 6]);
    expect(total[0] > total[1]).toBe(true);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
    ok(answers("sn-3"), [5, 6], "-", [1, 4]);
    expect(answers("sn-3")).toEqual(thuLaiSpec.a);
  });
});
