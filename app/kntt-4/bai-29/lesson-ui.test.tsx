// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { CapCanhSongSong } from "./_animations/cap-canh-song-song";
import { HaiDuongKeoDai } from "./_animations/hai-duong-keo-dai";
import { KeoDaiSongSong } from "./_animations/keo-dai-song-song";
import { BonHinh } from "./_illustrations/bon-hinh";
import { ChiaHinh } from "./_illustrations/chia-hinh";
import { DuongPho } from "./_illustrations/duong-pho";
import { HaiDoan } from "./_illustrations/hai-doan";
import { LuoiHinhThang } from "./_illustrations/luoi";
import { QueTinh } from "./_illustrations/que-tinh";
import { ThangTre } from "./_illustrations/thang-tre";
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
    const cases = [<LuoiHinhThang key="a" />, <QueTinh key="b" />, <DuongPho key="c" />, <HaiDoan key="d" />, <BonHinh key="e" />, <ChiaHinh key="f" />, <ThangTre key="g" />];
    for (const element of cases) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("khu phố có năm đường, nhà Rô-bốt màu vàng và bốn nhà có tên", () => {
    const { container } = render(<DuongPho />);
    expect(container.querySelectorAll("line")).toHaveLength(5);
    expect(container.querySelectorAll('polygon[fill="var(--sun)"]')).toHaveLength(1);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["Rô-bốt", "A", "B", "C", "D"]);
  });

  it("que tính: bốn chữ cái có đủ nhãn", () => {
    const { container } = render(<QueTinh />);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["Z", "L", "H", "V"]);
    expect(container.querySelectorAll("line")).toHaveLength(3 + 2 + 3 + 2);
  });

  it("lưới ô vuông có 9 + 7 đường lưới và đủ tên bốn đỉnh", () => {
    const { container } = render(<LuoiHinhThang />);
    expect(container.querySelectorAll("line")).toHaveLength(9 + 7);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["A", "B", "C", "D"]);
  });
});

describe("câu có hình", () => {
  it("hiện hình minh họa dưới đề", () => {
    render(<QuestionBody question={question("lt-4")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("khu phố");
  });

  it("câu nối nhiều hình có hình dưới đề", () => {
    render(<QuestionBody question={question("lt-5")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Bốn hình");
  });
});

describe("kéo dài hai cạnh của hình chữ nhật", () => {
  it("đi hết các bước thì có hai đường thẳng và mũi tên, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<KeoDaiSongSong />);
    expect(container.querySelectorAll("line")).toHaveLength(0);
    await next(user, 2);
    expect(container.querySelectorAll("line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] polygon")).toHaveLength(4);
    expect(screen.getByText(/không bao giờ cắt nhau/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("line")).toHaveLength(0);
  });
});

describe("hai đoạn thẳng kéo dài", () => {
  it("cặp thứ nhất: kéo dài rồi thấy song song, không có điểm E", async () => {
    const user = userEvent.setup();
    const { container } = render(<HaiDuongKeoDai />);
    expect(screen.getByRole("button", { name: "Cặp thứ nhất" }).getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelectorAll("line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] polygon")).toHaveLength(4);
    expect(container.querySelector("circle")).toBeNull();
    expect(screen.getByText(/song song với nhau/)).toBeTruthy();
  });

  it("cặp thứ hai: hai đường cắt nhau tại E; đổi cặp thì về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<HaiDuongKeoDai />);
    await next(user, 2);
    await user.click(screen.getByRole("button", { name: "Cặp thứ hai" }));
    expect(screen.getByText(/chưa chạm nhau/)).toBeTruthy();
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(0);
    await next(user, 2);
    expect(container.querySelectorAll("circle")).toHaveLength(1);
    expect(screen.getByText(/cắt nhau tại E/)).toBeTruthy();
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toContain("E");
  });
});

describe("cặp cạnh song song", () => {
  it("đi hết các bước thì tô hai cặp cạnh và có góc vuông ở A", async () => {
    const user = userEvent.setup();
    const { container } = render(<CapCanhSongSong />);
    expect(container.querySelectorAll("line")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(2);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] path")).toHaveLength(1);
    expect(screen.getByText(/Cạnh đối song song, cạnh liền nhau vuông góc/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("line")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-29" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    expect(exerciseGroups.map((group) => group.id)).toEqual(["hoat-dong", "luyen-tap", "suy-nghi"]);
  });

  it("trả lời sai rồi đúng thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("lt-3")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Chữ Z" }));
    expect(screen.getByRole("button", { name: "Chữ H" }).hasAttribute("disabled")).toBe(false);
  });
});
