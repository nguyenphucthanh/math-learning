export type KiemDemRow = { label: string; count: number; color?: string };

const GROUP_W = 46;
const ROW_H = 46;
const LABEL_W = 132;
const MAX_GROUPS = 6;

/** Số nhóm 5 đủ nét và số nét lẻ của một số lần: 9 = 5 + 4. */
export const tallySplit = (count: number) => ({ groups: Math.floor(count / 5), rest: count % 5 });

/** Vẽ nét kiểm đếm theo nhóm 5 như SGK: 4 nét đứng và 1 nét chéo gạch ngang qua. */
function Strokes({ count, x, y, color }: { count: number; x: number; y: number; color: string }) {
  const nodes = [];
  for (let i = 0; i < count; i += 1) {
    const gx = x + Math.floor(i / 5) * GROUP_W;
    const k = i % 5;
    nodes.push(
      k < 4 ? (
        <line key={i} x1={gx + 8 + k * 9} y1={y + 4} x2={gx + 8 + k * 9} y2={y + 34} stroke={color} strokeWidth={3.5} strokeLinecap="round" />
      ) : (
        <line key={i} x1={gx + 1} y1={y + 29} x2={gx + 41} y2={y + 9} stroke={color} strokeWidth={3.5} strokeLinecap="round" />
      ),
    );
  }
  return <>{nodes}</>;
}

/**
 * Bảng kiểm đếm: mỗi hàng một sự kiện, nét kiểm đếm theo nhóm 5. Không in số, con tự đọc.
 * `maxCount` giữ chiều rộng cố định khi số nét tăng dần (animation).
 * ponytail: tối đa 6 nhóm (30 lần) mỗi hàng, không xuống dòng.
 */
export function BangKiemDem({ rows, maxCount, className = "block w-full" }: { rows: KiemDemRow[]; maxCount?: number; className?: string }) {
  const most = maxCount ?? Math.max(...rows.map((row) => row.count), 5);
  const groups = Math.min(MAX_GROUPS, Math.max(1, Math.ceil(most / 5)));
  const width = LABEL_W + groups * GROUP_W + 4;
  const height = rows.length * ROW_H + 4;
  const summary = rows.map((row) => `${row.label}: ${row.count} nét`).join("; ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Bảng kiểm đếm. ${summary}`} className={className} fontWeight={800}>
      {rows.map((row, index) => {
        const y = index * ROW_H + 2;
        return (
          <g key={row.label}>
            <rect x={0} y={y} width={width} height={ROW_H - 4} rx={10} fill="var(--paper)" stroke="var(--input)" strokeWidth={1.5} />
            <text x={10} y={y + 28} fontSize={16} fill={row.color ?? "var(--ink)"}>
              {row.label}
            </text>
            <line x1={LABEL_W} y1={y + 4} x2={LABEL_W} y2={y + ROW_H - 8} stroke="var(--input)" strokeWidth={1.5} />
            <Strokes count={row.count} x={LABEL_W + 8} y={y} color="var(--ink)" />
          </g>
        );
      })}
    </svg>
  );
}
