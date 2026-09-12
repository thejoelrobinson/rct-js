// @manual — do not regenerate.
// Assembly-level port of 0x5e4355..0x5e43dd.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect } from "../../runtime/win32/context.js";

function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

function add(name, right) {
  const left = regs[name] & 0xffff;
  const result = (left + (right & 0xffff)) & 0xffff;
  word(name, result);
  regs.cf = left + (right & 0xffff) > 0xffff ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = (~(left ^ right) & (left ^ result)) >>> 15 & 1;
}

function subtract(name, right) {
  const left = regs[name] & 0xffff;
  const operand = right & 0xffff;
  const result = (left - operand) & 0xffff;
  word(name, result);
  regs.cf = left < operand ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = ((left ^ operand) & (left ^ result)) >>> 15 & 1;
}

function negate(name) {
  const before = regs[name] & 0xffff;
  const result = (-before) & 0xffff;
  word(name, result);
  regs.cf = before === 0 ? 0 : 1;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = before === 0x8000 ? 1 : 0;
}

function shiftRight(name, signed) {
  const before = regs[name] & 0xffff;
  const result = signed ? (before << 16 >> 17) & 0xffff : before >>> 1;
  word(name, result);
  regs.cf = before & 1;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = signed ? 0 : before >>> 15;
}

export function FUN_005e4355_exact(heap) {
  word("edx", regs.ecx);
  word("ecx", regs.ebx);
  const rotation = heap.u32(0x991f88);
  regs.ebx = rotation;
  if (rotation > 3) throw new Error(`invalid viewport rotation ${rotation}`);

  if (rotation === 0) {
    word("ebx", regs.eax);
    negate("eax");
    add("eax", regs.ecx);
    add("ecx", regs.ebx);
  } else if (rotation === 1) {
    negate("eax");
    word("ebx", regs.eax);
    subtract("eax", regs.ecx);
    add("ecx", regs.ebx);
  } else if (rotation === 2) {
    word("ebx", regs.eax);
    subtract("eax", regs.ecx);
    negate("ecx");
    subtract("ecx", regs.ebx);
  } else {
    word("ebx", regs.eax);
    add("eax", regs.ecx);
    negate("ecx");
    add("ecx", regs.ebx);
  }
  shiftRight("ecx", true);
  subtract("ecx", regs.edx);
  word("ebx", regs.ecx);
  word("edx", heap.u16(regs.edi + 0x0c));
  shiftRight("edx", false);
  subtract("eax", regs.edx);
  word("edx", heap.u16(regs.edi + 0x0e));
  shiftRight("edx", false);
  subtract("ebx", regs.edx);
  return regs.eax >>> 0;
}

export function FUN_005e4355(heap) {
  return FUN_005e4355_exact(heap);
}

export function FUN_005e4355_legacy(heap) {
  const inputCx = regs.ecx >>> 0;
  const inputBx = regs.ebx >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | (inputCx & 0xffff)) >>> 0;
  regs.ecx = ((inputCx & 0xffff0000) | (inputBx & 0xffff)) >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32(0x005e4368 + heap.u8(0x00991f88) * 4)));
}
