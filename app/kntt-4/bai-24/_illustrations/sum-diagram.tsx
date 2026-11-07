import { Bar, barColors } from "../_animations/bars";

/**
 * Sơ đồ đoạn thẳng của bài Luyện tập 3. `grouped`: hai đoạn `a` và `b + 5`;
 * không có `grouped`: ba đoạn `a`, `b`, `5`. Có dấu ? ở trên là tổng cần tìm.
 */
export function SumDiagram({ grouped }: { grouped: boolean }) {
  const description = grouped
    ? "Sơ đồ có hai đoạn nối nhau: đoạn a và đoạn b + 5. Cả hai đoạn có tổng là ?"
    : "Sơ đồ có ba đoạn nối nhau: đoạn a, đoạn b và đoạn 5. Cả ba đoạn có tổng là ?";
  return (
    <svg viewBox="0 0 340 120" role="img" aria-label={description} className="block w-full" fontWeight={800}>
      <path d="M20 40 Q170 6 320 40" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      <text x={170} y={24} textAnchor="middle" fontSize={20} fill="var(--ink)">
        ?
      </text>
      {grouped ? (
        <>
          <Bar x={20} y={60} width={140} color={barColors.a} label="a" />
          <Bar x={160} y={60} width={160} color={barColors.b} label="b + 5" />
        </>
      ) : (
        <>
          <Bar x={20} y={60} width={140} color={barColors.a} label="a" />
          <Bar x={160} y={60} width={100} color={barColors.b} label="b" />
          <Bar x={260} y={60} width={60} color={barColors.c} label="5" />
        </>
      )}
    </svg>
  );
}
