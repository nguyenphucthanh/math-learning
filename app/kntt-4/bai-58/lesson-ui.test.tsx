// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { QuyDongSoSanh, quyDongCaptions } from "./_animations/quy-dong";
import { ThanhPhanSo, thanhCaptions } from "./_animations/thanh-phan-so";
import { HaiHinh } from "./_illustrations/hai-hinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation quy đồng so sánh 7/8 và 3/4", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<QuyDongSoSanh />);
    const user = userEvent.setup();
    expect(quyDongCaptions).toHaveLength(3);
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(0);
    await next(user);
    expect(container.querySelectorAll("line").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3/4 bằng 6/8");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("7/8 lớn hơn 6/8");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("nên 7/8");
  });
});

describe("animation thanh phân số", () => {
  it("bấm hết các bước", async () => {
    const { container } = render(<ThanhPhanSo />);
    const user = userEvent.setup();
    expect(thanhCaptions).toHaveLength(3);
    expect(container.querySelectorAll("rect")).toHaveLength(16);
    await next(user);
    expect(container.textContent).toContain("5/8 > 3/8");
    await next(user);
    expect(container.querySelectorAll("rect")).toHaveLength(20);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3/4 lớn hơn 3/8");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("rect")).toHaveLength(16);
  });
});

describe("hình hai hình như nhau", () => {
  it("vẽ cả hai hình", () => {
    render(<HaiHinh a={{ kieu: "tron", mau: 6, to: 2 }} b={{ kieu: "bang", mau: 8, to: 3, cot: 4 }} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-58" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
