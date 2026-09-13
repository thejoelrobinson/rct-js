// @manual — do not regenerate.
// Four door-frame sprites, 0x446240..0x446374. A basic-block port: EIP is
// returned at the real continuation, and the caller's existing stack survives.
import { paintBody432204 } from "./extra_paint_432204.js";

function subtractFlags(cpu, left, right) {
  const value = (left - right) & 65535;
  Object.assign(cpu.eflags, { CF: left < right ? 1 : 0, ZF: value === 0 ? 1 : 0,
    SF: value >>> 15, OF: ((left ^ right) & (left ^ value)) >>> 15 & 1 });
}
export function paintDoorFrame446240(heap, cpu, invoke = (h, c, rotation) => paintBody432204(h, c, rotation)) {
  const r = cpu.regs;
  const zoom = heap.u16(r.edi + 0xe);
  subtractFlags(cpu, zoom, 0);
  if (zoom !== 0) { r.eip = 0x447bcc; return; }
  const push = value => { r.esp = (r.esp - 4) >>> 0; heap.setU32(r.esp, value); };
  const pop = () => { const value = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0; return value; };
  const word = (name, value) => { r[name] = ((r[name] & 0xffff0000) | (value & 65535)) >>> 0; };
  push(r.ecx); push(r.esi); push(r.ebp); push(r.edx);
  const corners = [[3, 3], [3, 29], [29, 29], [29, 3]];
  const returns = [0x446290, 0x4462d3, 0x446316, 0x446359];
  for (let i = 0; i < 4; i++) {
    if (i) push(r.edx);
    r.ebx = 0x5727 + i; word("eax", 0x200);
    r.ecx = (r.ecx & 0xffffff00) >>> 0;
    word("edi", 1); word("esi", 1);
    heap.setU16(0x99a4e8, corners[i][0]); heap.setU16(0x99a4ea, corners[i][1]);
    const raised = ((r.edx & 65535) + 2) & 65535;
    heap.setU16(0x99a4ec, raised);
    subtractFlags(cpu, raised, 2);
    r.ebp = heap.u32(0x991f88);
    // Preserve CALL's stack footprint, including the stale return-address
    // bytes, for observers and callees that inspect the native frame.
    push(returns[i]); invoke(heap, cpu, r.ebp); r.esp = (r.esp + 4) >>> 0;
    r.edx = pop();
  }
  r.ebp = pop(); r.esi = pop(); r.ecx = pop();
  heap.setU8(0x991f78, 6); r.edi = heap.u32(0x981ef8);
  const finalZoom = heap.u16(r.edi + 0xe);
  subtractFlags(cpu, finalZoom, 1);
  r.eip = finalZoom > 1 ? 0x447bcc : 0x446375;
}

export function installDoorFrame446240(heap, setEipHook, getEipHook, clearEipHook, step) {
  const address = 0x446240;
  (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, "__forceInterp446240");
  setEipHook(address, cpu => {
    if (globalThis.__forceInterp446240 || globalThis.__forceInterp444e08 || globalThis.__jsPaint === false) {
      const hook = getEipHook(address); clearEipHook(address);
      try {
        let steps = 0;
        do {
          if (!step(cpu) || ++steps > 100000) throw new Error("door-frame interpreter did not reach its continuation");
        } while (cpu.regs.eip !== 0x446375 && cpu.regs.eip !== 0x447bcc);
      } finally { setEipHook(address, hook); }
    } else paintDoorFrame446240(heap, cpu);
    // EIP hooks simulate RET. Supply the continuation as that RET's target;
    // balance its callDepth decrement because this is a block, not a CALL.
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    heap.setU32(cpu.regs.esp, cpu.regs.eip);
    cpu.callDepth++;
  });
}
