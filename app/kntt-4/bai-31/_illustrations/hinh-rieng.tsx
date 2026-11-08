import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";
import { NenLuoi } from "../_animations/dau";

const f = (n: number) => Math.round(n * 10) / 10;
const poly = (points: Point[]) => points.map((p) => `${f(p.x)},${f(p.y)}`).join(" ");

/** Hai hình bình hành ABCD và CDEG chung cạnh CD. Tọa độ tính bằng ô (trục y hướng xuống). */
export const haiHinhBinhHanh: Record<"A" | "B" | "C" | "D" | "E" | "G", Point> = {
  A: { x: 4, y: 1 },
  B: { x: 12, y: 1 },
  C: { x: 9, y: 4 },
  D: { x: 1, y: 4 },
  E: { x: 4, y: 7 },
  G: { x: 12, y: 7 },
};

const C22 = 22;
const O = 12;

export function HaiHinhBinhHanh() {
  const p = (name: keyof typeof haiHinhBinhHanh): Point => ({ x: O + haiHinhBinhHanh[name].x * C22, y: O + haiHinhBinhHanh[name].y * C22 });
  const offsets: Record<string, [number, number]> = { A: [-4, -9], B: [4, -9], C: [14, 4], D: [-14, 4], E: [-4, 22], G: [4, 22] };
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 328 200" role="img" aria-label="Hình bình hành ABCD ở trên và hình bình hành CDEG ở dưới, chung cạnh CD" className="block w-full" fontWeight={800}>
        <NenLuoi cols={14} rows={8} cell={C22} x={O} y={O} />
        <polygon points={poly(["A", "B", "C", "D"].map((n) => p(n as "A")))} fill="var(--unit-ta)" fillOpacity={0.15} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
        <polygon points={poly(["C", "D", "E", "G"].map((n) => p(n as "A")))} fill="var(--unit-second)" fillOpacity={0.15} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
        {Object.entries(offsets).map(([name, [dx, dy]]) => (
          <text key={name} x={p(name as "A").x + dx} y={p(name as "A").y + dy} textAnchor="middle" fontSize={17} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
    </Khung>
  );
}

/** Hình thoi ABCD, hai đường chéo AC và BD cắt nhau tại O. Tọa độ tính bằng ô: AC = 12 ô nằm ngang, BD = 6 ô thẳng đứng. */
export const duongCheo: Record<"A" | "B" | "C" | "D" | "O", Point> = {
  A: { x: 2, y: 5 },
  B: { x: 8, y: 2 },
  C: { x: 14, y: 5 },
  D: { x: 8, y: 8 },
  O: { x: 8, y: 5 },
};

export function DuongCheo() {
  const p = (name: keyof typeof duongCheo): Point => ({ x: 10 + duongCheo[name].x * 20, y: 10 + duongCheo[name].y * 20 });
  const names = ["A", "B", "C", "D"] as const;
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 340 220" role="img" aria-label="Hình thoi ABCD có hai đường chéo AC và BD cắt nhau tại O" className="block w-full" fontWeight={800}>
        <NenLuoi cols={16} rows={10} cell={20} x={10} y={10} />
        <polygon points={poly(names.map(p))} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <g stroke="var(--unit-century)" strokeWidth={3} strokeLinecap="round">
          <line x1={p("A").x} y1={p("A").y} x2={p("C").x} y2={p("C").y} />
          <line x1={p("B").x} y1={p("B").y} x2={p("D").x} y2={p("D").y} />
        </g>
        <circle cx={p("O").x} cy={p("O").y} r={4} fill="var(--ink)" />
        {(
          [
            ["A", -15, 6],
            ["B", 0, -10],
            ["C", 15, 6],
            ["D", 0, 24],
            ["O", 14, 20],
          ] as const
        ).map(([name, dx, dy]) => (
          <text key={name} x={p(name).x + dx} y={p(name).y + dy} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
    </Khung>
  );
}

export type Dang = "thoi" | "binh-hanh";

/** Dãy hình lặp lại theo nhóm ba: hình thoi, hình bình hành, hình bình hành. Dấu "?" ở vị trí thứ 8. */
export const dayHinh: Dang[] = ["thoi", "binh-hanh", "binh-hanh", "thoi", "binh-hanh", "binh-hanh", "thoi"];
export const viTriDauHoi = dayHinh.length + 1;

/** Hình thoi: hai đường chéo 56 × 36. Hình bình hành: cạnh ngang 48, cạnh xiên dài hơn 36. Tọa độ quanh tâm. */
export const dangHinh: Record<Dang, Point[]> = {
  thoi: [{ x: 0, y: -18 }, { x: 28, y: 0 }, { x: 0, y: 18 }, { x: -28, y: 0 }],
  "binh-hanh": [{ x: -14, y: -15 }, { x: 34, y: -15 }, { x: 14, y: 15 }, { x: -34, y: 15 }],
};

export function DayHinh() {
  const cell = (index: number) => ({ x: 48 + (index % 4) * 82, y: 42 + Math.floor(index / 4) * 84 });
  return (
    <Khung maxWidth={420}>
      <svg viewBox="0 0 372 176" role="img" aria-label="Dãy tám hình xếp thành hai hàng bốn hình, theo thứ tự: hình thoi, hình bình hành, hình bình hành, hình thoi, hình bình hành, hình bình hành, hình thoi, dấu hỏi" className="block w-full" fontWeight={800}>
        {Array.from({ length: viTriDauHoi }, (_, index) => {
          const c = cell(index);
          const dang = dayHinh[index];
          return (
            <g key={index}>
              {dang ? (
                <polygon
                  points={poly(dangHinh[dang].map((q) => ({ x: c.x + q.x, y: c.y + q.y })))}
                  fill={dang === "thoi" ? "var(--unit-dm2)" : "var(--unit-cm2)"}
                  fillOpacity={0.55}
                  stroke="var(--ink)"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />
              ) : (
                <text x={c.x} y={c.y + 12} textAnchor="middle" fontSize={36} fill="var(--ink)">
                  ?
                </text>
              )}
              <text x={c.x} y={c.y + 44} textAnchor="middle" fontSize={14} fill="var(--foreground)">
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

const U = 20;
/** Miếng ghép: tam giác vuông cân cạnh góc vuông 3 đơn vị, và bốn hình ghép bằng hai miếng như vậy (A, B, C) hoặc không ghép được (D). */
export const mieng: Point[] = [{ x: 0, y: 0 }, { x: 0, y: 3 }, { x: 3, y: 3 }];
export const hinhGhep: Record<"A" | "B" | "C" | "D", Point[]> = {
  A: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }],
  B: [{ x: 0, y: 3 }, { x: 6, y: 3 }, { x: 3, y: 0 }],
  C: [{ x: 3, y: 0 }, { x: 6, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }],
  D: [{ x: 0, y: 1.5 }, { x: 3, y: 0 }, { x: 6, y: 1.5 }, { x: 3, y: 3 }],
};

export function HaiMiengGhep() {
  const at = (points: Point[], x: number, y: number) => poly(points.map((p) => ({ x: x + p.x * U, y: y + p.y * U })));
  const slots = { A: [48, 120], B: [196, 120], C: [48, 220], D: [196, 220] } as const;
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 340 300" role="img" aria-label="Hai miếng ghép giống nhau là tam giác vuông cân, và bốn hình A là hình vuông, B là hình tam giác, C là hình bình hành, D là hình thoi" className="block w-full" fontWeight={800}>
        {[100, 180].map((x) => (
          <polygon key={x} points={at(mieng, x, 20)} fill="var(--unit-cm2)" fillOpacity={0.6} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
        ))}
        {(Object.keys(slots) as (keyof typeof slots)[]).map((name) => (
          <g key={name}>
            <polygon points={at(hinhGhep[name], slots[name][0], slots[name][1])} fill="var(--unit-cm2)" fillOpacity={0.6} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
            <text x={slots[name][0] - 24} y={slots[name][1] + 38} textAnchor="middle" fontSize={18} fill="var(--unit-ta)">
              {name}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
