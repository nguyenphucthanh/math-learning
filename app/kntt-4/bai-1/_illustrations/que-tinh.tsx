/** Các đoạn của một chữ số kiểu bảy đoạn: a trên, b phải trên, c phải dưới, d dưới, e trái dưới, f trái trên, g giữa. */
export const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
};

const LINES: Record<string, [number, number, number, number]> = {
  a: [8, 6, 38, 6],
  b: [42, 10, 42, 38],
  c: [42, 46, 42, 74],
  d: [8, 78, 38, 78],
  e: [4, 46, 4, 74],
  f: [4, 10, 4, 38],
  g: [8, 42, 38, 42],
};

/** Số xếp bằng que tính kiểu bảy đoạn, mỗi chữ số rộng 56. */
export function QueTinh({ digits }: { digits: string }) {
  return (
    <svg
      viewBox={`0 0 ${digits.length * 56 + 4} 86`}
      role="img"
      aria-label={`Số ${digits.split("").join(" ")} xếp bằng que tính`}
      className="mx-auto block w-full max-w-xs"
    >
      {digits.split("").map((digit, index) => (
        <g key={index} transform={`translate(${index * 56 + 4} 0)`}>
          {SEGMENTS[digit].split("").map((segment) => {
            const [x1, y1, x2, y2] = LINES[segment];
            return (
              <line key={segment} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--unit-second)" strokeWidth={6} strokeLinecap="round" />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
