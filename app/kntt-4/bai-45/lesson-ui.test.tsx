// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { HinhBaoNgoai } from "./_animations/hinh-bao-ngoai";
import { UocLuongTong, uocLuongCaptions } from "./_animations/uoc-luong-tong";
import { DuongDua } from "./_game/tro-choi";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("animation", () => {
  it("5 978 + 2 967: 3 bước, ra 9 000, xem lại được", async () => {
    const user = userEvent.setup();
    render(<UocLuongTong a={5978} b={2967} position={3} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa làm tròn");
    expect(uocLuongCaptions(5978, 2967, 3)).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6000 và 3000");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("khoảng 9000");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa làm tròn");
  });

  it("hình bao ngoài: 3 bước", async () => {
    const user = userEvent.setup();
    render(<HinhBaoNgoai />);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bé hơn 800");
  });
});

describe("bộ bài tập", () => {
  it("hiện đủ nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((g) => g.questions).length;
    render(<ExerciseSet lessonSlug="bai-45" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});

describe("trò chơi Đường đua", () => {
  it("bắt đầu, chọn Đúng/Sai, hiện lời ước lượng, sang bìa tiếp", async () => {
    const user = userEvent.setup();
    render(<DuongDua lessonSlug="bai-45" />);
    await user.click(screen.getByRole("button", { name: "Bắt đầu" }));
    expect(screen.getByText("Tấm bìa 1/10")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Đúng" }));
    expect(screen.getByText(/ngựa (tiến một ô|đứng yên)/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Tấm bìa tiếp" }));
    expect(screen.getByText("Tấm bìa 2/10")).toBeTruthy();
  });
});
