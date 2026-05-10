#!/usr/bin/env node
// tools/indirect-call-audit.js — capture every callIndirect miss across N ticks
// and produce a ranked report with objdump disassembly snippets.
//
// Sets globalThis._missingIndirectHook (see runtime/win32/context.js) before
// booting the runtime, so every (addr, callerJsFn) pair is recorded with a
// hit count. After N ticks we shell out to objdump for the top-K addresses
// to disassemble 16 bytes at the target — useful for classifying each miss
// as "real function we never ported", "jump-table mid-target", or "vtable
// slot read through a 0-init pointer".
//
// Usage:
//   node tools/indirect-call-audit.js              # 500 ticks, top 20
//   TICKS=2000 TOP=40 node tools/indirect-call-audit.js
//
// Output:
//   tools/missing-indirect-calls.json — full ranked list with disassembly

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { createRuntime } from "../runtime/harness.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;
const TICKS = parseInt(process.env.TICKS || "500", 10);
const TOP = parseInt(process.env.TOP || "20", 10);
const BINARY = resolve(ROOT, "binary/rct.exe");

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

// Use Error.stack to grab the JS caller name. Skipping context.js (this is
// the callIndirect frame itself) and the hook closure, we look for the
// first `FUN_00xxxxxx` frame — that's the ported function that issued the
// indirect call.
function captureCallerName() {
  const stack = new Error().stack || "";
  const m = stack.match(/at\s+(FUN_[0-9a-f]+)\b/);
  return m ? m[1] : "(unknown)";
}

const misses = new Map(); // addr -> { addr, count, callers: Map<name, count> }

function recordMiss(addr) {
  let r = misses.get(addr);
  if (!r) {
    r = { addr, count: 0, callers: new Map() };
    misses.set(addr, r);
  }
  r.count++;
  const caller = captureCallerName();
  r.callers.set(caller, (r.callers.get(caller) || 0) + 1);
}

function disassemble(addr, bytes = 32) {
  if (!existsSync(BINARY)) return "(binary/rct.exe missing — skipping disassembly)";
  const startHex = "0x" + addr.toString(16);
  const stopHex = "0x" + (addr + bytes).toString(16);
  try {
    const out = execSync(
      `objdump -d "${BINARY}" --start-address=${startHex} --stop-address=${stopHex} 2>/dev/null`,
      { encoding: "utf8", timeout: 10000 },
    );
    const lines = out.split("\n").filter(l => /^\s*[0-9a-f]+:/.test(l));
    return lines.slice(0, 6).join("\n").trim() || "(no disassembly — outside text)";
  } catch (e) {
    return `(objdump failed: ${e.message.slice(0, 60)})`;
  }
}

// Lightweight classifier: prologue patterns (push ebp ; mov ebp, esp) →
// "real fn we missed". Mid-instruction (no prologue, looks like data) →
// "jump-table mid-target or vtable slot". 0 or tiny value → "null vtable read".
function classify(addr, disasm) {
  if (addr < 0x401000) return "low address — probably uninitialised pointer read";
  if (addr >= 0x10100000) return "synthetic proc address (DLL export not registered)";
  if (/push\s+%ebp/i.test(disasm) || /push\s+ebp/i.test(disasm)) return "function prologue — likely a real fn we never ported";
  if (/^\s*$/.test(disasm)) return "no disassembly — address outside CODESEG";
  return "mid-instruction — jump-table target or vtable slot";
}

async function main() {
  console.log(`indirect-call-audit: TICKS=${TICKS}, TOP=${TOP}`);
  globalThis._missingIndirectHook = recordMiss;

  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();
  const runtime = createRuntime({ dataBin, vfs });

  try { runtime.runInit(); }
  catch (e) { console.error(`runInit threw: ${e.message}`); }

  let tickErrors = 0;
  for (let i = 1; i <= TICKS; i++) {
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

  delete globalThis._missingIndirectHook;

  const ranked = [...misses.values()].sort((a, b) => b.count - a.count);
  console.log(`captured ${ranked.length} distinct missing addresses, ${ranked.reduce((s, r) => s + r.count, 0)} total misses`);

  const top = ranked.slice(0, TOP).map(r => {
    const disasm = disassemble(r.addr);
    return {
      addr: "0x" + r.addr.toString(16),
      hits: r.count,
      callers: Object.fromEntries([...r.callers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)),
      classification: classify(r.addr, disasm),
      disasm,
    };
  });

  const outPath = resolve(ROOT, "tools/missing-indirect-calls.json");
  writeFileSync(outPath, JSON.stringify({
    ticks: TICKS,
    totalMisses: ranked.reduce((s, r) => s + r.count, 0),
    distinctAddresses: ranked.length,
    top,
  }, null, 2));

  console.log(`\n--- top ${top.length} missing addresses ---`);
  for (const r of top) {
    const callerList = Object.entries(r.callers).slice(0, 2).map(([n, c]) => `${n}×${c}`).join(", ");
    console.log(`  ${r.addr.padEnd(12)} ${String(r.hits).padStart(6)} hits  ${r.classification}`);
    console.log(`               callers: ${callerList || "(none)"}`);
  }
  console.log(`\nwrote ${outPath}`);
}

main().catch((e) => {
  console.error(`[fatal] ${e.message}`);
  if (e.stack) console.error(e.stack.split("\n").slice(0, 8).join("\n"));
  process.exit(1);
});
