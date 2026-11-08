// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GapGiay } from "./_animations/gap-giay";
import { GiongKhac } from "./_animations/giong-khac";
import { HinhBinhHanh } from "./_animations/hinh-binh-hanh";
import { HinhThoi } from "./_animations/hinh-thoi";
import { DayHinh, DuongCheo, HaiHinhBinhHanh, HaiMiengGhep } from "./_illustrations/hinh-rieng";
import { BonDiem, NhanDienBinhHanh, NhanDienHinhThoi, TimDinhC } from "./_illustrations/luoi";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
const next = async (user: ReturnType<typeof userEvent.setup>, times: number) => {
  for (let i = 0; i < times; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
};

describe("hình minh họa", () => {
  it("mỗi hình có mô tả cho trình đọc màn hình", () => {
    const elements = [
      <NhanDienBinhHanh key="1" />,
      <NhanDienHinhThoi key="2" />,
      <TimDinhC key="3" />,
      <BonDiem key="4" />,
      <HaiHinhBinhHanh key="5" />,
      <DuongCheo key="6" />,
      <DayHinh key="7" />,
      <HaiMiengGhep key="8" />,
    ];
    for (const element of elements) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("số hình và số điểm đúng", () => {
    const luoi = render(<NhanDienBinhHanh />);
    expect(Array.from(luoi.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["A", "B", "C", "D", "E"]);
    luoi.unmount();
    const day = render(<DayHinh />);
    expect(day.container.querySelectorAll("polygon")).toHaveLength(7);
    expect(screen.getByText("?")).toBeTruthy();
    day.unmount();
    const ghep = render(<HaiMiengGhep />);
    expect(ghep.container.querySelectorAll("polygon")).toHaveLength(6);
  });
});

describe("hình bình hành", () => {
  it("đi hết các bước thì có hai cặp cạnh song song và dấu bằng nhau, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<HinhBinhHanh />);
    expect(container.querySelectorAll("g[data-enter]")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] line")).toHaveLength(6);
    expect(screen.getByText(/hai cặp cạnh đối diện song song và bằng nhau/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("g[data-enter]")).toHaveLength(0);
  });
});

describe("hình thoi", () => {
  it("đi hết các bước thì có bốn dấu bằng nhau và hai đường chéo vuông góc", async () => {
    const user = userEvent.setup();
    const { container } = render(<HinhThoi />);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(4);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(4);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] line")).toHaveLength(2);
    expect(screen.getByText("O")).toBeTruthy();
    expect(screen.getByText(/vuông góc với nhau/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("g[data-enter]")).toHaveLength(0);
  });
});

describe("giống nhau và khác nhau", () => {
  it("bước 2 mỗi hình có bốn dấu gạch cạnh", async () => {
    const user = userEvent.setup();
    const { container } = render(<GiongKhac />);
    expect(container.querySelectorAll("polygon")).toHaveLength(2);
    await next(user, 2);
    expect(container.querySelectorAll("g[data-enter='2']")).toHaveLength(2);
    expect(screen.getByText(/Hình thoi có cả bốn cạnh bằng nhau/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("g[data-enter]")).toHaveLength(0);
  });
});

describe("gấp giấy cắt hình thoi", () => {
  it("đi hết năm bước thì ra hình thoi", async () => {
    const user = userEvent.setup();
    const { container } = render(<GapGiay />);
    expect(container.querySelectorAll("line[data-enter]")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("line[data-enter='1']")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("line[data-enter='2']")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("polygon[data-enter='3']")).toHaveLength(4);
    await next(user, 1);
    expect(screen.getByText(/Mở giấy ra, ta được một hình thoi/)).toBeTruthy();
    expect(container.querySelectorAll("g[data-enter='4'] polygon")).toHaveLength(5);
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("g[data-enter='4']")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-31" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
  });

  it("câu trắc nghiệm có hình hiện hình dưới đề", () => {
    render(<QuestionBody question={question("ht-bon-diem")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Ba điểm M, N, P");
  });

  it("trả lời sai rồi đúng thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("ht-bon-diem")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Bốn điểm M, N, P, S" }));
    expect(screen.getByRole("button", { name: "Bốn điểm M, N, P, Q" }).hasAttribute("disabled")).toBe(false);
  });
});
