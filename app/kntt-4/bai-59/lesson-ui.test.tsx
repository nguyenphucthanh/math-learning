// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { NhomHinh } from "@/components/math/nhom-hinh";
import { Doan } from "./_illustrations/hinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("đoạn thẳng có đủ vạch và nhãn", () => {
    const { container } = render(<Doan parts={5} at={2} names={["H", "I", "K"]} />);
    expect(container.querySelectorAll("line")).toHaveLength(1 + 6);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("5 phần");
  });

  it("nhóm hình có nhãn", () => {
    render(<NhomHinh items={[{ label: "A", props: { kieu: "nhom", mau: 10, cot: 5, to: 4 } }, { label: "B", props: { kieu: "nhom", mau: 10, cot: 5, to: 6 } }]} />);
    expect(screen.getByText("A.")).toBeTruthy();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-59" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
