import type { FillQuestion, Question, Sign } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { banh, bi, chonHinh, chuoi, cuoi, doanSpecs, exerciseGroups, hinhNoi, quickChecks, quyDongBa, quyDongHai, rutGon, sapXepPs, soSanhRows, tich, tinhChat, vietMau12 } from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}
const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const fillAns = (id: string) => blanks(find(id, "dien-so").parts);
const lineAns = (id: string) => find(id, "loi-van").lines.map(blanks);
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (text: string): [number, number] => {
  const [x, y = "1"] = text.split("/");
  return [Number(x), Number(y)];
};
const cmp = (a: string, b: string): Sign => {
  const [p, q] = frac(a);
  const [s, t] = frac(b);
  return p * t > s * q ? ">" : p * t < s * q ? "<" : "=";
};
const value = (text: string) => frac(text)[0] / frac(text)[1];
const same = (a: string, b: string) => cmp(a, b) === "=";
const f = ([a, b]: number[]) => `${a}/${b}`;
const prod = (xs: number[]) => xs.reduce((a, b) => a * b, 1);
const chosen = (id: string) => {
  const q = find(id, "trac-nghiem");
  return q.options[q.answerIndex];
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
      ["bang-nhau-rut-gon", 5],
      ["hinh-to-mau", 4],
      ["quy-dong", 6],
      ["so-sanh", 7],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("phân số bằng nhau và rút gọn", () => {
  it("chuỗi phân số: mọi phân số bằng phân số đầu, ô trống đúng", () => {
    for (const c of chuoi) for (const o of c.others) expect(same(f(c.base), f(o)), f(o)).toBe(true);
    expect(fillAns("pc-1")).toEqual([chuoi[0].others[0][1], chuoi[0].others[1][0]]);
    expect(fillAns("pc-2")).toEqual([chuoi[1].others[0][1], chuoi[1].others[1][0], chuoi[1].others[2][1]]);
    // Tử số đã cho khớp với ô trống: 18/30 = 3/5 = 6/10 = 36/60.
    expect(same("18/30", `3/${fillAns("pc-2")[0]}`)).toBe(true);
    expect(same("18/30", `${fillAns("pc-2")[1]}/10`)).toBe(true);
    expect(same("18/30", `36/${fillAns("pc-2")[2]}`)).toBe(true);
    expect(same("48/36", `24/${fillAns("pc-1")[0]}`)).toBe(true);
    expect(same("48/36", `${fillAns("pc-1")[1]}/3`)).toBe(true);
  });

  it("phân số bằng 3/7: đúng một lựa chọn", () => {
    expect(tinhChat.options.filter((o) => same(o, tinhChat.frac))).toHaveLength(1);
    expect(chosen("tc-1")).toBe("9/21");
  });

  it("rút gọn: tối giản và bằng phân số đầu", () => {
    const got = lineAns("rg-1");
    rutGon.forEach(([a, b], i) => {
      const [x, y] = got[i];
      expect(same(`${a}/${b}`, `${x}/${y}`)).toBe(true);
      expect(gcd(x, y)).toBe(1);
    });
  });

  it("rút gọn tích", () => {
    const got = lineAns("rg-2");
    tich.forEach(({ tu, mau }, i) => {
      const [x, y] = got[i];
      expect(same(`${prod(tu)}/${prod(mau)}`, `${x}/${y}`)).toBe(true);
      expect(gcd(x, y)).toBe(1);
    });
    expect(got).toEqual([[7, 11], [2, 3]]);
  });
});

describe("hình tô màu", () => {
  it("mỗi câu có đúng một phân số bằng phần tô", () => {
    hinhNoi.forEach(({ hinh, options }, i) => {
      const to = typeof hinh.to === "number" ? hinh.to : hinh.to.length;
      const eq = options.filter((o) => same(o, `${to}/${hinh.mau}`));
      expect(eq).toHaveLength(1);
      expect(chosen(`hn-${i + 1}`)).toBe(eq[0]);
    });
  });

  it("chọn hình tô 3/5: đúng một hình, các hình không trùng số ô tô", () => {
    const hit = chonHinh.items.filter((x) => same(`${x.to.length}/${chonHinh.mau}`, chonHinh.target));
    expect(hit).toHaveLength(1);
    expect(chosen("hn-4")).toBe(hit[0].label);
    for (const x of chonHinh.items) expect(new Set(x.to).size, x.label).toBe(x.to.length);
    expect(new Set(chonHinh.items.map((x) => x.to.length)).size).toBe(chonHinh.items.length);
  });
});

describe("quy đồng và đoạn thẳng", () => {
  it("quy đồng hai phân số: bằng phân số đầu, mẫu lớn chia hết mẫu bé", () => {
    const got = lineAns("qd-1");
    quyDongHai.forEach(({ a, b }, i) => {
      expect(b[1] % a[1]).toBe(0);
      expect(same(f(a), `${got[i][0]}/${b[1]}`)).toBe(true);
    });
  });

  it("quy đồng ba phân số về mẫu 36", () => {
    expect(quyDongBa.mau % quyDongBa.a[1]).toBe(0);
    expect(quyDongBa.mau % quyDongBa.b[1]).toBe(0);
    const [[x], [y]] = lineAns("qd-2");
    expect(same(f(quyDongBa.a), `${x}/36`)).toBe(true);
    expect(same(f(quyDongBa.b), `${y}/36`)).toBe(true);
    expect(frac(quyDongBa.giuNguyen)[1]).toBe(36);
  });

  it("viết 3; 1/4; 5/6 mẫu 12", () => {
    const [[x], [y], [z]] = lineAns("qd-3");
    expect(same(`${vietMau12.so}`, `${x}/12`)).toBe(true);
    expect(same(f(vietMau12.a), `${y}/12`)).toBe(true);
    expect(same(f(vietMau12.b), `${z}/12`)).toBe(true);
  });

  it("đoạn thẳng: phần của hai đoạn cộng lại bằng cả đoạn", () => {
    const [a, b] = doanSpecs;
    expect(fillAns("dt-1")).toEqual([a.parts - a.at, a.parts]);
    expect(a.at / a.parts).toBe(1 / 4);
    expect(fillAns("dt-2")).toEqual([b.at, b.parts, b.parts - b.at, b.parts]);
    const [hi, hk1, ik, hk2] = fillAns("dt-2");
    expect(hk1).toBe(hk2);
    expect(hi + ik).toBe(hk1);
  });
});

describe("so sánh", () => {
  it("mọi hàng so sánh: dấu đúng khi tính lại", () => {
    for (const q of questions) {
      if (q.kind !== "so-sanh") continue;
      for (const row of q.rows) {
        expect(row.answer, `${q.id} ${row.left} ? ${row.right}`).toBe(cmp(row.left, row.right));
        const a = value(row.left);
        const b = value(row.right);
        expect(row.answer).toBe(a > b + 1e-9 ? ">" : a < b - 1e-9 ? "<" : "=");
      }
    }
    expect(soSanhRows.flat()).toHaveLength(9);
  });

  it("bi, bánh, Cuội", () => {
    expect(chosen("bi")).toBe(value(bi.amounts[0]) > value(bi.amounts[1]) ? "Rô-bốt" : "Việt");
    const least = banh.amounts.indexOf([...banh.amounts].sort((a, b) => value(a) - value(b))[0]);
    expect(chosen("banh")).toBe(banh.names[least]);
    expect(value(cuoi.buoi)).toBeGreaterThan(1);
    expect(value(cuoi.thanhLong)).toBeLessThan(1);
    expect(chosen("cuoi").startsWith("Sai")).toBe(value(cuoi.thanhLong) <= value(cuoi.buoi));
  });

  it("sắp xếp: chỉ một lựa chọn đúng thứ tự bé đến lớn, đủ phân số", () => {
    const q = find("sx", "trac-nghiem");
    const sorted = (text: string) => {
      const xs = text.split("; ");
      return xs.every((x, i) => i === 0 || value(xs[i - 1]) < value(x)) && [...xs].sort().join() === [...sapXepPs].sort().join();
    };
    expect(q.options.filter(sorted)).toHaveLength(1);
    expect(sorted(q.options[q.answerIndex])).toBe(true);
  });
});

describe("suy nghĩ thêm và câu thử", () => {
  it("lỗi trừ cả tử và mẫu, rút gọn chưa hết", () => {
    expect(same("12/18", "6/12")).toBe(false);
    expect(same("12/18", "2/3")).toBe(true);
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(1);
    expect(same("24/36", "12/18")).toBe(true);
    expect(gcd(12, 18)).toBeGreaterThan(1);
    expect(gcd(2, 3)).toBe(1);
  });

  it("số nằm giữa", () => {
    const [x] = fillAns("sn-3");
    expect(cmp("3/5", `${x}/10`)).toBe("<");
    expect(cmp(`${x}/10`, "4/5")).toBe("<");
  });

  it("câu thử", () => {
    const k = find("thu-khai-niem", "trac-nghiem");
    expect(k.options[k.answerIndex]).toBe("5/8");
    expect(fillAns("thu-chia")).toEqual([8, 5]);
    expect(same("2/5", `${fillAns("thu-tinh-chat")[0]}/15`)).toBe(true);
    const [x, y] = fillAns("thu-rut-gon");
    expect(same("18/24", `${x}/${y}`)).toBe(true);
    expect(gcd(x, y)).toBe(1);
    expect(same("1/4", `${fillAns("thu-quy-dong")[0]}/12`)).toBe(true);
    expect(find("thu-so-sanh", "so-sanh").rows[0].answer).toBe(cmp("3/4", "7/12"));
  });
});
