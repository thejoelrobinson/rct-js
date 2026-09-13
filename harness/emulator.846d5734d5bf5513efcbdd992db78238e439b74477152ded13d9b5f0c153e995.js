// High-level harness API.
//
// runOriginal({ funcAddr, init, observe }) loads rct.exe, applies caller-
// supplied initial state (registers + memory writes), runs the function on the
// minimal x86 interpreter, and returns the resulting register state plus the
// memory locations the caller asked us to observe.
//
// This is the "ground truth" side of differential testing.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadPE } from "./loader-node.js";
import { makeCpu, runFunction } from "./x86.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

// We cache the loaded image — sections never change. Per-call, we clone
// the memory buffer so each run is hermetic.
let cachedImage = null;
function getImage() {
  if (!cachedImage) cachedImage = loadPE(RCT_EXE);
  return cachedImage;
}

// Carve out a stack region above the loaded image. We pick an address well
// past sizeOfImage, with enough slack that `esp` decrementing for a few
// pushes never collides with anything mapped.
const STACK_SIZE = 0x10000; // 64 KB — far more than we need

export function runOriginal({ funcAddr, init = {}, observe = [], limit, returnMemory = false }) {
  const image = getImage();

  // Allocate a buffer large enough to hold the image plus a stack region at
  // the end. Memory is addressed by absolute virtual address. `init.memSize`
  // lets lockstep callers pad the image up to the runtime heap's full size
  // (the runtime uses a ~64MB heap/stack far past the PE image; without this,
  // any function touching addresses > image.totalSize throws mem32 OOB).
  //
  // We always carve STACK_SIZE of headroom ABOVE the requested stackTop. A
  // cdecl callee reads its args at [esp+4..] which sit just above stackTop;
  // without headroom those reads run off the buffer and throw. The runtime
  // heap doesn't throw there (Heap.u32 returns 0 for OOB), so the interpreter
  // must mirror that — the extra zeroed page makes those arg reads return 0,
  // matching the runtime, instead of aborting.
  const stackBase = image.totalSize;
  const requestedTop = init.stackTop ?? (stackBase + STACK_SIZE);
  const totalSize = Math.max(stackBase + STACK_SIZE, init.memSize || 0, requestedTop) + STACK_SIZE;

  const memory = new Uint8Array(totalSize);
  memory.set(image.memory, 0);

  // Seed full entry-state dirty-page delta (from tools/capture-lockstep.js):
  // every page the runtime had touched at the captured function's entry.
  // Applied before mem32 so explicit scalar overrides still win. Each entry
  // is { page, bytes } with `bytes` a base64 string (or array) up to one page.
  if (init.pages) {
    const PAGE = init.pageSize || 0x1000;
    for (const { page, bytes } of init.pages) {
      const base = (page >>> 0) * PAGE;
      const buf = typeof bytes === "string"
        ? Uint8Array.from(Buffer.from(bytes, "base64"))
        : Uint8Array.from(bytes);
      if (base + buf.length > memory.length) {
        throw new Error(`init.pages: page 0x${page.toString(16)} (@0x${base.toString(16)}) past image end 0x${memory.length.toString(16)}`);
      }
      memory.set(buf, base);
    }
  }

  // Apply caller-supplied memory writes (scalar globals).
  if (init.mem32) {
    for (const [addr, value] of Object.entries(init.mem32)) {
      const a = Number(addr);
      memory[a]     =  value         & 0xff;
      memory[a + 1] = (value >>> 8)  & 0xff;
      memory[a + 2] = (value >>> 16) & 0xff;
      memory[a + 3] = (value >>> 24) & 0xff;
    }
  }

  const cpu = makeCpu(memory);

  // Apply caller-supplied registers.
  if (init.regs) Object.assign(cpu.regs, init.regs);

  // `init.stackTop` lets lockstep match the runtime/painter-bridge stack base
  // (STACK_TOP = heap.byteLength) so captured stack addresses replay 1:1.
  const stackTop = init.stackTop ?? (stackBase + STACK_SIZE);
  const steps = runFunction(cpu, funcAddr, { stackTop, ...(limit !== undefined ? { limit } : {}) });

  // Read back observed memory locations.
  const memOut = {};
  for (const addr of observe) {
    memOut[`0x${addr.toString(16)}`] =
      (memory[addr] | (memory[addr+1] << 8) | (memory[addr+2] << 16) | (memory[addr+3] << 24)) >>> 0;
  }

  return {
    regs: { ...cpu.regs },
    mem32: memOut,
    steps,
    // For void-function diffs: return the post-call memory image so the
    // caller can compare with a baseline. By default the stack region is
    // excluded (only data sections matter for global mutations); lockstep
    // callers that padded with init.memSize get the full padded image so
    // heap-region writes (e.g. DDraw surfaces past the PE image) are visible.
    memory: returnMemory
      ? memory.slice(0, init.memSize ? totalSize - STACK_SIZE : stackBase)
      : undefined,
  };
}
