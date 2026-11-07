// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ColumnSub, columnSubCaptions } from "./_animations/column-sub";
import { DoiTien } from "./_animations/doi-tien";
import { exerciseGroups, warmUps } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => [...warmUps, ...exerciseGroups.flatMap((group) => group.questions)].find((item) => item.id === id)!;
const label = () => screen.getByRole("img").getAttribute("aria-label")!;
const nbsp = (text: string) => text.replace(/(?<=\d) (?=\d{3}(?!\d))/g, "\u00a0");
const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: /Tiếp|Xem lại/ }));

describe("trừ từng cột (có nhớ)", () => {
  const props = { a: 648390, b: 382547, setup: "Đặt tính." };

  it("lời giải thích đúng lời đọc SGK, mỗi cột một bước", () => {
    const captions = columnSubCaptions(props);
    expect(captions).toHaveLength(7);
    expect(captions[1]).toBe("0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1.");
    expect(captions[2]).toBe("9 trừ 1 bằng 8; 8 trừ 4 bằng 4, viết 4.");
    expect(captions[3]).toBe("3 không trừ được 5, lấy 13 trừ 5 bằng 8, viết 8 nhớ 1.");
    expect(captions[6]).toBe("6 trừ 1 bằng 5; 5 trừ 3 bằng 2, viết 2.");
  });

  it("bấm hết các bước thì kết quả hiện dần, rồi xem lại được", async () => {
    const user = userEvent.setup();
    render(<ColumnSub {...props} />);
    expect(label()).toContain("Đã đặt tính, chưa trừ");
    expect(screen.queryByTestId("write-0")).toBeNull();

    await next(user);
    expect(label()).toContain("kết quả đến lúc này 3");
    expect(screen.getByTestId("write-0").textContent).toBe("3");

    for (let i = 0; i < 5; i += 1) await next(user);
    expect(label()).toContain("kết quả đến lúc này 265843");
    expect(screen.getByRole("img").textContent).toContain(nbsp("648 390 − 382 547 = 265 843"));
    expect(screen.getByText("7/7")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("Đã đặt tính, chưa trừ");
    expect(screen.getByRole("img").textContent).toContain("= ?");
  });

  it("hiện số nhớ −1 và chữ số 1 bên cạnh các cột đã nhớ", async () => {
    const user = userEvent.setup();
    const { container } = render(<ColumnSub {...props} />);
    expect(container.querySelectorAll("circle")).toHaveLength(0);
    for (let i = 0; i < 6; i += 1) await next(user);
    // Các hàng đơn vị, trăm, chục nghìn nhớ 1: mỗi hàng có một "1" và một "−1".
    expect(container.querySelectorAll("circle")).toHaveLength(6);
    expect(screen.getAllByText("−1")).toHaveLength(3);
  });
});

describe("trừ từng cột (không nhớ, có đề bài và tên hàng)", () => {
  it("đề bài, đặt tính rồi từng cột một", async () => {
    const user = userEvent.setup();
    const { container } = render(<ColumnSub a={438589} b={235072} labels intro="Đề bài." setup="Đặt tính." />);
    expect(label()).toContain("Mới có đề bài");
    expect(screen.queryByText("đơn")).toBeNull();
    await next(user);
    expect(label()).toContain("Đã đặt tính, chưa trừ");
    expect(screen.getByText("đơn")).toBeTruthy();
    await next(user);
    expect(label()).toContain("Đã trừ 1 cột, kết quả đến lúc này 7");
    for (let i = 0; i < 5; i += 1) await next(user);
    expect(label()).toContain("kết quả đến lúc này 203517");
    expect(screen.getByText("8/8")).toBeTruthy();
    expect(container.querySelectorAll("circle")).toHaveLength(0);
  });
});

describe("trừ từng cột (số trừ ngắn hơn)", () => {
  it("cột chục nghìn chỉ có số bị trừ vẫn bớt 1", async () => {
    const user = userEvent.setup();
    render(<ColumnSub a={52340} b={3475} setup="Đặt tính." />);
    expect(columnSubCaptions({ a: 52340, b: 3475, setup: "" })[5]).toBe("5 trừ 1 bằng 4, viết 4.");
    for (let i = 0; i < 5; i += 1) await next(user);
    expect(label()).toContain("kết quả đến lúc này 48865");
    expect(screen.getByRole("img").textContent).toContain(nbsp("52 340 − 3 475 = 48 865"));
  });
});

describe("đổi tiền", () => {
  it("bốn bước: chưa có tờ 10 000, đổi 1 tờ, rồi trả tiền", async () => {
    const user = userEvent.setup();
    render(<DoiTien />);
    expect(label()).toContain(nbsp("chưa có tờ 10 000 đồng nào"));
    expect(screen.queryByTestId("small-0")).toBeNull();

    await next(user);
    await next(user);
    expect(label()).toContain(nbsp("Đã đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng"));
    expect(screen.getAllByTestId(/^small-/)).toHaveLength(10);
    expect(screen.getByTestId("big-5").getAttribute("stroke-dasharray")).toBeTruthy();

    await next(user);
    expect(label()).toContain(nbsp("còn 3 tờ 100 000 đồng và 5 tờ 10 000 đồng, tức là 350 000 đồng"));
    expect(screen.getByRole("img").textContent).toContain(nbsp("Còn lại: 350 000 đồng"));
    expect(screen.getByText("4/4")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.queryByTestId("small-0")).toBeNull();
  });
});

describe("ô đặt tính (phép trừ)", () => {
  it("điền hiệu từ phải sang trái, ô tự nhảy sang hàng bên trái", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("hd-1a")} solved={false} onSolved={onSolved} />);
    expect(screen.getByText("Đặt tính rồi tính: 48 615 − 7 392")).toBeTruthy();
    expect(screen.getByRole("group").getAttribute("aria-label")).toBe(nbsp("Phép trừ 48 615 − 7 392"));

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của hiệu"));
    await user.keyboard("3221");
    expect((screen.getByLabelText("Chữ số hàng chục của hiệu") as HTMLInputElement).value).toBe("2");
    await user.keyboard("4");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("điền thiếu thì nhắc nói tới hiệu, điền sai thì gợi ý và làm lại được", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("hd-1a")} solved={false} onSolved={onSolved} />);

    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText("Con điền đủ các chữ số của hiệu rồi kiểm tra nhé.")).toBeTruthy();

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của hiệu"));
    await user.keyboard("32215");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();

    await user.click(screen.getByLabelText("Chữ số hàng chục nghìn của hiệu"));
    await user.keyboard("4");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(false);
  });

  it("câu tìm chữ số thiếu: chỉ các ô trống nhập được, thứ tự từ hàng đơn vị", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("lt-thieu-1")} solved={false} onSolved={onSolved} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.queryAllByLabelText(/Số nhớ sang hàng/)).toHaveLength(0);

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của hiệu"));
    await user.keyboard("5683");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("câu thiếu thứ hai: 5, 2, 4, 2 theo đúng thứ tự cột", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("lt-thieu-2")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của hiệu"));
    // Đơn vị (hiệu) 2, chục (số bị trừ) 5, nghìn (số trừ) 2, trăm nghìn (hiệu) 4.
    await user.keyboard("2524");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("câu đã giải hiện đủ chữ số đúng và không còn nút kiểm tra", () => {
    render(<QuestionBody question={question("hd-1b")} solved onSolved={() => {}} />);
    const values = screen.getAllByLabelText(/Chữ số hàng/).map((input) => (input as HTMLInputElement).value);
    expect(values).toEqual(["4", "3", "2", "4", "4", "3"]);
    expect(screen.queryByRole("button", { name: "Kiểm tra" })).toBeNull();
    expect(screen.getByText(/Đúng rồi/)).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("đủ ba nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-23" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Hoạt động", "Luyện tập", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }
  });

  it("làm đúng một câu thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-23" groups={exerciseGroups} />);
    await user.click(screen.getAllByLabelText("Chữ số hàng đơn vị của hiệu")[0]);
    await user.keyboard("32214");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
    expect(window.localStorage.getItem("math-learning:progress:v1")).toContain("hd-1a");
  });
});
