// @manual — do not regenerate.
// Misc-sprite subtype 6, 0x42d807..0x42da87: eight directional thin sprites.
// Called inside 0x42d69f after it has already pushed ESI.
import { paintBody432204 } from "./extra_paint_432204.js";
export function paintThinSprite42d807(heap, cpu, invoke = (h, c, rotation) => paintBody432204(h, c, rotation)) {
  const r = cpu.regs;
  const word = (name, value) => { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; };
  r.edi = heap.u32(0x981ef8);
  const zoom = heap.u16(r.edi + 0xe);
  Object.assign(cpu.eflags, { CF: 0, ZF: zoom === 0 ? 1 : 0, SF: zoom >>> 15, OF: 0 });
  if (zoom === 0) {
    word("edx", r.edx + 6);
    r.ebx >>>= 3;
    const direction = r.ebx;
    if (direction > 3) throw new Error(`invalid thin-sprite direction ${direction}`);
    const opposite = ((heap.u8(r.esi + 0x2f) >>> 7) ^ (heap.u8(r.esi + 0x1e) >>> 4 & 1) ^ (direction >>> 1)) & 1;
    const frame = ((direction << 4) + heap.u8(r.esi + 0x27)) & 255;
    r.ebx = frame + 0x9535;
    Object.assign(cpu.eflags, { CF: 0, ZF: 0, SF: 0, OF: 0 }); // ADD EBX,0x9535
    word("eax", 0x300); r.ecx = (r.ecx & 0xffffff00) >>> 0;
    word("edi", direction & 1 ? 1 : 32); word("esi", direction & 1 ? 32 : 1);
    const x = direction & 1 ? (opposite ? -3 : 3) : direction === 0 ? -32 : 0;
    const y = direction & 1 ? (direction === 3 ? -32 : 0) : (opposite ? -3 : 3);
    heap.setU16(0x99a4e8, x); heap.setU16(0x99a4ea, y); heap.setU16(0x99a4ec, r.edx);
    r.ebp = heap.u32(0x991f88);
    r.esp = (r.esp - 4) >>> 0; heap.setU32(r.esp, (opposite ? 0x42d9c0 : 0x42d8a0) + direction * 0x42);
    invoke(heap, cpu, r.ebp); r.esp = (r.esp + 4) >>> 0;
  }
  r.esi = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0;
}
export function installThinSprite42d807(heap, setEipHook, getEipHook, clearEipHook, step) {
  const address = 0x42d807;
  (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, "__forceInterp42d807");
  setEipHook(address, cpu => {
    if (globalThis.__forceInterp42d807 || globalThis.__jsPaint === false || (cpu.regs.ebx >>> 3) > 3) {
      const hook = getEipHook(address); clearEipHook(address);
      const ends = [0x42d6f9, ...[0, 1, 2, 3].flatMap(i => [0x42d8a1 + i * 0x42, 0x42d9c1 + i * 0x42])];
      try {
        let steps = 0;
        do { if (!step(cpu) || ++steps > 100000) throw new Error("thin-sprite interpreter failed to return"); } while (!ends.includes(cpu.regs.eip));
      } finally { setEipHook(address, hook); }
    } else paintThinSprite42d807(heap, cpu);
  });
}
