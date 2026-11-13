// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { BieuDoCot, barHeight, wrapTitle } from "@/components/math/bieu-do-cot";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BangKiemDem, kiemDemCaptions } from "./_animations/bang-kiem-dem";
import { VeBieuDo, veBieuDoCaptions } from "./_animations/ve-bieu-do";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("BieuDoCot", () => {
  const props = { title: "SỐ HỌC SINH ĐẾN THƯ VIỆN MƯỢN SÁCH", axisLabel: "Học sinh", step: 20, max: 140 };

  it("cột tỉ lệ với số liệu, cột chưa biết hiện dấu ?", () => {
    expect(barHeight(70, 140) * 2).toBe(barHeight(140, 140));
    const { container } = render(<BieuDoCot {...props} data={[{ label: "Thứ Hai", value: 35 }, { label: "Thứ Ba", value: null }, { label: "Thứ Tư", value: 70, hideValue: true }]} />);
    expect(container.querySelectorAll("rect")).toHaveLength(2);
    expect(container.textContent).toContain("?");
    expect(container.textContent).toContain("35");
    expect(container.textContent).not.toContain("70");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("mỗi vạch 20");
  });

  it("tiêu đề dài ngắt thành hai dòng", () => {
    expect(wrapTitle(props.title)).toEqual(["SỐ HỌC SINH ĐẾN THƯ VIỆN", "MƯỢN SÁCH"]);
    expect(wrapTitle("SỐ CÂY CÁC LỚP ĐÃ TRỒNG")).toHaveLength(1);
  });
});

describe("animation bảng kiểm đếm", () => {
  it("bấm hết các bước, xem lại được", async () => {
    render(<BangKiemDem />);
    const user = userEvent.setup();
    expect(kiemDemCaptions).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bóng rổ 5 nét và 1 nét");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bóng đá 4, bóng rổ 6, bơi 2");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Có tên ba môn");
  });
});

describe("animation vẽ biểu đồ cột", () => {
  it("trục, hàng dưới, cột, số ở đỉnh cột", async () => {
    const { container } = render(<VeBieuDo />);
    const user = userEvent.setup();
    expect(veBieuDoCaptions).toHaveLength(5);
    expect(container.querySelectorAll("rect")).toHaveLength(0);
    for (let i = 0; i < 4; i++) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("rect")).toHaveLength(3);
    expect(container.textContent).toContain("Bóng");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("rect")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-50" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
