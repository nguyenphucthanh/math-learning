// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { RutGon, rutGonCaptions } from "./_animations/rut-gon";
import { ToiGian, toiGianCaptions } from "./_animations/toi-gian";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation rút gọn 20/35", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<RutGon />);
    const user = userEvent.setup();
    expect(rutGonCaptions).toHaveLength(4);
    await next(user);
    expect(container.textContent).toContain("chia hết cho 5");
    await next(user);
    expect(container.textContent).toContain("20 : 5");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("= 4/7");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("20 : 5");
  });
});

describe("animation đến phân số tối giản", () => {
  it("bấm hết các bước", async () => {
    const { container } = render(<ToiGian />);
    const user = userEvent.setup();
    expect(toiGianCaptions).toHaveLength(4);
    await next(user);
    expect(container.textContent).toContain("48 : 2");
    await next(user);
    expect(container.textContent).toContain("24 : 2");
    await next(user);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("phân số tối giản");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("24 : 2");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-56" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
