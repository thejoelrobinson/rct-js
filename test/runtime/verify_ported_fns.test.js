// Phase 3+ — data-driven oracle gate for atlas-named gameplay functions.
//
// Each row asserts an auto-translated port matches the ORIGINAL binary (run on
// the in-process x86 interpreter) by comparing WRITE-SETS in the data region
// [0, 0xa00000) — not absolute memory (interpreter image is full PE code+data;
// the ported heap is data.bin only, so the code region always differs). Stack
// writes are excluded (they legitimately differ). Entry state is synthesized
// from the atlas's exact struct layouts + a few seeded globals (--mem32) — no
// gameplay tick needed (sidesteps the painter-perf wall).
//
// Assertions compare PORT vs INTERPRETER only — never hand-computed values; the
// interpreter is ground truth. To add a verified function: add a row.
//
// `scenarios[*].nonVacuousVs` names another scenario whose interpreter step
// count must differ — proving the differing-state path is actually exercised
// (the check isn't trivially "both did nothing").

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
const PEEP_HEAD = 0x87c398;

// --- functions verified byte-equivalent to the binary, with their entry states ---
// seed: which GPRs hold the struct pointer. ptr: struct slot (default PEEP_BASE).
// mem32: globals to seed { addr: value }. Atlas-identified meanings in `note`.
const FUNCS = [
  {
    addr: 0x43e7ef, struct: "Peep", seed: ["edx"], ptr: PEEP_BASE,
    note: "peep-list sweep: walks list from head 0x87c398, resets State for State==6 peeps matching EDX",
    scenarios: [
      { name: "empty-list", mem32: { [PEEP_HEAD]: 0xffff } },
      { name: "one-peep-state-not-6", mem32: { [PEEP_HEAD]: 0x0, [PEEP_BASE + 0x4]: 0xffff }, nonVacuousVs: "empty-list" },
    ],
  },
  {
    addr: 0x44247c, struct: "Peep", seed: ["esi"], ptr: PEEP_BASE,
    note: "peep action-advance loop: reads Action@0x71/PeepType@0x2e, writes Action@0x71",
    scenarios: [
      { name: "action-terminator", mem32: { [PEEP_BASE + 0x71]: 0xff } },     // Action=0xff → loop skipped
      { name: "action-zero", mem32: {}, nonVacuousVs: "action-terminator" },  // Action=0 → loop body entered
    ],
  },
];

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

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
let dispatchMap;
async function getDispatch() {
  if (dispatchMap) return dispatchMap;
  let _t = 1700000000000; Date.now = () => ++_t;
  if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
  globalThis._renderTrace = () => {};
  const { dispatch } = await import("../../ported/auto/_dispatch.js");
  dispatchMap = new Map([...dispatch].map(([a, f]) => [a >>> 0, f]));
  return dispatchMap;
}

async function diff(fnDef, scenario) {
  const seedRegs = {};
  for (const r of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]) seedRegs[r] = fnDef.ptr;
  // only the named seed regs strictly need the ptr, but seeding all is harmless
  // for differential equivalence (identical on both sides).
  const mem32 = scenario.mem32 || {};

  const interpWrites = new Map();
  globalThis._x86Watch = makeWatch(interpWrites);
  const interp = runOriginal({
    funcAddr: fnDef.addr,
    init: { regs: { ...seedRegs }, mem32, memSize: HEAP_LEN, stackTop: HEAP_LEN },
    limit: 5_000_000,
  });
  globalThis._x86Watch = undefined;

  const { Heap } = await import("../../runtime/heap.js");
  const { regs } = await import("../../runtime/regs.js");
  const fn = (await getDispatch()).get(fnDef.addr);
  expect(fn, `0x${fnDef.addr.toString(16)} in ported dispatch`).toBeTypeOf("function");

  const mem = new Uint8Array(HEAP_LEN);
  mem.set(dataBin, 0);
  for (const [a, v] of Object.entries(mem32)) {
    const n = Number(a);
    mem[n] = v & 0xff; mem[n + 1] = (v >>> 8) & 0xff; mem[n + 2] = (v >>> 16) & 0xff; mem[n + 3] = (v >>> 24) & 0xff;
  }
  const heap = new Heap(mem, HEAP_LEN);
  Object.assign(regs, seedRegs);
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

describe("ported gameplay functions are byte-equivalent to the binary", () => {
  for (const fnDef of FUNCS) {
    describe(`0x${fnDef.addr.toString(16)} — ${fnDef.note}`, () => {
      const stepsByName = {};
      for (const sc of fnDef.scenarios) {
        it(`[${sc.name}] write-set + EAX match the interpreter`, async () => {
          const r = await diff(fnDef, sc);
          stepsByName[sc.name] = r.steps;
          expect(r.eaxPorted, "EAX").toBe(r.eaxInterp);
          expect(r.writesEqual, "write-sets equal").toBe(true);
          if (sc.nonVacuousVs && stepsByName[sc.nonVacuousVs] !== undefined) {
            expect(r.steps, `step count differs from ${sc.nonVacuousVs} (path exercised)`)
              .not.toBe(stepsByName[sc.nonVacuousVs]);
          }
        });
      }
    });
  }
});
