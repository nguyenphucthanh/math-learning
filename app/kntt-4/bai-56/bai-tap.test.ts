import type { FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { chiaSpec, exerciseGroups, hoaLoPairs, motBuocSpecs, quickChecks, rutGonSpecs, soSpec, tichSpecs, toiGianSpecs, tracNghiemSpecs, warmUps } from "./bai-tap";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const prod = (xs: number[]) => xs.reduce((p, x) => p * x, 1);
const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}
const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const frac = (t: string) => t.split("/").map(Number);
const tuGian = (a: number, b: number) => gcd(a, b) === 1;

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const q of questions) {
      if (q.kind !== "noi-cap") continue;
      expect([...q.rightOrder].sort(), q.id).toEqual(q.pairs.map((_, i) => i));
      q.rightOrder.forEach((v, i) => expect(v, q.id).not.toBe(i));
    }
  });

  it("tối giản: đáp án theo gcd", () => {
    toiGianSpecs.forEach(({ a, b }, i) => expect(find(`tg-${i + 1}`, "trac-nghiem").answerIndex).toBe(tuGian(a, b) ? 0 : 1));
    expect(toiGianSpecs.some((s) => tuGian(s.a, s.b))).toBe(true);
    expect(toiGianSpecs.some((s) => !tuGian(s.a, s.b))).toBe(true);
  });

  it("rút gọn một bước: k là ước chung lớn hơn 1, kết quả tối giản", () => {
    motBuocSpecs.forEach(({ a, b, k }, i) => {
      expect(k).toBeGreaterThan(1);
      expect(a % k).toBe(0);
      expect(b % k).toBe(0);
      expect(answers(`mb-${i + 1}`)).toEqual([a / k, b / k]);
      expect(tuGian(a / k, b / k)).toBe(true);
    });
  });

  it("hoa và lọ: phân số bằng nhau, lọ tối giản", () => {
    for (const [l, r] of hoaLoPairs) {
      expect(l.a * r.b).toBe(l.b * r.a);
      expect(tuGian(r.a, r.b)).toBe(true);
      expect(tuGian(l.a, l.b)).toBe(false);
    }
    const q = find("hl-1", "noi-cap");
    q.pairs.forEach((p, i) => {
      const [l, r] = [frac(p.left), frac(p.right)];
      expect(l[0] * r[1]).toBe(l[1] * r[0]);
      expect(hoaLoPairs[i][1]).toEqual({ a: r[0], b: r[1] });
    });
  });

  it("số ?: 20/30 = 10/? = ?/3", () => {
    const { a, b, tuMid, mauEnd } = soSpec;
    const [mid, tu] = answers("so-1");
    expect(a * mid).toBe(b * tuMid);
    expect(a * mauEnd).toBe(b * tu);
    expect(tuGian(tu, mauEnd)).toBe(true);
  });

  it("rút gọn đến tối giản", () => {
    rutGonSpecs.forEach(({ a, b }, i) => {
      const [tu, mau] = answers(`rg-${i + 1}`);
      expect(tu * b).toBe(mau * a);
      expect(tuGian(tu, mau)).toBe(true);
    });
  });

  it("trắc nghiệm: đáp án bằng, tối giản; các lựa chọn khác sai", () => {
    tracNghiemSpecs.forEach(({ a, b, options, answer }, i) => {
      const q = find(`tn-${i + 1}`, "trac-nghiem");
      expect(q.answerIndex).toBe(answer);
      options.forEach((o, j) => {
        const [x, y] = frac(o);
        const dung = x * b === y * a && tuGian(x, y);
        expect(dung, o).toBe(j === answer);
      });
    });
    // bẫy SGK: 24/30 và 12/15 bằng 48/60 nhưng chưa tối giản
    expect(gcd(48, 60)).toBe(12);
  });

  it("rút gọn tích", () => {
    tichSpecs.forEach(({ top, bottom }, i) => {
      const [tu, mau] = answers(`ti-${i + 1}`);
      expect(tu * prod(bottom)).toBe(mau * prod(top));
      expect(tuGian(tu, mau)).toBe(true);
    });
  });

  it("bài toán thỏ: hai phần bằng nhau sau khi rút gọn", () => {
    const { items } = chiaSpec;
    const key = items.map((x) => `${x.a / gcd(x.a, x.b)}/${x.b / gcd(x.a, x.b)}`);
    const same = key.flatMap((k, i) => key.flatMap((m, j) => (i < j && k === m ? [[i, j]] : [])));
    expect(same).toEqual([[0, 1]]);
    expect(find("bt-1", "trac-nghiem").options[find("bt-1", "trac-nghiem").answerIndex]).toBe("An và Bình");
  });

  it("câu thử và khởi động", () => {
    expect(answers("thu-rut-gon")).toEqual([18 / gcd(18, 27), 27 / gcd(18, 27)]);
    expect(answers("thu-tich")).toEqual([3, 8]);
    expect(answers("kd-bai55")).toEqual([4, 6]);
    expect(answers("kd-chia")).toEqual([3, 5]);
    expect(find("kd-chung", "trac-nghiem").answerIndex).toBe(2);
    expect(gcd(15, 25)).toBe(5);
    expect(tuGian(5, 8)).toBe(true);
    expect(find("thu-toi-gian", "trac-nghiem").answerIndex).toBe(1);
    expect(gcd(6, 15)).toBe(3);
    expect(answers("sn-3")).toEqual([7 / gcd(7, 14), 14 / gcd(7, 14)]);
  });

  it("suy nghĩ thêm", () => {
    expect(gcd(24, 30)).toBeGreaterThan(1);
    expect(tuGian(1, 9)).toBe(true);
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(1);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
    // (2+5)/(2+7) = 7/9 tối giản, khác 5/7
    expect(tuGian(2 + 5, 2 + 7)).toBe(true);
    expect(find("sn-4", "trac-nghiem").answerIndex).toBe(1);
  });
});
