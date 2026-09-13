// Shared x86 register/stack boundary for readable ride-painter bodies.
export function ridePaintContext(heap, cpu, invoke) {
  const r = cpu.regs, f = cpu.eflags;
  const word = (name, value) => { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; };
  const push = value => { r.esp = (r.esp - 4) >>> 0; heap.setU32(r.esp, value); };
  const pop = () => { const v = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0; return v; };
  const logic = (v, bits = 32) => {
    Object.assign(f, { CF: 0, ZF: v === 0 ? 1 : 0, SF: v >>> (bits - 1) & 1, OF: 0 }); return v;
  };
  const compare = (a, b, bits = 32) => {
    const mask = bits === 32 ? 0xffffffff : (1 << bits) - 1, v = ((a - b) & mask) >>> 0;
    Object.assign(f, { CF: a < b ? 1 : 0, ZF: v === 0 ? 1 : 0, SF: v >>> (bits - 1) & 1, OF: ((a ^ b) & (a ^ v)) >>> (bits - 1) & 1 });
  };
  const addWord = (name, value) => {
    const a = r[name] & 65535, v = (a + value) & 65535; word(name, v);
    Object.assign(f, { CF: a + value > 65535 ? 1 : 0, ZF: v === 0 ? 1 : 0, SF: v >>> 15, OF: (~(a ^ value) & (a ^ v)) >>> 15 & 1 });
  };
  const savedNames = ["eax", "ecx", "edx", "edi", "esi", "ebp"];
  const save = () => { for (const name of savedNames) push(r[name]); };
  const restore = () => { for (let i = savedNames.length - 1; i >= 0; i--) r[savedNames[i]] = pop(); };
  const paint = (table, ret) => {
    r.eax = ((r.eax & 0xffff00ff) | 0x3000) >>> 0;
    r.ebp = heap.u32(0x991f88); push(ret);
    invoke(heap, cpu, table, r.ebp); r.esp = (r.esp + 4) >>> 0;
  };
  return { r, f, word, push, pop, logic, compare, addWord, save, restore, paint };
}
