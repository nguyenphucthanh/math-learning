# Brief — Bài 11. Hàng và lớp

- SGK: Toán 4 KNTT tập một, trang 37-40, chủ đề 3 "Số có nhiều chữ số"
- Route: `/kntt-4/bai-11`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, không dừng chờ duyệt)

## Đánh giá

- **Vị trí:** sau Bài 10 (số có sáu chữ số, số 1 000 000), trước Bài 12 (các số trong phạm vi lớp triệu). Bài 33 (ôn các số đến lớp triệu) ôn lại bài này.
- **Cấu trúc SGK:** Khám phá 1 (lớp đơn vị, lớp nghìn) → Hoạt động (3 bài) → Khám phá 2 (lớp triệu, 10 000 000 và 100 000 000) → Hoạt động (3 bài) → Luyện tập (5 bài).
- **Mục tiêu:**
  1. Nói đúng: ba hàng liền nhau hợp thành một lớp; có lớp đơn vị, lớp nghìn, lớp triệu.
  2. Cho một chữ số trong số có đến 9 chữ số, nói được hàng nào, lớp nào.
  3. Tìm giá trị theo vị trí của một chữ số (2 ở hàng nghìn là 2 000).
  4. Ghép số từ các chữ số của từng hàng, từng lớp.
  5. Đọc, viết 10 000 000 và 100 000 000 và các số tròn triệu.
- **Kiến thức cần có:** hàng đến trăm nghìn, số có sáu chữ số (Bài 10).
- **Điểm mấu chốt:** SGK không giải thích vì sao có lớp; chỉ nêu "hợp thành". Hàng và lớp rất dễ lẫn nhau. Phần giá trị của chữ số xuất hiện ở bài tập (HĐ3) mà phần Khám phá chưa nói rõ, nên bài thêm một mục ngắn "Chữ số ở hàng nào, giá trị bao nhiêu". Bẫy: số có chữ số 0 ở giữa (6 030, 800 000), Luyện tập 2 và 5 gài điều kiện.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhầm hàng với lớp | "Chữ số 4 ở lớp nghìn" khi hỏi hàng nào (đúng: hàng nghìn, lớp nghìn) | `HangVaLop` tô cả lớp; câu trắc nghiệm luôn hỏi "hàng nào, lớp nào" |
| Giá trị chỉ là chữ số | Giá trị chữ số 8 trong 481 536 là 8 (đúng: 80 000) | `ChonChuSo` hiện giá trị; nhóm "Giá trị của chữ số" |
| Đọc sai số tròn triệu | 17 000 000 đọc "một trăm bảy mươi triệu" | Câu đọc số có lựa chọn gây nhiễu; `LopTrieu` đếm chữ số 0 |
| Viết sai vị trí số 0 | 6 triệu 200 nghìn viết 6 020 000 (đúng: 6 200 000) | Câu tìm lỗi sn-4; ghép lớp ở nhóm "Hàng và lớp" |
| Bỏ số 0 khi ghép lớp | 308 và 050 viết 30 850 | Câu hl-4, mỗi lớp đủ ba chữ số |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng | Đếm thêm 1 triệu và 10 triệu (lt-dem-1, lt-dem-2); đếm số 0 của 100 000 000 |
| Tách | Dùng | Tách số thành lớp, tách thành chữ số theo hàng (hl-1, giá trị chữ số) |
| So sánh | Không dùng | Bài chưa có quan hệ hơn/kém; so sánh số để Bài 14 |
| Kiểm tra đầu vào | Dùng | Khởi động 5 câu về hàng, 10 trăm = 1 nghìn, đọc và viết số |
| Bốn kênh | Dùng | Nói (đọc số), hình (bảng hàng và lớp), nhẩm (đếm thêm), viết (ghép số); đủ cả bốn |
| Câu tư duy | Dùng | sn-1 (vì sao), sn-4 (tìm lỗi sai) |

**Khởi động:** kd-hang, kd-nghin, kd-chuc-nghin, kd-doc, kd-viet.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-hang | trac-nghiem | 45 302: chữ số 3 ở hàng nào | Hàng trăm |
| kd-nghin | dien-so | 10 trăm = ? nghìn | 1 |
| kd-chuc-nghin | dien-so | 10 nghìn = ? chục nghìn | 1 |
| kd-doc | trac-nghiem | Đọc 72 058 | bảy mươi hai nghìn không trăm năm mươi tám |
| kd-viet | dien-so | Ba trăm hai mươi nghìn | 320 000 |

**Câu thử trong Lý thuyết:** thu-lop (chữ số 4 trong 514 293: lớp nghìn), thu-hang + thu-gia-tri (639 051, chữ số 9: hàng nghìn, 9 000), thu-tram-trieu (100 000 000), thu-lop-trieu (chữ số 3 trong 531 000 000: lớp triệu).

**Suy nghĩ thêm (vượt SGK, để hiểu sâu hơn):** sn-1 hai chữ số 5 khác giá trị (sai, khác hàng); sn-2 100 000 000 có 8 chữ số 0; sn-3 1 triệu = 10 trăm nghìn = 1 000 nghìn; sn-4 tìm lỗi 6 020 000 (đúng 6 200 000).

## Phần Phụ huynh

Theo mẫu 6 mục. Riêng bài này: nhắc nói đúng "hợp thành lớp"; mẹo chia ba chữ số từ phải sang; lỗi nhầm hàng với lớp và giá trị; hoạt động ôn với tiền thật và dân số; dấu hiệu là con tự giải thích được vì sao khác hàng thì khác giá trị.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| Hàng và lớp | Ba hàng hợp thành một lớp | `HangVaLop`, 4 bước trên số 514 293 (tô lớp đơn vị, lớp nghìn, đọc) | 3 hàng = 1 lớp | thu-lop |
| Hàng nào, giá trị bao nhiêu | Cùng chữ số, khác hàng, khác giá trị | `ChonChuSo` (chạm chữ số, không có bước) | 2 ở hàng nghìn = 2 000 | thu-hang, thu-gia-tri |
| Lớp triệu | Thêm một hàng thì thêm một chữ số 0 | `LopTrieu`, 4 bước: 1 triệu, 10 triệu, 100 triệu, 531 000 000 | 1 triệu → 10 triệu → 100 triệu | thu-tram-trieu, thu-lop-trieu |

Bố cục 390px: bảng hàng và lớp dùng `viewBox` co theo màn hình (hai lớp rộng 292, ba lớp rộng 438); chữ số trong bảng cỡ 26 trong viewBox.

## Phần Bài tập

Dạng và độ khó giữ như SGK, đổi số liệu. Đáp án tính lại trong `bai-tap.test.ts`.

- **Hàng và lớp** (HĐ1, p37): hl-1 (`dien-so`) **6, 2, 8, 4, 0, 7**; hl-2 **405 700**; hl-3 **7, 0, 4, 0**; hl-4 **308 050**.
- **Chữ số này ở hàng nào, lớp nào** (HĐ2, p38): dv-1..4 (`trac-nghiem`) 245 361→hàng trăm; 130 872→chục nghìn; 703 458→nghìn; 580 276→chục nghìn; dv-doc **bốn trăm linh bảy nghìn hai trăm mười lăm**.
- **Giá trị của chữ số** (HĐ3, p38): gt-1..4 `dien-so` **80 000; 900 000; 60; 7**.
- **Lớp triệu** (p39): lt-doc **mười hai triệu**; lt-viet-1..3 **20 000 000; 700 000 000; 860 000 000**; lt-dem-1 **4 000 000, 6 000 000**; lt-dem-2 **790 000 000, 810 000 000**; lt-vt-1 (chữ số 5 trong 250 000 000: hàng chục triệu); lt-vt-2 (chữ số 3 trong 316 000 000: hàng trăm triệu).
- **Luyện tập** (p39-40): l1-a,b,c (chữ số 8: nghìn; chục nghìn; trăm); l-dieu-kien **630 241**; l-gio-1..3 **325 000; 604 000; 123 000**; l-can **7 000 000; 80 000 000; 400 000 000**; l-chan **400 116**.
- **Suy nghĩ thêm:** sn-1..4 như trên.

## Kỹ thuật

- `lib/hang-lop.ts` (`hangName`, `lopName`, `positionValue`, `digitAt`, `positionOfIndex`) có test riêng.
- `BangHangLop` thêm prop `classes` (2 hoặc 3, mặc định 3) để chỉ vẽ hai lớp khi số có sáu chữ số; bài 33 không đổi.
- Đặt `available: true` cho Bài 11 trong `lib/lessons.ts`. Bài 10 và 12 chưa có nên điều hướng trước/sau bỏ qua chúng.
- Không dùng hình giỏ quà, cầu thang của SGK; bài tập dùng chữ và số.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "hợp thành lớp", "hàng đơn vị, hàng chục, hàng trăm, hàng nghìn...".
- Tách lớp bằng khoảng trắng không xuống dòng (NBSP).
- Không dạy: dùng dấu chấm tách lớp, đọc số lớp tỉ, so sánh số (Bài 14).

## Câu hỏi cần chốt

1. **Mục "Chữ số ở hàng nào, giá trị bao nhiêu" có nên nằm trong bài?** Đề xuất: có, vì HĐ3 hỏi giá trị theo vị trí mà Khám phá chưa nói.
2. **Dùng `linh` hay `không trăm` khi đọc?** Đề xuất: `linh` theo `docSo` đã dùng ở các bài trước.
3. **Hình giỏ quà (LT4) có cần vẽ SVG không?** Đề xuất: không, dùng chữ để tránh đếm sai hình.

## Phụ lục: đáp án SGK

Có đủ trong `phu-huynh.mdx` (khối Xem đáp án). Giỏ B và C của Luyện tập 4 chưa đếm được rõ từ ảnh nên ghi "chưa đối chiếu".

- p37 HĐ1: 377 931 → 3, 7, 7, 9, 3, 1; số 92 340; 6 030 → 0, 0, 6, 0, 3, 0; số 454 004.
- p38: chữ số 3 ở 172 938 hàng chục; 827 389 hàng trăm; 163 222 hàng nghìn; 390 227 hàng trăm nghìn; 862 003 hàng đơn vị. Giá trị: 10 000; 700 000; 7.
- p39: sáu triệu; mười bảy triệu; bốn trăm năm mươi triệu. Cầu thang: 3 000 000, 4 000 000, 6 000 000; 880 000 000, 890 000 000, 920 000 000. Chữ số 2: hàng triệu; trăm triệu; chục triệu. LT1: chữ số 8 ở hàng chục; nghìn; trăm nghìn; đơn vị. LT2: D.
- p40: LT3 9 000 000; 200 000 000; 900 000 000. LT4 giỏ A 32 000 đồng. LT5 300 118.
