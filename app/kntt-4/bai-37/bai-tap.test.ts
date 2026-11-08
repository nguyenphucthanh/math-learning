import type { ChoiceQuestion, DatTinhQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { convertArea, formatNumber } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { isParallel, isParallelogram, isPerpendicular, isRhombus } from "@/lib/hinh";
import { convertMass, toKg, type MassUnit } from "@/lib/mass-units";
import { describe, expect, it } from "vitest";
import { Bang, bangGiay, hiddenValues, valueAt } from "./_illustrations/bang-giay";
import { diem, doan, doanByName } from "./_illustrations/hinh-hoc";
import { monThi, tongBac, tongDong, tongVang } from "./_illustrations/thong-ke";
import { bieuThuc1, bieuThuc2, caySo, dienTichBa, digitValue, exerciseGroups, khoiLuongBa, lopHoc, muoi, placeOf, quickChecks, vuon } from "./bai-tap";

const questions: Question[] = [...Object.values(quickChecks), ...exerciseGroups.flatMap((group) => group.questions)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanksOf = (parts: FillQuestion["parts"]) => parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const blanks = (id: string) => blanksOf(find(id, "dien-so").parts);
const chosen = (id: string) => {
  const question: ChoiceQuestion = find(id, "trac-nghiem");
  return question.options[question.answerIndex];
};
const lines = (id: string) => (find(id, "loi-van") as WordQuestion).lines.map(blanksOf);
const sign = (l: number, r: number) => (l > r ? ">" : l < r ? "<" : "=");
const digitsAt = (value: number) => String(value).split("").map(Number);

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

  it("đúng các nhóm", () => {
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["so-lop-trieu", 11],
      ["phep-tinh", 10],
      ["do-luong", 6],
      ["so-chan-le", 2],
      ["thong-ke", 3],
      ["hinh-hoc", 6],
      ["bai-toan", 4],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("số đến lớp triệu", () => {
  it("viết số từ bảng hàng: đáp án khớp số đưa vào bảng", () => {
    expect(blanks("sl-viet-1")).toEqual([4352781]);
    expect(blanks("sl-viet-2")).toEqual([2090506]);
    expect(blanks("sl-viet-3")).toEqual([183047]);
  });

  it("đọc số: đáp án đúng là cách đọc từng lớp, ba đáp án sai đều khác", () => {
    const values: Record<string, number> = { "qc-doc": 1400080, "sl-doc-1": 3080215, "sl-doc-2": 906054, "sn-3": 3040502 };
    for (const [id, value] of Object.entries(values)) {
      const question = find(id, "trac-nghiem");
      expect(chosen(id), id).toBe(docSo(value));
      expect(question.options.filter((option) => option === docSo(value)).length, id).toBe(1);
    }
    expect(chosen("sl-doc-1")).toBe("ba triệu không trăm tám mươi nghìn hai trăm mười lăm");
  });

  it("hàng và lớp: vị trí tính từ hàng đơn vị", () => {
    expect(placeOf(5270316, 7)).toBe(4);
    expect(chosen("qc-hang-lop")).toBe("Hàng chục nghìn, lớp nghìn");
    expect(placeOf(6387214, 7)).toBe(3);
    expect(chosen("sl-hang-1")).toBe("Hàng nghìn, lớp nghìn");
    expect(placeOf(7301650, 7)).toBe(6);
    expect(chosen("sl-hang-2")).toBe("Hàng triệu, lớp triệu");
    expect(placeOf(925740, 7)).toBe(2);
    expect(chosen("sl-hang-3")).toBe("Hàng trăm, lớp đơn vị");
  });

  it("giá trị chữ số 8: tính bằng cách khác", () => {
    const values = [12805, 1580342, 38674, 8215970, 270081];
    // Chữ số 8 nhân giá trị hàng, hàng tính bằng số chữ số đứng sau nó.
    const expected = values.map((value) => 8 * 10 ** (String(value).length - 1 - String(value).indexOf("8")));
    expect(lines("sl-gia-tri").map((line) => line[0])).toEqual(expected);
    expect(expected).toEqual([800, 80000, 8000, 8000000, 80]);
    for (const value of values) expect(digitsAt(value).filter((digit) => digit === 8).length).toBe(1);
    expect(digitValue(12805, 8)).toBe(800);
  });

  it("sắp xếp: đúng thứ tự và đủ các số", () => {
    expect(blanks("sl-xep-1")).toEqual([3417, 3741, 4173, 4371]);
    expect(blanks("sl-xep-2")).toEqual([31205, 30512, 13250, 9999]);
    expect([...blanks("sl-xep-1")].sort((a, b) => a - b)).toEqual(blanks("sl-xep-1"));
    expect([...blanks("sl-xep-2")].sort((a, b) => b - a)).toEqual(blanks("sl-xep-2"));
  });

  it("câu so sánh nhanh", () => {
    expect(chosen("qc-so-sanh")).toBe(formatNumber(10001));
  });
});

describe("phép tính", () => {
  it("đặt tính cộng, trừ: số liệu hợp lệ và có đáp án tính được", () => {
    const adds = ["pt-1", "pt-2"].map((id) => find(id, "dat-tinh") as DatTinhQuestion);
    const subs = ["pt-3", "pt-4", "qc-cat-tru"].map((id) => find(id, "dat-tinh") as DatTinhQuestion);
    expect(adds.map((q) => q.a + q.b)).toEqual([8533, 91110]);
    expect(subs.map((q) => q.a - q.b)).toEqual([4655, 24476, 3417]);
    for (const q of [...adds, ...subs]) expect(q.a).toBeGreaterThanOrEqual(q.b);
  });

  it("nhân, chia: tính lại và chia hết", () => {
    expect(blanks("pt-5")).toEqual([31245 * 3]);
    expect(blanks("pt-5")).toEqual([93735]);
    expect(blanks("pt-6")).toEqual([28328]);
    expect(blanks("pt-7")).toEqual([7383]);
    expect(blanks("pt-8")).toEqual([1532]);
    expect(7383 * 5).toBe(36915);
    expect(1532 * 4).toBe(6128);
  });

  it("biểu thức: thứ tự phép tính", () => {
    expect(bieuThuc1).toEqual({ a: 64080, b: 9, c: 5, d: 200037 });
    expect(blanks("pt-bt-1")).toEqual([16020 + 200037]);
    expect(blanks("pt-bt-1")).toEqual([216057]);
    expect(bieuThuc2).toEqual({ a: 35000, b: 8025, c: 4 });
    expect(blanks("pt-bt-2")).toEqual([35000 + 32100]);
    expect(blanks("pt-bt-2")).toEqual([67100]);
    expect(blanks("qc-bieu-thuc")).toEqual([40]);
  });

  it("câu tìm lỗi sai: làm theo cách sai ra kết quả sai, đáp án nêu thứ tự đúng", () => {
    expect((35000 + 8025) * 4).toBe(172100);
    expect(chosen("sn-1")).toContain("nhân 8 025 × 4 trước");
  });

  it("ước lượng", () => {
    expect(chosen("sn-2")).toBe(formatNumber(80000));
    expect(Math.abs(48960 + 31080 - 80000)).toBeLessThan(1000);
  });
});

describe("đo lường", () => {
  it("diện tích lớn nhất: đổi về mm²", () => {
    const mm2 = dienTichBa.map((measure) => convertArea(measure, "mm²"));
    expect(mm2).toEqual([1000900, 1000500, 1000700]);
    expect(chosen("dl-1")).toBe(`A. ${dienTichBa[0]}`);
  });

  it("khối lượng nhẹ nhất: đổi về kg", () => {
    const kg = khoiLuongBa.map(toKg);
    expect(kg).toEqual([2900, 2800, 2790]);
    expect(chosen("dl-2")).toBe(`C. ${khoiLuongBa[2]}`);
  });

  it("bốn câu so sánh", () => {
    expect(sign(convertArea("1 m² 24 dm²", "dm²"), 38 + 76)).toBe(">");
    expect(chosen("dl-3")).toBe(">");
    expect(sign(120 * 3, convertArea("4 cm²", "mm²"))).toBe("<");
    expect(chosen("dl-4")).toBe("<");
    expect(sign(7 * 100 + 5 * 100, 120 * 10)).toBe("=");
    expect(chosen("dl-5")).toBe("=");
    expect(sign(3000 + 400, 7000 / 2)).toBe("<");
    expect(chosen("dl-6")).toBe("<");
  });

  it("câu đổi đơn vị nhanh", () => {
    expect(blanks("qc-khoi-luong")).toEqual([convertMass("3 tấn", "tạ" as MassUnit)]);
    expect(blanks("qc-dien-tich")).toEqual([convertArea("2 m²", "dm²")]);
  });
});

describe("số chẵn, số lẻ trên băng giấy", () => {
  it("các số bị che tính từ băng và đếm số chẵn", () => {
    const hidden = hiddenValues(bangGiay);
    expect(hidden).toEqual([26, 25, 52, 799, 800, 801]);
    expect(hidden.filter((value) => value % 2 === 0).length).toBe(3);
    expect(chosen("sc-1")).toBe("3 số chẵn");
  });

  it("mỗi băng là dãy số liền nhau, ô lộ ra khớp công thức", () => {
    const bang: Bang = bangGiay[0];
    expect([0, 1, 2, 3, 4].map((i) => valueAt(bang, i))).toEqual([26, 25, 24, 23, 22]);
    expect(blanks("sc-2")).toEqual([799, 800, 801]);
    expect(valueAt(bangGiay[2], 1)).toBe(798);
  });
});

describe("bảng thống kê", () => {
  it("tổng từng loại tính lại từ bảng", () => {
    const total = (key: "vang" | "bac" | "dong") => monThi.reduce((sum, item) => sum + (item[key] ?? 0), 0);
    expect([total("vang"), total("bac"), total("dong")]).toEqual([47, 48, 43]);
    expect(blanks("tk-1")).toEqual([47, 48, 43]);
    expect([tongVang, tongBac, tongDong]).toEqual([47, 48, 43]);
  });

  it("môn nhiều HCV nhất và tổng huy chương Điền kinh", () => {
    const best = Math.max(...monThi.map((item) => item.vang ?? 0));
    expect(monThi.filter((item) => item.vang === best).map((item) => item.mon)).toEqual(["Bơi"]);
    expect(chosen("tk-2")).toBe("Bơi");
    expect(blanks("tk-3")).toEqual([12 + 20 + 14]);
  });
});

describe("hình học trên lưới", () => {
  const { L, D, K, E, G, I, H } = diem;

  it("hình thoi và hình bình hành tính từ toạ độ", () => {
    expect(isRhombus([E, D, G, H])).toBe(true);
    expect(isParallelogram([L, D, E, K])).toBe(true);
    expect(isParallelogram([K, E, H, I])).toBe(true);
    expect(isRhombus([K, E, H, I])).toBe(false);
    expect(isRhombus([L, D, E, K])).toBe(false);
    expect(chosen("hh-1")).toBe("Đúng");
    expect(chosen("hh-2")).toBe("Đúng");
    expect(chosen("hh-3")).toBe("Sai");
  });

  it("số đoạn song song với DE", () => {
    const de = doanByName("DE");
    const parallel = doan.filter((item) => item.name !== "DE" && isParallel(item.seg, de)).map((item) => item.name).sort();
    expect(parallel).toEqual(["GH", "KL"]);
    expect(parallel.length).toBe(2);
    expect(chosen("hh-4")).toBe("Sai");
  });

  it("đoạn vuông góc với LI", () => {
    const li = doanByName("LI");
    const perp = doan.filter((item) => item.name !== "LI" && isPerpendicular(item.seg, li)).map((item) => item.name).sort();
    expect(perp).toEqual(["IH", "KE", "LD"]);
    expect(blanks("hh-6")).toEqual([perp.length]);
    expect(chosen("hh-5")).toBe("LD");
    const options = find("hh-5", "trac-nghiem").options;
    expect(options.filter((name) => perp.includes(name))).toEqual(["LD"]);
  });
});

describe("bài toán lời văn", () => {
  it("khu vườn: chu vi trừ cửa", () => {
    const [dai, chuVi, rao] = lines("bt-vuon").map((line) => line[0]);
    expect(dai).toBe(vuon.rong * vuon.gap);
    expect(chuVi).toBe(2 * (vuon.rong + dai));
    expect(rao).toBe(chuVi - vuon.cua);
    expect([dai, chuVi, rao]).toEqual([90, 240, 235]);
  });

  it("học bơi, học bóng đá", () => {
    const [boi, bong, hon] = lines("bt-lop").map((line) => line[0]);
    expect(boi * lopHoc.lop).toBe(lopHoc.boi);
    expect(bong * lopHoc.lop).toBe(lopHoc.bong);
    expect(hon).toBe(boi - bong);
    expect([boi, bong, hon]).toEqual([30, 12, 18]);
  });

  it("muối: hai ô tô cộng lại đủ tổng, hiệu đúng", () => {
    const [ta, xe2, xe1] = lines("bt-muoi").map((line) => line[0]);
    expect(ta).toBe(muoi.tan * 10);
    expect(xe1 + xe2).toBe(ta);
    expect(xe1 - xe2).toBe(muoi.hon);
    expect([xe2, xe1]).toEqual([27, 33]);
  });

  it("cây ổi, cây chuối: thử lại tổng và hiệu", () => {
    const [chuoi, oi] = lines("bt-cay").map((line) => line[0]);
    expect(chuoi + oi).toBe(caySo.tong);
    expect(oi - chuoi).toBe(caySo.hon);
    expect([chuoi, oi]).toEqual([390, 450]);
    expect(blanks("qc-tong-hieu")).toEqual([8]);
    expect(blanks("qc-chu-vi")).toEqual([26]);
  });
});

describe("nhắc lại nhanh", () => {
  it("hình thoi là hình bình hành có bốn cạnh bằng nhau", () => {
    expect(chosen("qc-hinh-thoi")).toContain("bốn cạnh bằng nhau");
  });
});
