// @manual — do not regenerate.
//
// FUN_extra_paint_420f4c — palette-swizzle helper #2 of 4 dispatched from
// the tail of FUN_extra_paint_421d2c (terrain-surface per-element painter).
// Sibling of 0x420d9c (Phase R+14b). Phase R+13a's diagnostic flagged these
// helpers as the dominant interpreter-fallback cost when the cb9==0 sprite-
// update gate opens; this file hand-ports the second (0x420f4c).
//
// CODESEG body, ~140 disasm lines through 0x4210ef (the rotation-painter
// cold tail). Ghidra DOES emit C for it (decompiled/c/420f4c.c) — but the
// auto-translator mis-types reads (u32 where the binary reads u16; u32
// indexed loads where bytes are read; missing 16-bit ops). Hand-port re-
// lifts the asm semantics faithfully.
//
// Structurally near-identical to 0x420d9c. The two relevant differences:
//
//   - Different map-offset tables: 0x420f4c reads
//       ax = [0x991f70] + word [4*rot + 0x5f4694]
//       bp = [0x991f74] + word [4*rot + 0x5f4696]
//     vs 0x420d9c which uses 0x5f4684/0x5f4686 (i.e., the *adjacent* 16-
//     byte rotation slot; the four helpers each draw a different corner of
//     the same 2x2 tile cluster).
//
//   - The al/cl/ah/ch shared-tail uses tables 0x5f46c4 (al), 0x5f46a4 (cl),
//     0x5f46e4 (ah), 0x5f4704 (ch) — i.e. cl/ah are swapped relative to
//     0x420d9c which had 0x5f46c4 (al), 0x5f46e4 (cl), 0x5f46a4 (ah),
//     0x5f4704 (ch). See decompiled/c/420f4c.c lines 39-43 vs 420d9c.c.
//
// All other logic — bounds check, chain walk, FUN_00433b76 cold-bit-clear
// path, and the multi-call rotation-painter cold-bit-set path — matches
// 0x420d9c.
//
// What the function does on the HOT path (matches asm 0x420f4c..0x4210ef):
//   1. Read map coords: ax = [0x991f70] + word [4*rot + 0x5f4694]
//                       bp = [0x991f74] + word [4*rot + 0x5f4696]
//      where rot = [0x991f88]. All adds are 16-bit (the 0x66 prefix on
//      both `add` insns is what the auto-translator drops).
//   2. If ax>=0x1000 OR bp>=0x1000 → "off-map" fallback: edi=0, dh=1,
//      JUMP to 0x420fc3 (the shared tail; carries entry CL/DL).
//   3. Otherwise: tile_index = ((bp rol 7) | ax) ror 5  (all 16-bit),
//      then esi = tile_pointers[tile_index] (i.e. [4*tile_index + 0x971ef4]).
//   4. Walk the chain: while ([esi] & 0x3c) != 0: esi += 8.
//   5. Compute: al = [esi+4] & 0xf;  edi = [esi+4] & 0x10;
//              ax = al << cl;        (uses entry CL — rotation 0..3)
//              bp = (ax >> 4) | ax;   ebp &= 0xf;  edi |= ebp;
//              dh = [esi+2] >> 2.     (overwrites entry DH)
//   6. Shared tail at 0x420fc3:
//        ax = dx; cx = dx
//        al += T_C4[ebx];  cl += T_A4[ebx]    (cl reads 0x5f46a4)
//        ah += T_E4[edi];  ch += T_04[edi]    (ah reads 0x5f46e4)
//   7. If al<=ah AND cl<=ch → return (the binary jumps to 0x4210c6's
//      pop ecx; ret tail).
//   8. Else if [0x991f8c] & 1 == 0 → call FUN_00433b76 with
//        ebx = (cl - al + 1) + [0x5f4778] + 3
//        ax  = 0
//        cx  = -((al - dl) * 0x10)
//      then return.
//   9. Else (bit 0 set): the cold tail at 0x420ffc — issues up to 3
//      rotation-painter calls via [4*rot + 0x431bb8]. For the title-screen
//      profile [0x991f8c] is 0x900 (bits 8+11 set, bit 0 CLEAR), so this
//      cold path NEVER fires on the hot scene; fall back to runFunction
//      (correctness > speed for cold).
//
// Calling convention on entry (matches 0x420d9c):
//   - cl = rotation byte (used by `shl ax, cl` at step 5)
//   - dl = "shade base" byte
//   - ebx = "swizzle index" (already loaded by the parent at 0x4225bc time)
//   - eax/ecx high bits not used; only cl/dl read.
//   - PUSHES ecx at entry (0x420f4c: push ecx), POPS at 0x4210c6 — ecx is
//     callee-preserved. EAX/EBX caller-saved.
//   - FUN_00433b76 reads regs.eax/ecx/ebx — mirror translator regs before
//     calling.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00433b76 } from "./433b76.js";

// Static-data table addresses (read-only).
const DAT_991F70 = 0x00991f70;  // map X coord (word)
const DAT_991F74 = 0x00991f74;  // map Y coord (word)
const DAT_991F88 = 0x00991f88;  // rotation (dword, value 0..3)
const DAT_991F8C = 0x00991f8c;  // paint-state flags (word)
const TBL_5F4694 = 0x005f4694;  // map-X offset per rotation (helper #2)
const TBL_5F4696 = 0x005f4696;  // map-Y offset per rotation (helper #2)
const TBL_TILEPTR = 0x00971ef4; // tile-pointer table base (dword per slot)
const TBL_5F46C4 = 0x005f46c4;  // al-add table (indexed by ebx, byte)
const TBL_5F46A4 = 0x005f46a4;  // cl-add table (indexed by ebx, byte)
const TBL_5F46E4 = 0x005f46e4;  // ah-add table (indexed by edi, byte)
const TBL_5F4704 = 0x005f4704;  // ch-add table (indexed by edi, byte)
const DAT_5F4778 = 0x005f4778;  // ebx-offset constant for FUN_00433b76 path

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
function paintBody420f4c(heap, cpu) {
  if (globalThis._420f4c_force_fallback) return false;
  // Entry register snapshot. The binary's `push ecx` at 0x420f4c saves ecx
  // for the eventual `pop ecx` at 0x4210c6 → callee-preserved. We capture
  // cl/dl by value; full ecx restoration is implicit since we never write
  // cpu.regs.ecx in this body.
  const entryCL = cpu.regs.ecx & 0xff;
  const entryDL = cpu.regs.edx & 0xff;
  const entryEBX = cpu.regs.ebx >>> 0;

  const rot = heap.u32(DAT_991F88) >>> 0;
  const slot4 = (rot & 0xffffffff) * 4;

  // === 0x420f4d..0x420f6f: ax/bp init + 16-bit add (helper #2 tables) ===
  let ax = (heap.u16(DAT_991F70) + heap.u16(TBL_5F4694 + slot4)) & 0xffff;
  let bp = (heap.u16(DAT_991F74) + heap.u16(TBL_5F4696 + slot4)) & 0xffff;

  // EDI/DH used entering the shared tail at 0x420fc3.
  let edi;
  let dh;
  const dl = entryDL;  // dl is callee-preserved by this function

  // === 0x420f70..0x420f7c: cmp ax/bp, 0x1000; jae 0x420f46 (off-map) ===
  if (ax >= 0x1000 || bp >= 0x1000) {
    // 0x420f46: xor edi,edi; mov dh,1; jmp 0x420fc3 (shared tail)
    edi = 0;
    dh = 1;
  } else {
    // === 0x420f7d..0x420f87: tile_idx = ((bp rol 7) | ax) ror 5 (16-bit) ===
    bp = (((bp << 7) | (bp >>> 9)) & 0xffff) | ax;
    bp &= 0xffff;
    const tileIdx = (((bp >>> 5) | (bp << 11)) & 0xffff) >>> 0;

    // === 0x420f8b..0x420f91: esi = [4*tileIdx + 0x971ef4] ===
    let esi = heap.u32(TBL_TILEPTR + tileIdx * 4) >>> 0;

    // === 0x420f92..0x420f9d: walk chain while [esi]&0x3c != 0 ===
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

    // === 0x420f9f..0x420fc2: compute eax/edi/ebp/dh ===
    let eax = heap.u8(esi + 4) & 0xff;
    edi = eax & 0x10;
    eax = eax & 0xf;
    // shl ax, cl (cl 0..31, actually 0..3 for rotation)
    let axShifted = (eax << (entryCL & 0x1f)) & 0xffff;
    let ebpVal = axShifted;
    ebpVal = ((ebpVal >>> 4) | axShifted) & 0xffff;
    dh = (heap.u8(esi + 2) >>> 2) & 0xff;
    ebpVal &= 0xf;
    edi |= ebpVal;
  }

  // === 0x420fc3..0x420fe0: shared tail — compute al, cl, ah, ch ===
  //   ax = dx; cx = dx
  //   al += T_C4[ebx]; cl += T_A4[ebx]    (NOTE swap vs 420d9c)
  //   ah += T_E4[edi]; ch += T_04[edi]
  const al = (dl + heap.u8(TBL_5F46C4 + entryEBX)) & 0xff;
  const cl = (dl + heap.u8(TBL_5F46A4 + entryEBX)) & 0xff;
  const ah = (dh + heap.u8(TBL_5F46E4 + edi)) & 0xff;
  const ch = (dh + heap.u8(TBL_5F4704 + edi)) & 0xff;

  // === 0x420fe1..0x420fe7: cmp al,ah; ja 0x420fed; cmp cl,ch; jbe 0x4210c6 ===
  // 0x4210c6: pop ecx; ret  — early return.
  // Take the early-return iff: al <= ah  AND  cl <= ch.
  if (al <= ah && cl <= ch) {
    return true;
  }

  // === 0x420fed..0x420ff6: test [0x991f8c], 1; jz 0x4210c8 (call 433b76 path) ===
  const f8c = heap.u16(DAT_991F8C);
  if ((f8c & 1) !== 0) {
    // COLD: bit 0 set — multi-call rotation-painter loop at 0x420ffc..0x4210c3.
    // Profile: NEVER fires on the title scene ([0x991f8c] is 0x900 — bits 8+11
    // set, bit 0 clear). Fall back to interpreter to preserve correctness if
    // hit at runtime.
    return false;
  }

  // === 0x4210c8..0x4210ef: call FUN_00433b76 then ret ===
  //   sub cl, al
  //   sub al, dl
  //   inc cl
  //   movzx ebx, cl
  //   add ebx, [0x5f4778]      ; NOTE: 0x420f4c does NOT have the extra
  //                            ;   `add ebx, 3` that 0x420d9c has at 0x420f2c.
  //                            ;   Disasm 0x4210d3 → 0x4210d9 is movzx cx,al
  //                            ;   directly (no +3). The earlier copy of this
  //                            ;   body from 0x420d9c spuriously kept the +3,
  //                            ;   biasing the paint-ring slot pointer by 3 and
  //                            ;   recoloring water tiles (±2 shade swaps).
  //   movzx cx, al
  //   shl cx, 4
  //   neg cx
  //   xor ax, ax
  //   call 0x433b76
  const subCl = (cl - al) & 0xff;
  const subAl = (al - dl) & 0xff;
  const incCl = (subCl + 1) & 0xff;
  const ebxArg = ((incCl >>> 0) + heap.u32(DAT_5F4778)) >>> 0;
  let cxArg = (subAl & 0xff) << 4;          // movzx cx, al; shl cx, 4
  cxArg = ((-cxArg) & 0xffff) >>> 0;        // neg cx
  const axArg = 0;

  // Mirror call-site registers into the translator `regs` so FUN_00433b76
  // sees the same in_AX / in_CX / unaff_EBX the binary would read.
  const regsEaxSave = regs.eax >>> 0;
  const regsEcxSave = regs.ecx >>> 0;
  const regsEbxSave = regs.ebx >>> 0;
  regs.eax = ((cpu.regs.eax & 0xffff0000) | axArg) >>> 0;
  regs.ecx = ((cpu.regs.ecx & 0xffff0000) | cxArg) >>> 0;
  regs.ebx = ebxArg;

  try {
    FUN_00433b76(heap);
  } catch (_) {
    // Paint-ring push errors non-fatal — matches the bridge's tolerance.
  }

  // FUN_00433b76 writes regs.eax (returns in_AX, which is 0 here). The
  // binary's tail at 0x4210ec..0x4210ef does pop edx; pop ebx; pop ecx; ret
  // — eax holds the return value (in_AX=0). Mirror that back into cpu.regs.eax
  // (low 16), preserves high 16.
  cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (regs.eax & 0xffff)) >>> 0;

  // Restore translator regs we transiently overwrote.
  regs.eax = ((regsEaxSave & 0xffff0000) | (regs.eax & 0xffff)) >>> 0;
  regs.ecx = regsEcxSave;
  regs.ebx = regsEbxSave;

  return true;
}

/** Install the setEipHook at 0x420f4c on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install420f4cHook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_420f4c");
    }
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    try {
      handled = paintBody420f4c(heap, cpu);
    } catch (e) {
      if (!install420f4cHook._warned) {
        install420f4cHook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[420f4c port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x420f4c
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x00420f4c);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x00420f4c);
      } finally {
        _setEipHook(0x00420f4c, hookFn);
      }
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 421d2c tail.
  };
  setEipHook(0x00420f4c, hookFn);
}
