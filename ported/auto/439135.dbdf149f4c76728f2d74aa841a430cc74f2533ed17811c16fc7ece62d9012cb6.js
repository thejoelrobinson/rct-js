// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/439135.c.
// Source disasm: objdump -d binary/rct.exe --start-address=0x439135 --stop-address=0x439178
//
// The binary walks a sprite-list-style linked list anchored at
// DAT_0087c398 (16-bit id, 0xffff = end). Each record is at
// 0x743b94 + id*0x100 (record size 0x100). The "next id" word lives at
// record+0x4 (i.e. 0x743b98 + id*0x100).
//
// The Ghidra C decompile re-expressed this as
//   (&DAT_00743b98)[(uint)uVar2 * 0x80]
// where &DAT_00743b98 is a ushort*, so [idx] = idx * 2 bytes, giving
// the correct 0x100-byte stride. The translator naively multiplied
// 0x80 * 4 (assuming i32 indexing) giving a 0x200 stride — wrong.
//
// Second translator drop: the C code calls FUN_00439288 / FUN_00439822
// with no args, but the binary passes ESI = record base ptr (per-iter).
// Auto-translation just sets regs.esi = 0x743b94 (constant) for every
// call, so callees read fields off a fixed addr instead of the current
// record. We must restore regs.esi = 0x743b94 + uVar2 * 0x100 each iter
// before invoking the callees.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00439288 } from "./439288.js";
import { FUN_00439822 } from "./439822.js";

export function FUN_00439135(heap) {
  let uVar1 = 0; // iteration counter (edx)
  let uVar2 = heap.u16(0x0087c398) & 0xffff; // current sprite id (si)
  while (uVar2 !== 0xffff) {
    const recordBase = (0x00743b94 + uVar2 * 0x100) >>> 0;
    // Read next id BEFORE calling callees (binary pushes pushw 0x4(%esi)
    // before the calls, then pops back into si afterward). Callees may
    // mutate the record's link field, so capture the snapshot now.
    const nextId = heap.u16((recordBase + 4) >>> 0) & 0xffff;
    if ((uVar1 & 0x7f) === (heap.u32(0x0088741c) & 0x7f)) {
      regs.esi = recordBase;
      regs.eax = FUN_00439288(heap);
    }
    regs.esi = recordBase;
    regs.eax = FUN_00439822(heap);
    uVar2 = nextId;
    uVar1 = (uVar1 + 1) >>> 0;
  }
  return;
}
