const LEFT = 64;
const UNIT = 80;
const EXTRA = 56;

/**
 * Sơ đồ ba đoạn như SGK trang 20: đoạn trên là một đơn vị, đoạn giữa dài gấp đôi,
 * đoạn dưới dài hơn đoạn giữa một khúc `extra`. Ngoặc bên phải hỏi cả ba.
 */
export function SoDoBaDong({ names, first, extra }: { names: [string, string, string]; first: string; extra: string }) {
  const [top, middle, bottom] = names;
  const rows = [28, 72, 116];
  return (
    <figure className="my-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 160"
        role="img"
        aria-label={`Sơ đồ: ${top} ${first}; ${middle} dài gấp đôi đoạn ${top}; ${bottom} dài hơn ${middle} ${extra}; ngoặc bên phải hỏi cả ba loại.`}
        className="block w-full"
        fontWeight={800}
      >
        {[top, middle, bottom].map((name, index) => (
          <text key={name} x={LEFT - 8} y={rows[index] + 20} textAnchor="end" fontSize={14} fill="var(--ink)">
            {name}:
          </text>
        ))}
        <rect x={LEFT} y={rows[0]} width={UNIT} height={28} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <text x={LEFT + UNIT / 2} y={rows[0] - 6} textAnchor="middle" fontSize={14} fill="var(--ink)">
          {first}
        </text>
        <rect x={LEFT} y={rows[1]} width={UNIT * 2} height={28} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <line x1={LEFT + UNIT} y1={rows[0] + 28} x2={LEFT + UNIT} y2={rows[1]} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3" />
        <rect x={LEFT} y={rows[2]} width={UNIT * 2} height={28} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <line x1={LEFT + UNIT * 2} y1={rows[1] + 28} x2={LEFT + UNIT * 2} y2={rows[2]} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3" />
        <rect x={LEFT + UNIT * 2} y={rows[2]} width={EXTRA} height={28} fill="var(--sun)" fillOpacity={0.45} stroke="var(--ink)" strokeWidth={3} strokeDasharray="6 4" />
        <text x={LEFT + UNIT * 2 + EXTRA / 2} y={rows[2] + 48} textAnchor="middle" fontSize={14} fill="var(--ink)">
          {extra}
        </text>
        <path
          d="M300 28 Q312 28 312 42 L312 68 Q312 78 322 78 Q312 78 312 88 L312 114 Q312 144 300 144"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={326} y={84} fontSize={16} fill="var(--ink)">
          ?
        </text>
      </svg>
    </figure>
  );
}
