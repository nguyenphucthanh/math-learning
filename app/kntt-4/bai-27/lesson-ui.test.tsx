// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChuNhatKeoDai } from "./_animations/chu-nhat-keo-dai";
import { EKe } from "./_animations/e-ke";
import { XoayDuong } from "./_animations/xoay-duong";
import { CacGoc } from "./_illustrations/cac-goc";
import { CapDuong } from "./_illustrations/cap-duong";
import { CoiXayGio } from "./_illustrations/coi-xay-gio";
import { DaGiac } from "@/components/math/da-giac";
import { DuQuay } from "./_illustrations/du-quay";
import { GapGiay } from "./_illustrations/gap-giay";
import { OngNuoc } from "./_illustrations/ong-nuoc";
import { exerciseGroups, pentagon, warmUpAngles, wheel } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("hình minh họa", () => {
  it("mỗi hình có mô tả cho trình đọc màn hình", () => {
    const cases = [
      <CacGoc key="a" angles={warmUpAngles} />,
      <CapDuong key="b" rotation={15} angle={65} />,
      <CoiXayGio key="c" />,
      <DaGiac key="d" points={pentagon.points} names={pentagon.names} label="Ngũ giác ABCDE" />,
      <DuQuay key="e" yellowIndex={wheel.yellowIndex} />,
      <GapGiay key="f" />,
      <OngNuoc key="g" />,
    ];
    for (const element of cases) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("đu quay: 7 ca-bin đánh số và 1 ca-bin vàng", () => {
    const { container } = render(<DuQuay yellowIndex={wheel.yellowIndex} />);
    expect(container.querySelectorAll("rect")).toHaveLength(8);
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(1);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });

  it("đa giác có đủ nhãn đỉnh, dấu góc vuông chỉ hiện khi được bật", () => {
    const { container, rerender } = render(<DaGiac points={pentagon.points} names={pentagon.names} label="x" />);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(pentagon.names);
    expect(container.querySelectorAll("path")).toHaveLength(0);
    rerender(<DaGiac points={pentagon.points} names={pentagon.names} marks label="x" />);
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });
});

describe("câu nối có hình", () => {
  it("hiện hình minh họa dưới đề", () => {
    render(<QuestionBody question={question("lt-2a")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Tứ giác ABCD");
  });
});

describe("hình chữ nhật kéo dài", () => {
  it("đi hết các bước thì có góc vuông, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<ChuNhatKeoDai />);
    expect(container.querySelectorAll("line")).toHaveLength(0);
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("line")).toHaveLength(2);
    expect(container.querySelectorAll("svg g[data-enter='3'] path")).toHaveLength(1);
    expect(screen.getByText(/vuông góc với nhau/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("line")).toHaveLength(0);
  });
});

describe("ê ke", () => {
  it("đi hết các bước thì có bốn dấu góc vuông", async () => {
    const user = userEvent.setup();
    const { container } = render(<EKe />);
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    expect(container.querySelectorAll("g[data-enter='3'] path")).toHaveLength(4);
    expect(screen.getByText(/bốn góc vuông, có chung đỉnh O/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
  });
});

describe("xoay đường thẳng", () => {
  it("chỉ góc 90° mới khít ê ke và hiện dấu góc vuông", async () => {
    const user = userEvent.setup();
    const { container } = render(<XoayDuong />);
    expect(screen.getByRole("status").textContent).toContain("không khít");
    expect(container.querySelectorAll("path")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "90°" }));
    expect(screen.getByRole("status").textContent).toContain("vuông góc với nhau");
    expect(screen.getByRole("button", { name: "90°" }).getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelectorAll("path")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "120°" }));
    expect(screen.getByRole("status").textContent).toContain("Cắt nhau chưa chắc đã vuông góc");
    expect(container.querySelectorAll("path")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-27" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    expect(exerciseGroups.map((group) => group.id)).toEqual(["hoat-dong", "luyen-tap", "suy-nghi"]);
  });

  it("trả lời sai rồi đúng một câu trắc nghiệm có hình thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("hd-1a")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Có" }));
    expect(screen.getByRole("button", { name: "Không" }).hasAttribute("disabled")).toBe(false);
  });
});
