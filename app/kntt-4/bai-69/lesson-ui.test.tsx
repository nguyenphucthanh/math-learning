// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { NhomHinh } from "@/components/math/nhom-hinh";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { DaiTamGiac } from "./_illustrations/tam-giac";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("dải tam giác có 14 tam giác, 9 tam giác tô màu", () => {
    const { container } = render(<DaiTamGiac squares={7} to={[0, 1, 2, 4, 5, 8, 9, 10, 12]} />);
    const polys = container.querySelectorAll("polygon");
    expect(polys).toHaveLength(14);
    expect([...polys].filter((p) => p.getAttribute("fill") === "var(--sun)")).toHaveLength(9);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("14 tam giác");
  });

  it("nhóm khung ếch có nhãn", () => {
    render(<NhomHinh items={[{ label: "A", props: { kieu: "nhom", mau: 15, cot: 5, to: 3 } }, { label: "B", props: { kieu: "nhom", mau: 15, cot: 5, to: 9 } }]} />);
    expect(screen.getByText("B.")).toBeTruthy();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-69" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
