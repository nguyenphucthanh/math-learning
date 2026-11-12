import type { ChoiceQuestion, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { describe, expect, it } from "vitest";
import { exerciseGroups, quickChecks, trueFalse, warmUps } from "./bai-tap";

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

  it("3 câu khởi động và 3 nhóm bài tập", () => {
    expect(warmUps).toHaveLength(3);
    expect(exerciseGroups.map((group) => [group.id, group.questions.length])).toEqual([
      ["hoat-dong", 7],
      ["luyen-tap", 7],
      ["suy-nghi-them", 3],
    ]);
  });
});

describe("đặt tính nhân", () => {
  it("đáp án đúng bằng phép nhân", () => {
    const expected: Record<string, [number, number]> = {
      "hd-1a": [18296, 3],
      "hd-1b": [50407, 6],
      "hd-1c": [213645, 2],
      "lt-1a": [36208, 5],
      "lt-1b": [47315, 4],
      "lt-1c": [182436, 3],
    };
    for (const [id, [a, b]] of Object.entries(expected)) {
      const question = find(id, "dien-so");
      expect(answers(id), id).toEqual([a * b]);
      expect(question.parts[0], id).toBe(`${formatNumber(a)} × ${b} =`);
    }
    expect(answers("hd-1a")).toEqual([54888]);
    expect(answers("hd-1b")).toEqual([302442]);
    expect(answers("hd-1c")).toEqual([427290]);
    expect(answers("lt-1a")).toEqual([181040]);
    expect(answers("lt-1b")).toEqual([189260]);
    expect(answers("lt-1c")).toEqual([547308]);
  });

  it("các bài có số 0 kèm số nhớ, kết quả có nhiều chữ số hơn thừa số", () => {
    expect(String(18296 * 3).length).toBe(5);
    expect(String(213645 * 2).length).toBe(6);
    expect(String(50407 * 6)).toBe("302442");
  });
});

describe("Đúng, sai", () => {
  it("đáp án tính lại từ phép nhân", () => {
    expect(chosen("hd-2a")).toBe("Sai");
    expect(21070 * 4).toBe(84280);
    expect(chosen("hd-2b")).toBe("Đúng");
    expect(36400 * 5).toBe(182000);
    expect(chosen("hd-2c")).toBe("Sai");
    expect(150000 * 4).toBe(600000);
  });

  it("trueFalse: kết quả đúng thì chọn Đúng, kết quả sai thì chọn Sai", () => {
    const right = trueFalse("x", 12, 3, 36) as ChoiceQuestion;
    const wrong = trueFalse("y", 12, 3, 35) as ChoiceQuestion;
    expect(right.options[right.answerIndex]).toBe("Đúng");
    expect(wrong.options[wrong.answerIndex]).toBe("Sai");
  });
});

describe("bài toán và biểu thức", () => {
  it("quạt: gấp 3 lần là nhân 3", () => {
    const question = find("hd-3", "loi-van") as WordQuestion;
    expect(question.lines.map(blankAnswers)).toEqual([[18250 * 3]]);
    expect(18250 * 3).toBe(54750);
  });

  it("truyện: mua 3 quyển rồi trừ, còn 15 000 đồng", () => {
    expect(150000 - 3 * 45000).toBe(15000);
    expect(chosen("lt-2")).toBe(`${formatNumber(15000)} đồng`);
    const question = find("lt-2", "trac-nghiem");
    // 105 000 là trừ một quyển; 135 000 là quên trừ.
    expect(question.options).toContain(`${formatNumber(150000 - 45000)} đồng`);
    expect(question.options).toContain(`${formatNumber(3 * 45000)} đồng`);
  });

  it("biểu thức: nhân trước, rồi cộng hoặc trừ", () => {
    expect(answers("lt-3a")).toEqual([350126 + 41305 * 2]);
    expect(answers("lt-3b")).toEqual([705400 - 32150 * 5]);
    expect(answers("lt-3a")).toEqual([432736]);
    expect(answers("lt-3b")).toEqual([544650]);
    // Cộng trước nhân sau cho kết quả khác: đây là lỗi con hay mắc.
    expect((350126 + 41305) * 2).not.toBe(432736);
  });

  it("bàn cờ: ô 15 → ô 17 là hai lần gấp đôi", () => {
    expect(16384).toBe(2 ** 14);
    expect(answers("lt-4")).toEqual([16384 * 2 * 2]);
    expect(answers("lt-4")).toEqual([65536]);
  });
});

describe("khởi động và câu thử", () => {
  it("đáp án tính lại", () => {
    expect(answers("kd-bang-nhan")).toEqual([7 * 6, (7 * 6) % 10, Math.floor((7 * 6) / 10)]);
    expect(answers("kd-nhan-nho")).toEqual([4108 * 6]);
    expect(chosen("kd-doc-so")).toBe("một trăm sáu mươi nghìn một trăm bốn mươi");
    expect(answers("thu-ngay")).toEqual([25140 * 5]);
    expect(answers("thu-chu-so-khong")).toEqual([20906 * 5]);
    expect(answers("thu-chu-so-khong")).toEqual([104530]);
  });
});

describe("suy nghĩ thêm", () => {
  it("lỗi của Mai: quên số nhớ 2 ở hàng chục", () => {
    expect(50806 * 4).toBe(203224);
    // Cột đơn vị: 6 × 4 = 24, viết 4 nhớ 2. Quên nhớ thì hàng chục viết 0 thay vì 2, kém 2 chục.
    expect(203224 - 203204).toBe(20);
    expect(chosen("sn-1")).toContain("203 224");
  });

  it("ước lượng: 30 906 × 7 gần 210 000", () => {
    expect(chosen("sn-2")).toBe("210 000");
    expect(30906 * 7).toBe(216342);
    for (const option of [21000, 2100000]) {
      expect(Math.abs(30906 * 7 - option)).toBeGreaterThan(Math.abs(30906 * 7 - 210000));
    }
  });

  it("70 305 × 6: hàng nghìn viết 1", () => {
    expect(chosen("sn-3")).toBe("1");
    expect(String(70305 * 6)).toBe("421830");
    expect(String(70305 * 6)[2]).toBe("1");
  });
});
