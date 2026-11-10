"use client";

import { Eraser, Pencil, PencilLine, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Tool = "pencil" | "eraser";

const tools = [
  { id: "pencil", label: "Bút chì", Icon: Pencil },
  { id: "eraser", label: "Tẩy", Icon: Eraser },
] as const;

const btn =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-2xl px-3 text-base font-bold text-ink";

/** Giấy nháp nổi: nút tròn góc phải dưới, bấm mở tờ giấy ô li để con viết bằng tay hoặc bút cảm ứng. */
export function DraftPaper() {
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<Tool>("pencil");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toolRef = useRef<Tool>("pencil");
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  // Canvas luôn mounted (chỉ ẩn) nên nét vẽ còn nguyên khi đóng/mở lại.
  // Khi đổi kích thước (xoay máy) thì chép bitmap cũ sang, không mất nét.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return; // đang ẩn
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(width * dpr);
      const h = Math.round(height * dpr);
      if (canvas.width === w && canvas.height === h) return;
      const copy = document.createElement("canvas");
      copy.width = canvas.width;
      copy.height = canvas.height;
      copy.getContext("2d")?.drawImage(canvas, 0, 0);
      canvas.width = w;
      canvas.height = h;
      if (copy.width) canvas.getContext("2d")?.drawImage(copy, 0, 0);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Vẽ: pointer events gộp chuột, tay, bút. touch-action: none để không cuộn trang khi viết.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let last: { x: number; y: number } | null = null;

    function point(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = canvas!.width / rect.width;
      return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
    }
    function stroke(from: { x: number; y: number }, to: { x: number; y: number }) {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      const dpr = canvas!.width / canvas!.getBoundingClientRect().width;
      const erase = toolRef.current === "eraser";
      ctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
      ctx.strokeStyle = "#4b2e83"; // ponytail: màu mực cố định, đổi màu khi cần
      ctx.lineWidth = (erase ? 24 : 3) * dpr;
      ctx.lineCap = ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
    const down = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      last = point(e);
      stroke(last, last); // chấm một điểm khi chỉ chạm
    };
    const move = (e: PointerEvent) => {
      if (!last) return;
      const p = point(e);
      stroke(last, p);
      last = p;
    };
    const up = () => (last = null);

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  function clearAll() {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <section
        aria-label="Giấy nháp"
        hidden={!open}
        className="fixed right-4 bottom-20 z-40 flex h-[70dvh] w-[80vw] flex-col gap-2 rounded-3xl bg-white p-3 shadow-[0_4px_24px_oklch(0.38_0.17_295/0.3)] md:h-[60dvh] md:portrait:w-1/2 md:landscape:w-1/3"
      >
        <div className="flex items-center gap-2">
          {tools.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={tool === id}
              onClick={() => setTool(id)}
              className={`${btn} ${tool === id ? "bg-ink text-white" : "bg-secondary hover:bg-secondary/70"}`}
            >
              <Icon aria-hidden className="size-5" />
              <span className="max-sm:sr-only">{label}</span>
            </button>
          ))}
          <button type="button" onClick={clearAll} className={`${btn} bg-secondary hover:bg-secondary/70`}>
            <Trash2 aria-hidden className="size-5" />
            <span className="max-sm:sr-only">Xóa hết</span>
          </button>
          <button
            type="button"
            aria-label="Đóng giấy nháp"
            onClick={() => setOpen(false)}
            className={`${btn} ml-auto hover:bg-secondary/70`}
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        {/* Nền ô li bằng CSS; canvas trong suốt nên tẩy chỉ xóa nét, giữ ô li. */}
        <div
          className="min-h-0 flex-1 overflow-hidden rounded-2xl border-2 border-input bg-paper"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            "--grid": "oklch(0.9 0.04 295)", // tím nhạt, nhạt hơn --input
          } as React.CSSProperties}
        >
          <canvas ref={canvasRef} className="block size-full touch-none" aria-label="Vùng viết nháp" />
        </div>
      </section>

      <button
        type="button"
        aria-label={open ? "Đóng giấy nháp" : "Mở giấy nháp"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-white shadow-lg hover:bg-ink/90"
      >
        <PencilLine aria-hidden className="size-6" />
      </button>
    </>
  );
}
