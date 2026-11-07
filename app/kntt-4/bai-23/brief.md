# Brief — Bài 23. Phép trừ các số có nhiều chữ số

- SGK: Toán 4 KNTT tập một, trang 79–81, chủ đề 5 (Phép cộng và phép trừ).
- Route: `/kntt-4/bai-23`
- Trạng thái: đã viết nội dung

## Đánh giá

**Vị trí bài.** Bài trước: 22 (phép cộng các số có nhiều chữ số), bài này là "đối xứng" của nó. Bài sau: 24 (giao hoán, kết hợp của phép cộng), 25 (tìm hai số biết tổng và hiệu, dùng phép trừ). Bài 26 (ôn tập chương) sẽ ôn lại bài này.

**Cấu trúc SGK.** Khám phá (2 ví dụ: a không nhớ, b có nhớ 3 lần) → Hoạt động (3 bài) → Luyện tập (4 bài).

**Mục tiêu**

1. Đặt tính thẳng hàng rồi trừ hai số đến 6 chữ số, kể cả khi số trừ ít chữ số hơn số bị trừ.
2. Trừ có nhớ: khi chữ số số bị trừ nhỏ hơn chữ số số trừ thì "lấy 10 (hoặc 11, 12...) trừ", viết, nhớ 1; hàng bên trái trừ 1 (nhớ) rồi mới trừ số trừ.
3. Nhớ 1 vẫn phải bớt ở cột chỉ có chữ số của số bị trừ (cột không có chữ số của số trừ).
4. Dùng phép trừ cho bài toán "nhiều hơn bao nhiêu" và bài toán hai bước (tính tổng rồi trừ).
5. Tìm số bị trừ, số trừ từ hiệu (bằng phép cộng hoặc trừ).
6. Tìm chữ số còn thiếu trong phép trừ đặt tính.

**Kiến thức cần có**

- Bài 22: đặt tính thẳng hàng, tính từng cột từ phải sang trái, nhớ 1 (ở phép cộng).
- Lớp 3: trừ có nhớ trong phạm vi 100 000.
- Tên gọi số bị trừ, số trừ, hiệu; quan hệ cộng và trừ.
- Hàng và lớp (đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn).
- So sánh số có nhiều chữ số (cho Luyện tập 4).

**Điểm mấu chốt**

- SGK không giải thích vì sao "lấy 10 trừ 7" và vì sao "nhớ 1". Cần một hình cụ thể: 1 ở hàng bên trái đổi thành 10 ở hàng bên phải (đổi tiền).
- Cách SGK: nhớ 1 rồi **bớt 1 ở số bị trừ** ("9 trừ 1 bằng 8; 8 trừ 4 bằng 4"). Nhiều phụ huynh học cách khác: cộng 1 vào số trừ. Cả hai đều đúng nhưng trộn hai cách làm con lẫn. Bài này chỉ dạy cách SGK.
- Dễ lẫn với bài 22: ở phép cộng nhớ 1 được **cộng thêm**, ở phép trừ nhớ 1 được **bớt đi**.
- Bẫy trong SGK: Hoạt động 1 và 3 có số trừ ít chữ số hơn (36 724 − 3 291; 240 373 − 25 350). Luyện tập 3 là bài hai bước, dễ làm một bước rồi dừng. Luyện tập 4 là bài tư duy so sánh số, khó hơn mức còn lại.
- Sau khi bớt 1, chữ số vẫn có thể nhỏ hơn số trừ và phải nhớ tiếp (ví dụ 3 − 1 = 2, 2 không trừ được 5). SGK ví dụ b chưa có trường hợp này.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Trừ ngược: lấy số bé trừ số lớn trong cột | Cột đầu 0 − 7: viết 7. Đúng: lấy 10 trừ 7 = 3, nhớ 1 | Animation `ColumnSub` bước 1 của ví dụ b; Khởi động 2 |
| Nhớ rồi nhưng quên bớt 1 ở cột bên trái | 648 390 − 382 547: hàng chục 9 − 4 = 5. Đúng: 9 − 1 = 8; 8 − 4 = 4 | Ô nhớ "−1" hiện phía trên chữ số bị bớt; câu Suy nghĩ thêm T1 (tìm lỗi) |
| Không bớt 1 ở cột không có chữ số số trừ | 52 340 − 3 475: hàng chục nghìn 5 − 0 = 5. Đúng: 5 − 1 = 4 → 48 865 | Chặng 4 (đúng ví dụ này); QuickCheck chặng 4 |
| Đặt tính lệch cột khi số trừ ngắn hơn | 36 724 − 3 291 viết 3 291 sát trái | Chặng 4; câu Hoạt động 1a, 3b |
| Chọn sai phép tính ở "nhiều hơn bao nhiêu" | Cộng hai số thay vì trừ | Chặng 5; câu lời văn có `hint` hỏi "số nào lớn hơn?" |
| Bài hai bước dừng ở bước một | 500 000 − 175 000 mà bỏ qua 85 000 | Câu Luyện tập 3 chia dòng lời giải thành 2 dòng |
| Tìm số bị trừ lại lấy phép trừ | ? − 134 000 = 568 000 nhưng tính 568 000 − 134 000 | Chặng 5 KeyFact; Khởi động 3 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Có, 3 câu | Bài dựa trên bài 22 và phép trừ có nhớ lớp 3: K1 (thẳng hàng, số trừ ngắn), K2 (trừ có nhớ), K3 (tìm số bị trừ). Kết quả chỉ dùng tại chỗ |
| Tách | Nhẹ | Hoạt động 2 và Luyện tập 3 tính nhẩm theo "chục nghìn": 18 chục nghìn − 6 chục nghìn. Giúp tự kiểm tra kết quả |
| So sánh | Nhẹ | "Nhiều hơn bao nhiêu" = lấy số lớn trừ số bé (Hoạt động 2, 3) |
| Bốn kênh | Đủ | Nói (đọc to từng dòng "lấy 10 trừ 7...", ở khối Phụ huynh); hình (đổi tiền, `ColumnSub`); nhẩm (tách chục nghìn); viết (đặt tính). Không bù thêm kênh nào |
| Câu tư duy | Có, 3 câu | Tìm lỗi sai (T1), thử lại bằng phép cộng (T2), mượn dây chuyền qua chữ số 0 (T3, vượt SGK) |
| Đếm | Không dùng | Bài không có quy luật theo bước |

**Khởi động (3 câu, tối đa 3 phút)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| warm-1 | `dien-so` | 4 765 − 312 = ? | **4 453** |
| warm-2 | `dien-so` | 524 − 276 = ? | **248** |
| warm-3 | `dien-so` | ? − 250 = 450 | **700** |

**Câu thử trong Lý thuyết (`QuickCheck`)**

| Id | Chặng | Dạng | Câu | Đáp án |
|---|---|---|---|---|
| qc-1 | 1 | `dien-so` | 576 438 − 25 316 = ? | **551 122** |
| qc-2 | 2 | `dien-so` | 600 000 − 250 000 = ? (đổi 1 tờ 100 000 thành 10 tờ 10 000) | **350 000** |
| qc-3 | 3 | `dien-so` | 725 436 − 289 158 = ? | **436 278** |
| qc-4 | 4 | `dien-so` | 52 340 − 3 475 = ? | **48 865** |
| qc-5 | 5 | `dien-so` | ? − 150 000 = 320 000 | **470 000** |
| qc-6 | 5 | `dien-so` | 12 750 − 9 480 = ? (trường A hơn trường B bao nhiêu học sinh) | **3 270** |

**Suy nghĩ thêm (nhóm cuối của Bài tập)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| think-1 | `trac-nghiem` | An tính 648 390 − 382 547 = 366 853. An làm sai đầu tiên ở hàng nào? (đơn vị / chục / trăm / nghìn) | **hàng chục** (đúng là 4, An viết 5 vì quên bớt 1) |
| think-2 | `dien-so` | Thử lại 265 843 + 382 547 = ? Kết quả phải bằng số bị trừ | **648 390** |
| think-3 (Vượt SGK) | `dien-so` | 800 000 − 345 678 = ? | **454 322** |

Vượt SGK (think-3): SGK chưa có số bị trừ nhiều chữ số 0 liền nhau (nhớ dây chuyền). Giữ vì đây là chỗ con hay sai nhất khi làm bài ngoài sách. Chỉ 1 câu, không có animation, `explanation` giải bằng cách đổi 800 000 = 799 999 + 1 hoặc thử lại bằng phép cộng.

## Phần Phụ huynh

1. **Con học gì trong bài này.** Trừ hai số đến 6 chữ số theo cột, có và không có nhớ. Dùng phép trừ để so sánh ("nhiều hơn bao nhiêu"), giải bài hai bước và tìm số bị trừ.
2. **Con cần biết gì trước.** Bài 22 (đặt tính thẳng hàng, tính theo cột). Trừ có nhớ lớp 3. Gọi đúng tên số bị trừ, số trừ, hiệu.
3. **Cách giải thích cho con.** Đọc theo SGK: "0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1", rồi cột bên trái: "9 trừ 1 bằng 8; 8 trừ 4 bằng 4". Lưu ý: nếu phụ huynh quen cách cộng 1 vào số trừ thì kết quả vẫn đúng, nhưng đừng dạy hai cách cùng lúc. Chọn cách SGK.
4. **Lỗi con hay gặp và cách gỡ.** Trừ ngược trong cột, quên bớt 1 sau khi nhớ, quên bớt 1 ở cột không có chữ số số trừ. Gỡ bằng cách bảo con đọc to từng dòng và gạch nhớ nhỏ phía trên.
5. **Hoạt động ôn 10 phút.** Lấy hai giá tiền có 5–6 chữ số (hai chiếc điện thoại, hai chuyến du lịch trong tờ quảng cáo). Con tính chênh lệch bằng cách đặt tính, rồi tự thử lại bằng phép cộng. Hoặc: mẹ có 500 000 đồng, tiêu hai khoản, hỏi còn lại bao nhiêu.
6. **Dấu hiệu con đã nắm bài.** Tự đặt tính thẳng hàng khi số trừ ngắn hơn, không trừ ngược, tự thử lại bằng phép cộng, làm đúng 2 trong 3 phép trừ 6 chữ số có nhớ trong 5 phút.

Đáp án bài trong sách: trong `<Fold>` riêng, lấy từ Phụ lục bên dưới.

Nếu con sai Khởi động 2 nhiều: ôn trừ có nhớ lớp 3 trước. Nếu sai Khởi động 1: xem lại bài 22 (đặt tính thẳng hàng).

## Phần Lý thuyết

Thứ tự: cụ thể (tiền) → hình (cột) → ký hiệu. Chặng 1 ôn nhanh cách trừ theo cột trước khi sang nhớ.

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Trừ không nhớ | Đặt tính thẳng hàng, trừ từ phải sang trái | `ColumnSub` 438 589 − 235 072, 7 bước (đặt tính + 6 cột). Lời bước lấy từ `explainSub` | "Hàng nào trừ hàng đó, bắt đầu từ hàng đơn vị." | qc-1 (số trừ ngắn hơn) |
| 2. Đổi 1 thành 10 (cụ thể) | Không đủ ở hàng nhỏ thì đổi 1 ở hàng lớn hơn thành 10 | `DoiTien` 600 000 − 250 000, 4 bước: 6 tờ 100 000 → trả 2 tờ 100 000 và 5 tờ 10 000 → không có tờ 10 000 → đổi 1 tờ 100 000 thành 10 tờ 10 000 → còn 350 000 | "1 ở hàng bên trái bằng 10 ở hàng bên phải." | qc-2 |
| 3. Trừ có nhớ (ký hiệu) | Không trừ được thì lấy 10 trừ, viết, nhớ 1; hàng bên trái trừ 1 rồi trừ số trừ | `ColumnSub` 648 390 − 382 547, 7 bước, ô nhớ "−1" phía trên chữ số bị bớt | Câu mẫu: "0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1." | qc-3 |
| 4. Số trừ ngắn hơn | Cột không có chữ số số trừ vẫn phải bớt nhớ 1 | `ColumnSub` 52 340 − 3 475, 6 bước. Bước cột chục nghìn nhấn "5 trừ 1 bằng 4" | "Nhớ 1 đi đến hết các cột, kể cả cột chỉ có số bị trừ." | qc-4 |
| 5. Trừ và so sánh | "Nhiều hơn bao nhiêu" thì trừ. Số bị trừ = hiệu + số trừ | Không có | "Số bị trừ = hiệu + số trừ. Số trừ = số bị trừ − hiệu." và "Nhiều hơn bao nhiêu: lấy số lớn trừ số bé." | qc-5, qc-6 |

Bố cục 390px: `ColumnSub` tối đa 6 cột, dùng `DatTinh` sau khi có dấu "−" và khe nhỏ giữa các lớp, ô co theo màn hình. Lời mỗi bước nằm dưới hình trong `StepControls`, không đè lên ô số. `DoiTien` vẽ tối đa 6 tờ mỗi loại, viewBox 340 rộng.

Trò chơi: không dùng. Lý do: bài này luyện kỹ thuật tính, `dat-tinh` đã đủ tương tác.

## Phần Bài tập

Giữ dạng và độ khó SGK, đổi số liệu. Đáp án đã tính lại.

**Nhóm 1 — Hoạt động (trang 80)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| act-1a | `dat-tinh` | 48 615 − 7 392 (1 lần nhớ, số trừ ngắn hơn) | **41 223** |
| act-1b | `dat-tinh` | 758 964 − 326 521 (không nhớ) | **432 443** |
| act-1c | `dat-tinh` | 786 354 − 241 539 (2 lần nhớ) | **544 815** |
| act-2 | `loi-van` | Video A 350 000 lượt xem, video B 90 000 lượt. A nhiều hơn B bao nhiêu lượt? Dòng: 350 000 − 90 000 = ? | **260 000** lượt |
| act-3a | `trac-nghiem` | Bể A chứa 42 380 l, bể B chứa 318 465 l. Bể nào chứa nhiều hơn? | **Bể B** |
| act-3b | `loi-van` | Bể đó nhiều hơn bao nhiêu lít? 318 465 − 42 380 = ? | **276 085** l |

**Nhóm 2 — Luyện tập (trang 81)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| pr-1a | `dien-so` | Số bị trừ 625 417, số trừ 38 205, hiệu ? | **587 212** |
| pr-1b | `dien-so` | Số bị trừ 408 356, số trừ 30 042, hiệu ? | **378 314** |
| pr-1c | `dien-so` | Số bị trừ 512 000, số trừ ?, hiệu 307 000 | **205 000** |
| pr-1d | `dien-so` | Số bị trừ ?, số trừ 134 000, hiệu 568 000 | **702 000** |
| pr-2a | `dat-tinh` (có `hide`) | 734 258 − 215 673: ẩn chữ số chục nghìn của số bị trừ, chữ số trăm của số trừ, chữ số nghìn và đơn vị của hiệu | **3**; **6**; **8**, **5** (hiệu 518 585) |
| pr-2b | `dat-tinh` (có `hide`) | 806 450 − 372 168: ẩn chữ số chục của số bị trừ, chữ số nghìn của số trừ, chữ số trăm nghìn và đơn vị của hiệu | **5**; **2**; **4**, **2** (hiệu 434 282) |
| pr-3 | `loi-van` | Hà mua sách 175 000 đồng và hộp bút 85 000 đồng, đưa 500 000 đồng. Trả lại bao nhiêu? Dòng 1: tổng tiền; dòng 2: tiền trả lại | **260 000**; **240 000** đồng |
| pr-4a | `dien-so` | Nam viết 3 205 618, xoá đúng một chữ số để còn 6 chữ số. Số lớn nhất, số bé nhất? | **325 618** (xoá 0); **205 618** (xoá 3) |
| pr-4b | `dien-so` | Hiệu của hai số trên: 325 618 − 205 618 = ? | **120 000** |

Kiểm tra pr-4a: các số nhận được là 205 618, 305 618, 325 618, 320 618, 320 518, 320 568, 320 561.

pr-2a, pr-2b đã giải theo từng cột: mỗi chữ số ẩn xác định duy nhất. Hiệu có đúng 6 chữ số, không bắt đầu bằng 0.

**Nhóm 3 — Suy nghĩ thêm:** think-1, think-2, think-3 (xem bảng ở mục Tư duy). think-3 ghi nhãn "Vượt SGK" trong brief, không hiện nhãn cho con.

## Kỹ thuật

- **`DatTinhQuestion`** (`components/exercises/types.ts`): thêm `op?: "+" | "-"`, mặc định `"+"`. `prompt` mặc định "Đặt tính rồi tính: a − b" khi `op` là `"-"`. Sửa ghi chú ràng buộc: phép trừ cần `a >= b`, và hiệu có cùng số chữ số với `a` (không có số 0 đứng đầu hiệu) để `hide.sum` không rơi vào ô thừa. Test kiểm điều này cho mọi câu `dat-tinh`.
- **`components/math/dat-tinh.tsx`**: hiện đang gắn cứng dấu "+" ở hàng số thứ hai. Thêm prop `sign?: "+" | "−"` (mặc định "+"). Hàng ô nhớ dùng lại cho "−1".
- **`lib/column-sub.ts`** (+ test): `columnSub(a, b)` trả danh sách cột `{ position, top, bottom, borrowIn, minuendAfter, needsBorrow, write, borrowOut }`; `explainSub(column)` tạo câu đọc đúng cách SGK: "9 trừ 2 bằng 7, viết 7." / "0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1." / "9 trừ 1 bằng 8; 8 trừ 4 bằng 4, viết 4." / "3 trừ 1 bằng 2; 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7 nhớ 1." Test: mọi kết quả khớp `a − b` với tập số mẫu, gồm số trừ ngắn hơn và hàng có chữ số 0. Tái dùng `digitsOf` và `PLACE_NAMES` từ `lib/column-add.ts`.
- **`_animations/column-sub.tsx`**: một component dùng 3 lần (chặng 1, 3, 4) với tham số `a`, `b`. Lời mỗi bước từ `explainSub`, không gõ tay.
- **`_animations/doi-tien.tsx`**: SVG 4 bước, tờ tiền dùng `--sun`/`--ink`, không dùng `--good` hay `--oops`.
- **`AlignCompare` (bài 22)** gắn cứng 5 839 + 712 nên không tái dùng. Chặng 4 dùng `ColumnSub` thay cho nó.
- Không thêm màu đơn vị mới. Không thêm thư viện đơn vị.
- Bài 22 đang có thay đổi chưa commit (`components/math/`, `lib/column-add*`, `dat-tinh-form.tsx`, `feedback.tsx`, sửa `question.tsx`, `types.ts`). Bài 23 dùng lại các file này, nên commit bài 22 trước khi viết code bài 23.
- Đặt `available` của bài 23 thành `true` trong `lib/lessons.ts` khi viết xong.

## Tiêu chí duyệt nội dung

- Thuật ngữ: số bị trừ, số trừ, hiệu, đặt tính rồi tính, "nhớ 1". Câu mẫu đúng như SGK: "không trừ được", "lấy 10 trừ 7", "viết 3 nhớ 1".
- Không dạy "cộng 1 vào số trừ"; không dùng từ "mượn/trả" trong lời đọc (chỉ dùng "đổi" ở chặng đổi tiền). Nếu cần giải thích hình, nói "đổi 1 tờ thành 10 tờ".
- Số có từ 5 chữ số trở lên tách lớp bằng NBSP (như 438 589). Số 4 chữ số viết liền hoặc theo `formatNumber`, thống nhất với bài 22.
- Không dạy ước lượng, làm tròn hay cách tính khác.
- Số liệu "lượt xem", "lít", "đồng" là số tự đặt, không phải dữ kiện thật.

## Câu hỏi cần chốt

1. **Có đưa think-3 (800 000 − 345 678, vượt SGK) vào không?** Đề xuất: có, 1 câu ở nhóm "Suy nghĩ thêm", không animation. Lý do: nhớ dây chuyền qua chữ số 0 là lỗi phổ biến nhất ngoài sách; SGK bài này chưa có.
2. **Dấu hiệu nhớ trong cột: hiện "−1" phía trên chữ số bị bớt, hay hiện "1"?** Đề xuất: "−1". Lý do: SGK nói "nhớ 1" rồi "trừ 1", con thấy ngay phải làm gì ở cột kế. Lời đọc vẫn nói "nhớ 1".
3. **Chặng 2 dùng đổi tiền (600 000 − 250 000) có ổn không?** Đề xuất: giữ. Lý do: gắn với Luyện tập 3 (tiền vé), cụ thể trước ký hiệu; nếu thấy thừa so với SGK thì bỏ chặng 2 và chỉ giữ ví dụ 648 390 − 382 547.
4. **Luyện tập 4 (xoá chữ số): đặt trong Luyện tập như SGK hay chuyển sang "Suy nghĩ thêm"?** Đề xuất: giữ trong Luyện tập, đúng SGK, nhưng xếp cuối nhóm vì khó nhất. Lý do: là bài SGK giao, đáp án đã kiểm tra bằng liệt kê 7 số.

## Phụ lục: đáp án SGK

Tính lại, không lấy từ trí nhớ.

**Trang 79–80 (Khám phá)**
- a) 438 589 − 235 072 = 203 517
- b) 648 390 − 382 547 = 265 843

**Trang 80 (Hoạt động)**
- 1: 36 724 − 3 291 = 33 433; 637 891 − 412 520 = 225 371; 895 332 − 282 429 = 612 903
- 2: 180 000 − 60 000 = 120 000. Muỗi đập cánh nhiều hơn ong 120 000 lần
- 3: 240 373 − 25 350 = 215 023. Máy bay xanh chứa nhiều hơn 215 023 l

**Trang 81 (Luyện tập)**
- 1: 538 239 − 27 018 = 511 221; 347 287 − 20 026 = 327 261; 432 000 − 201 000 = 231 000 (số trừ 201 000); 679 000 − 227 000 = 452 000 (số bị trừ 679 000)
- 2: bên trái 642 914 − 123 706 = 519 208, các chữ số cần tìm theo thứ tự trong hình: 4, 0, 9, 8. Bên phải 507 518 − 327 430 = 180 088, các chữ số: 8, 3, 4, 0 (theo thứ tự: chữ số cuối số bị trừ, chữ số đầu số trừ, chữ số trăm số trừ, chữ số nghìn của hiệu)
- 3: 320 000 + 50 000 = 370 000; 500 000 − 370 000 = 130 000. Trả lại 130 000 đồng
- 4: a) 2 130 574 → số lớn nhất 230 574, số bé nhất 130 574; b) 230 574 − 130 574 = 100 000

Phần đối chiếu cần người dùng xem lại trên sách: thứ tự các ô "?" của Luyện tập 2 (chụp ảnh nghiêng, các chữ số tìm được đã được thử bằng phép cộng nên đúng, nhưng thứ tự trình bày cần khớp hình).
