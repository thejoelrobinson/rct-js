// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0650.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00436795 } from "./436795.js";
import { FUN_005e59ec } from "./5e59ec.js";
export function FUN_005e0650(heap) {
  let pbVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  uVar4 = ((in_CX << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
  pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((heap.u8(pbVar5) & 0x3c) == 0x14) {
      sVar2 = ((((heap.u8(pbVar5 + (2))) & 0xffff) * 4) & 0xffff);
      if (sVar2 <= ((in_EDX) << 16 >> 16)) {
        sVar3 = ((sVar2 + 0x20) & 0xffff);
        if (((heap.u8(pbVar5 + (4)) & 0xf) != 0) && (sVar3 = ((sVar2 + 0x30) & 0xffff), (heap.u8(pbVar5 + (4)) & 0x10) != 0)) {
          sVar3 = ((sVar2 + 0x40) & 0xffff);
        }
        if (((in_EDX) << 16 >> 16) < sVar3) {
          (regs.eax = FUN_005e59ec(heap, pbVar5));
          (regs.eax = FUN_00436795(heap));
        }
      }
      break;
    }
    pbVar1 = ((pbVar5 + 1) >>> 0);
    pbVar5 = ((pbVar5 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  return 1;
}
