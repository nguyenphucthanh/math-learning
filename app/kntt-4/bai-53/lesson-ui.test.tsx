// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { HinhPhanSo, PhanSo } from "@/components/math/phan-so";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChiaBanh, chiaBanhCaptions } from "./_animations/chia-banh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("HinhPhanSo", () => {
  it("hình tròn: số múi và số múi tô đúng dữ liệu", () => {
    const { container } = render(<HinhPhanSo kieu="tron" mau={6} to={2} />);
    expect(container.querySelectorAll("path")).toHaveLength(6);
    expect(container.querySelectorAll("[data-to]")).toHaveLength(2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 phần bằng nhau, đã tô 2 phần");
  });

  it("băng ô và nhóm hình tròn, tô theo vị trí", () => {
    const { container } = render(
      <>
        <HinhPhanSo kieu="bang" mau={9} cot={3} to={[0, 4, 8]} />
        <HinhPhanSo kieu="nhom" mau={7} cot={4} to={2} />
      </>,
    );
    expect(container.querySelectorAll("rect")).toHaveLength(9);
    expect(container.querySelectorAll("circle")).toHaveLength(7);
    expect(container.querySelectorAll("[data-to]")).toHaveLength(3 + 2);
  });

  it("hình chia không đều được ghi rõ trong mô tả", () => {
    render(<HinhPhanSo kieu="tron" mau={3} to={1} chia={[4, 1, 1]} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("không bằng nhau");
  });

  it("PhanSo hiện tử trên mẫu", () => {
    render(<PhanSo tu={2} mau={6} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("2 trên 6");
  });
});

describe("animation", () => {
  it("chia bánh: bấm hết 6 bước, ra 2/6 rồi tử số và mẫu số, xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<ChiaBanh />);
    const label = () => container.querySelector("svg[role=img]")!.getAttribute("aria-label");
    expect(chiaBanhCaptions).toHaveLength(6);
    expect(label()).toContain("chưa chia");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("line[data-enter='1']")).toHaveLength(6);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("1/6");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("2/6");
    expect(container.querySelectorAll("svg[role=img] path")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("Tử số 2");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("Mẫu số 6");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("chưa chia");
  });
});

describe("bộ bài tập", () => {
  it("hiện đủ nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((g) => g.questions).length;
    render(<ExerciseSet lessonSlug="bai-53" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
