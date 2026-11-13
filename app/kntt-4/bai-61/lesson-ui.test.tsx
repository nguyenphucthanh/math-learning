// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { TruCungMau, truCungMauCaptions } from "./_animations/tru-cung-mau";
import { TruKhacMau, truKhacMauCaptions } from "./_animations/tru-khac-mau";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation trừ cùng mẫu số 7/8 − 2/8", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<TruCungMau />);
    const user = userEvent.setup();
    expect(truCungMauCaptions).toHaveLength(3);
    expect(container.querySelectorAll("rect")).toHaveLength(8);
    expect(container.querySelectorAll("line").length).toBe(1);
    await next(user);
    expect(container.querySelectorAll("line").length).toBe(1 + 1 + 4);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("lấy đi 2 ô");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bằng 5/8");
    expect(container.textContent).toContain("7 − 2");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("7 − 2");
  });
});

describe("animation trừ khác mẫu số 7/8 − 1/4", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<TruKhacMau />);
    const user = userEvent.setup();
    expect(truKhacMauCaptions).toHaveLength(3);
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(0);
    expect(container.textContent).toContain("= ?");
    await next(user);
    expect(container.querySelectorAll("line")).toHaveLength(4);
    expect(container.textContent).toContain("1/4 = (1 × 2)/(4 × 2) = 2/8");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bằng 5/8");
    expect(container.textContent).toContain("(7 − 2)/8 = 5/8");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("(7 − 2)/8");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-61" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
