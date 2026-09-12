import { regs } from "../../runtime/regs.js";
import { compare, logic, word, resumeUiNative } from "./extra_ui_state.js";
import { FUN_00458678_exact } from "./458678.js";

const sign = value => value << 16 >> 16;

export function fillTooltipSolidExact(heap) {
  if (regs.ebp & 0x7000000) throw new Error("tooltip fill requires solid mode");
  const left = regs.eax & 0xffff;
  const right = regs.ebx & 0xffff;
  const top = regs.ecx & 0xffff;
  const bottom = regs.edx & 0xffff;
  compare(left, right);
  if (sign(left) > sign(right)) return;
  compare(top, bottom);
  if (sign(top) > sign(bottom)) return;
  const dpi = regs.edi >>> 0;
  const clipX = heap.u16(dpi + 4);
  const clipY = heap.u16(dpi + 6);
  const clipWidth = heap.u16(dpi + 8);
  const clipHeight = heap.u16(dpi + 10);
  compare(right, clipX);
  if (sign(right) < sign(clipX)) return;
  const endX = (clipX + clipWidth) & 0xffff;
  compare(left, endX);
  if (sign(left) >= sign(endX)) return;
  compare(bottom, clipY);
  if (sign(bottom) < sign(clipY)) return;
  const endY = (clipY + clipHeight) & 0xffff;
  compare(top, endY);
  if (sign(top) >= sign(endY)) return;
  const leftOffset = Math.max(0, sign(left - clipX));
  const topOffset = Math.max(0, sign(top - clipY));
  const width = (Math.min(sign(right - clipX + 1), sign(clipWidth)) - leftOffset) & 0xffff;
  const height = (Math.min(sign(bottom - clipY + 1), sign(clipHeight)) - topOffset) & 0xffff;
  const stride = (clipWidth + heap.u16(dpi + 12)) & 0xffff;
  let destination = (heap.u32(dpi) + Math.imul(stride, sign(topOffset)) + leftOffset) >>> 0;
  const colour = regs.ebp & 255;
  const advance = (stride - width) >>> 0;
  regs.ebp = advance;
  for (let row = 0; row < (height || 65536); row++) {
    if (!regs.df) {
      if (width) { heap.u8(destination); heap.u8((destination + width - 1) >>> 0); }
      heap.bytes.fill(colour, destination, destination + width);
      destination = (destination + width) >>> 0;
    } else {
      if (width & 1) { heap.setU8(destination, colour); destination = (destination + 1) >>> 0; }
      if (width & 2) { heap.setU16(destination, colour * 0x101); destination = (destination + 2) >>> 0; }
      for (let column = 0; column < (width >>> 2); column++) {
        heap.setU32(destination, colour * 0x1010101);
        destination = (destination - 4) >>> 0;
      }
    }
    regs.cf = destination + advance > 0xffffffff ? 1 : 0;
    destination = (destination + advance) >>> 0;
  }
  regs.zf = 1; regs.sf = 0; regs.of = 0;
}

function invokeTooltipPaint(heap, address) {
  if (address === 0x9b30f1) return fillTooltipSolidExact(heap);
  if (address === 0x458678) return FUN_00458678_exact(heap);
  return resumeUiNative(heap, address);
}

export function paintTooltipExact(heap, invoke = invokeTooltipPaint) {
  compare(regs.edi >>> 0, 0xffffffff, 32);
  if (regs.zf) return;
  word("eax", heap.u16(regs.esi + 0x20));
  word("ecx", heap.u16(regs.esi + 0x22));
  word("ebx", heap.u16(regs.esi + 0x24) + regs.eax - 1);
  word("edx", heap.u16(regs.esi + 0x26) + regs.ecx - 1);
  const bounds = [regs.eax, regs.ebx, regs.ecx, regs.edx];
  regs.ebp = 0;
  logic(0, 32);
  invoke(heap, 0x9b30f1);
  word("eax", bounds[0] + 1);
  word("ebx", bounds[1] - 1);
  word("ecx", bounds[2] + 1);
  const carry = regs.cf;
  compare(bounds[3] & 0xffff, 1);
  regs.cf = carry;
  word("edx", bounds[3] - 1);
  regs.ebp = 0x5c;
  invoke(heap, 0x9b30f1);
  word("ecx", (heap.u16(regs.esi + 0x24) >>> 1) + heap.u16(regs.esi + 0x20));
  const vertical = ((heap.u16(regs.esi + 0x26) >>> 1) - 5) & 0xffff;
  const top = heap.u16(regs.esi + 0x22);
  const result = (vertical + top) & 0xffff;
  word("edx", result);
  regs.cf = vertical + top > 0xffff ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0; regs.sf = result >>> 15;
  regs.of = (~(vertical ^ top) & (vertical ^ result)) >>> 15 & 1;
  const window = regs.esi;
  word("ebx", heap.u16(window + 0x15a));
  regs.esi = (window + 0x15c) >>> 0;
  word("ebp", 0xc5);
  try { invoke(heap, 0x458678); }
  finally { regs.esi = window; }
}
