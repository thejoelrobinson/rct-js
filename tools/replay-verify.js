#!/usr/bin/env node
// Re-run the captured boot sequence and confirm back-buffer hashes match the
// committed fixture. Exits non-zero on any divergence — the rendering chain
// has changed in a way that affects visible pixels.
//
// Usage:
//   node tools/replay-verify.js
//   node tools/replay-verify.js --fixture=test/fixtures/title-screen-replay.json

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { bootAndHash } from "./lib/replay-runner.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let fixturePath = "test/fixtures/title-screen-replay.json";
let verbose = false;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--fixture=")) fixturePath = a.slice(10);
  else if (a === "--verbose" || a === "-v") verbose = true;
}

const fixture = JSON.parse(readFileSync(resolve(ROOT, fixturePath), "utf8"));
const tickSamples = Object.keys(fixture.ticks).map((s) => parseInt(s, 10)).sort((a, b) => a - b);

const log = (msg) => process.stderr.write(`[verify ${new Date().toISOString().slice(11,19)}] ${msg}\n`);
const { ticks } = await bootAndHash({
  tickSamples,
  log: verbose ? log : () => {},
});

let fails = 0;
for (const t of tickSamples) {
  const want = fixture.ticks[t];
  const got = ticks[t];
  if (want === got) {
    console.log(`PASS  tick ${t}  ${got}`);
  } else {
    fails++;
    console.log(`FAIL  tick ${t}  want=${want}  got=${got}`);
  }
}
if (fails === 0) {
  console.log(`\n${tickSamples.length}/${tickSamples.length} ticks match fixture`);
  process.exit(0);
} else {
  console.log(`\n${fails}/${tickSamples.length} ticks DIFFER — rendering chain has changed`);
  process.exit(1);
}
