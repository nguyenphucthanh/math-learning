const CENTER = 80;
const MAX_KG = 100;

const round = (value: number) => Math.round(value * 10) / 10;

/** Góc kim tính theo độ, từ vạch 100 ở đỉnh, quay theo chiều kim đồng hồ. 25 kg ở bên phải, 50 kg ở dưới. */
export function needleAngle(kg: number): number {
  return (kg / MAX_KG) * 360;
}

/** Điểm cách tâm `radius`, nằm ở góc `angle` của mặt cân. Làm tròn để server và client vẽ giống nhau. */
export function dialPoint(angle: number, radius: number): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180;
  return { x: round(CENTER + radius * Math.sin(radians)), y: round(CENTER - radius * Math.cos(radians)) };
}

const TICKS = Array.from({ length: 20 }, (_, index) => index * 5);
const LABELS = [
  { kg: 25, text: "25" },
  { kg: 50, text: "50" },
  { kg: 75, text: "75" },
];

/** Cân đồng hồ tối đa 100 kg. Nhãn 25, 50, 75, 100; mỗi vạch nhỏ là 5 kg. */
export function ScaleDial({ kg, caption }: { kg: number; caption?: string }) {
  const tip = dialPoint(needleAngle(kg), 56);
  return (
    <figure className="flex flex-col items-center gap-1">
      <svg
        viewBox="0 0 160 160"
        role="img"
        aria-label="Cân đồng hồ tối đa 100 kg, có nhãn 25, 50, 75 và 100, mỗi vạch nhỏ là 5 kg. Đọc số đo từ kim cân."
        className="block w-40"
        data-kg={kg}
      >
        <circle cx={CENTER} cy={CENTER} r={76} fill="var(--unit-tan-soft)" stroke="var(--unit-tan)" strokeWidth={4} />
        <circle cx={CENTER} cy={CENTER} r={70} fill="white" />
        {TICKS.map((tick) => {
          const major = tick % 25 === 0;
          const from = dialPoint(needleAngle(tick), 70);
          const to = dialPoint(needleAngle(tick), major ? 60 : 64);
          return (
            <line
              key={tick}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--foreground)"
              strokeWidth={major ? 3 : 1.5}
              strokeLinecap="round"
            />
          );
        })}
        <text x={CENTER} y={34} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
          100 kg
        </text>
        {LABELS.map((label) => {
          const spot = dialPoint(needleAngle(label.kg), 46);
          return (
            <text
              key={label.kg}
              x={spot.x}
              y={spot.y + 5}
              textAnchor="middle"
              fontSize={14}
              fontWeight={800}
              fill="var(--foreground)"
            >
              {label.text}
            </text>
          );
        })}
        <line
          data-testid="scale-needle"
          x1={CENTER}
          y1={CENTER}
          x2={tip.x}
          y2={tip.y}
          stroke="var(--ink)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={CENTER} cy={CENTER} r={6} fill="var(--ink)" />
      </svg>
      {caption ? <figcaption className="text-base font-bold">{caption}</figcaption> : null}
    </figure>
  );
}

/** Một hàng cân. Ba cân trở lên tự xuống dòng trên điện thoại. */
export function ScaleRow({ readings, captions }: { readings: number[]; captions?: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {readings.map((kg, index) => (
        <ScaleDial key={index} kg={kg} caption={captions?.[index]} />
      ))}
    </div>
  );
}
