import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { baSpec, exerciseGroups, hd1Specs, khacSpec, lt1Specs, lt2Answer, lt2Specs, lt3Specs, lt4Specs, quenSpec, quickChecks, rutGon, timHaiSpecs, warmUps } from "./bai-tap";

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

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong-1", 3],
      ["hoat-dong-2", 2],
      ["lt-1", 3],
      ["lt-2", 3],
      ["lt-3", 2],
      ["lt-4", 2],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án", () => {
  it("hoạt động 1: mẫu lớn chia hết mẫu bé, tử số nhân đúng hệ số", () => {
    hd1Specs.forEach(({ a, b, c, d }, i) => {
      expect(d % b).toBe(0);
      const [tu, mau] = answers(`hd-${i + 1}`);
      expect(mau).toBe(d);
      expect(tu).toBe(a * (d / b));
      expect(equal(a, b, tu, mau)).toBe(true);
      expect(c).toBeLessThan(d);
    });
  });

  it("hoạt động 2: hai phân số bằng và có mẫu số chung", () => {
    timHaiSpecs.forEach(({ a, b, c, d, m }, i) => {
      const [[x], [y]] = wordAnswers(`th-${i + 1}`);
      expect(m % b).toBe(0);
      expect(m % d).toBe(0);
      expect(equal(a, b, x, m)).toBe(true);
      expect(equal(c, d, y, m)).toBe(true);
    });
  });

  it("luyện tập 1: hệ số và phân số bằng", () => {
    lt1Specs.forEach(({ a, b, d }, i) => {
      expect(d % b).toBe(0);
      const [[k], [tu, mau]] = wordAnswers(`l1-${i + 1}`);
      expect(k).toBe(d / b);
      expect(mau).toBe(d);
      expect(equal(a, b, tu, mau)).toBe(true);
    });
  });

  it("luyện tập 2: rút gọn tối giản rồi quy đồng cùng mẫu số", () => {
    lt2Specs.forEach((s, i) => {
      const [[a1, b1, c1, d1], [x, m1, y, m2]] = wordAnswers(`l2-${i + 1}`);
      expect(equal(s.a, s.b, a1, b1)).toBe(true);
      expect(equal(s.c, s.d, c1, d1)).toBe(true);
      expect(rutGon(a1, b1)).toEqual([a1, b1]);
      expect(rutGon(c1, d1)).toEqual([c1, d1]);
      expect(m1).toBe(m2);
      expect(m1 % b1).toBe(0);
      expect(m1 % d1).toBe(0);
      expect(equal(a1, b1, x, m1)).toBe(true);
      expect(equal(c1, d1, y, m2)).toBe(true);
      expect(lt2Answer(s).m).toBe(m1);
    });
  });

  it("luyện tập 3: ba phân số cùng mẫu số chung", () => {
    lt3Specs.forEach(({ fr, m }, i) => {
      const [[mau], ...rest] = wordAnswers(`l3-${i + 1}`);
      expect(mau).toBe(m);
      fr.forEach(([x, y], j) => {
        expect(m % y).toBe(0);
        expect(equal(x, y, rest[j][0], m)).toBe(true);
      });
    });
  });

  it("luyện tập 4: chỉ một lựa chọn có mẫu số m và bằng phân số đã cho", () => {
    lt4Specs.forEach((s, i) => {
      const q = find(`l4-${i + 1}`, "trac-nghiem");
      q.options.forEach((o, j) => {
        const [c, d] = frac(o);
        expect(d === s.m && equal(s.a, s.b, c, d), `${q.id} ${o}`).toBe(j === q.answerIndex);
      });
    });
    expect(lt4Specs[0].options[lt4Specs[0].answer]).toBe("16/72");
  });

  it("suy nghĩ thêm", () => {
    // sn-1: chỉ nhân tử số thì không bằng.
    expect(equal(quenSpec.a, quenSpec.b, quenSpec.a * 2, quenSpec.b)).toBe(false);
    expect(equal(quenSpec.a, quenSpec.b, quenSpec.a * 2, quenSpec.b * 2)).toBe(true);
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    // sn-2: hai số khác nhau thì không bằng; nhân cùng số thì bằng.
    expect(equal(khacSpec.a, khacSpec.b, khacSpec.a * 4, khacSpec.b * 5)).toBe(false);
    expect(equal(khacSpec.a, khacSpec.b, khacSpec.a * 4, khacSpec.b * 4)).toBe(true);
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(0);
    // sn-3: 12 : 3 chia hết nhưng 5 : 3 thì không.
    expect(12 % 3).toBe(0);
    expect(5 % 3).not.toBe(0);
    expect(find("sn-3", "trac-nghiem").answerIndex).toBe(0);
    // sn-4
    const tong = baSpec.fr.reduce((s, [x, y]) => s + (x * baSpec.m) / y, 0);
    expect(answers("sn-4")).toEqual([tong]);
    expect(tong).toBe(7);
  });

  it("khởi động và câu thử", () => {
    expect(answers("kd-nhan")).toEqual([4 * 3]);
    expect(answers("kd-chia")).toEqual([12 / 4]);
    const [c, d] = answers("kd-tcb");
    expect(equal(3, 4, c, d)).toBe(true);
    const [x, y] = answers("thu-quy");
    expect(equal(2, 5, x, y)).toBe(true);
    expect(y).toBe(10);
    expect(equal(1, 4, 2, 4)).toBe(false);
    expect(find("thu-quen", "trac-nghiem").answerIndex).toBe(0);
    const q = find("thu-mau-chung", "trac-nghiem");
    expect(q.options[q.answerIndex]).toBe("9");
    expect(9 % 3).toBe(0);
  });

  it("đáp án SGK tr.62-63 (ví dụ)", () => {
    expect(equal(3, 4, 9, 12)).toBe(true);
    expect(rutGon(2, 36)).toEqual([1, 18]);
    expect(rutGon(8, 12)).toEqual([2, 3]);
    expect(rutGon(10, 25)).toEqual([2, 5]);
    expect(rutGon(14, 40)).toEqual([7, 20]);
    expect(equal(2, 9, 16, 72)).toBe(true);
  });
});
