import { describe, expect, it } from "vitest";
import type { FillQuestion, Question } from "@/components/exercises/types";
import { centuryOf, centuryRange, convertTime, countYears, toRoman, type TimeUnit } from "@/lib/time-units";
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

const centuryName = (year: number) => `Thế kỉ ${toRoman(centuryOf(year))}`;

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
      expect(blanks(question), question.id).toEqual([convertTime(source, to as TimeUnit)]);
    }
  });

  it("đáp án đổi đơn vị khớp bảng đã duyệt trong brief", () => {
    const expected: Record<string, number> = {
      "giay-1": 60, "giay-2": 240, "giay-3": 1, "giay-4": 5,
      "on-1": 72, "on-2": 21, "on-3": 185, "on-4": 240, "on-5": 5, "on-6": 160,
      "tk-1": 100, "tk-2": 700, "tk-3": 1, "tk-4": 5, "td-10-the-ki": 10, "dem-131": 131,
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

  it("đáp án là năm được đánh dấu để hiện liền, không tách lớp", () => {
    for (const id of ["lt-thang-long-nam", "lt-giap-thin-nam", "lt-nam-cuoi"]) {
      const blank = find(id, "dien-so").parts.find((part) => typeof part !== "string");
      expect(blank, id).toMatchObject({ year: true });
    }
  });
});

describe("năm và thế kỉ", () => {
  it("câu đoạn thế kỉ XX khớp đoạn năm tính lại", () => {
    const [start, end] = centuryRange(20);
    expect(chosen("tk-doan")).toBe(`Từ năm ${start} đến năm ${end}`);
  });

  it("nối sự kiện: năm ghi trong câu thuộc đúng thế kỉ đã nối", () => {
    for (const pair of find("tk-su-kien", "noi-cap").pairs) {
      const year = Number(pair.left.match(/năm (\d+)/)![1]);
      expect(pair.right, pair.left).toBe(centuryName(year));
    }
  });

  it("Thăng Long: tính năm rồi tìm thế kỉ", () => {
    expect(blanks(find("lt-thang-long-nam", "dien-so"))).toEqual([2010 - 1000]);
    expect(chosen("lt-thang-long-tk")).toBe(centuryName(1010));
  });

  it("Giáp Thìn: tính năm rồi tìm thế kỉ", () => {
    expect(blanks(find("lt-giap-thin-nam", "dien-so"))).toEqual([1964 + 60]);
    expect(chosen("lt-giap-thin-tk")).toBe(centuryName(2024));
  });

  it("năm can chi trong đề đúng theo lịch", () => {
    const stems = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const branches = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const canChi = (year: number) => `${stems[(year - 4) % 10]} ${branches[(year - 4) % 12]}`;
    expect(canChi(1964)).toBe("Giáp Thìn");
    expect(canChi(2024)).toBe("Giáp Thìn");
    expect(canChi(1940)).toBe("Canh Thìn");
    expect(canChi(2000)).toBe("Canh Thìn");
  });

  it("tàu thủy: đếm năm cả hai đầu rồi nhân", () => {
    const question = find("lt-tau-thuy", "loi-van");
    const answers = question.lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
    const years = countYears(2011, 2018);
    expect(answers).toEqual([years, years, 300 * years]);
    expect(answers[2]).toBe(2400);
  });

  it("năm nhuận thế kỉ XX: đếm đúng dãy từ 1904 đến 2000", () => {
    const leapYears: number[] = [];
    for (let year = 1904; year <= 2000; year += 4) leapYears.push(year);
    expect(blanks(find("lt-nam-nhuan", "dien-so"))).toEqual([leapYears.length]);
    expect(leapYears.length).toBe(25);
  });

  it("năm cuối của thế kỉ XIX", () => {
    expect(blanks(find("lt-nam-cuoi", "dien-so"))).toEqual([centuryRange(19)[1]]);
  });

  it("câu thử: năm tròn trăm và đếm năm", () => {
    expect(chosen("thu-tim")).toBe(centuryName(1500));
    expect(blanks(find("thu-dem-nam", "dien-so"))).toEqual([countYears(2021, 2025)]);
  });
});

describe("khởi động", () => {
  it("đúng danh sách trong brief và đáp án tính lại đúng", () => {
    expect(warmUps.map((question) => question.id)).toEqual(["kd-gio", "kd-ngay", "kd-tuan", "kd-nhan", "kd-dem", "kd-la-ma"]);
    expect(blanks(find("kd-gio", "dien-so"))).toEqual([convertTime("1 giờ", "phút")]);
    expect(blanks(find("kd-ngay", "dien-so"))).toEqual([convertTime("1 ngày", "giờ")]);
    expect(blanks(find("kd-tuan", "dien-so"))).toEqual([convertTime("1 tuần", "ngày")]);
    expect(blanks(find("kd-nhan", "dien-so"))).toEqual([3 * 60]);
    expect(blanks(find("kd-dem", "dien-so"))).toEqual([1300 + 100]);
    expect(toRoman(Number(chosen("kd-la-ma")))).toBe("XIV");
  });
});

describe("nhóm Suy nghĩ thêm", () => {
  it("đủ 7 câu và đáp án tính lại đúng", () => {
    const group = exerciseGroups.find((item) => item.id === "tu-duy")!;
    expect(group.questions).toHaveLength(7);

    expect(blanks(find("td-gap-phut", "dien-so"))).toEqual([convertTime("1 phút", "giây")]);
    expect(blanks(find("td-gap-the-ki", "dien-so"))).toEqual([convertTime("1 thế kỉ", "năm")]);

    expect(centuryOf(1900)).toBe(19);
    expect(chosen("td-loi-an")).toContain("năm cuối của thế kỉ XIX");

    expect(convertTime("3 phút 20 giây", "giây")).toBe(200);
    expect(chosen("td-loi-minh")).toContain("200 giây");

    expect(countYears(2011, 2013)).toBe(3);
    expect(chosen("td-loi-lan")).toContain("Có 3 năm");

    expect(chosen("td-canh-thin")).toBe(centuryName(1940 + 60));
  });
});
