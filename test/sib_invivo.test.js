// In-vivo SIB test: execute a real SIB instruction from FUN_004314c5 against
// the original binary bytes, with controlled inputs. Validates SIB decoding
// works on Sawyer's actual code (not just synthetic encodings).
//
// The instruction sequence we exercise is a fragment of FUN_004314c5:
//   movzx ebx, byte [0x87c3d7]           ; ebx = byte at global
//   mov   ebx, [4*ebx + 0x5f96a4]        ; ebx = table[ebx]   ← SIB
//   sar   ebx, 2                          ; ebx /= 4 (signed)
//   ret
//
// This is an excerpt — we artificially `ret` after the sar by overlaying a
// 0xc3 byte into a scratch copy of the binary's memory, then executing from
// 0x4314cf. The real function continues with a `call`, but for our purpose
// we just want to verify the SIB load lands the right table entry.

import { describe, it, expect } from "vitest";
import { loadPE } from "../harness/loader-node.js";
import { makeCpu, runFunction } from "../harness/x86.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

const BYTE_GLOBAL_ADDR = 0x87c3d7;
const TABLE_ADDR       = 0x5f96a4;
const FRAGMENT_START   = 0x4314cf; // movzx ebx, byte [0x87c3d7]
const SAR_END          = 0x4314e0; // first byte AFTER the sar (where the call begins)

function setupAndRun({ globalByte, tableEntries }) {
  const image = loadPE(RCT_EXE);
  const stack = 0x10000;
  const memory = new Uint8Array(image.totalSize + stack);
  memory.set(image.memory, 0);

  // Inject our test inputs.
  memory[BYTE_GLOBAL_ADDR] = globalByte & 0xff;
  for (const [idx, val] of Object.entries(tableEntries)) {
    const addr = TABLE_ADDR + Number(idx) * 4;
    memory[addr]     =  val         & 0xff;
    memory[addr + 1] = (val >>> 8)  & 0xff;
    memory[addr + 2] = (val >>> 16) & 0xff;
    memory[addr + 3] = (val >>> 24) & 0xff;
  }
  // Overlay a `ret` (0xc3) where the `call` would start, so we stop after sar.
  memory[SAR_END] = 0xc3;

  const cpu = makeCpu(memory);
  runFunction(cpu, FRAGMENT_START, { stackTop: image.totalSize + stack });
  return cpu.regs.ebx >>> 0;
}

function jsPort(globalByte, tableEntries) {
  const idx = globalByte & 0xff;
  const tableValue = (tableEntries[idx] ?? 0) | 0;   // signed
  return (tableValue >> 2) >>> 0;                    // sar by 2
}

describe("In-vivo SIB exercise (fragment of FUN_004314c5)", () => {
  it("globalByte=0, table[0]=100  →  100>>2 = 25", () => {
    const entries = { 0: 100 };
    expect(setupAndRun({ globalByte: 0, tableEntries: entries }))
      .toBe(jsPort(0, entries));
    expect(setupAndRun({ globalByte: 0, tableEntries: entries })).toBe(25);
  });

  it("globalByte=5, table[5]=0xfffffffc  →  signed -4>>2 = -1", () => {
    const entries = { 5: 0xfffffffc };
    expect(setupAndRun({ globalByte: 5, tableEntries: entries }))
      .toBe(jsPort(5, entries));
    expect(setupAndRun({ globalByte: 5, tableEntries: entries }) | 0).toBe(-1);
  });

  it("varies index across many byte values", () => {
    for (let b = 0; b < 16; b++) {
      const entries = { [b]: (b * 0x10000) >>> 0 };
      const harness = setupAndRun({ globalByte: b, tableEntries: entries });
      const expected = jsPort(b, entries);
      expect(harness, `byte=${b}`).toBe(expected);
    }
  });
});
