// @manual — do not regenerate.
// Source: decompiled/c/4448fb.c, hand-fixed for two interrelated bugs
// in the auto-translator output. Cross-referenced with the canonical
// disassembly at generated/all.js:52944-52956 (fn_004448fb).
//
// FUN_004448fb walks every sprite_desc slot (0x743b94..0x87c394, stride
// 0x100, 5000 slots) and, for each "active" slot (type byte != 0xff),
// invokes FUN_00444927 to do a forced tile-grid relink + bbox-recompute
// for the freshly-loaded sprite. This is the post-load fixup step that
// computes each sprite's screen bbox (esi+0x16/0x18/0x1a/0x1c). Without
// it, every sprite enters the world with all-zero bbox, the viewport
// painter's clip-rect test (0x444892..0x4448b0) culls every sprite, and
// no pixels reach the back buffer.
//
// Bugs in the auto-port:
//
//   1. The C decompilation in 4448fb.c drops the three register-load
//      instructions at 0x444906 / 0x44490a / 0x44490e because Ghidra
//      models FUN_00444927's register inputs as "external" (the
//      in_AX/in_ECX/in_DX parameters in 444927.c). So the C source has
//      no explicit `AX = mem16(esi+0xe)` etc., and the translator
//      emits no register setup before the call. The binary actually
//      does:
//        0x444906  mov ax, [esi+0x0e]
//        0x44490a  mov cx, [esi+0x10]
//        0x44490e  mov dx, [esi+0x12]
//        0x444912  call 0x444927
//      Without these, 444927 sees whatever AX/CX/DX were before
//      entering this function — typically the caller's leftover state.
//
//   2. The auto-port writes `regs.esi = 0x743b94` (hardcoded, the table
//      base) on every iteration instead of the current slot pointer.
//      That makes every call hit sprite-slot-0 instead of the slot
//      we're iterating. The lifted version at generated/all.js correctly
//      tracks ESI as it advances by 0x100 per iteration.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect, state } from "../../runtime/win32/context.js";
import { FUN_00444927 } from "./444927.js";

function FUN_004448fb_frozen(heap) {
  let esi = 0x00743b94;
  do {
    if (heap.u8(esi) !== 0xff) {
      regs.esi = esi >>> 0;
      regs.eax = heap.u16(esi + 0x0e);
      regs.ecx = heap.u16(esi + 0x10);
      regs.edx = heap.u16(esi + 0x12);
      FUN_00444927(heap);
    }
    esi = (esi + 0x100) >>> 0;
  } while (esi < 0x0087c394);
  return (regs.eax = 1);
}

export function FUN_004448fb(heap) {
  if ((globalThis.__realStartup || state.executionMode === "pure-js") &&
      state.promotedLiftedAddresses.has(0x4448fb)) {
    return callIndirect(heap, 0x4448fb);
  }
  return FUN_004448fb_frozen(heap);
}
