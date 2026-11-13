import { Khung } from "./khung";

/** Phân số viết dọc: tử số trên gạch ngang, mẫu số dưới gạch ngang. */
export function PhanSo({ tu, mau, className = "" }: { tu: number; mau: number; className?: string }) {
  return (
    <span role="img" aria-label={`${tu} trên ${mau}`} className={`mx-1 inline-flex flex-col items-center align-middle leading-tight font-extrabold tabular-nums ${className}`}>
      <span className="border-b-[3px] border-current px-1.5">{tu}</span>
      <span className="px-1.5">{mau}</span>
    </span>
  );
}

const ones = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

/** Đọc số từ 1 đến 99 như SGK (11 mười một, 21 hai mươi mốt, 25 hai mươi lăm). */
export function docSo(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 99) throw new Error(`docSo: ${n}`);
  if (n < 10) return ones[n];
  const tens = Math.floor(n / 10);
  const unit = n % 10;
  const head = tens === 1 ? "mười" : `${ones[tens]} mươi`;
  if (unit === 0) return head;
  if (unit === 5) return `${head} lăm`;
  if (unit === 1 && tens > 1) return `${head} mốt`;
  return `${head} ${ones[unit]}`;
}

/** Tử số đọc số đếm, mẫu số đọc "phần" rồi số: 2/6 là "hai phần sáu". */
export const docPhanSo = (tu: number, mau: number) => `${docSo(tu)} phần ${docSo(mau)}`;

export type HinhPhanSoProps = {
  kieu: "tron" | "bang" | "nhom";
  /** Số phần bằng nhau của cả hình (mẫu số). */
  mau: number;
  /** Số phần đã tô (tô từ đầu) hoặc danh sách vị trí các phần đã tô, tính từ 0. */
  to: number | number[];
  /** Số cột của băng ô hoặc nhóm đồ vật. */
  cot?: number;
  /** Chỉ cho hình tròn: tỉ lệ độ lớn từng phần. Không có thì các phần bằng nhau. */
  chia?: number[];
};

export const FILL = "var(--sun)";

/** Các vị trí đã tô. */
export const phanTo = (to: number | number[]) => new Set(Array.isArray(to) ? to : Array.from({ length: to }, (_, i) => i));

const f = (n: number) => Math.round(n * 100) / 100;

/** Đường biên một múi hình tròn, góc tính từ đỉnh theo chiều kim đồng hồ. */
export function sectorPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => `${f(cx + r * Math.sin(a))} ${f(cy - r * Math.cos(a))}`;
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z`;
}

/**
 * Hình minh họa phân số: hình tròn chia múi, băng ô, hoặc nhóm đồ vật.
 * Server Component, dùng chung cho các bài phân số.
 */
export function HinhPhanSo({ kieu, mau, to, cot, chia }: HinhPhanSoProps) {
  const tô = phanTo(to);
  const deu = !chia || chia.every((x) => x === chia[0]);
  const mo = `${mau} phần ${deu ? "bằng nhau" : "không bằng nhau"}, đã tô ${tô.size} phần`;

  if (kieu === "tron") {
    const weights = chia ?? Array.from({ length: mau }, () => 1);
    const total = weights.reduce((a, b) => a + b, 0);
    return (
      <Khung maxWidth={240}>
        <svg viewBox="0 0 200 200" role="img" aria-label={`Hình tròn chia thành ${mo}`} className="block w-full">
          <g stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round">
            {weights.map((w, i) => {
              const before = weights.slice(0, i).reduce((a, b) => a + b, 0);
              const a0 = (before / total) * 2 * Math.PI;
              const a1 = ((before + w) / total) * 2 * Math.PI;
              return <path key={i} d={sectorPath(100, 100, 90, a0, a1)} fill={tô.has(i) ? FILL : "white"} data-to={tô.has(i) ? "" : undefined} />;
            })}
          </g>
        </svg>
      </Khung>
    );
  }

  const cols = cot ?? mau;
  const rows = Math.ceil(mau / cols);
  const cell = Math.min(52, Math.floor(320 / cols));
  const w = cols * cell + 8;
  const h = rows * cell + 8;
  return (
    <Khung maxWidth={Math.max(w + 32, 160)}>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${kieu === "bang" ? "Băng ô" : "Nhóm hình tròn"} có ${mo}`} className="block w-full">
        <g stroke="var(--ink)" strokeWidth={2.5}>
          {Array.from({ length: mau }, (_, i) => {
            const x = 4 + (i % cols) * cell;
            const y = 4 + Math.floor(i / cols) * cell;
            const fill = tô.has(i) ? FILL : "white";
            const mark = tô.has(i) ? "" : undefined;
            return kieu === "bang" ? (
              <rect key={i} x={x} y={y} width={cell} height={cell} rx={4} fill={fill} data-to={mark} />
            ) : (
              <circle key={i} cx={x + cell / 2} cy={y + cell / 2} r={cell * 0.38} fill={fill} data-to={mark} />
            );
          })}
        </g>
      </svg>
    </Khung>
  );
}
