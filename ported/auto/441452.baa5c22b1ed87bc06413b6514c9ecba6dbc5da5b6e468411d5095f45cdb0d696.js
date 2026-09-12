// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/441452.c.
// Source disasm: binary 0x441452..0x441499 plus the [esi+0x2e]!=0 tail
// at 0x4565dd..0x4565f7 (capstone).
//
// Counterpart of FUN_0044142c: re-attach bookkeeping plus two sound
// events via FUN_005e5301 (event id in AX, param in BX).
//
// The auto-translation diverged from the binary in five ways:
// 1. First FUN_005e5301 call must receive BX = sprite field [esi+0xa]
//    (binary 0x44145e `mov bx, [esi+0xa]`); the JS never set regs.ebx.
// 2. Second call is `mov al, 0x18; xor ebx, ebx` — AL-only update of
//    the post-first-call EAX with EBX zeroed; the JS passed 0xc97 again.
// 3. The [esi+0x2e]!=0 path is a tail-jump to 0x4565dd, which plays
//    events 0x997 / 0x19 (NOT two copies of the ==0 path's events).
// 4. Ride index `movzx ebx, byte ptr [esi+0x68]` read as u32.
// 5. `inc byte ptr [ebx+0x88752b]` / `or byte ptr [ebx+0x88751d], 0xc`
//    emitted as setU32 at base + off*4 — double-scaled offset plus
//    3-byte clobber per op (same corruption class as 44142c; see that
//    header for the runaway-tick consequence).
// Byte-equality vs the x86 interpreter: tools/_diff-441452.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";

export function FUN_00441452(heap) {
  const esi = regs.esi >>> 0;
  const savedEax = regs.eax >>> 0;
  const savedEbx = regs.ebx >>> 0;

  if (heap.u8((esi + 0x2e) >>> 0) !== 0) {
    // 0x4565dd: bx=[esi+0xa], ax=0x997; call. Then al=0x19, ebx=0; call.
    regs.ebx = ((savedEbx & 0xffff0000) | heap.u16((esi + 0xa) >>> 0)) >>> 0;
    regs.eax = ((savedEax & 0xffff0000) | 0x0997) >>> 0;
    FUN_005e5301(heap);
    regs.eax = ((regs.eax & 0xffffff00) | 0x19) >>> 0;
    regs.ebx = 0;
    FUN_005e5301(heap);
  } else {
    // 0x44145e: bx=[esi+0xa], ax=0xc97; call.
    regs.ebx = ((savedEbx & 0xffff0000) | heap.u16((esi + 0xa) >>> 0)) >>> 0;
    regs.eax = ((savedEax & 0xffff0000) | 0x0c97) >>> 0;
    FUN_005e5301(heap);
    const st = heap.u8((esi + 0x2b) >>> 0);
    if (st === 3 || st === 7) {
      const off = heap.u8((esi + 0x68) >>> 0) * 0x260;
      const cnt = (0x0088752b + off) >>> 0;
      heap.setU8(cnt, (heap.u8(cnt) + 1) & 0xff);
      const flg = (0x0088751d + off) >>> 0;
      heap.setU8(flg, heap.u8(flg) | 0xc);
    }
    // 0x44148e: al=0x18 (AL-only on post-call EAX), ebx=0; call.
    regs.eax = ((regs.eax & 0xffffff00) | 0x18) >>> 0;
    regs.ebx = 0;
    FUN_005e5301(heap);
  }

  // 0x441497/0x4565f5: pop ebx; pop eax — both restored to entry values.
  regs.eax = savedEax;
  regs.ebx = savedEbx;
  return regs.eax;
}
