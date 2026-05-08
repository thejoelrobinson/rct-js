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

const HERE = dirname(fileURLToPath(import.meta.url));
const C_DIR = resolve(HERE, "../../decompiled/c");
const PORTED_DIR = resolve(HERE, "../../ported/auto");
const REPORT = resolve(HERE, "translation-report.json");

mkdirSync(PORTED_DIR, { recursive: true });

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
    // Derive RVA from the file name; pass to the translator so it forces
    // the function name to FUN_<padded-hex>, avoiding collisions with
    // Win32 / Ghidra-builtin names Ghidra may have used.
    const addrFromFile = parseInt(file.replace(/\.c$/, ""), 16);
    const { js, info } = await translateFunction(source, addrFromFile);
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
