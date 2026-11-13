const BASE = 170;
const UNIT = 120; // 1 m
const bar = (x: number, m: number, nodes: number[]) => (
  <g>
    <rect x={x} y={BASE - m * UNIT} width={40} height={m * UNIT} fill="var(--good)" fillOpacity={0.55} stroke="var(--ink)" strokeWidth={2.5} />
    {nodes.map((n) => (
      <line key={n} x1={x} x2={x + 40} y1={BASE - n * UNIT} y2={BASE - n * UNIT} stroke="var(--ink)" strokeWidth={2.5} />
    ))}
  </g>
);

/** Ba đoạn tre A (1 m, 3 đốt bằng nhau), B (cao bằng 2 đốt của A), C (2 đốt bằng nhau, đốt dưới cao bằng B). Vẽ đúng tỉ lệ. Server Component. */
export function Tre() {
  return (
    <svg viewBox="0 0 300 200" role="img" aria-label="Ba đoạn tre: A dài 1 m có 3 đốt bằng nhau, B cao bằng 2 đốt của A, C có 2 đốt bằng nhau và đốt dưới cao bằng B" className="mx-auto block w-full max-w-sm" fontWeight={800}>
      {bar(50, 1, [1 / 3, 2 / 3])}
      {bar(130, 2 / 3, [])}
      {bar(210, 4 / 3, [2 / 3])}
      <line x1={90} x2={210} y1={BASE - 80} y2={BASE - 80} stroke="var(--ink)" strokeWidth={2} strokeDasharray="5 4" />
      <g fontSize={18} textAnchor="middle" fill="var(--ink)">
        <text x={70} y={192}>A</text>
        <text x={150} y={192}>B</text>
        <text x={230} y={192}>C</text>
      </g>
      <text x={46} y={BASE - 56} fontSize={14} textAnchor="end" fill="var(--foreground)">1 m</text>
    </svg>
  );
}
