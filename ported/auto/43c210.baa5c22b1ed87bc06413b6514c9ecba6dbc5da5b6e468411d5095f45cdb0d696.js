// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43c210 is peep RIDE sub-state 8
// ("walk to the boarding position at the station entrance"), entry 8 of the
// state-4 sub-state table at DATASEG 0x62d50c (see ported/auto/43a74b.js).
// It is the SIBLING of 0x43c2ec (sub-state 9, ADDENDUM 64) — same sequencer
// shape. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43c210 0x43c2ec
//
// Entry: ESI = peep sprite ptr. Reached via 43a74b's tail-jmp; the harness's
// simulated ret performs the final ret.
//
// Body:
//   call 0x43c49e            ; movement-toward-target step -> exit CF
//   jae ARRIVED              ; CF=0 -> reached the target point
//   ; still moving: dx=[esi+0x12] ; call 0x5e53ca ; call 0x444927 ;
//   ;               call 0x5e53ca ; ret          (relink at own z, no state change)
//   ARRIVED (0x43c22b): compute the boarding target position from the ride's
//   station-entrance tile, then set sub-state <- 9 (hand off to 43c2ec):
//     rideOff = [esi+0x68]*0x260 ; station = [esi+0x69]
//     W = word[rideOff+station*2+0x88746a]     ; packed station-entrance tile
//     ax = (W & 0xff) << 5 ; cx = ((W>>8)&0xff) << 5   ; world coords (tile*32)
//       (via `xor cx,cx ; xchg ah,cl` — ax keeps its low byte with ah=0, cx
//        takes the old ah; both then shl 5)
//     dl = byte[station+rideOff+0x887452]      ; station z, kept for the scan
//     ebp = word[0x971ef4 + hash(ax,cx)*4]     ; first tile element
//       (hash = the rol7/or/ror5 tile-index, same as 5e2b52 / 439219)
//     walk ebp += 8 until ([ebp]&0x3c)==0x10 (ride-entrance element) AND
//       [ebp+2]==dl  ; ebx = [ebp]&3  (station-entrance direction 0..3)
//     ax += 0x10 ; cx += 0x10
//     dx = word[0x629254 + ebx*4] ; bp = word[0x629256 + ebx*4]  ; dir offsets
//     grp = byte[0x5f6b10 + byte[rideOff+0x887421]*4]            ; ride group
//     scale = (word[0x5f7104 + grp*8] & 0x5000) ? 0x20 : 0x14
//     dx *= scale (imul, 16-bit) ; bp *= scale
//     ax -= dx ; cx -= bp
//     [esi+0x32]=ax ; [esi+0x34]=cx (boarding target) ; [esi+0x36]=2 ;
//     [esi+0x2c]=9  (sub-state -> 9) ; ret
//
// Register exactness: all arithmetic is 16-bit (0x66 prefixes) — partial
// writes mask the LIVE regs value; `movzx` are full-width. edx's upper half is
// preserved (only dl/dh written until the dx reload at 0x43c290). imul is
// 16-bit signed. The CF-across-call at 0x43c215 is read from the LIVE cpu
// flags after callNative (the 43a5f8/43c2ec pattern), never inferred.
//
// Oracle: ADDR=0x43c210 FORCE=__forceInterp43c210 tools/_lockstep-auto.mjs
// (organic crossings on scenarios with rides being boarded — the ledger lists
// sc10/sc11/sc12/sc17/sc9). Behind __forceInterp43c210.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuCF = () => (state.__painterCpu ? state.__painterCpu.eflags.CF : 0);
const rol16 = (v, n) => (((v << n) | (v >>> (16 - n))) & 0xffff);
const ror16 = (v, n) => (((v >>> n) | (v << (16 - n))) & 0xffff);
const s16 = (v) => (v << 16) >> 16;

export function FUN_0043c210(heap) {
  // 0x43c210: call 0x43c49e (movement step) ; jae 0x43c22b
  callNative(0x43c49e, []);
  if (cpuCF() !== 0) {
    // ---- still moving: relink at own z, no state change ----
    regs.edx = ((regs.edx & 0xffff0000)
              | heap.u16(((regs.esi >>> 0) + 0x12) >>> 0)) >>> 0; // mov dx,[esi+0x12]
    callNative(0x5e53ca, []);
    callNative(0x444927, []);
    callNative(0x5e53ca, []);
    return;                                                       // 0x43c22a ret
  }

  // ---- ARRIVED @0x43c22b: compute the boarding target position ----
  const esi = regs.esi >>> 0;
  const rideOff = (heap.u8((esi + 0x68) >>> 0) * 0x260) >>> 0;
  const station = heap.u8((esi + 0x69) >>> 0);
  regs.edi = rideOff;                                             // movzx+imul (full)
  const W = heap.u16((rideOff + station * 2 + 0x88746a) >>> 0);
  // xor cx,cx ; xchg ah,cl  → ax = W & 0xff (ah cleared), cx = (W>>8)&0xff
  let axw = (W & 0xff);
  let cxw = (W >>> 8) & 0xff;
  // shl ax,5 ; shl cx,5
  axw = (axw << 5) & 0xffff;
  cxw = (cxw << 5) & 0xffff;
  regs.eax = ((regs.eax & 0xffff0000) | axw) >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | cxw) >>> 0;
  const dl = heap.u8((station + rideOff + 0x887452) >>> 0);       // station z (kept)
  regs.ebx = station >>> 0;                                       // movzx ebx (full, was set at 0x43c235)
  // ebp = word[0x971ef4 + hash(ax,cx)*4]  (rol7/or/ror5 tile-index hash)
  let bp = cxw;                                                   // mov bp,cx
  bp = rol16(bp, 7);
  bp = (bp | axw) & 0xffff;
  bp = ror16(bp, 5);
  let ebp = heap.u32((0x00971ef4 + bp * 4) >>> 0) >>> 0;          // movzx ebp,bp ; mov ebp,[...]
  // walk to the ride-entrance element matching dl
  for (let guard = 0; ; guard++) {
    const dh = heap.u8(ebp) & 0x3c;                               // 0x43c26d
    if (dh === 0x10 && dl === heap.u8((ebp + 2) >>> 0)) break;    // found
    ebp = (ebp + 8) >>> 0;                                        // 0x43c27d
    if (guard > 4096) throw new Error("43c210: ride-entrance element not found (tile scan overran)");
  }
  regs.ebp = ebp;
  const dir = heap.u8(ebp) & 3;                                   // mov bl,[ebp] ; and ebx,3
  regs.ebx = dir >>> 0;
  axw = (axw + 0x10) & 0xffff;                                    // add ax,0x10
  cxw = (cxw + 0x10) & 0xffff;                                    // add cx,0x10
  let dxw = heap.u16((0x00629254 + dir * 4) >>> 0);               // dir offset x
  let bpw = heap.u16((0x00629256 + dir * 4) >>> 0);               // dir offset y
  // grp = byte[0x5f6b10 + rideType*4] ; scale from the group's 0x5f7104 flags
  const rideType = heap.u8((rideOff + 0x887421) >>> 0);
  const grp = heap.u8((0x005f6b10 + rideType * 4) >>> 0);
  regs.ebx = grp >>> 0;
  const scale = (heap.u16((0x005f7104 + grp * 8) >>> 0) & 0x5000) !== 0 ? 0x20 : 0x14;
  dxw = (s16(dxw) * scale) & 0xffff;                              // imul dx,bx (16-bit signed)
  bpw = (s16(bpw) * scale) & 0xffff;                              // imul bp,bx
  axw = (axw - dxw) & 0xffff;                                     // sub ax,dx
  cxw = (cxw - bpw) & 0xffff;                                     // sub cx,bp
  regs.eax = ((regs.eax & 0xffff0000) | axw) >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | cxw) >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | dxw) >>> 0;
  regs.ebp = ((regs.ebp & 0xffff0000) | bpw) >>> 0;
  heap.setU16((esi + 0x32) >>> 0, axw);                           // boarding target x
  heap.setU16((esi + 0x34) >>> 0, cxw);                           // boarding target y
  heap.setU8((esi + 0x36) >>> 0, 2);
  heap.setU8((esi + 0x2c) >>> 0, 9);                              // sub-state -> 9
  // 0x43c2eb ret
}
