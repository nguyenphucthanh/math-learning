import { describe, expect, it } from "vitest";
import type { FillQuestion, Question } from "@/components/exercises/types";
import { convertMass, toKg, type MassUnit } from "@/lib/mass-units";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

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

const number = (text: string) => Number(text.replace(/\s/g, ""));

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mỗi câu đổi đơn vị có đáp án tính lại đúng", () => {
    const conversions = questions.filter((q): q is FillQuestion => q.kind === "dien-so" && !!q.conversion);
    expect(conversions.length).toBeGreaterThanOrEqual(19);
    for (const question of conversions) {
      const { source, to } = question.conversion!;
      expect(blanks(question), question.id).toEqual([convertMass(source, to as MassUnit)]);
    }
  });

  it("đáp án đổi đơn vị khớp bảng đã duyệt trong brief", () => {
    const expected: Record<string, number> = {
      "yen-1": 30, "yen-2": 500, "yen-3": 4000, "yen-4": 6, "yen-5": 7, "yen-6": 9,
      "yen-7": 60, "yen-8": 80, "yen-9": 5, "yen-10": 2, "yen-11": 300,
      "ghep-1": 63, "ghep-2": 207, "ghep-3": 3090, "ghep-4": 54, "ghep-5": 73, "ghep-6": 230,
      "dem-tan-tay": 190000, "tach-45": 45, "tach-6040": 6040, "thang-30": 30,
    };
    for (const [id, answer] of Object.entries(expected)) {
      expect(blanks(find(id, "dien-so")), id).toEqual([answer]);
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
});

describe("phép tính với số đo cùng đơn vị", () => {
  it("tính lại từ biểu thức trong đề", () => {
    const ids = ["tinh-1", "tinh-2", "tinh-3", "tinh-4", "tinh-5", "tinh-6", "tinh-7", "tinh-8"];
    for (const id of ids) {
      const question = find(id, "dien-so");
      const text = question.parts[0] as string;
      const match = text.match(/^([\d\s]+) (?:tấn|tạ|yến) ([+−×:]) ([\d\s]+?)(?: (?:tấn|tạ|yến))? =$/)!;
      const [a, b] = [number(match[1]), number(match[3])];
      const result = { "+": a + b, "−": a - b, "×": a * b, ":": a / b }[match[2] as "+" | "−" | "×" | ":"];
      expect(blanks(question), id).toEqual([result]);
    }
  });
});

describe("bài toán lời văn", () => {
  it("xe chở: đổi 6 tạ, tính 80 thùng, cộng 200 kg, rồi so với sức chở", () => {
    const answers = find("xe-chay", "loi-van").lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
    expect(answers).toEqual([toKg("6 tạ"), 80 * 4, 200 + 80 * 4]);
    expect(answers[2]).toBeLessThan(answers[0]);
    expect(chosen("xe-duoc")).toMatch(/^Chở được/);
  });

  it("tổng cân nặng: đổi 2 tạ rồi trừ", () => {
    const answers = find("tong-can", "loi-van").lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
    expect(answers).toEqual([toKg("2 tạ"), toKg("2 tạ") - 150]);
  });

  it("Rô-bốt: chỉ câu về dê trắng 70 kg đúng", () => {
    expect(toKg("7 yến")).toBe(70);
    expect(toKg("3 tạ")).toBe(300);
    expect(chosen("ghep-cua")).toContain("dê trắng nặng 70 kg");
  });

  it("sắp xếp từ nhẹ đến nặng", () => {
    const weights = chosen("so-sanh-sap").split(", ").map(toKg);
    expect(weights).toEqual([...weights].sort((x, y) => x - y));
    expect(new Set(weights).size).toBe(4);
  });
});

describe("voi qua cầu", () => {
  it("chỉ lựa chọn đúng có cả ba cầu chịu được 300 kg", () => {
    const question = find("cau-voi", "trac-nghiem");
    const elephant = toKg("3 tạ");
    const holds = question.options.map((option) => option.split(" → ").every((bridge) => toKg(bridge) >= elephant));
    expect(holds.filter(Boolean)).toHaveLength(1);
    expect(holds[question.answerIndex]).toBe(true);
    expect(question.illustration).toBeDefined();
  });
});

describe("nhóm Nâng cao: thuyền", () => {
  const people = [44, 48, 55];
  const capacity = toKg("1 tạ");

  /** Số chuyến ít nhất để mọi người sang sông, tìm bằng duyệt theo chiều rộng. */
  function fewestTrips(): number {
    type State = { near: number[]; boatNear: boolean };
    const key = (state: State) => `${[...state.near].sort().join(",")}|${state.boatNear}`;
    const start: State = { near: [0, 1, 2], boatNear: true };
    const seen = new Set([key(start)]);
    let layer = [start];
    for (let trips = 0; layer.length > 0; trips += 1) {
      if (layer.some((state) => state.near.length === 0)) return trips;
      const next: State[] = [];
      for (const state of layer) {
        const side = state.boatNear ? state.near : [0, 1, 2].filter((person) => !state.near.includes(person));
        const groups = side.flatMap((first, index) => [[first], ...side.slice(index + 1).map((second) => [first, second])]);
        for (const group of groups) {
          if (group.reduce((sum, person) => sum + people[person], 0) > capacity) continue;
          const near = state.boatNear ? state.near.filter((person) => !group.includes(person)) : [...state.near, ...group];
          const result = { near, boatNear: !state.boatNear };
          if (!seen.has(key(result))) {
            seen.add(key(result));
            next.push(result);
          }
        }
      }
      layer = next;
    }
    throw new Error("Không có cách sang sông");
  }

  it("tổng cân nặng và cặp quá tải", () => {
    expect(blanks(find("nc-tong", "dien-so"))).toEqual([people.reduce((a, b) => a + b, 0)]);
    expect(people.reduce((a, b) => a + b, 0)).toBeGreaterThan(capacity);
    const overloaded = [[0, 1], [0, 2], [1, 2]].filter(([a, b]) => people[a] + people[b] > capacity);
    expect(overloaded).toEqual([[1, 2]]);
    expect(chosen("nc-cap")).toBe("48 kg và 55 kg");
  });

  it("số chuyến ít nhất tính bằng duyệt, đúng với đáp án", () => {
    expect(blanks(find("nc-so-chuyen", "dien-so"))).toEqual([fewestTrips()]);
    expect(fewestTrips()).toBe(3);
  });

  it("cách chia chuyến: chỉ lựa chọn đúng hợp lệ và đưa được cả ba người sang", () => {
    const question = find("nc-chuyen", "trac-nghiem");
    const valid = question.options.map((option) => {
      const trips = option.split("; ").map((trip) => (trip.match(/\d+/g) ?? []).map(Number));
      const loadsOk = trips.every((trip) => trip.reduce((sum, kg) => sum + kg, 0) <= capacity);
      const near = new Set(people);
      trips.forEach((trip, index) => {
        for (const kg of trip) {
          if (index % 2 === 0) near.delete(kg);
          else near.add(kg);
        }
      });
      return loadsOk && near.size === 0;
    });
    expect(valid.filter(Boolean)).toHaveLength(1);
    expect(valid[question.answerIndex]).toBe(true);
    expect(question.illustration).toBeDefined();
  });
});

describe("khởi động", () => {
  it("đúng danh sách trong brief và đáp án tính lại đúng", () => {
    expect(warmUps.map((question) => question.id)).toEqual(["kd-nhan10", "kd-nhan100", "kd-nhan1000", "kd-chia", "kd-gam", "kd-lam-tron"]);
    expect(blanks(find("kd-nhan10", "dien-so"))).toEqual([7 * 10]);
    expect(blanks(find("kd-nhan100", "dien-so"))).toEqual([6 * 100]);
    expect(blanks(find("kd-nhan1000", "dien-so"))).toEqual([4 * 1000]);
    expect(blanks(find("kd-chia", "dien-so"))).toEqual([800 / 10]);
    expect(blanks(find("kd-gam", "dien-so"))).toEqual([1000]);
    expect(blanks(find("kd-lam-tron", "dien-so"))).toEqual([Math.round(117 / 10) * 10]);
  });
});

describe("nhóm Suy nghĩ thêm", () => {
  it("đủ 6 câu và đáp án tính lại đúng", () => {
    expect(exerciseGroups.find((item) => item.id === "tu-duy")!.questions).toHaveLength(6);
    expect(blanks(find("td-gap-yen", "dien-so"))).toEqual([toKg("1 yến")]);
    expect(blanks(find("td-gap-tan-yen", "dien-so"))).toEqual([convertMass("1 tấn", "yến")]);
    expect(blanks(find("td-gap-190", "dien-so"))).toEqual([toKg("190 tấn") / 190]);
    expect(toKg("4 yến 5 kg")).toBe(45);
    expect(chosen("td-loi-405")).toContain("40 + 5 = 45 kg");
    expect(toKg("5 tạ 5 kg")).toBe(505);
    expect(chosen("td-loi-505")).toContain("500 + 5 = 505 kg");
    expect(toKg("30 tạ")).toBe(toKg("3 tấn"));
    expect(chosen("td-loi-so-sanh")).toContain("hai khối lượng bằng nhau");
  });
});
