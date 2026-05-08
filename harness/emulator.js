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

export function runOriginal({ funcAddr, init = {}, observe = [] }) {
  const image = getImage();

  // Allocate a buffer large enough to hold the image plus a stack region at
  // the end. Memory is addressed by absolute virtual address.
  const stackBase = image.totalSize;
  const totalSize = stackBase + STACK_SIZE;

  const memory = new Uint8Array(totalSize);
  memory.set(image.memory, 0);

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

  const stackTop = stackBase + STACK_SIZE;
  const steps = runFunction(cpu, funcAddr, { stackTop });

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
  };
}
