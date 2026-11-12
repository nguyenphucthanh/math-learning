// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { RutVeChia, RutVeNhan, rutVeChiaCaptions, rutVeNhanCaptions } from "./_animations/rut-ve-don-vi";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("animation rút về đơn vị", () => {
  it("dạng 1: 36 : 6 = 6 rồi 6 × 4 = 24, xem lại được", async () => {
    render(<RutVeNhan />);
    const user = userEvent.setup();
    expect(rutVeNhanCaptions).toHaveLength(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 hộp: 36 cái bánh");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("36 : 6 = 6");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 × 4 = 24");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 hộp: 36 cái bánh");
  });

  it("dạng 2: 18 : 6 = 3 rồi 12 : 3 = 4", async () => {
    render(<RutVeChia />);
    const user = userEvent.setup();
    expect(rutVeChiaCaptions).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("12 : 3 = 4");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-47" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
