// Differential oracle for FUN_0043e792 (peep queue-bucket unlink).
// Seeds a synthetic sprite + bucket list into the interpreter (raw
// rct.exe) and the ported JS, byte-diffs ride region + sprite records.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { runOriginal } = await import(resolve(ROOT, "harness/emulator.js"));
const { Heap } = await import(resolve(ROOT, "runtime/heap.js"));
const { regs } = await import(resolve(ROOT, "runtime/regs.js"));
const { FUN_0043e792 } = await import(resolve(ROOT, "ported/auto/43e792.js"));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const REC = (i) => 0x743b94 + i * 0x100;
const RIDE = 3, STATION = 1;
const RIDEOFF = RIDE * 0x260;
const HEAD = 0x887472 + RIDEOFF + STATION * 2;
const CNT = 0x88747a + RIDEOFF + STATION;

function seedCommon(set) {
  // sprites 10 -> 11 -> 12 -> 0xffff chained via +0x74
  for (const [i, nxt] of [[10, 11], [11, 12], [12, 0xffff]]) {
    set(REC(i) + 0xa, i & 0xff); set(REC(i) + 0xb, i >> 8);
    set(REC(i) + 0x74, nxt & 0xff); set(REC(i) + 0x75, nxt >> 8);
    set(REC(i) + 0x68, RIDE); set(REC(i) + 0x69, STATION);
  }
  set(HEAD, 10); set(HEAD + 1, 0);
  set(CNT, 3);
}
const cases = {
  "unlink-head": 10,   // head repoint path
  "unlink-mid": 11,    // walk + splice path
  "unlink-tail": 12,   // walk to last
};

let allOk = true;
for (const [name, victim] of Object.entries(cases)) {
  const bytes = new Map();
  const set = (a, v) => bytes.set(a, v);
  seedCommon(set);

  // interpreter
  const PAGE = 0x1000, pages = new Map();
  for (const [a, v] of bytes) {
    const p = Math.floor(a / PAGE);
    if (!pages.has(p)) {
      const base = p * PAGE, b = new Uint8Array(PAGE);
      for (let i = 0; i < PAGE; i++) b[i] = base + i < dataBin.length ? dataBin[base + i] : 0;
      pages.set(p, b);
    }
    pages.get(p)[a % PAGE] = v;
  }
  const res = runOriginal({
    funcAddr: 0x43e792,
    init: { regs: { esi: REC(victim) }, pages: [...pages.entries()].map(([page, b]) => ({ page, bytes: b })) },
    limit: 100000,
    returnMemory: true,
  });

  // JS
  const total = Math.max(dataBin.length + 8 * 1024 * 1024, 0xa00000);
  const memory = new Uint8Array(total);
  memory.set(dataBin, 0);
  const heap = new Heap(memory, total);
  for (const [a, v] of bytes) heap.setU8(a, v);
  regs.esi = REC(victim);
  FUN_0043e792(heap);

  let diffs = 0, first = null;
  for (const [lo, hi] of [[0x887400, 0x887400 + 0x260 * 6], [REC(9), REC(14)]]) {
    for (let a = lo; a < hi; a++) if (res.memory[a] !== memory[a]) { diffs++; if (!first) first = a; }
  }
  if (diffs === 0) console.log(`PASS ${name}`);
  else { allOk = false; console.log(`FAIL ${name}: ${diffs} diffs, first @0x${first.toString(16)} interp=0x${res.memory[first].toString(16)} js=0x${memory[first].toString(16)}`); }
}
process.exit(allOk ? 0 : 1);
