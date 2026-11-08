// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { BaLoaiGoc } from "./_animations/ba-loai-goc";
import { GocDongHo } from "./_animations/goc-dong-ho";
import { GiaiCuuKhungLong } from "./_game/giai-cuu-khung-long";
import { loaiGocO } from "./_game/ban-co";
import { sauGocHai, sauGocMot } from "./_illustrations/du-lieu";
import { BanhPizza, HaiCaiKeo, NhieuGoc } from "./_illustrations/goc";
import { BanhXe, HaiDuongNhen, QuatVaBieuDo, TamGiacAH } from "./_illustrations/hinh-khac";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
const next = async (user: ReturnType<typeof userEvent.setup>, times: number) => {
  for (let i = 0; i < times; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
};

describe("hình minh họa", () => {
  it("mỗi hình có mô tả cho trình đọc màn hình", () => {
    const elements = [
      <NhieuGoc key="1" angles={sauGocMot} label="Sáu góc" />,
      <NhieuGoc key="2" angles={sauGocHai} label="Sáu góc" />,
      <HaiCaiKeo key="3" />,
      <BanhPizza key="4" />,
      <BanhXe key="5" />,
      <QuatVaBieuDo key="6" />,
      <TamGiacAH key="7" />,
      <HaiDuongNhen key="8" />,
    ];
    for (const element of elements) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("sáu góc có sáu tên đỉnh; chín chiếc quạt; ba miếng bánh", () => {
    const a = render(<NhieuGoc angles={sauGocMot} label="Sáu góc" />);
    expect(Array.from(a.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["O", "B", "C", "E", "D", "A"]);
    a.unmount();
    const b = render(<QuatVaBieuDo />);
    expect(b.container.querySelectorAll("path")).toHaveLength(9);
    expect(b.container.querySelectorAll("circle")).toHaveLength(10);
    b.unmount();
    const c = render(<BanhPizza />);
    expect(c.container.querySelectorAll("path")).toHaveLength(3);
  });
});

describe("ba loại góc", () => {
  it("đi hết bốn bước: nhọn, tù, bẹt, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<BaLoaiGoc />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Góc vuông");
    await next(user, 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Góc nhọn");
    expect(screen.getByText(/bé hơn góc vuông, đây là góc nhọn/)).toBeTruthy();
    await next(user, 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Góc tù");
    await next(user, 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Góc bẹt");
    expect(container.querySelectorAll("path[data-enter='3']")).toHaveLength(1);
    expect(screen.getByText(/góc bẹt bằng hai góc vuông/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Góc vuông");
    expect(container.querySelectorAll("path[data-enter='3']")).toHaveLength(0);
  });
});

describe("góc của hai kim đồng hồ", () => {
  it("đi hết các bước: 3, 2, 4, 6 giờ", async () => {
    const user = userEvent.setup();
    render(<GocDongHo />);
    expect(screen.getByText("3 giờ: góc vuông")).toBeTruthy();
    await next(user, 1);
    expect(screen.getByText("2 giờ: góc nhọn")).toBeTruthy();
    await next(user, 1);
    expect(screen.getByText("4 giờ: góc tù")).toBeTruthy();
    await next(user, 1);
    expect(screen.getByText("6 giờ: góc bẹt")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByText("3 giờ: góc vuông")).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-8" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu đếm góc: điền sai thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("goc-dem-mot")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    expect(inputs).toHaveLength(4);
    for (const [index, value] of ["2", "1", "2", "1"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("câu miếng bánh: chọn sai thì làm lại, chọn Miếng 2 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("pizza")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Miếng 3" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Miếng 2" }));
    expect(onSolved).toHaveBeenCalled();
  });
});

describe("trò chơi Giải cứu khủng long", () => {
  const dice = (value: number) => vi.spyOn(Math, "random").mockReturnValue((value - 0.5) / 6);

  it("lúc đầu là lượt của Người chơi 1, hai người ở ô xuất phát", () => {
    render(<GiaiCuuKhungLong />);
    expect(screen.getByText("Lượt của Người chơi 1")).toBeTruthy();
    expect(screen.getByText("Người chơi 1: xuất phát")).toBeTruthy();
    expect(within(screen.getByRole("list", { name: /Bàn chơi/ })).getAllByRole("listitem")).toHaveLength(17);
  });

  it("mặt lẻ tiến 1 ô; trả lời đúng thì ở lại, đổi lượt", async () => {
    const user = userEvent.setup();
    dice(3);
    render(<GiaiCuuKhungLong />);
    await user.click(screen.getByRole("button", { name: "Gieo xúc xắc" }));
    expect(screen.getByText(/gieo được mặt 3, tiến 1 ô đến ô 1/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: `Góc ${loaiGocO(1)}` }));
    expect(screen.getByText(/Đúng rồi/)).toBeTruthy();
    expect(screen.getByText("Người chơi 1: ô 1")).toBeTruthy();
    expect(screen.getByText("Lượt của Người chơi 2")).toBeTruthy();
  });

  it("mặt chẵn tiến 2 ô; trả lời sai thì quay về ô cũ", async () => {
    const user = userEvent.setup();
    dice(4);
    render(<GiaiCuuKhungLong />);
    await user.click(screen.getByRole("button", { name: "Gieo xúc xắc" }));
    expect(screen.getByText(/tiến 2 ô đến ô 2/)).toBeTruthy();
    const wrong = (["nhọn", "vuông", "tù", "bẹt"] as const).find((kind) => kind !== loaiGocO(2))!;
    await user.click(screen.getByRole("button", { name: `Góc ${wrong}` }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(screen.getByText("Người chơi 1: xuất phát")).toBeTruthy();
    expect(screen.getByText("Lượt của Người chơi 2")).toBeTruthy();
  });

  it("đến ô đích thì thắng, chơi ván mới được", async () => {
    const user = userEvent.setup();
    dice(6);
    render(<GiaiCuuKhungLong />);
    for (let lan = 0; lan < 8; lan += 1) {
      await user.click(screen.getByRole("button", { name: "Gieo xúc xắc" }));
      const target = Number(screen.getByText(/gieo được mặt 6/).textContent!.match(/đến ô (\d+)/)![1]);
      await user.click(screen.getByRole("button", { name: `Góc ${loaiGocO(target)}` }));
      if (screen.queryByRole("button", { name: "Chơi ván mới" })) break;
      // Người chơi 2 trả lời sai để Người chơi 1 đi tiếp.
      await user.click(screen.getByRole("button", { name: "Gieo xúc xắc" }));
      const t2 = Number(screen.getByText(/gieo được mặt 6/).textContent!.match(/đến ô (\d+)/)![1]);
      const wrong = (["nhọn", "vuông", "tù", "bẹt"] as const).find((kind) => kind !== loaiGocO(t2))!;
      await user.click(screen.getByRole("button", { name: `Góc ${wrong}` }));
    }
    expect(screen.getByText(/đã đến ô đích/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Chơi ván mới" }));
    expect(screen.getByText("Lượt của Người chơi 1")).toBeTruthy();
    expect(screen.getByText("Người chơi 1: xuất phát")).toBeTruthy();
  });
});
