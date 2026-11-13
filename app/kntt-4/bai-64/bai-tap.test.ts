import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import {
  bieuThucA, bieuThucB, chiaSpecs, daoNguocSpecs, exerciseGroups, gcd, loiSpec, quickChecks, rutGonSpecs, sat, soDoSpec, soTuNhienSpecs, tranhSpec, thap, theNoiCap, timSpecs, uocLuongSpec, warmUps,
  type F,
} from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}
const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
/** Đáp án phân số: một ô là số tự nhiên n (n/1), hai ô là tử và mẫu. */
const asF = (b: number[]): F => (b.length === 1 ? [b[0], 1] : [b[0], b[1]]);
const answer = (id: string) => asF(blanks(find(id, "dien-so").parts));
const lineAnswers = (id: string) => find(id, "loi-van").lines.map((line) => asF(blanks(line)));

// Kiểm tra độc lập với code dữ liệu: nhân chéo, kết quả tối giản.
const same = (got: F, want: F, label = "") => expect(got[0] * want[1], `${label} ${got}`).toBe(got[1] * want[0]);
const reduced = (got: F) => expect(gcd(got[0], got[1]), `${got} tối giản`).toBe(1);
const divide = (a: F, b: F): F => [a[0] * b[1], a[1] * b[0]];
const times = (a: F, b: F): F => [a[0] * b[0], a[1] * b[1]];
const plus = (a: F, b: F): F => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
const minus = (a: F, b: F): F => [a[0] * b[1] - b[0] * a[1], a[1] * b[1]];
const check = (id: string, want: F) => {
  const got = answer(id);
  same(got, want, id);
  reduced(got);
};

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
      }
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["dao-nguoc", 8],
      ["tinh", 11],
      ["so-tu-nhien", 5],
      ["the-anh-em", 4],
      ["suy-nghi-them", 3],
    ]);
  });

  it("số liệu: mọi phân số khác 0, rút gọn rồi mới tính có phân số rút gọn được", () => {
    const all = [...daoNguocSpecs, ...chiaSpecs.flat(), ...rutGonSpecs.flat(), ...soTuNhienSpecs.flat(), ...timSpecs.flatMap((s) => [s.a, s.c])];
    for (const f of all) expect(f[0] > 0 && f[1] > 0).toBe(true);
  });
});

describe("đáp án", () => {
  it("khởi động và câu thử", () => {
    check("wu-1", times([3, 5], [2, 3]));
    expect(answer("wu-2")).toEqual([4, 1]);
    same(answer("wu-3"), [12, 18]);
    expect(answer("wu-3")).toEqual([2, 3]);
    same(times(answer("thu-dao-nguoc"), [3, 5]), [1, 1]);
    check("thu-chia", divide([3, 4], [2, 5]));
    check("thu-so-tu-nhien", divide([4, 1], [2, 3]));
    check("thu-chia-so", divide([2, 5], [3, 1]));
  });

  it("phân số đảo ngược: tích với phân số ban đầu bằng 1", () => {
    daoNguocSpecs.forEach((f, i) => {
      const got = answer(`dn-${i + 1}`);
      same(times(f, got), [1, 1]);
      reduced(got);
    });
    expect(answer("dn-3")).toEqual([4, 1]);
    expect(answer("sn-3")).toEqual([1, 12]);
  });

  it("chia hai phân số: nhân kết quả với số chia phải ra số bị chia", () => {
    chiaSpecs.forEach(([a, b], i) => {
      check(`cd-${i + 1}`, divide(a, b));
      same(times(answer(`cd-${i + 1}`), b), a);
    });
    rutGonSpecs.forEach(([a, b], i) => {
      check(`rg-${i + 1}`, divide(a, b));
      expect(gcd(a[0] * b[1], a[1] * b[0]) > 1, `rg-${i + 1} cần rút gọn`).toBe(true);
    });
  });

  it("sơ đồ chuỗi và bức tranh", () => {
    const rows = lineAnswers("so-do");
    expect(rows).toHaveLength(soDoSpec.steps.length);
    let cur = soDoSpec.start;
    soDoSpec.steps.forEach((s, i) => {
      same(rows[i], s.op === "×" ? times(cur, s.f) : divide(cur, s.f), `bước ${i + 1}`);
      reduced(rows[i]);
      cur = rows[i];
    });
    check("tranh", divide(tranhSpec.area, tranhSpec.width));
    same(times(answer("tranh"), tranhSpec.width), tranhSpec.area);
  });

  it("tìm phân số thích hợp: thế lại vào phép tính", () => {
    timSpecs.forEach((s, i) => {
      const x = answer(`tim-${i + 1}`);
      reduced(x);
      same(s.kind === "nhan" ? times(s.a, x) : divide(s.a, x), s.c, `tim-${i + 1}`);
    });
  });

  it("biểu thức có chia", () => {
    const [s, r] = lineAnswers("bt-a");
    same(s, plus(bieuThucA.a, bieuThucA.b));
    same(r, divide(s, bieuThucA.c));
    const [q, d] = lineAnswers("bt-b");
    same(q, divide(bieuThucB.a, bieuThucB.b));
    same(d, minus(q, bieuThucB.c));
    reduced(d);
  });

  it("bài toán thanh sắt, bóng tháp và số tự nhiên", () => {
    check("sat", divide(sat.total, sat.piece));
    expect(answer("sat")[1]).toBe(1);
    soTuNhienSpecs.forEach(([a, b], i) => check(`tn-${i + 1}`, divide(a, b)));
    check("thap", divide(thap.shadow, [thap.times, 1]));
    same(times(answer("thap"), [thap.times, 1]), thap.shadow);
  });

  it("thẻ anh em: mỗi cặp có tích bằng 1", () => {
    theNoiCap.forEach((cards, i) => {
      const q = find(`the-${i + 1}`, "noi-cap");
      q.pairs.forEach((p, j) => {
        const [a, b] = p.left.split("/").map(Number);
        const [c, d] = p.right.split("/").map(Number);
        expect([a, b]).toEqual(cards[j]);
        expect(a * c).toBe(b * d);
      });
    });
    const parse = (s: string): F => s.split("/").map(Number) as F;
    for (const id of ["the-3", "the-4"]) {
      const q = find(id, "trac-nghiem");
      const card = parse(q.prompt.match(/\d+\/\d+/)![0]);
      const rights = q.options.map(parse).map((o, i) => (o[0] * card[0] === o[1] * card[1] ? i : -1)).filter((i) => i >= 0);
      expect(rights, id).toEqual([q.answerIndex]);
    }
  });

  it("suy nghĩ thêm", () => {
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    // Cách làm sai của Bình cho kết quả khác kết quả đúng.
    const wrong = times([loiSpec.a[1], loiSpec.a[0]], loiSpec.b);
    same(wrong, loiSpec.wrong);
    expect(wrong[0] * 5).not.toBe(divide(loiSpec.a, loiSpec.b)[0] * wrong[1]);
    const r = divide(uocLuongSpec.a, uocLuongSpec.b);
    expect(r[0] * uocLuongSpec.a[1] > uocLuongSpec.a[0] * r[1]).toBe(true);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
  });
});
