# Brief — Bài 57. Quy đồng mẫu số các phân số

- SGK: Toán 4 KNTT tập hai, trang 62-63, chủ đề 10 (Phân số).
- Route: `/kntt-4/bai-57`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 55 (tính chất cơ bản), Bài 56 (rút gọn). Bài sau: Bài 58 (so sánh phân số) dùng quy đồng.
- Cấu trúc SGK: Khám phá (1/4 và 3/8 → 2/8 và 3/8; ví dụ 3/4 và 5/12) → Hoạt động 1 (quy đồng theo mẫu, 2 câu), 2 (tìm hai phân số mẫu chung 12) → Luyện tập 1 (3 câu), 2 (rút gọn rồi quy đồng, 2 câu), 3 (ba phân số, 2 câu), 4 (trắc nghiệm 2/9 = ?/72).
- Mục tiêu:
  1. Hiểu quy đồng mẫu số: đổi phân số về cùng mẫu số, giá trị không đổi.
  2. Quy đồng hai phân số khi mẫu số lớn chia hết cho mẫu số bé (nhân cả tử số và mẫu số phân số bé mẫu).
  3. Rút gọn rồi quy đồng.
  4. Quy đồng ba phân số.
  5. Dùng đúng từ "mẫu số chung".
- Kiến thức cần có: Bài 55 (nhân/chia cả tử và mẫu), Bài 56 (rút gọn), bảng nhân/chia.
- Điểm mấu chốt: SGK chỉ dạy trường hợp mẫu lớn chia hết cho mẫu bé; không dạy tìm BCNN hay nhân chéo hai mẫu. Luyện tập 2 phải rút gọn trước. Luyện tập 4 có đáp án nhiễu 18/72 (sai hệ số), 14/72, 4/18 (rút gọn, mẫu không phải 72).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Nhân tử mà quên nhân mẫu | 1/4 → 2/4 (đúng 2/8) | Animation `QuyDong` bước 4, `thu-quen`, `sn-1` |
| Nhân hai số khác nhau | (2 × 4)/(3 × 5) (đúng 8/12) | `sn-2` |
| Quy đồng cả phân số mẫu lớn | 3/8 đổi nữa | KeyFact "giữ nguyên phân số có mẫu lớn", `hd-*` có chữ "Giữ nguyên" |
| Quên rút gọn trước | 6/9 và 5/18 làm thẳng | Nhóm `lt-2` bắt đúng hai bước |
| Chọn nhầm đáp án nhiễu | 18/72, 14/72, 4/18 (đúng 16/72) | `l4-1`, giải thích hệ số 72 : 9 = 8 |
| Chia khi không chia hết | 5/12 → mẫu 4 | `sn-3` (vượt SGK) |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: bảng nhân, bảng chia, tính chất cơ bản (Bài 55) |
| Bốn kênh | Dùng | Nói ("mẫu số chung"), hình (hai chiếc bánh), nhẩm (d : b), viết (1/4 = (1 × 2)/(4 × 2)) |
| Câu tư duy | Dùng (vượt SGK) | Tìm lỗi `sn-1`, `sn-2`, `sn-3` |
| Đếm, Tách, So sánh | Không dùng | Bài không có quy luật đếm, số lớn hay quan hệ hơn/kém |

Khởi động: `kd-nhan` 4 × 3 = **12**; `kd-chia` 12 : 4 = **3**; `kd-tcb` 3/4 = **6/8**.
Thử trong Lý thuyết: `thu-quy` (2/5 = **4/10**), `thu-quen` (**Không bằng**), `thu-mau-chung` (1/3 và 5/9, **9**).

Suy nghĩ thêm (**vượt SGK**): `sn-1` đến `sn-4` (tìm lỗi, chia không hết, tổng tử số 4 + 2 + 1 = **7**).

## Phần Phụ huynh

1. Con học: quy đồng mẫu số hai, ba phân số; chưa học BCNN, so sánh, cộng trừ.
2. Cần biết: Bài 55, 56; bảng nhân/chia.
3. Cách giải thích: hình hai chiếc bánh; ba bước (chia, nhân cả hai số, giữ nguyên); từ "mẫu số chung".
4. Lỗi: bảng ở trên.
5. Ôn 10 phút: chia bánh 4 và 8 phần; con ra đề; trò "giữ nguyên hay đổi"; hỏi "vì sao".
6. Dấu hiệu: viết được 3/4 = 9/12; nhớ nhân cả hai số; rút gọn trước khi đề bảo.

## Phần Lý thuyết

1. Hai chiếc bánh 1/4 và 3/8. Animation `QuyDong` (4 bước: hai bánh, chia đôi phần, phép nhân, lỗi chỉ nhân tử). `KeyFact` 1/4 = (1 × 2)/(4 × 2) = 2/8; `QuickCheck` `thu-quy`.
2. Quy đồng mẫu số, mẫu số chung; ví dụ 3/4 và 5/12. `KeyFact` "chia mẫu lớn cho mẫu bé → nhân cả hai số"; `QuickCheck` `thu-mau-chung`, `thu-quen`.
3. Rút gọn trước rồi quy đồng (ví dụ 5/15 và 4/18), ba phân số. `KeyFact` "rút gọn → quy đồng". Không animation.

Hình dùng `HinhPhanSo` (hình tròn) và `PhanSo` có sẵn; bố cục hai bánh cạnh nhau vừa 390px.

## Phần Bài tập

Số liệu đã đổi so với SGK (riêng `l4-1` giữ số SGK).

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Hoạt động 1 | `hd-1` 3/5 và 7/10 | `dien-so` | **6/10** |
| | `hd-2` 5/8 và 13/40 | `dien-so` | **25/40** |
| | `hd-3` 4/9 và 11/27 | `dien-so` | **12/27** |
| Hoạt động 2 | `th-1` 3/4; 5/6 mẫu 12 | `loi-van` | **9**, **10** |
| | `th-2` 2/5; 3/10 mẫu 20 | `loi-van` | **8**, **6** |
| Luyện tập 1 | `l1-1` 7/10 và 31/50 | `loi-van` | hệ số **5**, **35/50** |
| | `l1-2` 4/15 và 11/45 | `loi-van` | **3**, **12/45** |
| | `l1-3` 5/7 và 23/70 | `loi-van` | **10**, **50/70** |
| Luyện tập 2 | `l2-1` 6/9 và 5/18 | `loi-van` | 2/3, 5/18; **12/18 và 5/18** |
| | `l2-2` 12/30 và 14/20 | `loi-van` | 2/5, 7/10; **4/10 và 7/10** |
| | `l2-3` 3/36 và 8/12 | `loi-van` | 1/12, 2/3; **1/12 và 8/12** |
| Luyện tập 3 | `l3-1` 1/4; 5/8; 13/24 | `loi-van` | mẫu 24: **6, 15, 13** |
| | `l3-2` 2/5; 3/10; 17/20 | `loi-van` | mẫu 20: **8, 6, 17** |
| Luyện tập 4 | `l4-1` 2/9 mẫu 72 | `trac-nghiem` | C **16/72** |
| | `l4-2` 7/12 mẫu 60 | `trac-nghiem` | A **35/60** |
| Suy nghĩ thêm | `sn-1` đến `sn-4` | `trac-nghiem`, `dien-so` | A, A, A, **7** |

Test tính lại bằng gcd/phép nhân, không so với số gõ tay.

## Kỹ thuật

Không cần thứ mới. Đặt `available = true` cho Bài 57 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Dùng "quy đồng mẫu số", "mẫu số chung", "tử số", "mẫu số" đúng SGK.
- Phân số viết như SGK: (1 × 2)/(4 × 2).
- Không dạy BCNN, nhân chéo hai mẫu, hay so sánh phân số.

## Câu hỏi cần chốt

1. Có nên thêm ví dụ mẫu không chia hết (như 1/2 và 1/3)? Đề xuất: không, SGK chưa dạy.
2. Giữ `l4-1` đúng số SGK? Đề xuất: giữ, vì đáp án nhiễu đã thiết kế sẵn.
3. `sn-3` (chia không hết) có vượt tầm? Đề xuất: giữ, nhưng nằm ở nhóm "Suy nghĩ thêm".

## Phụ lục: đáp án SGK

- Khám phá: 1/4 = 2/8 → 2/8 và 3/8; 3/4 = 9/12 → 9/12 và 5/12.
- Hoạt động 1: a) 10/18 và 11/18; b) 13/60 và 27/60. Hoạt động 2: 8/12 và 9/12.
- Luyện tập 1: a) 20/24 và 11/24; b) 21/45 và 19/45; c) 200/300 và 77/300.
- Luyện tập 2: a) 1/18 và 12/18; b) 8/20 và 7/20.
- Luyện tập 3: a) 21/35; 20/35; 9/35; b) 45/54; 42/54; 19/54.
- Luyện tập 4: C.
