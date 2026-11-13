/** Số ô từ xuất phát đến đích của mỗi thỏ (SGK trang 44: 6 ô rồi đích). */
export const TRACK = 6;

export type Roll = [number, number];
export type Rabbit = "chan" | "le";

/** Gieo một xúc xắc; `rng` trả số trong [0, 1) để test được. */
export const rollDie = (rng: () => number) => Math.floor(rng() * 6) + 1;
export const rollTwo = (rng: () => number): Roll => [rollDie(rng), rollDie(rng)];

export const product = ([a, b]: Roll) => a * b;
export const rabbitOf = (roll: Roll): Rabbit => (product(roll) % 2 === 0 ? "chan" : "le");

/** Số lần mỗi thỏ tiến, cũng là số lần xuất hiện của mỗi sự kiện. */
export function tally(rolls: Roll[]) {
  const chan = rolls.filter((roll) => rabbitOf(roll) === "chan").length;
  return { chan, le: rolls.length - chan };
}

/** Thỏ đến đích trước, hoặc null nếu chưa ai tới. */
export function winner(rolls: Roll[]): Rabbit | null {
  const { chan, le } = tally(rolls);
  if (chan >= TRACK) return "chan";
  if (le >= TRACK) return "le";
  return null;
}

/** Thêm một lượt gieo; ván đã xong thì giữ nguyên. */
export const addRoll = (rolls: Roll[], roll: Roll): Roll[] => (winner(rolls) ? rolls : [...rolls, roll]);
