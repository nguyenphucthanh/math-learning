const cls = "mx-auto block w-full max-w-md";

/** Mảnh đất ABCD rộng 4 m, lối đi rộng 1 m chạy dọc cạnh DC, phần còn lại là ao. Vẽ theo tỉ lệ 4 : 1 theo chiều rộng. */
export function AoDat() {
  const x0 = 40;
  const x1 = 330;
  const y0 = 24;
  const h = 104;
  const path = h / 4;
  return (
    <svg viewBox="0 0 360 160" role="img" aria-label="Mảnh đất hình chữ nhật ABCD, chiều rộng AD là 4 m. Lối đi rộng 1 m nằm sát cạnh DC, phần còn lại phía trên là ao" className={cls}>
      <rect x={x0} y={y0} width={x1 - x0} height={h - path} fill="var(--unit-m2-soft)" stroke="var(--ink)" strokeWidth={2.5} />
      <rect x={x0} y={y0 + h - path} width={x1 - x0} height={path} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2.5} />
      <g fontWeight={800} fontSize={15} fill="var(--foreground)">
        <text x={x0 - 6} y={y0 - 6} textAnchor="end">A</text>
        <text x={x1 + 6} y={y0 - 6}>B</text>
        <text x={x1 + 6} y={y0 + h + 16}>C</text>
        <text x={x0 - 6} y={y0 + h + 16} textAnchor="end">D</text>
        <text x={(x0 + x1) / 2} y={y0 + (h - path) / 2 + 5} textAnchor="middle" fill="var(--ink)">Ao</text>
        <text x={(x0 + x1) / 2} y={y0 + h - path / 2 + 5} textAnchor="middle" fill="var(--ink)">Lối đi, rộng 1 m</text>
        <text x={x0 - 8} y={y0 + h / 2 + 5} textAnchor="end">4 m</text>
        <text x={(x0 + x1) / 2} y={152} textAnchor="middle">Diện tích cả mảnh đất: 91/2 m²</text>
      </g>
    </svg>
  );
}

/** Hình chữ nhật AEGD chia đôi bằng đoạn BC. Chiều dài hai phần vẽ đúng tỉ lệ 21/4 : 25/2. */
export function HinhChiaDoi() {
  const x0 = 40;
  const L = 300;
  const total = 21 / 4 + 25 / 2;
  const xb = Math.round(x0 + (L * 21) / 4 / total);
  const x1 = x0 + L;
  return (
    <svg viewBox="0 0 360 120" role="img" aria-label="Hình chữ nhật AEGD rộng 2 cm, chia bởi đoạn BC thành hai hình chữ nhật: ABCD có diện tích 21/2 cm², BEGC có diện tích 25 cm²" className={cls}>
      <rect x={x0} y={34} width={xb - x0} height={56} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2.5} />
      <rect x={xb} y={34} width={x1 - xb} height={56} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5} />
      <g fontWeight={800} fontSize={15} fill="var(--foreground)">
        <text x={x0} y={26} textAnchor="middle">A</text>
        <text x={xb} y={26} textAnchor="middle">B</text>
        <text x={x1} y={26} textAnchor="middle">E</text>
        <text x={x0} y={110} textAnchor="middle">D</text>
        <text x={xb} y={110} textAnchor="middle">C</text>
        <text x={x1} y={110} textAnchor="middle">G</text>
        <text x={x0 - 8} y={67} textAnchor="end">2 cm</text>
        <text x={Math.round((x0 + xb) / 2)} y={67} textAnchor="middle" fill="var(--ink)">21/2 cm²</text>
        <text x={Math.round((xb + x1) / 2)} y={67} textAnchor="middle" fill="var(--ink)">25 cm²</text>
      </g>
    </svg>
  );
}

export type MauKhay = "trang" | "vang" | "den";
const fillOf: Record<MauKhay, string> = { trang: "#ffffff", vang: "var(--sun)", den: "var(--ink)" };
const nameOf: Record<MauKhay, string> = { trang: "trắng", vang: "vàng", den: "đen" };

/** Kệ khay ốc vít: mỗi hàng 2 khay. `hang[i]` là màu hai khay của hàng i. */
export function KhayOcVit({ hang }: { hang: readonly (readonly [MauKhay, MauKhay])[] }) {
  const w = 96;
  const h = 34;
  const x0 = 84;
  return (
    <svg viewBox="0 0 360 170" role="img" aria-label={`Kệ ${hang.length * 2} khay ốc vít, mỗi hàng 2 khay. ${hang.map((row, i) => `Hàng ${i + 1}: ${row.map((c) => nameOf[c]).join(", ")}`).join("; ")}`} className={cls}>
      {hang.map((row, i) =>
        row.map((color, j) => (
          <rect key={`${i}-${j}`} x={x0 + j * (w + 6)} y={8 + i * (h + 6)} width={w} height={h} rx={5} fill={fillOf[color]} stroke="var(--ink)" strokeWidth={2.5} />
        )),
      )}
    </svg>
  );
}
