// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MatchBoard } from "./match-board";

const pairs = [
  { left: "Một con gà", right: "2 kg" },
  { left: "Một bao xi măng", right: "5 yến" },
  { left: "Một con lợn lớn", right: "1 tạ" },
];
const rightOrder = [1, 2, 0];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function setup(wrongCount = 0) {
  const onWrong = vi.fn();
  const onSolved = vi.fn();
  const { container } = render(
    <MatchBoard pairs={pairs} rightOrder={rightOrder} solved={false} wrongCount={wrongCount} onWrong={onWrong} onSolved={onSolved} />,
  );
  const handle = (index: number) => container.querySelector<HTMLElement>(`[data-handle="${index}"]`)!;
  const tile = (index: number) => container.querySelector<HTMLElement>(`[data-right="${index}"]`)!;
  /** jsdom không có bố cục: giả lập ô nằm dưới ngón tay. */
  const pointAt = (element: Element | null) => {
    document.elementFromPoint = vi.fn(() => element);
  };
  return { container, onWrong, onSolved, handle, tile, pointAt };
}

function drag(handle: HTMLElement, tile: HTMLElement | null, pointAt: (e: Element | null) => void) {
  fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 10, clientY: 10 });
  pointAt(tile);
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: 50, clientY: 50 });
  fireEvent.pointerUp(handle, { pointerId: 1, clientX: 50, clientY: 50 });
}

describe("nối cặp bằng cách kéo", () => {
  it("chấm kéo không cho trình duyệt cuộn khi chạm (touch-action: none)", () => {
    const { handle } = setup();
    expect(handle(0).className).toContain("touch-none");
    expect(handle(0).className).toContain("size-11");
  });

  it("kéo trúng ô đúng thì khóa cặp, nối hết thì báo đúng ngay lần đầu", () => {
    const { handle, tile, pointAt, onSolved, onWrong } = setup();
    for (const index of [0, 1, 2]) drag(handle(index), tile(index), pointAt);
    expect(onWrong).not.toHaveBeenCalled();
    expect(onSolved).toHaveBeenCalledExactlyOnceWith(true);
    expect(tile(0).hasAttribute("disabled")).toBe(true);
  });

  it("kéo sang ô sai thì tính một lần sai, cặp chưa khóa, làm lại được", () => {
    const { handle, tile, pointAt, onWrong, onSolved } = setup();
    drag(handle(0), tile(1), pointAt);
    expect(onWrong).toHaveBeenCalledTimes(1);
    expect(tile(1).hasAttribute("disabled")).toBe(false);
    drag(handle(0), tile(0), pointAt);
    expect(tile(0).hasAttribute("disabled")).toBe(true);
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("thả ra ngoài mọi ô thì không phạt", () => {
    const { handle, pointAt, onWrong } = setup();
    drag(handle(0), null, pointAt);
    expect(onWrong).not.toHaveBeenCalled();
  });

  it("ngắt giữa chừng (pointercancel, như khi trang bị cuộn) thì không nối và không phạt", () => {
    const { handle, tile, pointAt, onWrong } = setup();
    fireEvent.pointerDown(handle(0), { pointerId: 1, button: 0 });
    pointAt(tile(0));
    fireEvent.pointerCancel(handle(0), { pointerId: 1 });
    fireEvent.pointerUp(handle(0), { pointerId: 1 });
    expect(onWrong).not.toHaveBeenCalled();
    expect(tile(0).hasAttribute("disabled")).toBe(false);
  });

  it("chuột phải không bắt đầu kéo", () => {
    const { handle, tile, pointAt, onWrong, onSolved } = setup();
    fireEvent.pointerDown(handle(0), { pointerId: 1, button: 2 });
    pointAt(tile(0));
    fireEvent.pointerUp(handle(0), { pointerId: 1 });
    expect(onWrong).not.toHaveBeenCalled();
    expect(onSolved).not.toHaveBeenCalled();
    expect(tile(0).hasAttribute("disabled")).toBe(false);
  });

  it("nối lần sai trước đó thì không còn là lần đầu", () => {
    const { handle, tile, pointAt, onSolved } = setup(1);
    for (const index of [0, 1, 2]) drag(handle(index), tile(index), pointAt);
    expect(onSolved).toHaveBeenCalledExactlyOnceWith(false);
  });
});

describe("nối cặp bằng cách chạm", () => {
  it("chạm ô trái rồi chạm ô phải đúng thì khóa cặp", () => {
    const { tile, onWrong } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Một con gà" }));
    fireEvent.click(tile(0));
    expect(tile(0).hasAttribute("disabled")).toBe(true);
    expect(onWrong).not.toHaveBeenCalled();
  });

  it("chạm ô phải sai thì tính lỗi, bỏ chọn", () => {
    const { tile, onWrong } = setup();
    const left = screen.getByRole("button", { name: "Một con gà" });
    fireEvent.click(left);
    fireEvent.click(tile(1));
    expect(onWrong).toHaveBeenCalledTimes(1);
    expect(left.getAttribute("aria-pressed")).toBe("false");
  });

  it("chạm ô phải khi chưa chọn ô trái thì không làm gì", () => {
    const { tile, onWrong } = setup();
    fireEvent.click(tile(0));
    expect(onWrong).not.toHaveBeenCalled();
    expect(tile(0).hasAttribute("disabled")).toBe(false);
  });
});
