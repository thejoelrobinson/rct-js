// @manual — do not regenerate.
// Wall-painter tail, 0x447bcc..0x447e44 (also entered through three POPs at
// 0x447bc9). Tunnel markers, vertical supports and support exclusion masks.
import { paintSupports4238b4 } from "./extra_paint_4238b4.js";
import { runFunction } from "../../harness/x86.js";
const invokeSupports = (heap, cpu) => paintSupports4238b4(heap, cpu, runFunction);
function logic(cpu, value, bits = 16) {
  Object.assign(cpu.eflags, { CF: 0, ZF: value === 0 ? 1 : 0, SF: value >>> (bits - 1) & 1, OF: 0 });
  return value;
}
function compare(cpu, a, b, bits = 16) {
  const result = (a - b) & (bits === 8 ? 255 : 65535);
  Object.assign(cpu.eflags, { CF: a < b ? 1 : 0, ZF: result === 0 ? 1 : 0, SF: result >>> (bits - 1),
    OF: ((a ^ b) & (a ^ result)) >>> (bits - 1) & 1 });
}
export function paintWallTail447bcc(heap, cpu, invoke = invokeSupports) {
  const r = cpu.regs;
  const word = (name, value) => { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; };
  const push = value => { r.esp = (r.esp - 4) >>> 0; heap.setU32(r.esp, value); };
  const pop = () => { const value = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0; return value; };
  if (r.eip === 0x447bc9) { r.esi = pop(); r.ebp = pop(); r.ecx = pop(); }
  r.esi = heap.u32(r.esp);
  const element = r.esi, e4 = heap.u8(element + 4);
  const facing = ((e4 + (r.ecx & 255)) & 3) | (e4 & 4);
  r.ebx = ((r.ebx & 0xffff0000) | ((e4 & 4) << 8) | facing) >>> 0;
  const marker = (base, counter, raised, type) => {
    r.edi = heap.u8(counter);
    const height = (((r.edx & 65535) + (raised ? 16 : 0)) & 65535) >>> 4;
    r.eax = (0xffff0000 | type << 8 | (height & 255)) >>> 0;
    heap.setU32(base + r.edi * 2, r.eax);
    heap.setU8(counter, r.edi + 1);
  };
  if (r.ebp & 2) marker(0x999fdc, 0x99c166, facing === 5, facing !== 5 && (r.ebp & 1) ? 11 : 10);
  if (r.ebp & 4) marker(0x999f9a, 0x99c165, facing === 6, facing !== 6 && (r.ebp & 8) ? 11 : 10);
  r.esi = heap.u32(r.esp);
  push(r.ecx); push(r.ebp);
  r.ebx = ((r.ebx & 0xffffff00) | heap.u8(r.esi + 4)) >>> 0;
  word("eax", 0);
  if (r.ebx & 4) {
    const bl = ((r.ebx & 255) + (r.ecx & 255)) & 255;
    word("ebx", bl & 3); word("eax", (r.ebx & 65535) + 0x19);
  }
  r.ebx = r.ebp & 15;
  const support = heap.u8(0x630c42 + r.ebx);
  compare(cpu, support, 0, 8);
  r.edi = support ? 1 : 0; r.ebp = 0x20260000;
  push(support ? 0x447d1b : 0x447d2c);
  invoke(heap, cpu); r.esp = (r.esp + 4) >>> 0;
  r.ebp = pop(); r.ecx = pop(); r.esi = heap.u32(r.esp);
  word("eax", heap.u16(0x991f72)); word("ebx", (r.edx & 65535) >>> 2);
  word("ecx", heap.u16(0x991f76)); word("edx", r.edx + 32);
  if (heap.u8(r.esi + 4) & 4) word("edx", r.edx + 16);
  compare(cpu, heap.u16(0x991f28), r.edx & 65535);
  if (cpu.eflags.SF ^ cpu.eflags.OF) { heap.setU16(0x991f28, r.edx); heap.setU8(0x991f2a, 0x20); }
  let offsets;
  if (!logic(cpu, heap.u8(r.esi + 4) & 0xf0, 8)) offsets = [0x14, 0x18, 0x1c, 0x20, 0x24, 4, 0x10, 8, 0xc];
  else {
    compare(cpu, heap.u8(r.esi + 6), 255, 8);
    if (cpu.eflags.ZF) offsets = [0x18, 0x1c, 0x20, 0x24];
    else if (logic(cpu, heap.u16(0x630c40) & 1)) offsets = [0x14, 0x18, 0x1c, 0x20, 0x24, 4, 0x10, 8, 0xc];
    else {
      offsets = [0x14];
      for (const [bit, offset] of [[1, 0x1c], [2, 0x24], [4, 0x20], [8, 0x18]]) {
        if (logic(cpu, r.ebp & bit)) offsets.push(offset);
      }
    }
  }
  for (const offset of offsets) heap.setU16(0x991f00 + offset, 65535);
  r.esi = pop();
  // Caller/hook performs the final RET.
}
export function installWallTail447bcc(heap, setEipHook, getEipHook, clearEipHook, step) {
  const entries = [0x447bc9, 0x447bcc];
  for (const address of entries) {
    (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, "__forceInterp447bcc");
    setEipHook(address, cpu => {
      if (globalThis.__forceInterp447bcc || globalThis.__forceInterp444e08 || globalThis.__jsPaint === false) {
        const hooks = entries.map(getEipHook); entries.forEach(clearEipHook);
        try {
          let steps = 0;
          while (![0x447dd3, 0x447df9, 0x447e44].includes(cpu.regs.eip)) {
            if (!step(cpu) || ++steps > 100000) throw new Error("wall-tail interpreter failed to return");
          }
        } finally { entries.forEach((entry, i) => setEipHook(entry, hooks[i])); }
      } else paintWallTail447bcc(heap, cpu);
    });
  }
}
