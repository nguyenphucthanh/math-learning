# Brief — Bài 13. Làm tròn số đến hàng trăm nghìn

- SGK: Toán 4 KNTT tập một, trang 45-46, chủ đề 3 (Số có nhiều chữ số).
- Route: `/kntt-4/bai-13`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 12 (các số trong phạm vi lớp triệu). Bài sau: Bài 14 (so sánh các số có nhiều chữ số). Bài ôn lại nó: Bài 16, Bài 33, Bài 37.

**Cấu trúc SGK.** Khám phá (số xe máy bán ra 2 712 615, "khoảng 2 700 000", tia số từ 2 600 000 đến 2 800 000, khung quy tắc) → Hoạt động 3 bài (giá tiền ba mặt hàng làm tròn đến trăm nghìn; hàng, lớp của chữ số 5 rồi làm tròn đến chục nghìn; bảng số xe làm tròn đến trăm nghìn) → Luyện tập 2 bài (làm tròn số dân ba tỉnh; trắc nghiệm số nào làm tròn được hai trăm nghìn).

**Mục tiêu.**

1. Nói được vì sao làm tròn: số liệu chính xác dài, số "khoảng" dễ nhớ, dễ so.
2. Làm tròn số đến hàng trăm nghìn: nhìn chữ số hàng chục nghìn, bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.
3. Dùng tia số để thấy số làm tròn là số tròn trăm nghìn gần nhất, và biết vạch giữa (2 750 000) làm tròn lên.
4. Làm tròn đến hàng chục nghìn theo cùng quy tắc, nhìn chữ số hàng nghìn.
5. Làm tròn lên khi gặp chữ số 9 ở hàng làm tròn (2 890 000 → 2 900 000; 1 960 000 → 2 000 000).
6. Nói được một chữ số thuộc hàng nào, lớp nào (ôn Bài 12, dùng ở Hoạt động 2a).

**Kiến thức cần có.** Hàng và lớp đến lớp triệu (Bài 11, 12). Làm tròn đến hàng chục, trăm, nghìn ở lớp 3 (kiểm tra bằng khởi động `kd-tron`).

**Điểm mấu chốt.**

- SGK chỉ nêu quy tắc trong khung, rồi cho làm. Bài này thêm tia số có vạch giữa để con thấy **vì sao** quy tắc đúng (gần mốc nào hơn), không học thuộc lòng.
- Chỗ dễ lẫn: nhìn nhầm chữ số (nhìn chính hàng làm tròn thay vì hàng bên phải nó), chữ số bằng 5 (SGK: "còn lại thì làm tròn lên"), quên đổi các chữ số bên phải thành 0.
- Bẫy của SGK: Hoạt động 2 đổi hàng làm tròn giữa chừng (câu a hỏi hàng, câu b làm tròn đến **chục nghìn**, không phải trăm nghìn). Luyện tập 2 chọn số có **hai chữ số 9 và 1 sát nhau** (190 001) để con phải nhìn chữ số quyết định, không nhìn "số trông gần 200 000".
- Số dân, giá tiền, số xe trong SGK lấy từ hình trong sách, chưa đối chiếu Niên giám thống kê. App dùng số riêng, tên tỉnh dùng "Tỉnh A, B, C" để không phải đối chiếu nguồn.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhìn sai chữ số quyết định | 2 712 615 → nhìn chữ số 7 (hàng trăm nghìn) rồi làm tròn lên 2 800 000 (đúng: nhìn chữ số 1 ở hàng chục nghìn, được 2 700 000) | Animation `LamTronSo`: tô riêng chữ số hàng làm tròn và chữ số quyết định; `QuickCheck` `thu-xuong` |
| Chữ số bằng 5 làm tròn xuống | 4 350 000 → 4 300 000 (đúng: 4 400 000) | Tia số `TiaSoLamTron` bước 3: vạch giữa 2 750 000 thuộc phần "làm tròn lên"; `thu-bang-5`, `st-1` |
| Quên đổi các chữ số sau thành 0 | 2 712 615 → 2 710 000 hoặc 2 700 615 | Bước cuối của `LamTronSo` hiện cả dãy chữ số 0; hỏi con "số tròn trăm nghìn có tận cùng mấy chữ số 0" |
| Không nhớ sang khi gặp chữ số 9 | 2 890 000 → 2 800 000 (đúng: 2 900 000); 1 960 000 → 1 000 000 (đúng: 2 000 000) | `LamTronSo` ví dụ 1 960 000 (nhớ sang hàng triệu); `st-3` |
| Nhầm hàng làm tròn | làm tròn đến chục nghìn mà trả lời 5 100 000 (đúng: 5 120 000) | Câu `cn-7` làm hai hàng cho cùng một số; hint nhắc "hàng làm tròn" và "hàng bên phải" |
| Nhầm hàng, lớp của chữ số | chữ số 5 trong 4 305 120 ở "hàng nghìn, lớp triệu" (đúng: hàng nghìn, lớp nghìn) | Câu `cn-1` đến `cn-3`, giải thích gắn hàng với lớp |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng | Đếm theo trăm nghìn trên tia số (100 000, 200 000, …), để thấy "số tròn trăm nghìn" là các mốc cách đều nhau |
| Tách | Không dùng | Bài không có phép tính, số không cần tách |
| So sánh | Dùng | "Gần mốc nào hơn": 2 712 615 cách 2 700 000 là 12 615, cách 2 800 000 là 87 385. Đây là lý do của quy tắc |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: hàng của chữ số, làm tròn đến hàng nghìn (lớp 3), đếm theo trăm nghìn |
| Bốn kênh | Dùng | Nói (đọc "khoảng hai triệu bảy trăm nghìn"), hình (tia số, hàng chữ số), nhẩm (nhìn một chữ số), viết (điền số). Không thiếu kênh nào |
| Câu tư duy | Dùng | Tìm lỗi sai (`st-1`), tìm số bé nhất và lớn nhất làm tròn được cùng một số (`st-2`), đoán bản tin làm tròn đến hàng nào (`st-4`), đặt trong "Suy nghĩ thêm" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-hang` | trac-nghiem | Chữ số 7 trong 2 712 615 thuộc hàng nào | **Hàng trăm nghìn** |
| `kd-tron` | dien-so | Làm tròn 5 826 đến hàng nghìn | **6 000** |
| `kd-dem` | dien-so | Đếm theo trăm nghìn: 100 000, 200 000, ?, 400 000 | **300 000** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-tia` | trac-nghiem | Trên tia số, 5 280 000 gần mốc nào hơn | **5 300 000** (cách 20 000, mốc kia 5 200 000 cách 80 000) |
| `thu-xuong` | dien-so | Làm tròn 3 428 000 đến hàng trăm nghìn | **3 400 000** |
| `thu-len` | dien-so | Làm tròn 1 867 340 đến hàng trăm nghìn | **1 900 000** |
| `thu-bang-5` | trac-nghiem | Làm tròn 4 350 000 đến hàng trăm nghìn | **4 400 000** |
| `thu-chuc-nghin` | dien-so | Làm tròn 5 122 381 đến hàng chục nghìn | **5 120 000** |
| `thu-nho-sang` | dien-so | Làm tròn 1 960 000 đến hàng trăm nghìn | **2 000 000** |

**Vượt SGK** (nhóm Suy nghĩ thêm): `st-2` số bé nhất và số lớn nhất làm tròn đến hàng trăm nghìn được 500 000 (**450 000** và **549 999**); `st-4` bản tin nói "khoảng 3 200 000 xe" cho số 3 248 000, hỏi đã làm tròn đến hàng nào (**hàng trăm nghìn**). Lý do: hiểu "khoảng" có một khoảng số, làm nền cho ước lượng ở bài tính sau.

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi hay gặp là nhìn sai chữ số quyết định, chữ số 5, quên đổi thành 0, quên nhớ khi gặp chữ số 9. Hoạt động ôn: tìm số liệu lớn trong tin tức hoặc hóa đơn (dân số, giá nhà, số lượt xem) rồi cùng con nói "khoảng bao nhiêu". Dấu hiệu: con tự chỉ ra chữ số quyết định trước khi trả lời, nói được "5 thì làm tròn lên".

## Phần Lý thuyết

Chặng theo thứ tự cụ thể → hình ảnh → ký hiệu.

1. **Vì sao làm tròn (cụ thể).** Số xe bán ra 2 712 615, bản tin nói "khoảng 2 700 000". Số tròn dễ nhớ, dễ nói.
2. **Tia số (hình).** Animation `TiaSoLamTron`, 3 bước: đặt 2 712 615 giữa các mốc tròn trăm nghìn; gần mốc 2 700 000 hơn; vạch giữa 2 750 000 chia làm tròn xuống và lên. `KeyFact`: làm tròn đến hàng trăm nghìn là tìm số tròn trăm nghìn gần nhất. `QuickCheck` `thu-tia`.
3. **Quy tắc (ký hiệu).** Animation `LamTronSo` với 2 712 615, 4 bước: số; tô hàng trăm nghìn; tô chữ số hàng chục nghìn, so với 5; kết quả. `KeyFact`: quy tắc của SGK. `QuickCheck` `thu-xuong`. Ví dụ làm tròn lên: `LamTronSo` với 1 867 340, `QuickCheck` `thu-len`.
4. **Chữ số bằng 5.** `KeyFact`: bằng 5 cũng làm tròn lên, vì 2 750 000 nằm đúng giữa. `QuickCheck` `thu-bang-5`.
5. **Làm tròn đến hàng chục nghìn.** `LamTronSo` với 5 122 381 (hàng làm tròn là chục nghìn, nhìn chữ số hàng nghìn). `KeyFact`: hàng nào làm tròn thì nhìn hàng bên phải nó. `QuickCheck` `thu-chuc-nghin`.
6. **Gặp chữ số 9.** `LamTronSo` với 1 960 000: chữ số 9 thêm 1 thành 10, nhớ sang hàng triệu. `QuickCheck` `thu-nho-sang`.

Bố cục 390px: `TiaSoLamTron` viewBox 340 rộng, nhãn đầu mút canh theo mép, chữ từ 14 trở lên; `LamTronSo` viewBox 340, tối đa 9 ô rộng 30.

## Phần Bài tập

Nhóm theo phần SGK, đổi số liệu. Đáp án in đậm. "≈" đọc là "làm tròn thành".

**Làm tròn đến hàng trăm nghìn (Hoạt động 1, 3, Luyện tập 1, 2)**

- `tn-1` `dien-so`: 21 390 000 đồng → **21 400 000**
- `tn-2` `dien-so`: 3 245 000 đồng → **3 200 000**
- `tn-3` `dien-so`: 4 850 000 đồng → **4 900 000** (chữ số quyết định là 5)
- `tn-4` `loi-van` (bảng xe máy 4 năm): 4 138 205 → **4 100 000**; 4 267 910 → **4 300 000**; 4 352 118 → **4 400 000**; 4 249 764 → **4 200 000**
- `tn-5` `noi-cap` (số dân ba tỉnh): 2 531 400 → **2 500 000**; 1 084 700 → **1 100 000**; 3 650 900 → **3 700 000**
- `tn-6` `trac-nghiem`: số nào làm tròn đến hàng trăm nghìn thì được ba trăm nghìn → **349 999** (các lựa chọn: 249 999, 350 000, 349 999, 450 001)

**Hàng, lớp và làm tròn đến hàng chục nghìn (Hoạt động 2)**

- `cn-1` `trac-nghiem`: chữ số 5 trong 25 640 713 → **hàng triệu, lớp triệu**
- `cn-2` `trac-nghiem`: chữ số 5 trong 4 305 120 → **hàng nghìn, lớp nghìn**
- `cn-3` `trac-nghiem`: chữ số 5 trong 512 806 000 → **hàng trăm triệu, lớp triệu**
- `cn-4` `dien-so`: 274 618 520 đến hàng chục nghìn → **274 620 000**
- `cn-5` `dien-so`: 3 047 215 đến hàng chục nghìn → **3 050 000**
- `cn-6` `dien-so`: 618 304 000 đến hàng chục nghìn → **618 300 000**
- `cn-7` `dien-so`: 2 463 900 đến hàng chục nghìn **2 460 000**, đến hàng trăm nghìn **2 500 000**

**Suy nghĩ thêm**

- `st-1` `trac-nghiem` (tìm lỗi): Nam làm tròn 3 450 000 đến hàng trăm nghìn được 3 400 000 → **chữ số hàng chục nghìn là 5 nên phải làm tròn lên: 3 500 000**
- `st-2` `dien-so` *(vượt SGK)*: số bé nhất và số lớn nhất làm tròn đến hàng trăm nghìn được 500 000 → **450 000** và **549 999**
- `st-3` `trac-nghiem`: làm tròn 1 960 000 đến hàng trăm nghìn → **2 000 000**
- `st-4` `trac-nghiem` *(vượt SGK)*: 3 248 000 được ghi "khoảng 3 200 000", đã làm tròn đến hàng nào → **hàng trăm nghìn**

## Kỹ thuật

- Thêm `lib/round-numbers.ts` (`roundToPlace`, `decidingDigit`, `roundDirection`, `roundHint`, `explainRound`) kèm test riêng, dùng `hangName` của `lib/hang-lop.ts`. Đáp án trong test tính lại bằng `roundToPlace`, không so với số gõ tay.
- Thêm `TiaSoLamTron` và `LamTronSo` trong `_animations/`. Nếu Bài 14, 16 dùng lại thì chuyển lên `components/`.
- Không thêm dạng bài, đơn vị, màu.
- `lib/lessons.ts`: đặt `available` của Bài 13 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **làm tròn**, **làm tròn xuống**, **làm tròn lên**, **hàng chục nghìn**, **hàng trăm nghìn**, **khoảng**. Ký hiệu "≈" dùng như SGK lớp 4 (đọc "làm tròn thành" khi cần).
- Số viết tách lớp bằng NBSP.
- Không dạy: làm tròn đến hàng triệu, làm tròn số thập phân, ước lượng kết quả phép tính.

## Câu hỏi cần chốt

1. Thêm tia số có vạch giữa 2 750 000 ngoài khung quy tắc của SGK? Đề xuất: **có**, vì đây là lý do của quy tắc và giải thích chữ số 5; không đổi cách làm của SGK.
2. Số dân dùng tên tỉnh thật như SGK? Đề xuất: **dùng "Tỉnh A, B, C"**, tránh phải đối chiếu Niên giám.
3. Có giữ hai câu vượt SGK `st-2`, `st-4`? Đề xuất: **giữ**, đặt cuối nhóm.
4. Câu Hoạt động 2a (hàng, lớp của chữ số 5) dùng `trac-nghiem` vì đáp án là chữ? Đề xuất: **có**, ô trống chỉ nhận số.

## Phụ lục: đáp án SGK

**Trang 45**

- Khám phá: 2 712 615 làm tròn đến hàng trăm nghìn là 2 700 000 (chữ số hàng chục nghìn là 1, bé hơn 5, làm tròn xuống).
- Hoạt động 1: 18 490 000 ≈ 18 500 000; 2 125 000 ≈ 2 100 000; 2 890 000 ≈ 2 900 000.

**Trang 46**

- Hoạt động 2a: 189 835 388: chữ số 5 ở hàng nghìn, lớp nghìn; 5 122 381: hàng triệu, lớp triệu; 531 278 000: hàng trăm triệu, lớp triệu.
- Hoạt động 2b (đến hàng chục nghìn): 189 835 388 ≈ 189 840 000; 5 122 381 ≈ 5 120 000; 531 278 000 ≈ 531 280 000.
- Hoạt động 3: 3 121 023 ≈ 3 100 000; 3 272 353 ≈ 3 300 000; 3 386 097 ≈ 3 400 000; 3 254 964 ≈ 3 300 000.
- Luyện tập 1: Bà Rịa – Vũng Tàu 1 167 900 ≈ 1 200 000; Hải Dương 1 916 800 ≈ 1 900 000; Nghệ An 3 365 200 ≈ 3 400 000. (Số dân lấy từ hình trong sách, chưa đối chiếu nguồn.)
- Luyện tập 2: **B** 190 001 (149 000 ≈ 100 000; 190 001 ≈ 200 000; 250 001 ≈ 300 000; 284 910 ≈ 300 000).
