// @manual — do not regenerate. Animated ride vehicle and eight passenger pairs.
// Original 0x55203e..0x55248b. The caller keeps its tile element at [ESP+4].
import { ridePaintContext } from "./ride-paint-context.js";
import { paintBody432204 } from "./extra_paint_432204.js";
export function paintRideVehicle55203e(heap, cpu, invoke = (h, c, table, rotation) => paintBody432204(h, c, rotation, table === 0x432e90 && h.u32(0x628928) !== 0)) {
  const { r, f, word, push, pop, logic, compare, addWord, save, restore, paint } = ridePaintContext(heap, cpu, invoke);
  push(heap.u32(0x991f80)); push(r.edx); addWord("edx", 7);
  r.esi = heap.u32(r.esp + 12); r.ebp = heap.u8(r.esi + 7) * 0x260;
  r.ebx = 0xffffffff;
  if (heap.u16(r.ebp + 0x887422) & 1) {
    r.ebx = heap.i16(r.ebp + 0x88747e) >>> 0;
    if (r.ebx !== 0xffffffff) {
      r.ebx = (r.ebx & 65535) * 256 + 0x743b94;
      heap.setU8(0x991f78, 2); heap.setU32(0x991f80, r.ebx);
      if ((heap.u16(r.ebp + 0x887422) & 0xc0) && heap.u8(r.ebp + 0x88755c) === 7 && heap.u8(r.ebp + 0x88757c) >= 0x80) {
        push(r.ebx); r.ebx = heap.u16(r.ebx + 0x4c) >>> 1 & 7;
        addWord("edx", heap.u16(0x651be8 + r.ebx * 2)); r.ebx = pop();
      }
    }
  }
  heap.setU32(0x651bc0, r.edi); r.edi = 0;
  if (r.ebx !== 0xffffffff) {
    r.esi = ((heap.u8(r.ebx + 0x1e) >>> 3) + heap.u32(0x991f88)) << 5 >>> 0;
    r.edi = r.esi; r.ebx = heap.u8(r.ebx + 0x1f); r.edi = (r.edi + r.ebx) & 0x7f;
  }
  heap.setU32(0x651bc4, r.edi); r.edi &= 31; r.ebx = 0x8cf8 + r.edi;
  word("edi", r.eax << 24 >> 24); word("esi", r.ecx << 24 >> 24);
  addWord("edi", 16); addWord("esi", 16);
  heap.setU16(0x99a4e8, r.edi); heap.setU16(0x99a4ea, r.esi);
  word("edi", 24); word("esi", 24); heap.setU16(0x99a4ec, r.edx);
  save(); paint(0x432204, 0x552136);
  r.ebp = heap.u32(0x981ef8); compare(heap.u16(r.ebp + 0xe), 1, 16);
  restore();
  if (f.CF) {
    if (logic(heap.u16(r.ebp + 0x887422) & 1, 16)) {
      word("ebp", heap.u16(r.ebp + 0x88747e)); compare(r.ebp & 65535, 65535, 16);
      if (!f.ZF) {
        r.ebp = (r.ebp & 65535) * 256 + 0x743b94;
        for (let pair = 0; pair < 8; pair++) {
          const count = heap.u8(r.ebp + 0xb3); compare(count, pair * 2, 8);
          if (count <= pair * 2) break;
          r.ebx = ((heap.u32(0x651bc4) + heap.u32(0x651bc8 + pair * 4)) & 0x7f) - 13 >>> 0;
          compare(r.ebx, 68);
          if (r.ebx >= 68) continue;
          r.ebx = (r.ebx + 0xa0008d18) >>> 0;
          save(); push(r.eax); push(r.ecx);
          r.ecx = heap.u8(r.ebp + 0x92 + pair * 2) << 17 >>> 0;
          r.eax = heap.u8(r.ebp + 0x93 + pair * 2) << 24 >>> 0;
          r.eax = (r.eax | r.ecx) >>> 0; r.ebx = logic((r.ebx | r.eax) >>> 0);
          r.ecx = pop(); r.eax = pop();
          paint(0x432e90, 0x5521d4 + pair * 0x61 - (pair === 7 ? 4 : 0));
          restore();
        }
      }
    }
  }
  r.edx = pop(); heap.setU32(0x991f80, pop()); heap.setU8(0x991f78, 3);
}
export function installRideVehicle55203e(heap, setEipHook, getEipHook, clearEipHook, step) {
  const address = 0x55203e, flag = "__forceInterp55203e";
  (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, flag);
  setEipHook(address, cpu => {
    if (globalThis[flag] || globalThis.__jsPaint === false) {
      const hook = getEipHook(address); clearEipHook(address);
      try {
        let steps = 0;
        do { if (!step(cpu) || ++steps > 100000) throw new Error("ride vehicle painter failed to return"); } while (cpu.regs.eip !== 0x55248b);
      } finally { setEipHook(address, hook); }
    } else paintRideVehicle55203e(heap, cpu);
  });
}
