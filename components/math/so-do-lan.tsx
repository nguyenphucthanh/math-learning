/** Sơ đồ nhiều lần: đoạn ngắn là 1 phần, đoạn dài gồm `times` phần bằng nhau. `smallText` và `bigText` ghi trong đoạn. */
export function SoDoLan({
  smallName,
  bigName,
  smallText,
  bigText,
  times,
}: {
  smallName: string;
  bigName: string;
  smallText: string;
  bigText: string;
  times: number;
}) {
  const part = Math.floor(320 / times);
  return (
    <svg
      viewBox="0 0 360 140"
      role="img"
      aria-label={`Sơ đồ: ${smallName} là 1 phần, ${bigName} gồm ${times} phần bằng nhau. ${smallName}: ${smallText}. ${bigName}: ${bigText}.`}
      className="block w-full"
      fontWeight={800}
    >
      <text x={20} y={20} fontSize={14} fill="var(--ink)">
        {smallName}
      </text>
      <rect x={20} y={26} width={part} height={32} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
      <text x={30 + part} y={48} fontSize={16} fill="var(--ink)">
        {smallText}
      </text>
      <text x={20} y={86} fontSize={14} fill="var(--ink)">
        {bigName}
      </text>
      {Array.from({ length: times }, (_, index) => (
        <rect key={index} x={20 + part * index} y={92} width={part} height={32} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
      ))}
      <text x={20 + (part * times) / 2} y={113} textAnchor="middle" fontSize={16} fill="var(--ink)">
        {bigText}
      </text>
    </svg>
  );
}
