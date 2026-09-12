import { configureLiftedRuntime, setLiftedTable } from "../lifter/runtime.js";
import { regs } from "./regs.js";
import { state } from "./win32/context.js";

const RETURN_SENTINEL = 0xdeadbeef >>> 0;
const registerNames = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"];
const flagNames = ["CF", "ZF", "SF", "OF", "DF"];

function write32(memory, address, value) {
  memory[address] = value & 0xff;
  memory[address + 1] = (value >>> 8) & 0xff;
  memory[address + 2] = (value >>> 16) & 0xff;
  memory[address + 3] = (value >>> 24) & 0xff;
}

function makeRuntimeCpu(memory) {
  return {
    regs: { eax: 0, ebx: 0, ecx: 0, edx: 0, esi: 0, edi: 0, esp: 0, ebp: 0, eip: 0 },
    eflags: { CF: 0, ZF: 0, SF: 0, OF: 0, DF: 0 },
    memory,
    callDepth: 0,
    fpu: new Float64Array(8),
    fpuTop: 0,
    fpuTags: 0xffff,
    fpuSw: 0,
    fpuCw: 0x037f,
    fallbackCount: 0,
    trace: null,
  };
}

function invokeLifted(heap, cpu, address, fn, args) {
  for (const name of registerNames) cpu.regs[name] = regs[name] >>> 0;
  cpu.eflags.CF = regs.cf | 0;
  cpu.eflags.ZF = regs.zf | 0;
  cpu.eflags.SF = regs.sf | 0;
  cpu.eflags.OF = regs.of | 0;
  cpu.eflags.DF = regs.df | 0;
  cpu.callDepth = 0;
  cpu.fallbackCount = 0;
  const stackTop = (heap.bytes.byteLength - 0x2000) >>> 0;
  for (let index = 0; index < args.length; index++) write32(heap.bytes, stackTop + index * 4, args[index] >>> 0);
  cpu.regs.esp = (stackTop - 4) >>> 0;
  write32(heap.bytes, cpu.regs.esp, RETURN_SENTINEL);
  cpu.regs.eip = address >>> 0;
  fn(cpu);
  for (const name of registerNames) regs[name] = cpu.regs[name] >>> 0;
  regs.cf = cpu.eflags.CF | 0;
  regs.zf = cpu.eflags.ZF | 0;
  regs.sf = cpu.eflags.SF | 0;
  regs.of = cpu.eflags.OF | 0;
  regs.df = cpu.eflags.DF | 0;
  return regs.eax >>> 0;
}

export function installPromotedLifted(heap, promotedLifted, executionMode = "hybrid") {
  const functions = promotedLifted?.functions || {};
  const entries = promotedLifted?.entries || [];
  setLiftedTable(functions);
  configureLiftedRuntime({ allowInterpreterFallback: false });
  const cpu = makeRuntimeCpu(heap.bytes);
  state.__liftedCpu = cpu;
  state.liftedFallbackCount = 0;
  state.promotedLiftedAddresses = new Set(entries.map((rawAddress) =>
    typeof rawAddress === "string" ? Number.parseInt(rawAddress, 0) >>> 0 : rawAddress >>> 0));
  for (const rawAddress of entries) {
    const address = typeof rawAddress === "string" ? Number.parseInt(rawAddress, 0) >>> 0 : rawAddress >>> 0;
    const fn = functions[address];
    if (typeof fn !== "function") {
      if (executionMode === "pure-js") throw new Error(`promoted lifted function 0x${address.toString(16)} is missing`);
      continue;
    }
    state.fnDispatch.set(address, (runtimeHeap, ...args) => {
      if (globalThis[`__forceInterp${address.toString(16)}`] && executionMode !== "pure-js") {
        const result = state.__callNative(address, args);
        for (const name of flagNames) regs[name.toLowerCase()] = state.__painterCpu.eflags[name] | 0;
        return result;
      }
      if (globalThis.__liftedCalls) globalThis.__liftedCalls.set(address, (globalThis.__liftedCalls.get(address) || 0) + 1);
      try { return invokeLifted(runtimeHeap, cpu, address, fn, args); }
      catch (error) {
        state.liftedFallbackCount++;
        throw error;
      }
    });
  }
  return cpu;
}

export function callPromotedLiftedFromCpu(heap, sourceCpu, rawAddress) {
  const address = rawAddress >>> 0;
  if (!state.promotedLiftedAddresses.has(address)) return false;
  const fn = state.fnDispatch.get(address);
  if (typeof fn !== "function") return false;
  for (const name of registerNames) regs[name] = sourceCpu.regs[name] >>> 0;
  for (const name of flagNames) regs[name.toLowerCase()] = sourceCpu.eflags[name] | 0;
  fn(heap);
  for (const name of registerNames) sourceCpu.regs[name] = regs[name] >>> 0;
  for (const name of flagNames) sourceCpu.eflags[name] = regs[name.toLowerCase()] | 0;
  return true;
}
