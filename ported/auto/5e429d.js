// @manual — do not regenerate.
// Source: decompiled/c/5e429d.c (auto-translated body, plus a stepping-stone
// fallback for the viewport bbox).
//
// FUN_005e429d is "ViewportCreate" — it allocates a viewport struct from
// the pool at 0x009a1168 (stride 0x14), populates it from the caller's
// EAX (packed view_x|view_y), EBX (packed view_w|view_h), EDX (zoom/
// flags), and CL (zoom-shift); writes the struct back into the parent
// window at +8; and updates the parent's +0x16e/+0x170/+0x172.
//
// Stepping-stone: in the current harness, FUN_004298a0 reads the screen
// dims from 0x971ed6/0x971ed8 (which are populated by FUN_009bb9f5 from
// 0x5f2400/0x5f1ff0, the IDirectDraw display-mode shape). At first init
// neither has been written, so the dims are zero, the packed EAX/EBX
// rects are zero, and the viewport gets created with bbox (0,0,0,0). The
// painter walker FUN_009bc041 culls every paint because the bbox is
// degenerate. We default vp+0..6 to 640x480 if the source dims would
// otherwise produce a zero rect, so the title-screen render path can
// proceed while Team B wires up the proper dim flow.
//
// IMPORTANT: this stub MUST NOT alter the parent window's +0x20/+0x24
// (those drive the cull tests for *occluder* windows in 9bc041; changing
// them would make occluders behave as if covering the full screen, which
// is wrong). It only touches the viewport struct's local bbox so that
// the eventual paint of THIS viewport sees a non-empty clip rect.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005df431 } from "./5df431.js";
import { FUN_005e4355 } from "./5e4355.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_005e429d(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CL = regs.ecx & 0xff;
  let in_EDX = regs.edx >>> 0;
  let sVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let piVar3 = 0;
  // Stepping-stone (see header): if the parent window's view rect is
  // empty (both packed values literally zero), substitute a default
  // 640x480 rect anchored at (0, 0). We do this on the LOCAL caller
  // values only — the parent window's +0x20/+0x24 are NOT changed,
  // so 9bc041's occluder cull tests keep their original semantics.
  if (in_EAX === 0 && unaff_EBX === 0) {
    in_EAX = 0;                   // view_y << 16 | view_x = 0
    unaff_EBX = (480 << 16) | 640;  // view_h << 16 | view_w
  }
  piVar3 = ((0x009a1168) >>> 0);
  do {
    if (((heap.i32(piVar3)) << 16 >> 16) == 0) {
      heap.setI32((piVar3 + (1) * 4), (in_EAX) & 0xffffffff);
      heap.setU32(piVar3, (unaff_EBX) & 0xffffffff);
      if ((in_EDX >>> 0x1e & 1) == 0) {
        in_CL = ((0) & 0xff);
      }
      heap.setI32((piVar3 + (3) * 4), (unaff_EBX << (in_CL & 0x1f)) & 0xffffffff);
      heap.setU8((piVar3 + ((4) * 4)), (in_CL) & 0xff);
      heap.setI16((((piVar3) >>> 0) + 0x12), (0) & 0xffff);
      if (heap.u8(0x005f8d5c) == 1) {
        heap.setU16((((piVar3) >>> 0) + 0x12), (heap.u16((((piVar3) >>> 0) + 0x12)) | 0x100) & 0xffff);
      }
      heap.setU32((unaff_ESI + 8), (piVar3) & 0xffffffff);
      if ((in_EDX & 0x80000000) == 0) {
        sVar2 = ((((((in_EDX & 0xbfffffff) >>> 0x10)) << 16 >> 16)) & 0xffff);
        heap.setU16((unaff_ESI + 0x16e), (0xffff) & 0xffff);
      } else {
        heap.setI16((unaff_ESI + 0x16e), ((((in_EDX & 0xbfffffff)) << 16 >> 16)) & 0xffff);
        sVar2 = ((heap.u32((0x00743ba4) + ((in_EDX & 0xffff) * 0x80) * 4)) & 0xffff);
      }
      sVar1 = (((regs.eax = FUN_005e4355(heap))) & 0xffff);
      heap.setI16((unaff_ESI + 0x170), (sVar1) & 0xffff);
      heap.setI16((unaff_ESI + 0x172), (sVar2) & 0xffff);
      heap.setI16((piVar3 + ((2) * 4)), (sVar1) & 0xffff);
      heap.setI16((((piVar3) >>> 0) + 10), (sVar2) & 0xffff);
      return (regs.eax = FUN_005e6a83(heap));
    }
    piVar3 = ((piVar3 + ((5) * 4)) >>> 0);
  } while (piVar3 < 0x009a121c);
  return (regs.eax = FUN_005df431(heap));
}
