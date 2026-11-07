const odds = [5, 7, 9, 11];

/** Dãy số lẻ liên tiếp: hai số đứng cạnh nhau hơn kém nhau 2. */
export function SoLeLienTiep() {
  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 100"
        role="img"
        aria-label="Các số lẻ liên tiếp 5, 7, 9, 11. Mỗi số hơn số đứng trước 2"
        className="block w-full"
        fontWeight={800}
      >
        {odds.map((value, index) => {
          const x = 50 + index * 80;
          return (
            <g key={value}>
              <circle cx={x} cy={70} r={24} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
              <text x={x} y={77} textAnchor="middle" fontSize={20} fill="var(--ink)">
                {value}
              </text>
              {index < odds.length - 1 ? (
                <g>
                  <path d={`M${x} 46 Q${x + 40} 6 ${x + 80} 46`} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
                  <text x={x + 40} y={22} textAnchor="middle" fontSize={16} fill="var(--ink)">
                    +2
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
