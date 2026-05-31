// Phase 3 — proof that the porting method's verification loop works end-to-end
// on a real gameplay function.
//
// 0x43e7ef is a peep-list sweep (atlas-identified; touches Peep.State@0x2b,
// CurrentTrain@0x6a). It walks the peep linked list from the head pointer at
// 0x87c398, following peep.next (the u16 at peep+0x4), and for any peep with
// State==6 whose CurrentTrain matches EDX, calls 3 sub-functions and resets
// State to 0.
//
// We verify the auto-translated JS port matches the ORIGINAL binary (run on the
// in-process x86 interpreter) by comparing WRITE-SETS, not absolute memory: the
// interpreter image is the full PE (code+data) while the ported heap is data.bin
// only, so absolute memory always differs in the code region. We record every
// byte each side writes in the data region [0, 0xa00000) (excludes the stack,
// which legitimately differs) and assert the two write-sets + EAX are equal.
// Entry state is synthesized from the atlas's exact Peep layout + a couple of
// seeded globals — no gameplay tick (sidesteps the painter-perf wall).
//
// HONESTY: the assertions compare PORT vs INTERPRETER only — no hand-computed
// expected values. The interpreter is ground truth.
//
// COVERAGE: scenarios exercise the list-walk + field-read + conditional, but
// NOT the State==6 sub-call branch (needs richer captured state — future work
// via the lockstep harness). A 3rd assertion checks the two scenarios run a
// different number of steps, proving the loop body is actually entered (the
// comparison is non-vacuous).

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runOriginal } from "../../harness/emulator.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const HEAP_LEN = 0x4ac4000;
const DATA_HI = 0x00a00000;
const PEEP_BASE = 0x743b94;
const HEAD = 0x87c398;
const ADDR = 0x43e7ef;

function makeWatch(map) {
  return { lo: 0, hi: DATA_HI, cb: (a, size, value) => {
    for (let i = 0; i < size; i++) map.set((a + i) >>> 0, (value >>> (8 * i)) & 0xff);
  } };
}
function sameWrites(a, b) {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) if (b.get(k) !== v) return false;
  return true;
}

async function diff(mem32) {
  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const seed = { eax: PEEP_BASE, ebx: PEEP_BASE, ecx: PEEP_BASE, edx: PEEP_BASE, esi: PEEP_BASE, edi: PEEP_BASE, ebp: PEEP_BASE };

  // interpreter (ground truth) — capture writes via _x86Watch
  const interpWrites = new Map();
  globalThis._x86Watch = makeWatch(interpWrites);
  const interp = runOriginal({
    funcAddr: ADDR,
    init: { regs: { ...seed }, mem32, memSize: HEAP_LEN, stackTop: HEAP_LEN },
    limit: 3_000_000,
  });
  globalThis._x86Watch = undefined;

  // ported JS — capture writes via _heapWatch
  let _t = 1700000000000; Date.now = () => ++_t;
  if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
  globalThis._renderTrace = () => {};
  const { Heap } = await import("../../runtime/heap.js");
  const { regs } = await import("../../runtime/regs.js");
  const { dispatch } = await import("../../ported/auto/_dispatch.js");
  const fn = new Map([...dispatch].map(([a, f]) => [a >>> 0, f])).get(ADDR);
  expect(fn, "0x43e7ef in ported dispatch").toBeTypeOf("function");

  const mem = new Uint8Array(HEAP_LEN);
  mem.set(dataBin, 0);
  for (const [a, v] of Object.entries(mem32)) {
    const n = Number(a);
    mem[n] = v & 0xff; mem[n + 1] = (v >>> 8) & 0xff; mem[n + 2] = (v >>> 16) & 0xff; mem[n + 3] = (v >>> 24) & 0xff;
  }
  const heap = new Heap(mem, HEAP_LEN);
  Object.assign(regs, seed);
  const portedWrites = new Map();
  globalThis._heapWatch = makeWatch(portedWrites);
  fn(heap);
  globalThis._heapWatch = undefined;

  return {
    writesEqual: sameWrites(interpWrites, portedWrites),
    eaxInterp: interp.regs.eax >>> 0, eaxPorted: regs.eax >>> 0,
    steps: interp.steps,
  };
}

describe("Phase 3: peep-list sweep (0x43e7ef) port matches the binary", () => {
  it("empty list (head=0xffff): port write-set + EAX equal the interpreter", async () => {
    const r = await diff({ [HEAD]: 0xffff });
    expect(r.eaxPorted).toBe(r.eaxInterp);
    expect(r.writesEqual, "write-sets equal").toBe(true);
  });

  it("one peep, State!=6: port write-set + EAX equal the interpreter", async () => {
    const r = await diff({ [HEAD]: 0x0, [PEEP_BASE + 0x4]: 0xffff });
    expect(r.eaxPorted).toBe(r.eaxInterp);
    expect(r.writesEqual, "write-sets equal").toBe(true);
  });

  it("the two scenarios run a different step count (loop body is exercised, not vacuous)", async () => {
    const empty = await diff({ [HEAD]: 0xffff });
    const one = await diff({ [HEAD]: 0x0, [PEEP_BASE + 0x4]: 0xffff });
    expect(one.steps).not.toBe(empty.steps);
  });
});
