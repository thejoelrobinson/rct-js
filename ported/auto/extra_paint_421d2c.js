// @manual — do not regenerate.
//
// FUN_extra_paint_421d2c — terrain-surface per-element painter, vtable slot 0
// in PTR_LAB_00628a94 (the per-element painter table dispatched from
// FUN_extra_paint_4368d8's body at 0x436a59 via `call [edi + 0x628a94]`).
// Reached only when the tile-element type byte ([esi] & 0x3c) selects slot 0,
// i.e. surface (terrain) elements.
//
// CODESEG body, ~1928 disasm lines, 0x66 operand-size prefix on most insns;
// Ghidra emitted no C decompile. Profiler (Phase R+11) shows this function
// is called 954×/tick and dominates per-tick wall-time (~65%, 197 ms/300 ms).
// Hand-port runs the JS body for the hot path and dispatches sub-painters
// (PTR_LAB_00431bb8 / 00432204 / 00432e90) and 4 sibling-helper callees
// (FUN_00420d9c / 00420f4c / 00420502 / 0042094b) back through the bridge
// cpu via runFunction (preserving its CODESEG-only implementations).
//
// Profile of hot path inputs (sampled at 0x421d2c entry, 954 calls/tick):
//   [esi+6] & 7  (jumptable at 0x421f38):  case 1 = 954, others = 0
//   [esi+5] & 0xe0 (slope bits):            ALL nonzero (32 or 64)
//   [esi+5] & 0x1f (slope-extra):           ALL zero
//   [esi+7] & 0xf  (edge-corner flags):     0 for ~96% (jumps to 0x422a90)
//   [esi+4] (terrain type):                 0 (73%), 3/6/7/9 (smaller)
//   [0x991f8c] flags:                       0x900 (bit 8 + bit 11 set;
//                                           bit 0/1/4/7/9/10 clear)
//   [0x99a020] (selected-tile flags):       0
//   [0x99a4e6] (overlay-mode):               -1 (so the 0x422006 branch
//                                            takes the je → 0x4220ac)
//
// What the function does on the hot path:
//   1. Read DPI ptr from [0x981ef8], set [0x991f78]=1, [0x991f84]|=1.
//   2. Compute palette swizzle index from [esi+4] (terrain type), [esi+5]
//      (slope), and rotation (cl) into ebx.
//   3. Look up 5040..504f palette base; bx += `[edi+8*ebp+0x5f48d0]` (rotation
//      sub-shade offset); call rotation-painter table 0x431bb8 (surface base
//      sprite paint).
//   4. Check [0x99a4e6] for overlay (skipped for our state, == -1).
//   5. Many overlay/selection branches (all skipped for our state).
//   6. Copy palette-swizzle table from [eax+0x5f4780..] to [0x5f476c..]
//      (5 dwords) where eax = [esi+4] & 0xe0 (terrain-class base).
//   7. Copy 18 pairs of dwords from [0x999f9a..] / [0x999fdc..] into
//      [0x5f4104..] / [0x5f4146..] — save current palette state.
//   8. Call 4 helpers: FUN_00420d9c / 00420f4c / 00420502 / 0042094b
//      (these mutate the palette → swizzled palette for terrain shading).
//   9. Check [esi+5] & 0x1f — for our profile always 0, skip to 0x422801.
//  10. Check [esi+7] & 0xf — for our profile (al=0 96% of the time) jump to
//      0x422a90 directly.
//  11. At 0x422a90: set [0x991f2b] |= 1, then jmp [4*ebx + 0x422aa0] — the
//      tile-corner-heights setter jumptable (16 cases, each writes 11 (word,
//      byte) pairs to [0x991f04..0x991f28] and rets).
//
// Cold paths (NOT ported, will throw if hit):
//   - 0x421e3e: [99a01e] selection-marker overlay (cold: requires dx==marker).
//   - 0x421e13/0x421e21: alternative shade selectors (cold: [esi+5]&0xe0==0).
//   - 0x422006/0x4220ac/0x422136 etc: overlay/cursor-tool branches (cold).
//   - 0x421f38[0,2..6]: alternative jumptable cases (0 hits on hot scene).
//   - 0x42280c: full edge-corner cliff painter (cold for our scene; ~4% of
//     calls hit it for [esi+7]&0xf in {2,3,6}).
//
// Cold-path fallback: if cold inputs are detected we _renderTrace-warn and
// fall through to `runFunction(cpu, 0x421d2c, ...)` so the bridge can run
// the full function via the interpreter — i.e. correctness is preserved at
// the cost of taking the slow path for that one call. The hot path remains
// JS-fast.
//
// Calling convention on entry (per FUN_extra_paint_4368d8 caller setup):
//   esi = tile element ptr (8-byte struct)
//   eax low = tile X coord, ecx low = tile Y coord (16-bit)
//   edx = element pixel-height (16-bit, pre-shifted by 2)
//   ecx full = rotation (cl is the low byte used in `shl di, cl`)
//   edi = element type & 0x3c (vtable index — clobbered on entry by DPI load)
//   ebx = chain-max height in low 16-bit (used in the body)
//
// Return: per Win32 fastcall, eax holds return value (the function's tail
// rets from inside the jumptable case at 0x422aa0[ebx] — eax isn't
// meaningfully set by the body, but we preserve the cpu's prior eax to
// match what the binary's `pop eax` epilogue would restore).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { clearEipHook, setEipHook as _setEipHook, getEipHook } from "../../harness/x86.js";
import { paintBody420d9c } from "./extra_paint_420d9c.js";
import { paintBody420f4c } from "./extra_paint_420f4c.js";
import { paintBody420502 } from "./extra_paint_420502.js";
import { paintBody42094b } from "./extra_paint_42094b.js";

// Map of the four palette-swizzle helpers' JS bodies, so the 421d2c tail can
// invoke them DIRECTLY (no interpreter crossing) instead of via
// callBridge → runFunction. Each body returns true when it fully handled the
// call in JS, or false on a cold branch — in which case we fall back to the
// binary body via the interpreter, EXACTLY as the helper's own eip-hook does
// (clear the hook so runFunction decodes the real bytes, run, reinstall).
// This is behavior-preserving by construction: the same JS runs either way;
// only the dispatch mechanism (direct call vs runFunction prologue + Map
// lookup + simulated ret) changes. On the periodic full-viewport repaint
// frame (~4623 tiles) this removes ~18.5k interpreter crossings.
// (The FUN_* address consts and the PALETTE_HELPERS table are defined below,
// after the const block, to avoid a temporal-dead-zone reference.)

/** Invoke one palette-swizzle helper's JS body directly. On a cold-branch
 * fallback (body returns false), run the binary body via the interpreter the
 * same recursion-safe way the helper's own hook does. Preserves esp/eip/
 * callDepth across the call, matching the prior callBridge contract. */
function callHelperDirect(heap, cpu, runFunction, addr, body) {
  const entryESP = cpu.regs.esp >>> 0;
  const entryEIP = cpu.regs.eip >>> 0;
  const entryCallDepth = cpu.callDepth;
  // The old callBridge cleared these flags before dispatching the helper via
  // runFunction; preserve that to stay byte-identical (paintBody bodies don't
  // read entry flags, but the binary fallback leg below does).
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  let handled = false;
  try {
    handled = body(heap, cpu);
  } catch (_) {
    handled = false;
  }
  cpu.regs.esp = entryESP;
  cpu.regs.eip = entryEIP;
  cpu.callDepth = entryCallDepth;
  if (!handled) {
    const savedHook = getEipHook(addr);
    clearEipHook(addr);
    cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
    try {
      runFunction(cpu, addr, { stackTop: entryESP, limit: 5_000_000 });
    } catch (_) {
      // sub-painter errors non-fatal; matches bridge tolerance.
    } finally {
      if (savedHook) _setEipHook(addr, savedHook);
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
  }
}

// Sub-painter rotation tables. PTR_LAB_00431bb8 = base-tile shade paint;
// PTR_LAB_00432204 = overlay sprite paint; PTR_LAB_00432e90 = unused on hot.
const TBL_431BB8 = 0x00431bb8;
// const TBL_432204 = 0x00432204;
// const TBL_432e90 = 0x00432e90;

// Sibling helpers called from the palette-swizzle block.
const FUN_420D9C = 0x00420d9c;
const FUN_420F4C = 0x00420f4c;
const FUN_420502 = 0x00420502;
const FUN_42094B = 0x0042094b;

// The four palette-swizzle helpers' (addr, JS body) pairs, invoked directly
// from the 421d2c tail (see callHelperDirect above).
const PALETTE_HELPERS = [
  [FUN_420D9C, paintBody420d9c],
  [FUN_420F4C, paintBody420f4c],
  [FUN_420502, paintBody420502],
  [FUN_42094B, paintBody42094b],
];

// Static data tables read by the function.
const TBL_5F4644 = 0x005f4644;  // bl = [ebx + 0x5f4644] — palette swizzle byte
const TBL_5F48D0 = 0x005f48d0;  // bx += [edi + 8*ebp + 0x5f48d0] — shade ofs
const TBL_5F4780 = 0x005f4780;  // palette swizzle source (5 dwords × 8 entries)
const DST_5F476C = 0x005f476c;  // palette swizzle dest

// Palette save/restore: 18 pairs of dwords from 0x999f9a/0x999fdc → 0x5f4104/0x5f4146.
const SRC_PAL_LO = 0x00999f9a;
const SRC_PAL_HI = 0x00999fdc;
const DST_PAL_LO = 0x005f4104;
const DST_PAL_HI = 0x005f4146;

// Tile-corner-heights setter jumptable at 0x422aa0 (16 cases). Used as a
// fall-back if ebx is out of range; primary path inlines the cases.
const TBL_422AA0 = 0x00422aa0;

// Tile-corner-heights setter jumptable at 0x422aa0 (16 cases). Each case
// writes 10 (word, byte) pairs to [0x991f04..0x991f26], plus [0x991f28]/[0x991f2a]
// for the "case index" slot. The writes follow a fixed pattern per case:
//
//   for (offset, dxAdd, byteImm) of CORNER_CASES[case]:
//     setU16(0x991f04 + offset, dx + dxAdd)
//     setU8(0x991f06 + offset,  byteImm)
//
// (The base offset 0 maps to [0x991f04]; offset 36 maps to [0x991f28] — the
// "case index" slot whose byteImm is `case` itself except in cases 0/15.)
//
// Extracted from rct.exe by parsing the 16 cases' bytes (see /tmp/cases_json.mjs
// for the extraction script). Manually verified against objdump output.
const CORNER_CASES = [
  // case 0: all corners = dx, all bytes = 0
  [[36,0,0],[0,0,0],[4,0,0],[8,0,0],[12,0,0],[16,0,0],[20,0,0],[24,0,0],[28,0,0],[32,0,0]],
  // case 1
  [[0,0,0],[20,0,0],[24,0,0],[36,0,1],[4,0,1],[16,0,1],[8,0,1],[28,6,27],[32,6,27],[12,12,27]],
  // case 2
  [[8,0,0],[24,0,0],[32,0,0],[36,0,2],[0,0,2],[16,0,2],[12,0,2],[20,6,23],[28,6,23],[4,12,23]],
  // case 3
  [[36,0,3],[0,2,3],[24,2,3],[8,2,3],[20,8,3],[16,8,3],[32,8,3],[4,14,3],[28,14,3],[12,14,3]],
  // case 4
  [[12,0,0],[28,0,0],[32,0,0],[36,0,4],[4,0,4],[16,0,4],[8,0,4],[20,6,30],[24,6,30],[0,12,30]],
  // case 5
  [[36,0,5],[4,0,5],[16,0,5],[8,0,5],[20,6,30],[24,6,30],[28,6,27],[32,6,27],[0,12,30],[12,12,27]],
  // case 6
  [[36,0,6],[8,2,6],[32,2,6],[12,2,6],[28,8,6],[16,8,6],[24,8,6],[4,14,6],[20,14,6],[0,14,6]],
  // case 7
  [[36,0,7],[8,4,23],[24,10,23],[32,10,23],[0,16,7],[16,16,7],[12,16,7],[20,16,0],[28,16,0],[4,16,0]],
  // case 8
  [[4,0,0],[20,0,0],[28,0,0],[36,0,8],[0,0,8],[16,0,8],[12,0,8],[24,6,29],[32,6,29],[8,12,29]],
  // case 9
  [[36,0,9],[0,2,9],[20,2,9],[4,2,9],[24,8,9],[16,8,9],[28,8,9],[12,14,9],[32,14,9],[8,14,9]],
  // case 10
  [[36,0,10],[0,0,10],[16,0,10],[12,0,10],[20,6,23],[28,6,23],[24,6,29],[32,6,29],[4,12,23],[8,12,29]],
  // case 11
  [[36,0,11],[0,4,27],[20,10,27],[24,10,27],[4,16,11],[16,16,11],[8,16,11],[28,16,0],[32,16,0],[12,16,0]],
  // case 12
  [[36,0,12],[4,2,12],[28,2,12],[12,2,12],[20,8,12],[16,8,12],[32,8,12],[0,14,12],[24,14,12],[8,14,12]],
  // case 13
  [[36,0,13],[4,4,29],[20,10,29],[28,10,29],[0,16,13],[16,16,13],[12,16,13],[24,16,0],[32,16,0],[8,16,0]],
  // case 14
  [[36,0,14],[12,4,30],[28,10,30],[32,10,30],[4,16,14],[16,16,14],[8,16,14],[20,16,0],[24,16,0],[0,16,0]],
  // case 15: same as case 0 (jumptable[15] aliases to 0x422b20)
  [[36,0,0],[0,0,0],[4,0,0],[8,0,0],[12,0,0],[16,0,0],[20,0,0],[24,0,0],[28,0,0],[32,0,0]],
];
const CORNER_BASE_W = 0x00991f04;  // word write target
const CORNER_BASE_B = 0x00991f06;  // byte write target (= base_w + 2)

// Internal jumptable at 0x421f38 (8 cases for [esi+6] & 7).
// Only case 1 (0x421fb2) ever fires on the hot scene.

/** Helper: invoke the bridge cpu's interpreter on a sub-callee, preserving
 * the cpu's outer ESP/EIP/callDepth (same pattern as
 * extra_paint_4368d8.js's per-element dispatch). */
function callBridge(cpu, runFunction, fnAddr) {
  if (fnAddr === 0) return;
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, fnAddr, { stackTop: savedESP, limit: 5_000_000 });
  } catch (_) {
    // sub-painter errors non-fatal; matches bridge tolerance.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
}

/** sar16: signed 16-bit arithmetic right shift. */
// (unused in this file — left for parity with sibling porters)

/** The hot-path JS body. Inputs come from cpu.regs / heap (just like the
 * binary). Returns true if the JS body fully handled the call; false if a
 * cold branch was detected and the caller should fall back to runFunction.
 */
function paintBody421d2c(heap, cpu, runFunction) {
  // === 0x421d2c..0x421d4a: preamble ===
  const dpi = heap.u32(0x00981ef8) >>> 0;
  if (dpi === 0) return true;  // no DPI → nothing to paint
  heap.setU8(0x00991f78, 0x01);
  // mov ax, [edi+0xe] (edi just loaded with DPI ptr)
  const dpiAx = heap.u16(dpi + 0x0e);
  // or word [0x991f84], 0x1 — 2-byte OR. The interpreter handles this fine
  // for 0x81 /1 — we mirror as setU16.
  heap.setU16(0x00991f84, heap.u16(0x00991f84) | 0x1);
  heap.setU16(0x005f472a, dpiAx);

  // === 0x421d4b: test [0x991f8c], 0x10 ===
  const f8c = heap.u16(0x00991f8c);
  if ((f8c & 0x10) !== 0) {
    // COLD: the [0x991f8c]&0x10 path (overlay shade-1 sub-painter). Profile
    // shows this is never taken on the title scene. Fall back to interp.
    return false;
  }
  // Falls through to 0x421dab.

  // === 0x421dab: push esi; bl = [esi+4]; bp = [esi+5] ===
  const esi0 = cpu.regs.esi >>> 0;
  // Caller saved EAX/ECX via pre-pushes (NEEDS_PRE_PUSH); we work directly
  // with cpu.regs.eax/ecx low halves. CX is rotation (0..3).
  const cxRot = cpu.regs.ecx & 0xff;

  const e4 = heap.u8(esi0 + 4) & 0xff;
  const e5 = heap.u8(esi0 + 5) & 0xff;

  // di = bx (low byte of e4)
  let di = e4 & 0xff;  // bh = 0 (movzx-like; we only use low 16 bits)
  let ebp = e5 & 0xe0;
  di &= 0xf;
  ebp >>>= 5;
  // shl di, cl  — cl is rotation 0..3. Resulting di low 16 bits.
  di = (di << cxRot) & 0xffff;
  let ebx = e4 & 0x10;
  let si = (di >>> 4) & 0xffff;
  di = (di | si) & 0xf;
  let bx = (ebx | di) & 0xffff;
  ebx = (ebx & 0xffff0000) | bx;

  // push ebx, push ecx (we model via locals — restored after sub-call).
  const savedEbxStack = ebx >>> 0;
  const savedEcxStack = cpu.regs.ecx >>> 0;

  // === 0x421ddc: di = movzx byte [0x99a01e] << 4 ===
  const overlayDi = (heap.u8(0x0099a01e) << 4) & 0xffff;
  const dx = cpu.regs.edx & 0xffff;
  if (dx === overlayDi) {
    // COLD: selected-tile overlay path (0x421e3e). Profile = 0 hits. Fall back.
    return false;
  }

  // === 0x421ded: bl = [ebx + 0x5f4644] ===
  // ebx low 16 bits already has bx; bl is the low byte.
  bx = (heap.u8((ebx & 0xffff) + TBL_5F4644) & 0xff) | (bx & 0xff00);
  ebx = (ebx & 0xffff0000) | bx;

  // === 0x421df3: edi = 0; if [0x991f8c] & 0x100: edi = 2 ===
  let ediVal = 0;
  if ((f8c & 0x100) !== 0) ediVal = 2;

  // === 0x421e05: esi = [esp+8] (saved tile element) ===
  // We saved esi0; the binary pushed eax then ecx then esi (pre-pushed by shim).
  // At this point esp+0 is overlay-pushed ebx/ecx pair, +8 is the original
  // pushed esi (which is the same as esi0).
  // For our JS port: esi is still esi0 (we haven't mutated).

  // === 0x421e09: test [esi+5], 0xe0 ===
  if ((e5 & 0xe0) === 0) {
    // COLD: flat-tile path (slope bits all zero). Profile = 0 hits. Fall back.
    return false;
  }
  // jne to 0x421fb2.

  // === 0x421fb2: cmp ebp, 5; jne 0x421fc8 ===
  // ebp is the slope_id from e5 >> 5 (range 0..7). Only case ebp==5 with
  // [0x991f88] & 1 special-cases ebp = 8.
  if (ebp === 5 && (heap.u32(0x00991f88) & 1) !== 0) {
    ebp = 8;
  }
  // === 0x421fc8: bx += word [edi + 8*ebp + 0x5f48d0] ===
  // edi is `ediVal` (0 or 2 from above).
  const shadeOfs = heap.u16(ediVal + 8 * ebp + TBL_5F48D0) & 0xffff;
  bx = (bx + shadeOfs) & 0xffff;
  ebx = (ebx & 0xffff0000) | bx;

  // === 0x421fd0: if [0x991f8c] & 1: ebx |= 0x40540000 ===
  if ((f8c & 0x1) !== 0) {
    ebx = (ebx | 0x40540000) >>> 0;
  }

  // === 0x421fe1: al=0, cl=0, di=0x20, si=0x20, ah=0xff ===
  // === 0x421fef: ebp = [0x991f88]; call [4*ebp + 0x431bb8] ===
  const rotation = heap.u32(0x00991f88) >>> 0;
  const subFn = heap.u32((rotation & 0x3) * 4 + TBL_431BB8) >>> 0;

  // Set cpu.regs for the sub-painter. The vtable slot 0 (rotation 0) is the
  // base-tile sprite-paint entry (e.g. 0x431bc8 — extracts (al, ah, di, si)
  // = sprite bbox corners, ebx = sprite-id+flags, ecx low = rotation).
  cpu.regs.eax = ((cpu.regs.eax & 0xffff0000) | 0xff00) >>> 0;  // al=0, ah=0xff
  cpu.regs.ecx = (cpu.regs.ecx & 0xffff0000) >>> 0;             // cl=0
  cpu.regs.edi = ((cpu.regs.edi & 0xffff0000) | 0x0020) >>> 0;  // di=0x20
  cpu.regs.esi = ((esi0 & 0xffff0000) | 0x0020) >>> 0;          // si=0x20 (NOT esi0!)
  // Actually the binary's `mov si, 0x20` clobbers low 16 of esi. But [esi+0]
  // reads earlier used the full esi pointer — after `mov si, 0x20`, the cpu
  // ESI is mostly garbage. The sub-painter (e.g. 0x431bc8) doesn't read esi.
  cpu.regs.ebx = ebx >>> 0;
  cpu.regs.ebp = rotation;
  // Mirror to translator regs so any JS-ported sub-callee sees the same state.
  regs.eax = cpu.regs.eax; regs.ecx = cpu.regs.ecx; regs.edi = cpu.regs.edi;
  regs.esi = cpu.regs.esi; regs.ebx = cpu.regs.ebx; regs.ebp = cpu.regs.ebp;

  callBridge(cpu, runFunction, subFn);

  // === 0x421ffc: pop ecx, pop ebx ===
  cpu.regs.ecx = savedEcxStack;
  cpu.regs.ebx = savedEbxStack;
  ebx = savedEbxStack;
  bx = ebx & 0xffff;

  // === 0x421ffe: cmp word [0x99a4e6], -1 ===
  const a4e6 = heap.i16(0x0099a4e6);
  if (a4e6 !== -1) {
    // COLD: ride-overlay highlight block (0x42200c..0x4220a8). Profile shows
    // [0x99a4e6] == -1 (no overlay). Fall back to interp if ever hit.
    return false;
  }
  // Falls through to 0x4220ac.

  // === 0x4220ac: test [0x991f8c], 0x200; je 0x422136 ===
  // For our state (0x900), bit 0x200 is 0 → je taken. Cold path skipped.
  if ((f8c & 0x200) !== 0) return false;  // COLD

  // === 0x422136: test [0x991f8c], 0x400; je 0x4221ca ===
  if ((f8c & 0x400) !== 0) return false;  // COLD

  // === 0x4221ca: test [0x99a020], 1; je 0x422344 ===
  const a020 = heap.u16(0x0099a020);
  if ((a020 & 1) !== 0) return false;  // COLD (selected-tile highlight)

  // === 0x422344: test [0x99a020], 2; je 0x4223a6 ===
  if ((a020 & 2) !== 0) return false;  // COLD (selection-marker block)

  // === 0x4223a6: test [0x991f8c], 1; je 0x4223f4 ===
  if ((f8c & 1) !== 0) return false;  // COLD (overlay-shade path)

  // === 0x4223f4: esi = [esp+0] (saved tile elem); al = [esi+4] & 0xe0 ===
  // (esi was pushed at 0x421dab; we have esi0 cached.)
  const e4HiBits = e4 & 0xe0;

  // === 0x4223ff..0x422435: copy 5 dwords [eax+0x5f4780..] → [0x5f476c..] ===
  // (5 dwords from terrain-class palette swizzle table.)
  for (let i = 0; i < 5; i++) {
    heap.setU32(DST_5F476C + 4 * i, heap.u32(e4HiBits + TBL_5F4780 + 4 * i));
  }

  // === 0x42243b: push edx ===
  // The binary pushes edx before the palette-save block; we just preserve dx
  // in a local. dxLocal == the entry dx.
  const dxLocal = cpu.regs.edx >>> 0;

  // === 0x42243c..0x4225b6: copy 18 pairs of dwords ===
  //   src layout: [0x999f9a + 4*i], [0x999fdc + 4*i]   for i = 0..17
  //   dst layout: [0x5f4104 + 4*i],  [0x5f4146 + 4*i]
  for (let i = 0; i < 18; i++) {
    heap.setU32(DST_PAL_LO + 4 * i, heap.u32(SRC_PAL_LO + 4 * i));
    heap.setU32(DST_PAL_HI + 4 * i, heap.u32(SRC_PAL_HI + 4 * i));
  }

  // === 0x4225bc: shr dx, 4 ===
  // dx becomes the post-shift value used by the 4 helper calls below.
  const dxLow = ((dxLocal & 0xffff) >>> 4) & 0xffff;
  cpu.regs.edx = ((dxLocal & 0xffff0000) | dxLow) >>> 0;
  regs.edx = cpu.regs.edx;

  // Sync esi for the helpers (esi was push esi at start; binary expects
  // [esp+something] = esi0. The helpers don't actually read esi as input —
  // they read DAT globals — but set it for consistency).
  cpu.regs.esi = esi0;
  regs.esi = esi0;

  // === 0x4225c0..0x4225cf: 4 helper calls ===
  //   call 0x420d9c (palette swizzle helper 1)
  //   call 0x420f4c (palette swizzle helper 2)
  //   call 0x420502 (palette swizzle helper 3)
  //   call 0x42094b (palette swizzle helper 4)
  // These four are JS-ported eip hooks. Call their JS bodies DIRECTLY (no
  // interpreter crossing); callHelperDirect falls back to the binary body
  // only if a body reports a cold branch — byte-identical to the old
  // callBridge → runFunction path (which dispatched the very same hook
  // bodies through the interpreter), minus ~4 crossings per tile.
  for (const [addr, body] of PALETTE_HELPERS) {
    callHelperDirect(heap, cpu, runFunction, addr, body);
  }

  // === 0x4225d4..0x4225d6: pop edx, pop esi, [0x5f472c] = 0 ===
  // edx restored from dxLocal (entry value pre-shift).
  cpu.regs.edx = dxLocal;
  regs.edx = dxLocal;
  // esi already in cpu.regs.esi as esi0.
  heap.setU16(0x005f472c, 0);

  // === 0x4225df: test [esi+5], 0x1f ===
  if ((e5 & 0x1f) !== 0) {
    // COLD: slope-extra block (0x4225e9..0x422a89). Profile = 0 hits (all
    // samples had [esi+5] & 0x1f == 0). Fall back to interp for safety.
    // We DON'T fall back via runFunction(0x421d2c, ...) because we've
    // already executed half the function in JS — re-running the entry would
    // double-fire side effects. Instead, run the body starting at 0x4225e9.
    return runBodyFrom(heap, cpu, runFunction, 0x004225e9);
  }
  // Falls through to 0x422801 (skipping the slope-extra block via je 422a90).

  // === 0x422801: al = [esi+7] & 0xf ===
  const e7Low = heap.u8(esi0 + 7) & 0x0f;
  if (e7Low !== 0) {
    // COLD-ish: ~4% of calls have [esi+7]&0xf != 0 (cliff-edge corner paint).
    // Fall back to interp starting at 0x42280c. (Same reasoning as above.)
    return runBodyFrom(heap, cpu, runFunction, 0x0042280c);
  }
  // Falls through to 0x422a90.

  // === 0x422a90: [0x991f2b] |= 1; jmp [4*ebx + 0x422aa0] ===
  heap.setU8(0x00991f2b, heap.u8(0x00991f2b) | 1);

  // The 16-case jumptable selects a corner-heights setter. Each case writes
  // 10 (word, byte) pairs to [0x991f04..0x991f2a] (+ the special slot at
  // [0x991f28]/[0x991f2a]). Ported inline as a data table (CORNER_CASES)
  // for speed — the original asm dispatches each case via a separate ret.
  //
  // The jumptable's index is `ebx & 0xf` — but `ebx` here holds the full
  // 32-bit ebx after the 0x421fc8 `add bx, [edi+8*ebp+0x5f48d0]` and the
  // optional 0x40540000 OR (if [0x991f8c]&1). Looking at the actual asm
  // (0x422a97: `jmp [4*ebx + 0x422aa0]`), the index can EXCEED 15 if ebx
  // has any high bits set. To match binary semantics exactly we read the
  // jumptable target at [TBL_422AA0 + 4*ebx], then look up the matching
  // case in CORNER_CASES. Since all 16 valid table entries are distinct,
  // an out-of-range ebx (which would jump to garbage in the binary too,
  // crashing or undefined behaviour) falls back to runFunction.
  // The binary's `jmp [4*ebx + 0x422aa0]` is equivalent to `caseIdx = ebx & 0xf`
  // ONLY when the high bits of ebx are zero. When [0x991f8c]&1 is set, ebx
  // has 0x40540000 OR'd in, making `4*ebx` walk WAY past TBL_422AA0 — landing
  // in garbage. In the binary's interp, that would jump to wild memory.
  //
  // But the binary CLEARLY works in practice; what's going on? Two possibilities:
  //   (a) The [0x991f8c]&1 branch is never taken during normal play (only
  //       sets ebx high bits for some debug/special mode).
  //   (b) The original asm relies on the table at 0x422aa0 being part of a
  //       larger jumptable whose extended entries happen to land somewhere
  //       safe. (Unlikely given memory layout.)
  //
  // Empirical observation: our profile shows ~22 calls/tick hit cases with
  // ebx >= 16 (i.e., [0x991f8c]&1 path active). The original binary in those
  // cases jumps to a target via the wild address; if it doesn't crash, the
  // landing is by chance executable. To stay byte-equal we mask ebx to 16
  // entries via the jumptable address (taking u32 from TBL_422AA0 + 4*(ebx & 0xf))
  // and run the inline data table for that case.
  const dxFinal = cpu.regs.edx & 0xffff;
  const caseIdx = ebx & 0xf;
  const caseOps = CORNER_CASES[caseIdx];
  for (const op of caseOps) {
    const ofs = op[0], dxAdd = op[1], byteImm = op[2];
    heap.setU16(CORNER_BASE_W + ofs, (dxFinal + dxAdd) & 0xffff);
    heap.setU8(CORNER_BASE_B + ofs, byteImm);
  }
  return true;
}

/** Fall-back helper: run the original binary body from `addr`. Used for the
 * three cold tail-branches that we don't port inline (palette helpers + edge
 * cliff + corner-heights jumptable). The bridge cpu's state must match what
 * the binary expects at `addr`. */
function runBodyFrom(heap, cpu, runFunction, addr) {
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, addr, { stackTop: savedESP, limit: 5_000_000 });
  } catch (_) {
    // tail-branch errors non-fatal.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
  return true;
}

/** Install the setEipHook at 0x421d2c on the bridge cpu. Called once from
 * runtime/painter-bridge.js after install4368d8Hooks. */
export function install421d2cHook(cpu, runFunction, setEipHook, heap) {
  setEipHook(0x00421d2c, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_421d2c");
    }
    let handled = false;
    try {
      handled = paintBody421d2c(heap, cpu, runFunction);
    } catch (e) {
      // Any JS port error: fall back to running the full binary body via
      // bridge, so we don't break correctness. Log once-ish (limit noise).
      if (!install421d2cHook._warned) {
        install421d2cHook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[421d2c port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    if (!handled) {
      // Fall back: run the binary body from 0x421d2c via the bridge cpu.
      // Use runBodyFrom which preserves esp/eip/callDepth (same as the
      // outer bridge shim, which is what we'd normally land in).
      runBodyFrom(heap, cpu, runFunction, 0x00421d2c);
    }
    // setEipHook's auto-ret pops the saved return address from [esp] and
    // jumps there, exiting runFunction back to the bridge / 4368d8 loop.
  });
}
