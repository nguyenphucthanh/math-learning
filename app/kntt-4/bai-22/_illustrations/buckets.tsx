import { formatNumber } from "@/lib/area-units";

export type Bucket = { label: string; first: number; second: number };

/** Ba xô sữa, mỗi xô ghi một phép cộng (số mi-li-lít). Không ghi kết quả. */
export function Buckets({ buckets }: { buckets: Bucket[] }) {
  const description = buckets
    .map((bucket) => `Xô ${bucket.label}: ${formatNumber(bucket.first)} cộng ${formatNumber(bucket.second)}`)
    .join("; ");
  return (
    <svg viewBox="0 0 340 150" role="img" aria-label={description} className="block w-full" fontWeight={800} textAnchor="middle">
      {buckets.map((bucket, index) => {
        const cx = 56 + index * 114;
        return (
          <g key={bucket.label}>
            <path d={`M${cx - 38} 18 Q${cx} -6 ${cx + 38} 18`} fill="none" stroke="var(--input)" strokeWidth={4} />
            <path d={`M${cx - 46} 20 H${cx + 46} L${cx + 38} 108 Q${cx} 116 ${cx - 38} 108 Z`} fill="white" stroke="var(--ink)" strokeWidth={3} />
            <text x={cx} y={56} fontSize={18} fill="var(--ink)">
              {formatNumber(bucket.first)}
            </text>
            <text x={cx} y={84} fontSize={18} fill="var(--ink)">
              + {formatNumber(bucket.second)}
            </text>
            <text x={cx} y={140} fontSize={20} fill="var(--ink)">
              {bucket.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
