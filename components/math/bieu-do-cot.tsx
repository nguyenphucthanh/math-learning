import { formatNumber } from "@/lib/area-units";

export type Cot = {
  label: string;
  /** null: cột chưa vẽ, hiện dấu "?". */
  value: number | null;
  /** Không ghi số ở đỉnh cột (con tự đọc theo vạch). */
  hideValue?: boolean;
};

export type BieuDoCotProps = {
  title: string;
  /** Tên trục đứng, ví dụ "Bạn". */
  axisLabel: string;
  /** Khoảng cách giữa hai vạch và vạch cao nhất. */
  step: number;
  max: number;
  data: Cot[];
  /** Dùng cho animation: 1 trục và vạch, 2 tên cột (hàng dưới), 3 cột, 4 số ở đỉnh cột. Bỏ trống là hiện hết. */
  stage?: number;
};

const W = 360;
const LEFT = 52;
const RIGHT = 10;
const PLOT_H = 150;

/** Ngắt tiêu đề thành tối đa hai dòng, mỗi dòng không quá `limit` ký tự. */
export function wrapTitle(title: string, limit = 26): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of title.split(" ")) {
    if (line && `${line} ${word}`.length > limit) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  return [...lines, line];
}

/** Chiều cao cột (px) theo số liệu: dùng để test tỉ lệ. */
export function barHeight(value: number, max: number): number {
  return Math.round((value / max) * PLOT_H * 10) / 10;
}

/** Biểu đồ cột SVG. Server Component, dùng lại ở animation, bài tập và các bài thống kê sau. */
export function BieuDoCot({ title, axisLabel, step, max, data, stage }: BieuDoCotProps) {
  const s = stage ?? 99;
  const lines = wrapTitle(title);
  const top = 12 + lines.length * 18 + 38;
  const base = top + PLOT_H;
  const height = base + 46;
  const pitch = (W - LEFT - RIGHT) / data.length;
  const barW = Math.round(pitch * 0.6 * 10) / 10;
  const y = (v: number) => Math.round((base - (v / max) * PLOT_H) * 10) / 10;
  const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);
  const aria = data.map((d) => `${d.label} ${d.value === null ? "chưa vẽ" : d.hideValue ? "chưa ghi số" : d.value}`).join("; ");

  return (
    <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={`${title}. Trục đứng (${axisLabel}) từ 0 đến ${max}, mỗi vạch ${step}. ${aria}.`} className="block w-full">
      {lines.map((line, i) => (
        <text key={i} x={W / 2} y={22 + i * 18} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
          {line}
        </text>
      ))}
      {s >= 1 ? (
        <g data-enter={1}>
          <text x={4} y={top - 20} fontSize={14} fontWeight={800} fill="var(--ink)">
            ({axisLabel})
          </text>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={LEFT} x2={W - RIGHT} y1={y(t)} y2={y(t)} stroke={t === 0 ? "var(--ink)" : "var(--input)"} strokeWidth={t === 0 ? 2 : 1} />
              <text x={LEFT - 6} y={y(t) + 5} textAnchor="end" fontSize={14} fontWeight={800} fill="var(--ink)" className="tabular-nums">
                {formatNumber(t)}
              </text>
            </g>
          ))}
          <line x1={LEFT} x2={LEFT} y1={top} y2={base} stroke="var(--ink)" strokeWidth={2} />
        </g>
      ) : null}
      {data.map((d, i) => {
        const cx = Math.round((LEFT + pitch * (i + 0.5)) * 10) / 10;
        const parts = d.label.split(" ");
        const rows = parts.length > 1 ? [parts[0], parts.slice(1).join(" ")] : parts;
        return (
          <g key={i}>
            {s >= 2
              ? rows.map((row, r) => (
                  <text key={r} data-enter={2} x={cx} y={base + 18 + r * 17} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
                    {row}
                  </text>
                ))
              : null}
            {s >= 3 && d.value !== null ? (
              <rect data-enter={3} data-testid={`cot-${i}`} x={cx - barW / 2} y={y(d.value)} width={barW} height={barHeight(d.value, max)} rx={3} fill="var(--unit-second)" stroke="var(--ink)" strokeWidth={1.5} />
            ) : null}
            {s >= 3 && d.value === null ? (
              <text data-enter={3} x={cx} y={base - 10} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
                ?
              </text>
            ) : null}
            {s >= 4 && d.value !== null && !d.hideValue ? (
              <text data-enter={4} x={cx} y={y(d.value) - 6} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)" className="tabular-nums">
                {formatNumber(d.value)}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
