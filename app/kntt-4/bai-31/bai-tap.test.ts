import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { fourthVertex, isParallel, isParallelogram, isPerpendicular, isRhombus, lengthOf, parallelEdgePairs, polygonArea, type Point, type Seg } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { binhHanh } from "./_animations/hinh-binh-hanh";
import { hinhThoi } from "./_animations/hinh-thoi";
import { hinhBinhHanhNho, hinhThoiNho } from "./_animations/giong-khac";
import { paper, rhombusPoints } from "./_animations/gap-giay";
import { dangHinh, dayHinh, duongCheo, hinhGhep, haiHinhBinhHanh, mieng, viTriDauHoi } from "./_illustrations/hinh-rieng";
import { bonDiem, dinhC, hinhBinhHanhCuaBai, hinhThoiCuaBai, luoiBinhHanh, luoiHinhThoi, timDinhC } from "./_illustrations/luoi";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const names = (list: { name: string }[]) => list.map((item) => item.name);
const pointsOf = (record: Record<string, Point>, order: string[]) => order.map((name) => record[name]);
const sidesOf = (points: Point[]): Seg[] => points.map((p, i) => [p, points[(i + 1) % points.length]]);

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

  it("mọi câu có gợi ý và lời giải", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(0);
      expect(question.explanation.length, question.id).toBeGreaterThan(0);
    }
  });

  it("câu có hình đều có illustration", () => {
    for (const id of ["bb-nhan-dang", "bb-dinh-c", "bb-canh-bang", "bb-song-song-cd", "ht-nhan-dang", "ht-day-hinh", "ht-bon-diem", "ht-duong-cheo", "ht-ghep-hai-mieng"]) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["binh-hanh", "hinh-thoi", "suy-nghi"]);
  });
});

describe("hình trong animation", () => {
  it("hình bình hành ABCD: các cạnh đối diện song song và bằng nhau", () => {
    const points = pointsOf(binhHanh, ["A", "B", "C", "D"]);
    expect(isParallelogram(points)).toBe(true);
    expect(isRhombus(points)).toBe(false);
    const [ab, bc, dc, ad] = [sidesOf(points)[0], sidesOf(points)[1], sidesOf(points)[2], sidesOf(points)[3]];
    expect(isParallel(ab, dc)).toBe(true);
    expect(isParallel(ad, bc)).toBe(true);
    expect(lengthOf(ab)).toBe(lengthOf(dc));
    expect(lengthOf(ad)).toBe(lengthOf(bc));
    expect(lengthOf(ab)).toBe(8);
  });

  it("hình thoi ABCD: bốn cạnh bằng nhau, đường chéo vuông góc và cắt nhau tại O", () => {
    const points = pointsOf(hinhThoi, ["A", "B", "C", "D"]);
    expect(isRhombus(points)).toBe(true);
    const [ab, bc, cd, da] = sidesOf(points);
    expect(isParallel(ab, cd)).toBe(true);
    expect(isParallel(da, bc)).toBe(true);
    expect(isPerpendicular([hinhThoi.A, hinhThoi.C], [hinhThoi.B, hinhThoi.D])).toBe(true);
    expect(hinhThoi.O).toEqual({ x: (hinhThoi.A.x + hinhThoi.C.x) / 2, y: (hinhThoi.B.y + hinhThoi.D.y) / 2 });
    expect(hinhThoi.O).toEqual({ x: (hinhThoi.B.x + hinhThoi.D.x) / 2, y: (hinhThoi.A.y + hinhThoi.C.y) / 2 });
  });

  it("hình so sánh: hình bình hành không phải hình thoi, hình thoi nhỏ đúng là hình thoi", () => {
    expect(isParallelogram(hinhBinhHanhNho)).toBe(true);
    expect(isRhombus(hinhBinhHanhNho)).toBe(false);
    // Hai cặp cạnh đối diện bằng nhau, hai cặp cạnh kề khác nhau: dấu gạch 1-2-1-2.
    const [s0, s1, s2, s3] = sidesOf(hinhBinhHanhNho).map(lengthOf);
    expect(s0).toBeCloseTo(s2, 9);
    expect(s1).toBeCloseTo(s3, 9);
    expect(Math.abs(s0 - s1)).toBeGreaterThan(3);
    expect(isRhombus(hinhThoiNho)).toBe(true);
  });

  it("gấp giấy: các trung điểm của bốn cạnh tờ giấy tạo thành hình thoi (tờ giấy không phải hình vuông)", () => {
    expect(paper.width).not.toBe(paper.height);
    expect(isRhombus(rhombusPoints)).toBe(true);
    const [top, right, bottom, left] = rhombusPoints;
    expect(top).toEqual({ x: paper.x + paper.width / 2, y: paper.y });
    expect(right).toEqual({ x: paper.x + paper.width, y: paper.y + paper.height / 2 });
    expect(bottom).toEqual({ x: paper.x + paper.width / 2, y: paper.y + paper.height });
    expect(left).toEqual({ x: paper.x, y: paper.y + paper.height / 2 });
    // Hình thoi có diện tích bằng nửa tờ giấy.
    expect(polygonArea(rhombusPoints)).toBe((paper.width * paper.height) / 2);
  });
});

describe("nhận diện hình bình hành (bb-nhan-dang)", () => {
  it("A, C, E là hình bình hành; B và D thì không, và không hình nào là hình thoi", () => {
    const parallelograms = hinhBinhHanhCuaBai.filter((shape) => isParallelogram(shape.points));
    expect(names(parallelograms)).toEqual(["A", "C", "E"]);
    expect(hinhBinhHanhCuaBai.some((shape) => isRhombus(shape.points))).toBe(false);
    expect(chosen(find("bb-nhan-dang", "trac-nghiem"))).toBe("Hình A, C và E");
  });

  it("B chỉ có một cặp cạnh song song, D không có cặp nào", () => {
    const byName = Object.fromEntries(hinhBinhHanhCuaBai.map((shape) => [shape.name, shape.points]));
    expect(parallelEdgePairs(byName.B, ["1", "2", "3", "4"])).toHaveLength(1);
    expect(parallelEdgePairs(byName.D, ["1", "2", "3", "4"])).toHaveLength(0);
    expect(parallelEdgePairs(byName.A, ["1", "2", "3", "4"])).toHaveLength(2);
  });

  it("mọi hình nằm trong lưới", () => {
    for (const point of hinhBinhHanhCuaBai.flatMap((shape) => shape.points)) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(luoiBinhHanh.cols);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(luoiBinhHanh.rows);
    }
  });
});

describe("đỉnh C của hình bình hành (bb-dinh-c)", () => {
  it("C = B + D − A nằm ở điểm 3 và ABCD là hình bình hành; hai điểm kia không", () => {
    const { A, B, D, candidates } = timDinhC;
    expect(dinhC).toEqual({ x: B.x + D.x - A.x, y: B.y + D.y - A.y });
    const works = candidates.map((candidate) => isParallelogram([A, B, candidate.at, D]));
    expect(works).toEqual([false, false, true]);
    expect(chosen(find("bb-dinh-c", "trac-nghiem"))).toBe(`Điểm ${candidates[works.indexOf(true)].name}`);
    expect(lengthOf([A, B])).toBe(10);
    for (const point of [A, B, D, ...candidates.map((candidate) => candidate.at)]) {
      expect(point.x).toBeLessThanOrEqual(timDinhC.grid.cols);
      expect(point.y).toBeLessThanOrEqual(timDinhC.grid.rows);
    }
  });
});

describe("hai hình bình hành chung cạnh CD", () => {
  const h = haiHinhBinhHanh;
  const abcd = [h.A, h.B, h.C, h.D];
  const cdeg = [h.C, h.D, h.E, h.G];

  it("ABCD và CDEG đều là hình bình hành", () => {
    expect(isParallelogram(abcd)).toBe(true);
    expect(isParallelogram(cdeg)).toBe(true);
  });

  it("AB = DC = EG nên EG = AB", () => {
    expect(lengthOf([h.A, h.B])).toBe(lengthOf([h.D, h.C]));
    expect(lengthOf([h.D, h.C])).toBe(lengthOf([h.E, h.G]));
    const question = find("bb-canh-bang", "dien-so");
    expect(question.prompt).toContain("AB bằng 6 dm");
    expect(blanks(question)).toEqual([6]);
  });

  it("cạnh song song với CD là AB và EG", () => {
    const cd: Seg = [h.C, h.D];
    const others: Record<string, Seg> = { AB: [h.A, h.B], EG: [h.E, h.G], AD: [h.A, h.D], BC: [h.B, h.C], DE: [h.D, h.E], CG: [h.C, h.G] };
    const parallel = Object.entries(others).filter(([, seg]) => isParallel(cd, seg)).map(([name]) => name);
    expect(parallel.sort()).toEqual(["AB", "EG"]);
    expect(chosen(find("bb-song-song-cd", "trac-nghiem"))).toBe("AB và EG");
    // Hai đáp án sai là hai cặp song song với nhau nhưng không song song với CD.
    expect(isParallel(others.AD, others.BC)).toBe(true);
    expect(isParallel(others.DE, others.CG)).toBe(true);
    expect(isParallel(cd, others.AD)).toBe(false);
    expect(isParallel(cd, others.DE)).toBe(false);
  });
});

describe("nhận diện hình thoi (ht-nhan-dang)", () => {
  it("A và C là hình thoi; B, D là hình bình hành không phải hình thoi; E không phải hình bình hành", () => {
    const byName = Object.fromEntries(hinhThoiCuaBai.map((shape) => [shape.name, shape.points]));
    expect(names(hinhThoiCuaBai.filter((shape) => isRhombus(shape.points)))).toEqual(["A", "C"]);
    expect(isParallelogram(byName.B) && !isRhombus(byName.B)).toBe(true);
    expect(isParallelogram(byName.D) && !isRhombus(byName.D)).toBe(true);
    expect(isParallelogram(byName.E)).toBe(false);
    expect(parallelEdgePairs(byName.E, ["1", "2", "3", "4"])).toHaveLength(0);
    expect(chosen(find("ht-nhan-dang", "trac-nghiem"))).toBe("Hình A và C");
  });

  it("mọi hình nằm trong lưới", () => {
    for (const point of hinhThoiCuaBai.flatMap((shape) => shape.points)) {
      expect(point.x).toBeLessThanOrEqual(luoiHinhThoi.cols);
      expect(point.y).toBeLessThanOrEqual(luoiHinhThoi.rows);
    }
  });
});

describe("dãy hình (ht-day-hinh)", () => {
  it("quy luật lặp nhóm ba, hình thứ 8 là hình bình hành", () => {
    expect(viTriDauHoi).toBe(8);
    const at = (position: number) => (["thoi", "binh-hanh", "binh-hanh"] as const)[(position - 1) % 3];
    dayHinh.forEach((dang, index) => expect(dang, `hình ${index + 1}`).toBe(at(index + 1)));
    expect(at(viTriDauHoi)).toBe("binh-hanh");
    expect(chosen(find("ht-day-hinh", "trac-nghiem"))).toBe("Hình bình hành");
  });

  it("hình thoi và hình bình hành vẽ đúng loại", () => {
    expect(isRhombus(dangHinh.thoi)).toBe(true);
    expect(isParallelogram(dangHinh["binh-hanh"])).toBe(true);
    expect(isRhombus(dangHinh["binh-hanh"])).toBe(false);
  });
});

describe("bốn điểm tạo hình thoi (ht-bon-diem)", () => {
  it("chỉ điểm Q cho hình thoi MNPQ", () => {
    const { M, N, P, candidates } = bonDiem;
    expect(lengthOf([M, N])).toBe(lengthOf([N, P]));
    const rhombus = candidates.map((candidate) => isRhombus([M, N, P, candidate.at]));
    expect(candidates.filter((_, i) => rhombus[i]).map((candidate) => candidate.name)).toEqual(["Q"]);
    expect(candidates.find((candidate) => candidate.name === "Q")!.at).toEqual(fourthVertex(M, N, P));
    expect(chosen(find("ht-bon-diem", "trac-nghiem"))).toBe("Bốn điểm M, N, P, Q");
    // Hai điểm còn lại không tạo hình bình hành.
    expect(candidates.filter((candidate) => isParallelogram([M, N, P, candidate.at]))).toHaveLength(1);
  });
});

describe("đường chéo hình thoi (ht-duong-cheo)", () => {
  it("ABCD là hình thoi và hai đường chéo vuông góc", () => {
    expect(isRhombus(pointsOf(duongCheo, ["A", "B", "C", "D"]))).toBe(true);
    expect(isPerpendicular([duongCheo.A, duongCheo.C], [duongCheo.B, duongCheo.D])).toBe(true);
    expect(chosen(find("ht-duong-cheo", "trac-nghiem"))).toBe("Hai đường chéo vuông góc với nhau");
  });
});

describe("ghép hai miếng tam giác vuông cân (ht-ghep-hai-mieng)", () => {
  const triangleArea = polygonArea(mieng);

  it("miếng ghép là tam giác vuông cân", () => {
    const [a, b, c] = mieng;
    expect(lengthOf([a, b])).toBe(lengthOf([b, c]));
    expect(isPerpendicular([a, b], [b, c])).toBe(true);
  });

  it("A, B, C có diện tích bằng hai miếng; A là hình vuông, B là tam giác, C là hình bình hành", () => {
    for (const name of ["A", "B", "C"] as const) expect(polygonArea(hinhGhep[name]), name).toBe(2 * triangleArea);
    expect(isParallelogram(hinhGhep.A) && isPerpendicular(sidesOf(hinhGhep.A)[0], sidesOf(hinhGhep.A)[1])).toBe(true);
    expect(isRhombus(hinhGhep.A)).toBe(true);
    expect(hinhGhep.B).toHaveLength(3);
    expect(isPerpendicular(sidesOf(hinhGhep.B)[0], sidesOf(hinhGhep.B)[2]) || isPerpendicular(sidesOf(hinhGhep.B)[1], sidesOf(hinhGhep.B)[2])).toBe(true);
    expect(isParallelogram(hinhGhep.C)).toBe(true);
    expect(isRhombus(hinhGhep.C)).toBe(false);
  });

  it("D là hình thoi không có góc vuông: hai miếng ghép không thể ghép được", () => {
    const d = hinhGhep.D;
    expect(isRhombus(d)).toBe(true);
    const [s0, s1] = sidesOf(d);
    expect(isPerpendicular(s0, s1)).toBe(false);
    // Cạnh của hình thoi D không có độ dài nào là cạnh góc vuông (3) hay cạnh dài nhất (3√2) của miếng ghép.
    const side = lengthOf(s0);
    expect(side).not.toBeCloseTo(3, 9);
    expect(side).not.toBeCloseTo(3 * Math.SQRT2, 9);
    expect(chosen(find("ht-ghep-hai-mieng", "trac-nghiem"))).toBe("Hình D");
  });
});

describe("đáp án các câu điền số", () => {
  it("khởi động: cạnh đối diện của hình chữ nhật, hình vuông có 4 cạnh", () => {
    expect(blanks(find("kd-hinh-chu-nhat", "dien-so"))).toEqual([6, 4]);
    expect(blanks(find("kd-hinh-vuong", "dien-so"))).toEqual([4]);
  });

  it("cạnh hình bình hành: cạnh đối diện bằng nhau, cạnh kề thì không", () => {
    const check = (id: string, ab: number, adOrBc: number) => {
      const question = find(id, "dien-so");
      expect(blanks(question), id).toEqual([ab, adOrBc]);
    };
    check("thu-binh-hanh", 9, 5);
    check("sn-canh-binh-hanh", 7, 4);
  });

  it("cạnh hình thoi: cả bốn cạnh bằng nhau", () => {
    expect(blanks(find("thu-hinh-thoi", "dien-so"))).toEqual([7, 7, 7]);
    expect(blanks(find("sn-canh-hinh-thoi", "dien-so"))).toEqual([6, 6, 6]);
  });
});

describe("câu khái niệm", () => {
  it("đáp án đúng nói về hình bình hành và hình thoi", () => {
    expect(chosen(find("sn-loi-sai", "trac-nghiem"))).toMatch(/^Sai, vì hình bình hành cũng có/);
    expect(chosen(find("sn-giong", "trac-nghiem"))).toBe("Đều có hai cặp cạnh đối diện song song");
    expect(chosen(find("thu-giong-khac", "trac-nghiem"))).toBe("Hình thoi");
    expect(chosen(find("thu-gap-giay", "trac-nghiem"))).toBe("Bốn cạnh bằng nhau");
    expect(chosen(find("kd-song-song", "trac-nghiem"))).toBe("Kéo dài mãi cũng không bao giờ cắt nhau");
  });
});
