// runtime/win32/kernel32.js
//
// KERNEL32.dll — heap, time, process, environment, modules, sync.
// Lifted from harness/shims.js with cpu.memory[] swapped for heap.bytes[]
// and cpu.regs.eax-return rewritten as JS return.
//
// Module-scope state is intentional: at most one runtime instance per page.
// To run multiple games in parallel (e.g. for a tournament view), refactor
// to a per-instance context object — for now we keep the existing simple
// model.

// ---- Heap allocator ----
//
// Bump allocator carving out a region of the shared memory buffer. The
// caller's runtime initializer calls initHeap() once with [base, limit).
// Free is a no-op; the binary's lifetime is the page's lifetime.

let _heapBase = 0;
let _heapPtr = 0;
let _heapLimit = 0;

export function initHeap(base, limit) {
  _heapBase = base | 0;
  _heapPtr = base | 0;
  _heapLimit = limit | 0;
}

export function heapAlloc(size) {
  if (_heapBase === 0) throw new Error("heap not initialised — call initHeap()");
  size = (size + 7) & ~7;
  if (_heapPtr + size > _heapLimit) {
    throw new Error(`heap exhausted (requested ${size}, used ${(_heapPtr - _heapBase).toLocaleString()})`);
  }
  const ptr = _heapPtr;
  _heapPtr += size;
  return ptr;
}

// ---- Heap APIs ----
//
// Win32 has three flavours of allocator (Heap*, Global*, Local*, Virtual*) —
// we route them all to the same bump allocator. Handles == pointers.

export function HeapCreate(heap, flOptions, dwInitialSize, dwMaximumSize) { return 0x10000000; }
export function HeapDestroy(heap, hHeap) { return 1; }
export function GetProcessHeap(heap) { return 0x10000000; }
export function HeapAlloc(heap, hHeap, dwFlags, dwBytes) { return heapAlloc(dwBytes); }
export function HeapFree(heap, hHeap, dwFlags, lpMem) { return 1; }
export function HeapReAlloc(heap, hHeap, dwFlags, lpMem, dwBytes) { return heapAlloc(dwBytes); }

export function VirtualAlloc(heap, lpAddress, dwSize, flAllocationType, flProtect) {
  if (lpAddress) return lpAddress;     // honour explicit base address
  return heapAlloc(dwSize);
}
export function VirtualFree(heap, lpAddress, dwSize, dwFreeType) { return 1; }
export function VirtualProtect(heap, lpAddress, dwSize, flNewProtect, lpflOldProtect) {
  if (lpflOldProtect) heap.setU32(lpflOldProtect, 0x40); // PAGE_EXECUTE_READWRITE
  return 1;
}

export function GlobalAlloc(heap, uFlags, dwBytes) { return heapAlloc(dwBytes); }
export function GlobalFree(heap, hMem) { return 0; }
export function GlobalLock(heap, hMem) { return hMem; }     // handle == pointer
export function GlobalUnlock(heap, hMem) { return 1; }
export function GlobalHandle(heap, pMem) { return pMem; }
export function LocalAlloc(heap, uFlags, uBytes) { return heapAlloc(uBytes); }
export function LocalFree(heap, hMem) { return 0; }

export function GlobalMemoryStatus(heap, lpBuffer) {
  // MEMORYSTATUS layout (32 bytes):
  //   DWORD dwLength            (0)
  //   DWORD dwMemoryLoad        (4)
  //   DWORD dwTotalPhys         (8)
  //   DWORD dwAvailPhys        (12)
  //   DWORD dwTotalPageFile    (16)
  //   DWORD dwAvailPageFile    (20)
  //   DWORD dwTotalVirtual     (24)
  //   DWORD dwAvailVirtual     (28)
  if (!lpBuffer) return 0;
  heap.setU32(lpBuffer + 0,  32);
  heap.setU32(lpBuffer + 4,  10);                 // 10% memory load — arbitrary
  heap.setU32(lpBuffer + 8,  0x40000000);         // 1 GB
  heap.setU32(lpBuffer + 12, 0x30000000);         //   .75 GB available
  heap.setU32(lpBuffer + 16, 0x80000000);         // 2 GB page-file
  heap.setU32(lpBuffer + 20, 0x70000000);
  heap.setU32(lpBuffer + 24, 0x80000000);
  heap.setU32(lpBuffer + 28, 0x70000000);
  return 0;
}

// ---- Process / threading / sync (single-threaded JS — mostly no-ops) ----

export function GetCurrentProcess(heap) { return 0xffffffff | 0; }   // pseudo-handle
export function GetCurrentThread(heap)  { return 0xfffffffe | 0; }
export function GetCurrentProcessId(heap) { return 1; }
export function GetCurrentThreadId(heap)  { return 1; }
export function ExitProcess(heap, code) { /* runtime can decide; throw an exit signal */
  if (typeof globalThis !== "undefined") globalThis.__rct_exitCode = code;
  throw new Error(`ExitProcess(${code})`);
}
export function TerminateProcess(heap, hProcess, uExitCode) {
  if (typeof globalThis !== "undefined") globalThis.__rct_exitCode = uExitCode;
  throw new Error(`TerminateProcess(${uExitCode})`);
}
export function UnhandledExceptionFilter(heap, exceptionInfo) {
  // Win32 returns one of:
  //   EXCEPTION_CONTINUE_SEARCH = 0
  //   EXCEPTION_EXECUTE_HANDLER = 1
  //   EXCEPTION_CONTINUE_EXECUTION = -1
  // We'll log + continue searching so SEH chain unwinds normally.
  if (typeof console !== "undefined") {
    console.warn("[UnhandledExceptionFilter]", exceptionInfo);
  }
  return 0;
}
export function GetThreadPriority(heap, hThread) { return 0; }       // THREAD_PRIORITY_NORMAL
export function SetThreadPriority(heap, hThread, n) { return 1; }
export function GetPriorityClass(heap, hProcess) { return 0x20; }    // NORMAL_PRIORITY_CLASS
export function SetPriorityClass(heap, hProcess, n) { return 1; }

export function CreateMutexA(heap, lpAttr, bInitialOwner, lpName) { return 0x10010002; }
export function CreateMutexW(heap, lpAttr, bInitialOwner, lpName) { return 0x10010002; }
export function OpenMutexA(heap, dwAccess, bInherit, lpName) { return 0; } // not found
export function ReleaseMutex(heap, hMutex) { return 1; }
export function WaitForSingleObject(heap, hHandle, ms) { return 0; }      // WAIT_OBJECT_0
export function WaitForMultipleObjects(heap, n, lpHandles, bWaitAll, ms) { return 0; }
export function CreateEventA(heap, lpAttr, bManual, bInitial, lpName) { return 0x10010003; }
export function SetEvent(heap, hEvent) { return 1; }
export function ResetEvent(heap, hEvent) { return 1; }

export function InterlockedExchange(heap, target, value) {
  if (!target) return 0;
  const old = heap.u32(target);
  heap.setU32(target, value >>> 0);
  return old;
}

export function TlsAlloc(heap) { return 0; }
export function TlsFree(heap, idx) { return 1; }
export function TlsGetValue(heap, idx) { return 0; }
export function TlsSetValue(heap, idx, value) { return 1; }

// ---- Modules / dynamic linking ----

export function GetModuleHandleA(heap, lpModuleName) { return 0x400000; }   // imageBase
export function GetModuleHandleW(heap, lpModuleName) { return 0x400000; }
export function GetModuleFileNameA(heap, hModule, lpFilename, nSize) {
  const path = "C:\\RCT\\rct.exe";
  const written = heap.writeCStr(lpFilename, path, nSize);
  return written;
}
export function LoadLibraryA(heap, lpFilename) {
  // Return a non-zero "handle" so callers proceed; we handle GetProcAddress.
  return 0x10020000;
}
export function FreeLibrary(heap, hModule) { return 1; }
// CRT functions Ghidra surfaces as `_memset` / `_memcpy` etc. — used heavily
// to zero/init structs before passing to Win32 APIs. Stubbing these to no-op
// silently corrupts every call that depends on a zeroed struct.
export function _memset(heap, dest, value, count) {
  const bytes = heap.bytes;
  const v = value & 0xff;
  for (let i = 0; i < count; i++) bytes[dest + i] = v;
  return dest;
}
export function _memcpy(heap, dest, src, count) {
  const bytes = heap.bytes;
  // Use copyWithin for speed; handles overlap.
  bytes.copyWithin(dest, src, src + count);
  return dest;
}
export function _memcmp(heap, lhs, rhs, count) {
  const bytes = heap.bytes;
  for (let i = 0; i < count; i++) {
    const d = bytes[lhs + i] - bytes[rhs + i];
    if (d) return d > 0 ? 1 : -1;
  }
  return 0;
}
export function _strlen(heap, s) {
  const bytes = heap.bytes;
  let n = 0;
  while (bytes[s + n] !== 0) n++;
  return n;
}

export function GetProcAddress(heap, hModule, lpProcName) {
  if (!lpProcName) return 0;
  // The binary uses LoadLibraryA + GetProcAddress to bind dynamic DLL
  // exports — DDraw, DSound, WinMM extensions, etc. We register JS impls
  // under their export name in state.procRegistry; the synthetic address
  // we return routes through callIndirect → fnDispatch.
  const name = heap.readCStr(lpProcName);
  return state.procRegistry.get(name) || 0;
}

export function FindResourceA(heap, hModule, lpName, lpType) { return 0; }
export function FindResourceW(heap, hModule, lpName, lpType) { return 0; }
export function LoadResource(heap, hModule, hResInfo) { return 0; }
export function LockResource(heap, hResData) { return 0; }
export function FreeResource(heap, hResData) { return 1; }
export function SizeofResource(heap, hModule, hResInfo) { return 0; }

// ---- Environment / locale ----

export function GetCommandLineA(heap) { return 0; }
export function GetCommandLineW(heap) { return 0; }
export function GetEnvironmentStrings(heap) { return 0; }
export function GetEnvironmentStringsA(heap) { return 0; }
export function GetEnvironmentStringsW(heap) { return 0; }
export function FreeEnvironmentStringsA(heap, lpsz) { return 1; }
export function FreeEnvironmentStringsW(heap, lpsz) { return 1; }
export function GetEnvironmentVariableA(heap, name, buf, size) {
  if (buf && size > 0) heap.setU8(buf, 0);
  return 0;
}
export function SetEnvironmentVariableA(heap, name, value) { return 1; }

export function GetStartupInfoA(heap, lpStartupInfo) {
  // STARTUPINFO is 68 bytes; just zero out dwFlags so the caller doesn't
  // try anything fancy. cb (offset 0) holds size.
  if (!lpStartupInfo) return 0;
  for (let i = 0; i < 68; i++) heap.setU8(lpStartupInfo + i, 0);
  heap.setU32(lpStartupInfo + 0, 68);
  return 0;
}

export function GetStdHandle(heap, nStdHandle) {
  // STD_INPUT_HANDLE = -10, STD_OUTPUT_HANDLE = -11, STD_ERROR_HANDLE = -12.
  // Pass through; callers test for !INVALID_HANDLE_VALUE (0xffffffff).
  return nStdHandle | 0;
}
export function SetHandleCount(heap, n) { return n; }

export function GetCurrentDirectoryA(heap, nBufferLength, lpBuffer) {
  return heap.writeCStr(lpBuffer, "C:\\RCT", nBufferLength);
}
export function SetCurrentDirectoryA(heap, lpPath) { return 1; }

export function GetUserNameA(heap, lpBuffer, nSize) {
  if (lpBuffer && nSize) {
    const w = heap.writeCStr(lpBuffer, "Player", heap.u32(nSize));
    heap.setU32(nSize, w);
  }
  return 1;
}
export function GetComputerNameA(heap, lpBuffer, nSize) {
  if (lpBuffer && nSize) {
    const w = heap.writeCStr(lpBuffer, "BROWSER", heap.u32(nSize));
    heap.setU32(nSize, w);
  }
  return 1;
}

export function GetDiskFreeSpaceA(heap, lpRootPath, lpSectorsPerCluster, lpBytesPerSector, lpFreeClusters, lpTotalClusters) {
  if (lpSectorsPerCluster) heap.setU32(lpSectorsPerCluster, 8);
  if (lpBytesPerSector)    heap.setU32(lpBytesPerSector, 512);
  if (lpFreeClusters)      heap.setU32(lpFreeClusters, 0x100000);
  if (lpTotalClusters)     heap.setU32(lpTotalClusters, 0x200000);
  return 1;
}

export function GetLogicalDriveStringsA(heap, nBufferLength, lpBuffer) {
  // Return "C:\\\0\0" — single C: drive.
  if (lpBuffer && nBufferLength >= 4) {
    heap.setU8(lpBuffer + 0, "C".charCodeAt(0));
    heap.setU8(lpBuffer + 1, ":".charCodeAt(0));
    heap.setU8(lpBuffer + 2, "\\".charCodeAt(0));
    heap.setU8(lpBuffer + 3, 0);
    heap.setU8(lpBuffer + 4, 0);
    return 4;
  }
  return 5; // required size
}

// ---- System / version ----

export function GetVersion(heap)    { return 0x80000004; }            // Windows NT 4.0
export function GetVersionExA(heap, lpVersionInfo) {
  if (!lpVersionInfo) return 1;
  // OSVERSIONINFOA layout:
  //   dwOSVersionInfoSize (0)
  //   dwMajorVersion       (4)
  //   dwMinorVersion       (8)
  //   dwBuildNumber       (12)
  //   dwPlatformId        (16)
  //   szCSDVersion[128]   (20)
  heap.setU32(lpVersionInfo + 4,  4);     // NT 4.0
  heap.setU32(lpVersionInfo + 8,  0);
  heap.setU32(lpVersionInfo + 12, 0x457); // 1111
  heap.setU32(lpVersionInfo + 16, 2);     // VER_PLATFORM_WIN32_NT
  heap.setU8 (lpVersionInfo + 20, 0);
  return 1;
}

export function GetSystemInfo(heap, lpSystemInfo) {
  if (!lpSystemInfo) return;
  // SYSTEM_INFO is 36 bytes; zero it then set processor=x86.
  for (let i = 0; i < 36; i++) heap.setU8(lpSystemInfo + i, 0);
  heap.setU16(lpSystemInfo + 0, 0);          // wProcessorArchitecture = INTEL
  heap.setU32(lpSystemInfo + 4,  4096);      // dwPageSize
  heap.setU32(lpSystemInfo + 24, 586);       // dwProcessorType (Pentium)
  heap.setU32(lpSystemInfo + 28, 1);         // dwNumberOfProcessors
}

export function GetSystemTime(heap, lpSystemTime) {
  if (!lpSystemTime) return;
  const d = new Date();
  heap.setU16(lpSystemTime + 0,  d.getUTCFullYear());
  heap.setU16(lpSystemTime + 2,  d.getUTCMonth() + 1);
  heap.setU16(lpSystemTime + 4,  d.getUTCDay());
  heap.setU16(lpSystemTime + 6,  d.getUTCDate());
  heap.setU16(lpSystemTime + 8,  d.getUTCHours());
  heap.setU16(lpSystemTime + 10, d.getUTCMinutes());
  heap.setU16(lpSystemTime + 12, d.getUTCSeconds());
  heap.setU16(lpSystemTime + 14, d.getUTCMilliseconds());
}
export function GetLocalTime(heap, lpSystemTime) {
  if (!lpSystemTime) return;
  const d = new Date();
  heap.setU16(lpSystemTime + 0,  d.getFullYear());
  heap.setU16(lpSystemTime + 2,  d.getMonth() + 1);
  heap.setU16(lpSystemTime + 4,  d.getDay());
  heap.setU16(lpSystemTime + 6,  d.getDate());
  heap.setU16(lpSystemTime + 8,  d.getHours());
  heap.setU16(lpSystemTime + 10, d.getMinutes());
  heap.setU16(lpSystemTime + 12, d.getSeconds());
  heap.setU16(lpSystemTime + 14, d.getMilliseconds());
}

const _bootTime = Date.now();
export function GetTickCount(heap) {
  return (Date.now() - _bootTime) & 0xffffffff;
}
export function Sleep(heap, ms) { /* no-op */ }
export function QueryPerformanceCounter(heap, lpCounter) {
  if (!lpCounter) return 0;
  // Use ms-resolution; widely supported. If higher resolution needed, use performance.now().
  const now = (typeof performance !== "undefined" ? performance.now() : Date.now());
  const us = Math.floor(now * 1000);          // microseconds
  heap.setU32(lpCounter + 0, us & 0xffffffff);
  heap.setU32(lpCounter + 4, Math.floor(us / 0x100000000) & 0xffffffff);
  return 1;
}
export function QueryPerformanceFrequency(heap, lpFrequency) {
  if (!lpFrequency) return 0;
  heap.setU32(lpFrequency + 0, 1000000);      // 1 MHz
  heap.setU32(lpFrequency + 4, 0);
  return 1;
}

// ---- Codepages / locale / strings ----

export function GetACP(heap)  { return 1252; }
export function GetOEMCP(heap) { return 437; }
export function GetCPInfo(heap, codePage, lpCPInfo) {
  // CPINFO layout: UINT MaxCharSize; BYTE DefaultChar[2]; BYTE LeadByte[12]
  if (!lpCPInfo) return 1;
  heap.setU32(lpCPInfo + 0, 1);               // single-byte
  heap.setU8 (lpCPInfo + 4, 0x3f);            // '?'
  heap.setU8 (lpCPInfo + 5, 0);
  for (let i = 0; i < 12; i++) heap.setU8(lpCPInfo + 6 + i, 0);
  return 1;
}
export function GetKeyboardType(heap, nTypeFlag) { return 4; } // 101-key

export function MultiByteToWideChar(heap, codePage, dwFlags, lpMBStr, cbMB, lpWide, cchWide) {
  if (!lpMBStr) return 0;
  const len = cbMB === -1 ? heap.readCStr(lpMBStr).length + 1 : cbMB;
  if (cchWide === 0) return len;             // measuring
  const writeLen = Math.min(len, cchWide);
  for (let i = 0; i < writeLen; i++) {
    heap.setU16(lpWide + i * 2, heap.u8(lpMBStr + i));
  }
  return writeLen;
}
export function WideCharToMultiByte(heap, codePage, dwFlags, lpWide, cchWide, lpMB, cbMB, lpDefault, lpUsedDefault) {
  if (!lpWide) return 0;
  // Compute source length (UTF-16) — count to NUL if cchWide == -1.
  let len = cchWide;
  if (cchWide === -1) {
    len = 0;
    while (heap.u16(lpWide + len * 2) !== 0) len++;
    len++;
  }
  if (cbMB === 0) return len;
  const writeLen = Math.min(len, cbMB);
  for (let i = 0; i < writeLen; i++) {
    heap.setU8(lpMB + i, heap.u16(lpWide + i * 2) & 0xff);
  }
  return writeLen;
}
export function LCMapStringA(heap, locale, dwMapFlags, lpSrcStr, cchSrc, lpDestStr, cchDest) {
  // Pass-through copy. Real LCMap does locale-sensitive transforms (uppercase,
  // sort key, etc.) — we ignore the flags and just copy bytes.
  if (!lpSrcStr) return 0;
  const len = cchSrc < 0 ? heap.readCStr(lpSrcStr).length + 1 : cchSrc;
  if (cchDest === 0) return len;
  const w = Math.min(len, cchDest);
  for (let i = 0; i < w; i++) heap.setU8(lpDestStr + i, heap.u8(lpSrcStr + i));
  return w;
}
export function LCMapStringW(heap, locale, dwMapFlags, lpSrcStr, cchSrc, lpDestStr, cchDest) {
  if (!lpSrcStr) return 0;
  let len = cchSrc;
  if (cchSrc < 0) {
    len = 0;
    while (heap.u16(lpSrcStr + len * 2) !== 0) len++;
    len++;
  }
  if (cchDest === 0) return len;
  const w = Math.min(len, cchDest);
  for (let i = 0; i < w; i++) heap.setU16(lpDestStr + i * 2, heap.u16(lpSrcStr + i * 2));
  return w;
}
export function GetStringTypeA(heap, locale, dwInfoType, lpSrcStr, cchSrc, lpCharType) {
  // Pretend every char has C1_ALPHA (0x0100). Game uses this for ctype-style
  // queries; close-enough behaviour.
  const len = cchSrc < 0 ? heap.readCStr(lpSrcStr).length : cchSrc;
  for (let i = 0; i < len; i++) heap.setU16(lpCharType + i * 2, 0x0100);
  return 1;
}
export function GetStringTypeW(heap, dwInfoType, lpSrcStr, cchSrc, lpCharType) {
  const len = cchSrc;
  for (let i = 0; i < len; i++) heap.setU16(lpCharType + i * 2, 0x0100);
  return 1;
}

// ---- Errors / debug ----

let _lastError = 0;
export function GetLastError(heap) { return _lastError; }
export function SetLastError(heap, dwErrCode) { _lastError = dwErrCode | 0; }
export function SetErrorMode(heap, mode) { return 0; }
export function FormatMessageA(heap, dwFlags, lpSource, dwMessageId, dwLangId, lpBuffer, nSize, args) {
  // Return a generic message.
  if (lpBuffer) heap.writeCStr(lpBuffer, `error 0x${(dwMessageId>>>0).toString(16)}`, nSize);
  return 0;
}
export function OutputDebugStringA(heap, lpOutputString) {
  // Useful for tracing. Eventually wire to an in-page log.
  if (typeof console !== "undefined" && lpOutputString) {
    console.debug("[OutputDebugStringA]", heap.readCStr(lpOutputString));
  }
}

// ---- COM init (stubbed) ----

export function CoInitialize(heap, pvReserved) { return 0; }
export function CoCreateInstance(heap, rclsid, pUnkOuter, dwClsContext, riid, ppv) {
  if (ppv) heap.setU32(ppv, 0);
  return -1;          // E_FAIL — game falls back to non-COM paths
}

// Ordinal exports are unresolved; return 0 so callers fail gracefully.
export function Ordinal_1(heap, ...args) { return 0; }
export function Ordinal_2(heap, ...args) { return 0; }

// =============================================================================
// VFS — file/find/mapping APIs.
//
// The browser harness fetches assets (csg1.dat, scenarios) into a Map keyed
// by lowercase basename. CreateFileA/ReadFile read against that map. Writes
// go into a separate "writeable" partition that persists via IndexedDB
// (wired by runtime/vfs.js — for now writes are silently discarded).
// =============================================================================

import { state, getVfs } from "./context.js";

function vfsBasename(path) {
  const i = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
  return (i >= 0 ? path.slice(i + 1) : path).toLowerCase();
}

function vfsLookup(path) {
  return getVfs().get(vfsBasename(path));
}

export function CreateFileA(heap, lpFileName, dwDesiredAccess, dwShareMode, lpSecAttr, dwCreationDisposition, dwFlagsAndAttributes, hTemplateFile) {
  if (!lpFileName) return 0xffffffff | 0;
  const name = heap.readCStr(lpFileName);
  const bytes = vfsLookup(name);
  if (!bytes) return 0xffffffff | 0;             // INVALID_HANDLE_VALUE
  const h = state.nextHandle++;
  state.openHandles.set(h, { name, bytes, offset: 0 });
  return h;
}

export function ReadFile(heap, hFile, lpBuffer, nBytesToRead, lpBytesRead, lpOverlapped) {
  const file = state.openHandles.get(hFile);
  if (!file) return 0;
  const remaining = file.bytes.length - file.offset;
  const n = Math.min(nBytesToRead, remaining);
  for (let i = 0; i < n; i++) heap.bytes[lpBuffer + i] = file.bytes[file.offset + i];
  file.offset += n;
  if (lpBytesRead) heap.setU32(lpBytesRead, n);
  return 1;
}

export function WriteFile(heap, hFile, lpBuffer, nBytesToWrite, lpBytesWritten, lpOverlapped) {
  // Pretend we wrote everything. Future: persist to IndexedDB-backed VFS.
  if (lpBytesWritten) heap.setU32(lpBytesWritten, nBytesToWrite);
  return 1;
}

export function CloseHandle(heap, hObject) {
  state.openHandles.delete(hObject);
  state.fileMappings.delete(hObject);
  return 1;
}

export function GetFileSize(heap, hFile, lpFileSizeHigh) {
  const file = state.openHandles.get(hFile);
  if (!file) return 0xffffffff | 0;
  if (lpFileSizeHigh) heap.setU32(lpFileSizeHigh, 0);
  return file.bytes.length;
}

export function SetFilePointer(heap, hFile, lDistanceToMove, lpDistanceToMoveHigh, dwMoveMethod) {
  const file = state.openHandles.get(hFile);
  if (!file) return 0xffffffff | 0;
  const dist = lDistanceToMove | 0;
  if (dwMoveMethod === 0)      file.offset = dist;
  else if (dwMoveMethod === 1) file.offset += dist;
  else                          file.offset = file.bytes.length + dist;
  return file.offset;
}

export function FlushFileBuffers(heap, hFile) { return 1; }

export function GetFileType(heap, hFile) {
  // 1 = FILE_TYPE_DISK, 2 = FILE_TYPE_CHAR. Disk for VFS files, char for std.
  const file = state.openHandles.get(hFile);
  return file ? 1 : 2;
}

export function GetFileAttributesA(heap, lpFileName) {
  const name = heap.readCStr(lpFileName);
  return vfsLookup(name) ? 0x80 : 0xffffffff | 0; // FILE_ATTRIBUTE_NORMAL or INVALID
}
export function SetFileAttributesA(heap, lpFileName, dwFileAttributes) { return 1; }

export function DeleteFileA(heap, lpFileName) {
  // We can't actually delete from the read-only fetch'd VFS. Return success
  // so callers think it worked.
  return 1;
}

// ---- Find / directory enumeration ----

function fillFindData(heap, addr, name, bytes) {
  // WIN32_FIND_DATAA layout (we zero everything, fill what matters):
  //   +0   dwFileAttributes (DWORD)
  //   +4..+27  three FILETIMEs (24 bytes)
  //   +28  nFileSizeHigh (DWORD)
  //   +32  nFileSizeLow  (DWORD)
  //   +36..+43  reserved (8 bytes)
  //   +44  cFileName[260]
  //   +304 cAlternateFileName[14]
  for (let i = 0; i < 318; i++) heap.setU8(addr + i, 0);
  heap.setU32(addr + 0,  0x80);                   // FILE_ATTRIBUTE_NORMAL
  heap.setU32(addr + 28, 0);                       // nFileSizeHigh
  heap.setU32(addr + 32, bytes.length);            // nFileSizeLow
  heap.writeCStr(addr + 44, name, 260);
}

function findMatchPattern(pattern) {
  const base = vfsBasename(pattern);
  const re = new RegExp(
    "^" +
    base.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") +
    "$"
  );
  const out = [];
  for (const [name, bytes] of getVfs()) if (re.test(name)) out.push({ name, bytes });
  return out;
}

export function FindFirstFileA(heap, lpFileName, lpFindFileData) {
  const pattern = heap.readCStr(lpFileName);
  const matches = findMatchPattern(pattern);
  if (matches.length === 0) return 0xffffffff | 0;
  const h = state.nextHandle++;
  state.findHandles.set(h, { matches, idx: 1 });
  fillFindData(heap, lpFindFileData, matches[0].name, matches[0].bytes);
  return h;
}

export function FindNextFileA(heap, hFindFile, lpFindFileData) {
  const f = state.findHandles.get(hFindFile);
  if (!f || f.idx >= f.matches.length) return 0;
  const m = f.matches[f.idx++];
  fillFindData(heap, lpFindFileData, m.name, m.bytes);
  return 1;
}

export function FindClose(heap, hFindFile) {
  state.findHandles.delete(hFindFile);
  return 1;
}

// ---- Memory-mapped files ----

export function CreateFileMappingA(heap, hFile, lpAttr, flProtect, dwMaxSizeHigh, dwMaxSizeLow, lpName) {
  const file = state.openHandles.get(hFile);
  if (!file) return 0;
  const h = state.nextHandle++;
  state.fileMappings.set(h, { hFile, file });
  return h;
}

export function MapViewOfFile(heap, hFileMappingObject, dwDesiredAccess, dwFileOffsetHigh, dwFileOffsetLow, dwNumberOfBytesToMap) {
  const map = state.fileMappings.get(hFileMappingObject);
  if (!map) return 0;
  const want = dwNumberOfBytesToMap === 0 ? map.file.bytes.length : dwNumberOfBytesToMap;
  const ptr = heapAlloc(want);
  const limit = Math.min(want, map.file.bytes.length - dwFileOffsetLow);
  for (let i = 0; i < limit; i++) heap.bytes[ptr + i] = map.file.bytes[dwFileOffsetLow + i] || 0;
  return ptr;
}

export function UnmapViewOfFile(heap, lpBaseAddress) { return 1; }
export function FlushViewOfFile(heap, lpBaseAddress, dwNumberOfBytesToFlush) { return 1; }

// 16-bit-style file APIs used by some legacy code paths in RCT1.
export function _lopen(heap, lpPathName, iReadWrite) {
  const name = heap.readCStr(lpPathName);
  const bytes = vfsLookup(name);
  if (!bytes) return -1;
  const h = state.nextHandle++;
  state.openHandles.set(h, { name, bytes, offset: 0 });
  return h;
}
export function _lclose(heap, hFile) {
  state.openHandles.delete(hFile);
  return 0;
}
export function _lread(heap, hFile, lpBuffer, uBytes) {
  const file = state.openHandles.get(hFile);
  if (!file) return 0;
  const n = Math.min(uBytes, file.bytes.length - file.offset);
  for (let i = 0; i < n; i++) heap.bytes[lpBuffer + i] = file.bytes[file.offset + i];
  file.offset += n;
  return n;
}
export function _lwrite(heap, hFile, lpBuffer, uBytes) { return 0; }
export function _llseek(heap, hFile, lOffset, iOrigin) {
  const file = state.openHandles.get(hFile);
  if (!file) return -1;
  if (iOrigin === 0)      file.offset = lOffset;
  else if (iOrigin === 1) file.offset += (lOffset | 0);
  else                     file.offset = file.bytes.length + (lOffset | 0);
  return file.offset;
}
