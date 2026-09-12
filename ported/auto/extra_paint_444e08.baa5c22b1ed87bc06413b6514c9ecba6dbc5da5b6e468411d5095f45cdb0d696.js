// @manual — do not regenerate.
//
// FUN_extra_paint_444e08 — fence/wall per-element painter, vtable slot 1 in
// PTR_LAB_00628a94 (`call [edi + 0x628a94]` from FUN_extra_paint_4368d8's
// body at 0x436a59 when the tile-element type byte ([esi] & 0x3c) selects
// slot 1, i.e. wall elements).
//
// CODESEG body 0x444e08..0x445106 (main) + the door-type jumptable at
// 0x445110 (16 entries on [esi+5]&0xf) + case 0's sub-dispatcher at
// 0x44635d (slope jumptables 0x446398/0x4463d8, cliff-extension path
// 0x446de9 with jumptables 0x446e1c/0x446e5c) + the common tail at
// 0x447bcc (edge-strip ring stores, the 0x4238b4 supports call, the
// height-max update, and the [0x991f04..f24] segment-clear cascade).
// Ghidra emitted no C decompile; everything below is transcribed from the
// capstone disassembly (CODESEG file offset = va-0x41c000+0x1a600).
// The four slope-case block tables are MACHINE-EXTRACTED from the binary
// (a python/capstone walker parsed every case body's mov-constants +
// gate tests), eliminating manual transcription error.
//
// Semantic reference: OpenRCT2 `src/openrct2/paint/tile_element/Paint.Wall.cpp`.
// Function does, in order:
//   1. Look up the diagonally-neighbouring SURFACE tile via the
//      tile_pointers table at 0x971ef4, compare its baseline height/slope
//      to this wall's baseline; set [0x630c40] bit 0 on mismatch (the wall
//      sits on a slope-edge cliff).
//   2. ([0x991f8c]&0x40 && zoom==0 only) shade-overlay via [4*rot+0x431bb8]
//      — NOT ported; falls back to the interpreter (cold; the 431bb8 JS
//      body doesn't model exit registers for interpreter callers).
//   3. Compute the wall's image template ([0x99a4e8]/[0x630b2c] u32 pair
//      from the [0x630b48/4c] table, swizzle key from [esi+6]+rotation)
//      and the sprite-id base (ebx) via [0x6309c0]/[0x630acc].
//   4. Paint: either the cliff-corner overlay (432204 + 432e90 attach
//      pair) or the default single 432204 call.
//   5. Door-type dispatch on [esi+5]&0xf: case 0 (plain wall) is ported —
//      slope-case paint blocks via the extracted tables below; cases 1..13
//      (door frames/leaves) fall back to the interpreter (cold).
//      The scrolling-text banner path ([esi+4]&8, 0x446c69) also falls
//      back (calls the string-format trio 0x458bcf/0x458a7c/0x45a95d).
//   6. Tail: edge-strip ring stores (0x999fdc/0x999f9a, counters at
//      0x99c166/0x99c165), the supports painter `call 0x4238b4` (run via
//      the interpreter — its inner 432204 calls hit the JS hooks), the
//      [0x991f28] height-max update, and the per-path [0x991fxx]
//      segment-clear cascade with exact exit flags.
//
// All 432204/432e90 sub-calls go straight to the JS paintBody432204.
// Register effects are modeled exactly per the asm's partial-register
// writes (the interpreter caller 4368d8 resumes on cpu.regs after the
// hook auto-ret).
//
// Oracle evidence (see commit body): tools/_lockstep-444e08.mjs per-call
// write-set + register + flag compare vs the interpreter; dual whole-heap
// hash soak (tools/painter-port-oracle.mjs FORCE_INTERP=444e08); title
// gates green.
//
// Calling convention on entry (per FUN_extra_paint_4368d8 caller setup):
//   esi = tile element ptr (8-byte struct)
//   eax low = tile X coord (16-bit), ecx full = rotation (cl)
//   edx = element pixel-height (16-bit, pre-shifted by 2)
//   edi = element type & 0x3c (vtable index)
//   ebx = chain-max height in low 16-bit

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { paintBody432204 } from "./extra_paint_432204.js";

const DAT_DPI = 0x00981ef8;

// Slope-case paint-block tables, machine-extracted from binary/rct.exe.
// Each case is a list of blocks; each block stages al/cl/ah/di/si/ebx +
// [0x99a4e8]/[0x99a4ea] then calls [4*camrot + 0x432204] with
// [0x99a4ec] = dx+2. `skip`: the block is skipped when (key & skip) != 0
// (`test dword [esp+4], imm; jne` — [esp+4] is the pushed key).

// case-0 path, [esi+4]&4 clear — jumptable 0x446398, index = key & 0xf
const CASE0_PLAIN = [
  [],  // 0x446c5c
  [{ebx: 0x5736, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5736, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446617
  [{ebx: 0x5737, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5737, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x44669e
  [{ebx: 0x5736, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5737, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x573e, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446833
  [{ebx: 0x5738, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5738, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446725
  [{ebx: 0x5734, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5734, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x446b53
  [{ebx: 0x5737, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5738, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x573f, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}],  // 0x4468fb
  [],  // 0x446c5c
  [{ebx: 0x5735, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5735, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x4467ac
  [{ebx: 0x5735, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x5736, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x573d, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x446a8b
  [{ebx: 0x5733, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5733, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x446bda
  [],  // 0x446c5c
  [{ebx: 0x5735, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5738, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x5740, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x4469c3
  [],  // 0x446c5c
  [],  // 0x446c5c
  [],  // 0x446c5c
];
// case-0 path, [esi+4]&4 set — jumptable 0x4463d8, index = ([esi+4] + camrot byte) & 3
const CASE0_ALT = [
  [{ebx: 0x573b, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x573b, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x4463fb
  [{ebx: 0x573a, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x573a, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x446482
  [{ebx: 0x573c, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x573c, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x446509
  [{ebx: 0x5739, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x5739, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x446590
];
// cliff-extension path 0x446de9, [esi+4]&4 clear — jumptable 0x446e1c, index = key & 0xf
const DE9_PLAIN = [
  [],  // 0x447bc9
  [{ebx: 0x5744, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5744, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x44709b
  [{ebx: 0x5745, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5745, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x447122
  [{ebx: 0x5744, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5745, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x574c, skip: 0x10, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x4472b7
  [{ebx: 0x5746, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5746, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x4471a9
  [{ebx: 0x5742, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x5742, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}],  // 0x44760f
  [{ebx: 0x5745, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5746, al: 0x0, cl: 0x4, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x574d, skip: 0x20, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}],  // 0x44738d
  [{ebx: 0x5742, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x4}, {ebx: 0x574c, skip: 0x10, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574d, skip: 0x20, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}],  // 0x44771d
  [{ebx: 0x5743, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5743, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x447230
  [{ebx: 0x5743, al: 0x1c, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x5744, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574b, skip: 0x80, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x447539
  [{ebx: 0x5741, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5741, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x447696
  [{ebx: 0x5741, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x574c, skip: 0x10, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574b, skip: 0x80, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x4479bd
  [{ebx: 0x5743, al: 0x4, cl: 0x0, di: 0x1, si: 0x1c, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x5746, al: 0x0, cl: 0x1c, di: 0x1c, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574e, skip: 0x40, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x447463
  [{ebx: 0x5742, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574e, skip: 0x40, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x574b, skip: 0x80, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x4477fd
  [{ebx: 0x5741, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x7, e8: 0x4, ea: 0x0}, {ebx: 0x574d, skip: 0x20, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}, {ebx: 0x574e, skip: 0x40, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}],  // 0x4478dd
  [{ebx: 0x574c, skip: 0x10, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x1c}, {ebx: 0x574d, skip: 0x20, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x1c}, {ebx: 0x574e, skip: 0x40, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x1c, ea: 0x0}, {ebx: 0x574b, skip: 0x80, al: 0x0, cl: 0x0, di: 0x4, si: 0x4, ah: 0x7, e8: 0x0, ea: 0x0}],  // 0x447a9d
];
// cliff-extension path, [esi+4]&4 set — jumptable 0x446e5c, index = ([esi+4] + camrot byte) & 3
const DE9_ALT = [
  [{ebx: 0x5749, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x5749, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x446e7f
  [{ebx: 0x5748, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x5748, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x446f06
  [{ebx: 0x574a, al: 0x0, cl: 0x4, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x4}, {ebx: 0x574a, al: 0x0, cl: 0x1c, di: 0x20, si: 0x1, ah: 0x17, e8: 0x0, ea: 0x1c}],  // 0x446f8d
  [{ebx: 0x5747, al: 0x4, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x4, ea: 0x0}, {ebx: 0x5747, al: 0x1c, cl: 0x0, di: 0x1, si: 0x20, ah: 0x17, e8: 0x1c, ea: 0x0}],  // 0x447014
];

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { n &= 15; return ((v >>> n) | (v << (16 - n))) & 0xffff; }
function sx16(v) { return (v << 16) >> 16; }

/** Full-path JS body. Returns true if handled; false → interpreter fallback
 * (door cases 1..13, scrolling-text banner walls, shade-overlay mode). */
export function paintBody444e08(heap, cpu, runFunction) {
  const esi0 = cpu.regs.esi >>> 0;     // tile element ptr
  const ecx0 = cpu.regs.ecx >>> 0;     // rotation (cl)
  const rot = ecx0 & 0xff;
  const dxH = cpu.regs.edx & 0xffff;   // element height (dx)
  const e4 = heap.u8(esi0 + 4);
  const e5 = heap.u8(esi0 + 5);
  const e6 = heap.u8(esi0 + 6);
  const dpi = heap.u32(DAT_DPI) >>> 0;
  const zoom = heap.u16(dpi + 0x0e);
  const f8c = heap.u16(0x991f8c);

  // ---- entry fallback predicates (cold paths stay on the interpreter).
  // All three depend only on entry state the body never mutates, so the
  // decision is safe to take before any side effect. ----
  if ((f8c & 0x40) !== 0 && zoom === 0) return false;        // 0x444e7c shade overlay (431bb8)
  if (zoom <= 1) {
    if ((e5 & 0x0f) !== 0) return false;                     // 0x445106 door cases 1..13
    if ((e4 & 0xf0) === 0 && (e4 & 8) !== 0) return false;   // 0x446c5f banner/scrolling-text
  }

  const lo8 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
  const hi8 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };
  const lo16 = (r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };

  // === 0x444e08: tags + cliff-mismatch bit ===
  heap.setU8(0x991f78, 6);
  heap.setU16(0x630c40, 0);
  // neighbour-tile index: ror16(rol16([0x991f76],7) | [0x991f72], 5)
  const w72 = heap.u16(0x991f72);
  const w76 = heap.u16(0x991f76);
  const tIdx = ror16((rol16(w76, 7) | w72) & 0xffff, 5);
  let nb = heap.u32(0x971ef4 + tIdx * 4) >>> 0;
  while ((heap.u8(nb) & 0x3c) !== 0) nb = (nb + 8) >>> 0;    // skip to SURFACE entry
  const blH = (dxH >>> 2) & 0xff;                            // mov bx,dx; shr bx,2; …cmp bl
  let mismatch;
  if (blH === heap.u8(nb + 2)) {
    if ((e4 & 4) !== 0) {
      mismatch = (heap.u8(nb + 4) & 0x1f) !== heap.u8(0x630b41 + (e4 & 3));
    } else {
      mismatch = (heap.u8(nb + 4) & 0x1f) !== 0;
    }
  } else {
    mismatch = true;
  }
  if (mismatch) heap.setU16(0x630c40, heap.u16(0x630c40) | 1);

  // (0x444e7c shade-overlay block excluded by the entry fallback)

  // === 0x444ed3: swizzle key + image template ===
  const bpFence = (heap.u16(esi0 + 4) & 0xf0) >>> 4;         // mov bp,[esi+4]; and 0xf0; shr 4
  // sequence 1: al=[esi+6]; ah=al<<4; rol ax,cl; and eax,0xf
  const idxNib = rol16(((((e6 << 4) & 0xff) << 8) | e6) & 0xffff, rot & 31) & 0xf;
  heap.setU32(0x99a4e8, heap.u32(0x630b48 + idxNib * 8) >>> 0);   // u32: covers a4e8+a4ea
  heap.setU32(0x630b2c, heap.u32(0x630b4c + idxNib * 8) >>> 0);
  // sequence 2: al=[esi+6]; ah=al>>4; rol ax,cl; shr ax,4; and ax,0xf0
  const ax2 = (rol16(((((e6 >> 4) & 0xff) << 8) | e6) & 0xffff, rot & 31) >>> 4) & 0xf0;
  const key = (idxNib | ax2) >>> 0;                          // or di,ax → edi = key
  cpu.regs.eax = ax2 >>> 0;                                  // eax high bits already 0
  cpu.regs.edi = key >>> 0;

  // === sprite-id base (ebx) ===
  let ebxV;
  if ((e4 & 4) !== 0) {
    ebxV = ((((e4 + ecx0) & 3) >>> 0) + 0x10) >>> 0;         // add ebx,ecx (32-bit); and 3; +0x10
  } else {
    ebxV = heap.u8(0x6309c0 + key);                          // movzx ebx, byte [key+0x6309c0]
  }
  // shl ebp,1 + optional chain-walk inc ([0x991f8c]&1)
  let ebpIdx = (bpFence << 1) >>> 0;
  let esiR = esi0;                                           // live esi register value
  if ((f8c & 1) !== 0) {
    while ((heap.u8(esiR) & 0x3c) !== 0) {
      esiR = (esiR + 8) >>> 0;
      if ((heap.u8(esiR - 7) & 0x80) !== 0) { ebpIdx = (ebpIdx + 1) >>> 0; break; }
    }
  }
  ebxV = (ebxV + heap.u32(0x630acc + ebpIdx * 4)) >>> 0;
  const f84 = heap.u16(0x991f84);
  if ((f84 & 1) === 0) {
    heap.setU32(0x99a4e8, 0x30003);                          // default cliff-shade override
    heap.setU32(0x630b2c, 0x1a001a);
  }
  cpu.regs.ebx = ebxV;
  cpu.regs.esi = esiR;

  const camRot = heap.u32(0x991f88) >>> 0;

  // Stage registers + [0x99a4ec] and run one allocator call. dx at the call
  // equals the live dx (the binary's add/sub around the [0x99a4ec] store
  // cancels before the call).
  const stageAndCall = (ebxVal, al, cl, ah, di16, si16, dxAdd, attachTable) => {
    lo8("eax", al);
    lo8("ecx", cl);
    lo16("edi", di16);
    lo16("esi", si16);
    hi8("eax", ah);
    heap.setU16(0x99a4ec, ((cpu.regs.edx & 0xffff) + dxAdd) & 0xffff);
    cpu.regs.ebx = ebxVal >>> 0;
    cpu.regs.ebp = camRot;
    const attach = attachTable && (heap.u32(0x628928) >>> 0) !== 0;
    paintBody432204(heap, cpu, camRot & 3, attach);
  };

  // === 0x444f7e: branch select — cliff-corner overlay vs default paint ===
  const c40 = heap.u16(0x630c40);
  let overlay = false;
  if ((c40 & 1) !== 0 && (f84 & 1) !== 0 && (f8c & 1) === 0) {
    cpu.regs.edi = dpi;                                      // 0x444fab reload before zoom test
    overlay = heap.u16(dpi + 0x0e) === 0;
  }
  if (overlay) {
    // 0x444fbc: push ebx; esi=[esp+0xc] (original element ptr)
    cpu.regs.esi = esi0;
    let firstEbx;
    if ((e4 & 4) === 0) {
      firstEbx = (heap.u8(0x630c42 + (key & 0xf)) + 0x20265889) >>> 0;   // 0x444fc7
    } else {
      firstEbx = (((e4 + rot) & 3) + 0x2026588b) >>> 0;                  // 0x445040
    }
    stageAndCall(firstEbx, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, false);
    // pop ebx → sprite base; second call goes through the ATTACH table
    stageAndCall(ebxV, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, true);
  } else {
    // 0x4450b3: default single plain call
    stageAndCall(ebxV, 0, 0, 0, heap.u16(0x630b2c), heap.u16(0x630b2e), 1, false);
  }

  // === 0x4450e3: pop ebp (key), pop ecx; edi = dpi; zoom>1 → tail ===
  cpu.regs.ebp = key >>> 0;
  cpu.regs.ecx = ecx0;
  cpu.regs.edi = dpi;
  if (zoom <= 1) {
    heap.setU8(0x991f78, 7);
    cpu.regs.esi = esi0;                                     // mov esi,[esp]
    cpu.regs.ebx = 0;                                        // bl=[esi+5]&0xf == 0 (case 0)
    // === 0x44635d (door case 0) ===
    heap.setU8(0x991f78, 6);
    const runBlocks = (blocks) => {
      for (const b of blocks) {
        if (b.skip !== undefined && (key & b.skip) !== 0) continue;
        heap.setU16(0x99a4e8, b.e8);
        heap.setU16(0x99a4ea, b.ea);
        stageAndCall(b.ebx, b.al, b.cl, b.ah, b.di, b.si, 2, false);
      }
    };
    if ((e4 & 0xf0) !== 0) {
      // === 0x446de9 cliff-extension path ===
      if ((f84 & 1) !== 0) {
        if ((heap.u16(0x630c40) & 1) !== 0) {
          cpu.regs.ebp = key & 0xf;                          // and ebp,0xf
          if ((e4 & 4) === 0) runBlocks(DE9_PLAIN[key & 0xf]);
          else runBlocks(DE9_ALT[(e4 + heap.u8(0x991f88)) & 3]);
        }
        // 0x447bc9: pop esi / pop ebp / pop ecx
        cpu.regs.esi = esi0;
        cpu.regs.ebp = key >>> 0;
        cpu.regs.ecx = ecx0;
      }
      // (f84&1)==0 → straight to the tail with registers unchanged
    } else {
      // === slope-case paint (push ecx/ebp/esi; ebp &= 0xf; dispatch) ===
      cpu.regs.ebp = key & 0xf;
      if ((e4 & 4) === 0) runBlocks(CASE0_PLAIN[key & 0xf]);
      else runBlocks(CASE0_ALT[(e4 + heap.u8(0x991f88)) & 3]);
      // join 0x446c5c: pop esi / pop ebp / pop ecx;
      // test [esi+4],8 → banner excluded at entry, always falls to the tail
      cpu.regs.esi = esi0;
      cpu.regs.ebp = key >>> 0;
      cpu.regs.ecx = ecx0;
    }
  }

  // === tail 0x447bcc ===
  cpu.regs.esi = esi0;                                       // mov esi,[esp]
  const blT = (((e4 + rot) & 3) | (e4 & 4)) & 0xff;
  // mov bh,bl; and bh,4 → ebx byte1 = e4&4; bl = blT
  cpu.regs.ebx = ((cpu.regs.ebx & 0xffff0000) | ((e4 & 4) << 8) | blT) >>> 0;
  const ringStore = (base, ctrAddr, lowByte, ahVal) => {
    const idx = heap.u8(ctrAddr);
    cpu.regs.edi = idx >>> 0;                                // movzx edi, byte [ctr]
    const eaxV = (0xffff0000 | (ahVal << 8) | (lowByte & 0xff)) >>> 0;
    cpu.regs.eax = eaxV;
    heap.setU32(base + idx * 2, eaxV);
    heap.setU8(ctrAddr, (idx + 1) & 0xff);
  };
  if ((key & 2) !== 0) {                                     // test bp,2
    if (blT === 5) ringStore(0x999fdc, 0x99c166, (((dxH + 0x10) & 0xffff) >>> 4) & 0xff, 0x0a);
    else if ((key & 1) !== 0) ringStore(0x999fdc, 0x99c166, (dxH >>> 4) & 0xff, 0x0b);
    else ringStore(0x999fdc, 0x99c166, (dxH >>> 4) & 0xff, 0x0a);
  }
  if ((key & 4) !== 0) {                                     // test bp,4
    if (blT === 6) ringStore(0x999f9a, 0x99c165, (((dxH + 0x10) & 0xffff) >>> 4) & 0xff, 0x0a);
    else if ((key & 8) !== 0) ringStore(0x999f9a, 0x99c165, (dxH >>> 4) & 0xff, 0x0b);
    else ringStore(0x999f9a, 0x99c165, (dxH >>> 4) & 0xff, 0x0a);
  }

  // === 0x447ce0: supports painter (push ecx/ebp; call 0x4238b4; pops) ===
  cpu.regs.esi = esi0;
  let axSup = 0;
  if ((e4 & 4) !== 0) axSup = (((e4 + rot) & 3) + 0x19) & 0xffff;
  lo16("eax", axSup);                                        // mov ax,0 (+ optional rebuild)
  // ebx = ebp & 0xf = key & 0xf (mov ebx,ebp; and ebx,0xf)
  cpu.regs.ebx = (key & 0xf) >>> 0;
  cpu.regs.edi = heap.u8(0x630c42 + (key & 0xf)) !== 0 ? 1 : 0;
  cpu.regs.ebp = 0x20260000;
  {
    // Run the supports painter in the interpreter; its inner 432204 calls
    // hit the JS hooks. Same esp/eip/callDepth discipline as runBodyFrom.
    const sESP = cpu.regs.esp >>> 0;
    const sEIP = cpu.regs.eip >>> 0;
    const sCD = cpu.callDepth;
    runFunction(cpu, 0x004238b4, { stackTop: sESP, limit: 5_000_000 });
    cpu.regs.esp = sESP;
    cpu.regs.eip = sEIP;
    cpu.callDepth = sCD;
  }
  cpu.regs.ebp = key >>> 0;                                  // pop ebp
  cpu.regs.ecx = ecx0;                                       // pop ecx

  // === 0x447d2e: height-max update + segment-clear cascade ===
  cpu.regs.esi = esi0;                                       // mov esi,[esp]
  lo16("eax", heap.u16(0x991f72));
  const dxLive = cpu.regs.edx & 0xffff;                      // dx AFTER 0x4238b4
  lo16("ebx", (dxLive >>> 2) & 0xffff);
  lo16("ecx", heap.u16(0x991f76));
  let dxF = (dxLive + 0x20) & 0xffff;
  if ((e4 & 4) !== 0) dxF = (dxF + 0x10) & 0xffff;
  lo16("edx", dxF);
  if (sx16(heap.u16(0x991f28)) < sx16(dxF)) {                // cmp [0x991f28],dx; jge
    heap.setU16(0x991f28, dxF);
    heap.setU8(0x991f2a, 0x20);
  }
  const setTestFlags = (r) => {
    cpu.eflags.CF = 0;
    cpu.eflags.OF = 0;
    cpu.eflags.ZF = r === 0 ? 1 : 0;
    cpu.eflags.SF = 0;   // all masks tested here have MSB clear → SF always 0
  };
  const clearSeg = (a) => heap.setU16(a, 0xffff);
  if ((e4 & 0xf0) === 0) {
    // flags from `test [esi+4],0xf0` (taken je → ZF=1)
    clearSeg(0x991f14); clearSeg(0x991f18); clearSeg(0x991f1c); clearSeg(0x991f20);
    clearSeg(0x991f24); clearSeg(0x991f04); clearSeg(0x991f10); clearSeg(0x991f08);
    clearSeg(0x991f0c);
    setTestFlags(0);
  } else if (e6 === 0xff) {
    clearSeg(0x991f18); clearSeg(0x991f1c); clearSeg(0x991f20); clearSeg(0x991f24);
    // flags from `cmp byte [esi+6],0xff` equal → ZF=1, CF=0, SF=0, OF=0
    cpu.eflags.CF = 0; cpu.eflags.OF = 0; cpu.eflags.ZF = 1; cpu.eflags.SF = 0;
  } else if ((heap.u16(0x630c40) & 1) !== 0) {
    clearSeg(0x991f14); clearSeg(0x991f18); clearSeg(0x991f1c); clearSeg(0x991f20);
    clearSeg(0x991f24); clearSeg(0x991f04); clearSeg(0x991f10); clearSeg(0x991f08);
    clearSeg(0x991f0c);
    setTestFlags(1);     // test word [0x630c40],1 → r=1
  } else {
    clearSeg(0x991f14);
    if ((key & 1) !== 0) clearSeg(0x991f1c);
    if ((key & 2) !== 0) clearSeg(0x991f24);
    if ((key & 4) !== 0) clearSeg(0x991f20);
    if ((key & 8) !== 0) clearSeg(0x991f18);
    setTestFlags(key & 8);                                   // last: test bp,8
  }
  cpu.regs.esi = esi0;                                       // pop esi; ret
  return true;
}

/** Fall-back: run the original binary body from `addr` via runFunction.
 * Pattern mirrors callBridge in extra_paint_421d2c.js — preserves esp/eip/
 * callDepth so the outer painter-bridge shim's stack frame is intact when
 * the harness's hook auto-ret pops the caller's return address. */
function runBodyFrom(heap, cpu, runFunction, addr) {
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, addr, { stackTop: savedESP, limit: 50_000_000 });
  } catch (_) {
    // Per-painter errors non-fatal; matches outer bridge shim's tolerance.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
}

/** Install the setEipHook at 0x444e08 on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install444e08Hook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_444e08");
    }
    // Save entry esp/eip/callDepth so the harness's hook auto-ret-after-hook
    // (which pops [esp] and jumps there) pops the caller's return address
    // cleanly. The auto-ret cooperates with the outer painter-bridge shim's
    // RET_SENTINEL placement.
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    if (!globalThis.__forceInterp444e08) {
      try {
        handled = paintBody444e08(heap, cpu, runFunction);
      } catch (e) {
        if (!install444e08Hook._warned) {
          install444e08Hook._warned = true;
          if (typeof console !== "undefined") {
            console.warn(`[444e08 port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
          }
        }
        handled = false;
      }
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x444e08
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x00444e08);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x00444e08);
      } finally {
        _setEipHook(0x00444e08, hookFn);
      }
    }
  };
  setEipHook(0x00444e08, hookFn);
}
