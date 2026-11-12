import type { Question } from "@/components/exercises/types";
import { roundToPlace } from "@/lib/round-numbers";
import { describe, expect, it } from "vitest";
import { cards, gameReducer, initialGame, isRight, shuffle, truth, TRACK } from "./_game/duong-dua";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
const byId = (id: string) => questions.find((q) => q.id === id)!;
const blanks = (id: string) => {
  const q = byId(id);
  if (q.kind === "dien-so") return q.parts.flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
  if (q.kind === "loi-van") return q.lines.flat().flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
  throw new Error(id);
};
const chosen = (id: string) => {
  const q = byId(id);
  if (q.kind !== "trac-nghiem") throw new Error(id);
  return q.options[q.answerIndex];
};

describe("dữ liệu bài tập", () => {
  it("không trùng id, có gợi ý và giải thích", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    for (const q of questions) {
      expect(q.hint.length, q.id).toBeGreaterThan(10);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
    }
  });

  it("trắc nghiệm có đáp án hợp lệ, lựa chọn không trùng", () => {
    for (const q of questions) {
      if (q.kind !== "trac-nghiem") continue;
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["hoat-dong-1", 6],
      ["hoat-dong-2", 4],
      ["suy-nghi-them", 3],
    ]);
  });

  it("khởi động và câu thử", () => {
    expect(blanks("kd-nghin-1")).toEqual([5978 % 1000 >= 500 ? 6000 : 5000]);
    expect(blanks("kd-nghin-2")).toEqual([2000]);
    expect(blanks("kd-chuc-nghin")).toEqual([50000]);
    expect(blanks("thu-lam-tron")).toEqual([8000, 2000, 10000]);
    expect(chosen("thu-chon-hang")).toBe("50 000 − 20 000 = 30 000");
    expect(chosen("thu-lon-be")).toBe("Bé hơn 800");
    expect(39 * 19).toBeLessThan(800);
  });

  it("ước lượng bằng làm tròn: đúng hàng và gần kết quả thật", () => {
    const cases: [string, number, "+" | "−", number, number][] = [
      ["hd1-a", 6240, "+", 2790, 1000],
      ["hd1-b", 8070, "−", 3960, 1000],
      ["hd1-c", 29870, "+", 40120, 10000],
      ["hd1-d", 80340, "−", 39650, 10000],
    ];
    for (const [id, a, op, b, unit] of cases) {
      const ra = Math.round(a / unit) * unit;
      const rb = Math.round(b / unit) * unit;
      expect(blanks(id)).toEqual([ra, rb, op === "+" ? ra + rb : ra - rb]);
      const exact = op === "+" ? a + b : a - b;
      expect(Math.abs(exact - blanks(id)[2])).toBeLessThanOrEqual(unit);
    }
    expect(chosen("hd1-e")).toBe("Hàng chục nghìn");
    expect(blanks("hd1-f")).toEqual([8000]);
  });

  it("đúng/sai: đáp án khớp phép tính thật và cách ước lượng không mâu thuẫn", () => {
    expect(chosen("hd2-a")).toBe(38 * 19 > 800 ? "Đúng" : "Sai");
    expect(chosen("hd2-a")).toBe("Sai");
    expect(chosen("hd2-b")).toBe(61 * 42 > 2400 ? "Đúng" : "Sai");
    expect(chosen("hd2-b")).toBe("Đúng");
    expect(chosen("hd2-c")).toBe(7960 / 40 < 200 ? "Đúng" : "Sai");
    expect(chosen("hd2-c")).toBe("Đúng");
    expect(chosen("hd2-d")).toBe(2040 / 40 < 50 ? "Đúng" : "Sai");
    expect(chosen("hd2-d")).toBe("Sai");
    // chiều làm tròn: 38 → 40, 19 → 20 (lên); 61 → 60, 42 → 40 (xuống); 7 960 → 8 000 (lên); 2 040 → 2 000 (xuống)
    expect(roundToPlace(38, 1)).toBeGreaterThan(38);
    expect(roundToPlace(19, 1)).toBeGreaterThan(19);
    expect(roundToPlace(61, 1)).toBeLessThan(61);
    expect(roundToPlace(42, 1)).toBeLessThan(42);
    expect(roundToPlace(7960, 3)).toBeGreaterThan(7960);
    expect(roundToPlace(2040, 3)).toBeLessThan(2040);
  });

  it("suy nghĩ thêm", () => {
    expect(chosen("sn-1")).toContain("Không");
    expect(5978 + 2967).not.toBe(9000);
    expect(chosen("sn-2")).toBe(8920 - 1170 > 8000 ? "Đúng" : "Sai");
    expect(chosen("sn-2")).toBe("Sai");
    expect((4980 + 2970) % 10).toBe(8350 % 10);
    expect(chosen("sn-3")).toContain("Không");
  });
});

describe("Đường đua: mười tấm bìa", () => {
  it("4 bìa đúng, 6 bìa sai, tính lại bằng máy", () => {
    const right = cards.filter(isRight).map((c) => `${c.a} ${c.op} ${c.b}`);
    expect(right).toEqual(["15 × 4", "7900 − 2000", "20 × 5", "8000 : 2"]);
    expect(cards.filter((c) => !isRight(c))).toHaveLength(6);
    expect(truth(cards[3])).toBe(21);
    expect(cards.map(truth)).toEqual([8950, 60, 5900, 21, 8130, 5253, 7750, 100, 7950, 4000]);
  });

  it("cách ước lượng phát hiện đúng chiều: kết quả trên bìa nằm sai phía của số làm tròn", () => {
    const rounded = (c: (typeof cards)[number], p: number) => {
      const ra = roundToPlace(c.a, p);
      const rb = roundToPlace(c.b, p);
      return { ra, rb };
    };
    // 3 970 + 4 980 và 4 980 + 2 970: làm tròn lên cả hai, tổng thật < tổng tròn < số trên bìa
    for (const i of [0, 8]) {
      const { ra, rb } = rounded(cards[i], 3);
      expect(ra).toBeGreaterThan(cards[i].a);
      expect(rb).toBeGreaterThan(cards[i].b);
      expect(ra + rb).toBeLessThan(cards[i].shown);
    }
    // 5 120 + 3 010: làm tròn xuống cả hai, tổng tròn > số trên bìa
    const c5 = rounded(cards[4], 3);
    expect(c5.ra).toBeLessThan(5120);
    expect(c5.rb).toBeLessThan(3010);
    expect(c5.ra + c5.rb).toBeGreaterThan(cards[4].shown);
    // 51 × 103: làm tròn xuống 50 × 100 = 5 000 > 4 973
    expect(50 * 100).toBeGreaterThan(cards[5].shown);
    // 8 920 − 1 170: 9 000 − 1 000 = 8 000 < 8 750
    expect(roundToPlace(8920, 3) - roundToPlace(1170, 3)).toBeLessThan(cards[6].shown);
    // 821 : 39: 40 × 20 = 800 < 821 và 39 × 19 < 800
    expect(40 * 20).toBeLessThan(821);
    expect(39 * 19).toBeLessThan(40 * 20);
    // chữ số tận cùng không phát hiện được các bìa sai (phép chia: 39 × 19 cũng tận cùng 1)
    for (const c of cards.filter((x) => !isRight(x) && x.op !== ":")) expect(truth(c) % 10).toBe(c.shown % 10);
    expect((39 * 19) % 10).toBe(821 % 10);
  });

  it("mỗi bìa có lời ước lượng", () => {
    for (const c of cards) expect(c.estimate.length).toBeGreaterThan(20);
  });
});

describe("Đường đua: luật chơi", () => {
  const deck = cards;
  it("chọn đúng thì tiến một ô, chọn sai thì đứng yên", () => {
    let s = gameReducer(initialGame, { type: "start", deck });
    s = gameReducer(s, { type: "answer", says: "sai" }); // bìa 1 sai thật
    expect(s.position).toBe(1);
    s = gameReducer(s, { type: "next" });
    s = gameReducer(s, { type: "answer", says: "sai" }); // bìa 2 đúng thật, chọn nhầm
    expect(s.position).toBe(1);
    expect(s.moved).toBe(false);
  });

  it("về đích sau 6 lần chọn đúng; hết bìa chưa tới đích thì thua", () => {
    let s = gameReducer(initialGame, { type: "start", deck });
    for (let i = 0; i < TRACK; i += 1) {
      s = gameReducer(s, { type: "answer", says: isRight(s.deck[s.index]) ? "dung" : "sai" });
      s = gameReducer(s, { type: "next" });
    }
    expect(s.phase).toBe("won");

    let t = gameReducer(initialGame, { type: "start", deck });
    for (let i = 0; i < deck.length; i += 1) {
      t = gameReducer(t, { type: "answer", says: isRight(t.deck[t.index]) ? "sai" : "dung" });
      t = gameReducer(t, { type: "next" });
    }
    expect(t.phase).toBe("lost");
    expect(t.position).toBe(0);
  });

  it("trộn bìa giữ đủ mười tấm", () => {
    expect(shuffle(cards).map((c) => c.id).sort()).toEqual(cards.map((c) => c.id).sort());
  });
});
