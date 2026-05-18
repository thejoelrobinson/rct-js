#!/usr/bin/env node
// Capture back-buffer hashes at known tick offsets after a scripted boot
// sequence (TAS-style frame-hash replay). The captured fixture becomes the
// gold standard that future rewrites must reproduce.
//
// Boot sequence + hash mechanics live in tools/lib/replay-runner.js so the
// vitest replay test can share them verbatim.
//
// Usage:
//   node tools/capture-replay-hashes.js
//   node tools/capture-replay-hashes.js --ticks=1,5,15,30 --out=path/to/fixture.json

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { bootAndHash } from "./lib/replay-runner.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let outPath = "test/fixtures/title-screen-replay.json";
let tickSamples = [1, 5, 15, 30];
let maxTick = 0;
let verbose = false;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--out=")) outPath = a.slice(6);
  else if (a.startsWith("--ticks=")) tickSamples = a.slice(8).split(",").map((s) => parseInt(s, 10));
  else if (a.startsWith("--max-tick=")) maxTick = parseInt(a.slice(11), 10);
  else if (a === "--verbose" || a === "-v") verbose = true;
}

const log = (msg) => process.stderr.write(`[capture ${new Date().toISOString().slice(11,19)}] ${msg}\n`);
const { surfaceAddr, surfaceWidth, surfaceHeight, ticks } =
  await bootAndHash({ tickSamples, maxTick, log: verbose ? log : (m) => /^tick \d+ =/.test(m) && log(m) });

const fixture = {
  description: "Frame-hash replay fixture. Boot sequence: createRuntime → runInit → runTick → skipFadeIn → N runTick(). FNV-1a 32-bit hash over the GAME-BACK 640x480 surface.",
  surface: { width: surfaceWidth, height: surfaceHeight, addrHint: `0x${surfaceAddr.toString(16)}` },
  capturedAt: new Date().toISOString(),
  ticks,
};

const outFull = resolve(ROOT, outPath);
mkdirSync(dirname(outFull), { recursive: true });
writeFileSync(outFull, JSON.stringify(fixture, null, 2) + "\n");
console.log(`wrote ${Object.keys(ticks).length} hashes to ${outPath}`);
for (const [t, h] of Object.entries(ticks)) console.log(`  tick ${t}: ${h}`);
