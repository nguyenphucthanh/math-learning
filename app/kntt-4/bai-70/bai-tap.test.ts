import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import {
  bieuThucA, bieuThucB, bieuThucC, bieuThucD, bieuThucE, congTruSpecs, doEm, exerciseGroups, gcd, khuDat, loiSai, nhanChiaSpecs, quickChecks,
  tamBia, thuanTienA, thuanTienB, thuanTienC, tienNam,
  type F,
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

// Phép tính độc lập: giữ phân số chưa rút gọn, so bằng nhân chéo.
const mulF = (a: F, b: F): F => [a[0] * b[0], a[1] * b[1]];
const divF = (a: F, b: F): F => [a[0] * b[1], a[1] * b[0]];
const addF = (a: F, b: F): F => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
const subF = (a: F, b: F): F => [a[0] * b[1] - b[0] * a[1], a[1] * b[1]];
const n = (x: number): F => [x, 1];
const value = (f: F) => f[0] / f[1];
/** Ô trả lời là phân số: một ô là số tự nhiên, hai ô là tử và mẫu; phải tối giản. */
const ok = (got: number[], want: F, label = "") => {
  expect(got.length, `${label} số ô`).toBeLessThanOrEqual(2);
  const f: F = got.length === 1 ? [got[0], 1] : [got[0], got[1]];
  expect(f[0] * want[1], `${label} ${f}≠${want}`).toBe(f[1] * want[0]);
  expect(gcd(f[0], f[1]), `${label} tối giản`).toBe(1);
  if (want[0] % want[1] === 0) expect(got.length, `${label} số tự nhiên thì một ô`).toBe(1);
};
const calc = (op: string, a: F, b: F) => (op === "+" ? addF(a, b) : op === "−" ? subF(a, b) : op === "×" ? mulF(a, b) : divF(a, b));
const parse = (s: string): F => { const [x, y = "1"] = s.split("/"); return [Number(x), Number(y)]; };

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm hợp lệ", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("câu thử", () => {
    expect(answers("thu-rut-gon")).toEqual([3, 8]);
    ok(answers("thu-cong"), addF([3, 4], [1, 6]), "cong");
    ok(answers("thu-tru"), subF([5, 6], [1, 4]), "tru");
    expect(answers("thu-so-tu-nhien")).toEqual([13, 5]);
    expect(addF(n(2), [3, 5])).toEqual([13, 5]);
    ok(answers("thu-nhan"), mulF([2, 3], [9, 10]));
    ok(answers("thu-chia"), divF([3, 5], [9, 10]));
    expect(answers("thu-chia-so-tu-nhien")).toEqual([4, 5]);
    ok([4, 5], divF([24, 5], n(6)));
    expect(answers("thu-thu-tu")).toEqual([1, 2, 1]);
    expect(value(addF([1, 2], mulF([3, 4], [2, 3])))).toBe(1);
    expect(18 / 6).toBe(3);
    expect(48 / 6).toBe(8);
  });

  it("cộng, trừ, nhân, chia", () => {
    congTruSpecs.forEach(({ op, a, b }, i) => ok(answers(`ct-${i + 1}`), calc(op, a, b), `ct-${i + 1}`));
    nhanChiaSpecs.forEach(({ op, a, b }, i) => ok(answers(`nc-${i + 1}`), calc(op, a, b), `nc-${i + 1}`));
    // Có số tự nhiên và kết quả lớn hơn 1 (giữ dạng phân số).
    expect(congTruSpecs.some(({ a, b }) => a[1] === 1 || b[1] === 1)).toBe(true);
    expect(value(calc("+", congTruSpecs[1].a, congTruSpecs[1].b))).toBeGreaterThan(1);
  });

  it("biểu thức, kết quả không âm ở mọi bước", () => {
    const A = bieuThucA;
    const [a1, a2] = lineAnswers("bt-a");
    ok(a1, addF(A.a, A.b));
    ok(a2, subF(addF(A.a, A.b), A.c));
    expect(value(subF(addF(A.a, A.b), A.c))).toBeGreaterThanOrEqual(0);
    const B = bieuThucB;
    const [b1, b2] = lineAnswers("bt-b");
    ok(b1, subF(n(B.n), B.a));
    ok(b2, addF(subF(n(B.n), B.a), B.b));
    expect(value(subF(n(B.n), B.a))).toBeGreaterThanOrEqual(0);
    const C = bieuThucC;
    const [c1, c2] = lineAnswers("bt-c");
    ok(c1, subF(C.b, C.c));
    ok(c2, subF(C.a, subF(C.b, C.c)));
    expect(value(subF(C.b, C.c))).toBeGreaterThanOrEqual(0);
    expect(value(subF(C.a, subF(C.b, C.c)))).toBeGreaterThanOrEqual(0);
    const D = bieuThucD;
    const [d1, d2, d3] = lineAnswers("bt-d");
    ok(d1, D.x);
    ok(d2, mulF(n(D.n), D.y));
    ok(d3, addF(D.x, mulF(n(D.n), D.y)));
    expect(gcd(D.x[0], D.x[1])).toBeGreaterThan(1); // đề chưa tối giản
    const E = bieuThucE;
    const [e1, e2, e3] = lineAnswers("bt-e");
    ok(e1, E.p);
    ok(e2, divF(n(E.n), E.q));
    ok(e3, mulF(E.p, divF(n(E.n), E.q)));
    expect(gcd(E.p[0], E.p[1])).toBeGreaterThan(1);
  });

  it("bài toán lời văn", () => {
    const [used, left] = lineAnswers("dat");
    ok(used, addF(khuDat.nha, khuDat.cay));
    ok(left, subF(n(1), addF(khuDat.nha, khuDat.cay)));
    expect(value(addF(khuDat.nha, khuDat.cay))).toBeLessThan(1);
    const [spent, kept] = lineAnswers("tien");
    const s = mulF(n(tienNam.total), tienNam.spend);
    expect(s[0] % s[1]).toBe(0);
    expect(spent).toEqual([s[0] / s[1]]);
    expect(kept).toEqual([tienNam.total - s[0] / s[1]]);
    expect(kept).toEqual([360000]);
    // Tấm bìa: dài × rộng = diện tích; chu vi = (dài + rộng) × 2.
    const [len, half, per] = lineAnswers("bia");
    const L = divF(tamBia.area, tamBia.width);
    ok(len, L);
    const lf: F = len.length === 1 ? [len[0], 1] : [len[0], len[1]];
    const prod = mulF(lf, tamBia.width);
    expect(prod[0] * tamBia.area[1]).toBe(prod[1] * tamBia.area[0]);
    ok(half, addF(L, tamBia.width));
    ok(per, mulF(addF(L, tamBia.width), n(2)));
    expect(per).toEqual([27, 10]);
  });

  it("tính thuận tiện: kết quả bằng tính trực tiếp từ trái sang phải", () => {
    const A = thuanTienA;
    ok(answers("tt-1"), mulF(mulF(mulF(A.a, A.b), [A.a[1], A.a[0]]), n(A.n)));
    expect(mulF(A.a, [A.a[1], A.a[0]]).join("/")).toBe("28/28"); // cặp đảo ngược
    expect((A.b[1] === A.n)).toBe(true); // 9/5 × 5 rút gọn được
    const B = thuanTienB;
    ok(answers("tt-2"), addF(mulF(B.p, B.a), mulF(B.b, B.p)));
    const s = addF(B.a, B.b);
    expect(s[0]).toBe(s[1]); // a + b = 1
    const C = thuanTienC;
    ok(answers("tt-3"), subF(addF(addF(C.x, C.y), C.z), n(C.n)));
    const yz = addF(C.y, C.z);
    expect(yz[0] / yz[1]).toBe(C.n); // y + z = n
  });

  it("đố em: đúng một lựa chọn là tổng hai phân số tử số 1 mẫu khác nhau", () => {
    doEm.forEach(({ target, options, answer }, i) => {
      const good = options.filter((o) => {
        const [x, y] = o.split(" + ").map(parse);
        const t = addF(x, y);
        return x[0] === 1 && y[0] === 1 && x[1] !== y[1] && t[0] * target[1] === t[1] * target[0];
      });
      expect(good).toEqual([answer]);
      expect(find(`do-em-${i + 1}`, "trac-nghiem").answerIndex).toBe(options.indexOf(answer));
    });
    // SGK: 3/4 = 1/2 + 1/4.
    const t = addF([1, 2], [1, 4]);
    expect(t[0] * 4).toBe(t[1] * 3);
  });

  it("suy nghĩ thêm: lỗi sai thật sự sai, đáp án đầu đúng", () => {
    const { congTuMau, nhanQuyDong, chiaNguoc, quenRutGon } = loiSai;
    const s = addF(congTuMau.a, congTuMau.b);
    expect(s[0] * congTuMau.saiKetQua[1]).not.toBe(s[1] * congTuMau.saiKetQua[0]);
    expect(congTuMau.saiKetQua).toEqual([congTuMau.a[0] + congTuMau.b[0], congTuMau.a[1] + congTuMau.b[1]]);
    expect(value(congTuMau.saiKetQua)).toBeLessThan(value(congTuMau.b));
    const m = nhanQuyDong.a[1] * nhanQuyDong.b[1];
    const hà = (nhanQuyDong.a[0] * nhanQuyDong.b[1]) * (nhanQuyDong.b[0] * nhanQuyDong.a[1]) / m;
    expect(hà).not.toBe(value(mulF(nhanQuyDong.a, nhanQuyDong.b)));
    expect(hà).toBeGreaterThan(1);
    const sai = mulF([chiaNguoc.a[1], chiaNguoc.a[0]], chiaNguoc.b);
    const dung = divF(chiaNguoc.a, chiaNguoc.b);
    expect(sai[0] * dung[1]).not.toBe(sai[1] * dung[0]);
    const raw = mulF(quenRutGon.a, quenRutGon.b);
    expect(gcd(raw[0], raw[1])).toBeGreaterThan(1);
    for (const id of ["sn-1", "sn-2", "sn-3", "sn-4"]) expect(find(id, "trac-nghiem").answerIndex).toBe(0);
  });

  it("đáp án SGK tr.110-111 (phụ huynh) tính lại", () => {
    const eq = (got: F, want: F) => expect(got[0] * want[1]).toBe(got[1] * want[0]);
    eq(addF([7, 24], [11, 6]), [17, 8]);
    eq(addF(n(3), [5, 8]), [29, 8]);
    eq(subF([19, 28], [3, 7]), [1, 4]);
    eq(subF([53, 21], n(1)), [32, 21]);
    eq(subF(addF([4, 9], [2, 9]), [5, 18]), [7, 18]);
    eq(addF(subF(n(2), [3, 5]), [8, 15]), [29, 15]);
    eq(subF([9, 8], subF([11, 8], [19, 32])), [11, 32]);
    eq(subF(n(1), addF([2, 5], [3, 10])), [3, 10]);
    eq(addF(addF([4, 27], [5, 9]), subF([13, 9], n(2))), [4, 27]);
    eq(mulF([5, 7], [7, 15]), [1, 3]);
    eq(mulF([8, 21], n(3)), [8, 7]);
    eq(divF([24, 17], [9, 17]), [8, 3]);
    eq(divF([36, 5], n(9)), [4, 5]);
    eq(addF([25, 60], mulF(n(6), [1, 8])), [7, 6]);
    eq(mulF([15, 9], divF(n(6), [30, 9])), n(3));
    eq(subF(n(400000), mulF(n(400000), [3, 8])), n(250000));
    const dai = divF([7, 25], [2, 5]);
    eq(dai, [7, 10]);
    eq(mulF(addF(dai, [2, 5]), n(2)), [11, 5]);
    eq(mulF(mulF(mulF([3, 5], [7, 11]), [5, 3]), n(11)), n(7));
    eq(addF(mulF([3, 8], [2, 7]), mulF([5, 7], [3, 8])), [3, 8]);
    eq(addF([1, 2], [1, 4]), [3, 4]);
  });
});
