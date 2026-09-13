// @manual — do not regenerate.
//
// FUN_005ddcbe — vehicle "entry pre-update" / breakdown-eligibility check.
// Direct callee of the 0x5da274 per-sprite vehicle update (reached via
// callNative(0x5ddcbe) from extra_vehicle_5da274.js). ~64 interp steps/tick
// during scenario play.
//
// REWRITTEN from the capstone disassembly (CODESEG file off = va-0x41c000
// +0x1a600) because the auto-translation (decompiled/c/5ddcbe.c) carried
// several translator bugs:
//   * stride/width: the ride-record accesses use a SHORT-array base
//     (&DAT_00887420/22 indexed by uVar3*0x130) and an INT-array base
//     (&DAT_00887444 indexed by uVar3*0x98); Ghidra's element indices were
//     lowered as `* 4` byte multiplies on top of an already-byte iVar4
//     (= uVar3*0x260), i.e. addresses multiplied a second time. The disasm
//     uses a single byte index `edi = byte[esi+0x30]*0x260` everywhere, so
//     all of 0x887420/22/42/44 are `+ iVar4`.
//   * width: [0x887422+iVar4] is `test/or word` (0x480 / 0x800) — read/written
//     as u16, not u32.  [0x887420+iVar4] is `movzx byte` — u8, not u32.
//   * the two final stores were mistranslated: the disasm does
//     `mov dword [0x971e8c], eax` (Ghidra's `unique0x00017200`, lowered to a
//     dead JS local) and `mov word [0x971e90], ax` — the auto-JS dropped the
//     0x971e8c dword store entirely and mis-addressed the 0x971e90 word.
//
// Disasm (0x5ddcbe .. single ret at 0x5ddd9b):
//   edi = movzx byte[esi+0x30] * 0x260                        ; iVar4
//   if (word[0x887422+iVar4] & 0x480) -> ret
//   eax = movzx byte[0x887420+iVar4]
//   if ((dword[0x5f5b78 + eax*8] & 0x8000000) == 0) -> ret
//   word[esi+0xd0] += 1                                       ; inc word
//   if (word[0x887422+iVar4] & 0x800) -> ret
//   ax = 0x2580 ; if (byte[0x887420+iVar4] == 8) ax = 0x3c00
//   if (ax >= word[esi+0xd0])  (unsigned jae) -> ret
//   word[0x887422+iVar4] |= 0x800
//   pushal
//     ax = word[0x5f5802 + byte[0x887420+iVar4]*8] + 6 ; word[0x971e86] = ax
//     cx = word[esi+0xa] ; ebx = 0
//     while (word[0x88747e + iVar4 + ebx*2] != cx) ebx++
//     word[0x971e88] = (bx + 1) & 0xffff
//     word[0x971e8a] = word[0x887442+iVar4]
//     dword[0x971e8c] = dword[0x887444+iVar4]
//     word[0x971e90] = word[0x5f5806 + byte[0x887420+iVar4]*8]
//     al = 1 ; ecx = movzx byte[esi+0x30] ; bx = 0x7f1
//     call 0x42c711            ; delegated via callNative (eax.al=1, ecx set)
//   popal
//   ret
// The single sub-call (0x42c711) sits inside pushal/popal, so its register
// clobber is discarded by the binary; only its heap effects matter and they
// round-trip byte-exactly through callNative (same bytes as the interp leg).
//
// Oracle: tools/_lockstep-5ddcbe.mjs (whole-heap per-call compare vs the
// interpreter; calls=N memMis=0). Interp leg behind __forceInterp5ddcbe.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const RIDE_FLAGS = 0x00887422; // short[]  ride status/flags
const RIDE_TYPE  = 0x00887420; // short[]  ride sub-type byte (low byte read)
const RIDE_F442  = 0x00887442; // short[]
const RIDE_F444  = 0x00887444; // int[]
const RIDE_NAMES = 0x0088747e; // word table indexed within the ride record
const TBL_5F5B78 = 0x005f5b78; // dword[] keyed by ride-type*8
const TBL_5F5802 = 0x005f5802; // word[]  keyed by ride-type*8
const TBL_5F5806 = 0x005f5806; // word[]  keyed by ride-type*8
const OUT_971E86 = 0x00971e86;

/**
 * @param {Heap} heap
 */
export function FUN_005ddcbe(heap) {
  const esi = regs.esi >>> 0;

  // 0x5ddcbe: edi = movzx byte[esi+0x30] * 0x260
  const iVar4 = ((heap.u8(esi + 0x30) * 0x260) >>> 0);

  // 0x5ddcc8: test word [0x887422+iVar4], 0x480 ; jne ret
  if ((heap.u16(RIDE_FLAGS + iVar4) & 0x480) !== 0) return;

  // 0x5ddcd7: eax = movzx byte [0x887420+iVar4]
  const rideType = heap.u8(RIDE_TYPE + iVar4) >>> 0;
  // 0x5ddcde: test dword [0x5f5b78 + eax*8], 0x8000000 ; je ret
  if ((heap.u32(TBL_5F5B78 + rideType * 8) & 0x8000000) === 0) return;

  // 0x5ddcef: inc word [esi+0xd0]   (side effect persists past later returns)
  heap.setU16(esi + 0xd0, (heap.u16(esi + 0xd0) + 1) & 0xffff);

  // 0x5ddcf6: test word [0x887422+iVar4], 0x800 ; jne ret
  if ((heap.u16(RIDE_FLAGS + iVar4) & 0x800) !== 0) return;

  // 0x5ddd05: ax = 0x2580 ; if byte[0x887420+iVar4]==8 -> ax = 0x3c00
  let ax = 0x2580;
  if (heap.u8(RIDE_TYPE + iVar4) === 8) ax = 0x3c00;

  // 0x5ddd16: cmp ax, word[esi+0xd0] ; jae ret  (unsigned: ret if ax >= d0)
  if ((ax >>> 0) >= (heap.u16(esi + 0xd0) >>> 0)) return;

  // 0x5ddd1f: or word [0x887422+iVar4], 0x800
  heap.setU16(RIDE_FLAGS + iVar4, heap.u16(RIDE_FLAGS + iVar4) | 0x800);

  // ---- pushal block (register clobber from 0x42c711 is discarded) ----

  // 0x5ddd29: ebx = movzx byte[0x887420+iVar4]
  // 0x5ddd30: ax = word[0x5f5802 + ebx*8] ; add ax,6
  let bx2 = heap.u8(RIDE_TYPE + iVar4) >>> 0;
  ax = (heap.u16(TBL_5F5802 + bx2 * 8) + 6) & 0xffff;
  // 0x5ddd3c: mov word [0x971e86], ax
  heap.setU16(OUT_971E86 + 0, ax);

  // 0x5ddd42: cx = word[esi+0xa] ; 0x5ddd46: ebx = 0
  const cx = heap.u16(esi + 0xa);
  let ebx = 0;
  // 0x5ddd48: while word[0x88747e + iVar4 + ebx*2] != cx -> inc ebx
  while (heap.u16(RIDE_NAMES + iVar4 + ebx * 2) !== cx) {
    ebx = (ebx + 1) >>> 0;
    if (ebx > 0x10000) break; // safety; binary has no bound (match guaranteed)
  }
  // 0x5ddd55: inc bx ; 0x5ddd57: mov word [0x971e88], bx
  heap.setU16(OUT_971E86 + 2, (ebx + 1) & 0xffff);

  // 0x5ddd5e: ax = word[0x887442+iVar4] ; 0x5ddd65: mov word [0x971e8a], ax
  heap.setU16(OUT_971E86 + 4, heap.u16(RIDE_F442 + iVar4) & 0xffff);

  // 0x5ddd6b: eax = dword[0x887444+iVar4] ; 0x5ddd71: mov dword [0x971e8c], eax
  heap.setU32(OUT_971E86 + 6, heap.u32(RIDE_F444 + iVar4) >>> 0);

  // 0x5ddd76: ebx = movzx byte[0x887420+iVar4]
  // 0x5ddd7d: ax = word[0x5f5806 + ebx*8] ; 0x5ddd85: mov word [0x971e90], ax
  bx2 = heap.u8(RIDE_TYPE + iVar4) >>> 0;
  heap.setU16(OUT_971E86 + 0xa, heap.u16(TBL_5F5806 + bx2 * 8) & 0xffff);

  // 0x5ddd8b: al = 1 ; 0x5ddd8d: ecx = movzx byte[esi+0x30] ; 0x5ddd91: bx = 0x7f1
  // 0x5ddd95: call 0x42c711  (reads in_EAX.al = 1 and in_ECX). Stage exact regs.
  regs.esi = esi >>> 0;
  regs.eax = (regs.eax & 0xffffff00) | 1;
  regs.ecx = heap.u8(esi + 0x30) >>> 0;
  regs.ebx = 0x7f1; // movzx ebx earlier => upper 16 bits 0, then mov bx,0x7f1
  regs.edi = iVar4 >>> 0;
  callNative(0x42c711, []);

  // 0x5ddd9a: popal — register effects of 0x42c711 are dropped by the binary.
  // 0x5ddd9b: ret
}
