import type { FillQuestion, Question, Sign } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { bangPs, chayThi, chiaSpec, chuoi, conVat, ech, exerciseGroups, lonHon, nhoHon1, quickChecks, quyDongBa, quyDongHai, rutGon, soSanhRows, tamGiac, tich, voi } from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((g) => g.questions)];
function find<K extends Question["kind"]>(id: string, kind: K) {
  const q = questions.find((item) => item.id === id);
  if (q?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return q as Extract<Question, { kind: K }>;
}
const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
const fillAns = (id: string) => blanks(find(id, "dien-so").parts);
const lineAns = (id: string) => find(id, "loi-van").lines.map(blanks);
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (text: string): [number, number] => {
  const [x, y = "1"] = text.split(" ")[0].split("/");
  return [Number(x), Number(y)];
};
const cmp = (a: string, b: string): Sign => {
  const [p, q] = frac(a);
  const [s, t] = frac(b);
  return p * t > s * q ? ">" : p * t < s * q ? "<" : "=";
};
const same = (a: string, b: string) => cmp(a, b) === "=";
const prod = (xs: number[]) => xs.reduce((a, b) => a * b, 1);
const chosen = (id: string) => {
  const q = find(id, "trac-nghiem");
  return q.options[q.answerIndex];
};
/** Tên theo thứ tự từ bé đến lớn, tính bằng so sánh nhân chéo từng cặp (đếm số phân số bé hơn). */
const ranked = (list: { name: string; amount: string }[]) => [...list].sort((a, b) => list.filter((x) => cmp(x.amount, a.amount) === "<").length - list.filter((x) => cmp(x.amount, b.amount) === "<").length).map((x) => x.name);

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["khai-niem", 3],
      ["tinh-chat", 3],
      ["rut-gon", 2],
      ["quy-dong", 2],
      ["so-sanh", 10],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("hình và phép chia", () => {
  it("tam giác: 14 tam giác, tô 9, đúng một phương án bằng phân số tô", () => {
    expect(tamGiac.squares * 2).toBe(14);
    expect(new Set(tamGiac.to).size).toBe(9);
    expect(Math.max(...tamGiac.to)).toBeLessThan(14);
    expect(tamGiac.options.filter((o) => same(o, "9/14"))).toHaveLength(1);
    expect(chosen("kn-1")).toBe("9/14");
  });

  it("đàn ếch: mỗi khung 15 con, chỉ khung được chọn tô 3/5 và đủ 15 vị trí hợp lệ", () => {
    for (const x of ech.items) {
      expect(new Set(x.to).size).toBe(x.to.length);
      expect(Math.max(...x.to)).toBeLessThan(ech.mau);
    }
    expect(ech.items.filter((x) => same(`${x.to.length}/${ech.mau}`, ech.target))).toHaveLength(1);
    expect(chosen("kn-2")).toBe("B");
  });

  it("phép chia", () => {
    expect(fillAns("kn-3")).toEqual([chiaSpec.tu, chiaSpec.mau]);
    expect(fillAns("thu-chia")).toEqual([7, 3]);
  });
});

describe("đáp án", () => {
  it("câu thử Nhắc lại nhanh", () => {
    expect(chosen("thu-khai-niem")).toBe("4/9");
    expect(fillAns("thu-tinh-chat")).toEqual([(3 * 20) / 4]);
    expect(fillAns("thu-rut-gon")).toEqual([20 / gcd(20, 30), 30 / gcd(20, 30)]);
    expect(fillAns("thu-quy-dong")).toEqual([(2 * 12) / 3]);
    const q = find("thu-so-sanh", "so-sanh");
    q.rows.forEach((row) => expect(row.answer).toBe(cmp(row.left, row.right)));
  });

  it("chuỗi phân số bằng nhau: mọi ô khớp phân số đầu bằng nhân chéo", () => {
    chuoi.forEach((c, i) => {
      const ans = fillAns(`tc-${i + 1}`);
      let k = 0;
      const [bt, bm] = c.base;
      for (const it of c.items) {
        const got = ans[k++];
        const [t, m] = "tu" in it ? [it.tu, got] : [got, it.mau];
        expect(t * bm, `${t}/${m}`).toBe(m * bt);
      }
      expect(k).toBe(ans.length);
    });
  });

  it("phân số bằng 4/9: đúng một lựa chọn", () => {
    expect(bangPs.options.filter((o) => same(o, bangPs.frac))).toHaveLength(1);
    expect(chosen("tc-3")).toBe("12/27");
  });

  it("rút gọn: tối giản và bằng phân số đầu", () => {
    const rows = lineAns("rg-1");
    rutGon.forEach(([a, b], i) => {
      const [x, y] = rows[i];
      expect(x * b).toBe(y * a);
      expect(gcd(x, y)).toBe(1);
    });
    const t = lineAns("rg-2");
    tich.forEach(({ tu, mau }, i) => {
      const [x, y] = t[i];
      expect(x * prod(mau)).toBe(y * prod(tu));
      expect(gcd(x, y)).toBe(1);
    });
    expect(t[1]).toEqual([3, 7]);
  });

  it("quy đồng: phân số mới bằng phân số cũ", () => {
    const l1 = lineAns("qd-1");
    quyDongHai.forEach(({ a, b }, i) => {
      const [x] = l1[i];
      expect(x * a[1]).toBe(a[0] * b[1]);
    });
    const l2 = lineAns("qd-2");
    [quyDongBa.a, quyDongBa.b].forEach((f, i) => expect(l2[i][0] * f[1]).toBe(f[0] * quyDongBa.mau));
    expect(quyDongBa.mau % quyDongBa.a[1]).toBe(0);
    expect(quyDongBa.mau % quyDongBa.b[1]).toBe(0);
    expect(quyDongBa.mau % frac(quyDongBa.giuNguyen)[1]).toBe(0);
  });

  it("so sánh có đơn vị: dấu khớp phép nhân chéo", () => {
    soSanhRows.forEach((rows, i) => {
      const q = find(`ss-${i + 1}`, "so-sanh");
      expect(q.rows).toEqual(rows);
      rows.forEach((row) => expect(row.answer, `${row.left} ? ${row.right}`).toBe(cmp(row.left, row.right)));
    });
    // Có đủ cả ba dấu.
    const signs = new Set(soSanhRows.flat().map((row) => row.answer));
    expect(signs).toEqual(new Set([">", "<", "="]));
  });

  it("ba vòi nước: nhiều nhất và ít nhất", () => {
    const order = ranked(voi);
    expect(chosen("so-1")).toBe(order[2]);
    expect(chosen("so-2")).toBe(order[0]);
    expect(order).toEqual(["Vòi số 1", "Vòi số 3", "Vòi số 2"]);
  });

  it("xếp con vật theo cân nặng và đáp án là một lựa chọn duy nhất", () => {
    const right = ranked(conVat).join(", ");
    expect(right).toBe("Vịt, Gà, Mèo, Thỏ");
    expect(chosen("so-3")).toBe(right);
    // Gà 5/2 khác mèo 28/8 (không bằng nhau).
    expect(same("5/2", "28/8")).toBe(false);
  });

  it("chạy thi: đầu tiên là thời gian ít nhất, cuối cùng là nhiều nhất", () => {
    const order = ranked(chayThi);
    expect(chosen("so-4")).toBe(order[0]);
    expect(chosen("so-5")).toBe(order[3]);
    expect(order[0]).toBe("Việt");
    expect(order[3]).toBe("Mai");
  });

  it("bé hơn 1 và lớn hơn 2/3: đúng một lựa chọn", () => {
    expect(nhoHon1.options.filter((o) => frac(o)[0] < frac(o)[1])).toHaveLength(1);
    expect(chosen("so-6")).toBe("24/36");
    expect(lonHon.options.filter((o) => cmp(o, lonHon.frac) === ">")).toHaveLength(1);
    expect(chosen("so-7")).toBe("7/9");
  });

  it("suy nghĩ thêm", () => {
    // sn-1: 3/4 lớn hơn 7/12 nên Mai chạy lâu hơn Việt.
    expect(cmp("3/4", "7/12")).toBe(">");
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(1);
    // sn-2: cùng tử số, mẫu số lớn hơn thì bé hơn.
    expect(cmp("3/7", "3/5")).toBe("<");
    expect(find("sn-2", "trac-nghiem").answerIndex).toBe(1);
    const [t, m] = fillAns("sn-3");
    expect(t * 3).toBe(m * 2);
    expect(t + m).toBe(35);
    // sn-4: phần thiếu để đủ 1 bé nhất là 1/12, tức 11/12 lớn nhất trong ba phân số bé hơn 1.
    const opts = ["7/8", "9/10", "11/12"];
    expect(opts.every((o, i) => i === 0 || cmp(o, opts[i - 1]) === ">")).toBe(true);
    expect(chosen("sn-4")).toBe("11/12");
  });
});
