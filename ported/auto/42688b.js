// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42688b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/win32.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_0042688b(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0065247a = __sp + 0;
  const __addr_DAT_00652478 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  try {
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  uVar3 = heap.u32(unaff_ESI) & 3;
  uVar4 = (in_CX + heap.u32((__addr_DAT_0065247a) + (uVar3 * 2) * 4)) * 0x80 | (ushort)(in_CX + heap.u32((__addr_DAT_0065247a) + (uVar3 * 2) * 4)) >>> 9 | in_EAX + heap.u32((__addr_DAT_00652478) + (uVar3 * 2) * 4);
  puVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
  while (true) {
    uVar4 = CONCAT11(heap, heap.u32(puVar5), uVar3) & 0x3cff;
    uVar3 = uVar4;
    if (((((uVar4 >>> 8) == '\b') && (heap.u32(unaff_ESI + (7) * 4) == heap.u32(puVar5 + (7) * 4))) && (heap.u32(unaff_ESI + (2) * 4) == heap.u32(puVar5 + (2) * 4))) && (heap.u32(puVar5 + (4) * 4) == 'e')) {
      break;
    }
    pbVar1 = puVar5 + 1;
    puVar5 = puVar5 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      LAB_0042693d: return CONCAT44(heap, in_EDX, in_EAX);
    }
  }
  uVar2 = (ushort)(byte)(uVar4 * '\x04' + 9);
  uVar4 = uVar2 & 0xf;
  heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) = heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)(uVar4 + 3);
  uVar4 = uVar2 & 0xf;
  heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) = heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)(uVar4 - 2);
  uVar4 = uVar2 & 0xf;
  heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) = heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)(uVar4 + 1);
  uVar4 = uVar2 & 0xf;
  heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) = heap.u32(puVar5 + ((uVar4 >>> 3) + 5) * 4) & ~('\x01' << (uVar2 & 7));
  uVar4 = (ushort)(byte)(uVar4 + 4);
  heap.u32(puVar5 + (((uVar4 & 0xf) >>> 3) + 5) * 4) = heap.u32(puVar5 + (((uVar4 & 0xf) >>> 3) + 5) * 4) & ~('\x01' << (uVar4 & 7));
  FUN_005e56d3(heap, puVar5);
  /* goto LAB_0042693d */ throw new Error("goto LAB_0042693d not supported");
} finally {
    heap.freeFrame(12);
  }
}
