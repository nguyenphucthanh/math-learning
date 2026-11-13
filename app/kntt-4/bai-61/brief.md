# Brief — Bài 61. Phép trừ phân số

- SGK: Toán 4 KNTT tập hai, trang 80-82, chủ đề 11 (Phép cộng, phép trừ phân số).
- Route: `/kntt-4/bai-61`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 60 (phép cộng phân số), bài sau là Bài 62 (luyện tập chung). Bài ôn lại nó: Bài 62.
- Cấu trúc SGK: Khám phá 1 (cùng mẫu số, 7/8 − 2/8) → Hoạt động (tr.80: bài 1 tính 3 câu, bài 2 viết phép tính theo hình) → Khám phá 2 (khác mẫu số, 7/8 − 1/4) → Hoạt động (tr.81: bài 1 tính theo mẫu 3 câu, bài 2 dế trũi, bài 3 sơ đồ ao ếch) → Luyện tập (tr.82: bài 1 tính 4 câu, bài 2 rút gọn rồi tính 4 câu, bài 3 dây và gậy, bài 4 ô chữ, bài 5 bác Tân).
- Mục tiêu:
  1. Trừ hai phân số cùng mẫu số: trừ tử số, giữ nguyên mẫu số.
  2. Trừ hai phân số khác mẫu số bằng quy đồng mẫu số rồi trừ.
  3. Rút gọn kết quả (và rút gọn trước khi trừ như bài 2 tr.82).
  4. Giải toán lời văn bằng phép trừ phân số; so sánh trước khi tìm “dài hơn bao nhiêu”.
  5. Tính chuỗi phép cộng, trừ liên tiếp (sơ đồ ao ếch).
- Kiến thức cần có: quy đồng (Bài 57), rút gọn (Bài 56), so sánh (Bài 58), cộng phân số (Bài 60).
- Điểm mấu chốt:
  - SGK không giải thích vì sao giữ nguyên mẫu số; app dùng băng 8 ô (vẫn chia 8 phần, chỉ bỏ bớt phần).
  - Bài 2 tr.80 chỉ có hình, số phần đọc từ hình; app dùng hình `HinhPhanSo` với số liệu riêng.
  - Số bị trừ luôn lớn hơn hoặc bằng số trừ; SGK chưa dạy kết quả âm hay hỗn số. Có 10/4 − 5/4 = 5/4 (phân số lớn hơn 1).
  - Bài 3 tr.82: phải so sánh (Bài 58) rồi mới trừ; hai câu a, b có vật dài hơn khác nhau.
  - Sơ đồ ao ếch khép kín (đã tính lại: 5/12 → 17/24 → 7/12 → 11/12 → 1/12 → 5/12).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Trừ cả mẫu số | 7/8 − 2/8 = 5/0 (đúng 5/8) | Animation `TruCungMau` bước 2, câu `sn-1` |
| Khác mẫu số mà trừ thẳng | 3/4 − 1/8 = 2/4 (đúng 5/8) | Animation `TruKhacMau`, câu `sn-2`, `km-1` |
| Quên rút gọn kết quả | 7/10 − 1/5 = 5/10 (đúng 1/2) | KeyFact mục 3, câu nhập tối giản, `rg-*` |
| Quy đồng chỉ nhân mẫu số | 1/5 = 1/10 (đúng 2/10) | QuickCheck quy đồng, Khởi động |
| Trừ ngược | 1/3 − 1/2 | Câu `dg-*a` so sánh trước; `sn-4` (vượt SGK) |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Đầy đủ (3 câu) | Quy đồng, rút gọn là nền của bài |
| So sánh | Một phần | Dây và gậy: so trước rồi trừ; `sn-4` |
| Bốn kênh | Đầy đủ | Hình (băng ô), nói (KeyFact), viết (phép tính), nhẩm (ô nối, chuỗi ao ếch) |
| Câu tư duy | Nhóm “Suy nghĩ thêm” | Tìm lỗi sai (`sn-1`, `sn-2`), thử lại bằng phép cộng (`sn-3`) |
| Đếm, Tách | Không dùng | Bài không có quy luật theo bước hay số lớn cần tách |

Khởi động: `kd-1` (1/4 = ?/8), `kd-2` (1/3 = ?/12), `kd-3` (6/8 rút gọn).

Suy nghĩ thêm: `sn-1` (trừ cả mẫu số), `sn-2` (quên quy đồng), `sn-3` (thử lại bằng cộng, **vượt SGK**), `sn-4` (phép trừ nào làm được, **vượt SGK**).

## Phần Phụ huynh

Theo mẫu 6 mục. Ý riêng: lỗi trừ mẫu số, quên rút gọn, trừ ngược; hoạt động ôn rót nước và thử lại bằng phép cộng; đáp án SGK tr.80-82.

## Phần Lý thuyết

Khởi động 3 câu, rồi 3 mục.

1. Cùng mẫu số: một ý. Animation `TruCungMau` (3 bước: băng 8 ô tô 7; gạch bỏ 2 ô; 7 − 2 = 5 giữ mẫu 8). `KeyFact`; `QuickCheck` 8/9 − 3/9.
2. Khác mẫu số: animation `TruKhacMau` (3 bước: hai băng 7/8 và 1/4; chia đôi mỗi phần băng 1/4 thành 1/4 = 2/8; trừ). `KeyFact`; `QuickCheck` quy đồng 1/5 = ?/10.
3. Rút gọn kết quả: không animation; `KeyFact` 5/10 = 1/2; `QuickCheck`.

Cả hai animation tự làm trong `_animations/` của bài. Bài 60 chưa có file nào để tái dùng; nếu bài 60 làm một băng giấy dùng chung thì có thể gộp lên `components/` sau.

Bố cục 390px: viewBox 340 rộng, chữ từ 16 trở lên.

## Phần Bài tập

Nhóm theo tiết.

**Trừ hai phân số cùng mẫu số (tr.80), 6 câu.** `cm-1..3` (`dien-so`: 8/13 − 3/13 = **5/13**; 11/6 − 4/6 = **7/6**; 27/16 − 8/16 = **19/16**). `h-1` tròn 7 phần tô 5 bỏ 2 = **3/7**; `h-2` băng 8 ô tô 6 bỏ 3 = **3/8** (`dien-so` kèm hình, đổi số so với hình cố định của SGK). `l-1` (`loi-van`): 11/12 − 4/12 = **7/12**.

**Trừ hai phân số khác mẫu số (tr.81-82), 8 câu.** `km-1` (`loi-van`: 3/4 = **6**/8, rồi 3/4 − 1/8 = **5/8**); `km-2..4` (`dien-so`: 2/3 − 5/18 = **7/18**; 4/5 − 7/20 = **9/20**; 11/12 − 1/3 = **7/12**); `rg-1..4` rút gọn rồi tính (4/6 − 3/9 = **1/3**; 6/10 − 1/5 = **2/5**; 15/20 − 3/12 = **1/2**; 10/16 − 1/4 = **3/8**).

**Luyện tập: dây, gậy, ao ếch, ô nối, 7 câu.** `dg-1a` (`trac-nghiem`: gậy 5/6 m, dây 7/12 m, **cây gậy** dài hơn), `dg-1b` (**1/4 m**); `dg-2a` (gậy 7/12 m, dây 11/6 m, **sợi dây**), `dg-2b` (**5/4 m**); `ao-1` (`loi-van`, chuỗi từ 5/6: −1/3 = **1/2**; +1/4 = **3/4**; −5/12 = **1/3**; +1/2 = **5/6**, khép kín); `noi-1` (`noi-cap`: 9/10 − 3/5 = **3/10**; 5/6 − 1/3 = **1/2**; 7/8 − 3/4 = **1/8**; 5/6 − 7/12 = **1/4**); `t-1` (`loi-van`: bác Tân, 7/9 − 1/3 = **4/9**).

Ô chữ SGK (bài 4) không làm đúng như sách (cần bảng ô chữ riêng); app thay bằng ô nối `noi-1`. Số liệu ao ếch của SGK dùng trong đáp án phụ huynh, app dùng chuỗi riêng.

**Suy nghĩ thêm, 4 câu.** `sn-1`, `sn-2` (`trac-nghiem`, đáp án đầu tiên), `sn-3` (`dien-so`, 5/8 + 2/8 = **7**/8), `sn-4` (`trac-nghiem`: **5/6 − 1/2**).

## Kỹ thuật

Không cần thư viện hay dạng bài mới. Đáp án dạng phân số dùng `dien-so`/`loi-van` với hai ô trống (tử số, mẫu số) và yêu cầu tối giản. Đặt `available` của Bài 61 thành `true` trong `lib/lessons.ts` (đã làm). Test tính lại đáp án bằng nhân chéo và `gcd`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: phân số, tử số, mẫu số, quy đồng mẫu số, rút gọn, giữ nguyên mẫu số.
- Phân số viết a/b trong chữ; hiệu có thể lớn hơn 1 (5/4).
- Không dạy: kết quả âm, hỗn số, quy đồng khi mẫu không chia hết cho nhau, nhân chéo.

## Câu hỏi cần chốt

1. Ô chữ (bài 4 tr.82): app thay bằng ô nối. Đề xuất giữ vì ô chữ cần UI riêng. Đáp án SGK vẫn có trong khối phụ huynh (SAO THỔ, đọc từ ảnh).
2. Bài 2 tr.80 (viết phép tính theo hình): số phần của từng hình trong sách chưa ghi vào đáp án vì chưa kiểm hình; đề xuất xem lại sách.
3. Hai animation có thể gộp thành băng chung với Bài 60 sau.

## Phụ lục: đáp án SGK

Xem khối “Đáp án bài trong sách” trong `phu-huynh.mdx` (tr.80-82, tính lại bằng test).
