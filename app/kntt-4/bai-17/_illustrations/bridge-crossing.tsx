const LAND = "var(--unit-tan-soft)";
const LAND_EDGE = "var(--unit-tan)";
const WOOD = "var(--unit-cm2-soft)";
const WOOD_EDGE = "var(--unit-cm2)";

type Bridge = { x: number; y: number; width: number; height: number; lines: string[] };

/** Sáu cầu: số đo ghi trên mỗi cầu là sức chịu tối đa. Đảo trái ở x = 90, đảo phải ở x = 265. */
const BRIDGES: Bridge[] = [
  { x: 62, y: 58, width: 56, height: 110, lines: ["25 yến"] },
  { x: 237, y: 58, width: 56, height: 110, lines: ["35 yến"] },
  { x: 27, y: 240, width: 56, height: 108, lines: ["28 yến"] },
  { x: 97, y: 240, width: 56, height: 108, lines: ["3 tạ", "20 kg"] },
  { x: 237, y: 240, width: 56, height: 108, lines: ["2 tạ"] },
  { x: 150, y: 190, width: 66, height: 30, lines: ["1 tấn"] },
];

function BridgeShape({ bridge }: { bridge: Bridge }) {
  const horizontal = bridge.width > bridge.height;
  const labelHeight = bridge.lines.length > 1 ? 44 : 28;
  const labelWidth = horizontal ? 52 : 58;
  const centerX = bridge.x + bridge.width / 2;
  const centerY = bridge.y + bridge.height / 2;
  const planks = horizontal ? [] : [0.2, 0.35, 0.65, 0.8].map((fraction) => bridge.y + bridge.height * fraction);

  return (
    <g>
      <rect x={bridge.x} y={bridge.y} width={bridge.width} height={bridge.height} rx={4} fill={WOOD} stroke={WOOD_EDGE} strokeWidth={2.5} />
      {planks.map((y) => (
        <line key={y} x1={bridge.x + 4} x2={bridge.x + bridge.width - 4} y1={y} y2={y} stroke={WOOD_EDGE} strokeWidth={1.5} opacity={0.5} />
      ))}
      <rect
        x={centerX - labelWidth / 2}
        y={centerY - labelHeight / 2}
        width={labelWidth}
        height={labelHeight}
        rx={8}
        fill="white"
        stroke={WOOD_EDGE}
        strokeWidth={2}
      />
      {bridge.lines.map((line, index) => (
        <text
          key={line}
          x={centerX}
          y={centerY + 5 + (index - (bridge.lines.length - 1) / 2) * 17}
          textAnchor="middle"
          fontSize={14}
          fontWeight={800}
          fill="var(--foreground)"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Voi con 3 tạ cần sang bờ bên kia qua sáu cầu. Hình tĩnh, không tương tác. */
export function BridgeCrossing() {
  return (
    <svg
      viewBox="0 0 340 430"
      role="img"
      aria-label="Sơ đồ sáu cầu. Từ bờ dưới sang đảo trái có cầu 28 yến và cầu 3 tạ 20 kg. Từ bờ dưới sang đảo phải có cầu 2 tạ. Giữa hai đảo có cầu 1 tấn. Từ đảo trái lên bờ trên có cầu 25 yến. Từ đảo phải lên bờ trên có cầu 35 yến. Voi con nặng 3 tạ đứng ở bờ dưới."
      className="mx-auto block w-full max-w-sm"
    >
      <rect width={340} height={430} rx={20} fill="var(--unit-second-soft)" />

      <rect width={340} height={58} fill={LAND} stroke={LAND_EDGE} strokeWidth={2.5} />
      <text x={170} y={36} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
        Bờ bên kia
      </text>
      <rect y={345} width={340} height={85} fill={LAND} stroke={LAND_EDGE} strokeWidth={2.5} />

      <ellipse cx={90} cy={205} rx={70} ry={40} fill={LAND} stroke={LAND_EDGE} strokeWidth={2.5} />
      <ellipse cx={265} cy={205} rx={60} ry={40} fill={LAND} stroke={LAND_EDGE} strokeWidth={2.5} />

      {BRIDGES.map((bridge) => (
        <BridgeShape key={`${bridge.x}-${bridge.y}`} bridge={bridge} />
      ))}

      <g stroke="var(--foreground)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx={150} cy={386} rx={34} ry={20} fill="oklch(0.8 0.02 260)" />
        <circle cx={188} cy={378} r={15} fill="oklch(0.8 0.02 260)" />
        <path d="M200 382 q14 6 8 22" fill="none" />
        <ellipse cx={182} cy={372} rx={8} ry={10} fill="oklch(0.72 0.05 20)" />
        <line x1={130} y1={402} x2={130} y2={414} />
        <line x1={170} y1={402} x2={170} y2={414} />
        <circle cx={192} cy={376} r={1.5} fill="var(--foreground)" />
      </g>
      <text x={150} y={424} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
        Voi con: 3 tạ
      </text>
    </svg>
  );
}
