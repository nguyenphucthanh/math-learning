/** Băng giấy chia `parts` phần bằng nhau; `segs` là các đoạn đã tô (từ ô `from`, `n` ô). Server Component. */
export type Seg = { from: number; n: number; color: string; enter?: number };

export function BangGiay({ y, parts, segs = [], x = 10, w = 300 }: { y: number; parts: number; segs?: Seg[]; x?: number; w?: number }) {
  const cell = w / parts;
  return (
    <g>
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={x + i * cell} y={y} width={cell} height={30} fill="white" stroke="var(--ink)" strokeWidth={2} />
      ))}
      {segs.map((s, i) => (
        <rect key={i} data-enter={s.enter} x={x + s.from * cell} y={y} width={s.n * cell} height={30} fill={s.color} fillOpacity={0.65} stroke="var(--ink)" strokeWidth={2} />
      ))}
    </g>
  );
}
