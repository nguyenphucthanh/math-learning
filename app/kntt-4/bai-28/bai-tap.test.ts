import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { isRightAt } from "@/components/math/da-giac";
import { distanceToLine, isPerpendicular, passesThrough, perpendicularEdgePairs, type Point, type Seg } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { candidates, lineAB, pointH, VIEW } from "./_illustrations/chon-duong";
import { dieuGeometry, exerciseKite } from "./_illustrations/dieu";
import { ekePanels } from "./_illustrations/e-ke-dat";
import { designKite } from "./_animations/thiet-ke-dieu";
import { hLocal, place } from "./_animations/ve-vuong-goc";
import { exerciseGroups, frame, kite, quickChecks, warmUps } from "./bai-tap";

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
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

describe("hình học dùng chung", () => {
  it("khoảng cách từ điểm đến đường thẳng", () => {
    const seg: Seg = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
    expect(distanceToLine({ x: 50, y: 7 }, seg)).toBeCloseTo(7, 9);
    expect(passesThrough(seg, { x: -30, y: 0 })).toBe(true);
    expect(passesThrough(seg, { x: 3, y: 2 })).toBe(false);
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

  it("câu có hình đều có illustration", () => {
    for (const id of ["ve-e-ke", "ve-chon-duong", "dieu-ah", "dieu-cd", "dieu-goc", "dieu-tre", "kt-dem"]) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });

  it("không dùng thuật ngữ SGK chưa học", () => {
    const text = JSON.stringify(questions.map((question) => ({ ...question, illustration: undefined })));
    expect(text).not.toContain("cạnh huyền");
    expect(text).not.toContain("song song");
    expect(text).not.toContain("⊥");
  });
});

describe("đặt ê ke (ve-e-ke)", () => {
  const dot = (v: Point, p: Point, q: Point) => (p.x - v.x) * (q.x - v.x) + (p.y - v.y) * (q.y - v.y);

  it("đỉnh đầu tiên của ê ke là góc vuông", () => {
    for (const panel of ekePanels) {
      const [v, p, q] = panel.triangle;
      expect(Math.abs(dot(v, p, q)) / (dist(v, p) * dist(v, q)), panel.label).toBeLessThan(0.01);
    }
  });

  it("chỉ hình 2 có cạnh góc vuông trùng AB và cạnh góc vuông kia đi qua H", () => {
    const good = ekePanels.map((panel) => {
      const [v, p, q] = panel.triangle;
      const legs: Seg[] = [[v, p], [v, q]];
      const onAB = (leg: Seg) => passesThrough(panel.ab, leg[0], 0.6) && passesThrough(panel.ab, leg[1], 0.6);
      return (onAB(legs[0]) && passesThrough(legs[1], panel.h, 0.6)) || (onAB(legs[1]) && passesThrough(legs[0], panel.h, 0.6));
    });
    expect(good).toEqual([false, true, false]);
    expect(chosen(find("ve-e-ke", "trac-nghiem"))).toBe(`Hình ${good.indexOf(true) + 1}`);
  });

  it("hình 3: cạnh dài nhất nằm trên AB", () => {
    const [v, p, q] = ekePanels[2].triangle;
    const edges = [dist(v, p), dist(v, q), dist(p, q)];
    expect(Math.max(...edges)).toBe(edges[2]);
    expect(passesThrough(ekePanels[2].ab, p, 0.6) && passesThrough(ekePanels[2].ab, q, 0.6)).toBe(true);
  });
});

describe("chọn đường qua H (ve-chon-duong)", () => {
  it("chỉ đường 3 vừa đi qua H vừa vuông góc với AB", () => {
    const ok = candidates.map((candidate) => passesThrough(candidate.seg, pointH) && isPerpendicular(candidate.seg, lineAB));
    expect(ok).toEqual([false, false, true]);
    expect(chosen(find("ve-chon-duong", "trac-nghiem"))).toBe(`Đường ${candidates[ok.indexOf(true)].label}`);
  });

  it("hai đường còn lại sai đúng một điều kiện, lệch rõ rệt", () => {
    const [oblique, shifted] = candidates;
    expect(passesThrough(oblique.seg, pointH)).toBe(true);
    expect(isPerpendicular(oblique.seg, lineAB)).toBe(false);
    expect(isPerpendicular(shifted.seg, lineAB)).toBe(true);
    expect(distanceToLine(pointH, shifted.seg)).toBeGreaterThan(30);
  });

  it("H nằm ngoài AB và mọi điểm nằm trong khung vẽ", () => {
    expect(distanceToLine(pointH, lineAB)).toBeGreaterThan(50);
    const points = [...lineAB, ...candidates.flatMap((candidate) => candidate.seg), pointH];
    for (const point of points) {
      expect(point.x).toBeGreaterThan(20);
      expect(point.x).toBeLessThan(VIEW.width - 20);
      expect(point.y).toBeGreaterThan(20);
      expect(point.y).toBeLessThan(VIEW.height - 20);
    }
  });
});

describe("animation vẽ vuông góc", () => {
  it("CD qua H và vuông góc với AB ở cả hai trường hợp", () => {
    const ab: Seg = [place(-135, 0), place(135, 0)];
    for (const where of ["tren", "ngoai"] as const) {
      const { dx, dy } = hLocal[where];
      const h = place(dx, dy);
      const cd: Seg = [place(dx, -112), place(dx, 85)];
      expect(isPerpendicular(ab, cd), where).toBe(true);
      expect(passesThrough(cd, h), where).toBe(true);
      // Cạnh góc vuông thứ hai của ê ke (dài 100) phải với tới H.
      expect(Math.abs(dy), where).toBeLessThanOrEqual(100);
    }
    expect(distanceToLine(place(hLocal.tren.dx, hLocal.tren.dy), ab)).toBeCloseTo(0, 0);
    expect(distanceToLine(place(hLocal.ngoai.dx, hLocal.ngoai.dy), ab)).toBeCloseTo(70, 0);
  });
});

describe("khung tranh", () => {
  it("khung có 4 góc vuông và 4 cặp que vuông góc", () => {
    frame.points.forEach((_, index) => expect(isRightAt(frame.points, index)).toBe(true));
    const pairs = perpendicularEdgePairs(frame.points, frame.names);
    expect(pairs).toHaveLength(4);
    expect(blanks(find("kt-dem", "dien-so"))).toEqual([pairs.length]);
  });

  it("kiểm tra góc bằng ê ke, không đoán bằng mắt", () => {
    expect(chosen(find("kt-sai", "trac-nghiem"))).toBe("Đặt ê ke vào chỗ hai que gặp nhau");
  });
});

describe("con diều", () => {
  function check(spec: typeof exerciseKite) {
    const { h, a, b, c, d } = dieuGeometry(spec);
    expect(dist(a, b)).toBeCloseTo(spec.ab * spec.scale, 5);
    expect(dist(h, a)).toBeCloseTo(dist(h, b), 5);
    expect(midpoint(a, b)).toEqual(h);
    expect(isPerpendicular([a, b], [c, d])).toBe(true);
    expect(passesThrough([c, d], h)).toBe(true);
    expect(dist(h, c)).toBeCloseTo(spec.hc * spec.scale, 5);
    expect(dist(h, d)).toBeCloseTo(spec.hd * spec.scale, 5);
    expect(dist(c, d)).toBeCloseTo((spec.hc + spec.hd) * spec.scale, 5);
    // C và D nằm hai phía của AB: H nằm giữa C và D.
    expect((c.y - h.y) * (d.y - h.y)).toBeLessThan(0);
    return { h, a, b, c, d };
  }

  it("số liệu bài tập khớp hình vẽ", () => {
    expect(exerciseKite).toMatchObject({ ab: kite.ab, hc: kite.hc, hd: kite.hd });
    check(exerciseKite);
    expect(blanks(find("dieu-ah", "dien-so"))).toEqual([kite.ab / 2]);
    expect(blanks(find("dieu-cd", "dien-so"))).toEqual([kite.hc + kite.hd]);
  });

  it("số liệu SGK trong phần Lý thuyết: AH = 10 cm, CD = 24 cm", () => {
    expect(designKite).toMatchObject({ ab: 20, hc: 6, hd: 18 });
    const { h, a, c, d } = check(designKite);
    expect(dist(h, a) / designKite.scale).toBeCloseTo(10, 5);
    expect(dist(c, d) / designKite.scale).toBeCloseTo(24, 5);
    expect(blanks(find("thu-dieu", "dien-so"))).toEqual([24]);
  });

  it("mọi điểm của hình nằm trong khung vẽ", () => {
    for (const [spec, height] of [[exerciseKite, 228], [designKite, 250]] as const) {
      const { a, b, c, d } = dieuGeometry(spec);
      for (const point of [a, b, c, d]) {
        expect(point.x).toBeGreaterThan(20);
        expect(point.x).toBeLessThan(320);
        expect(point.y).toBeGreaterThan(20);
        expect(point.y).toBeLessThan(height - 20);
      }
    }
  });

  it("bốn góc vuông chung đỉnh H", () => {
    const { h, a, b, c, d } = dieuGeometry(exerciseKite);
    const rays = [a, c, b, d];
    let right = 0;
    rays.forEach((ray, index) => {
      const next = rays[(index + 1) % rays.length];
      const dot = (ray.x - h.x) * (next.x - h.x) + (ray.y - h.y) * (next.y - h.y);
      if (Math.abs(dot) < 1e-6) right += 1;
    });
    expect(right).toBe(4);
    expect(blanks(find("dieu-goc", "dien-so"))).toEqual([right]);
    expect(chosen(find("dieu-tre", "trac-nghiem"))).toBe("AB và CD");
  });

  it("câu nối: thứ tự và số đo khớp số liệu", () => {
    const match = find("dieu-thu-tu", "noi-cap");
    expect(match.pairs.map((pair) => pair.left)).toEqual(["Bước 1", "Bước 2", "Bước 3"]);
    expect(match.pairs[0].right).toContain(`${kite.ab} cm`);
    expect(match.pairs[1].right).toContain(`HC = ${kite.hc} cm`);
    expect(match.pairs[1].right).toContain(`HD = ${kite.hd} cm`);
  });
});

describe("khởi động và câu thử", () => {
  it("trung điểm: AH bằng một nửa AB", () => {
    expect(blanks(find("kd-trung-diem", "dien-so"))).toEqual([14 / 2]);
    expect(blanks(find("kd-bon-goc", "dien-so"))).toEqual([4]);
    expect(blanks(find("kd-e-ke", "dien-so"))).toEqual([2]);
  });

  it("các câu trắc nghiệm đáp án đúng nội dung", () => {
    expect(chosen(find("thu-canh-e-ke", "trac-nghiem"))).toBe("Trùng với đường thẳng AB");
    expect(chosen(find("thu-que", "trac-nghiem"))).toBe("Đường thẳng CD");
    expect(chosen(find("ve-tren", "trac-nghiem"))).toBe("Tại điểm M");
    expect(chosen(find("sn-nam", "trac-nghiem")).startsWith("Nam sai")).toBe(true);
    expect(chosen(find("sn-mot-duong", "trac-nghiem"))).toBe("1 đường thẳng");
  });
});
