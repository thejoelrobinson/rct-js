// @manual — do not regenerate.
//
// FUN_extra_paint_42094b — palette-swizzle helper #4 of 4 dispatched from
// the tail of FUN_extra_paint_421d2c (terrain-surface per-element painter).
// Sibling of FUN_extra_paint_420d9c (already hand-ported in Phase R+14b);
// same overall skeleton — bounds check, tile-pointer chain walk, al/ah/cl/ch
// compare → either early-return or cold paint-dispatch loop.
//
// Phase R+14e ports the last of the 4 helpers. After this lands ALL 5
// CODESEG callees of 0x421d2c (the rotation sub-painter 0x431bb8 plus the
// four palette-swizzle helpers 0x420d9c / 0x420f4c / 0x420502 / 0x42094b)
// are JS-native.
//
// CODESEG body from 0x42094b through 0x420d95 (the `pop ecx; ret` tail).
// Ghidra emits C for it (decompiled/c/42094b.c) — but the auto-translator
// mis-types several reads (u32 where the binary reads u16; u32 indexed
// loads where bytes are read; not modeling rol/ror 16-bit). Hand-port
// re-lifts the asm semantics faithfully.
//
// What the function does on the HOT path (matches asm 0x42094b..0x4209e6):
//   1. Read map coords: ax = [0x991f70] + word [4*rot + 0x5f4674]
//                       bp = [0x991f74] + word [4*rot + 0x5f4676]
//      where rot = [0x991f88]. (Note the table addresses 0x5f4674 / 0x5f4676
//      differ from 420d9c's 0x5f4684 / 0x5f4686 — each helper indexes a
//      different pair of per-rotation X/Y offset tables.) All adds are 16-bit
//      (0x66 prefix on both `add` insns).
//   2. If ax>=0x1000 OR bp>=0x1000 → "off-map" fallback (at the trampoline
//      label 0x420945, in the gap before this function): edi=0, dh=1, JUMP
//      to 0x4209c2 (skipping the chain walk; carries entry DL).
//   3. Otherwise: compute tile_index = ((bp rol 7) | ax) ror 5  (all 16-bit),
//      then esi = tile_pointers[tile_index] (i.e. [4*tile_index + 0x971ef4]).
//   4. Walk the chain: while ([esi] & 0x3c) != 0: esi += 8.
//   5. Compute: al = [esi+4] & 0xf;  edi = [esi+4] & 0x10;
//              ax = al << cl;        (uses entry CL — rotation 0..3)
//              bp = (ax >> 4) | ax;   ebp &= 0xf;  edi |= ebp;
//              dh = [esi+2] >> 2.     (overwrites entry DH)
//   6. Shared tail starting at 0x4209c2:
//        ax = dx; cx = dx
//        al += T_A4[ebx];  cl += T_04[ebx]
//        ah += T_C4[edi];  ch += T_E4[edi]
//      (Note the role-swap vs 420d9c: here EBX indexes the A4/04 tables and
//      EDI indexes the C4/E4 tables. 420d9c had it the other way around.)
//   7. If al<=ah AND cl<=ch → return (the binary's `jbe 0x420d94` to
//      `pop ecx; ret` early-return path).
//   8. Else (cold paint-dispatch loop at 0x4209ec..0x420d92):
//        ebp = (0x991f8c & 1) ? [0x5f4770] : [0x5f476c]
//        [0x5f4724] = ebp + 5
//        Then a multi-call loop driven by:
//          - [4*rot + 0x431bb8]  (the rotation sub-painter we already JS-ported
//            in Phase R+14)
//          - [4*rot + 0x432204]  (a different sub-painter — not yet ported)
//          - the DAT_999fdc..DAT_99a01c shifted block (a per-element scratch
//            ring the cold loop both reads and rotates).
//      For the title-screen profile [0x991f8c] is 0x900 (bits 8+11 set, bit 0
//      CLEAR); fall back to runFunction for cold. Correctness > speed for cold.
//
// Calling convention on entry (mirror of 420d9c, identical contract):
//   - cl = rotation byte (used by `shl ax, cl` at step 5)
//   - dl = "shade base" byte (used at step 6 as `ax=dx, cx=dx` low halves)
//   - ebx = "swizzle index" (already loaded by the parent at 0x4225bc time:
//           the parent's ebx is the high-bit-stripped slope+terrain index)
//   - eax/ecx high bits not used; only cl/dl read.
//   - The function PUSHES ecx at entry (0x42094b: push ecx) and POPS at
//     0x420d94 — i.e. ecx is callee-preserved across the call. EAX/EBX
//     are caller-saved per the binary's calling convention.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { paintBody431bb8 } from "./extra_paint_431bb8.js";
import { paintBody432204 } from "./extra_paint_432204.js";

// Static-data table addresses (read-only).
const DAT_991F70 = 0x00991f70;  // map X coord (word)
const DAT_991F74 = 0x00991f74;  // map Y coord (word)
const DAT_991F88 = 0x00991f88;  // rotation (dword, value 0..3)
const TBL_5F4674 = 0x005f4674;  // map-X offset per rotation (word per 4-byte slot)
const TBL_5F4676 = 0x005f4676;  // map-Y offset per rotation (word per 4-byte slot)
const TBL_TILEPTR = 0x00971ef4; // tile-pointer table base (dword per slot)
const TBL_5F46A4 = 0x005f46a4;  // dl-add table (indexed by ebx, byte)
const TBL_5F4704 = 0x005f4704;  // dl-add table (indexed by ebx, byte)
const TBL_5F46C4 = 0x005f46c4;  // dh-add table (indexed by edi, byte)
const TBL_5F46E4 = 0x005f46e4;  // dh-add table (indexed by edi, byte)

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
 * the JS body fully handled the call; false if a cold branch was detected
 * and the caller should fall back to runFunction.
 */
export function paintBody42094b(heap, cpu) {
  // (__forceInterp42094b is tools/painter-port-oracle.mjs's A/B switch.)
  if (globalThis._42094b_force_fallback || globalThis.__forceInterp42094b) return false;
  // Entry register snapshot (the binary's `push ecx` at 0x42094b saves
  // ecx for the eventual `pop ecx` at 0x420d94 → callee-preserved).
  const eax0 = cpu.regs.eax >>> 0;
  const ecx0 = cpu.regs.ecx >>> 0;
  const edx0 = cpu.regs.edx >>> 0;
  const entryCL = ecx0 & 0xff;
  const entryDL = edx0 & 0xff;
  const entryEBX = cpu.regs.ebx >>> 0;

  const rot = heap.u32(DAT_991F88) >>> 0;
  const slot4 = (rot & 0xffffffff) * 4;

  // === 0x42094c..0x42096d: ax/bp init + 16-bit add ===
  let ax = (heap.u16(DAT_991F70) + heap.u16(TBL_5F4674 + slot4)) & 0xffff;
  let bp = (heap.u16(DAT_991F74) + heap.u16(TBL_5F4676 + slot4)) & 0xffff;

  // EDI/DH to use entering the shared tail at 0x4209c2, plus the live
  // ESI/EBP register values at that point (observable at every ret).
  let edi;
  let dh;
  let esiLive0;
  let ebpLive0;
  let offMap = false;
  const dl = entryDL;  // dl is callee-preserved by this function

  // === 0x42096f..0x42097a: cmp ax/bp, 0x1000; jae 0x420945 (off-map) ===
  if (ax >= 0x1000 || bp >= 0x1000) {
    // 0x420945: xor edi,edi; mov dh,1; jmp 0x4209c2
    offMap = true;
    edi = 0;
    dh = 1;
    esiLive0 = cpu.regs.esi >>> 0;                       // untouched
    ebpLive0 = ((cpu.regs.ebp & 0xffff0000) | bp) >>> 0; // 16-bit writes only
  } else {
    // === 0x42097c..0x420987: tile_idx = ((bp rol 7) | ax) ror 5 (16-bit) ===
    bp = (((bp << 7) | (bp >>> 9)) & 0xffff) | ax;
    bp &= 0xffff;
    const tileIdx = (((bp >>> 5) | (bp << 11)) & 0xffff) >>> 0;

    // === 0x42098a: esi = [4*tileIdx + 0x971ef4] ===
    let esi = heap.u32(TBL_TILEPTR + tileIdx * 4) >>> 0;

    // === 0x420991..0x42099c: walk chain while [esi]&0x3c != 0 ===
    // Bounded to avoid an OOB throw on corrupt chains.
    let walked = 0;
    while ((heap.u8(esi) & 0x3c) !== 0) {
      esi = (esi + 8) >>> 0;
      if (++walked > 4096) {
        // Pathological chain — fall back to interp (mirrors what the
        // binary would do, modulo step limit).
        return false;
      }
    }
    esiLive0 = esi;

    // === 0x42099e..0x4209c0: compute eax/edi/ebp/dh ===
    let eax = heap.u8(esi + 4) & 0xff;
    edi = eax & 0x10;
    eax = eax & 0xf;
    // shl ax, cl (cl in 0..31 — actually 0..3 for rotation, but mask anyway)
    let axShifted = (eax << (entryCL & 0x1f)) & 0xffff;
    let ebpVal = axShifted;
    ebpVal = ((ebpVal >>> 4) | axShifted) & 0xffff;
    dh = (heap.u8(esi + 2) >>> 2) & 0xff;
    ebpVal &= 0xf;                  // 32-bit `and ebp,0xf` clears the high half
    ebpLive0 = ebpVal >>> 0;
    edi |= ebpVal;
  }

  // === 0x4209c2..0x4209da: shared tail — compute al, ah, cl, ch ===
  //   ax = dx; cx = dx
  //   al += T_A4[ebx]; cl += T_04[ebx]    (NOTE: this helper indexes EBX into
  //                                        the A4/04 tables — role-swap vs
  //                                        420d9c which indexes EBX into C4/E4)
  //   ah += T_C4[edi]; ch += T_E4[edi]
  let al = (dl + heap.u8(TBL_5F46A4 + entryEBX)) & 0xff;
  let cl = (dl + heap.u8(TBL_5F4704 + entryEBX)) & 0xff;
  let ah = (dh + heap.u8(TBL_5F46C4 + edi)) & 0xff;
  let ch = (dh + heap.u8(TBL_5F46E4 + edi)) & 0xff;

  // === 0x4209e0..0x4209e6: cmp al,ah; ja 0x4209ec; cmp cl,ch; jbe 0x420d94 ===
  // 0x420d94: pop ecx; ret  — early return path.
  // Take the early-return iff: al <= ah  AND  cl <= ch.
  //
  // 2026-06-10: full exit-register fidelity added (the cold tail below
  // shares the live-register state, and lockstep vs the interpreter
  // compares both): eax = (high)|(ah<<8)|al — high16 cleared by the 32-bit
  // `and eax,0xf` on the chain path, entry-high preserved off-map; edx
  // carries the computed DH; edi/ebp are the small masked values; esi the
  // chain cursor; ecx pops back to entry.
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

  // === 0x4209ec..0x420d92: cold multi-call paint-dispatch loop ===
  // Water/cliff edge-strip painter — hot in scenario play (~30k interpreter
  // steps/tick before this port). Dispatches paint via the JS
  // paintBody431bb8 / paintBody432204 bodies — the SAME code the
  // interpreter's eip hooks run, so behavior is identical to the bridged
  // chain by construction (431bb8's body leaves cpu.regs unmodified just
  // like its hook does; 432204's writes registers back). Rotates the
  // [0x999fdc..0x99a01b] scratch ring: an array of 2-byte entries shifted
  // down one entry via sixteen overlapping stride-4 dword moves whose
  // reads never overlap prior writes — equivalent to a 2-byte left shift
  // of the 0x40-byte region reading old bytes throughout; the last move
  // leaves edi = old u32[0x99a01a].
  const rotIdx = rot & 3;
  let spriteBase = heap.u32(0x005f476c) >>> 0;
  if ((heap.u16(0x00991f8c) & 1) !== 0) spriteBase = heap.u32(0x005f4770) >>> 0;
  spriteBase = (spriteBase + 5) >>> 0;
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
    // 431bb8's JS body writes heap only — registers stay as staged,
    // exactly like the interpreter's hook + auto-ret path.
  };
  const call432204 = () => {
    stageRegs();
    try { paintBody432204(heap, cpu, rotIdx); } catch (_) { /* non-fatal */ }
    // 432204 writes registers back faithfully — re-read the lives.
    eaxLive = cpu.regs.eax >>> 0; ecxLive = cpu.regs.ecx >>> 0;
    edxLive = cpu.regs.edx >>> 0; ebxLive = cpu.regs.ebx >>> 0;
    ediLive = cpu.regs.edi >>> 0; esiLive = cpu.regs.esi >>> 0;
    ebpLive = cpu.regs.ebp >>> 0;
  };
  const ringShift = () => {
    ediLive = heap.u32(0x0099a01a) >>> 0;
    const tmp = heap.bytes.slice(0x999fde, 0x99a01e);
    heap.bytes.set(tmp, 0x999fdc);
  };

  // === preamble strip (0x420a0c..0x420a55) ===
  // dhL mirrors the DH byte of the live edx — keep them in sync at every
  // mutation (they are the same storage in the binary).
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
      ebxLive = (ebxStrip + spriteBase) >>> 0;
      eaxLive = ((eaxLive & 0xffff0000) | 0x0f00) >>> 0;      // al=0, ah=0xf
      ecxLive = ((ecxLive & 0xffffff00) | 0x1e) >>> 0;        // cl=0x1e
      ediLive = ((ediLive & 0xffff0000) | 0x1e) >>> 0;        // di=0x1e
      esiLive = (esiLive & 0xffff0000) >>> 0;                 // xor si,si
      edxLive = ((edxLive & 0xffff0000) | ((dhL << 4) & 0xffff)) >>> 0; // shr 8; shl 4
      ebpLive = rot >>> 0;
      call431bb8();
      eaxLive = sEax; ecxLive = sEcx; edxLive = sEdx;         // pops
      dhL = (dhL + 1) & 0xff; syncDh();                       // inc dh
    }
    ebxLive = entryEBX;                                       // pop ebx
  }
  // mov ah, cl — the loop's upper bound becomes the computed CL.
  const ah2 = cl;
  eaxLive = ((eaxLive & 0xffff0000) | (ah2 << 8) | al) >>> 0;
  // push ebx; push edx — restored by the final pops at 0x420d92/93.
  const edxAtLoopPush = edxLive;
  const ebxAtLoopPush = ebxLive;

  // === main loop (0x420a5a..0x420d57) ===
  let guard = 0;
  for (;;) {
    if (++guard > 4096) return false;             // interp would spin too
    cmp8Flags(cpu, dhL, al);
    if (dhL >= al) break;                         // jae TAIL
    cmp8Flags(cpu, dhL, ah2);
    if (dhL >= ah2) break;                        // jae TAIL
    const ring0 = heap.u8(0x00999fdc);
    cmp8Flags(cpu, dhL, ring0);
    if (dhL !== ring0) {
      if (dhL > ring0) {                          // ja 0x420c5e: shift, recheck
        ringShift();
        // The binary re-enters at the ring compare (0x420a6a); dh/al/ah2
        // are unchanged by the shift so re-running the two jae compares is
        // behavior-identical (they were false to reach here).
        continue;
      }
      // dh below ring head (0x420d29): one base strip via 431bb8, dh++.
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      eaxLive = ((eaxLive & 0xffff0000) | 0x0f00) >>> 0;
      ecxLive = ((ecxLive & 0xffffff00) | 0x1e) >>> 0;
      ediLive = ((ediLive & 0xffff0000) | 0x1e) >>> 0;
      esiLive = (esiLive & 0xffff0000) >>> 0;
      edxLive = ((edxLive & 0xffff0000) | ((dhL << 4) & 0xffff)) >>> 0;
      ebxLive = heap.u32(0x005f4724) >>> 0;
      ebpLive = rot >>> 0;
      call431bb8();
      eaxLive = sEax; edxLive = sEdx;             // pops
      dhL = (dhL + 1) & 0xff; syncDh();           // inc dh
      continue;
    }
    // === dh == ring head: two-part water-edge segment (0x420a76..) ===
    // --- segment A (0x420a76..0x420b1a) ---
    {
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      let ebxr = heap.u8(0x00999fdd);
      let dl2 = (dhL + heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      // cmp dl,al; ja adv / cmp dl,ah; jbe noadv / fallthrough adv
      if (dl2 > al || dl2 > ah2) {
        dl2 = (dl2 - heap.u8(0x005f472e + ebxr * 2)) & 0xff;
        ebxr = heap.u8(0x005f475e + ebxr);
        heap.setU8(0x00999fdd, ebxr);
        dl2 = (dl2 + heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      }
      dl2 = (dl2 - heap.u8(0x005f472e + ebxr * 2)) & 0xff;
      const dx3 = (dl2 << 4) & 0xffff;            // shl dx,4 (dh=0 post-shr)
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
      ebxLive = (heap.u32(tblPtr + ebxr * 4) + 2) >>> 0;
      eaxLive = ((eaxLive & 0xffff0000) | (ah3 << 8)) >>> 0;  // al=0
      ecxLive = ((ecxLive & 0xffffff00) | 0x1e) >>> 0;
      ediLive = ((ediLive & 0xffff0000) | 1) >>> 0;
      // `mov esi,[0x5f477c]` is a FULL 32-bit load; the later `mov si,0x20`
      // replaces only the low word — esi's high half becomes the table
      // pointer's (caught by the lockstep reg-diff: js kept entry high).
      esiLive = ((tblPtr & 0xffff0000) | 0x20) >>> 0;
      heap.setU16(0x0099a4e8, 0);
      heap.setU16(0x0099a4ea, 0);
      ebpLive = rot >>> 0;
      call432204();
      edxLive = sEdx; eaxLive = sEax;             // pops
    }
    // --- segment B (0x420b1b..0x420b8a) ---
    {
      const sEax = eaxLive, sEdx = edxLive;       // push eax/edx
      const ebxr = heap.u8(0x00999fdd);           // possibly updated by A
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
      ebxLive = (heap.u32(tblPtr + ebxr * 4) + 3) >>> 0;
      eaxLive = ((eaxLive & 0xffff0000) | (ahB << 8)) >>> 0;  // al=0
      ecxLive = ((ecxLive & 0xffffff00) | 0x1e) >>> 0;
      ediLive = ((ediLive & 0xffff0000) | 1) >>> 0;
      // `mov esi,[0x5f477c]` is a FULL 32-bit load; the later `mov si,0x20`
      // replaces only the low word — esi's high half becomes the table
      // pointer's (caught by the lockstep reg-diff: js kept entry high).
      esiLive = ((tblPtr & 0xffff0000) | 0x20) >>> 0;
      heap.setU16(0x0099a4e8, 0x1f);
      heap.setU16(0x0099a4ea, 0);
      ebpLive = rot >>> 0;
      call432204();
      edxLive = sEdx; eaxLive = sEax;             // pops
    }
    // === advance + ring shift (0x420b8b..0x420c59) ===
    ediLive = heap.u8(0x00999fdd) >>> 0;          // movzx edi (32-bit)
    dhL = (dhL + heap.u8(0x005f472e + ediLive * 2)) & 0xff;  // add dh, step
    edxLive = ((edxLive & 0xffff00ff) | (dhL << 8)) >>> 0;
    ringShift();
  }

  // === TAIL (0x420d5c..0x420d92): up to one base strip ===
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
      // No push/pop around this call: al/ah/cl/di/si stay modified at ret
      // (only edx/ebx/ecx are restored by the final pops).
      ebxLive = (ebxStrip + heap.u32(0x005f4724)) >>> 0;
      eaxLive = ((eaxLive & 0xffff0000) | 0x0f00) >>> 0;
      ecxLive = ((ecxLive & 0xffffff00) | 0x1e) >>> 0;
      ediLive = ((ediLive & 0xffff0000) | 0x1e) >>> 0;
      esiLive = (esiLive & 0xffff0000) >>> 0;
      edxLive = ((edxLive & 0xffff0000) | ((dhL << 4) & 0xffff)) >>> 0;
      ebpLive = rot >>> 0;
      // Exit flags: the block's trailing ops (xor si,si … shr dx,8;
      // shl dx,4) leave OF=0 (xor), CF=(dh>>>12)&1=0, ZF=(dh<<4)==0,
      // SF=0 — and the 431bb8 body may then set CF on allocator-full.
      cpu.eflags.OF = 0; cpu.eflags.CF = 0;
      cpu.eflags.ZF = (dhL === 0) ? 1 : 0; cpu.eflags.SF = 0;
      call431bb8();
    }
  }

  // === END (0x420d92): pop edx; pop ebx; pop ecx; ret ===
  cpu.regs.eax = eaxLive;
  cpu.regs.ecx = ecx0;
  cpu.regs.edx = edxAtLoopPush;
  cpu.regs.ebx = ebxAtLoopPush;
  cpu.regs.edi = ediLive;
  cpu.regs.esi = esiLive;
  cpu.regs.ebp = ebpLive;
  return true;
}

// Faithful 8-bit CMP flags (the exit paths leave them for the caller;
// matches the interpreter's 8-bit cmp handler).
function cmp8Flags(cpu, a, b) {
  a &= 0xff; b &= 0xff;
  const r = (a - b) & 0xff;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 7) & 1;
  const sa = (a << 24) >> 24, sb = (b << 24) >> 24, sr = (r << 24) >> 24;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 7) & 1;
  cpu.eflags.CF = (a < b) ? 1 : 0;
}

/** Install the setEipHook at 0x42094b on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install42094bHook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_42094b");
    }
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    try {
      handled = paintBody42094b(heap, cpu);
    } catch (e) {
      if (!install42094bHook._warned) {
        install42094bHook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[42094b port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x42094b
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x0042094b);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x0042094b);
      } finally {
        _setEipHook(0x0042094b, hookFn);
      }
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 421d2c tail.
  };
  setEipHook(0x0042094b, hookFn);
}
