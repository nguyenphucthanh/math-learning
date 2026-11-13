import type { FillQuestion, Question } from "@/components/exercises/types";
import { docSo } from "@/lib/doc-so";
import { describe, expect, it } from "vitest";
import {
  arrangements, assignSchools, compose, dayKinds, daySpecs, docSpecs, dungSaiSpecs, exerciseGroups, giaTriSpecs, honKemSpecs, loiSpec, quickChecks, sanhSpecs,
  terms, theSpec, thieuSpecs, tongValues, tronSpecs, truongSpec, voiSpec, xeSpec, danSoSpec,
} from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}
const blanks = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blanks(find(id, "dien-so").parts);
const lines = (id: string) => find(id, "loi-van").lines.map(blanks);
const chosen = (id: string) => {
  const q = find(id, "trac-nghiem");
  return q.options[q.answerIndex];
};
const digits = (value: number) => String(value).split("").map(Number);
/** Làm tròn bằng cách khác với `roundToPlace`: chia, làm tròn nửa lên, nhân lại. */
const roundCheck = (value: number, position: number) => Math.round(value / 10 ** position) * 10 ** position;
/** Chữ số đứng ở vị trí `position` tính từ hàng đơn vị. */
const placeValue = (value: number, position: number) => digits(value).reverse()[position] * 10 ** position;

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
      ["doc-viet", 9],
      ["viet-tong", 10],
      ["day-so", 13],
      ["so-sanh", 6],
      ["lam-tron", 3],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đọc số, viết số, hàng và lớp", () => {
  it("viết số từ các hàng: ghép lại đúng số, đọc đúng bằng chữ", () => {
    for (const { id, value } of docSpecs) {
      expect(answers(`viet-${id}`)).toEqual([value]);
      expect(terms(value).reduce((sum, t) => sum + t.value, 0)).toBe(value);
      // Đề nhắc đúng những hàng có chữ số khác 0.
      expect(compose(value).match(/\d/g)!.length).toBe(digits(value).filter((d) => d !== 0).length);
    }
    expect(compose(48206)).toBe("4 chục nghìn, 8 nghìn, 2 trăm và 6 đơn vị");
  });

  it("đọc số: lựa chọn đúng khớp cách đọc của SGK, các lựa chọn sai khác", () => {
    expect(docSo(507130)).toBe("năm trăm linh bảy nghìn một trăm ba mươi");
    expect(docSo(6040805)).toBe("sáu triệu không trăm bốn mươi nghìn tám trăm linh năm");
    for (const { id, value, wrong } of docSpecs) {
      const q = find(`doc-${id}`, "trac-nghiem");
      expect(chosen(`doc-${id}`)).toBe(docSo(value));
      for (const text of wrong) expect(text, `${value}`).not.toBe(docSo(value));
      expect(q.options).toHaveLength(4);
    }
    expect(chosen("thu-doc")).toBe("ba triệu không trăm năm mươi nghìn hai trăm linh bốn");
  });

  it("hàng và lớp: chữ số 8 của 5 280 396 ở hàng chục nghìn, lớp nghìn", () => {
    expect(String(5280396).length - 1 - String(5280396).indexOf("8")).toBe(4);
    expect(chosen("lop-1")).toBe("Hàng chục nghìn, lớp nghìn");
  });
});

describe("viết thành tổng, giá trị chữ số", () => {
  it("viết thành tổng: các số hạng cộng lại đúng số, tăng dần theo hàng", () => {
    for (const value of tongValues) {
      const got = answers(`tong-${value}`);
      expect(got.reduce((a, b) => a + b, 0)).toBe(value);
      expect(got.length).toBe(digits(value).filter((d) => d !== 0).length);
      for (let i = 1; i < got.length; i++) expect(got[i]).toBeLessThan(got[i - 1]);
    }
  });

  it("số ?: số điền vào làm tổng bằng đúng số cho trước", () => {
    for (const { value, hide } of thieuSpecs) {
      const [missing] = answers(`thieu-${value}`);
      expect(missing).toBe(placeValue(value, hide));
      const shown = digits(value).reverse().map((d, p) => d * 10 ** p).filter((v, p) => v > 0 && p !== hide);
      expect(shown.reduce((a, b) => a + b, 0) + missing).toBe(value);
    }
  });

  it("giá trị của chữ số, mỗi chữ số xuất hiện một lần", () => {
    for (const { value, a, b } of giaTriSpecs) {
      expect(digits(value).filter((d) => d === a)).toHaveLength(1);
      expect(digits(value).filter((d) => d === b)).toHaveLength(1);
      const reversed = digits(value).reverse();
      expect(answers(`gia-tri-${value}`)).toEqual([reversed.indexOf(a), reversed.indexOf(b)].map((p, i) => [a, b][i] * 10 ** p));
    }
    expect(answers("thu-gia-tri")).toEqual([placeValue(1593407, 5)]);
  });
});

describe("dãy số tự nhiên, số chẵn, số lẻ", () => {
  it("Đ/S: câu có phép tính thì tính lại, câu còn lại theo định nghĩa", () => {
    const truth = (id: string) => dungSaiSpecs.find((s) => s.id === id)!.truth;
    expect(truth("b")).toBe(3999999 + 1 === 4000000);
    expect(truth("c")).toBe(false);
    expect(99999999 + 1).toBeGreaterThan(99999999);
    expect(truth("e")).toBe(1000 - 1 === 900);
    expect(truth("g")).toBe(false);
    expect(truth("a")).toBe(true);
    expect(truth("d")).toBe(true);
    for (const s of dungSaiSpecs) expect(chosen(`ds-${s.id}`), s.id).toBe(s.truth ? "Đúng" : "Sai");
  });

  it("hơn kém nhau: tính bằng cách liệt kê các số liên tiếp cùng loại", () => {
    for (const { id, step, from } of honKemSpecs) {
      const kind = id === "tu-nhien" ? () => true : id === "chan" ? (x: number) => x % 2 === 0 : (x: number) => x % 2 === 1;
      expect(kind(from)).toBe(true);
      let next = from + 1;
      while (!kind(next)) next++;
      expect(answers(`hon-kem-${id}`)).toEqual([next - from]);
      expect(step).toBe(next - from);
    }
    expect(answers("thu-hon-kem")).toEqual([2]);
    expect(answers("thu-lien-sau")).toEqual([999999 + 1]);
  });

  it("dãy bốn số liên tiếp: đủ bốn số cùng loại, liền nhau", () => {
    const next = (x: number, kind: string) => {
      let y = x + 1;
      while (kind === "chan" && y % 2 !== 0) y++;
      while (kind === "le" && y % 2 !== 1) y++;
      return y;
    };
    for (const { id, start, hidden } of daySpecs) {
      expect(Object.keys(dayKinds)).toContain(id);
      const seq = [start];
      for (let i = 1; i < 4; i++) seq.push(next(seq[i - 1], id));
      expect(answers(`day-${id}`)).toEqual(hidden.map((i) => seq[i]));
    }
    expect(answers("day-tu-nhien")).toEqual([5000, 5002]);
    expect(answers("day-le")).toEqual([8999, 9001]);
    expect(answers("day-chan")).toEqual([59998, 60002]);
  });

  it("số chẵn bé nhất, số lẻ lớn nhất lập từ các thẻ", () => {
    const all = arrangements(theSpec.cards);
    expect(all).toHaveLength(18);
    expect(answers("the-chan")).toEqual([Math.min(...all.filter((x) => x % 2 === 0))]);
    expect(answers("le-lon")).toEqual([Math.max(...all.filter((x) => x % 2 === 1))]);
    expect(answers("the-chan")).toEqual([3074]);
    expect(answers("le-lon")).toEqual([7403]);
    // Với thẻ 0, 1, 2, 3 của SGK.
    expect(Math.min(...arrangements([0, 1, 2, 3]).filter((x) => x % 2 === 0))).toBe(1032);
  });
});

describe("so sánh, xếp thứ tự", () => {
  it("con voi nặng nhất, xe đạp rẻ nhất", () => {
    expect(chosen("voi")).toBe(`Voi ${voiSpec.reduce((a, b) => (b.kg > a.kg ? b : a)).name}`);
    expect(chosen("xe")).toBe(`Xe ${xeSpec.reduce((a, b) => (b.price < a.price ? b : a)).name}`);
    expect(chosen("voi")).toBe("Voi C");
    expect(chosen("xe")).toBe("Xe D");
  });

  it("bốn trường: chỉ có đúng một cách chia thỏa cả ba điều kiện, kể cả với số của SGK", () => {
    expect(assignSchools([2065, 1892, 2131, 1868])).toEqual([[2131, 1892, 1868, 2065]]);
    const ways = assignSchools(truongSpec.values);
    expect(ways).toHaveLength(1);
    expect(answers("truong-1")).toEqual(ways[0]);
    expect(answers("truong-2")).toEqual([...truongSpec.values].sort((a, b) => a - b));
  });

  it("so sánh có tổng", () => {
    for (const s of sanhSpecs) {
      const sum = (t: string) => t.split("+").map((x) => Number(x.replace(/\D/g, ""))).reduce((a, b) => a + b, 0);
      const l = sum(s.left);
      const r = sum(s.right);
      expect(chosen(s.id)).toBe(l > r ? ">" : l < r ? "<" : "=");
    }
    expect(chosen("ss-1")).toBe("<");
    expect(chosen("ss-2")).toBe(">");
    expect(chosen("thu-so-sanh")).toBe(">");
  });
});

describe("làm tròn", () => {
  it("số dân làm tròn đến hàng nghìn, chục nghìn, trăm nghìn", () => {
    const [a, b, c] = danSoSpec.places.map((p) => roundCheck(danSoSpec.value, p));
    expect(lines("tron-dan-so")).toEqual([[a], [b], [c]]);
    expect([a, b, c]).toEqual([3483000, 3480000, 3500000]);
    // Số dân 96 208 984 của SGK (chưa đối chiếu nguồn).
    expect([3, 4, 5].map((p) => roundCheck(96208984, p))).toEqual([96209000, 96210000, 96200000]);
  });

  it("làm tròn đến hàng nghìn và câu thử", () => {
    for (const s of tronSpecs) expect(answers(s.id)).toEqual([roundCheck(s.value, s.place)]);
    expect(answers("thu-lam-tron")).toEqual([roundCheck(835500, 3)]);
    expect(answers("tim-loi")).toEqual([roundCheck(loiSpec.value, 3)]);
    expect(roundCheck(loiSpec.value, 3)).not.toBe(loiSpec.wrong);
  });

  it("số ban đầu: chỉ có một lựa chọn làm tròn ra 3 480 000", () => {
    const q = find("tron-doc", "trac-nghiem");
    const fits = q.options.map((o, i) => [i, roundCheck(Number(o.replace(/\D/g, "")), 4)]).filter(([, r]) => r === 3480000);
    expect(fits).toEqual([[q.answerIndex, 3480000]]);
  });

  it("số liền sau và số liền trước", () => {
    expect(chosen("vi-sao")).toBe("Hai số bằng nhau");
    expect(49999 + 1).toBe(50001 - 1);
  });
});
