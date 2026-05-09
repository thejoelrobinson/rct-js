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

    // Wrap heap accessors with op counter.
    let _ops = 0;
    let _start = Date.now();
    for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
      const orig = runtime.heap[name].bind(runtime.heap);
      runtime.heap[name] = (...args) => {
        _ops++;
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
