// Catch ALL writes to [0x5f96e0..0x5f96ec], group by call site, find 0xff smearing.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = "/Users/joelrobinson/rct-js";
const LO = 0x005f96e0;
const HI = 0x005f96ed;  // inclusive end+1

const events = [];

function cap(stack) {
  return stack.split("\n").slice(2, 6).join("\n");
}

globalThis._x86Watch = {
  lo: LO,
  hi: HI,
  cb: (addr, size, value) => {
    if (events.length > 5000) return;
    events.push({ src: "x86", addr, size, value, stack: cap(new Error().stack) });
  },
};
globalThis._heapWatch = {
  lo: LO,
  hi: HI,
  cb: (addr, size, value, kind) => {
    if (events.length > 5000) return;
    events.push({ src: "heap-" + kind, addr, size, value: value >>> 0, stack: cap(new Error().stack) });
  },
};

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const VFS_PLACEHOLDERS = ["css10.dat","css12.dat","css16.dat","tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) { try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); } catch (e) {} }
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { console.error("init err:", String(e).slice(0,200)); }

events.length = 0;
try { r.runTick(); } catch (e) { console.error("tick err:", String(e).slice(0,200)); }

console.log(`Total writes in [${LO.toString(16)}..${HI.toString(16)}]: ${events.length}`);
console.log(`Final: [e0]=0x${r.heap.u32(0x5f96e0).toString(16).padStart(8,"0")} [e4]=0x${r.heap.u32(0x5f96e4).toString(16).padStart(8,"0")} [e8]=0x${r.heap.u32(0x5f96e8).toString(16).padStart(8,"0")}`);

// Group by call site (first frame)
const groups = new Map();
for (const e of events) {
  const firstFrame = e.stack.split("\n")[1]?.trim().split(" ").slice(1).join(" ") || "?";
  const key = `${e.src} sz=${e.size} site=${firstFrame}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(e);
}

console.log("\n=== Groups ===");
for (const [key, list] of groups) {
  const distinctAddrs = new Set(list.map(e => e.addr));
  const distinctValues = new Set(list.map(e => e.value & 0xff));
  console.log(`[${list.length}× addrs={${[...distinctAddrs].slice(0,10).map(a=>"0x"+a.toString(16)).join(",")}}${distinctAddrs.size>10?"...":""} vals_lo={${[...distinctValues].slice(0,10).map(v=>"0x"+v.toString(16)).join(",")}}${distinctValues.size>10?"...":""}] ${key}`);
}

// Show first 0xff write specifically
console.log("\n=== First write with value=0xff* ===");
const ffWrites = events.filter(e => (e.value & 0xff) === 0xff);
console.log(`Total 0xff writes: ${ffWrites.length}`);
if (ffWrites.length) {
  const first = ffWrites[0];
  console.log(`addr=0x${first.addr.toString(16)} size=${first.size} value=0x${first.value.toString(16)}`);
  console.log(first.stack);
}

// Last 3 writes touching 0x5f96e8 specifically
console.log("\n=== Writes touching 0x5f96e8 ===");
const e8Writes = events.filter(e => e.addr <= 0x5f96e8 && e.addr + e.size > 0x5f96e8);
console.log(`Total: ${e8Writes.length}`);
for (const e of e8Writes.slice(0, 5)) {
  console.log(`addr=0x${e.addr.toString(16)} size=${e.size} value=0x${e.value.toString(16)}`);
  console.log(e.stack);
  console.log("---");
}
for (const e of e8Writes.slice(-3)) {
  console.log(`LAST: addr=0x${e.addr.toString(16)} size=${e.size} value=0x${e.value.toString(16)}`);
  console.log(e.stack);
  console.log("---");
}
