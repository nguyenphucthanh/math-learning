/** Đoạn thẳng chia thành `labels.length - 1` đoạn bằng nhau, các điểm ghi tên bên dưới. */
export function DoanThang({ labels }: { labels: string[] }) {
  const parts = labels.length - 1;
  const x0 = 24;
  const width = 292;
  const x = (i: number) => x0 + (width * i) / parts;
  return (
    <figure className="my-4 rounded-3xl bg-white p-3 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-5">
      <svg
        viewBox="0 0 340 96"
        role="img"
        aria-label={`Đoạn thẳng ${labels[0]}${labels[parts]} chia thành ${parts} đoạn bằng nhau, các điểm theo thứ tự là ${labels.join(", ")}.`}
        className="block w-full"
        fontWeight={800}
      >
        {labels.slice(0, parts).map((_, i) => (
          <rect key={i} x={x(i)} y={30} width={x(i + 1) - x(i)} height={18} fill={i % 2 === 0 ? "var(--unit-second-soft)" : "var(--sun)"} stroke="var(--ink)" strokeWidth={2} />
        ))}
        {labels.map((label, i) => (
          <g key={label}>
            <circle cx={x(i)} cy={39} r={5} fill="var(--ink)" />
            <text x={x(i)} y={76} textAnchor="middle" fontSize={18} fill="var(--ink)">{label}</text>
          </g>
        ))}
        <text x={170} y={18} textAnchor="middle" fontSize={14} fill="var(--ink)">{parts} đoạn bằng nhau</text>
      </svg>
    </figure>
  );
}
