// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { CungMau, cungMauCaptions } from "./_animations/cung-mau";
import { KhacMau, khacMauCaptions } from "./_animations/khac-mau";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation cộng cùng mẫu số", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<CungMau />);
    const user = userEvent.setup();
    expect(cungMauCaptions).toHaveLength(4);
    await next(user);
    await next(user);
    expect(container.textContent).toContain("1 + 2");
    await next(user);
    expect(container.textContent).toContain("3/10 ✗");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("3/10 ✗");
  });
});

describe("animation cộng khác mẫu số", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<KhacMau />);
    const user = userEvent.setup();
    expect(khacMauCaptions).toHaveLength(4);
    await next(user);
    expect(container.textContent).toContain("(1 × 4)/(2 × 4)");
    await next(user);
    expect(container.textContent).toContain("1 + 4");
    await next(user);
    expect(container.textContent).toContain("2/10 ✗");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("(1 × 4)/(2 × 4)");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-60" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
