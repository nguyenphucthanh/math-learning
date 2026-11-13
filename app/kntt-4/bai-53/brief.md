# Brief — Bài 53. Khái niệm phân số

- SGK: Toán 4 KNTT tập hai, trang 49-51, chủ đề 10 (Phân số).
- Route: `/kntt-4/bai-53`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: bài đầu của chủ đề Phân số. Bài trước là Bài 52 (luyện tập chung chủ đề thống kê); bài sau là Bài 54 (Phân số và phép chia số tự nhiên). Phân số xuất hiện lần đầu, không có bài nào ôn lại.
- Cấu trúc SGK: Khám phá (pizza chia 6, 1/6 và 2/6, tử số, mẫu số) → Hoạt động 1 (viết phân số chỉ phần tô, 4 hình), 2 (bảng tử số/mẫu số), 3 (nối cách đọc với phân số) → Luyện tập 1 (viết rồi đọc, 5 hình), 2 (viết từ lời, 4 câu), 3 (tô 3/4 số bông hoa), 4 (bức tường 2 hàng × 5 cột).
- Mục tiêu:
  1. Nhận ra phân số chỉ phần đã tô của hình chia thành các phần bằng nhau.
  2. Nêu được tử số (số phần đã tô), mẫu số (số phần bằng nhau của cả hình).
  3. Đọc, viết phân số có tử và mẫu đến hai chữ số.
  4. Viết được phân số chỉ phần chưa tô khi biết phần đã tô.
- Kiến thức cần có: đọc, viết số đến hai chữ số; nhận biết các phần bằng nhau.
- Điểm mấu chốt: phần phải **bằng nhau** (SGK nói "chia thành các phần bằng nhau"). Mẫu số là phần của **cả** hình, kể cả phần chưa tô. Chỉ phân số chỉ phần của một hình hoặc một nhóm; không dạy phân số bằng nhau, so sánh, rút gọn, cộng trừ, phân số lớn hơn 1, tia số, phân số là phép chia. Bẫy của SGK: Luyện tập 3 hình C (6/8 số bông là 3/4 số bông) cần phân số bằng nhau.
- Hình c, d của Hoạt động 1 và b-e của Luyện tập 1 **đọc từ ảnh, cần đối chiếu sách**. App không dùng số liệu và hình này, chỉ ghi trong đáp án Phụ huynh.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Lấy số phần tô làm mẫu số | 3/3 hoặc 8/8 (đúng 3/8) | `vh-1` đến `vh-5`; animation `ChiaBanh` bước 5 |
| Lấy số phần chưa tô làm mẫu số | 3/7 thay vì 3/10 (câu 4a/4b), `sn-3` | `tc-1`, `tc-3`, `sn-2`, `sn-3` |
| Đếm các phần không bằng nhau | Viết 1/3 cho hình chia lệch | Chặng 2, `thu-khong-deu`, `sn-1` |
| Viết ngược tử và mẫu | 8/3 thay vì 3/8 | `thu-doc`, `tm-3`, `tm-4`, `sn-4` |
| Đọc sai thứ tự | "sáu phần hai" thay vì "hai phần sáu" | Chặng 4, `thu-doc-phan-so`, `dv-1`, `dv-2`, `dv-7` |
| Viết sai khi nghe đọc | "bảy phần mười chín" thành 7/10 hoặc 19/7 | `dv-3` đến `dv-6` |
| Đếm thiếu ô ở hình nhiều hàng | Đếm 8 thay vì 9 ô | `vh-4`, `vh-3`, `tc-1` |
| Đọc số lớn trong mẫu số | "hai mươi lăm phần năm mươi tám" | `dv-5`, `dv-6` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Bốn kênh | Đủ cả bốn | Nói: đọc to phân số (`thu-doc-phan-so`, `dv-1`, `dv-2`); hình: `ChiaBanh`, `HinhPhanSo`; nhẩm: số phần chưa tô (`tc-*`, `sn-2`); viết: `vh-*`, `dv-3` đến `dv-6` |
| Kiểm tra đầu vào | Nhẹ | Khởi động đếm phần của cả hình và phần có màu: chuẩn bị mẫu số và tử số |
| Câu tư duy | Vừa | "Vì sao phải chia bằng nhau" (`thu-khong-deu`, `sn-1`); tìm lỗi (`sn-3`, `sn-4`); tô + chưa tô = mẫu số (`sn-2`) |
| Không dùng | | Đếm, Tách, So sánh: không có quy luật bước, số lớn hay quan hệ "hơn/kém". "Vì sao mẫu số không được bằng 0" bỏ vì mức trừu tượng quá cao ở bài đầu, chỉ nêu "mẫu số là số tự nhiên khác 0" trong KeyFact |

**Khởi động**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-1 | dien-so | Hình tròn 6 múi, tô 2: số phần cả hình, số phần tô | 6; 2 |
| kd-2 | dien-so | Băng 5 ô, tô 3 | 5; 3 |
| kd-3 | dien-so | Nhóm 8 hình tròn, tô 5 | 8; 5 |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| thu-doc | trac-nghiem | Hình tròn 8 phần, tô 3: phân số chỉ phần tô | **3/8** |
| thu-khong-deu | trac-nghiem | Hình chia 3 phần không đều, tô 1: viết 1/3 được không | **Không, vì 3 phần không bằng nhau** |
| thu-tu-mau | dien-so | Băng 7 ô, tô 4: tử số, mẫu số | **4; 7** |
| thu-doc-phan-so | trac-nghiem | Đọc 5/9 | **Năm phần chín** |

**Suy nghĩ thêm** (không có phần vượt SGK; mọi câu dùng kiến thức bài này): `sn-1` (chia không đều), `sn-2` (tô + chưa tô = mẫu số), `sn-3`, `sn-4` (tìm lỗi). Đáp án ở phần Bài tập.

## Phần Phụ huynh

1. Con học gì: phân số chỉ phần của hình, tử số, mẫu số, cách đọc.
2. Cần biết trước: đọc, viết số hai chữ số.
3. Cách giải thích: chia **bằng nhau** → tô → tử trên (phần tô), mẫu dưới (cả hình).
4. Lỗi hay gặp: bảng ở trên.
5. Hoạt động ôn: chia quả, giấy gấp, kẹo thành phần bằng nhau; chia lệch rồi hỏi có viết được phân số không.
6. Dấu hiệu nắm bài: nói được vì sao phải bằng nhau, viết đúng, đọc đúng số lớn, tìm phần chưa tô.

## Phần Lý thuyết

Thứ tự: pizza (cụ thể) → hình tròn, băng ô (hình) → ký hiệu và thuật ngữ.

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Chia bánh | Chia 6 phần bằng nhau, tô 1 rồi 2 phần: 1/6, 2/6, tử số, mẫu số | `ChiaBanh`, 6 bước (0-5): bánh nguyên; chia 6; tô 1 và 1/6; tô 2 và 2/6; tử số; mẫu số. SVG 340 × 220, chữ ≥ 16 | 1/6 và 2/6 là phân số | `thu-doc` |
| 2. Phải bằng nhau | Phần không bằng nhau thì không dùng phân số | Hình tĩnh `HinhPhanSo` chia lệch (không animation, để con nhìn so sánh) | phần bằng nhau | `thu-khong-deu` |
| 3. Tử số và mẫu số | Tử số chỉ phần tô, mẫu số chỉ cả hình, mẫu số khác 0 | Hình tĩnh băng 7 ô | 4/7 | `thu-tu-mau` |
| 4. Đọc phân số | Tử đọc số đếm, mẫu đọc "phần + số" | Không | 5/9: năm phần chín | `thu-doc-phan-so` |

## Phần Bài tập

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Viết phân số chỉ phần đã tô (Hoạt động 1, Luyện tập 1) | vh-1 tròn 8, tô 3 | dien-so (2 ô: tử, mẫu) | **3/8** |
| | vh-2 băng 6, tô 5 | dien-so | **5/6** |
| | vh-3 nhóm 7 hình, tô 3 | dien-so | **3/7** |
| | vh-4 lưới 3 × 3, tô 4 | dien-so | **4/9** |
| | vh-5 tròn 10, tô 7 | dien-so | **7/10** |
| Tử số và mẫu số (Hoạt động 2) | tm-1 đến tm-4 | dien-so | **5, 9; 8, 11; 4/15; 13/20** |
| Đọc và viết (Hoạt động 3, Luyện tập 2) | dv-1 nối hai phần năm, ba phần tám, năm phần sáu, bốn phần chín | noi-cap | **2/5, 3/8, 5/6, 4/9** |
| | dv-2 nối một phần bảy, bảy phần mười, ba phần bốn, sáu phần mười một | noi-cap | **1/7, 7/10, 3/4, 6/11** |
| | dv-3 đến dv-6 viết từ lời | dien-so | **5/12; 11/20; 23/45; 16/31** |
| | dv-7 đọc 7/12 | trac-nghiem | **Bảy phần mười hai** |
| Phần đã tô và chưa tô (Luyện tập 4) | tc-1 tường 3 × 4 = 12 phần, tô 5, phần chưa sơn | trac-nghiem | **7/12** |
| | tc-2 phần đã sơn | trac-nghiem | **5/12** |
| | tc-3 bánh 9 phần, ăn 4, phần chưa ăn | trac-nghiem | **5/9** |
| | tc-4 số phần chưa ăn và phân số | dien-so | **5; 5/9** |
| Suy nghĩ thêm | sn-1 hình chia lệch, Nam viết 1/3 | trac-nghiem | **Sai, phần không bằng nhau** |
| | sn-2 hình 8 ô tô 3: chưa tô; 3 + 5 = 8 | dien-so | **5; 5; 8** |
| | sn-3 hình 10 phần tô 7, Mai viết 3/7 | trac-nghiem | **Lấy phần chưa tô làm tử số, phần đã tô làm mẫu số** (đúng: 7/10) |
| | sn-4 hình 5 phần tô 2, Lan viết 5/2 | trac-nghiem | **Viết ngược tử số và mẫu số** (đúng: 2/5) |

Luyện tập 3 (3/4 số bông hoa) không đưa vào bài tập app vì hình C cần phân số bằng nhau; đưa vào đáp án Phụ huynh.

## Kỹ thuật

- Component mới dùng chung trong `components/math/phan-so.tsx` (Server Component): `PhanSo` (phân số viết dọc), `HinhPhanSo` (`kieu`: `tron` chia múi, có `chia` để vẽ phần không đều; `bang` băng ô nhiều hàng; `nhom` nhóm hình tròn; `mau`, `to` là số phần tô hoặc danh sách vị trí), `docSo` (đọc số 1-99), `docPhanSo` (đọc phân số), `phanTo`, `sectorPath`. Bài 54-60 dùng lại.
- `_animations/chia-banh.tsx`: GSAP theo bước, `viewBox` 340 × 220, chữ ≥ 16, co theo màn hình. Câu viết phân số dùng hai ô trống (tử, mẫu), ô trống chỉ nhận số.
- Màu phần tô: `--sun`; tử số `--unit-mm2`, mẫu số `--unit-second` (chỉ trong animation, không phải đơn vị đo).
- `lib/lessons.ts`: đặt `available: true` cho Bài 53.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: phân số, tử số, mẫu số, gạch ngang, "một phần sáu", "hai phần sáu".
- Đọc: tử số là số đếm, mẫu số là "phần + số". Số có hai chữ số theo SGK (hai mươi lăm, mười một, ba mươi mốt).
- Không dạy: phân số bằng nhau, so sánh, rút gọn, cộng trừ, phân số lớn hơn 1, tia số, phân số là phép chia, "mẫu số khác 0" chỉ nêu, không giải thích.

## Câu hỏi cần chốt

1. Luyện tập 3 (3/4 số bông hoa): hình C (6/8) cần phân số bằng nhau. Đề xuất: không đưa vào bài tập app, chỉ ghi trong Phụ huynh với lời giải thích chia nhóm; đối chiếu sách để biết đáp án là A hay A và C.
2. Bỏ "vì sao mẫu số không được bằng 0". Đề xuất: chỉ nêu "mẫu số khác 0"; lí do ("chia 0 phần thì không có hình") để dành khi con hỏi.
3. Chữ "/" để viết phân số trong ô trống (ô tử, ô mẫu). Đề xuất: giữ vì ô trống hiện chỉ có kiểu nội dòng; nếu muốn hiện dọc như sách thì thêm kiểu mới ở bài sau.

## Phụ lục: đáp án SGK

- Trang 49: 1/6 (một phần sáu), 2/6 (hai phần sáu); tử số 2, mẫu số 6.
- Trang 50, Hoạt động 1: a) 3/4; b) 2/5; c) 4/6 (đọc từ ảnh, cần đối chiếu); d) 3 trên tổng số ô, 8 hoặc 9 (đọc từ ảnh, chưa chắc, cần đối chiếu). Hoạt động 2: 4/7 → 4, 7; 6/10 → 6, 10; 3/8; 9/12. Hoạt động 3: 2/6 ↔ hai phần sáu; 5/8 ↔ năm phần tám; 2/3 ↔ hai phần ba; 3/5 ↔ ba phần năm.
- Trang 51, Luyện tập 1: a) 1/5 (mẫu); b) 5/9; c) 6/9; d) 4/7; e) 4/8 (b-e đọc từ ảnh, cần đối chiếu). Luyện tập 2: 7/19; 9/10; 17/23; 25/58. Luyện tập 3: A (3/4); C có thể (6/8 = 3/4), cần đối chiếu sách. Luyện tập 4: bức tường 10 phần, đã sơn 3 + 4 = 7. a) **B** 3/10; b) **C** 7/10.
