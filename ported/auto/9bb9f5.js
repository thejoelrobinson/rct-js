// @manual — do not regenerate.
//
// Source: decompiled/c/9bb9f5.c — initialises the dirty-rect tracking
// state at 0x00971ed6..0x00971ef0 and clears the dirty-flag buffer at
// 0x0099ad63.
//
// Translator bug being worked around here: the auto-translator emits
// `setU32` for every C `DAT_*` write regardless of the field's actual
// storage width. The structure at 0x00971ed6 is a packed mix of u16 / u32
// / u8 fields:
//
//   0x00971ed6  u16  width clamp
//   0x00971ed8  u16  height clamp
//   0x00971eda  u16  actual width
//   0x00971edc  u16  actual height
//   0x00971ede  u16  display width
//   0x00971ee0  u16  display height
//   0x00971ee2  u16  dirty-block pixel width  (0x40 or 0x20)
//   0x00971ee4  u16  dirty-block pixel height (8)
//   0x00971ee6  u32  block-cells-per-row
//   0x00971eea  u32  block-row-count
//   0x00971eee  u8   log2(block_w)
//   0x00971eef  u8   log2(block_h)
//   0x00971ef0  u8   "valid" flag
//
// With the auto-translator emitting setU32 for the u16 stores, each new
// write spills into the next field (ed6's setU32 stomps ed8 and eda;
// ed8's setU32 puts non-zero high-half back into ed6). End result: the
// dword-view of ed6 ends up as `(ed8_value << 16) | ed6_value`, e.g.
// `(480 << 16) | 640 = 0x01e00280`. Downstream readers like FUN_005e117d
// that read these as u32 (`if (heap.u32(0x00971ed6) < in_DX)`) then
// see a giant value, fail to clamp, and walk a write-pointer for tens
// of thousands of bytes through the heap — eventually overwriting the
// DDraw primary surface and producing the 8-colour vertical-stripe
// artifact (4 colours × 2 ticks of double-buffer presentation).

import { regs } from "../../runtime/regs.js";
import { FUN_00429aff } from "./429aff.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_00452835 } from "./452835.js";
import { FUN_005e5f51 } from "./5e5f51.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_009bb4b4 } from "./9bb4b4.js";
import { FUN_009bb717 } from "./9bb717.js";

export function FUN_009bb9f5(heap) {
  if ((heap.u32(0x005e9178) === 0) &&
      (heap.u32(0x005e9174) !== 0 || heap.u8(0x005f8d5b) === 0)) {
    if (heap.u32(0x005e9184) !== 0) {
      (regs.eax = FUN_005e698a(heap));
      (regs.eax = FUN_00452835(heap));
      (regs.eax = FUN_009bb4b4(heap));
      (regs.eax = FUN_009bb717(heap));
      (regs.eax = FUN_0045268c(heap));
      (regs.eax = FUN_005e6028(heap));
      heap.setU32(0x005e9184, 0);
      heap.setU32(0x009b227c, 0);
    }
    heap.setU32(0x0099fb7c, heap.u32(0x005f1fec) >>> 0);
    // C: `DAT_0099fb84 = DAT_005f2400;` and `DAT_0099fb86 = DAT_005f1ff0;`
    // are 16-bit stores into adjacent halves of one dword (fb84..fb87).
    // Auto-port did setU32 each, with the second clobbering nothing
    // because they're 4 bytes apart? Actually fb84 + 2 = fb86, so
    // overlapping. Use setU16 to be safe.
    heap.setU16(0x0099fb84, heap.u32(0x005f2400) & 0xffff);
    heap.setU16(0x0099fb86, heap.u32(0x005f1ff0) & 0xffff);
    // fb88 is a 16-bit pitch-difference; original auto-port wrote setU32
    // here too. Keep as setU16 for safety.
    const pitchDiff = (heap.i16(0x005f1ff4) - heap.u32(0x005f2400)) & 0xffff;
    heap.setU16(0x0099fb88, pitchDiff);
    if (heap.u32(0x005f15c4) !== 0) {
      const uVar1 = heap.u16(0x005f15c4) & 0xffff;
      const uVar3 = heap.u16(0x005f1b34) & 0xffff;
      // Early-out if state already matches the latest dimensions.
      if (heap.u16(0x005f1ff0) === heap.u16(0x00971ee0) &&
          heap.u16(0x005f2400) === heap.u16(0x00971ede) &&
          uVar1 === heap.u16(0x00971eda) &&
          uVar3 === heap.u16(0x00971edc) &&
          heap.u8(0x00971ef0) === 1) {
        return;
      }
      heap.setU8 (0x00971ef0, 1);
      heap.setU16(0x00971ee0, heap.u32(0x005f1ff0) & 0xffff);          // height
      heap.setU16(0x00971ede, heap.u32(0x005f2400) & 0xffff);          // width
      // ed6 = min(uVar1, width)
      const w = heap.u32(0x005f2400) & 0xffff;
      heap.setU16(0x00971ed6, uVar1 < w ? uVar1 : w);
      // ed8 = min(uVar3, height)
      const h = heap.u32(0x005f1ff0) & 0xffff;
      heap.setU16(0x00971ed8, uVar3 < h ? uVar3 : h);
      // Block size: 0x40 unless width has bottom 6 bits set, then 0x20.
      let blockW = 0x40, log2BlockW = 6;
      if ((heap.u32(0x005f2400) & 0x3f) !== 0) { blockW = 0x20; log2BlockW = 5; }
      heap.setU16(0x00971ee2, blockW);
      heap.setU8 (0x00971eee, log2BlockW);
      heap.setU8 (0x00971eef, 3);
      heap.setU16(0x00971ee4, 8);
      heap.setU32(0x00971eea, ((heap.u32(0x005f1ff0) >>> 0) / 8) >>> 0);
      heap.setU32(0x00971ee6, ((heap.u32(0x005f2400) >>> 0) / blockW) >>> 0);
      heap.setU16(0x00971eda, uVar1);
      heap.setU16(0x00971edc, uVar3);
      // Fill the 0x1400-byte dirty-flag buffer with 0xff (mark all dirty).
      // Original auto-port did `setU32(addr, 0xff)` per byte, which writes
      // 0xff and 3 zeros — net result still leaves all bytes 0xff because
      // each next byte is overwritten with 0xff before its zero-fill from
      // the prior store can persist. Use a tight setU8 loop for clarity.
      const buf = 0x0099ad63;
      for (let i = 0; i < 0x1400; i++) heap.setU8(buf + i, 0xff);
      (regs.eax = FUN_00429aff(heap));
      return (regs.eax = FUN_005e5f51(heap));
    }
  }
  heap.setU8(0x00971ef0, 0);
  return;
}
