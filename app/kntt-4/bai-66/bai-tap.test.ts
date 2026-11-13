import type { FillQuestion, Question } from "@/components/exercises/types";
import { toKg } from "@/lib/mass-units";
import { describe, expect, it } from "vitest";
import {
  aoSpec, banhChung, bieuThucC, chiaDoiSpec, chiaSpecs, exerciseGroups, gcd, hopCoi, khay, khayHang, lonNhat, noiSpecs, nhanSpecs, quangDuong, quickChecks,
  sayChuoi, thuanTienA, thuanTienB, timSpecs, tuoi, vai,
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

// Phép tính độc lập với code dữ liệu: giữ phân số chưa rút gọn, so bằng nhân chéo.
const mulF = (a: F, b: F): F => [a[0] * b[0], a[1] * b[1]];
const divF = (a: F, b: F): F => [a[0] * b[1], a[1] * b[0]];
const addF = (a: F, b: F): F => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
const subF = (a: F, b: F): F => [a[0] * b[1] - b[0] * a[1], a[1] * b[1]];
const n = (x: number): F => [x, 1];
/** Ô trả lời là phân số: một ô là số tự nhiên, hai ô là tử và mẫu; phải tối giản. */
const ok = (got: number[], want: F, label = "") => {
  const f: F = got.length === 1 ? [got[0], 1] : [got[0], got[1]];
  expect(got.length, `${label} số ô`).toBeLessThanOrEqual(2);
  expect(f[0] * want[1], `${label} ${f}≠${want}`).toBe(f[1] * want[0]);
  expect(gcd(f[0], f[1]), `${label} tối giản`).toBe(1);
  if (want[1] !== 0 && want[0] % want[1] === 0) expect(got.length, `${label} số tự nhiên thì một ô`).toBe(1);
};

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm hợp lệ, nối cặp hợp lệ", () => {
    for (const q of questions) {
      if (q.kind === "trac-nghiem") {
        expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
        expect(new Set(q.options).size, q.id).toBe(q.options.length);
      }
      if (q.kind === "noi-cap") {
        expect([...q.rightOrder].sort(), q.id).toEqual(q.pairs.map((_, i) => i));
        q.rightOrder.forEach((v, i) => expect(v, `${q.id} vị trí ${i}`).not.toBe(i));
        expect(new Set(q.pairs.map((p) => p.right)).size).toBe(q.pairs.length);
      }
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["nhan", 5],
      ["chia", 7],
      ["tim-phan-so", 5],
      ["tong-hop", 5],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đáp án", () => {
  it("câu thử Nhắc lại nhanh", () => {
    ok(answers("thu-nhan"), mulF([2, 3], [4, 5]));
    expect(answers("thu-rut-gon")).toEqual([1, 6]);
    expect(4 * 3 * 6).toBe(72 * 1); // 12/72 = 1/6
    ok(answers("thu-chia"), divF([3, 4], [2, 5]));
    const [x, y] = answers("thu-dao-nguoc");
    expect(mulF([5, 9], [x, y])).toEqual([45, 45]);
    expect(answers("thu-tim-phan-so")).toEqual([20]);
    expect(24 * 5).toBe(20 * 6);
    const [p, q, r, s] = answers("thu-thu-tu");
    ok([p, q], divF([1, 3], n(2)));
    ok([r, s], subF([5, 6], divF([1, 3], n(2))));
  });

  it("nhân và tính thuận tiện", () => {
    nhanSpecs.forEach(([a, b], i) => ok(answers(`n-${i + 1}`), mulF(a, b), `n-${i + 1}`));
    ok(answers("tt-1"), thuanTienA.reduce(mulF), "tt-1");
    expect(mulF(thuanTienA[0], thuanTienA[2])[0]).toBe(mulF(thuanTienA[0], thuanTienA[2])[1]); // cặp đảo ngược
    const { a, b, c } = thuanTienB;
    ok(answers("tt-2"), addF(mulF(a, c), mulF(b, c)), "tt-2");
    expect(addF(a, b)[0]).toBe(addF(a, b)[1]); // a + b = 1
  });

  it("chia, tìm phân số thích hợp", () => {
    chiaSpecs.forEach(([a, b], i) => ok(answers(`ch-${i + 1}`), divF(a, b), `ch-${i + 1}`));
    // Thử lại bằng phép tính ngược.
    const t = (i: number) => answers(`tim-${i}`);
    const f = (i: number): F => (t(i).length === 1 ? [t(i)[0], 1] : [t(i)[0], t(i)[1]]);
    ok(t(1), divF(timSpecs[0].c, divF(n(1), timSpecs[0].a)), "tim-1");
    // ? : a = c
    const r1 = divF(f(1), timSpecs[0].a);
    expect(r1[0] * timSpecs[0].c[1]).toBe(r1[1] * timSpecs[0].c[0]);
    // a : ? = c
    const r2 = divF(timSpecs[1].a, f(2));
    expect(r2[0] * timSpecs[1].c[1]).toBe(r2[1] * timSpecs[1].c[0]);
    // ? × a = 1
    const r3 = mulF(f(3), timSpecs[2].a);
    expect(r3[0]).toBe(r3[1]);
    expect(t(3)).toEqual([timSpecs[2].a[1], timSpecs[2].a[0]]);
  });

  it("nối phép tính với kết quả", () => {
    const q = find("noi", "noi-cap");
    noiSpecs.forEach(({ op, a, b }, i) => {
      expect(q.pairs[i].left.startsWith(`${a[1] === 1 ? a[0] : `${a[0]}/${a[1]}`}`)).toBe(true);
      const want = op === "×" ? mulF(a, b) : divF(a, b);
      const got = q.pairs[i].right.split("/").map(Number);
      ok(got.length === 1 ? got : got, want, `noi ${i}`);
    });
  });

  it("tìm phân số của một số", () => {
    const [d, left] = lineAnswers("qd");
    ok(d, mulF(n(quangDuong.total), quangDuong.done));
    ok(left, subF(n(quangDuong.total), mulF(n(quangDuong.total), quangDuong.done)));
    const [viet, anh] = lineAnswers("tuoi");
    ok(viet, mulF(n(tuoi.ong), tuoi.ratio));
    ok(anh, addF(mulF(n(tuoi.ong), tuoi.ratio), n(tuoi.hon)));
    const [hop, kg] = lineAnswers("hop");
    ok(hop, mulF(n(hopCoi.total), hopCoi.share));
    ok(kg, mulF(mulF(n(hopCoi.total), hopCoi.share), hopCoi.weight));
    const [rot, con] = lineAnswers("vai");
    ok(rot, mulF(n(vai.jars), vai.jar));
    ok(con, subF(n(vai.total), mulF(n(vai.jars), vai.jar)));
    expect(vai.total).toBeGreaterThan(vai.jars * vai.jar[0] / vai.jar[1]); // còn dương
  });

  it("khay ốc vít: đếm từ hình (3 đen, 3 vàng, 2 trắng)", () => {
    const flat = khayHang.flat();
    const count = (c: string) => flat.filter((x) => x === c).length;
    expect([count("den"), count("vang"), count("trang")]).toEqual([3, 3, 2]);
    expect(flat).toHaveLength(8);
    const [den, trang] = lineAnswers("khay");
    expect(den).toEqual([count("den"), flat.length]);
    ok(trang, mulF(n(khay.total), [count("trang"), flat.length]));
    expect(trang).toEqual([200]);
  });

  it("biểu thức, ao, hình chia đôi, đổi đơn vị", () => {
    const { a, b, c } = bieuThucC;
    const [q, r] = lineAnswers("bt");
    ok(q, divF(b, c));
    ok(r, subF(a, divF(b, c)));
    // Biểu thức lớn nhất: tính độc lập.
    const { A, B, C } = lonNhat;
    const vals = [mulF(n(A.n), A.f), divF(subF(B.a, B.b), B.c), divF(mulF(C.a, C.b), n(C.n))].map((v) => v[0] / v[1]);
    expect(vals).toEqual([4, 6, 2 / 9]);
    expect(find("lon-nhat", "trac-nghiem").answerIndex).toBe(vals.indexOf(Math.max(...vals)));
    // Ao: dài = 91/2 : 4 = 91/8; ao rộng 3 m; diện tích 273/8.
    const [len, wid, area] = lineAnswers("ao");
    const L = divF(aoSpec.area, n(aoSpec.width));
    ok(len, L);
    expect(wid).toEqual([aoSpec.width - aoSpec.path]);
    ok(area, mulF(L, n(aoSpec.width - aoSpec.path)));
    expect(area).toEqual([273, 8]);
    // Phần ao + lối đi = cả mảnh đất.
    const pathArea = mulF(L, n(aoSpec.path));
    expect(subF(aoSpec.area, pathArea)[0] * 8).toBe(273 * subF(aoSpec.area, pathArea)[1]);
    // Hình chia đôi.
    const [ab, be, ae] = lineAnswers("chia-doi");
    ok(ab, divF(chiaDoiSpec.small, n(chiaDoiSpec.width)));
    ok(be, divF(chiaDoiSpec.big, n(chiaDoiSpec.width)));
    ok(ae, addF(divF(chiaDoiSpec.small, n(chiaDoiSpec.width)), divF(chiaDoiSpec.big, n(chiaDoiSpec.width))));
    expect(ae).toEqual([71, 4]);
    // Rô-bốt sấy chuối: 1 tạ = 100 kg, 100 × 1/4 = 25 kg; chỉ một lựa chọn bằng 25 kg.
    const want = toKg("1 tạ") * sayChuoi.ratio[0] / sayChuoi.ratio[1];
    const kgOf = ([num, unit]: [string, string]) => (num === "1/4" ? toKg(`1 ${unit}`) / 4 : toKg(`${num} ${unit}`));
    const hits = sayChuoi.options.map(kgOf).map((v, i) => (v === want ? i : -1)).filter((i) => i >= 0);
    expect(hits).toHaveLength(1);
    expect(find("chuoi", "trac-nghiem").answerIndex).toBe(hits[0]);
  });

  it("suy nghĩ thêm", () => {
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(2); // 24 × 5/6 = 20 < 24
    expect(24 * 5 / 6).toBeLessThan(24);
    // Bánh chưng 8 miếng: 8 × 1/5 không nguyên (Tí sai), 8 × 1/4 = 2 nguyên.
    expect((banhChung.pieces * banhChung.tiNoi[0]) % banhChung.tiNoi[1]).not.toBe(0);
    expect((banhChung.pieces * banhChung.teoNoi[0]) % banhChung.teoNoi[1]).toBe(0);
    expect(find("sn-3", "trac-nghiem").answerIndex).toBe(0);
  });
});
