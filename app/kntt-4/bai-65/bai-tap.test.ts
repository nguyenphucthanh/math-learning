import type { FillQuestion, Question } from "@/components/exercises/types";
import { convertTime } from "@/lib/time-units";
import { describe, expect, it } from "vitest";
import { baoSpec, chaoSpec, exerciseGroups, gaoSpec, gioSpec, giaySpec, lopSpec, nuocSpec, chimSpec, quickChecks, tauSpec, timSpecs, warmUps, type Spec } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blanks(find(id, "dien-so").parts);
const lines = (id: string) => find(id, "loi-van").lines.map((line) => blanks(line));

/** n × a/b: n phải chia hết cho b; trả về [tử số, mẫu số, kết quả] tính độc lập bằng chia cho từng phần. */
const mul = (n: number, a: number, b: number) => {
  expect(n % b, `${n} chia hết cho ${b}`).toBe(0);
  const part = n / b;
  return [n * a, b, part * a];
};
const mulSpec = (s: Spec) => mul(s.n, s.a, s.b);

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
      ["tim-phan-so", 9],
      ["nhieu-buoc", 5],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đáp án", () => {
  it("câu thử và khởi động", () => {
    expect(answers("kd-1")).toEqual([12 / 3]);
    expect(answers("kd-2")).toEqual([4 * 3, 5]);
    expect(answers("kd-3")).toEqual([24 / 3]);
    expect(answers("thu-3-4")).toEqual(mul(20, 3, 4));
    expect(answers("thu-1-6")).toEqual(mul(convertTime("1 giờ", "phút"), 1, 6));
    expect(answers("thu-con-lai")).toEqual([mul(30, 1, 3)[2], mul(30, 1, 2)[2], 30 - 10 - 15]);
  });

  it("tìm phân số của một số", () => {
    timSpecs.forEach((s, i) => expect(answers(`tim-${i + 1}`)).toEqual(mulSpec(s)));
    const choiceQ = find("tn-1", "trac-nghiem");
    expect(choiceQ.options[choiceQ.answerIndex]).toBe(`${mulSpec(timSpecs[0])[2]}`);
  });

  it("bài toán một bước", () => {
    expect(lines("lop")).toEqual([mulSpec(lopSpec)]);
    expect(lines("nuoc")).toEqual([mulSpec(nuocSpec)]);
    expect(lines("giay")).toEqual([mulSpec(giaySpec)]);
    expect(lines("chim")).toEqual([mulSpec(chimSpec)]);
  });

  it("tàu thuỷ: nhiều bước, đổi thế kỉ ra năm", () => {
    const whole = tauSpec.whole;
    expect(whole.n).toBe(convertTime(`${tauSpec.century} thế kỉ`, "năm"));
    const [l1, l2, l3, l4] = lines("tau");
    expect(l1).toEqual(mulSpec(whole));
    const years = l1[2];
    expect(l2).toEqual(mul(years, tauSpec.atlantic.a, tauSpec.atlantic.b));
    expect(l3).toEqual(mul(years, tauSpec.pacific.a, tauSpec.pacific.b));
    expect(l4).toEqual([years - l2[2] - l3[2]]);
    expect(l4[0]).toBeGreaterThan(0);
  });

  it("báo săn: đổi phút ra giây rồi chia", () => {
    expect(baoSpec.minute.n).toBe(convertTime("1 phút", "giây"));
    const [l1, l2] = lines("bao");
    expect(l1).toEqual(mulSpec(baoSpec.minute));
    expect(baoSpec.meters % l1[2]).toBe(0);
    expect(l2).toEqual([baoSpec.meters / l1[2]]);
  });

  it("chim chào mào: hai bước liên tiếp", () => {
    const [l1, l2] = lines("chao");
    expect(l1).toEqual(mul(chaoSpec.n, chaoSpec.first.a, chaoSpec.first.b));
    expect(l2).toEqual(mul(l1[2], chaoSpec.second.a, chaoSpec.second.b));
  });

  it("cửa hàng gạo: còn lại", () => {
    const [l1, l2, l3] = lines("gao");
    expect(l1).toEqual(mul(gaoSpec.n, gaoSpec.morning.a, gaoSpec.morning.b));
    expect(l2).toEqual(mul(gaoSpec.n, gaoSpec.afternoon.a, gaoSpec.afternoon.b));
    expect(l3).toEqual([gaoSpec.n - l1[2] - l2[2]]);
    expect(l3[0]).toBeGreaterThan(0);
  });

  it("1/6 giờ ra phút", () => {
    const [num, den, res] = mul(convertTime("1 giờ", "phút"), gioSpec.a, gioSpec.b);
    expect(answers("gio")).toEqual([60, den, res]);
    expect(num).toBe(60);
  });

  it("suy nghĩ thêm", () => {
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    expect(answers("sn-2")).toEqual([8 / gcd(8, 12), 12 / gcd(8, 12)]);
    expect(mul(40, 1, 2)[2]).toBe(20);
    expect(answers("sn-3")).toEqual([mul(mul(40, 1, 2)[2], 1, 2)[2], mul(40, 1, 4)[2]]);
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
  });
});
