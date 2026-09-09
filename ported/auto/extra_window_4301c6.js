// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x4301c6..0x430325.
//
// Scenario-select window paint callback. Ghidra did not recover this CODESEG
// entry, so the dialog's 128-row list previously ran in the x86 interpreter.
// The negative-AX entry paints the standard widgets; non-negative AX paints
// the scenario rows, descriptions and completion marks.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e0e07 } from "./5e0e07.js";
import { FUN_005e4400 } from "./5e4400.js";
import { FUN_00458622 } from "./458622.js";
import { FUN_009b438b } from "./9b438b.js";

const s16 = (value) => (value << 16) >> 16;
const u16 = (value) => value & 0xffff;

function copyCString(heap, source, destination) {
  for (;;) {
    const value = heap.u8(source++);
    heap.setU8(destination++, value);
    if (value === 0) return;
  }
}

function drawSelectionFrame(heap, windowPtr, dpi, row, y) {
  let style = 0;
  if (row === heap.u16(windowPtr + 0x15a)) style = 0x30;
  else if (row === heap.u16(windowPtr + 0x15c)) style = 0x10;
  else return;

  regs.eax = 1;
  regs.ebx = 0x179;
  regs.ecx = u16(y);
  regs.edx = u16(s16(y + 0x17));
  regs.esi = style;
  regs.edi = dpi;
  regs.ebp = 1;
  FUN_005e0e07(heap);
}

function drawCentredString(heap, dpi, stringId, args, colour, x, y) {
  regs.ebx = stringId >>> 0;
  regs.esi = args >>> 0;
  regs.eax = (regs.eax & 0xffffff00) | (colour & 0xff);
  regs.ecx = u16(x);
  regs.edx = u16(y);
  regs.edi = dpi >>> 0;
  FUN_00458622(heap);
}

export function FUN_004301c6(heap) {
  const windowPtr = regs.esi >>> 0;
  const dpi = regs.edi >>> 0;

  if (s16(regs.eax) < 0) {
    if (dpi !== 0xffffffff) {
      regs.esi = windowPtr;
      regs.edi = dpi;
      FUN_005e4400(heap);
      regs.esi = windowPtr;
      regs.edi = dpi;
    }
    return;
  }

  let y = 0;
  let scenarioRecord = 0x0099c16c;
  let scenarioName = 0x0099c96c;

  for (let row = 0; row < 0x80; row++) {
    if (heap.u8(scenarioRecord) !== 0) {
      drawSelectionFrame(heap, windowPtr, dpi, row, y);

      copyCString(heap, scenarioName, 0x0063c27e);
      const textY = s16(y + 2);
      let colour = heap.u8(0x009a0129);
      if (row < 0x20 && ((heap.u32(0x0099fb78) >>> row) & 1) !== 0) colour = 0x41;
      drawCentredString(heap, dpi, 0x8f5, scenarioName, colour, 0xb3, textY);

      const detail = heap.u32(0x0099e96c + row * 4) >>> 0;
      if (detail !== 0x80000000) {
        heap.setU32(0x00971e88, detail);
        heap.setU16(0x00971e86, 0x8f5);
        copyCString(heap, 0x0099eb6c + row * 0x20, 0x0063c27e);
        drawCentredString(heap, dpi, 0xaef, 0x00971e86,
          heap.u8(0x009a0129), 0xb3, s16(textY + 0x0c));

        regs.ebx = 0x95c1;
        regs.ecx = 0x163;
        regs.edx = u16(s16(textY + 0x0e));
        regs.esi = windowPtr;
        regs.edi = dpi;
        FUN_009b438b(heap);
      }
      y = s16(y + 0x18);
    }
    scenarioRecord += 0x10;
    scenarioName += 0x40;
  }

  regs.esi = windowPtr;
  regs.edi = dpi;
}
