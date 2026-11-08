import { Khung } from "@/components/math/khung";

/** Đầu: 0 hình tròn, 1 hình thoi, 2 hình bình hành. Thân: 0 chân chụm hình chữ V, 1 chân hình bàn, 2 tay chữ T. */
export type NguoiQue = { head: 0 | 1 | 2; body: 0 | 1 | 2 };

export const tenDau = ["đầu hình tròn", "đầu hình thoi", "đầu hình bình hành"] as const;
export const tenThan = ["chân chữ V", "chân hình bàn", "tay chữ T"] as const;

/** Ô ở hàng i, cột j (đếm từ 0): đầu (i + j) mod 3, thân (i + 2j) mod 3. Mỗi hàng và mỗi cột có đủ ba đầu và ba thân. */
export const oLuoi = (i: number, j: number): NguoiQue => ({ head: ((i + j) % 3) as 0 | 1 | 2, body: ((i + 2 * j) % 3) as 0 | 1 | 2 });

/** Ô thiếu ở góc dưới bên phải. */
export const oThieu = { i: 2, j: 2 };

/** Bốn đáp án A, B, C, D. */
export const cacDapAn: NguoiQue[] = [
  { head: 0, body: 0 },
  { head: 1, body: 1 },
  { head: 1, body: 0 },
  { head: 2, body: 0 },
];

const f = (n: number) => Math.round(n * 10) / 10;

function Nguoi({ head, body }: NguoiQue) {
  const stroke = { stroke: "var(--unit-ta)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const shape =
    head === 0 ? (
      <circle cx={0} cy={-26} r={8} {...stroke} />
    ) : head === 1 ? (
      <polygon points="0,-36 8,-26 0,-16 -8,-26" {...stroke} />
    ) : (
      <polygon points="-4,-34 11,-34 4,-18 -11,-18" {...stroke} />
    );
  return (
    <g>
      {shape}
      <line x1={0} y1={-16} x2={0} y2={10} {...stroke} />
      {body === 0 ? <path d="M -9 24 L 0 10 L 9 24" {...stroke} /> : null}
      {body === 1 ? <path d="M -9 10 L 9 10 M -9 10 L -9 24 M 9 10 L 9 24" {...stroke} /> : null}
      {body === 2 ? <path d="M 0 10 L 0 26 M 0 22 L 12 22" {...stroke} /> : null}
    </g>
  );
}

const CELL = 70;

/** Bảng 3 x 3 các hình người que, ô cuối để trống, kèm bốn đáp án A, B, C, D. */
export function BangNguoiQue() {
  const letters = ["A", "B", "C", "D"];
  return (
    <Khung maxWidth={320}>
      <svg viewBox="0 0 300 350" role="img" aria-label={`Bảng 3 hàng 3 cột các hình người que. Ô cuối bảng có dấu hỏi. Bốn đáp án ở dưới.`} className="block w-full" fontWeight={800}>
        <g transform="translate(45 8)">
          <rect x={0} y={0} width={CELL * 3} height={CELL * 3} rx={6} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2} />
          {[1, 2].map((k) => (
            <g key={k} stroke="var(--input)" strokeWidth={2}>
              <line x1={k * CELL} y1={0} x2={k * CELL} y2={CELL * 3} />
              <line x1={0} y1={k * CELL} x2={CELL * 3} y2={k * CELL} />
            </g>
          ))}
          {[0, 1, 2].flatMap((i) =>
            [0, 1, 2].map((j) => {
              const center = `translate(${f(j * CELL + CELL / 2)} ${f(i * CELL + CELL / 2 + 4)})`;
              return i === oThieu.i && j === oThieu.j ? (
                <text key={`${i}${j}`} x={f(j * CELL + CELL / 2)} y={f(i * CELL + CELL / 2 + 10)} textAnchor="middle" fontSize={32} fill="var(--ink)">
                  ?
                </text>
              ) : (
                <g key={`${i}${j}`} transform={center}>
                  <Nguoi {...oLuoi(i, j)} />
                </g>
              );
            }),
          )}
        </g>
        {cacDapAn.map((figure, index) => (
          <g key={letters[index]} transform={`translate(${f(30 + index * 64)} 292)`}>
            <g transform="translate(14 0)">
              <Nguoi {...figure} />
            </g>
            <text x={-4} y={34} fontSize={16} fill="var(--ink)">
              {letters[index]}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
