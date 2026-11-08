# Brief — Bài 2. Ôn tập các phép tính trong phạm vi 100 000

- SGK: Toán 4 KNTT tập một, trang 9-11, chủ đề 1 (Ôn tập và bổ sung).
- Route: `/kntt-4/bai-2`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 1 (ôn các số đến 100 000, chính là số dùng trong bài này). Bài sau: Bài 3 (số chẵn, số lẻ). Bài ôn lại nó: Bài 34 (ôn phép cộng, trừ), Bài 37 (ôn tập chung).

**Cấu trúc SGK.** Không có Khám phá, không có Hoạt động. Ba trang Luyện tập: trang 9 (4 bài: tính nhẩm cộng trừ, đặt tính cộng trừ, biểu thức, toán lời văn), trang 10 (4 bài: phép tính cùng kết quả, đặt tính nhân chia, toán lời văn, biểu thức nhân chia), trang 11 (4 bài: chọn đáp án, toán lời văn, biểu thức, toán lời văn).

**Mục tiêu.**

1. Tính nhẩm cộng, trừ số tròn nghìn và tròn chục nghìn.
2. Đặt tính rồi tính cộng, trừ có nhớ, kể cả trừ qua chữ số 0.
3. Đặt tính rồi tính nhân với số có một chữ số, có nhớ và có chữ số 0.
4. Đặt tính rồi tính chia cho số có một chữ số, có dư, thương có chữ số 0.
5. Tính giá trị biểu thức có ngoặc và có nhiều phép tính (nhân, chia trước; cùng cấp từ trái sang phải).
6. Giải bài toán hai bước dùng “nhiều hơn”, “gấp lên”, “giảm đi … lần”, “chia đều”.

**Kiến thức cần có.** Số trong phạm vi 100 000 (Bài 1); bảng nhân, bảng chia 2-9 (lớp 3); chia có dư ở lớp 3.

**Điểm mấu chốt.**

- SGK không có phần giải thích, chỉ có bài tập. Ba kĩ thuật hay sai nhất (nhân có nhớ, chia hạ từng chữ số, thứ tự phép tính) được nhắc lại trong Lý thuyết bằng animation.
- Chỗ dễ lẫn với bài vừa học: Bài 1 chỉ có số, bài này mới tính. Lỗi nhìn nhầm hàng ở Bài 1 lặp lại khi đặt tính lệch cột.
- Bẫy của SGK: trang 11 bài 1d có đáp án nhiễu số dư 10 (không bé hơn số chia 9). Trang 11 bài 2 dùng “giảm đi 2 lần” nên con dễ trừ 2. Trang 10 bài 4a (6 000 × 5 : 3) kiểm tra cùng cấp từ trái sang phải.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Quên số nhớ khi nhân | 4 062 × 8 viết 32 086 (đúng 32 496) | Animation `NhanDatTinh`: số nhớ hiện thành chấm vàng phía trên cột kế |
| Nhân chữ số 0 xong bỏ luôn số nhớ | 2 807 × 6: cột 0 viết 0 (đúng 4) | Animation chọn đúng ví dụ 2 807 × 6 có 0 ở giữa; lời đọc “0 nhân 6 bằng 0, thêm 4 bằng 4” |
| Bỏ chữ số 0 ở thương | 72 056 : 8 = 907 (đúng 9 007) | Animation `ChiaDatTinh` ví dụ 8 305 : 4 có bước thương 0; câu `nc-4`; nhắc thử lại bằng phép nhân |
| Số dư không bé hơn số chia | 62 835 : 7 = 8 975 dư 10 | Câu `tn-4` có đáp án nhiễu này; KeyFact “số dư bé hơn số chia” |
| Làm sai thứ tự phép tính | 24 000 − 4 000 × 3 = 60 000 (đúng 12 000) | KeyFact thứ tự; câu `sn-2` tìm lỗi sai |
| Nhầm “giảm đi 3 lần” với “bớt 3” | 14 760 − 3 | Sơ đồ `SoDoLan`; QuickCheck `thu-giam-lan`; câu `bt-do-choi` |
| Trừ qua chữ số 0 | 42 061 − 953: quên bớt 1 ở hàng chục | Hình `DatTinh` trừ 38 502 − 6 847; câu `ct-3` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Dùng đầy đủ | Tính nhẩm theo “mấy nghìn”: 8 000 + 7 000 = 8 nghìn + 7 nghìn (mục tiêu 1) |
| So sánh | Nhẹ | Sơ đồ “gấp” và “giảm đi”: một phần so với nhiều phần (mục tiêu 6, lỗi “giảm đi 3 lần”) |
| Kiểm tra đầu vào | Dùng | Bảng nhân, nhẩm nghìn, chia có dư (bài dựa nhiều vào kiến thức cũ) |
| Bốn kênh | Rà đủ | Nói: lời đọc từng cột; hình: animation; nhẩm: nhóm tính nhẩm; viết: đặt tính ra vở. Không thiếu kênh nào |
| Câu tư duy | Dùng | Ước lượng và tìm lỗi sai, gắn với lỗi sai thứ tự phép tính và kết quả lệch bậc |
| Đếm | Không dùng | Bài không có quy luật theo bước hay dãy số |

**Khởi động (3 câu, tối đa 3 phút).**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-nham | dien-so | 6 000 + 7 000 | **13 000** |
| kd-nhan | dien-so | 4 × 8; 3 × 7 | **32; 21** |
| kd-chia-du | dien-so | 23 : 4 | **5 dư 3** |

**Suy nghĩ thêm (Vượt SGK: tìm lỗi sai và ước lượng không có trong sách, thêm để con hiểu sâu thứ tự phép tính và tự kiểm tra kết quả).**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | Phép tính khác ba phép còn lại: 60 000 : 2; 5 000 × 6; 10 000 × 3; 8 000 × 4 (mượn ý trang 10 bài 1) | **8 000 × 4** |
| sn-2 | trac-nghiem | Nam tính 24 000 − 4 000 × 3 = 60 000, sai ở đâu | **Phải nhân trước, đúng là 12 000** |
| sn-3 | trac-nghiem | Ước lượng 4 987 × 6 | **30 000** |

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi quên số nhớ, bỏ 0 ở thương, số dư lớn hơn số chia, sai thứ tự phép tính, nhầm “giảm đi lần”. Hoạt động ôn: đi chợ (3 hộp sữa, tiền thối), chia kẹo có dư, nhẩm nghìn khi đi xe. Dấu hiệu: giải thích được vì sao 24 000 − 4 000 × 3 phải nhân trước. Đáp án trang 9-11 trong `Fold`.

## Phần Lý thuyết

Bài ôn tập nên Lý thuyết là “Nhắc lại nhanh” (5 điểm), không dạy lại từ đầu. Hai animation tự viết vì kĩ thuật hay sai.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| 1. Cộng, trừ, nhẩm nghìn | Toán 3 | `DatTinh` tĩnh 38 502 − 6 847; `KeyFact` “Thẳng hàng từ phải sang trái”; `QuickCheck` 6 428 + 3 795 |
| 2. Nhân với số có một chữ số | Toán 3 | `NhanDatTinh` 2 807 × 6 (6 bước, số nhớ hiện dần); `KeyFact` “Nhân từng chữ số, nhớ sang trái”; `QuickCheck` 2 305 × 4 |
| 3. Chia cho số có một chữ số | Toán 3 | `ChiaDatTinh` 8 305 : 4 (6 bước: chia, nhân, trừ, hạ); `KeyFact` “Chia, nhân, trừ, hạ”; `QuickCheck` 7 018 : 3 |
| 4. Thứ tự thực hiện phép tính | Toán 3 | Ba ví dụ ngắn; `KeyFact` “Ngoặc → nhân, chia → cộng, trừ”; `QuickCheck` 5 000 + 6 000 × 2 |
| 5. Bài toán hơn, gấp, giảm đi | Toán 3 | `SoDoLan` (1 phần so với 4 phần); `KeyFact` “Gấp: nhân. Giảm đi: chia”; `QuickCheck` giảm đi 3 lần |

Bố cục 390px: `viewBox` 340 rộng (nhân) và 360 rộng (chia). Phép chia 4 chữ số cao khoảng 380 đơn vị, vừa một màn hình cuộn.

## Phần Bài tập

Nhóm theo trang SGK, giữ dạng và độ khó, đổi số liệu. Tổng 32 câu.

| Nhóm | Câu (dạng, đáp án) |
|---|---|
| Tính nhẩm (trang 9) | nham-1…6: 7 000 + 6 000 = **13 000**; 15 000 − 8 000 = **7 000**; 24 000 + 40 000 = **64 000**; 38 000 + 2 000 + 9 000 = **49 000**; 82 000 − 2 000 − 60 000 = **20 000**; 41 000 + 6 000 − 18 000 = **29 000** (dien-so) |
| Đặt tính cộng, trừ (trang 9) | ct-1…4 (dat-tinh): 7 365 + 5 487 = **12 852**; 47 538 + 36 094 = **83 632**; 42 061 − 953 = **41 108**; 83 417 − 25 169 = **58 248** |
| Biểu thức (trang 9, 10, 11) | bt-1…6 (dien-so): 63 480 − (35 420 − 5 420) = **33 480**; 18 000 + 7 250 + 3 640 = **28 890**; 7 000 × 4 : 2 = **14 000**; 12 304 × (45 : 9) = **61 520**; (63 000 − 7 000) : 8 = **7 000**; 52 340 − 6 130 × 5 = **21 690** |
| Nhân, chia (trang 10) | nc-1 (noi-cap, 4 phép với kết quả 18 000; 9 000; 80 000; 10 000); nc-2 4 062 × 8 = **32 496**; nc-3 16 428 × 5 = **82 140**; nc-4 72 056 : 8 = **9 007**; nc-5 83 927 : 4 = **20 981 dư 3** (dien-so, con đặt tính ra vở) |
| Chọn đáp án (trang 11) | tn-1 (trac-nghiem) 47 350 + 9 480 = **56 830**; tn-2 71 304 − 28 659 = **42 645**; tn-3 18 094 × 4 = **72 376**; tn-4 62 835 : 7 = **thương 8 976, dư 3** |
| Giải bài toán | bt-but (loi-van): 14 500 + 58 000 = 72 500; 14 500 + 72 500 = **87 000 đồng**. bt-gao: 3 × 6 400 = 19 200; 19 200 : 4 = **4 800 kg**. bt-do-choi: 14 760 : 3 = **4 920** (có sơ đồ). bt-sach: 3 060 × 4 = 12 240; + 3 060 = **15 300** (có sơ đồ) |
| Suy nghĩ thêm | sn-1, sn-2, sn-3 (xem mục Tư duy) |

Mỗi câu `dat-tinh` chỉ có cộng, trừ vì form hiện tại chỉ hỗ trợ hai phép đó. Nhân và chia (đặt tính trong SGK) để con làm ra vở ô li rồi điền kết quả bằng `dien-so`, không thêm dạng mới khi chưa cần.

## Kỹ thuật

- Thêm `lib/column-mul.ts` và `lib/column-div.ts` (có test chung `lib/column-mul-div.test.ts`) tương tự `column-add` và `column-sub`, dùng cho animation và lời giải.
- `_animations/nhan-dat-tinh.tsx` và `_animations/chia-dat-tinh.tsx`; `_illustrations/so-do-lan.tsx`. Chưa dùng ở bài khác, nên để trong folder bài. Nếu Bài 34 hay Bài 37 cần thì chuyển lên `components/math/`.
- `bai-tap.ts` có `evalExpr` hiểu cả × và : (nhân chia trước, trái sang phải).
- Đặt `available: true` cho Bài 2 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: “đặt tính rồi tính”, “tính nhẩm”, “giá trị của biểu thức”, “thương”, “số dư”, “gấp lên … lần”, “giảm đi … lần”.
- Số có 4 chữ số trở lên tách lớp bằng NBSP, như 72 056.
- Không dạy: nhân với số có hai chữ số, chia cho số có hai chữ số, tính chất của phép nhân, chia có dư với số lớn hơn lớp 4.

## Câu hỏi cần chốt

1. **Nhân, chia dùng `dien-so` hay thêm dạng `dat-tinh` cho × và :?** Đề xuất: `dien-so` ở bài này (đã làm), con đặt tính ra vở. Lý do: form đặt tính × và : cần thiết kế riêng (ô số nhớ, hạ số), chỉ nên làm khi có bài cần.
2. **Có giữ nhóm “Suy nghĩ thêm” vượt SGK không?** Đề xuất: giữ 3 câu (tìm lỗi sai, ước lượng, phép khác biệt), vì chúng phục vụ trực tiếp lỗi thứ tự phép tính và kết quả lệch bậc.
3. **Hai animation nhân và chia để trong bài hay chuyển lên `components/math/`?** Đề xuất: để trong bài, chuyển khi Bài 34 hay Bài 37 cần dùng lại.

## Phụ lục: đáp án SGK

Đã tính lại, trang 9-11.

- Trang 9: Bài 1: a) 15 000; 7 000; 55 000. b) 59 000; 20 000; 20 000. Bài 2: 14 646; 83 670; 35 226; 58 288. Bài 3: a) 30 670; b) 26 900. Bài 4: ba lô 16 500 + 62 500 = 79 000; mẹ trả 16 500 + 79 000 = **95 500 đồng**.
- Trang 10: Bài 1: 80 000 : 2 = 40 000; 6 000 × 4 = 24 000; 5 000 × 8 = 40 000; 90 000 : 3 = 30 000; 20 000 × 2 = 40 000 (ba phép cùng 40 000). Bài 2: 45 639; 68 872; 7 059; 13 071 dư 6. Bài 3: 4 × 4 500 = 18 000; 18 000 : 5 = **3 600 kg**. Bài 4: a) 10 000; b) 13 206 × 4 = 52 824.
- Trang 11: Bài 1: a) B 61 930; b) D 32 668; c) C 87 219; d) A (6 073 dư 1). Bài 2: 12 960 : 2 = **6 480**. Bài 3: a) 48 000 : 8 = 6 000; b) 43 680 − 35 600 = 8 080. Bài 4: 4 050 × 5 = 20 250; 20 250 + 4 050 = **24 300 quyển**.
