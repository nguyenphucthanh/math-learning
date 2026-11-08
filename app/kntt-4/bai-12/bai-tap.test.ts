import type { FillQuestion, Question } from "@/components/exercises/types";
import { parseAnswer } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { describe, expect, it } from "vitest";
import { exerciseGroups, expand, matKhauHopLe, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const num = (text: string) => parseAnswer(text)!;
const permutations = <T,>(items: T[]): T[][] =>
  items.length <= 1 ? [items] : items.flatMap((item, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]));

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("câu nào cũng có gợi ý và giải thích", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("câu trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("câu nối cặp có rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      question.rightOrder.forEach((value, index) => expect(value, question.id).not.toBe(index));
    }
  });

  it("3 câu khởi động và 8 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["doc-so", 4],
      ["hang-lop", 5],
      ["viet-tong", 4],
      ["ban-tinh", 3],
      ["mot-ti", 5],
      ["ghep-so", 3],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("khởi động và câu thử", () => {
  it("tính lại bằng phép tính", () => {
    expect(answers("kd-tong")).toEqual([40000 + 3000 + 200 + 5]);
    expect(answers("kd-lien-sau")).toEqual([99999 + 1]);
    expect(answers("thu-mot-ti")).toEqual([999999999 + 1]);
    // 538 204: chữ số 8 đứng ở hàng nghìn
    expect(Math.floor(538204 / 1000) % 10).toBe(8);
    expect(chosen("kd-hang")).toBe("Hàng nghìn");
  });

  it("chữ số 6 trong 164 280 937 ở hàng chục triệu", () => {
    expect(Math.floor(164280937 / 10_000_000) % 10).toBe(6);
    expect(chosen("thu-hang-lop")).toBe("Hàng chục triệu, lớp triệu");
  });

  it("viết 40 205 030 thành tổng", () => {
    const terms = answers("thu-tong");
    expect(terms.reduce((a, b) => a + b, 0)).toBe(40205030);
  });
});

describe("đọc số", () => {
  it("docSo khớp các ví dụ của SGK", () => {
    expect(docSo(149597876)).toBe("một trăm bốn mươi chín triệu năm trăm chín mươi bảy nghìn tám trăm bảy mươi sáu");
    expect(docSo(126476461)).toBe("một trăm hai mươi sáu triệu bốn trăm bảy mươi sáu nghìn bốn trăm sáu mươi mốt");
    expect(docSo(97338579)).toBe("chín mươi bảy triệu ba trăm ba mươi tám nghìn năm trăm bảy mươi chín");
    expect(docSo(273523615)).toBe("hai trăm bảy mươi ba triệu năm trăm hai mươi ba nghìn sáu trăm mười lăm");
    expect(docSo(1000000000)).toBe("một tỉ");
  });

  it("đáp án câu đọc số là cách đọc viết tay", () => {
    expect(chosen("ds-1")).toBe("bảy mươi tám triệu hai trăm linh năm nghìn một trăm linh chín");
    expect(chosen("ds-2")).toBe("bốn trăm linh hai triệu sáu trăm năm mươi");
    expect(chosen("thu-doc")).toBe("ba trăm linh năm triệu không trăm bảy mươi hai nghìn bốn trăm linh một");
  });

  it("viết số từ lời, từ các hàng và từ các lớp", () => {
    expect(docSo(75008300)).toBe("bảy mươi lăm triệu không trăm linh tám nghìn ba trăm");
    expect(answers("ds-3")).toEqual([75 * 1_000_000 + 8 * 1000 + 300]);
    expect(answers("ds-4")).toEqual([6 * 1_000_000 + 4 * 100_000 + 2 * 10_000 + 9]);
    expect(answers("hl-3")).toEqual([910 * 1_000_000 + 3 * 1000 + 70]);
  });
});

describe("hàng và lớp", () => {
  it("hl-1: chữ số 3 của 52 316 704 ở hàng trăm nghìn", () => {
    expect(Math.floor(52316704 / 100_000) % 10).toBe(3);
    expect(Math.floor(52316704 / 10_000_000) % 10).toBe(5); // lớp triệu
    expect(Math.floor(52316704 / 1000) % 10).toBe(6); // hàng nghìn, không phải chục nghìn
    expect(chosen("hl-1")).toBe("Chữ số 3 thuộc hàng trăm nghìn");
  });

  it("hl-2: ba lớp của 603 245 187", () => {
    expect(answers("hl-2").join("")).toBe("603245187");
  });

  it("hl-4: chữ số 4 của 25 349 018 ở hàng chục nghìn", () => {
    expect(Math.floor(25349018 / 10_000) % 10).toBe(4);
    expect(chosen("hl-4")).toBe("Hàng chục nghìn, lớp nghìn");
  });

  it("hl-5: giá trị chữ số 7", () => {
    const question = find("hl-5", "noi-cap");
    const value = (n: number) => (String(n).includes("7") ? 7 * 10 ** (String(n).length - 1 - String(n).indexOf("7")) : 0);
    for (const pair of question.pairs) expect(num(pair.right), pair.left).toBe(value(num(pair.left)));
  });
});

describe("viết thành tổng", () => {
  it("tổng các số hạng bằng số đã cho, mỗi số hạng khác 0", () => {
    const cases: [string, number][] = [
      ["vt-1", 36400502],
      ["vt-2", 270018004],
      ["vt-3", 4060090],
    ];
    for (const [id, value] of cases) {
      const terms = answers(id);
      expect(terms.reduce((a, b) => a + b, 0), id).toBe(value);
      expect(terms.every((term) => term > 0), id).toBe(true);
      expect(terms, id).toEqual(expand(value));
    }
    expect(expand(36400502)).toEqual([30000000, 6000000, 400000, 500, 2]);
  });

  it("vt-4: số còn thiếu", () => {
    expect(50_000_000 + 3_000_000 + answers("vt-4")[0] + 40).toBe(53200040);
  });
});

describe("bàn tính", () => {
  it("số ghi trên bàn tính có chữ số 0 ở cột trống và mỗi cột tối đa 9 hạt", () => {
    for (const [id, expected] of [
      ["bt-1", [2, 0, 8, 5, 3, 0, 0, 4, 7]],
      ["bt-2", [0, 0, 5, 0, 6, 0, 9, 0, 0]],
      ["bt-3", [0, 7, 1, 0, 0, 4, 3, 2, 0]],
    ] as [string, number[]][]) {
      const [value] = answers(id);
      expect(String(value).padStart(9, "0").split("").map(Number), id).toEqual(expected);
    }
  });
});

describe("một tỉ, số liền trước, số liền sau", () => {
  it("tính lại", () => {
    expect(answers("ls-1")).toEqual([99999999 + 1]);
    expect(answers("ls-2")).toEqual([10000000 - 1]);
    expect(answers("ls-3")).toEqual([String(10 ** 9).length, String(10 ** 9).replace(/[^0]/g, "").length]);
    expect(answers("ls-4")).toEqual([10 ** 9 - 1]);
    expect(answers("ls-5")).toEqual([10 ** 8]);
    expect(String(answers("ls-4")[0])).toHaveLength(9);
    expect(String(answers("ls-5")[0])).toHaveLength(9);
  });
});

describe("ghép số, mật khẩu", () => {
  it("gs-1: chỉ cách ghép này làm số tận cùng 000 là số bé hơn", () => {
    const [small, large] = answers("gs-1");
    expect(small).toBeLessThan(large);
    expect(small % 1000).toBe(0);
    const heads = [64128, 92037];
    const tails = [0, 514];
    const valid = [tails, [...tails].reverse()].filter(([t1, t2]) => {
      const values = [heads[0] * 1000 + t1, heads[1] * 1000 + t2];
      const withZero = values.find((v) => v % 1000 === 0)!;
      return withZero === Math.min(...values);
    });
    expect(valid).toHaveLength(1);
    expect([small, large]).toEqual([heads[0] * 1000 + 0, heads[1] * 1000 + 514]);
  });

  it("gs-2: chỉ một lựa chọn thỏa điều kiện mật khẩu", () => {
    const question = find("gs-2", "trac-nghiem");
    const fits = question.options.filter((option) => matKhauHopLe(num(option)));
    expect(fits).toEqual([question.options[question.answerIndex]]);
  });

  it("gs-3: số chín chữ số lớn nhất ghép từ 407, 096, 250", () => {
    const values = permutations(["407", "096", "250"])
      .map((order) => order.join(""))
      .filter((text) => text[0] !== "0")
      .map(Number);
    expect(answers("gs-3")).toEqual([Math.max(...values)]);
  });
});

describe("suy nghĩ thêm", () => {
  it("st-1: số đúng đọc ra lời của Nam", () => {
    const question = find("st-1", "trac-nghiem");
    expect(question.prompt).toContain(docSo(num(chosen("st-1"))));
    expect(num(chosen("st-1"))).toBe(50 * 1_000_000 + 2 * 1000);
  });

  it("st-2: thêm chữ số 0 bên phải thì gấp 10 lần", () => {
    expect(Number(`${8500000}0`) / 8500000).toBe(answers("st-2")[0]);
  });

  it("st-3: ô chữ nối đúng", () => {
    const question = find("st-3", "noi-cap");
    const expected = [999999999 + 1, 320 * 1_000_000, 2_000_000 + 100_000 + 50_000 + 2_000, 1_000_000 - 1];
    question.pairs.forEach((pair, index) => expect(num(pair.right), pair.left).toBe(expected[index]));
    expect(docSo(320000000)).toBe("ba trăm hai mươi triệu");
  });

  it("st-4: một tỉ gấp một triệu 1 000 lần", () => {
    expect(10 ** 9 / 10 ** 6).toBe(answers("st-4")[0]);
  });
});
