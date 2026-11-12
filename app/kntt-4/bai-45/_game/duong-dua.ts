import { formatNumber } from "@/lib/area-units";

export type Op = "+" | "−" | "×" | ":";

/** Một tấm bìa: phép tính ghi sẵn (`shown` có thể sai) và cách ước lượng phát hiện đúng/sai. */
export type Card = { id: string; a: number; op: Op; b: number; shown: number; estimate: string };

/** Mười tấm bìa của SGK trang 28. */
export const cards: Card[] = [
  { id: "c1", a: 3970, op: "+", b: 4980, shown: 9850, estimate: "Làm tròn 3 970 lên 4 000 và 4 980 lên 5 000: 4 000 + 5 000 = 9 000. Cả hai số đều làm tròn lên nên tổng thật bé hơn 9 000, mà 9 850 lớn hơn." },
  { id: "c2", a: 15, op: "×", b: 4, shown: 60, estimate: "Nhẩm 10 × 4 = 40 và 5 × 4 = 20, cộng lại được 60. Khớp với bìa." },
  { id: "c3", a: 7900, op: "−", b: 2000, shown: 5900, estimate: "Nhẩm 79 trăm − 20 trăm = 59 trăm, tức 5 900. Khớp với bìa." },
  { id: "c4", a: 821, op: ":", b: 39, shown: 19, estimate: "Làm tròn 39 lên 40 và 19 lên 20: 40 × 20 = 800. Vậy 39 × 19 bé hơn 800, bé hơn 821, nên thương không thể là 19." },
  { id: "c5", a: 5120, op: "+", b: 3010, shown: 7130, estimate: "Làm tròn 5 120 xuống 5 000 và 3 010 xuống 3 000: 5 000 + 3 000 = 8 000. Cả hai số đều làm tròn xuống nên tổng thật lớn hơn 8 000, mà 7 130 bé hơn." },
  { id: "c6", a: 51, op: "×", b: 103, shown: 4973, estimate: "Làm tròn 51 xuống 50 và 103 xuống 100: 50 × 100 = 5 000. Cả hai thừa số đều làm tròn xuống nên tích thật lớn hơn 5 000, mà 4 973 bé hơn." },
  { id: "c7", a: 8920, op: "−", b: 1170, shown: 8750, estimate: "Làm tròn 8 920 lên 9 000 và 1 170 xuống 1 000: 9 000 − 1 000 = 8 000. Số bị trừ làm tròn lên, số trừ làm tròn xuống nên hiệu thật bé hơn 8 000, mà 8 750 lớn hơn." },
  { id: "c8", a: 20, op: "×", b: 5, shown: 100, estimate: "2 chục × 5 = 10 chục, tức 100. Khớp với bìa." },
  { id: "c9", a: 4980, op: "+", b: 2970, shown: 8350, estimate: "Làm tròn 4 980 lên 5 000 và 2 970 lên 3 000: 5 000 + 3 000 = 8 000. Cả hai số đều làm tròn lên nên tổng thật bé hơn 8 000, mà 8 350 lớn hơn." },
  { id: "c10", a: 8000, op: ":", b: 2, shown: 4000, estimate: "8 nghìn chia 2 bằng 4 nghìn, tức 4 000. Khớp với bìa." },
];

/** Kết quả thật: với phép chia lấy thương nguyên (SGK cho phép dư). */
export function truth(card: Card): number {
  switch (card.op) {
    case "+": return card.a + card.b;
    case "−": return card.a - card.b;
    case "×": return card.a * card.b;
    case ":": return Math.floor(card.a / card.b);
  }
}

export const isRight = (card: Card) => truth(card) === card.shown;

export function exactText(card: Card): string {
  const value = formatNumber(truth(card));
  const rest = card.op === ":" ? card.a % card.b : 0;
  return rest ? `${value} (dư ${rest})` : value;
}

export function cardText(card: Card): string {
  return `${formatNumber(card.a)} ${card.op} ${formatNumber(card.b)} = ${formatNumber(card.shown)}`;
}

/** Số ô trên đường đua: ô 0 là xuất phát, ô TRACK là đích. */
export const TRACK = 6;

export type GameState = {
  phase: "setup" | "ask" | "feedback" | "won" | "lost";
  deck: Card[];
  index: number;
  position: number;
  /** Con vừa chọn đúng hay sai ở lượt trước. */
  moved: boolean;
};

export const initialGame: GameState = { phase: "setup", deck: [], index: 0, position: 0, moved: false };

export type GameAction = { type: "start"; deck: Card[] } | { type: "answer"; says: "dung" | "sai" } | { type: "next" } | { type: "reset" };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start":
      return { ...initialGame, phase: "ask", deck: action.deck };
    case "answer": {
      if (state.phase !== "ask") return state;
      const moved = (action.says === "dung") === isRight(state.deck[state.index]);
      return { ...state, phase: "feedback", moved, position: state.position + (moved ? 1 : 0) };
    }
    case "next": {
      if (state.phase !== "feedback") return state;
      if (state.position >= TRACK) return { ...state, phase: "won" };
      if (state.index + 1 >= state.deck.length) return { ...state, phase: "lost" };
      return { ...state, phase: "ask", index: state.index + 1 };
    }
    case "reset":
      return initialGame;
  }
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
