import type { Question } from "@/components/exercises/types";
import type { KiemDemRow } from "@/components/math/kiem-dem";
import { describe, expect, it } from "vitest";
import { addRoll, product, rabbitOf, rollTwo, tally, TRACK, winner, type Roll } from "./_game/dua-tho";
import { demQuay, ketQuaQuay } from "./_animations/ghi-kiem-dem";
import { dayBong, dayXucXac, exerciseGroups, matXucXac, quickChecks, vongQuayBaMau, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];
const byId = (id: string) => questions.find((q) => q.id === id)!;
const blanks = (id: string) => {
  const q = byId(id);
  if (q.kind !== "dien-so") throw new Error(id);
  return q.parts.flatMap((p) => (typeof p === "string" ? [] : [p.answer]));
};
const chosen = (id: string) => {
  const q = byId(id);
  if (q.kind !== "trac-nghiem") throw new Error(id);
  return q.options[q.answerIndex];
};
const rowsOf = (id: string): KiemDemRow[] => {
  const q = byId(id);
  if (q.kind === "noi-cap" || q.kind === "so-sanh" || q.kind === "dat-tinh" || !q.illustration) throw new Error(id);
  return (q.illustration as { props: { rows: KiemDemRow[] } }).props.rows;
};
const counts = (id: string) => rowsOf(id).map((row) => row.count);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

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
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("các nhóm", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((g) => [g.id, g.questions.length])).toEqual([
      ["doc-bang", 4],
      ["su-kien", 3],
      ["dien-bang", 5],
      ["so-sanh", 4],
      ["suy-nghi-them", 4],
    ]);
  });

  it("khởi động và câu thử: đọc kiểm đếm", () => {
    expect(counts("kd-1")).toEqual([5 + 3]);
    expect(blanks("kd-1")).toEqual([5 + 3]);
    expect(blanks("kd-2")).toEqual([5 + 5 + 3]);
    expect(blanks("kd-3")).toEqual([3 * 5 + 2]);
    expect(chosen("thu-doc")).toBe(`${5 + 5 + 4} lần`);
    expect(counts("thu-doc")).toEqual([14]);
    const [red, white] = counts("thu-so-sanh");
    expect(blanks("thu-so-sanh")).toEqual([white - red]);
    expect(chosen("thu-su-kien")).toBe("2 sự kiện");
  });

  it("Luyện tập 1 đổi số: đọc kiểm đếm, tổng, ít nhất", () => {
    const c = counts("db-1");
    expect(c).toEqual(matXucXac);
    expect(chosen("db-1")).toBe(`${c[4]} lần`);
    expect(c[4]).toBe(5 + 3);
    expect(blanks("db-2")).toEqual([sum(c)]);
    expect(sum(c)).toBe(28);
    expect(chosen("db-3")).toBe(`Mặt ${c.indexOf(Math.min(...c)) + 1} chấm`);
    const bong = counts("db-4");
    expect(blanks("db-4")).toEqual([bong[0], bong[1], sum(bong)]);
    expect(sum(bong)).toBe(10);
  });

  it("sự kiện có thể xảy ra", () => {
    expect(chosen("sk-1")).toBe("Lấy được bút xanh; lấy được bút đỏ");
    // 3 bút xanh, 1 bút đỏ, lấy 2: các cặp có thể là đỏ-xanh (3 cách) hoặc xanh-xanh (3 cách), không có đỏ-đỏ
    const pen = ["x", "x", "x", "d"];
    const kinds = new Set<string>();
    for (let i = 0; i < 4; i += 1) for (let j = i + 1; j < 4; j += 1) kinds.add([pen[i], pen[j]].sort().join(""));
    expect([...kinds].sort()).toEqual(["dx", "xx"]);
    expect(chosen("sk-2")).toBe("Lấy được 1 bút đỏ và 1 bút xanh; lấy được 2 bút xanh");
    expect(blanks("sk-3")).toEqual([3]);
  });

  it("hoàn thành bảng kiểm đếm từ dãy kết quả", () => {
    expect(dayBong).toHaveLength(20);
    const xanh = dayBong.filter((x) => x === "X").length;
    const vang = dayBong.filter((x) => x === "V").length;
    expect(xanh + vang).toBe(20);
    expect(blanks("kq-1")).toEqual([xanh, vang]);
    expect(blanks("kq-2")).toEqual([20]);
    expect(chosen("kq-3")).toBe(xanh > vang ? "Lấy được bóng xanh" : "Lấy được bóng vàng");
    expect(blanks("kq-4")).toEqual([Math.abs(xanh - vang)]);
    expect(counts("kq-3")).toEqual([xanh, vang]);
    expect(counts("kq-4")).toEqual([xanh, vang]);
    expect(dayXucXac).toHaveLength(12);
    expect(blanks("kq-5")).toEqual([dayXucXac.filter((x) => x === 5).length, dayXucXac.filter((x) => x === 6).length]);
    expect(blanks("kq-5")).toEqual([4, 2]);
  });

  it("so sánh số lần (vòng quay ba màu)", () => {
    const [d, v, x] = counts("ss-1");
    expect([d, v, x]).toEqual([vongQuayBaMau.do, vongQuayBaMau.vang, vongQuayBaMau.xanh]);
    expect(chosen("ss-1")).toBe(["Màu đỏ", "Màu vàng", "Màu xanh"][[d, v, x].indexOf(Math.max(d, v, x))]);
    expect(blanks("ss-2")).toEqual([d - v]);
    expect(blanks("ss-3")).toEqual([d + v + x]);
    expect(chosen("ss-4")).toBe(["Màu đỏ", "Màu vàng", "Màu xanh"][[d, v, x].indexOf(Math.min(d, v, x))]);
  });

  it("suy nghĩ thêm", () => {
    expect(chosen("sn-1")).toContain("ghi bảng kiểm đếm");
    expect(9 + 8).not.toBe(20);
    expect(chosen("sn-2")).toContain("9 + 8 = 17");
    expect(chosen("sn-3")).toContain("2 sự kiện");
    expect(counts("sn-4")).toEqual([5 + 3]);
    expect(chosen("sn-4")).toContain("5 + 3");
  });
});

describe("animation: dãy 20 lần quay", () => {
  it("9 đỏ + 11 vàng = 20, mỗi đợt 5 lần cộng lại đúng", () => {
    expect(ketQuaQuay).toHaveLength(20);
    expect(demQuay(20)).toEqual({ do: 9, vang: 11 });
    for (const lan of [0, 5, 10, 15, 20]) {
      const { do: d, vang: v } = demQuay(lan);
      expect(d + v).toBe(lan);
    }
  });
});

describe("Đua thỏ: luật chơi", () => {
  const rollOf = (a: number, b: number): Roll => [a, b];
  it("tích chẵn cho thỏ Chẵn, tích lẻ cho thỏ Lẻ (tính cả 36 cặp)", () => {
    let chan = 0;
    for (let a = 1; a <= 6; a += 1) {
      for (let b = 1; b <= 6; b += 1) {
        const expected = (a * b) % 2 === 0 ? "chan" : "le";
        expect(rabbitOf([a, b])).toBe(expected);
        if (expected === "chan") chan += 1;
      }
    }
    expect(chan + 36 - chan).toBe(36);
    expect(product(rollOf(3, 4))).toBe(12);
    expect(rabbitOf(rollOf(3, 5))).toBe("le");
  });

  it("rng được tiêm: ra mặt 1 đến 6", () => {
    expect(rollTwo(() => 0)).toEqual([1, 1]);
    expect(rollTwo(() => 0.999)).toEqual([6, 6]);
    const seq = [0.5, 0.2];
    let i = 0;
    expect(rollTwo(() => seq[i++])).toEqual([4, 2]);
  });

  it("kiểm đếm: số lần hai thỏ cộng bằng số lần gieo; đến đích sau 6 ô thì dừng", () => {
    let rolls: Roll[] = [];
    expect(winner(rolls)).toBeNull();
    for (let i = 0; i < 5; i += 1) rolls = addRoll(rolls, rollOf(2, 3));
    expect(tally(rolls)).toEqual({ chan: 5, le: 0 });
    rolls = addRoll(rolls, rollOf(3, 3));
    expect(tally(rolls)).toEqual({ chan: 5, le: 1 });
    expect(winner(rolls)).toBeNull();
    rolls = addRoll(rolls, rollOf(4, 4));
    expect(tally(rolls).chan).toBe(TRACK);
    expect(winner(rolls)).toBe("chan");
    expect(addRoll(rolls, rollOf(1, 1))).toBe(rolls);
    const { chan, le } = tally(rolls);
    expect(chan + le).toBe(rolls.length);
  });
});
