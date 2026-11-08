// @vitest-environment jsdom
import { formatNumber } from "@/lib/area-units";
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { ReviewLink } from "@/components/lesson/review-link";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { BangGiay } from "./_illustrations/bang-giay";
import { BangThongKe } from "./_illustrations/bang-thong-ke";
import { HinhThoiBinhHanh } from "./_illustrations/hinh-thoi";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("hình minh họa", () => {
  it("băng giấy có mô tả các ô", () => {
    render(<BangGiay />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Băng 3: 797, 798, ?, ?, ?");
  });

  it("hình trên lưới liệt kê các đoạn thẳng", () => {
    render(<HinhThoiBinhHanh />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("LD, DE, KE, KL, LI, KI, EH, DG, GH, IH");
  });

  it("bảng huy chương có đủ môn và ô trống đọc được", () => {
    render(<BangThongKe />);
    expect(screen.getByRole("rowheader", { name: "Cầu lông" })).toBeTruthy();
    expect(screen.getAllByText("không có").length).toBe(3);
  });
});

describe("liên kết về bài gốc", () => {
  it("ReviewLink trỏ đúng bài", () => {
    render(<ReviewLink slug="bai-12">Xem lại Bài 12</ReviewLink>);
    expect(screen.getByRole("link", { name: /Bài 12/ }).getAttribute("href")).toBe("/kntt-4/bai-12");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm và hiện tiến độ", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-37" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });

  it("câu Đúng/Sai: chọn sai thì làm lại, chọn đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("hh-3")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Đúng" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Sai" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("câu viết số hiện bảng hàng và lớp", () => {
    render(<QuestionBody question={question("sl-viet-1")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(formatNumber(4352781));
  });

  it("bài toán muối: quên đổi tấn ra tạ thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("bt-muoi")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    for (const [index, value] of ["6", "27", "33"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("câu đặt tính trừ hiện hint khi chưa làm", () => {
    render(<QuestionBody question={question("pt-3")} solved={false} onSolved={() => {}} />);
    expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
  });
});
