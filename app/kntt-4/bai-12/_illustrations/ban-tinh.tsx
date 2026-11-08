import { formatNumber } from "@/lib/area-units";

const CLASSES = ["Lớp triệu", "Lớp nghìn", "Lớp đơn vị"];
const COL = 36;
const GAP = 12;
const BASE = 150;
const COIN = 9;

/** Bàn tính chín cột của một số đến 9 chữ số: số hạt trên mỗi cột là chữ số của hàng đó, cột không có hạt là chữ số 0. */
export function BanTinh({ value }: { value: number }) {
  const digits = String(value).padStart(9, "0").split("").map(Number);
  const label = `Bàn tính chín cột, số hạt từ trái sang phải: ${digits.join(", ")}. Lớp triệu ${digits.slice(0, 3).join(", ")}; lớp nghìn ${digits.slice(3, 6).join(", ")}; lớp đơn vị ${digits.slice(6).join(", ")} (số ${formatNumber(value)})`;

  return (
    <svg viewBox="0 0 360 214" role="img" aria-label={label} className="block w-full" fontWeight={800}>
      {CLASSES.map((name, c) => {
        const x0 = 6 + c * (3 * COL + GAP);
        return (
          <g key={name}>
            <rect x={x0} y={BASE} width={3 * COL} height={56} rx={8} fill="white" stroke="var(--ink)" strokeWidth={3} />
            <text x={x0 + (3 * COL) / 2} y={BASE + 34} textAnchor="middle" fontSize={15} fill="var(--ink)">
              {name}
            </text>
            {[0, 1, 2].map((r) => {
              const count = digits[c * 3 + r];
              const cx = x0 + r * COL + COL / 2;
              return (
                <g key={r}>
                  <line x1={cx} y1={14} x2={cx} y2={BASE} stroke="var(--input)" strokeWidth={5} strokeLinecap="round" />
                  {Array.from({ length: count }, (_, k) => (
                    <ellipse
                      key={k}
                      cx={cx}
                      cy={BASE - 6 - k * COIN}
                      rx={14}
                      ry={5}
                      fill="var(--sun)"
                      stroke="var(--ink)"
                      strokeWidth={2}
                      data-coin=""
                    />
                  ))}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
