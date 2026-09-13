// @manual — do not regenerate.
// NO decompiled C exists for this address: 0x422a90 is a MID-BLOCK label
// inside the unlabeled terrain-surface painter body that begins at 0x421d2c
// (see ported/auto/extra_paint_421d2c.js — Ghidra emitted no C for it).
// Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x422a90 0x422aa0        (dispatch head)
//   python3 tools/disasm-va.py 0x422b20 0x423677        (19 distinct case bodies)
//
// ENTRY MECHANISM — 0x422a90 is NOT a called function:
//   - E8/E9 rel32 scan over CODESEG: zero direct call/jmp sites.
//   - little-endian dword 0x00422a90 appears NOWHERE in the file's data
//     sections (PE section-table mapping) — no pointer-table entries.
//   It is reached only by intra-function control flow of the 0x421d2c body:
//     (a) fallthrough from 0x422a89 (end of the slope-extra/cliff block),
//     (b) `je 0x422a90` at 0x422806 when [esi+7] & 0xf == 0,
//     (c) at RUNTIME in the hybrid, ported/auto/extra_paint_421d2c.js's
//         cliff-edge cold branch does runBodyFrom(heap, cpu, runFunction,
//         0x00422a90) — i.e. runFunction(cpu, 0x422a90, {stackTop: esp}) —
//         which is why the interpreter profiler sees 0x422a90 as a hot
//         "entry" (~204 calls/soak, ~23 steps/call). The harness pushes a
//         return sentinel, so the case bodies' `ret` behaves like a
//         function return and this block is portable as a standalone unit.
//
// WHAT IT DOES — tile-corner-heights setter dispatch:
//   0x422a90: or  byte [0x991f2b], 1
//   0x422a97: jmp dword [ebx*4 + 0x422aa0]     (32-entry jumptable)
// Each case writes 10 (word, byte) pairs — corner height words at
// [0x991f04 + ofs] = dx + cumAdd, corner flag bytes at [0x991f06 + ofs] —
// covering slots 0x991f04..0x991f2a, then rets. Some cases mutate dx via
// `add dx, 6/2/4/...` (16-bit adds, upper 16 bits of edx preserved); the
// mutated dx PERSISTS to the caller across the ret (register-exactness:
// we write it back to regs.edx).
//
// ENTRY CONTRACT (from the 0x421d2c body at this point):
//   ebx = corner-case index (0..31; full 32-bit ebx indexes the
//         table in the binary — we replicate by reading the jumptable target
//         from the heap at (0x422aa0 + 4*ebx) mod 2^32 and matching it
//         against the 19 known case addresses, throwing on garbage so the
//         harness can fall back rather than silently diverging)
//   dx  = element pixel-height word (edx low 16)
//   eax/ecx/esi/edi/ebp: unused and unmodified by this block.
//
// The case-op rows below were extracted mechanically from the binary bytes
// (pattern: 66 89 15 imm32 = mov word [imm32], dx; C6 05 imm32 imm8 =
// mov byte [imm32], imm8; 66 83 C2 imm8 = add dx, imm8; C3 = ret) and
// cross-checked against the independently-derived CORNER_CASES table in
// ported/auto/extra_paint_421d2c.js — byte-identical.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

const TBL_422AA0 = 0x00422aa0; // jumptable base (32 dword entries)
const BASE_W = 0x00991f04;     // corner height word base
const BASE_B = 0x00991f06;     // corner flag byte base (= BASE_W + 2)

// Jumptable targets, index -> case body VA (case 15 aliases case 0's body).
const CASE_VA = [
  0x00422b20, 0x00422bad, 0x00422c42, 0x00422cd7,
  0x00422d70, 0x00422e05, 0x00422e9a, 0x00422f33,
  0x00422fcc, 0x00423061, 0x004230fa, 0x0042318f,
  0x00423228, 0x004232c1, 0x0042335a, 0x00422b20,
];

const EXTENDED_CASES = [
  [0x4233f3, [36,8,24,32,0,16,12,20,28,4], 0x17],
  [0x423494, [36,0,20,24,4,16,8,28,32,12], 0x1b],
  [0x423535, [36,4,20,28,0,16,12,24,32,8], 0x1d],
  [0x4235d6, [36,12,28,32,4,16,8,20,24,0], 0x1e],
];

// Per case: [rows, totalDxAdd]. Row = [ofs, cumDxAdd, byteImm]:
//   setU16(BASE_W + ofs, (dx0 + cumDxAdd) & 0xffff); setU8(BASE_B + ofs, byteImm)
// cumDxAdd is the running sum of the `add dx, N` instructions executed
// before that store (16-bit wrap of (dx0 + cum) is identical to wrapping
// each add in sequence). totalDxAdd is the net dx mutation at ret.
const CASES = [
  /* 0 @422b20 */ [[[36,0,0],[0,0,0],[4,0,0],[8,0,0],[12,0,0],[16,0,0],[20,0,0],[24,0,0],[28,0,0],[32,0,0]], 0],
  /* 1 @422bad */ [[[0,0,0],[20,0,0],[24,0,0],[36,0,1],[4,0,1],[16,0,1],[8,0,1],[28,6,27],[32,6,27],[12,12,27]], 12],
  /* 2 @422c42 */ [[[8,0,0],[24,0,0],[32,0,0],[36,0,2],[0,0,2],[16,0,2],[12,0,2],[20,6,23],[28,6,23],[4,12,23]], 12],
  /* 3 @422cd7 */ [[[36,0,3],[0,2,3],[24,2,3],[8,2,3],[20,8,3],[16,8,3],[32,8,3],[4,14,3],[28,14,3],[12,14,3]], 14],
  /* 4 @422d70 */ [[[12,0,0],[28,0,0],[32,0,0],[36,0,4],[4,0,4],[16,0,4],[8,0,4],[20,6,30],[24,6,30],[0,12,30]], 12],
  /* 5 @422e05 */ [[[36,0,5],[4,0,5],[16,0,5],[8,0,5],[20,6,30],[24,6,30],[28,6,27],[32,6,27],[0,12,30],[12,12,27]], 12],
  /* 6 @422e9a */ [[[36,0,6],[8,2,6],[32,2,6],[12,2,6],[28,8,6],[16,8,6],[24,8,6],[4,14,6],[20,14,6],[0,14,6]], 14],
  /* 7 @422f33 */ [[[36,0,7],[8,4,23],[24,10,23],[32,10,23],[0,16,7],[16,16,7],[12,16,7],[20,16,0],[28,16,0],[4,16,0]], 16],
  /* 8 @422fcc */ [[[4,0,0],[20,0,0],[28,0,0],[36,0,8],[0,0,8],[16,0,8],[12,0,8],[24,6,29],[32,6,29],[8,12,29]], 12],
  /* 9 @423061 */ [[[36,0,9],[0,2,9],[20,2,9],[4,2,9],[24,8,9],[16,8,9],[28,8,9],[12,14,9],[32,14,9],[8,14,9]], 14],
  /*10 @4230fa */ [[[36,0,10],[0,0,10],[16,0,10],[12,0,10],[20,6,23],[28,6,23],[24,6,29],[32,6,29],[4,12,23],[8,12,29]], 12],
  /*11 @42318f */ [[[36,0,11],[0,4,27],[20,10,27],[24,10,27],[4,16,11],[16,16,11],[8,16,11],[28,16,0],[32,16,0],[12,16,0]], 16],
  /*12 @423228 */ [[[36,0,12],[4,2,12],[28,2,12],[12,2,12],[20,8,12],[16,8,12],[32,8,12],[0,14,12],[24,14,12],[8,14,12]], 14],
  /*13 @4232c1 */ [[[36,0,13],[4,4,29],[20,10,29],[28,10,29],[0,16,13],[16,16,13],[12,16,13],[24,16,0],[32,16,0],[8,16,0]], 16],
  /*14 @42335a */ [[[36,0,14],[12,4,30],[28,10,30],[32,10,30],[4,16,14],[16,16,14],[8,16,14],[20,16,0],[24,16,0],[0,16,0]], 16],
];

// target VA -> case index (case 15 shares case 0's body — same behaviour).
const VA_TO_CASE = new Map();
for (let i = 0; i < 15; i++) VA_TO_CASE.set(CASE_VA[i], i);
for (const [address, offsets, flag] of EXTENDED_CASES) {
  const heights = [0,4,10,10,16,16,16,22,22,28];
  VA_TO_CASE.set(address, CASES.length);
  CASES.push([offsets.map((offset, index) => [offset, heights[index], flag]), 28]);
}

export function FUN_00422a90(heap) {
  // 0x422a90: or byte [0x991f2b], 1  (unconditional, before the dispatch)
  heap.setU8(0x00991f2b, heap.u8(0x00991f2b) | 1);

  // 0x422a97: jmp dword [ebx*4 + 0x422aa0]
  // Replicate the binary's addressing exactly: full 32-bit ebx, mod-2^32
  // effective address, target read from the (heap-overlaid) jumptable.
  const ebx = regs.ebx >>> 0;
  const slotAddr = (TBL_422AA0 + ((ebx << 2) >>> 0)) >>> 0;
  const target = heap.u32(slotAddr) >>> 0;
  const caseIdx = VA_TO_CASE.get(target);
  if (caseIdx === undefined) {
    // Unknown data-table target: retain the explicit development fallback
    // instead of silently substituting one of the supported cases.
    throw new Error(
      `FUN_00422a90: jumptable target 0x${target.toString(16)} (ebx=0x${ebx.toString(16)}) is not a known case`,
    );
  }

  const dx0 = regs.edx & 0xffff;
  const [rows, totalDxAdd] = CASES[caseIdx];
  const marker = heap.u8(0x991f2b);
  regs.cf = 0; regs.zf = 0; regs.sf = marker >>> 7; regs.of = 0;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    heap.setU16(BASE_W + r[0], (dx0 + r[1]) & 0xffff);
    heap.setU8(BASE_B + r[0], r[2]);
  }
  // `add dx, N` mutations persist to the caller (16-bit, upper edx kept).
  if (totalDxAdd !== 0) {
    const previous = (dx0 + totalDxAdd - 6) & 0xffff;
    const result = (previous + 6) & 0xffff;
    regs.edx = ((regs.edx & 0xffff0000) | result) >>> 0;
    regs.cf = previous + 6 > 0xffff ? 1 : 0;
    regs.zf = result === 0 ? 1 : 0;
    regs.sf = result >>> 15;
    regs.of = (~(previous ^ 6) & (previous ^ result)) >>> 15 & 1;
  }
  // eax/ebx/ecx/esi/edi/ebp untouched by all case bodies. The harness
  // simulates the final ret.
}
