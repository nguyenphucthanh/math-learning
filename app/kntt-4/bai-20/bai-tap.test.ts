import type { FillQuestion, Question } from "@/components/exercises/types";
import { convertArea, formatNumber } from "@/lib/area-units";
import { convertMass, toKg, type MassUnit } from "@/lib/mass-units";
import { centuryOf, convertTime, toRoman, type TimeUnit } from "@/lib/time-units";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import type { Bottle } from "./_illustrations/filter-bottles";
import { shopBoard, ticketBoard, type PriceRow } from "./_illustrations/price-board";
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

const digits = (text: string) => Number(text.replace(/\D/g, ""));
const MASS_UNITS = ["kg", "yến", "tạ", "tấn"];
const AREA_UNITS = ["m²", "dm²", "cm²", "mm²"];
const centuryName = (year: number) => `Thế kỉ ${toRoman(centuryOf(year))}`;

function props<T>(question: Question): T {
  if (question.kind !== "dien-so" && question.kind !== "trac-nghiem") throw new Error(question.id);
  return (question.illustration as ReactElement<T>).props;
}

function price(rows: PriceRow[], name: string): number {
  return rows.find((row) => row.name === name)!.price;
}

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mỗi câu đổi đơn vị có ô cuối tính lại đúng", () => {
    const conversions = questions.filter((q): q is FillQuestion => q.kind === "dien-so" && !!q.conversion);
    expect(conversions.map((q) => q.id).sort()).toEqual(["dt-4", "qc-giay", "qc-khoi-luong", "tg-4"]);
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
      ["khoi-luong", "Khối lượng", "ta"],
      ["dien-tich", "Diện tích", "m2"],
      ["thoi-gian", "Thời gian", "second"],
      ["tien", "Tiền", undefined],
      ["tu-duy", "Suy nghĩ thêm", undefined],
    ]);
  });
});

describe("nhắc lại nhanh", () => {
  it("đáp án tính lại đúng", () => {
    expect(blanks(quickChecks.mass)).toEqual([3 * 10]);
    expect(blanks(quickChecks.area)).toEqual([5 * 5]);
    expect(chosen("qc-chon-don-vi")).toBe("m²");
    expect(blanks(quickChecks.second)).toEqual([2 * 60 + 5]);
    expect(chosen("qc-the-ki")).toBe(centuryName(1000));
    expect(blanks(quickChecks.money)).toEqual([20000 - 2 * 7000]);
  });
});

describe("khối lượng", () => {
  it("kl-1: kim chỉ 40 kg, đổi ra yến", () => {
    const [kg] = props<{ readings: number[] }>(find("kl-1", "trac-nghiem")).readings;
    expect(kg).toBe(40);
    expect(chosen("kl-1")).toBe(`${convertMass(`${kg} kg`, "yến")} yến`);
  });

  it("kl-2: tổng ba cân và so với 1 tạ", () => {
    const { readings } = props<{ readings: number[] }>(find("kl-2a", "dien-so"));
    const total = readings.reduce((sum, kg) => sum + kg, 0);
    expect(blanks(find("kl-2a", "dien-so"))).toEqual([total]);
    expect(total).toBeLessThan(toKg("1 tạ"));
    expect(chosen("kl-2b")).toBe(`Không đủ 1 tạ, còn thiếu ${toKg("1 tạ") - total} kg`);
    expect(find("kl-2b", "trac-nghiem").prompt).toContain(`${readings[0]} kg, ${readings[1]} kg và ${readings[2]} kg`);
  });

  it("kl-3: mỗi cặp đổi ra kg khớp số bên phải", () => {
    for (const pair of find("kl-3", "noi-cap").pairs) {
      const source = pair.left.split(": ")[1];
      expect(toKg(source), pair.left).toBe(digits(pair.right));
      expect(pair.right.endsWith(" kg"), pair.right).toBe(true);
    }
  });

  it("kl-4: 1 tấn 2 tạ + 8 tạ", () => {
    expect(blanks(find("kl-4", "dien-so"))).toEqual([(toKg("1 tấn 2 tạ") + toKg("8 tạ")) / 1000]);
  });
});

describe("diện tích", () => {
  it("dt-2: mảnh lớn nhất tính từ kích thước trong hình", () => {
    const question = find("dt-2", "trac-nghiem");
    const areas = question.figure!.shapes.map((shape) => shape.width * shape.height);
    expect(areas).toEqual([54, 56, 50]);
    expect(question.options[areas.indexOf(Math.max(...areas))]).toBe(question.answerIndex === 1 ? "Mảnh B" : "");
    expect(chosen("dt-2")).toBe(question.figure!.shapes[areas.indexOf(Math.max(...areas))].label.replace("Mảnh", "Mảnh"));
    for (const shape of question.figure!.shapes) {
      expect(shape.width + shape.height).toBe(15);
      expect(shape.widthLabel).toBe(`${shape.width} m`);
      expect(shape.heightLabel).toBe(`${shape.height} m`);
    }
  });

  it("dt-3: hình chữ L tính theo hai cách đều ra 84 m²", () => {
    const [column, rowHeight, notchWidth, lowerHeight] = [6, 10, 6, 4];
    const bySplit = column * rowHeight + notchWidth * lowerHeight;
    const byComplement = (column + notchWidth) * rowHeight - notchWidth * (rowHeight - lowerHeight);
    expect(bySplit).toBe(byComplement);
    expect(chosen("dt-3")).toBe(`${bySplit} m²`);
  });

  it("dt-4: hình vuông cạnh 4 dm", () => {
    expect(blanks(find("dt-4", "dien-so"))).toEqual([4 * 4, convertArea(`${4 * 4} dm²`, "cm²")]);
  });
});

describe("thời gian", () => {
  it("tg-1: đổi ba thời gian ra giây, chai ít nhất là đáp án", () => {
    const { bottles } = props<{ bottles: Bottle[] }>(find("tg-1", "trac-nghiem"));
    const seconds = bottles.map((bottle) => convertTime(bottle.time, "giây"));
    expect(seconds).toEqual([170, 165, 180]);
    expect(chosen("tg-1")).toBe(bottles[seconds.indexOf(Math.min(...seconds))].name);
  });

  it("tg-2: 200 giây", () => {
    expect(blanks(find("tg-2", "dien-so"))).toEqual([Math.floor(200 / 60), 200 % 60]);
  });

  it("tg-3: năm 1905", () => {
    expect(chosen("tg-3")).toBe(centuryName(1905));
  });
});

describe("tiền", () => {
  it("t-1: tổng ba bộ dây đèn bằng đúng tờ tiền được chọn", () => {
    const total = 62000 + 75000 + 63000;
    expect(digits(chosen("t-1"))).toBe(total);
    expect(find("t-1", "trac-nghiem").prompt).toContain(formatNumber(62000));
  });

  it("t-2, t-3: vé trò chơi cho 4 người", () => {
    expect(blanks(find("t-2", "dien-so"))).toEqual([4 * price(ticketBoard.rows, "Nhà gương")]);
    expect(blanks(find("t-3", "dien-so"))).toEqual([4 * (price(ticketBoard.rows, "Đu quay đám mây") + price(ticketBoard.rows, "Câu cá"))]);
  });

  it("t-4: hai vở và một bút chì", () => {
    expect(blanks(find("t-4", "dien-so"))).toEqual([2 * price(shopBoard.rows, "Vở") + price(shopBoard.rows, "Bút chì")]);
  });

  it("t-5: tờ nhỏ nhất đủ trả", () => {
    const total = price(shopBoard.rows, "Vở") + price(shopBoard.rows, "Bút chì") + price(shopBoard.rows, "Thước kẻ");
    const question = find("t-5", "trac-nghiem");
    const notes = question.options.map(digits);
    expect(digits(chosen("t-5"))).toBe(Math.min(...notes.filter((note) => note >= total)));
    expect(total).toBe(18000);
  });

  it("t-6: tiền thừa khi đưa 200 000 đồng", () => {
    const spent = price(shopBoard.rows, "Hộp đựng bút") + price(shopBoard.rows, "Sách truyện");
    expect(blanks(find("t-6", "dien-so"))).toEqual([200000 - spent]);
  });
});

describe("suy nghĩ thêm", () => {
  it("đáp án tính lại đúng", () => {
    expect(chosen("td-1")).toBe("kg");

    const doubled = 2 * convertTime("3 phút 40 giây", "giây");
    const [minutes, seconds] = blanks(find("td-2", "dien-so"));
    expect(minutes * 60 + seconds).toBe(doubled);

    const change = 50000 - 3 * 8000;
    expect(find("td-3", "trac-nghiem").explanation).toContain(formatNumber(change));
    expect(chosen("td-3")).toContain("chưa nhân");

    const first = convertArea("3 m²", "dm²") * 2;
    const second = 25 * 25;
    expect(first).toBe(600);
    expect(second).toBeGreaterThan(first);
    expect(chosen("td-4")).toBe("Tấm thứ hai");
  });
});
