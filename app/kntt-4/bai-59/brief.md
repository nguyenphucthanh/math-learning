# Brief — Bài 59. Luyện tập chung

- SGK: Toán 4 KNTT tập hai, trang 69-73, chủ đề 10 (Phân số).
- Route: `/kntt-4/bai-59`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: bài cuối chủ đề 10, sau Bài 58 (So sánh phân số). Bài sau: Bài 60 (Phép cộng phân số, chủ đề 11).
- Bài nguồn: Bài 53 (khái niệm), 54 (phân số và phép chia), 55 (tính chất cơ bản), 56 (rút gọn), 57 (quy đồng), 58 (so sánh).
- Cấu trúc SGK: tr.69 Luyện tập 1-3 (chuỗi phân số bằng nhau, rút gọn, chọn hình tô, tính tích) → tr.70 Trò chơi Hái hoa → tr.71 Luyện tập 1-5 (quy đồng, đoạn thẳng, Đố em) → tr.72-73 Luyện tập (so sánh, bi, bánh, sắp xếp, Đố em).
- Kiến thức cần có: các bài nguồn ở trên.
- Điểm mấu chốt: bẫy "trừ cả tử và mẫu để rút gọn"; rút gọn chưa hết; số tự nhiên viết thành phân số (3 = 36/12); rút gọn tích bằng cách bỏ thừa số giống nhau; so với 1 để so sánh không cần quy đồng (câu Đố em).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Trừ thay vì chia khi rút gọn | 12/18 = 6/12 (đúng 2/3) | `sn-1`, KeyFact mục 3 |
| Rút gọn chưa hết | 24/36 = 12/18 (đúng 2/3) | `sn-2`, KeyFact mục 4 |
| Quy đồng chỉ nhân mẫu số | 3/4 = 3/36 (đúng 27/36) | `qd-2`, KeyFact mục 5 |
| So tử số khi khác mẫu | 2/3 < 5/12 (đúng >) | `ss-1`, `bi`, `banh` |
| Bỏ quên 3 = 3/1 | không viết được 3 thành mẫu 12 | `qd-3` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Phần Nhắc lại nhanh: sáu câu `quickChecks`, thay khởi động |
| Tách | Dùng nhẹ | Rút gọn tích: bỏ thừa số giống nhau (`rg-2`) |
| So sánh | Dùng | So sánh với 1 (Đố em `cuoi`), `ss-*` |
| Câu tư duy | Dùng | Tìm lỗi (`sn-1`, `sn-2`), "vì sao" 15/14 > 14/15 (`sn-4`) |
| Đếm, bốn kênh | Không dùng | Bài tổng hợp, không có quy luật đếm; kênh hình đã có ở `hn-*`, `dt-*` |

Vượt SGK: `sn-1` đến `sn-4` (nhóm "Suy nghĩ thêm").

## Phần Phụ huynh

Theo mẫu bài ôn tập: thay "Con học gì" bằng bảng "sai nhóm nào, xem lại bài nào". Hoạt động ôn có Hái hoa phiên bản giấy (thay trò chơi tr.70) và dây 1/4 m.

## Phần Lý thuyết

Nhắc lại nhanh, không animation, không khởi động.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Tử số, mẫu số, phần tô màu | 53 | `KeyFact` + hình băng 8 ô (`HinhPhanSo`) |
| a : b = a/b | 54 | `KeyFact` + câu điền |
| Nhân/chia cả tử và mẫu | 55 | `KeyFact` + câu điền |
| Rút gọn, tối giản | 56 | `KeyFact` + câu điền |
| Quy đồng (mẫu lớn chia hết mẫu bé) | 57 | `KeyFact` + câu điền |
| Bốn cách so sánh | 58 | `KeyFact` + một hàng so sánh |

Hình tái dùng: `HinhPhanSo` trong `components/math/phan-so.tsx`. Không import animation của bài 55-58.

## Phần Bài tập

Nhóm theo bài nguồn. Số liệu đổi so với SGK, đáp án tính lại bằng test.

- Phân số bằng nhau và rút gọn (55, 56): `pc-1`, `pc-2` (dien-so, chuỗi), `tc-1` (trac-nghiem, đáp án **9/21**), `rg-1` (loi-van: **3/2; 5/12; 3/5**), `rg-2` (loi-van: **7/11; 2/3**).
- Hình tô màu (53, 55): `hn-1..3` (trac-nghiem có hình: **2/3; 3/4; 1/4**), `hn-4` (chọn hình tô 3/5 số hình tròn, đáp án **B**).
- Quy đồng và đoạn thẳng (57): `qd-1..3` (loi-van), `dt-1`, `dt-2` (giữ số của hình SGK: AC chia 4 phần, B ở vạch 1; HK chia 5 phần, I ở vạch 2), `do-day` (Đố em, đáp án gấp đôi hai lần).
- So sánh (58): `ss-1..3` (9 ý như SGK), `bi`, `banh`, `sx` (6 phân số mẫu 8, 16, 32...), `cuoi` (Đố em).
- Suy nghĩ thêm: `sn-1..4`.

## Tiêu chí duyệt nội dung

Thuật ngữ SGK: tử số, mẫu số, rút gọn, phân số tối giản, quy đồng mẫu số. Phân số viết dạng a/b trong text. Không dạy nhân chéo (chỉ dùng trong test để tính lại).

## Câu hỏi cần chốt

1. Trò chơi Hái hoa (tr.70): không làm thành trò chơi tương tác (cần hai người, xúc xắc, bàn cờ). Thay bằng nhóm "Hình tô màu và phân số bằng nhau" và hoạt động giấy trong phần Phụ huynh. Hình bàn cờ không đọc rõ phân số từng ô nên không dùng số liệu của sách.
2. LT2a tr.69 (ngôi sao): app dùng hình tròn (`HinhPhanSo` kiểu `nhom`) với số liệu tự tạo (10 hình, tô 6 hình = 3/5) để tái dùng component, không vẽ ngôi sao. Đáp án sách đọc từ hình: B (tô 4 ngôi sao = 2/5); cần đối chiếu.
3. Câu sắp xếp (LT4 tr.73) dùng trắc nghiệm chọn dãy đúng thay vì điền 6 phân số, vì ô trống chỉ nhận số.

## Phụ lục: đáp án SGK

Xem khối "Đáp án bài trong sách" trong `phu-huynh.mdx`.
