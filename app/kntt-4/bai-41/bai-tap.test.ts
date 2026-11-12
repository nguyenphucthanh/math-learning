import type { FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { convertMass, type MassUnit } from "@/lib/mass-units";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}
const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const lineAnswers = (id: string) => find(id, "loi-van").lines.map(blankAnswers);

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

  it("trắc nghiệm có đáp án hợp lệ, lựa chọn không trùng; nối cặp hợp lệ", () => {
    for (const question of questions) {
      if (question.kind === "trac-nghiem") {
        expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
        expect(new Set(question.options).size, question.id).toBe(question.options.length);
      }
      if (question.kind === "noi-cap") {
        const match = question as MatchQuestion;
        expect([...match.rightOrder].sort(), question.id).toEqual(match.pairs.map((_, index) => index));
      }
    }
  });

  it("3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 4],
      ["luyen-tap", 15],
      ["suy-nghi-them", 3],
    ]);
  });

  it("câu đổi đơn vị tính lại đúng", () => {
    for (const question of questions) {
      if (question.kind !== "dien-so" || !question.conversion) continue;
      const { source, to } = question.conversion;
      expect(blankAnswers(question.parts).at(-1), question.id).toBe(convertMass(source, to as MassUnit));
    }
  });
});

describe("hoạt động", () => {
  it("tính nhẩm", () => {
    expect(answers("hd-1a")).toEqual([23 * 10, 2417 * 100, 4805 * 1000]);
    expect(answers("hd-1b")).toEqual([27640 / 10, 531000 / 100, 692000 / 1000]);
  });
  it("vòng chạy và hội trường", () => {
    expect(lineAnswers("hd-2")).toEqual([[285 * 10]]);
    expect(lineAnswers("hd-3")).toEqual([[9 * 10], [9 * 10 * 2]]);
  });
});

describe("luyện tập", () => {
  it("bảng số bị chia, số chia, thương", () => {
    expect(answers("lt-1a")).toEqual([450 / 10]);
    expect(answers("lt-1b")).toEqual([6300 / 100]);
    expect(answers("lt-1c")).toEqual([84]);
    expect(84000 / 84).toBe(1000);
    expect(answers("lt-1d")).toEqual([814]);
    expect(8140 / 814).toBe(10);
    expect(answers("lt-1e")).toEqual([45000]);
    expect(45000 / 45).toBe(1000);
    expect(answers("lt-1f")).toEqual([13000]);
    expect(13000 / 130).toBe(100);
  });
  it("tính thuận tiện", () => {
    expect(answers("lt-3")).toEqual([3574 * 5 * 2, 5 * 2 * 41287, 2 * 718 * 5, 5 * 6249 * 2]);
  });
  it("toa tàu và cột đèn", () => {
    expect(lineAnswers("lt-4")).toEqual([[24 - 15 + 1], [15 * (24 - 15 + 1)]]);
    expect(lineAnswers("lt-5")).toEqual([[400 / 10], [400 / 10 + 1]]);
  });
});

describe("suy nghĩ thêm và câu thử", () => {
  it("tìm lỗi và gấp mấy lần", () => {
    expect(47 * 100).toBe(4700);
    expect(find("sn-1", "trac-nghiem").options[0]).toContain("4 700");
    expect(3000 / 100).toBe(30);
    expect(find("sn-2", "trac-nghiem").options[0]).toContain("30");
    expect(answers("sn-3")).toEqual([5400 / 54]);
  });
  it("khởi động và câu thử", () => {
    expect(answers("kd-chuc")).toEqual([50, 120]);
    expect(answers("kd-bang-nhan")).toEqual([4 * 9, 7 * 6]);
    expect(answers("thu-nhan")).toEqual([4700]);
    expect(answers("thu-chia")).toEqual([83]);
    expect(answers("thu-suy-nguoc")).toEqual([250 / 10]);
  });
});
