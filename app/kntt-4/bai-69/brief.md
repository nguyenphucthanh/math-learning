# Brief — Bài 69. Ôn tập phân số

- SGK: Toán 4 KNTT tập hai, trang 107-109, chủ đề 13 (Ôn tập cuối năm).
- Route: `/kntt-4/bai-69`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: bài đầu chủ đề 13, sau chủ đề 12 (Phép nhân, phép chia phân số). Bài ôn nó: các bài ôn sau trong chủ đề 13.
- Bài nguồn (= kiến thức cần có): Bài 53 (khái niệm), 54 (phân số và phép chia), 55 (tính chất cơ bản), 56 (rút gọn), 57 (quy đồng), 58 (so sánh), 59 (luyện tập chung).
- Phạm vi: đúng như SGK, chỉ ôn khái niệm, tính chất, rút gọn (kể cả rút gọn tích), quy đồng, so sánh. Không ôn cộng, trừ, nhân, chia phân số (Bài 60-65).
- Cấu trúc SGK: tr.107 Luyện tập 1-2 (chọn hình, chuỗi phân số bằng nhau) → tr.108 Luyện tập 3-5 (quy đồng, so sánh có đơn vị, ba vòi nước) và Luyện tập 1 (chọn phân số: bé hơn 1, bằng 5/7, lớn hơn 3/5) → tr.109 Luyện tập 2-4 (xếp con vật, chạy thi, rút gọn tích).
- Điểm mấu chốt: LT1a/1b yêu cầu đếm kỹ trên hình. LT4 có đơn vị (kg, l, m) và so sánh với số tự nhiên (13/12 với 1; 16/7 với 2). Bẫy ngôn ngữ ở tr.109 LT3: "ai về đích đầu tiên" là thời gian ít nhất, ngược với bài vòi nước ("chảy nhiều nhất" là phân số lớn nhất). Đã làm câu "Suy nghĩ thêm" tìm lỗi đảo ngược.
- Hình: LT1b (đàn ếch) đọc từ hình sách: mỗi khung 15 con, tô 3, 9, 7, 6 con, đáp án B (9/15 = 3/5). LT1a (hình tam giác): **không đếm chắc** số tam giác tô màu, nên app tự vẽ dải 14 tam giác nhỏ, tô 9 (`_illustrations/tam-giac.tsx`), đáp án 9/14. Cần đối chiếu với hình sách.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Đếm sai số phần khi đọc hình | tô 9 trong 14 viết 9/5 hoặc 5/14 | `kn-1`, `kn-2` |
| Cộng, trừ cùng một số vào tử và mẫu | 12/18 = 6/12 (đúng 2/3) | `tc-*`, `thu-tinh-chat` |
| Rút gọn chưa tối giản; nhân hết tích ra | 20/30 = 10/15 (đúng 2/3) | `rg-*` |
| Chỉ đổi mẫu số khi quy đồng | 3/8 = ?/40 điền 3 (đúng 15) | `qd-*` |
| Cùng tử số, so mẫu số ngược | 3/7 > 3/5 (đúng <) | `ss-2`, `sn-2` |
| Đảo ngược "đầu tiên" với "lớn nhất" | Mai 3/4 phút về đích đầu tiên (đúng Việt 7/12) | `so-4`, `so-5`, `sn-1` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Sáu câu `quickChecks` thay khởi động |
| So sánh | Dùng | So với 1, cùng tử số, quy đồng (`ss-*`, `so-*`, `sn-4` vượt SGK) |
| Câu tư duy (tìm lỗi) | Dùng | `sn-1`, `sn-2` tìm lỗi sai; `sn-3`, `sn-4` vượt SGK |
| Bốn kênh | Dùng một phần | Hình (tam giác, ếch), viết (số ?), nói trong Phụ huynh |
| Đếm, Tách | Không dùng | Bài ôn khái niệm, không có quy luật bước hay số lớn |

Suy nghĩ thêm (nhóm cuối):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | An cho rằng 3/4 lớn hơn nên Mai về đích đầu tiên | **Sai, Việt về đầu tiên** |
| sn-2 | trac-nghiem | 3/7 lớn hơn 3/5 vì 7 > 5? | **Sai** |
| sn-3 | dien-so | Vượt SGK: phân số bằng 2/3 có tổng tử và mẫu là 35 | **14/21** |
| sn-4 | trac-nghiem | Vượt SGK: phân số gần 1 nhất trong 7/8; 9/10; 11/12 | **11/12** |

## Phần Phụ huynh

Mục "Con học gì" nêu phạm vi và nhóm bài cần xem lại; "Lỗi con hay gặp" ghi bài nào (số bài và tên) cần xem lại theo nhóm sai; hoạt động ôn: đàn ếch bằng giấy, đua chạy bấm giờ, con ra đề; có đáp án SGK tr.107-109 (tính lại), ghi chú hai chỗ đọc từ hình cần đối chiếu.

## Phần Lý thuyết

Nhắc lại nhanh, không có animation. Hình tái dùng `HinhPhanSo` (từ `components/math/phan-so.tsx`).

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Tử số, mẫu số, đếm kỹ phần bằng nhau | 53 | `KeyFact` + `QuickCheck` có `HinhPhanSo` băng 9 ô |
| Thương của phép chia là phân số | 54 | `KeyFact` 7 : 3 = 7/3 + `QuickCheck` |
| Nhân hoặc chia cả tử và mẫu | 55 | `KeyFact` + `QuickCheck` |
| Rút gọn, phân số tối giản, rút gọn tích | 56 | `KeyFact` + `QuickCheck` |
| Quy đồng mẫu số | 57 | `KeyFact` + `QuickCheck` |
| So sánh: cùng mẫu, với 1, khác mẫu, cùng tử; "nhanh nhất" là thời gian ít nhất | 58, 59 | `KeyFact` + `QuickCheck` so-sanh |

## Phần Bài tập

Nhóm theo bài nguồn. Số liệu đổi so với SGK trừ chỗ gắn với hình (đàn ếch, cân nặng con vật, tích 7 × 9 × 13).

| Nhóm | Id | Dạng | Câu | Đáp án |
|---|---|---|---|---|
| Bài 53, 54 | kn-1 | trac-nghiem | hình 14 tam giác tô 9 (hình app tự vẽ) | **9/14** |
| | kn-2 | trac-nghiem | khung ếch tô 3/5 | **B** |
| | kn-3 | dien-so | 9 : 4 | **9/4** |
| Bài 55 | tc-1, tc-2 | dien-so | chuỗi 24/36 và 60/100 | **18, 2, 30; 20, 3, 30** (thứ tự theo ô) |
| | tc-3 | trac-nghiem | bằng 4/9 | **12/27** |
| Bài 56 | rg-1 | loi-van | 36/48, 45/75 | **3/4; 3/5** |
| | rg-2 | loi-van | rút gọn tích | **2/3; 3/7** |
| Bài 57 | qd-1 | loi-van | 3/8 và 17/40; 7/25 và 61/100 | **15; 28** |
| | qd-2 | loi-van | 3/4; 5/6 và 7/24 | **18; 20** |
| Bài 58, 59 | ss-1..3 | so-sanh | có kg, l, m | các dấu trong `soSanhRows` |
| | so-1, so-2 | trac-nghiem | ba vòi nước 3/5, 7/10, 13/20 | **vòi 2 nhiều nhất; vòi 1 ít nhất** |
| | so-3 | trac-nghiem | cân nặng con vật (số SGK) | **Vịt, Gà, Mèo, Thỏ** |
| | so-4, so-5 | trac-nghiem | chạy thi 3/4, 5/8, 7/12, 2/3 phút | **Việt; Mai** |
| | so-6, so-7 | trac-nghiem | bé hơn 1; lớn hơn 2/3 | **24/36; 7/9** |
| Suy nghĩ thêm | sn-1..4 | xem trên | | |

Gà 5/2 kg và mèo 28/8 kg không bằng nhau (2,5 và 3,5): test kiểm tra bằng nhân chéo.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: tử số, mẫu số, rút gọn, phân số tối giản, quy đồng mẫu số.
- Phân số viết dạng a/b, chưa dùng hỗn số. Kết quả lớn hơn 1 giữ phân số.
- Không dạy cộng, trừ, nhân, chia phân số trong bài này.

## Câu hỏi cần chốt

1. Hình tam giác LT1a: app dùng hình tự vẽ (14 tam giác, tô 9). Nên đối chiếu với hình sách và đổi số nếu cần.
2. Hình đàn ếch đọc từ hình sách (tô 3, 9, 7, 6): cần xem lại.
3. Chạy thi dùng số đổi (3/4, 5/8, 7/12, 2/3) thay vì số SGK. Giữ số SGK nếu muốn khớp sách.

## Phụ lục: đáp án SGK

Xem khối "Đáp án bài trong sách" trong `phu-huynh.mdx` (tr.107-109, tính lại).
