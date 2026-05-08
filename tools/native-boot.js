#!/usr/bin/env node
// Try to natively boot rct.exe — i.e. call FUN_00401000 through the
// ported JS, runtime/win32.js, and runtime/heap.js, with no x86 interpreter
// in the loop.
//
// Runs the actual boot in a Worker thread so the main thread can enforce
// a watchdog timeout (auto-translated functions sometimes hit infinite
// loops we haven't ironed out yet).

import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

if (isMainThread) {
  // ---- Driver ----
  const args = process.argv.slice(2);
  let funcAddr = 0x401000;
  let timeoutMs = 10_000;
  for (const a of args) {
    if (a.startsWith("--func=")) funcAddr = parseInt(a.slice(7), 16);
    else if (a.startsWith("--timeout=")) timeoutMs = parseInt(a.slice(10), 10);
  }
  console.log(`Booting FUN_${funcAddr.toString(16).padStart(8, "0")} with ${timeoutMs}ms watchdog`);

  const w = new Worker(fileURLToPath(import.meta.url), { workerData: { funcAddr } });
  let done = false;
  const watchdog = setTimeout(() => {
    if (!done) {
      console.error(`\n✗ WATCHDOG: function did not return within ${timeoutMs}ms.`);
      console.error(`Most likely an infinite loop. Re-run with --timeout=<ms> or --func=<addr> to bisect.`);
      w.terminate();
      process.exit(2);
    }
  }, timeoutMs);

  w.on("message", (m) => {
    done = true;
    clearTimeout(watchdog);
    if (m.ok) {
      console.log(`\n✓ Returned cleanly after ${m.elapsedMs}ms — result: ${m.result}`);
      process.exit(0);
    } else {
      console.error(`\n✗ THREW after ${m.elapsedMs}ms`);
      console.error(`  message: ${m.error.message}`);
      if (m.error.stack) {
        const stackLines = m.error.stack.split("\n").slice(1, 12);
        console.error(`  stack (top 10):`);
        for (const l of stackLines) console.error(`    ${l.trim()}`);
      }
      process.exit(1);
    }
  });
  w.on("error", e => {
    done = true;
    clearTimeout(watchdog);
    console.error("worker error:", e);
    process.exit(3);
  });
} else {
  // ---- Worker ----
  // Inside the worker we don't have ESM `await` at top level until the
  // module loads, so we use a wrapper async IIFE.
  (async () => {
    const { funcAddr } = workerData;
    const { createRuntime } = await import("../runtime/harness.js");
    const { dispatch } = await import("../ported/auto/_dispatch.js");

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

    const { heap, run } = createRuntime({ dataBin, vfs });

    const start = Date.now();
    try {
      let result;
      if (funcAddr === 0x401000) result = run();
      else {
        const fn = dispatch.get(funcAddr);
        if (!fn) throw new Error(`No ported fn for 0x${funcAddr.toString(16)}`);
        result = fn(heap);
      }
      parentPort.postMessage({ ok: true, result, elapsedMs: Date.now() - start });
    } catch (e) {
      parentPort.postMessage({
        ok: false,
        elapsedMs: Date.now() - start,
        error: { message: e.message, stack: e.stack },
      });
    }
  })();
}
