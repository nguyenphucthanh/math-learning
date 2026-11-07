import { formatNumber } from "@/lib/area-units";

/**
 * Cành tre có các đốt ghi số. Cào cào đứng ở đốt đầu và nhảy các bước, mỗi bước qua `over` đốt.
 * `values` là số ghi trên từng đốt, từ trái sang phải.
 */
export function Bamboo({ values, over = 2 }: { values: number[]; over?: number }) {
  const step = over + 1;
  const width = 340;
  const left = 26;
  const gap = (width - 2 * left) / (values.length - 1);
  const x = (index: number) => Math.round(left + index * gap);
  const landings: number[] = [];
  for (let at = step; at < values.length; at += step) landings.push(at);

  return (
    <svg
      viewBox="0 0 340 190"
      role="img"
      aria-label={`Cành tre có ${values.length} đốt ghi ${values.map(formatNumber).join(", ")}. Cào cào đứng ở đốt ${formatNumber(values[0])}, nhảy ${landings.length} bước, mỗi bước qua ${over} đốt tre.`}
      className="block w-full"
      fontWeight={800}
      textAnchor="middle"
    >
      <rect x={6} y={96} width={328} height={22} rx={11} fill="oklch(0.78 0.14 140)" />
      {values.map((value, index) => (
        <g key={value}>
          <rect x={x(index) - 3} y={92} width={6} height={30} rx={3} fill="oklch(0.55 0.13 140)" />
          <text x={x(index)} y={index % 2 === 0 ? 144 : 82} fontSize={14} fill="var(--ink)">
            {formatNumber(value)}
          </text>
        </g>
      ))}
      {[0, ...landings.slice(0, -1)].map((from, jump) => {
        const to = landings[jump];
        return (
          <path
            key={from}
            d={`M${x(from)} 92 Q${(x(from) + x(to)) / 2} 22 ${x(to)} 90`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={2.5}
            strokeDasharray="6 5"
          />
        );
      })}
      <ellipse cx={x(0)} cy={86} rx={14} ry={7} fill="oklch(0.6 0.16 140)" />
      <circle cx={x(0) + 12} cy={80} r={5} fill="oklch(0.6 0.16 140)" />
    </svg>
  );
}
