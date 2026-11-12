// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { NhanDatTinh, nhanCaptions } from "@/components/math/nhan-dat-tinh";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

async function clickThrough(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("nhân đặt tính", () => {
  it("160 140 × 7: đi hết các bước thì ra 1 120 980, cột cuối đọc cả số; xem lại được", async () => {
    render(<NhanDatTinh a={160140} b={7} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
    const captions = nhanCaptions(160140, 7);
    expect(captions).toHaveLength(7);
    expect(captions[6]).toContain("1 nhân 7 bằng 7, thêm 4 bằng 11, viết 11");
    const user = await clickThrough(captions.length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("1120980");
    expect(screen.getByTestId("write-0").textContent).toBe("0");
    expect(screen.getByTestId("write-5").textContent).toBe("1");
    expect(screen.getByTestId("write-6").textContent).toBe("1");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
  });

  it("30 708 × 4: chữ số 0 kèm số nhớ vẫn đi hết các bước", async () => {
    render(<NhanDatTinh a={30708} b={4} />);
    await clickThrough(nhanCaptions(30708, 4).length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("122832");
  });
});

describe("bài toán có sơ đồ", () => {
  it("quạt gấp 3 lần: nhân sai thì chưa đúng, 54 750 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("hd-3")} solved={false} onSolved={onSolved} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3 phần bằng nhau");
    const input = screen.getByLabelText("Điền số");
    await user.type(input, "18253");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, "54750");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-38" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
    const inputs = screen.getAllByLabelText("Điền số");
    await user.type(inputs[0], "54888");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
