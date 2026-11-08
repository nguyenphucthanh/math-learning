# Brief — Bài 14. So sánh các số có nhiều chữ số

- SGK: Toán 4 KNTT tập một, trang 47-49, chủ đề 3 (Số có nhiều chữ số).
- Route: `/kntt-4/bai-14`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 13 (làm tròn đến hàng trăm nghìn). Bài sau: Bài 15 (dãy số tự nhiên). Bài ôn lại nó: Bài 16, Bài 33, Bài 37. Bài 1 đã dạy so sánh số trong phạm vi 100 000; bài này mở rộng đến lớp triệu và tới 10 chữ số.

**Cấu trúc SGK.** Khám phá (khoảng cách Sao Kim, Sao Hỏa đến Mặt Trời, khung quy tắc hai ý) → Hoạt động 3 bài (so sánh 6 cặp số, gồm hai cặp có tổng; so giá hai căn nhà 950 000 000 và 1 000 000 000; tìm chỗ sai trong lời của Việt) → Luyện tập 4 bài (số lượng gia súc, tìm số lớn nhất và bé nhất; sắp xếp số trên đoàn tàu, trắc nghiệm A/B/C; lập số lớn nhất và bé nhất từ 9 tấm thẻ; xếp 12 chiếc vòng lên bàn tính để được số lớn nhất).

**Mục tiêu.**

1. Biết số có nhiều chữ số hơn thì lớn hơn, kể cả khi chữ số đầu của số kia lớn (99 999 999 < 100 000 000).
2. So sánh hai số cùng số chữ số bằng cách so từng cặp chữ số ở cùng hàng, từ trái sang phải, dừng ở cặp đầu tiên khác nhau.
3. Dùng dấu >, <, = đúng, kể cả khi một vế là tổng (viết tổng thành số rồi so).
4. Sắp xếp một dãy số từ lớn đến bé và từ bé đến lớn.
5. Lập số lớn nhất, bé nhất từ các tấm thẻ chữ số: chữ số lớn đứng hàng cao; số bé nhất thì chữ số đầu khác 0.
6. Chỉ ra được sai lầm "so chữ số tận cùng" (Hoạt động 3).

**Kiến thức cần có.** Hàng và lớp đến lớp triệu (Bài 11, 12); đếm số chữ số; so sánh số trong phạm vi 100 000 (Bài 1). Kiểm tra bằng 3 câu khởi động.

**Điểm mấu chốt.**

- SGK viết quy tắc trong khung, không giải thích **vì sao** so từ trái sang phải. Bài này cho con thấy hàng bên trái có giá trị lớn hơn nên quyết định trước; chữ số hàng thấp chỉ cần đến khi các hàng cao giống nhau.
- Chỗ dễ lẫn: so chữ số tận cùng (Hoạt động 3), thấy chữ số đầu lớn (9) mà quên đếm chữ số (99 999 999 và 100 000 000), số có chữ số 0 ở giữa (3 004 000 và 3 400 000), vế là tổng chưa viết thành số.
- Bẫy của SGK: Hoạt động 2 so 950 000 000 với 1 000 000 000, chữ số đầu 9 lớn hơn 1 nhưng số sau có 10 chữ số. Luyện tập 2 đặt 380 999 999 sát 380 000 982 và 99 999 999 để con phải đếm chữ số trước rồi so từng hàng. Luyện tập 3 yêu cầu số bé nhất **có chín chữ số**, nên chữ số 0 không được đứng đầu.
- Hoạt động 1 có hai cặp là số so với tổng (3 405 000 và 3 000 000 + 400 000 + 5 000; 650 700 và 6 000 000 + 500 000 + 7 000). Cặp sau là bẫy: tổng bằng 6 507 000 có 7 chữ số, còn 650 700 có 6 chữ số.
- Dữ kiện ngoài toán (khoảng cách đến Mặt Trời, số lượng gia súc) lấy từ SGK, chưa đối chiếu nguồn. App dùng số riêng, không dùng số thật.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| So chữ số tận cùng (lỗi của Việt) | 23 938 399 > 37 003 847 vì 9 > 7 (đúng: 37 003 847 > 23 938 399, vì hàng chục triệu 3 > 2) | Animation `SoSanhSo` tô từng cặp từ trái sang phải; câu `ss-3`, `st-3` tìm lỗi |
| Không đếm chữ số trước | 950 000 000 > 1 000 000 000 vì 9 > 1 (đúng: <, vì số sau có 10 chữ số) | `SoSanhSo` bước đếm chữ số; câu `ss-2`, `thu-chu-so` |
| Dừng sai chỗ khi gặp chữ số 0 | 3 004 000 > 3 400 000 vì 004 trông lớn (đúng: <, hàng trăm nghìn 0 < 4) | Tô cặp đầu tiên khác nhau, ví dụ 37 338 449 và 37 839 449 |
| So tổng với số mà chưa viết thành số | 650 700 > 6 000 000 + 500 000 + 7 000 (đúng: <, vế phải là 6 507 000) | `KeyFact` "viết tổng thành số trước"; `thu-tong`, `ss-1` |
| Lập số bé nhất cho chữ số 0 đứng đầu | 000 378 89 thay vì 100 037 889 | `XepThe` bước số bé nhất; câu `xt-4`, `thu-the-be` |
| Xếp vòng lên bàn tính vượt 9 vòng một cột | 12 vòng thành 3 000 000 000... (đúng: mỗi cột tối đa 9 vòng) | Câu `xt-5` nhắc mỗi cột là một chữ số, tối đa 9 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng | Đếm số chữ số của mỗi số trước khi so, như cách đếm số vạch trên thước |
| Tách | Dùng | Tách vế tổng thành số (3 000 000 + 400 000 + 5 000 = 3 405 000); tách số theo lớp để so từng cặp |
| So sánh | Dùng | Là nội dung chính của bài; thêm "hơn nhau mấy hàng" ở câu tìm số lớn nhất, bé nhất |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: số chữ số, so sánh số bốn chữ số, hàng của chữ số |
| Bốn kênh | Dùng | Nói (đọc "hai trăm ba mươi triệu lớn hơn một trăm linh tám triệu"), hình (ô chữ số xếp thẳng hàng), nhẩm (đếm chữ số, so cặp đầu), viết (điền dấu, điền số) |
| Câu tư duy | Dùng | Tìm lỗi sai (`ss-3`, `st-3`), tìm chữ số thích hợp (`st-2`), số bé nhất có chín chữ số và số lớn nhất có tám chữ số (`st-1`) |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-chu-so` | dien-so | Số 480 000 000 có mấy chữ số | **9** |
| `kd-so-sanh` | trac-nghiem | Số nào lớn hơn: 7 458 hay 7 548 | **7 548** |
| `kd-hang` | trac-nghiem | Chữ số 3 đầu tiên (từ trái) trong 37 338 449 thuộc hàng nào | **hàng chục triệu** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-chu-so` | trac-nghiem | Số nào lớn hơn: 99 999 999 hay 100 000 000 | **100 000 000** (nhiều chữ số hơn) |
| `thu-cung` | so-sanh | 52 316 000 ? 52 361 000 | **<** (hàng chục nghìn 1 < 6) |
| `thu-tong` | so-sanh | 5 090 000 ? 5 000 000 + 100 000 + 90 000 | **<** (vế phải là 5 190 000) |
| `thu-xep` | dien-so | Sắp xếp từ bé đến lớn: 4 205 000; 420 500; 42 050 000 | **420 500; 4 205 000; 42 050 000** |
| `thu-the-lon` | dien-so | Số lớn nhất lập từ các thẻ 4, 0, 6, 0, 2, 9 | **964 200** |
| `thu-the-be` | dien-so | Số bé nhất (chữ số đầu khác 0) lập từ các thẻ 4, 0, 6, 0, 2, 9 | **200 469** |

**Vượt SGK** (nhóm Suy nghĩ thêm): `st-1` số bé nhất có chín chữ số (**100 000 000**) và số lớn nhất có tám chữ số (**99 999 999**), để thấy chúng hơn kém nhau 1 đơn vị; `st-2` tìm chữ số lớn nhất điền vào ô để một bất đẳng thức đúng (**4**). Lý do: hiểu quy tắc đủ để dùng ngược (tìm chữ số), làm nền cho dãy số ở Bài 15. `st-3` tìm lỗi sai cùng dạng Hoạt động 3 nhưng khác bẫy, nên không vượt SGK.

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi hay gặp là so chữ số tận cùng, không đếm số chữ số trước, quên viết tổng thành số. Hoạt động ôn: tìm số lớn trong đời sống (giá nhà, dân số, lượt xem) rồi cho con xếp từ lớn đến bé và nói vì sao. Dấu hiệu: con luôn đếm chữ số trước, rồi so từ trái sang phải.

## Phần Lý thuyết

Chặng theo thứ tự cụ thể → hình ảnh → ký hiệu.

1. **Nhiều chữ số hơn thì lớn hơn.** Cụ thể: 278 992 000 và 278 999. Animation `SoSanhSo`, 3 bước: hai số xếp thẳng hàng bên phải; đếm chữ số (9 và 6); kết luận. `KeyFact`: số nào có nhiều chữ số hơn thì lớn hơn. `QuickCheck` `thu-chu-so`.
2. **Cùng số chữ số: so từ trái sang phải.** Khám phá của SGK: 230 000 000 và 108 000 000. `SoSanhSo`, 4 bước: hai số; cùng 9 chữ số; so từng cặp (hàng trăm triệu 2 > 1, dừng); kết luận. Ví dụ thứ hai: 37 338 449 và 37 839 449 (hai hàng đầu giống nhau, dừng ở hàng trăm nghìn). `KeyFact`: so từng cặp chữ số ở cùng hàng, kể từ trái sang phải. `QuickCheck` `thu-cung`. Nhắc lỗi của Việt ở Hoạt động 3.
3. **So sánh với tổng.** Viết tổng thành số rồi so. `KeyFact`. `QuickCheck` `thu-tong`.
4. **Sắp xếp.** Tìm số lớn nhất (hoặc bé nhất) trước, rồi lặp lại. `KeyFact`. `QuickCheck` `thu-xep`.
5. **Lập số từ các thẻ.** Animation `XepThe` với các thẻ 3, 0, 5, 0, 8, 2, 3 bước: sáu tấm thẻ; số lớn nhất (xếp từ lớn đến bé); số bé nhất (chữ số bé nhất khác 0 đứng đầu, các thẻ còn lại xếp từ bé đến lớn). `KeyFact`: số 0 không đứng đầu. `QuickCheck` `thu-the-lon`, `thu-the-be`.

Bố cục 390px: `SoSanhSo` viewBox 340 rộng, tối đa 10 ô rộng 28, chữ ô 22, chữ chú thích từ 14; `XepThe` viewBox 340, 6 thẻ rộng 44.

## Phần Bài tập

Nhóm theo phần SGK, đổi số liệu. Đáp án in đậm.

**So sánh (Hoạt động 1, 2, 3)**

- `ss-1` `so-sanh` (6 hàng): 412 760 000 ? 412 976 → **>**; 58 427 316 ? 58 472 316 → **<**; 6 015 000 ? 6 150 000 → **<**; 100 000 000 ? 98 765 432 → **>**; 7 208 000 ? 7 000 000 + 200 000 + 8 000 → **=**; 480 900 ? 4 000 000 + 800 000 + 900 → **<**
- `ss-2` `trac-nghiem`: căn hộ A 999 000 000 đồng, căn hộ B 1 000 000 000 đồng, căn nào đắt hơn → **căn hộ B, vì có nhiều chữ số hơn**
- `ss-3` `trac-nghiem` (tìm lỗi): hai số 64 003 912 và 51 872 495, bạn nói số thứ hai lớn hơn vì 5 > 2 ở cuối → **so từ trái sang phải: 6 > 5 nên 64 003 912 lớn hơn**

**Sắp xếp và lập số (Luyện tập 1, 2, 3, 4)**

- `xt-1` `trac-nghiem`: lượt xem ba video A 2 450 300, B 24 503 000, C 9 870 000; video nhiều lượt nhất → **B**
- `xt-2` `trac-nghiem`: video ít lượt nhất → **A**
- `xt-3` `trac-nghiem`: xếp 750 000 100; 750 000 001; 75 999 999; 1 000 000 từ lớn đến bé → **750 000 100; 750 000 001; 75 999 999; 1 000 000** (đoàn tàu B)
- `xt-4` `dien-so`: sắp xếp 100 001; 99 099; 100 000; 99 999 từ bé đến lớn → **99 099 < 99 999 < 100 000 < 100 001**
- `xt-5` `dien-so`: các thẻ 5, 0, 0, 7, 2, 4, 0, 6, 9: số lớn nhất có chín chữ số **976 542 000**; số bé nhất có chín chữ số **200 045 679**
- `xt-6` `dien-so`: 14 chiếc vòng xếp lên bàn tính chín cột, mỗi cột tối đa 9 vòng, số lớn nhất → **950 000 000**

**Suy nghĩ thêm**

- `st-1` `dien-so` *(vượt SGK)*: số bé nhất có chín chữ số **100 000 000**; số lớn nhất có tám chữ số **99 999 999**
- `st-2` `dien-so` *(vượt SGK)*: chữ số lớn nhất điền vào ô để 7□0 000 < 745 000 → **4**
- `st-3` `trac-nghiem` (tìm lỗi): bạn so 3 050 000 với 350 000: "3 = 3, 0 < 5 nên 3 050 000 < 350 000" → **phải đếm chữ số trước: 3 050 000 có 7 chữ số, 350 000 có 6 chữ số nên 3 050 000 lớn hơn**

## Kỹ thuật

- Thêm `lib/so-sanh.ts` (`compareNumbers`, `explainCompare`, `largestFrom`, `smallestFrom`, `withoutOneCard`) kèm test riêng. Đáp án trong test tính lại bằng các hàm này và bằng duyệt mọi cách xếp, không so với số gõ tay.
- Thêm `SoSanhSo` và `XepThe` trong `_animations/`. Nếu Bài 16 dùng lại thì chuyển lên `components/`.
- Dùng dạng bài `so-sanh` đã có (Bài 1). Không thêm đơn vị, màu.
- `lib/lessons.ts`: đặt `available` của Bài 14 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **số chữ số**, **chữ số ở cùng một hàng**, **từ trái sang phải**, **lớn hơn**, **bé hơn**, **bằng**, **số lớn nhất**, **số bé nhất**, **sắp xếp theo thứ tự từ bé đến lớn**.
- Số viết tách lớp bằng NBSP.
- Không dạy: so sánh phân số, số thập phân, so sánh bằng hiệu hai số.

## Câu hỏi cần chốt

1. Thêm lý do "hàng bên trái có giá trị lớn hơn nên quyết định trước" ngoài khung của SGK? Đề xuất: **có**, một câu ngắn trong `KeyFact`, không đổi cách làm.
2. Số liệu thiên văn và số lượng gia súc dùng số riêng? Đề xuất: **dùng số riêng** (lượt xem video, giá căn hộ), tránh phải đối chiếu nguồn.
3. Bàn tính Luyện tập 4 làm câu điền số, không vẽ hình? Đề xuất: **không vẽ**, nói rõ "mỗi cột tối đa 9 vòng"; hình bàn tính đã có ở Bài 12 và chỉ chuyển lên `components/` khi dùng lại thật sự.
4. Giữ `st-1`, `st-2` vượt SGK? Đề xuất: **giữ**, đặt cuối nhóm.

## Phụ lục: đáp án SGK

**Trang 47**

- Khám phá: 230 000 000 > 108 000 000 (cùng 9 chữ số, hàng trăm triệu 2 > 1), Sao Hỏa xa Mặt Trời hơn.
- Hoạt động 1: 278 992 000 > 278 999; 37 338 449 < 37 839 449; 3 004 000 < 3 400 000; 200 000 000 > 99 999 999; 3 405 000 = 3 000 000 + 400 000 + 5 000; 650 700 < 6 000 000 + 500 000 + 7 000 (vế phải 6 507 000).

**Trang 48**

- Hoạt động 2: 950 000 000 < 1 000 000 000, nhà chú Sáu đắt hơn.
- Hoạt động 3: Việt chỉ so chữ số tận cùng. Phải so từ trái sang phải: 37 003 847 > 23 938 399 vì hàng chục triệu 3 > 2.
- Luyện tập 1: Lợn nhiều nhất (22 027 900), Trâu ít nhất (2 332 800), vì 2 332 800 < 6 230 500 < 22 027 900.

**Trang 49**

- Luyện tập 2: đáp án **B**: 1 000 000 000 > 380 999 999 > 380 000 982 > 99 999 999.
- Luyện tập 3: a) số lớn nhất **988 731 000**; b) số bé nhất **100 037 889**.
- Luyện tập 4: số lớn nhất lập được bằng 12 chiếc vòng là **930 000 000** (9 vòng ở hàng trăm triệu, 3 vòng ở hàng chục triệu). Số vòng của hình mẫu 312 211 011 là 3 + 1 + 2 + 2 + 1 + 1 + 0 + 1 + 1 = 12. Đáp án tính lại, không lấy từ sách.
