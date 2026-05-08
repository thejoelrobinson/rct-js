#!/usr/bin/env node
// CLI: read a Ghidra C file, emit translated JS.
//
// Usage:
//   node tools/c-to-js/translate-cli.js decompiled/c/5df40c.c
//   node tools/c-to-js/translate-cli.js decompiled/c/5df40c.c -o ported/5df40c.js

import { readFileSync, writeFileSync } from "node:fs";
import { translateFunction } from "./translate.js";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: translate-cli.js <source.c> [-o <out.js>]");
  process.exit(1);
}

let inputPath = null;
let outputPath = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-o") outputPath = args[++i];
  else if (!inputPath) inputPath = args[i];
}

const source = readFileSync(inputPath, "utf8");
const { js, info } = await translateFunction(source);

if (outputPath) {
  writeFileSync(outputPath, js);
  console.error(`wrote ${outputPath} (${info.funcName} @ 0x${(info.funcAddr || 0).toString(16)})`);
  if (info.imports.length) console.error(`  imports: ${info.imports.join(", ")}`);
  if (info.calls.length)   console.error(`  calls:   ${info.calls.join(", ")}`);
} else {
  process.stdout.write(js);
}
