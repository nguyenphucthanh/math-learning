// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AlignCompare } from "./_animations/align-compare";
import { ColumnAdd, columnAddCaptions } from "./_animations/column-add";
import { AlignOptions } from "./_illustrations/align-options";
import { Bamboo } from "./_illustrations/bamboo";
import { Buckets } from "./_illustrations/buckets";
import { bambooValues, buckets, exerciseGroups, warmUps } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => [...warmUps, ...exerciseGroups.flatMap((group) => group.questions)].find((item) => item.id === id)!;
const label = () => screen.getByRole("img").getAttribute("aria-label")!;
const nbsp = (text: string) => text.replace(/(?<=\d) (?=\d{3}(?!\d))/g, " ");

describe("cộng từng cột (có nhớ)", () => {
  const props = { a: 327456, b: 190835, setup: "Đặt tính." };

  it("lời giải thích đúng lời đọc SGK, mỗi cột một bước", () => {
    const captions = columnAddCaptions(props);
    expect(captions).toHaveLength(7);
    expect(captions[1]).toBe("6 cộng 5 bằng 11, viết 1 nhớ 1.");
    expect(captions[2]).toBe("5 thêm 1 bằng 6; 6 cộng 3 bằng 9, viết 9.");
    expect(captions[6]).toBe("3 thêm 1 bằng 4; 4 cộng 1 bằng 5, viết 5.");
  });

  it("bấm hết các bước thì kết quả hiện dần, rồi xem lại được", async () => {
    const user = userEvent.setup();
    render(<ColumnAdd {...props} />);
    expect(label()).toContain("Đã đặt tính, chưa cộng");
    expect(screen.queryByTestId("write-0")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("kết quả đến lúc này 1");
    expect(screen.getByTestId("write-0").textContent).toBe("1");

    for (let i = 0; i < 5; i += 1) await user.click(screen.getByRole("button", { name: /Tiếp|Xem lại/ }));
    expect(label()).toContain("kết quả đến lúc này 518291");
    expect(screen.getByRole("img").textContent).toContain(nbsp("327 456 + 190 835 = 518 291"));
    expect(screen.getByText("7/7")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("Đã đặt tính, chưa cộng");
    expect(screen.getByRole("img").textContent).toContain("= ?");
  });

  it("có số nhớ nhỏ phía trên các cột đã nhớ", async () => {
    const user = userEvent.setup();
    const { container } = render(<ColumnAdd {...props} />);
    expect(container.querySelectorAll("circle")).toHaveLength(0);
    for (let i = 0; i < 6; i += 1) await user.click(screen.getByRole("button", { name: /Tiếp|Xem lại/ }));
    // Các hàng đơn vị, trăm, chục nghìn nhớ 1.
    expect(container.querySelectorAll("circle")).toHaveLength(3);
  });
});

describe("cộng từng cột (không nhớ, có đề bài và tên hàng)", () => {
  it("đề bài, đặt tính rồi mới cộng ba cột một lần", async () => {
    const user = userEvent.setup();
    render(
      <ColumnAdd a={180510} b={210365} perStep={3} labels intro="Đề bài." setup="Đặt tính." />,
    );
    expect(label()).toContain("Mới có đề bài");
    expect(screen.queryByText("đơn")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("Đã đặt tính, chưa cộng");
    expect(screen.getByText("đơn")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("Đã cộng 3 cột, kết quả đến lúc này 875");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("kết quả đến lúc này 390875");
    expect(screen.getByText("4/4")).toBeTruthy();
  });
});

describe("đặt tính lệch cột và thẳng hàng", () => {
  it("bước một sai 12 959, bước hai đúng 6 551", async () => {
    const user = userEvent.setup();
    const { container } = render(<AlignCompare />);
    expect(label()).toContain("lệch cột, kết quả sai 12 959");
    expect(container.textContent).toContain("12959".split("").join(""));
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(label()).toContain("thẳng hàng, kết quả đúng 6 551");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("lệch cột");
  });
});

describe("hình minh họa", () => {
  it("ba xô ghi đúng phép tính", () => {
    render(<Buckets buckets={buckets} />);
    expect(label()).toContain(nbsp("Xô B: 7 450 cộng 8 060"));
    expect(screen.getAllByText(/^[ABC]$/)).toHaveLength(3);
  });

  it("cành tre ghi số các đốt và số bước nhảy", () => {
    render(<Bamboo values={bambooValues} />);
    expect(label()).toContain("7 đốt");
    expect(label()).toContain("nhảy 2 bước, mỗi bước qua 2 đốt");
    expect(screen.getByText("52 400")).toBeTruthy();
  });

  it("ba cách đặt tính có mô tả", () => {
    render(<AlignOptions />);
    expect(label()).toContain("Ba cách đặt tính");
    expect(screen.getAllByText(/^[ABC]$/)).toHaveLength(3);
  });
});

describe("ô đặt tính", () => {
  it("điền tổng từ phải sang trái, ô tự nhảy sang hàng bên trái", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-1")} solved={false} onSolved={onSolved} />);
    expect(screen.getByText("Đặt tính rồi tính: 5 128 + 3 641")).toBeTruthy();

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của tổng"));
    await user.keyboard("9678");
    expect((screen.getByLabelText("Chữ số hàng chục của tổng") as HTMLInputElement).value).toBe("6");
    expect((screen.getByLabelText("Chữ số hàng nghìn của tổng") as HTMLInputElement).value).toBe("8");

    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("điền thiếu thì nhắc, điền sai thì gợi ý và làm lại được", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-1")} solved={false} onSolved={onSolved} />);

    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText("Con điền đủ các chữ số của tổng rồi kiểm tra nhé.")).toBeTruthy();

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của tổng"));
    await user.keyboard("9679");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();

    await user.click(screen.getByLabelText("Chữ số hàng nghìn của tổng"));
    await user.keyboard("8");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(false);
  });

  it("Backspace ở ô trống lùi về ô trước", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("dt-1")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của tổng"));
    await user.keyboard("9");
    expect(document.activeElement).toBe(screen.getByLabelText("Chữ số hàng chục của tổng"));
    await user.keyboard("{Backspace}");
    expect(document.activeElement).toBe(screen.getByLabelText("Chữ số hàng đơn vị của tổng"));
  });

  it("có ô nhớ không bắt buộc, không ảnh hưởng kết quả", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-4")} solved={false} onSolved={onSolved} />);
    const carries = screen.getAllByLabelText(/Số nhớ sang hàng/);
    expect(carries).toHaveLength(5);
    await user.type(carries[0], "7");

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của tổng"));
    await user.keyboard("128036");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("câu tìm chữ số thiếu: chỉ các ô trống nhập được, thứ tự từ hàng đơn vị", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("lt-thieu-1")} solved={false} onSolved={onSolved} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.queryAllByLabelText(/Số nhớ sang hàng/)).toHaveLength(0);

    await user.click(screen.getByLabelText("Chữ số hàng đơn vị của số thứ nhất"));
    await user.keyboard("6455");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("câu đã giải hiện đủ chữ số đúng và không còn nút kiểm tra", () => {
    render(<QuestionBody question={question("dt-2")} solved onSolved={() => {}} />);
    const values = screen.getAllByLabelText(/Chữ số hàng/).map((input) => (input as HTMLInputElement).value);
    expect(values).toEqual(["5", "5", "7", "9", "9"]);
    expect(screen.queryByRole("button", { name: "Kiểm tra" })).toBeNull();
    expect(screen.getByText(/Đúng rồi/)).toBeTruthy();
  });
});

describe("câu lời văn và điền số", () => {
  it("bài cào cào có hình cành tre", () => {
    render(<QuestionBody question={question("lt-cao-cao")} solved={false} onSolved={() => {}} />);
    expect(label()).toContain("Cành tre");
    expect(screen.getAllByLabelText("Điền số")).toHaveLength(3);
  });
});

describe("bộ bài tập", () => {
  it("đủ ba nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-22" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Hoạt động", "Luyện tập", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }
  });

  it("làm đúng một câu thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-22" groups={exerciseGroups} />);
    const units = screen.getAllByLabelText("Chữ số hàng đơn vị của tổng")[0];
    await user.click(units);
    await user.keyboard("9678");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[1]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
    expect(window.localStorage.getItem("math-learning:progress:v1")).toContain("dt-1");
  });
});
