import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { isParallel, isPerpendicular, passesThrough, type Point, type Seg } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { duongChayGeometry, exerciseTrack } from "./_illustrations/duong-chay";
import { candidates, lineAB, pointH, VIEW } from "./_illustrations/chon-song-song";
import { hinhVuongGeometry } from "./_illustrations/hinh-vuong";
import { designTrack } from "./_animations/thiet-ke-duong-chay";
import { GHEP_N } from "./_animations/ghep-hinh";
import { songSongGeometry, tiltDeg } from "./_animations/ve-song-song";
import { exerciseGroups, quickChecks, squareSide, track, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

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
    for (const id of ["ss-chon-duong", "gh-am", "gh-pq", "gh-mn", "gh-manh", "dc-mh", "dc-hk", "dc-quan-he", "dc-dich"]) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });

  it("không dùng thuật ngữ của bài sau", () => {
    const text = JSON.stringify(questions.map((question) => ({ ...question, illustration: undefined })));
    expect(text).not.toContain("hình bình hành");
    expect(text).not.toContain("hình thoi");
    expect(text).not.toContain("cạnh huyền");
    expect(text).not.toContain("⊥");
  });
});

describe("vẽ song song bằng ê ke (animation)", () => {
  for (const [name, deg] of Object.entries(tiltDeg)) {
    it(`AB nằm ${name}: MN qua H vuông góc AB, CD qua H vuông góc MN, nên CD song song AB`, () => {
      const { a, b, h, m, n, c, d, foot } = songSongGeometry(deg);
      const ab: Seg = [a, b];
      const mn: Seg = [m, n];
      const cd: Seg = [c, d];
      expect(passesThrough(mn, h)).toBe(true);
      expect(isPerpendicular(ab, mn)).toBe(true);
      expect(passesThrough(ab, foot)).toBe(true);
      expect(passesThrough(cd, h)).toBe(true);
      expect(isPerpendicular(mn, cd)).toBe(true);
      expect(isParallel(ab, cd)).toBe(true);
      // Hai điểm ở hai đầu mỗi đoạn nằm trong khung vẽ 340x250.
      for (const point of [a, b, m, n, c, d]) {
        expect(point.x).toBeGreaterThan(10);
        expect(point.x).toBeLessThan(330);
        expect(point.y).toBeGreaterThan(10);
        expect(point.y).toBeLessThan(240);
      }
    });
  }
});

describe("chọn đường song song (ss-chon-duong)", () => {
  it("chỉ đường 2 vừa đi qua H vừa song song với AB", () => {
    const ok = candidates.map((candidate) => passesThrough(candidate.seg, pointH) && isParallel(candidate.seg, lineAB));
    expect(ok).toEqual([false, true, false]);
    expect(chosen(find("ss-chon-duong", "trac-nghiem"))).toBe(`Đường ${candidates[ok.indexOf(true)].label}`);
  });

  it("hai đường còn lại sai đúng một điều kiện, lệch rõ rệt", () => {
    const [shifted, , oblique] = candidates;
    expect(isParallel(shifted.seg, lineAB)).toBe(true);
    expect(passesThrough(shifted.seg, pointH, 20)).toBe(false);
    expect(passesThrough(oblique.seg, pointH)).toBe(true);
    expect(isParallel(oblique.seg, lineAB)).toBe(false);
  });

  it("mọi điểm nằm trong khung vẽ", () => {
    for (const point of [...lineAB, ...candidates.flatMap((candidate) => candidate.seg), pointH]) {
      expect(point.x).toBeGreaterThan(20);
      expect(point.x).toBeLessThan(VIEW.width - 20);
      expect(point.y).toBeGreaterThan(20);
      expect(point.y).toBeLessThan(VIEW.height - 20);
    }
  });
});

describe("bộ đồ chơi ghép hình", () => {
  for (const n of [GHEP_N, squareSide]) {
    it(`hình vuông cạnh ${n} ô: trung điểm, song song, sáu mảnh`, () => {
      const g = hinhVuongGeometry(n);
      const mid = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      expect(g.M).toEqual(mid(g.A, g.B));
      expect(g.N).toEqual(mid(g.B, g.C));
      expect(g.O).toEqual(mid(g.A, g.C));
      expect(g.P).toEqual(mid(g.A, g.O));
      // PQ song song với AM, Q nằm trên MN.
      expect(isParallel(g.segs.PQ, g.segs.AM)).toBe(true);
      expect(passesThrough(g.segs.MN, g.Q, 1e-6)).toBe(true);
      // Các cặp song song và vuông góc trong hình.
      expect(isParallel(g.segs.MN, g.segs.AC)).toBe(true);
      expect(isParallel(g.segs.ON, g.segs.PQ)).toBe(true);
      expect(isPerpendicular(g.segs.DO, g.segs.AC)).toBe(true);
      // Sáu mảnh phủ kín hình vuông: tổng diện tích bằng n * n.
      const area = (points: Point[]) => Math.abs(points.reduce((sum, p, i) => sum + (p.x * points[(i + 1) % points.length].y - points[(i + 1) % points.length].x * p.y), 0)) / 2;
      expect(g.pieces).toHaveLength(6);
      expect(g.pieces.reduce((sum, piece) => sum + area(piece.points), 0)).toBeCloseTo(n * n, 9);
    });
  }

  it("đáp án các câu về hình vuông khớp hình vẽ", () => {
    const g = hinhVuongGeometry(squareSide);
    expect(blanks(find("gh-am", "dien-so"))).toEqual([dist(g.A, g.M)]);
    expect(blanks(find("thu-trung-diem", "dien-so"))).toEqual([dist(hinhVuongGeometry(GHEP_N).A, hinhVuongGeometry(GHEP_N).M)]);
    // Đoạn thẳng song song với PQ trong ba lựa chọn.
    const byName: Record<string, Seg> = { AC: g.segs.AC, MN: g.segs.MN, ON: g.segs.ON, DO: g.segs.DO };
    const parallelTo = (target: Seg, options: string[]) => options.filter((name) => isParallel(byName[name], target) || isParallel(target, byName[name]));
    const pq = find("gh-pq", "trac-nghiem");
    expect(parallelTo(g.segs.PQ, pq.options.map((option) => option.slice(-2)))).toEqual([chosen(pq).slice(-2)]);
    const mn = find("gh-mn", "trac-nghiem");
    expect(parallelTo(g.segs.MN, mn.options.map((option) => option.slice(-2)))).toEqual([chosen(mn).slice(-2)]);
    // Số mảnh tam giác và số mảnh bốn cạnh.
    const triangles = g.pieces.filter((piece) => piece.points.length === 3).length;
    const quads = g.pieces.filter((piece) => piece.points.length === 4).length;
    expect(blanks(find("gh-manh", "dien-so"))).toEqual([triangles, quads]);
  });

  it("câu nối bốn bước đúng thứ tự", () => {
    const match = find("gh-thu-tu", "noi-cap");
    expect(match.pairs.map((pair) => pair.left)).toEqual(["Bước 1", "Bước 2", "Bước 3", "Bước 4"]);
  });
});

describe("đường chạy", () => {
  function check(spec: typeof exerciseTrack) {
    const { m, h, n, p, k, q } = duongChayGeometry(spec);
    const half = (spec.mn / 2) * spec.scale;
    expect(dist(m, h)).toBeCloseTo(half, 5);
    expect(dist(h, n)).toBeCloseTo(half, 5);
    expect(dist(m, n)).toBeCloseTo(spec.mn * spec.scale, 5);
    expect(dist(m, p)).toBeCloseTo(spec.mp * spec.scale, 5);
    expect(dist(h, k)).toBeCloseTo(spec.mp * spec.scale, 5);
    expect(dist(n, q)).toBeCloseTo(spec.mp * spec.scale, 5);
    expect(isPerpendicular([m, n], [m, p])).toBe(true);
    expect(isParallel([m, p], [h, k])).toBe(true);
    expect(isParallel([h, k], [n, q])).toBe(true);
    expect(isParallel([m, p], [n, q])).toBe(true);
    expect(isPerpendicular([m, n], [p, q])).toBe(false);
    expect(isParallel([m, n], [p, q])).toBe(true);
    return { m, h, n, p, k, q };
  }

  it("số liệu bài tập khớp hình vẽ", () => {
    expect(exerciseTrack).toMatchObject({ mn: track.mn, mp: track.mp });
    check(exerciseTrack);
    expect(blanks(find("dc-mh", "dien-so"))).toEqual([track.mn / 2]);
    expect(blanks(find("dc-hk", "dien-so"))).toEqual([track.mp, track.mp]);
  });

  it("số liệu SGK trong phần Lý thuyết: MN = 2 cm, MH = 1 cm, MP = 10 cm", () => {
    expect(designTrack).toMatchObject({ mn: 2, mp: 10 });
    const { m, h } = check(designTrack);
    expect(dist(m, h) / designTrack.scale).toBeCloseTo(1, 5);
    expect(blanks(find("thu-lan", "dien-so"))).toEqual([1]);
  });

  it("mọi điểm của hình nằm trong khung vẽ", () => {
    for (const [spec, height] of [[exerciseTrack, 150], [designTrack, 150]] as const) {
      const { m, n, p, q } = duongChayGeometry(spec);
      for (const point of [m, n, p, q]) {
        expect(point.x).toBeGreaterThan(20);
        expect(point.x).toBeLessThan(320);
        expect(point.y).toBeGreaterThan(20);
        expect(point.y).toBeLessThan(height - 20);
      }
    }
  });

  it("MP, HK, NQ song song; vạch đích là PQ", () => {
    expect(chosen(find("dc-quan-he", "trac-nghiem"))).toBe("Song song với nhau");
    expect(chosen(find("dc-dich", "trac-nghiem"))).toBe("Đoạn thẳng PQ");
  });

  it("câu nối: thứ tự và số đo khớp số liệu", () => {
    const match = find("dc-thu-tu", "noi-cap");
    expect(match.pairs.map((pair) => pair.left)).toEqual(["Bước 1", "Bước 2", "Bước 3", "Bước 4"]);
    expect(match.pairs[0].right).toContain(`${track.mn} cm`);
    expect(match.pairs[1].right).toContain(`${track.mp} cm`);
    expect(match.pairs[2].right).toContain(`${track.mp} cm`);
  });
});

describe("khởi động và câu thử", () => {
  it("trung điểm và đáp án trắc nghiệm", () => {
    expect(blanks(find("kd-trung-diem", "dien-so"))).toEqual([8 / 2]);
    expect(chosen(find("kd-song-song", "trac-nghiem"))).toBe("Kéo dài mãi cũng không bao giờ cắt nhau");
    expect(chosen(find("kd-e-ke", "trac-nghiem"))).toContain("Một cạnh góc vuông trùng với AB");
    expect(chosen(find("thu-buoc-2", "trac-nghiem"))).toBe("CD đi qua H và vuông góc với MN");
    expect(chosen(find("ss-nghieng", "trac-nghiem"))).toBe("Nằm nghiêng giống AB");
    expect(chosen(find("sn-nam", "trac-nghiem")).startsWith("Nam sai")).toBe(true);
    expect(chosen(find("sn-mot-duong", "trac-nghiem"))).toBe("1 đường thẳng");
  });
});
