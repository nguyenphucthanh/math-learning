// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { DocDungThang } from "@/components/math/doc-dung-thang";
import { ThuocDo } from "@/components/math/thuoc-do";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChonHinh } from "./_illustrations/chon-hinh";
import { PhanLoaiGoc } from "./_illustrations/phan-loai-goc";
import { TamGiacDiem } from "./_illustrations/tam-giac-diem";
import { exerciseGroups } from "./bai-tap";

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
    const cases = [<PhanLoaiGoc key="a" />, <ChonHinh key="b" />, <ChonHinh key="c" only="B" />, <TamGiacDiem key="d" />];
    for (const element of cases) {
      const { unmount } = render(element);
      expect(screen.getByRole("img").getAttribute("aria-label")).toBeTruthy();
      unmount();
    }
  });

  it("bốn loại góc có đủ bốn tên", () => {
    render(<PhanLoaiGoc />);
    for (const name of ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"]) expect(screen.getByText(name)).toBeTruthy();
  });

  it("ba hình A, B, C có tên", () => {
    render(<ChonHinh />);
    for (const name of ["Hình A", "Hình B", "Hình C"]) expect(screen.getByText(name)).toBeTruthy();
  });
});

describe("đọc đúng vòng số (dùng lại từ Bài 7)", () => {
  it("đi hết các bước và xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<DocDungThang />);
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("line[stroke-dasharray]")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-9" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
  });

  it("câu đọc thước hiện hình và ô điền số", () => {
    render(<QuestionBody question={question("do-2")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bên trái");
    expect(screen.getAllByLabelText("Điền số")).toHaveLength(1);
  });

  it("thước ẩn số vẫn có hình cho câu ước lượng", () => {
    render(<ThuocDo angle={50} base="right" showScale={false} rightLine />);
    expect(screen.getByRole("img")).toBeTruthy();
  });

  it("trả lời sai rồi đúng câu tìm lỗi thì được làm lại", async () => {
    const user = userEvent.setup();
    render(<QuestionBody question={question("sn-loi")} solved={false} onSolved={() => {}} />);
    await user.click(screen.getByRole("button", { name: "An đúng, góc bằng 110°" }));
    expect(screen.getByRole("button", { name: "An sai, góc bằng 70°" }).hasAttribute("disabled")).toBe(false);
  });
});
