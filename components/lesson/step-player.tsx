import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useRef, type RefObject } from "react";
import { ActionButton } from "./action-button";

gsap.registerPlugin(useGSAP);

/**
 * Hiệu ứng xuất hiện khi con bấm "Tiếp". Phần tử có `data-enter={bước}` được React vẽ sẵn
 * ở trạng thái cuối, GSAP chỉ thêm chuyển động. Tắt chuyển động thì nội dung vẫn đầy đủ.
 */
export function useStepEntrance(scope: RefObject<HTMLElement | SVGSVGElement | null>, step: number) {
  const previousStep = useRef(step);

  useGSAP(
    () => {
      const forward = step > previousStep.current;
      previousStep.current = step;
      if (!forward || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(`[data-enter="${step}"]`, {
        autoAlpha: 0,
        scale: (_index: number, element: Element) => Number(element.getAttribute("data-scale") ?? 0.5),
        transformOrigin: "50% 50%",
        duration: 0.4,
        ease: "power3.out",
        stagger: { amount: 0.7, from: "start" },
      });
    },
    { scope, dependencies: [step] },
  );
}

/** Lời giải thích và nút điều khiển: con tự bấm từng bước, có quay lại và xem lại. */
export function StepControls({
  step,
  captions,
  onChange,
}: {
  step: number;
  captions: string[];
  onChange: (step: number) => void;
}) {
  const last = captions.length - 1;

  return (
    <div className="mt-4">
      <p aria-live="polite" className="min-h-[5.25rem] text-lg leading-relaxed font-semibold sm:min-h-[3.5rem]">
        {captions[step]}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <ActionButton
          variant="soft"
          aria-label="Quay lại bước trước"
          className="px-3"
          disabled={step === 0}
          onClick={() => onChange(step - 1)}
        >
          <ArrowLeft aria-hidden />
        </ActionButton>
        {step < last ? (
          <ActionButton className="flex-1" onClick={() => onChange(step + 1)}>
            Tiếp
            <ArrowRight aria-hidden />
          </ActionButton>
        ) : (
          <ActionButton variant="soft" className="flex-1" onClick={() => onChange(0)}>
            <RotateCcw aria-hidden />
            Xem lại
          </ActionButton>
        )}
        <span className="min-w-12 text-center text-base font-bold text-muted-foreground tabular-nums">
          {step + 1}/{captions.length}
        </span>
      </div>
    </div>
  );
}
