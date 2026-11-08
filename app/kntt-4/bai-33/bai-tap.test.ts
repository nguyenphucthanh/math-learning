import type { FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { digitValue, evalSum, exerciseGroups, expand, quickChecks, roundTo, warmUps } from "./bai-tap";

const questions: Question[] = [...warmUps, ...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blankAnswers = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const answers = (id: string) => blankAnswers(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
/** Làm tròn bằng cách khác với `roundTo`: chia, làm tròn nửa lên, nhân lại. */
const roundCheck = (value: number, step: number) => Math.round(value / step) * step;

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("câu nào cũng có gợi ý và giải thích", () => {
    for (const question of questions) {
      expect(question.hint.length, question.id).toBeGreaterThan(10);
      expect(question.explanation.length, question.id).toBeGreaterThan(10);
    }
  });

  it("câu trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(question.options.length);
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("câu nối cặp có rightOrder là hoán vị, không số nào đứng đúng vị trí", () => {
    for (const question of questions) {
      if (question.kind !== "noi-cap") continue;
      expect([...question.rightOrder].sort(), question.id).toEqual(question.pairs.map((_, index) => index));
      question.rightOrder.forEach((value, index) => expect(value, question.id).not.toBe(index));
    }
  });

  it("3 câu khởi động và 6 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["doc-so", 4],
      ["viet-tong", 7],
      ["so-sanh", 9],
      ["lam-tron", 4],
      ["suy-nghi-them", 4],
    ]);
  });
});

describe("hàm trợ giúp", () => {
  it("expand viết số thành tổng đúng và bỏ hàng 0", () => {
    expect(expand(45703)).toEqual([40000, 5000, 700, 3]);
    expect(expand(3705090)).toEqual([3000000, 700000, 5000, 90]);
    for (const value of [72053, 3140206, 608292, 5240601]) {
      expect(expand(value).reduce((a, b) => a + b, 0)).toBe(value);
    }
  });

  it("digitValue khớp bảng của SGK", () => {
    expect([digitValue(46875, 4), digitValue(46875, 7)]).toEqual([40000, 70]);
    expect([digitValue(703410, 4), digitValue(703410, 7)]).toEqual([400, 700000]);
    expect([digitValue(4297603, 4), digitValue(4297603, 7)]).toEqual([4000000, 7000]);
  });

  it("roundTo khớp cách làm tròn kiểm tra lại và ví dụ SGK", () => {
    for (const value of [4628, 3962, 8891344, 5372649, 3468215, 906480, 7249618]) {
      for (const step of [10, 100, 1000, 10000, 100000]) {
        expect(roundTo(value, step), `${value}/${step}`).toBe(roundCheck(value, step));
      }
    }
    expect(roundTo(8891344, 100)).toBe(8891300);
    expect(roundTo(8891344, 1000)).toBe(8891000);
    expect(roundTo(8891344, 10000)).toBe(8890000);
    expect(roundTo(8891344, 100000)).toBe(8900000);
  });

  it("evalSum đổi tổng thành số", () => {
    expect(evalSum("30 000 + 7 000 + 20")).toBe(37020);
    expect(evalSum(formatNumber(65030))).toBe(65030);
  });
});

describe("đọc số, hàng và lớp", () => {
  it("lop-1: ba nhóm ba chữ số của 864 530 297", () => {
    const text = String(864530297);
    expect(answers("lop-1")).toEqual([Number(text.slice(0, 3)), Number(text.slice(3, 6)), Number(text.slice(6))]);
  });

  it("lop-2 và hangLop: vị trí chữ số tính từ hàng đơn vị", () => {
    const place = (value: number, digit: number) => String(value).length - 1 - String(value).indexOf(String(digit));
    expect(place(3070650, 7)).toBe(4);
    expect(chosen("lop-2")).toBe("Hàng chục nghìn, lớp nghìn");
    expect(place(4197305, 9)).toBe(4);
    expect(chosen("thu-hang-lop")).toBe("Hàng chục nghìn, lớp nghìn");
  });

  it("câu đọc số: đáp án đọc đúng từng lớp", () => {
    expect(chosen("doc-1")).toBe("bảy triệu không trăm sáu mươi nghìn hai trăm mười lăm");
    expect(chosen("doc-2")).toBe("sáu trăm bốn mươi triệu hai trăm linh năm nghìn bảy trăm mười tám");
    expect(chosen("thu-doc")).toBe("hai triệu không trăm năm mươi nghìn ba trăm");
  });
});

describe("viết thành tổng, giá trị chữ số", () => {
  it("tong-1, tong-2: các số hạng cộng lại đúng số đã cho", () => {
    expect(answers("tong-1")).toEqual([70000, 2000, 50, 3]);
    expect(answers("tong-1").reduce((a, b) => a + b, 0)).toBe(72053);
    expect(answers("tong-2")).toEqual([3000000, 100000, 40000, 200, 6]);
    expect(answers("tong-2").reduce((a, b) => a + b, 0)).toBe(3140206);
  });

  it("thieu-1, 2, 3: số cần điền làm tổng bằng vế phải", () => {
    expect(40000 + 8000 + 500 + 30 + answers("thieu-1")[0]).toBe(48537);
    expect(600000 + 5000 + answers("thieu-2")[0] + 60 + 1).toBe(605261);
    expect(2000000 + 900000 + 40000 + answers("thieu-3")[0]).toBe(2940080);
  });

  it("gt-1, gt-2: giá trị chữ số", () => {
    expect(answers("gt-1")).toEqual([5000, 800000]);
    expect(answers("gt-2")).toEqual([40000, 90]);
    expect(answers("kd-gia-tri")).toEqual([400000]);
  });
});

describe("so sánh", () => {
  it("sáu câu >, <, =: tính lại hai vế", () => {
    const expected: Record<string, string> = { "ss-1": "<", "ss-2": ">", "ss-3": "<", "ss-4": "=", "ss-5": "<", "ss-6": ">" };
    for (const [id, sign] of Object.entries(expected)) {
      const question = find(id, "trac-nghiem");
      const [left, right] = question.prompt.split(" ? ");
      const l = evalSum(left);
      const r = evalSum(right);
      expect(l === r ? "=" : l > r ? ">" : "<", id).toBe(sign);
      expect(chosen(id), id).toBe(sign);
    }
    expect(chosen("thu-so-sanh")).toBe("<");
    expect(480270 < 480720).toBe(true);
  });

  it("ss-7, ss-8, ss-9: bốn trường", () => {
    const schools = { A: 318400, B: 76900, C: 402650, D: 129500 };
    const sorted = Object.values(schools).sort((a, b) => a - b);
    expect(chosen("ss-7")).toBe("Trường C");
    expect(schools.C).toBe(Math.max(...Object.values(schools)));
    expect(answers("ss-8")).toEqual(sorted);
    const moreThanD = Object.entries(schools).filter(([name, value]) => name !== "D" && value > schools.D).map(([name]) => name);
    expect(moreThanD).toEqual(["A", "C"]);
    expect(chosen("ss-9")).toBe("Trường A và Trường C");
    expect(chosen("kd-so-sanh")).toBe(formatNumber(100234));
  });

  it("vi-sao: 603 450 lớn hơn vì hàng trăm nghìn 6 > 5", () => {
    expect(603450 > 599990).toBe(true);
    expect(chosen("vi-sao")).toContain("603");
    expect(chosen("vi-sao")).toContain("6 > 5");
  });
});

describe("làm tròn", () => {
  it("tron-1: 5 372 649 đến hàng trăm", () => {
    expect(chosen("tron-1")).toBe(formatNumber(roundCheck(5372649, 100)));
    expect(roundCheck(5372649, 100)).toBe(5372600);
  });

  it("tron-2: số chữ số 0 ở cuối khớp hàng", () => {
    const question = find("tron-2", "noi-cap");
    const pairs: [string, number][] = [
      ["hàng trăm nghìn", 100000],
      ["hàng nghìn", 1000],
      ["hàng chục nghìn", 10000],
    ];
    for (const [place, step] of pairs) {
      const pair = question.pairs.find((item) => item.right === place)!;
      expect(evalSum(pair.left), place).toBe(roundCheck(5372649, step));
    }
  });

  it("tron-3, tron-4, tim-loi, khởi động, câu thử", () => {
    expect(answers("tron-3")).toEqual([roundCheck(3468215, 10000)]);
    expect(answers("tron-4")).toEqual([roundCheck(906480, 100000)]);
    expect(answers("tim-loi")).toEqual([roundCheck(7249618, 100000)]);
    expect(roundCheck(7249618, 10000)).toBe(7250000);
    expect(answers("kd-lam-tron")).toEqual([roundCheck(4628, 100)]);
    expect(answers("thu-lam-tron")).toEqual([roundCheck(3962, 100)]);
  });
});

describe("suy nghĩ thêm", () => {
  it("do-em: viết 3 vào trước số có ba chữ số thì thêm 3 000, thử mọi số", () => {
    for (let value = 100; value <= 999; value++) {
      expect(Number(`3${value}`) - value).toBe(answers("do-em")[0]);
    }
  });

  it("gan-gia: C thấp nhất, A < B < D", () => {
    const prices = [9800000, 10600000, 11300000, 12400000];
    const [a, b, c, d] = answers("gan-gia");
    expect([...prices].sort((x, y) => x - y)).toEqual([c, a, b, d]);
    expect(c).toBe(Math.min(a, b, c, d));
    expect(a < b && b < d).toBe(true);
    expect(new Set([a, b, c, d])).toEqual(new Set(prices));
  });
});
