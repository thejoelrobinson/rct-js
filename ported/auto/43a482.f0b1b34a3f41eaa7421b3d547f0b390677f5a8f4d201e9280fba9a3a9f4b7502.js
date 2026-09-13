// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43a482 is peep-state 8
// ("walking to a ride's entrance / boarding the vehicle"), entry 8 of the
// peep-state vtable PTR_0062d4ac (pointer at 0x62d4cc), reached via
// FUN_00439822's dispatch tail. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43a482 0x43a5f8   (ends at the 0x43a5f7 ret;
//   0x43a5f8 is the SEPARATE state-6 handler already ported as 43a5f8.js)
//
// Entry: ESI = peep sprite ptr. Sub-state dl = [esi+0x2c] dispatches:
//   dl == 0 -> BLOCK0 (walk toward the boarding tile)
//   dl == 1 -> BLOCK1 (board / wait for the vehicle, impatience rolls)
//   else    -> ret
//
// BLOCK0 (0x43a491): call 0x439219 presence check (ZF exit -> ret); walking
//   core 0x43c751; if ([0x62d3f4]&1)==0 ret; else set the boarding target
//   from the door-direction tables 0x62d3d4/d6 indexed by [esi+0x37]&7, relink
//   (0x5e53ca/0x444927), write the direction byte [esi+0x1e]=(([esi+0x37]+2)<<3),
//   arm the action ([esi+0x71]=0xfe, [esi+0x6f]=7, call 0x43c65e), inc sub-state,
//   and set the boarding timer [esi+0x6b] = ((0x81 - [esi+0x38])<<4)+0x32.
//   (The `add ah,[ebx+eax]` at 0x43a4e0 writes only ah, which the following
//   0x5e53ca — pushal/popal — restores, so it is dead; replicated faithfully.)
// BLOCK1 (0x43a517): if [esi+0x71]<0xfe -> the moving sub-path 0x43a594 (step
//   0x43c49e; if [esi+0x71]!=0xff ret; else [esi+0x71]=0xfe -> DEPART check).
//   Else: if [esi+0x2d]==0x12 -> DEPART; if [esi+0xca]&0xa3e0 -> the big-ride
//   rand gate (0x43a571: rand>0x51e ret, else start action 4); else the
//   small-ride gate (0x43a532: rand>0x83 or [esi+0x2d]==0x10 -> DEPART; else
//   action 5, bumped to 6/4 by the rand's top two bits). Action starts write
//   [esi+0x71/0x72/0x70], call 0x43c60b + 0x5e53ca, ret.
//   DEPART (0x43a5a7): if [esi+0xca]&0xa3e0 ret; dec word [esi+0x6b]; if !=0
//   ret; else (0x43a5c0) window-invalidate pair around [esi+0x2b]=5, set the
//   walk target [esi+0x32/0x34] to the tile centre, [esi+0x36]=5, call 0x43c60b.
//
// Conventions: callNative for every callee (full register file synced both
// ways, so regs.* holds each callee's exit); flag reads from the live cpu
// (0x439219's ZF via state.__painterCpu — the 43a5f8 pattern; the rand-eax bit
// tests read the FULL regs.eax 5df40c returned); 16-bit partial-register
// masking on the LIVE regs value.
//
// Oracle: ADDR=0x43a482 tools/_lockstep-cn.mjs (ledger: 7 scenarios, 323 peak
// steps/tick). Behind __forceInterp43a482.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuZF = () => (state.__painterCpu ? state.__painterCpu.eflags.ZF : 0);

// DEPART convergence (0x43a5a7): gated exit that may set the walk target.
function depart(heap) {
  const esi = regs.esi >>> 0;
  if ((heap.u16((esi + 0xca) >>> 0) & 0xa3e0) !== 0) return;    // 0x43a5a7 jne ret
  const dec = (heap.u16((esi + 0x6b) >>> 0) - 1) & 0xffff;      // dec word [esi+0x6b]
  heap.setU16((esi + 0x6b) >>> 0, dec);
  if (dec !== 0) return;                                        // 0x43a5ba jne ret
  // 0x43a5c0: commit to walking to the ride exit
  callNative(0x44142c, []);
  heap.setU8((esi + 0x2b) >>> 0, 5);
  callNative(0x441452, []);
  const ax = ((heap.u16((esi + 0xe) >>> 0) & 0xffe0) + 0x10) & 0xffff;
  const cx = ((heap.u16((esi + 0x10) >>> 0) & 0xffe0) + 0x10) & 0xffff;
  heap.setU16((esi + 0x32) >>> 0, ax);
  heap.setU16((esi + 0x34) >>> 0, cx);
  heap.setU8((esi + 0x36) >>> 0, 5);
  regs.eax = ((regs.eax & 0xffff0000) | ax) >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | cx) >>> 0;
  callNative(0x43c60b, []);
}

// Start a peep action (write action bytes, refresh sprite, invalidate).
function startAction(heap, action) {
  const esi = regs.esi >>> 0;
  heap.setU8((esi + 0x71) >>> 0, action);
  heap.setU8((esi + 0x72) >>> 0, 0);
  heap.setU8((esi + 0x70) >>> 0, 0);
  callNative(0x43c60b, []);
  callNative(0x5e53ca, []);
}

export function FUN_0043a482(heap) {
  const dl = heap.u8(((regs.esi >>> 0) + 0x2c) >>> 0);
  if (dl > 1) return;                                           // 0x43a490 ret

  if (dl === 0) {
    // ---- BLOCK0 (0x43a491): walk toward the boarding tile ----
    callNative(0x439219, []);
    if (cpuZF() === 1) return;                                  // 0x43a496 je ret
    callNative(0x43c751, []);
    if ((heap.u16(0x0062d3f4) & 1) === 0) return;               // 0x43a4a6 je ret
    // ESI is the LIVE register throughout — a callee (43c751/444927) may leave
    // it changed, and the binary keeps using [esi+...] against that live value.
    // Re-read regs.esi after every callNative (the 43c2ec/43a3a8 pattern; a
    // captured const here diverged 1/946 on sc15 where 444927 moved esi).
    const ebx = heap.u8(((regs.esi >>> 0) + 0x37) >>> 0) & 7;   // mov bl ; and ebx,7
    regs.ebx = ebx >>> 0;
    const ax = ((heap.u16(((regs.esi >>> 0) + 0xe) >>> 0) & 0xffe0)
              + heap.u16((0x0062d3d4 + ebx * 4) >>> 0)) & 0xffff;
    const cx = ((heap.u16(((regs.esi >>> 0) + 0x10) >>> 0) & 0xffe0)
              + heap.u16((0x0062d3d6 + ebx * 4) >>> 0)) & 0xffff;
    regs.eax = ((regs.eax & 0xffff0000) | ax) >>> 0;
    regs.ecx = ((regs.ecx & 0xffff0000) | cx) >>> 0;
    regs.edx = ((regs.edx & 0xffff0000) | heap.u16(((regs.esi >>> 0) + 0x12) >>> 0)) >>> 0;
    callNative(0x5e53ca, []);
    callNative(0x444927, []);
    // 0x43a4dc: al=[esi+0x37]; add al,2; AND AL,3; shl al,3 ; [esi+0x1e]=al.
    // (The `and al,3` — bytes 24 03 — masks to a 0..3 door direction; an
    // earlier wide disasm mis-aligned this as `add ah,[ebx+eax]`, which cost
    // 1/946 on sc15 before the raw-byte recheck.)
    let al = heap.u8(((regs.esi >>> 0) + 0x37) >>> 0);          // mov al
    al = (al + 2) & 3;                                          // add al,2 ; and al,3
    al = (al << 3) & 0xff;                                      // shl al,3
    regs.eax = ((regs.eax & 0xffffff00) | al) >>> 0;
    heap.setU8(((regs.esi >>> 0) + 0x1e) >>> 0, al);
    callNative(0x5e53ca, []);
    heap.setU8(((regs.esi >>> 0) + 0x71) >>> 0, 0xfe);
    heap.setU8(((regs.esi >>> 0) + 0x6f) >>> 0, 7);
    callNative(0x43c65e, []);
    const e2 = regs.esi >>> 0;
    heap.setU8((e2 + 0x2c) >>> 0, (heap.u8((e2 + 0x2c) >>> 0) + 1) & 0xff);   // inc sub-state
    // [esi+0x6b] = ((0x81 - [esi+0x38]) << 4) + 0x32  (16-bit)
    let t = (-heap.u8((e2 + 0x38) >>> 0)) & 0xffff;             // movzx ax ; neg ax
    t = (t + 0x81) & 0xffff;
    t = (t << 4) & 0xffff;
    t = (t + 0x32) & 0xffff;
    regs.eax = ((regs.eax & 0xffff0000) | t) >>> 0;
    heap.setU16((e2 + 0x6b) >>> 0, t);
    return;                                                     // 0x43a516 ret
  }

  // ---- BLOCK1 (0x43a517), dl == 1 ----
  const esi = regs.esi >>> 0;
  if (heap.u8((esi + 0x71) >>> 0) < 0xfe) {
    // 0x43a594: still animating the board — step, maybe finish
    callNative(0x43c49e, []);
    if (heap.u8((regs.esi >>> 0) + 0x71) !== 0xff) return;      // jne ret
    heap.setU8(((regs.esi >>> 0) + 0x71) >>> 0, 0xfe);
    depart(heap);                                               // fall into 0x43a5a7
    return;
  }
  if (heap.u8((esi + 0x2d) >>> 0) === 0x12) { depart(heap); return; }  // 0x43a521 je DEPART
  if ((heap.u16((esi + 0xca) >>> 0) & 0xa3e0) !== 0) {
    // 0x43a571: big-ride rand gate
    callNative(0x5df40c, []);
    if ((regs.eax & 0xffff) > 0x51e) { depart(heap); return; } // ja DEPART
    startAction(heap, 4);
    return;                                                     // jmp 0x43a516 ret
  }
  // 0x43a532: small-ride rand gate
  callNative(0x5df40c, []);
  if ((regs.eax & 0xffff) > 0x83) { depart(heap); return; }    // ja DEPART
  if (heap.u8((esi + 0x2d) >>> 0) === 0x10) { depart(heap); return; }  // je DEPART
  // action 5, bumped by the rand's top two bits (test the FULL eax)
  let action = 5;
  if ((regs.eax & 0x80000000) !== 0) action = 6;               // 0x43a547
  if ((regs.eax & 0x40000000) !== 0) action = 4;               // 0x43a552
  startAction(heap, action);
  // jmp 0x43a516 ret
}
