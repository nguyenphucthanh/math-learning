# Brief — Bài 15. Làm quen với dãy số tự nhiên

- SGK: Toán 4 KNTT tập một, trang 50-51, chủ đề 3 (Số có nhiều chữ số).
- Route: `/kntt-4/bai-15`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 14 (so sánh các số có nhiều chữ số). Bài sau: Bài 16 (luyện tập chung chủ đề 3). Bài ôn lại nó: Bài 16, Bài 33, Bài 37.

**Cấu trúc SGK.** Khám phá (các thẻ số 0 đến 12 trên bảng, tia số 0 đến 10, khung ba ý: dãy số tự nhiên, số 0 bé nhất và không có số lớn nhất, hai số liên tiếp hơn kém nhau 1 đơn vị) → Hoạt động 3 bài (Đ/S bốn câu; tìm số liền trước của 81, 1 991, 2 045, 10 000; sắp xếp 10 001, 9 999, 9 666, 9 998 từ bé đến lớn) → Luyện tập 4 bài (tìm số liền sau của 19, 200, 85, 9 999; ba số tự nhiên liên tiếp; điền số vào dãy có quy luật; lấy ra một tấm thẻ từ 1, 9, 5, 1, 8, 9, 0 để được số sáu chữ số lớn nhất và bé nhất).

**Mục tiêu.**

1. Nói được dãy số tự nhiên là 0, 1, 2, 3, … (bắt đầu từ 0), mỗi số hơn số liền trước 1 đơn vị.
2. Biết số tự nhiên bé nhất là 0 và không có số tự nhiên lớn nhất, giải thích được bằng "thêm 1 luôn được số lớn hơn".
3. Tìm số liền trước (bớt 1) và số liền sau (thêm 1) của một số, kể cả khi đổi hàng (9 999 → 10 000; 10 000 → 9 999).
4. Tìm ba số tự nhiên liên tiếp.
5. Nhận ra quy luật của một dãy số (hơn kém nhau 1, 2, 5 đơn vị) và điền tiếp.
6. Lấy bớt một tấm thẻ để lập số sáu chữ số lớn nhất, bé nhất từ số bảy chữ số (nối Bài 14).

**Kiến thức cần có.** Đếm, tia số, so sánh số (Bài 14), cộng thêm 1 và bớt 1 có nhớ (Bài 2). Kiểm tra bằng 3 câu khởi động.

**Điểm mấu chốt.**

- SGK nêu khung kết luận, không giải thích vì sao 0 bé nhất và không có số lớn nhất. Bài này cho con thấy trên tia số: bên trái 0 không còn số tự nhiên, bên phải thêm 1 lại có số mới.
- Chỗ dễ lẫn: dãy 1, 2, 3, … không phải dãy số tự nhiên (thiếu 0); số liền trước của 0 không có; liền trước và liền sau hơn kém nhau **2** đơn vị (không phải 1); đổi hàng khi đổi 9 999 và 10 000.
- Bẫy của SGK: Hoạt động 1a ghi "1 000 000 là số tự nhiên lớn nhất", đáp án **sai**, vì số nào cũng thêm 1 được số lớn hơn. Luyện tập 4 lấy bớt một tấm thẻ từ một số bảy chữ số, nên chữ số 0 không được đứng đầu số bé nhất.
- Thuật ngữ "liên tiếp": hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị. Không dạy "số tự nhiên khác 0" hay ký hiệu tập hợp.
- Hình đã có: tia số (Bài 13). `DayTuNhien` tự làm theo số liệu bài.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Cho là có số tự nhiên lớn nhất | "1 000 000 là số tự nhiên lớn nhất" (đúng: không có, vì 1 000 001 lớn hơn) | `DayTuNhien` bước 4 (mũi tên tiếp tục); `thu-lon-nhat`, `st-3` |
| Bắt đầu dãy từ 1 | "Dãy 1, 2, 3, … là dãy số tự nhiên" (đúng: thiếu số 0) | `DayTuNhien` bước 2 tô số 0; câu Đ/S `dt-3` |
| Nhầm liền trước và liền sau | Liền sau của 85 là 84 | Bước 3 của `DayTuNhien` đặt hai mũi tên +1 và −1 quanh một số; `thu-sau` |
| Sai khi đổi hàng | Liền sau của 9 999 là 9 1000 hoặc 10 000 viết 1 0000; liền trước của 10 000 là 9 000 hoặc 10 001 | `KeyFact` "9 999 thêm 1 là 10 000"; `thu-sau`, `thu-truoc`, `st-2` |
| Nghĩ 0 có số liền trước | Số liền trước của 0 là 1 hoặc −1 | `thu-khong`: 0 là số tự nhiên bé nhất, không có số tự nhiên liền trước |
| Điền dãy bằng cách chỉ nhìn số cuối | 2, 4, 6, 8, 9, 10 (đúng: 10, 12, 14) | Animation `QuyLuatDay` tô khoảng cách giữa hai số liền nhau trước khi điền |
| Số bé nhất bắt đầu bằng 0 | Lấy bớt tấm thẻ 9 và viết 011 589 (đúng: chữ số đầu khác 0) | Hint nhắc quy tắc Bài 14; câu `th-1` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng | Đếm thêm 1, 2, 5 trên tia số và trong dãy; là cốt lõi của dãy số tự nhiên |
| Tách | Không dùng | Bài không có phép tính hay số ghép cần tách |
| So sánh | Dùng | "Hơn kém nhau mấy đơn vị": liền trước và liền sau hơn kém nhau 2; sắp xếp 4 số gần 10 000 |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: đếm thêm 2, số liền sau của 99, số lớn nhất có ba chữ số |
| Bốn kênh | Dùng | Nói ("không có số tự nhiên nào lớn nhất"), hình (tia số, ô số), nhẩm (thêm 1, bớt 1), viết (điền số). Không thiếu kênh nào |
| Câu tư duy | Dùng | Giải thích vì sao không có số lớn nhất (`st-3`), tìm số liền trước khi mượn nhiều lần (`st-2`), đếm số các số trong một đoạn (`st-1`), số hạng thứ 10 (`st-4`) |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-dem` | dien-so | Đếm thêm 2: 2, 4, 6, ? | **8** |
| `kd-sau` | dien-so | Số liền sau của 99 | **100** |
| `kd-lon` | dien-so | Số lớn nhất có ba chữ số | **999** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-be-nhat` | trac-nghiem | Số tự nhiên bé nhất là số nào | **0** |
| `thu-lon-nhat` | trac-nghiem | Có số tự nhiên lớn nhất không | **Không, vì thêm 1 luôn được số lớn hơn** |
| `thu-sau` | dien-so | Số liền sau của 9 999 | **10 000** |
| `thu-truoc` | dien-so | Số liền trước của 10 000 | **9 999** |
| `thu-khong` | trac-nghiem | Số 0 có số tự nhiên liền trước không | **Không có** |
| `thu-quy-luat` | dien-so | Dãy 5, 10, 15, 20, ?, ? | **25, 30** |

**Vượt SGK** (nhóm Suy nghĩ thêm): `st-1` đếm có bao nhiêu số tự nhiên từ 98 đến 104 (**7 số**, không phải 6); `st-4` số hạng thứ 10 của dãy 5, 10, 15, 20, … (**50**). Lý do: nối với quy luật dãy số và chuẩn bị cho các bài tìm số hạng sau này. `st-2` và `st-3` bám sát nội dung SGK nên không vượt.

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi hay gặp là bắt đầu dãy từ 1, cho rằng có số lớn nhất, nhầm liền trước và liền sau, sai khi đổi hàng (9 999 và 10 000). Hoạt động ôn: đếm thêm 1, 2, 5 cùng con (đếm bước chân, đếm tờ tiền mệnh giá giống nhau), rồi chơi "đố số liền trước, liền sau" với số trên biển số nhà hoặc số trang sách. Dấu hiệu: con giải thích được vì sao không có số tự nhiên lớn nhất.

## Phần Lý thuyết

Chặng theo thứ tự cụ thể → hình ảnh → ký hiệu.

1. **Dãy số tự nhiên (cụ thể, hình).** Khám phá của SGK: các thẻ số 0, 1, 2, … đặt lên bảng. Animation `DayTuNhien`, 4 bước: tia số 0 đến 10; số 0 là số bé nhất (không có số tự nhiên bé hơn); số liền trước và số liền sau của 7 (hơn kém nhau 1, hai số liền trước, liền sau hơn kém nhau 2); mũi tên đi tiếp: không có số tự nhiên lớn nhất. `KeyFact`: ba ý của khung SGK. `QuickCheck` `thu-be-nhat`, `thu-lon-nhat`.
2. **Số liền trước, số liền sau.** `KeyFact`: liền sau là thêm 1, liền trước là bớt 1; 9 999 thêm 1 là 10 000; số 0 không có số liền trước. `QuickCheck` `thu-sau`, `thu-truoc`, `thu-khong`.
3. **Dãy số có quy luật.** Animation `QuyLuatDay` với dãy 5, 10, 15, 20: bốn số đã cho; mũi tên "+5" giữa các số liền nhau; ba số tiếp theo hiện ra. Thêm ví dụ dãy 2 021, 2 022, 2 023 (+1). `KeyFact`: tìm khoảng cách giữa hai số liền nhau trước, rồi điền tiếp. `QuickCheck` `thu-quy-luat`.

Bố cục 390px: `DayTuNhien` viewBox 340, 11 vạch cách đều, chữ từ 14 trở lên; `QuyLuatDay` viewBox 340, 7 ô rộng 44, chữ ô 16.

## Phần Bài tập

Nhóm theo phần SGK, đổi số liệu. Đáp án in đậm.

**Dãy số tự nhiên (Hoạt động 1, 2, 3)**

- `dt-1` `trac-nghiem` (Đ/S): "Số 5 000 000 000 là số tự nhiên lớn nhất" → **Sai**
- `dt-2` `trac-nghiem` (Đ/S): "Số 0 là số tự nhiên" → **Đúng**
- `dt-3` `trac-nghiem` (Đ/S): "Dãy số 2, 3, 4, 5, … là dãy số tự nhiên" → **Sai**
- `dt-4` `trac-nghiem` (Đ/S): "Số liền sau của một số lớn hơn số liền trước của số đó 2 đơn vị" → **Đúng**
- `dt-5` `loi-van`: số liền trước của 270, 3 000, 54 321, 1 000 000 → **269; 2 999; 54 320; 999 999**
- `dt-6` `dien-so`: sắp xếp 100 000; 99 990; 99 909; 100 100 từ bé đến lớn → **99 909 < 99 990 < 100 000 < 100 100**

**Số liền trước, số liền sau, dãy số (Luyện tập 1, 2, 3)**

- `lt-1` `loi-van`: số liền sau của 38, 99, 8 999, 999 999 → **39; 100; 9 000; 1 000 000**
- `lt-2` `loi-van`: ba số liên tiếp: 24, 25, ? → **26**; 1 998, ?, 2 000 → **1 999**; ?, 1 000 000, ? → **999 999 và 1 000 001**
- `lt-3` `loi-van`: dãy 2 021, 2 022, 2 023, ?, ?, ? → **2 024; 2 025; 2 026**; 3, 6, 9, 12, ?, ?, ? → **15; 18; 21**; 10, 20, 30, 40, ?, ?, ? → **50; 60; 70**; 7, 9, 11, 13, ?, ?, ? → **15; 17; 19**

**Lập số từ thẻ (Luyện tập 4)**

- `th-1` `dien-so`: các thẻ 2, 6, 0, 4, 7, 1, 3 ghép được 2 604 713; lấy ra một tấm thẻ để được số sáu chữ số lớn nhất → **764 321**; bé nhất → **102 346**

**Suy nghĩ thêm**

- `st-1` `dien-so` *(vượt SGK)*: từ 98 đến 104 (kể cả hai đầu) có mấy số tự nhiên → **7**
- `st-2` `trac-nghiem`: số liền trước của 40 000 → **39 999**
- `st-3` `trac-nghiem`: có số tự nhiên lớn nhất không → **Không, vì cộng thêm 1 luôn được số lớn hơn**
- `st-4` `dien-so` *(vượt SGK)*: số hạng thứ 10 của dãy 5, 10, 15, 20, … → **50**

## Kỹ thuật

- Thêm `DayTuNhien` và `QuyLuatDay` trong `_animations/` (client). Đáp án trong test tính lại bằng phép cộng, trừ và duyệt mọi cách bỏ một thẻ (`withoutOneCard` của `lib/so-sanh.ts`), không so với số gõ tay.
- Không thêm dạng bài (Đ/S dùng `trac-nghiem` như Bài 26, 32, 34, 35), đơn vị, màu.
- `lib/lessons.ts`: đặt `available` của Bài 15 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **số tự nhiên**, **dãy số tự nhiên**, **số liền trước**, **số liền sau**, **liên tiếp**, **hơn kém nhau 1 đơn vị**, **số tự nhiên bé nhất**, **số tự nhiên lớn nhất**.
- Số viết tách lớp bằng NBSP.
- Không dạy: tập hợp số tự nhiên, ký hiệu ℕ, số nguyên âm, cấp số cộng.

## Câu hỏi cần chốt

1. Câu Đ/S dùng `trac-nghiem` hai lựa chọn Đúng/Sai? Đề xuất: **có**, đúng cách các bài trước đã làm.
2. Thêm hai câu vượt SGK `st-1`, `st-4`? Đề xuất: **giữ**, đặt cuối nhóm và ghi rõ trong brief.
3. Hoạt động 1a của SGK ("1 000 000 là số tự nhiên lớn nhất") đổi số trong app (5 000 000 000)? Đề xuất: **đổi**, vẫn là câu Sai, đáp án giữ nguyên ý.
4. Số liền trước của 0: nói thẳng "không có số tự nhiên liền trước" thay vì để con đoán? Đề xuất: **nói thẳng** trong `KeyFact` và `thu-khong`.

## Phụ lục: đáp án SGK

**Trang 50**

- Khám phá: số tự nhiên bé nhất là 0; không có số tự nhiên lớn nhất; hai số liên tiếp hơn kém nhau 1 đơn vị.
- Hoạt động 1: a) **Sai** (không có số tự nhiên lớn nhất); b) **Sai** (dãy bắt đầu từ 0); c) **Đúng**; d) **Đúng** (liền trước kém số đó 1, liền sau hơn số đó 1, hơn kém nhau 2).

**Trang 51**

- Hoạt động 2: liền trước của 81 là **80**; của 1 991 là **1 990**; của 2 045 là **2 044**; của 10 000 là **9 999**.
- Hoạt động 3: **9 666 < 9 998 < 9 999 < 10 001**.
- Luyện tập 1: liền sau của 19 là **20**; của 200 là **201**; của 85 là **86**; của 9 999 là **10 000**.
- Luyện tập 2: a) 6, 7, **8**; b) 98, **99**, 100; c) **99 999**, 100 000, **100 001**.
- Luyện tập 3: a) 1 969, 1 970, 1 971, 1 972, **1 973, 1 974, 1 975**; b) 2, 4, 6, 8, **10, 12, 14**; c) 1, 3, 5, 7, 9, **11, 13, 15**; d) 5, 10, 15, 20, 25, **30, 35, 40**.
- Luyện tập 4: a) số sáu chữ số lớn nhất **998 511** (lấy ra thẻ 0); b) số sáu chữ số bé nhất **101 589** (lấy ra một thẻ 9). Đáp án tính lại bằng cách thử bỏ từng thẻ, không lấy từ sách.
