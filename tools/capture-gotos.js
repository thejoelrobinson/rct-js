#!/usr/bin/env node
// tools/capture-gotos.js — capture which translator-emitted goto
// short-circuits actually fire during boot, in chronological order.
//
// The auto-translator emits `globalThis._gotoWarn("FUN_XXX/label")`
// + early-return whenever it can't lower a cross-branch goto. There
// are ~337 such sites scattered across ported/auto/*.js. This tool
// answers: which ones actually execute during boot, and in what
// order? The earliest-firing site is the highest-leverage target.
//
// Usage:
//   node tools/capture-gotos.js                # default 200 ticks
//   TICKS=500 node tools/capture-gotos.js
//
// Output (stdout): top 30 sites sorted by firstTick ascending.
// Also writes /tmp/rct-goto-hits.csv with the full sorted list.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { createRuntime } from "../runtime/harness.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;
const TICKS = parseInt(process.env.TICKS || "200", 10);

function loadVfs() {
  const vfs = new Map();
  const vfsRoot = resolve(ROOT, "web/assets");
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
  for (const name of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) {
    if (!vfs.has(name)) vfs.set(name, new Uint8Array(0));
  }
  return vfs;
}

let currentTick = 0;
// site -> { count, firstTick, firstOrder }
const hits = new Map();
let hitOrder = 0;

globalThis._gotoWarn = (site) => {
  const prev = hits.get(site);
  if (prev) {
    prev.count++;
  } else {
    hits.set(site, { count: 1, firstTick: currentTick, firstOrder: hitOrder++ });
  }
};

// Sanity check: verify our hook is wired (only matters once at load).
console.log(`[capture-gotos] _gotoWarn type at startup: ${typeof globalThis._gotoWarn}`);

async function main() {
  console.log(`capture-gotos: TICKS=${TICKS}`);
  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();
  const runtime = createRuntime({ dataBin, vfs });

  // Tick 0 = runInit phase.
  currentTick = 0;
  try { runtime.runInit(); }
  catch (e) { console.error(`runInit threw: ${e.message}`); }

  let tickErrors = 0;
  for (let i = 1; i <= TICKS; i++) {
    currentTick = i;
    const hwnd = state.firstHwnd || 0;
    if (hwnd) {
      postWindowMessage(hwnd, WM_TIMER, 1, 0);
      if ((i & 1) === 0) postWindowMessage(hwnd, WM_PAINT, 0, 0);
    }
    try { runtime.runTick(() => {}); }
    catch (e) {
      tickErrors++;
      if (tickErrors >= 20) { console.error("aborting after 20 tick errors"); break; }
    }
  }

  // Sort by firstTick asc, then by firstOrder asc (stable within same tick).
  const sorted = [...hits.entries()].sort((a, b) => {
    if (a[1].firstTick !== b[1].firstTick) return a[1].firstTick - b[1].firstTick;
    return a[1].firstOrder - b[1].firstOrder;
  });

  console.log(`\ntotal distinct _gotoWarn sites that fired: ${sorted.length}`);
  console.log(`total _gotoWarn invocations: ${[...hits.values()].reduce((a, b) => a + b.count, 0)}\n`);

  console.log("--- top 30 by firstTick (earliest first) ---");
  console.log("firstTick  count       site");
  for (let i = 0; i < Math.min(30, sorted.length); i++) {
    const [site, info] = sorted[i];
    console.log(`${String(info.firstTick).padStart(9)}  ${String(info.count).padStart(10)}  ${site}`);
  }

  // Show how many fired during runInit specifically.
  const initSites = sorted.filter(([, info]) => info.firstTick === 0);
  console.log(`\n--- ${initSites.length} sites fired during runInit (firstTick = 0) ---`);
  for (const [site, info] of initSites) {
    console.log(`  count=${String(info.count).padStart(8)}  ${site}`);
  }

  const csvPath = "/tmp/rct-goto-hits.csv";
  const rows = ["firstTick,firstOrder,count,site"];
  for (const [site, info] of sorted) {
    rows.push(`${info.firstTick},${info.firstOrder},${info.count},${site}`);
  }
  writeFileSync(csvPath, rows.join("\n") + "\n");
  console.log(`\nwrote ${csvPath}`);
}

main().catch((e) => {
  console.error(`[fatal] ${e.message}`);
  if (e.stack) console.error(e.stack.split("\n").slice(0, 8).join("\n"));
  process.exit(1);
});
