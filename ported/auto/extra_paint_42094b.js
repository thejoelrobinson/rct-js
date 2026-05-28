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
function paintBody42094b(heap, cpu) {
  if (globalThis._42094b_force_fallback) return false;
  // Entry register snapshot (the binary's `push ecx` at 0x42094b saves
  // ecx for the eventual `pop ecx` at 0x420d94 → callee-preserved). We
  // capture cl/dl by value; full ecx restoration is handled implicitly
  // since we never write to cpu.regs.ecx in this body.
  const entryCL = cpu.regs.ecx & 0xff;
  const entryDL = cpu.regs.edx & 0xff;
  const entryEBX = cpu.regs.ebx >>> 0;

  const rot = heap.u32(DAT_991F88) >>> 0;
  const slot4 = (rot & 0xffffffff) * 4;

  // === 0x42094c..0x42096d: ax/bp init + 16-bit add ===
  let ax = (heap.u16(DAT_991F70) + heap.u16(TBL_5F4674 + slot4)) & 0xffff;
  let bp = (heap.u16(DAT_991F74) + heap.u16(TBL_5F4676 + slot4)) & 0xffff;

  // EDI/DH to use entering the shared tail at 0x4209c2.
  let edi;
  let dh;
  const dl = entryDL;  // dl is callee-preserved by this function

  // === 0x42096f..0x42097a: cmp ax/bp, 0x1000; jae 0x420945 (off-map) ===
  if (ax >= 0x1000 || bp >= 0x1000) {
    // 0x420945: xor edi,edi; mov dh,1; jmp 0x4209c2
    edi = 0;
    dh = 1;
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

    // === 0x42099e..0x4209c0: compute eax/edi/ebp/dh ===
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
  if (al <= ah && cl <= ch) {
    return true;
  }

  // === 0x4209ec..0x420d92: cold multi-call paint-dispatch loop ===
  // This block:
  //   - sets DAT_005f4724 from one of DAT_005f476c / DAT_005f4770 (based on
  //     bit 0 of [0x991f8c]), plus 5,
  //   - performs an unbounded loop comparing dh against al/ah/DAT_999fdc,
  //   - dispatches paint via [4*rot + 0x431bb8] and [4*rot + 0x432204], and
  //   - rotates the DAT_999fdc..DAT_99a01c scratch ring on each iteration.
  // Profile (title scene): when the cold path fires the asm dispatches into
  // CODESEG painters and reads/writes the DAT_999fdc scratch ring on every
  // iteration; modeling that ring rotation in JS is significantly more work
  // than the rest of the body combined. Fall back to the interpreter to
  // preserve byte-equal correctness for any title-scene element that
  // extends past the al/ah/cl/ch threshold.
  return false;
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
