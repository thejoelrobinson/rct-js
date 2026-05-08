// Validate SIB addressing by crafting a synthetic function in memory and
// running the interpreter on it. This is a harness-level test — it does not
// port an RCT function; it proves the interpreter implements SIB correctly.

import { describe, it, expect } from "vitest";
import { loadPE } from "../harness/loader-node.js";
import { makeCpu, runFunction } from "../harness/x86.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

// Helpers — write specific opcode sequences into a scratch memory region.
function setupMem(extraSize = 0x10000) {
  const image = loadPE(RCT_EXE);
  const stack = 0x10000;
  const total = image.totalSize + stack + extraSize;
  const memory = new Uint8Array(total);
  memory.set(image.memory, 0);
  return { memory, stackTop: image.totalSize + stack, scratchBase: image.totalSize + stack };
}

function writeBytes(mem, addr, ...bytes) {
  for (let i = 0; i < bytes.length; i++) mem[addr + i] = bytes[i];
}

describe("SIB addressing", () => {
  it("mov eax, [4*ecx + 0x6e0000]   ← SIB load with scale=4", () => {
    const { memory, stackTop, scratchBase } = setupMem();
    const codeAddr = scratchBase + 0x100;
    const tableAddr = 0x6e0000; // inside loaded image but past CODESEG

    // Set table[3] = 0xcafebabe (4-byte entry).
    const idx = 3;
    const entryAddr = tableAddr + idx * 4;
    memory[entryAddr]     = 0xbe;
    memory[entryAddr + 1] = 0xba;
    memory[entryAddr + 2] = 0xfe;
    memory[entryAddr + 3] = 0xca;

    // Encode: mov eax, [4*ecx + 0x6e0000]
    //   8b 04 8d  00 00 6e 00         (8b = mov r32,r/m32; modrm=0x04 mod=00 reg=eax rm=4 → SIB; sib=0x8d scale=2(×4) index=ecx base=5(=disp32 since mod=0); disp32=0x006e0000)
    //   c3                            (ret)
    writeBytes(memory, codeAddr, 0x8b, 0x04, 0x8d, 0x00, 0x00, 0x6e, 0x00, 0xc3);

    const cpu = makeCpu(memory);
    cpu.regs.ecx = idx;
    runFunction(cpu, codeAddr, { stackTop });
    expect(cpu.regs.eax >>> 0).toBe(0xcafebabe);
  });

  it("mov [esi + 4*eax], ebx   ← SIB store with base+index*4 (no disp)", () => {
    const { memory, stackTop, scratchBase } = setupMem();
    const codeAddr = scratchBase + 0x200;
    const baseAddr = scratchBase + 0x1000; // big scratch buffer

    // Encode: mov [esi + 4*eax], ebx
    //   89 1c 86         (89 = mov r/m32,r32; modrm=0x1c mod=00 reg=ebx rm=4→SIB; sib=0x86 scale=2(×4) index=eax base=esi)
    //   c3
    writeBytes(memory, codeAddr, 0x89, 0x1c, 0x86, 0xc3);

    const cpu = makeCpu(memory);
    cpu.regs.esi = baseAddr;
    cpu.regs.eax = 7;          // index
    cpu.regs.ebx = 0x12345678; // value to store
    runFunction(cpu, codeAddr, { stackTop });

    const stored =
      (memory[baseAddr + 28]) |
      (memory[baseAddr + 29] << 8) |
      (memory[baseAddr + 30] << 16) |
      (memory[baseAddr + 31] << 24);
    expect(stored >>> 0).toBe(0x12345678);
  });

  it("lea eax, [2*ecx + ebp]   ← LEA computes address arithmetic only", () => {
    const { memory, stackTop, scratchBase } = setupMem();
    const codeAddr = scratchBase + 0x300;

    // lea eax, [2*ecx + ebp]
    //   8d 04 4d         (modrm=0x04 mod=00 reg=eax rm=4→SIB; sib=0x4d scale=1(×2) index=ecx base=ebp)
    // Wait: mod=0 with base=5(ebp) means disp32 instead. Use mod=01 with disp8=0 to mean "base=ebp + 0"
    //   8d 44 4d 00      (modrm=0x44 mod=01 reg=eax rm=4→SIB; sib=0x4d scale=1(×2) index=ecx base=ebp; disp8=0)
    //   c3
    writeBytes(memory, codeAddr, 0x8d, 0x44, 0x4d, 0x00, 0xc3);

    const cpu = makeCpu(memory);
    cpu.regs.ecx = 100;
    cpu.regs.ebp = 50;
    runFunction(cpu, codeAddr, { stackTop });
    expect(cpu.regs.eax >>> 0).toBe(250); // 2*100 + 50
  });
});
