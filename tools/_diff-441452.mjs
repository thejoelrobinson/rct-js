// Differential oracle for FUN_0044142c / FUN_00441452 (peep attach/detach
// ride bookkeeping + sound events). Seeds a synthetic sprite record and
// ride block into the x86 interpreter (raw rct.exe) and the ported JS,
// runs both, and byte-diffs the ride region, the sound-event list, and
// the sprite record.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { runOriginal } = await import(resolve(ROOT, "harness/emulator.js"));
const { Heap } = await import(resolve(ROOT, "runtime/heap.js"));
const { regs } = await import(resolve(ROOT, "runtime/regs.js"));
const { FUN_0044142c } = await import(resolve(ROOT, "ported/auto/44142c.js"));
const { FUN_00441452 } = await import(resolve(ROOT, "ported/auto/441452.js"));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const SPRITE = 0x743b94 + 0x100 * 7; // sprite slot 7
const RIDES = 0x887400;              // ride block region start (watch range)

const cases = [];
for (const fn of ["44142c", "441452"]) {
  for (const state of [3, 5, 7]) {          // 3/7 take the counter path, 5 skips
    for (const f2e of [0, 1]) {             // 441452 branches on [esi+0x2e]
      if (fn === "44142c" && f2e === 1) continue;
      cases.push({ fn, state, f2e });
    }
  }
}

let allOk = true;
for (const c of cases) {
  const mem32 = {};
  const seedBytes = new Map();
  seedBytes.set(SPRITE + 0x2b, c.state);
  seedBytes.set(SPRITE + 0x2e, c.f2e);
  seedBytes.set(SPRITE + 0x68, 2);          // ride index 2
  seedBytes.set(SPRITE + 0xa, 0x34);        // sound param low byte
  seedBytes.set(SPRITE + 0xb, 0x12);
  // ride 2 counter/flags bytes (give the counter a nonzero value)
  seedBytes.set(0x0088752b + 2 * 0x260, 5);
  seedBytes.set(0x0088751d + 2 * 0x260, 0);

  // --- interpreter ---
  const PAGE = 0x1000;
  const pages = new Map();
  function poke(a, v) {
    const p = Math.floor(a / PAGE);
    if (!pages.has(p)) {
      const base = p * PAGE;
      const bytes = new Uint8Array(PAGE);
      for (let i = 0; i < PAGE; i++) bytes[i] = base + i < dataBin.length ? dataBin[base + i] : 0;
      pages.set(p, bytes);
    }
    pages.get(p)[a % PAGE] = v;
  }
  for (const [a, v] of seedBytes) poke(a, v);
  const addr = c.fn === "44142c" ? 0x44142c : 0x441452;
  let interpMem, interpRegs, interpErr;
  try {
    const res = runOriginal({
      funcAddr: addr,
      init: {
        mem32,
        regs: { esi: SPRITE, eax: 0x11112222, ebx: 0x33334444 },
        pages: [...pages.entries()].map(([page, bytes]) => ({ page, bytes })),
      },
      limit: 2_000_000,
      returnMemory: true,
    });
    interpMem = res.memory; interpRegs = res.regs;
  } catch (e) { interpErr = e.message; }

  // --- ported JS ---
  const total = Math.max(dataBin.length + 8 * 1024 * 1024, 0xa00000);
  const memory = new Uint8Array(total);
  memory.set(dataBin, 0);
  const heap = new Heap(memory, total);
  for (const [a, v] of seedBytes) heap.setU8(a, v);
  regs.esi = SPRITE; regs.eax = 0x11112222; regs.ebx = 0x33334444;
  let jsErr;
  try { (c.fn === "44142c" ? FUN_0044142c : FUN_00441452)(heap); }
  catch (e) { jsErr = e.message; }

  const name = `${c.fn} state=${c.state} f2e=${c.f2e}`;
  if (interpErr || jsErr) {
    console.log(`FAIL ${name}: interpErr=${interpErr} jsErr=${jsErr}`);
    allOk = false; continue;
  }
  // compare: ride region, sound-event list (0x9a013c..0x9a1170), sprite,
  // and the regs that survive (eax/ebx restored by both paths).
  const WATCH = [
    [RIDES, RIDES + 0x260 * 8],
    [0x9a0130, 0x9a1170],
    [SPRITE, SPRITE + 0x100],
  ];
  let diffs = 0, first = null;
  for (const [lo, hi] of WATCH) {
    for (let a = lo; a < hi; a++) {
      if (interpMem[a] !== memory[a]) { diffs++; if (!first) first = a; }
    }
  }
  const regOk = (interpRegs.eax >>> 0) === (regs.eax >>> 0) && (interpRegs.ebx >>> 0) === (regs.ebx >>> 0);
  if (diffs === 0 && regOk) console.log(`PASS ${name}`);
  else {
    allOk = false;
    console.log(`FAIL ${name}: ${diffs} byte diffs${first ? ` (first @0x${first.toString(16)} interp=0x${interpMem[first].toString(16)} js=0x${memory[first].toString(16)})` : ""} regOk=${regOk} interp eax=0x${(interpRegs.eax>>>0).toString(16)} js eax=0x${(regs.eax>>>0).toString(16)}`);
  }
}
process.exit(allOk ? 0 : 1);
