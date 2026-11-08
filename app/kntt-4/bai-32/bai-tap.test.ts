import type { ChoiceQuestion, FillQuestion, Question } from "@/components/exercises/types";
import { isRightAt } from "@/components/math/da-giac";
import { isParallel, isPerpendicular, lengthOf, passesThrough, polygonArea } from "@/lib/hinh";
import { describe, expect, it } from "vitest";
import { DICH_SANG_PHAI, hinhBinhHanh } from "./_animations/cat-ghep";
import { duongAB, duongCD, duongEG, eKe, hinh } from "./_animations/ve-qua-diem";
import { duongDo } from "./_illustrations/ao-anh";
import { hopBao } from "./_illustrations/chong-hinh";
import { angleBetweenHands } from "@/components/math/dong-ho";
import { doanGapKhuc } from "./_illustrations/gap-khuc";
import { diem, doan } from "./_illustrations/hinh-dung-sai";
import { cacDapAn, oLuoi, oThieu } from "./_illustrations/nguoi-que";
import { queTinh } from "./_illustrations/que-thoi";
import { bacDuoi, bacTren, thanhPhai, thanhTrai } from "./_illustrations/thang";
import { vuong } from "./_illustrations/vuong-cheo";
import { cachDan, exerciseGroups, quickChecks, warmUps } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks), ...warmUps];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

const blanks = (question: FillQuestion) => question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
const chosen = (question: ChoiceQuestion) => question.options[question.answerIndex];
const pair = (option: string) => option.split(" và ");

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
    const withFigure = [
      "gk-song-song", "gk-vuong-goc", "ds-song-song", "ds-ae-gh", "ds-vuong-goc-sai", "ds-gh-ab", "ds-gh-nm", "thang", "ao-anh",
      "que-thoi-2", "vuong-cheo", "xep-lop", "nguoi-que", "dong-ho-vuong", "dong-ho-bet",
    ];
    for (const id of withFigure) {
      const question = questions.find((item) => item.id === id);
      expect(question && "illustration" in question ? question.illustration : undefined, id).toBeDefined();
    }
  });

  it("các nhóm bài tập", () => {
    expect(exerciseGroups.map((group) => group.id)).toEqual(["song-song-vuong-goc", "hinh-cat-ghep", "quan-sat-suy-luan", "suy-nghi"]);
  });
});

describe("đường gấp khúc (bài 2 tr. 110)", () => {
  const segOf = (name: string) => doanGapKhuc[name];

  it("trong các lựa chọn chỉ có đúng một cặp song song, và là đáp án", () => {
    const question = find("gk-song-song", "trac-nghiem");
    const parallel = question.options.filter((option) => {
      const [a, b] = pair(option);
      return isParallel(segOf(a), segOf(b));
    });
    expect(parallel).toEqual([chosen(question)]);
    expect(chosen(question)).toBe("BC và HK");
  });

  it("trong các lựa chọn chỉ có đúng một cặp vuông góc, và là đáp án", () => {
    const question = find("gk-vuong-goc", "trac-nghiem");
    const perpendicular = question.options.filter((option) => {
      const [a, b] = pair(option);
      return isPerpendicular(segOf(a), segOf(b));
    });
    expect(perpendicular).toEqual([chosen(question)]);
    expect(chosen(question)).toBe("AB và BC");
  });
});

describe("Đúng hay Sai trên hình (luyện tập 1 tr. 111)", () => {
  const truth: Record<string, boolean> = {
    "ds-song-song": isParallel(doan("EP"), doan("DC")),
    "ds-ae-gh": isParallel(doan("AE"), doan("GH")),
    "ds-vuong-goc-sai": isPerpendicular(doan("NM"), doan("NP")),
    "ds-gh-ab": isPerpendicular(doan("GH"), doan("AB")),
    "ds-gh-nm": isParallel(doan("GH"), doan("NM")),
  };

  it("đáp án khớp với tọa độ", () => {
    for (const [id, expected] of Object.entries(truth)) {
      const question = find(id, "trac-nghiem");
      expect(chosen(question), id).toBe(expected ? "Đúng" : "Sai");
    }
  });

  it("các điểm E, H, M, P nằm trên AB", () => {
    for (const name of ["E", "H", "M", "P"]) {
      expect(passesThrough(doan("AB"), diem[name]), name).toBe(true);
    }
  });

  it("có cả câu Đúng và câu Sai", () => {
    expect(Object.values(truth).filter(Boolean).length).toBeGreaterThan(0);
    expect(Object.values(truth).filter((value) => !value).length).toBeGreaterThan(0);
  });
});

describe("cái thang và ảo ảnh", () => {
  it("hai bậc thang song song nhưng bậc dưới dài hơn", () => {
    expect(isParallel(bacTren, bacDuoi)).toBe(true);
    expect(lengthOf(bacDuoi)).toBeGreaterThan(lengthOf(bacTren));
    expect(isParallel(thanhTrai, thanhPhai)).toBe(false);
    expect(chosen(find("thang", "trac-nghiem"))).toContain("bậc b (phía dưới) dài hơn");
  });

  it("hai đường đỏ song song", () => {
    expect(isParallel(duongDo[0], duongDo[1])).toBe(true);
    expect(chosen(find("ao-anh", "trac-nghiem"))).toMatch(/^Có/);
  });

  it("câu tìm lỗi sai: Mai sai", () => {
    expect(chosen(find("sn-loi-sai", "trac-nghiem"))).toMatch(/^Sai/);
  });
});

describe("hình thoi và que tính", () => {
  it("hình thoi cần 4 que; hai hình thoi chung cạnh cần 7 que; ba hình thoi rời cần 12 que", () => {
    expect(chosen(find("que-thoi-1", "trac-nghiem"))).toBe("4 que");
    expect(queTinh).toHaveLength(7);
    expect(chosen(find("que-thoi-2", "trac-nghiem"))).toBe(`${queTinh.length} que`);
    expect(blanks(find("que-thoi-3", "dien-so"))).toEqual([4 * 3]);
  });

  it("bảy que cùng độ dài (60, sai số do làm tròn tọa độ)", () => {
    for (const seg of queTinh) expect(Math.abs(lengthOf(seg) - 60)).toBeLessThan(0.1);
  });

  it("cắt hình vuông theo AC được hai hình tam giác bằng nhau", () => {
    const { A, B, C, D } = vuong;
    expect(polygonArea([A, B, C])).toBe(polygonArea([A, C, D]));
    expect(polygonArea([A, B, C]) * 2).toBe(polygonArea([A, B, C, D]));
    expect(chosen(find("vuong-cheo", "trac-nghiem"))).toContain("tam giác");
  });
});

describe("xếp lớp miếng dán", () => {
  const dung = (order: string[]) => order.indexOf("chu-nhat") < order.indexOf("thoi") && order.indexOf("thoi") < order.indexOf("tam-giac");

  it("chỉ có một cách dán thỏa điều kiện, và là đáp án", () => {
    const question = find("xep-lop", "trac-nghiem");
    const matching = cachDan.flatMap((order, index) => (dung(order) ? [question.options[index]] : []));
    expect(matching).toEqual([chosen(question)]);
    expect(chosen(question)).toBe("Hình D");
  });

  it("mỗi cách dán có đủ 4 miếng dán", () => {
    for (const order of cachDan) expect([...order].sort()).toEqual(["chu-nhat", "tam-giac", "thoi", "tron"]);
  });

  it("hình thoi chồng lên cả hình chữ nhật và hình tam giác, để nhìn ra thứ tự", () => {
    const overlap = (a: keyof typeof hopBao, b: keyof typeof hopBao) =>
      hopBao[a][0] < hopBao[b][2] && hopBao[b][0] < hopBao[a][2] && hopBao[a][1] < hopBao[b][3] && hopBao[b][1] < hopBao[a][3];
    expect(overlap("thoi", "chu-nhat")).toBe(true);
    expect(overlap("thoi", "tam-giac")).toBe(true);
  });
});

describe("bảng người que 3 x 3", () => {
  it("mỗi hàng và mỗi cột có đủ ba đầu và ba thân khác nhau", () => {
    for (let k = 0; k < 3; k += 1) {
      const row = [0, 1, 2].map((j) => oLuoi(k, j));
      const col = [0, 1, 2].map((i) => oLuoi(i, k));
      for (const line of [row, col]) {
        expect(new Set(line.map((cell) => cell.head)).size).toBe(3);
        expect(new Set(line.map((cell) => cell.body)).size).toBe(3);
      }
    }
  });

  it("chỉ một đáp án điền vào ô thiếu đúng quy luật, và là đáp án", () => {
    const expected = oLuoi(oThieu.i, oThieu.j);
    const matching = cacDapAn.flatMap((figure, index) => (figure.head === expected.head && figure.body === expected.body ? [index] : []));
    expect(matching).toEqual([find("nguoi-que", "trac-nghiem").answerIndex]);
  });
});

describe("đồng hồ", () => {
  it("giờ tròn trong 12 giờ có hai kim vuông góc: 3 giờ và 9 giờ", () => {
    const hours = Array.from({ length: 12 }, (_, k) => k + 1).filter((hour) => angleBetweenHands(hour) === 90);
    expect(hours).toEqual([3, 9]);
    expect(blanks(find("dong-ho-vuong", "dien-so"))).toEqual([9]);
  });

  it("lúc 6 giờ hai kim tạo góc bẹt", () => {
    expect(angleBetweenHands(6)).toBe(180);
    expect(chosen(find("dong-ho-bet", "trac-nghiem"))).toBe("Góc bẹt");
  });

  it("lúc 4 giờ kim giờ và kim phút tạo góc 120 độ", () => {
    expect(angleBetweenHands(4)).toBe(120);
  });
});

describe("hình trong animation", () => {
  it("VeQuaDiem: CD qua H vuông góc AB; EG qua H song song AB; ê ke có góc vuông tại F", () => {
    expect(isPerpendicular(duongAB, duongCD)).toBe(true);
    expect(passesThrough(duongCD, hinh.H)).toBe(true);
    expect(isParallel(duongAB, duongEG)).toBe(true);
    expect(passesThrough(duongEG, hinh.H)).toBe(true);
    expect(isRightAt(eKe, 0)).toBe(true);
    expect(passesThrough(duongAB, eKe[1])).toBe(true);
    expect(passesThrough(duongCD, eKe[2])).toBe(true);
    expect(passesThrough(duongAB, hinh.H)).toBe(false);
  });

  it("CatGhep: AH vuông góc DC, dịch ADH sang phải DC thì A trùng B và D trùng C, diện tích không đổi", () => {
    const { A, B, C, D, H } = hinhBinhHanh;
    expect(isPerpendicular([A, H], [D, C])).toBe(true);
    expect(H.y).toBe(D.y);
    expect(lengthOf([D, C])).toBe(DICH_SANG_PHAI);
    expect({ x: A.x + DICH_SANG_PHAI, y: A.y }).toEqual(B);
    expect({ x: D.x + DICH_SANG_PHAI, y: D.y }).toEqual(C);
    const rectangle = [A, B, { x: H.x + DICH_SANG_PHAI, y: H.y }, H];
    expect(polygonArea(rectangle)).toBe(polygonArea([A, B, C, D]));
    expect(polygonArea(rectangle)).toBe(DICH_SANG_PHAI * (H.y - A.y));
  });
});

describe("câu khởi động và câu thử", () => {
  it("điền số", () => {
    expect(blanks(find("kd-hinh", "dien-so"))).toEqual([2]);
    expect(blanks(find("thu-cat-ghep", "dien-so"))).toEqual([4]);
    expect(blanks(find("sn-duy-nhat", "dien-so"))).toEqual([1]);
  });

  it("trắc nghiệm", () => {
    expect(chosen(find("kd-vuong-goc", "trac-nghiem"))).toBe("Góc vuông");
    expect(chosen(find("kd-dung-cu", "trac-nghiem"))).toBe("Ê ke");
    expect(chosen(find("thu-hinh", "trac-nghiem"))).toBe("Hình bình hành");
  });
});
