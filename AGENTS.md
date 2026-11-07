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
2. Agent đọc, đánh giá và viết `brief.md` theo mục "Viết brief" bên dưới: mục tiêu, kiến thức cần có, lỗi con hay mắc, mục "Tư duy", ý tưởng hình ảnh/animation, dạng bài tập.
3. **Dừng lại để người dùng duyệt brief. Chưa viết code trước khi được duyệt.**
4. Viết nội dung và animation, thêm bài vào registry.
5. Kiểm tra theo mục "Hoàn thành một bài".

Ảnh và file SGK chỉ là tư liệu để agent lên nội dung. **Không copy vào repo**, kể cả `public/` và `brief.md`.

## Viết brief

Mục này thay cho việc đọc brief bài cũ. Không mở `brief.md` của bài khác để lấy mẫu; chỉ mở khi cần số liệu cụ thể của bài đó (ví dụ bài trước là kiến thức nền). Vị trí bài trong sách lấy từ `lib/lessons.ts`.

**Thứ tự mục trong `brief.md`**

1. Tiêu đề `# Brief — Bài N. Tên bài`, rồi 3 dòng: SGK (tập, trang, chủ đề); route; trạng thái (`chờ duyệt` → `đã duyệt` → `đã viết nội dung`).
2. `## Đánh giá`: vị trí bài (bài trước, bài sau, bài ôn lại nó); cấu trúc SGK (Khám phá → Hoạt động → Luyện tập, số bài mỗi phần); mục tiêu đánh số, mỗi mục kiểm tra được; kiến thức cần có; điểm mấu chốt (chỗ SGK không giải thích, chỗ dễ lẫn với bài vừa học, bẫy trong bài của SGK).
3. `## Lỗi con hay mắc`: bảng 3 cột Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý (gắn với animation hoặc câu cụ thể).
4. `## Tư duy`: bảng Yếu tố | Mức độ | Phục vụ, theo quy tắc ở mục "Tư duy". Có dòng "Không dùng" kèm lý do. Liệt kê khởi động, câu thử trong Lý thuyết và nhóm "Suy nghĩ thêm" bằng bảng Id | Dạng | Câu | Đáp án. Câu vượt SGK ghi riêng dưới nhãn "Vượt SGK".
5. `## Phần Phụ huynh`: 6 mục theo mẫu, chỉ ghi ý riêng của bài (lỗi, hoạt động ôn, dấu hiệu), không chép lại khung.
6. `## Phần Lý thuyết`: các chặng theo thứ tự cụ thể → hình ảnh → ký hiệu. Mỗi chặng ghi: một ý, animation (số bước, hình gì), `KeyFact`, `QuickCheck`. Ghi bố cục 390px nếu hình rộng.
7. `## Phần Bài tập`: nhóm theo tiết hoặc phần SGK, giữ dạng và độ khó của SGK, đổi số liệu. Mỗi câu ghi dạng (`dien-so`, `trac-nghiem`...) và đáp án in đậm. Nhóm cuối "Suy nghĩ thêm".
8. `## Kỹ thuật`: chỉ khi bài cần thứ mới (thư viện đơn vị, token màu, dạng bài, thay đổi kiểu). Không cần thì bỏ mục. Luôn ghi việc đặt `available` trong `lib/lessons.ts`.
9. `## Tiêu chí duyệt nội dung`: thuật ngữ SGK, cách viết số, điều không dạy.
10. `## Câu hỏi cần chốt`: 2-4 quyết định, mỗi câu kèm đề xuất và lý do. Đây là chỗ người dùng duyệt.
11. `## Phụ lục: đáp án SGK`: đáp án từng bài theo trang, cho khối Phụ huynh.

**Quy tắc**

- Không chép lại đề SGK; chỉ ghi số bài, dạng, và số liệu đã đổi.
- Đáp án trong brief phải tính lại, không lấy trí nhớ. Dữ kiện ngoài toán (sự kiện lịch sử, ngày tháng) chưa đối chiếu nguồn thì ghi rõ.
- Phần vượt SGK ghi rõ là vượt, và nêu lý do.
- Chỉ ghi điều quyết định được nội dung; không kể lại những gì đã có trong AGENTS.md (cấu trúc file, animation, định dạng số).

**Bài tổng hợp, ôn tập, luyện tập chung** (như Bài 6, 9, 16, 21, 26, 32, 33-37)

- Phần Lý thuyết là "Nhắc lại nhanh": gom các điểm quan trọng nhất của các bài cũ trong chương lớn (chủ đề) mà bài này ôn. Không dạy lại từ đầu, không bắt buộc có animation.
- Trong brief, mục `## Phần Lý thuyết` có bảng: điểm cần nhắc | bài gốc | cách nhắc (`KeyFact`, ví dụ ngắn, hoặc hình tái dùng từ bài gốc). Chọn theo lỗi hay mắc và theo những gì bài tập của bài này dùng tới. Mỗi chương tối đa 5-6 điểm.
- Mục `Đánh giá` thay "mục tiêu của bài" bằng danh sách bài nguồn; "Kiến thức cần có" chính là các bài nguồn đó.
- Hình hoặc component đã có từ bài gốc thì tái dùng, ghi tên; dùng từ 2 bài trở lên thì chuyển lên `components/` theo quy tắc chung.
- Khởi động có thể bỏ, thay bằng kiểm tra đầu vào: chính các câu "Nhắc lại nhanh". Nhóm bài tập chia theo bài nguồn hoặc chủ đề, không theo tiết.
- Phần Phụ huynh: nêu bài nào nên xem lại nếu con sai nhóm nào, thay cho mục "Con học gì trong bài này".

## Làm bài theo mẫu

Mục này thay cho việc đọc lại code bài cũ. Chỉ mở file khi cần chi tiết không có ở đây. Mẫu gần nhất: `bai-19` (không có trò chơi), `bai-18` (có trò chơi trong `_game/`). Bài theo mẫu không dùng API Next mới thì không cần đọc `node_modules/next/dist/docs/`.

**File của một bài**

- `page.tsx`: copy từ `bai-19`, đổi slug. Trò chơi đặt cạnh `ExerciseSet` trong prop `exercises`.
- `bai-tap.ts` export `warmUps: Question[]`, `quickChecks` (`satisfies Record<string, Question>`), `exerciseGroups: ExerciseGroup[]`. Câu đổi đơn vị tạo qua helper `conv(id, source, to, answer)` trong file đó.
- `ly-thuyet.mdx`: câu mở → `warmUps.map` với `<QuickCheck title={`Khởi động ${index + 1}/${warmUps.length}`} .../>` → các mục `##`, mỗi mục gồm animation, `<KeyFact>`, `<QuickCheck>`.
- `phu-huynh.mdx`: 6 mục theo mẫu dùng `##`, thêm `## Đáp án bài trong sách` với `<Fold title="Xem đáp án" summary="Nhớ để con tự làm trước nhé">`.
- `lib/lessons.ts`: bài đã có sẵn trong registry, chỉ đặt tham số `available` thành `true`.

**Dữ liệu câu hỏi** (`components/exercises/types.ts`; mọi câu có `id`, `hint`, `explanation`)

| `kind` | Trường riêng |
|---|---|
| `dien-so` | `prompt?`, `parts: Part[]`, `conversion?`, `illustration?` |
| `trac-nghiem` | `prompt`, `options`, `answerIndex`, `figure?`, `illustration?` |
| `noi-cap` | `prompt`, `pairs: {left, right}[]`, `rightOrder` (hoán vị, không số nào đứng đúng vị trí của nó) |
| `loi-van` | `prompt`, `lines: Part[][]` |

- `illustration` là `ReactNode`: hình SVG riêng của bài, đặt trong `_illustrations/` cạnh bài (Server Component, không `"use client"`). `bai-tap.ts` tạo bằng `createElement(Component)` để giữ đuôi `.ts`. `figure` chỉ dành cho hình diện tích của bài 18.
- `Part` là chuỗi hoặc ô trống `{ answer: number, year?: true }`. Ô trống chỉ nhận số, nên đáp án là chữ (như tên thế kỉ) phải dùng `trac-nghiem` hoặc `noi-cap`.
- Sau lần sai thứ hai, câu tự hiện nút xem lời giải. Câu thử trong Lý thuyết dùng `QuickCheck`, không tính tiến độ.

**Component dùng chung**

- `KeyFact` (`unit`, `equation`, children): khối ghi nhớ. `unit` là `m2`, `dm2`, `cm2`, `mm2`, `second`, `century`, `yen`, `ta`, `tan`.
- `QuickCheck` (`question`, `title?`), `Fold` (`title`, `summary`), `ActionButton` (`variant`: `primary`, `soft`, `sun`).
- `ExerciseSet` (`lessonSlug`, `groups`) tự lo tiến độ. `ExerciseGroup` có `id`, `title`, `unit?`, `questions`.

**Viết animation**

- File đầu bằng `"use client"`, giữ `step` bằng `useState`, gọi `useStepEntrance(scope, step)` với `scope` là ref của `<figure>`, cuối figure đặt `<StepControls step captions onChange={setStep} />`.
- Khung: `my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6`.
- SVG: `viewBox` rộng 320-360, `role="img"`, `aria-label` mô tả trạng thái, `className="block w-full"`. Màu qua `var(--token)`, chữ `fontWeight={800}`, cỡ chữ từ 14 trở lên. Tọa độ tính bằng lượng giác thì làm tròn để tránh lệch hydration.
- Phần tử xuất hiện theo bước: render khi `step >= n` kèm `data-enter={n}`; `data-scale` tùy chọn đặt tỉ lệ bắt đầu.
- Danh sách hiện dần: luôn render mọi hàng, hàng chưa tới dùng class `invisible`, để nút không nhảy khi con bấm Tiếp.
- Chuyển động không phải kiểu "hiện ra" thì tự làm: tween GSAP cập nhật thuộc tính SVG, hoặc CSS `transition-transform motion-reduce:transition-none`. Luôn để React vẽ sẵn vị trí cuối và kiểm tra `prefers-reduced-motion`.
- Hình không cần tương tác là Server Component, không có `"use client"`.
- Viết riêng theo số liệu của bài (`MixedSplit`, `TimeSplit`) là bình thường. Chỉ gộp lên `components/` khi 2 bài thật sự dùng chung.

**Định dạng số**

- Số lượng: `formatNumber` trong `lib/area-units.ts` tách lớp bằng NBSP (U+00A0). Số gõ tay trong nội dung cũng dùng NBSP để không xuống dòng giữa số.
- Năm: viết liền, như 1698; ô trống là năm đặt `year: true`.
- `parseAnswer` chấp nhận "70 000", "70.000" và "70000".

**Thư viện theo đơn vị**

- `lib/area-units.ts`: `convertArea`, `conversionHint`, `explainConversion`.
- `lib/time-units.ts`: `convertTime`, `timeHint`, `explainTime`, `centuryOf`, `centuryRange`, `toRoman`, `countYears`.
- `lib/mass-units.ts`: `convertMass`, `massHint`, `explainMass`, `toKg`, `parseMass`.
- Đơn vị đại lượng mới (như chiều dài): tạo `lib/<đại-lượng>-units.ts` cùng dạng trên, có test riêng, rồi thêm kiểu vào `conversion.to`.

**Thêm màu đơn vị mới:** sửa `--unit-x` và `--unit-x-soft` (khối `:root`), `--color-unit-x` và `--color-unit-x-soft` (`@theme`) trong `app/globals.css`; rồi `tones` trong `components/lesson/key-fact.tsx`, `headingTones` trong `components/exercises/exercise-set.tsx`, `ExerciseGroup.unit`. Tránh hue gần `--good` (160) và `--oops` (35).

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
- Đối chiếu nội dung với SGK: kiến thức, thuật ngữ, cách trình bày.
- Người dùng tự xem trên trình duyệt ở 390px và 768px: chạy hết animation, làm thử bài tập, cả trả lời đúng lẫn sai. Agent không chạy headless browser hay browser automation để tiết kiệm chi phí, chỉ báo lại rằng phần này chưa được xem.

## Hình ảnh

Thế giới hình ảnh là **vở ô li và mực tím**. Token nằm trong `app/globals.css`.

- Nền giấy ô vuông, mực tím `--ink`, nhãn vở ở đầu mỗi bài. Nền lưới là chủ ý, không bỏ vì cảnh báo của detector.
- Mỗi đơn vị đo có một màu cố định (`--unit-m2`, `--unit-dm2`, `--unit-cm2`, `--unit-mm2`, `--unit-second`, `--unit-minute`, `--unit-century`, `--unit-yen`, `--unit-ta`, `--unit-tan`). Dùng đúng màu đó ở mọi nơi để con nhận ra đơn vị.
- Token khác: `--ink`, `--paper`, `--sun` (điểm nhấn), `--good`, `--oops` (chỉ dùng cho phản hồi đúng/sai), `--input` (viền và phần chưa tô), `--foreground`. Mỗi đơn vị có thêm bản `-soft` làm nền, trừ `--unit-minute`.
- Font: Baloo 2 cho tiêu đề, Nunito cho nội dung. Số trong bài tập dùng `tabular-nums`.
- Dùng `ActionButton` thay vì `Button` của shadcn vì `Button` thấp hơn vùng chạm tối thiểu.
- Animation theo bước dùng `useStepEntrance` và `StepControls` trong `components/lesson/step-player.tsx`: React vẽ sẵn trạng thái cuối, GSAP chỉ thêm chuyển động cho phần tử có `data-enter={bước}`.

## Kiểm thử

- Test đặt cạnh code: `*.test.ts` cho dữ liệu và logic, `*.test.tsx` với `// @vitest-environment jsdom` cho tương tác. jsdom không kiểm tra được giao diện, vẫn phải xem trên trình duyệt.
- Câu đổi đơn vị khai báo `conversion` để test tính lại đáp án bằng thư viện đơn vị của bài (`convertArea`, `convertTime`). `conversion.to` là union nên test ép kiểu: `to as TimeUnit`.
- `bai-tap.test.ts` gồm: không trùng id, câu đổi đơn vị tính lại đúng, trắc nghiệm có đáp án hợp lệ và lựa chọn không trùng, `rightOrder` hợp lệ, câu không đổi đơn vị assert bằng phép tính. Đáp án phải được tính lại, không so với số gõ tay.
- `lesson-ui.test.tsx` cần stub `window.matchMedia` với `matches: true` trong `beforeAll`, `cleanup()` và `localStorage.clear()` trong `afterEach`. Mỗi animation có một test bấm hết các bước.
- `components/ui/` và `hooks/use-mobile.ts` là code shadcn sinh ra, đang được loại khỏi lint.
- Dạng bài tập mới chỉ được thêm khi có bài cần. Hiện đã có `dien-so`, `trac-nghiem`, `noi-cap`, `loi-van`; trò chơi là component riêng của bài.
