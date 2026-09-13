// @manual — do not regenerate. Shared support-exclusion tail, instantiated only
// at the 38 binary-verified copies listed by the extractor.
import { RIDE_SUPPORT_TAILS } from "./ride-support-tail-data.js";
const SEGMENTS = [0x991f20, 0x991f14, 0x991f1c, 0x991f08, 0x991f0c, 0x991f04, 0x991f10, 0x991f18, 0x991f24];
export function finishRideSupports(heap, cpu, height) {
  const r = cpu.regs;
  for (const address of SEGMENTS) heap.setU16(address, 0xffff);
  const raised = ((r.edx & 65535) + height) & 65535;
  r.edx = ((r.edx & 0xffff0000) | raised) >>> 0;
  const previous = heap.u16(0x991f28), result = (previous - raised) & 65535;
  Object.assign(cpu.eflags, { CF: previous < raised ? 1 : 0, ZF: result === 0 ? 1 : 0,
    SF: result >>> 15, OF: ((previous ^ raised) & (previous ^ result)) >>> 15 & 1 });
  if ((previous << 16 >> 16) < (raised << 16 >> 16)) {
    heap.setU16(0x991f28, raised); heap.setU8(0x991f2a, 0x20);
  }
  r.esi = heap.u32(r.esp); r.esp = (r.esp + 4) >>> 0;
}
export function installRideSupportTails(heap, setEipHook, getEipHook, clearEipHook, step) {
  for (const [key, config] of Object.entries(RIDE_SUPPORT_TAILS)) {
    const address = Number(key), flag = "__forceInterpRideSupportTails";
    (globalThis.__jsFnEipHooks || (globalThis.__jsFnEipHooks = new Map())).set(address, flag);
    setEipHook(address, cpu => {
      if (globalThis[flag] || globalThis.__jsPaint === false) {
        const hook = getEipHook(address); clearEipHook(address);
        try {
          let steps = 0;
          do { if (!step(cpu) || ++steps > 25) throw new Error("ride support tail failed to finish"); } while (cpu.regs.eip !== config.ret);
        } finally { setEipHook(address, hook); }
      } else finishRideSupports(heap, cpu, config.height);
    });
  }
}
