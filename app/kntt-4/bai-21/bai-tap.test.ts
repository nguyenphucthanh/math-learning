import type { FillQuestion, Question } from "@/components/exercises/types";
import { convertArea } from "@/lib/area-units";
import { convertMass, toKg, type MassUnit } from "@/lib/mass-units";
import { centuryOf, convertTime, countYears, toRoman, type TimeUnit } from "@/lib/time-units";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { boardVertices } from "./_illustrations/circuit-board";
import { exerciseGroups, quickChecks } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks)];

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

const MASS_UNITS = ["kg", "yến", "tạ", "tấn"];
const AREA_UNITS = ["m²", "dm²", "cm²", "mm²"];
const centuryName = (year: number) => `Thế kỉ ${toRoman(centuryOf(year))}`;
const digits = (text: string) => Number(text.replace(/\D/g, ""));

/** Diện tích đa giác theo công thức dây giày. */
function polygonArea(points: [number, number][]): number {
  const twice = points.reduce((sum, [x, y], index) => {
    const [nextX, nextY] = points[(index + 1) % points.length];
    return sum + x * nextY - nextX * y;
  }, 0);
  return Math.abs(twice) / 2;
}

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mỗi câu đổi đơn vị có ô cuối tính lại đúng", () => {
    const conversions = questions.filter((q): q is FillQuestion => q.kind === "dien-so" && !!q.conversion);
    expect(conversions.map((q) => q.id).sort()).toEqual(
      [
        "dt-1", "dt-2", "dt-3", "dt-4", "dt-5", "dt-6",
        "kl-1", "kl-2", "kl-3", "kl-4", "kl-5", "kl-6",
        "qc-dien-tich", "qc-khoi-luong", "qc-so-do-ghep",
        "tg-1", "tg-2", "tg-3", "tg-4",
      ].sort(),
    );
    for (const question of conversions) {
      const { source, to } = question.conversion!;
      const last = blanks(question).at(-1);
      if (MASS_UNITS.includes(to)) expect(last, question.id).toBe(convertMass(source, to as MassUnit));
      else if (AREA_UNITS.includes(to)) expect(last, question.id).toBe(convertArea(source, to as "cm²"));
      else expect(last, question.id).toBe(convertTime(source, to as TimeUnit));
    }
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

  it("mỗi câu có gợi ý và giải thích", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(0);
      expect(question.explanation.length, question.id).toBeGreaterThan(0);
    }
  });

  it("đúng các nhóm trong brief", () => {
    expect(exerciseGroups.map((group) => [group.id, group.title, group.unit])).toEqual([
      ["dien-tich", "Diện tích", "m2"],
      ["khoi-luong", "Khối lượng", "ta"],
      ["thoi-gian", "Thời gian", "second"],
      ["bai-toan", "Bài toán đời sống", undefined],
      ["tu-duy", "Suy nghĩ thêm", undefined],
    ]);
  });
});

describe("nhắc lại nhanh", () => {
  it("đáp án tính lại đúng", () => {
    expect(blanks(quickChecks.mass)).toEqual([3 * 10]);
    expect(blanks(quickChecks.area)).toEqual([4 * 100]);
    expect(blanks(quickChecks.compound)).toEqual([2 * 60 + 15]);
    expect(chosen("qc-chon-don-vi")).toBe("m²");
    expect(blanks(quickChecks.shape)).toEqual([6 * 4 - 1 * 1]);
    expect(chosen("qc-the-ki")).toBe(centuryName(1950));
  });
});

describe("diện tích", () => {
  it("dt-7: bảng mạch 12 × 6 bớt hai ô khuyết, và hình vẽ cùng diện tích", () => {
    const { props } = find("dt-7", "dien-so").illustration as ReactElement<{ width: number; height: number }>;
    expect([props.width, props.height]).toEqual([12, 6]);
    const total = props.width * props.height - 2 * (1 * 1);
    const byColumns = 9 * 6 + 1 * 5 + 1 * 5 + 1 * 6;
    expect(blanks(find("dt-7", "dien-so"))).toEqual([total]);
    expect(byColumns).toBe(total);
    expect(polygonArea(boardVertices(props.width, props.height))).toBe(total);
  });

  it("dt-8: mỗi cặp khớp số đo", () => {
    const pairs = find("dt-8", "noi-cap").pairs;
    expect(pairs.map((pair) => pair.right)).toEqual(["48 m²", "72 dm²", "6 cm²"]);
    expect(digits(pairs[1].right)).toBe(6 * 12);
    expect(pairs[1].left).toContain("6 dm × 12 dm");
  });
});

describe("khối lượng", () => {
  it("kl-7: bốn cặp, có đủ bốn đơn vị cân nặng", () => {
    const rights = find("kl-7", "noi-cap").pairs.map((pair) => pair.right);
    expect(rights).toEqual(["5 yến", "3 tạ", "4 tấn", "60 g"]);
    expect(toKg("5 yến")).toBe(50);
  });
});

describe("thời gian", () => {
  it("tg-5: hai vòng 1 phút 45 giây", () => {
    expect(blanks(find("tg-5", "dien-so"))).toEqual([2 * convertTime("1 phút 45 giây", "giây")]);
  });

  it("tg-6: năm kỉ niệm và thế kỉ của nó", () => {
    const [year] = blanks(find("tg-6a", "dien-so"));
    expect(year).toBe(1895 + 300);
    expect(countYears(1895, year)).toBe(301);
    expect(chosen("tg-6b")).toBe(centuryName(year));
  });
});

describe("bài toán đời sống", () => {
  it("bt-1: chia năm phần đều rồi tính số tạ thóc", () => {
    const [part, total] = blanks(find("bt-1", "dien-so"));
    expect(part).toBe(5000 / 5);
    expect(total).toBe((5000 / part) * 6);
    const { props } = find("bt-1", "dien-so").illustration as ReactElement<{ total: number; parts: number }>;
    expect([props.total, props.parts]).toEqual([5000, 5]);
  });
});

describe("suy nghĩ thêm", () => {
  it("đáp án tính lại đúng", () => {
    expect(toKg("1 tấn 89 kg")).toBe(1089);
    expect(chosen("sn-1")).toContain("1\u00a0000 + 89");
    expect(chosen("sn-1")).toContain("1 089 kg");

    expect(convertArea("800 dm²", "m²")).toBe(8);
    expect(chosen("sn-2")).toContain("bé đi");

    expect(blanks(find("sn-3", "dien-so"))).toEqual([3 * convertTime("2 phút 30 giây", "giây")]);

    const [tạ, kg] = blanks(find("sn-4", "dien-so"));
    expect(tạ).toBe((6000 / 1000) * 7);
    expect(kg).toBe(convertMass(`${tạ} tạ`, "kg"));
  });
});
