// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BangGiay, bangGiayCaptions } from "./_animations/bang-giay";
import { NhanChia, nhanChiaCaptions } from "./_animations/nhan-chia";
import { ThuongKhongDoi, thuongCaptions, thuongRows } from "./_animations/thuong-khong-doi";
import { HaiBang } from "./_illustrations/bang-giay";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("hình hai băng giấy", () => {
  it("vẽ đúng số phần và số phần tô", () => {
    const { container } = render(<HaiBang top={[2, 3]} bottom={[4, 6]} />);
    expect(container.querySelectorAll("rect")).toHaveLength(9);
    expect(container.querySelectorAll('rect[fill-opacity="0.55"]')).toHaveLength(6);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chia 6 phần");
  });
});

describe("animation băng giấy", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<BangGiay />);
    const user = userEvent.setup();
    expect(bangGiayCaptions).toHaveLength(3);
    expect(container.querySelectorAll("rect")).toHaveLength(3);
    await next(user);
    expect(container.querySelectorAll("rect")).toHaveLength(9);
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("2/3 bằng 4/6");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("rect")).toHaveLength(3);
  });
});

describe("animation nhân và chia cả tử số và mẫu số", () => {
  it("bấm hết các bước", async () => {
    const { container } = render(<NhanChia />);
    const user = userEvent.setup();
    expect(nhanChiaCaptions).toHaveLength(4);
    await next(user);
    expect(container.textContent).toContain("2 × 2");
    await next(user);
    expect(container.textContent).toContain("4 : 2");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("không bằng 4/3");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("4 : 2");
  });
});

describe("animation thương không đổi", () => {
  it("ba hàng cùng thương 3", async () => {
    render(<ThuongKhongDoi />);
    const user = userEvent.setup();
    expect(thuongCaptions).toHaveLength(3);
    for (const [a, b] of thuongRows) expect(a / b).toBe(3);
    await next(user);
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 chia 2 bằng 3");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).not.toContain("6 chia 2");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-55" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
