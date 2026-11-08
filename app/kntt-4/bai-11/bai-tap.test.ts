import type { FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { describe, expect, it } from "vitest";
import { exerciseGroups, giaTri, quickChecks, viTri, warmUps } from "./bai-tap";

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

/** Hàng và lớp tính lại bằng cách khác: cắt chuỗi số thành nhóm ba chữ số từ phải sang. */
function placeCheck(value: number, digit: number) {
  const text = String(value);
  const fromRight = text.length - 1 - text.indexOf(String(digit));
  const rows = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
  const lop = ["lớp đơn vị", "lớp nghìn", "lớp triệu"][Math.floor(fromRight / 3)];
  return `Hàng ${rows[fromRight]}, ${lop}`;
}

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

  it("trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng", () => {
    for (const question of questions) {
      if (question.kind !== "trac-nghiem") continue;
      expect(question.options[question.answerIndex], question.id).toBeDefined();
      expect(new Set(question.options).size, question.id).toBe(question.options.length);
    }
  });

  it("đủ các nhóm và số câu", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["hang-lop", "doc-vi-tri", "gia-tri", "lop-trieu", "luyen-tap", "suy-nghi"]);
    expect(warmUps).toHaveLength(5);
  });
});

describe("hàng và lớp", () => {
  it("mọi câu hỏi hàng, lớp có đáp án khớp cách tính khác", () => {
    const cases: [string, number, number][] = [
      ["dv-1", 245361, 3], ["dv-2", 130872, 3], ["dv-3", 703458, 3], ["dv-4", 580276, 8],
      ["lt-vt-1", 250000000, 5], ["lt-vt-2", 316000000, 3],
      ["l1-a", 18273, 8], ["l1-b", 480612, 8], ["l1-c", 700800, 8],
      ["thu-hang", 639051, 9],
    ];
    for (const [id, value, digit] of cases) expect(chosen(id), id).toBe(placeCheck(value, digit));
  });

  it("câu 'chữ số 4 ở lớp nào' và 'chữ số 3 ở lớp triệu'", () => {
    expect(chosen("thu-lop")).toBe("Lớp nghìn"); // 514 293 = 514 | 293
    expect(chosen("thu-lop-trieu")).toBe("Lớp triệu"); // 531 | 000 | 000
  });

  it("viTri báo lỗi khi chữ số lặp hoặc ngoài các lựa chọn", () => {
    expect(() => viTri("x", 122345, 2, 0)).toThrow();
    expect(() => viTri("x", 245361, 3, 4)).toThrow();
    expect(() => giaTri("x", 100200, 0)).toThrow();
  });
});

describe("giá trị của chữ số", () => {
  it("mỗi giá trị bằng chữ số nhân hàng, tính lại từ số", () => {
    const cases: [string, number, number, number][] = [
      ["gt-1", 481536, 8, 80000],
      ["gt-2", 906214, 9, 900000],
      ["gt-3", 735062, 6, 60],
      ["gt-4", 520837, 7, 7],
      ["thu-gia-tri", 639051, 9, 9000],
    ];
    for (const [id, value, digit, expected] of cases) {
      const text = String(value);
      const place = 10 ** (text.length - 1 - text.indexOf(String(digit)));
      expect(digit * place, id).toBe(expected);
      expect(answers(id), id).toEqual([expected]);
    }
  });
});

describe("hoạt động ghép số", () => {
  it("bảng số 628 407", () => {
    expect(answers("hl-1")).toEqual([...String(628407)].map(Number));
  });

  it("ghép lớp nghìn và lớp đơn vị", () => {
    expect(answers("hl-2")).toEqual([Number("405" + "700")]);
    expect(answers("hl-4")).toEqual([Number("308" + "050")]);
  });

  it("số 7 040 theo từng hàng", () => {
    expect(answers("hl-3")).toEqual([7, 0, 4, 0]);
    expect(7 * 1000 + 0 * 100 + 4 * 10 + 0).toBe(7040);
  });

  it("số chẵn có sáu chữ số, lớp nghìn 0, 4, 0 và lớp đơn vị 6, 1, 1", () => {
    const [answer] = answers("l-chan");
    expect(String(answer)).toHaveLength(6);
    expect(answer % 2).toBe(0);
    expect([...String(answer).slice(0, 3)].sort()).toEqual(["0", "0", "4"]);
    expect([...String(answer).slice(3)].sort()).toEqual(["1", "1", "6"]);
    // Chỉ có một số như vậy: lớp nghìn không thể bắt đầu bằng 0, số chẵn nên tận cùng 6.
    const all = new Set<number>();
    const perms = (items: string[]): string[][] => (items.length <= 1 ? [items] : items.flatMap((x, i) => perms([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [x, ...rest])));
    for (const a of perms(["0", "4", "0"])) for (const b of perms(["6", "1", "1"])) {
      const n = Number(a.join("") + b.join(""));
      if (a[0] !== "0" && n % 2 === 0) all.add(n);
    }
    expect([...all]).toEqual([400116]);
  });
});

describe("lớp triệu", () => {
  it("đọc và viết số tròn triệu khớp nhau", () => {
    expect(chosen("lt-doc")).toBe(`${docSo(12000000)} đồng`);
    expect(docSo(12000000)).toBe("mười hai triệu");
    const written: [string, number, string][] = [
      ["lt-viet-1", 20000000, "hai mươi triệu"],
      ["lt-viet-2", 700000000, "bảy trăm triệu"],
      ["lt-viet-3", 860000000, "tám trăm sáu mươi triệu"],
    ];
    for (const [id, value, words] of written) {
      expect(answers(id), id).toEqual([value]);
      expect(docSo(value), id).toBe(words);
    }
    expect(answers("thu-tram-trieu")).toEqual([100 * 1_000_000]);
    expect(String(answers("thu-tram-trieu")[0]).match(/0/g)).toHaveLength(8);
  });

  it("đếm thêm 1 triệu và 10 triệu", () => {
    expect(answers("lt-dem-1")).toEqual([3_000_000 + 1_000_000, 5_000_000 + 1_000_000]);
    expect(answers("lt-dem-2")).toEqual([780_000_000 + 10_000_000, 800_000_000 + 10_000_000]);
  });

  it("cân: bảy triệu, tám mươi triệu, bốn trăm triệu", () => {
    expect(answers("l-can")).toEqual([7 * 1e6, 80 * 1e6, 400 * 1e6]);
  });
});

describe("luyện tập", () => {
  it("số thoả ba điều kiện là duy nhất", () => {
    const question = find("l-dieu-kien", "trac-nghiem");
    const meets = (option: string) => {
      const digits = option.replace(/\s| /g, "");
      const unitClass = digits.slice(3);
      const thousandClass = digits.slice(0, 3);
      return new Set(digits).size === 6 && !unitClass.includes("0") && thousandClass.includes("6");
    };
    const good = question.options.filter(meets);
    expect(good).toEqual([question.options[question.answerIndex]]);
  });

  it("giá giỏ quà", () => {
    const hoa = 1000, qua = 100000, lon = 10000;
    expect(answers("l-gio-1")).toEqual([3 * qua + 2 * lon + 5 * hoa]);
    expect(answers("l-gio-2")).toEqual([6 * qua + 4 * hoa]);
    expect(answers("l-gio-3")).toEqual([12 * lon + 3 * hoa]);
  });
});

describe("suy nghĩ thêm", () => {
  it("hai chữ số 5 khác giá trị", () => {
    expect(5 * 10 ** 4).not.toBe(5 * 10 ** 3);
    expect(chosen("sn-1")).toContain("hai hàng khác nhau");
  });

  it("đổi đơn vị triệu, trăm nghìn, nghìn", () => {
    expect(answers("sn-3")).toEqual([1_000_000 / 100_000, 1_000_000 / 1000]);
    expect(answers("sn-2")).toEqual([String(100_000_000).length - 1]);
  });

  it("tìm lỗi của An: số đúng là 6 200 000", () => {
    expect(docSo(6200000)).toBe("sáu triệu hai trăm nghìn");
    expect(chosen("sn-4")).toContain(formatNumber(6200000));
  });
});

describe("khởi động", () => {
  it("đọc số, viết số và đổi hàng", () => {
    expect(chosen("kd-hang")).toBe("Hàng trăm");
    expect(chosen("kd-doc")).toBe(docSo(72058));
    expect(answers("kd-viet")).toEqual([320 * 1000]);
    expect(answers("kd-nghin")).toEqual([10 * 100 / 1000]);
    expect(answers("kd-chuc-nghin")).toEqual([10 * 1000 / 10000]);
  });
});
