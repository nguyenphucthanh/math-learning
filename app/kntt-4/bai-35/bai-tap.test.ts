import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { isRightAt } from "@/components/math/da-giac";
import { angleBetweenHands } from "@/components/math/dong-ho";
import {
  angleAt,
  angleKind,
  isParallel,
  isParallelogram,
  isPerpendicular,
  isRhombus,
  lengthOf,
  obliqueEdgePairs,
  parallelEdgePairs,
  perpendicularEdgePairs,
  polygonAngleKind,
  type Point,
} from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { dieu, binhHanh, chuNhat, doanChuNhat, daiThoi, haiGoc, hinhChonBinhHanh, hinhChonSongVuong, hinhThang, nha, thoi, tuGiac } from "./_illustrations/hinh-hoc";
import { dinh, queTam } from "./_illustrations/que-tam-giac";
import { CELLS, hasShape, STICK_COUNT, sticks } from "./_game/que";
import { exerciseGroups, gioDongHo, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
/** Hình thoi có sai số nhỏ (tọa độ que tính đã làm tròn): đường chéo cắt nhau ở trung điểm và bốn cạnh bằng nhau. */
const isRhombusApprox = ([a, b, c, d]: Point[]) => {
  const sides = [lengthOf([a, b]), lengthOf([b, c]), lengthOf([c, d]), lengthOf([d, a])];
  return Math.abs(a.x + c.x - b.x - d.x) < 0.6 && Math.abs(a.y + c.y - b.y - d.y) < 0.6 && sides.every((side) => Math.abs(side - sides[0]) < 0.6) && sides[0] > 1;
};
const countKinds = (points: Point[]) => {
  const result = { nhọn: 0, vuông: 0, tù: 0, bẹt: 0 };
  points.forEach((_, index) => (result[polygonAngleKind(points, index)] += 1));
  return result;
};

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

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["goc", "song-song-vuong-goc", "binh-hanh-thoi", "suy-nghi"]);
  });

  it("câu có hình đều có illustration", () => {
    const withFigure = [
      "dong-ho-tu", "tg-dem", "tg-goc-tu", "thang-cap-bang", "thang-goc-p", "nha-goc", "goc-luoi",
      "dieu-dem", "dieu-vg", "cn-song-song", "que-thoi-dem", "que-do-song-song", "que-do-nhieu",
      "bbh-chon", "ss-vg-chon", "canh-bbh", "canh-thoi", "thoi-dai",
    ];
    for (const id of withFigure) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });
});

describe("hàm góc", () => {
  it("angleAt và angleKind", () => {
    expect(angleAt({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90);
    expect(angleAt({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(180);
    expect(angleKind(40)).toBe("nhọn");
    expect(angleKind(90)).toBe("vuông");
    expect(angleKind(130)).toBe("tù");
    expect(angleKind(180)).toBe("bẹt");
  });
});

describe("đồng hồ (bài 1 tr. 121)", () => {
  it("chỉ đồng hồ B tạo góc tù", () => {
    const kinds = gioDongHo.map((hour) => angleKind(angleBetweenHands(hour)));
    expect(kinds).toEqual(["nhọn", "tù", "vuông", "bẹt"]);
    const question = find("dong-ho-tu", "trac-nghiem");
    expect(chosen(question)).toBe("Đồng hồ B");
    expect(kinds.indexOf("tù")).toBe(question.answerIndex);
  });

  it("lúc 8 giờ hai kim tạo góc tù", () => {
    expect(angleBetweenHands(8)).toBe(120);
    expect(angleKind(angleBetweenHands(8))).toBe("tù");
    expect(chosen(find("thu-goc", "trac-nghiem"))).toBe("Góc tù");
  });
});

describe("tứ giác EFGH (bài 2 tr. 121)", () => {
  it("2 góc nhọn, 1 góc vuông, 1 góc tù; tổng bốn góc 360°", () => {
    expect(countKinds(tuGiac.points)).toEqual({ nhọn: 2, vuông: 1, tù: 1, bẹt: 0 });
    const total = tuGiac.points.reduce((sum, _, index) => sum + angleAt(tuGiac.points[(index + 3) % 4], tuGiac.points[index], tuGiac.points[(index + 1) % 4]), 0);
    expect(total).toBeCloseTo(360);
    expect(blanks(find("tg-dem", "dien-so"))).toEqual([countKinds(tuGiac.points).nhọn, countKinds(tuGiac.points).vuông, countKinds(tuGiac.points).tù]);
  });

  it("góc tù ở đỉnh G, góc vuông ở H", () => {
    const question = find("tg-goc-tu", "trac-nghiem");
    expect(question.options[question.answerIndex]).toBe("Góc đỉnh G");
    expect(polygonAngleKind(tuGiac.points, tuGiac.names.indexOf("G"))).toBe("tù");
    expect(isRightAt(tuGiac.points, tuGiac.names.indexOf("H"))).toBe(true);
    const tu = question.options.filter((option) => polygonAngleKind(tuGiac.points, tuGiac.names.indexOf(option.at(-1)!)) === "tù");
    expect(tu).toEqual([chosen(question)]);
  });
});

describe("hình thang MNPQ (bài 3 tr. 121)", () => {
  const index = (name: string) => hinhThang.names.indexOf(name);
  const angle = (name: string) => angleAt(hinhThang.points[(index(name) + 3) % 4], hinhThang.points[index(name)], hinhThang.points[(index(name) + 1) % 4]);

  it("góc M = góc N = 135°, góc P = góc Q = 45°", () => {
    expect(angle("M")).toBeCloseTo(135);
    expect(angle("N")).toBeCloseTo(135);
    expect(angle("P")).toBeCloseTo(45);
    expect(angle("Q")).toBeCloseTo(45);
  });

  it("trong các lựa chọn chỉ có một cặp góc bằng nhau, và là đáp án", () => {
    const question = find("thang-cap-bang", "trac-nghiem");
    const equal = question.options.filter((option) => {
      const [a, b] = option.match(/đỉnh (\w)/g)!.map((text) => text.slice(-1));
      return Math.abs(angle(a) - angle(b)) < 0.01;
    });
    expect(equal).toEqual([chosen(question)]);
  });

  it("góc P bằng góc Q", () => {
    expect(blanks(find("thang-goc-p", "dien-so"))).toEqual([Math.round(angle("P"))]);
    expect(Math.round(angle("P"))).toBe(Math.round(angle("Q")));
  });
});

describe("ngôi nhà (bài 4 tr. 121)", () => {
  it("mái: 2 nhọn, 1 tù; thân: 4 vuông", () => {
    const mai = countKinds(nha.mai);
    const than = countKinds(nha.than);
    expect(mai).toEqual({ nhọn: 2, vuông: 0, tù: 1, bẹt: 0 });
    expect(than).toEqual({ nhọn: 0, vuông: 4, tù: 0, bẹt: 0 });
    expect(blanks(find("nha-goc", "dien-so"))).toEqual([mai.nhọn + than.nhọn, mai.vuông + than.vuông, mai.tù + than.tù]);
  });
});

describe("hai góc trên giấy ô (bài 3 tr. 123)", () => {
  it("góc đỉnh O nhọn, góc đỉnh P tù", () => {
    const kind = (name: "O" | "P") => angleKind(angleAt(haiGoc[name].arms[0], haiGoc[name].vertex, haiGoc[name].arms[1]));
    expect(kind("O")).toBe("nhọn");
    expect(kind("P")).toBe("tù");
    const question = find("goc-luoi", "trac-nghiem");
    expect(chosen(question)).toBe("Góc đỉnh P");
  });
});

describe("tứ giác ABCD cái diều (bài 1 tr. 122)", () => {
  it("góc A và góc C vuông; B và D không vuông", () => {
    expect([0, 1, 2, 3].map((i) => isRightAt(dieu.points, i))).toEqual([true, false, true, false]);
  });

  it("2 cặp cạnh liền nhau vuông góc, 2 cặp không vuông góc", () => {
    expect(perpendicularEdgePairs(dieu.points, dieu.names)).toHaveLength(2);
    expect(obliqueEdgePairs(dieu.points, dieu.names)).toHaveLength(2);
    expect(blanks(find("dieu-dem", "dien-so"))).toEqual([perpendicularEdgePairs(dieu.points, dieu.names).length, obliqueEdgePairs(dieu.points, dieu.names).length]);
  });

  it("trong các lựa chọn chỉ có một cặp cạnh vuông góc, và là đáp án", () => {
    const question = find("dieu-vg", "trac-nghiem");
    const edge = (name: string): [Point, Point] => [dieu.points[dieu.names.indexOf(name[0])], dieu.points[dieu.names.indexOf(name[1])]];
    const perpendicular = question.options.filter((option) => {
      const [a, b] = option.split(" và ");
      return isPerpendicular(edge(a), edge(b));
    });
    expect(perpendicular).toEqual([chosen(question)]);
  });
});

describe("hình chữ nhật ABCD và đoạn MN (bài 2 tr. 122)", () => {
  it("ABCD là hình chữ nhật; M trên AB, N trên CD", () => {
    const { A, B, C, D, M, N } = chuNhat;
    expect([A, B, C, D].map((_, i, arr) => isRightAt(arr, i))).toEqual([true, true, true, true]);
    expect(M.x).toBe(A.x);
    expect(N.x).toBe(D.x);
    expect(M.y).toBeGreaterThan(B.y);
    expect(M.y).toBeLessThan(A.y);
  });

  it("MN song song với AD, vuông góc với CD", () => {
    expect(isParallel(doanChuNhat.MN, doanChuNhat.AD)).toBe(true);
    expect(isPerpendicular(doanChuNhat.MN, doanChuNhat.CD)).toBe(true);
    const question = find("cn-song-song", "trac-nghiem");
    const parallel = question.options.filter((name) => isParallel(doanChuNhat.MN, doanChuNhat[name]));
    expect(parallel).toEqual([chosen(question)]);
    expect(chosen(find("cn-vuong-goc", "trac-nghiem"))).toBe("Đúng");
  });
});

describe("que tính xếp tam giác (bài 3 tr. 122)", () => {
  const vertices = Object.values(dinh);
  const rhombi = () => {
    const subsets: Point[][] = [];
    for (let a = 0; a < 6; a += 1)
      for (let b = a + 1; b < 6; b += 1)
        for (let c = b + 1; c < 6; c += 1)
          for (let d = c + 1; d < 6; d += 1) subsets.push([vertices[a], vertices[b], vertices[c], vertices[d]]);
    return subsets.filter(([a, b, c, d]) => [[a, b, c, d], [a, b, d, c], [a, c, b, d]].some(isRhombusApprox));
  };

  it("có 9 que cùng độ dài và bốn que đen", () => {
    expect(queTam).toHaveLength(9);
    for (const que of queTam) expect(Math.abs(lengthOf(que.seg) - 60), que.name).toBeLessThan(0.5);
    expect(queTam.filter((que) => que.name === "Đen")).toHaveLength(4);
  });

  it("có 3 hình thoi", () => {
    expect(rhombi()).toHaveLength(3);
    expect(chosen(find("que-thoi-dem", "trac-nghiem"))).toBe(String(rhombi().length));
  });

  it("que đỏ chỉ song song với que xanh trong bốn lựa chọn", () => {
    const red = queTam.find((que) => que.name === "Đỏ")!;
    const question = find("que-do-song-song", "trac-nghiem");
    const parallel = question.options.filter((option) => {
      const name = option.replace("Màu ", "").replace(/^./, (c) => c.toUpperCase());
      const que = queTam.find((item) => item.name.toLowerCase() === name.toLowerCase())!;
      return isParallel(red.seg, que.seg);
    });
    expect(parallel).toEqual([chosen(question)]);
    expect(chosen(question)).toBe("Màu xanh");
  });

  it("ngoài que đỏ còn 2 que song song với nó", () => {
    const red = queTam.find((que) => que.name === "Đỏ")!;
    const others = queTam.filter((que) => que !== red && isParallel(red.seg, que.seg));
    expect(others).toHaveLength(2);
    expect(blanks(find("que-do-nhieu", "dien-so"))).toEqual([others.length]);
  });
});

describe("chọn hình (bài 1 tr. 123)", () => {
  it("chỉ hình C là hình bình hành", () => {
    expect(hinhChonBinhHanh.map(isParallelogram)).toEqual([false, false, true, false]);
    expect(chosen(find("bbh-chon", "trac-nghiem"))).toBe("Hình C");
  });

  it("chỉ hình D vừa có cạnh song song vừa có cạnh vuông góc", () => {
    const names = ["A", "B", "C", "D"];
    const both = hinhChonSongVuong.map((points) => parallelEdgePairs(points, names).length > 0 && perpendicularEdgePairs(points, names).length > 0);
    expect(both).toEqual([false, false, false, true]);
    expect(chosen(find("ss-vg-chon", "trac-nghiem"))).toBe("Hình D");
  });
});

describe("hình bình hành, hình thoi (bài 2 tr. 123, bài 4 tr. 122)", () => {
  it("hình vẽ đúng tỉ lệ 20 px = 1 cm", () => {
    const [A, B, C, D] = binhHanh.points;
    expect(isParallelogram(binhHanh.points)).toBe(true);
    expect(lengthOf([A, B]) / 20).toBeCloseTo(binhHanh.ab, 1);
    expect(lengthOf([A, D]) / 20).toBeCloseTo(binhHanh.ad, 1);
    expect(lengthOf([B, C]) / 20).toBeCloseTo(binhHanh.ad, 1);
    expect(lengthOf([D, C]) / 20).toBeCloseTo(binhHanh.ab, 1);
  });

  it("BC = AD và DC = AB", () => {
    expect(blanks(find("canh-bbh", "dien-so"))).toEqual([binhHanh.ad, binhHanh.ab]);
  });

  it("hình thoi có bốn cạnh bằng nhau", () => {
    expect(isRhombus(thoi.points)).toBe(true);
    for (let i = 0; i < 4; i += 1) expect(lengthOf([thoi.points[i], thoi.points[(i + 1) % 4]]) / 20).toBeCloseTo(thoi.canh, 5);
    expect(blanks(find("canh-thoi", "dien-so"))).toEqual([thoi.canh, thoi.canh, thoi.canh]);
  });

  it("dải ba hình thoi", () => {
    expect(daiThoi).toHaveLength(3);
    for (const shape of daiThoi) {
      expect(isRhombus(shape)).toBe(true);
      expect(parallelEdgePairs(shape, ["a", "b", "c", "d"])).toHaveLength(2);
    }
    expect(blanks(find("thoi-dai", "dien-so"))).toEqual([4, 2]);
  });
});

describe("câu khởi động, câu thử và suy nghĩ thêm", () => {
  it("đáp án", () => {
    expect(blanks(find("kd-bet", "dien-so"))).toEqual([2 * 90]);
    expect(chosen(find("kd-tu", "trac-nghiem"))).toBe("Góc tù");
    expect(blanks(find("kd-thoi", "dien-so"))).toEqual([4]);
    expect(blanks(find("thu-vuong-goc", "dien-so"))).toEqual([4]);
    expect(chosen(find("thu-song-song", "trac-nghiem"))).toMatch(/^Không/);
    expect(chosen(find("thu-hinh", "trac-nghiem"))).toBe("Hình thoi");
    expect(chosen(find("sn-loi-sai", "trac-nghiem"))).toBe("Sai");
    expect(chosen(find("sn-thoi-bbh", "trac-nghiem"))).toMatch(/^Có/);
  });

  it("góc 130° là tù nhưng vẫn nhỏ hơn góc bẹt (câu sn-loi-sai)", () => {
    expect(angleKind(130)).toBe("tù");
    expect(130).toBeLessThan(180);
  });
});

describe("trò chơi lấy que tính (tr. 124)", () => {
  it("19 que: 6 trên, 6 dưới, 7 nghiêng; các que cùng độ dài", () => {
    expect(STICK_COUNT).toBe(19);
    expect(sticks).toHaveLength(19);
    expect(sticks.filter((stick) => stick.role === "tren")).toHaveLength(6);
    expect(sticks.filter((stick) => stick.role === "duoi")).toHaveLength(6);
    expect(sticks.filter((stick) => stick.role === "nghieng")).toHaveLength(7);
    for (const stick of sticks) expect(Math.abs(lengthOf(stick.seg) - 52), String(stick.id)).toBeLessThan(0.5);
  });

  it("các que xếp thành 6 hình thoi nối liền nhau", () => {
    for (let i = 0; i < CELLS; i += 1) {
      const top = sticks[i].seg;
      const bottom = sticks[CELLS + i].seg;
      const left = sticks[CELLS * 2 + i].seg;
      const right = sticks[CELLS * 2 + i + 1].seg;
      expect(isRhombusApprox([bottom[0], bottom[1], top[1], top[0]]), String(i)).toBe(true);
      expect(isParallel(left, right)).toBe(true);
    }
  });

  it("đủ que thì còn hình; lấy một que vẫn còn hình", () => {
    expect(hasShape(new Set())).toBe(true);
    for (let id = 0; id < STICK_COUNT; id += 1) expect(hasShape(new Set([id])), String(id)).toBe(true);
  });

  it("lấy hết 6 que cạnh trên hoặc 6 que nghiêng đầu thì hết hình; thiếu một que thì còn", () => {
    expect(hasShape(new Set([0, 1, 2, 3, 4, 5]))).toBe(false);
    expect(hasShape(new Set([12, 13, 14, 15, 16, 17]))).toBe(false);
    expect(hasShape(new Set([12, 13, 14, 15, 16]))).toBe(true);
  });

  it("hình ghép nhiều ô vẫn là hình bình hành", () => {
    // Chỉ giữ que nghiêng 0 và 6 cùng 12 cạnh ngang: còn một hình bình hành dài 6 ô.
    expect(hasShape(new Set([13, 14, 15, 16, 17]))).toBe(true);
    // Lấy que nghiêng 0 và 6 (hai đầu): các hình bắt đầu hoặc kết thúc ở đầu hàng mất, nhưng ô giữa vẫn còn.
    expect(hasShape(new Set([12, 18]))).toBe(true);
  });

  it("số que ít nhất phải lấy để hết hình (tính bằng duyệt mọi cách)", () => {
    let best = STICK_COUNT;
    for (let mask = 0; mask < 1 << STICK_COUNT; mask += 1) {
      let count = 0;
      for (let bit = mask; bit; bit &= bit - 1) count += 1;
      if (count >= best) continue;
      const removed = new Set<number>();
      for (let id = 0; id < STICK_COUNT; id += 1) if (mask & (1 << id)) removed.add(id);
      if (!hasShape(removed)) best = count;
    }
    expect(best).toBe(6);
  });
});
