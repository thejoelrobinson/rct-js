// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e9e5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00425432 } from "./425432.js";
import { FUN_0042e94d } from "./42e94d.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e9e5(heap) {
  let sVar1 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_var = 0;
  let extraout_var_00 = 0;
  let cVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  (regs.eax = FUN_005df40c(heap));
  bVar6 = ((false) & 0xff);
  sVar1 = (((regs.eax = 0x400, regs.ecx = 0x400, regs.eax = FUN_00425432(heap))) & 0xffff);
  if (!bVar6) {
    sVar1 = (((regs.eax = 0x400, regs.ecx = 0x400, regs.eax = FUN_00423677(heap))) & 0xffff);
    if (extraout_var != 0) {
      uVar4 = ((0) & 0xffff);
      cVar2 = ((7) & 0xff);
      uVar7 = ((extraout_ECX) >>> 0);
      do {
        cVar3 = ((7) & 0xff);
        do {
          (regs.eax = 0x400, regs.ecx = 0x400, regs.eax = FUN_00423677(heap, uVar7));
          if (extraout_var_00 == extraout_var) {
            uVar4 = ((uVar4 + 1) & 0xffff);
          }
          cVar3 = ((cVar3 + -1) & 0xff);
        } while (cVar3 != 0);
        cVar2 = ((cVar2 + -1) & 0xff);
      } while (cVar2 != 0);
      if (0x18 < uVar4) {
        uVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
        sVar5 = (((uVar4 & 3) + 2) & 0xffff);
        do {
          (regs.eax = FUN_005df40c(heap));
          (regs.eax = FUN_0042e94d(heap, extraout_ECX_00));
          sVar5 = ((sVar5 + -1) & 0xffff);
        } while (sVar5 != 0);
        return sVar1 + 0x10;
      }
    }
  }
  return sVar1;
}
