// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { CenturyFinder, describeYear } from "./_animations/century-finder";
import { CenturyRuler } from "./_animations/century-ruler";
import { SecondClock } from "./_animations/second-clock";
import { TenSeconds } from "./_animations/ten-seconds";
import { TimeSplit } from "./_animations/time-split";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("ô điền năm", () => {
  it("khi đã giải, năm hiện liền, không tách lớp", () => {
    render(<QuestionBody question={question("lt-nam-cuoi")} solved onSolved={() => {}} />);
    expect((screen.getByLabelText("Điền số") as HTMLInputElement).value).toBe("1900");
  });

  it("số lượng vẫn tách lớp", () => {
    render(<QuestionBody question={question("lt-tau-thuy")} solved onSolved={() => {}} />);
    const values = screen.getAllByLabelText("Điền số").map((input) => (input as HTMLInputElement).value);
    expect(values).toEqual(["8", "8", "2 400"]);
  });
});

describe("đồng hồ kim giây", () => {
  it("đi hết các bước, kim giây đủ một vòng thì kim phút đi 1 vạch, rồi xem lại được", async () => {
    const user = userEvent.setup();
    render(<SecondClock />);

    for (let i = 0; i < 5; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));

    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("kim giây đã đi 60 vạch, kim phút đã đi 1 vạch");
    expect(screen.getByText("1 phút = 60 giây")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("kim giây đã đi 0 vạch");
  });
});

describe("đếm 10 giây", () => {
  it("chỉ chạy khi bấm, đếm từng giây và tự dừng ở 10", () => {
    vi.useFakeTimers();
    render(<TenSeconds />);
    const button = screen.getByRole("button");

    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("0 giây")).toBeTruthy();

    fireEvent.click(button);
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText("3 giây")).toBeTruthy();

    act(() => vi.advanceTimersByTime(30000));
    expect(screen.getByText("10 giây")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("Đó là 10 giây");
    expect(screen.getByRole("button", { name: "Thử lại" })).toBeTruthy();
  });
});

describe("tách số đo", () => {
  it("đi đến bước cuối thì có kết quả và gạch bỏ 211", async () => {
    const user = userEvent.setup();
    render(<TimeSplit />);
    expect(screen.queryByText("120 + 11 = 131 giây")).toBeNull();
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText("120 + 11 = 131 giây")).toBeTruthy();
    expect(screen.getByText("211 giây")).toBeTruthy();
  });
});

describe("thước thế kỉ", () => {
  it("hiện dần từng đoạn, các hàng chưa tới vẫn giữ chỗ", async () => {
    const user = userEvent.setup();
    render(<CenturyRuler />);
    expect(screen.getByTestId("century-1").className).not.toContain("invisible");
    expect(screen.getByTestId("century-21").className).toContain("invisible");

    for (let i = 0; i < 5; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByTestId("century-21").className).not.toContain("invisible");
    expect(screen.getByTestId("century-20").textContent).toContain("1901");
    expect(screen.getByTestId("century-20").textContent).toContain("2000");
    expect(screen.getByText(/Năm tròn trăm luôn là năm cuối/)).toBeTruthy();
  });
});

describe("tìm thế kỉ", () => {
  it("lời giải thích đúng với năm thường, năm đầu và năm cuối", () => {
    expect(describeYear(1228)).toBe("Năm 1228 nằm giữa năm 1201 và năm 1300, nên thuộc thế kỉ XIII.");
    expect(describeYear(1900)).toContain("năm cuối của đoạn từ 1801 đến 1900, nên thuộc thế kỉ XIX");
    expect(describeYear(1901)).toContain("năm đầu của đoạn từ 1901 đến 2000, nên thuộc thế kỉ XX");
    expect(describeYear(2000)).toContain("thuộc thế kỉ XX");
    expect(describeYear(2001)).toContain("thuộc thế kỉ XXI");
  });

  it("chạm năm thì đổi đoạn và lời giải thích", async () => {
    const user = userEvent.setup();
    render(<CenturyFinder />);
    await user.click(screen.getByRole("button", { name: "2000" }));
    expect(screen.getByRole("button", { name: "2000" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Đoạn từ năm 1901 đến năm 2000, đánh dấu năm 2000");
    expect(screen.getByText(/Năm 2000 là năm cuối/)).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, làm đúng thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-19" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Giây và các đơn vị thời gian", "Thế kỉ", "Luyện tập", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }

    const first = screen.getAllByLabelText("Điền số")[0];
    await user.type(first, "60");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
