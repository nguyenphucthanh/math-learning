// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { KhungTranh } from "./_animations/khung-tranh";
import { ThietKeDieu } from "./_animations/thiet-ke-dieu";
import { VeVuongGoc } from "./_animations/ve-vuong-goc";
import { ChonDuong } from "./_illustrations/chon-duong";
import { Dieu } from "./_illustrations/dieu";
import { EKeDat } from "./_illustrations/e-ke-dat";
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
    for (const element of [<EKeDat key="a" />, <ChonDuong key="b" />, <Dieu key="c" />]) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("ba hình đặt ê ke, ba đường thẳng, bốn đỉnh con diều", () => {
    const eke = render(<EKeDat />);
    expect(eke.container.querySelectorAll("polygon")).toHaveLength(3);
    eke.unmount();
    const duong = render(<ChonDuong />);
    expect(Array.from(duong.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["1", "2", "3", "H", "A", "B"]);
    duong.unmount();
    const dieu = render(<Dieu />);
    expect(Array.from(dieu.container.querySelectorAll("text")).map((node) => node.textContent)).toEqual(["A", "B", "C", "D", "H"]);
  });
});

describe("vẽ đường thẳng vuông góc bằng ê ke", () => {
  it("đi hết các bước thì có đường CD và bốn dấu góc vuông, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<VeVuongGoc />);
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
    await next(user, 1);
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    await next(user, 2);
    expect(container.querySelectorAll("g[data-enter='2'] line")).toHaveLength(1);
    expect(container.querySelectorAll("g[data-enter='3'] path")).toHaveLength(4);
    expect(screen.getByText(/bốn góc vuông/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
  });

  it("đổi vị trí điểm H thì lời dẫn và hình đổi theo", async () => {
    const user = userEvent.setup();
    const { container } = render(<VeVuongGoc />);
    expect(screen.getByRole("button", { name: "H nằm ngoài AB" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/điểm H nằm ngoài đường thẳng AB/)).toBeTruthy();
    const outside = container.querySelector("circle")!.getAttribute("cy");
    await user.click(screen.getByRole("button", { name: "H nằm trên AB" }));
    expect(screen.getByRole("button", { name: "H nằm trên AB" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/điểm H nằm trên đường thẳng AB/)).toBeTruthy();
    expect(container.querySelector("circle")!.getAttribute("cy")).not.toBe(outside);
  });
});

describe("khung tranh", () => {
  it("đi hết các bước thì có bốn que, bốn dấu góc vuông", async () => {
    const user = userEvent.setup();
    const { container } = render(<KhungTranh />);
    expect(container.querySelectorAll("rect")).toHaveLength(1);
    await next(user, 1);
    expect(container.querySelectorAll("rect")).toHaveLength(2);
    await next(user, 2);
    expect(container.querySelectorAll("rect")).toHaveLength(4);
    expect(container.querySelectorAll("g[data-enter='3'] g:first-child path")).toHaveLength(4);
    expect(screen.getByText(/Mỗi góc của khung là hai que vuông góc/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("rect")).toHaveLength(1);
  });
});

describe("thiết kế con diều", () => {
  it("đi hết các bước thì có hình diều và hai thanh tre", async () => {
    const user = userEvent.setup();
    const { container } = render(<ThietKeDieu />);
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
    await next(user, 1);
    expect(screen.getByText("6 cm")).toBeTruthy();
    expect(screen.getByText("18 cm")).toBeTruthy();
    await next(user, 1);
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    await next(user, 1);
    expect(screen.getByText(/vuông góc với nhau tại H/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("polygon")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-28" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    expect(exerciseGroups.map((group) => group.id)).toEqual(["ve-vuong-goc", "khung-tranh", "xuong-dieu", "suy-nghi"]);
  });

  it("câu trắc nghiệm có hình hiện hình dưới đề", () => {
    render(<QuestionBody question={question("ve-e-ke")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Ba hình đặt ê ke");
  });

  it("trả lời sai rồi đúng thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("ve-chon-duong")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Đường 1" }));
    expect(screen.getByRole("button", { name: "Đường 3" }).hasAttribute("disabled")).toBe(false);
  });
});
