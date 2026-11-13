/** Vòng quay 4 múi bằng nhau, xen kẽ đỏ và vàng; mũi tên cố định ở trên. */
export function VongQuay() {
  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label="Vòng quay có 4 phần bằng nhau: 2 phần màu đỏ và 2 phần màu vàng, xen kẽ. Mũi tên ở phía trên." className="block w-full" fontWeight={800}>
        <g stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round">
          <path d="M100 110 L100 40 A70 70 0 0 1 170 110 Z" fill="var(--unit-mm2)" />
          <path d="M100 110 L170 110 A70 70 0 0 1 100 180 Z" fill="var(--sun)" />
          <path d="M100 110 L100 180 A70 70 0 0 1 30 110 Z" fill="var(--unit-mm2)" />
          <path d="M100 110 L30 110 A70 70 0 0 1 100 40 Z" fill="var(--sun)" />
        </g>
        <path d="M100 6 L88 24 L112 24 Z M100 20 L100 38" fill="var(--ink)" stroke="var(--ink)" strokeWidth={4} strokeLinejoin="round" />
        <rect x={205} y={50} width={22} height={22} rx={5} fill="var(--unit-mm2)" stroke="var(--ink)" strokeWidth={2} />
        <text x={234} y={68} fontSize={16} fill="var(--ink)">Phần màu đỏ</text>
        <rect x={205} y={110} width={22} height={22} rx={5} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} />
        <text x={234} y={128} fontSize={16} fill="var(--ink)">Phần màu vàng</text>
      </svg>
      <figcaption className="mt-3 text-lg leading-relaxed font-semibold">Mũi tên đứng yên. Vòng quay dừng lại thì mũi tên chỉ vào một phần màu.</figcaption>
    </figure>
  );
}
