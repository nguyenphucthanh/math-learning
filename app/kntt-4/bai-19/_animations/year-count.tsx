const YEARS = [2011, 2012, 2013];

/** Hình tĩnh: đếm cả năm đầu và năm cuối, không dùng phép trừ. */
export function YearCount() {
  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <figcaption className="text-lg font-semibold">Từ đầu năm 2011 đến hết năm 2013:</figcaption>
      <ol className="mt-3 grid grid-cols-3 gap-2">
        {YEARS.map((year, index) => (
          <li key={year} className="rounded-2xl bg-unit-century-soft p-2 text-center">
            <span className="block text-xl font-extrabold tabular-nums">{year}</span>
            <span className="block text-base font-bold text-unit-century">năm thứ {index + 1}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-lg leading-relaxed font-semibold">
        Có <strong className="font-extrabold text-ink">3 năm</strong>. Nếu chỉ lấy 2013 − 2011 = 2 thì bị thiếu một năm.
      </p>
    </figure>
  );
}
