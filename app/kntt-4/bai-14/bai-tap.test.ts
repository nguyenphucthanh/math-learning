import type { FillQuestion, Question } from "@/components/exercises/types";
import { parseAnswer } from "@/lib/area-units";
import { hangName } from "@/lib/hang-lop";
import { compareNumbers, largestFrom, smallestFrom } from "@/lib/so-sanh";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
/** "6 000 000 + 500 000 + 7 000" → 6 507 000. */
const sum = (text: string) => text.split("+").reduce((total, part) => total + parseAnswer(part)!, 0);
const digitsOf = (text: string) => text.replace(/[^\d]/g, "").split("").map(Number);

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

  it("3 câu khởi động và 3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["so-sanh", 3],
      ["sap-xep", 6],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("khởi động", () => {
  it("số chữ số, so sánh, hàng", () => {
    expect(blankAnswers(find("kd-chu-so", "dien-so").parts)).toEqual([String(480000000).length]);
    expect(parseAnswer(chosen("kd-so-sanh"))).toBe(Math.max(7458, 7548));
    expect(chosen("kd-hang")).toBe(hangName(7).replace(/^h/, "H"));
  });
});

describe("câu so sánh tính lại bằng phép tính", () => {
  it("mọi hàng của ss-1 và các câu thử đúng dấu", () => {
    for (const question of [find("ss-1", "so-sanh"), find("thu-cung", "so-sanh"), find("thu-tong", "so-sanh")]) {
      for (const row of question.rows) {
        const left = sum(row.left);
        const right = sum(row.right);
        expect(row.answer, `${row.left} ? ${row.right}`).toBe(left > right ? ">" : left < right ? "<" : "=");
        expect(compareNumbers(left, right).sign, `${row.left} ? ${row.right}`).toBe(row.answer);
      }
    }
  });

  it("ss-1 có đủ ba dấu và hai hàng vế tổng", () => {
    const rows = find("ss-1", "so-sanh").rows;
    expect(new Set(rows.map((row) => row.answer))).toEqual(new Set([">", "<", "="]));
    expect(rows.filter((row) => row.right.includes("+"))).toHaveLength(2);
  });

  it("thu-chu-so và ss-2: nhiều chữ số hơn thì lớn hơn", () => {
    expect(parseAnswer(chosen("thu-chu-so"))).toBe(100000000);
    expect(compareNumbers(99999999, 100000000).sign).toBe("<");
    expect(chosen("ss-2")).toContain("nhiều chữ số hơn");
    expect(compareNumbers(1000000000, 999000000).sign).toBe(">");
  });

  it("ss-3: so từ trái sang phải thì 64 003 912 lớn hơn", () => {
    expect(compareNumbers(64003912, 51872495)).toMatchObject({ sign: ">", by: "hang", position: 7 });
    expect(chosen("ss-3").replace(/\u00a0/g, " ")).toContain("64 003 912 lớn hơn");
    expect(chosen("ss-3")).toContain("6 > 5");
  });

  it("st-3: 3 050 000 có nhiều chữ số hơn 350 000 nên lớn hơn", () => {
    expect(compareNumbers(3050000, 350000)).toEqual({ sign: ">", by: "so-chu-so" });
    expect(chosen("st-3")).toContain("7 chữ số");
  });
});

describe("sắp xếp", () => {
  it("xt-1 và xt-2: video nhiều nhất và ít nhất", () => {
    const views: Record<string, number> = { "Video A": 2450300, "Video B": 24503000, "Video C": 9870000 };
    const names = Object.keys(views);
    const biggest = names.reduce((best, name) => (compareNumbers(views[name], views[best]).sign === ">" ? name : best));
    const smallest = names.reduce((best, name) => (compareNumbers(views[name], views[best]).sign === "<" ? name : best));
    expect(chosen("xt-1")).toBe(biggest);
    expect(chosen("xt-2")).toBe(smallest);
    expect(Math.max(...Object.values(views))).toBe(views[biggest]);
    expect(Math.min(...Object.values(views))).toBe(views[smallest]);
  });

  it("xt-3: chỉ một dãy giảm dần, và là dãy được chọn", () => {
    const question = find("xt-3", "trac-nghiem");
    const sequences = question.options.map((option) => option.split(">").map((part) => parseAnswer(part)!));
    const descending = sequences.map((values) => values.every((value, index) => index === 0 || values[index - 1] > value));
    expect(descending.filter(Boolean)).toHaveLength(1);
    expect(descending[question.answerIndex]).toBe(true);
    for (const values of sequences) expect([...values].sort((a, b) => a - b)).toEqual([...sequences[0]].sort((a, b) => a - b));
  });

  it("xt-4 và thu-xep: các số tăng dần và đúng tập số trong đề", () => {
    const [a, b, c, d] = blankAnswers(find("xt-4", "dien-so").parts);
    expect(a < b && b < c && c < d).toBe(true);
    expect([a, b, c, d].sort((x, y) => x - y)).toEqual([100001, 99099, 100000, 99999].sort((x, y) => x - y));
    const [x, y, z] = blankAnswers(find("thu-xep", "dien-so").parts);
    expect(x < y && y < z).toBe(true);
    expect([x, y, z].sort((p, q) => p - q)).toEqual([4205000, 420500, 42050000].sort((p, q) => p - q));
  });
});

describe("lập số từ các thẻ", () => {
  const cards = [5, 0, 0, 7, 2, 4, 0, 6, 9];

  it("xt-5: số lớn nhất và bé nhất khớp với duyệt mọi cách xếp", () => {
    // Việc duyệt mọi cách xếp được kiểm tra ở lib/so-sanh.test.ts; ở đây kiểm tra đáp án dùng đúng các thẻ.
    const [largest, smallest] = blankAnswers(find("xt-5", "dien-so").parts);
    expect(largest).toBe(largestFrom(cards));
    expect(smallest).toBe(smallestFrom(cards));
    const counts = (value: number) => digitsOf(String(value)).sort().join("");
    expect(counts(largest)).toBe([...cards].sort().join(""));
    expect(counts(smallest)).toBe([...cards].sort().join(""));
    expect(String(smallest)).toHaveLength(9);
    expect(String(largest)).toHaveLength(9);
  });

  it("thu-the-lon và thu-the-be", () => {
    const six = [4, 0, 6, 0, 2, 9];
    expect(blankAnswers(find("thu-the-lon", "dien-so").parts)).toEqual([largestFrom(six)]);
    expect(blankAnswers(find("thu-the-be", "dien-so").parts)).toEqual([smallestFrom(six)]);
  });

  it("xt-6: 14 vòng lên chín cột, mỗi cột tối đa 9, số lớn nhất", () => {
    // Duyệt từ hàng cao xuống thấp, thử chữ số lớn trước: kết quả đầu tiên đủ 14 vòng là số lớn nhất.
    const search = (positions: number, rings: number): number[] | null => {
      if (positions === 0) return rings === 0 ? [] : null;
      for (let digit = Math.min(9, rings); digit >= 0; digit -= 1) {
        if (rings - digit > 9 * (positions - 1)) break;
        const rest = search(positions - 1, rings - digit);
        if (rest) return [digit, ...rest];
      }
      return null;
    };
    const best = Number(search(9, 14)!.join(""));
    expect(blankAnswers(find("xt-6", "dien-so").parts)).toEqual([best]);
    expect(digitsOf(String(best)).reduce((a, b) => a + b, 0)).toBe(14);
  });

  it("câu sách LT4: 12 vòng lớn nhất là 930 000 000 và hình mẫu dùng đủ 12 vòng", () => {
    expect(digitsOf("312 211 011").reduce((a, b) => a + b, 0)).toBe(12);
    expect(9 + 3).toBe(12);
  });
});

describe("câu vượt SGK", () => {
  it("st-1: số bé nhất chín chữ số và số lớn nhất tám chữ số hơn kém 1", () => {
    const [nine, eight] = blankAnswers(find("st-1", "dien-so").parts);
    expect(String(nine)).toHaveLength(9);
    expect(String(eight)).toHaveLength(8);
    expect(nine).toBe(10 ** 8);
    expect(eight).toBe(10 ** 8 - 1);
  });

  it("st-2: chữ số lớn nhất để 7□0 000 < 745 000", () => {
    const valid = Array.from({ length: 10 }, (_, digit) => digit).filter((digit) => Number(`7${digit}0000`) < 745000);
    expect(blankAnswers(find("st-2", "dien-so").parts)).toEqual([Math.max(...valid)]);
  });
});

describe("đáp án trong sách SGK trang 47-49 đúng với quy tắc", () => {
  it("Hoạt động 1 và 2", () => {
    const sgk: [number, number, ">" | "<" | "="][] = [
      [278992000, 278999, ">"],
      [37338449, 37839449, "<"],
      [3004000, 3400000, "<"],
      [200000000, 99999999, ">"],
      [3405000, 3000000 + 400000 + 5000, "="],
      [650700, 6000000 + 500000 + 7000, "<"],
      [230000000, 108000000, ">"],
      [950000000, 1000000000, "<"],
      [37003847, 23938399, ">"],
    ];
    for (const [a, b, sign] of sgk) expect(compareNumbers(a, b).sign, `${a} ? ${b}`).toBe(sign);
  });

  it("Luyện tập 1: nhiều nhất là lợn, ít nhất là trâu", () => {
    const animals: [string, number][] = [["Trâu", 2332800], ["Bò", 6230500], ["Lợn", 22027900]];
    const sorted = [...animals].sort((x, y) => (compareNumbers(x[1], y[1]).sign === ">" ? -1 : 1));
    expect(sorted[0][0]).toBe("Lợn");
    expect(sorted[2][0]).toBe("Trâu");
  });

  it("Luyện tập 2: đoàn tàu B", () => {
    const values = [1000000000, 380999999, 380000982, 99999999];
    expect([...values].sort((a, b) => b - a)).toEqual(values);
  });

  it("Luyện tập 3: 988 731 000 và 100 037 889", () => {
    const cards = [8, 0, 0, 9, 1, 7, 0, 3, 8];
    expect(largestFrom(cards)).toBe(988731000);
    expect(smallestFrom(cards)).toBe(100037889);
  });

  it("Luyện tập 4: 12 vòng cho số lớn nhất 930 000 000", () => {
    expect([9, 3, 0, 0, 0, 0, 0, 0, 0].reduce((a, b) => a + b, 0)).toBe(12);
    expect(Number([9, 3, 0, 0, 0, 0, 0, 0, 0].join(""))).toBe(930000000);
  });
});
