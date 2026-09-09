// @manual — do not regenerate.

import { callIndirect, state } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677_exact, FUN_00423677_legacy } from "./423677.js";
import { FUN_00434a94_exact, FUN_00434a94_legacy } from "./434a94.js";
import { FUN_005e19eb } from "./5e19eb.js";
import { FUN_005e4355_exact, FUN_005e4355_legacy } from "./5e4355.js";

function word(name, value) {
  regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0;
}

function status(result, left, right, subtract = false) {
  const value = result & 0xffff;
  regs.zf = value === 0 ? 1 : 0;
  regs.sf = value >>> 15;
  if (subtract) {
    regs.cf = (left & 0xffff) < (right & 0xffff) ? 1 : 0;
    regs.of = ((left ^ right) & (left ^ value)) >>> 15 & 1;
  } else {
    regs.cf = (left & 0xffff) + (right & 0xffff) > 0xffff ? 1 : 0;
    regs.of = (~(left ^ right) & (left ^ value)) >>> 15 & 1;
  }
  return value;
}

function add(name, right) {
  const left = regs[name] & 0xffff;
  word(name, status(left + (right & 0xffff), left, right));
}

function subtract(name, right) {
  const left = regs[name] & 0xffff;
  word(name, status(left - (right & 0xffff), left, right, true));
}

function addDword(name, right) {
  const left = regs[name] >>> 0;
  const result = (left + (right >>> 0)) >>> 0;
  regs[name] = result;
  regs.cf = result < left ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 31;
  regs.of = (~(left ^ right) & (left ^ result)) >>> 31 & 1;
}

function compare(left, right) {
  status((left & 0xffff) - (right & 0xffff), left, right, true);
}

function logic(value) {
  const result = value & 0xffff;
  regs.cf = 0; regs.of = 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  return result;
}

function increment(name) {
  const carry = regs.cf;
  const before = regs[name] & 0xffff;
  const result = (before + 1) & 0xffff;
  word(name, result);
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = before === 0x7fff ? 1 : 0;
  regs.cf = carry;
}

function negate(name) {
  const before = regs[name] & 0xffff;
  const result = (-before) & 0xffff;
  word(name, result);
  regs.cf = before !== 0 ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = before === 0x8000 ? 1 : 0;
}

function shiftRight(name, signed = false) {
  const before = regs[name] & 0xffff;
  const result = signed ? (before << 16 >> 17) & 0xffff : before >>> 1;
  word(name, result);
  regs.cf = before & 1;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = signed ? 0 : before >>> 15;
}

function invokeDefault(heap, address) {
  if (address === 0x423677) return FUN_00423677_exact(heap);
  if (address === 0x434a94) return FUN_00434a94_exact(heap);
  if (address === 0x5e19eb) return FUN_005e19eb(heap);
  if (address === 0x5e4355) return FUN_005e4355_exact(heap);
  return callIndirect(heap, address);
}

function projectClamped(rotation) {
  if (rotation === 0) {
    word("ebx", regs.eax); negate("eax"); add("eax", regs.ecx); add("ecx", regs.ebx);
  } else if (rotation === 1) {
    negate("eax"); word("ebx", regs.eax); subtract("eax", regs.ecx); add("ecx", regs.ebx);
  } else if (rotation === 2) {
    word("ebx", regs.eax); subtract("eax", regs.ecx); negate("ecx"); subtract("ecx", regs.ebx);
  } else {
    word("ebx", regs.eax); add("eax", regs.ecx); negate("ecx"); add("ecx", regs.ebx);
  }
  shiftRight("ecx", true);
  subtract("ecx", regs.edx);
  word("ebx", regs.ecx);
}

function FUN_005e16f7_exact(heap, invoke = invokeDefault) {
  const window = regs.esi >>> 0;
  word("ebp", 2);
  invoke(heap, heap.u32(window + 4));
  regs.esi = window;
  regs.edi = heap.u32(window + 8);
  regs.cf = 0; regs.of = 0;
  regs.zf = regs.edi === 0 ? 1 : 0;
  regs.sf = regs.edi >>> 31;
  if (!regs.edi) return regs.eax >>> 0;

  word("ebx", heap.u16(window + 0x16e));
  compare(regs.ebx, 0xffff);
  if (!regs.zf) {
    regs.ebx = regs.ebx & 0xffff;
    regs.ebx = (regs.ebx << 8) >>> 0;
    addDword("ebx", 0x743b94);
    word("eax", heap.u16(regs.ebx + 0x0e));
    word("ecx", heap.u16(regs.ebx + 0x12));
    word("ebx", heap.u16(regs.ebx + 0x10));
    invoke(heap, 0x5e4355);
  } else {
    word("eax", heap.u16(regs.edi + 0x0c));
    word("ebx", heap.u16(regs.edi + 0x0e));
    shiftRight("eax");
    shiftRight("ebx");
    add("eax", heap.u16(window + 0x170));
    add("ebx", heap.u16(window + 0x172));
    regs.edx = heap.u32(0x991f88);
    invoke(heap, 0x434a94);

    word("ebp", 0);
    logic(regs.ebp);
    compare(regs.eax, 0xff00);
    if (regs.sf) { word("eax", 0xff00); increment("ebp"); }
    compare(regs.ebx, 0xff00);
    if (regs.sf) { word("ebx", 0xff00); increment("ebp"); }
    compare(regs.eax, 0x10fe);
    if (!regs.zf && regs.sf === regs.of) { word("eax", 0x10fe); increment("ebp"); }
    compare(regs.ebx, 0x10fe);
    if (!regs.zf && regs.sf === regs.of) { word("ebx", 0x10fe); increment("ebp"); }
    logic(regs.ebp);
    if (!regs.zf) {
      word("ecx", regs.ebx);
      invoke(heap, 0x423677);
      regs.ebp = heap.u32(0x991f88);
      projectClamped(regs.ebp & 3);
      word("ecx", heap.u16(regs.edi + 0x0c));
      shiftRight("ecx");
      subtract("eax", regs.ecx);
      word("ecx", heap.u16(regs.edi + 0x0e));
      shiftRight("ecx");
      subtract("ebx", regs.ecx);
      heap.setU16(window + 0x170, regs.eax);
      heap.setU16(window + 0x172, regs.ebx);
    }

    word("eax", heap.u16(window + 0x170));
    word("ebx", heap.u16(window + 0x172));
    logic(heap.u16(window + 0x32) & 8);
    if (!regs.zf) {
      word("ecx", 0);
      subtract("eax", heap.u16(regs.edi + 8));
      if (regs.sf) { negate("eax"); word("ecx", regs.ecx | 1); logic(regs.ecx); }
      subtract("ebx", heap.u16(regs.edi + 0x0a));
      if (regs.sf) { negate("ebx"); word("ecx", regs.ecx | 2); logic(regs.ecx); }
      add("eax", 7);
      add("ebx", 7);
      for (let count = 0; count < 3; count++) shiftRight("eax");
      for (let count = 0; count < 3; count++) shiftRight("ebx");
      word("edx", regs.eax);
      word("edx", logic((regs.edx | regs.ebx) & 0xffff));
      if (regs.zf) {
        const flags = heap.u16(window + 0x32) & 0xfff7;
        heap.setU16(window + 0x32, flags);
        logic(flags);
      }
      logic(regs.ecx & 1);
      if (!regs.zf) negate("eax");
      logic(regs.ecx & 2);
      if (!regs.zf) negate("ebx");
      add("eax", heap.u16(regs.edi + 8));
      add("ebx", heap.u16(regs.edi + 0x0a));
    }
  }

  invoke(heap, 0x5e19eb);
  regs.esi = window;
  return regs.eax >>> 0;
}

export function FUN_005e16f7(heap, invoke) {
  if (!globalThis.__forceFrozen5e16f7 && (invoke || state.executionMode === "pure-js")) {
    return FUN_005e16f7_exact(heap, invoke || invokeDefault);
  }
  return FUN_005e16f7_frozen(heap);
}

function FUN_005e16f7_frozen(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let cVar4 = 0;
  (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  iVar1 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if (iVar1 != 0) {
    if ((heap.i16((unaff_ESI + 0x16e)) | 0) == -1) {
      sVar3 = (((heap.u16((iVar1 + 0xe)) >>> 1) + heap.i16((unaff_ESI + 0x172))) & 0xffff);
      regs.edx = heap.u32(0x00991f88);
      sVar2 = (((regs.eax = FUN_00434a94_legacy(heap))) & 0xffff);
      cVar4 = (((((sVar2 + 0x100)) << 16 >> 16) < 0) & 0xff);
      if (cVar4) {
        sVar2 = ((-0x100) & 0xffff);
      }
      if ((((sVar3 + 0x100)) << 16 >> 16) < 0) {
        sVar3 = ((-0x100) & 0xffff);
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (0x10fe < sVar2) {
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (0x10fe < sVar3) {
        cVar4 = ((cVar4 + 1) & 0xff);
      }
      if (cVar4 != 0) {
        (regs.eax = FUN_00423677_legacy(heap));
        return (regs.eax = callIndirect(heap, heap.u32((0x005e17b8) + (heap.u8(0x00991f88)) * 4)));
      }
      if ((heap.u16((unaff_ESI + 0x32)) & 8) != 0) {
        sVar2 = ((heap.i16((unaff_ESI + 0x170)) - heap.i16((iVar1 + 8))) & 0xffff);
        if (sVar2 < 0) {
          sVar2 = ((-sVar2) & 0xffff);
        }
        sVar3 = ((heap.i16((unaff_ESI + 0x172)) - heap.i16((iVar1 + 10))) & 0xffff);
        if (sVar3 < 0) {
          sVar3 = ((-sVar3) & 0xffff);
        }
        if (((sVar2 + 7 | sVar3 + 7) & 0xffff) >>> 3 == 0) {
          heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) & 0xfff7) & 0xffff);
        }
      }
    } else {
      (regs.eax = FUN_005e4355_legacy(heap));
    }
    (regs.eax = FUN_005e19eb(heap));
  }
  return;
}
