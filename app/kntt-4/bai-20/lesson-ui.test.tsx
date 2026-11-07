// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { KeyFact } from "@/components/lesson/key-fact";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { Banknotes } from "./_illustrations/banknotes";
import { FilterBottles } from "./_illustrations/filter-bottles";
import { LGarden } from "./_illustrations/l-garden";
import { PriceBoard, shopBoard } from "./_illustrations/price-board";
import { ScaleRow, dialPoint, needleAngle } from "./_illustrations/scale-dial";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("mặt cân", () => {
  it("góc kim: 0 ở đỉnh, 25 bên phải, 50 ở dưới, 75 bên trái", () => {
    expect(needleAngle(25)).toBe(90);
    expect(needleAngle(50)).toBe(180);
    expect(needleAngle(75)).toBe(270);
    expect(dialPoint(needleAngle(25), 56)).toEqual({ x: 136, y: 80 });
    expect(dialPoint(needleAngle(50), 56)).toEqual({ x: 80, y: 136 });
    expect(dialPoint(needleAngle(75), 56)).toEqual({ x: 24, y: 80 });
  });

  it("vẽ mỗi cân một kim, kim đúng chỗ số kg", () => {
    render(<ScaleRow readings={[30, 20, 45]} captions={["Bao 1", "Bao 2", "Bao 3"]} />);
    const needles = screen.getAllByTestId("scale-needle");
    expect(needles).toHaveLength(3);
    [30, 20, 45].forEach((kg, index) => {
      const tip = dialPoint(needleAngle(kg), 56);
      expect(Number(needles[index].getAttribute("x2"))).toBe(tip.x);
      expect(Number(needles[index].getAttribute("y2"))).toBe(tip.y);
    });
    expect(screen.getByText("Bao 3")).toBeTruthy();
  });

  it("mặt cân có nhãn 25, 50, 75 và 100 kg", () => {
    render(<ScaleRow readings={[40]} />);
    for (const label of ["25", "50", "75", "100 kg"]) expect(screen.getByText(label)).toBeTruthy();
  });
});

describe("hình minh họa", () => {
  it("bảng giá ghi giá tách lớp bằng NBSP", () => {
    render(<PriceBoard {...shopBoard} />);
    const cells = screen.getAllByRole("cell").map((cell) => cell.textContent);
    expect(cells).toContain("85\u00a0000 đồng/quyển");
    expect(screen.getByRole("row", { name: /Hộp đựng bút/ })).toBeTruthy();
  });

  it("hình chữ L, 3 chai, 3 tờ tiền có mô tả", () => {
    render(
      <>
        <LGarden />
        <FilterBottles bottles={[{ name: "Chai A", time: "170 giây" }]} />
        <Banknotes />
      </>,
    );
    const labels = screen.getAllByRole("img").map((node) => node.getAttribute("aria-label"));
    expect(labels[0]).toContain("hình chữ L");
    expect(labels[1]).toContain("Chai A: 170 giây");
    expect(labels[2]).toContain("200 000 đồng");
  });
});

describe("ghi nhớ không đơn vị", () => {
  it("KeyFact không có unit vẫn hiện đẳng thức", () => {
    render(<KeyFact equation="Tiền thừa = tiền đưa − tiền phải trả">Nội dung</KeyFact>);
    expect(screen.getByText("Tiền thừa = tiền đưa − tiền phải trả")).toBeTruthy();
  });
});

describe("ô điền số", () => {
  it("câu đã giải hiện số lượng tách lớp", () => {
    render(<QuestionBody question={question("t-6")} solved onSolved={() => {}} />);
    expect((screen.getByLabelText("Điền số") as HTMLInputElement).value).toBe("83 000");
  });
});

describe("bộ bài tập", () => {
  it("đủ 5 nhóm và hiện tiến độ", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-20" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Khối lượng", "Diện tích", "Thời gian", "Tiền", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }
  });
});
