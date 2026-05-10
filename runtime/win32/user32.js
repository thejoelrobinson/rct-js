// runtime/win32/user32.js — windows, messages, dialogs, cursors/icons,
// timers, paint, focus/capture, system metrics, MessageBoxA.
//
// Lifted from harness/shims.js with cpu.memory[] → heap.bytes[]. The major
// behavioural change: DispatchMessageA / SendMessageA now look up the
// target WindowProc in state.fnDispatch (filled by the harness from
// ported/auto/<addr>.js) instead of calling into x86 binary code.

import { state } from "./context.js";

// ---- Helpers ----

function writeMSG(heap, addr, m) {
  heap.setU32(addr + 0,  m.hwnd);
  heap.setU32(addr + 4,  m.msg);
  heap.setU32(addr + 8,  m.wParam);
  heap.setU32(addr + 12, m.lParam);
  heap.setU32(addr + 16, m.time);
  heap.setU32(addr + 20, m.ptX);
  heap.setU32(addr + 24, m.ptY);
}

function callWndProc(heap, wndProcAddr, hwnd, msg, wParam, lParam) {
  const fn = state.fnDispatch.get(wndProcAddr | 0);
  if (typeof fn !== "function") {
    if (typeof console !== "undefined") {
      console.warn(`[user32] no JS fn registered for WndProc 0x${(wndProcAddr|0).toString(16)} — DefWindowProc-ish 0`);
    }
    return 0;
  }
  return fn(heap, hwnd, msg, wParam, lParam) | 0;
}

export function postWindowMessage(hwnd, msg, wParam = 0, lParam = 0) {
  state.messageQueue.push({
    hwnd: hwnd >>> 0,
    msg: msg >>> 0,
    wParam: wParam >>> 0,
    lParam: lParam >>> 0,
    time: Date.now() & 0xffffffff,
    ptX: 0,
    ptY: 0,
  });
}

// ---- MessageBox / Quit ----

let _exitRequested = false;
export function isExitRequested() { return _exitRequested; }

export function MessageBoxA(heap, hWnd, lpText, lpCaption, uType) {
  const text = lpText ? heap.readCStr(lpText) : "";
  const caption = lpCaption ? heap.readCStr(lpCaption) : "";
  if (typeof alert !== "undefined") alert(`${caption}\n${text}`);
  else if (typeof console !== "undefined") console.log(`[MessageBox] ${caption}: ${text}`);
  return 1; // IDOK
}
export function MessageBoxW(heap, hWnd, lpText, lpCaption, uType) {
  return MessageBoxA(heap, hWnd, lpText, lpCaption, uType);
}

export function PostQuitMessage(heap, nExitCode) {
  _exitRequested = true;
  postWindowMessage(0, 0x12, nExitCode, 0); // WM_QUIT
  return 0;
}

// ---- Window classes ----

export function RegisterClassA(heap, lpWndClass) {
  // WNDCLASS layout: style(0) wndProc(4) cbClsExtra(8) cbWndExtra(12) hInstance(16)
  //                  hIcon(20) hCursor(24) hbrBackground(28) menu(32) className(36)
  const wndProc = heap.u32(lpWndClass + 4);
  const namePtr = heap.u32(lpWndClass + 36);
  const name = namePtr ? heap.readCStr(namePtr) : `_anon_${state.nextClassAtom}`;
  const atom = state.nextClassAtom++;
  state.windowClasses.set(atom, { wndProc, name });
  state.windowsByName.set(name, atom);
  return atom;
}
export function RegisterClassExA(heap, lpWndClassEx) {
  // WNDCLASSEX: cbSize(0) style(4) wndProc(8) cbClsExtra(12) cbWndExtra(16)
  //             hInstance(20) hIcon(24) hCursor(28) hbrBackground(32) menu(36)
  //             className(40) hIconSm(44)
  const wndProc = heap.u32(lpWndClassEx + 8);
  const namePtr = heap.u32(lpWndClassEx + 40);
  const name = namePtr ? heap.readCStr(namePtr) : `_anon_${state.nextClassAtom}`;
  const atom = state.nextClassAtom++;
  state.windowClasses.set(atom, { wndProc, name });
  state.windowsByName.set(name, atom);
  return atom;
}
export function UnregisterClassA(heap, lpClassName, hInstance) { return 1; }

// ---- Window instances ----

export function CreateWindowExA(heap, dwExStyle, lpClassName, lpWindowName, dwStyle, x, y, w, h, hWndParent, hMenu, hInstance, lpParam) {
  let atom;
  // lpClassName is either an atom (low 16 bits) or a string pointer.
  if ((lpClassName >>> 16) === 0 && lpClassName < 0x10000) {
    atom = lpClassName & 0xffff;
  } else if (lpClassName) {
    atom = state.windowsByName.get(heap.readCStr(lpClassName));
  } else {
    atom = 0;
  }
  const hwnd = state.nextHwnd++;
  // Default size if caller passed CW_USEDEFAULT (0x80000000) or zero.
  const cw = (w | 0) > 0 ? w : 640;
  const ch = (h | 0) > 0 ? h : 480;
  state.windows.set(hwnd, { atom, x, y, w: cw, h: ch });
  if (!state.firstHwnd) state.firstHwnd = hwnd;
  // Real Win32 SENDS (synchronous) WM_SIZE and WM_ACTIVATEAPP during
  // CreateWindowEx, before returning. The binary's WindowProc (FUN_00403d79
  // case 4) reads WM_SIZE to populate DAT_005f15c4 (screen width). Without
  // synchronous delivery, FUN_009bb6af's gate at 9bb6af.js:25 — which
  // requires DAT_005f15c4 > 0x3f — runs on tick 1 before WM_SIZE is
  // dispatched, falls into its fallback path, and the title-screen paint
  // pipeline (FUN_009bb9f5 + FUN_009bb717) never runs.
  //
  // WM_ACTIVATEAPP (0x1C) similarly populates DAT_005e9174 — the other
  // half of the same gate.
  //
  // wParam=SIZE_RESTORED(0); lParam=(height<<16)|width.
  //
  // Synchronous dispatch only when the WindowProc is wired into
  // fnDispatch (real boot). In test scenarios where RegisterClassA was
  // called with a wndProc address but no JS function is registered, fall
  // back to posting so the test's own dispatch wiring can pick them up.
  const cls = state.windowClasses.get(atom);
  const wndProcAddr = cls ? (cls.wndProc | 0) : 0;
  if (wndProcAddr && state.fnDispatch.has(wndProcAddr)) {
    callWndProc(heap, wndProcAddr, hwnd, 0x0005, 0, ((ch & 0xffff) << 16) | (cw & 0xffff));
    callWndProc(heap, wndProcAddr, hwnd, 0x001C, 1, 0);
  } else {
    postWindowMessage(hwnd, 0x0005, 0, ((ch & 0xffff) << 16) | (cw & 0xffff));
    postWindowMessage(hwnd, 0x001C, 1, 0);
  }
  return hwnd;
}
export function CreateWindowExW(heap, ...args) {
  // Treat as the same path; class-name lookup may not match but we return a hwnd.
  return CreateWindowExA(heap, ...args);
}

export function DestroyWindow(heap, hWnd) { state.windows.delete(hWnd); return 1; }
export function ShowWindow(heap, hWnd, nCmdShow) { return 1; }
export function UpdateWindow(heap, hWnd) { return 1; }
export function MoveWindow(heap, hWnd, x, y, w, h, bRepaint) {
  const win = state.windows.get(hWnd);
  if (win) { win.x = x; win.y = y; win.w = w; win.h = h; }
  return 1;
}
export function SetWindowPos(heap, hWnd, hWndInsertAfter, x, y, cx, cy, uFlags) {
  const win = state.windows.get(hWnd);
  if (win) { win.x = x; win.y = y; win.w = cx; win.h = cy; }
  return 1;
}
export function SetWindowTextA(heap, hWnd, lpString) { return 1; }
export function GetWindowTextA(heap, hWnd, lpBuffer, nMax) {
  if (lpBuffer && nMax > 0) heap.setU8(lpBuffer, 0);
  return 0;
}
export function IsWindow(heap, hWnd) { return state.windows.has(hWnd) ? 1 : 0; }
export function IsIconic(heap, hWnd) { return 0; }
export function IsZoomed(heap, hWnd) { return 0; }
export function GetParent(heap, hWnd) { return 0; }
export function GetNextWindow(heap, hWnd, uCmd) { return 0; }
export function GetActiveWindow(heap) { return state.firstHwnd; }
export function GetForegroundWindow(heap) { return state.firstHwnd; }
export function SetActiveWindow(heap, hWnd) { return state.firstHwnd; }
export function FlashWindow(heap, hWnd, bInvert) { return 0; }

// ---- Window rect / position ----

function writeRect(heap, addr, l, t, r, b) {
  heap.setU32(addr + 0,  l | 0);
  heap.setU32(addr + 4,  t | 0);
  heap.setU32(addr + 8,  r | 0);
  heap.setU32(addr + 12, b | 0);
}

export function GetWindowRect(heap, hWnd, lpRect) {
  const win = state.windows.get(hWnd);
  const x = win ? (win.x | 0) : 0;
  const y = win ? (win.y | 0) : 0;
  const w = win ? (win.w | 0) || 800 : 800;
  const h = win ? (win.h | 0) || 600 : 600;
  writeRect(heap, lpRect, x, y, x + w, y + h);
  return 1;
}
export function GetClientRect(heap, hWnd, lpRect) {
  const win = state.windows.get(hWnd);
  const w = win ? (win.w | 0) || 800 : 800;
  const h = win ? (win.h | 0) || 600 : 600;
  writeRect(heap, lpRect, 0, 0, w, h);
  return 1;
}
export function ClientToScreen(heap, hWnd, lpPoint) { return 1; }
export function ScreenToClient(heap, hWnd, lpPoint) { return 1; }
export function GetCursorPos(heap, lpPoint) {
  if (lpPoint) { heap.setU32(lpPoint, 0); heap.setU32(lpPoint + 4, 0); }
  return 1;
}
export function SetCursorPos(heap, x, y) { return 1; }

// ---- Paint ----

export function ValidateRect(heap, hWnd, lpRect) { return 1; }
export function InvalidateRect(heap, hWnd, lpRect, bErase) { return 1; }
export function GetUpdateRect(heap, hWnd, lpRect, bErase) {
  // Report a full-screen invalidation. The binary's WM_PAINT path
  // (FUN_00403d79 case 0xf → FUN_00401120) reads this rect and feeds it
  // to FUN_004015f0 (invalidate-rect), which marks the dirty mask that
  // gates FUN_004026ec / FUN_00401972 (the actual paint dispatchers).
  // Returning an empty rect leaves the dirty mask empty → no paint.
  if (lpRect) writeRect(heap, lpRect, 0, 0, 640, 480);
  return 1;
}
// Win32 region-type returns: 1=NULLREGION (empty), 2=SIMPLEREGION
// (single rect — FUN_00401120 then calls FUN_004015f0 with the RECT we
// passed to it), 3=COMPLEXREGION (walk via GetRegionData). Returning 2
// makes 401120 take the SIMPLEREGION path with our full-screen rect.
export function GetUpdateRgn(heap, hWnd, hRgn, bErase) { return 2; }
export function BeginPaint(heap, hWnd, lpPaint) { return 0x20000001; }
export function EndPaint(heap, hWnd, lpPaint) { return 1; }

// ---- DC ----

export function GetDC(heap, hWnd) { return 0x20000000 | (hWnd & 0xffff); }
export function GetWindowDC(heap, hWnd) { return GetDC(heap, hWnd); }
export function ReleaseDC(heap, hWnd, hDC) { return 1; }

// ---- Window long / extra ----

export function GetWindowLongA(heap, hWnd, nIndex) { return 0; }
export function SetWindowLongA(heap, hWnd, nIndex, dwNewLong) { return 0; }
export function GetClassLongA(heap, hWnd, nIndex) { return 0; }
export function SetClassLongA(heap, hWnd, nIndex, dwNewLong) { return 0; }

// ---- Message queue ----

export function PeekMessageA(heap, lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg) {
  if (state.messageQueue.length === 0) return 0;
  const m = (wRemoveMsg & 1) ? state.messageQueue.shift() : state.messageQueue[0];
  writeMSG(heap, lpMsg, m);
  return 1;
}
export function PeekMessageW(heap, lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg) {
  return PeekMessageA(heap, lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg);
}
export function GetMessageA(heap, lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax) {
  if (state.messageQueue.length === 0) return 0;
  const m = state.messageQueue.shift();
  writeMSG(heap, lpMsg, m);
  return m.msg === 0x12 ? 0 : 1;
}
export function PostMessageA(heap, hWnd, msg, wParam, lParam) {
  postWindowMessage(hWnd, msg, wParam, lParam);
  return 1;
}
export function PostMessageW(heap, hWnd, msg, wParam, lParam) {
  return PostMessageA(heap, hWnd, msg, wParam, lParam);
}
export function PostThreadMessageA(heap, idThread, msg, wParam, lParam) {
  postWindowMessage(state.firstHwnd, msg, wParam, lParam);
  return 1;
}
export function TranslateMessage(heap, lpMsg) { return 0; }
export function DispatchMessageA(heap, lpMsg) {
  const hwnd   = heap.u32(lpMsg + 0);
  const msg    = heap.u32(lpMsg + 4);
  const wParam = heap.u32(lpMsg + 8);
  const lParam = heap.u32(lpMsg + 12);
  const win = state.windows.get(hwnd);
  if (!win) return 0;
  const cls = state.windowClasses.get(win.atom);
  if (!cls || !cls.wndProc) return 0;
  return callWndProc(heap, cls.wndProc, hwnd, msg, wParam, lParam);
}
export function DispatchMessageW(heap, lpMsg) { return DispatchMessageA(heap, lpMsg); }
export function SendMessageA(heap, hWnd, msg, wParam, lParam) {
  const win = state.windows.get(hWnd);
  if (!win) return 0;
  const cls = state.windowClasses.get(win.atom);
  if (!cls || !cls.wndProc) return 0;
  return callWndProc(heap, cls.wndProc, hWnd, msg, wParam, lParam);
}
export function SendMessageW(heap, hWnd, msg, wParam, lParam) {
  return SendMessageA(heap, hWnd, msg, wParam, lParam);
}
export function CallWindowProcA(heap, lpPrevWndFunc, hWnd, msg, wParam, lParam) {
  return callWndProc(heap, lpPrevWndFunc, hWnd, msg, wParam, lParam);
}
export function DefWindowProcA(heap, hWnd, msg, wParam, lParam) { return 0; }
export function DefWindowProcW(heap, hWnd, msg, wParam, lParam) { return 0; }
export function IsDialogMessageA(heap, hDlg, lpMsg) { return 0; }

// ---- Capture / focus ----

export function SetCapture(heap, hWnd) { return 0; }
export function ReleaseCapture(heap) { return 1; }
export function GetCapture(heap) { return 0; }
export function SetFocus(heap, hWnd) { return 0; }
export function GetFocus(heap) { return 0; }

// ---- Timers ----

export function SetTimer(heap, hWnd, nIDEvent, uElapse, lpTimerFunc) {
  const id = nIDEvent || state.nextTimerId++;
  // In Node tests we don't actually fire; just register.
  let intervalId = null;
  if (typeof setInterval !== "undefined" && uElapse > 0) {
    intervalId = setInterval(() => {
      postWindowMessage(hWnd, 0x113, id, 0);  // WM_TIMER
    }, uElapse);
  }
  state.timers.set(id, { hwnd: hWnd, ms: uElapse, intervalId });
  return id;
}
export function KillTimer(heap, hWnd, uIDEvent) {
  const t = state.timers.get(uIDEvent);
  if (t && t.intervalId !== null) clearInterval(t.intervalId);
  state.timers.delete(uIDEvent);
  return 1;
}

// ---- Cursors / icons / images ----

export function LoadCursorA(heap, hInstance, lpCursorName) { return 0x10100001; }
export function LoadCursorFromFileA(heap, lpFileName) { return 0x10100002; }
export function LoadIconA(heap, hInstance, lpIconName) { return 0x10100003; }
export function LoadImageA(heap, hInst, name, type, cx, cy, fuLoad) { return 0x10100004; }
export function DestroyCursor(heap, hCursor) { return 1; }
export function DestroyIcon(heap, hIcon) { return 1; }
export function SetCursor(heap, hCursor) { return 0; }
export function ShowCursor(heap, bShow) { return bShow ? 1 : -1; }

// ---- System metrics / palette / drawing assists ----

export function GetSystemMetrics(heap, nIndex) {
  // Common SM_* values; defaults sized for an 800x600 window.
  switch (nIndex) {
    case 0:  return 800;     // SM_CXSCREEN
    case 1:  return 600;     // SM_CYSCREEN
    case 2:  return 17;      // SM_CXVSCROLL
    case 3:  return 17;      // SM_CYHSCROLL
    case 4:  return 18;      // SM_CYCAPTION
    case 32: return 1;       // SM_MOUSEPRESENT
    case 67: return 32;      // SM_CXFOCUSBORDER
    case 68: return 32;      // SM_CYFOCUSBORDER
    default: return 0;
  }
}
export function GetSystemPaletteEntries(heap, hDC, iStartIndex, nEntries, lpPaletteEntries) {
  // Fill with neutral grey ramp; real impl reads gdi32's palette.
  for (let i = 0; i < nEntries; i++) {
    const v = (i * 255 / nEntries) | 0;
    heap.setU8(lpPaletteEntries + i * 4 + 0, v);
    heap.setU8(lpPaletteEntries + i * 4 + 1, v);
    heap.setU8(lpPaletteEntries + i * 4 + 2, v);
    heap.setU8(lpPaletteEntries + i * 4 + 3, 0);
  }
  return nEntries;
}
export function GetSystemPaletteUse(heap, hDC) { return 1; }   // SYSPAL_STATIC
export function SetSystemPaletteUse(heap, hDC, uUsage) { return 1; }

// ---- Dialog APIs ----

export function CreateDialogParamA(heap, hInstance, lpTemplateName, hWndParent, lpDialogFunc, dwInitParam) { return 0; }
export function DialogBoxParamA(heap, hInstance, lpTemplateName, hWndParent, lpDialogFunc, dwInitParam) { return 1; }
export function EndDialog(heap, hDlg, nResult) { return 1; }
export function GetDlgItem(heap, hDlg, nIDDlgItem) { return 0; }
export function GetDlgItemTextA(heap, hDlg, nIDDlgItem, lpString, nMaxCount) { return 0; }
export function SendDlgItemMessageA(heap, hDlg, nIDDlgItem, msg, wParam, lParam) { return 0; }
export function SetDlgItemTextA(heap, hDlg, nIDDlgItem, lpString) { return 1; }

// ---- Mouse helpers ----

export function GetKeyState(heap, nVirtKey) { return 0; }
export function GetAsyncKeyState(heap, vKey) { return 0; }

// ---- System parameters ----

export function SystemParametersInfoA(heap, uiAction, uiParam, pvParam, fWinIni) {
  // Most callers just want the current screen size or font metrics — return
  // success with zero-filled output; binary's defaults take over.
  // We don't know the buffer size from the caller (it varies per uiAction),
  // and writing too much overruns the caller's stack slot. Write only a
  // single 4-byte int — covers SPI_GET* actions that return a BOOL/UINT
  // and is small enough for the most common stack alloc.
  if (pvParam) heap.setU32(pvParam, 0);
  return 1;
}

