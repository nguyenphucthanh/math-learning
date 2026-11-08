import { angleKind, type AngleKind } from "@/lib/hinh";
import { angleBetweenHands } from "@/components/math/dong-ho";

/** Giờ ghi trên từng ô, từ ô 1 đến ô 16 (ô 0 là ô xuất phát). Toàn giờ đúng để góc giữa hai kim chắc chắn. */
export const gioCacO = [4, 3, 9, 8, 1, 10, 6, 5, 11, 2, 7, 9, 3, 6, 4, 1];

/** Ô cuối cùng. Hai ô cuối là hai ô đích. */
export const O_CUOI = gioCacO.length;
export const O_DICH_DAU = O_CUOI - 1;

/** Mặt xúc xắc lẻ thì tiến 1 ô, chẵn thì tiến 2 ô. */
export const buocTien = (mat: number): number => (mat % 2 === 1 ? 1 : 2);

/** Ô đến sau khi gieo, không đi quá ô cuối. */
export const oDen = (viTri: number, mat: number): number => Math.min(O_CUOI, viTri + buocTien(mat));

export const laODich = (o: number): boolean => o >= O_DICH_DAU;

/** Loại góc giữa kim giờ và kim phút ở ô `o` (từ 1 đến 16). */
export const loaiGocO = (o: number): AngleKind => angleKind(angleBetweenHands(gioCacO[o - 1]));

export const loaiGoc: AngleKind[] = ["nhọn", "vuông", "tù", "bẹt"];
