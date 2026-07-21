// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43c383 is a peep ride handler
// ("exiting the ride vehicle / walking off the platform"), in the peep
// ride-state family. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43c383 0x43c49e
//
// Entry: ESI = peep sprite ptr. Reached via the ride-state dispatch; the
// harness's simulated ret performs the final ret.
//
// Body:
//   call 0x43c49e ; jae ARRIVED           ; movement step -> exit CF
//   ; still moving: call 0x5e53ca ; dx = [station+rideOff+0x887452]<<2 ;
//   ;               call 0x444927 ; call 0x5e53ca ; ret
//   ARRIVED (0x43c3b5): dl=[esi+0x68] dh=1 ; call 0x43da82 (ride-exit fixup).
//     If [esi+0xc8]&8 (on-ride photo/announce): a PUSHAL-wrapped block stages
//     the announce record ([0x971e86]=[esi+0x22], [0x971e88]=[esi+0x9c],
//     [0x971e8c/8e] from the ride record 0x887442/44) and calls 0x42c711 with
//     al=2, ecx=[esi+0xa], bx=0x7cf — the popal DISCARDS its register effects
//     (only its heap writes persist, which round-trip via callNative).
//     Then [esi+0x79]=0xff, window-invalidate pair around [esi+0x2b]=0, and a
//     tile-element scan (hash [esi+0xe/0x10] -> tile_pointers) for the exit
//     TRACK element ([edi]&0x3c==4) whose height ([edi+4] via 0x449126, plus
//     [edi+2]<<2) is within [-0x10, 0] of the peep z [esi+0x12]; when found,
//     relink (0x444927 / 0x5e53ca) to the platform. ret.
//
// Conventions: callNative for every callee (full register file synced both
// ways); CF-across-call read from the live cpu (43c2ec pattern); 16-bit
// partial writes mask the LIVE regs value; the bp height compare is SIGNED.
//
// Oracle: ADDR=0x43c383 tools/_lockstep-cn.mjs (ledger: 4 scenarios, 58 peak).
// Behind __forceInterp43c383.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuCF = () => (state.__painterCpu ? state.__painterCpu.eflags.CF : 0);
const rol16 = (v, n) => (((v << n) | (v >>> (16 - n))) & 0xffff);
const ror16 = (v, n) => (((v >>> n) | (v << (16 - n))) & 0xffff);
const s16 = (v) => (v << 16) >> 16;

export function FUN_0043c383(heap) {
  // 0x43c383: call 0x43c49e (movement step) ; jae ARRIVED
  callNative(0x43c49e, []);
  if (cpuCF() !== 0) {
    // ---- still moving: relink at platform height ----
    callNative(0x5e53ca, []);
    const esi = regs.esi >>> 0;
    const rideOff = (heap.u8((esi + 0x68) >>> 0) * 0x260) >>> 0;
    regs.edi = rideOff;                                          // movzx+imul (full)
    const station = heap.u8((esi + 0x69) >>> 0);
    regs.ebx = station >>> 0;                                    // movzx ebx (full)
    const dx = (heap.u8((station + rideOff + 0x887452) >>> 0) << 2) & 0xffff;
    regs.edx = ((regs.edx & 0xffff0000) | dx) >>> 0;
    callNative(0x444927, []);
    callNative(0x5e53ca, []);
    return;                                                      // 0x43c3b4 ret
  }

  // ---- ARRIVED (0x43c3b5) ----
  let esi = regs.esi >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | (heap.u8((esi + 0x68) >>> 0)) | 0x100) >>> 0; // dl=ride, dh=1
  callNative(0x43da82, []);
  esi = regs.esi >>> 0;
  if ((heap.u16((esi + 0xc8) >>> 0) & 8) !== 0) {
    // pushal-wrapped announce: popal DISCARDS the register effects, but the
    // register file at the 0x42c711 CALL must match the binary exactly (its
    // heap effects can depend on the full ebx/edx). Replicate every write in
    // order — NOT just the final al/ecx/bx (leaving edx/ebx-upper stale caused
    // the sc12 dual-soak to diverge while the isolated lockstep — which never
    // hit this rare [esi+0xc8]&8 block — stayed clean).
    const snap = { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
                   esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
    regs.ebx = ((regs.ebx & 0xffff0000) | heap.u16((esi + 0x22) >>> 0)) >>> 0; // mov bx,[esi+0x22]
    heap.setU16(0x00971e86, regs.ebx & 0xffff);
    regs.ebx = heap.u32((esi + 0x9c) >>> 0) >>> 0;             // mov ebx,[esi+0x9c]
    heap.setU32(0x00971e88, regs.ebx);
    regs.edx = (heap.u8((esi + 0x68) >>> 0) * 0x260) >>> 0;    // movzx edx ; imul edx,0x260
    regs.ebx = ((regs.ebx & 0xffff0000) | heap.u16(((regs.edx >>> 0) + 0x887442) >>> 0)) >>> 0; // mov bx,[edx+..42]
    heap.setU16(0x00971e8c, regs.ebx & 0xffff);
    regs.ebx = heap.u32(((regs.edx >>> 0) + 0x887444) >>> 0) >>> 0; // mov ebx,[edx+..44]
    heap.setU32(0x00971e8e, regs.ebx);
    regs.eax = ((regs.eax & 0xffffff00) | 2) >>> 0;            // mov al,2
    regs.ecx = heap.u16((esi + 0xa) >>> 0) >>> 0;              // movzx ecx,word [esi+0xa]
    regs.ebx = ((regs.ebx & 0xffff0000) | 0x7cf) >>> 0;        // mov bx,0x7cf
    callNative(0x42c711, []);
    regs.eax = snap.eax; regs.ecx = snap.ecx; regs.edx = snap.edx; regs.ebx = snap.ebx;
    regs.esi = snap.esi; regs.edi = snap.edi; regs.ebp = snap.ebp;  // popal
  }
  esi = regs.esi >>> 0;
  heap.setU8((esi + 0x79) >>> 0, 0xff);
  callNative(0x44142c, []);
  heap.setU8(((regs.esi >>> 0) + 0x2b) >>> 0, 0);
  callNative(0x441452, []);
  esi = regs.esi >>> 0;
  // hash the peep tile -> first tile element
  const axh = heap.u16((esi + 0xe) >>> 0) & 0xffe0;
  const cxh = heap.u16((esi + 0x10) >>> 0) & 0xffe0;
  let key = ror16(rol16(cxh, 7) | axh, 5);                       // rol cx,7 ; or cx,ax ; ror cx,5
  let edi = heap.u32((0x00971ef4 + key * 4) >>> 0) >>> 0;
  // scan for the exit TRACK element within height window
  for (let guard = 0; guard < 8192; guard++) {
    if ((heap.u8(edi) & 0x3c) === 4) {                           // 0x43c44d..53
      const s = regs.esi >>> 0;
      regs.eax = ((regs.eax & 0xffff0000) | heap.u16((s + 0xe) >>> 0)) >>> 0;   // mov ax,[esi+0xe]
      regs.ecx = ((regs.ecx & 0xffff0000) | heap.u16((s + 0x10) >>> 0)) >>> 0;  // mov cx,[esi+0x10]
      regs.edx = ((regs.edx & 0xffffff00) | heap.u8((edi + 4) >>> 0)) >>> 0;    // mov dl,[edi+4]
      callNative(0x449126, []);                                 // -> dx = base height
      const ax2 = (heap.u8((edi + 2) >>> 0) << 2) & 0xffff;     // movzx ax,[edi+2] ; shl ax,2
      const dx = ((regs.edx & 0xffff) + ax2) & 0xffff;          // add dx,ax
      regs.edx = ((regs.edx & 0xffff0000) | dx) >>> 0;
      const bp = (heap.u16(((regs.esi >>> 0) + 0x12) >>> 0) - dx) & 0xffff;     // mov bp,[esi+0x12] ; sub bp,dx
      regs.ebp = ((regs.ebp & 0xffff0000) | bp) >>> 0;
      if (s16(bp) <= 0 && s16(bp) >= -0x10) {                   // jg next ; jge FOUND -> -0x10..0
        // FOUND (0x43c48b)
        const s2 = regs.esi >>> 0;
        regs.eax = ((regs.eax & 0xffff0000) | heap.u16((s2 + 0xe) >>> 0)) >>> 0;
        regs.ecx = ((regs.ecx & 0xffff0000) | heap.u16((s2 + 0x10) >>> 0)) >>> 0;
        callNative(0x444927, []);
        callNative(0x5e53ca, []);
        return;
      }
    }
    // 0x43c480: next element
    edi = (edi + 8) >>> 0;
    if ((heap.u8((edi - 7) >>> 0) & 0x80) !== 0) return;        // last element -> ret (0x43c489)
  }
}
