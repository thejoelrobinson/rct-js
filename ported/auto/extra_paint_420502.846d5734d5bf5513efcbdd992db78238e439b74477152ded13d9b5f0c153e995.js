// @manual — do not regenerate.
//
// FUN_extra_paint_420502 — palette-swizzle helper #3 of 4 dispatched from
// the tail of FUN_extra_paint_421d2c (terrain-surface per-element painter).
// Phase R+13a's diagnostic flagged these helpers as the dominant interpreter-
// fallback cost when the cb9==0 sprite-update gate opens; this file hand-ports
// the third (0x420502). Sibling helpers ship in:
//   - extra_paint_420d9c.js (helper #1, R+14b)
//   - extra_paint_420f4c.js (helper #2, R+14c)
//   - extra_paint_42094b.js (helper #4, R+14e)
//
// CODESEG body, function spans 0x420502..0x420943. Ghidra emits C for it
// (decompiled/c/420502.c) — but the auto-translator's lifted output has the
// usual translator-bug-class issues (u32 reads where the binary reads u16
// or u8, byte-indexed tables lifted with stride 4 instead of 1, the 16-bit
// `add ax, ...` with 0x66 prefix dropped, etc). Hand-port re-lifts the asm
// semantics faithfully.
//
// Calling convention (read from asm 0x420502 prologue + 0x420943 tail):
//   - cl  = rotation byte (used by `shl ax, cl` in the chain-walk block)
//   - dl  = "shade base" byte (used in the shared compare tail as
//           `mov ax, dx; mov cx, dx; add al, T[ebx]; add cl, T[ebx]`).
//   - ebx = swizzle index (used to index the dl-add tables; full 32-bit
//           because the asm at 0x42057F/0x420585 uses `[ebx + 0x5f46e4]`
//           and `[ebx + 0x5f4704]` with no scale — byte index).
//   - The function does `push ecx` at entry and `pop ecx` at 0x420943
//     → ecx is callee-preserved across the call.
//   - eax, edx (dh in particular), ebx, edi, ebp, esi are all caller-saved
//     and clobbered along various paths.
//
// What the function does on the HOT path (matches asm 0x420502..0x4205a1):
//   1. Read map coords: ax = [0x991f70] + word [4*rot + 0x5f4664]
//                       bp = [0x991f74] + word [4*rot + 0x5f4666]
//      where rot = [0x991f88]. All adds are 16-bit (the 0x66 prefix on
//      both `add` insns is dropped by the auto-translator).
//      Note vs 420d9c: that helper uses tables at 0x5f4684/0x5f4686 — this
//      helper uses 0x5f4664/0x5f4666 (a different anchor in the same dataseg
//      block, corresponding to a different sub-direction of the swizzle).
//   2. If ax>=0x1000 OR bp>=0x1000 → off-map fallback: edi=0, dh=1,
//      JUMP to 0x420579 (skipping the chain walk; carries entry DL).
//   3. Otherwise: compute tile_index = ((bp rol 7) | ax) ror 5  (all 16-bit),
//      then esi = [4*tile_index + 0x971ef4].
//   4. Walk the chain: while ([esi] & 0x3c) != 0: esi += 8.  (Bounded.)
//   5. Compute: al = [esi+4] & 0xf;  edi = [esi+4] & 0x10;
//              ax = al << cl;        (uses entry CL — rotation 0..3)
//              bp = (ax >> 4) | ax;   ebp &= 0xf;  edi |= ebp;
//              dh = [esi+2] >> 2.     (overwrites entry DH)
//   6. Shared compare-tail starting at 0x420579:
//        ax = dx; cx = dx
//        al += [ebx + 0x5f46e4]   ; cl += [ebx + 0x5f4704]
//        ah += [edi + 0x5f46c4]   ; ch += [edi + 0x5f46a4]
//      (note: in 420d9c the ebx-indexed tables are 0x5f46c4 / 0x5f46e4;
//       in 420502 they are 0x5f46e4 / 0x5f46c4 swapped — the asm orders the
//       add-to-al / add-to-cl pair differently. Re-checked from the disasm
//       at 0x42057F/0x420585/0x42058B/0x420591 to be certain.)
//   7. If al<=ah AND cl<=ch → jump to 0x420943 (pop ecx; ret) — early-out.
//      This is the dominant exit path on the hot title-scene profile and the
//      ONLY path the JS body claims to handle.
//
// COLD: anything else falls back to `runFunction` on the bridge cpu. The
// cold tail starting at 0x4205a3 does a queue-rotate (32 dwords at
// 0x999f9a..0x999fda shifting up) + up to 3 calls into PTR_LAB_00431bb8
// (rotation sub-painter) + 2 calls into PTR_LAB_00432204. It's substantially
// heavier than 420d9c's cold tail and is not worth re-lifting until the
// hot path's gain has been measured. The cold path fires whenever the
// compare at 0x420597..0x42059D fails — i.e. the element extends past one
// of the al/cl thresholds. Profile (title scene with f8c=0x900):
// ~most calls take the early-out; the rest enter the rotation queue.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { paintBody431bb8 } from "./extra_paint_431bb8.js";
import { paintBody432204 } from "./extra_paint_432204.js";

// Static-data table addresses (read-only).
const DAT_991F70 = 0x00991f70;  // map X coord (word)
const DAT_991F74 = 0x00991f74;  // map Y coord (word)
const DAT_991F88 = 0x00991f88;  // rotation (dword, value 0..3)
const TBL_5F4664 = 0x005f4664;  // map-X offset per rotation (word per 4-byte slot)
const TBL_5F4666 = 0x005f4666;  // map-Y offset per rotation (word per 4-byte slot)
const TBL_TILEPTR = 0x00971ef4; // tile-pointer table base (dword per slot)
const TBL_5F46E4 = 0x005f46e4;  // ebx-indexed dl-add table for al (byte)
const TBL_5F4704 = 0x005f4704;  // ebx-indexed dl-add table for cl (byte)
const TBL_5F46C4 = 0x005f46c4;  // edi-indexed dh-add table for ah (byte)
const TBL_5F46A4 = 0x005f46a4;  // edi-indexed dh-add table for ch (byte)

/** Fallback: run the original binary body from `addr` via runFunction. */
function runBodyFrom(heap, cpu, runFunction, addr) {
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, addr, { stackTop: savedESP, limit: 5_000_000 });
  } catch (_) {
    // sub-painter errors non-fatal; matches outer bridge tolerance.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
}

/** The hot-path JS body. Inputs come from cpu.regs / heap. Returns true if
 * the JS body fully handled the call (early-return case); false if a cold
 * branch was detected and the caller should fall back to runFunction.
 */
export function paintBody420502(heap, cpu) {
  // (__forceInterp420502 is tools/painter-port-oracle.mjs's A/B switch.)
  if (globalThis._420502_force_fallback || globalThis.__forceInterp420502) return false;
  // Entry register snapshot. The binary's `push ecx` at 0x420502 saves ecx
  // for the eventual `pop ecx` at 0x420943 → callee-preserved.
  const eax0 = cpu.regs.eax >>> 0;
  const ecx0 = cpu.regs.ecx >>> 0;
  const edx0 = cpu.regs.edx >>> 0;
  const entryCL = ecx0 & 0xff;
  const entryDL = edx0 & 0xff;
  const entryEBX = cpu.regs.ebx >>> 0;

  const rot = heap.u32(DAT_991F88) >>> 0;
  const slot4 = (rot & 0xffffffff) * 4;

  // === 0x420503..0x42051E: ax/bp init + 16-bit add ===
  // The 0x66 prefix on the `add ax, [esi*4+...]` instructions makes both
  // adds 16-bit; the auto-translator drops it and produces a 32-bit add
  // which then collides with the bounds check below.
  let ax = (heap.u16(DAT_991F70) + heap.u16(TBL_5F4664 + slot4)) & 0xffff;
  let bp = (heap.u16(DAT_991F74) + heap.u16(TBL_5F4666 + slot4)) & 0xffff;

  // EDI/DH to use entering the shared tail at 0x420579, plus the live
  // ESI/EBP register values at that point (observable at every ret).
  let edi;
  let dh;
  let esiLive0;
  let ebpLive0;
  let offMap = false;
  const dl = entryDL;  // dl is callee-preserved by this function

  // === 0x420526..0x420531: cmp ax/bp, 0x1000; jae 0x4204fc (=> 0x420945) ===
  // 0x4204fc is the off-map epilogue (it falls into 0x420945: xor edi,edi;
  // mov dh,1; jmp ... ; actually the asm at 0x420945 jumps to 0x4209c2 which
  // is the off-map handler of the sibling 0x42094b. The 0x420502 off-map
  // path is reached via the `jnc 0x4204fc` jumps, which lands inside the
  // PRECEDING function 0x420446's tail at 0x4204fc — i.e. 0x420502 shares
  // its off-map handler with its predecessor in the same swizzle group).
  // From the C decompile, the semantics are simply: uVar10=0, bVar6=1, and
  // fall through to the compare-tail. The asm path goes through 0x4204fc
  // which sets edi=0, dh=1, and jumps to the equivalent of 0x420579. We
  // match that by setting edi/dh inline and continuing to step 6.
  if (ax >= 0x1000 || bp >= 0x1000) {
    offMap = true;
    edi = 0;
    dh = 1;
    esiLive0 = cpu.regs.esi >>> 0;                       // untouched
    ebpLive0 = ((cpu.regs.ebp & 0xffff0000) | bp) >>> 0; // 16-bit writes only
  } else {
    // === 0x420533..0x42053A: tile_idx = ((bp rol 7) | ax) ror 5 (16-bit) ===
    bp = (((bp << 7) | (bp >>> 9)) & 0xffff) | ax;
    bp &= 0xffff;
    const tileIdx = (((bp >>> 5) | (bp << 11)) & 0xffff) >>> 0;

    // === 0x42053E..0x420541: esi = [4*tileIdx + 0x971ef4] ===
    let esi = heap.u32(TBL_TILEPTR + tileIdx * 4) >>> 0;

    // === 0x420548..0x420553: walk chain while [esi]&0x3c != 0 ===
    // Bounded to avoid an OOB throw on corrupt chains; matches 420d9c's
    // safety cap.
    let walked = 0;
    while ((heap.u8(esi) & 0x3c) !== 0) {
      esi = (esi + 8) >>> 0;
      if (++walked > 4096) {
        // Pathological chain — fall back to interp.
        return false;
      }
    }
    esiLive0 = esi;

    // === 0x420555..0x420577: compute eax/edi/ebp/dh ===
    let eax = heap.u8(esi + 4) & 0xff;
    edi = eax & 0x10;
    eax = eax & 0xf;
    // shl ax, cl (cl in 0..31)
    let axShifted = (eax << (entryCL & 0x1f)) & 0xffff;
    let ebpVal = axShifted;
    ebpVal = ((ebpVal >>> 4) | axShifted) & 0xffff;
    dh = (heap.u8(esi + 2) >>> 2) & 0xff;
    ebpVal &= 0xf;                  // 32-bit `and ebp,0xf` clears the high half
    ebpLive0 = ebpVal >>> 0;
    edi |= ebpVal;
  }

  // === 0x420579..0x420595: shared tail — compute al, ah, cl, ch ===
  //   ax = dx; cx = dx
  //   al += [ebx + 0x5f46e4]   ; cl += [ebx + 0x5f4704]
  //   ah += [edi + 0x5f46c4]   ; ch += [edi + 0x5f46a4]
  // NOTE: ebx/edi are used as byte offsets (no scale) — confirmed from the
  // asm operand bytes (modrm with sib disp32, no scale). The auto-translator
  // emits `heap.u32(base + idx * 4)` which is wrong for both stride and
  // operand size.
  let al = (dl + heap.u8(TBL_5F46E4 + entryEBX)) & 0xff;
  let cl = (dl + heap.u8(TBL_5F4704 + entryEBX)) & 0xff;
  let ah = (dh + heap.u8(TBL_5F46C4 + edi)) & 0xff;
  let ch = (dh + heap.u8(TBL_5F46A4 + edi)) & 0xff;

  // === 0x420597..0x42059D: cmp al,ah; ja 0x4205a3; cmp cl,ch; jna 0x420943 ===
  // 0x420943: pop ecx; ret  — early-return path, with full exit-register
  // fidelity (2026-06-10; see the 42094b sibling for the derivation).
  cmp8Flags(cpu, al, ah);
  const eaxHigh = offMap ? (eax0 & 0xffff0000) : 0;
  let eaxLive = (eaxHigh | (ah << 8) | al) >>> 0;
  let edxLive = ((edx0 & 0xffff0000) | (dh << 8) | dl) >>> 0;
  let ediLive = edi >>> 0;
  let esiLive = esiLive0 >>> 0;
  let ebpLive = ebpLive0 >>> 0;
  let ebxLive = entryEBX;
  let ecxLive = ((ecx0 & 0xffff0000) | (ch << 8) | cl) >>> 0;
  if (al <= ah) {
    cmp8Flags(cpu, cl, ch);
    if (cl <= ch) {
      cpu.regs.eax = eaxLive;
      cpu.regs.ecx = ecx0;        // pop ecx
      cpu.regs.edx = edxLive;
      cpu.regs.edi = ediLive;
      cpu.regs.esi = esiLive;
      cpu.regs.ebp = ebpLive;
      return true;
    }
  }

  // === 0x4205a3..0x420941: cold multi-call edge-strip loop ===
  // Structural sibling of the 42094b cold tail (see extra_paint_42094b.js
  // for the asm walkthrough); the 420502-specific constants are:
  //   - [0x5f4724] is set WITHOUT the +5 the sibling adds,
  //   - scratch ring head/index at 0x999f9a/0x999f9b; the shift covers
  //     [0x999f9a..0x999fd9] ← old [0x999f9c..0x999fdb], leaving
  //     edi = old u32[0x999fd8],
  //   - base strips stage al=0x1e, cl=0, di=0, si=0x1e (ah=0xf),
  //   - segment A: sprite +0, regs al=0x1e/cl=0/di=0x20/si=1, extents 0/0,
  //   - segment B: sprite +1, same regs, extents 0/0x1f.
  const rotIdx = rot & 3;
  let spriteBase = heap.u32(0x005f476c) >>> 0;
  if ((heap.u16(0x00991f8c) & 1) !== 0) spriteBase = heap.u32(0x005f4770) >>> 0;
  heap.setU32(0x005f4724, spriteBase);
  ebpLive = spriteBase;

  const stageRegs = () => {
    cpu.regs.eax = eaxLive; cpu.regs.ecx = ecxLive;
    cpu.regs.edx = edxLive; cpu.regs.ebx = ebxLive;
    cpu.regs.edi = ediLive; cpu.regs.esi = esiLive;
    cpu.regs.ebp = ebpLive;
  };
  const call431bb8 = () => {
    stageRegs();
    try { paintBody431bb8(heap, cpu, rotIdx); } catch (_) { /* non-fatal */ }
  };
  const call432204 = () => {
    stageRegs();
    try { paintBody432204(heap, cpu, rotIdx); } catch (_) { /* non-fatal */ }
    eaxLive = cpu.regs.eax >>> 0; ecxLive = cpu.regs.ecx >>> 0;
    edxLive = cpu.regs.edx >>> 0; ebxLive = cpu.regs.ebx >>> 0;
    ediLive = cpu.regs.edi >>> 0; esiLive = cpu.regs.esi >>> 0;
    ebpLive = cpu.regs.ebp >>> 0;
  };
  const ringShift = () => {
    ediLive = heap.u32(0x00999fd8) >>> 0;
    const tmp = heap.bytes.slice(0x999f9c, 0x999fdc);
    heap.bytes.set(tmp, 0x999f9a);
  };
  // Stage the strip-call registers (al=0x1e, ah=0xf, cl=0, di=0, si=0x1e,
  // dx=dh<<4, ebx as given, ebp=rot).
  const stageStrip = (ebxVal, dhv) => {
    ebxLive = ebxVal >>> 0;
    eaxLive = ((eaxLive & 0xffff0000) | 0x0f1e) >>> 0;
    ecxLive = (ecxLive & 0xffffff00) >>> 0;
    ediLive = (ediLive & 0xffff0000) >>> 0;
    esiLive = ((esiLive & 0xffff0000) | 0x1e) >>> 0;
    edxLive = ((edxLive & 0xffff0000) | ((dhv << 4) & 0xffff)) >>> 0;
    ebpLive = rot >>> 0;
  };

  // === preamble strip (0x4205c0..0x420609) ===
  let dhL = ch;                                   // mov dh, ch
  const syncDh = () => { edxLive = ((edxLive & 0xffff00ff) | (dhL << 8)) >>> 0; };
  syncDh();
  cmp8Flags(cpu, dhL, ah);
  if (dhL !== ah) {
    let ebxStrip = 3;
    if (dhL >= ah) { dhL = ah; ebxStrip = 4; syncDh(); }  // jb skips clamp+inc
    cmp8Flags(cpu, dhL, al);
    let doCall = dhL !== al;
    if (doCall) { cmp8Flags(cpu, dhL, cl); doCall = dhL !== cl; }
    if (doCall) {
      const sEax = eaxLive, sEcx = ecxLive, sEdx = edxLive;   // push eax/ecx/edx
      stageStrip(ebxStrip + spriteBase, dhL);
      call431bb8();
      eaxLive = sEax; ecxLive = sEcx; edxLive = sEdx;         // pops
      dhL = (dhL + 1) & 0xff; syncDh();                       // inc dh
    }
    ebxLive = entryEBX;                                       // pop ebx
  }
  // mov ah, cl — the loop's upper bound becomes the computed CL.
  const ah2 = cl;
  eaxLive = ((eaxLive & 0xffff0000) | (ah2 << 8) | al) >>> 0;
  // push ebx; push edx — restored by the final pops at 0x420941/42.
  const edxAtLoopPush = edxLive;
  const ebxAtLoopPush = ebxLive;

  // === main loop (0x42060e..0x420906) ===
  let guard = 0;
  for (;;) {
    if (++guard > 4096) return false;             // interp would spin too
    cmp8Flags(cpu, dhL, al);
    if (dhL >= al) break;                         // jae TAIL
    cmp8Flags(cpu, dhL, ah2);
    if (dhL >= ah2) break;                        // jae TAIL
    const ring0 = heap.u8(0x00999f9a);
    cmp8Flags(cpu, dhL, ring0);
    if (dhL !== ring0) {
      if (dhL > ring0) {                          // ja: shift ring, recheck
        ringShift();
        continue;
      }
      // dh below ring head (0x4208d8): one base strip via 431bb8, dh++.
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      stageStrip(heap.u32(0x005f4724) >>> 0, dhL);
      call431bb8();
      eaxLive = sEax; edxLive = sEdx;             // pops
      dhL = (dhL + 1) & 0xff; syncDh();           // inc dh
      continue;
    }
    // === dh == ring head: two-part edge segment (0x42062a..0x420739) ===
    // --- segment A ---
    {
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      let ebxr = heap.u8(0x00999f9b);
      let dl2 = (dhL + heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      if (dl2 > al || dl2 > ah2) {
        dl2 = (dl2 - heap.u8(0x005f472e + ebxr * 2)) & 0xff;
        ebxr = heap.u8(0x005f475e + ebxr);
        heap.setU8(0x00999f9b, ebxr);
        dl2 = (dl2 + heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      }
      dl2 = (dl2 - heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      const dx3 = (dl2 << 4) & 0xffff;
      let ah3 = heap.u8(0x005f472f + ebxr * 2);
      let dx4 = (dx3 + heap.u16(0x005f4746 + ebxr * 2)) & 0xffff;
      ah3 = (ah3 << 4) & 0xff;
      if (((dx4 << 16) >> 16) < 0x10) {           // jge skips (signed 16-bit)
        dx4 = (dx4 + 0x10) & 0xffff;
        ah3 = (ah3 - 0x10) & 0xff;
      }
      heap.setU16(0x0099a4ec, dx4);
      const tblPtr = heap.u32(0x005f477c) >>> 0;
      edxLive = ((edxLive & 0xffff0000) | dx3) >>> 0;   // pop edx (the dx3 push)
      ah3 = (ah3 - 1) & 0xff;                            // dec ah
      ebxLive = heap.u32(tblPtr + ebxr * 4) >>> 0;       // sprite +0
      eaxLive = ((eaxLive & 0xffff0000) | (ah3 << 8) | 0x1e) >>> 0;  // al=0x1e
      ecxLive = (ecxLive & 0xffffff00) >>> 0;            // cl=0
      ediLive = ((ediLive & 0xffff0000) | 0x20) >>> 0;
      esiLive = ((tblPtr & 0xffff0000) | 1) >>> 0;       // full esi load, si=1
      heap.setU16(0x0099a4e8, 0);
      heap.setU16(0x0099a4ea, 0);
      ebpLive = rot >>> 0;
      call432204();
      edxLive = sEdx; eaxLive = sEax;             // pops
    }
    // --- segment B ---
    {
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      const ebxr = heap.u8(0x00999f9b);           // possibly updated by A
      const dxB = (dhL << 4) & 0xffff;
      let ahB = (heap.u8(0x005f472f + ebxr * 2) << 4) & 0xff;
      let dx5 = (dxB + heap.u16(0x005f4746 + ebxr * 2)) & 0xffff;
      if (dx5 === 0) {                            // jne skips the adjust
        dx5 = 0x10;
        ahB = (ahB - 0x10) & 0xff;
      }
      heap.setU16(0x0099a4ec, dx5);
      const tblPtr = heap.u32(0x005f477c) >>> 0;
      edxLive = ((edxLive & 0xffff0000) | dxB) >>> 0;   // pop edx
      ahB = (ahB - 1) & 0xff;
      ebxLive = (heap.u32(tblPtr + ebxr * 4) + 1) >>> 0; // inc ebx (sprite +1)
      eaxLive = ((eaxLive & 0xffff0000) | (ahB << 8) | 0x1e) >>> 0;  // al=0x1e
      ecxLive = (ecxLive & 0xffffff00) >>> 0;            // cl=0
      ediLive = ((ediLive & 0xffff0000) | 0x20) >>> 0;
      esiLive = ((tblPtr & 0xffff0000) | 1) >>> 0;
      heap.setU16(0x0099a4e8, 0);
      heap.setU16(0x0099a4ea, 0x1f);
      ebpLive = rot >>> 0;
      call432204();
      edxLive = sEdx; eaxLive = sEax;             // pops
    }
    // === advance + ring shift ===
    ediLive = heap.u8(0x00999f9b) >>> 0;          // movzx edi (32-bit)
    dhL = (dhL + heap.u8(0x005f472e + ediLive * 2)) & 0xff;  // add dh, step
    edxLive = ((edxLive & 0xffff00ff) | (dhL << 8)) >>> 0;
    ringShift();
  }

  // === TAIL (0x42090b..0x420941): up to one base strip ===
  {
    let ebxStrip = 1;
    cmp8Flags(cpu, dhL, al);
    let doCall = true;
    if (dhL >= al) {
      ebxStrip = 2;
      cmp8Flags(cpu, dhL, ah2);
      if (dhL >= ah2) doCall = false;
    }
    if (doCall) {
      stageStrip(ebxStrip + (heap.u32(0x005f4724) >>> 0), dhL);
      // Exit flags from the trailing shl dx,4 (OF=0 via the strip's
      // xor di,di; CF=0; ZF=(dh==0); SF=0); 431bb8 may then set CF.
      cpu.eflags.OF = 0; cpu.eflags.CF = 0;
      cpu.eflags.ZF = (dhL === 0) ? 1 : 0; cpu.eflags.SF = 0;
      call431bb8();
    }
  }

  // === END (0x420941): pop edx; pop ebx; pop ecx; ret ===
  cpu.regs.eax = eaxLive;
  cpu.regs.ecx = ecx0;
  cpu.regs.edx = edxAtLoopPush;
  cpu.regs.ebx = ebxAtLoopPush;
  cpu.regs.edi = ediLive;
  cpu.regs.esi = esiLive;
  cpu.regs.ebp = ebpLive;
  return true;
}

// Faithful 8-bit CMP flags (matches the interpreter's 8-bit cmp handler).
function cmp8Flags(cpu, a, b) {
  a &= 0xff; b &= 0xff;
  const r = (a - b) & 0xff;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 7) & 1;
  const sa = (a << 24) >> 24, sb = (b << 24) >> 24, sr = (r << 24) >> 24;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 7) & 1;
  cpu.eflags.CF = (a < b) ? 1 : 0;
}

/** Install the setEipHook at 0x420502 on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install420502Hook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_420502");
    }
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    try {
      handled = paintBody420502(heap, cpu);
    } catch (e) {
      if (!install420502Hook._warned) {
        install420502Hook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[420502 port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x420502
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x00420502);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x00420502);
      } finally {
        _setEipHook(0x00420502, hookFn);
      }
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 421d2c tail.
  };
  setEipHook(0x00420502, hookFn);
}
