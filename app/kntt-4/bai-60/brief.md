# Brief — Bài 60. Phép cộng phân số

- SGK: Toán 4 KNTT tập hai, trang 74-79, Chủ đề 11 "Phép cộng, phép trừ phân số".
- Route: `/kntt-4/bai-60`
- Trạng thái: đã viết nội dung (brief viết cùng lượt với code, chưa qua bước duyệt riêng).

## Đánh giá

- Vị trí: bài mở đầu Chủ đề 11. Bài trước là Bài 59 (luyện tập chung chủ đề 10); bài sau là Bài 61 (phép trừ phân số). Bài 62 ôn lại.
- Cấu trúc SGK: Khám phá cùng mẫu số (1) → Hoạt động (4 bài) → Luyện tập (4 bài), trang 74-76; Khám phá khác mẫu số (1) → Hoạt động (3 bài) → Luyện tập (5 bài), trang 77-79.
- Mục tiêu:
  1. Cộng hai phân số cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số.
  2. Cộng hai (và ba) phân số cùng mẫu số, dùng giao hoán, kết hợp để tính thuận tiện.
  3. Cộng hai phân số khác mẫu số: quy đồng mẫu số rồi cộng (mẫu lớn chia hết mẫu bé).
  4. Rút gọn phân số trước khi cộng hoặc rút gọn kết quả khi rút gọn được.
  5. Giải bài toán lời văn dùng phép cộng phân số; viết kết quả lớn hơn 1 dưới dạng phân số.
- Kiến thức cần có: Bài 55 (tính chất cơ bản), Bài 56 (rút gọn), Bài 57 (quy đồng mẫu số).
- Điểm mấu chốt: SGK chỉ dạy mẫu số lớn chia hết cho mẫu số bé; bài 2, 3 trang 79 (kết hợp, thuận tiện) chỉ dùng cùng mẫu số. SGK có bẫy Đ/S về cộng cả mẫu số (trang 75). Bài ô chữ trang 76 cho đáp án 17/11, 6/11... Hỗn số chưa học nên 7/3 giữ nguyên.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Cộng cả mẫu số | 4/9 + 1/9 = 5/18 (5/9) | Animation CungMau bước 4; Đ/S ds-1, ds-2 |
| Cộng tử với tử, mẫu với mẫu khi khác mẫu số | 1/8 + 1/2 = 2/10 (5/8) | Animation KhacMau bước 4; sn-1 |
| Quên rút gọn kết quả | 8/12 (2/3) | QuickCheck `rutgon`; dòng "có thể rút gọn" trong k1-5, k2-3, l1-3; sn-2 |
| Không đưa về cùng mẫu số trước khi cộng | 1/6 + 1/3 = 2/9 (3/6) | QuickCheck `quy`; các câu khac có bước quy đồng |
| Đổi 7/3 thành hỗn số | 7/3 = 2 1/3 (chưa học) | KeyFact "kết quả lớn hơn 1 vẫn viết phân số" |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Khởi động nhắc rút gọn, quy đồng, cùng mẫu số (Bài 56, 57) |
| Tách | Dùng nhẹ | Tách bước: quy đồng, cộng, rút gọn, từng dòng trong bài tập |
| Bốn kênh | Dùng | Hình (băng giấy), nói (câu quy tắc), viết (phép tính), nhẩm (tính thuận tiện) |
| Câu tư duy | Dùng | Tìm lỗi, ước lượng so với 1 |
| Đếm, So sánh | Không dùng | Bài không có quy luật theo bước; so sánh phân số là bài khác |

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-rut | dien-so | Rút gọn 6/8 | 3/4 |
| kd-quy | dien-so | 1/2 về mẫu số 8 | 4/8 |
| kd-mau | trac-nghiem | 3/7 và 2/7 cùng mẫu số? | Có |
| sn-1 | trac-nghiem | Tìm lỗi 1/8 + 1/2 = 2/10 | Cộng cả tử số và mẫu số |
| sn-2 | trac-nghiem | 8/12 viết gọn hơn? | 2/3 |
| sn-3 (Vượt SGK) | trac-nghiem | 5/8 + 6/8 so với 1 | Lớn hơn 1 (11/8). Vượt SGK vì so sánh với 1, nên chỉ để trong Suy nghĩ thêm |

## Phần Phụ huynh

1. Con học: cộng cùng mẫu số, khác mẫu số, rút gọn, bài toán lời văn.
2. Cần biết trước: Bài 55, 56, 57.
3. Cách giải thích: băng giấy; hai câu quy tắc của SGK.
4. Lỗi: cộng cả mẫu số; 2/10; quên rút gọn; quên quy đồng; hoảng khi gặp 7/3.
5. Ôn 10 phút: pizza 1/8 + 1/2; con ra đề; tìm lỗi; hỏi "vì sao".
6. Dấu hiệu: nói được quy tắc, không cộng mẫu số, tự quy đồng và rút gọn.

## Phần Lý thuyết

| Chặng | Ý | Animation | KeyFact / QuickCheck |
|---|---|---|---|
| 1. Cùng mẫu số | cộng tử, giữ mẫu | `CungMau` 4 bước: tô 1/5, thêm 2/5, phép tính, lỗi 3/10 | KeyFact quy tắc; QuickCheck `cung`, `nham` |
| 2. Khác mẫu số | quy đồng rồi cộng | `KhacMau` 4 bước: 1/8 và 1/2, 1/2 = 4/8, tổng 5/8, lỗi 2/10 | KeyFact quy tắc; QuickCheck `quy` |
| 3. Rút gọn | rút gọn trước hoặc sau | không | KeyFact 8/12 = 2/3; QuickCheck `rutgon` |

Hình SVG viewBox rộng 320, đọc được ở 390px (băng giấy dùng `BangGiay` trong `_animations/`; không import từ bài 58).

## Phần Bài tập

Chia theo tiết SGK, giữ dạng và độ khó, đổi số. Mọi đáp án tính lại trong test bằng cộng phân số với mẫu số chung nhỏ nhất.

- Tiết 1 (tr.74-75): HĐ1 cộng cùng mẫu số (3 câu, `loi-van`, kết quả 9/7, 24/13, 39/125); HĐ3 số còn thiếu (3 câu `dien-so`: tử số, mẫu số số hạng, mẫu số tổng); HĐ4 bài toán; LT1 Đ/S (3 câu `trac-nghiem`: sai, sai, đúng). **HĐ2 (viết phép tính theo cốc nước) bỏ vì cần hình cốc riêng.**
- Tiết 2 (tr.76): LT2 tính rồi so sánh (`so-sanh`, 3 hàng: giao hoán, kết hợp, một hàng khác); LT3 ô chữ đổi thành 2 câu cộng ba phân số (bỏ ô chữ vì cần hình); LT4 bài toán ba phân số.
- Tiết 3 (tr.78): HĐ1 cộng khác mẫu số (5 câu, có hệ số quy đồng sẵn; một câu rút gọn kết quả); HĐ2 rút gọn rồi tính (3 câu); HĐ3 bài toán.
- Tiết 4 (tr.79): LT1 (cùng mẫu, khác mẫu tự tìm hệ số, rút gọn kết quả); LT2 so sánh kết hợp; LT3 hai câu cộng ba phân số cùng mẫu số (tính thuận tiện, chỉ cùng mẫu số); LT4, LT5 bài toán.
- Suy nghĩ thêm: sn-1, sn-2, sn-3 (vượt SGK).
- Không đưa vào câu mẫu số không chia hết (như 1/2 + 1/3): vượt phạm vi SGK.

## Kỹ thuật

- Đặt `available` của bài 60 thành `true` trong `lib/lessons.ts`.
- Không thêm dạng bài, thư viện hay token màu. Dùng `so-sanh`, `loi-van`, `dien-so`, `trac-nghiem`.

## Tiêu chí duyệt nội dung

- Dùng đúng: "tử số", "mẫu số", "quy đồng mẫu số", "rút gọn", "giữ nguyên mẫu số".
- Kết quả lớn hơn 1 viết phân số, không đổi hỗn số.
- Không dạy mẫu số chung nhỏ nhất, không dạy cộng khi mẫu không chia hết.

## Câu hỏi cần chốt

1. Bỏ HĐ2 trang 75 (cốc nước) và ô chữ trang 76 vì cần hình riêng: đề xuất giữ bỏ, thay bằng câu tính tương đương.
2. Có thêm câu mẫu số không chia hết (1/2 + 1/3) trong Suy nghĩ thêm: đề xuất không, chờ bài sau.
3. Có tái dùng thanh phân số của Bài 58: đề xuất không, vì băng giấy ở đây tô màu theo phép cộng; dùng `BangGiay` riêng của bài.

## Phụ lục: đáp án SGK

Xem mục "Đáp án bài trong sách" trong `phu-huynh.mdx` (trang 74-79, đã tính lại).
