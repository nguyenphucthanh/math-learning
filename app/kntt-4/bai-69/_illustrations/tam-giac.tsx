/** Dải hình vuông, mỗi hình chia bởi một đường chéo thành 2 tam giác nhỏ bằng nhau. `to` là chỉ số các tam giác đã tô (0..2n-1). */
export function DaiTamGiac({ squares, to }: { squares: number; to: number[] }) {
  const size = 44;
  const x0 = 6;
  const shaded = new Set(to);
  return (
    <svg viewBox={`0 0 ${x0 * 2 + squares * size} ${size + 12}`} role="img" aria-label={`Hình gồm ${squares * 2} tam giác nhỏ bằng nhau, đã tô màu ${to.length} tam giác`} className="mx-auto block w-full max-w-md">
      {Array.from({ length: squares }, (_, k) => {
        const x = x0 + k * size;
        const y = 6;
        const lower = `${x},${y} ${x},${y + size} ${x + size},${y + size}`;
        const upper = `${x},${y} ${x + size},${y} ${x + size},${y + size}`;
        return (
          <g key={k}>
            <polygon points={lower} fill={shaded.has(2 * k) ? "var(--sun)" : "white"} stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
            <polygon points={upper} fill={shaded.has(2 * k + 1) ? "var(--sun)" : "white"} stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}
