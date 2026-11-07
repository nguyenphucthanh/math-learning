/** Sơ đồ hai đoạn: đoạn trên dài hơn đoạn dưới một khúc bằng hiệu, ngoặc bên phải là tổng. */
export function SoDoDon({ topName, bottomName, diff, total, unit }: { topName: string; bottomName: string; diff: number; total: number; unit: string }) {
  return (
    <figure className="my-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 380 140"
        role="img"
        aria-label={`Sơ đồ: ${topName} dài hơn ${bottomName} ${diff} ${unit}, cả hai là ${total} ${unit}`}
        className="block w-full"
        fontWeight={800}
      >
        <text x={20} y={20} fontSize={14} fill="var(--ink)">
          {topName}
        </text>
        <rect x={20} y={26} width={190} height={30} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <rect x={210} y={26} width={60} height={30} fill="var(--sun)" fillOpacity={0.45} stroke="var(--ink)" strokeWidth={3} strokeDasharray="6 4" />
        <text x={115} y={48} textAnchor="middle" fontSize={18} fill="var(--ink)">
          ?
        </text>
        <text x={240} y={48} textAnchor="middle" fontSize={16} fill="var(--ink)">
          {diff} {unit}
        </text>
        <text x={20} y={84} fontSize={14} fill="var(--ink)">
          {bottomName}
        </text>
        <rect x={20} y={90} width={190} height={30} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <text x={115} y={112} textAnchor="middle" fontSize={18} fill="var(--ink)">
          ?
        </text>
        <path
          d="M284 26 Q296 26 296 40 L296 62 Q296 73 306 73 Q296 73 296 84 L296 106 Q296 120 284 120"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={312} y={79} fontSize={16} fill="var(--ink)">
          {total} {unit}
        </text>
      </svg>
    </figure>
  );
}
