# Brief — Bài 46. Tìm số trung bình cộng

- SGK: Toán 4 KNTT tập hai, trang 29-30, chủ đề 8 (Phép nhân và phép chia).
- Route: `/kntt-4/bai-46`
- Trạng thái: đã viết nội dung (người dùng cho phép làm một lượt, không chờ duyệt)

## Đánh giá

- Vị trí: sau Bài 45 (ước lượng), trước Bài 47 (rút về đơn vị). Ôn lại phép cộng nhiều số và chia cho số có một chữ số (Bài 39); Luyện tập 2 chia cho 12 (Bài 44).
- Cấu trúc SGK: Khám phá (2 ví dụ + quy tắc) → Hoạt động (3 bài) → Luyện tập (4 bài).
- Mục tiêu:
  1. Nói được số trung bình cộng là số có được khi chia đều tổng cho các số.
  2. Tìm số trung bình cộng của 2, 3, 4, 5 số.
  3. Giải bài toán tìm trung bình khi có nhiều nhóm (tổng chia cho tổng số).
  4. Tìm một số khi biết số trung bình cộng và các số còn lại.
- Điểm mấu chốt: SGK chỉ nêu quy tắc, không giải thích vì sao; app thêm hình san đều cột. Bẫy: chia cho số loại thay vì số đối tượng (LT2); quên tính số thứ hai trước (LT3); LT4 là phép ngược.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Chia cho sai số các số hạng | 624 : 2 = 312 (624 : 12 = 52) | Phần 4 Lý thuyết, câu `lt-2` có dòng "Số bao", câu `sn-2` |
| Chia khi chưa cộng hết | 13 + 14 : 3 (đúng: (13 + 14 + 18) : 3) | Ô "Tổng" tách riêng trong mọi câu |
| Quên số thứ hai | LT3: (20 + 4) : 2 (đúng: (20 + 24) : 2 = 22) | Câu `lt-3` có dòng tính ngày thứ hai |
| Tìm số còn lại ngược | 15 − 18 (đúng: 15 × 2 − 18 = 12) | Phần 5 Lý thuyết, câu `lt-4`, `sn-3` |
| Kết quả ngoài khoảng | TBC của 14, 22, 30 là 35 | Câu `sn-1`, KeyFact "nằm giữa" |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Nhẹ | Tổng và chia là hai ô riêng, bỏ lỗi chia sớm |
| So sánh | Chính | Hình cột san đều: cột cao bù cột thấp; TBC giữa số bé nhất và lớn nhất |
| Câu tư duy | Vừa | Ước lượng và tìm lỗi sai (Vượt SGK) |
| Bốn kênh | Đủ | Nói (quy tắc), hình (cột), nhẩm (khởi động), viết (phép tính) |
| Không dùng | | Đếm: bài không có quy luật theo bước. Kiểm tra đầu vào: khởi động đã đủ |

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-cong | dien-so | 24 + 36 + 30 | **90** |
| kd-chia | dien-so | 90 : 3 | **30** |
| kd-chia-deu | dien-so | 12 kẹo cho 4 bạn | **3** |
| thu-tinh | dien-so | TBC của 6, 8, 10 | **24; 8** |
| thu-giua | trac-nghiem | TBC của 12, 20, 28 | **20** |
| thu-so-hang | trac-nghiem | 4 lớp chia cho mấy | **4** |
| thu-nguoc | dien-so | TBC 3 số là 10, tổng | **30** |

Vượt SGK (có ghi rõ trong nhóm "Suy nghĩ thêm"): `sn-1` ước lượng (**22**), `sn-2` tìm lỗi chia cho 2 (đúng 20), `sn-3` tìm số thứ ba khi 3 số TBC 20, biết 15 và 18 (**27**). Lý do: chốt hiểu bản chất, tự kiểm tra.

## Phần Phụ huynh

Theo mẫu 6 mục. Ý riêng: lỗi chia cho sai số hạng; hoạt động tính TBC số trang sách đọc, chiều cao; dấu hiệu là con tự kiểm tra kết quả nằm giữa.

## Phần Lý thuyết

| Chặng | Ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1 | Chia đều 10 và 50 | `SanDeu` 4 bước | (10 + 50) : 2 = 30 | không |
| 2 | Ba số 13, 14, 18 | `SanDeu` 4 bước | = 15 | `thu-tinh` |
| 3 | Quy tắc: tổng : số số hạng | không | quy tắc | `thu-so-hang`, `thu-giua` |
| 4 | Bài có nhóm (8 + 4 bao) | không | chia cho tổng số bao | không |
| 5 | Biết TBC tìm số còn lại | không | tổng = TBC × số số hạng | `thu-nguoc` |

`SanDeu`: bước 1 cột cao thấp, bước 2 cộng tổng và phần thừa, thiếu, bước 3 san đều, bước 4 phép tính. Tối đa 3 cột, vừa 390px.

## Phần Bài tập

- Hoạt động (trang 29-30), 6 câu: `hd-1a,b,c` TBC 2, 3 số (**40**, **30**, **12**); `hd-2a` loi-van (18, 24, 27) **23**; `hd-2b` loi-van (32, 36, 38, 42) **37**; `hd-3` loi-van chặng đua 80, 120, 64, 176 km **110** (đổi số liệu, không giữ tên địa danh).
- Luyện tập (trang 30), 5 câu: `lt-1a` **30**, `lt-1b` **21**; `lt-2` loi-van 5 + 3 bao, 250 + 134 kg **48**; `lt-3` loi-van **33**; `lt-4` dien-so **12**.
- Suy nghĩ thêm, 3 câu (Vượt SGK).

## Tiêu chí duyệt nội dung

- Thuật ngữ: "số trung bình cộng", "số các số hạng", "tổng".
- Phép chia viết dấu hai chấm (:).
- Không dạy trung bình có số dư hay số thập phân (kết quả luôn nguyên).

## Câu hỏi cần chốt

1. Giữ hình cột san đều làm animation chính? Đề xuất giữ vì SGK không giải thích "vì sao chia".
2. Giữ 3 câu Vượt SGK? Đề xuất giữ, vì rà lỗi hay mắc.
3. Câu bảng chặng đua bỏ tên địa danh? Đề xuất bỏ vì chưa đối chiếu nguồn.

## Phụ lục: đáp án SGK

- Khám phá: (10 + 50) : 2 = 30; (13 + 14 + 18) : 3 = 15.
- HĐ1: 25; 20; 12. HĐ2: a) 19 cây; b) 160 : 4 = 40. HĐ3: 444 : 4 = 111 km.
- LT1: 78 : 3 = 26; 85 : 5 = 17. LT2: 624 : 12 = 52. LT3: 24 cái, (20 + 24) : 2 = 22. LT4: 15 × 2 − 18 = 12.
