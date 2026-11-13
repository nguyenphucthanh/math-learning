import type { FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { chay, exerciseGroups, lop, mua, monThe, placement, quickChecks, toTrong, ve, veNgan, warmUps, xeDap } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const wordAnswers = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blankAnswers);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex].replace(/\u00a0/g, " ");
};
const values = (c: { data: { value: number | null }[] }) => c.data.map((d) => d.value as number);
const total = (c: { data: { value: number | null }[] }) => values(c).reduce((a, b) => a + b, 0);

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
      ["doc-bieu-do", 5],
      ["hoan-thanh", 4],
      ["mua", 3],
      ["chay", 4],
      ["ve", 5],
      ["dung-sai", 3],
      ["suy-nghi-them", 4],
    ]);
  });

  it("số liệu biểu đồ hợp lệ: không vượt trục, đúng bội của vạch khi cần", () => {
    for (const c of [lop, xeDap, mua, chay, ve, monThe, toTrong, veNgan]) {
      expect(c.max % c.step, c.title).toBe(0);
      for (const v of values(c)) expect(v, c.title).toBeLessThanOrEqual(c.max);
    }
  });
});

describe("đọc biểu đồ", () => {
  it("đọc số ở đỉnh cột và so sánh", () => {
    expect(answers("dc-1a")).toEqual([30, 70, 50, 60, 55]);
    expect(answers("dc-1a")).toEqual(values(lop));
    expect(chosen("dc-1b")).toBe("Lớp 4B");
    expect(chosen("dc-1c")).toBe("Lớp 4A");
    expect(answers("dc-1d")).toEqual([[70, 60, 55].length]);
    expect(values(lop).filter((v) => v > 50)).toEqual([70, 60, 55]);
    expect(answers("dc-1e")).toEqual([70 - 30]);
  });

  it("ngày mưa và quãng đường chạy", () => {
    expect(answers("mu-1a")).toEqual([10, 25, 22]);
    expect(answers("mu-1b")).toEqual([25 - 10]);
    expect(wordAnswers("mu-1c")).toEqual([[10 + 25 + 22], [(10 + 25 + 22) / 3]]);
    expect(wordAnswers("mu-1c")).toEqual([[57], [19]]);
    expect(answers("ch-1a")).toEqual([600, 900, 1200, 1100, 1500]);
    expect(wordAnswers("ch-1b")).toEqual([[600 + 900 + 1200 + 1100 + 1500], [(600 + 900 + 1200 + 1100 + 1500) / 5]]);
    expect(wordAnswers("ch-1b")).toEqual([[5300], [1060]]);
    expect(chosen("ch-1c")).toBe("Ngày 4");
    expect(1100).toBeLessThan(1200);
    expect(answers("ch-1d")).toEqual([1500 - 600]);
  });

  it("số vé xem phim", () => {
    expect(answers("ve-1c")).toEqual([[1980, 1250, 1380, 1740].filter((v) => v > 1000).length]);
    expect(answers("ve-1c")).toEqual([4]);
    expect(chosen("ve-1d")).toBe("Thứ Tư");
    expect(Math.max(...values(ve))).toBe(1980);
    expect(answers("ve-1e")).toEqual([310 + 460 + 1980 + 520 + 1250 + 1380 + 1740]);
    expect(answers("ve-1e")).toEqual([7640]);
  });
});

describe("hoàn thành biểu đồ", () => {
  it("vị trí số so với vạch chia", () => {
    expect(placement(45, 20)).toEqual({ lo: 40, hi: 60, index: 1 });
    expect(placement(85, 20)).toEqual({ lo: 80, hi: 100, index: 1 });
    expect(placement(310, 200)).toEqual({ lo: 200, hi: 400, index: 3 });
    expect(placement(1380, 200)).toEqual({ lo: 1200, hi: 1400, index: 3 });
    expect(placement(60, 20).index).toBe(0);
    expect(placement(70, 20).index).toBe(2);
  });

  it("câu chọn vị trí", () => {
    expect(chosen("ht-1")).toBe("Giữa vạch 40 và 60, gần vạch 40 hơn");
    expect(chosen("ht-2")).toBe("Giữa vạch 80 và 100, gần vạch 80 hơn");
    expect(chosen("ve-1a")).toBe("Giữa vạch 200 và 400, gần vạch 400 hơn");
    expect(chosen("ve-1b")).toBe("Giữa vạch 1 200 và 1 400, gần vạch 1 400 hơn");
  });

  it("ngày bằng nhau và trung bình", () => {
    expect(chosen("ht-3")).toBe("Thứ Ba và Thứ Tư");
    expect(wordAnswers("ht-4")).toEqual([[45 + 60 + 60 + 85 + 120], [(45 + 60 + 60 + 85 + 120) / 5]]);
    expect(wordAnswers("ht-4")).toEqual([[370], [74]]);
    expect(total(xeDap) % 5).toBe(0);
  });
});

describe("đúng sai và suy nghĩ thêm", () => {
  it("đúng sai", () => {
    expect(chosen("ds-1")).toBe("Đúng");
    expect(Math.max(...values(lop))).toBe(70);
    expect(chosen("ds-2")).toBe("Sai");
    expect(50 > 50).toBe(false);
    expect(chosen("ds-3")).toBe("Sai");
    expect(2 * 10).not.toBe(25);
  });

  it("đếm cột, đọc vạch, tìm lỗi", () => {
    expect(chosen("sn-1a")).toBe("Sai");
    expect(answers("sn-1b")).toEqual([8 + 3 + 5 + 3]);
    expect(answers("sn-1b")).toEqual([19]);
    expect(answers("sn-2")).toEqual([(60 + 80) / 2]);
    expect(answers("sn-2")).toEqual([70]);
    expect(answers("sn-3")).toEqual([3 * 200]);
    expect(veNgan.data[1].value).toBe(600);
  });
});

describe("câu thử và khởi động", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-lon-nhat")).toEqual([Math.max(8, 3, 5)]);
    expect(answers("kd-kiem-dem")).toEqual([5]);
    expect(answers("kd-trung-binh")).toEqual([(4 + 6 + 2) / 3]);
    expect(chosen("thu-cao-hon")).toBe("Nhiều hơn");
    expect(chosen("thu-truc")).toBe("Tên các môn thể thao");
    expect(answers("thu-doc-dinh")).toEqual([6]);
    expect(answers("thu-doc-vach")).toEqual([toTrong.data[1].value]);
  });
});

describe("đáp án SGK trong phần Phụ huynh", () => {
  it("tính lại", () => {
    const books = [60, 52, 80, 68, 40];
    expect(Math.max(...books)).toBe(80);
    expect(Math.min(...books)).toBe(40);
    expect(books.filter((v) => v > 50)).toHaveLength(4);
    const lib = [35, 50, 50, 70, 115];
    expect(lib.reduce((a, b) => a + b)).toBe(320);
    expect(320 / 5).toBe(64);
    expect(25 - 20).toBe(5);
    expect((20 + 25 + 15) / 3).toBe(20);
    const run = [700, 800, 1100, 1400, 1700];
    expect(run.reduce((a, b) => a + b)).toBe(5700);
    expect(5700 / 5).toBe(1140);
    expect(run.slice(1).map((v, i) => v - run[i])).toEqual([100, 300, 300, 300]);
    const tickets = [285, 540, 2150, 410, 1105, 1200, 1610];
    expect(tickets.filter((v) => v > 1000)).toHaveLength(4);
    expect(Math.max(...tickets)).toBe(2150);
  });
});
