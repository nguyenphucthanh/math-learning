export type Bottle = { name: string; time: string };

const BOTTLE_PATH = "M-30 0 H30 V70 L10 104 V116 H-10 V104 L-30 70 Z";
const LAYERS = [
  { y: 6, height: 20, fill: "var(--unit-century-soft)" },
  { y: 26, height: 14, fill: "var(--ink)" },
  { y: 40, height: 18, fill: "var(--unit-cm2-soft)" },
  { y: 58, height: 20, fill: "var(--unit-century-soft)" },
];

/** Các chai lọc nước đặt úp ngược, mỗi chai ghi thời gian lọc xong 500 ml. Hình tĩnh. */
export function FilterBottles({ bottles }: { bottles: Bottle[] }) {
  const slot = 340 / bottles.length;
  return (
    <svg
      viewBox="0 0 340 190"
      role="img"
      aria-label={`Các chai lọc nước, mỗi chai lọc 500 ml nước. ${bottles.map((bottle) => `${bottle.name}: ${bottle.time}`).join("; ")}.`}
      className="mx-auto block w-full max-w-md"
    >
      <defs>
        <clipPath id="filter-bottle-clip">
          <path d={BOTTLE_PATH} />
        </clipPath>
      </defs>
      {bottles.map((bottle, index) => {
        const center = Math.round(slot * index + slot / 2);
        return (
          <g key={bottle.name} transform={`translate(${center} 6)`}>
            <g clipPath="url(#filter-bottle-clip)">
              <rect x={-30} y={0} width={60} height={116} fill="white" />
              {LAYERS.map((layer) => (
                <rect key={layer.y} x={-30} y={layer.y} width={60} height={layer.height} fill={layer.fill} />
              ))}
            </g>
            <path d={BOTTLE_PATH} fill="none" stroke="var(--unit-second)" strokeWidth={3} strokeLinejoin="round" />
            <path d="M0 124 q-6 8 0 14 q6 -6 0 -14 Z" fill="var(--unit-second)" />
            <text y={156} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
              {bottle.name}
            </text>
            <text y={176} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--unit-second)">
              {bottle.time}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
