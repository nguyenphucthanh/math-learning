/** Một băng giấy chia `parts` phần bằng nhau, tô `filled` phần đầu. Là phần tử `<g>` bên trong SVG. */
export function Bang({ x, y, w, h, parts, filled, color, dashed = 0, hidden = false }: {
  x: number;
  y: number;
  w: number;
  h: number;
  parts: number;
  filled: number;
  color: string;
  /** Số nét đứt chia đôi mỗi phần (0 hoặc 1). */
  dashed?: number;
  hidden?: boolean;
}) {
  const cell = w / parts;
  return (
    <g className={hidden ? "invisible" : undefined}>
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={x + i * cell} y={y} width={cell} height={h} fill={i < filled ? color : "white"} fillOpacity={i < filled ? 0.55 : 1} stroke="var(--ink)" strokeWidth={2} />
      ))}
      {dashed
        ? Array.from({ length: parts }, (_, i) => (
            <line key={`d${i}`} x1={x + i * cell + cell / 2} y1={y} x2={x + i * cell + cell / 2} y2={y + h} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3" />
          ))
        : null}
    </g>
  );
}

const TOP = "var(--unit-tan)";
const BOTTOM = "var(--unit-mm2)";

/** Hai băng giấy như nhau cho câu bài tập. Băng dưới có thể chưa tô (`bottomFilled` = 0). */
export function HaiBang({ top, bottom }: { top: [number, number]; bottom: [number, number] }) {
  return (
    <svg viewBox="0 0 340 120" role="img" aria-label={`Hai băng giấy như nhau. Băng trên chia ${top[1]} phần bằng nhau, tô ${top[0]} phần. Băng dưới chia ${bottom[1]} phần bằng nhau, tô ${bottom[0]} phần.`} className="mx-auto block w-full max-w-sm" fontWeight={800}>
      <text x={4} y={16} fontSize={14} fill="var(--foreground)">Băng trên</text>
      <Bang x={10} y={22} w={240} h={30} parts={top[1]} filled={top[0]} color={TOP} />
      <text x={4} y={76} fontSize={14} fill="var(--foreground)">Băng dưới</text>
      <Bang x={10} y={82} w={240} h={30} parts={bottom[1]} filled={bottom[0]} color={BOTTOM} />
    </svg>
  );
}
