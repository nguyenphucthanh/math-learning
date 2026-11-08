# Brief — Bài 1. Ôn tập các số đến 100 000

- SGK: Toán 4 KNTT, tập một, trang 6-8, Chủ đề 1 "Ôn tập và bổ sung".
- Route: `/kntt-4/bai-1`
- Trạng thái: chờ duyệt

## Đánh giá

**Vị trí bài.** Bài mở đầu của cả sách. Không có bài trước trong app; kiến thức nền là Toán 3 (các số đến 100 000). Bài sau là Bài 2 (ôn các phép tính trong phạm vi 100 000). Bài 10-14 (số có sáu chữ số, hàng và lớp, so sánh số có nhiều chữ số) sẽ mở rộng đúng những điều ở đây, nên bài này phải làm chắc: hàng, giá trị theo hàng, so sánh, tia số.

**Cấu trúc SGK.** Không có phần Khám phá hay Hoạt động. Chỉ có hai khối "Luyện tập":

- Tr.6-7, 5 bài: điền bảng hàng và cách đọc số (1), viết số từ các hàng (2), phân tích số thành tổng (3), tia số (4), số liền trước/liền sau (5).
- Tr.7-8, 5 bài: so sánh số (1), chọn đáp án đúng gồm số bé nhất, chữ số hàng trăm, làm tròn đến hàng nghìn (2), nối biểu thức với số (3), bài toán thực tế về số liều vắc-xin (4), đố em que tính (5).

Vì SGK chỉ có bài tập, phần Lý thuyết của app là "Nhắc lại nhanh" (theo quy tắc bài ôn tập), không dạy từ đầu.

**Mục tiêu**

1. Đọc và viết được số có đến năm chữ số, kể cả số có chữ số 0 ở giữa (đọc "không trăm", "linh").
2. Nói được chữ số ở mỗi hàng, và giá trị của chữ số đó (vd. chữ số 3 trong 36 515 là 30 000).
3. Phân tích được số thành tổng các hàng, bỏ qua hàng có chữ số 0.
4. Điền được số còn thiếu trên tia số có bước nhảy 1 và 10 000; nêu được số liền trước và số liền sau (kể cả 99 999 → 100 000).
5. So sánh được hai số (và số với tổng các hàng); sắp xếp được bốn số theo thứ tự.
6. Làm tròn được số có năm chữ số đến hàng nghìn.

**Kiến thức cần có.** Hàng đơn vị, chục, trăm, nghìn, chục nghìn (Toán 3); cộng nhẩm các số tròn chục, tròn trăm, tròn nghìn.

**Điểm mấu chốt**

- SGK không giải thích cách đọc chữ số 0 và các từ đặc biệt (mốt, tư, lăm). Bảng ở tr.6 dùng cả "không trăm ba mươi tư" (không trăm, không chục) lẫn "linh chín" (chục là 0, đơn vị khác 0). Con hay đọc lẫn hoặc bỏ mất chữ số 0.
- Bài 3 (phân tích) có hàng chữ số 0 (86 209 thiếu hàng chục): con hay điền sai khi tổng thiếu một hạng.
- Bài 1 (so sánh) mỗi câu bẫy một kiểu: ít chữ số hơn (9 897 so với 10 000), chữ số đầu bằng nhau nên phải đi tiếp (68 534 và 68 499), và so với tổng chưa viết thành số (45 031 so với 45 130, hai số khác nhau do đổi chỗ chữ số).
- Bài 2c (làm tròn) chưa có bài giảng riêng trong tr.6-8. Cần nhắc quy tắc: nhìn chữ số ở hàng ngay bên phải; từ 5 trở lên thì làm tròn lên.
- Bài 5 (số liền sau của 99 999) dẫn sang số sáu chữ số 100 000; chỉ cần biết số đó, chưa dạy cách đọc (Bài 10).
- Bài 5 (đố em) là que tính xếp số kiểu bảy đoạn; đây là câu thử thách, không bắt buộc.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Bỏ chữ số 0 khi viết số | "chín mươi tư nghìn không trăm linh sáu" viết 946 (đúng 94 006) | `BangHang` hiện cả ô hàng trống và ô số 0; câu A6, E2 |
| Đọc sai chữ số 0 | 65 040 đọc "sáu mươi lăm nghìn không trăm linh bốn" (đúng: không trăm bốn mươi) | `KeyFact` về "không trăm"/"linh"; câu nối A7 |
| Xác định sai hàng | chữ số hàng trăm của 76 340 là 6 (đúng 3, số 6 ở hàng nghìn) | Bảng hàng có đủ tên hàng; câu D3 |
| Điền thiếu/ thừa hạng khi phân tích | 80 906 = 80 000 + 90 + 6 (đúng 900) | `BangHang` bước 2 hiện giá trị từng chữ số; câu B4 |
| Số liền trước/liền sau sai khi đổi hàng | liền trước của 40 000 là 30 999 (đúng 39 999); liền sau của 99 999 là 99 1000 hoặc 100 (đúng 100 000) | Tia số; câu C4-C6 |
| So sánh không đi từ hàng cao nhất | 45 031 > 45 130 vì chữ số cuối 1 > 0 (đúng: 45 031 < 45 130, hàng trăm 0 < 1) | `SoSanh`: đi từ hàng cao nhất, dừng ở chữ số khác nhau đầu tiên |
| Làm tròn nhìn sai hàng | 24 618 làm tròn đến nghìn thành 24 000 (đúng 25 000) | `LamTron` tia số; câu D4, D5 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng, vừa | Tia số bước 1 và bước 10 000: tìm bước nhảy trước khi điền (mục tiêu 4) |
| Tách | Dùng, nhiều | Phân tích số thành tổng các hàng; cùng ý với "giá trị của chữ số" (mục tiêu 2, 3) |
| So sánh | Dùng, vừa | Quy tắc so sánh từ hàng cao nhất; so số với tổng (mục tiêu 5) |
| Kiểm tra đầu vào | Dùng, nhẹ | 3 câu khởi động về số trong phạm vi 10 000 (Toán 3) trước khi sang 5 chữ số |
| Bốn kênh | Dùng | Nói: con đọc to số; hình: bảng hàng, tia số; nhẩm: số liền trước/sau, so sánh; viết: điền số, phân tích. Không thiếu kênh nào |
| Câu tư duy | Dùng, nhẹ | "Tìm lỗi sai" (E2) cho lỗi bỏ chữ số 0; câu que tính (E1) |
| Không dùng | | Ước lượng: bài tập chưa có phép tính nên chưa có gì để ước lượng |

**Khởi động** (đầu Lý thuyết)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| warm-1 | dien-so | 3 nghìn, 4 trăm, 2 chục và 7 đơn vị. Viết số | **3 427** |
| warm-2 | dien-so | Số liền sau của 2 999 | **3 000** |
| warm-3 | trac-nghiem | Số lớn hơn: 4 560 hay 4 506 | **4 560** |

**Câu thử trong Lý thuyết** (QuickCheck, xem mục Lý thuyết).

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| E1 | dien-so | Que tính xếp số 48 369: chuyển chỗ một que để được số bé nhất | **40 368** |
| E2 | dien-so | Bạn An viết "ba mươi nghìn năm trăm" thành 3 500. Số đúng là | **30 500** |
| E3 | dien-so | **Vượt SGK.** Dùng các chữ số 3, 0, 7, 5, 9, mỗi chữ số một lần: số lớn nhất / bé nhất | **97 530** / **30 579** |

E3 vượt SGK vì tr.6-8 chưa có câu lập số; thêm vào để con gặp bẫy "chữ số 0 không đứng đầu", là nền cho Bài 10-14. E1: em đã tính lại bằng cách thử mọi cách chuyển một que (kiểu bảy đoạn) cho cả số của SGK (28 569 → 20 568) và số đổi (48 369 → 40 368).

## Phần Phụ huynh

1. **Con học gì trong bài này.** Ôn lại đọc, viết, so sánh số đến 100 000 từ lớp 3; chưa có kiến thức mới (trừ làm quen số 100 000).
2. **Con cần biết gì trước.** Các hàng đến hàng nghìn; cộng nhẩm số tròn.
3. **Cách giải thích cho con.** Dùng "bảng hàng": viết từng chữ số vào cột. Hàng không có thì ghi 0 trong cột, đọc theo từng lớp. So sánh: đếm số chữ số trước, rồi so từ trái sang phải.
4. **Lỗi hay gặp.** Bỏ chữ số 0 khi viết số; nhầm hàng trăm với hàng nghìn; làm tròn nhìn sai chữ số. Gợi ý cách gỡ: cho con viết số vào bảng hàng.
5. **Hoạt động ôn 10 phút.** Dùng số điện thoại, giá tiền trên bảng giá, số nhà; cho con đọc to rồi nói chữ số hàng trăm là gì. Cho con làm tròn giá tiền đến nghìn đồng.
6. **Dấu hiệu con đã nắm bài.** Đọc đúng số có chữ số 0 ở giữa; nêu được số liền trước và liền sau của 40 000; giải thích được vì sao 9 897 < 10 000.

Đáp án SGK nằm trong khối "Xem đáp án" (xem Phụ lục).

## Phần Lý thuyết

Nhắc lại nhanh, theo thứ tự các câu hỏi hay gặp. Nguồn kiến thức: Toán 3, "Các số đến 100 000".

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Hàng của số 5 chữ số, đọc và viết số, chữ số 0 | Toán 3 | `BangHang` + `KeyFact` |
| Giá trị của chữ số, phân tích số thành tổng | Toán 3 | `BangHang` (bước 2) + `KeyFact` |
| Tia số, số liền trước/liền sau | Toán 3 | `TiaSo` + `KeyFact` |
| So sánh hai số | Toán 3 | `SoSanh` + `KeyFact` |
| Làm tròn đến hàng nghìn | Toán 3 | `LamTron` + `KeyFact` |

**Chặng 1. Hàng, đọc số, viết số.** Một ý: mỗi chữ số có chỗ của nó, hàng nào không có thì ghi 0.
- Animation `BangHang` (3 bước, 360px): ví dụ 36 515. Bước 1 các chữ số vào bảng hàng; bước 2 hiện giá trị 30 000, 6 000, 500, 10, 5; bước 3 đọc số. Dùng lại hình (khác bước) cho 20 809 để thấy ô số 0.
- `KeyFact`: "Hàng nào không có chữ số thì ghi 0. Đọc: 20 809 là hai mươi nghìn tám trăm linh chín."
- `QuickCheck`: viết số "bốn mươi nghìn bảy trăm linh hai" → **40 702**; chữ số hàng chục của 52 076 → **7**.

**Chặng 2. Phân tích số thành tổng.** Một ý: tổng các giá trị của chữ số; hàng có chữ số 0 thì bỏ.
- Hình tái dùng `BangHang`, không thêm animation. Ví dụ 20 809 = 20 000 + 800 + 9.
- `KeyFact`: "36 515 = 30 000 + 6 000 + 500 + 10 + 5".
- `QuickCheck`: 63 750 = 60 000 + 3 000 + 700 + ? → **50**.

**Chặng 3. Tia số, số liền trước và liền sau.** Một ý: nhìn khoảng cách giữa hai vạch để biết bước nhảy.
- Animation `TiaSo` (3 bước): bước 1 tia số có bước nhảy 1, hiện mũi tên "+1" từng đoạn; bước 2 hỏi số ở vạch tiếp theo; bước 3 tia số bước nhảy 10 000 (20 000, 30 000...). Bố cục 390px: 6-7 vạch, cỡ chữ 14.
- `KeyFact`: "Liền sau: cộng 1. Liền trước: bớt 1. Liền sau của 99 999 là 100 000."
- `QuickCheck`: liền trước của 70 000 → **69 999**.

**Chặng 4. So sánh.** Một ý: so từ hàng cao nhất, dừng ở chữ số khác nhau đầu tiên.
- Animation `SoSanh` (3 bước): so 52 361 và 52 348; bước 1 đếm chữ số (đều 5 chữ số); bước 2 tô từng cặp chữ số từ trái sang (5, 2, 3 bằng nhau); bước 3 hàng chục khác nhau: 6 > 4 nên 52 361 > 52 348.
- `KeyFact`: "Nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từ trái sang phải."
- `QuickCheck`: 9 764 ? 10 000 → **<**. (Dùng `trac-nghiem` nếu chưa thêm `so-sanh`.)

**Chặng 5. Làm tròn đến hàng nghìn.** Một ý: nhìn chữ số hàng trăm.
- Animation `LamTron` (3 bước): đoạn tia số 15 000 — 16 000 có điểm giữa 15 500; bước 1 đặt 15 720; bước 2 so với điểm giữa; bước 3 chọn 16 000.
- `KeyFact`: "Làm tròn đến hàng nghìn: nhìn chữ số hàng trăm. Từ 5 trở lên thì làm tròn lên, bé hơn 5 thì giữ nguyên."
- `QuickCheck`: làm tròn 15 280 đến hàng nghìn → **15 000**.

## Phần Bài tập

Nhóm theo phần SGK. Số liệu đổi so với SGK; đáp án in đậm.

### Nhóm 1. Đọc và viết số (tr.6, bài 1, 2)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| A1 | dien-so | Số 52 076: chữ số hàng chục nghìn, nghìn, trăm, chục, đơn vị | **5, 2, 0, 7, 6** |
| A2 | dien-so | Hàng chục nghìn 9, nghìn 1, trăm 0, chục 3, đơn vị 5. Viết số | **91 035** |
| A3 | trac-nghiem | Số 52 076 đọc là: (A) năm mươi hai nghìn không trăm bảy mươi sáu; (B) năm mươi hai nghìn bảy mươi sáu; (C) năm mươi hai nghìn bảy trăm sáu mươi; (D) năm mươi hai nghìn không trăm linh sáu | **A** |
| A4 | dien-so | "ba mươi nghìn bốn trăm linh bảy" viết số | **30 407** |
| A5 | dien-so | Viết số: 6 chục nghìn, 4 trăm, 8 chục và 2 đơn vị | **60 482** |
| A6 | dien-so | Viết số: 9 chục nghìn, 4 nghìn và 6 đơn vị | **94 006** |
| A7 | noi-cap | Nối số với cách đọc: 6 504; 65 004; 65 040; 60 540 | 6 504: sáu nghìn năm trăm linh bốn; 65 004: sáu mươi lăm nghìn không trăm linh bốn; 65 040: sáu mươi lăm nghìn không trăm bốn mươi; 60 540: sáu mươi nghìn năm trăm bốn mươi |

### Nhóm 2. Phân tích số thành tổng (tr.6 bài 3; tr.8 bài 3)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| B1 | dien-so | 7 394 = 7 000 + 300 + 90 + ? | **4** |
| B2 | dien-so | 45 218 = 40 000 + 5 000 + ? + 10 + 8 | **200** |
| B3 | dien-so | 63 750 = 60 000 + 3 000 + 700 + ? | **50** |
| B4 | dien-so | 80 906 = 80 000 + ? + 6 | **900** |
| B5 | noi-cap | Tìm số còn thiếu rồi nối biểu thức với số: 5 000 + ? + 80 + 2; 50 000 + 4 000 + 20 + ?; ? + 500 + 80 + 6; 8 000 + 900 + ? | 5 482 (? = 400); 54 028 (? = 8); 40 586 (? = 40 000); 8 905 (? = 5) |

### Nhóm 3. Tia số, số liền trước và liền sau (tr.7 bài 4, 5)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| C1 | dien-so + illustration | Tia số bước nhảy 1: 24 391, 24 392, 24 393, ①, 24 395, ②, ③, 24 398 | **24 394, 24 396, 24 397** |
| C2 | dien-so + illustration | Tia số: 20 000, 30 000, ①, 50 000, ②, ③, 80 000, ④ | **40 000, 60 000, 70 000, 90 000** |
| C3 | dien-so | Số liền trước và liền sau của 63 280 | **63 279; 63 281** |
| C4 | dien-so | Số liền trước và liền sau của 70 000 | **69 999; 70 001** |
| C5 | dien-so | Số liền trước và liền sau của 99 999 | **99 998; 100 000** |
| C6 | trac-nghiem | Số liền trước của 40 000: (A) 39 999 (B) 39 000 (C) 30 999 (D) 40 001 | **A** |

`illustration` của C1, C2 là hình tia số (SVG) đặt trong `_illustrations/`, ô trống đánh số ①②③ và các ô nhập bên dưới đề.

### Nhóm 4. So sánh và làm tròn (tr.7 bài 1, 2; tr.8 bài 4)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| D1 | so-sanh | 9 764 ? 10 000; 74 215 ? 74 189; 45 000 ? 44 986; 6 372 ? 6 000 + 300 + 70 + 2; 53 026 ? 50 000 + 3 000 + 200 + 60; 80 107 ? 70 000 + 9 000 + 900 + 9 | **<; >; >; =; <; >** (53 260; 79 909) |
| D2 | trac-nghiem | Số bé nhất trong 31 509, 29 874, 30 998, 29 784 | **29 784** |
| D3 | trac-nghiem | Số có chữ số hàng trăm là 6: (A) 76 340 (B) 45 962 (C) 90 613 (D) 28 156 | **C** |
| D4 | trac-nghiem | Số dân 24 618 người làm tròn đến hàng nghìn: (A) 24 000 (B) 25 000 (C) 24 600 (D) 24 700 | **B** |
| D5 | dien-so | Làm tròn 38 472 đến hàng nghìn | **38 000** |
| D6 | trac-nghiem | Thứ Hai 41 305, Thứ Ba 39 872, Thứ Tư 40 960, Thứ Năm 38 456 liều vắc-xin. Ngày tiêm nhiều nhất | **Thứ Hai** |
| D7 | trac-nghiem | Sắp xếp ngày từ ít đến nhiều: (A) Năm, Ba, Tư, Hai (B) Hai, Tư, Ba, Năm (C) Năm, Ba, Hai, Tư (D) Ba, Năm, Tư, Hai | **A** |

### Nhóm 5. Suy nghĩ thêm

E1, E2, E3 ở mục "Tư duy" trên. E1 dùng hình que tính SVG (`_illustrations/`); E3 ghi vượt SGK trong tiêu đề nhóm.

## Kỹ thuật

- Dạng `so-sanh` mới (câu D1): một câu có nhiều hàng, mỗi hàng chọn một trong `>`, `<`, `=` bằng ba nút lớn; dữ liệu `rows: { left, right, answer }[]` (xem câu hỏi 1). Có test cho renderer và test đáp án tính lại bằng phép tính.
- Animation riêng trong `_animations/`: `BangHang` (bảng 5 hàng, không lớp, để không lẫn với `BangHangLop` của Bài 11, 33-37), `TiaSo`, `SoSanh`, `LamTron`. `BangHang` và `TiaSo` có thể chuyển lên `components/math/` khi Bài 10-14 dùng lại.
- `lib/lessons.ts`: đặt `available` của Bài 1 thành `true`.
- Không cần thư viện đơn vị, token màu hay đơn vị `KeyFact` mới. `KeyFact` dùng không `unit`.
- Test: `bai-tap.test.ts` (đáp án tính lại, gồm làm tròn, số liền trước/liền sau, so sánh, phân tích tổng), `lesson-ui.test.tsx` (bấm hết các bước của 4 animation).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "hàng chục nghìn", "số liền trước/liền sau", "làm tròn đến hàng nghìn", "phân tích". Không dùng từ "lớp" (chưa học).
- Số lượng viết tách lớp bằng NBSP: 36 515, 100 000. Số có bốn chữ số cũng tách: 6 504. Năm không xuất hiện.
- Cách đọc theo SGK: "không trăm ba mươi tư", "linh chín", "mốt", "tư", "lăm".
- Không dạy: số sáu chữ số ngoài 100 000, làm tròn đến hàng chục nghìn, cộng trừ nhân chia.

## Câu hỏi cần chốt

1. **Thêm dạng `so-sanh` hay dùng `trac-nghiem`?** Đề xuất: thêm `so-sanh`. Câu D1 có 6 phép so sánh; làm bằng `trac-nghiem` sẽ thành 6 câu và nặng tay. Dạng này còn dùng lại ở Bài 14. Phương án còn lại ít việc hơn nhưng bài tập dài.
2. **Bốn animation hay ít hơn?** Đề xuất: giữ cả 4 (`BangHang`, `TiaSo`, `SoSanh`, `LamTron`), mỗi cái 3 bước và ngắn, vì đây là bài ôn nên con sẽ lướt nhanh. Nếu muốn gọn, bỏ `SoSanh` và `LamTron` thành `KeyFact` + hình tĩnh.
3. **Câu E3 vượt SGK có giữ không?** Đề xuất: giữ ở nhóm "Suy nghĩ thêm", vì chuẩn bị cho Bài 10-14 và bẫy chữ số 0 đứng đầu. Bỏ nếu muốn bám sát SGK.
4. **Câu E1 que tính vẽ bằng SVG bảy đoạn.** Đề xuất: giữ, vì SGK có đúng dạng này; hình là SVG tĩnh trong `_illustrations/`, câu trả lời gõ số. Có thể bỏ nếu muốn nhẹ hơn.

## Phụ lục: đáp án SGK

**Trang 6 — Luyện tập**

1. Hàng 2: 61 034 (hàng nghìn 1, đơn vị 4). Hàng 3: 7 941 (hàng chục nghìn để trống, chục 4, đơn vị 1). Hàng 4: 20 809 (chục nghìn 2, trăm 8, chục 0).
2. a) 42 530 (mẫu bạn nhỏ trong hình, đọc "bốn mươi hai nghìn năm trăm ba mươi"); b) 8 888; c) 50 714; d) 94 005.
3. a) 5; b) 400; c) 50; d) 200.

**Trang 7 — Luyện tập**

4. a) 17 598, 17 600, 17 601; b) 50 000, 70 000, 80 000, 100 000.
5. 42 135: 42 134 và 42 136. 80 000: 79 999 và 80 001. 99 999: 99 998 và 100 000.

**Trang 7 — Luyện tập (tiếp)**

1. a) 9 897 < 10 000; 68 534 > 68 499; 34 000 > 33 979. b) 8 563 = 8 000 + 500 + 60 + 3; 45 031 < 45 130 (45 000 + 100 + 30); 70 208 > 69 709 (60 000 + 9 000 + 700 + 9).
2. a) C (15 999); b) D (39 825); c) B (13 000).

**Trang 8 — Luyện tập (tiếp)**

3. 6 000 + 500 + 40 + 7 = 6 547; 30 000 + 5 000 + 800 + 2 = 35 802; 50 000 + 700 + 30 + 8 = 50 738; 90 000 + 6 000 + 40 + 1 = 96 041.
4. a) Nhiều nhất: Thứ Tư (37 243 liều); ít nhất: Thứ Năm (29 419 liều). b) Thứ Năm, Thứ Ba, Thứ Hai, Thứ Tư.
5. Lấy que tính ở giữa của chữ số 8 đặt vào chữ số 9 (để 9 thành 8): 28 569 → 20 568. (Đã kiểm tra bằng cách thử mọi cách chuyển một que; không có số bé hơn. Lưu ý: giả định que xếp kiểu bảy đoạn như hình trong SGK, chưa đối chiếu ảnh gốc từng que.)
