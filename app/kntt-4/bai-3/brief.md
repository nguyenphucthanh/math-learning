# Brief — Bài 3. Số chẵn, số lẻ

- SGK: Toán 4 KNTT tập một, trang 12-13, chủ đề 1 (Ôn tập và bổ sung).
- Route: `/kntt-4/bai-3`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 2 (phép tính trong phạm vi 100 000, dùng chia có dư ở lớp 3). Bài sau: Bài 4 (biểu thức chứa chữ). Bài ôn lại nó: Bài 6 (luyện tập chung), Bài 37 (ôn tập chung).

**Cấu trúc SGK.** Khám phá (số nhà hai dãy phố; định nghĩa; nhận xét chữ số tận cùng) → Hoạt động 3 bài (phân loại 10 số; nêu số chẵn, lẻ trên tia số 0-12; đếm số chẵn, lẻ từ 10 đến 31) → Luyện tập 4 bài (con ong và các bông hoa; điền số nhà còn thiếu; hai số liên tiếp hơn kém 2 đơn vị và nêu tiếp ba số; lập số hai chữ số từ ba thẻ số).

**Mục tiêu.**

1. Nói được: số chia hết cho 2 là số chẵn, số không chia hết cho 2 là số lẻ.
2. Nhận biết số chẵn, số lẻ chỉ bằng chữ số tận cùng, kể cả số có bốn chữ số trở lên.
3. Nêu số chẵn, số lẻ trên tia số; biết 0 là số chẵn.
4. Biết hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị; điền số còn thiếu, nêu tiếp dãy.
5. Đếm số chẵn, số lẻ trong một khoảng cho trước.
6. Lập số chẵn, số lẻ có hai chữ số từ các thẻ số.

**Kiến thức cần có.** Chia hết, chia có dư cho 2 (lớp 3); hàng của số (Bài 1); đếm thêm 2.

**Điểm mấu chốt.**

- SGK nêu định nghĩa rồi nhận xét luôn chữ số tận cùng, không giải thích vì sao. Bài đặt ghép cặp trước (cụ thể), rồi mới đến chữ số tận cùng (ký hiệu).
- Chỗ dễ lẫn: số 0 (tia số bắt đầu từ 0 nên 0 là số chẵn); “hai số chẵn liên tiếp” hơn kém 2 chứ không phải 1.
- Bẫy của SGK: trang 12 bài 3 đếm từ 10 đến 31 (cả hai đầu), con dễ lấy 31 − 10.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhìn chữ số đầu hoặc cả số | “2 107 là số chẵn vì bắt đầu bằng 2” (đúng: lẻ, tận cùng 7) | Animation `PhoSoNha` tô chữ số tận cùng; câu `sn-1` tìm lỗi sai |
| Cho 0 không phải số chẵn | “0 không chẵn không lẻ” (đúng: 0 : 2 = 0 nên chẵn) | Tia số có 0 trong dãy chẵn; câu `ts-5` |
| Hai số chẵn liên tiếp hơn kém 1 | 116, 117 (đúng: 116, 118) | Tia số có cung “+2”; KeyFact “Hơn kém 2”; câu `ts-1` đến `ts-4` |
| Đếm thiếu hoặc thừa đầu mút | Từ 10 đến 31: 31 − 10 = 21 số (đúng: 22 số) | Câu `ts-6`, `ts-7` đếm theo dãy; gợi ý liệt kê đầu và cuối |
| Lập số lặp chữ số hoặc sót số | Thẻ 3, 6, 8: viết 33 hoặc thiếu 83 | Câu `ls-1` liệt kê đủ 6 số rồi mới chia chẵn, lẻ |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng đầy đủ | Đếm thêm 2 trên tia số, dãy số nhà (mục tiêu 4, 5) |
| Tách | Nhẹ (vượt SGK) | 4 306 = 4 300 + 6: phần tròn trăm chia hết cho 2, chỉ còn chữ số cuối quyết định (mục tiêu 2, lỗi nhìn nhầm chữ số) |
| So sánh | Nhẹ | Dãy chẵn và dãy lẻ xen kẽ nhau, hơn kém 1 giữa hai dãy, 2 trong một dãy |
| Kiểm tra đầu vào | Dùng | Chia 14 và 15 cho 2; chữ số tận cùng; đếm thêm 2 |
| Bốn kênh | Rà đủ | Nói: “chia hết cho 2”; hình: ghép cặp, phố nhà, tia số; nhẩm: nhìn chữ số tận cùng; viết: điền dãy số. Không thiếu kênh nào |
| Câu tư duy | Dùng | Tìm lỗi sai (lỗi nhìn chữ số đầu), “vì sao” (vượt SGK) |

**Khởi động (3 câu, tối đa 3 phút).**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-chia | dien-so | 14 : 2; 15 : 2 | **7; 7 dư 1** |
| kd-tan-cung | dien-so | Chữ số tận cùng của 2 318 | **8** |
| kd-dem-2 | dien-so | Đếm thêm 2: 6, 8, ?, ? | **10, 12** |

**Suy nghĩ thêm (Vượt SGK: tìm lỗi sai, giải thích vì sao và đếm cả khoảng dài, để con hiểu sâu hơn việc chỉ nhìn chữ số tận cùng).**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | Nam nói 2 107 là số chẵn vì bắt đầu bằng 2 | **Sai: phải nhìn chữ số tận cùng 7, nên là số lẻ** |
| sn-2 | trac-nghiem | Vì sao chỉ cần nhìn chữ số tận cùng của 4 306 | **4 300 chia hết cho 2, chỉ cần xét 6** |
| sn-3 | dien-so | Từ 1 đến 100 có bao nhiêu số chẵn, số lẻ | **50; 50** |

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi nhìn chữ số đầu, 0 là số chẵn, hơn kém 2, đếm đủ hai đầu. Hoạt động ôn: số nhà trên đường, số trang sách, biển số xe. Dấu hiệu: nói được vì sao chỉ cần nhìn chữ số cuối. Đáp án trang 12-13 trong `Fold`.

## Phần Lý thuyết

Ba chặng, thứ tự cụ thể → hình ảnh → ký hiệu. Cả ba animation tự viết, để trong `_animations/`.

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Ghép cặp | Chẵn thì ghép cặp vừa đủ, lẻ thì thừa một | `GhepCap`: 4 hàng chấm 8, 9, 12, 13; 3 bước (chấm; ghép cặp; ghi phép chia) | Chia hết cho 2 là chẵn; không chia hết là lẻ | 15 là chẵn hay lẻ |
| 2. Số nhà, chữ số tận cùng | Chỉ cần nhìn chữ số tận cùng | `PhoSoNha`: hai dãy nhà 10-18 và 11-19; 4 bước (hai dãy; chẵn; lẻ; tô chữ số tận cùng) | Tận cùng 0, 2, 4, 6, 8 là chẵn; 1, 3, 5, 7, 9 là lẻ | Số nào là số lẻ |
| 3. Tia số | Chẵn, lẻ xen kẽ, hơn kém 2; 0 là chẵn | `TiaSoChanLe`: tia số 0-12; 4 bước (tia số; chẵn; lẻ; cung “+2”) | Hai số chẵn (lẻ) liên tiếp hơn kém 2 | Số chẵn tiếp theo của 124, 126 |

Bố cục 390px: `viewBox` 360 rộng; tia số 13 điểm cách nhau 24 đơn vị, chữ cỡ 14.

## Phần Bài tập

Nhóm theo phần SGK, giữ dạng và độ khó, đổi số liệu. Tổng 17 câu.

| Nhóm | Câu (dạng, đáp án) |
|---|---|
| Nhận biết số chẵn, số lẻ (trang 12, 13) | nb-1 (trac-nghiem) số chẵn: **108**; nb-2 số lẻ: **1 909**; nb-3 (dien-so) trong 24, 53, 780, 4 691, 5 026, 3 105, 8 có **4 số chẵn, 3 số lẻ**; nb-4 (trac-nghiem) con ong đi đường số chẵn, đến hoa **5 862** |
| Dãy số và tia số (trang 12, 13) | ts-1 dãy chẵn 216, 218, **220, 222, 224**, 226; ts-2 dãy lẻ 307, 309, **311, 313, 315**, 317; ts-3 hơn kém **2** và **2**; ts-4 nêu tiếp: 94, **96, 98**; 83, **85, 87**; ts-5 (trac-nghiem) số 0 là **số chẵn**; ts-6 từ 0 đến 20: **11 chẵn, 10 lẻ**; ts-7 từ 20 đến 41: **11 chẵn, 11 lẻ** |
| Lập số (trang 13) | ls-1 (dien-so) thẻ 3, 6, 8: 36, 38, 63, 68, 83, 86, nên **4 chẵn, 2 lẻ**; ls-2 (trac-nghiem) thẻ 2, 5, 9, số lẻ lập được: **29**; ls-3 (dien-so) số lẻ lớn nhất lập từ thẻ 1, 4, 7: **71** |
| Suy nghĩ thêm | sn-1, sn-2, sn-3 (xem mục Tư duy) |

## Kỹ thuật

Không cần thư viện mới. `lib/lessons.ts` đặt `available: true` cho Bài 3.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: “số chẵn”, “số lẻ”, “chia hết cho 2”, “chữ số tận cùng”, “hai số chẵn liên tiếp”, “hơn kém nhau … đơn vị”.
- Số có bốn chữ số trở lên tách lớp bằng NBSP, như 4 691.
- Không dạy: chia hết cho 5, cho 9 (có ở bài sau), tổng hai số chẵn là số chẵn.

## Câu hỏi cần chốt

1. **Có thêm animation ghép cặp ngoài số nhà của SGK không?** Đề xuất: có, vì SGK nêu định nghĩa mà không cho con thấy “chia hết cho 2” trông như thế nào.
2. **Bài con ong (SGK trang 13 bài 1) làm thế nào?** Đề xuất: đổi thành câu trắc nghiệm có lời kể, không vẽ hình đường bay. Lý do: hình đường ong là ảnh của SGK, không chép vào repo.
3. **Có giữ nhóm “Suy nghĩ thêm” vượt SGK không?** Đề xuất: giữ 3 câu, phục vụ trực tiếp lỗi nhìn chữ số đầu và lỗi đếm.

## Phụ lục: đáp án SGK

Đã tính lại, trang 12-13.

- Trang 12, Hoạt động: Bài 1: số chẵn 12, 108, 194, 656, 72; số lẻ 315, 71, 649, 113, 107. Bài 2: chẵn 0, 2, 4, 6, 8, 10, 12; lẻ 1, 3, 5, 7, 9, 11. Bài 3: từ 10 đến 31 có 22 số: **11 số chẵn, 11 số lẻ**.
- Trang 13, Luyện tập: Bài 1: các số chẵn là 4 210, 6 408, 1 954; các số lẻ là 361, 2 107, 1 965. Bông hoa cụ thể ứng với từng đường bay cần đối chiếu với hình (chưa xác nhận từ ảnh chụp). Bài 2: a) 116, 118, **120, 122, 124**, 126. b) 117, 119, **121, 123, 125**, 127. Bài 3: a) **2** đơn vị; **2** đơn vị. b) 78, **80, 82**; 67, **69, 71**. Bài 4: từ thẻ 7, 4, 5: 74, 54 là số chẵn; 75, 47, 45, 57 là số lẻ.
