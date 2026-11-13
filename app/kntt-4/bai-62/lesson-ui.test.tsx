// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { SoDoChuoi, ThanhGo } from "./_illustrations/hinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("sơ đồ chuỗi có đủ ô, ô sau là dấu hỏi", () => {
    const { container } = render(<SoDoChuoi start={[1, 3]} steps={[{ op: "+", f: [1, 6] }, { op: "-", f: [1, 4] }]} />);
    expect(container.querySelectorAll("rect")).toHaveLength(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("cộng 1/6");
    expect(container.textContent).toContain("− 1/4");
    expect(container.textContent?.match(/\?/g)).toHaveLength(2);
  });

  it("thanh gỗ một phần và hai thanh chồng", () => {
    const one = render(<ThanhGo total={[19, 3]} a={[7, 2]} />);
    expect(one.container.querySelectorAll("rect")).toHaveLength(3);
    one.unmount();
    const two = render(<ThanhGo total={[17, 6]} a={[5, 3]} b={[11, 6]} />);
    expect(two.container.querySelectorAll("rect")).toHaveLength(4);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chồng lên nhau");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-62" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
