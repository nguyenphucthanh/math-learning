import { lineThrough, type Point, type Seg } from "../hinh";
import { Khung } from "./khung";

const CENTER: Point = { x: 160, y: 100 };

/** Hai đường thẳng cắt nhau: đường thứ nhất nghiêng `rotation` độ, đường thứ hai lệch thêm `angle` độ. */
export function capDuongSegments(rotation: number, angle: number): [Seg, Seg] {
  return [lineThrough(CENTER, rotation, 88), lineThrough(CENTER, rotation + angle, 88)];
}

function Label({ at, from, text }: { at: Point; from: Point; text: string }) {
  const dx = at.x - from.x;
  const dy = at.y - from.y;
  const length = Math.hypot(dx, dy);
  return (
    <text x={Math.round(at.x + (dx / length) * 14)} y={Math.round(at.y + (dy / length) * 14 + 5)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
      {text}
    </text>
  );
}

/** Hình hai đường thẳng PQ và RS cắt nhau tại O. Con tự kiểm tra có vuông góc không. */
export function CapDuong({ rotation, angle, names = ["P", "Q", "R", "S"] }: { rotation: number; angle: number; names?: [string, string, string, string] }) {
  const [a, b] = capDuongSegments(rotation, angle);
  return (
    <Khung maxWidth={340}>
      <svg viewBox="0 0 320 200" role="img" aria-label={`Hai đường thẳng ${names[0]}${names[1]} và ${names[2]}${names[3]} cắt nhau tại O`} className="block w-full">
        {[a, b].map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        ))}
        <circle cx={CENTER.x} cy={CENTER.y} r={4} fill="var(--ink)" />
        <Label at={a[0]} from={CENTER} text={names[0]} />
        <Label at={a[1]} from={CENTER} text={names[1]} />
        <Label at={b[0]} from={CENTER} text={names[2]} />
        <Label at={b[1]} from={CENTER} text={names[3]} />
        <text x={CENTER.x + 12} y={CENTER.y + 22} fontSize={16} fontWeight={800} fill="var(--ink)">
          O
        </text>
      </svg>
    </Khung>
  );
}
