import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;
const PANEL_W = 120;
const TILT = -12;
const CENTER: Point = { x: 60, y: 80 };

function tilt(p: Point, dx: number): Point {
  const rad = (TILT * Math.PI) / 180;
  const x = p.x - CENTER.x;
  const y = p.y - CENTER.y;
  return { x: f(dx + CENTER.x + x * Math.cos(rad) - y * Math.sin(rad)), y: f(CENTER.y + x * Math.sin(rad) + y * Math.cos(rad)) };
}

type Local = { triangle: [Point, Point, Point] };
const AB_LOCAL: Seg = [
  { x: 8, y: 112 },
  { x: 112, y: 112 },
];
const H_LOCAL: Point = { x: 60, y: 44 };

/** Ba cách đặt ê ke (đỉnh góc vuông là điểm đầu tiên). Chỉ hình 2 đặt đúng. */
const locals: Local[] = [
  // Cạnh góc vuông trùng AB, nhưng cạnh góc vuông kia không đi qua H.
  { triangle: [{ x: 22, y: 112 }, { x: 72, y: 112 }, { x: 22, y: 50 }] },
  // Cạnh góc vuông trùng AB, cạnh góc vuông kia đi qua H.
  { triangle: [{ x: 60, y: 112 }, { x: 100, y: 112 }, { x: 60, y: 38 }] },
  // Cạnh dài nhất của ê ke trùng AB.
  { triangle: [{ x: 61, y: 77 }, { x: 26, y: 112 }, { x: 96, y: 112 }] },
];

export type EKePanel = { label: string; ab: Seg; h: Point; triangle: [Point, Point, Point] };

export const ekePanels: EKePanel[] = locals.map((local, index) => {
  const dx = index * PANEL_W;
  return {
    label: `Hình ${index + 1}`,
    ab: [tilt(AB_LOCAL[0], dx), tilt(AB_LOCAL[1], dx)],
    h: tilt(H_LOCAL, dx),
    triangle: local.triangle.map((p) => tilt(p, dx)) as [Point, Point, Point],
  };
});

/** Ba hình đặt ê ke để vẽ đường thẳng đi qua H vuông góc với AB. Con chọn hình đặt đúng. */
export function EKeDat() {
  return (
    <Khung maxWidth={420}>
      <svg viewBox={`0 0 ${PANEL_W * 3} 172`} role="img" aria-label="Ba hình đặt ê ke để vẽ đường thẳng đi qua điểm H và vuông góc với đường thẳng AB" className="block w-full" fontWeight={800}>
        {ekePanels.map((panel, index) => (
          <g key={panel.label}>
            {index > 0 ? <line x1={index * PANEL_W} y1={8} x2={index * PANEL_W} y2={150} stroke="var(--input)" strokeWidth={2} strokeDasharray="4 5" /> : null}
            <polygon points={panel.triangle.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen)" fillOpacity={0.28} stroke="var(--unit-yen)" strokeWidth={2.5} strokeLinejoin="round" />
            <line x1={panel.ab[0].x} y1={panel.ab[0].y} x2={panel.ab[1].x} y2={panel.ab[1].y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
            <circle cx={panel.h.x} cy={panel.h.y} r={4} fill="var(--ink)" />
            <text x={f(panel.h.x + 14)} y={f(panel.h.y - 4)} textAnchor="middle" fontSize={16} fill="var(--ink)">
              H
            </text>
            <text x={f(panel.ab[0].x - 2)} y={f(panel.ab[0].y + 20)} textAnchor="middle" fontSize={16} fill="var(--ink)">
              A
            </text>
            <text x={f(panel.ab[1].x + 2)} y={f(panel.ab[1].y + 20)} textAnchor="middle" fontSize={16} fill="var(--ink)">
              B
            </text>
            <text x={index * PANEL_W + PANEL_W / 2} y={166} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {panel.label}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
