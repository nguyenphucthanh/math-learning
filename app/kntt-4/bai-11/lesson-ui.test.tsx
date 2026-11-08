// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { formatNumber } from "@/lib/area-units";
import { BangHangLop } from "@/components/math/bang-hang-lop";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChonChuSo } from "./_animations/chon-chu-so";
import { HangVaLop } from "./_animations/hang-va-lop";
import { LopTrieu } from "./_animations/lop-trieu";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("bảng hàng và lớp hai lớp", () => {
  it("chỉ có 6 ô chữ số, mô tả không nhắc lớp triệu", () => {
    const { container } = render(<BangHangLop value={514293} classes={2} mark={[0, 1, 2]} />);
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("lớp nghìn 5, 1, 4");
    expect(label).toContain("lớp đơn vị 2, 9, 3");
    expect(label).not.toContain("lớp triệu");
    expect(container.querySelectorAll("rect[stroke]")).toHaveLength(6);
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(3);
  });
});

describe("hàng và lớp", () => {
  it("đi hết bốn bước: tô lớp đơn vị, rồi lớp nghìn, rồi xem lại", async () => {
    const user = userEvent.setup();
    const { container } = render(<HangVaLop />);
    const marked = () => container.querySelectorAll('rect[fill="var(--sun)"]').length;
    expect(marked()).toBe(0);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(marked()).toBe(3);
    expect(screen.getByText(/hợp thành lớp đơn vị/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText(/hợp thành lớp nghìn/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(marked()).toBe(0);
    expect(screen.getByText(/năm trăm mười bốn nghìn/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByText(/Rô-bốt lập số/)).toBeTruthy();
  });
});

describe("chạm chọn chữ số", () => {
  it("nói đúng hàng, lớp và giá trị", async () => {
    const user = userEvent.setup();
    render(<ChonChuSo />);
    await user.click(screen.getByRole("button", { name: "Chữ số 2, thứ 3 từ trái sang" }));
    expect(screen.getByRole("status").textContent).toContain("hàng nghìn, thuộc lớp nghìn");
    expect(screen.getByRole("status").textContent).toContain(formatNumber(2000));
    await user.click(screen.getByRole("button", { name: "Chữ số 0, thứ 6 từ trái sang" }));
    expect(screen.getByRole("status").textContent).toContain("hàng đơn vị, thuộc lớp đơn vị");
  });
});

describe("lớp triệu", () => {
  it("đi từ 1 triệu đến 531 000 000 và tô đúng hàng", async () => {
    const user = userEvent.setup();
    const { container } = render(<LopTrieu />);
    const marked = () => container.querySelectorAll('rect[fill="var(--sun)"]').length;
    expect(marked()).toBe(1);
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(marked()).toBe(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("lớp triệu 5, 3, 1");
    expect(screen.getByText(/năm trăm ba mươi mốt triệu/)).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("bắt đầu từ 0 câu và có câu đầu tiên", () => {
    render(<ExerciseSet lessonSlug="bai-11" groups={exerciseGroups} />);
    expect(screen.getAllByText(/Hàng và lớp/).length).toBeGreaterThan(0);
  });
});
