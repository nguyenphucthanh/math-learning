import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { convertArea } from "@/lib/area-units";
import { angleAt, angleKind, lengthOf } from "@/lib/hinh";
import { convertMass, toKg, type MassUnit } from "@/lib/mass-units";
import { convertTime, type TimeUnit } from "@/lib/time-units";
import { describe, expect, it } from "vitest";
import { PX_PER_CM, tamGiac } from "./_illustrations/hinh-hoc";
import { animals, beBo, exerciseGroups, field, quickChecks } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanksOf = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const blanks = (id: string) => blanksOf(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question: ChoiceQuestion = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const lines = (question: WordQuestion) => question.lines.map(blanksOf);
const MASS_UNITS = ["kg", "yến", "tạ", "tấn"];
const AREA_UNITS = ["m²", "dm²", "cm²", "mm²"];
const sign = (l: number, r: number) => (l > r ? ">" : l < r ? "<" : "=");

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mỗi câu đổi đơn vị có ô cuối tính lại đúng bằng thư viện đơn vị", () => {
    const conversions = questions.filter((q): q is FillQuestion => q.kind === "dien-so" && !!q.conversion);
    expect(conversions.length).toBe(6 + 8 + 4 + 3);
    for (const question of conversions) {
      const { source, to } = question.conversion!;
      const last = blanksOf(question.parts).at(-1);
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

  it("câu nào cũng có gợi ý và giải thích", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("đúng các nhóm", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length, group.unit])).toEqual([
      ["khoi-luong", 14, "ta"],
      ["dien-tich", 15, "m2"],
      ["thoi-gian", 4, "second"],
      ["goc-canh", 4, undefined],
      ["bai-toan", 1, undefined],
      ["suy-nghi-them", 3, undefined],
    ]);
  });
});

describe("phép tính số đo", () => {
  it("cộng, trừ, nhân, chia tính lại", () => {
    expect(blanks("kl-7")).toEqual([6 + 9]);
    expect(blanks("kl-8")).toEqual([52 - 38]);
    expect(blanks("kl-9")).toEqual([4 * 6]);
    expect(blanks("kl-10")).toEqual([28 / 4]);
    expect(blanks("dt-9")).toEqual([40 + 25]);
    expect(blanks("dt-10")).toEqual([82 - 49]);
    expect(blanks("dt-11")).toEqual([7 * 5]);
    expect(blanks("dt-12")).toEqual([48 / 6]);
  });
});

describe("so sánh số đo", () => {
  it("khối lượng", () => {
    expect([toKg("7 tạ 3 yến"), toKg("735 kg")]).toEqual([730, 735]);
    expect(chosen("kl-11")).toBe(sign(730, 735));
    expect([toKg("3 tấn 4 tạ"), toKg("3 350 kg")]).toEqual([3400, 3350]);
    expect(chosen("kl-12")).toBe(">");
    expect(chosen("kl-13")).toBe(sign(4 * 1000 + 300, 4300));
    expect(chosen("kl-13")).toBe("=");
    expect(chosen("qc-so-sanh")).toBe(sign(2 * 100 + 50, 205));
  });

  it("diện tích", () => {
    expect([convertArea("3 cm² 20 mm²", "mm²"), 320]).toEqual([320, 320]);
    expect(chosen("dt-13")).toBe("=");
    expect([convertArea("5 dm² 20 cm²", "cm²"), convertArea("6 dm²", "cm²")]).toEqual([520, 600]);
    expect(chosen("dt-14")).toBe("<");
    expect([convertArea("7 dm² 5 cm²", "cm²"), 700]).toEqual([705, 700]);
    expect(chosen("dt-15")).toBe(">");
  });

  it("ba dấu khác nhau mỗi nhóm", () => {
    expect(new Set(["kl-11", "kl-12", "kl-13"].map(chosen)).size).toBe(3);
    expect(new Set(["dt-13", "dt-14", "dt-15"].map(chosen)).size).toBe(3);
  });
});

describe("bài toán con bê, con bò, con voi", () => {
  it("số liệu và đáp án tính lại", () => {
    expect(animals.be).toBe(100 + 30);
    expect(beBo).toEqual({ bo: 130 + 240, tong: 130 + 370 });
    const [be, bo, tong, voi, tan] = lines(find("kl-bt", "loi-van")).map((line) => line[0]);
    expect([be, bo, tong, voi]).toEqual([130, 370, 500, 1000]);
    expect(tan).toBe(voi / 1000);
    expect(convertMass(`${voi} kg`, "tấn")).toBe(tan);
  });
});

describe("thời gian", () => {
  it("quick check", () => {
    expect(blanks("qc-thoi-gian")).toEqual([2 * 60]);
  });
});

describe("góc và cạnh của tam giác ABC với điểm M", () => {
  const { A, B, M, C } = tamGiac;
  it("loại góc tính từ toạ độ", () => {
    expect(angleKind(angleAt(A, B, C))).toBe("nhọn");
    expect(angleKind(angleAt(A, M, B))).toBe("nhọn");
    expect(angleKind(angleAt(A, M, C))).toBe("tù");
    expect(chosen("gc-b")).toBe("Góc nhọn");
    expect(chosen("gc-amb")).toBe("Góc nhọn");
    expect(chosen("gc-amc")).toBe("Góc tù");
  });

  it("AMB và AMC ghép thành góc bẹt", () => {
    expect(angleAt(A, M, B) + angleAt(A, M, C)).toBeCloseTo(180, 5);
  });

  it("BM, MC, BC", () => {
    expect([lengthOf([B, M]) / PX_PER_CM, lengthOf([M, C]) / PX_PER_CM]).toEqual([3, 5]);
    expect(blanks("gc-bc")).toEqual([lengthOf([B, C]) / PX_PER_CM]);
  });
});

describe("bài toán mảnh đất", () => {
  it("rộng rồi diện tích", () => {
    const [rong, dienTich] = lines(find("bt-manh-dat", "loi-van")).map((line) => line[0]);
    expect(rong).toBe(field.dai - field.hon);
    expect(dienTich).toBe(field.dai * rong);
    expect(dienTich).toBe(198);
  });
});

describe("nhắc lại nhanh", () => {
  it("đáp án tính lại đúng", () => {
    expect(blanks("qc-khoi-luong")).toEqual([convertMass("2 tấn", "tạ")]);
    expect(blanks("qc-dien-tich")).toEqual([2 * 100]);
    expect(chosen("qc-goc")).toBe("Góc tù");
    expect(blanks("qc-chu-nhat")).toEqual([9 * 5]);
  });
});

describe("suy nghĩ thêm", () => {
  it("đáp án tính lại đúng", () => {
    expect(convertArea("3 m²", "dm²")).toBe(300);
    expect(chosen("sn-1")).toContain("300 dm²");
    const [ta, tan] = blanks("sn-2");
    expect(ta).toBe(4 * 5);
    expect(tan).toBe(convertMass(`${ta} tạ`, "tấn"));
    const [cm, dm] = blanks("sn-3");
    expect(cm).toBe(10 * 10);
    expect(dm).toBe(convertArea(`${cm} cm²`, "dm²"));
  });
});
