import { Khung, RightMark } from "@/components/math/khung";
import { polar, type Point } from "@/lib/hinh";
import type { ReactNode } from "react";

export const CENTER: Point = { x: 180, y: 188 };
const R_OUT = 140;
const R_MID = 103;
const R_IN = 70;

/** Cạnh nằm trên đường kính ở bên phải hay bên trái thước. */
export type Base = "right" | "left";
/** Vòng số xanh bắt đầu từ 0 ở bên phải, vòng số vàng bắt đầu từ 0 ở bên trái. */
export type Scale = "xanh" | "vang";

/** Hướng (độ, từ bên phải ngược chiều kim đồng hồ) của cạnh trên đường kính và cạnh còn lại. */
export function armDirections(angle: number, base: Base) {
  return base === "right" ? { base: 0, arm: angle } : { base: 180, arm: 180 - angle };
}

/** Vòng số cần đọc: vòng có vạch 0 nằm sát cạnh trên đường kính. */
export const scaleFor = (base: Base): Scale => (base === "right" ? "xanh" : "vang");

/** Số mà vòng số `scale` chỉ ở hướng `direction`. */
export const readScale = (scale: Scale, direction: number) => (scale === "xanh" ? direction : 180 - direction);

const VALUES = Array.from({ length: 19 }, (_, k) => k * 10);
const r1 = (n: number) => Math.round(n * 10) / 10;

function annulus(outer: number, inner: number) {
  const { x, y } = CENTER;
  return `M ${x - outer} ${y} A ${outer} ${outer} 0 0 1 ${x + outer} ${y} L ${x + inner} ${y} A ${inner} ${inner} 0 0 0 ${x - inner} ${y} Z`;
}

function RingLabel({ scale, value, marked, enter }: { scale: Scale; value: number; marked: boolean; enter?: number }) {
  const direction = scale === "xanh" ? value : 180 - value;
  const p = polar(CENTER, scale === "xanh" ? 87 : 121, direction);
  const rotate = Math.round(direction <= 90 ? -direction : 180 - direction);
  return (
    <g data-enter={marked ? enter : undefined}>
      {marked ? <circle cx={p.x} cy={p.y} r={13} fill="var(--unit-ta)" fillOpacity={0.25} stroke="var(--unit-ta)" strokeWidth={2} /> : null}
      <text
        x={p.x}
        y={r1(p.y + 5)}
        textAnchor="middle"
        fontSize={14}
        fontWeight={800}
        fill={marked ? "var(--unit-ta)" : "var(--ink)"}
        transform={`rotate(${rotate} ${p.x} ${p.y})`}
      >
        {value}
      </text>
    </g>
  );
}

export type ThuocDoProps = {
  /** Số đo góc, từ 0 đến 180. */
  angle: number;
  /** Cạnh nằm trên đường kính ở bên nào. */
  base?: Base;
  /** Vòng số nào được làm nổi; vòng còn lại mờ đi. */
  scale?: Scale | "ca-hai";
  /** Các vòng số có khoanh số tại chỗ cạnh còn lại đi qua. */
  marks?: Scale[];
  /** Vẽ thước hay chỉ vẽ góc. */
  showScale?: boolean;
  /** Tô miền góc. */
  sector?: boolean;
  /** Vẽ đường vuông góc với đường kính (góc vuông) để so sánh. */
  rightLine?: boolean;
  names?: { vertex: string; arm: string; base: string };
  /** Mô tả cho trình đọc màn hình; mặc định chỉ tả vị trí thước, không nói số đo. */
  label?: string;
  /** Bước cho GSAP hiện dần: `scale` là thước, `mark` là số khoanh, `sector` là miền góc, `rightLine` là góc vuông. */
  enter?: { scale?: number; mark?: number; sector?: number; rightLine?: number };
  /** Thêm hình phụ, vẽ sau cùng (dùng toạ độ `CENTER`). */
  children?: ReactNode;
};

/** Thước đo góc đặt vào một góc. Chỉ vẽ, không có trạng thái. */
export function ThuocDoSvg({
  angle,
  base = "right",
  scale = "ca-hai",
  marks = [],
  showScale = true,
  sector = false,
  rightLine = false,
  names = { vertex: "O", arm: "A", base: "B" },
  label,
  enter,
  children,
}: ThuocDoProps) {
  const dirs = armDirections(angle, base);
  const { x, y } = CENTER;
  const armTip = polar(CENTER, 162, dirs.arm);
  const baseTip = polar(CENTER, 162, dirs.base);
  const opacity = (ring: Scale) => (scale === "ca-hai" ? 0.3 : scale === ring ? 0.5 : 0.1);
  const arcStart = polar(CENTER, 48, dirs.base);
  const arcEnd = polar(CENTER, 48, dirs.arm);
  const armLabel = polar(CENTER, 172, dirs.arm);
  const baseLabel = polar(CENTER, 172, dirs.base);
  const markedValue = (ring: Scale) => (marks.includes(ring) ? readScale(ring, dirs.arm) : null);
  const rightFoot = polar(CENTER, 40, dirs.base);
  const rightTop = polar(CENTER, 40, 90);

  return (
    <svg
      viewBox="0 0 360 216"
      role="img"
      aria-label={
        label ??
        `Thước đo góc đặt vào góc đỉnh ${names.vertex}; cạnh ${names.vertex}${names.arm}, ${names.vertex}${names.base}. Cạnh ${names.vertex}${names.base} nằm trên đường kính, ở bên ${base === "right" ? "phải" : "trái"} của thước.`
      }
      className="block w-full"
    >
      {showScale ? (
        <g data-enter={enter?.scale}>
          <path d={`M ${x - R_OUT} ${y} A ${R_OUT} ${R_OUT} 0 0 1 ${x + R_OUT} ${y} Z`} fill="white" fillOpacity={0.85} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
          <path d={annulus(R_OUT, R_MID)} fill="var(--sun)" fillOpacity={opacity("vang")} />
          <path d={annulus(R_MID, R_IN)} fill="var(--unit-minute)" fillOpacity={opacity("xanh")} />
          {VALUES.map((value) => {
            const a = polar(CENTER, R_IN, value);
            const b = polar(CENTER, R_OUT, value);
            return <line key={value} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeOpacity={0.3} strokeWidth={1} />;
          })}
          {Array.from({ length: 36 }, (_, k) => k * 5 + 5).map((value) => {
            const a = polar(CENTER, R_OUT, value);
            const b = polar(CENTER, R_OUT - 6, value);
            return value % 10 === 5 ? <line key={value} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeOpacity={0.55} strokeWidth={1.5} /> : null;
          })}
          {VALUES.map((value) => (
            <RingLabel key={`v${value}`} scale="vang" value={value} marked={markedValue("vang") === value} enter={enter?.mark} />
          ))}
          {VALUES.map((value) => (
            <RingLabel key={`x${value}`} scale="xanh" value={value} marked={markedValue("xanh") === value} enter={enter?.mark} />
          ))}
        </g>
      ) : null}
      {sector && angle < 180 ? (
        <path
          data-enter={enter?.sector}
          d={`M ${x} ${y} L ${arcStart.x} ${arcStart.y} A 48 48 0 0 ${base === "right" ? 0 : 1} ${arcEnd.x} ${arcEnd.y} Z`}
          fill="var(--unit-ta)"
          fillOpacity={0.3}
          stroke="var(--unit-ta)"
          strokeWidth={2}
        />
      ) : null}
      {rightLine ? (
        <g data-enter={enter?.rightLine}>
          <line x1={x} y1={y} x2={x} y2={26} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="6 6" strokeLinecap="round" />
          <RightMark at={CENTER} toward1={rightFoot} toward2={rightTop} size={16} />
        </g>
      ) : null}
      <line x1={x} y1={y} x2={baseTip.x} y2={baseTip.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
      <line x1={x} y1={y} x2={armTip.x} y2={armTip.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={x} cy={y} r={4.5} fill="var(--ink)" />
      {[
        [names.vertex, { x, y: y + 22 }],
        [names.arm, armLabel],
        [names.base, baseLabel],
      ].map(([name, p]) => {
        const point = p as Point;
        return (
          <text key={name as string} x={point.x} y={r1(point.y + 5)} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
            {name as string}
          </text>
        );
      })}
      {children}
    </svg>
  );
}

/** Thước đo góc trong khung trắng, dùng làm hình minh họa cho câu hỏi. */
export function ThuocDo(props: ThuocDoProps) {
  return (
    <Khung maxWidth={420}>
      <ThuocDoSvg {...props} />
    </Khung>
  );
}
