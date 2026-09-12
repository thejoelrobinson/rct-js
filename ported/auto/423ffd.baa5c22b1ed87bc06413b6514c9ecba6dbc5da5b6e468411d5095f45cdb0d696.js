// @manual — do not regenerate.
//
// FUN_00423ffd — vertical wall / fence / support-column segment painter
// (binary 0x423ffd..0x4243ea, 1006 bytes). Called natively from the
// track/scenery paint walk; the single largest remaining interpreter
// consumer in the fleet before this port — 20.9% of all decoded
// instructions on sc3, 29.4% on SC15, 56.7% on SC12 (ADDENDUM 175).
//
// Transcribed from the capstone disassembly, NOT from decompiled/c/423ffd.c.
// The Ghidra C is unusable here for three independent reasons:
//
//   1. IT GETS THE RETURN CONTRACT BACKWARDS. This function returns its
//      result in the CARRY FLAG and PRESERVES EAX:
//        0x4243e5  pop esi/edx/ebx/eax ; stc      ; ret   -> CF=1
//        0x4243dd  pop esi/edx/ebx/eax ; and ax,ax; ret   -> CF=0
//        0x4243d9                       and ax,ax; ret   -> CF=0
//      `and ax,ax` only clears CF (and sets ZF/SF from an unchanged AX);
//      every exit restores the caller's EAX with `pop eax`. Ghidra modelled
//      that as `return CONCAT44(in_EDX,in_EAX)`, and the auto-translation
//      turned it into `return 0` / `return 1` — which the eip-hook folds
//      into regs.eax, CLOBBERING the caller's EAX on every single call.
//      The batch oracle measured exactly that: eaxMis 480 of 480.
//
//   2. The `goto LAB_004243dd` at the negative-height test lowered to
//      `return 0`, but LAB_004243dd is the `return 1` exit — so that path
//      returned the opposite of what the binary does. (Both are wrong
//      anyway; see 1.)
//
//   3. Two width errors of the usual class: `test byte ptr [0x991f2b], 1`
//      read as a dword at an odd address, and `mov word ptr [0x5f4728]`
//      emitted as setU32 — a 16-bit store modelled as a dword RMW, the
//      same bug audited in ADDENDUM 173.
//
// STRUCTURE
//   A  (0x423ffd) global-disable test, then a per-column height test
//      against [0x991f04 + ebx*4]; four rotation-neighbour probes through
//      the [0x5f419a + 0x48*n] tables decide whether the column is fully
//      occluded (all four <= -> CF=1, draw nothing).
//   B  (0x4240a8) the "cap" sprite: palette/offset lookup out of the
//      0x5f42ba/42bb/42ca/42cb/42da tables, painted through the rotation
//      dispatch PTR [0x431bb8 + [0x991f88]*4].
//   C  (0x42418b) the body: paint the column in 0x10-pixel segments, from
//      dx up to si. The binary unrolls this FOUR times per iteration
//      (0x4241f6 / 0x424249 / 0x42429c / 0x4242eb) and loops back from the
//      fourth to 0x4241de; only the fourth copy carries the
//      `cmp cx,0xf / inc bx` end-of-segment sprite bump.
//   D  (0x424333) commit the new column height, then — only if the ENTRY
//      AX was non-zero — a second segment run through the OTHER dispatch
//      table PTR [0x432204 + [0x991f88]*4].
//
// Two loop-exit tests that look alike are NOT alike, and the difference is
// load-bearing: the first segment test (0x4241a1) is `jle` (SIGNED) and
// every later one (0x4241f0, 0x424243, 0x424296, 0x4242e9, 0x424396) is
// `jbe` (UNSIGNED).
//
// Register contract: EAX, EBX, EDX, ESI, EDI, EBP all preserved; CF is the
// result. Wired with syncFlags=true so the hook round-trips it.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

const u16 = (v) => v & 0xffff;
const s16 = (v) => (v << 16) >> 16;
const lo16 = (r, v) => { regs[r] = ((regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const lo8 = (r, v) => { regs[r] = ((regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (r, v) => { regs[r] = ((regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };
const AX = () => regs.eax & 0xffff;
const BX = () => regs.ebx & 0xffff;
const CX = () => regs.ecx & 0xffff;
const DX = () => regs.edx & 0xffff;
const SI = () => regs.esi & 0xffff;
const AL = () => regs.eax & 0xff;
const AH = () => (regs.eax >>> 8) & 0xff;
const CL = () => regs.ecx & 0xff;

export function FUN_00423ffd(heap) {
  // 0x423ffd  test word [0x991f8c], 8 / jne 0x4243d9
  if ((heap.u16(0x00991f8c) & 8) !== 0) { regs.cf = 0; return; }

  // 0x42400c  push eax / ebx / edx / esi
  const savedEax = regs.eax >>> 0, savedEbx = regs.ebx >>> 0;
  const savedEdx = regs.edx >>> 0, savedEsi = regs.esi >>> 0;
  const restoreAndClear = () => {
    regs.eax = savedEax; regs.ebx = savedEbx; regs.edx = savedEdx; regs.esi = savedEsi;
    regs.cf = 0;                                  // and ax,ax
  };

  // 0x424010  test byte [0x991f2b], 1 / je 0x4243dd
  if ((heap.u8(0x00991f2b) & 1) === 0) { restoreAndClear(); return; }

  heap.setU16(0x005f4728, 0xffff);                // 0x42401d

  // 0x424026  cmp dx, [ebx*4 + 0x991f04] / jae 0x4240fa  (unsigned)
  if (DX() < heap.u16(0x00991f04 + (regs.ebx >>> 0) * 4)) {
    heap.setU16(0x005f4728, DX());                // 0x424034
    lo16("edx", DX() - heap.u16(0x005f438a + (regs.edi >>> 0) * 2));  // 0x42403b
    if (s16(DX()) < 0) { restoreAndClear(); return; }                 // 0x424043 js

    const savedEbp = regs.ebp >>> 0;              // 0x424049 push ebp
    regs.esi = ((heap.u32(0x00991f88) << 1) + 0x005f419a) >>> 0;      // 0x42404a..0x424052

    // 0x424058..0x4240a0 — four occlusion probes, esi += 0x48 between them.
    let occluded = true;
    for (let probe = 0; probe < 4; probe++) {
      if (probe > 0) regs.esi = (regs.esi + 0x48) >>> 0;
      regs.ebp = heap.u8((regs.esi + (regs.ebx >>> 0) * 8) >>> 0);
      if (DX() > heap.u16(0x00991f04 + (regs.ebp >>> 0) * 4)) { occluded = false; break; }
    }
    if (occluded) {                               // 0x4240a2 pop ebp / jmp 0x4243e5
      regs.ebp = savedEbp;
      regs.eax = savedEax; regs.ebx = savedEbx; regs.edx = savedEdx; regs.esi = savedEsi;
      regs.cf = 1;                                // stc
      return;
    }

    // ---- B: cap sprite (0x4240a8) ----
    const uVar7 = regs.ebp >>> 0;                 // push ebp  (popped into EBX below)
    const savedEdi = regs.edi >>> 0;              // push edi
    const tbl = heap.u8((regs.esi + (regs.ebx >>> 0) * 8 + 1) >>> 0);   // 0x4240aa
    regs.edi = (regs.edi << 4) >>> 0;             // 0x4240af
    lo16("eax", heap.u16(0x005f4188 + (regs.ebx >>> 0) * 2));           // 0x4240b2
    lo8("ecx", AH());                                                   // 0x4240ba mov cl, ah
    lo8("eax", AL() + heap.u8(0x005f42ba + tbl * 2));                   // 0x4240bc
    lo8("ecx", CL() + heap.u8(0x005f42bb + tbl * 2));                   // 0x4240c3
    regs.ebx = heap.u16((0x005f42da + (regs.edi >>> 0) + tbl * 2) >>> 0); // 0x4240ca
    lo16("edi", heap.u8(0x005f42ca + tbl * 2));                         // 0x4240d2 movzx di
    lo16("esi", heap.u8(0x005f42cb + tbl * 2));                         // 0x4240db movzx si
    hi8("eax", 1);                                                      // 0x4240e4 mov ah,1
    regs.ebx = (regs.ebx | savedEbp) >>> 0;                             // 0x4240e6 or ebx,[esp+8]
    regs.ebp = heap.u32(0x00991f88) >>> 0;                              // 0x4240ea
    callIndirect(heap, heap.u32((0x00431bb8 + (regs.ebp >>> 0) * 4) >>> 0));  // 0x4240f0

    regs.edi = savedEdi;                          // 0x4240f7 pop edi
    regs.ebx = uVar7;                             // 0x4240f8 pop ebx  <- the pushed EBP
    regs.ebp = savedEbp;                          // 0x4240f9 pop ebp
  }

  // ---- L_4240fa ----
  let skipHeader = false;
  if ((heap.u8(0x00991f06 + (regs.ebx >>> 0) * 4) & 0x20) !== 0) skipHeader = true;  // 0x4240fa
  if (!skipHeader) {
    lo16("esi", DX());                                                  // 0x424104
    lo16("esi", SI() - heap.u16(0x00991f04 + (regs.ebx >>> 0) * 4));    // 0x424107
    if (s16(SI()) < 6) skipHeader = true;                               // 0x42410f jl
    else if (heap.u16(0x005f43a0 + (regs.edi >>> 0) * 4) === 0) skipHeader = true;   // 0x424115 je
  }

  if (!skipHeader) {
    // 0x424120 — push ebx / edx / edi / ebp
    const pEbx = regs.ebx >>> 0, pEdx = regs.edx >>> 0;
    const pEdi = regs.edi >>> 0, pEbp = regs.ebp >>> 0;
    lo16("esi", heap.u16(0x00991f06 + (regs.ebx >>> 0) * 4));           // 0x424124
    regs.esi = (regs.esi & 0x1f) >>> 0;                                 // 0x42412c and esi,0x1f (FULL)
    lo16("esi", heap.u16(0x005f4604 + (regs.esi >>> 0) * 2));           // 0x42412f
    lo16("edx", heap.u16(0x00991f04 + (regs.ebx >>> 0) * 4));           // 0x424137
    lo16("eax", heap.u16(0x005f4188 + (regs.ebx >>> 0) * 2));           // 0x42413f
    lo8("ecx", AH());                                                   // 0x424147
    regs.ebx = heap.u16(0x005f43a0 + (regs.edi >>> 0) * 4);             // 0x424149
    lo16("ebx", BX() + SI());                                           // 0x424151
    hi8("eax", 5);                                                      // 0x424154
    lo16("edi", 0);                                                     // 0x424156 xor di,di
    lo16("esi", regs.edi & 0xffff);                                     // 0x424159 mov si,di
    regs.ebx = (regs.ebx | regs.ebp) >>> 0;                             // 0x42415c or ebx,ebp
    regs.ebp = heap.u32(0x00991f88) >>> 0;                              // 0x42415e
    callIndirect(heap, heap.u32((0x00431bb8 + (regs.ebp >>> 0) * 4) >>> 0));  // 0x424164
    regs.ebp = pEbp; regs.edi = pEdi; regs.edx = pEdx; regs.ebx = pEbx;  // 0x42416b..0x42416e
    lo16("esi", DX());                                                  // 0x42416f
    lo16("edx", heap.u16(0x00991f04 + (regs.ebx >>> 0) * 4) + 6);       // 0x424172, 0x42417a
  } else {
    lo16("esi", DX());                                                  // 0x424180
    lo16("edx", heap.u16(0x00991f04 + (regs.ebx >>> 0) * 4));           // 0x424183
  }

  // ---- C: 0x42418b — first segment, then the 4x-unrolled loop ----
  // One column segment: the shared body of 0x4241a3 / 0x4241f6 / 0x424249 /
  // 0x42429c / 0x4242eb. `bump` is the fourth copy's `cmp cx,0xf / inc bx`.
  const segment = (bump) => {
    const pEbx = regs.ebx >>> 0, pEcx = regs.ecx >>> 0, pEdx = regs.edx >>> 0;
    const pEdi = regs.edi >>> 0, pEsi = regs.esi >>> 0, pEbp = regs.ebp >>> 0;
    lo16("ecx", CX() - 1);                                              // dec cx
    lo16("eax", heap.u16(0x005f4188 + (regs.ebx >>> 0) * 2));
    regs.ebx = heap.u16(0x005f43a2 + (regs.edi >>> 0) * 4);
    lo16("ebx", BX() + CX());
    if (bump && CX() === 0x0f) lo16("ebx", BX() + 1);                   // 0x424306/0x42430c
    { const c = CL(), a = AH(); lo8("ecx", a); hi8("eax", c); }         // xchg cl, ah
    lo16("edi", 0);
    lo16("esi", regs.edi & 0xffff);
    regs.ebx = (regs.ebx | regs.ebp) >>> 0;
    regs.ebp = heap.u32(0x00991f88) >>> 0;
    callIndirect(heap, heap.u32((0x00431bb8 + (regs.ebp >>> 0) * 4) >>> 0));
    regs.ebp = pEbp; regs.esi = pEsi; regs.edi = pEdi;
    regs.edx = pEdx; regs.ecx = pEcx; regs.ebx = pEbx;
  };

  // 0x42418b — note the extra `and cx,0xfff0` here, absent from the loop,
  // and the SIGNED `jle` exit (every later test is unsigned `jbe`).
  lo16("ecx", DX() + 0x10);
  lo16("ecx", CX() & 0xfff0);
  if (!(CX() <= SI())) lo16("ecx", SI());                               // 0x424196 jbe
  lo16("ecx", CX() - DX());                                             // 0x42419e
  if (s16(CX()) > 0) segment(false);                                    // 0x4241a1 jle skips
  lo16("edx", DX() + CX());                                             // 0x4241db

  // 0x4241de — the unrolled loop. Any of the four `jbe`s leaves for D.
  loop: for (;;) {
    for (let k = 0; k < 4; k++) {
      lo16("ecx", DX() + 0x10);
      if (!(CX() <= SI())) lo16("ecx", SI());
      const before = CX();
      lo16("ecx", CX() - DX());
      if (before <= DX()) break loop;                                   // jbe (unsigned)
      segment(k === 3);
      lo16("edx", DX() + CX());
    }
  }

  // ---- D: 0x424333 ----
  lo16("esi", heap.u16(0x005f4728));                                    // 0x424333
  heap.setU16(0x00991f04 + (regs.ebx >>> 0) * 4, SI());                 // 0x42433a
  heap.setU8(0x00991f06 + (regs.ebx >>> 0) * 4, 0x20);                  // 0x424342
  regs.esi = savedEsi; regs.edx = savedEdx;                             // 0x42434a, 0x42434b
  regs.ebx = savedEbx; regs.eax = savedEax;                             // 0x42434c, 0x42434d
  if (AX() === 0) { regs.cf = 0; return; }                              // 0x42434e or ax,ax / je

  // 0x424357 — push edx / esi, then the second run through PTR [0x432204].
  const qEdx = regs.edx >>> 0, qEsi = regs.esi >>> 0;
  lo16("esi", AX());                                                    // 0x424359
  lo16("esi", SI() + DX());                                             // 0x42435c
  hi8("ecx", 0);                                                        // 0x42435f xor ch,ch
  lo8("ecx", heap.u8(0x005f4188 + (regs.ebx >>> 0) * 2));               // 0x424361
  heap.setU16(0x0099a4e8, CX());                                        // 0x424368
  lo8("ecx", heap.u8(0x005f4189 + (regs.ebx >>> 0) * 2));               // 0x42436f
  heap.setU16(0x0099a4ea, CX());                                        // 0x424376
  heap.setU16(0x0099a4ec, DX());                                        // 0x42437d

  for (;;) {                                                            // 0x424384
    lo16("ecx", DX() + 0x10);
    if (!(CX() <= SI())) lo16("ecx", SI());                             // 0x42438e jbe
    const before = CX();
    lo16("ecx", CX() - DX());
    if (before <= DX()) break;                                          // 0x424396 jbe
    const pEbx = regs.ebx >>> 0, pEcx = regs.ecx >>> 0, pEdx = regs.edx >>> 0;
    const pEdi = regs.edi >>> 0, pEsi = regs.esi >>> 0, pEbp = regs.ebp >>> 0;
    lo16("ecx", CX() - 1);                                              // 0x42439e
    lo16("eax", heap.u16(0x005f4188 + (regs.ebx >>> 0) * 2));           // 0x4243a0
    regs.ebx = heap.u16(0x005f43a2 + (regs.edi >>> 0) * 4);             // 0x4243a8
    lo16("ebx", BX() + CX());                                           // 0x4243b0
    lo8("ecx", AH());                                                   // 0x4243b3 mov cl,ah
    hi8("eax", 0);                                                      // 0x4243b5 xor ah,ah
    lo16("edi", 0);                                                     // 0x4243b7
    lo16("esi", regs.edi & 0xffff);                                     // 0x4243ba
    regs.ebx = (regs.ebx | regs.ebp) >>> 0;                             // 0x4243bd
    regs.ebp = heap.u32(0x00991f88) >>> 0;                              // 0x4243bf
    callIndirect(heap, heap.u32((0x00432204 + (regs.ebp >>> 0) * 4) >>> 0));  // 0x4243c5
    regs.ebp = pEbp; regs.esi = pEsi; regs.edi = pEdi;
    regs.edx = pEdx; regs.ecx = pEcx; regs.ebx = pEbx;
    lo16("edx", DX() + CX());                                           // 0x4243d2
  }
  regs.esi = qEsi; regs.edx = qEdx;                                     // 0x4243d7, 0x4243d8
  regs.cf = 0;                                                          // 0x4243d9 and ax,ax
}
