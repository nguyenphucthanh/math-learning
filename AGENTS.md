<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Math Learning

App học toán cho con, dùng nội bộ trong gia đình. Trước mắt là Toán lớp 4 theo chương trình của Bộ GD&ĐT, bộ sách Kết nối tri thức (KNTT).

Người dùng: học sinh khoảng 9-10 tuổi và phụ huynh học cùng. Thiết bị chính: tablet và điện thoại.

## Nguyên tắc kỹ thuật

- Site tĩnh hoàn toàn: `output: 'export'`, host trên Vercel. Không backend, database, Server Actions, route handler động hay tài khoản.
- Không public: đặt `robots: { index: false, follow: false }` trong metadata của root layout.
- Giao diện và nội dung bằng tiếng Việt (`lang="vi"`, font có subset `vietnamese`). Code identifier bằng tiếng Anh. Slug là tiếng Việt không dấu.
- Ảnh: `next/image` mặc định không chạy với static export, nên ưu tiên SVG; ảnh bitmap dùng `images.unoptimized: true`.
- Giữ bundle nhẹ: chỉ dùng `'use client'` cho phần tương tác, nội dung tĩnh để là Server Component.

## Cấu trúc

Mỗi bài là một folder route tĩnh, không dùng `[slug]`, để code riêng của bài nằm cùng bài và tự tách bundle.

```
app/kntt-4/
  layout.tsx            # khung chung: mục lục, breadcrumb
  page.tsx              # danh sách bài
  bai-1/                # URL: /kntt-4/bai-1
    page.tsx            # metadata, ghép các phần qua <LessonPage>
    brief.md            # bản đánh giá SGK và kế hoạch bài
    phu-huynh.mdx
    ly-thuyet.mdx
    bai-tap.ts          # dữ liệu bài tập có type
    _animations/        # animation riêng của bài
components/
  lesson/               # LessonPage, điều hướng trước/sau
  exercises/            # renderer theo từng dạng bài tập
  math/                 # PhanSo, DatTinh, TiaSo...
  ui/                   # shadcn, không sửa trừ khi cần thiết
hooks/use-lesson-progress.ts
lib/lessons.ts          # registry: số bài, tên, chủ đề, tập
```

- Layout không nhận dữ liệu từ page và không re-render khi chuyển bài. `layout.tsx` chỉ giữ khung chung; thứ tự các phần của bài do `<LessonPage>` đảm nhận.
- Bài mới phải được thêm vào `lib/lessons.ts`. Registry là nguồn duy nhất cho mục lục và điều hướng trước/sau.
- Component dùng từ 2 bài trở lên thì chuyển từ `_animations/` hoặc folder bài lên `components/`.
- Chưa dùng KaTeX. Biểu diễn toán bằng component trong `components/math/`, đặc biệt là đặt tính theo cột và phân số.

## Quy trình làm một bài

1. Người dùng cung cấp nội dung SGK (ảnh, PDF hoặc text).
2. Agent đọc, đánh giá và viết `brief.md`: mục tiêu, kiến thức cần có, lỗi con hay mắc, mục "Tư duy", ý tưởng hình ảnh/animation, dạng bài tập.
3. **Dừng lại để người dùng duyệt brief. Chưa viết code trước khi được duyệt.**
4. Viết nội dung và animation, thêm bài vào registry.
5. Kiểm tra theo mục "Hoàn thành một bài".

Ảnh và file SGK chỉ là tư liệu để agent lên nội dung. **Không copy vào repo**, kể cả `public/` và `brief.md`.

## Tư duy

Mỗi `brief.md` có mục "Tư duy": chọn yếu tố phù hợp với bài, dùng hết hoặc một phần. Các yếu tố lấy cảm hứng từ cách dạy number sense của Mathnasium.

| Yếu tố | Dùng khi |
|---|---|
| Đếm | Bài có quy luật theo bước, như đơn vị, bội số, dãy số |
| Tách | Bài có số lớn, số đo ghép, tính nhẩm |
| So sánh | Bài có quan hệ "hơn/kém" hoặc "gấp" |
| Kiểm tra đầu vào | Bài dựa nhiều vào kiến thức cũ |
| Bốn kênh (nói, hình, nhẩm, viết) | Mọi bài: rà xem thiếu kênh nào, chỉ bù kênh có ích |
| Câu tư duy ("vì sao", ước lượng, tìm lỗi sai) | Bài có lỗi hay mắc rõ ràng |

- Mỗi yếu tố được chọn phải phục vụ một mục tiêu hoặc một lỗi trong brief. Yếu tố không dùng thì ghi lý do.
- Cách của SGK vẫn là chính; tư duy chỉ để hiểu sâu hoặc tự kiểm tra lại. Phần vượt SGK phải ghi rõ trong brief.
- Khởi động là đầu phần Lý thuyết, tối đa 3 phút, không đổi cấu trúc trang.
- Kết quả kiểm tra đầu vào chỉ dùng tại chỗ, không lưu vào tiến độ.

## Cấu trúc một trang bài

Một trang cuộn có thanh mục lục dính, theo thứ tự: Phụ huynh (mặc định thu gọn) → Lý thuyết → Bài tập.

### Phụ huynh

Viết cho người lớn không chuyên toán, đọc trong khoảng 3 phút, theo đúng mẫu:

1. Con học gì trong bài này
2. Con cần biết gì trước
3. Cách giải thích cho con, dùng đúng thuật ngữ và cách làm của SGK
4. Lỗi con hay gặp và cách gỡ
5. Hoạt động ôn 10 phút, ưu tiên gắn với đời sống
6. Dấu hiệu con đã nắm bài

Đáp án để trong khối thu gọn riêng, tránh con thấy trước.

### Lý thuyết

- Đi theo thứ tự cụ thể → hình ảnh → ký hiệu.
- Mỗi màn hình một ý, câu ngắn, từ ngữ hợp lứa tuổi.
- Thuật ngữ và cách trình bày phải khớp SGK, không dạy cách khác làm con lẫn lộn.
- Bài luyện tập chung hoặc ôn tập thay phần này bằng "Nhắc lại nhanh", không bắt buộc có animation.

### Bài tập

Chọn dạng theo nội dung từng bài. Dữ liệu khai báo bằng discriminated union:
`trac-nghiem`, `dien-so`, `dung-sai`, `so-sanh`, `noi-cap`, `keo-tha`, `dat-tinh`, `loi-van`, và `custom` cho dạng riêng của bài.

- Mỗi câu có gợi ý và giải thích, không chỉ báo đúng/sai.
- Câu sai được làm lại, không phạt.
- Bài có nhiều tiết vẫn là một page, bài tập chia nhóm theo tiết.

## Animation

Chọn mức thấp nhất đủ để diễn đạt ý:

| Mức | Công cụ | Khi nào dùng |
|---|---|---|
| 1 | CSS, `tw-animate-css` | Phản hồi nhỏ, chuyển trạng thái |
| 2 (mặc định) | GSAP + SVG, `useGSAP` từ `@gsap/react` | Minh họa theo bước, có tương tác |
| 3 | Manim, xuất video | Chỉ khi GSAP khó diễn đạt; ghi lý do trong `brief.md` |

- Mỗi animation dạy đúng một ý. Không thêm animation chỉ để trang trí.
- Con tự bấm từng bước và có nút xem lại. Không tự chạy lặp.
- Tôn trọng `prefers-reduced-motion`, luôn có trạng thái tĩnh đọc được.
- Video Manim giữ cả file nguồn và file xuất, nén nhỏ nhất có thể vì con có thể xem bằng điện thoại.

## Tablet và điện thoại

- Thiết kế và kiểm tra ở cả hai: điện thoại dọc (390px) và tablet (768px, 1024px).
- Vùng chạm tối thiểu 44×44px. Không có chức năng nào phụ thuộc vào hover.
- Kéo thả phải dùng tốt bằng cảm ứng, có cách thay thế bằng chạm chọn rồi chạm đặt.
- Ô nhập số dùng `inputMode="numeric"`. Bàn phím ảo không được che câu hỏi.
- SVG co theo màn hình; số và phép tính phải đọc rõ trên điện thoại.

## Tiến độ

- Chỉ lưu `localStorage`, chỉ qua `hooks/use-lesson-progress.ts`, ở mức đã làm và điểm từng bài.
- Key có version: `math-learning:progress:v1`.
- Chỉ đọc sau khi mount để tránh lỗi hydration. App vẫn phải chạy được nếu `localStorage` lỗi hoặc dữ liệu cũ hỏng.

## Hoàn thành một bài

- `npm run lint`, `npm run build` và `npm test` đều qua.
- Có test kiểm tra đáp án trong `bai-tap.ts`. Sai toán là lỗi nặng nhất của app này.
- Xem trên trình duyệt ở 390px và 768px: chạy hết animation, làm thử bài tập, cả trả lời đúng lẫn sai.
- Đối chiếu nội dung với SGK: kiến thức, thuật ngữ, cách trình bày.

## Hình ảnh

Thế giới hình ảnh là **vở ô li và mực tím**. Token nằm trong `app/globals.css`.

- Nền giấy ô vuông, mực tím `--ink`, nhãn vở ở đầu mỗi bài. Nền lưới là chủ ý, không bỏ vì cảnh báo của detector.
- Mỗi đơn vị đo có một màu cố định (`--unit-m2`, `--unit-dm2`, `--unit-cm2`, `--unit-mm2`). Dùng đúng màu đó ở mọi nơi để con nhận ra đơn vị.
- Font: Baloo 2 cho tiêu đề, Nunito cho nội dung. Số trong bài tập dùng `tabular-nums`.
- Dùng `ActionButton` thay vì `Button` của shadcn vì `Button` thấp hơn vùng chạm tối thiểu.
- Animation theo bước dùng `useStepEntrance` và `StepControls` trong `components/lesson/step-player.tsx`: React vẽ sẵn trạng thái cuối, GSAP chỉ thêm chuyển động cho phần tử có `data-enter={bước}`.

## Kiểm thử

- Test đặt cạnh code: `*.test.ts` cho dữ liệu và logic, `*.test.tsx` với `// @vitest-environment jsdom` cho tương tác. jsdom không kiểm tra được giao diện, vẫn phải xem trên trình duyệt.
- Câu đổi đơn vị khai báo `conversion` để test tính lại đáp án bằng `lib/area-units.ts`.
- `components/ui/` và `hooks/use-mobile.ts` là code shadcn sinh ra, đang được loại khỏi lint.
- Dạng bài tập mới chỉ được thêm khi có bài cần. Hiện đã có `dien-so`, `trac-nghiem`, `noi-cap`, `loi-van`; trò chơi là component riêng của bài.
