// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { AoDat, HinhChiaDoi, KhayOcVit } from "./_illustrations/hinh";
import { exerciseGroups, khayHang } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("ao: hai phần và nhãn A B C D", () => {
    const { container } = render(<AoDat />);
    expect(container.querySelectorAll("rect")).toHaveLength(2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Lối đi rộng 1 m");
    for (const c of ["A", "B", "C", "D"]) expect(container.textContent).toContain(c);
  });

  it("hình chia đôi có hai hình chữ nhật và hai diện tích", () => {
    const { container } = render(<HinhChiaDoi />);
    expect(container.querySelectorAll("rect")).toHaveLength(2);
    expect(container.textContent).toContain("21/2 cm²");
    expect(container.textContent).toContain("25 cm²");
  });

  it("kệ khay có 8 khay, mô tả đủ màu", () => {
    const { container } = render(<KhayOcVit hang={khayHang} />);
    expect(container.querySelectorAll("rect")).toHaveLength(8);
    const label = screen.getByRole("img").getAttribute("aria-label") ?? "";
    expect(label).toContain("đen");
    expect(label).toContain("trắng");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((g) => g.questions).length;
    render(<ExerciseSet lessonSlug="bai-66" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
