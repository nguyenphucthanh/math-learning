type F = readonly [number, number];
const text = ([t, m]: F) => (m === 1 ? `${t}` : `${t}/${m}`);
const cls = "mx-auto block w-full max-w-md";

/** Sơ đồ chuỗi phép tính: số đầu, rồi mỗi mũi tên là một phép cộng hoặc trừ. Các ô sau là `?`. */
export function SoDoChuoi({ start, steps }: { start: F; steps: readonly { op: "+" | "-"; f: F }[] }) {
  const n = steps.length + 1;
  const pitch = 340 / n;
  const cx = (i: number) => Math.round(10 + pitch * i + pitch / 2);
  const w = Math.round(pitch - 28);
  return (
    <svg viewBox="0 0 360 96" role="img" aria-label={`Sơ đồ: bắt đầu từ ${text(start)}, ${steps.map((s) => `${s.op === "+" ? "cộng" : "trừ"} ${text(s.f)}`).join(", rồi ")}`} className={cls}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} fontWeight={800} fontSize={16} textAnchor="middle">
          <rect x={cx(i) - w / 2} y={44} width={w} height={40} rx={10} fill={i === 0 ? "var(--sun)" : "var(--paper)"} stroke="var(--ink)" strokeWidth={2.5} />
          <text x={cx(i)} y={70} fill="var(--ink)">{i === 0 ? text(start) : "?"}</text>
          {i > 0 && (
            <>
              <line x1={cx(i - 1) + w / 2 + 2} y1={64} x2={cx(i) - w / 2 - 6} y2={64} stroke="var(--ink)" strokeWidth={2.5} />
              <path d={`M${cx(i) - w / 2 - 2} 64 l-7 -5 v10 z`} fill="var(--ink)" />
              <text x={Math.round((cx(i - 1) + cx(i)) / 2)} y={34} fill="var(--foreground)" fontSize={14}>{`${steps[i - 1].op === "+" ? "+" : "−"} ${text(steps[i - 1].f)}`}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Thanh gỗ vẽ đúng tỉ lệ. Có `b` thì hai thanh `a` (từ trái) và `b` (từ phải) chồng lên nhau, ô hỏi là đoạn chồng. Không có `b` thì ô hỏi là phần còn lại của thanh dài. */
export function ThanhGo({ total, a, b }: { total: F; a: F; b?: F }) {
  const T = total[0] / total[1];
  const x0 = 20;
  const L = 320;
  const x = (v: number) => Math.round(x0 + (L * v) / T);
  const va = a[0] / a[1];
  const vb = b ? b[0] / b[1] : 0;
  const xa = x(va);
  const xb = x(T - vb);
  const bar = (x1: number, x2: number, y: number) => <rect x={x1} y={y} width={x2 - x1} height={12} rx={3} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} />;
  const label = (x1: number, x2: number, y: number, s: string, color = "var(--foreground)") => (
    <text x={Math.round((x1 + x2) / 2)} y={y} textAnchor="middle" fontSize={15} fontWeight={800} fill={color}>{s}</text>
  );
  const dash = (xx: number, y1: number, y2: number) => <line x1={xx} y1={y1} x2={xx} y2={y2} stroke="var(--input)" strokeWidth={2} strokeDasharray="4 4" />;
  const rows = b ? 4 : 3;
  const H = b ? 168 : 128;
  return (
    <svg
      viewBox={`0 0 360 ${H}`}
      role="img"
      aria-label={b ? `Thanh gỗ dài ${text(total)} m, thanh dài ${text(a)} m đặt từ đầu trái, thanh dài ${text(b)} m đặt từ đầu phải, hai thanh chồng lên nhau một đoạn cần tìm` : `Thanh gỗ dài ${text(total)} m, một phần dài ${text(a)} m, phần còn lại cần tìm`}
      className={cls}
      data-rows={rows}
    >
      {label(x0, x0 + L, 16, `${text(total)} m`)}
      {bar(x0, x(T), 22)}
      {dash(xa, 34, b ? 140 : 100)}
      {dash(x0, 34, b ? 140 : 100)}
      {dash(x(T), 34, b ? 140 : 100)}
      {b ? (
        <>
          {dash(xb, 34, 140)}
          {bar(x0, xa, 46)}
          {label(x0, xa, 74, `${text(a)} m`)}
          {bar(xb, x(T), 80)}
          {label(xb, x(T), 108, `${text(b)} m`)}
          {bar(xb, xa, 114)}
          {label(xb, xa, 144, "? m", "var(--ink)")}
        </>
      ) : (
        <>
          {bar(x0, xa, 46)}
          {label(x0, xa, 74, `${text(a)} m`)}
          {bar(xa, x(T), 80)}
          {label(xa, x(T), 108, "? m", "var(--ink)")}
        </>
      )}
    </svg>
  );
}
