// REVERTED — see PORTING-ROADMAP.md ADDENDUM 16.
//
// The 0x42280c cliff-corner painter port was attempted this session and
// reverted. It is NOT a clean port target: it is blocked by TWO interlocking
// bugs.
//
//   Bug 1 (interpreter): the 8-bit shift group `shift8Op` (harness/x86.js,
//   0xd0/0xd2) leaves CF STALE — the same class already fixed for the 32-bit
//   0xd1 handler (RLE-blit `shr ecx,1; jae` tail). So the cliff block's
//   `shr al,1; jae` corner gate reads the CF the preceding `or al,ah` cleared
//   to 0, and NO cliff corner ever draws — the painter is effectively dead
//   code. Fixing shift8Op CF is validated pixel-neutral (title/gameplay
//   0/307200) + sim-neutral (playability/interactive/viewport 23/23) EXCEPT it
//   un-suppresses the cliff corners.
//
//   Bug 2 (JS body fidelity): the 0x421d2c HOT-PATH JS body leaves eax/ebx
//   DESYNCED from the binary at the COLD cliff dispatch (measured eax=0x101 in
//   the body vs 0x300 in a from-entry interpreter run; 34/40 cliff tiles
//   differ). So once the CF gate works, the cliff corners render off the WRONG
//   eax — both the prior runBodyFrom(0x42280c) and a faithful JS port share the
//   body's wrong regs, so they match each other (lockstep memMis=0 over 238
//   cliff calls) but NEITHER matches the pristine binary.
//
// The gate frames (title_accuracy / gameplay_accuracy) contain no in-viewport
// cliff tiles, so the wrong corners are gate-invisible and can't be validated.
// A correct cliff port therefore needs BOTH: the shift8Op CF fix AND the
// 0x421d2c body's eax/ebx fidelity at the cliff dispatch (or routing cliff
// tiles to a from-entry interp run, which regresses cliff-tile perf). Until
// then the baseline `return runBodyFrom(0x42280c)` is forward-compatible (it
// auto-adapts once the interp CF is fixed) and is what ships.
//
// The fully-transcribed cliff-draw logic (4-corner selection trees + draw
// params, verified byte-exact vs the fixed interpreter) is preserved in this
// session's git history and ADDENDUM 16 for reuse when the follow-up lands.
process.stdout.write("0x42280c port reverted — see PORTING-ROADMAP.md ADDENDUM 16\n");
