import { formatNumber } from "@/lib/area-units";

const A = 46215;
const B = 893;

/** Ba cách đặt tính 46 215 + 893: A căn trái, B căn phải (đúng), C căn giữa. */
export const ALIGN_OPTIONS = [
  { label: "A", shift: -2, note: "căn trái" },
  { label: "B", shift: 0, note: "căn phải" },
  { label: "C", shift: -1, note: "căn giữa" },
] as const;

/** Số cột bị lùi sang trái so với hàng đơn vị (0 là thẳng hàng). */
function place(value: number, lean: number): (string | null)[] {
  const digits = String(value).split("");
  const start = 5 - digits.length + lean;
  return Array.from({ length: 5 }, (_, column) => digits[column - start] ?? null);
}

export function AlignOptions() {
  return (
    <svg
      viewBox="0 0 340 130"
      role="img"
      aria-label={`Ba cách đặt tính ${formatNumber(A)} + ${B}. A: ${B} viết sát bên trái. B: ${B} viết thẳng hàng với hàng đơn vị. C: ${B} viết ở giữa.`}
      className="block w-full"
      fontWeight={800}
      textAnchor="middle"
    >
      {ALIGN_OPTIONS.map((option, panel) => {
        const left = 8 + panel * 111;
        const cell = 18;
        const x = (column: number) => left + 14 + column * cell + cell / 2;
        return (
          <g key={option.label}>
            <rect x={left} y={4} width={104} height={122} rx={14} fill="var(--secondary)" />
            <text x={left + 52} y={26} fontSize={18} fill="var(--ink)">
              {option.label}
            </text>
            {place(A, 0).map((digit, column) =>
              digit ? (
                <text key={column} x={x(column)} y={56} fontSize={20} fill="var(--ink)">
                  {digit}
                </text>
              ) : null,
            )}
            {place(B, option.shift === 0 ? 0 : option.shift).map((digit, column) =>
              digit ? (
                <text key={column} x={x(column)} y={84} fontSize={20} fill="var(--ink)">
                  {digit}
                </text>
              ) : null,
            )}
            <rect x={left + 6} y={92} width={92} height={2.5} rx={1} fill="var(--ink)" />
            <text x={left + 8} y={84} fontSize={20} fill="var(--ink)">
              +
            </text>
          </g>
        );
      })}
    </svg>
  );
}
