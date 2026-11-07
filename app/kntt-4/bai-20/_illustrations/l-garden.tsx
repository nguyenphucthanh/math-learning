/** Vườn hoa hình chữ L. Cột bên phải rộng 6 m, cao 10 m; phần dưới bên trái cao 4 m, rộng thêm 6 m. Hình tĩnh. */
export function LGarden() {
  const left = 50;
  const top = 34;
  const unit = 16;
  const points = [
    [left + 6 * unit, top],
    [left + 12 * unit, top],
    [left + 12 * unit, top + 10 * unit],
    [left, top + 10 * unit],
    [left, top + 6 * unit],
    [left + 6 * unit, top + 6 * unit],
  ]
    .map((point) => point.join(","))
    .join(" ");

  return (
    <svg
      viewBox="0 0 300 220"
      role="img"
      aria-label="Khu vườn hình chữ L. Cạnh trên dài 6 mét. Cạnh bên phải dài 10 mét. Cạnh bên trái dưới dài 4 mét. Cạnh ngang ở giữa dài 6 mét."
      className="mx-auto block w-full max-w-sm"
    >
      <polygon points={points} fill="var(--unit-m2-soft)" stroke="var(--unit-m2)" strokeWidth={3} strokeLinejoin="round" />

      <text x={left + 9 * unit} y={top - 10} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
        6 m
      </text>
      <text x={left + 12 * unit + 10} y={top + 5 * unit + 5} fontSize={16} fontWeight={800} fill="var(--foreground)">
        10 m
      </text>
      <text x={left - 10} y={top + 8 * unit + 5} textAnchor="end" fontSize={16} fontWeight={800} fill="var(--foreground)">
        4 m
      </text>
      <text x={left + 3 * unit} y={top + 6 * unit - 8} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
        6 m
      </text>
    </svg>
  );
}
