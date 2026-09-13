// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43a3a8 is the peep-state 13
// handler ("walking to / leaving through the park exit"), entry 13 of the
// peep-state vtable PTR_0062d4ac (pointer at 0x62d4e0), reached via
// FUN_00439822's dispatch tail. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43a3a8 0x43a424
//
// Entry: ESI = peep sprite ptr. The harness simulates the final ret.
//
// Body (sequencer, all callees via callNative):
//   cmp [esi+0x37],1 ; je AT_EXIT
//   ; not yet at the exit tile:
//   call 0x43c751                    ; walking core
//   test word [0x62d3f4],2 ; jne GONE ; else ret
//   GONE (0x43a417): dec word [0x87c81e] ; call 0x44153e ; ret
//   AT_EXIT (0x43a3bf):
//   call 0x43c49e ; jae LEAVE        ; movement step -> exit CF
//   ; still walking out: dx=[esi+0x12] ; call 0x5e53ca ; call 0x444927
//   ;   (444927's ax/cx = 43c49e's exit coords, dx = own z) ; call 0x5e53ca ; ret
//   LEAVE (0x43a3da): window invalidate pair 0x44142c/0x441452 around
//   [esi+0x2b]=0 ; [esi+0x2a]=0 ; [esi+0xa8]=dword[0x6e3b84] (park value
//   snapshot) ; inc word [0x87c81c] ; dec word [0x87c81e] (guest counters) ;
//   or word [0x5f54ec],4 ; al=0x18 ; xor ebx,ebx ; call 0x5e5301 ; ret
//
// Register exactness: mov dx / mov al are partial writes on the live values
// (al=0x18 lands on the eax loaded from [0x6e3b84]); xor ebx,ebx is a full
// clear; exit regs = the last callee's exit file. CF-across-call read live
// from the cpu (the 43a5f8 pattern).
//
// Oracle: ADDR=0x43a3a8 tools/_lockstep-auto.mjs behind __forceInterp43a3a8.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuCF = () => (state.__painterCpu ? state.__painterCpu.eflags.CF : 0);

export function FUN_0043a3a8(heap) {
  if (heap.u8(((regs.esi >>> 0) + 0x37) >>> 0) !== 1) {
    // ---- not at the exit tile: run the walking core ----
    callNative(0x43c751, []);
    if ((heap.u16(0x0062d3f4) & 2) === 0) return;              // 0x43a3be ret
    // 0x43a417: stepped off the map edge — remove from guest count
    heap.setU16(0x0087c81e, (heap.u16(0x0087c81e) - 1) & 0xffff);
    callNative(0x44153e, []);
    return;
  }
  // ---- AT_EXIT: head for the door ----
  callNative(0x43c49e, []);
  if (cpuCF() !== 0) {
    // still walking out
    regs.edx = ((regs.edx & 0xffff0000)
              | heap.u16(((regs.esi >>> 0) + 0x12) >>> 0)) >>> 0; // mov dx,[esi+0x12]
    callNative(0x5e53ca, []);
    callNative(0x444927, []);
    callNative(0x5e53ca, []);
    return;
  }
  // ---- LEAVE (0x43a3da) ----
  callNative(0x44142c, []);
  heap.setU8(((regs.esi >>> 0) + 0x2b) >>> 0, 0);              // state <- 0
  callNative(0x441452, []);
  const esi = regs.esi >>> 0;
  heap.setU8((esi + 0x2a) >>> 0, 0);
  regs.eax = heap.u32(0x006e3b84) >>> 0;                       // mov eax,[0x6e3b84]
  heap.setU32((esi + 0xa8) >>> 0, regs.eax);
  heap.setU16(0x0087c81c, (heap.u16(0x0087c81c) + 1) & 0xffff);
  heap.setU16(0x0087c81e, (heap.u16(0x0087c81e) - 1) & 0xffff);
  heap.setU16(0x005f54ec, heap.u16(0x005f54ec) | 4);
  regs.eax = ((regs.eax & 0xffffff00) | 0x18) >>> 0;           // mov al,0x18
  regs.ebx = 0;                                                // xor ebx,ebx
  callNative(0x5e5301, []);
}
