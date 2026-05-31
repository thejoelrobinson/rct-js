// Validates the lockstep harness's NOVEL mechanics independent of the
// (still-slow) gameplay tick:
//   1. dirty-page snapshot + base64 round-trip reconstructs heap bytes exactly
//      (the capture-lockstep.js page format).
//   2. harness/emulator.js runOriginal accepts init.pages/memSize/stackTop,
//      pads the image past the PE end, and is deterministic across two runs
//      from the same seeded entry-state (the diff-lockstep --self invariant).
//
// End-to-end capture-during-gameplay is deferred until CHUNK 0.3 makes a
// gameplay tick fast enough to reach in-game functions; see the plan.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runOriginal } from "../../harness/emulator.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const PAGE = 0x1000;
const DATA_BIN_LEN = 0x9c4000;
const HEAP_LEN = 0x4ac4000;

function fnv1aBytes(bytes, off, len) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < len; i++) { h ^= bytes[off + i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}

describe("lockstep harness mechanics", () => {
  it("dirty-page snapshot + base64 round-trip reconstructs heap bytes exactly", () => {
    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    // Build a synthetic 'live heap': data.bin below its length, plus a few
    // scattered writes above (mimicking runtime DDraw-surface writes).
    const mem = new Uint8Array(HEAP_LEN);
    mem.set(dataBin, 0);
    const writes = [[0x2428da0, 0xab], [0x2428da1, 0xcd], [0x3000000, 0x7f], [DATA_BIN_LEN + 0x55, 0x42]];
    for (const [a, v] of writes) mem[a] = v;
    // Also flip a byte inside the data.bin region so a "below-ref" page is dirty.
    mem[0x600100] ^= 0xff;

    // Reference page hashes (data.bin below len, zero above) — same as capture.
    const zeroHash = fnv1aBytes(new Uint8Array(PAGE), 0, PAGE);
    const refHash = (p) => {
      const base = p * PAGE;
      if (base >= DATA_BIN_LEN) return zeroHash;
      const tmp = new Uint8Array(PAGE);
      const len = Math.min(PAGE, dataBin.length - base);
      tmp.set(dataBin.subarray(base, base + len), 0);
      return fnv1aBytes(tmp, 0, PAGE);
    };

    // Snapshot dirty pages → {page, base64}.
    const pagePool = new Map();
    const pages = [];
    for (let p = 0; p * PAGE < HEAP_LEN; p++) {
      const base = p * PAGE;
      const h = fnv1aBytes(mem, base, PAGE);
      if (h === refHash(p)) continue;
      pages.push({ page: p, hash: h });
      if (!pagePool.has(h)) pagePool.set(h, Buffer.from(mem.subarray(base, base + PAGE)).toString("base64"));
    }

    // Reconstruct from data.bin + pages and assert byte-equality with the live heap.
    const recon = new Uint8Array(HEAP_LEN);
    recon.set(dataBin, 0);
    for (const { page, hash } of pages) {
      recon.set(Buffer.from(pagePool.get(hash), "base64"), page * PAGE);
    }
    expect(Buffer.compare(Buffer.from(recon), Buffer.from(mem))).toBe(0);
    // Sanity: our 5 writes live in at least 4 distinct dirty pages.
    expect(pages.length).toBeGreaterThanOrEqual(4);
  });

  it("runOriginal honors init.pages/memSize/stackTop and is deterministic", () => {
    // FUN_00401120 is a tiny leaf; without memSize padding it OOBs at 0x9d4000.
    const init = { memSize: HEAP_LEN, stackTop: HEAP_LEN, pages: [], regs: {} };
    const a = runOriginal({ funcAddr: 0x401120, init, returnMemory: true });
    const b = runOriginal({ funcAddr: 0x401120, init, returnMemory: true });
    expect(a.memory.length).toBe(HEAP_LEN); // full padded image returned
    expect((a.regs.eax >>> 0)).toBe((b.regs.eax >>> 0));
    expect(Buffer.compare(Buffer.from(a.memory), Buffer.from(b.memory))).toBe(0);
  });

  it("init.pages overrides image bytes at the right address", () => {
    // Seed a page far above the PE image and confirm runOriginal placed it.
    const pageNo = 0x3000; // 0x3000000
    const bytes = new Uint8Array(PAGE); bytes[0x10] = 0x99; bytes[0x11] = 0x88;
    const init = {
      memSize: HEAP_LEN, stackTop: HEAP_LEN, regs: {},
      pages: [{ page: pageNo, bytes: Buffer.from(bytes).toString("base64") }],
    };
    const r = runOriginal({ funcAddr: 0x401120, init, returnMemory: true });
    expect(r.memory[pageNo * PAGE + 0x10]).toBe(0x99);
    expect(r.memory[pageNo * PAGE + 0x11]).toBe(0x88);
  });
});
