// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { LayQue } from "./_game/lay-que";
import { BonDongHo } from "@/components/math/bon-dong-ho";
import { BinhHanhCanh, BonGoc, BonHinh, ChuNhatMN, DaGiacGoc, DaiHinhThoi, HaiGocLuoi, NhaMaiTu, ThoiCanh } from "./_illustrations/hinh";
import { hinhChonBinhHanh, hinhThang } from "./_illustrations/hinh-hoc";
import { QueTamGiac } from "./_illustrations/que-tam-giac";
import { exerciseGroups, gioDongHo } from "./bai-tap";

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
    const elements = [
      <NhaMaiTu key="1" />,
      <ChuNhatMN key="2" />,
      <BonHinh key="3" shapes={hinhChonBinhHanh} color="white" label="Bốn hình" />,
      <BinhHanhCanh key="4" />,
      <ThoiCanh key="5" />,
      <DaiHinhThoi key="6" />,
      <HaiGocLuoi key="7" />,
      <BonGoc key="8" />,
      <QueTamGiac key="9" />,
      <DaGiacGoc key="10" points={hinhThang.points} names={hinhThang.names} label="Hình thang" />,
    ];
    for (const element of elements) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("bốn đồng hồ có bốn hình", () => {
    render(<BonDongHo hours={gioDongHo} />);
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  it("hình que tính có 9 que; dải hình thoi có 3 hình", () => {
    const a = render(<QueTamGiac />);
    expect(a.container.querySelectorAll("line")).toHaveLength(9);
    a.unmount();
    const b = render(<DaiHinhThoi />);
    expect(b.container.querySelectorAll("polygon")).toHaveLength(3);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-35" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu đếm góc ngôi nhà: điền sai thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("nha-goc")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    expect(inputs).toHaveLength(3);
    for (const [index, value] of ["3", "4", "0"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("câu chọn hình bình hành: chọn sai thì làm lại, chọn Hình C thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("bbh-chon")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Hình A" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Hình C" }));
    expect(onSolved).toHaveBeenCalled();
  });
});

describe("trò chơi Lấy que tính", () => {
  const sticks = () => screen.getAllByRole("button", { name: /^Lấy que/ });

  it("lúc đầu có 19 que, lượt của Người chơi 1", () => {
    render(<LayQue />);
    expect(sticks()).toHaveLength(19);
    expect(screen.getByText("Lượt của Người chơi 1")).toBeTruthy();
    expect(screen.getByText("Đã lấy 0 que, còn 19 que.")).toBeTruthy();
  });

  it("chạm một que thì que đó bị lấy và đổi lượt; chạm lại que đã lấy thì không đổi", async () => {
    const user = userEvent.setup();
    render(<LayQue />);
    await user.click(sticks()[0]);
    expect(screen.getByText("Đã lấy 1 que, còn 18 que.")).toBeTruthy();
    expect(screen.getByText("Lượt của Người chơi 2")).toBeTruthy();
    await user.click(sticks()[0]);
    expect(screen.getByText("Đã lấy 1 que, còn 18 que.")).toBeTruthy();
  });

  it("lấy 6 que nghiêng đầu tiên thì hết hình, báo người lấy que cuối, không lấy thêm được, chơi ván mới được", async () => {
    const user = userEvent.setup();
    render(<LayQue />);
    for (let index = 0; index < 6; index += 1) {
      await user.click(screen.getByRole("button", { name: `Lấy que que nghiêng số ${index + 1}` }));
    }
    expect(screen.getByText(/Hết hình thoi và hình bình hành rồi! Người chơi 2 là người vừa lấy que cuối cùng/)).toBeTruthy();
    await user.click(screen.getAllByRole("button", { name: /^Lấy que/ })[7]);
    expect(screen.getByText("Đã lấy 6 que, còn 13 que.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Chơi ván mới" }));
    expect(screen.getByText("Đã lấy 0 que, còn 19 que.")).toBeTruthy();
  });
});
