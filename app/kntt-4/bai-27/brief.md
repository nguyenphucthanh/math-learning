# Brief — Bài 27. Hai đường thẳng vuông góc

- SGK: Toán 4 KNTT, tập một, trang 91-93, Chủ đề 6 "Đường thẳng vuông góc. Đường thẳng song song".
- Route: `/kntt-4/bai-27`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài đầu của Chủ đề 6. Bài trước là Bài 26 (luyện tập chung chủ đề 5). Bài sau là Bài 28 (thực hành vẽ hai đường thẳng vuông góc), rồi Bài 29 (hai đường thẳng song song). Bài này ôn lại góc vuông (lớp 3, Bài 7-9 của lớp 4).

**Cấu trúc SGK.** Khám phá (1 mục: hình chữ nhật kéo dài cạnh, hai đường OM và ON, dùng ê ke) → Hoạt động (3 bài) → Luyện tập (5 bài).

**Mục tiêu**

1. Nhận biết hai đường thẳng vuông góc là hai đường thẳng cắt nhau tạo thành góc vuông.
2. Biết hai đường thẳng vuông góc tạo thành bốn góc vuông có chung đỉnh.
3. Dùng ê ke kiểm tra hai đường thẳng có vuông góc không.
4. Nêu tên các cặp cạnh vuông góc trong một hình có góc vuông, và cặp cạnh cắt nhau mà không vuông góc.
5. Biết hai đường cắt nhau chưa chắc vuông góc.
6. Tìm hình ảnh hai đường thẳng vuông góc trong đời sống.

**Kiến thức cần có.** Góc vuông và ê ke (lớp 3); hình chữ nhật có bốn góc vuông; góc nhọn, tù, bẹt (Bài 8).

**Điểm mấu chốt**

- SGK không giải thích vì sao "bốn góc vuông": chỉ nói tạo thành bốn góc vuông chung đỉnh. Bài chỉ nêu kết luận, không chứng minh.
- Dễ lẫn "cắt nhau" với "vuông góc" (Luyện tập 2b hỏi cạnh cắt nhau mà không vuông góc).
- Hai cạnh đối của hình chữ nhật không vuông góc; chỉ hai cạnh liền nhau mới vuông góc. Chưa dạy "song song" (Bài 29), nên không dùng từ này.
- Cách làm không cần ê ke (Luyện tập 4): gấp giấy. SGK chưa giải thích nên chỉ nêu cách làm.
- Chưa dùng ký hiệu ⊥, chỉ nói "vuông góc với".
- Bài 3 (ống nước) và Bài 5 (đu quay) trong SGK có nhiều hơn một đáp án; xem phần Phụ lục.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Cắt nhau là vuông góc | Hai đường cắt nhau nghiêng 65°, nói "vuông góc" (không vuông góc) | Animation `XoayDuong` chọn 60°, 90°, 120°; câu `hd-1a`, `sn-mai` |
| Đoán theo ngang, dọc | Chỉ coi là vuông góc khi một đường nằm ngang (nghiêng vẫn có thể vuông góc) | `EKe` nghiêng 20°; `hd-1b` vẽ nghiêng 20° |
| Cạnh đối cũng vuông góc | Trong hình chữ nhật, nói AB vuông góc CD (không) | `sn-dem` đếm theo từng đỉnh; Phụ huynh nhắc cạnh liền nhau |
| Bỏ sót cặp cạnh | Tứ giác ABCD chỉ nêu AB và BC, bỏ BC và CD | Hint "đọc theo từng góc vuông"; `lt-2a` nối đủ 3 cặp |
| Chỉ tìm một ca-bin | Đu quay: chọn ca-bin 4, quên ca-bin 1 | Lời giải của `lt-5` nhắc ca-bin 1; Phụ huynh nhắc hai phía |
| Nối ống thẳng hàng cũng là vuông góc | Phương án nối M và N thành một đường thẳng | Câu `lt-3`: hình A là M, N thẳng hàng |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: góc vuông của hình chữ nhật, nhận góc vuông, ê ke |
| Bốn kênh | Dùng | Nói ("vuông góc với"), hình (ba animation), nhẩm/đếm (`sn-dem`), viết (nối, trắc nghiệm). Bù kênh "tay" bằng hoạt động ở Phụ huynh (ê ke thật, gấp giấy) |
| Câu tư duy | Dùng | Tìm lỗi sai (`sn-mai`), đếm có hệ thống (`sn-dem`), liên hệ đồng hồ (`sn-dong-ho`) |
| Đếm, Tách, So sánh | Không dùng | Bài hình học, không có quy luật số, số đo ghép hay quan hệ "hơn/kém" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-chu-nhat` | `dien-so` | Hình chữ nhật có ... góc vuông | **4** |
| `kd-goc` | `trac-nghiem` | Ba góc A, B, C: góc nào vuông | **Góc C** |
| `kd-e-ke` | `trac-nghiem` | Dụng cụ kiểm tra góc vuông | **Ê ke** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-chu-nhat` | `trac-nghiem` | Kéo dài AB và AD của hình chữ nhật | **Vuông góc với nhau** |
| `thu-bon-goc` | `dien-so` | Hai đường vuông góc tạo ... góc vuông chung đỉnh | **4** |
| `thu-khong` | `trac-nghiem` | PQ và RS (cắt nhau 120°) có vuông góc không | **Không, chỉ cắt nhau** |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-mai` | `trac-nghiem` | Mai nói cắt nhau thì luôn vuông góc | **Mai sai** |
| `sn-dem` | `dien-so` | Số cặp cạnh vuông góc của hình chữ nhật EFGH | **4** |

**Vượt SGK**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-dong-ho` | `trac-nghiem` | Lúc nào (12, 4, 6, 9 giờ) hai kim vuông góc như lúc 3 giờ | **9 giờ** |

Lý do vượt SGK: nối góc vuông với đồng hồ đã học từ lớp 3, để con tự thấy vuông góc ở đời sống. Chỉ dùng giờ đúng, không cần đo góc.

## Phần Phụ huynh

1. **Con học gì**: hai đường thẳng vuông góc, bốn góc vuông chung đỉnh, dùng ê ke.
2. **Cần biết trước**: góc vuông, ê ke, hình chữ nhật, góc nhọn/tù/bẹt.
3. **Cách giải thích**: đúng thuật ngữ SGK ("hai đường thẳng ... vuông góc với nhau"); kéo dài cạnh hình chữ nhật; dùng ê ke; chưa dùng ký hiệu ⊥.
4. **Lỗi**: cắt nhau là vuông góc; chỉ nhận khi ngang/dọc; cạnh đối; bỏ cặp cạnh; chỉ một ca-bin.
5. **Hoạt động**: tìm vuông góc quanh nhà bằng ê ke; gấp giấy hai lần; vẽ bốn hình.
6. **Dấu hiệu nắm bài**: dùng ê ke, nói "bốn góc vuông", nêu cặp cạnh, biết cắt nhau chưa chắc vuông góc, nghĩ được cách gấp giấy.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1 | Hình chữ nhật → hai đường vuông góc | `ChuNhatKeoDai`: 4 bước (hình chữ nhật, kéo dài AB, kéo dài AD, dấu góc vuông) | "Hai đường thẳng vuông góc" | `chuNhat` |
| 2 | Dùng ê ke; bốn góc vuông chung đỉnh | `EKe`: 4 bước (hai đường, ê ke sát OM, ê ke sát ON, bốn dấu góc); hình nghiêng 20° | "Hai đường thẳng OM và ON vuông góc" | `bonGoc` |
| 3 | Cắt nhau chưa chắc vuông góc | `XoayDuong`: con bấm 60°, 90°, 120°; ê ke cố định | "Vuông góc thì cắt nhau tạo góc vuông" | `khong` |

Bố cục 390px: các SVG dùng `viewBox` rộng 300-360, chữ từ 16, nút 48px. Không có hình rộng cần cuộn ngang.

## Phần Bài tập

Giữ dạng và độ khó SGK, đổi hình và số liệu. App không có ê ke thật nên chỗ "dùng ê ke" làm bằng cách nhìn hình, và những hình "không vuông góc" lệch hẳn khỏi 90° (từ 20° trở lên) để nhìn được trên màn hình.

**Hoạt động** (SGK trang 91-92)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `hd-1a` | `trac-nghiem` | PQ và RS cắt nhau 65°, có vuông góc không | **Không** |
| `hd-1b` | `trac-nghiem` | EG và HK cắt nhau 90°, nghiêng 20° | **Có** |
| `hd-2` | `trac-nghiem` | Ngũ giác ABCDE (góc B, C vuông): các cặp vuông góc | **AB và BC; BC và CD** |
| `hd-3` | `trac-nghiem` | Tranh cối xay gió: cặp nào vuông góc | **Hai thanh cánh quạt AC và BD** |

**Luyện tập** (SGK trang 92-93)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `lt-1` | `trac-nghiem` | Hình ảnh hai đường vuông góc | **Hai cạnh liền nhau của mặt bàn hình chữ nhật** |
| `lt-2a` | `noi-cap` (có hình) | Tứ giác ABCD (góc B, C vuông): nối cặp cạnh với mô tả | AB-BC: vuông tại B; BC-CD: vuông tại C; CD-DA: cắt nhau, không vuông |
| `lt-2b` | `dien-so` | Số cặp cạnh liền nhau cắt nhau mà không vuông góc | **2** |
| `lt-3` | `trac-nghiem` | Ba ống nước M, N, P | **Phương án B** |
| `lt-4` | `trac-nghiem` | Tìm đường vuông góc không dùng ê ke | **Gấp sao cho hai phần của AB chồng khít** |
| `lt-5` | `trac-nghiem` | Đu quay: ca-bin đặt gọt bút chì | **Ca-bin 4** (ca-bin 1 cũng đúng, không có trong lựa chọn) |

**Suy nghĩ thêm**: `sn-mai`, `sn-dem`, `sn-dong-ho` như bảng trên.

Đáp án đều được test tính lại từ tọa độ hình vẽ (tích vô hướng của hai hướng), không so với số gõ tay.

## Kỹ thuật

- Thêm prop `illustration?: ReactNode` cho `MatchQuestion` (`components/exercises/types.ts`) và render dưới đề trong `Match` (`components/exercises/question.tsx`), giống các dạng khác. Cần cho `lt-2a`.
- `hinh.ts`: hàm hình học dùng chung của bài (`isPerpendicular`, `angleBetween`, `perpendicularEdgePairs`...). Nếu Bài 28-32 cũng dùng thì chuyển lên `lib/`.
- `_illustrations/`: `CapDuong`, `DaGiac`, `CacGoc`, `CoiXayGio`, `OngNuoc`, `GapGiay`, `DuQuay`, `Khung` (Server Component). `DaGiac` và `CapDuong` có khả năng dùng lại ở Bài 28-32.
- Không thêm token màu hay `unit` mới; `KeyFact` không truyền `unit`.
- Đặt `available: true` cho Bài 27 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "hai đường thẳng vuông góc với nhau", "góc vuông", "ê ke", "cắt nhau", "cạnh".
- Không dạy ký hiệu ⊥, không dùng từ "song song" (Bài 29).
- Hình có tên điểm dùng chữ in hoa; viết "AB và AD".
- Không dạy chứng minh bốn góc vuông.

## Câu hỏi cần chốt

1. **`lt-3` và `lt-5` chỉ một đáp án đúng trong câu trắc nghiệm.** SGK có hai đáp án (A và B; ca-bin 2 và 6). Đề xuất: giữ một đáp án đúng, nói rõ đáp án kia trong lời giải; dạng chọn nhiều đáp án chưa có và chưa đáng thêm.
2. **`hd-3` đổi thành trắc nghiệm.** SGK hỏi mở ("tìm hình ảnh"). Đề xuất: giữ trắc nghiệm để chấm được; `lt-1` mở trong SGK cũng đổi tương tự.
3. **`sn-dong-ho` vượt SGK.** Đề xuất: giữ như câu thử thách. Nếu không muốn, bỏ id này khỏi `bai-tap.ts` và test.
4. **Câu hỏi ê ke bằng hình trên màn hình.** Đề xuất: giữ, và để Phụ huynh gợi ý dùng ê ke thật; nếu muốn có ê ke kéo được trong app thì làm ở Bài 28 (thực hành vẽ).

## Phụ lục: đáp án SGK

Đối chiếu với hình in, chưa đối chiếu với sách đáp án; những chỗ đọc từ hình được ghi rõ.

- **Trang 91, hoạt động 1:** a) hai đường cắt nhau không vuông góc (đo từ hình in khoảng 82°). b) NP và MN vuông góc.
- **Trang 92, hoạt động 2:** BC và CD; CD và DE (góc C, D vuông). **Hoạt động 3:** hai thanh cánh quạt cối xay gió (đề mở).
- **Trang 92, luyện tập 1:** đề mở. **Luyện tập 2:** a) AB và AD; AD và DC. b) AB và BC; BC và CD.
- **Trang 93, luyện tập 3:** A và B (M vuông góc N, N vuông góc P); C sai. Đọc từ hình in.
- **Luyện tập 4:** gấp tờ giấy sao cho hai phần của AB chồng khít; nếp gấp vuông góc với AB. Đây là cách làm thông dụng, chưa đối chiếu sách đáp án.
- **Luyện tập 5:** ca-bin 2 hoặc ca-bin 6 (đọc từ hình in: ca-bin vàng ở vị trí 157,5° so với phương ngang; hai ca-bin vuông góc nằm ở 67,5° và 247,5°).
