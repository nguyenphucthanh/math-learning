// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { CatGhep } from "./_animations/cat-ghep";
import { VeQuaDiem } from "./_animations/ve-qua-diem";
import { AoAnh } from "./_illustrations/ao-anh";
import { BonCachDan } from "./_illustrations/chong-hinh";
import { DongHo } from "@/components/math/dong-ho";
import { GapKhuc } from "./_illustrations/gap-khuc";
import { HinhDungSai } from "./_illustrations/hinh-dung-sai";
import { BangNguoiQue } from "./_illustrations/nguoi-que";
import { QueThoi } from "./_illustrations/que-thoi";
import { Thang } from "./_illustrations/thang";
import { VuongCheo } from "./_illustrations/vuong-cheo";
import { cachDan, exerciseGroups } from "./bai-tap";

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
      <GapKhuc key="1" />,
      <HinhDungSai key="2" />,
      <Thang key="3" />,
      <AoAnh key="4" />,
      <DongHo key="5" hour={3} />,
      <BonCachDan key="6" options={cachDan} />,
      <BangNguoiQue key="7" />,
      <QueThoi key="8" />,
      <VuongCheo key="9" />,
    ];
    for (const element of elements) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("đường gấp khúc ghi đủ tám điểm; hình Đúng hay Sai ghi đủ mười điểm", () => {
    const a = render(<GapKhuc />);
    expect(Array.from(a.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["A", "B", "C", "D", "E", "G", "H", "K"]);
    a.unmount();
    const b = render(<HinhDungSai />);
    expect(b.container.querySelectorAll("circle")).toHaveLength(10);
  });

  it("ảo ảnh có hai đường đỏ và 30 đường đen; que tính có 7 que", () => {
    const a = render(<AoAnh />);
    expect(a.container.querySelectorAll("line")).toHaveLength(32);
    a.unmount();
    const b = render(<QueThoi />);
    expect(b.container.querySelectorAll("line")).toHaveLength(7);
  });

  it("đồng hồ đọc đúng giờ", () => {
    render(<DongHo hour={9} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Đồng hồ chỉ 9 giờ");
  });

  it("bốn cách dán đọc ra thứ tự dán", () => {
    render(<BonCachDan options={cachDan} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("D: dán lần lượt hình chữ nhật, hình tròn, hình thoi, hình tam giác");
  });
});

describe("vẽ qua điểm H", () => {
  it("đi hết các bước: ê ke, đường vuông góc có dấu góc vuông, đường song song có dấu mũi tên", async () => {
    const user = userEvent.setup();
    const { container } = render(<VeQuaDiem />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("polygon[data-enter='1']")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("polygon[data-enter='1']")).toHaveLength(0);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(1);
    expect(container.querySelectorAll("g[data-enter='2'] path")).toHaveLength(1);
    expect(screen.getByText("C")).toBeTruthy();
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='3'] line")).toHaveLength(1);
    expect(container.querySelectorAll("g[data-enter='3'] path")).toHaveLength(2);
    expect(screen.getByText(/EG song song với AB/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("g[data-enter]")).toHaveLength(0);
    expect(screen.queryByText("C")).toBeNull();
  });
});

describe("cắt ghép hình", () => {
  it("đi hết các bước thì tam giác dịch sang phải 6 ô", async () => {
    const user = userEvent.setup();
    const { container } = render(<CatGhep />);
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("g[data-enter='1'] line")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("polygon[data-enter='2']")).toHaveLength(1);
    expect((container.querySelector("polygon[data-enter='2']")!.parentElement as unknown as SVGElement).style.transform).toBe("translateX(0px)");
    await next(user, 1);
    expect((container.querySelector("polygon[data-enter='2']")!.parentElement as unknown as SVGElement).style.transform).toBe("translateX(120px)");
    expect(screen.getByText(/Ta được hình chữ nhật/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-32" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu Sai (ds-ae-gh): chọn Đúng thì được làm lại, chọn Sai thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("ds-ae-gh")} solved={false} onSolved={onSolved} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Hình ABCD");
    await user.click(screen.getByRole("button", { name: "Đúng" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Sai" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("câu đồng hồ: gõ 6 thì được làm lại, gõ 9 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dong-ho-vuong")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("6");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(screen.getByLabelText("Điền số"));
    await user.keyboard("9");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
