import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { angleBetweenHands } from "@/components/math/dong-ho";
import { angleAt, polar } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { armDirections, CENTER, readScale, scaleFor } from "@/components/math/thuoc-do";
import { clockHours, exerciseGroups, flagTriangle, quad, quickChecks, readingSpecs, riverTriangle, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const lineBlanks = (question: WordQuestion) => question.lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];

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

  it("có đủ ba nhóm, nhóm cuối là Suy nghĩ thêm", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["hoat-dong", "luyen-tap", "suy-nghi"]);
  });
});

describe("thước đo góc: đáp án tính lại từ hình", () => {
  for (const [id, spec] of Object.entries(readingSpecs)) {
    it(`${id}: hai cạnh vẽ ra đúng ${spec.angle}° và đọc đúng vòng số`, () => {
      const dirs = armDirections(spec.angle, spec.base);
      const arm = polar(CENTER, 100, dirs.arm);
      const base = polar(CENTER, 100, dirs.base);
      expect(angleAt(arm, CENTER, base)).toBeCloseTo(spec.angle, 0);
      expect(readScale(scaleFor(spec.base), dirs.arm)).toBe(spec.angle);
      // Vòng số còn lại cho số khác (trừ 90°), đúng là bẫy con hay mắc.
      const other = readScale(scaleFor(spec.base) === "xanh" ? "vang" : "xanh", dirs.arm);
      if (spec.angle !== 90) expect(other).toBe(180 - spec.angle);
    });
  }

  it("câu điền số khớp với số đo của hình", () => {
    for (const id of ["hd-1a", "hd-1b", "hd-1c", "hd-1d", "lt-2a", "lt-2b", "qc-do", "qc-vong"] as const) {
      expect(blanks(find(id, "dien-so")), id).toEqual([readingSpecs[id].angle]);
    }
  });

  it("câu đọc số có cả cạnh gốc bên phải và bên trái", () => {
    const bases = new Set(Object.values(readingSpecs).map((spec) => spec.base));
    expect(bases).toEqual(new Set(["right", "left"]));
  });

  it("sn-uoc-luong: góc bé hơn 90 nên chọn 20°", () => {
    const question = find("sn-uoc-luong", "trac-nghiem");
    expect(readingSpecs["sn-uoc-luong"].angle).toBeLessThan(90);
    expect(chosen(question)).toBe(`${readingSpecs["sn-uoc-luong"].angle}°`);
    expect(question.options).toContain(`${180 - readingSpecs["sn-uoc-luong"].angle}°`);
  });

  it("sn-sach: Mai đọc nhầm vòng số", () => {
    const spec = readingSpecs["sn-sach"];
    expect(chosen(find("sn-sach", "trac-nghiem"))).toBe(`Mai sai, góc bằng ${spec.angle}°`);
    expect(find("sn-sach", "trac-nghiem").options[0]).toContain(`${180 - spec.angle}°`);
  });
});

describe("hình có ghi số đo góc", () => {
  for (const [name, shape] of Object.entries({ flagTriangle, riverTriangle, quad })) {
    it(`${name}: số ghi ở mỗi đỉnh bằng góc tính từ tọa độ`, () => {
      const n = shape.points.length;
      shape.angles.forEach((angle, index) => {
        if (angle === null) return;
        const measured = angleAt(shape.points[(index + n - 1) % n], shape.points[index], shape.points[(index + 1) % n]);
        expect(measured, `${name} đỉnh ${shape.names[index]}`).toBeCloseTo(angle, 0);
        expect(shape.labels[index]).toBe(`${angle}°`);
      });
    });
  }

  it("tứ giác có tổng bốn góc là 360°", () => {
    expect(quad.angles.reduce<number>((sum, angle) => sum + (angle ?? 0), 0)).toBe(360);
  });

  it("câu hd-2 và lt-1 khớp số ghi trên hình", () => {
    expect(lineBlanks(find("hd-2a", "loi-van"))).toEqual([flagTriangle.angles[1], flagTriangle.angles[2]]);
    expect(lineBlanks(find("hd-2b", "loi-van"))).toEqual([riverTriangle.angles[1], riverTriangle.angles[2]]);
    expect(lineBlanks(find("lt-1", "loi-van"))).toEqual([quad.angles[1], quad.angles[2], quad.angles[3]]);
  });
});

describe("đồng hồ", () => {
  const expected = (hour: number) => Math.min(hour * 30, 360 - hour * 30);

  it("góc giữa hai kim tính lại đúng", () => {
    clockHours.forEach((hour, index) => {
      expect(blanks(find(`lt-3${"abcd"[index]}`, "dien-so")), `${hour} giờ`).toEqual([expected(hour)]);
    });
    expect(clockHours.map(expected)).toEqual([30, 90, 120, 150]);
  });

  it("sn-dong-ho: chỉ 8 giờ có góc 120° như 4 giờ", () => {
    const question = find("sn-dong-ho", "trac-nghiem");
    const hours = question.options.map((option) => Number.parseInt(option, 10));
    const matching = hours.filter((hour) => angleBetweenHands(hour) === angleBetweenHands(4));
    expect(angleBetweenHands(4)).toBe(120);
    expect(matching).toEqual([8]);
    expect(chosen(question)).toBe("8 giờ");
  });
});

describe("câu khác", () => {
  it("góc vuông 90°, ký hiệu độ", () => {
    expect(chosen(find("qc-vuong", "trac-nghiem"))).toBe("90°");
    expect(chosen(find("qc-ky-hieu", "trac-nghiem"))).toBe("70°");
  });

  it("qc-canh-dai: góc 50° lớn hơn góc 30°, dù cạnh ngắn hơn", () => {
    expect(chosen(find("qc-canh-dai", "trac-nghiem"))).toBe("Góc đỉnh P");
  });

  it("khởi động", () => {
    expect(blanks(find("kd-vuong", "dien-so"))).toEqual([4]);
    expect(chosen(find("kd-dinh", "trac-nghiem"))).toBe("Điểm O");
    expect(chosen(find("kd-dong-ho", "trac-nghiem"))).toBe("Số 12");
  });
});
