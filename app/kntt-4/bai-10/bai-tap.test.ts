import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { digitsOf, exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const lineBlanks = (question: WordQuestion) => question.lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const plain = (text: string) => text.replace(/ /g, " ");
const num = (text: string) => Number(text.replace(/[\s ]/g, ""));

const UNITS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

/** Đọc một nhóm 3 chữ số theo cách SGK; `full` là có đọc cả "không trăm" khi hàng trăm bằng 0. */
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
  if (value === 1000000) return "một triệu";
  const thousands = Math.floor(value / 1000);
  const rest = value % 1000;
  const parts: string[] = [];
  if (thousands > 0) parts.push(`${readGroup(thousands, false)} nghìn`);
  if (rest > 0) parts.push(readGroup(rest, thousands > 0));
  return parts.join(" ");
}

/** Mọi cách xếp các thẻ thành số có đúng sáu chữ số (chữ số đầu khác 0). */
function arrangements(cards: number[]): number[] {
  const found = new Set<number>();
  const used = Array(cards.length).fill(false);
  const build = (digits: number[]) => {
    if (digits.length === cards.length) {
      if (digits[0] !== 0) found.add(Number(digits.join("")));
      return;
    }
    cards.forEach((card, index) => {
      if (used[index]) return;
      used[index] = true;
      build([...digits, card]);
      used[index] = false;
    });
  };
  build([]);
  return [...found];
}

describe("cấu trúc bộ câu hỏi", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mọi câu có gợi ý và lời giải", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(5);
      expect(question.explanation.length, question.id).toBeGreaterThan(5);
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

  it("ba nhóm, nhóm cuối là Suy nghĩ thêm", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["hoat-dong", "luyen-tap", "suy-nghi"]);
  });
});

describe("đọc và viết số", () => {
  it("hd-1a: các chữ số từng hàng viết liền", () => {
    expect(blanks(find("hd-1a", "dien-so"))).toEqual([Number([7, 4, 0, 5, 1, 8].join(""))]);
  });

  it("hd-1b: chữ số từng hàng của 480 206", () => {
    expect(blanks(find("hd-1b", "dien-so"))).toEqual(digitsOf(480206));
    expect(digitsOf(480206)).toEqual([4, 8, 0, 2, 0, 6]);
  });

  it("hd-1c: lời đọc khớp số viết", () => {
    const question = find("hd-1c", "dien-so");
    const [answer] = blanks(question);
    expect(plain(question.prompt!)).toContain(read(answer));
  });

  it("hd-1d và thu-doc: đáp án đúng là cách đọc của số", () => {
    expect(chosen(find("hd-1d", "trac-nghiem"))).toBe(read(805060));
    expect(chosen(find("thu-doc", "trac-nghiem"))).toBe(read(308051));
    for (const id of ["hd-1d", "thu-doc"]) {
      const { options, answerIndex } = find(id, "trac-nghiem");
      options.forEach((option, index) => {
        if (index !== answerIndex) expect(option, id).not.toBe(read(id === "hd-1d" ? 805060 : 308051));
      });
    }
  });

  it("hd-5: ba số viết từ lời đọc", () => {
    const answers = blanks(find("hd-5", "dien-so"));
    expect(answers).toEqual([603409, 1000000, 823017]);
    const prompt = plain(find("hd-5", "dien-so").prompt!);
    for (const answer of answers) expect(prompt).toContain(read(answer));
  });

  it("thu-viet và kd-viet: viết liền các chữ số", () => {
    expect(blanks(find("thu-viet", "dien-so"))).toEqual([Number([5, 4, 0, 2, 1, 9].join(""))]);
    expect(blanks(find("kd-viet", "dien-so"))).toEqual([4 * 10000 + 7 * 100 + 5]);
  });

  it("sn-2: số đúng khớp lời đọc", () => {
    const [answer] = blanks(find("sn-2", "dien-so"));
    expect(answer).toBe(300 * 1000 + 400);
    expect(read(answer)).toBe("ba trăm nghìn bốn trăm");
  });
});

describe("tiền và đếm", () => {
  it("hd-2a, hd-2b: số tiền tính lại", () => {
    expect(blanks(find("hd-2a", "dien-so"))).toEqual([2 * 100000 + 3 * 10000 + 4 * 1000 + 5 * 100]);
    expect(blanks(find("hd-2b", "dien-so"))).toEqual([3 * 100000 + 4 * 10000 + 2 * 100]);
  });

  it("hd-3: số trong đoạn văn", () => {
    const question = find("hd-3", "loi-van");
    expect(lineBlanks(question)).toEqual([500000, 27000]);
    expect(plain(question.prompt)).toContain("500 000");
    expect(plain(question.prompt)).toContain("27 000");
  });

  it("hd-4a, hd-4b: tia số cách đều 100 000", () => {
    const tia = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
    expect(blanks(find("hd-4a", "dien-so"))).toEqual([tia[3], tia[4], tia[6]]);
    expect(blanks(find("hd-4b", "dien-so"))).toEqual([tia[7], tia[9]]);
    expect(tia[10]).toBe(10 * 100000);
  });

  it("số 1 000 000", () => {
    expect(999999 + 1).toBe(1000000);
    expect(String(1000000).length).toBe(7);
    expect(blanks(find("thu-lien-sau", "dien-so"))).toEqual([999999 + 1]);
    expect(blanks(find("sn-1", "dien-so"))).toEqual([999999 + 1, String(999999 + 1).length]);
    expect(blanks(find("sn-3", "dien-so"))).toEqual([1000000 / 100000]);
    expect(blanks(find("thu-dem", "dien-so"))).toEqual([900000 + 100000]);
    expect(blanks(find("kd-lien-sau", "dien-so"))).toEqual([99999 + 1]);
  });
});

describe("phân tích số thành tổng", () => {
  it("lt-1: tổng các số hạng bằng số đã cho", () => {
    expect(400000 + blanks(find("lt-1a", "dien-so"))[0] + 3000 + 700 + blanks(find("lt-1a", "dien-so"))[1] + 8).toBe(463718);
    expect(blanks(find("lt-1b", "dien-so"))[0] + 5).toBe(200005);
    expect(300000 + blanks(find("lt-1c", "dien-so"))[0] + 30).toBe(303030);
    expect(400000 + blanks(find("lt-1d", "dien-so"))[0]).toBe(480000);
    expect(600000 + 20000 + 400 + blanks(find("thu-phan-tich", "dien-so"))[0]).toBe(620405);
  });

  it("kd-gia-tri: chữ số 3 của 53 208 ở hàng nghìn", () => {
    expect(blanks(find("kd-gia-tri", "dien-so"))).toEqual([3 * 1000]);
    expect(Math.floor(53208 / 1000) % 10).toBe(3);
  });
});

describe("thẻ số 3, 0, 0, 4, 7, 5", () => {
  const cards = [3, 0, 0, 4, 7, 5];
  const all = arrangements(cards);
  const sameCards = (value: number) => [...String(value)].map(Number).sort().join() === [...cards].sort().join();

  it("lt-3a: chỉ một lựa chọn là số chẵn, mọi lựa chọn dùng đủ sáu thẻ", () => {
    const question = find("lt-3a", "trac-nghiem");
    const values = question.options.map(num);
    values.forEach((value) => expect(sameCards(value), String(value)).toBe(true));
    expect(values.filter((value) => value % 2 === 0)).toEqual([num(chosen(question))]);
  });

  it("lt-3b: số lẻ bé nhất", () => {
    const odd = all.filter((value) => value % 2 === 1);
    expect(blanks(find("lt-3b", "dien-so"))).toEqual([Math.min(...odd)]);
  });

  it("lt-3c: số chẵn lớn nhất", () => {
    const even = all.filter((value) => value % 2 === 0);
    expect(blanks(find("lt-3c", "dien-so"))).toEqual([Math.max(...even)]);
  });

  it("lt-2: đáp án đúng là số có trên vòng quay, các số còn lại thì không", () => {
    const wheel = [1000, 165500, 250000, 750000, 900000, 1000000];
    const question = find("lt-2", "trac-nghiem");
    question.options.forEach((option, index) => {
      expect(wheel.includes(num(option.replace("Mũi tên chỉ vào số ", ""))), option).toBe(index === question.answerIndex);
    });
  });
});
