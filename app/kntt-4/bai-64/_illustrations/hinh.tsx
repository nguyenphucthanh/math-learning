type F = readonly [number, number];
const text = ([t, m]: F) => (m === 1 ? `${t}` : `${t}/${m}`);
export type MulOp = "×" | ":";

/** Sơ đồ chuỗi phép tính nhân, chia phân số: số đầu, mỗi mũi tên là một phép × hoặc :. Các ô sau là `?`. */
export function SoDoChuoi({ start, steps }: { start: F; steps: readonly { op: MulOp; f: F }[] }) {
  const n = steps.length + 1;
  const pitch = 340 / n;
  const cx = (i: number) => Math.round(10 + pitch * i + pitch / 2);
  const w = Math.round(pitch - 28);
  return (
    <svg viewBox="0 0 360 96" role="img" aria-label={`Sơ đồ: bắt đầu từ ${text(start)}, ${steps.map((s) => `${s.op === "×" ? "nhân" : "chia"} ${text(s.f)}`).join(", rồi ")}`} className="mx-auto block w-full max-w-md">
      {Array.from({ length: n }, (_, i) => (
        <g key={i} fontWeight={800} fontSize={16} textAnchor="middle">
          <rect x={cx(i) - w / 2} y={44} width={w} height={40} rx={10} fill={i === 0 ? "var(--sun)" : "var(--paper)"} stroke="var(--ink)" strokeWidth={2.5} />
          <text x={cx(i)} y={70} fill="var(--ink)">{i === 0 ? text(start) : "?"}</text>
          {i > 0 && (
            <>
              <line x1={cx(i - 1) + w / 2 + 2} y1={64} x2={cx(i) - w / 2 - 6} y2={64} stroke="var(--ink)" strokeWidth={2.5} />
              <path d={`M${cx(i) - w / 2 - 2} 64 l-7 -5 v10 z`} fill="var(--ink)" />
              <text x={Math.round((cx(i - 1) + cx(i)) / 2)} y={34} fill="var(--foreground)" fontSize={14}>{`${steps[i - 1].op} ${text(steps[i - 1].f)}`}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
