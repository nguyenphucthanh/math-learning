# Brief — Bài 70. Ôn tập phép tính với phân số

- SGK: Toán 4 KNTT tập hai, trang 110-111, chủ đề 13 (Ôn tập cuối năm).
- Route: `/kntt-4/bai-70`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 69 (Ôn tập phân số), trước Bài 71. Bài ôn nó: các bài ôn tiếp theo trong chủ đề 13.
- Bài nguồn (= kiến thức cần có): Bài 56 (rút gọn), 57 (quy đồng), 60 (cộng), 61 (trừ), 62 (luyện tập chung), 63 (nhân), 64 (chia), 65 (tìm phân số của một số), 66 (luyện tập chung).
- Cấu trúc SGK: tr.110 Luyện tập 1-5 (cộng, trừ; biểu thức; lời văn; thuận tiện; Đố em) → tr.111 Luyện tập 1-5 (nhân, chia; rút gọn rồi tính biểu thức; lời văn; chu vi tấm bìa; thuận tiện).
- Điểm mấu chốt: số tự nhiên lẫn với phân số (3 + 5/8, 53/21 − 1, 36/5 : 9, 8/21 × 3) nên viết thành phân số; kết quả lớn hơn 1 giữ dạng phân số (SGK chưa dạy hỗn số). Biểu thức có ngoặc lồng (9/8 − (11/8 − 19/32)) và thứ tự nhân chia trước. Bài chu vi tấm bìa cần hai bước: dài = diện tích : rộng, rồi chu vi. Bài thuận tiện cần nhận ra cặp đảo ngược hoặc thừa số chung. SGK tr.110 LT2c đọc từ ảnh: 9/8 − (11/8 − 19/32) = 11/32 (không âm ở mọi bước).
- Số liệu trong app đổi so với SGK, không có chỗ nào gắn với hình cố định. Hình tấm bìa do app vẽ (`_illustrations/hinh.tsx`, `TamBia`) với số liệu đã đổi.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Cộng cả tử và mẫu | 2/5 + 3/7 = 5/12 (đúng 29/35) | `sn-1`, `ct-1`, `ct-3` |
| Quy đồng rồi mới nhân | 2/3 × 3/4 = 8/12 × 9/12 (đúng 1/2) | `sn-2`, `nc-1` |
| Đảo ngược nhầm phân số thứ nhất | 2/3 : 4/5 = 3/2 × 4/5 (đúng 5/6) | `sn-3`, `nc-3` |
| Quên rút gọn kết quả | 6/8 × 4/9 = 24/72 (đúng 1/3) | `sn-4`, mọi câu nhập (test bắt buộc tối giản) |
| Làm sai thứ tự phép tính | 1/2 + 3/4 × 2/3 làm cộng trước | `bt-d`, `thu-thu-tu` |
| Quên lấy cả (1 hoặc cả số tiền) trừ phần đã dùng | còn lại = chỉ cộng hai phần | `dat`, `tien` |
| Nhầm chu vi với nửa chu vi, hoặc lấy diện tích × rộng | dài = 9/20 × 3/5 (đúng 9/20 : 3/5) | `bia` (ba dòng nhập từng bước) |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Tám câu `quickChecks` thay khởi động |
| Câu tư duy (tìm lỗi) | Dùng | `sn-1` đến `sn-4`, vượt SGK |
| So sánh | Dùng một phần | `sn-1`: kết quả sai bé hơn một số hạng; `sn-2`: tích hai phân số bé hơn 1 không thể lớn hơn 1 |
| Bốn kênh | Dùng một phần | Hình (tấm bìa), viết (số ?), nói trong Phụ huynh |
| Đếm, Tách | Không dùng | Bài ôn phép tính, không có quy luật bước hay số lớn |

Suy nghĩ thêm (nhóm cuối, vượt SGK: SGK không có câu tìm lỗi sai):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | 2/5 + 3/7 = 5/12, sai ở đâu | **Khác mẫu số phải quy đồng, không cộng mẫu số** |
| sn-2 | trac-nghiem | Quy đồng rồi nhân 2/3 × 3/4 | **Nhân không cần quy đồng** |
| sn-3 | trac-nghiem | 2/3 : 4/5 đảo ngược số bị chia | **Đảo ngược số chia** |
| sn-4 | trac-nghiem | 6/8 × 4/9 = 24/72 dừng lại | **Phải rút gọn thành 1/3** |

## Phần Phụ huynh

Mục "Con cần biết gì trước" liệt kê bài nguồn; "Lỗi con hay gặp" ghi bài nào (số bài và tên) cần xem lại theo nhóm sai (cộng-trừ, nhân-chia, biểu thức, lời văn, chu vi, thuận tiện); hoạt động ôn: chia bánh (1/3 và 1/4), chia nước, con ra đề; có đáp án SGK tr.110-111 (tính lại bằng code trong test).

## Phần Lý thuyết

Nhắc lại nhanh, không có animation. Không dùng hình tái dùng từ bài khác (không import chéo, không cần chuyển lên `components/`).

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Rút gọn phân số | 56 | `KeyFact` + `QuickCheck` (`thu-rut-gon`) |
| Cộng khác mẫu số: quy đồng | 57, 60 | `KeyFact` + `QuickCheck` (`thu-cong`) |
| Trừ khác mẫu số | 61 | `KeyFact` + `QuickCheck` (`thu-tru`) |
| Số tự nhiên và phân số, kết quả > 1 giữ phân số | 62 | `KeyFact` + `QuickCheck` (`thu-so-tu-nhien`) |
| Nhân hai phân số | 63 | `KeyFact` + `QuickCheck` (`thu-nhan`) |
| Chia hai phân số (đảo ngược số chia) | 64 | `KeyFact` + `QuickCheck` (`thu-chia`) |
| Chia cho số tự nhiên | 64 | `KeyFact` + `QuickCheck` (`thu-chia-so-tu-nhien`) |
| Thứ tự phép tính | 61, 66 | `KeyFact` + `QuickCheck` (`thu-thu-tu`) |
| Tính thuận tiện | 66 | `KeyFact` có ví dụ, không có câu thử |

Hai chương: cộng, trừ (4 điểm, Bài 56-62) và nhân, chia (5 điểm, Bài 63-66). Số điểm nhỉnh hơn mức 5-6 mỗi chương một chút ở chương hai vì thứ tự phép tính và thuận tiện là điểm bài tập dùng nhiều.

## Phần Bài tập

Nhóm theo bài nguồn và chủ đề, không theo tiết. Đáp án in đậm, tính lại trong test.

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Cộng, trừ (Bài 60, 61, 62) | 5/12 + 7/4; 4 + 3/10; 17/20 − 3/5; 41/15 − 1 | dien-so | **13/6; 43/10; 1/4; 26/15** |
| Nhân, chia (Bài 63, 64, 66) | 3/8 × 4/9; 10/21 × 3; 18/11 : 6/11; 28/3 : 7 | dien-so | **1/6; 10/7; 3; 4/3** |
| Biểu thức | 7/9 + 4/9 − 5/18; 2 − 3/4 + 5/12; 11/6 − (5/6 − 7/18); 18/48 + 6 × 1/8; 14/6 × (8 : 16/3) | loi-van (từng bước) | **17/18; 5/3; 25/18; 9/8; 7/2** |
| Lời văn | khu đất bác Tư (1/3 nhà, 1/4 cây); Nam 600 000 đồng dùng 2/5; tấm bìa 9/20 m² rộng 3/5 m (có hình) | loi-van | **5/12; 240 000 và 360 000 đồng; dài 3/4, chu vi 27/10 m** |
| Tính thuận tiện, Đố em | 4/7 × 9/5 × 7/4 × 5; 5/6 × 2/9 + 7/9 × 5/6; 5/18 + 7/6 + 11/6 − 3; 5/6 và 7/12 thành tổng hai phân số tử số 1 | dien-so, trac-nghiem | **9; 5/6; 5/18; 1/2 + 1/3; 1/3 + 1/4** |
| Suy nghĩ thêm | bốn câu tìm lỗi (vượt SGK) | trac-nghiem | xem bảng Tư duy |

## Kỹ thuật

Không cần thứ mới. `available` của Bài 70 trong `lib/lessons.ts` đặt `true`. Các helper phân số (`mul`, `div`, `add`, `sub`, `gcd`) viết lại trong `bai-tap.ts` của bài như Bài 66, không import chéo.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: quy đồng mẫu số, rút gọn, phân số tối giản, phân số đảo ngược, tính bằng cách thuận tiện.
- Kết quả viết là phân số tối giản; kết quả lớn hơn 1 không dùng hỗn số; số tự nhiên một ô nhập.
- Tiền viết có NBSP: 400 000, 240 000.
- Không dạy hỗn số, không dạy so sánh hay quy đồng mới.

## Câu hỏi cần chốt

1. Phần Đố em (SGK tr.110 LT5) làm trắc nghiệm thay vì nhập hai mẫu số, vì đáp án hoán vị được (1/2 + 1/4 hay 1/4 + 1/2). Đề xuất: giữ trắc nghiệm.
2. Bước trung gian của biểu thức nhập từng dòng (`loi-van`) thay vì một ô kết quả. Đề xuất: giữ, vì con tự kiểm tra được từng bước.
3. Tính thuận tiện không có câu thử trong Lý thuyết. Đề xuất: giữ, bài tập đã có ba câu.

## Phụ lục: đáp án SGK

Tr.110: 1) 17/8; 29/8; 1/4; 32/21. 2) 7/18; 29/15; 11/32. 3) 3/10 diện tích. 4) 4/27. 5) 3/4 = 1/2 + 1/4.
Tr.111: 1) 1/3; 8/7; 8/3; 4/5. 2) 7/6; 3. 3) 250 000 đồng. 4) dài 7/10 m, chu vi 11/5 m. 5) 7; 3/8.
Tất cả được tính lại trong `bai-tap.test.ts` ("đáp án SGK tr.110-111").
