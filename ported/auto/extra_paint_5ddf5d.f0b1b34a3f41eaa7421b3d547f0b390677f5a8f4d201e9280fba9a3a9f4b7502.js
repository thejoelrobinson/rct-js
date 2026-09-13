// @manual — do not regenerate.
// Small-scenery painter, 0x5ddf5d..0x5de284. Definition flags select directional
// bounds, aging, animated child sprites and support exclusion. Word/byte writes
// preserve the upper register bits, including SI's saved element-pointer bits.
import { regs } from "../../runtime/regs.js";
import { paintBody431bb8 } from "./extra_paint_431bb8.js";
import { paintBody432204 } from "./extra_paint_432204.js";

const DEF_BASE = 0x6e1ec8;
const FLAGS = ["CF", "ZF", "SF", "OF", "DF"];
function word(name, value) { regs[name] = ((regs[name] & 0xffff0000) | (value & 0xffff)) >>> 0; }
function byte(name, value, shift = 0) {
  regs[name] = ((regs[name] & ~(0xff << shift)) | ((value & 0xff) << shift)) >>> 0;
}
function logic(value, bits = 16) {
  regs.cf = regs.of = 0; regs.zf = value === 0 ? 1 : 0; regs.sf = (value >>> (bits - 1)) & 1;
  return value;
}
function compare(a, b, bits = 8) {
  const mask = bits === 32 ? 0xffffffff : (1 << bits) - 1;
  const result = ((a - b) & mask) >>> 0;
  regs.cf = a < b ? 1 : 0; regs.zf = result === 0 ? 1 : 0;
  regs.sf = (result >>> (bits - 1)) & 1;
  regs.of = (((a ^ b) & (a ^ result)) >>> (bits - 1)) & 1;
}
function addSprite(value) {
  const before = regs.ebx >>> 0, result = (before + value) >>> 0;
  regs.ebx = result; regs.cf = result < before ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0; regs.sf = result >>> 31;
  regs.of = (~(before ^ value) & (before ^ result)) >>> 31 & 1;
}
function decrementHeight() {
  const before = regs.eax >>> 8 & 255, result = (before - 1) & 255;
  byte("eax", result, 8); regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 7; regs.of = before === 0x80 ? 1 : 0;
}

// Use the same JS rotation bodies as the bridge. The injected invocation lets
// the oracle compare caller contracts independently of the child painters.
function invokePainter(heap, table, rotation) {
  const cpu = { regs: { ...regs }, eflags: Object.fromEntries(FLAGS.map(f => [f, regs[f.toLowerCase()]])) };
  if (table === 0x431bb8) paintBody431bb8(heap, cpu, rotation);
  else paintBody432204(heap, cpu, rotation, heap.u32(0x628928) !== 0);
  for (const name of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]) regs[name] = cpu.regs[name] >>> 0;
  for (const name of FLAGS) regs[name.toLowerCase()] = cpu.eflags[name];
}

export function FUN_extra_paint_5ddf5d(heap, invoke = invokePainter) {
  const push = value => { regs.esp = (regs.esp - 4) >>> 0; heap.setU32(regs.esp, value); };
  const pop = () => { const value = heap.u32(regs.esp); regs.esp = (regs.esp + 4) >>> 0; return value; };
  const call = (table, ret) => { push(ret); invoke(heap, table, regs.ebp); regs.esp = (regs.esp + 4) >>> 0; };
  const element = regs.esi >>> 0;
  heap.setU8(0x991f78, 5);
  heap.setU32(0x6e1ea4, regs.ecx);
  regs.edi = heap.u8(element + 4);
  const definition = regs.edi, def = DEF_BASE + definition * 8;
  push(element);
  regs.ebx = (heap.u16(def + 6) + (regs.ecx & 0xffff)) & 0xffff;
  if (logic(heap.u16(def) & 1)) {
    byte("eax", 15); byte("ecx", 15);
  } else {
    regs.ecx = logic(((heap.u8(element) >>> 6) + heap.u8(0x991f88)) & 3, 32);
    byte("eax", heap.u8(0x6e2ae0 + regs.ecx * 2));
    byte("ecx", heap.u8(0x6e2ae1 + regs.ecx * 2));
  }
  byte("eax", heap.u8(def + 2), 8);
  compare(regs.eax >>> 8 & 255, 0x80);
  if ((regs.eax >>> 8 & 255) > 0x80) byte("eax", 0x80, 8);
  for (const n of ["eax", "ecx", "edx", "edi"]) push(regs[n]);
  if (logic(heap.u16(def) & 0x20)) {
    byte("ecx", heap.u8(element + 5), 8);
    compare(regs.ecx >>> 8 & 255, 0x28);
    if ((regs.ecx >>> 8 & 255) >= 0x28) {
      addSprite(4); compare(regs.ecx >>> 8 & 255, 0x37);
      if ((regs.ecx >>> 8 & 255) >= 0x37) addSprite(4);
    }
  }
  const paint = (table, ret) => {
    word("edi", 2); word("esi", 2); decrementHeight();
    regs.ebp = heap.u32(0x991f88);
    call(table, ret);
  };
  paint(0x431bb8, 0x5ddff0);
  for (const n of ["edi", "edx", "ecx", "eax"]) regs[n] = pop();
  if (logic(heap.u16(def) & 0x10)) {
    regs.ebx = heap.u32(0x981ef8);
    compare(heap.u16(regs.ebx + 0xe), 0, 16);
    if (regs.zf) {
      push(regs.edi);
      const animate = (base, ret) => {
        regs.ebx = logic((heap.u32(0x88741c) >>> 1) & 15, 32);
        addSprite(base); paint(0x432e90, ret);
      };
      if (definition === 0x56) {
        for (const n of ["eax", "ecx", "edx"]) push(regs[n]);
        animate(0x629f, 0x5de086);
        for (const n of ["edx", "ecx", "eax"]) regs[n] = pop();
        for (const n of ["eax", "ecx", "edx"]) push(regs[n]);
        regs.ebx = heap.u32(0x6e1ea4); addSprite(0x629b); paint(0x432e90, 0x5de0af);
        for (const n of ["edx", "ecx", "eax"]) regs[n] = pop();
        animate(0x62af, 0x5de0da);
      } else if (definition === 0x4f) {
        regs.ebx = logic((heap.u32(0x88741c) >>> 1) & 15, 32); addSprite(0x615f);
        word("edi", 2); word("esi", 2); decrementHeight();
        const edx = regs.edx; push(edx);
        compare(edx & 0xffff, 0x13, 16); word("edx", edx - 0x13);
        regs.ebp = heap.u32(0x991f88); call(0x432e90, 0x5de10a);
        regs.edx = pop();
      } else animate(definition === 0x2b ? 0x615f : 0x6173, definition === 0x2b ? 0x5de136 : 0x5de055);
      regs.edi = pop();
    }
  }
  word("eax", heap.u8(def + 2));
  word("edx", logic(((regs.edx & 0xffff) + (regs.eax & 0xffff) + 15) & 0xfff0));
  const z = regs.edx & 0xffff;
  compare(heap.u16(0x991f28), z, 16);
  if ((regs.sf ^ regs.of) !== 0) { heap.setU16(0x991f28, z); heap.setU8(0x991f2a, 0x20); }
  if (logic(heap.u16(def) & 1)) {
    heap.setU16(0x991f14, 0xffff);
    if (logic(heap.u16(def) & 2)) {
      for (const offset of [0x20, 0x24, 0x18, 0x1c, 8, 0xc, 4, 0x10]) heap.setU16(0x991f00 + offset, 0xffff);
    }
  } else if (logic(heap.u16(def) & 2)) {
    regs.esi = element;
    regs.ecx = logic(((heap.u8(element) >>> 6) + heap.u8(0x991f88)) & 3, 32);
    for (const offset of [[4, 0x18, 0x1c], [0xc, 0x1c, 0x24], [0x10, 0x20, 0x24], [8, 0x20, 0x18]][regs.ecx]) {
      heap.setU16(0x991f00 + offset, 0xffff);
    }
  }
  regs.esi = pop();
  return regs.eax >>> 0;
}
