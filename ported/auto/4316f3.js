// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4316f3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00431ad7 } from "./431ad7.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433e1c } from "./433e1c.js";
import { FUN_00436b2a } from "./436b2a.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_004316f3(heap) {
  let bVar1 = 0;
  let piVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_DX = regs.edx & 0xffff;
  let iVar5 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar6 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let sVar7 = 0;
  let uVar8 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar9 = 0;
  let iVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let piVar11 = 0;
  // HAND-FIX: DAT_00991f8c is a ushort (per Ghidra). The translator
  // emitted setU32 which trashes the adjacent 16-bit global at 0x991f8e
  // (the tile-grid head array start). That corrupts grid slot 0 → 0,
  // sending the painter walker at 0x444820 into an infinite cycle on
  // tile-pool slot 0 (whose own next-index is also 0).
  heap.setU16(0x00991f8c, (heap.u16((unaff_ESI + 0x12))) & 0xffff);
  // HAND-FIX: Translator emitted setU8 but binary does `mov word [imm], ax`
  // (16-bit stores). The values can exceed 0xff (e.g. clipY=2047 in world
  // coords), so truncating to a byte silently mangled the computed pixel
  // pointer at DAT_005f96c0 — moving the painter's strip writes to ~3800
  // rows BEFORE the back buffer instead of inside it.
  heap.setU8 (0x005f96ce, (heap.u16((unaff_ESI + 0x10))) & 0xff);  // zoom (u8)
  uVar8 = ((-1 << (heap.u8((unaff_ESI + 0x10)) & 0x1f)) & 0xffff);
  heap.setU16(0x005f96c4, (in_AX & uVar8) & 0xffff);
  heap.setU16(0x005f96c6, (unaff_BX & uVar8) & 0xffff);
  heap.setU16(0x005f96c8, (in_DX - in_AX & uVar8) & 0xffff);
  heap.setU16(0x005f96ca, (unaff_BP - unaff_BX & uVar8) & 0xffff);
  bVar1 = ((heap.u8((unaff_ESI + 0x10))) & 0xff);
  // HAND-FIX: setU8/u8 → setU16/u16 for the 16-bit clip fields below.
  // DAT_005f96cc (sVar7 init) is computed from u16 values but stored u8 —
  // the translator's setU8 here is consistent with the binary's
  // `mov byte [0x5f96cc], cl` (a sign-mangling on purpose for the strip
  // row index — see C `-((c8>>zoom) - edi[2] - edi[3])`).
  heap.setU8(0x005f96cc, (-(((heap.i16(0x005f96c8) >>> (bVar1 & 0x1f)) - ((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) - ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16))) & 0xff);
  heap.setU32(0x005f96c0, (heap.i32(unaff_EDI) + ((((((((((heap.u16(0x005f96c4) - (heap.u16((unaff_ESI + 8)) & uVar8))) << 16 >> 16) >> (bVar1 & 0x1f)) + heap.i16((unaff_ESI + 4))) - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16))) << 16 >> 16)) | 0) + (((((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16))) << 16 >> 16)) | 0) * ((((((((((heap.u16(0x005f96c6) - (heap.u16((unaff_ESI + 10)) & uVar8))) << 16 >> 16) >> (bVar1 & 0x1f)) + heap.i16((unaff_ESI + 6))) - heap.i16((((unaff_EDI) | 0) + 6)))) << 16 >> 16)) | 0)) >>> 0);
  piVar11 = ((0x005f96d0) >>> 0);
  uVar4 = ((heap.u16(0x005f96c4) & 0xffffffe0) >>> 0);
  heap.setU32(0x005f96d6, (heap.u16(0x005f96c6)) >>> 0);
  heap.setU32(0x005f96da, (heap.u16(0x005f96ca)) >>> 0);
  heap.setU32(0x005f96de, (heap.u8(0x005f96ce)) >>> 0);
  do {
    uVar3 = ((heap.u32(0x005f96c4)) >>> 0);
    uVar6 = ((heap.u32(0x005f96c8)) >>> 0);
    iVar5 = ((heap.u32(0x005f96c0)) >>> 0);
    sVar7 = ((heap.u8(0x005f96cc)) & 0xffff);
    if (((uVar3) | 0) <= ((uVar4) | 0)) {
      uVar6 = ((uVar6 - (uVar4 - uVar3)) >>> 0);
      iVar9 = (((((uVar4 - uVar3)) | 0) >>> (heap.u8(0x005f96ce) & 0x1f)) >>> 0);
      iVar5 = ((heap.u32(0x005f96c0) + iVar9) >>> 0);
      sVar7 = ((heap.u8(0x005f96cc) + ((iVar9) << 16 >> 16)) & 0xffff);
      uVar3 = ((uVar4) >>> 0);
    }
    uVar4 = ((uVar4 + 0x20) >>> 0);
    iVar9 = ((uVar6 + uVar3) >>> 0);
    if (((uVar4) | 0) <= iVar9) {
      iVar10 = ((iVar9 - uVar4) >>> 0);
      iVar9 = ((iVar9 - iVar10) >>> 0);
      sVar7 = ((sVar7 + (((iVar10 >>> (heap.u8(0x005f96ce) & 0x1f))) << 16 >> 16)) & 0xffff);
    }
    heap.setI16((piVar11 + ((1) * 4)), (((uVar3) << 16 >> 16)) & 0xffff);
    heap.setI16((piVar11 + ((2) * 4)), (((iVar9) << 16 >> 16) - ((uVar3) << 16 >> 16)) & 0xffff);
    heap.setU32(piVar11, (iVar5) & 0xffffffff);
    heap.setI16((piVar11 + ((3) * 4)), (sVar7) & 0xffff);
    if ((heap.u32(0x00991f8c) & 1) != 0) {
      (regs.eax = FUN_009b30bc(heap));
    }
    heap.setU32(0x005f96e0, (0x006284ac) >>> 0);
    heap.setU32(0x00981ef8, (piVar11) >>> 0);
    (regs.eax = FUN_00431b6f(heap));
    (regs.eax = FUN_00436b2a(heap));
    (regs.eax = FUN_00433bae(heap));
    (regs.eax = FUN_00433e1c(heap));
    piVar2 = ((heap.u32(0x00981ef8)) >>> 0);
    if ((heap.i32((0x00628a3c + heap.u32(0x008d7eb4) * 4)) | 0) != -1) {
      (regs.eax = FUN_009b30f1(heap));
      piVar11 = ((piVar2) >>> 0);
    }
    (regs.eax = FUN_00431ad7(heap));
  } while (((uVar4) << 16 >> 16) < (((heap.u16(0x005f96c4) + heap.u16(0x005f96c8))) << 16 >> 16));
  return;
}
