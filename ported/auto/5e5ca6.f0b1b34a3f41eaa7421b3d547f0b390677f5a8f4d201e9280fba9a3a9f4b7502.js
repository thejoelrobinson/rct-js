// @manual — do not regenerate.
// Source: decompiled/c/5e5ca6.c
//
// Disassembly at 0x5e5ca6 shows `mov ecx, eax` at the top and then the
// loop shifts ECX via `shr ecx, 1` each iteration. Inside the loop the
// call to FUN_005e5301 is bracketed by `push eax / push ebx ... pop ebx /
// pop eax`, so EAX/EBX are restored but ECX is untouched by the callee.
// Ghidra renamed ECX to in_EAX (since it tracked `mov ecx, eax`) and emits
// `in_EAX = extraout_ECX` after the call to express "reload EAX from
// ECX". Translator turned that into a no-op (extraout_ECX stuck at 0),
// which forced the loop's mid-iteration in_EAX to 0 and broke the bit
// scan. Fix: extraout_ECX = current in_EAX (live ECX in the asm).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5301, FUN_005e5301_exact } from "./5e5301.js";

export function FUN_005e5ca6_exact(heap) {
  const window = regs.esi >>> 0;
  const value = regs.eax >>> 0;
  const previous = heap.u32(window + 0x10);
  if (value === previous) {
    regs.cf = 0; regs.zf = 1; regs.sf = 0; regs.of = 0;
    return value;
  }
  heap.setU32(window + 0x10, value);
  const changes = (previous ^ value) >>> 0;
  for (let widget = 0; widget < 32; widget++) {
    if ((changes >>> widget & 1) === 0) continue;
    regs.eax = ((value & 0xffff0000) | (widget << 8) | heap.u8(window + 0x174) | 0x80) >>> 0;
    regs.ebx = (((previous >>> widget) & 0xffff0000) | heap.u16(window + 0x30)) >>> 0;
    FUN_005e5301_exact(heap);
  }
  regs.eax = ((value & 0xffff00ff) | 0x2000) >>> 0;
  regs.ebx = 0;
  regs.ecx = 0;
  regs.edx = ((regs.edx & 0xffff0000) | (previous >>> 31) | ((value >>> 31) << 8)) >>> 0;
  regs.cf = 0; regs.zf = 1; regs.sf = 0; regs.of = 0;
  return regs.eax;
}
export function FUN_005e5ca6(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_ECX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if (in_EAX != heap.u32((unaff_ESI + 0x10))) {
    LOCK();
    uVar3 = ((heap.u32((unaff_ESI + 0x10))) >>> 0);
    heap.setU32((unaff_ESI + 0x10), (in_EAX) & 0xffffffff);
    UNLOCK();
    bVar1 = ((0) & 0xff);
    do {
      uVar2 = ((CONCAT11(((in_EAX) << 24 >> 24), ((uVar3) << 24 >> 24)) & 0x101) & 0xffff);
      if (((uVar2) << 24 >> 24) != (((uVar2 >>> 8)) << 24 >> 24)) {
        (regs.eax = FUN_005e5301(heap));
        // ECX (= in_EAX in Ghidra) is preserved across FUN_005e5301 by the
        // push/pop bracket — reload from the live value.
        extraout_ECX = in_EAX;
        in_EAX = ((extraout_ECX) >>> 0);
      }
      uVar3 = ((uVar3 >>> 1) >>> 0);
      in_EAX = ((in_EAX >>> 1) >>> 0);
      bVar1 = ((bVar1 + 1) & 0xff);
    } while (bVar1 < 0x20);
  }
  return;
}
