import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { angleBetweenHands } from "@/components/math/dong-ho";
import { armDirections, CENTER, readScale, scaleFor } from "@/components/math/thuoc-do";
import { angleAt, angleKind, polar, polygonAngleKind } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { chonHinh, hinhDung } from "./_illustrations/chon-hinh";
import { tamGiacDiem } from "./_illustrations/tam-giac-diem";
import { loaiGoc } from "./_illustrations/phan-loai-goc";
import { chonHinhAngles, clockHours, exerciseGroups, kindOptions, quickChecks, readingSpecs, trapezoid, warmUps } from "./bai-tap";

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

  it("nhóm cuối là Suy nghĩ thêm", () => {
    expect(exerciseGroups.at(-1)?.id).toBe("suy-nghi");
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
    });
  }

  it("câu điền số khớp với số đo của hình", () => {
    for (const id of ["do-1", "do-2", "do-3", "do-4", "qc-do", "qc-vong"] as const) {
      expect(blanks(find(id, "dien-so")), id).toEqual([readingSpecs[id].angle]);
    }
  });

  it("có cả cạnh gốc bên phải và bên trái", () => {
    expect(new Set(Object.values(readingSpecs).map((spec) => spec.base))).toEqual(new Set(["right", "left"]));
  });

  it("sn-loi: An đọc nhầm vòng số", () => {
    const spec = readingSpecs["sn-loi"];
    const question = find("sn-loi", "trac-nghiem");
    expect(chosen(question)).toBe(`An sai, góc bằng ${spec.angle}°`);
    expect(question.options[0]).toContain(`${180 - spec.angle}°`);
  });
});

describe("phân loại góc", () => {
  it("ở các câu cho số đo, đáp án đúng loại góc", () => {
    const cases = { "lg-1": 35, "lg-2": 90, "lg-3": 125, "lg-4": 180, "qc-loai": 150 };
    for (const [id, degrees] of Object.entries(cases)) {
      expect(chosen(find(id, "trac-nghiem")), id).toBe(kindOptions[{ nhọn: 0, vuông: 1, tù: 2, bẹt: 3 }[angleKind(degrees)]]);
    }
  });

  it("lg-5: chỉ 110° là góc tù", () => {
    const question = find("lg-5", "trac-nghiem");
    const tu = question.options.filter((option) => angleKind(Number.parseInt(option, 10)) === "tù");
    expect(tu).toEqual(["110°"]);
    expect(chosen(question)).toBe("110°");
  });

  it("lg-6: góc 130° lớn hơn góc vuông", () => {
    expect(angleKind(130)).toBe("tù");
    expect(chosen(find("lg-6", "trac-nghiem"))).toBe("Góc tù");
  });

  it("bốn hình mẫu đúng loại và đủ bốn loại", () => {
    expect(loaiGoc.map((item) => angleKind(item.degrees))).toEqual(["nhọn", "vuông", "tù", "bẹt"]);
  });

  it("qc-eke, khởi động", () => {
    expect(chosen(find("qc-eke", "trac-nghiem"))).toBe("Góc vuông");
    expect(chosen(find("kd-vuong", "trac-nghiem"))).toBe("90°");
    expect(chosen(find("kd-tu", "trac-nghiem"))).toBe("Góc tù");
    expect(blanks(find("kd-bet", "dien-so"))).toEqual([180]);
  });
});

describe("hình SGLD", () => {
  const { points, names, angles, labels } = trapezoid;
  const n = points.length;
  const measured = points.map((_, index) => angleAt(points[(index + n - 1) % n], points[index], points[(index + 1) % n]));

  it("số ghi ở mỗi đỉnh bằng góc tính từ tọa độ, tổng 360°", () => {
    angles.forEach((angle, index) => {
      expect(measured[index], names[index]).toBeCloseTo(angle, 0);
      expect(labels[index]).toBe(`${angle}°`);
    });
    expect(angles.reduce((sum, angle) => sum + angle, 0)).toBe(360);
  });

  it("gh-1, gh-2 và Đ/S khớp hình", () => {
    expect(chosen(find("gh-1", "trac-nghiem"))).toBe("Góc tù");
    expect(polygonAngleKind(points, names.indexOf("G"))).toBe("tù");
    const count = (kind: string) => points.filter((_, index) => polygonAngleKind(points, index) === kind).length;
    expect(lineBlanks(find("gh-2", "loi-van"))).toEqual([count("vuông"), count("nhọn"), count("tù")]);
    // ds-1: có đủ nhọn, tù, vuông. ds-2: không có góc bẹt.
    expect(["nhọn", "tù", "vuông"].every((kind) => count(kind) > 0)).toBe(true);
    expect(chosen(find("ds-1", "trac-nghiem"))).toBe("Đúng");
    expect(count("bẹt")).toBe(0);
    expect(chosen(find("ds-2", "trac-nghiem"))).toBe("Sai");
  });
});

describe("tam giác ABC có điểm D", () => {
  const { A, B, C, D } = tamGiacDiem;

  it("ds-3: B, D, C thẳng hàng, DB và DC tạo góc bẹt", () => {
    expect(angleAt(B, D, C)).toBeCloseTo(180, 0);
    expect(chosen(find("ds-3", "trac-nghiem"))).toBe("Đúng");
  });

  it("ds-4: góc BDA là góc nhọn, không phải góc tù", () => {
    expect(angleKind(angleAt(B, D, A))).toBe("nhọn");
    expect(chosen(find("ds-4", "trac-nghiem"))).toBe("Sai");
  });
});

describe("chọn hình Rô-bốt vẽ", () => {
  const angle = (name: keyof typeof chonHinh, from: "M" | "N" | "P", to: "M" | "N" | "P") => {
    const { rays } = chonHinh[name];
    const diff = Math.abs(rays[from] - rays[to]);
    return diff > 180 ? 360 - diff : diff;
  };
  const matches = (name: keyof typeof chonHinh) => angle(name, "M", "N") === chonHinhAngles.MON && angle(name, "N", "P") === chonHinhAngles.NOP;

  it("chỉ đúng một hình thỏa MON = 40° và NOP = 90°, đó là đáp án", () => {
    expect((["A", "B", "C"] as const).filter(matches)).toEqual([hinhDung]);
    const question = find("ch-1", "trac-nghiem");
    expect(chosen(question)).toBe(`Hình ${hinhDung}`);
    expect(question.prompt).toContain("40°");
    expect(question.prompt).toContain("90°");
  });

  it("ch-2: góc MOP = MON + NOP và khớp hình B", () => {
    expect(chonHinhAngles.MON + chonHinhAngles.NOP).toBe(chonHinhAngles.MOP);
    expect(angle("B", "M", "P")).toBe(chonHinhAngles.MOP);
    expect(blanks(find("ch-2", "dien-so"))).toEqual([chonHinhAngles.MOP]);
  });

  it("A có MON bằng 90° nên sai, C có NOP không vuông", () => {
    expect(angle("A", "M", "N")).toBe(90);
    expect(angle("C", "N", "P")).not.toBe(90);
  });
});

describe("đồng hồ", () => {
  it("loại góc giữa hai kim tính lại đúng", () => {
    const expected = ["vuông", "bẹt", "nhọn", "tù"];
    clockHours.forEach((hour, index) => {
      const degrees = angleBetweenHands(hour);
      expect(angleKind(degrees), `${hour} giờ`).toBe(expected[index]);
      expect(chosen(find(`dh-${index + 1}`, "trac-nghiem")), `${hour} giờ`).toBe(kindOptions[{ nhọn: 0, vuông: 1, tù: 2, bẹt: 3 }[angleKind(degrees)]]);
    });
    expect(clockHours.map((hour) => angleBetweenHands(hour))).toEqual([90, 180, 30, 120]);
  });
});

describe("suy nghĩ thêm", () => {
  it("sn-uoc-luong: góc 50° là đáp án gần nhất, bé hơn góc vuông", () => {
    expect(chosen(find("sn-uoc-luong", "trac-nghiem"))).toBe("50°");
  });

  it("sn-bet: 90 + 90 = 180", () => {
    expect(blanks(find("sn-bet", "dien-so"))).toEqual([90 + 90]);
  });
});
