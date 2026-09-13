// @manual — do not regenerate.
//
// FUN_extra_paint_5dff38 — per-tile corner-fence painter, vtable slot 5 of
// PTR_LAB_00628a94 (`call [edi + 0x628a94]` from FUN_extra_paint_4368d8's
// per-element loop). Paints up to four corner fence posts/rails per tile
// element (park-boundary style fences), one block per corner, each
// dispatching a paint slot through PTR_LAB_00432204 (JS-ported in
// extra_paint_432204.js).
//
// CODESEG body 0x5dff38..0x5e027b (ret), no Ghidra C. Disassembled with
// capstone (cited inline). Ranked #3 in the 2026-06-10 scenario soak:
// 24.8k interpreter steps/tick before the 432204 port, 13.1k after
// (984 calls / 8 ticks × ~107 steps). This port removes the rest.
//
// Structure (verified instruction-by-instruction):
//   preamble:
//     edi = [0x981ef8] (dpi); byte [0x991f78] = 9
//     if (u16[dpi+0xe] >= 2) ret            ; zoom-cull (fences hidden)
//     bl = [esi+4]; nib = rol4(bl & 0xf, cl) ; rotate edge flags into view
//     ebx = (bl & 0x10) | nib               ; 32-bit and clears high bits
//     push esi
//     [0x99fba0] = ((([esi]&0xc0)>>3 | [esi+4]>>5) packed) << 17 | 0x20000000
//     cl = rot*4; bp = rol16(u16[esi+6], cl)
//     cl = rot*2; al = rol8([esi+5], cl)
//     push eax; push ebp
//   four corner blocks (k = 0..3), each:
//     nib_k = ebp & 0xf; typ_k = (eax & 3) | (nib_k << 2)
//     if (nib_k == 0xf) skip block
//     push ebx; push edx
//     edge-bit tests on bl select sprite-variant const (and the double-edge
//       case does dx += 0x10)
//     [0x991f81] = typ_k; byte [0x991f80] = k
//     ebx = const + u32[typ_k*4 + 0x99fba8]
//     if (u8[typ_k + 0x99fd40] & 1) ebx |= u32[0x99fba0]
//     al/cl/di/si/ah = per-corner constants; [0x99a4e8/ea] = corner coords
//     [0x99a4ec] = dx + 1
//     call [4*[0x991f88] + 0x432204]
//     pop edx; pop ebx
//     pop ebp; pop eax; al >>= 2; ebp >>= 4 (32-bit); push eax; push ebp
//   tail: pop ebp; pop eax; pop esi; ret
//
// The four 432204 calls go straight to the JS paintBody432204 — no
// interpreter involvement. Register effects are modeled exactly (the
// caller, extra_paint_4368d8.js's element loop, reads cpu.regs.eax/ecx
// high halves when staging the NEXT element's painter call, so exit
// register state is observable).
//
// Oracle evidence (see commit body): tools/_lockstep-5dff38.mjs per-call
// write-set + register + flag compare vs the interpreter — clean; dual
// whole-heap-hash soak (tools/painter-port-oracle.mjs FORCE_INTERP=5dff38)
// byte-equal; title gates green.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { paintBody432204 } from "./extra_paint_432204.js";

const DAT_DPI    = 0x00981ef8;
const DAT_991F78 = 0x00991f78;
const DAT_991F80 = 0x00991f80;
const DAT_991F81 = 0x00991f81;
const DAT_991F88 = 0x00991f88;
const DAT_99FBA0 = 0x0099fba0;   // ghost/translucency image-flag dword
const TBL_99FBA8 = 0x0099fba8;   // sprite-id base per fence type (dword)
const TBL_99FD40 = 0x0099fd40;   // per-type flag byte (bit 0 = recolor/ghost)
const DAT_99A4E8 = 0x0099a4e8;
const DAT_99A4EA = 0x0099a4ea;
const DAT_99A4EC = 0x0099a4ec;

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function rol8(v, n) { n &= 7; return ((v << n) | (v >>> (8 - n))) & 0xff; }

// Faithful flags for the zoom-cull exit: `cmp word [edi+0xe], 2; jae ret`.
function cmp16FlagsPlain(cpu, a, b) {
  a &= 0xffff; b &= 0xffff;
  const r = (a - b) & 0xffff;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 15) & 1;
  const sa = (a << 16) >> 16, sb = (b << 16) >> 16, sr = (r << 16) >> 16;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 15) & 1;
  cpu.eflags.CF = (a < b) ? 1 : 0;
}
// Faithful flags for `cmp ebp, 0xf` (32-bit) — the skip-corner compare.
function cmp32FlagsPlain(cpu, a, b) {
  a = a >>> 0; b = b >>> 0;
  const r = (a - b) >>> 0;
  cpu.eflags.ZF = (r === 0) ? 1 : 0;
  cpu.eflags.SF = (r >>> 31) & 1;
  const sa = a | 0, sb = b | 0, sr = r | 0;
  cpu.eflags.OF = (((sa ^ sb) & (sa ^ sr)) >>> 31) & 1;
  cpu.eflags.CF = (a < b) ? 1 : 0;
}

// Per-corner constants (disasm 0x5dffba.., 0x5e0073.., 0x5e0129.., 0x5e01e2..).
// testA/testB: the two edge bits tested; v00 = neither, vA0 = A only,
// v0B = B only. Both set → dx += 0x10, then the double-edge arm re-tests:
// !(bl & 0x10) → v00; (bl & dbl1Bit) → dbl1Val; (bl & dbl2Bit) → dbl2Val;
// else v00. NOTE the dbl bit→value pairing is NOT a uniform rule across
// the four blocks (blocks 2/3 pair the bits with the OPPOSITE variant
// than blocks 1/4) — transcribed per block from the asm; a generic
// "dblA→vA0" rule mis-picked sprites for corners 1/2 (caught by
// tools/_lockstep-5dff38.mjs as a +2 sprite-id diff).
// al/cl/di/si: register constants before the 432204 call; e8/ea: the
// [0x99a4e8]/[0x99a4ea] corner coordinates.
const CORNERS = [
  { testA: 4, testB: 8, v00: 1, vA0: 3, v0B: 5, dbl1Bit: 2, dbl1Val: 3, dbl2Bit: 1, dbl2Val: 5, al: 0x01, cl: 0x01, di: 0x01, si: 0x1e, e8: 0x01, ea: 0x01 },
  { testA: 1, testB: 8, v00: 0, vA0: 4, v0B: 2, dbl1Bit: 4, dbl1Val: 2, dbl2Bit: 2, dbl2Val: 4, al: 0x01, cl: 0x1f, di: 0x1e, si: 0x01, e8: 0x01, ea: 0x1f },
  { testA: 1, testB: 2, v00: 1, vA0: 5, v0B: 3, dbl1Bit: 4, dbl1Val: 3, dbl2Bit: 8, dbl2Val: 5, al: 0x1f, cl: 0x00, di: 0x01, si: 0x1e, e8: 0x1f, ea: 0x01 },
  { testA: 4, testB: 2, v00: 0, vA0: 2, v0B: 4, dbl1Bit: 8, dbl1Val: 2, dbl2Bit: 1, dbl2Val: 4, al: 0x01, cl: 0x00, di: 0x1e, si: 0x01, e8: 0x01, ea: 0x01 },
];

/** Full-path JS body. Mutates cpu.regs/eflags + heap exactly like the
 * binary. Returns nothing (all paths handled — no fallback needed). */
export function paintBody5dff38(heap, cpu) {
  const esi0 = cpu.regs.esi >>> 0;   // tile element ptr (push esi / pop esi)
  const edx0 = cpu.regs.edx >>> 0;
  const rotCl = cpu.regs.ecx & 0xff; // entry cl = (orientation + camera rot) & 3

  // === 0x5dff38: edi = dpi; [0x991f78] = 9 (byte) ===
  const dpi = heap.u32(DAT_DPI) >>> 0;
  cpu.regs.edi = dpi;
  heap.setU8(DAT_991F78, 9);

  // === 0x5dff45: cmp word [edi+0xe], 2; jae ret (zoom-cull) ===
  const zoom = heap.u16(dpi + 0x0e);
  if (zoom >= 2) {
    cmp16FlagsPlain(cpu, zoom, 2);
    return;
  }

  // === 0x5dff50..0x5dff6e: rotate edge-flag nibble; ebx = 0x10-bit | nib ===
  const e4 = heap.u8(esi0 + 4);
  let di16 = (e4 & 0xf) << (rotCl & 0x1f);      // shl di, cl (16-bit, cl<=3)
  di16 = ((di16 >>> 4) | di16) & 0xf;           // fold rotated nibble back
  const blFlags = ((e4 & 0x10) | di16) >>> 0;   // 32-bit `and ebx,0x10` cleared high
  cpu.regs.ebx = blFlags;

  // === 0x5dff72..0x5dff8c: [0x99fba0] = packed image-flag dword ===
  // al = ([esi]&0xc0)>>3; ah = [esi+4]>>5; (ah<<8|al) << 17 | 0x20000000.
  const al0 = ((heap.u8(esi0) & 0xc0) >>> 3) & 0xff;
  const ah0 = (e4 >>> 5) & 0xff;
  const fba0 = (((((ah0 << 8) | (al0 | ah0)) << 17) >>> 0) | 0x20000000) >>> 0;
  heap.setU32(DAT_99FBA0, fba0);

  // === 0x5dff91..0x5dffa0: bp = rol16(u16[esi+6], rot*4); al = rol8([esi+5], rot*2) ===
  const bpRot = rol16(heap.u16(esi0 + 6), (rotCl << 2) & 0xff);
  const alRot = rol8(heap.u8(esi0 + 5), (rotCl << 1) & 0xff);

  // Track live register words the way the asm does. eax after the fba0
  // block = (fba0 & 0xffffff00) | alRot (mov al,[esi+5] replaced al only —
  // note ah at that point = [esi+4]>>5 → eax = (fba0_high…) — actually the
  // shl/or wrote the FULL eax = fba0, then `mov al,[esi+5]` replaces al).
  let eaxSaved = ((fba0 & 0xffffff00) | alRot) >>> 0;   // pushed at 0x5dffa2
  // ebp: 16-bit `mov bp,…` ops preserve the entry high half.
  let ebpSaved = ((cpu.regs.ebp & 0xffff0000) | bpRot) >>> 0; // pushed at 0x5dffa3
  // cl after the two shifts = rot*2 (8-bit ops only touched cl).
  cpu.regs.ecx = ((cpu.regs.ecx & 0xffffff00) | ((rotCl << 1) & 0xff)) >>> 0;
  // dx mutated per-block but push edx/pop edx makes blocks transparent.
  cpu.regs.edx = edx0;

  for (let k = 0; k < 4; k++) {
    const C = CORNERS[k];
    // === push eax; push ebp; and ebp,0xf; and eax,3; cmp ebp,0xf; je skip ===
    // (the pushes save eaxSaved/ebpSaved; the post-block pops restore them,
    // so the masked working copies below never escape the block)
    const nib = ebpSaved & 0xf;
    const typ = ((eaxSaved & 3) | (nib << 2)) >>> 0;
    cmp32FlagsPlain(cpu, nib, 0xf);
    if (nib !== 0xf) {
      // === push ebx; push edx; edge-bit selection (may add 0x10 to dx) ===
      let dx = cpu.regs.edx & 0xffff;
      const A = (blFlags & C.testA) !== 0;
      const B = (blFlags & C.testB) !== 0;
      let spriteConst;
      if (!A && !B) spriteConst = C.v00;
      else if (A && !B) spriteConst = C.vA0;
      else if (!A && B) spriteConst = C.v0B;
      else {
        dx = (dx + 0x10) & 0xffff;
        if ((blFlags & 0x10) === 0) spriteConst = C.v00;
        else if ((blFlags & C.dbl1Bit) !== 0) spriteConst = C.dbl1Val;
        else if ((blFlags & C.dbl2Bit) !== 0) spriteConst = C.dbl2Val;
        else spriteConst = C.v00;
      }
      // === [0x991f81] = typ (byte); [0x991f80] = k (byte) ===
      heap.setU8(DAT_991F81, typ & 0xff);
      heap.setU8(DAT_991F80, k);
      // === ebx = const + [typ*4 + 0x99fba8]; flag-bit → |= [0x99fba0] ===
      let ebxSprite = (spriteConst + heap.u32(TBL_99FBA8 + typ * 4)) >>> 0;
      if ((heap.u8(TBL_99FD40 + typ) & 1) !== 0) {
        ebxSprite = (ebxSprite | heap.u32(DAT_99FBA0)) >>> 0;
      }
      // === per-corner reg constants + extent globals + z ===
      heap.setU16(DAT_99A4E8, C.e8);
      heap.setU16(DAT_99A4EA, C.ea);
      heap.setU16(DAT_99A4EC, (dx + 1) & 0xffff);
      // Register state at the call site:
      //   eax: al = C.al, ah = 9, high16 = (typ & ~0xff) = 0
      //   ecx: cl = C.cl (other bytes carry from current ecx)
      //   edx: dx (after the possible +0x10; the +1/-1 pair cancels)
      //   ebx = sprite descriptor; edi/esi low16 = corner deltas;
      //   ebp = [0x991f88] (rotation)
      const rot = heap.u32(DAT_991F88) >>> 0;
      cpu.regs.eax = (0x900 | C.al) >>> 0;
      cpu.regs.ecx = ((cpu.regs.ecx & 0xffffff00) | C.cl) >>> 0;
      cpu.regs.edx = ((cpu.regs.edx & 0xffff0000) | dx) >>> 0;
      cpu.regs.ebx = ebxSprite;
      cpu.regs.edi = ((cpu.regs.edi & 0xffff0000) | C.di) >>> 0;
      cpu.regs.esi = ((cpu.regs.esi & 0xffff0000) | C.si) >>> 0;
      cpu.regs.ebp = rot;
      paintBody432204(heap, cpu, rot & 3);
      // === pop edx; pop ebx — full 32-bit pops restore the pre-block
      // values: edx is always the entry edx (every block restores it),
      // ebx is always the rotated-flags dword. ===
      cpu.regs.edx = edx0;
      cpu.regs.ebx = blFlags;
    }
    // === pop ebp; pop eax (restore the saves), then for blocks 0..2:
    // shr al,2; shr ebp,4 (32-bit) and re-push for the next block. After
    // block 3 the pops are final — NO shift (0x5e0278..0x5e0279). ===
    cpu.regs.eax = eaxSaved;
    cpu.regs.ebp = ebpSaved;
    if (k < 3) {
      eaxSaved = ((eaxSaved & 0xffffff00) | (((eaxSaved & 0xff) >>> 2) & 0xff)) >>> 0;
      ebpSaved = (ebpSaved >>> 4) >>> 0;
    }
  }

  // === tail: pop esi; ret ===
  // eax/ebp already hold the block-3 saves (set in the loop's last
  // iteration); ecx/edi carry the live values from the last executed
  // block's 432204 call (or the preamble if all four corners skipped);
  // flags are the last cmp's (corner skipped) or 432204's exit flags.
  cpu.regs.esi = esi0;
}

/** Install the setEipHook at 0x5dff38 on the bridge cpu. */
export function install5dff38Hook(cpu, runFunction, setEipHook, heap) {
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_5dff38");
    }
    if (globalThis.__forceInterp5dff38) {
      const savedESP = cpu.regs.esp >>> 0;
      const savedEIP = cpu.regs.eip >>> 0;
      const savedCD = cpu.callDepth;
      clearEipHook(0x5dff38);
      try { runFunction(cpu, 0x5dff38, { stackTop: savedESP, limit: 5_000_000 }); }
      catch (_) { /* matches bridge tolerance */ }
      finally { _setEipHook(0x5dff38, hookFn); }
      cpu.regs.esp = savedESP;
      cpu.regs.eip = savedEIP;
      cpu.callDepth = savedCD;
      return;
    }
    try {
      paintBody5dff38(heap, cpu);
    } catch (e) {
      if (!install5dff38Hook._warned) {
        install5dff38Hook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[5dff38 port] threw: ${(e.message || e).slice(0, 160)}`);
        }
      }
    }
  };
  setEipHook(0x5dff38, hookFn);
}
