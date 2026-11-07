export const BOARD_UNIT = 24;
const LEFT = 16;
const TOP = 30;

/**
 * Điểm các đỉnh của bảng mạch, tính theo cm: hình chữ nhật `width` × `height` bị khuyết hai ô vuông 1 cm,
 * một ô ở cạnh trên (cách mép phải 1 cm) và một ô ở cạnh dưới (cách mép phải 2 cm).
 */
export function boardVertices(width: number, height: number): [number, number][] {
  return [
    [0, 0],
    [width - 2, 0],
    [width - 2, 1],
    [width - 1, 1],
    [width - 1, 0],
    [width, 0],
    [width, height],
    [width - 2, height],
    [width - 2, height - 1],
    [width - 3, height - 1],
    [width - 3, height],
    [0, height],
  ];
}

/** Bảng mạch hình chữ nhật khuyết hai ô vuông 1 cm. Hình tĩnh, vẽ riêng cho bài này. */
export function CircuitBoard({ width, height }: { width: number; height: number }) {
  const x = (cm: number) => LEFT + cm * BOARD_UNIT;
  const y = (cm: number) => TOP + cm * BOARD_UNIT;
  const points = boardVertices(width, height)
    .map(([cx, cy]) => `${x(cx)},${y(cy)}`)
    .join(" ");
  const topNotch = { left: width - 2, top: 0 };
  const bottomNotch = { left: width - 3, top: height - 1 };
  const label = { fontSize: 16, fontWeight: 800, fill: "var(--foreground)" } as const;

  return (
    <svg
      viewBox={`0 0 ${LEFT + width * BOARD_UNIT + 64} ${TOP + height * BOARD_UNIT + 40}`}
      role="img"
      aria-label={`Bảng mạch hình chữ nhật dài ${width} cm, rộng ${height} cm. Bị khuyết hai ô vuông cạnh 1 cm: một ô ở cạnh trên, một ô ở cạnh dưới.`}
      className="mx-auto block w-full max-w-md"
    >
      <polygon
        data-testid="board-shape"
        points={points}
        fill="var(--unit-cm2-soft)"
        stroke="var(--unit-cm2)"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {[topNotch, bottomNotch].map((notch) => (
        <rect
          key={notch.left}
          x={x(notch.left)}
          y={y(notch.top)}
          width={BOARD_UNIT}
          height={BOARD_UNIT}
          fill="none"
          stroke="var(--input)"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      ))}

      <text x={x(width / 2)} y={TOP - 10} textAnchor="middle" {...label}>
        {width} cm
      </text>
      <text x={x(width) + 10} y={y(height / 2) + 5} {...label}>
        {height} cm
      </text>

      {/* Ô khuyết trên: chiều sâu nằm bên trái ô, chiều rộng nằm dưới ô. */}
      <text x={x(topNotch.left) - 6} y={y(0.5) + 5} textAnchor="end" {...label}>
        1 cm
      </text>
      {/* Ô khuyết dưới. */}
      <text x={x(bottomNotch.left) - 6} y={y(height - 0.5) + 5} textAnchor="end" {...label}>
        1 cm
      </text>
      <text x={x(topNotch.left + 0.5)} y={y(1) + 22} textAnchor="middle" {...label}>
        1 cm
      </text>
      <text x={x(bottomNotch.left + 0.5)} y={y(height) + 22} textAnchor="middle" {...label}>
        1 cm
      </text>
    </svg>
  );
}
