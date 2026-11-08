export type Point = { x: number; y: number };
export type Seg = [Point, Point];

export const round1 = (value: number) => Math.round(value * 10) / 10;

/** Điểm cách `center` một đoạn `length` theo hướng `deg` (độ, ngược chiều kim đồng hồ, trục y hướng lên). */
export function polar(center: Point, length: number, deg: number): Point {
  const rad = (deg * Math.PI) / 180;
  return { x: round1(center.x + length * Math.cos(rad)), y: round1(center.y - length * Math.sin(rad)) };
}

/** Đường thẳng qua `center`, nghiêng `deg` độ, vẽ dài `half` về mỗi phía. */
export function lineThrough(center: Point, deg: number, half: number): Seg {
  return [polar(center, half, deg + 180), polar(center, half, deg)];
}

const direction = (seg: Seg): Point => ({ x: seg[1].x - seg[0].x, y: seg[1].y - seg[0].y });

/** Góc nhọn hoặc vuông giữa hai đường thẳng, tính bằng độ. */
export function angleBetween(a: Seg, b: Seg): number {
  const u = direction(a);
  const v = direction(b);
  const cos = Math.abs(u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
  return (Math.acos(Math.min(1, cos)) * 180) / Math.PI;
}

/** Vuông góc khi tích vô hướng của hai hướng bằng 0. Cho phép sai số nhỏ do làm tròn tọa độ. */
export function isPerpendicular(a: Seg, b: Seg): boolean {
  return Math.abs(angleBetween(a, b) - 90) < 0.5;
}

/** Cạnh liền nhau của đa giác (theo thứ tự đỉnh) vuông góc với nhau: trả về tên hai cạnh, ví dụ ["BC", "CD"]. */
export function perpendicularEdgePairs(points: Point[], names: string[]): [string, string][] {
  const edges = points.map((point, index) => ({ name: names[index] + names[(index + 1) % points.length], seg: [point, points[(index + 1) % points.length]] as Seg }));
  return edges.flatMap((edge, index) => {
    const next = edges[(index + 1) % edges.length];
    return isPerpendicular(edge.seg, next.seg) ? [[edge.name, next.name] as [string, string]] : [];
  });
}

/** Cạnh liền nhau cắt nhau mà không vuông góc. */
export function obliqueEdgePairs(points: Point[], names: string[]): [string, string][] {
  const edges = points.map((point, index) => ({ name: names[index] + names[(index + 1) % points.length], seg: [point, points[(index + 1) % points.length]] as Seg }));
  return edges.flatMap((edge, index) => {
    const next = edges[(index + 1) % edges.length];
    return isPerpendicular(edge.seg, next.seg) ? [] : [[edge.name, next.name] as [string, string]];
  });
}

/** Khoảng cách từ điểm đến đường thẳng đi qua đoạn `seg`. */
export function distanceToLine(point: Point, seg: Seg): number {
  const u = direction(seg);
  const cross = u.x * (point.y - seg[0].y) - u.y * (point.x - seg[0].x);
  return Math.abs(cross) / Math.hypot(u.x, u.y);
}

/** Đường thẳng đi qua đoạn `seg` có đi qua `point` không (sai số `tolerance`, đơn vị tọa độ). */
export function passesThrough(seg: Seg, point: Point, tolerance = 0.6): boolean {
  return distanceToLine(point, seg) < tolerance;
}
