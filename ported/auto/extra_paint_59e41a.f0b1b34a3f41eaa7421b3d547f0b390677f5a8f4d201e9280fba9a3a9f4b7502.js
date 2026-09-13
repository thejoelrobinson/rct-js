// @manual — do not regenerate. Rotating ride body with independently colored
// passenger pairs, original 0x59e41a..0x59e5ce. Element pointer is at [ESP+4].
import { paintBody432204 } from "./extra_paint_432204.js";
import { ridePaintContext } from "./ride-paint-context.js";
export function paintRotatingRide59e41a(heap, cpu, invoke = (h, c, table, rotation) => paintBody432204(h, c, rotation, table === 0x432e90 && h.u32(0x628928) !== 0)) {
  const { r, f, word, push, pop, logic, compare, addWord, save, restore, paint } = ridePaintContext(heap, cpu, invoke);
  push(heap.u32(0x991f80)); push(r.edx); addWord("edx", 7);
  r.esi = heap.u32(r.esp + 12); r.ebp = heap.u8(r.esi + 7) * 0x260; r.ebx = 0xffffffff;
  if (heap.u16(r.ebp + 0x887422) & 1) {
    r.ebx = heap.i16(r.ebp + 0x88747e) >>> 0;
    if (r.ebx !== 0xffffffff) {
      r.ebx = (r.ebx & 65535) * 256 + 0x743b94;
      heap.setU8(0x991f78, 2); heap.setU32(0x991f80, r.ebx);
    }
  }
  heap.setU32(0x651d20, r.edi); r.edi = Math.imul(r.edi, 88) >>> 0;
  if (r.edi >= 216) r.edi = (r.edi - 216) >>> 0;
  if (r.ebx !== 0xffffffff) {
    r.esi = (heap.u8(r.ebx + 0x1e) >>> 3) << 4;
    r.edi = (r.edi + r.esi) >>> 0; r.ebx = heap.u8(r.ebx + 0x1f);
    r.edi = ((r.edi + r.ebx) >>> 0) % 216;
  }
  heap.setU32(0x651d24, r.edi); push(r.eax); push(r.ecx);
  if ((r.edi & 65535) >= 24 * 256) throw new Error("rotating ride DIV quotient overflow");
  r.ebx = (r.edi & 65535) % 24;
  r.ecx = heap.u8(r.ebp + 0x887426) << 17 >>> 0;
  r.eax = heap.u8(r.ebp + 0x887427) << 24 >>> 0;
  r.eax = (r.eax | r.ecx) >>> 0; r.ebx = (r.ebx | r.eax) >>> 0;
  r.ecx = pop(); r.eax = pop(); r.ebx = (r.ebx + 0xa0008c08) >>> 0;
  word("edi", r.eax << 24 >> 24); word("esi", r.ecx << 24 >> 24);
  addWord("edi", 16); addWord("esi", 16);
  heap.setU16(0x99a4e8, r.edi); heap.setU16(0x99a4ea, r.esi);
  word("edi", 24); word("esi", 24); heap.setU16(0x99a4ec, r.edx);
  save(); paint(0x432204, 0x59e51a);
  r.ebp = heap.u32(0x981ef8); compare(heap.u16(r.ebp + 0xe), 1, 16); restore();
  if (f.CF && logic(heap.u16(r.ebp + 0x887422) & 1, 16)) {
    word("ebp", heap.u16(r.ebp + 0x88747e)); compare(r.ebp & 65535, 65535, 16);
    if (!f.ZF) {
      r.ebp = (r.ebp & 65535) * 256 + 0x743b94; r.ebx = 0;
      for (;;) {
        compare(r.ebx & 255, heap.u8(r.ebp + 0xb3), 8);
        if (!f.CF) break;
        // This painter additionally preserves EBX, its passenger loop index.
        push(r.eax); push(r.ebx); push(r.ecx); push(r.edx); push(r.edi); push(r.esi); push(r.ebp);
        r.ebp = (r.ebp + r.ebx) >>> 0;
        r.ebx = (Math.imul(r.ebx, 12) + heap.u32(0x651d24)) >>> 0;
        if (r.ebx >= 216) r.ebx = (r.ebx - 216) >>> 0;
        r.ebx = (r.ebx + 0xa0008c20) >>> 0; push(r.eax); push(r.ecx);
        r.ecx = heap.u8(r.ebp + 0x92) << 17 >>> 0; r.eax = heap.u8(r.ebp + 0x93) << 24 >>> 0;
        r.eax = (r.eax | r.ecx) >>> 0; r.ebx = logic((r.ebx | r.eax) >>> 0);
        r.ecx = pop(); r.eax = pop(); paint(0x432e90, 0x59e5b4);
        r.ebp = pop(); r.esi = pop(); r.edi = pop(); r.edx = pop(); r.ecx = pop(); r.ebx = pop(); r.eax = pop();
        r.ebx = (r.ebx + 2) >>> 0;
      }
    }
  }
  r.edx = pop(); heap.setU32(0x991f80, pop()); heap.setU8(0x991f78, 3);
}
export function installRotatingRide59e41a(heap, setEipHook, getEipHook, clearEipHook, step) {
  const address = 0x59e41a, flag = "__forceInterp59e41a";
  (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, flag);
  setEipHook(address, cpu => {
    if (globalThis[flag] || globalThis.__jsPaint === false) {
      const hook = getEipHook(address); clearEipHook(address);
      try {
        let steps = 0;
        do { if (!step(cpu) || ++steps > 100000) throw new Error("rotating ride painter failed to return"); } while (cpu.regs.eip !== 0x59e5ce);
      } finally { setEipHook(address, hook); }
    } else paintRotatingRide59e41a(heap, cpu);
  });
}
