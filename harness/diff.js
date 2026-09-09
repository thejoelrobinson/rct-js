// Pretty-print differences between two captured states.
// Used by tests to surface "the JS port disagrees with the original" cleanly.

export function diffStates(actual, expected) {
  const lines = [];
  const regs = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];
  for (const r of regs) {
    // Only compare registers the port explicitly claims to set.
    if (actual.regs?.[r] === undefined) continue;
    if ((actual.regs[r] >>> 0) !== (expected.regs?.[r] >>> 0)) {
      lines.push(
        `  ${r}: port=0x${(actual.regs[r] >>> 0).toString(16).padStart(8, "0")}   ` +
        `original=0x${(expected.regs?.[r] >>> 0).toString(16).padStart(8, "0")}`,
      );
    }
  }
  const memKeys = new Set([
    ...Object.keys(actual.mem32 ?? {}),
    ...Object.keys(expected.mem32 ?? {}),
  ]);
  for (const k of memKeys) {
    const a = actual.mem32?.[k] >>> 0;
    const e = expected.mem32?.[k] >>> 0;
    if (a !== e) {
      lines.push(
        `  mem ${k}: port=0x${a.toString(16).padStart(8, "0")}   ` +
        `original=0x${e.toString(16).padStart(8, "0")}`,
      );
    }
  }
  return lines.length === 0 ? "(states match)" : "DIFF:\n" + lines.join("\n");
}
