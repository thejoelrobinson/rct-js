// One-off: capture callIndirect misses during GAMEPLAY (skipTitleIntro) ticks,
// with JS caller names and objdump classification of each target address.
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let _t = 1700000000000; Date.now = () => ++_t;
globalThis._renderTrace = () => {};

const misses = new Map(); // addr -> {hits, callers:Map}
globalThis._missingIndirectHook = (a) => {
  let rec = misses.get(a);
  if (!rec) { rec = { hits: 0, callers: new Map() }; misses.set(a, rec); }
  rec.hits++;
  const stack = new Error().stack || "";
  const m = stack.match(/at (FUN_[0-9a-fx]+|\w+) /g) || [];
  const caller = (m.find(s => s.includes("FUN_")) || m[2] || "?").trim();
  rec.callers.set(caller, (rec.callers.get(caller) || 0) + 1);
};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import(resolve(ROOT, "runtime/harness.js"));
const vfs = new Map();
for (const f of readdirSync(resolve(ROOT, "web/assets"))) {
  const p = join(ROOT, "web/assets", f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) if (!vfs.has(n)) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch (e) { console.log("init ERR", e.message); }
try { r.runTick(); } catch (e) { console.log("tick0 ERR", e.message); }
skipFadeIn(r.heap); skipTitleIntro(r.heap);
misses.clear(); // only count gameplay-phase misses... actually keep boot ones separate
const TICKS = parseInt(process.env.TICKS || "60", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR`, e.message); } }

// classify each addr via objdump on the PE (image base 0x400000)
const PE = resolve(ROOT, "binary/rct.exe");
function disasm(addr) {
  try {
    const out = execSync(
      `objdump -d -M intel --start-address=0x${addr.toString(16)} --stop-address=0x${(addr + 24).toString(16)} "${PE}" 2>/dev/null | tail -n +8 | head -6`,
      { encoding: "utf8" });
    return out.trim();
  } catch { return "(objdump failed)"; }
}

console.log(`\n=== ${misses.size} distinct gameplay-phase misses ===`);
for (const [a, rec] of [...misses.entries()].sort((x, y) => y[1].hits - x[1].hits)) {
  const callers = [...rec.callers.entries()].map(([c, n]) => `${c}×${n}`).join(", ");
  console.log(`\n0x${a.toString(16)}  hits=${rec.hits}  callers: ${callers}`);
  console.log(disasm(a).split("\n").map(s => "    " + s).join("\n"));
}
