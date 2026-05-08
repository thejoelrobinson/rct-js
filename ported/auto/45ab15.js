// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45ab15.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042913a } from "./42913a.js";
import { FUN_00429249 } from "./429249.js";
import { FUN_00429361 } from "./429361.js";
import { FUN_004294a2 } from "./4294a2.js";
import { FUN_00429502 } from "./429502.js";
import { FUN_0042e9e5 } from "./42e9e5.js";
import { FUN_004314c5 } from "./4314c5.js";
import { FUN_00442516 } from "./442516.js";
import { FUN_0044290a } from "./44290a.js";
import { FUN_00443f36 } from "./443f36.js";
import { FUN_0044408f } from "./44408f.js";
import { FUN_004440ac } from "./4440ac.js";
import { FUN_0044470e } from "./44470e.js";
import { FUN_0044a246 } from "./44a246.js";
import { FUN_00451d6e } from "./451d6e.js";
import { FUN_0045818d } from "./45818d.js";
export function FUN_0045ab15(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  if (((uint)(ushort)(heap.u32(0x006e3b82) + 4) * (uint) * (0x0064bc60 + (heap.u32(0x006e3b80) & 7) * 2) >>> 0x10) != (heap.u32(0x006e3b82) * (uint) * (0x0064bc60 + (heap.u32(0x006e3b80) & 7) * 2) >>> 0x10)) {
    FUN_0044470e(heap);
    FUN_0044290a(heap);
  }
  if (0xffee < (ushort)(heap.u32(0x006e3b82) << 2)) {
    FUN_0045818d(heap);
    FUN_004314c5(heap);
    FUN_0044408f(heap);
    FUN_004440ac(heap);
    FUN_00442516(heap);
    FUN_00451d6e(heap);
    uVar2 = (heap.u32(0x006e3b80) & 7) == 0;
    if ((heap.u32(0x006e3b80) & 7) < 2) {
      sVar1 = 100;
      do {
        FUN_0042e9e5(heap);
        if (!uVar2) {
          break;
        }
        sVar1 = sVar1 + -1;
      } while (sVar1 != 0);
    }
    FUN_0042913a(heap);
    FUN_00429249(heap);
  }
  sVar1 = heap.u32(0x006e3b82) * 2 + 8;
  if (0xfff7 < (ushort)(heap.u32(0x006e3b82) * 2)) {
    sVar1 = FUN_0044a246(heap);
  }
  bVar3 = 0xfffb < heap.u32(0x006e3b82);
  heap.setU32(0x006e3b82, (heap.u32(0x006e3b82) + 4) >>> 0);
  if (bVar3) {
    heap.setU32(0x006e3b80, (heap.u32(0x006e3b80) + 1) >>> 0);
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 2) >>> 0);
    FUN_00443f36(heap);
    FUN_00429361(heap);
    FUN_004294a2(heap);
    sVar1 = FUN_00429502(heap);
  }
  return sVar1;
}
