// @manual — do not regenerate.
//
// FUN_extra_paint_420d9c — palette-swizzle helper #1 of 4 dispatched from
// the tail of FUN_extra_paint_421d2c (terrain-surface per-element painter).
// Phase R+13a's diagnostic (commit 55e72f7) flagged these helpers as the
// dominant interpreter-fallback cost when the cb9==0 sprite-update gate
// opens; this file hand-ports the first (0x420d9c).
//
// CODESEG body, ~57 disasm lines through 0x420f45 (the "cold" tail at
// 0x420f4c is a sibling helper, FUN_00420f4c, not part of this function).
// Ghidra DOES emit C for it (decompiled/c/420d9c.c) — but the auto-
// translator's lifted output mis-types several reads (u32 where the binary
// reads u16; u32 indexed loads where bytes are read; not modeling rol/ror
// 16-bit). Hand-port re-lifts the asm semantics faithfully.
//
// What the function does on the HOT path (matches asm 0x420d9c..0x420f1a):
//   1. Read map coords: ax = [0x991f70] + word [4*rot + 0x5f4684]
//                       bp = [0x991f74] + word [4*rot + 0x5f4686]
//      where rot = [0x991f88]. All adds are 16-bit (the 0x66 prefix on
//      both `add` insns is what the auto-translator drops).
//   2. If ax>=0x1000 OR bp>=0x1000 → "off-map" fallback: edi=0, dh=1,
//      JUMP to 0x420e13 (skipping the chain walk; carries entry CL/DL).
//   3. Otherwise: compute tile_index = ((bp rol 7) | ax) ror 5  (all 16-bit),
//      then esi = tile_pointers[tile_index] (i.e. [4*tile_index + 0x971ef4]).
//   4. Walk the chain: while ([esi] & 0x3c) != 0: esi += 8.
//   5. Compute: al = [esi+4] & 0xf;  edi = [esi+4] & 0x10;
//              ax = al << cl;        (uses entry CL — rotation 0..3)
//              bp = (ax >> 4) | ax;   ebp &= 0xf;  edi |= ebp;
//              dh = [esi+2] >> 2.     (overwrites entry DH)
//   6. Shared tail starting at 0x420e13:
//        ax = dx; cx = dx
//        al += T_C4[ebx];  ah += T_A4[edi]
//        cl += T_E4[ebx];  ch += T_04[edi]
//      (T_C4 = [0x5f46c4], T_A4 = [0x5f46a4], T_E4 = [0x5f46e4], T_04 = [0x5f4704].)
//   7. If al<=ah AND cl<=ch → return (the binary jumps to 0x420f19's
//      pop ecx; ret tail).
//   8. Else if [0x991f8c] & 1 == 0 → call FUN_00433b76 with
//        ebx = (cl - al + 1) + [0x5f4778] + 3
//        ax  = 0
//        cx  = -(al_post * 0x10)   where al_post = al - dl  (modified in place)
//      then return.
//   9. Else (bit 0 set): the cold tail at 0x420f4c is ENTERED via fallthrough
//      from 0x420e46 → 0x420e4c — it issues up to 3 rotation-painter calls
//      via [4*rot + 0x431bb8] (PTR_LAB_00431bb8 — same table the parent
//      0x421d2c uses for base-tile sprite paint). For the title-screen
//      profile [0x991f8c] is 0x900 (bits 8+11 set, bit 0 CLEAR), so this
//      cold path NEVER fires on the hot scene; fall back to runFunction
//      (correctness > speed for cold).
//
// Calling convention on entry:
//   - cl = rotation byte (used by `shl ax, cl` at step 5)
//   - dl = "shade base" byte (used at step 6 as `ax=dx, cx=dx` low halves)
//   - ebx = "swizzle index" (already loaded by the parent at 0x4225bc time:
//           the parent's ebx is the high-bit-stripped slope+terrain index)
//   - eax/ecx high bits not used; only cl/dl read.
//   - The function PUSHES ecx at entry (0x420d9c: push ecx) and POPS at
//     0x420f19 — i.e. ecx is callee-preserved across the call. EAX/EBX
//     are caller-saved per the binary's calling convention.
//   - FUN_00433b76 reads regs.eax (in_AX), regs.ecx (in_CX), regs.ebx
//     (unaff_EBX) — must be mirrored into the translator-side `regs`
//     before invoking the JS port.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00433b76 } from "./433b76.js";

// Static-data table addresses (read-only).
const DAT_991F70 = 0x00991f70;  // map X coord (word)
const DAT_991F74 = 0x00991f74;  // map Y coord (word)
const DAT_991F88 = 0x00991f88;  // rotation (dword, value 0..3)
const DAT_991F8C = 0x00991f8c;  // paint-state flags (word)
const TBL_5F4684 = 0x005f4684;  // map-X offset per rotation (word per 4-byte slot)
const TBL_5F4686 = 0x005f4686;  // map-Y offset per rotation (word per 4-byte slot)
const TBL_TILEPTR = 0x00971ef4; // tile-pointer table base (dword per slot)
const TBL_5F46C4 = 0x005f46c4;  // dl-add table (indexed by ebx, byte)
const TBL_5F46E4 = 0x005f46e4;  // dl-add table (indexed by ebx, byte)
const TBL_5F46A4 = 0x005f46a4;  // dh-add table (indexed by edi, byte)
const TBL_5F4704 = 0x005f4704;  // dh-add table (indexed by edi, byte)
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
function paintBody420d9c(heap, cpu) {
  if (globalThis._420d9c_force_fallback) return false;
  // Entry register snapshot (the binary's `push ecx` at 0x420d9c saves
  // ecx for the eventual `pop ecx` at 0x420f19 → callee-preserved). We
  // capture cl/dl by value; full ecx restoration is handled implicitly
  // since we never write to cpu.regs.ecx in this body.
  const entryCL = cpu.regs.ecx & 0xff;
  const entryDL = cpu.regs.edx & 0xff;
  const entryDH = (cpu.regs.edx >>> 8) & 0xff;
  const entryEBX = cpu.regs.ebx >>> 0;

  const rot = heap.u32(DAT_991F88) >>> 0;
  const slot4 = (rot & 0xffffffff) * 4;

  // === 0x420d9d..0x420dbe: ax/bp init + 16-bit add ===
  let ax = (heap.u16(DAT_991F70) + heap.u16(TBL_5F4684 + slot4)) & 0xffff;
  let bp = (heap.u16(DAT_991F74) + heap.u16(TBL_5F4686 + slot4)) & 0xffff;

  // EDI/DH to use entering the shared tail at 0x420e13.
  let edi;
  let dh;
  const dl = entryDL;  // dl is callee-preserved by this function

  // === 0x420dc0..0x420dcb: cmp ax/bp, 0x1000; jae 0x420d96 (off-map) ===
  if (ax >= 0x1000 || bp >= 0x1000) {
    // 0x420d96: xor edi,edi; mov dh,1; jmp 0x420e13
    edi = 0;
    dh = 1;
  } else {
    // === 0x420dcd..0x420dd7: tile_idx = ((bp rol 7) | ax) ror 5 (16-bit) ===
    bp = (((bp << 7) | (bp >>> 9)) & 0xffff) | ax;
    bp &= 0xffff;
    const tileIdx = (((bp >>> 5) | (bp << 11)) & 0xffff) >>> 0;

    // === 0x420ddb: esi = [4*tileIdx + 0x971ef4] ===
    let esi = heap.u32(TBL_TILEPTR + tileIdx * 4) >>> 0;

    // === 0x420de2..0x420ded: walk chain while [esi]&0x3c != 0 ===
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

    // === 0x420def..0x420e11: compute eax/edi/ebp/dh ===
    let eax = heap.u8(esi + 4) & 0xff;
    edi = eax & 0x10;
    eax = eax & 0xf;
    // shl ax, cl (cl in 0..31 — actually 0..3 for rotation, but mask anyway)
    let axShifted = (eax << (entryCL & 0x1f)) & 0xffff;
    let ebpVal = axShifted;
    ebpVal = ((ebpVal >>> 4) | axShifted) & 0xffff;
    dh = (heap.u8(esi + 2) >>> 2) & 0xff;
    ebpVal &= 0xf;
    edi |= ebpVal;
  }

  // === 0x420e13..0x420e2b: shared tail — compute al, ah, cl, ch ===
  //   ax = dx; cx = dx
  //   al += T_C4[ebx]; cl += T_E4[ebx]    (NOTE: original binary reads
  //                                        byte from [ebx + 0x5f46c4],
  //                                        i.e. ebx is byte offset)
  //   ah += T_A4[edi]; ch += T_04[edi]
  let al = (dl + heap.u8(TBL_5F46C4 + entryEBX)) & 0xff;
  let cl = (dl + heap.u8(TBL_5F46E4 + entryEBX)) & 0xff;
  let ah = (dh + heap.u8(TBL_5F46A4 + edi)) & 0xff;
  let ch = (dh + heap.u8(TBL_5F4704 + edi)) & 0xff;

  // === 0x420e31..0x420e37: cmp al,ah; ja 0x420e3d; cmp cl,ch; jbe 0x420f19 ===
  // 0x420f19: pop ecx; ret  — early return path.
  // Take the early-return iff: al <= ah  AND  cl <= ch.
  if (al <= ah && cl <= ch) {
    return true;
  }

  // === 0x420e3d..0x420e46: test [0x991f8c], 1; je 0x420f1b ===
  const f8c = heap.u16(DAT_991F8C);
  if ((f8c & 1) !== 0) {
    // COLD: bit 0 of [0x991f8c] is set — enters the multi-call rotation
    // painter loop at 0x420e4c..0x420f17. Profile: NEVER fires on the
    // title scene ([0x991f8c] is 0x900 per parent 0x421d2c notes — bits
    // 8+11 set, bit 0 clear). Fall back to interpreter to preserve
    // correctness if hit at runtime.
    return false;
  }

  // === 0x420f1b..0x420f45: call FUN_00433b76 then ret ===
  //   sub cl, al    ; cl = (dl + T_E4[ebx]) - (dl + T_C4[ebx]) = T_E4 - T_C4
  //   sub al, dl    ; al = T_C4[ebx]
  //   inc cl        ; cl = T_E4[ebx] - T_C4[ebx] + 1
  //   movzx ebx, cl
  //   add ebx, [0x5f4778]
  //   add ebx, 3
  //   movzx cx, al
  //   shl cx, 4
  //   neg cx
  //   xor ax, ax
  //   call 0x433b76
  const subCl = (cl - al) & 0xff;
  const subAl = (al - dl) & 0xff;
  const incCl = (subCl + 1) & 0xff;
  const ebxArg = ((incCl >>> 0) + heap.u32(DAT_5F4778) + 3) >>> 0;
  let cxArg = (subAl & 0xff) << 4;          // movzx cx, al; shl cx, 4
  cxArg = ((-cxArg) & 0xffff) >>> 0;        // neg cx
  const axArg = 0;

  // Mirror call-site registers into the translator `regs` so FUN_00433b76
  // sees the same in_AX / in_CX / unaff_EBX the binary would read.
  // Preserve high halves of eax/ecx so the post-call state of cpu.regs
  // matches the binary (which only writes the low 16 bits via `mov ax,…`
  // / `movzx cx, al` — the high halves carry from entry).
  const regsEaxSave = regs.eax >>> 0;
  const regsEcxSave = regs.ecx >>> 0;
  const regsEbxSave = regs.ebx >>> 0;
  regs.eax = ((cpu.regs.eax & 0xffff0000) | axArg) >>> 0;
  regs.ecx = ((cpu.regs.ecx & 0xffff0000) | cxArg) >>> 0;
  regs.ebx = ebxArg;

  try {
    FUN_00433b76(heap);
  } catch (_) {
    // Paint-ring push errors non-fatal — matches the bridge's tolerance
    // for the equivalent runFunction call.
  }

  // FUN_00433b76 writes regs.eax (returns in_AX, which is 0 here). The
  // binary's tail at 0x420f42..0x420f45 does pop edx; pop ebx; pop ecx; ret
  // — i.e. eax holds the return value (in_AX=0). Mirror that back into
  // cpu.regs.eax (low 16 bits) — preserves high 16.
  cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | (regs.eax & 0xffff)) >>> 0;

  // Restore translator regs we transiently overwrote. (The binary's calling
  // convention doesn't require this — eax/ecx/ebx are caller-saved — but
  // we mirror only the binary's observable register effects, not transient
  // side effects on regs. Leaving regs.ebx mutated here would leak into
  // any subsequent translator-side call that reads ebx without setting it.)
  regs.eax = ((regsEaxSave & 0xffff0000) | (regs.eax & 0xffff)) >>> 0;
  regs.ecx = regsEcxSave;
  regs.ebx = regsEbxSave;

  return true;
}

/** Install the setEipHook at 0x420d9c on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install420d9cHook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_420d9c");
    }
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    try {
      handled = paintBody420d9c(heap, cpu);
    } catch (e) {
      if (!install420d9cHook._warned) {
        install420d9cHook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[420d9c port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x420d9c
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x00420d9c);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x00420d9c);
      } finally {
        _setEipHook(0x00420d9c, hookFn);
      }
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 421d2c tail.
  };
  setEipHook(0x00420d9c, hookFn);
}
