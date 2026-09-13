// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44247c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042dfd1 } from "./42dfd1.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e53ca } from "./5e53ca.js";
// @manual — peep struct (stride 0x100, base 0x743b94). Disasm at 0x44247c:
//   cmpb 0x2e/0x2a/0x2b/0x71(%esi)  → u8  at +0x2e/0x2a/0x2b/0x71
//   btrw $0x0, 0xca(%esi)            → u16 test-and-clear-bit at 0x743c5e
//   movw 0xe(%esi), %ax              → u16 at 0x743ba2
//   orb $0x8, 0x45(%esi)             → u8  OR at 0x743bd9
//   movb $0x1a/0x0, 0x71/0x72/0x70(%esi) → u8 stores at 0x743c05/06/04
//   movw 0x4(%esi), %si              → u16 next-peep link at 0x743b98
export function FUN_0044247c(heap) {
  let puVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar2 = ((heap.u32(0x0087c398)) & 0xffff);
  while (uVar2 != 0xffff) {
    uVar3 = ((((uVar2) >>> 0)) >>> 0);
    iVar4 = ((uVar3 * 0x100) >>> 0);
    if ((heap.u8((0x00743bc2) + iVar4) == 0) && (heap.u8((0x00743bbe) + iVar4) == 0)) {
      puVar1 = (((0x00743c5e + iVar4)) >>> 0);
      uVar2 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU16(puVar1, (heap.u16(puVar1) & 0xfffe) & 0xffff);
      if (((uVar2 & 1) != 0) && (in_AX = ((heap.u16((0x00743ba2) + iVar4)) & 0xffff), in_AX != 0x8000)) {
        unaff_EBX = ((unaff_EBX & 0xffff0000) >>> 0);
        in_AX = (((regs.eax = FUN_0042dfd1(heap))) & 0xffff);
        heap.setU8(((0x00743bd9) + iVar4), (heap.u8((0x00743bd9) + iVar4) | 8) & 0xff);
      }
      if (((heap.u8((0x00743bbf) + iVar4) == 5) || (heap.u8((0x00743bbf) + iVar4) == 6)) && (0xfd < heap.u8((0x00743c05) + iVar4))) {
        heap.setU8(((0x00743c05) + iVar4), (0x1a) & 0xff);
        heap.setU8(((0x00743c06) + iVar4), (0) & 0xff);
        heap.setU8(((0x00743c04) + iVar4), (0) & 0xff);
        (regs.eax = FUN_0043c60b(heap));
        in_AX = (((regs.eax = FUN_005e53ca(heap))) & 0xffff);
      }
    }
    uVar2 = ((heap.u16((0x00743b98) + iVar4)) & 0xffff);
  }
  (regs.eax = FUN_00452fce(heap, unaff_EBX));
  return in_AX;
}
