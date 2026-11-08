/** Quãng đường ABCD gồm ba đoạn AB = m, BC cho trước, CD = n. */
export function QuangDuong({ middle }: { middle: string }) {
  return (
    <svg viewBox="0 0 360 130" role="img" aria-label={`Quãng đường ABCD gồm ba đoạn: AB dài m, BC dài ${middle}, CD dài n.`} className="mx-auto block w-full max-w-sm" fontWeight={800}>
      <polyline points="30,100 100,40 240,40 330,100" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
      {[
        ["A", 30, 100],
        ["B", 100, 40],
        ["C", 240, 40],
        ["D", 330, 100],
      ].map(([name, x, y]) => (
        <g key={name as string}>
          <circle cx={x as number} cy={y as number} r={5} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} />
          <text x={(x as number) + (name === "D" ? 12 : name === "A" ? -18 : 0)} y={(y as number) + (name === "A" || name === "D" ? 6 : -12)} fontSize={18} fill="var(--ink)" textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
      <text x={52} y={62} fontSize={18} fill="var(--ink)" textAnchor="middle">m</text>
      <text x={170} y={30} fontSize={18} fill="var(--ink)" textAnchor="middle">{middle}</text>
      <text x={298} y={62} fontSize={18} fill="var(--ink)" textAnchor="middle">n</text>
    </svg>
  );
}
