import type { RaceCell } from "../bai-tap";

export type GameState = {
  phase: "setup" | "roll" | "moving" | "question" | "right" | "wrong" | "won";
  /** Vị trí từng người chơi: 0 là xuất phát, cells.length + 1 là đích. */
  positions: number[];
  current: number;
  /** Ô đứng trước lượt này, sai thì quay về đây. */
  turnStart: number;
  walkTo: number;
  dice: number | null;
  rollCount: number;
};

export type GameAction =
  | { type: "start"; players: number }
  | { type: "roll"; value: number }
  | { type: "tick" }
  | { type: "answer"; correct: boolean }
  | { type: "next-turn" }
  | { type: "reset" };

export const initialGame: GameState = {
  phase: "setup",
  positions: [],
  current: 0,
  turnStart: 0,
  walkTo: 0,
  dice: null,
  rollCount: 0,
};

function withPosition(state: GameState, position: number): number[] {
  return state.positions.map((value, index) => (index === state.current ? position : value));
}

export function gameReducer(state: GameState, action: GameAction, cells: RaceCell[]): GameState {
  const finish = cells.length + 1;

  switch (action.type) {
    case "start":
      return { ...initialGame, phase: "roll", positions: Array(action.players).fill(0) };

    case "roll": {
      if (state.phase !== "roll") return state;
      const from = state.positions[state.current];
      return {
        ...state,
        phase: "moving",
        turnStart: from,
        walkTo: Math.min(finish, from + action.value),
        dice: action.value,
        rollCount: state.rollCount + 1,
      };
    }

    case "tick": {
      if (state.phase !== "moving") return state;
      const position = state.positions[state.current];
      if (position !== state.walkTo) {
        return { ...state, positions: withPosition(state, position + Math.sign(state.walkTo - position)) };
      }
      if (position === finish) return { ...state, phase: "won" };
      const cell = cells[position - 1];
      if (cell.kind === "move") return { ...state, walkTo: position + cell.steps };
      return { ...state, phase: "question" };
    }

    case "answer":
      if (state.phase !== "question") return state;
      return { ...state, phase: action.correct ? "right" : "wrong" };

    case "next-turn": {
      if (state.phase !== "right" && state.phase !== "wrong") return state;
      const positions = state.phase === "wrong" ? withPosition(state, state.turnStart) : state.positions;
      return { ...state, phase: "roll", positions, current: (state.current + 1) % state.positions.length };
    }

    case "reset":
      return initialGame;
  }
}

/** Vị trí ô trên bàn cờ uốn lượn. Trả về cột và hàng, đếm từ 1. */
export function boardPosition(index: number, columns: number): { column: number; row: number } {
  const row = Math.floor(index / columns);
  const offset = index % columns;
  return { row: row + 1, column: (row % 2 === 0 ? offset : columns - 1 - offset) + 1 };
}
