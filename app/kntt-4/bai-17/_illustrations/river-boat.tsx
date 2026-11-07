const PEOPLE = [
  { x: 28, kg: "44 kg" },
  { x: 72, kg: "48 kg" },
  { x: 116, kg: "55 kg" },
];

/** Ba người ở bờ trái, một chiếc thuyền chở tối đa 1 tạ. Hình tĩnh, không tương tác. */
export function RiverBoat() {
  return (
    <svg
      viewBox="0 0 340 230"
      role="img"
      aria-label="Ba người đứng ở bờ trái, nặng 44 kg, 48 kg và 55 kg. Một chiếc thuyền ở giữa sông chở được tối đa 1 tạ. Họ cần sang bờ bên phải."
      className="mx-auto block w-full max-w-sm"
    >
      <rect width={340} height={230} rx={20} fill="var(--unit-second-soft)" />

      <rect width={145} height={230} rx={20} fill="var(--unit-tan-soft)" stroke="var(--unit-tan)" strokeWidth={2.5} />
      <rect x={285} width={55} height={230} rx={20} fill="var(--unit-tan-soft)" stroke="var(--unit-tan)" strokeWidth={2.5} />
      <text x={312} y={116} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
        Bờ
      </text>
      <text x={312} y={134} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
        bên kia
      </text>

      {[60, 90, 120].map((y) => (
        <path
          key={y}
          d={`M165 ${y + 40} q15 -10 30 0 t30 0 t30 0 t30 0`}
          fill="none"
          stroke="var(--unit-second)"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.45}
        />
      ))}

      <text x={215} y={60} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
        Thuyền: tối đa 1 tạ
      </text>
      <path d="M160 150 h110 l-16 30 h-78 z" fill="var(--unit-cm2-soft)" stroke="var(--unit-cm2)" strokeWidth={3} strokeLinejoin="round" />
      <line x1={215} y1={150} x2={215} y2={100} stroke="var(--unit-cm2)" strokeWidth={3} strokeLinecap="round" />
      <path d="M215 102 l32 16 l-32 14 z" fill="white" stroke="var(--unit-cm2)" strokeWidth={2.5} strokeLinejoin="round" />

      {PEOPLE.map((person) => (
        <g key={person.kg}>
          <circle cx={person.x} cy={118} r={10} fill="var(--ink)" />
          <rect x={person.x - 12} y={131} width={24} height={44} rx={10} fill="var(--ink)" />
          <rect x={person.x - 21} y={190} width={42} height={26} rx={8} fill="white" stroke="var(--ink)" strokeWidth={2} />
          <text x={person.x} y={208} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
            {person.kg}
          </text>
        </g>
      ))}
    </svg>
  );
}
