// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42c711.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
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
  uVar1 = in_EAX;
  do {
    pcVar3 = __addr_DAT_008d7eb8;
    do {
      if (heap.u32(pcVar3) == '\0') {
        heap.u32(pcVar3) = uVar1;
        heap.u32((pcVar3 + 2)) = in_ECX;
        heap.u32(pcVar3 + (6) * 4) = '\0';
        heap.u32(pcVar3 + (7) * 4) = '\0';
        heap.u32(pcVar3 + (1) * 4) = '\0';
        heap.u32(pcVar3 + (0x10c) * 4) = '\0';
        FUN_00458bcf(heap);
        uVar1 = ram0x0099aa8c;
        heap.u32((pcVar3 + 0xc)) = heap.u32(0x0099aa88);
        heap.u32((pcVar3 + 0x10)) = uVar1;
        uVar1 = heap.u32(0x0099aa94);
        heap.u32((pcVar3 + 0x14)) = heap.u32(0x0099aa90);
        heap.u32((pcVar3 + 0x18)) = uVar1;
        uVar1 = heap.u32(0x0099aa9c);
        heap.u32((pcVar3 + 0x1c)) = heap.u32(0x0099aa98);
        heap.u32((pcVar3 + 0x20)) = uVar1;
        uVar1 = heap.u32(0x0099aaa4);
        heap.u32((pcVar3 + 0x24)) = heap.u32(0x0099aaa0);
        heap.u32((pcVar3 + 0x28)) = uVar1;
        uVar1 = heap.u32(0x0099aaac);
        heap.u32((pcVar3 + 0x2c)) = heap.u32(0x0099aaa8);
        heap.u32((pcVar3 + 0x30)) = uVar1;
        uVar1 = heap.u32(0x0099aab4);
        heap.u32((pcVar3 + 0x34)) = heap.u32(0x0099aab0);
        heap.u32((pcVar3 + 0x38)) = uVar1;
        uVar1 = heap.u32(0x0099aabc);
        heap.u32((pcVar3 + 0x3c)) = heap.u32(0x0099aab8);
        heap.u32((pcVar3 + 0x40)) = uVar1;
        uVar1 = heap.u32(0x0099aac4);
        heap.u32((pcVar3 + 0x44)) = heap.u32(0x0099aac0);
        heap.u32((pcVar3 + 0x48)) = uVar1;
        uVar1 = heap.u32(0x0099aacc);
        heap.u32((pcVar3 + 0x4c)) = heap.u32(0x0099aac8);
        heap.u32((pcVar3 + 0x50)) = uVar1;
        uVar1 = heap.u32(0x0099aad4);
        heap.u32((pcVar3 + 0x54)) = heap.u32(0x0099aad0);
        heap.u32((pcVar3 + 0x58)) = uVar1;
        uVar1 = heap.u32(0x0099aadc);
        heap.u32((pcVar3 + 0x5c)) = heap.u32(0x0099aad8);
        heap.u32((pcVar3 + 0x60)) = uVar1;
        uVar1 = heap.u32(0x0099aae4);
        heap.u32((pcVar3 + 100)) = heap.u32(0x0099aae0);
        heap.u32((pcVar3 + 0x68)) = uVar1;
        uVar1 = heap.u32(0x0099aaec);
        heap.u32((pcVar3 + 0x6c)) = heap.u32(0x0099aae8);
        heap.u32((pcVar3 + 0x70)) = uVar1;
        uVar1 = heap.u32(0x0099aaf4);
        heap.u32((pcVar3 + 0x74)) = heap.u32(0x0099aaf0);
        heap.u32((pcVar3 + 0x78)) = uVar1;
        uVar1 = heap.u32(0x0099aafc);
        heap.u32((pcVar3 + 0x7c)) = heap.u32(0x0099aaf8);
        heap.u32((pcVar3 + 0x80)) = uVar1;
        uVar1 = heap.u32(0x0099ab04);
        heap.u32((pcVar3 + 0x84)) = heap.u32(0x0099ab00);
        heap.u32((pcVar3 + 0x88)) = uVar1;
        uVar1 = heap.u32(0x0099ab0c);
        heap.u32((pcVar3 + 0x8c)) = heap.u32(0x0099ab08);
        heap.u32((pcVar3 + 0x90)) = uVar1;
        uVar1 = heap.u32(0x0099ab14);
        heap.u32((pcVar3 + 0x94)) = heap.u32(0x0099ab10);
        heap.u32((pcVar3 + 0x98)) = uVar1;
        uVar1 = heap.u32(0x0099ab1c);
        heap.u32((pcVar3 + 0x9c)) = heap.u32(0x0099ab18);
        heap.u32((pcVar3 + 0xa0)) = uVar1;
        uVar1 = heap.u32(0x0099ab24);
        heap.u32((pcVar3 + 0xa4)) = heap.u32(0x0099ab20);
        heap.u32((pcVar3 + 0xa8)) = uVar1;
        uVar1 = heap.u32(0x0099ab2c);
        heap.u32((pcVar3 + 0xac)) = heap.u32(0x0099ab28);
        heap.u32((pcVar3 + 0xb0)) = uVar1;
        uVar1 = heap.u32(0x0099ab34);
        heap.u32((pcVar3 + 0xb4)) = heap.u32(0x0099ab30);
        heap.u32((pcVar3 + 0xb8)) = uVar1;
        uVar1 = heap.u32(0x0099ab3c);
        heap.u32((pcVar3 + 0xbc)) = heap.u32(0x0099ab38);
        heap.u32((pcVar3 + 0xc0)) = uVar1;
        uVar1 = heap.u32(0x0099ab44);
        heap.u32((pcVar3 + 0xc4)) = heap.u32(0x0099ab40);
        heap.u32((pcVar3 + 200)) = uVar1;
        uVar1 = heap.u32(0x0099ab4c);
        heap.u32((pcVar3 + 0xcc)) = heap.u32(0x0099ab48);
        heap.u32((pcVar3 + 0xd0)) = uVar1;
        uVar1 = heap.u32(0x0099ab54);
        heap.u32((pcVar3 + 0xd4)) = heap.u32(0x0099ab50);
        heap.u32((pcVar3 + 0xd8)) = uVar1;
        uVar1 = heap.u32(0x0099ab5c);
        heap.u32((pcVar3 + 0xdc)) = heap.u32(0x0099ab58);
        heap.u32((pcVar3 + 0xe0)) = uVar1;
        uVar1 = heap.u32(0x0099ab64);
        heap.u32((pcVar3 + 0xe4)) = heap.u32(0x0099ab60);
        heap.u32((pcVar3 + 0xe8)) = uVar1;
        uVar1 = heap.u32(0x0099ab6c);
        heap.u32((pcVar3 + 0xec)) = heap.u32(0x0099ab68);
        heap.u32((pcVar3 + 0xf0)) = uVar1;
        uVar1 = heap.u32(0x0099ab74);
        heap.u32((pcVar3 + 0xf4)) = heap.u32(0x0099ab70);
        heap.u32((pcVar3 + 0xf8)) = uVar1;
        uVar1 = heap.u32(0x0099ab7c);
        heap.u32((pcVar3 + 0xfc)) = heap.u32(0x0099ab78);
        heap.u32((pcVar3 + 0x100)) = uVar1;
        uVar1 = heap.u32(0x0099ab84);
        heap.u32((pcVar3 + 0x104)) = heap.u32(0x0099ab80);
        heap.u32((pcVar3 + 0x108)) = uVar1;
        heap.u32(pcVar3 + (0x10b) * 4) = '\0';
        uVar2 = heap.u32(0x006e3b80);
        heap.u32((pcVar3 + 8)) = heap.u32(0x006e3b80);
        heap.u32(pcVar3 + (10) * 4) = (heap.u32(0x006e3b82) * (uint) * (__addr_DAT_0064bc60 + (uVar2 & 7) * 2) >>> 0x10) + '\x01';
        return CONCAT44(heap, in_EDX, in_EAX);
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
