import type { FillQuestion, Question, Sign } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { binhNuoc, cungMauRows, cungTuBay, cungTuRows, beNhat, exerciseGroups, hinhSpecs, khacMauRows, lonHon1, ocSen, quickChecks, quyDongSpec, sapXepSpecs, thoSpec, voiMotRows, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const frac = (text: string): [number, number] => {
  const [x, y = "1"] = text.split("/");
  return [Number(x), Number(y)];
};
/** So sánh bằng nhân hai tích (chỉ để kiểm tra, không dạy con). */
const cmp = (a: string, b: string): Sign => {
  const [p, q] = frac(a);
  const [s, t] = frac(b);
  return p * t > s * q ? ">" : p * t < s * q ? "<" : "=";
};
const value = (text: string) => frac(text)[0] / frac(text)[1];

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
      ["cung-mau", 5],
      ["voi-1", 2],
      ["khac-mau", 6],
      ["cung-tu", 2],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("đáp án", () => {
  it("mọi hàng so sánh: dấu đúng khi tính lại bằng nhân", () => {
    for (const question of questions) {
      if (question.kind !== "so-sanh") continue;
      for (const row of question.rows) expect(row.answer, `${question.id} ${row.left} ? ${row.right}`).toBe(cmp(row.left, row.right));
    }
  });

  it("dấu cũng đúng khi tính bằng số thập phân", () => {
    for (const row of [...cungMauRows, ...voiMotRows, ...khacMauRows.flat(), ...cungTuRows]) {
      const a = value(row.left);
      const b = value(row.right);
      expect(row.answer).toBe(a > b + 1e-9 ? ">" : a < b - 1e-9 ? "<" : "=");
    }
  });

  it("mỗi nhóm đúng quy tắc của tiết", () => {
    for (const { left, right } of cungMauRows) expect(frac(left)[1]).toBe(frac(right)[1]);
    for (const row of voiMotRows) expect(row.answer).toBe(frac(row.left)[0] < frac(row.left)[1] ? "<" : frac(row.left)[0] > frac(row.left)[1] ? ">" : "=");
    for (const { left, right } of khacMauRows.flat()) {
      const [da, db] = [frac(left)[1], frac(right)[1]];
      expect(frac(left)[1]).not.toBe(frac(right)[1]);
      expect(Math.max(da, db) % Math.min(da, db), `${left} ${right}: mẫu lớn chia hết mẫu bé`).toBe(0);
    }
    for (const { left, right } of cungTuRows) expect(frac(left)[0]).toBe(frac(right)[0]);
  });

  it("so sánh theo hình: số phần tô và dấu", () => {
    hinhSpecs.forEach((s, i) => {
      expect(s.a.mau).toBe(s.b.mau);
      const row = find(`h-${i + 1}`, "so-sanh").rows[0];
      expect([row.left, row.right]).toEqual([`${s.a.to}/${s.a.mau}`, `${s.b.to}/${s.b.mau}`]);
      expect(row.answer).toBe(s.a.to > s.b.to ? ">" : "<");
    });
  });

  it("sắp xếp cùng mẫu số: đúng thứ tự, đủ các số của đề", () => {
    sapXepSpecs.forEach((s, i) => {
      const got = answers(`sx-${i + 1}`);
      const sorted = [...s.tus].sort((a, b) => (s.order === "bé đến lớn" ? a - b : b - a));
      expect(got).toEqual(sorted);
      expect(got).toEqual([...s.answer]);
    });
  });

  it("lớn hơn 1", () => {
    const q = find("v-2", "trac-nghiem");
    expect(q.options).toEqual(lonHon1.options);
    q.options.forEach((o, i) => expect(frac(o)[0] > frac(o)[1], o).toBe(i === q.answerIndex));
  });

  it("quy đồng 2/3 = 8/12 và 8/12 > 7/12", () => {
    const [[x]] = find("q-1", "loi-van").lines.map((line) => blankAnswers(line));
    expect(x).toBe(quyDongSpec.a * quyDongSpec.k);
    expect(quyDongSpec.b * quyDongSpec.k).toBe(quyDongSpec.mau);
    expect(cmp(`${x}/${quyDongSpec.mau}`, quyDongSpec.other)).toBe(">");
    expect(cmp("2/3", quyDongSpec.other)).toBe(">");
  });

  it("ốc sên: dài nhất", () => {
    const q = find("km-3", "trac-nghiem");
    const biggest = ocSen.lengths.reduce((best, x, i) => (value(x) > value(ocSen.lengths[best]) ? i : best), 0);
    expect(q.answerIndex).toBe(biggest);
    expect(q.options[q.answerIndex]).toContain(ocSen.names[biggest]);
    expect(new Set(ocSen.lengths.map((x) => value(x).toFixed(6))).size).toBe(3);
  });

  it("bình nước: ít nhất", () => {
    const q = find("km-4", "trac-nghiem");
    const least = binhNuoc.amounts.reduce((best, x, i) => (value(x) < value(binhNuoc.amounts[best]) ? i : best), 0);
    expect(q.answerIndex).toBe(least);
    expect(q.options[q.answerIndex]).toBe(`Bình ${binhNuoc.names[least]}`);
  });

  it("thỏ cân thăng bằng: thỏ trắng ở giữa, 13/2 = 39/6", () => {
    expect(cmp("13/2", "39/6")).toBe("=");
    const order = [0, 1, 2].sort((a, b) => value(thoSpec.weights[a]) - value(thoSpec.weights[b]));
    // nâu nặng nhất, đen nhẹ nhất, trắng ở giữa.
    const [den, trang, nau] = order;
    expect(thoSpec.weights[nau]).toBe("13/2");
    expect(thoSpec.weights[den]).toBe("21/6");
    expect(find("km-5", "trac-nghiem").answerIndex).toBe(trang);
    expect(find("km-5", "trac-nghiem").options[trang]).toBe("37/6 kg");
  });

  it("cùng tử số: câu bẫy 3/8 và 3/4", () => {
    expect(cmp("3/4", "3/8")).toBe(">");
    expect(cungTuBay.answerIndex).toBe(1);
    expect(beNhat.options[beNhat.answerIndex]).toBe("3/8");
    beNhat.options.forEach((o) => expect(value(o) >= value("3/8")).toBe(true));
  });

  it("suy nghĩ thêm", () => {
    expect(cmp("2/3", "5/12")).toBe(">");
    expect(find("sn-1", "trac-nghiem").answerIndex).toBe(0);
    const [x] = answers("sn-2");
    expect(cmp("5/9", `${x}/9`)).toBe("<");
    expect(cmp(`${x}/9`, "7/9")).toBe("<");
    expect(cmp("27/25", "1")).toBe(">");
    expect(cmp("25/27", "1")).toBe("<");
  });

  it("khởi động và câu thử", () => {
    expect(answers("kd-1")).toEqual([3 * 2]);
    expect(answers("kd-2")).toEqual([5 * 2]);
    expect(answers("kd-3")).toEqual([5, 8]);
    expect(answers("thu-quy-dong")).toEqual([3 * 2]);
    expect(cmp("3/5", "7/10")).toBe("<");
    expect(find("thu-cung-mau", "so-sanh").rows[0].answer).toBe(cmp("7/12", "5/12"));
    expect(find("thu-voi-mot", "so-sanh").rows.map((row) => row.answer)).toEqual(["8/9", "9/9", "10/9"].map((x) => cmp(x, "1")));
    const cungTu = find("thu-cung-tu", "trac-nghiem");
    expect(cungTu.options[cungTu.answerIndex]).toBe("2/3");
    expect(cmp("2/3", "2/5")).toBe(">");
  });
});
