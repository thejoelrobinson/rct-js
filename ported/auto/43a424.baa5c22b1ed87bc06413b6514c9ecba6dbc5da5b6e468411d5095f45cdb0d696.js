// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43a424 is the peep-state 14
// handler ("leaving the park / walking to the exit gate"), entry 14 of the
// peep-state vtable PTR_0062d4ac (pointer at 0x62d4e4), reached via
// FUN_00439822's dispatch tail. Sibling of 0x43a3a8 (state 13, ADDENDUM 68) —
// same walking-sequencer shape. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43a424 0x43a482
//
// Entry: ESI = peep sprite ptr. The harness's simulated ret performs the ret.
//
// Body:
//   cmp [esi+0x37],0 ; je WALK    ; [esi+0x37]!=0 -> already committed
//   ; WALKING-CORE block (0x43a42a, also the ARRIVED fall-through target):
//     call 0x43c751 ; test word [0x62d3f4],2 ; jne GONE ; else ret
//   GONE (0x43a47c): call 0x44153e ; ret
//   WALK (0x43a43b, [esi+0x37]==0):
//     call 0x43c49e ; jae ARRIVED           ; movement step -> exit CF
//     ; still moving: dx=[esi+0x12] ; call 0x5e53ca ; call 0x444927 ;
//     ;               call 0x5e53ca ; ret
//   ARRIVED (0x43a456): [esi+0x2a]=1 ; [esi+0x36]=5 ; dec word [0x87c81c]
//     (guest count) ; or word [0x5f54ec],4 ; [esi+0x37]=1 ; al=0x18 ;
//     xor ebx,ebx ; call 0x5e5301 ; jmp 0x43a42a  (FALL INTO the walking-core
//     block — no ret here; [esi+0x37] is now 1 so the block runs)
//
// Register exactness: `mov dx` / `mov al` are partial writes on the live
// values (al=0x18 on the eax the callees left); xor ebx,ebx is a full clear;
// exit regs = the last callee's exit file. The CF-across-call at 0x43a440 is
// read from the LIVE cpu flags after callNative (the 43a3a8/43c2ec pattern).
//
// Oracle: ADDR=0x43a424 tools/_lockstep-cn.mjs (reached via 439822's tail-jmp;
// hot on park-exit-heavy scenarios — the ledger lists 12). Behind
// __forceInterp43a424.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuCF = () => (state.__painterCpu ? state.__painterCpu.eflags.CF : 0);

// The walking-core block at 0x43a42a: run the core, then GONE-check. Reached
// from the [esi+0x37]!=0 entry AND as the ARRIVED fall-through.
function walkingCore(heap) {
  callNative(0x43c751, []);                                    // walking core
  if ((heap.u16(0x0062d3f4) & 2) !== 0) {                      // gone off-map
    callNative(0x44153e, []);                                  // 0x43a47c
  }
  // else 0x43a438 ret
}

export function FUN_0043a424(heap) {
  if (heap.u8(((regs.esi >>> 0) + 0x37) >>> 0) !== 0) {
    walkingCore(heap);
    return;
  }
  // ---- WALK (0x43a43b): head for the exit gate ----
  callNative(0x43c49e, []);
  if (cpuCF() !== 0) {
    // still moving: relink at own z
    regs.edx = ((regs.edx & 0xffff0000)
              | heap.u16(((regs.esi >>> 0) + 0x12) >>> 0)) >>> 0; // mov dx,[esi+0x12]
    callNative(0x5e53ca, []);
    callNative(0x444927, []);
    callNative(0x5e53ca, []);
    return;                                                     // 0x43a455 ret
  }
  // ---- ARRIVED (0x43a456): commit to leaving, then fall into walking core ----
  const esi = regs.esi >>> 0;
  heap.setU8((esi + 0x2a) >>> 0, 1);
  heap.setU8((esi + 0x36) >>> 0, 5);
  heap.setU16(0x0087c81c, (heap.u16(0x0087c81c) - 1) & 0xffff); // dec guest count
  heap.setU16(0x005f54ec, heap.u16(0x005f54ec) | 4);
  heap.setU8((esi + 0x37) >>> 0, 1);
  regs.eax = ((regs.eax & 0xffffff00) | 0x18) >>> 0;           // mov al,0x18
  regs.ebx = 0;                                                // xor ebx,ebx
  callNative(0x5e5301, []);
  // 0x43a47a: jmp 0x43a42a — fall into the walking-core block
  walkingCore(heap);
}
