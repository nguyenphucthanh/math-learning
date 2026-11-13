# Brief — Bài 55. Tính chất cơ bản của phân số

- SGK: Toán 4 KNTT tập hai, trang 56-58, chủ đề 10 (Phân số).
- Route: `/kntt-4/bai-55`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 53 (khái niệm phân số), Bài 54 (phân số và phép chia). Bài sau chưa viết.
- Cấu trúc SGK: Khám phá (hai băng giấy 2/3 và 4/6, tính chất cơ bản) → Hoạt động 1 (nhân/chia cả tử và mẫu, 6 ô), 2 (tìm hệ số, 4 ô), 3 (trắc nghiệm 6/9) → Luyện tập 1 (số còn thiếu, thẻ bìa), 2 (thương không đổi), 3 (con bướm, con ong, ba bông hoa).
- Mục tiêu:
  1. Nhận ra hai phân số bằng nhau từ hình hai băng giấy như nhau (2/3 = 4/6).
  2. Nhân cả tử số và mẫu số với cùng một số tự nhiên khác 0 để được phân số bằng.
  3. Chia hết cả tử số và mẫu số cho cùng một số tự nhiên khác 0 để được phân số bằng.
  4. Tìm số còn thiếu ở tử số hoặc mẫu số của hai phân số bằng nhau.
  5. Nêu được: nhân (chia) số bị chia và số chia với (cho) cùng một số thì thương không đổi.
- Kiến thức cần có: tử số, mẫu số, đọc phân số (Bài 53); phân số là phép chia (Bài 54); bảng nhân, bảng chia, chia hết.
- Điểm mấu chốt: SGK không giải thích vì sao; app dùng hình băng giấy (chia mỗi phần thành 2 thì số phần tô và số phần đều gấp đôi). Bài **không** dạy rút gọn, “tối giản”, quy đồng, so sánh phân số, cộng trừ phân số hay “nhân chéo”. Khi chia chỉ nói “chia cả tử số và mẫu số cho cùng một số”.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Chỉ làm với một số | 2/3 → 4/3 (đúng 4/6) | `thu-mot`, animation `NhanChia` bước 4 |
| Cộng thay vì nhân | 2/3 → 4/5 (đúng 4/6) | `sn-1`, hình băng giấy |
| Hai hệ số khác nhau | (2 × 2)/(3 × 3) | KeyFact “Cùng một phép, cả hai số”, `hs-1`, `hs-2` (hai ô cùng một số) |
| Chia khi không chia hết | 7/9 chia 2 | `sn-4` |
| Nhầm nhân và chia khi tìm số thiếu | 6/15 = ?/5 điền nhân 3 (đúng chia 3, ra 2) | `tt-2`, `tt-3`; gợi ý nhìn cặp số đã biết |
| Đọc ngược hệ số | 2 × ? = 10 điền 8 (đúng 5) | `hs-1` đến `hs-3` giải thích thử lại phép nhân |
| Nghĩ tử và mẫu khác thì không bằng | 12/20 và 3/5 “khác nhau” | `sn-5`, `noi-1` |
| Cộng số bị che sai | thiếu một số hoặc cộng cả 3, 4 | `ck-1`: ba ô riêng rồi một ô tổng |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Bốn kênh | Dùng | Nói (câu “cùng một phép, cả hai số”), hình (băng giấy), nhẩm (bảng nhân/chia), viết (2/3 = (2 × 2)/(3 × 2)) |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: bảng nhân, bảng chia, đọc phân số |
| Câu tư duy | Dùng (vượt SGK) | Vì sao chia nhỏ mà phần tô không đổi; tìm lỗi “cộng thay vì nhân” |
| Đếm, Tách, So sánh | Không dùng | Bài không có quy luật đếm, số lớn hay quan hệ “hơn/kém” |

Khởi động:

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-nhan | dien-so | 6 × 4 | **24** |
| kd-chia | dien-so | 35 : 5 | **7** |
| kd-phan-so | dien-so | chia 5 phần, tô 3 | **3/5** |

Thử trong Lý thuyết: `thu-nhan` (2/5 = 6/15), `thu-mot` (4/3 không bằng 2/3, **Không bằng**), `thu-chia` (8/12 = 2/3), `thu-thuong` (24 : 6 = 12 : 3 = **4**).

Suy nghĩ thêm (**vượt SGK**: tìm lỗi, “vì sao”, nhiều cách viết, không chia hết): `sn-1` đến `sn-5` (bảng ở mục Bài tập).

## Phần Phụ huynh

1. Con học: phân số bằng nhau, tính chất cơ bản; thương không đổi. Chưa học rút gọn, quy đồng.
2. Cần biết: Bài 53, 54; bảng nhân/chia.
3. Cách giải thích: hai băng giấy như nhau; viết như SGK; nhấn mạnh “cả tử số và mẫu số”; chia phải chia hết.
4. Lỗi: bảng ở trên (chỉ một số, cộng, chia không hết, nhầm nhân/chia, hệ số).
5. Ôn 10 phút: hai tờ giấy gấp 3 và 6 phần; thanh sô-cô-la 3/6 = 1/2; đổi vai ra đề; hỏi “vì sao”.
6. Dấu hiệu: viết được hai chiều, nói “cùng một phép”, tự tìm số thiếu, biết cộng không được.

## Phần Lý thuyết

| Chặng | Ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Hai băng giấy như nhau | 2/3 = 4/6 (phần tô dài bằng nhau) | `BangGiay`, 3 bước: băng Việt chia 3 tô 2; băng Mai chia 6 tô 4 (nét đứt chia đôi mỗi phần); hai phần tô khớp nhau | 2/3 = 4/6, “phân số bằng nhau” | — |
| 2. Nhân hoặc chia cả tử và mẫu | tính chất cơ bản, hai chiều | `NhanChia`, 4 bước: 2/3; nhân 2 được 4/6; chia 2 ngược lại; sai khi chỉ nhân tử số | nhân; chia hết; “cùng một phép, cả hai số” | `thu-nhan`, `thu-chia`, `thu-mot` |
| 3. Chia và thương không đổi | 12 : 4 = 36 : 12 = 6 : 2 = 3 | `ThuongKhongDoi`, 3 bước | thương không thay đổi | `thu-thuong` |

Hình rộng nhất viewBox 340, chữ từ 14. Hai băng giấy dùng màu `--unit-tan` (băng trên) và `--unit-mm2` (băng dưới), chỉ để phân biệt hai băng, không phải đơn vị.

## Phần Bài tập

Số liệu đổi so với SGK. Đáp án tính lại bằng test (kể cả tích chéo, chỉ trong test).

| Nhóm | Id | Dạng | Đáp án |
|---|---|---|---|
| Nhân cả tử và mẫu (HĐ 1a) | nh-1..3 | dien-so | 3/4 → **6/8**; 5/6 → **15/18**; 11/25 → **44/100** |
| Chia cả tử và mẫu (HĐ 1b) | ch-1..3 | dien-so | 12/18 → **2/3**; 15/20 → **3/4**; 35/56 → **5/8** |
| Tìm số nhân hoặc chia (HĐ 2) | hs-1..3 | dien-so (hai ô cùng số) | **7**; **3**; **8** |
| Gấp, giảm (HĐ 3) | tn-1, tn-2 | trac-nghiem | 8/12 giảm 4 lần: **2/3**; 2/5 gấp 3 lần: **6/15** |
| Số còn thiếu (LT 1) | tt-1..4, noi-1 | dien-so 1 ô; noi-cap | **9**, **3**, **2**, **63**; nối 1/2–5/10, 2/3–12/18, 3/5–12/20, 4/7–8/14 |
| Hai băng giấy (Khám phá) | bg-1..3 | dien-so + hình | 3/4 và **6/8**; 2/5 và **4/10**; **8** phần |
| Thương không đổi (LT 2) | th-1, th-2 | loi-van, so-sanh | 18 : 6 = **3**, 72 : 24 = **3**, 6 : 2 = **3**; ba dấu **=** |
| Số bị che lấp (LT 3) | ck-1, ck-2 | loi-van | **8**, **15**, **27**, tổng **50**; 12/16 = **3**/4 = 6/**8** |
| Suy nghĩ thêm (vượt SGK) | sn-1..5 | trac-nghiem, dien-so | cộng sai (**đáp án đầu**); vì sao (**đáp án đầu**); 2, 3, 4; không chia hết (**không được**); 12/20 = 3/5 (**bằng nhau**) |

Mọi số ở `ck-1` khác SGK (SGK tổng 51) để con không thuộc đáp án.

## Kỹ thuật

- Không có component mới trong `components/`. Component riêng của bài: `_illustrations/bang-giay.tsx` (`Bang`, `HaiBang`: băng giấy chia phần, tô phần; Server Component), `_animations/bang-giay.tsx`, `nhan-chia.tsx`, `thuong-khong-doi.tsx`. Lúc viết bài, `components/math/` chưa có component phân số của Bài 53; phân số viết dạng chữ `a/b` (ô trống `?/?` dùng hai ô). Nếu Bài 53 thêm `PhanSo`/băng giấy thì gộp lại sau.
- Dùng dạng `so-sanh` đã có trong `types.ts` cho câu `th-2`.
- `lib/lessons.ts`: đặt `available` của Bài 55 thành `true`.

## Tiêu chí duyệt nội dung

- Dùng đúng: “phân số bằng nhau”, “tính chất cơ bản của phân số”, “nhân/chia cả tử số và mẫu số với/cho cùng một số tự nhiên khác 0”, “chia hết”.
- Không dạy: rút gọn, tối giản, ước chung lớn nhất, quy đồng, so sánh và cộng trừ phân số, “nhân chéo”. Tích chéo chỉ có trong test.

## Câu hỏi cần chốt

1. Phân số trong mục lục chữ viết dạng `a/b`, chưa có dạng xếp chồng. Đề xuất: giữ, rồi đổi khi Bài 53 có component phân số (cần thống nhất tên).
2. Nhóm “Suy nghĩ thêm” vượt SGK (5 câu). Đề xuất: giữ vì phục vụ lỗi “cộng thay vì nhân”.
3. Chặng “thương không đổi” đặt trong Lý thuyết (SGK để ở Luyện tập). Đề xuất: giữ vì gắn với Bài 54.

## Phụ lục: đáp án SGK

- Khám phá: 2/3 = 4/6; 4/6 = 2/3.
- HĐ 1a: 6/15; 8/14; 39/162. 1b: 2/5; 5/8; 5/13.
- HĐ 2a: 5 và 5; 7 và 28/49. 2b: 4 và 4; 8 và 3/4.
- HĐ 3: C.
- LT 1: 4; 2; 3; 42.
- LT 2a: 3; 3; 3. 2b: =; =.
- LT 3a: bướm 2, ong 6. 3b: vàng 9, đỏ 12, xanh 30; 9 + 12 + 30 = 51.
