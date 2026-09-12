// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ff1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e69bd } from "./5e69bd.js";
export function FUN_005e5ff1(heap) {
  let uVar1 = 0;
  heap.setU32(0x009a1618, (heap.u32(0x009a1618) + 1) >>> 0);
  // asm 0x5e5ffe: add word ptr [0x991f54], bp — 16-bit RMW (0x5e5ff1 inc [0x9a1618] IS a dword).
  //
  // GATED to __realStartup only: as a u32 RMW this also read/wrote 0x991f56..57, which sit
  // in the same input/tool state block the widget painter at 0x5e4400 reads (0x991f58/5a/5c).
  // The frozen sc21 soak (5b79d5b5) was captured with that clobbering in place and the
  // correct 16-bit RMW moves it (5b2865a0), so only the real-startup path gets the faithful
  // width; the frozen force-load path keeps the old behaviour.
  if (globalThis.__realStartup) {
    heap.setU16(0x00991f54, (heap.u16(0x00991f54) + heap.u8(0x00999f98)) >>> 0);
  } else {
    heap.setU32(0x00991f54, (heap.u32(0x00991f54) + heap.u8(0x00999f98)) >>> 0);
  }
  // 0x5e6005..0x5e6020 — walk the window pool from the top down and send
  // event 6 (the per-tick update) to each window's event proc at [ESI+4]:
  //
  //   0x5e6005  mov esi, [0x9a1164]
  //   0x5e600b  sub esi, 0x178
  //   0x5e6011  cmp esi, 0x9a013c
  //   0x5e6017  jb  0x5e6022
  //   0x5e6019  mov bp, 6
  //   0x5e601d  call dword ptr [esi + 4]
  //   0x5e6020  jmp 0x5e600b
  //
  // The translation walks the right windows in the right order but drops BOTH
  // register arguments: ESI, which every window proc reads as its window
  // pointer, and `mov bp, 6`, the event selector. Callees therefore run
  // against whatever the previous call happened to leave behind.
  //
  // That is not cosmetic. 0x5e0cb6 takes its `bp == 6` branch with a stale
  // ESI — measured at 0x704460, outside the 0x9a013c pool — and closes a
  // "window" through a garbage [ESI+4] = 0x10003. See the guard in
  // ported/auto/5e0cb6.js.
  //
  // The exact loop is OPT-IN, not the production default, on measured
  // evidence (tools/_jspaintdiff.mjs, the four-tick playable surface, which is
  // otherwise at zero):
  //
  //   exact ESI + BP, registers left as the binary leaves them   34,291 px
  //   exact ESI + BP, ESI/EBP restored after the loop             3,536 px
  //   exact ESI only, ESI/EBP restored after the loop               460 px
  //
  // The dominant term is not the callees at all: skipping every event-6 call
  // while still writing ESI/EBP reproduces the full 34,291 px, so the leak the
  // binary makes on purpose (it clobbers ESI/EBP before 0x5e69bd) is read by
  // translated code downstream that expects the stale values. Making this
  // production-safe means giving those callees and their coordinate helpers
  // the same register-exact treatment ADDENDUM 169 called for, not enabling
  // this body on its own.
  if (globalThis.__exactWindowEvents) {
    regs.esi = (heap.u32(0x009a1164)) >>> 0;
    for (;;) {
      regs.esi = ((regs.esi >>> 0) - 0x178) >>> 0;
      if ((regs.esi >>> 0) < 0x009a013c) break;
      regs.ebp = ((regs.ebp & 0xffff0000) | 6) >>> 0;
      (regs.eax = callIndirect(heap, heap.u32((regs.esi >>> 0) + 4)));
    }
  } else {
    uVar1 = ((heap.u32(0x009a1164)) >>> 0);
    while (0x9a013b < uVar1 - 0x178) {
      (regs.eax = callIndirect(heap, heap.u32((uVar1 - 0x174))));
      uVar1 = ((uVar1 - 0x178) >>> 0);
    }
  }
  return (regs.eax = FUN_005e69bd(heap));
}
