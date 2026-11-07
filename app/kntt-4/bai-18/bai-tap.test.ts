import { describe, expect, it } from "vitest";
import type { FillQuestion, Question } from "@/components/exercises/types";
import { convertArea } from "@/lib/area-units";
import { boardPosition, gameReducer, initialGame, type GameAction, type GameState } from "./_game/game-logic";
import { exerciseGroups, quickChecks, raceCells } from "./bai-tap";

const questions: Question[] = [...exerciseGroups.flatMap((group) => group.questions), ...Object.values(quickChecks)];

function find<K extends Question["kind"]>(id: string, kind: K) {
  const question = questions.find((item) => item.id === id);
  if (question?.kind !== kind) throw new Error(`Không tìm thấy ${kind} ${id}`);
  return question as Extract<Question, { kind: K }>;
}

function blanks(question: FillQuestion): number[] {
  return question.parts.flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
}

describe("dữ liệu bài tập", () => {
  it("không trùng id", () => {
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mỗi câu đổi đơn vị có đáp án tính lại đúng", () => {
    const conversions = questions.filter((q): q is FillQuestion => q.kind === "dien-so" && !!q.conversion);
    expect(conversions.length).toBeGreaterThanOrEqual(14);
    for (const question of conversions) {
      const { source, to } = question.conversion!;
      expect(blanks(question), question.id).toEqual([convertArea(source, to)]);
    }
  });

  it("đáp án đổi đơn vị khớp bảng đã duyệt trong brief", () => {
    const expected: Record<string, number> = {
      "dm2-1": 400, "dm2-2": 7, "dm2-3": 530, "dm2-4": 306,
      "m2-1": 200, "m2-2": 8, "m2-3": 240, "m2-4": 607,
      "mm2-1": 300, "mm2-2": 4, "mm2-3": 260, "mm2-4": 903,
    };
    for (const [id, answer] of Object.entries(expected)) {
      expect(blanks(find(id, "dien-so")), id).toEqual([answer]);
    }
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

  it("câu so sánh diện tích: đáp án khớp số đo trên hình", () => {
    const question = find("dm2-so-sanh", "trac-nghiem");
    const [square, rectangle] = question.figure!.shapes;
    expect(square.width * square.height).toBe(900);
    expect(rectangle.width * rectangle.height).toBe(1000);
    expect(question.options[question.answerIndex]).toContain("bé hơn");
  });

  it("câu ba căn phòng: chỉ phòng được chọn có diện tích khác", () => {
    const question = find("lt-phong", "trac-nghiem");
    const areas = question.figure!.shapes.map((shape) => shape.width * shape.height);
    expect(areas).toEqual([40, 40, 42]);
    expect(question.answerIndex).toBe(2);
  });

  it("bài lát sàn: các bước tính đúng", () => {
    const question = find("lt-lat-san", "loi-van");
    const answers = question.lines.flat().flatMap((part) => (typeof part === "string" ? [] : [part.answer]));
    expect(answers).toEqual([2 * 2, convertArea("4 m²", "dm²"), 4 * 1, 400 / 4]);
  });
});

describe("đường đua số đo", () => {
  it("có 22 ô và đáp án tính lại đúng", () => {
    expect(raceCells).toHaveLength(22);
    for (const cell of raceCells) {
      if (cell.kind === "question") expect(cell.answer, cell.source).toBe(convertArea(cell.source, cell.to));
    }
  });

  it("đáp án khớp đúng bảng trong brief", () => {
    const answers = raceCells.map((cell) => (cell.kind === "question" ? cell.answer : `move${cell.steps}`));
    expect(answers).toEqual([
      100, 200, 500, "move1", 103, "move-3", 400, 600, 70000, 100, "move-2", "move2",
      400, 1, "move1", 800, "move3", "move-2", 1, 300, 115, 400,
    ]);
  });

  it("ô di chuyển luôn dẫn tới ô câu hỏi, không tạo vòng lặp", () => {
    raceCells.forEach((cell, index) => {
      if (cell.kind !== "move") return;
      const target = raceCells[index + cell.steps];
      expect(target?.kind, `ô ${index + 1}`).toBe("question");
    });
  });
});

function play(state: GameState, ...actions: GameAction[]): GameState {
  return actions.reduce((next, action) => gameReducer(next, action, raceCells), state);
}

function walk(state: GameState): GameState {
  let next = state;
  for (let i = 0; i < 30 && next.phase === "moving"; i += 1) next = play(next, { type: "tick" });
  return next;
}

describe("luật trò chơi", () => {
  const started = play(initialGame, { type: "start", players: 2 });

  it("đến ô câu hỏi thì dừng để trả lời", () => {
    const state = walk(play(started, { type: "roll", value: 2 }));
    expect(state.positions[0]).toBe(2);
    expect(state.phase).toBe("question");
  });

  it("ô Tiến đi tiếp tới ô câu hỏi", () => {
    const state = walk(play(started, { type: "roll", value: 4 }));
    expect(state.positions[0]).toBe(5);
    expect(state.phase).toBe("question");
  });

  it("ô Lùi đi lùi tới ô câu hỏi", () => {
    const state = walk(play(started, { type: "roll", value: 6 }));
    expect(state.positions[0]).toBe(3);
    expect(state.phase).toBe("question");
  });

  it("trả lời đúng thì đứng yên và đổi lượt", () => {
    const state = play(walk(play(started, { type: "roll", value: 2 })), { type: "answer", correct: true }, { type: "next-turn" });
    expect(state.positions).toEqual([2, 0]);
    expect(state.current).toBe(1);
  });

  it("trả lời sai thì về ô đứng trước lượt đó, không về xuất phát", () => {
    const afterFirst = play(walk(play(started, { type: "roll", value: 3 })), { type: "answer", correct: true }, { type: "next-turn" });
    const afterSecond = play(walk(play(afterFirst, { type: "roll", value: 1 })), { type: "answer", correct: true }, { type: "next-turn" });
    const wrong = play(walk(play(afterSecond, { type: "roll", value: 2 })), { type: "answer", correct: false }, { type: "next-turn" });
    expect(wrong.positions).toEqual([3, 1]);
  });

  it("gieo vượt đích vẫn tính là về đích", () => {
    const near: GameState = { ...started, positions: [22, 0] };
    const state = walk(play(near, { type: "roll", value: 6 }));
    expect(state.positions[0]).toBe(23);
    expect(state.phase).toBe("won");
  });

  it("không gieo được khi đang chờ trả lời", () => {
    const waiting = walk(play(started, { type: "roll", value: 2 }));
    expect(play(waiting, { type: "roll", value: 6 })).toBe(waiting);
  });
});

describe("bàn cờ uốn lượn", () => {
  it("ô liền kề luôn nằm cạnh nhau ở cả hai cách chia cột", () => {
    for (const columns of [4, 6]) {
      for (let index = 0; index < 23; index += 1) {
        const a = boardPosition(index, columns);
        const b = boardPosition(index + 1, columns);
        expect(Math.abs(a.column - b.column) + Math.abs(a.row - b.row)).toBe(1);
      }
    }
  });
});
