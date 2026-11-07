// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { ReviewLink } from "@/components/lesson/review-link";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { CircuitBoard } from "./_illustrations/circuit-board";
import { FieldParts } from "./_illustrations/field-parts";
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
  it("bảng mạch có mô tả, bốn nhãn 1 cm và hai ô khuyết", () => {
    render(<CircuitBoard width={12} height={6} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("dài 12 cm, rộng 6 cm");
    expect(screen.getAllByText("1 cm")).toHaveLength(4);
    expect(screen.getByText("12 cm")).toBeTruthy();
    expect(screen.getByText("6 cm")).toBeTruthy();
    expect(document.querySelectorAll("rect")).toHaveLength(2);
  });

  it("thửa ruộng vẽ đúng số phần và chỉ ghi diện tích cả thửa", () => {
    render(<FieldParts total={5000} parts={5} />);
    expect(screen.getAllByTestId("field-part")).toHaveLength(5);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("5 000 mét vuông");
    expect(screen.queryByText(/1 000/)).toBeNull();
  });
});

describe("liên kết về bài gốc", () => {
  it("ReviewLink trỏ đúng bài", () => {
    render(<ReviewLink slug="bai-17">Xem lại Bài 17. Yến, tạ, tấn</ReviewLink>);
    expect(screen.getByRole("link", { name: /Bài 17/ }).getAttribute("href")).toBe("/kntt-4/bai-17");
  });
});

describe("ô điền số", () => {
  it("câu đã giải hiện số lượng tách lớp, năm viết liền", () => {
    render(<QuestionBody question={question("sn-4")} solved onSolved={() => {}} />);
    const values = screen.getAllByLabelText("Điền số").map((input) => (input as HTMLInputElement).value);
    expect(values).toEqual(["42", "4 200"]);
    cleanup();
    render(<QuestionBody question={question("tg-6a")} solved onSolved={() => {}} />);
    expect((screen.getByLabelText("Điền số") as HTMLInputElement).value).toBe("2195");
  });
});

describe("bộ bài tập", () => {
  it("đủ 5 nhóm và hiện tiến độ", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-21" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Diện tích", "Khối lượng", "Thời gian", "Bài toán đời sống", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }
  });
});
