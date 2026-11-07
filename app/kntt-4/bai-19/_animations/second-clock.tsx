"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const CENTER = 160;

const stops = [
  { seconds: 0, minutes: 0 },
  { seconds: 1, minutes: 0 },
  { seconds: 5, minutes: 0 },
  { seconds: 30, minutes: 0 },
  { seconds: 60, minutes: 1 },
  { seconds: 60, minutes: 1 },
];

const captions = [
  "Một giây có lâu không? Nhìn mặt đồng hồ nhé. Quanh đồng hồ có các vạch nhỏ. Kim mảnh màu xanh là kim giây.",
  "Kim giây đi được 1 vạch là 1 giây.",
  "Đi đến số 1 là 5 vạch, tức là 5 giây.",
  "Đếm tiếp theo 5: 10, 15, 20, 25, 30. Kim giây đã đi nửa vòng, là 30 giây.",
  "Đếm hết một vòng là 60 giây. Lúc đó kim phút nhích được 1 vạch.",
  "Kim giây đi hết một vòng thì kim phút đi 1 vạch. Vậy 1 phút = 60 giây.",
];

function point(tick: number, radius: number) {
  const angle = (tick * 6 * Math.PI) / 180;
  return {
    x: Number((CENTER + radius * Math.sin(angle)).toFixed(2)),
    y: Number((CENTER - radius * Math.cos(angle)).toFixed(2)),
  };
}

const rotation = (degrees: number) => `rotate(${degrees} ${CENTER} ${CENTER})`;

/** Kim quay từ vị trí cũ tới vị trí mới khi đi tiếp. React luôn vẽ sẵn vị trí cuối. */
function useHandSweep(hand: React.RefObject<SVGGElement | null>, degrees: number) {
  const previous = useRef(degrees);
  const tween = useRef<gsap.core.Tween>(null);

  useGSAP(
    () => {
      const from = previous.current;
      previous.current = degrees;
      tween.current?.kill();
      if (degrees <= from || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const state = { degrees: from };
      tween.current = gsap.to(state, {
        degrees,
        duration: Math.min(1.6, Math.max(0.3, (degrees - from) / 180)),
        ease: "power1.inOut",
        onUpdate: () => hand.current?.setAttribute("transform", rotation(state.degrees)),
      });
    },
    { dependencies: [degrees] },
  );
}

/** Mặt đồng hồ: đếm vạch để thấy vì sao 1 phút = 60 giây, không phải 100. */
export function SecondClock() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const secondHand = useRef<SVGGElement>(null);
  const minuteHand = useRef<SVGGElement>(null);
  const { seconds, minutes } = stops[step];

  useStepEntrance(scope, step);
  useHandSweep(secondHand, seconds * 6);
  useHandSweep(minuteHand, minutes * 6);

  const reading = step === 0 ? "" : step === 5 ? "1 phút = 60 giây" : `${seconds} giây`;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 320 362"
        role="img"
        aria-label={`Mặt đồng hồ, kim giây đã đi ${seconds} vạch, kim phút đã đi ${minutes} vạch`}
        className="mx-auto block w-full max-w-md"
      >
        <circle cx={CENTER} cy={CENTER} r={130} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />

        {Array.from({ length: 60 }, (_, tick) => {
          const outer = point(tick, 128);
          const inner = point(tick, tick % 5 === 0 ? 112 : 118);
          const passed = seconds > 0 && (tick === 0 ? seconds >= 60 : tick <= seconds);
          return (
            <line
              key={tick}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={passed ? "var(--unit-second)" : "var(--foreground)"}
              strokeOpacity={passed ? 1 : 0.45}
              strokeWidth={passed ? 3.5 : tick % 5 === 0 ? 2.5 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {step >= 3
          ? Array.from({ length: seconds / 5 }, (_, index) => {
              const { x, y } = point((index + 1) * 5, 145);
              return (
                <text
                  key={index}
                  data-enter={step === 3 ? 3 : 4}
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight={800}
                  fill="var(--unit-second)"
                >
                  {(index + 1) * 5}
                </text>
              );
            })
          : null}

        <line x1={CENTER} y1={CENTER} x2={CENTER} y2={CENTER - 52} stroke="var(--foreground)" strokeWidth={7} strokeLinecap="round" />
        <g ref={minuteHand} transform={rotation(minutes * 6)}>
          <line x1={CENTER} y1={CENTER} x2={CENTER} y2={CENTER - 82} stroke="var(--unit-minute)" strokeWidth={5} strokeLinecap="round" />
        </g>
        <g ref={secondHand} transform={rotation(seconds * 6)}>
          <line x1={CENTER} y1={CENTER + 14} x2={CENTER} y2={CENTER - 108} stroke="var(--unit-second)" strokeWidth={2.5} strokeLinecap="round" />
        </g>
        <circle cx={CENTER} cy={CENTER} r={6} fill="var(--foreground)" />

        {Array.from({ length: 12 }, (_, index) => {
          const { x, y } = point((index + 1) * 5, 93);
          return (
            <text key={index} x={x} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--foreground)" stroke="var(--paper)" strokeWidth={5} paintOrder="stroke">
              {index + 1}
            </text>
          );
        })}

        <text x={CENTER} y={344} textAnchor="middle" fontSize={24} fontWeight={800} fill="var(--unit-second)" className="tabular-nums">
          {reading}
        </text>
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
