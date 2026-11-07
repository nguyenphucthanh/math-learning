const NOTES = [
  { value: "100 000", fill: "var(--unit-tan-soft)", stroke: "var(--unit-tan)" },
  { value: "200 000", fill: "var(--unit-cm2-soft)", stroke: "var(--unit-cm2)" },
  { value: "500 000", fill: "var(--unit-second-soft)", stroke: "var(--unit-second)" },
];

/** Ba tờ tiền vẽ đơn giản, chỉ để con nhận ra mệnh giá. Không phải hình tiền thật. */
export function Banknotes() {
  return (
    <svg
      viewBox="0 0 340 80"
      role="img"
      aria-label="Ba tờ tiền: 100 000 đồng, 200 000 đồng và 500 000 đồng"
      className="mx-auto block w-full max-w-md"
    >
      {NOTES.map((note, index) => {
        const x = 4 + index * 112;
        return (
          <g key={note.value}>
            <rect x={x} y={8} width={104} height={64} rx={8} fill={note.fill} stroke={note.stroke} strokeWidth={3} />
            <circle cx={x + 20} cy={40} r={11} fill="none" stroke={note.stroke} strokeWidth={2} />
            <text x={x + 62} y={37} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
              {note.value}
            </text>
            <text x={x + 62} y={57} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
              đồng
            </text>
          </g>
        );
      })}
    </svg>
  );
}
