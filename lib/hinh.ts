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

/** Hai đường thẳng chứa `a` và `b` song song: cùng hướng và không trùng nhau. Cho phép sai số nhỏ do làm tròn tọa độ. */
export function isParallel(a: Seg, b: Seg): boolean {
  return angleBetween(a, b) < 0.5 && distanceToLine(b[0], a) > 0.6;
}

/** Giao điểm của hai đường thẳng chứa `a` và `b`; `null` khi chúng cùng hướng. */
export function lineIntersection(a: Seg, b: Seg): Point | null {
  const u = direction(a);
  const v = direction(b);
  const det = u.x * v.y - u.y * v.x;
  if (Math.abs(det) < 1e-9) return null;
  const t = ((b[0].x - a[0].x) * v.y - (b[0].y - a[0].y) * v.x) / det;
  return { x: round1(a[0].x + t * u.x), y: round1(a[0].y + t * u.y) };
}

/** Mọi cặp cạnh của đa giác song song với nhau (theo thứ tự đỉnh), ví dụ ["AB", "DC"]. */
export function parallelEdgePairs(points: Point[], names: string[]): [string, string][] {
  const edges = points.map((point, index) => ({ name: names[index] + names[(index + 1) % points.length], seg: [point, points[(index + 1) % points.length]] as Seg }));
  return edges.flatMap((edge, i) => edges.slice(i + 1).flatMap((other) => (isParallel(edge.seg, other.seg) ? [[edge.name, other.name] as [string, string]] : [])));
}

/** Điểm đường thẳng chứa `seg` đi qua tại hoành độ `x` (đường không thẳng đứng). */
export function pointAtX(seg: Seg, x: number): Point {
  const u = direction(seg);
  return { x, y: round1(seg[0].y + ((x - seg[0].x) * u.y) / u.x) };
}

/** Mũi tên nhỏ tại `tip`, chỉ theo hướng từ `from` tới `tip`; trả về chuỗi `points` của <polygon>. */
export function arrowHead(tip: Point, from: Point, size = 11): string {
  const length = Math.hypot(tip.x - from.x, tip.y - from.y);
  const ux = (tip.x - from.x) / length;
  const uy = (tip.y - from.y) / length;
  const bx = tip.x - ux * size;
  const by = tip.y - uy * size;
  const f = (n: number) => Math.round(n * 10) / 10;
  return `${f(tip.x)},${f(tip.y)} ${f(bx - uy * size * 0.45)},${f(by + ux * size * 0.45)} ${f(bx + uy * size * 0.45)},${f(by - ux * size * 0.45)}`;
}

/** Độ dài đoạn thẳng. */
export const lengthOf = (seg: Seg): number => Math.hypot(seg[1].x - seg[0].x, seg[1].y - seg[0].y);

/** Tứ giác (đỉnh theo thứ tự) có hai cặp cạnh đối diện song song và bằng nhau: A + C = B + D và không bị dẹt. Tọa độ nguyên nên so sánh chính xác. */
export function isParallelogram(points: Point[]): boolean {
  if (points.length !== 4) return false;
  const [a, b, c, d] = points;
  const cross = (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x);
  return Math.abs(a.x + c.x - b.x - d.x) < 1e-9 && Math.abs(a.y + c.y - b.y - d.y) < 1e-9 && Math.abs(cross) > 1e-9;
}

/** Hình bình hành có bốn cạnh bằng nhau. */
export function isRhombus(points: Point[]): boolean {
  if (!isParallelogram(points)) return false;
  const sides = points.map((p, i) => lengthOf([p, points[(i + 1) % 4]]));
  return sides.every((side) => Math.abs(side - sides[0]) < 1e-9);
}

/** Đỉnh thứ tư D để ABCD là hình bình hành: D = A + C − B (đối diện B). */
export function fourthVertex(a: Point, b: Point, c: Point): Point {
  return { x: a.x + c.x - b.x, y: a.y + c.y - b.y };
}

/** Diện tích đa giác (công thức dây giày). */
export function polygonArea(points: Point[]): number {
  return Math.abs(points.reduce((sum, p, i) => sum + (p.x * points[(i + 1) % points.length].y - points[(i + 1) % points.length].x * p.y), 0)) / 2;
}
