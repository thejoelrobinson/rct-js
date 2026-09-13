// @manual — do not regenerate.
// Source: binary/rct.exe @ 0x458678..0x458779.

import { regs } from "../../runtime/regs.js";
import { FUN_0045897e } from "./45897e.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009ba943 } from "./9ba943.js";
import { compare, word, resumeUiNative } from "./extra_ui_state.js";
import { callIndirect, state } from "../../runtime/win32/context.js";

function invokeWrappedText(heap, address) {
  if (address === 0x9ba943 && state.promotedLiftedAddresses?.has(address)) return callIndirect(heap, address);
  if (address === 0x458bcf) return FUN_00458bcf(heap);
  if (address === 0x45897e) return FUN_0045897e(heap);
  if (address === 0x458a7c) return FUN_00458a7c(heap);
  return resumeUiNative(heap, address);
}

export function FUN_00458678_exact(heap, invoke = invokeWrappedText) {
  const saved = [regs.ebx, regs.ecx, regs.edx, regs.esi, regs.ebp];
  word("ecx", heap.u16(regs.edi + 4));
  word("edx", heap.u16(regs.edi + 6));
  regs.esi = 0x642fb9;
  heap.setU16(0x971e84, 0xe0);
  invoke(heap, 0x9ba943);
  [regs.ebx, regs.ecx, regs.edx, regs.esi, regs.ebp] = saved;
  const centre = regs.ecx & 0xffff;
  const baseline = regs.edx & 0xffff;
  const dpi = regs.edi;
  regs.edi = 0x99a888;
  regs.eax = regs.ebx & 0xffff;
  regs.ecx = regs.esi;
  invoke(heap, 0x458bcf);
  word("edi", regs.ebp);
  regs.esi = 0x99a888;
  heap.setU16(0x971e84, 0xe0);
  invoke(heap, 0x45897e);
  regs.esi = 0x99a888;
  const font = regs.ebx & 0xffff;
  const spacing = font <= 0xe0 ? 10 : font === 0x1c0 ? 6 : 18;
  heap.setU16(0x6432d4, spacing);
  word("edi", (regs.edi & 0xffff) * (spacing >>> 1));
  word("ebx", regs.edi);
  heap.setU16(0x971ef2, 2);
  regs.edi = dpi;
  word("edx", baseline);
  word("ecx", centre);
  compare(regs.edx & 0xffff, regs.ebx & 0xffff);
  word("edx", regs.edx - regs.ebx);
  while (true) {
    const line = [regs.ebx & 0xffff, regs.ecx & 0xffff, regs.edx & 0xffff, regs.esi];
    invoke(heap, 0x458a7c);
    word("eax", (regs.ecx & 0xffff) >>> 1);
    regs.esi = line[3];
    word("ecx", line[1]);
    word("ebx", line[0]);
    compare(regs.ecx & 0xffff, regs.eax & 0xffff);
    word("ecx", regs.ecx - regs.eax);
    regs.eax = ((regs.eax & 0xffffff00) | 0xfe) >>> 0;
    invoke(heap, 0x9ba943);
    regs.esi = line[3];
    word("edx", line[2]); word("ecx", line[1]); word("ebx", line[0]);
    while (true) {
      const character = heap.u8(regs.esi);
      regs.eax = ((regs.eax & 0xffffff00) | character) >>> 0;
      regs.esi = (regs.esi + 1) >>> 0;
      if (!character) break;
      if (character <= 4) regs.esi = (regs.esi + 1) >>> 0;
      else if (character >= 17 && character < 32) regs.esi = (regs.esi + (character <= 22 ? 2 : 4)) >>> 0;
    }
    word("eax", heap.u16(0x6432d4));
    word("edx", regs.edx + regs.eax);
    word("eax", (regs.eax & 0xffff) >>> 1);
    compare(regs.ebx & 0xffff, regs.eax & 0xffff);
    word("ebx", regs.ebx - regs.eax);
    if (regs.sf) return;
  }
}

const BUF = 0x0099a888;
const lo16 = (value) => value & 0xffff;
const setLo16 = (name, value) => {
  regs[name] = ((regs[name] & 0xffff0000) | lo16(value)) >>> 0;
};

export function FUN_00458678(heap) {
  const saved = {
    ebx: regs.ebx >>> 0, ecx: regs.ecx >>> 0, edx: regs.edx >>> 0,
    esi: regs.esi >>> 0, ebp: regs.ebp >>> 0,
  };
  setLo16("ecx", heap.u16((regs.edi >>> 0) + 4));
  setLo16("edx", heap.u16((regs.edi >>> 0) + 6));
  regs.esi = 0x00642fb9;
  heap.setU16(0x00971e84, 0xe0);
  FUN_009ba943(heap);
  regs.ebx = saved.ebx; regs.ecx = saved.ecx; regs.edx = saved.edx;
  regs.esi = saved.esi; regs.ebp = saved.ebp;

  const savedCx = regs.ecx & 0xffff;
  const savedDx = regs.edx & 0xffff;
  const savedEdi = regs.edi >>> 0;
  regs.edi = BUF;
  regs.eax = regs.ebx & 0xffff;
  regs.ecx = regs.esi >>> 0;
  FUN_00458bcf(heap);
  setLo16("edi", regs.ebp & 0xffff);
  regs.esi = BUF;
  heap.setU16(0x00971e84, 0xe0);
  FUN_0045897e(heap);

  // 0x4586c9..0x4586f2: line spacing is selected from the font left in BX
  // by the wrapper, not from the wrapped text's width.
  heap.setU16(0x006432d4, 10);
  if ((regs.ebx & 0xffff) > 0xe0) {
    heap.setU16(0x006432d4, (regs.ebx & 0xffff) === 0x1c0 ? 6 : 0x12);
  }
  let bx = lo16(heap.u16(0x006432d4) >>> 1);
  bx = lo16((regs.edi & 0xffff) * bx);
  heap.setU16(0x00971ef2, 2);
  regs.edi = savedEdi;
  setLo16("edx", savedDx - bx);
  setLo16("ecx", savedCx);
  regs.esi = BUF;

  while (true) {
    const lineBx = bx;
    const lineCx = regs.ecx & 0xffff;
    const lineDx = regs.edx & 0xffff;
    regs.esi = BUF;
    FUN_00458a7c(heap);
    const halfWidth = (regs.ecx & 0xffff) >>> 1;
    setLo16("ecx", lineCx - halfWidth);
    regs.esi = BUF;
    regs.eax = (regs.eax & 0xffffff00) | 0xfe;
    FUN_009ba943(heap);

    setLo16("edx", lineDx);
    setLo16("ecx", lineCx);
    bx = lineBx;
    while (true) {
      const control = heap.u8(regs.esi);
      regs.esi = (regs.esi + 1) >>> 0;
      if (control === 0) break;
      if (control >= 0x20) continue;
      if (control <= 4) regs.esi = (regs.esi + 1) >>> 0;
      else if (control > 0x10) regs.esi = (regs.esi + (control <= 0x16 ? 2 : 4)) >>> 0;
    }
    const spacing = heap.u16(0x006432d4);
    setLo16("edx", (regs.edx & 0xffff) + spacing);
    setLo16("eax", spacing >>> 1);
    bx = lo16(bx - (regs.eax & 0xffff));
    if ((bx & 0x8000) !== 0) break;
  }
  setLo16("ebx", bx);
  return regs.eax >>> 0;
}
