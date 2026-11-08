// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { DoGoc } from "./_animations/do-goc";
import { DocDungThang } from "@/components/math/doc-dung-thang";
import { GocGhiSo } from "@/components/math/goc-ghi-so";
import { HaiGoc } from "./_illustrations/hai-goc";
import { ThuocDo } from "@/components/math/thuoc-do";
import { exerciseGroups, quad } from "./bai-tap";

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
    const cases = [
      <ThuocDo key="a" angle={50} base="right" />,
      <ThuocDo key="b" angle={130} base="left" />,
      <GocGhiSo key="c" points={quad.points} names={quad.names} labels={quad.labels} label="Tứ giác ABCD" />,
      <HaiGoc key="d" />,
    ];
    for (const element of cases) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("mô tả của thước không tiết lộ số đo", () => {
    render(<ThuocDo angle={50} base="right" />);
    expect(screen.getByRole("img").getAttribute("aria-label")).not.toMatch(/50/);
  });

  it("thước có đủ 19 số ở mỗi vòng, số được khoanh chỉ khi chọn", () => {
    const { container, rerender } = render(<ThuocDo angle={30} base="right" />);
    expect(container.querySelectorAll("text")).toHaveLength(38 + 3);
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(0);
    rerender(<ThuocDo angle={30} base="right" marks={["xanh", "vang"]} />);
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(2);
  });

  it("góc ghi số đo: dấu góc vuông ở các đỉnh 90°", () => {
    const { container } = render(<GocGhiSo points={quad.points} names={quad.names} labels={quad.labels} label="x" />);
    expect(container.querySelectorAll("path")).toHaveLength(2);
    expect(Array.from(container.querySelectorAll("text")).map((node) => node.textContent)).toContain("110°");
  });
});

describe("đo góc bằng thước", () => {
  it("đi hết các bước: hiện thước, cạnh trên đường kính, vạch 30, rồi xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<DoGoc />);
    expect(container.querySelectorAll("text")).toHaveLength(3);
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Số đo góc là 30 độ");
    expect(screen.getByText(/ba mươi độ/)).toBeTruthy();
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(0);
    expect(container.querySelectorAll("text")).toHaveLength(3);
  });
});

describe("đọc đúng vòng số", () => {
  it("đi hết các bước: hai số, vòng xanh, vòng vàng, so với góc vuông", async () => {
    const user = userEvent.setup();
    const { container } = render(<DocDungThang />);
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("circle[r='13']")).toHaveLength(1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("vòng xanh");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("vòng vàng");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(1);
    expect(screen.getByText(/không phải 140°/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-7" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
  });

  it("câu đọc thước hiện hình và ô điền số", () => {
    render(<QuestionBody question={question("hd-1b")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bên trái");
    expect(screen.getAllByLabelText("Điền số")).toHaveLength(1);
  });

  it("trả lời sai rồi đúng một câu trắc nghiệm có hình thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("sn-sach")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Mai đúng, góc bằng 150°" }));
    expect(screen.getByRole("button", { name: "Mai sai, góc bằng 30°" }).hasAttribute("disabled")).toBe(false);
  });
});
