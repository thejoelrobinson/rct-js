// @manual — do not regenerate.
// Remaining wall-painter prefix/base blocks, transcribed from binary VAs.
// These return a continuation EIP rather than unwinding the enclosing function.
import { WALL_DOORS } from "./wall-door-data.js";
import { paintBody431bb8 } from "./extra_paint_431bb8.js";
import { paintBody432204 } from "./extra_paint_432204.js";
const rol16 = (value, count) => { count &= 15; return ((value << count) | (value >>> ((16 - count) & 15))) & 65535; };
const ror16 = (value, count) => rol16(value, 16 - (count & 15));
function context(heap, cpu) {
  const r = cpu.regs, f = cpu.eflags;
  return {
    r, f,
    word(name, value) { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; },
    byte(name, value) { r[name] = ((r[name] & 0xffffff00) | (value & 255)) >>> 0; },
    push(value) { r.esp = (r.esp - 4) >>> 0; heap.setU32(r.esp, value); },
    pop() { const value = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0; return value; },
    logic(value, bits = 16) {
      Object.assign(f, { CF: 0, ZF: value === 0 ? 1 : 0, SF: value >>> (bits - 1) & 1, OF: 0 }); return value;
    },
    compare(a, b, bits = 16) {
      const value = (a - b) & (bits === 8 ? 255 : 65535);
      Object.assign(f, { CF: a < b ? 1 : 0, ZF: value === 0 ? 1 : 0,
        SF: value >>> (bits - 1), OF: ((a ^ b) & (a ^ value)) >>> (bits - 1) & 1 });
    },
    add32(name, value) {
      const left = r[name] >>> 0, result = (left + value) >>> 0; r[name] = result;
      Object.assign(f, { CF: result < left ? 1 : 0, ZF: result === 0 ? 1 : 0, SF: result >>> 31,
        OF: (~(left ^ value) & (left ^ result)) >>> 31 & 1 });
    },
  };
}
function invokePainter(heap, cpu, table, rotation) {
  if (table === 0x431bb8) paintBody431bb8(heap, cpu, rotation);
  else paintBody432204(heap, cpu, rotation, table === 0x432e90 && heap.u32(0x628928) !== 0);
}
export function paintWallPrefix444e0f(heap, cpu, invoke = invokePainter) {
  const { r, word, byte, push, pop, logic, compare, add32 } = context(heap, cpu);
  heap.setU16(0x630c40, 0);
  word("eax", heap.u16(0x991f72)); word("ebx", (r.edx & 65535) >>> 2);
  r.edi = heap.u32(0x971ef4 + ror16(rol16(heap.u16(0x991f76), 7) | (r.eax & 65535), 5) * 4);
  while (heap.u8(r.edi) & 0x3c) r.edi = (r.edi + 8) >>> 0;
  let mismatch = (r.ebx & 255) !== heap.u8(r.edi + 2);
  if (!mismatch) {
    if (heap.u8(r.esi + 4) & 4) {
      byte("ebx", heap.u8(r.esi + 4)); byte("eax", heap.u8(r.edi + 4));
      r.ebx &= 3; byte("eax", r.eax & 31);
      mismatch = (r.eax & 255) !== heap.u8(0x630b41 + r.ebx);
    } else mismatch = (heap.u8(r.edi + 4) & 31) !== 0;
  }
  if (mismatch) heap.setU16(0x630c40, heap.u16(0x630c40) | 1);
  if (logic(heap.u16(0x991f8c) & 0x40)) {
    r.edi = heap.u32(0x981ef8); compare(heap.u16(r.edi + 0xe), 0);
    if (cpu.eflags.ZF) {
      push(r.ecx); push(r.edx); push(r.esi);
      r.edx = heap.u8(r.esi + 2) * 4;
      if (heap.u8(r.esi + 4) & 4) r.edx += 8;
      r.edx += 3; r.ebx = r.edx >>> 4; add32("ebx", 0x20026353);
      word("eax", 0x10); byte("ecx", 0x10); word("edi", 1); word("esi", 1);
      r.ebp = heap.u32(0x991f88); push(0x444ed0);
      invoke(heap, cpu, 0x431bb8, r.ebp); r.esp += 4;
      r.esi = pop(); r.edx = pop(); r.ecx = pop();
    }
  }
  r.eip = 0x444ed3;
}

export function paintWallBase444ed3(heap, cpu, invoke = invokePainter) {
  const { r, word, byte, push, pop, logic, compare } = context(heap, cpu);
  r.ebp = heap.u16(r.esi + 4) & 0xf0;
  push(r.esi); push(r.ecx); r.ebp >>>= 4;
  const e6 = heap.u8(r.esi + 6), rotation = r.ecx & 255;
  r.eax = rol16(e6 | ((e6 << 4) & 255) << 8, rotation) & 15;
  r.edi = r.eax;
  r.eax = heap.u32(0x630b48 + r.edi * 8); r.ebx = heap.u32(0x630b4c + r.edi * 8);
  heap.setU32(0x99a4e8, r.eax); heap.setU32(0x630b2c, r.ebx);
  word("eax", rol16(e6 | (e6 >>> 4) << 8, rotation) >>> 4 & 0xf0);
  word("edi", r.edi | r.eax);
  if (heap.u8(r.esi + 4) & 4) r.ebx = ((heap.u8(r.esi + 4) + r.ecx) & 3) + 0x10;
  else r.ebx = heap.u8(0x6309c0 + r.edi);
  push(r.edi); r.ebp <<= 1;
  if (heap.u16(0x991f8c) & 1) {
    while (heap.u8(r.esi) & 0x3c) {
      r.esi += 8;
      if (heap.u8(r.esi - 7) & 0x80) { r.ebp++; break; }
    }
  }
  r.ebx = (r.ebx + heap.u32(0x630acc + r.ebp * 4)) >>> 0;
  if (!(heap.u16(0x991f84) & 1)) { heap.setU32(0x99a4e8, 0x30003); heap.setU32(0x630b2c, 0x1a001a); }
  let overlay = !!logic(heap.u16(0x630c40) & 1);
  if (overlay) overlay = !!logic(heap.u16(0x991f84) & 1);
  if (overlay) overlay = !logic(heap.u16(0x991f8c) & 1);
  if (overlay) { r.edi = heap.u32(0x981ef8); compare(heap.u16(r.edi + 0xe), 0); overlay = !!cpu.eflags.ZF; }
  const paint = (table, returnAddress) => {
    word("eax", 0); byte("ecx", 0); word("edi", heap.u16(0x630b2c)); word("esi", heap.u16(0x630b2e));
    const raised = ((r.edx & 65535) + 1) & 65535;
    heap.setU16(0x99a4ec, raised); compare(raised, 1);
    r.ebp = heap.u32(0x991f88); push(returnAddress);
    invoke(heap, cpu, table, r.ebp); r.esp += 4;
  };
  if (overlay) {
    push(r.ebx); r.esi = heap.u32(r.esp + 0xc);
    const slope = !!(heap.u8(r.esi + 4) & 4);
    r.ebx = slope ? ((heap.u8(r.esi + 4) + heap.u8(r.esp + 8)) & 3) + 0x2026588b
      : heap.u8(0x630c42 + (heap.u32(r.esp + 4) & 15)) + 0x20265889;
    paint(0x432204, slope ? 0x445080 : 0x44500a);
    r.ebx = pop(); paint(0x432e90, slope ? 0x4450b1 : 0x44503b);
  } else paint(0x432204, 0x4450e3);
  r.ebp = pop(); r.ecx = pop(); r.edi = heap.u32(0x981ef8);
  const zoom = heap.u16(r.edi + 0xe); compare(zoom, 1);
  if (zoom > 1) { r.eip = 0x447bcc; return; }
  heap.setU8(0x991f78, 7); r.esi = heap.u32(r.esp);
  byte("ebx", heap.u8(r.esi + 5)); r.ebx = logic(r.ebx & 15, 32);
  r.eip = heap.u32(0x445110 + r.ebx * 4);
}

// Twelve door variants use the same four-side template. The extraction tool
// verifies the entire binary sequence before emitting the constants below.
export function paintDoorVariants(heap, cpu, invoke = invokePainter) {
  const { r, word, byte, push, pop, logic, compare } = context(heap, cpu);
  const config = WALL_DOORS[r.eip];
  if (!config) throw new Error(`unknown door variant 0x${r.eip.toString(16)}`);
  if (config.outer) push(r.ecx);
  for (let side = 0; side < 4; side++) {
    if (logic(r.ebp & (1 << side), 32)) continue;
    if (!config.outer) push(r.ecx);
    push(r.edx); push(r.esi); push(r.ebp);
    const [sprite, x, y, width, depth, height, boundX, boundY, slope, animationMask, returnAddress] = config.rows[side];
    if (slope && (heap.u8(r.esi + 4) & 4)) word("edx", r.edx + 8);
    r.ebx = sprite;
    if (animationMask) {
      const amount = ((r.ecx & 7) * 2) & 7, source = heap.u8(r.esi + 7);
      const rotated = ((source << amount) | (source >>> ((8 - amount) & 7))) & 255;
      if (!(rotated & animationMask)) r.ebx += 4;
    }
    word("eax", height << 8 | x); byte("ecx", y); word("edi", width); word("esi", depth);
    heap.setU16(0x99a4e8, boundX); heap.setU16(0x99a4ea, boundY);
    const raised = ((r.edx & 65535) + 2) & 65535;
    heap.setU16(0x99a4ec, raised); compare(raised, 2);
    r.ebp = heap.u32(0x991f88); push(returnAddress);
    invoke(heap, cpu, 0x432204, r.ebp); r.esp += 4;
    r.ebp = pop(); r.esi = pop(); r.edx = pop();
    if (!config.outer) r.ecx = pop();
  }
  if (config.outer) r.ecx = pop();
  r.eip = 0x44635d;
}
export function paintWallDetailDispatch(heap, cpu) {
  const { r, push, logic, compare } = context(heap, cpu);
  if (r.eip === 0x44635d) {
    heap.setU8(0x991f78, 6); r.edi = heap.u32(0x981ef8);
    const zoom = heap.u16(r.edi + 0xe); compare(zoom, 1);
    if (zoom > 1) { r.eip = 0x447bcc; return; }
  }
  if (r.eip !== 0x446de9) {
    r.esi = heap.u32(r.esp);
    if (!logic(heap.u8(r.esi + 4) & 0xf0, 8)) { r.eip = 0x446382; return; }
  }
  if (!logic(heap.u16(0x991f84) & 1)) { r.eip = 0x447bcc; return; }
  push(r.ecx); push(r.ebp); push(r.esi);
  r.eip = logic(heap.u16(0x630c40) & 1) ? 0x446e0a : 0x447bc9;
}

export function installWallPaintBlocks(heap, setEipHook, getEipHook, clearEipHook, step) {
  const blocks = [
    ...Object.keys(WALL_DOORS).map(address => [Number(address), paintDoorVariants, () => [0x44635d]]),
    ...[0x44635d, 0x446375, 0x446de9].map(address => [address, paintWallDetailDispatch, () => [0x446382, 0x447bcc, 0x447bc9, 0x446e0a]]),
    [0x444e0f, paintWallPrefix444e0f, () => [0x444ed3]],
    [0x444ed3, paintWallBase444ed3, () => [0x447bcc, ...Array.from({ length: 16 }, (_, i) => heap.u32(0x445110 + i * 4))]]];
  for (const [address, body, endpoints] of blocks) {
    const flag = `__forceInterp${address.toString(16)}`;
    (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, flag);
    setEipHook(address, cpu => {
      if (globalThis[flag] || globalThis.__forceInterp444e08 || globalThis.__jsPaint === false) {
        const hook = getEipHook(address); clearEipHook(address);
        const ends = endpoints();
        try {
          let steps = 0;
          do { if (!step(cpu) || ++steps > 100000) throw new Error(`wall block 0x${address.toString(16)} failed to finish`); }
          while (!ends.includes(cpu.regs.eip));
        } finally { setEipHook(address, hook); }
      } else body(heap, cpu);
      cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
      heap.setU32(cpu.regs.esp, cpu.regs.eip); cpu.callDepth++;
    });
  }
}
