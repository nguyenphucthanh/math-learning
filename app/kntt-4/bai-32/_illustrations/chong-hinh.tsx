import { Khung } from "@/components/math/khung";

export type MiengDan = "tron" | "thoi" | "tam-giac" | "chu-nhat";

export const tenMieng: Record<MiengDan, string> = {
  tron: "hình tròn",
  thoi: "hình thoi",
  "tam-giac": "hình tam giác",
  "chu-nhat": "hình chữ nhật",
};

/** Hộp bao [x1, y1, x2, y2] của mỗi miếng dán trong ô 150 x 120. Cố định chỗ, chỉ đổi thứ tự dán. */
export const hopBao: Record<MiengDan, [number, number, number, number]> = {
  "chu-nhat": [20, 25, 80, 75],
  thoi: [43, 12, 107, 88],
  "tam-giac": [75, 52, 135, 102],
  tron: [26, 61, 74, 109],
};

const colors: Record<MiengDan, string> = {
  tron: "var(--sun)",
  thoi: "var(--unit-century)",
  "tam-giac": "var(--unit-ta)",
  "chu-nhat": "var(--unit-second)",
};

function Mieng({ name }: { name: MiengDan }) {
  const common = { fill: colors[name], stroke: "var(--ink)", strokeWidth: 2, strokeLinejoin: "round" as const };
  if (name === "tron") return <circle cx={50} cy={85} r={24} {...common} />;
  if (name === "thoi") return <polygon points="75,12 107,50 75,88 43,50" {...common} />;
  if (name === "tam-giac") return <polygon points="75,102 135,102 105,52" {...common} />;
  return <rect x={20} y={25} width={60} height={50} {...common} />;
}

const mienDan = (order: MiengDan[]) => order.map((name) => <Mieng key={name} name={name} />);

const CELL_W = 150;
const CELL_H = 120;
const LETTERS = ["A", "B", "C", "D"];

/** Bốn cách dán A, B, C, D. Mỗi cách là thứ tự dán từ miếng dán đầu tiên (nằm dưới cùng) đến miếng dán cuối (nằm trên cùng). */
export function BonCachDan({ options }: { options: MiengDan[][] }) {
  return (
    <Khung maxWidth={360}>
      <svg
        viewBox="0 0 330 290"
        role="img"
        aria-label={`Bốn cách dán A, B, C, D. ${options.map((order, index) => `${LETTERS[index]}: dán lần lượt ${order.map((name) => tenMieng[name]).join(", ")}`).join(". ")}`}
        className="block w-full"
        fontWeight={800}
      >
        {options.map((order, index) => {
          const x = 10 + (index % 2) * 160;
          const y = 8 + Math.floor(index / 2) * 140;
          return (
            <g key={LETTERS[index]} transform={`translate(${x} ${y})`}>
              <rect x={0} y={0} width={CELL_W} height={CELL_H} rx={14} fill="var(--paper)" stroke="var(--input)" strokeWidth={2} />
              {mienDan(order)}
              <text x={10} y={20} fontSize={18} fill="var(--ink)">
                {LETTERS[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
