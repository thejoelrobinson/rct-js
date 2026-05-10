#!/usr/bin/env node
// Probe runInit() + one runTick(), logging which sub-call hangs.
// Run in a worker so we can hard-watchdog the main thread.

import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

if (isMainThread) {
  const TIMEOUT = parseInt(process.env.TIMEOUT_MS || "20000", 10);
  const w = new Worker(fileURLToPath(import.meta.url));
  let lastEvent = Date.now();
  let lastPhase = "(start)";
  const watchdog = setInterval(() => {
    if (Date.now() - lastEvent > TIMEOUT) {
      console.error(`\n✗ HUNG: ${TIMEOUT}ms with no progress. Last phase: ${lastPhase}`);
      w.terminate();
      process.exit(2);
    }
  }, 500);
  w.on("message", (m) => {
    lastEvent = Date.now();
    if (m.kind === "phase") {
      lastPhase = m.phase;
      console.log(`  phase: ${m.phase} @ ${m.opCount.toLocaleString()} ops, ${m.elapsedMs}ms`);
    } else if (m.kind === "log") {
      console.log(`  ${m.text}`);
    } else if (m.kind === "trace") {
      console.log(`  trace: ${m.text}`);
    } else if (m.kind === "done") {
      clearInterval(watchdog);
      console.log(`\n✓ tick complete in ${m.elapsedMs}ms (${m.opCount.toLocaleString()} ops)`);
      process.exit(0);
    } else if (m.kind === "error") {
      clearInterval(watchdog);
      console.error(`\n✗ THREW after phase ${m.phase}, ${m.elapsedMs}ms:`);
      console.error(`  ${m.message}`);
      if (m.stack) console.error(m.stack.split("\n").slice(0, 10).join("\n"));
      process.exit(1);
    }
  });
  w.on("error", e => { console.error("worker error:", e); process.exit(3); });
} else {
  (async () => {
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

    // Optional: wrap fnDispatch to count calls per function and throw with
    // a top-callees report if any single function exceeds the per-tick
    // threshold. Helps localise runaway loops. Enable by setting
    // RUNAWAY_THRESHOLD env var.
    const RUNAWAY_THRESHOLD = parseInt(process.env.RUNAWAY_THRESHOLD || "0", 10);
    const callCounts = new Map();
    if (RUNAWAY_THRESHOLD > 0) {
      const fnDispatch = runtime.state?.fnDispatch;
      if (fnDispatch instanceof Map) {
        for (const [addr, fn] of fnDispatch) {
          if (typeof fn !== 'function') continue;
          const orig = fn;
          fnDispatch.set(addr, function(...args) {
            const n = (callCounts.get(addr) || 0) + 1;
            callCounts.set(addr, n);
            if (n === RUNAWAY_THRESHOLD) {
              const top = [...callCounts.entries()].sort((a,b) => b[1]-a[1]).slice(0, 10)
                .map(([k,c]) => `0x${k.toString(16)}=${c}`).join(' ');
              throw new Error(`runaway: 0x${addr.toString(16)} called ${RUNAWAY_THRESHOLD} times. Top: ${top}`);
            }
            return orig.apply(this, args);
          });
        }
      }
    }
    globalThis.__resetCallCounts = () => callCounts.clear();

    // Wrap heap accessors with op counter. Per-tick budget defaults to 50M;
    // tighten via __setBudget() (e.g., to 5M after the heavy first tick when
    // hunting an infinite loop). Throws with caller stack on overrun.
    let _ops = 0;
    let _start = Date.now();
    let _budget = 50_000_000;
    for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
      const orig = runtime.heap[name].bind(runtime.heap);
      runtime.heap[name] = (...args) => {
        if (++_ops > _budget) {
          const stack = new Error('overrun').stack || '';
          const lines = stack.split('\n').slice(1, 12).join('\n');
          throw new Error(`[heap.${name}] over ${_budget.toLocaleString()} ops/tick. Stack:\n${lines}`);
        }
        try { return orig(...args); }
        catch (e) {
          if (e instanceof RangeError) {
            const addr = args[0];
            const top = runtime.heap.bytes.byteLength;
            throw new Error(`[heap.${name}] OOB addr=0x${(addr>>>0).toString(16)} top=0x${top.toString(16)} (${e.message})`);
          }
          throw e;
        }
      };
    }
    globalThis.__setBudget = (b) => { _budget = b; };

    globalThis.__verbose4385d8 = true;
    globalThis.__trace = (msg) => parentPort.postMessage({ kind: "trace", text: msg });
    parentPort.postMessage({ kind: "log", text: "calling runInit()..." });
    try {
      runtime.runInit();
    } catch (e) {
      parentPort.postMessage({ kind: "error", phase: "init", message: e.message, stack: e.stack, elapsedMs: Date.now() - _start });
      return;
    }
    parentPort.postMessage({ kind: "log", text: `init complete: ${_ops.toLocaleString()} ops, ${Date.now() - _start}ms` });

    const TICKS = parseInt(process.env.TICKS || "5", 10);
    for (let i = 1; i <= TICKS; i++) {
      _ops = 0;
      _start = Date.now();
      // Tighten budget after the heavy first tick.
      if (i === 2) globalThis.__setBudget(5_000_000);
      if (typeof globalThis.__resetCallCounts === 'function') globalThis.__resetCallCounts();
      let lastPhase = "(none)";
      try {
        runtime.runTick((phase) => {
          lastPhase = phase;
          if (i === 1) parentPort.postMessage({ kind: "phase", phase, opCount: _ops, elapsedMs: Date.now() - _start });
        });
      } catch (e) {
        parentPort.postMessage({ kind: "error", phase: `tick${i}/${lastPhase}`, message: e.message, stack: e.stack, elapsedMs: Date.now() - _start });
        return;
      }
      parentPort.postMessage({ kind: "log", text: `tick ${i}: ${Date.now() - _start}ms, ${_ops.toLocaleString()} ops` });
    }
    parentPort.postMessage({ kind: "done", elapsedMs: 0, opCount: _ops });
  })();
}
