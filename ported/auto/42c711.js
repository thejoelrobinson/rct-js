// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42c711.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ram0x0099aa8c } from "../../runtime/win32.js";
import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0042cb29 } from "./42cb29.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0042c711(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_008d7eb8 = __sp + 0;
  const __addr_DAT_0064bc60 = __sp + 4;
  const __addr_DAT_008d8930 = __sp + 8;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let pcVar3 = 0;
  uVar1 = in_EAX;
  do {
    pcVar3 = __addr_DAT_008d7eb8;
    do {
      if (heap.u32(pcVar3) == '\0') {
        heap.setU32(pcVar3, (uVar1) >>> 0);
        heap.setU32((pcVar3 + 2), (in_ECX) >>> 0);
        heap.setU32((pcVar3 + (6) * 4), ('\0') >>> 0);
        heap.setU32((pcVar3 + (7) * 4), ('\0') >>> 0);
        heap.setU32((pcVar3 + (1) * 4), ('\0') >>> 0);
        heap.setU32((pcVar3 + (0x10c) * 4), ('\0') >>> 0);
        FUN_00458bcf(heap);
        uVar1 = ram0x0099aa8c;
        heap.setU32((pcVar3 + 0xc), (heap.u32(0x0099aa88)) >>> 0);
        heap.setU32((pcVar3 + 0x10), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aa94);
        heap.setU32((pcVar3 + 0x14), (heap.u32(0x0099aa90)) >>> 0);
        heap.setU32((pcVar3 + 0x18), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aa9c);
        heap.setU32((pcVar3 + 0x1c), (heap.u32(0x0099aa98)) >>> 0);
        heap.setU32((pcVar3 + 0x20), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aaa4);
        heap.setU32((pcVar3 + 0x24), (heap.u32(0x0099aaa0)) >>> 0);
        heap.setU32((pcVar3 + 0x28), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aaac);
        heap.setU32((pcVar3 + 0x2c), (heap.u32(0x0099aaa8)) >>> 0);
        heap.setU32((pcVar3 + 0x30), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aab4);
        heap.setU32((pcVar3 + 0x34), (heap.u32(0x0099aab0)) >>> 0);
        heap.setU32((pcVar3 + 0x38), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aabc);
        heap.setU32((pcVar3 + 0x3c), (heap.u32(0x0099aab8)) >>> 0);
        heap.setU32((pcVar3 + 0x40), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aac4);
        heap.setU32((pcVar3 + 0x44), (heap.u32(0x0099aac0)) >>> 0);
        heap.setU32((pcVar3 + 0x48), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aacc);
        heap.setU32((pcVar3 + 0x4c), (heap.u32(0x0099aac8)) >>> 0);
        heap.setU32((pcVar3 + 0x50), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aad4);
        heap.setU32((pcVar3 + 0x54), (heap.u32(0x0099aad0)) >>> 0);
        heap.setU32((pcVar3 + 0x58), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aadc);
        heap.setU32((pcVar3 + 0x5c), (heap.u32(0x0099aad8)) >>> 0);
        heap.setU32((pcVar3 + 0x60), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aae4);
        heap.setU32((pcVar3 + 100), (heap.u32(0x0099aae0)) >>> 0);
        heap.setU32((pcVar3 + 0x68), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aaec);
        heap.setU32((pcVar3 + 0x6c), (heap.u32(0x0099aae8)) >>> 0);
        heap.setU32((pcVar3 + 0x70), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aaf4);
        heap.setU32((pcVar3 + 0x74), (heap.u32(0x0099aaf0)) >>> 0);
        heap.setU32((pcVar3 + 0x78), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099aafc);
        heap.setU32((pcVar3 + 0x7c), (heap.u32(0x0099aaf8)) >>> 0);
        heap.setU32((pcVar3 + 0x80), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab04);
        heap.setU32((pcVar3 + 0x84), (heap.u32(0x0099ab00)) >>> 0);
        heap.setU32((pcVar3 + 0x88), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab0c);
        heap.setU32((pcVar3 + 0x8c), (heap.u32(0x0099ab08)) >>> 0);
        heap.setU32((pcVar3 + 0x90), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab14);
        heap.setU32((pcVar3 + 0x94), (heap.u32(0x0099ab10)) >>> 0);
        heap.setU32((pcVar3 + 0x98), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab1c);
        heap.setU32((pcVar3 + 0x9c), (heap.u32(0x0099ab18)) >>> 0);
        heap.setU32((pcVar3 + 0xa0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab24);
        heap.setU32((pcVar3 + 0xa4), (heap.u32(0x0099ab20)) >>> 0);
        heap.setU32((pcVar3 + 0xa8), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab2c);
        heap.setU32((pcVar3 + 0xac), (heap.u32(0x0099ab28)) >>> 0);
        heap.setU32((pcVar3 + 0xb0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab34);
        heap.setU32((pcVar3 + 0xb4), (heap.u32(0x0099ab30)) >>> 0);
        heap.setU32((pcVar3 + 0xb8), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab3c);
        heap.setU32((pcVar3 + 0xbc), (heap.u32(0x0099ab38)) >>> 0);
        heap.setU32((pcVar3 + 0xc0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab44);
        heap.setU32((pcVar3 + 0xc4), (heap.u32(0x0099ab40)) >>> 0);
        heap.setU32((pcVar3 + 200), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab4c);
        heap.setU32((pcVar3 + 0xcc), (heap.u32(0x0099ab48)) >>> 0);
        heap.setU32((pcVar3 + 0xd0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab54);
        heap.setU32((pcVar3 + 0xd4), (heap.u32(0x0099ab50)) >>> 0);
        heap.setU32((pcVar3 + 0xd8), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab5c);
        heap.setU32((pcVar3 + 0xdc), (heap.u32(0x0099ab58)) >>> 0);
        heap.setU32((pcVar3 + 0xe0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab64);
        heap.setU32((pcVar3 + 0xe4), (heap.u32(0x0099ab60)) >>> 0);
        heap.setU32((pcVar3 + 0xe8), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab6c);
        heap.setU32((pcVar3 + 0xec), (heap.u32(0x0099ab68)) >>> 0);
        heap.setU32((pcVar3 + 0xf0), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab74);
        heap.setU32((pcVar3 + 0xf4), (heap.u32(0x0099ab70)) >>> 0);
        heap.setU32((pcVar3 + 0xf8), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab7c);
        heap.setU32((pcVar3 + 0xfc), (heap.u32(0x0099ab78)) >>> 0);
        heap.setU32((pcVar3 + 0x100), (uVar1) >>> 0);
        uVar1 = heap.u32(0x0099ab84);
        heap.setU32((pcVar3 + 0x104), (heap.u32(0x0099ab80)) >>> 0);
        heap.setU32((pcVar3 + 0x108), (uVar1) >>> 0);
        heap.setU32((pcVar3 + (0x10b) * 4), ('\0') >>> 0);
        uVar2 = heap.u32(0x006e3b80);
        heap.setU32((pcVar3 + 8), (heap.u32(0x006e3b80)) >>> 0);
        heap.setU32((pcVar3 + (10) * 4), ((heap.u32(0x006e3b82) * heap.u32((__addr_DAT_0064bc60 + (uVar2 & 7) * 2)) >>> 0x10) + '\x01') >>> 0);
        return CONCAT44(in_EDX, in_EAX);
      }
      pcVar3 = pcVar3 + 0x10c;
    } while (pcVar3 < __addr_DAT_008d8930);
    uVar1 = FUN_0042cb29(heap);
    in_ECX = extraout_ECX;
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}
