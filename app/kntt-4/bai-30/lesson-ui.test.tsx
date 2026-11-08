// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GhepHinh } from "./_animations/ghep-hinh";
import { ThietKeDuongChay } from "./_animations/thiet-ke-duong-chay";
import { VeSongSong } from "./_animations/ve-song-song";
import { ChonSongSong } from "./_illustrations/chon-song-song";
import { DuongChay } from "./_illustrations/duong-chay";
import { HinhVuong } from "./_illustrations/hinh-vuong";
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
    for (const element of [<ChonSongSong key="a" />, <HinhVuong key="b" />, <DuongChay key="c" />]) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("ba đường thẳng đánh số, sáu mảnh, sáu điểm của đường chạy", () => {
    const duong = render(<ChonSongSong />);
    expect(Array.from(duong.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["1", "2", "3", "H", "A", "B"]);
    duong.unmount();
    const vuong = render(<HinhVuong />);
    expect(vuong.container.querySelectorAll("polygon")).toHaveLength(6);
    vuong.unmount();
    const chay = render(<DuongChay />);
    expect(Array.from(chay.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["M", "H", "N", "P", "K", "Q"]);
  });
});

describe("vẽ đường thẳng song song bằng ê ke", () => {
  it("đi hết các bước thì có MN, CD và dấu song song, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<VeSongSong />);
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(1);
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] path")).toHaveLength(2);
    expect(screen.getByText(/song song với AB, vì AB và CD cùng vuông góc với MN/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
  });

  it("đổi AB nằm ngang hay nghiêng thì hình đổi theo", async () => {
    const user = userEvent.setup();
    const { container } = render(<VeSongSong />);
    expect(screen.getByRole("button", { name: "AB nằm ngang" }).getAttribute("aria-pressed")).toBe("true");
    const before = container.querySelector("circle")!.getAttribute("cy");
    await user.click(screen.getByRole("button", { name: "AB nằm nghiêng" }));
    expect(screen.getByRole("button", { name: "AB nằm nghiêng" }).getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelector("circle")!.getAttribute("cy")).not.toBe(before);
  });
});

describe("bộ đồ chơi ghép hình", () => {
  it("đi hết các bước thì có PQ và sáu mảnh tô màu", async () => {
    const user = userEvent.setup();
    const { container } = render(<GhepHinh />);
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
    expect(container.querySelectorAll("g[data-enter='1']")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(3);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("polygon")).toHaveLength(6);
    expect(screen.getByText(/Cắt hình vuông thành 6 phần/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
  });
});

describe("thiết kế đường chạy", () => {
  it("đi hết năm bước thì có ba đường chạy, vạch đích và chú thích", async () => {
    const user = userEvent.setup();
    const { container } = render(<ThietKeDuongChay />);
    expect(screen.getAllByText("1 cm")).toHaveLength(2);
    await next(user, 1);
    expect(screen.getByText("10 cm")).toBeTruthy();
    await next(user, 1);
    expect(screen.getAllByText("10 cm")).toHaveLength(3);
    await next(user, 1);
    expect(container.querySelectorAll("line[stroke='var(--unit-ta)']")).toHaveLength(1);
    await next(user, 1);
    expect(screen.getByText("XUẤT PHÁT")).toBeTruthy();
    expect(screen.getByText("ĐÍCH")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.queryByText("XUẤT PHÁT")).toBeNull();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-30" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    expect(exerciseGroups.map((group) => group.id)).toEqual(["ve-song-song", "ghep-hinh", "duong-chay", "suy-nghi"]);
  });

  it("câu trắc nghiệm có hình hiện hình dưới đề", () => {
    render(<QuestionBody question={question("ss-chon-duong")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("ba đường thẳng đánh số");
  });

  it("trả lời sai rồi đúng thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("ss-chon-duong")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Đường 1" }));
    expect(screen.getByRole("button", { name: "Đường 2" }).hasAttribute("disabled")).toBe(false);
  });
});
