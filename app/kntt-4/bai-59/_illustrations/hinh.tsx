/** Đoạn thẳng chia thành `parts` phần bằng nhau, điểm giữa nằm ở vạch `at`. names = [đầu, giữa, cuối]. */
export function Doan({ parts, at, names }: { parts: number; at: number; names: readonly [string, string, string] }) {
  const x0 = 24;
  const len = 292;
  const x = (i: number) => Math.round(x0 + (len * i) / parts);
  const label = (i: number, name: string) => (
    <text x={x(i)} y={62} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">{name}</text>
  );
  return (
    <svg viewBox="0 0 340 76" role="img" aria-label={`Đoạn thẳng ${names[0]}${names[2]} chia thành ${parts} phần bằng nhau, điểm ${names[1]} ở vạch thứ ${at}`} className="mx-auto block w-full max-w-md">
      <line x1={x(0)} y1={30} x2={x(parts)} y2={30} stroke="var(--ink)" strokeWidth={3} />
      {Array.from({ length: parts + 1 }, (_, i) => (
        <line key={i} x1={x(i)} y1={20} x2={x(i)} y2={40} stroke="var(--ink)" strokeWidth={i === 0 || i === parts || i === at ? 4 : 2.5} />
      ))}
      {label(0, names[0])}
      {label(at, names[1])}
      {label(parts, names[2])}
    </svg>
  );
}
