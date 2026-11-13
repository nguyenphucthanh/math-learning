/** Tấm bìa hình chữ nhật: ghi diện tích ở giữa, chiều rộng bên phải. Chiều dài chưa biết (dấu ?). */
export function TamBia({ area, width }: { area: string; width: string }) {
  return (
    <svg viewBox="0 0 360 160" role="img" aria-label={`Tấm bìa hình chữ nhật có diện tích ${area} m², chiều rộng ${width} m, chiều dài chưa biết`} className="mx-auto block w-full max-w-md">
      <rect x={40} y={20} width={240} height={90} fill="var(--unit-m2-soft)" stroke="var(--ink)" strokeWidth={2.5} />
      <g fontWeight={800} fontSize={15} fill="var(--foreground)">
        <text x={160} y={70} textAnchor="middle" fill="var(--ink)">{area} m²</text>
        <text x={288} y={70}>{width} m</text>
        <text x={160} y={134} textAnchor="middle">Chiều dài: ? m</text>
      </g>
    </svg>
  );
}
