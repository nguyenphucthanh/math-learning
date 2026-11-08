import { formatNumber } from "@/lib/area-units";

const CLASSES = [
  { name: "Lớp triệu", rows: ["Trăm", "Chục", "Triệu"] },
  { name: "Lớp nghìn", rows: ["Trăm", "Chục", "Nghìn"] },
  { name: "Lớp đơn vị", rows: ["Trăm", "Chục", "Đơn vị"] },
];
const COL = 46;
const GAP = 8;

/**
 * Bảng hàng và lớp của một số đến 9 chữ số. `mark` là các vị trí chữ số cần tô vàng, đếm từ hàng đơn vị (0).
 * Ô của hàng không có chữ số để trống.
 */
export function BangHangLop({ value, mark = [] }: { value: number; mark?: number[] }) {
  const digits = String(value).padStart(9, " ").split("");
  const read = (from: number) => digits.slice(from, from + 3).join("").trim().split("").join(", ");
  const label = `Bảng hàng và lớp của số ${formatNumber(value)}: lớp triệu ${read(0) || "trống"}; lớp nghìn ${read(3) || "trống"}; lớp đơn vị ${read(6)}`;

  return (
    <svg viewBox="0 0 440 118" role="img" aria-label={label} className="block w-full" fontWeight={800}>
      {CLASSES.map((cls, c) => {
        const x0 = 4 + c * (3 * COL + GAP);
        return (
          <g key={cls.name}>
            <rect x={x0} y={2} width={3 * COL} height={28} rx={6} fill="var(--ink)" />
            <text x={x0 + (3 * COL) / 2} y={22} textAnchor="middle" fontSize={15} fill="white">
              {cls.name}
            </text>
            {cls.rows.map((row, r) => {
              const index = c * 3 + r;
              const digit = digits[index];
              const fromRight = 8 - index;
              const x = x0 + r * COL;
              const marked = mark.includes(fromRight);
              return (
                <g key={row + r}>
                  {row === "Đơn vị" ? (
                    <text x={x + COL / 2} y={44} textAnchor="middle" fontSize={14} fill="var(--ink)">
                      <tspan x={x + COL / 2}>Đơn</tspan>
                      <tspan x={x + COL / 2} dy={14}>
                        vị
                      </tspan>
                    </text>
                  ) : (
                    <text x={x + COL / 2} y={44} textAnchor="middle" fontSize={14} fill="var(--ink)">
                      {row}
                    </text>
                  )}
                  <rect
                    x={x + 2}
                    y={66}
                    width={COL - 4}
                    height={46}
                    rx={6}
                    fill={marked ? "var(--sun)" : "white"}
                    stroke="var(--ink)"
                    strokeWidth={3}
                  />
                  <text x={x + COL / 2} y={98} textAnchor="middle" fontSize={26} fill="var(--ink)" className="tabular-nums">
                    {digit.trim()}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
