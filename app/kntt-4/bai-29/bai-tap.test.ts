import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { arrowHead, isParallel, isPerpendicular, lineIntersection, parallelEdgePairs, perpendicularEdgePairs, pointAtX, type Point, type Seg } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { pairs, rightEnds } from "./_animations/hai-duong-keo-dai";
import { bonHinh } from "./_illustrations/bon-hinh";
import { chiaHinh } from "./_illustrations/chia-hinh";
import { streets } from "./_illustrations/duong-pho";
import { haiDoan } from "./_illustrations/hai-doan";
import { luoiHinh } from "./_illustrations/luoi";
import { letterFlags, letters } from "./_illustrations/que-tinh";
import { thang } from "./_illustrations/thang-tre";
import { exerciseGroups, hexagon, quickChecks, rectangle, square, warmUps } from "./bai-tap";

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
/** "EH và FG" -> ["EH", "FG"], mỗi tên cạnh sắp xếp chữ để không phụ thuộc thứ tự điểm. */
const pairOf = (text: string) => text.split(" và ").map((name) => [...name].sort().join(""));
const normalize = (pair: [string, string]) => pair.map((name) => [...name].sort().join("")).sort();
const pairKey = (pair: string[]) => [...pair].sort().join("|");
const seg = (points: Point[], names: string[], name: string): Seg => [points[names.indexOf(name[0])], points[names.indexOf(name[1])]];

describe("hình học dùng chung", () => {
  it("song song: cùng hướng và không trùng nhau", () => {
    const a: Seg = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
    expect(isParallel(a, [{ x: 0, y: 5 }, { x: 20, y: 5 }])).toBe(true);
    expect(isParallel(a, [{ x: 20, y: 0 }, { x: 30, y: 0 }])).toBe(false);
    expect(isParallel(a, [{ x: 0, y: 5 }, { x: 20, y: 9 }])).toBe(false);
  });

  it("giao điểm của hai đường thẳng", () => {
    expect(lineIntersection([{ x: 0, y: 0 }, { x: 10, y: 10 }], [{ x: 0, y: 10 }, { x: 10, y: 0 }])).toEqual({ x: 5, y: 5 });
    expect(lineIntersection([{ x: 0, y: 0 }, { x: 10, y: 0 }], [{ x: 0, y: 5 }, { x: 10, y: 5 }])).toBeNull();
  });

  it("điểm trên đường thẳng tại hoành độ x, mũi tên chỉ đúng hướng", () => {
    expect(pointAtX([{ x: 0, y: 0 }, { x: 10, y: 5 }], 20)).toEqual({ x: 20, y: 10 });
    const [tip] = arrowHead({ x: 50, y: 10 }, { x: 0, y: 10 }).split(" ");
    expect(tip).toBe("50,10");
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
    for (const id of ["hd-1a", "hd-1b", "hd-2", "hd-3", "lt-2a", "lt-2b", "lt-3", "lt-4", "lt-5", "sn-doan", "sn-luc-giac"]) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });

  it("không dùng cạnh huyền, ký hiệu song song hay thuật ngữ chưa học", () => {
    const text = JSON.stringify(questions.map((question) => ({ ...question, illustration: undefined })));
    expect(text).not.toContain("cạnh huyền");
    expect(text).not.toContain("∥");
    expect(text).not.toContain("⊥");
    expect(text).not.toContain("hình bình hành");
    expect(text).not.toContain("hình thoi");
  });
});

describe("cặp cạnh song song trong hình (hd-1a, hd-1b, sn-luc-giac)", () => {
  it("hd-1a: đáp án là cặp cạnh song song còn lại của hình chữ nhật EFGH", () => {
    const found = parallelEdgePairs(rectangle.points, rectangle.names).map((pair) => pairKey(normalize(pair)));
    expect(found).toHaveLength(2);
    expect(found).toContain(pairKey(["EF", "GH"]));
    const answer = pairKey(pairOf(chosen(find("hd-1a", "trac-nghiem"))));
    expect(answer).toBe(pairKey(["EH", "FG"]));
    expect(found).toContain(answer);
    // Các lựa chọn còn lại không song song.
    const wrong = find("hd-1a", "trac-nghiem").options.filter((_, index) => index !== find("hd-1a", "trac-nghiem").answerIndex);
    for (const option of wrong) expect(found, option).not.toContain(pairKey(pairOf(option)));
  });

  it("hd-1b: hình vuông nghiêng có 2 cặp cạnh song song", () => {
    expect(blanks(find("hd-1b", "dien-so"))).toEqual([parallelEdgePairs(square.points, square.names).length]);
    expect(parallelEdgePairs(square.points, square.names)).toHaveLength(2);
    // Hình thật sự nghiêng: không có cạnh nằm ngang hay thẳng đứng.
    for (let i = 0; i < 4; i += 1) {
      const a = square.points[i];
      const b = square.points[(i + 1) % 4];
      expect(Math.abs(a.x - b.x), `cạnh ${i}`).toBeGreaterThan(5);
      expect(Math.abs(a.y - b.y), `cạnh ${i}`).toBeGreaterThan(5);
    }
  });

  it("sn-luc-giac: lục giác đều có 3 cặp cạnh song song", () => {
    expect(blanks(find("sn-luc-giac", "dien-so"))).toEqual([parallelEdgePairs(hexagon.points, hexagon.names).length]);
    expect(parallelEdgePairs(hexagon.points, hexagon.names)).toHaveLength(3);
    expect(parallelEdgePairs(hexagon.points, hexagon.names).map((pair) => pairKey(normalize(pair)))).toContain(pairKey(["AB", "DE"]));
  });

  it("cạnh liền nhau của hình chữ nhật vuông góc, không song song", () => {
    expect(perpendicularEdgePairs(rectangle.points, rectangle.names)).toHaveLength(4);
    for (let i = 0; i < 4; i += 1) {
      expect(isParallel(seg(rectangle.points, rectangle.names, rectangle.names[i] + rectangle.names[(i + 1) % 4]), seg(rectangle.points, rectangle.names, rectangle.names[(i + 1) % 4] + rectangle.names[(i + 2) % 4]))).toBe(false);
    }
  });
});

describe("hình chữ nhật chia đôi (hd-2)", () => {
  const { P, Q, R, S, E, F } = chiaHinh;
  /** Khóa là tên cạnh với chữ cái đã sắp xếp (SR -> RS). */
  const edges: Record<string, Seg> = { PS: [P, S], QR: [Q, R], PQ: [P, Q], RS: [R, S] };

  it("EF song song với PS và QR, không song song với PQ và SR", () => {
    expect(isParallel([E, F], edges.PS)).toBe(true);
    expect(isParallel([E, F], edges.QR)).toBe(true);
    expect(isParallel([E, F], edges.PQ)).toBe(false);
    expect(isParallel([E, F], edges.RS)).toBe(false);
  });

  it("E nằm trên PQ, F nằm trên SR; chỉ lựa chọn đúng có cả hai cạnh song song với EF", () => {
    expect(E.y).toBe(P.y);
    expect(F.y).toBe(S.y);
    expect(E.x).toBeGreaterThan(P.x);
    expect(E.x).toBeLessThan(Q.x);
    const question = find("hd-2", "trac-nghiem");
    const flags = question.options.map((option) => pairOf(option).every((name) => isParallel([E, F], edges[name])));
    expect(flags.filter(Boolean)).toHaveLength(1);
    expect(flags.indexOf(true)).toBe(question.answerIndex);
  });
});

describe("cái thang (hd-3)", () => {
  it("hai thanh dọc song song, các bậc song song, bậc vuông góc với thanh dọc", () => {
    expect(isParallel(thang.rails[0], thang.rails[1])).toBe(true);
    for (let i = 0; i < thang.rungs.length; i += 1) {
      for (let j = i + 1; j < thang.rungs.length; j += 1) expect(isParallel(thang.rungs[i], thang.rungs[j]), `${i}-${j}`).toBe(true);
      expect(isPerpendicular(thang.rungs[i], thang.rails[0]), `bậc ${i}`).toBe(true);
      expect(isParallel(thang.rungs[i], thang.rails[0]), `bậc ${i}`).toBe(false);
    }
  });

  it("đáp án là cặp không song song: một thanh dọc và một bậc thang", () => {
    expect(chosen(find("hd-3", "trac-nghiem"))).toBe("Một thanh dọc và một bậc thang");
  });
});

describe("hình trên lưới (lt-2a, lt-2b)", () => {
  const { points, names } = luoiHinh;
  const relation = (left: string) => {
    const [a, b] = left.split(" và ").map((name) => seg(points, names, name));
    if (isParallel(a, b)) return "Song song";
    if (isPerpendicular(a, b)) return "Vuông góc";
    return "Cắt nhau, không vuông góc";
  };

  it("lt-2a: mỗi cặp nối đúng mô tả, tính từ tọa độ ô", () => {
    for (const pair of find("lt-2a", "noi-cap").pairs) expect(pair.right, pair.left).toBe(relation(pair.left));
  });

  it("lt-2b: AD và BC không song song vì cắt nhau khi kéo dài", () => {
    const ad = seg(points, names, "AD");
    const bc = seg(points, names, "BC");
    expect(isParallel(ad, bc)).toBe(false);
    expect(lineIntersection(ad, bc)).not.toBeNull();
    expect(chosen(find("lt-2b", "trac-nghiem"))).toBe(isParallel(ad, bc) ? "Có" : "Không");
  });

  it("các đỉnh nằm trên điểm lưới và trong khung", () => {
    for (const point of points) {
      expect(Number.isInteger(point.x) && Number.isInteger(point.y)).toBe(true);
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(luoiHinh.cols);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(luoiHinh.rows);
    }
  });
});

describe("chữ cái bằng que tính (lt-3)", () => {
  it("chỉ chữ H vừa có que song song vừa có que vuông góc", () => {
    const flags = Object.fromEntries(letters.map((letter) => [letter.name, letterFlags(letter.sticks)]));
    const both = Object.entries(flags).filter(([, flag]) => flag.parallel && flag.perpendicular).map(([name]) => name);
    expect(both).toEqual(["H"]);
    expect(chosen(find("lt-3", "trac-nghiem"))).toBe(`Chữ ${both[0]}`);
    expect(flags.Z).toEqual({ parallel: true, perpendicular: false });
    expect(flags.L).toEqual({ parallel: false, perpendicular: true });
    expect(flags.V).toEqual({ parallel: false, perpendicular: false });
  });

  it("các lựa chọn là đúng bốn chữ trong hình", () => {
    expect(find("lt-3", "trac-nghiem").options).toEqual(letters.map((letter) => `Chữ ${letter.name}`));
  });
});

describe("khu phố (lt-4)", () => {
  const robot = streets.find((street) => street.name === "R")!;

  it("mỗi nhà nằm trên đường của nó", () => {
    for (const street of streets) {
      const [a, b] = street.seg;
      const cross = (b.x - a.x) * (street.house.y - a.y) - (b.y - a.y) * (street.house.x - a.x);
      expect(Math.abs(cross) / Math.hypot(b.x - a.x, b.y - a.y), street.name).toBeLessThan(0.6);
    }
  });

  it("chỉ đường của nhà A song song với đường của Rô-bốt", () => {
    const parallel = streets.filter((street) => street.name !== "R" && isParallel(street.seg, robot.seg)).map((street) => street.name);
    expect(parallel).toEqual(["A"]);
    expect(chosen(find("lt-4", "trac-nghiem"))).toBe(`Nhà ${parallel[0]}`);
  });

  it("đường B vuông góc, đường C và D cắt đường R mà không vuông góc", () => {
    const by = (name: string) => streets.find((street) => street.name === name)!.seg;
    expect(isPerpendicular(by("B"), robot.seg)).toBe(true);
    for (const name of ["C", "D"]) {
      expect(isPerpendicular(by(name), robot.seg), name).toBe(false);
      expect(isParallel(by(name), robot.seg), name).toBe(false);
    }
  });

  it("mọi điểm nằm trong khung vẽ 340 x 260", () => {
    for (const point of streets.flatMap((street) => [...street.seg, street.house])) {
      expect(point.x).toBeGreaterThan(0);
      expect(point.x).toBeLessThan(340);
      expect(point.y).toBeGreaterThan(0);
      expect(point.y).toBeLessThan(260);
    }
  });
});

describe("bốn hình (lt-5)", () => {
  it("mô tả mỗi hình tính từ tọa độ", () => {
    const describeShape = ({ points, names }: (typeof bonHinh)[number]) => {
      const parallel = parallelEdgePairs(points, names).length > 0;
      const perpendicular = perpendicularEdgePairs(points, names).length > 0;
      if (parallel && perpendicular) return "Có cặp cạnh song song và có cặp cạnh vuông góc";
      if (parallel) return "Chỉ có cặp cạnh song song";
      if (perpendicular) return "Chỉ có cặp cạnh vuông góc";
      return "Không có cặp cạnh song song, không có cặp cạnh vuông góc";
    };
    const question = find("lt-5", "noi-cap");
    expect(question.pairs).toHaveLength(bonHinh.length);
    question.pairs.forEach((pair, index) => {
      expect(pair.left).toBe(`Hình ${index + 1}`);
      expect(pair.right, pair.left).toBe(describeShape(bonHinh[index]));
    });
  });
});

describe("hai đoạn thẳng (sn-doan)", () => {
  it("không chạm nhau nhưng kéo dài thì cắt nhau ở bên phải", () => {
    const { ab, cd } = haiDoan;
    expect(isParallel(ab, cd)).toBe(false);
    const meet = lineIntersection(ab, cd)!;
    expect(meet).not.toBeNull();
    expect(meet.x).toBeGreaterThan(Math.max(ab[1].x, cd[1].x));
    expect(find("sn-doan", "trac-nghiem").answerIndex).toBe(1);
  });
});

describe("animation kéo dài hai đoạn thẳng", () => {
  it("cặp thứ nhất song song, kéo dài tới mép hình vẫn không cắt nhau", () => {
    const { ab, cd } = pairs["song-song"];
    expect(isParallel(ab, cd)).toBe(true);
    expect(lineIntersection(ab, cd)).toBeNull();
    const ends = rightEnds("song-song");
    expect(ends.meet).toBeNull();
    expect(ends.cd.y - ends.ab.y).toBeCloseTo(cd[0].y - ab[0].y, 0);
    expect(ends.ab.x).toBeLessThan(340);
  });

  it("cặp thứ hai cắt nhau tại E, E nằm trong khung và bên phải hai đoạn", () => {
    const { ab, cd } = pairs["cat-nhau"];
    const ends = rightEnds("cat-nhau");
    expect(isParallel(ab, cd)).toBe(false);
    expect(ends.meet).not.toBeNull();
    expect(ends.meet!.x).toBeGreaterThan(Math.max(ab[1].x, cd[1].x));
    expect(ends.meet!.x).toBeLessThan(335);
    expect(ends.meet!.y).toBeGreaterThan(0);
    expect(ends.meet!.y).toBeLessThan(230);
  });
});
