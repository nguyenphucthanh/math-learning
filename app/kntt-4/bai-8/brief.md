# Brief — Bài 8. Góc nhọn, góc tù, góc bẹt

- SGK: Toán 4 KNTT, tập một, trang 26-30, Chủ đề 2 "Góc và đơn vị đo góc".
- Route: `/kntt-4/bai-8`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên các quyết định ở "Câu hỏi cần chốt" đã chọn theo đề xuất; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài thứ hai của Chủ đề 2. Bài trước là Bài 7 (đo góc, đơn vị đo góc; chưa có trên site). Bài sau là Bài 9 (luyện tập chung của chủ đề). Bài ôn lại: Bài 9, Bài 35 (ôn tập hình học), Bài 32.

**Cấu trúc SGK.**

- Khám phá (tr. 26): ba loại góc so với góc vuông bằng ê ke; khung kiến thức.
- Hoạt động (tr. 26-27): bài 1 tìm góc trong 6 góc; bài 2 hai cái kéo; bài 3 miếng bánh.
- Luyện tập (tr. 27): bài 1 tìm góc trong 6 góc.
- Luyện tập (tr. 28): bài 2 con nhện (a tìm đường có góc tù, b đo góc O bằng thước đo góc); bài 3 đồng hồ (a, b); bài 4 bánh xe.
- Luyện tập (tr. 29): bài 1 chiếc quạt và biểu đồ; bài 2 đếm góc tam giác ABC có AH.
- Trò chơi (tr. 29-30): Giải cứu khủng long.

**Mục tiêu**

1. Nhận biết góc nhọn (bé hơn góc vuông), góc tù (lớn hơn góc vuông), góc bẹt (bằng hai góc vuông).
2. Dùng ê ke xếp loại góc, kể cả góc nằm nghiêng.
3. Gọi tên góc theo đỉnh và cạnh (đỉnh O; cạnh OA, OB).
4. Xếp loại góc tạo bởi kim giờ và kim phút lúc giờ đúng.
5. Đếm các góc trong một hình ghép.
6. Nhận ra lỗi đếm khi so với bảng (biểu đồ chấm).

**Kiến thức cần có.** Góc vuông, ê ke, gọi tên góc (Bài 7); đọc giờ trên đồng hồ kim (lớp 3).

**Điểm mấu chốt**

- Khung kiến thức của SGK so mọi thứ với góc vuông: nhọn bé hơn vuông, tù lớn hơn vuông, bẹt bằng hai vuông. App giữ cách đó; số đo độ không đưa vào khung.
- SGK không nói "tù thì bé hơn bẹt", nhưng bài 3 (miếng bánh) cần ý này để loại miếng bẹt. App ghi ý đó trong KeyFact.
- Bẫy trong SGK: bài 3 miếng bánh có hai điều kiện loại trừ; bài 2 hình tam giác chỉ đếm góc nhọn, vuông, tù (điểm H nằm trên BC, không hỏi góc bẹt); bài 1 tr. 29 bảng chấm có tổng số chấm nhiều hơn số quạt.
- Đồng hồ: SGK chỉ dùng giờ đúng. App cũng chỉ dùng giờ đúng (không dùng 12 giờ vì hai kim trùng, không tạo góc).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhầm góc tù với góc nhọn | Gọi góc 130° là nhọn (đúng: tù) | `BaLoaiGoc` bước nhọn/tù đặt cạnh nhau với ê ke; `goc-dem-mot` |
| Cho rằng góc bé hơn góc bẹt nào cũng nhọn | "Bé hơn bẹt thì là nhọn" (đúng: vuông và tù cũng bé hơn bẹt) | `sn-loi-sai`, `thu-loai` |
| Đoán loại góc theo độ dài cạnh | Cạnh dài thì góc to | Phụ huynh: vẽ cùng một góc với cạnh ngắn rồi dài |
| Không nhận ra góc nghiêng | Bỏ sót góc quay hướng khác | `NhieuGoc` có góc quay nhiều hướng; dùng ê ke |
| Đồng hồ: nhầm 3 giờ và 9 giờ với góc tù | Cho 9 giờ là góc tù (đúng: vuông) | `GocDongHo`, `dong-ho-vuong`, `dong-ho-noi` |
| Đếm sót/lặp góc trong hình ghép | Đếm sót góc BAH, HAC ở `tam-giac` | `tam-giac` explanation liệt kê từng góc |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: 90°, đỉnh góc, ê ke (Bài 7) |
| So sánh | Dùng | Mọi loại góc so với góc vuông (`BaLoaiGoc`); `pizza` so các miếng |
| Bốn kênh | Dùng | Nói (khung kiến thức), hình (2 animation, hình SVG), nhẩm (giờ trên đồng hồ), tay (ê ke, bù ngoài app ở Phụ huynh) |
| Câu tư duy | Dùng nhẹ | `sn-loi-sai` (tìm lỗi), `sn-mot-va-muoi-mot` (đối xứng của đồng hồ), `sn-mot-loai` (vì sao) |
| Đếm | Dùng nhẹ | Đếm góc theo loại (`goc-dem-mot`, `tam-giac`, `quat`) |
| Tách | Không dùng | Bài không có số lớn hay số đo ghép |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-vuong` | `dien-so` | Góc vuông bằng ? độ | **90** |
| `kd-dinh` | `trac-nghiem` | Góc đỉnh O; cạnh OA, OB: đỉnh là | **Điểm O** |
| `kd-eke` | `trac-nghiem` | Hai cạnh khít ê ke là góc gì | **Góc vuông** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-loai` | `trac-nghiem` | Góc M lớn hơn vuông, bé hơn bẹt | **Góc tù** |
| `thu-bet` | `dien-so` | Góc bẹt bằng ? góc vuông | **2** |
| `thu-dong-ho` | `trac-nghiem` | Lúc 5 giờ hai kim tạo góc gì | **Góc tù** |

**Suy nghĩ thêm** (vượt SGK, vì chỉ để tự kiểm tra lại)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-loi-sai` | `trac-nghiem` | "Bé hơn góc bẹt cũng là góc nhọn" | **Sai: vuông và tù cũng bé hơn bẹt** |
| `sn-mot-va-muoi-mot` | `trac-nghiem` | Lúc 1 giờ và 11 giờ, hai góc | **Cùng là góc nhọn** |
| `sn-mot-loai` | `trac-nghiem` | Có góc vừa nhọn vừa tù không | **Không** |

## Phần Phụ huynh

1. **Con học gì**: ba loại góc mới so với góc vuông; xếp loại bằng ê ke; góc của hai kim đồng hồ; trò chơi.
2. **Cần biết trước**: góc vuông, ê ke, gọi tên góc (Bài 7); đọc giờ.
3. **Cách giải thích**: đúng lời khung SGK; dùng ê ke; 3 giờ, 9 giờ vuông, 6 giờ bẹt.
4. **Lỗi**: nhọn/tù; "bé hơn bẹt là nhọn"; đoán theo độ dài cạnh; góc nghiêng; nhầm giờ.
5. **Hoạt động**: tìm góc quanh nhà (bàn, kéo, cánh cửa); chơi lại trò chơi.
6. **Dấu hiệu nắm bài**: nói đúng thứ tự nhọn < vuông < tù < bẹt; tự xếp loại góc mới vẽ; nói lúc 3, 6, 9 giờ.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Ba loại góc | So với góc vuông của ê ke | `BaLoaiGoc`, 4 bước: góc vuông; nhọn; tù; bẹt (hai ê ke) | `Nhọn < vuông < tù < bẹt` | `thu-loai`, `thu-bet` |
| 2. Dùng ê ke | Trong, khít, ngoài ê ke | không có (văn bản ngắn) | không có | không có |
| 3. Hai kim đồng hồ | 3, 2, 4, 6 giờ | `GocDongHo`, 4 bước: một đồng hồ thay đổi giờ | `3 giờ, 9 giờ: góc vuông. 6 giờ: góc bẹt` | `thu-dong-ho` |

Hình rộng 340 (góc) và 220 (đồng hồ) trong `viewBox`, co theo màn hình; chữ từ 15 trở lên. Mỗi bước chỉ hiện một góc/một giờ.

## Phần Bài tập

Giữ dạng và độ khó SGK, đổi số liệu và hình (tự vẽ lại, không dùng ảnh SGK).

| Nhóm | Id | Dạng | Câu | Đáp án |
|---|---|---|---|---|
| Hoạt động (tr. 26-27) | `goc-dem-mot` | `dien-so` | Đếm 6 góc theo loại (tương ứng HĐ1) | **3, 1, 1, 1** |
| | `goc-tu-mot` | `trac-nghiem` | Góc đỉnh nào là góc tù | **Góc đỉnh B** |
| | `keo-tu`, `keo-nhon` | `trac-nghiem` | Hai cái kéo (HĐ2) | **Kéo đỏ; Kéo xanh** |
| | `pizza` | `trac-nghiem` | Miếng bánh An chọn (HĐ3) | **Miếng 2** |
| Luyện tập 1 (tr. 27) | `goc-chon-tu` | `trac-nghiem` | Những góc nào là góc tù | **M và S** |
| | `goc-noi` | `noi-cap` | Nối góc với loại góc | N vuông, U bẹt, P nhọn, S tù |
| Luyện tập 2 (tr. 28) | `nhen` | `trac-nghiem` | Đường có góc tù (bài 2a, đơn giản hóa) | **Đường xanh** |
| | `dong-ho-noi` | `noi-cap` | Nối đồng hồ với loại góc (bài 3a) | A bẹt, B nhọn, C vuông, D tù |
| | `dong-ho-vuong` | `trac-nghiem` | Lúc khác tạo góc vuông (bài 3b) | **3 giờ** |
| | `banh-xe` | `trac-nghiem` | Nan đỏ nào (bài 4) | **Nan B** |
| Luyện tập 3 (tr. 29) | `quat` | `trac-nghiem` | Cột bị nhầm (bài 1) | **Góc vuông** |
| | `tam-giac` | `dien-so` | Đếm góc tam giác (bài 2) | **4, 2, 1** |
| Suy nghĩ thêm | `sn-loi-sai`, `sn-mot-va-muoi-mot`, `sn-mot-loai` | `trac-nghiem` | xem trên | |

Không làm trong app, kèm lý do:

- Luyện tập 2b (dùng thước đo góc đo góc O): cần thước đo góc thật và dạng đo trên hình; app chưa có dạng này. Ghi trong Phụ huynh.
- Luyện tập 2a bản gốc là mê cung nhiều đường: đơn giản hóa thành hai đường gấp khúc, không so cùng điểm xuất phát.

Trò chơi Giải cứu khủng long (tr. 29-30): làm thành component riêng `_game/giai-cuu-khung-long.tsx`, hai người chơi trên một màn hình, bàn chơi 16 ô toàn giờ đúng (hai ô cuối là đích). Luật theo SGK: xúc xắc mặt lẻ tiến 1 ô, mặt chẵn tiến 2 ô; đúng thì ở lại, sai thì về ô cũ; đến một trong hai ô đích thì thắng. Logic thuần ở `_game/ban-co.ts`.

## Kỹ thuật

- Chuyển `BonDongHo` từ `app/kntt-4/bai-35/_illustrations/` lên `components/math/bon-dong-ho.tsx` vì dùng từ 2 bài (Bài 8 và Bài 35); cập nhật import của Bài 35.
- Dữ liệu hình ở `_illustrations/du-lieu.ts` (thuần, để test tính lại bằng `angleAt` và `angleKind` của `lib/hinh.ts`).
- Đặt `available: true` cho Bài 8 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: góc nhọn, góc tù, góc bẹt, góc vuông, đỉnh, cạnh, ê ke.
- Khung kiến thức: nhọn bé hơn vuông; tù lớn hơn vuông; bẹt bằng hai góc vuông.
- Số đo: chỉ dùng 90° (góc vuông) và số độ trong lời giải; không dạy cách đo, không dạy 30° mỗi số trên đồng hồ.
- Không dạy: đo góc bằng thước đo góc (Bài 7), các cặp góc kề bù.

## Câu hỏi cần chốt

1. Luyện tập 2 (con nhện, đo góc O) có làm đầy đủ không? Đề xuất: đơn giản hóa 2a, bỏ 2b. Lý do: cần thước đo góc và mê cung nhiều đường khó vẽ lại chính xác.
2. Trò chơi có làm thành component tương tác không? Đề xuất: có, hai người một màn hình. Lý do: SGK coi đây là phần luyện tập; trò chơi các bài trước cũng làm vậy.
3. Có ghi số đo độ của góc nhọn/tù không? Đề xuất: không. Lý do: SGK Bài 8 chỉ so với góc vuông.

## Phụ lục: đáp án SGK

Suy ra từ hình in (tính trên tọa độ ước lượng từ hình), chưa đối chiếu sách giáo viên.

- Tr. 26, HĐ1: nhọn MON, VDU; tù PBQ, GAH; vuông ICK; bẹt XEY.
- Tr. 27, HĐ2: kéo xanh nhọn, kéo đỏ tù.
- Tr. 27, HĐ3: miếng 2.
- Tr. 27, LT1: nhọn EIH, PIR; vuông AOB; tù COD, KIL; bẹt UVX.
- Tr. 28, LT2: hình in khó đo, chưa có đáp án chắc chắn.
- Tr. 28, LT3: a) 6 giờ bẹt, 2 giờ nhọn, 9 giờ vuông, 4 giờ tù; b) 3 giờ.
- Tr. 28, LT4: nan B (theo hình in, chưa chắc chắn).
- Tr. 29, LT1: hình in khó đếm, chưa có đáp án chắc chắn.
- Tr. 29, LT2: 4 góc nhọn, 2 góc vuông, 1 góc tù.
- Trò chơi: không có đáp án.
