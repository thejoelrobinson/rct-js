#!/usr/bin/env node
// Batch-translate every C file in decompiled/c/ and report success/failure.
// Output:
//   ported/<addr>.js     — successful translations
//   tools/c-to-js/translation-report.json — summary
//
// This is the fastest way to learn what translator features are missing —
// failures land in a histogram of error messages.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";
import { translateFunction } from "./translate.js";
import { scanCharDats } from "./scan-char-dats.js";
import { scanRegConsumers } from "./scan-reg-consumers.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const C_DIR = resolve(HERE, "../../decompiled/c");
const PORTED_DIR = resolve(HERE, "../../ported/auto");
const REPORT = resolve(HERE, "translation-report.json");

mkdirSync(PORTED_DIR, { recursive: true });

// Global pre-pass: identify byte-sized DAT globals so the translator can
// emit `setU8`/`heap.u8` for them. Without this, every DAT write is a
// 4-byte setU32 which corrupts adjacent char DATs (e.g. setU32 to
// 0x971eee writes 4 bytes, the last lands on 0x971ef1 — clobbering byte
// 0x971ef0 if that's a separate char DAT).
const charDats = scanCharDats(C_DIR);
console.error(`Pre-scan: ${charDats.size} byte-sized DAT addresses identified.`);

// Caller-side register-arg propagation manifests:
//   regConsumers: which functions read which registers (from existing ports)
//   callsiteRegs: per-call-site register snapshots (from interpreter trace)
// Both are optional — if missing, translator falls back to no-prefix calls.
const regConsumers = scanRegConsumers(PORTED_DIR);
console.error(`Pre-scan: ${regConsumers.size} functions consume registers.`);

let callsiteRegs = new Map();
function mergeCallsiteFile(path) {
  try {
    const raw = JSON.parse(readFileSync(path, "utf8"));
    for (const [callerHex, byCallee] of Object.entries(raw)) {
      const callerAddr = parseInt(callerHex, 16);
      let inner = callsiteRegs.get(callerAddr);
      if (!inner) { inner = new Map(); callsiteRegs.set(callerAddr, inner); }
      for (const [calleeHex, regs] of Object.entries(byCallee)) {
        const calleeAddr = parseInt(calleeHex, 16);
        // Normalise to {pre, post} schema. Old flat format was {eax, ebx, ...};
        // new format is {pre: {...}, post: {...}}.
        const normalised = (regs && regs.pre)
          ? regs
          : { pre: regs };
        // Merge: prefer existing, but if existing lacks `post` and new has it, fill in.
        const existing = inner.get(calleeAddr);
        if (!existing) {
          inner.set(calleeAddr, normalised);
        } else if (!existing.post && normalised.post) {
          existing.post = normalised.post;
        }
      }
    }
  } catch (e) {
    console.error(`Skipped ${path}: ${e.code || e.message}`);
  }
}
mergeCallsiteFile(resolve(HERE, "callsite-regs.json"));
mergeCallsiteFile(resolve(HERE, "callsite-regs-deep.json"));
const totalSites = [...callsiteRegs.values()].reduce((s, m) => s + m.size, 0);
console.error(`Loaded ${callsiteRegs.size} callers (${totalSites} unique call-site bindings).`);

const files = readdirSync(C_DIR).filter(f => f.endsWith(".c"));
console.error(`Translating ${files.length} files...`);

const ok = [];
const failed = []; // { file, error }
const errorBuckets = new Map();

let i = 0;
for (const file of files) {
  i++;
  if (i % 100 === 0) console.error(`  ${i}/${files.length}`);
  const inputPath = resolve(C_DIR, file);
  const outputPath = resolve(PORTED_DIR, basename(file, ".c") + ".js");
  let source;
  try {
    source = readFileSync(inputPath, "utf8");
  } catch (e) {
    failed.push({ file, error: `read: ${e.message}` });
    continue;
  }
  try {
    // Manual-override sentinel: if an existing port starts with
    // `// @manual` on its first line, never re-translate. Used for
    // functions whose Ghidra output is correct C but has unmodelled
    // semantics (unaff_* register inputs, SEH, etc.).
    try {
      const existing = readFileSync(outputPath, "utf8");
      if (existing.startsWith("// @manual")) {
        ok.push({ file, addr: parseInt(file.replace(/\.c$/, ""), 16), name: `FUN_${file.replace(/\.c$/, "").padStart(8, "0")}`, manual: true });
        continue;
      }
    } catch {}
    // Derive RVA from the file name; pass to the translator so it forces
    // the function name to FUN_<padded-hex>, avoiding collisions with
    // Win32 / Ghidra-builtin names Ghidra may have used.
    const addrFromFile = parseInt(file.replace(/\.c$/, ""), 16);
    const { js, info } = await translateFunction(source, addrFromFile, { charDats, regConsumers, callsiteRegs });
    writeFileSync(outputPath, js);
    ok.push({ file, addr: info.funcAddr, name: info.funcName });
  } catch (e) {
    const msg = String(e.message || e);
    failed.push({ file, error: msg });
    // Bucket by short error signature
    const bucket = msg.split("—")[0].trim().slice(0, 80);
    errorBuckets.set(bucket, (errorBuckets.get(bucket) || 0) + 1);
  }
}

const buckets = [...errorBuckets.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([msg, count]) => ({ count, msg }));

const report = {
  total: files.length,
  ok: ok.length,
  failed: failed.length,
  successRate: (ok.length / files.length * 100).toFixed(1) + "%",
  errorBuckets: buckets,
  failedSamples: failed.slice(0, 50),
};
writeFileSync(REPORT, JSON.stringify(report, null, 2));

console.error(`\nDone. ok=${ok.length}/${files.length} (${report.successRate}), failed=${failed.length}`);
console.error(`\nTop error categories:`);
for (const { count, msg } of buckets.slice(0, 10)) {
  console.error(`  ${count.toString().padStart(5)}  ${msg}`);
}
console.error(`\nFull report: ${REPORT}`);
