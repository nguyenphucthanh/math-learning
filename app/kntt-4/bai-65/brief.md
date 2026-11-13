# Brief — Bài 65. Tìm phân số của một số

SGK: Toán 4 KNTT tập hai, trang 95-97, Chủ đề 12 Phép nhân, phép chia phân số.
Route: `/kntt-4/bai-65`
Trạng thái: đã viết nội dung (duyệt tắt theo yêu cầu, chưa xem trên trình duyệt)

## Đánh giá

- **Vị trí:** sau Bài 64 (phép chia phân số), trước Bài 66 (luyện tập chung). Dùng Bài 63 (nhân số tự nhiên với phân số), Bài 56 (rút gọn), Bài 53 (phân số của nhóm vật).
- **Cấu trúc SGK:** Khám phá (1: 12 cái bánh, 2/3 phủ kem) → Hoạt động (3 bài, tr.96) → Luyện tập (4 bài, tr.96-97).
- **Mục tiêu:**
  1. Tìm 2/3 của 12 bằng 12 × 2/3, rồi rút gọn ra số tự nhiên.
  2. Giải bài toán lời văn một bước "tìm phân số của một số".
  3. Đổi đơn vị (phút ra giây, thế kỉ ra năm) rồi tìm phân số.
  4. Giải bài hai đến ba bước: tìm phần còn lại, hai lần tìm phân số liên tiếp.
- **Kiến thức cần có:** Bài 63, 56, 53; đổi đơn vị thời gian.
- **Điểm mấu chốt:** SGK chỉ nêu quy tắc nhân với phân số, không giải thích vì sao; animation cho thấy chia 3 phần, lấy 2 phần. Chia trước (12 : 3 × 2) chỉ để hiểu, giữ cách SGK. Kết quả luôn là số tự nhiên (số chia hết cho mẫu số). Bẫy: "bằng 8/5 li thứ nhất" là phân số lớn hơn 1, kết quả lớn hơn; LT3 phải đổi 1/10 phút ra giây; LT4 "một nửa của một nửa" là hai bước.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Quên rút gọn | 12 × 2/3 = 24/3 (= 8) | Ô điền 24/3 rồi = 8; animation bước 3 |
| Nhân cả tử và mẫu | 12 × 2/3 = 24/36 (= 8) | Câu tìm lỗi `sn-1`; gợi ý "phải ra số tự nhiên bé hơn 12" |
| Nhầm chiều | 3 : 12 hoặc 12 : 2/3 (12 × 2/3) | `sn-2` làm chiều ngược; phần Phụ huynh |
| Không kiểm tra kết quả | 20 × 3/5 = 100/3 | Gợi ý mọi câu: kết quả là số tự nhiên |
| Quên đổi đơn vị | 1/10 phút tính với 10 (= 6 giây) | KeyFact đơn vị, câu `gio`, `bao`, `tau` |
| Quên trừ phần còn lại | chỉ tính hai phần | `gao`, `tau` có dòng "còn lại" |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Chính | Chia 12 thành 3 phần × 4, lấy 2 phần; kiểm tra bằng chia trước |
| Kiểm tra đầu vào | Nhẹ | 3 câu khởi động: 12 : 3, 4 × 3/5, 24/3 |
| Bốn kênh | Đủ | Nói (quy tắc), hình (12 bánh), nhẩm (chia trước), viết (12 × 2/3) |
| Câu tư duy | Nhẹ | Tìm lỗi 24/36, chiều ngược, một nửa của một nửa |
| Đếm, So sánh | Không dùng | Bài không có quy luật theo bước hay "hơn/kém" |

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-1 | dien-so | 12 bánh chia 3 phần, mỗi phần | **4** |
| kd-2 | dien-so | 4 × 3/5 | **12/5** |
| kd-3 | dien-so | 24/3 | **8** |
| sn-1 (Vượt SGK) | trac-nghiem | Tìm lỗi 12 × 2/3 = 24/36 | **nhân cả mẫu số** |
| sn-2 (Vượt SGK) | dien-so | 8 bánh kem trong 12 bánh là mấy phần | **2/3** |
| sn-3 (Vượt SGK) | dien-so | 1/2 của 1/2 của 40 so với 1/4 của 40 | **10; 10** |

## Phần Phụ huynh

Theo mẫu 6 mục: hình chia bánh; quy tắc nhân; lỗi (quên rút gọn, 24/36, chia ngược, quên đổi đơn vị); ôn 10 phút (chia kẹo, đồng hồ, con ra đề); dấu hiệu. Đáp án SGK ở phụ lục.

## Phần Lý thuyết

1. **Chia 12 bánh thành 3 phần** (`ChiaBanh`, 4 bước): 12 bánh → 3 nhóm × 4 → tô 2 nhóm (8) → 12 × 2/3 = 24/3 = 8 và 12 : 3 × 2. `KeyFact` quy tắc. `QuickCheck` 3/4 của 20.
2. **Đổi đơn vị:** `KeyFact` 1/10 phút = 6 giây. `QuickCheck` 1/6 giờ = 10 phút.
3. **Nhiều bước, phần còn lại:** `KeyFact` 30 − 10 − 15. `QuickCheck` bi đỏ, bi xanh.

Hình 340 × 270 co theo màn hình; 3 nhóm × 4 bánh rộng 320.

## Phần Bài tập

- **Tiết 1: Tìm phân số của một số (tr.95-96)** (9 câu): bốn câu `dien-so` 15 × 2/5, 24 × 3/8, 18 × 5/6, 36 × 3/4 (**6, 9, 15, 27**); `loi-van` lớp 28 học sinh, 3/4 nữ (**21**); li nước 120 ml, 5/4 (**150**); giày 2 400 đôi, 3/4 (**1 800**); chim 25 con, 3/5 (**15**); `trac-nghiem` 2/5 của 15 (**6**, bẫy 9 và 30/75).
- **Tiết 2: Bài toán nhiều bước (tr.97)** (5 câu): tàu 3/4 thế kỉ = 75 năm, 1/3 và 2/5, còn lại (**75, 25, 30, 20**); báo 360 m hết 1/5 phút (**12 giây, 30 m**); chào mào 24 quả (**12, 6**); gạo 40 kg, 2/5 và 3/8 (**16, 15, 9**); 1/6 giờ (**10 phút**).
- **Suy nghĩ thêm (vượt SGK)**: `sn-1`, `sn-2`, `sn-3` (3 câu), để luyện tìm lỗi và chiều ngược.

Số liệu đổi so với SGK vì không có câu nào gắn với hình cố định.

## Kỹ thuật

Không cần thứ mới. `convertTime` chỉ dùng trong test (1 giờ, 1 phút, 1 thế kỉ), vì nó không đọc phân số. Đặt `available: true` cho Bài 65 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

Dùng "tìm phân số của một số", "nhân với phân số", "tử số, mẫu số". Số lớn tách lớp bằng NBSP. Không dạy hỗn số, không dạy chia phân số trong bài này, không dạy phân số của số không chia hết.

## Câu hỏi cần chốt

1. Giữ chia trước (12 : 3 × 2) chỉ trong lời, không thành cách chính? Đề xuất: giữ vậy, theo SGK.
2. Có thêm bài mà kết quả không là số tự nhiên (như 15 × 2/4)? Đề xuất: không, ngoài phạm vi SGK.
3. Số liệu bài tập đều đổi (không dùng lại 35, 150, 4 500, 50, 198, 16)? Đề xuất: đổi, để con không học thuộc đáp án.

## Phụ lục: đáp án SGK

Xem khối "Đáp án bài trong sách" trong `phu-huynh.mdx` (12 × 2/3 = 8; 35 × 4/7 = 20; 150 × 8/5 = 240; 4 500 × 3/5 = 2 700; 20 × 3/5 = 12; 25, 20, 5 năm; 198 : 6 = 33; 8 rồi 4).
