import { formatNumber } from "@/lib/area-units";

const CIRCLED = ["①", "②", "③", "④"];
const X0 = 30;
const SPAN = 300;

/**
 * Tia số có các vạch cách đều. Vạch có số thì ghi số, vạch cần điền (`null`) ghi ①, ②, ...
 * Đáp án nhập ở các ô bên dưới đề.
 */
export function TiaSoHinh({ ticks }: { ticks: (number | null)[] }) {
  let unknown = 0;
  const gap = SPAN / (ticks.length - 1);
  const known = ticks.filter((tick): tick is number => tick !== null).map(formatNumber);

  return (
    <svg
      viewBox="0 0 360 76"
      role="img"
      aria-label={`Tia số có ${ticks.length} vạch. Các số đã cho: ${known.join(", ")}. Các vạch còn lại cần điền, đánh số từ ① trở đi`}
      className="mx-auto block w-full max-w-md"
      fontWeight={800}
    >
      <line x1={8} y1={30} x2={346} y2={30} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      <path d="M338 22 L350 30 L338 38" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {ticks.map((tick, index) => {
        const x = Math.round(X0 + index * gap);
        const label = tick === null ? CIRCLED[unknown++] : formatNumber(tick);
        return (
          <g key={index}>
            <line x1={x} y1={22} x2={x} y2={38} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
            {tick === null ? (
              <>
                <rect x={x - 18} y={46} width={36} height={26} rx={7} fill="var(--sun)" />
                <text x={x} y={65} textAnchor="middle" fontSize={18} fill="var(--ink)">
                  {label}
                </text>
              </>
            ) : (
              <text x={x} y={64} textAnchor="middle" fontSize={14} fill="var(--foreground)">
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
