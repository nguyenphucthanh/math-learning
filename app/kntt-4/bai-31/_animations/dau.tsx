import type { Point, Seg } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

function frame(seg: Seg) {
  const mid = { x: (seg[0].x + seg[1].x) / 2, y: (seg[0].y + seg[1].y) / 2 };
  const length = Math.hypot(seg[1].x - seg[0].x, seg[1].y - seg[0].y);
  const u = { x: (seg[1].x - seg[0].x) / length, y: (seg[1].y - seg[0].y) / length };
  return { mid, u, n: { x: -u.y, y: u.x } };
}

/** Dấu mũi tên nhỏ ở giữa đoạn thẳng, chỉ theo hướng đoạn: các đoạn có cùng số mũi tên song song với nhau. */
export function DauSongSong({ seg, count = 1, color }: { seg: Seg; count?: number; color: string }) {
  const { mid, u, n } = frame(seg);
  const at = (k: number): Point => ({ x: mid.x + u.x * (k - (count - 1) / 2) * 9, y: mid.y + u.y * (k - (count - 1) / 2) * 9 });
  return (
    <g fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: count }, (_, k) => {
        const c = at(k);
        return <path key={k} d={`M ${f(c.x - u.x * 4 + n.x * 7)} ${f(c.y - u.y * 4 + n.y * 7)} L ${f(c.x + u.x * 4)} ${f(c.y + u.y * 4)} L ${f(c.x - u.x * 4 - n.x * 7)} ${f(c.y - u.y * 4 - n.y * 7)}`} />;
      })}
    </g>
  );
}

/** Gạch ngắn cắt ngang giữa đoạn thẳng: các đoạn có cùng số gạch thì bằng nhau. */
export function DauBangNhau({ seg, count = 1, color }: { seg: Seg; count?: number; color: string }) {
  const { mid, u, n } = frame(seg);
  return (
    <g stroke={color} strokeWidth={3} strokeLinecap="round">
      {Array.from({ length: count }, (_, k) => {
        const c = { x: mid.x + u.x * (k - (count - 1) / 2) * 7, y: mid.y + u.y * (k - (count - 1) / 2) * 7 };
        return <line key={k} x1={f(c.x + n.x * 8)} y1={f(c.y + n.y * 8)} x2={f(c.x - n.x * 8)} y2={f(c.y - n.y * 8)} />;
      })}
    </g>
  );
}

/** Lưới ô vuông làm nền cho hình trên vở ô li. */
export function NenLuoi({ cols, rows, cell, x = 0, y = 0 }: { cols: number; rows: number; cell: number; x?: number; y?: number }) {
  return (
    <g stroke="var(--input)" strokeWidth={1}>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`c${i}`} x1={x + i * cell} y1={y} x2={x + i * cell} y2={y + rows * cell} />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`r${i}`} x1={x} y1={y + i * cell} x2={x + cols * cell} y2={y + i * cell} />
      ))}
    </g>
  );
}
