# Brief — Bài 38. Nhân với số có một chữ số

- SGK: Toán 4 KNTT, **tập hai**, trang 4-5, Chủ đề 8 "Phép nhân và phép chia" (bài đầu tập hai).
- Route: `/kntt-4/bai-38` (số bài nối tiếp tập một nên không trùng slug; xem câu hỏi 1)
- Trạng thái: đã viết nội dung (duyệt cả 4 câu hỏi theo đề xuất)

## Đánh giá

**Vị trí bài.** Bài đầu tập hai và đầu Chủ đề 8. Bài trước trong app là Bài 37 (Ôn tập chung, cuối tập một). Bài sau của chủ đề chưa có trong registry và chưa có tư liệu, chưa đối chiếu. Bài ôn lại nó: Bài 2 (nhân với số có một chữ số trong phạm vi 100 000, đã có `NhanDatTinh`), Bài 10-12 (số có sáu chữ số, lớp nghìn), Bài 22 (cột tính với số nhiều chữ số). Điểm mới của bài: **thừa số thứ nhất lên tới sáu chữ số, tích vượt 1 000 000**.

**Cấu trúc SGK.** Khám phá (1 ví dụ: 160 140 × 7) → Hoạt động (3 bài) → Luyện tập (4 bài).
- Tr.4: Khám phá bằng bài toán nhà máy khẩu trang (7 ngày, mỗi ngày 160 140 chiếc), robot đọc từng bước đặt tính. Hoạt động 1: đặt tính rồi tính 3 phép.
- Tr.5: Hoạt động 2: Đ/S 3 phép tính đã có kết quả. Hoạt động 3: toán lời văn "gấp 3 lần". Luyện tập 1: đặt tính 3 phép. 2: chọn đáp án, toán lời văn hai bước (nhân rồi trừ). 3: biểu thức 2 câu. 4: bài toán quy luật gấp đôi (bàn cờ hạt thóc).

**Mục tiêu**
1. Đặt tính và tính nhân số có đến sáu chữ số với số có một chữ số, có nhớ.
2. Xử lý đúng chữ số 0 (cuối số, giữa số) khi có số nhớ.
3. Viết và đọc đúng tích tới lớp triệu (1 120 980).
4. Giải toán lời văn "gấp lên một số lần" và toán hai bước (nhân rồi trừ).
5. Tính giá trị biểu thức có nhân với cộng/trừ (nhân trước), với số lớp nghìn.
6. Từ quy luật "gấp đôi" suy ra số ở ô cách xa hai bước (ô 18 → ô 20).

**Kiến thức cần có.** Bảng nhân 2-9; nhân có nhớ trong phạm vi 100 000 (Bài 2); đọc, viết số có sáu chữ số (Bài 10-12); thứ tự thực hiện phép tính (Bài 2, Bài 4).

**Điểm mấu chốt**
- SGK chỉ có một ví dụ giải thích, và ví dụ đó **không có chữ số 0 nào đứng cùng số nhớ**. Chỗ khó thật nằm ở Hoạt động 1: 40 819 × 5 có 0 ở giữa kèm số nhớ 4, và cột cuối ra 20 (hai chữ số).
- Cột cuối: SGK viết cả hai chữ số của tích riêng ("7 nhân 1 bằng 7, thêm 4 bằng 11, viết 11"), không nói "nhớ 1 rồi hạ xuống". Lý thuyết phải đọc theo đúng kiểu này.
- Hoạt động 2 có bẫy: 41 800 × 5 = 209 000 là **đúng** dù có nhiều chữ số 0; 31 090 × 2 và 250 000 × 3 trông gần đúng nhưng sai (đảo hai chữ số; bỏ số nhớ).
- Luyện tập 3: nhân trước, cộng hoặc trừ sau. Dễ lẫn với (a + b) × 3 vì Bài 34 vừa ôn cộng trừ.
- Luyện tập 4: ô thứ n có 2^(n−1) hạt. Ô 18 → ô 20 là **hai lần gấp đôi**, tức gấp 4 lần. Con hay gấp đôi một lần hoặc ba lần.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Quên số nhớ | 50 806 × 4 viết 203 204 (đúng 203 224) | Animation `NhanDatTinh`: số nhớ hiện thành chấm vàng phía trên cột kế; câu `sn-1` |
| Bỏ số nhớ khi nhân chữ số 0 | 70 305 × 6: ở hàng chục viết 0 (đúng 3, vì 0 × 6 = 0 thêm 3) | Ví dụ 30 708 × 4 trong Lý thuyết có hai chữ số 0 kèm số nhớ; lời đọc "0 nhân 4 bằng 0, thêm 3 bằng 3"; câu `sn-3` |
| Chữ số ở cột cuối: viết thiếu một chữ số | 40 819 × 5 viết 4 095 hoặc 24 095 (đúng 204 095) | Lời đọc cột cuối "4 nhân 5 bằng 20, thêm 4 bằng 24, viết 24" như SGK; con đếm số chữ số của tích |
| Đảo chữ số | 21 070 × 4 = 48 280 (đúng 84 280) | Câu Đ/S `hd-2a`; ước lượng 21 000 × 4 ≈ 84 000 |
| Cho là sai vì nhiều chữ số 0 | 36 400 × 5 = 182 000, con bảo sai | Câu Đ/S `hd-2b` (đúng); tách 364 trăm × 5 = 1 820 trăm |
| Nhầm "gấp 3 lần" với "hơn 3 đơn vị" | 18 250 gấp 3 lần: viết 18 253 | `SoDoLan` (đã có ở Bài 2): 1 phần so với 3 phần; `KeyFact` "gấp lên n lần: nhân với n" |
| Cộng trước nhân sau | 350 126 + 41 305 × 2 = 782 862 (đúng 432 736) | Câu `lt-3`; nhắc lại `KeyFact` "nhân, chia trước; cộng, trừ sau" |
| Quên một bước gấp đôi | Ô 17 từ ô 15: 16 384 × 2 (đúng × 4) | Câu `lt-4`; vẽ dãy ô 15 → 16 → 17, mỗi mũi tên "gấp đôi" |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng (3 câu khởi động) | Bài dựa vào bảng nhân, nhân có nhớ (Bài 2), đọc số sáu chữ số (Bài 10-12) |
| Tách | Dùng | Kiểm tra lại kết quả: 160 140 × 7 = 160 000 × 7 + 140 × 7; bắt lỗi quên số nhớ, đảo chữ số |
| So sánh | Dùng nhẹ | Phân biệt "gấp lên n lần" với "hơn n đơn vị" (HĐ3, bảng lỗi) |
| Bốn kênh | Dùng | Nói (đọc lời SGK "7 nhân 4 bằng 28, viết 8 nhớ 2"), hình (`NhanDatTinh`), nhẩm (tách theo hàng, ước lượng), viết (đặt tính ra vở ô li). Kênh viết không tự chấm được, xem câu hỏi 3 |
| Câu tư duy | Dùng (nhóm "Suy nghĩ thêm") | Tìm lỗi sai, ước lượng, "vì sao" cho chữ số 0 |
| Đếm | Không dùng | Bài không có quy luật theo bước ngoài `lt-4`, và `lt-4` là bài SGK có sẵn |

**Khởi động (kiểm tra đầu vào, không lưu tiến độ)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| wu-1 | dien-so | 7 × 6 = ? rồi "viết ... nhớ ..." (hai ô: số viết, số nhớ) | **2 nhớ 4** (dùng hai ô trống: 2 và 4) |
| wu-2 | dien-so | 4 108 × 6 = ? (có 0 kèm số nhớ) | **24 648** |
| wu-3 | trac-nghiem | Số 160 140 đọc là gì? | **một trăm sáu mươi nghìn một trăm bốn mươi** |

**Câu thử trong Lý thuyết (`QuickCheck`)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| qc-1 | dien-so | Mỗi ngày làm 25 140 sản phẩm. Hỏi 5 ngày? (chặng 1) | **125 700** |
| qc-2 | dien-so | 20 906 × 5 (chặng 3, khác ví dụ animation 30 708 × 4; có 0 kèm số nhớ) | **104 530** |

**Suy nghĩ thêm** (liệt kê trong mục Bài tập, nhóm cuối).

**Vượt SGK** (ghi riêng): `sn-2` ước lượng bằng làm tròn (SGK bài này chưa dạy ước lượng tích; dựa vào Bài 13, làm tròn đến hàng trăm nghìn, và cách tách theo hàng). Lý do: bắt lỗi đảo chữ số, mất số nhớ lớn, là lỗi chính của bài.

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài:
- Lỗi: quên số nhớ, bỏ số nhớ ở chữ số 0, thiếu chữ số cuối, nhầm thứ tự phép tính ở biểu thức.
- Hoạt động ôn 10 phút: đi xem phim, vé 45 000 đồng, nhà 4 người (45 000 × 4 = 180 000 đồng); con tách 45 nghìn × 4 trước rồi mới đặt tính để đối chiếu. Hoặc bố mẹ đọc một số sáu chữ số, con viết lại rồi nhân với 2 hoặc 3.
- Dấu hiệu nắm bài: con tự đoán được tích gần bao nhiêu trước khi đặt tính, và giải thích được vì sao 0 × 6 vẫn viết số khác 0 khi có số nhớ.
- Đáp án trang 4-5 để trong `Fold`.

## Phần Lý thuyết

Cụ thể → hình → ký hiệu. Lời đọc theo đúng SGK.

| Chặng | Một ý | Animation | `KeyFact` | `QuickCheck` |
|---|---|---|---|---|
| 1. Vì sao nhân? | 7 ngày, mỗi ngày 160 140 chiếc: 7 lần của 160 140 là phép nhân | `SoDoLan` (đã có ở Bài 2, 2 bước: 1 ngày, rồi 7 ngày xếp thành 7 ô); nếu chưa chuyển lên `components/` thì chuyển theo quy tắc 2 bài | "7 ngày, mỗi ngày 160 140: 160 140 × 7" | qc-1 |
| 2. Đặt tính từng cột | Nhân 7 lần lượt với từng chữ số, từ phải sang trái, nhớ sang cột kế | `NhanDatTinh` a=160 140, b=7 (6 chữ số: 7 bước, số nhớ hiện dần, lời đọc như SGK) | "Nhân từng chữ số, nhớ sang trái. Cột cuối viết cả số" | |
| 3. Chữ số 0 và số nhớ | 0 × 7 = 0 nhưng thêm số nhớ thì khác 0; kiểm tra lại bằng cách tách | `NhanDatTinh` a=30 708, b=4 (hai chữ số 0 kèm nhớ; 5 bước). Sau đó một khung tĩnh (không animation): 160 140 × 7 = 160 000 × 7 + 140 × 7 = 1 120 000 + 980 = 1 120 980 | "Chữ số 0 vẫn phải cộng số nhớ" | qc-2 |

Bố cục 390px: tích 160 140 × 7 có 7 chữ số, cần 8 ô kể cả dấu ×. Xem mục Kỹ thuật.

## Phần Bài tập

Giữ dạng và độ khó SGK, đổi số liệu. Đáp án in đậm, đã tính lại bằng phép tính. Phép đặt tính nhân/chia trong SGK không có dạng `dat-tinh` hỗ trợ ×, nên con đặt tính ra vở rồi điền kết quả bằng `dien-so` (như Bài 2).

**Hoạt động (tr.4-5)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| hd-1a | dien-so | 18 296 × 3 | **54 888** |
| hd-1b | dien-so | 50 407 × 6 | **302 442** |
| hd-1c | dien-so | 213 645 × 2 | **427 290** |
| hd-2a | trac-nghiem (Đúng/Sai) | 21 070 × 4 = 48 280 | **Sai** (đúng 84 280) |
| hd-2b | trac-nghiem (Đúng/Sai) | 36 400 × 5 = 182 000 | **Đúng** |
| hd-2c | trac-nghiem (Đúng/Sai) | 150 000 × 4 = 500 000 | **Sai** (đúng 600 000) |
| hd-3 | loi-van | Quạt trong nhà có tuổi thọ 18 250 giờ. Quạt công nghiệp có tuổi thọ gấp 3 lần. Hỏi bao nhiêu giờ? | 18 250 × 3 = **54 750** giờ |

**Luyện tập (tr.5)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| lt-1a | dien-so | 36 208 × 5 | **181 040** |
| lt-1b | dien-so | 47 315 × 4 | **189 260** |
| lt-1c | dien-so | 182 436 × 3 | **547 308** |
| lt-2 | trac-nghiem | Nam có 150 000 đồng, mua 3 quyển truyện, mỗi quyển 45 000 đồng. Còn lại bao nhiêu? A. 15 000 B. 105 000 C. 135 000 | **A. 15 000 đồng** (3 × 45 000 = 135 000; 150 000 − 135 000). B là trừ một quyển, C là quên trừ |
| lt-3a | dien-so | 350 126 + 41 305 × 2 | **432 736** |
| lt-3b | dien-so | 705 400 − 32 150 × 5 | **544 650** |
| lt-4 | dien-so | Ô thứ 15 đặt 16 384 hạt, mỗi ô sau gấp đôi ô trước. Ô thứ 17 đặt bao nhiêu hạt? | **65 536** (hai lần gấp đôi: 16 384 × 4) |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | Mai tính 50 806 × 4 = 203 204. Mai sai ở đâu? | **Quên cộng số nhớ 2 ở hàng chục; đúng là 203 224** |
| sn-2 (Vượt SGK) | trac-nghiem | Không đặt tính, 30 906 × 7 gần số nào nhất? A. 21 000 B. 210 000 C. 2 100 000 | **B** (30 000 × 7; tích đúng 216 342) |
| sn-3 | trac-nghiem | Khi nhân 70 305 × 6, ở hàng nghìn (chữ số 0) con viết gì? A. 0 B. 1 C. 6 | **B. 1** (0 × 6 = 0, thêm số nhớ 1; tích 421 830) |

## Kỹ thuật

- **Registry (`lib/lessons.ts`)**: thêm chủ đề 8 "Phép nhân và phép chia" chỉ có Bài 38 (`lesson(38, "Nhân với số có một chữ số", 4)`, trang tính theo tập hai), đặt `available` thành `true` khi xong. Các bài sau của chủ đề thêm khi có tư liệu. Cách gắn vào mục lục và `courses`: câu hỏi 1.
- **Chuyển `NhanDatTinh` lên `components/math/`** (cùng `nhanCaptions`): Bài 2 và Bài 38 cùng dùng. Cập nhật import ở `bai-2/ly-thuyet.mdx` và `bai-2/lesson-ui.test.tsx`.
- **Bề rộng** (đã làm: `viewWidth(columns)` trong `column-layout.ts` mở viewBox khi từ 7 cột): `column-layout.ts` có `VIEW_WIDTH = 340`, `CELL = 44`. 160 140 × 7 cần 7 cột kết quả cộng cột dấu, tức 8 ô = 352 + khe giữa các lớp, vượt 340. Cần cho `NhanDatTinh` nhận bề rộng lớn hơn (≈ 380) hoặc ô nhỏ hơn (40), và kiểm tra ở 390px. Bài 22, 23 vẫn dùng viewBox 340 cố định, không đổi.
- **Lời đọc cột cuối**: `readMulColumn` hiện đọc "viết 1 nhớ 1" rồi cột riêng "Hạ số nhớ 1, viết 1". SGK đọc "thêm 4 bằng 11, viết 11". Đổi lời đọc cho khớp SGK, hình vẫn hai ô. Ảnh hưởng `column-mul.test.ts` và caption của Bài 2: xem câu hỏi 2.
- Bài tập mới dùng `dien-so`, `trac-nghiem`, `loi-van`; không thêm dạng mới. `bai-tap.test.ts` tính lại mọi đáp án bằng phép nhân, kể cả `lt-3`, `lt-4`, và với `trac-nghiem` Đúng/Sai tính lại tích rồi so với kết quả đưa ra.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "nhân với số có một chữ số", "đặt tính rồi tính", "viết 8 nhớ 2", "thêm 2 bằng 9", "gấp 3 lần", "tuổi thọ". Chưa dùng "thừa số", "tích" nếu SGK trang 4-5 không dùng; nếu cần gọi tên kết quả, dùng "kết quả".
- Số viết tách lớp bằng NBSP: 160 140, 1 120 980, 131 072. Số bốn chữ số cũng tách (18 250 có năm chữ số; 4 108 viết 4 108).
- Không dạy: nhân với số có hai chữ số, nhân nhẩm với 10, 100, 1 000, tính chất giao hoán và kết hợp của phép nhân, chia (bài sau). Không dạy công thức 2^n; chỉ gấp đôi từng bước.
- Cách tách "160 140 = 160 000 + 140" và ước lượng ở `sn-2` chỉ để tự kiểm tra, không thay cách đặt tính của SGK.
- Dữ kiện ngoài toán: bàn cờ hạt thóc chỉ dùng ý tưởng từ SGK, không thêm số liệu lịch sử.

## Câu hỏi cần chốt

1. **Tập hai gắn vào app thế nào?** Đề xuất: giữ `app/kntt-4/bai-38/` (số bài nối tiếp nên không trùng slug), thêm `kntt4Tap2Topics` riêng trong `lib/lessons.ts`, `lessonNeighbors` nối hai mảng để điều hướng Bài 37 → 38. Trang `/kntt-4` hiện hai mục "Tập một" và "Tập hai". Lý do: layout, breadcrumb, tiến độ chung; không phải sửa bài cũ. Cách khác: route riêng `app/kntt-4-tap-2/`, tốn thêm layout và registry. Còn lại việc `courses` ở trang chủ: đề xuất đổi mục hiện có thành "Toán 4" gồm hai tập, hay thêm thẻ thứ hai "Toán 4, tập hai" cùng link `/kntt-4#tap-2`.
2. **Sửa lời đọc cột cuối cho khớp SGK ("viết 11")?** Đề xuất: sửa, áp dụng luôn cho Bài 2 (thuật ngữ phải khớp SGK). Cái giá: sửa `readMulColumn`, test và caption Bài 2.
3. **Đặt tính nhân có cần ô nhập từng chữ số (như `dat-tinh` cộng, trừ) không?** Đề xuất: chưa. Con đặt tính ra vở ô li, app chỉ chấm kết quả bằng `dien-so`, đúng như Bài 2; mở rộng `DatTinhForm` cho ×, ÷ để dành khi nhân với số hai chữ số hoặc chia (bài sau) cần thật.
4. **Có giữ `sn-2` (ước lượng, vượt SGK)?** Đề xuất: giữ, vì là cách bắt lỗi đảo chữ số và bỏ số nhớ, và chỉ nằm ở nhóm "Suy nghĩ thêm".

## Phụ lục: đáp án SGK

Đã tính lại bằng phép nhân.

- **Tr.4, Khám phá**: 160 140 × 7 = 1 120 980 (chiếc khẩu trang trong 7 ngày).
- **Tr.4, Hoạt động 1**: a) 27 283 × 3 = 81 849; b) 40 819 × 5 = 204 095; c) 374 519 × 2 = 749 038.
- **Tr.5, Hoạt động 2**: 31 090 × 2 = 62 180 (ghi 26 180: **S**); 250 000 × 3 = 750 000 (ghi 650 000: **S**); 41 800 × 5 = 209 000 (**Đ**).
- **Tr.5, Hoạt động 3**: 12 250 × 3 = 36 750 giờ.
- **Tr.5, Luyện tập 1**: 48 102 × 5 = 240 510; 32 419 × 4 = 129 676; 172 923 × 3 = 518 769.
- **Tr.5, Luyện tập 2**: 2 × 80 000 = 160 000; 200 000 − 160 000 = 40 000. Đáp án **B. 40 000 đồng**.
- **Tr.5, Luyện tập 3**: a) 460 839 + 29 210 × 3 = 460 839 + 87 630 = 548 469; b) 648 501 − 20 810 × 4 = 648 501 − 83 240 = 565 261.
- **Tr.5, Luyện tập 4**: ô thứ 18 có 131 072 hạt. Ô 19: 131 072 × 2 = 262 144; ô 20: 262 144 × 2 = 524 288. Cách khác: 131 072 × 4 = 524 288. Đáp số **524 288 hạt thóc**. (Kiểm tra: 131 072 = 2^17, đúng với ô thứ 18 bắt đầu từ 1 ở ô thứ nhất.)
