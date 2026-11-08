# Brief — Bài 9. Luyện tập chung

- SGK: Toán 4 KNTT tập một, trang 31-32, chủ đề 2 "Góc và đơn vị đo góc".
- Route: `/kntt-4/bai-9`
- Trạng thái: chờ duyệt

> Lưu ý: yêu cầu ban đầu ghi "bài 10", nhưng hai PDF là trang 31-32 (Bài 9 trong `lib/lessons.ts`). Đã xác nhận làm Bài 9. Bài 10 (số có sáu chữ số, trang 33) cần PDF khác.

## Đánh giá

**Vị trí.** Bài 7 (Đo góc, đơn vị đo góc, tr.23) và Bài 8 (Góc nhọn, góc tù, góc bẹt, tr.26) là hai bài nguồn; Bài 9 là bài cuối chủ đề 2. Bài sau là Bài 10 (số có sáu chữ số), sang chủ đề khác. Chủ đề này không có bài ôn riêng nào khác. Bài 7 và 8 chưa có trong repo (`available: false`).

**Cấu trúc SGK.** Chỉ có phần Luyện tập, trải trên 2 trang: tr.31 có 4 bài (đo góc; đo góc trong hình; chọn hình đúng với mô tả; tìm góc trong đồ vật quanh em), tr.32 có 4 bài (vẽ góc tù theo mẫu trên lưới ô; hình nào có góc 90°; đo góc đỉnh G; Đ/S về góc trong hình sao sáu cánh).

**Bài nguồn (thay cho "mục tiêu").**

| Bài nguồn | Điều cần nhớ |
|---|---|
| Bài 7 | Góc đỉnh O, cạnh OA, OB; đơn vị độ (°); dùng thước đo góc; góc vuông 90°, góc bẹt 180° |
| Bài 8 | Góc nhọn (nhỏ hơn 90°), góc tù (lớn hơn 90° nhỏ hơn 180°), góc bẹt; dùng ê ke để nhận biết góc vuông |

**Kiến thức cần có** chính là hai bài trên. Vì chúng chưa làm, phần "Nhắc lại nhanh" của Bài 9 phải tự đứng được (xem Câu hỏi 1).

**Điểm mấu chốt.**

- SGK không giải thích cách đọc thước đo góc (hai vòng số, chọn vòng nào). Đây là chỗ con sai nhiều nhất.
- Màn hình không đo bằng thước thật được. Các bài "đo" phải đổi thành đọc số đo từ thước đo góc vẽ sẵn, hoặc nhận biết loại góc qua ê ke, không giả vờ có thước.
- Bài tr.31 số 2: các góc nằm trong một hình ghép, con phải tự tách ra góc nào theo "đỉnh, cạnh" đề cho. Chữ "góc đỉnh S; cạnh ST, SD" là cách đọc bắt buộc của SGK.
- Bài tr.31 số 3 là bài suy luận: cho số đo hai góc rồi chọn hình đúng. Bẫy: hình A có góc 90° nhưng hai cạnh còn lại tạo góc bẹt.
- Bài tr.32 số 1 (vẽ trên lưới) và tr.31 số 4 (tìm đồ vật) là hoạt động thực hành, không chấm được trên app. Chuyển vào Phụ huynh làm hoạt động ôn.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Đọc nhầm vòng số trên thước | Góc nhọn mà đọc 130° (đúng 50°) | Mẹo "nhọn thì số nhỏ": ước lượng loại góc trước, đọc số sau. Có câu "Tìm lỗi sai" |
| Đo không bắt đầu từ vạch 0 | Cạnh thứ nhất đặt ở vạch 20°, đọc luôn số của cạnh kia | Hình thước có cạnh thứ nhất luôn nằm ở 0°, và một câu thấy thước lệch phải trừ hoặc xoay lại |
| Cạnh dài hơn thì góc lớn hơn | Hai góc cùng 60°, góc có cạnh dài hơn bị chọn "lớn hơn" | Hai góc cùng đỉnh, cùng độ mở, khác độ dài cạnh (QuickCheck) |
| Không nhận ra góc bẹt vì "đường thẳng" | Cho rằng M, I, N thẳng hàng thì không có góc (đúng: góc bẹt 180°) | Hình có đỉnh I giữa đoạn MN; KeyFact "góc bẹt là hai cạnh tạo thành một đường thẳng" |
| Gọi tên góc sai đỉnh | Góc đỉnh G nhưng chọn góc ở L | Câu cho "đỉnh, cạnh" rồi chọn góc, hình tô sáng góc được hỏi |
| Cộng sai khi ghép góc | 40° + 90° = 130° nhưng chọn hình có góc 90° + 40° nằm hai phía | Câu chọn hình (dạng SGK tr.31 số 3), giải thích nêu hai tia nằm cùng phía |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Bài dựa hoàn toàn vào Bài 7, 8: khởi động chính là các câu "Nhắc lại nhanh" |
| Bốn kênh | Dùng | Nói (gọi đúng tên góc, đỉnh, cạnh); hình (hình góc, thước); nhẩm (ước lượng nhọn/tù trước khi đọc số); viết (điền số đo). Thiếu kênh nhẩm, bù bằng câu ước lượng |
| Câu tư duy | Dùng | Ước lượng, tìm lỗi sai, "vì sao": phục vụ lỗi đọc nhầm vòng thước |
| Đếm, Tách, So sánh | Không dùng | Không có quy luật bước, số lớn hay quan hệ "gấp/hơn kém" |

**Khởi động / nhắc đầu vào** (làm bằng `QuickCheck`, không lưu tiến độ):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| w1 | trac-nghiem | Góc vuông có số đo bao nhiêu? | **90°** |
| w2 | trac-nghiem | Góc nào lớn hơn góc vuông và nhỏ hơn góc bẹt? | **Góc tù** |
| w3 | dien-so | Góc bẹt bằng ... độ | **180** |

**Câu thử trong Lý thuyết:** mỗi mục một `QuickCheck` (ghi ở phần Lý thuyết).

**Suy nghĩ thêm** (nhóm cuối bài tập):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| t1 | trac-nghiem | Ước lượng: góc hình vẽ gần với số nào nhất (góc nhọn thấy bằng mắt, ~50°) | **50°** |
| t2 | trac-nghiem | Tìm lỗi sai: An đọc góc nhọn là 130° vì sao sai? | **Đọc nhầm vòng số trên thước** |
| t3 | dien-so | Hai góc vuông ghép lại thành góc ... độ | **180** |

**Vượt SGK:** t3 (hai góc vuông ghép thành góc bẹt). Chỉ để hiểu sâu số 180°, không dạy phép cộng góc.

## Phần Phụ huynh

Chỉ ghi ý riêng của bài; khung 6 mục theo mẫu.

1. **Con học gì:** củng cố đo góc, đọc số đo, phân loại góc nhọn, vuông, tù, bẹt.
2. **Con cần biết trước:** Bài 7 và 8. Nếu con sai nhóm "Đo và đọc số đo" thì xem lại Bài 7; sai nhóm "Nhọn, vuông, tù, bẹt" thì xem lại Bài 8.
3. **Cách giải thích:** dùng đúng "góc đỉnh O; cạnh OA, OB". Dạy con ước lượng bằng ê ke trước, đọc thước sau.
4. **Lỗi hay gặp:** đọc nhầm vòng số; cạnh dài tưởng góc lớn; không nhận ra góc bẹt.
5. **Hoạt động ôn 10 phút:** (a) đi tìm 5 góc vuông trong nhà bằng ê ke hoặc góc tờ giấy (thay SGK tr.31 số 4); (b) đặt kim đồng hồ ở 3 giờ, 6 giờ, 2 giờ rồi gọi tên góc giữa hai kim; (c) vẽ góc tù theo mẫu trên giấy ô li (thay SGK tr.32 số 1).
6. **Dấu hiệu đã nắm:** con tự ước lượng loại góc trước khi đọc số và đọc đúng vòng thước.

**Đáp án bài trong sách** (khối `Fold`, xem phụ lục).

## Phần Lý thuyết

"Nhắc lại nhanh": không bắt buộc animation. Chọn theo lỗi hay mắc và theo bài tập.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Gọi tên góc: đỉnh, cạnh | Bài 7 | Hình `Goc` có nhãn A, O, B; câu "góc đỉnh O; cạnh OA, OB" |
| Đọc số đo bằng thước đo góc | Bài 7 | Hình `Goc` với thước, một `QuickCheck` đọc số (đúng vòng) |
| Góc vuông 90°, góc bẹt 180° | Bài 7 | `KeyFact` |
| Nhọn nhỏ hơn vuông, tù lớn hơn vuông nhỏ hơn bẹt | Bài 8 | Hình ba góc cạnh nhau (nhọn, vuông, tù) + `KeyFact`; `QuickCheck` phân loại |
| Dùng ê ke kiểm tra góc vuông | Bài 8 | Hình ê ke áp vào góc, một ví dụ ngắn |

Mỗi điểm: câu ngắn, hình tĩnh hoặc `step` ≤ 3 bước, `KeyFact`, `QuickCheck`. Không có animation phức tạp; cần một animation duy nhất "đọc thước" (3 bước: đặt cạnh trùng 0°, nhìn tia còn lại, đọc đúng vòng) vì đây là lỗi nặng nhất. Bố cục 390px: thước đo là nửa đường tròn rộng ≤ 340px, chữ số ≥ 14 (chỉ ghi nhãn mỗi 30°, vạch con mỗi 10°).

## Phần Bài tập

Nhóm theo bài nguồn, giữ dạng và độ khó SGK, đổi số liệu. Đáp án in đậm.

**Nhóm 1 — Đo góc (Bài 7).** Hình có thước đo góc vẽ sẵn.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| a1 | dien-so | Đọc số đo góc đỉnh O; cạnh OA, OB | **50** |
| a2 | dien-so | Đọc số đo góc đỉnh K; cạnh KG, KP | **130** |
| a3 | dien-so | Góc đỉnh I; cạnh IM, IN (M, I, N thẳng hàng) | **180** |
| a4 | dien-so | Góc đỉnh E; cạnh EC, ED, vuông | **90** |

**Nhóm 2 — Góc trong hình ghép (Bài 7, 8; SGK tr.31 số 2, tr.32 số 3).** Hình bậc thang hai đường ngang: đỉnh S, D vuông, cạnh xiên GL làm góc nhọn 70° với đường ngang. Số liệu khác SGK (SGK là ~60°).

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| b1 | trac-nghiem | Góc đỉnh G; cạnh GS, GL là góc gì? | **Góc tù** |
| b2 | dien-so | Số đo góc đỉnh G; cạnh GS, GL | **110** |
| b3 | trac-nghiem | Góc đỉnh D; cạnh DS, DL là góc gì? | **Góc vuông** |
| b4 | dien-so | Số đo góc đỉnh L; cạnh LG, LC | **110** |

**Nhóm 3 — Chọn hình đúng (SGK tr.31 số 3).** `illustration` gồm 3 hình A, B, C.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| c1 | trac-nghiem | Rô-bốt vẽ góc đỉnh O; cạnh OM, ON có số đo 40°, và góc đỉnh O; cạnh ON, OP có số đo 90°. Hình nào đúng? Hình B: tia OP ngang, ON thẳng lên, OM lệch trái 40° so với ON | **B** |
| c2 | trac-nghiem | Cùng hình, góc đỉnh O; cạnh OM, OP có số đo bao nhiêu? (40° + 90°) | **130°** |

**Nhóm 4 — Nhọn, vuông, tù, bẹt trong đời sống (Bài 8; thay SGK tr.31 số 4, tr.32 số 2).** Dùng `DongHo` ở `components/math/dong-ho.tsx` nếu hợp, ngược lại text.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| d1 | trac-nghiem | Kim đồng hồ chỉ 3 giờ, góc giữa hai kim là góc gì? | **Góc vuông** |
| d2 | trac-nghiem | Kim đồng hồ chỉ 6 giờ, góc giữa hai kim là góc gì? | **Góc bẹt** |
| d3 | trac-nghiem | Kim đồng hồ chỉ 2 giờ (60°), góc giữa hai kim là góc gì? | **Góc nhọn** |
| d4 | trac-nghiem | Kim đồng hồ chỉ 4 giờ (120°), góc giữa hai kim là góc gì? | **Góc tù** |

**Nhóm 5 — Đ/S về góc trong hình (SGK tr.32 số 4).** Hình thang vuông ABCD (hai góc vuông ở A và D) và điểm E giữa B, C. Dùng `trac-nghiem` với 2 lựa chọn "Đúng"/"Sai".

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| e1 | trac-nghiem | Trong hình có góc nhọn, góc tù, góc vuông | **Đúng** |
| e2 | trac-nghiem | Trong hình có góc bẹt (đỉnh E, cạnh EB, EC) | **Đúng** |
| e3 | trac-nghiem | Góc đỉnh A; cạnh AB, AD là góc tù | **Sai** |

**Nhóm 6 — Suy nghĩ thêm:** t1, t2, t3 như bảng ở mục Tư duy.

Các bài SGK không đưa vào bài tập (không chấm được trên app): tr.32 số 1 (vẽ góc tù), tr.31 số 4 (tìm đồ vật). Cả hai nằm trong hoạt động ôn của Phụ huynh.

## Kỹ thuật

- Thêm `components/math/goc.tsx` (Server Component): vẽ một góc theo `soDo`, hướng `huong`, có nhãn đỉnh/cạnh, tùy chọn `thuoc` (thước đo góc nửa đường tròn, cạnh thứ nhất ở 0°). Hình tĩnh dùng cho Lý thuyết và `illustration`. Tọa độ làm tròn tránh lệch hydration.
- Hình riêng của bài đặt trong `_illustrations/`: bậc thang (nhóm 2), 3 hình A/B/C (nhóm 3), hình thang (nhóm 5). `bai-tap.ts` tạo bằng `createElement`.
- Animation `_animations/doc-thuoc.tsx` (3 bước) theo mẫu bước chuẩn.
- Test: `bai-tap.test.ts` (không trùng id; câu "số đo" tính lại bằng hàm hình học: ví dụ `soDoGocTu(goc xiên) = 180 - 70`; trắc nghiệm hợp lệ), test tương tác bấm hết bước animation. Test của `Goc` kiểm tra tọa độ đầu mút từ số đo.
- Không thêm đơn vị, màu hay dạng bài mới. Đặt `available: true` cho Bài 9 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "góc đỉnh O; cạnh OA, OB", "góc nhọn/vuông/tù/bẹt", "thước đo góc", "ê ke", đơn vị "độ" viết 90°.
- Không dạy: góc kề bù, góc phụ, cách đo bằng thước dài cho độ lớn, cộng trừ góc ngoài câu c2 và t3.
- Số đo viết liền, dùng ký hiệu độ ở cuối: 90°.

## Câu hỏi cần chốt

1. **Bài 7, 8 chưa làm: có làm trước không?** Đề xuất: làm Bài 9 trước với phần "Nhắc lại nhanh" tự đứng được như trên, vì bạn cung cấp tư liệu Bài 9 và bài này không đòi kiến thức nào vượt Bài 7, 8. Lý do: phần đọc thước cần dạy lại ngắn, không mất công; Phụ huynh vẫn gợi ý xem lại bài gốc khi bài đó có.
2. **Thước đo góc có tương tác không?** Đề xuất: hình tĩnh + một animation 3 bước. Lý do: kéo xoay thước trên cảm ứng tốn công, dễ lỗi, mà mục tiêu chỉ là đọc đúng vòng.
3. **Bài vẽ góc tù (tr.32 số 1) có làm thành dạng bài mới không?** Đề xuất: không, chuyển sang hoạt động Phụ huynh. Lý do: AGENTS.md chỉ thêm dạng bài khi có bài thật cần, và vẽ trên lưới cần nhiều bước kiểm tra hình học.
4. **Số liệu đổi (50°, 130°, 110°, 40°)** có ổn không, hay muốn giữ sát SGK (60°, 120°)? Đề xuất: đổi như trên để con không nhớ đáp án.

## Phụ lục: đáp án SGK

Đáp án dưới đây suy ra từ hình trong SGK (đo trên ảnh tr.31-32), chưa đối chiếu sách giáo viên; cần xác nhận trước khi đưa vào khối Phụ huynh.

**Trang 31**

1. Góc đỉnh O; cạnh OA, OB: **90°**. Góc đỉnh I; cạnh IM, IN: **180°**. Góc đỉnh E; cạnh EC, ED: khoảng **120°**. Góc đỉnh K; cạnh KG, KP: khoảng **60°**.
2. a) góc đỉnh S; cạnh ST, SD: **90°**. b) góc đỉnh D; cạnh DS, DL: **90°**. c) góc đỉnh G; cạnh GS, GL: khoảng **120°**. d) góc đỉnh L; cạnh LG, LC: khoảng **120°**.
3. **Hình B** (MON = 30°, NOP = 90°, MOP = 30° + 90° = 120°). Hình A có M, O, P thẳng hàng nên MOP là góc bẹt; hình C đặt đỉnh O ở đầu mút, các tia không khớp mô tả.
4. Mở: tìm đồ vật có góc nhọn, vuông, tù (góc bàn, ê ke, com pa...).

**Trang 32**

1. Vẽ góc tù như mẫu: L, A, G trên lưới ô, đỉnh A ở dưới.
2. Hình có góc 90° (cần đối chiếu sách giáo viên, ảnh người nhảy cầu và người đạp xe).
3. a) góc đỉnh G; cạnh GA, GN: khoảng **127°** (tù, đo trên ảnh nên có thể SGK ghi 125° hoặc 130°). b) cạnh GA, GE: **90°**. c) cạnh GN, GM: khoảng **53°** (nhọn). Hai số a và c cộng thành 180°.
4. a) **Đ**. b) cần đối chiếu sách giáo viên (hình sao sáu cánh).
