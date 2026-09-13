// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x458444..0x45848b.
//
// The auto-translation dropped the formatter's register arguments and the
// push/pop restore sequence. In particular it left EDI pointing at 0x990000,
// so the string blitter treated nearby runtime state as a DPI and formatted
// text over the caller's real clip structure.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458b05 } from "./458b05.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_00458444(heap) {
  if (!globalThis.__realStartup) return FUN_00458444_frozen(heap);

  const eax0 = regs.eax >>> 0;
  const ecx0 = regs.ecx >>> 0;
  const edx0 = regs.edx >>> 0;
  const edi0 = regs.edi >>> 0;

  regs.edi = 0x0099a888;
  regs.eax = regs.ebx & 0xffff;
  regs.ecx = regs.esi >>> 0;
  FUN_00458bcf(heap);

  regs.edi = ((regs.edi & 0xffff0000) | (regs.ebp & 0xffff)) >>> 0;
  heap.setU16(0x00971e84, 0xe0);
  regs.esi = 0x0099a888;
  FUN_00458b05(heap);
  const width = regs.ecx & 0xffff;

  regs.edi = edi0;
  regs.edx = edx0;
  regs.ecx = ecx0;
  regs.eax = eax0;
  regs.ebx = ((width - 1) & 0xffff) >>> 1;
  regs.ecx = ((regs.ecx & 0xffff0000)
    | (((regs.ecx & 0xffff) - (regs.ebx & 0xffff)) & 0xffff)) >>> 0;
  regs.esi = 0x0099a888;
  return FUN_009ba943(heap);
}

function FUN_00458444_frozen(heap) {
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.esi = 0x99a888, regs.edi = 0x990000, regs.eax = FUN_00458b05(heap));
  return (regs.eax = FUN_009ba943(heap));
}
