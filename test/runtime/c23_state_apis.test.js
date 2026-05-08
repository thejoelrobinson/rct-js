// Validation suite for C2.3 — state-tracking APIs.
//
// Each describe() block exercises a sub-module end-to-end:
//   - advapi32 registry roundtrip
//   - kernel32 VFS file read
//   - user32 RegisterClass + CreateWindow + PostMessage + DispatchMessage
//
// All tests run on a freshly constructed Heap, with clean state between
// cases via resetState().

import { describe, it, expect, beforeEach } from "vitest";
import { Heap } from "../../runtime/heap.js";
import {
  initHeap,
  CreateFileA, ReadFile, CloseHandle, GetFileSize, SetFilePointer,
  FindFirstFileA, FindNextFileA, FindClose,
} from "../../runtime/win32/kernel32.js";
import {
  RegOpenKeyA, RegOpenKeyExA, RegCreateKeyExA, RegCloseKey,
  RegSetValueExA, RegQueryValueExA, RegDeleteKeyA, _clearRegistry,
} from "../../runtime/win32/advapi32.js";
import {
  RegisterClassA, CreateWindowExA, PostMessageA, PeekMessageA, DispatchMessageA,
} from "../../runtime/win32/user32.js";
import { state, setRuntimeContext, resetState } from "../../runtime/win32/context.js";

const MEM_SIZE = 16 * 1024 * 1024;
const HKEY_LOCAL_MACHINE = 0x80000002 | 0;

let heap;

beforeEach(() => {
  resetState();
  _clearRegistry();
  const memory = new Uint8Array(MEM_SIZE);
  heap = new Heap(memory, MEM_SIZE);
  initHeap(MEM_SIZE * 0.4, MEM_SIZE * 0.7);
  // Reset SP so each test gets a fresh stack
  heap.sp = MEM_SIZE;
});

// ---- advapi32 ----

describe("advapi32 registry — roundtrip", () => {
  it("write then read DWORD value", () => {
    // RegCreateKeyExA HKLM\Software\Test → handle
    const subKeyAddr = heap.allocFrame(64);
    heap.writeCStr(subKeyAddr, "Software\\TestPath", 64);
    const phkResult = heap.allocFrame(4);
    let r = RegCreateKeyExA(heap, HKEY_LOCAL_MACHINE, subKeyAddr, 0, 0, 0, 0, 0, phkResult, 0);
    expect(r).toBe(0);
    const hKey = heap.u32(phkResult);
    expect(hKey).toBeGreaterThan(0);

    // Set value "MyVal" = 0xdeadbeef as DWORD (type 4)
    const valNameAddr = heap.allocFrame(32);
    heap.writeCStr(valNameAddr, "MyVal", 32);
    const dataAddr = heap.allocFrame(4);
    heap.setU32(dataAddr, 0xdeadbeef);
    r = RegSetValueExA(heap, hKey, valNameAddr, 0, 4, dataAddr, 4);
    expect(r).toBe(0);

    // Reopen via RegOpenKeyExA → handle
    const phkResult2 = heap.allocFrame(4);
    r = RegOpenKeyExA(heap, HKEY_LOCAL_MACHINE, subKeyAddr, 0, 0, phkResult2);
    expect(r).toBe(0);

    // Read back
    const lpType = heap.allocFrame(4);
    const lpData = heap.allocFrame(4);
    const lpcbData = heap.allocFrame(4);
    heap.setU32(lpcbData, 4);
    r = RegQueryValueExA(heap, heap.u32(phkResult2), valNameAddr, 0, lpType, lpData, lpcbData);
    expect(r).toBe(0);
    expect(heap.u32(lpType)).toBe(4);
    expect(heap.u32(lpcbData)).toBe(4);
    expect(heap.u32(lpData)).toBe(0xdeadbeef);

    RegCloseKey(heap, heap.u32(phkResult));
    RegCloseKey(heap, heap.u32(phkResult2));
  });

  it("RegOpenKey returns ERROR_FILE_NOT_FOUND for unwritten path", () => {
    const subKeyAddr = heap.allocFrame(64);
    heap.writeCStr(subKeyAddr, "Software\\NeverWritten", 64);
    const phkResult = heap.allocFrame(4);
    const r = RegOpenKeyA(heap, HKEY_LOCAL_MACHINE, subKeyAddr, phkResult);
    expect(r).toBe(2); // ERROR_FILE_NOT_FOUND
  });
});

// ---- kernel32 VFS ----

describe("kernel32 VFS — file open + read", () => {
  it("CreateFileA + ReadFile + GetFileSize on a fetch'd file", () => {
    // Set up VFS with a synthetic file
    const fileBytes = new Uint8Array([0x41, 0x42, 0x43, 0x44, 0x45]);   // "ABCDE"
    const vfs = new Map();
    vfs.set("test.dat", fileBytes);
    setRuntimeContext({ vfs });

    const lpFileName = heap.allocFrame(64);
    heap.writeCStr(lpFileName, "test.dat", 64);
    const hFile = CreateFileA(heap, lpFileName, 0, 0, 0, 0, 0, 0);
    expect(hFile).toBeGreaterThan(0);
    expect(hFile).not.toBe(0xffffffff | 0);

    // Size = 5
    expect(GetFileSize(heap, hFile, 0)).toBe(5);

    // Read 3 bytes
    const lpBuffer = heap.allocFrame(16);
    const lpBytesRead = heap.allocFrame(4);
    expect(ReadFile(heap, hFile, lpBuffer, 3, lpBytesRead, 0)).toBe(1);
    expect(heap.u32(lpBytesRead)).toBe(3);
    expect(heap.u8(lpBuffer + 0)).toBe(0x41);
    expect(heap.u8(lpBuffer + 1)).toBe(0x42);
    expect(heap.u8(lpBuffer + 2)).toBe(0x43);

    // Seek to start, read all 5
    SetFilePointer(heap, hFile, 0, 0, 0);
    expect(ReadFile(heap, hFile, lpBuffer, 5, lpBytesRead, 0)).toBe(1);
    expect(heap.u32(lpBytesRead)).toBe(5);
    expect(heap.u8(lpBuffer + 4)).toBe(0x45);

    CloseHandle(heap, hFile);
  });

  it("FindFirstFileA + FindNextFileA enumerates VFS by glob", () => {
    const vfs = new Map();
    vfs.set("css1.dat", new Uint8Array([0]));
    vfs.set("css2.dat", new Uint8Array([0]));
    vfs.set("readme.txt", new Uint8Array([0]));
    setRuntimeContext({ vfs });

    const pattern = heap.allocFrame(64);
    heap.writeCStr(pattern, "css*.dat", 64);
    const findData = heap.allocFrame(320);
    const hFind = FindFirstFileA(heap, pattern, findData);
    expect(hFind).toBeGreaterThan(0);
    expect(hFind).not.toBe(0xffffffff | 0);

    // First match recorded in findData
    expect(heap.readCStr(findData + 44)).toMatch(/^css[12]\.dat$/);

    // Second match
    expect(FindNextFileA(heap, hFind, findData)).toBe(1);
    expect(heap.readCStr(findData + 44)).toMatch(/^css[12]\.dat$/);

    // No more matches
    expect(FindNextFileA(heap, hFind, findData)).toBe(0);

    FindClose(heap, hFind);
  });
});

// ---- user32 ----

describe("user32 window + message subsystem", () => {
  it("RegisterClassA captures wndProc + name", () => {
    const wndClassAddr = heap.allocFrame(40);
    const namePtr = heap.allocFrame(32);
    heap.writeCStr(namePtr, "RCT.MainWindow", 32);

    heap.setU32(wndClassAddr + 0,  0);             // style
    heap.setU32(wndClassAddr + 4,  0xdeadbeef);    // wndProc
    heap.setU32(wndClassAddr + 36, namePtr);       // className

    const atom = RegisterClassA(heap, wndClassAddr);
    expect(atom).toBeGreaterThan(0);
    expect(atom).toBeLessThan(0x10000);
    expect(state.windowClasses.get(atom).wndProc).toBe(0xdeadbeef);
    expect(state.windowClasses.get(atom).name).toBe("RCT.MainWindow");
  });

  it("CreateWindowExA links to a registered class", () => {
    const wndClassAddr = heap.allocFrame(40);
    const namePtr = heap.allocFrame(32);
    heap.writeCStr(namePtr, "Foo", 32);
    heap.setU32(wndClassAddr + 4, 0x401234);
    heap.setU32(wndClassAddr + 36, namePtr);
    const atom = RegisterClassA(heap, wndClassAddr);

    const classNamePtr = heap.allocFrame(32);
    heap.writeCStr(classNamePtr, "Foo", 32);
    const hwnd = CreateWindowExA(heap, 0, classNamePtr, 0, 0, 0, 0, 800, 600, 0, 0, 0, 0);
    expect(hwnd).toBeGreaterThan(0);
    expect(state.firstHwnd).toBe(hwnd);
    expect(state.windows.get(hwnd).atom).toBe(atom);
  });

  it("Post → Peek → Dispatch round-trips through fnDispatch", () => {
    // Register class + window
    const wndClassAddr = heap.allocFrame(40);
    const namePtr = heap.allocFrame(32);
    heap.writeCStr(namePtr, "Bar", 32);
    heap.setU32(wndClassAddr + 4, 0x401234);
    heap.setU32(wndClassAddr + 36, namePtr);
    RegisterClassA(heap, wndClassAddr);

    const classNamePtr = heap.allocFrame(32);
    heap.writeCStr(classNamePtr, "Bar", 32);
    const hwnd = CreateWindowExA(heap, 0, classNamePtr, 0, 0, 0, 0, 800, 600, 0, 0, 0, 0);

    // Wire the WndProc dispatch — capture what got called
    let receivedMsg = null;
    state.fnDispatch.set(0x401234, (h, hWnd, msg, wParam, lParam) => {
      receivedMsg = { hWnd, msg, wParam, lParam };
      return 42;
    });

    // Post WM_TIMER (0x113), wParam=7, lParam=0
    PostMessageA(heap, hwnd, 0x113, 7, 0);
    expect(state.messageQueue.length).toBe(1);

    // Peek with PM_REMOVE
    const lpMsg = heap.allocFrame(28);
    expect(PeekMessageA(heap, lpMsg, 0, 0, 0, 1)).toBe(1);
    expect(heap.u32(lpMsg + 0)).toBe(hwnd);
    expect(heap.u32(lpMsg + 4)).toBe(0x113);
    expect(heap.u32(lpMsg + 8)).toBe(7);

    // Dispatch invokes our registered fnDispatch
    const result = DispatchMessageA(heap, lpMsg);
    expect(result).toBe(42);
    expect(receivedMsg).toEqual({ hWnd: hwnd, msg: 0x113, wParam: 7, lParam: 0 });
  });

  it("Peek returns 0 on empty queue", () => {
    const lpMsg = heap.allocFrame(28);
    expect(PeekMessageA(heap, lpMsg, 0, 0, 0, 1)).toBe(0);
  });
});
