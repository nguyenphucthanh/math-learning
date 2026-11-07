export type OSoRow = { value: number; /** Vị trí ô tô vàng trong hàng, tính từ 0 ở bên trái. */ pick: number };

const CELL = 26;
const MARGIN = 8;

/** Chữ số trong các ô tô vàng, đọc từ hàng trên xuống hàng dưới. */
export function pickedDigits(rows: OSoRow[]) {
  return rows.map((row) => String(row.value)[row.pick]).join("");
}

/** Ô chữ bốn hàng: mỗi hàng là một giá trị viết từng chữ số vào ô, các ô tô vàng thẳng một cột. */
export function ODoSo({ rows }: { rows: OSoRow[] }) {
  const left = Math.max(...rows.map((row) => row.pick));
  const right = Math.max(...rows.map((row) => String(row.value).length - row.pick));
  const columns = left + right;
  const width = columns * CELL + MARGIN * 2;
  const height = rows.length * CELL + MARGIN * 2;
  return (
    <figure className="my-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Ô chữ ${rows.length} hàng. Các chữ số ở cột tô vàng, đọc từ trên xuống, là ${pickedDigits(rows).split("").join(", ")}`}
        className="block w-full"
        fontWeight={800}
      >
        {rows.map((row, rowIndex) =>
          String(row.value)
            .split("")
            .map((digit, index) => {
              const x = MARGIN + (left - row.pick + index) * CELL;
              const y = MARGIN + rowIndex * CELL;
              const picked = index === row.pick;
              return (
                <g key={`${rowIndex}-${index}`}>
                  <rect x={x} y={y} width={CELL} height={CELL} fill={picked ? "var(--sun)" : "white"} fillOpacity={picked ? 0.6 : 1} stroke="var(--ink)" strokeWidth={2} />
                  <text x={x + CELL / 2} y={y + 18} textAnchor="middle" fontSize={16} fill="var(--ink)">
                    {digit}
                  </text>
                </g>
              );
            }),
        )}
      </svg>
    </figure>
  );
}
