import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { describe, expect, it } from "vitest";
import { gocArms } from "./_illustrations/cac-goc";
import { capDuongSegments } from "./_illustrations/cap-duong";
import { windmill } from "./_illustrations/coi-xay-gio";
import { isRightAt } from "@/components/math/da-giac";
import { CABIN_ANGLES, cabinNumbers, spokesPerpendicular } from "./_illustrations/du-quay";
import { pipePlans } from "./_illustrations/ong-nuoc";
import { angleBetween, isPerpendicular, obliqueEdgePairs, perpendicularEdgePairs, type Seg } from "@/lib/hinh";
import { clockHours, exerciseGroups, pentagon, quickChecks, rectangle, trapezoid, warmUpAngles, warmUps, wheel } from "./bai-tap";

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

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const pairText = (pair: [string, string]) => `${pair[0]} và ${pair[1]}`;

describe("hình học dùng chung", () => {
  it("góc giữa hai đường thẳng", () => {
    const a: Seg = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
    expect(isPerpendicular(a, [{ x: 3, y: -5 }, { x: 3, y: 5 }])).toBe(true);
    expect(angleBetween(a, [{ x: 0, y: 0 }, { x: 10, y: 10 }])).toBeCloseTo(45, 5);
    expect(isPerpendicular(a, [{ x: 0, y: 0 }, { x: 10, y: 10 }])).toBe(false);
  });
});

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
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

  it("mọi câu có gợi ý và lời giải", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(0);
      expect(question.explanation.length, question.id).toBeGreaterThan(0);
    }
  });

  it("câu nối và câu có hình đều có illustration khi đề cần hình", () => {
    expect(find("lt-2a", "noi-cap").illustration).toBeDefined();
  });

  it("khởi động: chỉ góc C là góc vuông", () => {
    const right = warmUpAngles.filter((spec) => spec.degrees === 90).map((spec) => spec.name);
    expect(right).toEqual(["C"]);
    const question = find("kd-goc", "trac-nghiem");
    expect(chosen(question)).toBe(`Góc ${right[0]}`);
    for (const spec of warmUpAngles) {
      const [p, q] = gocArms(spec, { x: 0, y: 0 });
      const dot = p.x * q.x + p.y * q.y;
      expect(Math.abs(dot) < 0.5 * 42 * 42 * 0.02, spec.name).toBe(spec.degrees === 90);
    }
    expect(blanks(find("kd-chu-nhat", "dien-so"))).toEqual([4]);
  });

  it("hai đường cắt nhau: đáp án khớp góc dùng để vẽ", () => {
    const cases: [string, number, number, string][] = [
      ["thu-khong", 10, 120, "Không, chỉ cắt nhau"],
      ["hd-1a", 15, 65, "Không"],
      ["hd-1b", 20, 90, "Có"],
      ["sn-mai", 30, 55, "Mai sai: hai đường thẳng này cắt nhau mà không vuông góc"],
    ];
    for (const [id, rotation, angle, answer] of cases) {
      const [a, b] = capDuongSegments(rotation, angle);
      expect(isPerpendicular(a, b), id).toBe(angle === 90);
      expect(chosen(find(id, "trac-nghiem")), id).toBe(answer);
      // Câu "không vuông góc" phải lệch rõ rệt khỏi 90° để nhìn được trên màn hình.
      if (angle !== 90) expect(Math.abs(angleBetween(a, b) - 90), id).toBeGreaterThan(20);
    }
  });

  it("hình chữ nhật kéo dài: 4 góc vuông, 4 cặp cạnh vuông góc", () => {
    const { points, names } = rectangle;
    points.forEach((_, index) => expect(isRightAt(points, index)).toBe(true));
    expect(perpendicularEdgePairs(points, names)).toHaveLength(4);
    expect(blanks(find("sn-dem", "dien-so"))).toEqual([4]);
    expect(blanks(find("thu-bon-goc", "dien-so"))).toEqual([4]);
  });

  it("ngũ giác: chỉ góc B và C vuông, đáp án là AB-BC và BC-CD", () => {
    const { points, names } = pentagon;
    expect(names.filter((_, index) => isRightAt(points, index))).toEqual(["B", "C"]);
    const pairs = perpendicularEdgePairs(points, names).map(pairText);
    expect(pairs).toEqual(["AB và BC", "BC và CD"]);
    const question = find("hd-2", "trac-nghiem");
    expect(chosen(question).split("; ").sort()).toEqual([...pairs].sort());
    const matching = question.options.filter((option) => option.split("; ").every((text) => pairs.includes(text)));
    expect(matching).toEqual([chosen(question)]);
  });

  it("cối xay gió: chỉ hai thanh cánh quạt vuông góc", () => {
    const { sailAC, sailBD, ground, towerLeft, towerRight } = windmill;
    expect(isPerpendicular(sailAC, sailBD)).toBe(true);
    expect(isPerpendicular(sailAC, ground)).toBe(false);
    expect(isPerpendicular(towerLeft, towerRight)).toBe(false);
    expect(chosen(find("hd-3", "trac-nghiem"))).toBe("Thanh cánh quạt AC và thanh cánh quạt BD");
  });

  it("tứ giác ABCD: góc B và C vuông, bài nối và bài đếm đúng", () => {
    const { points, names } = trapezoid;
    expect(names.filter((_, index) => isRightAt(points, index))).toEqual(["B", "C"]);
    const right = perpendicularEdgePairs(points, names).map(pairText);
    expect(right).toEqual(["AB và BC", "BC và CD"]);
    const oblique = obliqueEdgePairs(points, names).map(pairText);
    expect(oblique).toEqual(["CD và DA", "DA và AB"]);
    expect(blanks(find("lt-2b", "dien-so"))).toEqual([oblique.length]);

    const match = find("lt-2a", "noi-cap");
    const byLeft = Object.fromEntries(match.pairs.map((pair) => [pair.left, pair.right]));
    expect(byLeft["AB và BC"]).toBe("Vuông góc, cắt nhau tại B");
    expect(byLeft["BC và CD"]).toBe("Vuông góc, cắt nhau tại C");
    expect(byLeft["CD và DA"]).toBe("Cắt nhau tại D, không vuông góc");
    expect(match.pairs.map((pair) => pair.left)).toEqual([...right, "CD và DA"]);
  });

  it("ống nước: chỉ phương án B có M vuông góc N và N vuông góc P", () => {
    const ok = pipePlans.map((plan) => {
      const [m, n, p] = plan.pipes.map((pipe) => pipe.seg);
      return isPerpendicular(m, n) && isPerpendicular(n, p);
    });
    expect(ok).toEqual([false, true, false]);
    const question = find("lt-3", "trac-nghiem");
    expect(chosen(question)).toBe(`Phương án ${pipePlans[ok.indexOf(true)].label}`);
    // Các ống nối nhau đầu-cuối.
    for (const plan of pipePlans) {
      expect(plan.pipes[0].seg[1]).toEqual(plan.pipes[1].seg[0]);
      expect(plan.pipes[1].seg[1]).toEqual(plan.pipes[2].seg[0]);
    }
  });

  it("đu quay: đúng một ca-bin trong các lựa chọn có nan hoa vuông góc với ca-bin vàng", () => {
    const numbers = cabinNumbers(wheel.yellowIndex);
    const indexOf = (cabin: number) => Number(Object.entries(numbers).find(([, value]) => value === cabin)![0]);
    const yellow = CABIN_ANGLES[wheel.yellowIndex];
    const perpendicular = wheel.options.filter((cabin) => spokesPerpendicular(CABIN_ANGLES[indexOf(cabin)], yellow));
    expect(perpendicular).toEqual([wheel.answerCabin]);
    expect(chosen(find("lt-5", "trac-nghiem"))).toBe(`Ca-bin ${wheel.answerCabin}`);
    expect(find("lt-5", "trac-nghiem").options).toEqual(wheel.options.map((cabin) => `Ca-bin ${cabin}`));
    // Ca-bin thứ hai cũng vuông góc, nằm ngoài các lựa chọn, được nhắc trong lời giải.
    const all = Object.values(numbers).filter((cabin) => spokesPerpendicular(CABIN_ANGLES[indexOf(cabin)], yellow));
    expect(all.sort()).toEqual([1, 4]);
    expect(find("lt-5", "trac-nghiem").explanation).toContain("Ca-bin 1 cũng được");
  });

  it("đồng hồ: chỉ 9 giờ trong các lựa chọn có kim giờ vuông góc kim phút", () => {
    const right = clockHours.filter((hour) => Math.abs((((hour * 30) % 180) + 180) % 180 - 90) < 1e-9);
    expect(right).toEqual([9]);
    expect(chosen(find("sn-dong-ho", "trac-nghiem"))).toBe("9 giờ");
  });
});
