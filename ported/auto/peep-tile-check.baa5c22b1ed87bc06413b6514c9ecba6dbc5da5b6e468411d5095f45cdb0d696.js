// @manual — do not regenerate. 0x439219 peep tile validation. A missing tile
// resumes at the original detach/reattach calls, whose ports are not yet exact.
export function checkPeepTile439219(heap, cpu) {
  const r = cpu.regs, f = cpu.eflags;
  const word = (name, value) => { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; };
  const byte = (name, value, shift = 0) => { r[name] = ((r[name] & ~(255 << shift)) | ((value & 255) << shift)) >>> 0; };
  const compare = (a, b) => {
    const v = (a - b) & 255;
    Object.assign(f, { CF: a < b ? 1 : 0, ZF: v === 0 ? 1 : 0, SF: v >>> 7, OF: ((a ^ b) & (a ^ v)) >>> 7 & 1 });
  };
  heap.setU8(r.esi + 0xc4, heap.u8(r.esi + 0xc4) + 1);
  word("eax", heap.u16(r.esi + 0xa)); byte("eax", r.eax & 15);
  byte("ebx", heap.u8(r.esi + 0xc4) & 15);
  compare(r.eax & 255, r.ebx & 255);
  if (!f.ZF) { r.eip = 0x439232; return; }
  word("eax", heap.u16(r.esi + 0x24)); word("ecx", heap.u16(r.esi + 0x26));
  byte("edx", heap.u8(r.esi + 0x28));
  let cell = ((r.ecx << 7) | ((r.ecx & 65535) >>> 9)) & 65535;
  cell |= r.eax & 65535; cell = ((cell >>> 5) | (cell << 11)) & 65535;
  word("ecx", cell); r.edi = heap.u32(0x971ef4 + cell * 4);
  byte("ebx", heap.u8(r.esi + 0x29) & 0x18 ? 0 : 4);
  for (;;) {
    byte("edx", heap.u8(r.edi) & 0x3c, 8);
    if ((r.edx >>> 8 & 255) === (r.ebx & 255) && (r.edx & 255) === heap.u8(r.edi + 2)) {
      Object.assign(f, { CF: 0, ZF: r.edi === 0 ? 1 : 0, SF: r.edi >>> 31, OF: 0 });
      r.eip = 0x439287; return;
    }
    r.edi = (r.edi + 8) >>> 0;
    const last = heap.u8(r.edi - 7) & 0x80;
    Object.assign(f, { CF: 0, ZF: last === 0 ? 1 : 0, SF: last >>> 7, OF: 0 });
    if (last) { r.eip = 0x439274; return; }
  }
}
export function installPeepTileCheck(heap, setEipHook, getEipHook, clearEipHook, step) {
  const address = 0x439219, flag = "__forceInterp439219";
  (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, flag);
  setEipHook(address, cpu => {
    if (globalThis[flag]) {
      const hook = getEipHook(address); clearEipHook(address);
      try {
        let steps = 0;
        do { if (!step(cpu) || ++steps > 100000) throw new Error("peep tile check failed to finish"); }
        while (![0x439232, 0x439284, 0x439287].includes(cpu.regs.eip));
      } finally { setEipHook(address, hook); }
    } else checkPeepTile439219(heap, cpu);
    if (cpu.regs.eip === 0x439274) {
      // Keep the shared callees and their complete register effects. This
      // tail remains native until detach/reattach are independently validated.
      let steps = 0;
      while (cpu.regs.eip !== 0x439284) {
        if (!step(cpu) || ++steps > 100000) throw new Error("peep tile cleanup failed to return");
      }
    }
  });
}
