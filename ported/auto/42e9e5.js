// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e9e5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

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
  FUN_005df40c(heap);
  bVar6 = false;
  sVar1 = FUN_00425432(heap);
  if (!bVar6) {
    sVar1 = FUN_00423677(heap);
    if (extraout_var != 0) {
      uVar4 = 0;
      cVar2 = '\a';
      uVar7 = extraout_ECX;
      do {
        cVar3 = '\a';
        do {
          FUN_00423677(heap, uVar7);
          if (extraout_var_00 == extraout_var) {
            uVar4 = uVar4 + 1;
          }
          cVar3 = cVar3 + -1;
        } while (cVar3 != '\0');
        cVar2 = cVar2 + -1;
      } while (cVar2 != '\0');
      if (0x18 < uVar4) {
        uVar4 = FUN_005df40c(heap);
        sVar5 = (uVar4 & 3) + 2;
        do {
          FUN_005df40c(heap);
          FUN_0042e94d(heap, extraout_ECX_00);
          sVar5 = sVar5 + -1;
        } while (sVar5 != 0);
        return sVar1 + 0x10;
      }
    }
  }
  return sVar1;
}
