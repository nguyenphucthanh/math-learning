import { Khung } from "@/components/math/khung";

/** Một băng giấy: các số liền nhau, mỗi ô hơn (hoặc kém) ô trước 1 đơn vị. Ô ở vị trí `hidden` ghi dấu "?". */
export type Bang = { from: number; step: 1 | -1; length: number; hidden: number[] };

/** Ba băng giấy của bài 1 tr. 129 (đổi số liệu). */
export const bangGiay: Bang[] = [
  { from: 26, step: -1, length: 5, hidden: [0, 1] },
  { from: 52, step: -1, length: 3, hidden: [0] },
  { from: 797, step: 1, length: 5, hidden: [2, 3, 4] },
];

export const valueAt = (bang: Bang, index: number) => bang.from + bang.step * index;

/** Các số bị che, theo thứ tự đọc từ trái sang phải, từ băng trên xuống băng dưới. */
export const hiddenValues = (bangs: Bang[]): number[] => bangs.flatMap((bang) => bang.hidden.map((index) => valueAt(bang, index)));

const CELL_W = 54;
const CELL_H = 44;
const GAP = 12;

export function BangGiay({ bangs = bangGiay }: { bangs?: Bang[] }) {
  const label = bangs
    .map((bang, row) => `Băng ${row + 1}: ${Array.from({ length: bang.length }, (_, i) => (bang.hidden.includes(i) ? "?" : valueAt(bang, i))).join(", ")}`)
    .join(". ");
  const width = Math.max(...bangs.map((bang) => bang.length)) * CELL_W;
  const height = bangs.length * (CELL_H + GAP) - GAP;
  return (
    <Khung maxWidth={340}>
      <svg viewBox={`-3 -3 ${width + 6} ${height + 6}`} role="img" aria-label={`Các băng giấy có số liền nhau. ${label}`} className="block w-full" fontWeight={800}>
        {bangs.map((bang, row) =>
          Array.from({ length: bang.length }, (_, i) => {
            const hidden = bang.hidden.includes(i);
            const x = i * CELL_W;
            const y = row * (CELL_H + GAP);
            return (
              <g key={`${row}-${i}`}>
                <rect x={x} y={y} width={CELL_W} height={CELL_H} fill={hidden ? "var(--sun)" : "white"} fillOpacity={hidden ? 0.5 : 1} stroke="var(--ink)" strokeWidth={3} />
                <text x={x + CELL_W / 2} y={y + CELL_H / 2 + 7} textAnchor="middle" fontSize={22} fill="var(--ink)" className="tabular-nums">
                  {hidden ? "?" : valueAt(bang, i)}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </Khung>
  );
}
