// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e7ef.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
// @manual — translator emitted u32 stride for byte/word loads/stores on peep
// struct (stride 0x100, base 0x743b94). Disasm at 0x43e7ef:
//   movw 0x4(%esi), %si        → u16 read at 0x743b98 + peep*0x100
//   cmpb $0x6, 0x2b(%esi)      → u8  read at 0x743bbf + peep*0x100
//   cmpb 0x68(%esi), %bh       → u8  read at 0x743bfc + peep*0x100
//   movb $0x0, 0x2b(%esi)      → u8  store at 0x743bbf + peep*0x100
export function FUN_0043e7ef(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let iVar2 = 0;
  for (uVar1 = ((heap.u32(0x0087c398)) & 0xffff); uVar1 != 0xffff; uVar1 = (((heap.u16((0x00743b98) + (((uVar1) >>> 0) * 0x100))) & 0xffff)) >>> 0) {
    iVar2 = ((((uVar1) >>> 0) * 0x100) >>> 0);
    if ((heap.u8((0x00743bbf) + iVar2) == 6) && (((in_EDX) << 24 >> 24) == ((heap.u8((0x00743bfc) + iVar2)) << 24 >> 24))) {
      (regs.eax = FUN_0043e792(heap));
      (regs.eax = FUN_0044142c(heap));
      heap.setU8(((0x00743bbf) + iVar2), (0) & 0xff);
      (regs.eax = FUN_00441452(heap));
    }
  }
  return 1;
}
