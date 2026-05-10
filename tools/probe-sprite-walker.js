#!/usr/bin/env node
// Probe DAT_008d7eb6 (sprite-table active-index) after runInit + N ticks.
// Acceptance signal for the sprite-walker port (FUN_0045ac6f / abea / ac19 / acae).
//
// Note: FUN_0045abea always forces AL=1 before calling FUN_0045ac6f, which
// means the *initial* DAT_008d7eb6 = CH from FUN_0045ac6f is always 0
// (sprite-id table at 0x64beab = 0). DAT_008d7eb6 only becomes non-zero
// after the per-tick walker FUN_0045acae has time to advance it toward the
// (randomly-picked) DAT_008d7eb7 target. This requires:
//   1. The title-screen state machine to transition cb9 from 1 → 0
//      (~tick 100-300 with our runtime cadence)
//   2. The 0x780-tick countdown DAT_008d7eac to reach 0
//   3. Several walker steps gated by (DAT_0088741c & 0x7f) == 0
// In practice eb6 lands non-zero around tick 3500-4000 in this harness.

import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const TICKS = parseInt(process.env.TICKS || "80", 10);

const { createRuntime } = await import("../runtime/harness.js");
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
const vfsRoot = resolve(ROOT, "web/assets");
try {
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
} catch {}

const runtime = createRuntime({ dataBin, vfs });
runtime.runInit();

const ADDRS = [
  ["DAT_008d7eaa", 0x008d7eaa, 1],
  ["DAT_008d7eac (u16)", 0x008d7eac, 2],
  ["DAT_008d7eae", 0x008d7eae, 1],
  ["DAT_008d7eaf", 0x008d7eaf, 1],
  ["DAT_008d7eb0", 0x008d7eb0, 1],
  ["DAT_008d7eb1", 0x008d7eb1, 1],
  ["DAT_008d7eb2", 0x008d7eb2, 1],
  ["DAT_008d7eb3", 0x008d7eb3, 1],
  ["DAT_008d7eb4", 0x008d7eb4, 1],
  ["DAT_008d7eb5", 0x008d7eb5, 1],
  ["DAT_008d7eb6", 0x008d7eb6, 1],
  ["DAT_008d7eb7", 0x008d7eb7, 1],
  ["DAT_00628cb8", 0x00628cb8, 1],
  ["DAT_00628cb9", 0x00628cb9, 1],
  ["DAT_005f8da2", 0x005f8da2, 1],
  ["DAT_0088741c (u32)", 0x0088741c, 4],
];

function snap(label) {
  console.log(`--- ${label} ---`);
  for (const [name, addr, w] of ADDRS) {
    const v = w === 1 ? runtime.heap.u8(addr) : (w === 2 ? runtime.heap.u16(addr) : runtime.heap.u32(addr));
    console.log(`  ${name.padEnd(22)} = 0x${v.toString(16).padStart(w*2,"0")} (${v})`);
  }
}

snap("after runInit");

let firstNonZeroTick = -1;
for (let i = 1; i <= TICKS; i++) {
  runtime.runTick();
  if (firstNonZeroTick < 0 && runtime.heap.u8(0x008d7eb6) !== 0) {
    firstNonZeroTick = i;
    console.log(`\n*** DAT_008d7eb6 became non-zero at tick ${i}: ${runtime.heap.u8(0x008d7eb6)} ***\n`);
  }
  if (i === 1 || i === 5 || i === 80 || i === TICKS) snap(`after tick ${i}`);
}

console.log("\n=== ACCEPTANCE ===");
const v = runtime.heap.u8(0x008d7eb6);
console.log(`runtime.heap.bytes[0x008d7eb6] = ${v} (0x${v.toString(16)})`);
console.log(`first non-zero at tick: ${firstNonZeroTick}`);
process.exit(v === 0 ? 1 : 0);
