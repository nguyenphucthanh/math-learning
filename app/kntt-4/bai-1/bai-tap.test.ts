import { describe, expect, it } from "vitest";
import type { FillQuestion, Question } from "@/components/exercises/types";
import { SEGMENTS } from "./_illustrations/que-tinh";
import { exerciseGroups, quickChecks, tiaSoTicks, warmUps } from "./bai-tap";

const questions: Question[] = [
  ...exerciseGroups.flatMap((group) => group.questions),
  ...Object.values(quickChecks),
  ...warmUps,
];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

function blanks(question: FillQuestion): number[] {
  return question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
}

function chosen(id: string): string {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
}

/** "6 000 + 300 + 70 + 2" hoặc "74 215" thành số. */
function sum(text: string): number {
  return text.split("+").reduce((total, term) => total + Number(term.replace(/\s/g, "")), 0);
}

const UNITS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

/** Đọc một nhóm 3 chữ số theo cách SGK; `full` là có đọc cả hàng trăm khi hàng trăm bằng 0 ("không trăm"). */
function readGroup(value: number, full: boolean): string {
  const hundreds = Math.floor(value / 100);
  const tens = Math.floor(value / 10) % 10;
  const units = value % 10;
  const words: string[] = [];
  if (hundreds > 0 || full) words.push(`${UNITS[hundreds]} trăm`);
  if (tens === 0) {
    if (units > 0) words.push(hundreds === 0 && !full ? UNITS[units] : `linh ${UNITS[units]}`);
  } else if (tens === 1) {
    words.push(units === 0 ? "mười" : units === 5 ? "mười lăm" : `mười ${UNITS[units]}`);
  } else {
    const unit = units === 0 ? "" : units === 1 ? " mốt" : units === 4 ? " tư" : units === 5 ? " lăm" : ` ${UNITS[units]}`;
    words.push(`${UNITS[tens]} mươi${unit}`);
  }
  return words.join(" ");
}

function read(value: number): string {
  const thousands = Math.floor(value / 1000);
  const rest = value % 1000;
  const parts: string[] = [];
  if (thousands > 0) parts.push(`${readGroup(thousands, false)} nghìn`);
  if (rest > 0) parts.push(readGroup(rest, thousands > 0));
  return parts.join(" ");
}

const plain = (text: string) => Number(text.replace(/\s/g, ""));

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.options[question.answerIndex], question.id).toBeDefined();
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("câu nối có thứ tự cột phải là hoán vị và không trùng vị trí đáp án", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      const sorted = [...question.rightOrder].sort((a, b) => a - b);
      expect(sorted, question.id).toEqual(question.pairs.map((_, index) => index));
      expect(question.rightOrder.some((value, index) => value === index), question.id).toBe(false);
    }
  });
});

describe("đọc và viết số", () => {
  it("bộ đọc số theo cách SGK", () => {
    expect(read(36515)).toBe("ba mươi sáu nghìn năm trăm mười lăm");
    expect(read(61034)).toBe("sáu mươi mốt nghìn không trăm ba mươi tư");
    expect(read(7941)).toBe("bảy nghìn chín trăm bốn mươi mốt");
    expect(read(20809)).toBe("hai mươi nghìn tám trăm linh chín");
  });

  it("dv-1: chữ số từng hàng của 52 076", () => {
    expect(blanks(find("dv-1", "dien-so"))).toEqual(String(52076).split("").map(Number));
  });

  it("dv-2: viết số từ các hàng", () => {
    expect(blanks(find("dv-2", "dien-so"))).toEqual([Number([9, 1, 0, 3, 5].join(""))]);
  });

  it("dv-3: cách đọc số 52 076", () => {
    expect(chosen("dv-3")).toBe(read(52076));
  });

  it("dv-4: ba mươi nghìn bốn trăm linh bảy", () => {
    expect(read(blanks(find("dv-4", "dien-so"))[0])).toBe("ba mươi nghìn bốn trăm linh bảy");
  });

  it("dv-5, dv-6: số gồm các hàng cho trước", () => {
    expect(blanks(find("dv-5", "dien-so"))).toEqual([6 * 10000 + 4 * 100 + 8 * 10 + 2]);
    expect(blanks(find("dv-6", "dien-so"))).toEqual([9 * 10000 + 4 * 1000 + 6]);
  });

  it("dv-7: mỗi số nối với đúng cách đọc", () => {
    for (const pair of find("dv-7", "noi-cap").pairs) expect(pair.right, pair.left).toBe(read(plain(pair.left)));
  });

  it("câu thử viết số", () => {
    expect(read(blanks(find("thu-viet", "dien-so"))[0])).toBe("bốn mươi nghìn bảy trăm linh hai");
  });

  it("khởi động: viết số và số liền sau", () => {
    expect(blanks(find("kd-viet", "dien-so"))).toEqual([3 * 1000 + 4 * 100 + 2 * 10 + 7]);
    expect(blanks(find("kd-lien-sau", "dien-so"))).toEqual([2999 + 1]);
    expect(chosen("kd-so-sanh")).toBe(String(Math.max(4506, 4560)).replace(/(\d)(\d{3})/, "$1 $2"));
  });
});

describe("phân tích số thành tổng", () => {
  it("các câu điền: hai vế bằng nhau", () => {
    for (const id of ["pt-1", "pt-2", "pt-3", "pt-4", "thu-phan-tich"]) {
      const question = questions.find((item) => item.id === id) as FillQuestion;
      const text = question.parts.map((part) => (typeof part === "string" ? part : part.answer)).join(" ");
      const [left, right] = text.split("=");
      expect(sum(left), id).toBe(sum(right));
    }
  });

  it("pt-4 và pt-3 chỉ có một ô trống đúng giá trị hàng", () => {
    expect(blanks(find("pt-2", "dien-so"))).toEqual([200]);
    expect(blanks(find("pt-4", "dien-so"))).toEqual([900]);
  });

  it("pt-5: số hạng thiếu rồi nối với số bằng tổng", () => {
    const missing: Record<string, number> = {
      "5 000 + ? + 80 + 2": 400,
      "50 000 + 4 000 + 20 + ?": 8,
      "? + 500 + 80 + 6": 40000,
      "8 000 + 900 + ?": 5,
    };
    for (const pair of find("pt-5", "noi-cap").pairs) {
      const expression = pair.left.replace(/\s/g, " ");
      const key = Object.keys(missing).find((candidate) => candidate.replace(/\s/g, " ") === expression)!;
      expect(sum(pair.left.replace("?", String(missing[key]))), pair.left).toBe(plain(pair.right));
    }
  });
});

describe("tia số, số liền trước và liền sau", () => {
  it("tiaSoTicks để trống đúng vị trí", () => {
    expect(tiaSoTicks(100, 10, 4, [1, 3])).toEqual([100, null, 120, null]);
  });

  it("ts-1: bước nhảy 1", () => {
    expect(blanks(find("ts-1", "dien-so"))).toEqual([24391 + 2, 24391 + 4, 24391 + 5]);
  });

  it("ts-2: bước nhảy 10 000", () => {
    expect(blanks(find("ts-2", "dien-so"))).toEqual([20000 + 2 * 10000, 20000 + 4 * 10000, 20000 + 5 * 10000]);
  });

  it("ts-3 đến ts-5: số liền trước và liền sau", () => {
    expect(blanks(find("ts-3", "dien-so"))).toEqual([63280 - 1, 63280 + 1]);
    expect(blanks(find("ts-4", "dien-so"))).toEqual([70000 - 1, 70000 + 1]);
    expect(blanks(find("ts-5", "dien-so"))).toEqual([99999 - 1, 99999 + 1]);
    expect(blanks(find("thu-lien-truoc", "dien-so"))).toEqual([20000 - 1]);
  });

  it("ts-6: số liền trước của 40 000", () => {
    expect(plain(chosen("ts-6"))).toBe(40000 - 1);
  });
});

describe("so sánh và làm tròn", () => {
  it("ss-1 và câu thử: dấu đúng theo giá trị hai vế", () => {
    for (const row of [...find("ss-1", "so-sanh").rows, ...find("thu-so-sanh", "so-sanh").rows]) {
      const left = sum(row.left);
      const right = sum(row.right);
      expect(row.answer, `${row.left} ? ${row.right}`).toBe(left > right ? ">" : left < right ? "<" : "=");
    }
  });

  it("ss-2: số bé nhất", () => {
    const question = find("ss-2", "trac-nghiem");
    expect(plain(chosen("ss-2"))).toBe(Math.min(...question.options.map(plain)));
  });

  it("ss-3: chữ số hàng trăm là 6, chỉ một lựa chọn", () => {
    const question = find("ss-3", "trac-nghiem");
    const hundreds = (text: string) => Math.floor(plain(text) / 100) % 10;
    expect(question.options.filter((option) => hundreds(option) === 6)).toEqual([chosen("ss-3")]);
  });

  it("ss-4, ss-5 và câu thử: làm tròn đến hàng nghìn", () => {
    const round = (value: number) => Math.round(value / 1000) * 1000;
    expect(plain(chosen("ss-4"))).toBe(round(24618));
    expect(blanks(find("ss-5", "dien-so"))).toEqual([round(38472)]);
    expect(blanks(find("thu-lam-tron", "dien-so"))).toEqual([round(15280)]);
  });

  it("ss-6, ss-7: ngày tiêm nhiều nhất và thứ tự từ ít đến nhiều", () => {
    const doses: Record<string, number> = { "Thứ Hai": 41305, "Thứ Ba": 39872, "Thứ Tư": 40960, "Thứ Năm": 38456 };
    const most = Object.entries(doses).sort((a, b) => b[1] - a[1])[0][0];
    expect(chosen("ss-6")).toBe(most);
    const ascending = Object.entries(doses)
      .sort((a, b) => a[1] - b[1])
      .map(([day]) => day)
      .join(", ");
    expect(chosen("ss-7")).toBe(ascending);
  });
});

describe("suy nghĩ thêm", () => {
  const inverse = new Map(Object.entries(SEGMENTS).map(([digit, segments]) => [segments, digit]));

  /** Mọi số tạo được khi chuyển đúng một que tính (bỏ que ở một chỗ, đặt vào chỗ khác), không có số 0 đứng đầu. */
  function oneMove(digits: string): number[] {
    const state = digits.split("").map((digit) => new Set(SEGMENTS[digit]));
    const results = new Set<number>();
    for (let from = 0; from < state.length; from += 1) {
      for (const stick of state[from]) {
        for (let to = 0; to < state.length; to += 1) {
          for (const slot of "abcdefg") {
            if (from === to && slot === stick) continue;
            const next = state.map((set) => new Set(set));
            next[from].delete(stick);
            if (next[to].has(slot)) continue;
            next[to].add(slot);
            const mapped = next.map((set) => inverse.get([...set].sort().join("")));
            if (mapped.some((digit) => digit === undefined)) continue;
            const text = mapped.join("");
            if (text[0] !== "0" && text !== digits) results.add(Number(text));
          }
        }
      }
    }
    return [...results];
  }

  it("que tính: kết quả bé nhất khi chuyển một que", () => {
    expect(Math.min(...oneMove("28569"))).toBe(20568);
    expect(blanks(find("sn-que-tinh", "dien-so"))).toEqual([Math.min(...oneMove("48369"))]);
  });

  it("tìm lỗi: ba mươi nghìn năm trăm", () => {
    expect(read(blanks(find("sn-tim-loi", "dien-so"))[0])).toBe("ba mươi nghìn năm trăm");
  });

  it("lập số lớn nhất và bé nhất từ 3, 0, 7, 5, 9", () => {
    const permute = (items: string[]): string[][] =>
      items.length <= 1 ? [items] : items.flatMap((item, index) => permute([...items.slice(0, index), ...items.slice(index + 1)]).map((rest) => [item, ...rest]));
    const numbers = permute(["3", "0", "7", "5", "9"])
      .filter((digits) => digits[0] !== "0")
      .map((digits) => Number(digits.join("")));
    expect(blanks(find("sn-lap-so", "dien-so"))).toEqual([Math.max(...numbers), Math.min(...numbers)]);
  });
});
