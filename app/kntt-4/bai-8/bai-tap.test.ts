import type { ChoiceQuestion, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { angleBetweenHands } from "@/components/math/dong-ho";
import { angleAt, angleKind, type AngleKind, type Point } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { banhPizza, banhXe, bieuDoNga, chinQuat, duongNhen, gocGiuaHaiNan, haiCaiKeo, sauGocHai, sauGocMot, tamGiacAH } from "./_illustrations/du-lieu";
import { buocTien, gioCacO, laODich, loaiGocO, O_CUOI, oDen } from "./_game/ban-co";
import { exerciseGroups, gioBonDongHo, gioHaiDongHo, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const kinds: AngleKind[] = ["nhọn", "vuông", "tù", "bẹt"];
const count = (degrees: number[]) => kinds.map((kind) => degrees.filter((d) => angleKind(d) === kind).length);
const kindOf = (angles: { name: string; degrees: number }[], name: string) => angleKind(angles.find((a) => a.name === name)!.degrees);

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
      expect(question.hint.length, question.id).toBeGreaterThan(5);
      expect(question.explanation.length, question.id).toBeGreaterThan(5);
    }
  });

  it("câu nối có rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      const order = (question as MatchQuestion).rightOrder;
      expect([...order].sort()).toEqual(question.pairs.map((_, i) => i));
      order.forEach((value, index) => expect(value, question.id).not.toBe(index));
      expect(new Set(question.pairs.map((pair) => pair.right)).size).toBe(question.pairs.length);
    }
  });
});

describe("hàm góc", () => {
  it("angleKind xếp đúng loại", () => {
    expect([30, 90, 130, 180].map(angleKind)).toEqual(["nhọn", "vuông", "tù", "bẹt"]);
  });
});

describe("sáu góc ở hoạt động 1 (tr. 26)", () => {
  it("3 nhọn, 1 vuông, 1 tù, 1 bẹt và khớp đáp án điền số", () => {
    expect(count(sauGocMot.map((g) => g.degrees))).toEqual([3, 1, 1, 1]);
    expect(blanks(find("goc-dem-mot", "dien-so"))).toEqual(count(sauGocMot.map((g) => g.degrees)));
  });

  it("chỉ góc đỉnh B là góc tù", () => {
    const question = find("goc-tu-mot", "trac-nghiem");
    const tu = question.options.filter((option) => kindOf(sauGocMot, option.at(-1)!) === "tù");
    expect(tu).toEqual([chosen(question)]);
  });
});

describe("hai cái kéo (tr. 27)", () => {
  it("kéo đỏ góc tù, kéo xanh góc nhọn", () => {
    expect(haiCaiKeo.map((keo) => angleKind(keo.degrees))).toEqual(["nhọn", "tù"]);
    expect(chosen(find("keo-tu", "trac-nghiem"))).toBe(haiCaiKeo.find((k) => angleKind(k.degrees) === "tù")!.name);
    expect(chosen(find("keo-nhon", "trac-nghiem"))).toBe(haiCaiKeo.find((k) => angleKind(k.degrees) === "nhọn")!.name);
  });
});

describe("miếng bánh (tr. 27)", () => {
  it("miếng 3 là góc bẹt, miếng 1 bé nhất, đáp án là miếng 2", () => {
    const [m1, m2, m3] = banhPizza.miengs;
    expect(m1 + m2).toBe(180);
    expect(m3).toBe(180);
    expect(angleKind(m3)).toBe("bẹt");
    const candidates = [1, 2, 3].filter((id) => banhPizza.miengs[id - 1] !== 180 && banhPizza.miengs[id - 1] !== Math.min(...banhPizza.miengs));
    expect(candidates).toEqual([2]);
    expect(chosen(find("pizza", "trac-nghiem"))).toBe("Miếng 2");
  });
});

describe("luyện tập 1 (tr. 27)", () => {
  it("2 nhọn, 1 vuông, 2 tù, 1 bẹt", () => {
    expect(count(sauGocHai.map((g) => g.degrees))).toEqual([2, 1, 2, 1]);
  });

  it("câu chọn góc tù: chỉ đáp án gồm toàn góc tù", () => {
    const question = find("goc-chon-tu", "trac-nghiem");
    const names = (option: string) => option.match(/đỉnh (\w)/g)!.map((part) => part.at(-1)!);
    const allObtuse = question.options.filter((option) => names(option).every((name) => kindOf(sauGocHai, name) === "tù"));
    expect(allObtuse).toEqual([chosen(question)]);
  });

  it("câu nối: mỗi góc nối đúng loại", () => {
    const question = find("goc-noi", "noi-cap");
    const loai: Record<string, AngleKind> = { "Góc vuông": "vuông", "Góc bẹt": "bẹt", "Góc nhọn": "nhọn", "Góc tù": "tù" };
    for (const pair of question.pairs) {
      expect(kindOf(sauGocHai, pair.left.at(-1)!)).toBe(loai[pair.right]);
    }
  });
});

describe("con nhện (tr. 28)", () => {
  const goc = (points: Point[]) => points.slice(1, -1).map((v, i) => angleAt(points[i], v, points[i + 2]));

  it("chỉ đường xanh có góc tù; đường đỏ không có", () => {
    expect(goc(duongNhen.do).some((d) => angleKind(d) === "tù")).toBe(false);
    expect(goc(duongNhen.xanh).some((d) => angleKind(d) === "tù")).toBe(true);
    expect(chosen(find("nhen", "trac-nghiem"))).toBe("Đường xanh");
  });
});

describe("đồng hồ (tr. 28)", () => {
  it("bốn đồng hồ A, B, C, D: bẹt, nhọn, vuông, tù", () => {
    expect(gioBonDongHo.map((h) => angleKind(angleBetweenHands(h)))).toEqual(["bẹt", "nhọn", "vuông", "tù"]);
    const question = find("dong-ho-noi", "noi-cap");
    const loai: Record<string, AngleKind> = { "Góc vuông": "vuông", "Góc bẹt": "bẹt", "Góc nhọn": "nhọn", "Góc tù": "tù" };
    question.pairs.forEach((pair, index) => expect(angleKind(angleBetweenHands(gioBonDongHo[index])), pair.left).toBe(loai[pair.right]));
  });

  it("chỉ lúc 3 giờ trong các lựa chọn tạo góc vuông", () => {
    const question = find("dong-ho-vuong", "trac-nghiem");
    const vuong = question.options.filter((option) => angleKind(angleBetweenHands(parseInt(option))) === "vuông");
    expect(vuong).toEqual([chosen(question)]);
    expect(angleKind(angleBetweenHands(9))).toBe("vuông");
  });

  it("lúc 5 giờ góc tù; lúc 1 giờ và 11 giờ cùng góc nhọn", () => {
    expect(angleKind(angleBetweenHands(5))).toBe("tù");
    expect(chosen(quickChecks.dongHo)).toBe("Góc tù");
    expect(gioHaiDongHo.map((h) => angleKind(angleBetweenHands(h)))).toEqual(["nhọn", "nhọn"]);
    expect(angleBetweenHands(1)).toBe(angleBetweenHands(11));
    expect(chosen(find("sn-mot-va-muoi-mot", "trac-nghiem"))).toBe("Cùng là góc nhọn");
  });
});

describe("bánh xe (tr. 28)", () => {
  it("chỉ nan B tạo với một nan xanh góc tù", () => {
    const tu = Object.entries(banhXe.do).filter(([, deg]) => banhXe.xanh.some((x) => angleKind(gocGiuaHaiNan(deg, x)) === "tù"));
    expect(tu.map(([name]) => `Nan ${name}`)).toEqual([chosen(find("banh-xe", "trac-nghiem"))]);
  });
});

describe("chiếc quạt (tr. 29)", () => {
  it("cột góc vuông bị nhầm", () => {
    const real = count(chinQuat);
    expect(real.reduce((a, b) => a + b)).toBe(9);
    const chart = [bieuDoNga.nhon, bieuDoNga.vuong, bieuDoNga.tu, bieuDoNga.bet];
    const wrong = kinds.filter((_, i) => chart[i] !== real[i]);
    expect(wrong).toEqual(["vuông"]);
    expect(chosen(find("quat", "trac-nghiem"))).toBe("Góc vuông");
  });
});

describe("tam giác ABC có AH (tr. 29)", () => {
  const { A, B, C, H } = tamGiacAH;
  it("4 góc nhọn, 2 góc vuông, 1 góc tù", () => {
    const angles = [
      angleAt(B, A, H),
      angleAt(H, A, C),
      angleAt(B, A, C),
      angleAt(A, B, C),
      angleAt(A, C, B),
      angleAt(A, H, B),
      angleAt(A, H, C),
    ];
    expect(count(angles)).toEqual([4, 2, 1, 0]);
    expect(blanks(find("tam-giac", "dien-so"))).toEqual([4, 2, 1]);
  });

  it("H nằm giữa B và C", () => {
    expect(angleAt(B, H, C)).toBeCloseTo(180);
  });
});

describe("câu suy nghĩ thêm", () => {
  it("sai khi nói góc nào bé hơn góc bẹt cũng là góc nhọn", () => {
    expect(chosen(find("sn-loi-sai", "trac-nghiem"))).toContain("góc vuông và góc tù");
    expect(angleKind(90)).not.toBe("nhọn");
    expect(angleKind(120)).not.toBe("nhọn");
  });

  it("mỗi góc chỉ thuộc một loại", () => {
    for (let d = 1; d <= 180; d += 1) {
      expect(kinds.filter((k) => angleKind(d) === k)).toHaveLength(1);
    }
    expect(chosen(find("sn-mot-loai", "trac-nghiem"))).toMatch(/Không/);
  });

  it("góc bẹt bằng 2 góc vuông", () => {
    expect(blanks(find("thu-bet", "dien-so"))).toEqual([180 / 90]);
  });
});

describe("khởi động", () => {
  it("góc vuông 90 độ", () => {
    expect(blanks(find("kd-vuong", "dien-so"))).toEqual([90]);
    expect(angleKind(90)).toBe("vuông");
  });

  it("đáp án các câu trắc nghiệm", () => {
    expect(chosen(find("kd-dinh", "trac-nghiem"))).toBe("Điểm O");
    expect(chosen(find("kd-eke", "trac-nghiem"))).toBe("Góc vuông");
    expect(angleKind(125)).toBe("tù");
    expect(chosen(quickChecks.loai)).toBe("Góc tù");
  });
});

describe("bàn chơi Giải cứu khủng long", () => {
  it("không có ô 12 giờ (hai kim trùng nhau); mọi ô là góc nhọn, vuông, tù hoặc bẹt", () => {
    expect(gioCacO.every((h) => h >= 1 && h <= 11)).toBe(true);
    for (let o = 1; o <= O_CUOI; o += 1) {
      expect(kinds).toContain(loaiGocO(o));
    }
  });

  it("đủ bốn loại góc trên bàn chơi", () => {
    const all = new Set(Array.from({ length: O_CUOI }, (_, i) => loaiGocO(i + 1)));
    expect(all.size).toBe(4);
  });

  it("mặt lẻ tiến 1 ô, mặt chẵn tiến 2 ô, không đi quá ô cuối", () => {
    expect([1, 2, 3, 4, 5, 6].map(buocTien)).toEqual([1, 2, 1, 2, 1, 2]);
    expect(oDen(0, 1)).toBe(1);
    expect(oDen(0, 6)).toBe(2);
    expect(oDen(O_CUOI - 1, 2)).toBe(O_CUOI);
  });

  it("hai ô cuối là ô đích", () => {
    expect([O_CUOI - 2, O_CUOI - 1, O_CUOI].map(laODich)).toEqual([false, true, true]);
  });
});
