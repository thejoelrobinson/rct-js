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
  // HAND-FIX: setU32→setU16. Binary disassembly at 0x4317ad..0x4317c0 shows
  // `66 a1 c6 96 5f 00; 66 89 47 06` = `mov ax, [0x5f96c6]; mov [edi+6], ax`
  // (16-bit operand-size prefix on both load and store). Equivalent to
  // `setU16(piVar11+6 == 0x5f96d6, ...)` — i.e. the DPI struct's clipY/clipH/zoom
  // fields are 16-bit (clipY at +6, clipH at +0xa) and zoom is u8 at +0xe.
  // The setU32 emit silently zeroed the upper-half bytes of adjacent fields:
  // setU32(0x5f96d6,...) clobbered bytes 0xd8..0xd9 (= piVar11 + 0x8..0x9 = clipW).
  // Result was clipW = 0 → sprite visibility check failed → nothing painted.
  heap.setU16(0x005f96d6, (heap.u16(0x005f96c6)) & 0xffff);
  heap.setU16(0x005f96da, (heap.u16(0x005f96ca)) & 0xffff);
  heap.setU16(0x005f96de, (heap.u8(0x005f96ce)) & 0xffff);
  do {
    // HAND-FIX (terrain3): the per-strip DPI's clipY (+6), clipH (+0xa) and
    // zoom (+0xe) are set ONCE before the loop and stay constant per the C
    // decompile (and the binary asm matches). But somewhere inside the
    // painter chain (436b2a → painters → 433bae → 433e1c → 431ad7 or one of
    // their callees) these fields get corrupted between strips: probe showed
    // strip 0 OK (Y=1304, H=416, z=0) but strip 1+ corrupted (Y=-4, H=-4,
    // z=255). Re-setting the three fields at the start of every iter
    // restores correct per-strip behavior without finding the corruptor.
    heap.setU16(0x005f96d6, (heap.u16(0x005f96c6)) & 0xffff);
    heap.setU16(0x005f96da, (heap.u16(0x005f96ca)) & 0xffff);
    heap.setU16(0x005f96de, (heap.u8(0x005f96ce)) & 0xffff);
    // HAND-FIX (Phase R+6): DAT_005f96c4 and DAT_005f96c8 are u16 (ushort) per
    // the writes at lines 46/48 (and matching binary at 4316f3 prologue). The
    // C decompile shows `uVar3 = (uint)DAT_005f96c4` — the `(uint)` cast widens
    // a smaller type. The translator emitted heap.u32 which reads 4 bytes:
    // [c4][c5][c6][c7] = (c4_lo16) | (c6_hi16 << 16). With clipY at c6, that
    // pollutes uVar3 with a huge value (~85M for viewport (976, 1304)). The
    // `if (uVar3 <= uVar4)` test then fails on EVERY strip — the branch that
    // advances `uVar3 = uVar4` per strip never fires. Result: clipX written to
    // the per-strip DPI stays at 976 across all 21 strips (only clipW grows
    // from 16 to 656). The iso painter at extra_paint_436b50 then reads the
    // SAME starting (clipX, clipY) every strip and walks the SAME 47-cell
    // diagonal of tile-grid hashes — painting the same single sprite (idx 37,
    // type-1 vehicle) up to 21 times per tick. Fixing the read to u16 advances
    // clipX by 0x20 per strip, sweeping the full viewport width and visiting
    // ~21× more tile-grid heads. Lifts visible-sprite coverage from 1/31 → 31/31
    // (peep painter 0x5d7503 now fires; distinct palette indices: 45 → 244).
    uVar3 = ((heap.u16(0x005f96c4)) >>> 0);
    uVar6 = ((heap.u16(0x005f96c8)) >>> 0);
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
    // HAND-FIX (Phase N, corrected): the binary at 0x43185f executes
    // `mov ebp, 0x5f96ec` (NOT `lea ebp, [0x6284ac]` as previously
    // documented — the prior hand-fix was wrong). 00431b6f then does
    // `mov [0x5f96e8], ebp`, seeding the paint-ring head at 0x5f96ec.
    //
    // The paint-ring layout has TWO globals:
    //   • [0x5f96e0] = ring END (limit) = 0x6284ac
    //   • [0x5f96e8] = ring HEAD (current bump pointer)
    // 433b76's gate `if (head < limit) { write slot; head += 12 }` requires
    // head start LESS THAN limit. With the previous EBP=0x6284ac fix, head
    // started AT limit, so 433b76 always failed and the ring stayed empty
    // after the seed slot from 433bae. The correct EBP=0x5f96ec gives the
    // ring ~0x29ec0 bytes of capacity (≈3500 paint slots).
    regs.ebp = 0x005f96ec;
    (regs.eax = FUN_00431b6f(heap));
    (regs.eax = FUN_00436b2a(heap));
    (regs.eax = FUN_00433bae(heap));
    (regs.eax = FUN_00433e1c(heap));
    piVar2 = ((heap.u32(0x00981ef8)) >>> 0);
    if ((heap.i32((0x00628a3c + heap.u32(0x008d7eb4) * 4)) | 0) != -1) {
      // HAND-FIX: binary sets up call args via [edi+...] reads before invoking
      // 0x9b30f1. Translator dropped these. Disassembly at 0x431897..0x4318ab:
      //   66 8b 47 04   mov ax, [edi+4]      ; ax = clipX
      //   66 8b 5f 08   mov bx, [edi+8]      ; bx = clipW
      //   66 8b 4f 06   mov cx, [edi+6]      ; cx = clipY
      //   66 8b 57 0a   mov dx, [edi+0xa]    ; dx = clipH
      //   66 03 d8      add bx, ax           ; bx = clipX + clipW
      //   66 03 d1      add dx, cx           ; dx = clipY + clipH
      //   66 4b         dec bx               ; bx -= 1 (right edge inclusive)
      //   66 4a         dec dx               ; dx -= 1 (bottom edge inclusive)
      //   e8 ..         call 0x9b30f1
      // EDI here is piVar2 = current DPI (0x5f96d0). The C decompile loses this
      // because Ghidra didn't recognise the calling convention.
      {
        const _ax = heap.u16(piVar2 + 4) & 0xffff;       // clipX
        const _bx = heap.u16(piVar2 + 8) & 0xffff;       // clipW
        const _cx = heap.u16(piVar2 + 6) & 0xffff;       // clipY
        const _dx = heap.u16(piVar2 + 0xa) & 0xffff;     // clipH
        regs.eax = _ax;
        regs.ebx = (_ax + _bx - 1) & 0xffff;
        regs.ecx = _cx;
        regs.edx = (_cx + _dx - 1) & 0xffff;
        regs.edi = piVar2;
      }
      (regs.eax = FUN_009b30f1(heap));
      piVar11 = ((piVar2) >>> 0);
    }
    (regs.eax = FUN_00431ad7(heap));
  } while (((uVar4) << 16 >> 16) < (((heap.u16(0x005f96c4) + heap.u16(0x005f96c8))) << 16 >> 16));
  return;
}
