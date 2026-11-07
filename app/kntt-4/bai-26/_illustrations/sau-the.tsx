/** Sáu thẻ số xếp thành một hàng. */
export function SauThe({ digits }: { digits: number[] }) {
  return (
    <figure className="my-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 80"
        role="img"
        aria-label={`${digits.length} thẻ số xếp thành hàng: ${digits.join(", ")}`}
        className="block w-full"
        fontWeight={800}
      >
        {digits.map((digit, index) => {
          const x = 10 + index * 54;
          return (
            <g key={index}>
              <rect x={x} y={8} width={44} height={60} rx={8} fill="var(--sun)" fillOpacity={0.5} stroke="var(--ink)" strokeWidth={3} />
              <text x={x + 22} y={48} textAnchor="middle" fontSize={28} fill="var(--ink)">
                {digit}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
