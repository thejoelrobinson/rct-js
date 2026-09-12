// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42635e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043c698 } from "./43c698.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005e53ca } from "./5e53ca.js";
// @manual — ride/peep struct stride 0x260 at 0x887420, peep struct stride
// 0x100 at 0x743b94. Disasm at 0x42635e:
//   cmpw $-0x1, 0x88744a(%edi,%ebx,2)  → u16 array stride 2 (edi=ride*0x260)
//   movw 0x88746a(%edi,%ebx,2), %ax    → u16 array stride 2
//   movb 0x887452(%ebx,%edi), %dl      → u8  array stride 1
//   movl 0x971ef4(,%ebp,4), %ebp       → u32 array stride 4 (correct)
//   peep struct at 0x743b94: 0x2b/0x2c/0x68/0x1e/0x3a/0x3b/0x45 → u8 fields
//   movb $0x0, 0x88752b/0x88752d(%edi); orb $0x4, 0x88751d(%edi) → u8 stores
export function FUN_0042635e(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let local_24 = 0;
  LAB_00426416: {
  uVar8 = ((in_EDX & 0xff) >>> 0);
  iVar9 = ((uVar8 * 0x260) >>> 0);
  uVar4 = ((0) >>> 0);
  do {
    if ((heap.u16((0x0088744a) + iVar9 + uVar4 * 2) & 0xffff) != 0xffff) {
      uVar6 = ((heap.u16((0x0088746a) + iVar9 + uVar4 * 2)) & 0xffff);
      if (uVar6 != 0xffff) {
        uVar4 = ((heap.u8((0x00887452) + (iVar9 + uVar4))) >>> 0);
        for (pbVar5 = ((heap.u32((0x00971ef4) + ((((((uVar6 >>> 8) << 0xc | (uVar6 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar6 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); (uVar4 = ((CONCAT11(heap.u8(pbVar5), ((uVar4) << 24 >> 24)) & 0xffff3cff) >>> 0), (((uVar4 >>> 8)) << 24 >> 24) != 16 || (((uVar4) & 0xff) != heap.u8(pbVar5 + (2)))); pbVar5 = (((pbVar5 + 8) >>> 0)) >>> 0) {

        }
        cVar3 = (((heap.u8(pbVar5) & 3 ^ 2) << 3) & 0xff);
        break LAB_00426416;
      }
      break;
    }
    uVar4 = ((uVar4 + 1) >>> 0);
  } while (uVar4 < 4);
  cVar3 = ((-1) & 0xff);
  }
  local_24 = ((((in_EDX) << 24 >> 24)) & 0xff);
  for (uVar6 = ((heap.u16(0x0087c398)) & 0xffff); uVar6 != 0xffff; uVar6 = (((heap.u16((0x00743b98) + (((uVar6) >>> 0) * 0x100))) & 0xffff)) >>> 0) {
    iVar7 = ((((uVar6) >>> 0) * 0x100) >>> 0);
    if (((((heap.u8((0x00743bbf) + iVar7) == 2) || (heap.u8((0x00743bbf) + iVar7) == 7)) || (heap.u8((0x00743bbf) + iVar7) == 4)) || (heap.u8((0x00743bbf) + iVar7) == 3)) && (local_24 == heap.u8((0x00743bfc) + iVar7))) {
      (regs.eax = FUN_0044142c(heap));
      if ((heap.u8((0x00743bbf) + iVar7) == 2) && (heap.u8((0x00743bc0) + iVar7) == 0)) {
        (regs.eax = FUN_0043e792(heap));
      }
      (regs.eax = FUN_005e53ca(heap));
      if (((cVar3 << 24 >> 24) | 0) == -1) {
        (regs.eax = FUN_00444927(heap));
      } else {
        (regs.eax = FUN_00444927(heap));
        heap.setU8(((0x00743bb2) + iVar7), (cVar3) & 0xff);
      }
      uVar2 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
      heap.setU8(((0x00743bbf) + iVar7), (0) & 0xff);
      (regs.eax = FUN_0043c698(heap, uVar2));
      uVar4 = ((heap.u8((0x00743bce + iVar7))) >>> 0);
      if (heap.u8((0x00743bcf) + iVar7) <= heap.u8((0x00743bce + iVar7))) {
        uVar4 = ((heap.u8((0x00743bcf) + iVar7)) >>> 0);
      }
      bVar1 = ((((uVar4 >>> 1) & 0xff) & 0x7f) & 0xff);
      heap.setU8(((0x00743bce) + iVar7), (bVar1) & 0xff);
      heap.setU8(((0x00743bcf) + iVar7), (bVar1) & 0xff);
      heap.setU8(((0x00743bd9) + iVar7), (heap.u8((0x00743bd9) + iVar7) | 2) & 0xff);
    }
  }
  heap.setU8(((0x0088752b) + iVar9), (0) & 0xff);
  heap.setU8(((0x0088752d) + iVar9), (0) & 0xff);
  heap.setU8(((0x0088751d) + iVar9), (heap.u8((0x0088751d) + iVar9) | 4) & 0xff);
  return 1;
}
