// @manual — do not regenerate.
//
// Source: decompiled/c/403c2a.c — the binary's main message-pump.
// FUN_00401000 spins `while (FUN_00403c2a()) { game tick }`. Returns
// 1 to keep running, 0 on WM_QUIT.
//
// Why hand-ported: the binary uses `goto LAB_00403caf` to break out of
// the do-while when WM_QUIT arrives. The translator's forward-goto
// pass only handles labels at the function-body scope, not labels
// inside an outer do-while, so the goto was lowered to `return 0` —
// making the message pump look like "always quit immediately". Even
// worse, it pumped no messages at all, so WM_SIZE never reached the
// WindowProc and the screen-dimension globals (DAT_005f15c4 /
// DAT_005f1b34) stayed 0, gating the title-screen render path.
//
// Cleanly restructured as `while (true) { ... break }` with the
// post-loop cleanup outside.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import {
  DispatchMessageA,
  IsDialogMessageA,
  IsWindow,
  PeekMessageA,
  TranslateMessage,
} from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004070e3 } from "./4070e3.js";

export function FUN_00403c2a(heap) {
  const __sp = heap.allocFrame(64);
  const __addr_local_24 = __sp + 0;
  try {
    let local_8 = 0;
    while (true) {
      const peek = (regs.eax = PeekMessageA(heap, __addr_local_24, 0, 0, 0, 1)) >>> 0;
      if (peek === 0) break;
      const msg = heap.u32(__addr_local_24 + 4);
      if (msg === 0x12) { local_8 = 1; break; }   // WM_QUIT
      const hwndDlg = heap.u32(0x005e91e0);
      const isWin = (regs.eax = IsWindow(heap, hwndDlg)) >>> 0;
      let consumed = 0;
      if (isWin !== 0) {
        consumed = (regs.eax = IsDialogMessageA(heap, hwndDlg, __addr_local_24)) >>> 0;
      }
      if (isWin === 0 || consumed === 0) {
        TranslateMessage(heap, __addr_local_24);
        DispatchMessageA(heap, __addr_local_24);
      }
    }
    regs.eax = FUN_004070e3(heap);
    return local_8 === 0 ? 1 : 0;
  } finally {
    heap.freeFrame(64);
  }
}
