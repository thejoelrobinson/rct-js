// @manual — do not regenerate.
//
// FUN_005dbeeb — vehicle mode-flag query, the load-bearing callee of 0x5da274
// (returns the mode flags in eax that drive 5da274's 0x300/0x40/0x80/0x20/0x10/8
// dispatch). Reached via callNative(0x5dbeeb) from the JS 5da274 body ->
// runFunction -> the eip hook in painter-bridge.js.
//
// SHAPE (capstone reachability walk from 0x5dbeeb): 914 reachable instructions,
// SINGLE exit (ret 0x5dcd3f), 167 conditional branches, internal subroutines
// (call 0x5dc770 / 0x5dc983 / 0x5dca69 / 0x5dca6e within its own span), and
// external callees 0x5d9220 / 0x452fce / 0x5cfac7 / 0x5cfc50 / 0x5e53ca /
// 0x5df40c / 0x5dcd40 / 0x444927 / 0x4364c2 / 0x5d849e / 0x5d8623 / 0x5d870c.
// The function does NOT use the entry dl/dh (it reloads dx from [esi+0x3c] at
// 0x5dc1a8); it is type-gated via the per-type flag word [type*8 + 0x5f7104].
//
// COVERAGE: the scenario (sc21.sc4) exercises a SINGLE arm — vehicle type 55
// — covering 318 of the 914 instructions. This port handles that arm; ALL
// OTHER entries fall back to the interpreter (return false BEFORE any side
// effect). Because a partial transcription cannot mid-arm fall back (side
// effects would double-fire under the hook's interp re-run), the body returns
// false until the type-55 arm is COMPLETE; the in-progress transcription lives
// in armType55() and is validated against the interpreter by
// tools/_lockstep-5dbeeb.mjs (memMis=0) + tools/_fuzz-5dbeeb.mjs before it is
// switched live. STATUS: scaffold + entry-block transcription; arm INCOMPLETE
// -> still falls back. See PORTING-ROADMAP.md ADDENDUM 17.
//
// Oracle: tools/_lockstep-5dbeeb.mjs (per-call JS-vs-interp whole-heap + eax).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const F7104 = 0x005f7104;   // word[] per-vehicle-type flag table (idx = type*8)
const DC2C = 0x0065dc2c, DC30 = 0x0065dc30, DC34 = 0x0065dc34, DC40 = 0x0065dc40;
const DC70 = 0x0065dc70, E6B7 = 0x0065e6b7, A74A0 = 0x008874a0;

const s8 = (v) => (v << 24) >> 24;
const s16 = (v) => (v << 16) >> 16;
const s32 = (v) => v | 0;

// Whole-function entry. Returns true if fully handled in JS; false to fall back
// to the interpreter (the hook re-runs the real bytes from 0x5dbeeb).
export function FUN_005dbeeb_js(heap) {
  const esi = regs.esi >>> 0;
  const type = heap.u8(esi + 0x31);
  // Only vehicle type 55 (the scenario-exercised arm) is ported (HYBRID: a
  // byte-exact JS prefix + an interpreter suffix from the returned checkpoint).
  // Gated by __enable5dbeeb until the prefix is large enough to net a win;
  // production falls back. Other types fall back. Oracle: _lockstep-5dbeeb.mjs.
  if (type !== 55 || !globalThis.__enable5dbeeb) return false;
  return armType55(heap, esi, type);
}

// === Type-55 arm transcription (IN PROGRESS) =============================
// Transcribed instruction-by-instruction from the capstone disasm
// (0x5dbeeb..). NOT yet wired (FUN_005dbeeb_js falls back) — under validation.
// eslint-disable-next-line no-unused-vars
function armType55(heap, esi, type) {
  const edi = type;                                          // 0x5dbeeb movzx edi,[esi+0x31]
  heap.setU32(DC2C, esi);                                    // 0x5dbeef mov [0x65dc2c],esi
  heap.setU32(DC40, 0);                                      // 0x5dbef5 mov [0x65dc40],0
  const f = heap.u16(F7104 + edi * 8);                       // per-type flag word
  let eax;

  // 0x5dbeff: test f,0x800 ; je 0x5dbf4d
  if (f & 0x800) {
    let bx = (heap.u16(esi + 0x36) >>> 2) & 0xffff;          // 0x5dbf0b/0f
    // 0x5dbf13 cmp bx,0x44; jb 0x5dbf1f ; 0x5dbf19 cmp bx,0x57; jb 0x5dbf4d
    if (!(bx < 0x44) && bx < 0x57) {
      // skip to 0x5dbf4d
    } else {
      // 0x5dbf1f: call 0x5d9220 -> ax
      regs.esi = esi;
      callNative(0x5d9220, []);
      const ax = regs.eax & 0xffff;
      const ebx = heap.u8(esi + 0x1f);                       // 0x5dbf24 movzx ebx,[esi+0x1f]
      // 0x5dbf28: cmp dword [ebx*4+0x65dc70],0 ; jl 0x5dbf3a
      let or40 = false;
      if (s32(heap.u32(DC70 + ebx * 4)) < 0) {
        if (!(s16(ax) > -0x23)) or40 = true;                 // 0x5dbf3a cmp ax,-0x23; jg 0x5dbf4d
      } else {
        if (!(s16(ax) > -0x46)) or40 = true;                 // 0x5dbf32 cmp ax,-0x46; jg 0x5dbf4d
      }
      // 0x5dbf40: cmp byte [esi+0x1f],8 ; je 0x5dbf4d
      if (or40 && heap.u8(esi + 0x1f) !== 8) {
        heap.setU32(DC40, (heap.u32(DC40) | 0x40) >>> 0);    // 0x5dbf46 or [0x65dc40],0x40
      }
    }
  }

  // 0x5dbf4d: test f,0x1000 ; je 0x5dbf82
  if (f & 0x1000) {
    const ebp = (heap.u8(esi + 0x30) * 0x260) >>> 0;         // 0x5dbf59/5d
    let v = heap.u8((ebp + A74A0) >>> 0) << 0x10;            // 0x5dbf63/6a movzx+shl 0x10
    if (heap.u8(E6B7) === 0) v = 0;                          // 0x5dbf6d/76
    heap.setU32(esi + 0x28, v >>> 0);                        // 0x5dbf78
    heap.setU32(esi + 0x2c, 0);                              // 0x5dbf7b
  }

  // 0x5dbf82: eax = [esi+0x2c] + [esi+0x28]
  eax = (heap.u32(esi + 0x2c) + heap.u32(esi + 0x28)) | 0;
  if (heap.u16(esi + 0x48) & 0x80) eax = 0;                  // 0x5dbf88 test [esi+0x48],0x80
  // 0x5dbf92: test [esi+0x48],0x400 ; je 0x5dbfc1
  if (heap.u16(esi + 0x48) & 0x400) {
    let d2 = s8(heap.u8(esi + 0xd2) - 1);                    // 0x5dbf9a dec byte [esi+0xd2]
    heap.setU8(esi + 0xd2, d2 & 0xff);
    if ((d2 & 0xff) === 0xba) heap.setU16(esi + 0x48, heap.u16(esi + 0x48) & 0xfbff); // 0x5dbfa0/a9
    if (!(s8(heap.u8(esi + 0xd2)) < 0)) {                    // 0x5dbfaf cmp [esi+0xd2],0; jl
      eax = 0;                                               // 0x5dbfb8
      heap.setU32(esi + 0x2c, 0);                            // 0x5dbfba
    }
  }
  heap.setU32(esi + 0x28, eax >>> 0);                        // 0x5dbfc1
  heap.setU32(DC30, eax >>> 0);                              // 0x5dbfc4
  heap.setU32(DC34, (Math.imul(eax >> 0xa, 0x2a)) | 0);     // 0x5dbfc9/cc/cf sar 0xa; imul 0x2a

  // 0x5dbfd4: cmp [0x65dc30],0 ; jge 0x5dbff5  — if the accumulate is negative,
  // walk the sprite chain via [esi+0x3e] (next-sprite index) to the head.
  if (s32(heap.u32(DC30)) < 0) {
    for (;;) {
      const ax = heap.u16(esi + 0x3e);                        // 0x5dbfdd mov ax,[esi+0x3e]
      if (s16(ax) === -1) break;                              // 0x5dbfe1 cmp ax,-1; je 0x5dbff5
      esi = (((ax & 0xffff) << 8) + 0x00743b94) >>> 0;        // 0x5dbfe7/ea/ed movzx/shl 8/add 0x743b94
    }                                                          // 0x5dbff3 jmp 0x5dbfdd
  }

  // CHECKPOINT 0x5dbff5 — hand the suffix to the interpreter. esi = the (walked)
  // sprite; eax/edi/ebx are overwritten by the suffix before being read.
  regs.esi = esi;
  return 0x005dbff5;
  // TODO: extend past 0x5dbff5 — the [0x65dc28]=esi store, the flag-2/4/0x180
  // dispatch (callNatives 0x5d870c/5d8623/5d849e), then the dx-reload region
  // 0x5dc1a8+ — moving the checkpoint toward the 0x5dcd3f ret.
}
