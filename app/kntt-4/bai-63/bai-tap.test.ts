import type { ChoiceQuestion, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { exerciseGroups, mulSpecs, ngoac, quickChecks, ssSpecs, stories, thuanTien, tre, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
const byId = (id: string) => {
  const q = questions.find((item) => item.id === id);
  if (!q) throw new Error(id);
  return q;
};
const word = (id: string) => byId(id) as WordQuestion;

// Số học độc lập với bai-tap.ts: phân số là cặp số nguyên [tử, mẫu].
const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
type F = [number, number];
const red = ([a, b]: F): F => {
  const g = gcd(a, b);
  return [a / g, b / g];
};
const times = (...fs: F[]): F => red([fs.reduce((s, [a]) => s * a, 1), fs.reduce((s, [, b]) => s * b, 1)]);
const plus = (...fs: F[]): F => red(fs.reduce<F>(([a, b], [c, d]) => [a * d + c * b, b * d], [0, 1]));
const blanks = (lines: Part[][]) => lines.flat().flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
/** Kết quả cuối của một câu loi-van: hai ô cuối, hoặc một ô nếu kết quả là số tự nhiên. */
const last = (lines: Part[][], n: number) => blanks(lines).slice(-n);
const finalOf = (lines: Part[][], r: F) => (r[1] === 1 ? last(lines, 1) : last(lines, 2));
const expected = (r: F) => (r[1] === 1 ? [r[0]] : r);

// Bộ phân tích biểu thức viết lại (độc lập với bai-tap.ts): số hạng cộng, thừa số nhân, ngoặc.
function evaluate(src: string): F {
  const t = src.replace(/\s+/g, "").match(/\d+\/\d+|[()+×]/g)!;
  let i = 0;
  const atom = (): F => {
    const x = t[i++];
    if (x === "(") {
      const v = sum();
      i++;
      return v;
    }
    const [a, b] = x.split("/").map(Number);
    return [a, b];
  };
  const prod = (): F => {
    let v = atom();
    while (t[i] === "×") {
      i++;
      v = times(v, atom());
    }
    return v;
  };
  const sum = (): F => {
    let v = prod();
    while (t[i] === "+") {
      i++;
      v = plus(v, prod());
    }
    return v;
  };
  return sum();
}
const parse = (s: string): F[] => Array.from(s.matchAll(/(\d+)\/(\d+)/g), (m) => [Number(m[1]), Number(m[2])] as F);

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm theo tiết", () => {
    expect(exerciseGroups.map((g) => g.id)).toEqual(["nhan-hai", "so-tu-nhien", "tinh-chat", "bai-toan", "suy-nghi-them"]);
  });
});

describe("đáp án phép nhân", () => {
  it("mọi câu tính: kết quả cuối là tích đã rút gọn", () => {
    for (const { id, factors } of mulSpecs) {
      const r = times(...factors);
      expect(finalOf(word(id).lines, r), id).toEqual(expected(r));
    }
  });

  it("tích chưa rút gọn bằng tử nhân tử, mẫu nhân mẫu", () => {
    for (const { id, factors, truoc } of mulSpecs) {
      const ans = blanks(word(id).lines);
      if (truoc) {
        // hai phân số rút gọn rồi mới nhân; mỗi phân số rút gọn bằng phân số cũ
        factors.forEach(([a, b], i) => {
          const [x, y] = [ans[i * 2], ans[i * 2 + 1]];
          expect(x * b, id).toBe(a * y);
          expect(gcd(x, y), id).toBe(1);
        });
        const [x1, y1, x2, y2, t, m] = ans;
        expect([t, m], id).toEqual([x1 * x2, y1 * y2]);
      } else {
        const [t, m] = ans;
        expect([t, m], id).toEqual([factors.reduce((s, [a]) => s * a, 1), factors.reduce((s, [, b]) => s * b, 1)]);
      }
    }
  });

  it("có đủ ×1, ×0, số tự nhiên đứng trước và đứng sau", () => {
    const has = (pred: (fs: F[]) => boolean) => mulSpecs.some((s) => pred(s.factors as F[]));
    expect(has((fs) => fs[1][0] === 1 && fs[1][1] === 1)).toBe(true);
    expect(has((fs) => fs[1][0] === 0)).toBe(true);
    expect(has((fs) => fs[0][1] === 1 && fs[0][0] > 1)).toBe(true);
    expect(has((fs) => fs[0][0] === 0)).toBe(true);
    expect(word("n-3").lines.flat()).toContain("12/5 × 0 = (12 × 0)/(5 × 1) =");
  });

  it("có câu nhân xong phải rút gọn và câu kết quả lớn hơn 1", () => {
    for (const id of ["nr-1", "nr-2", "n-7", "n-8"]) expect(word(id).lines.length, id).toBe(2);
    const [t, m] = times(...(mulSpecs.find((s) => s.id === "n-1")!.factors as F[]));
    expect(t).toBeGreaterThan(m);
  });
});

describe("tính chất và tính thuận tiện", () => {
  it("so sánh: đáp án khớp với giá trị từng vế", () => {
    for (const { id, rows } of ssSpecs) {
      const q = byId(id);
      if (q.kind !== "so-sanh") throw new Error(id);
      q.rows.forEach((row, i) => {
        const [a, b] = evaluate(rows[i][0]);
        const [c, d] = evaluate(rows[i][1]);
        expect(row.answer, `${id} ${i}`).toBe(a * d === b * c ? "=" : a * d > b * c ? ">" : "<");
        expect([row.left, row.right]).toEqual([...rows[i]]);
      });
    }
  });

  it("SGK: ba cặp bằng nhau; câu vượt SGK có cả > và <", () => {
    const answers = (id: string) => (byId(id) as { rows: { answer: string }[] }).rows.map((r) => r.answer);
    expect(answers("ss-1")).toEqual(["=", "=", "="]);
    expect(new Set(answers("ss-2"))).toEqual(new Set([">", "<"]));
  });

  it("tính thuận tiện: kết quả bằng thừa số chung", () => {
    for (const { id, x, y, c } of thuanTien) {
      const total = plus(x as F, y as F);
      expect(total, id).toEqual([1, 1]);
      const ans = blanks(word(id).lines);
      expect(ans.slice(0, 2), id).toEqual(parse(`${x[0] + y[0]}/${x[1]}`)[0]);
      expect(ans.slice(-2), id).toEqual(red(times(total, c as F)));
    }
  });

  it("(a + b) × c: tổng trong ngoặc rồi nhân", () => {
    const { x, y, c } = ngoac;
    const ans = blanks(word("ng-1").lines);
    const s = plus(x as F, y as F);
    expect(ans[0] * s[1]).toBe(s[0] * ans[1]);
    expect(ans.slice(-2)).toEqual(times(s, c as F));
  });

  it("nhân ba thừa số", () => {
    const [a, b, n] = mulSpecs.find((s) => s.id === "b-1")!.factors as F[];
    expect(n[1]).toBe(1);
    expect(a[1]).toBe(n[0]);
    expect(last(word("b-1").lines, 2)).toEqual(times(a, b, n));
  });
});

describe("bài toán lời văn và hình học", () => {
  it("diện tích tấm nhôm, chu vi hình vuông, tàu vũ trụ", () => {
    expect(last(word("nhom").lines, 2)).toEqual(times(stories.nhom.dai as F, stories.nhom.rong as F));
    expect(last(word("vuong").lines, 2)).toEqual(times([4, 1], stories.vuong.canh as F));
    const tau = times([stories.tau.vong, 1], stories.tau.moi as F);
    expect(tau[1]).toBe(1);
    expect(last(word("tau").lines, 1)).toEqual([tau[0]]);
  });

  it("chu vi bè cá", () => {
    const { dai, rong } = stories.be;
    const r = times(plus(dai as F, rong as F), [2, 1]);
    expect(last(word("be").lines, 1)).toEqual([r[0]]);
    expect(r[1]).toBe(1);
  });

  it("chuồng lợn: số con, số yến, đổi ra kg", () => {
    const { chuong, con, an } = stories.lon;
    const yen = times([chuong * con, 1], an as F);
    expect(yen[1]).toBe(1);
    expect(blanks(word("lon").lines)).toEqual([chuong * con, yen[0], yen[0] * 10]);
  });

  it("ô đỗ xe: một ô và tổng nhiều ô", () => {
    const { dai, rong, so } = stories.xe;
    const a = times(dai as F, rong as F);
    expect(blanks(word("xe").lines)).toEqual([...a, ...times([so, 1], a)]);
  });

  it("hiệp sĩ chia bánh", () => {
    const { n, a, b } = stories.hiep;
    const mot = plus(a as F, b as F);
    const tong = times([n, 1], mot);
    expect(tong[1]).toBe(1);
    const ans = blanks(word("hiep").lines);
    expect(ans.slice(0, 2)).toEqual([3, 6]);
    expect(red(ans.slice(0, 2) as F)).toEqual(mot);
    expect(ans[2]).toBe(tong[0]);
  });

  it("ba đoạn tre: B = 2/3 m đúng, C = 4/3 m nên 3/2 m sai", () => {
    const b = red([tre.bDotA, tre.dotA]);
    const c = times([2, 1], b);
    expect(b).toEqual([2, 3]);
    expect(c).toEqual([4, 3]);
    expect((byId("tre-a") as ChoiceQuestion).answerIndex).toBe(0);
    expect((byId("tre-b") as ChoiceQuestion).answerIndex).toBe(1);
    // 3/2 không bằng độ dài thật của C
    expect(c[0] * 2).not.toBe(3 * c[1]);
    // dài nhất là C: lớn hơn A (1 m) và B
    expect(c[0] / c[1]).toBeGreaterThan(1);
  });
});

describe("khởi động và câu thử", () => {
  it("điền số", () => {
    const fillAns = (id: string) => blanks([(byId(id) as FillQuestion).parts]);
    expect(fillAns("kd-rut")).toEqual(red([10, 15]));
    expect(fillAns("kd-mot")).toEqual([3]);
    expect(fillAns("thu-nhan")).toEqual(times([2, 3], [1, 5]));
    expect(fillAns("thu-rut")).toEqual(red(times([3, 4], [2, 5])));
    expect(fillAns("thu-stn")).toEqual(times([3, 7], [2, 1]));
    expect(fillAns("thu-khong")).toEqual([0]);
  });

  it("đúng sai về lỗi hay mắc", () => {
    // 2/5 × 3/5 không phải 6/5; 2/7 × 3 không phải 6/21
    expect(times([2, 5], [3, 5])).toEqual([6, 25]);
    expect(times([2, 7], [3, 1])).toEqual([6, 7]);
    expect((byId("thu-nham") as ChoiceQuestion).answerIndex).toBe(0);
    expect((byId("thu-stn-sai") as ChoiceQuestion).answerIndex).toBe(0);
    expect(times([3, 4], [2, 5])).toEqual(times([2, 5], [3, 4]));
  });

  it("Suy nghĩ thêm: 4/5 × 2/3 bé hơn 4/5, và nhân chéo của Hà sai", () => {
    const [a, b] = times([4, 5], [2, 3]);
    expect(a * 5).toBeLessThan(4 * b);
    expect(times([3, 5], [2, 3])).toEqual([2, 5]);
    expect(times([1, 2], [1, 3])).toEqual([1, 6]);
  });

  it("khởi động: diện tích hình chữ nhật 4 × 3", () => {
    const q = byId("kd-dt") as ChoiceQuestion;
    expect(q.options[q.answerIndex]).toBe(`${4 * 3} m²`);
  });
});
