// Win32 shim layer.
//
// When a lifted/interpreted function calls into the IAT, the resolved address
// lands in the sentinel range [0xF0000000, ...). The interpreter detects this,
// looks up the shim by sentinel address, calls the JS handler, then unwinds
// the stack and returns to the caller.
//
// Calling convention assumed: stdcall (callee pops). Most Win32 APIs use
// stdcall. The shim returns its return value via cpu.regs.eax and the trap
// handler pops the return address + the appropriate number of arg slots.

// One-line stub: takes N args, returns `defaultReturn`.
const stub = (argCount, defaultReturn = 0, name = "") => ({
  argCount, ret: () => defaultReturn, name, log: false,
});

// A shim that reads its arguments and computes a return.
const fn = (argCount, handler, name = "") => ({
  argCount, ret: handler, name, log: false,
});

// Generic verbose stub for diagnostics.
const verbose = (argCount, defaultReturn = 0, name = "") => ({
  argCount, ret: () => defaultReturn, name, log: true,
});

// Per-shim spec: { argCount, ret(cpu, args), name, log }
// args is an array of 32-bit unsigned values popped from the stack.
//
// argCount = number of 32-bit args the function takes (for stdcall stack cleanup).
// ret returns the value placed in eax after the shim runs.

const SHIMS = new Map(); // sentinel addr -> spec
const NAMED = new Map(); // "DLL!Name" -> spec (lookup table for assigning to sentinels)

// ---- KERNEL32 ----
NAMED.set("KERNEL32.dll!GetVersion",  fn(0, () => 0x80000004));   // Windows NT 4.0
NAMED.set("KERNEL32.dll!GetVersionExA", fn(1, () => 1));          // succeed, ignore the buffer
NAMED.set("KERNEL32.dll!GetModuleHandleA", fn(1, (cpu, [name]) => 0x400000)); // return imageBase
NAMED.set("KERNEL32.dll!GetCommandLineA", fn(0, () => 0));         // null pointer = empty
NAMED.set("KERNEL32.dll!GetEnvironmentStringsA", fn(0, () => 0));
NAMED.set("KERNEL32.dll!GetStartupInfoA", fn(1, () => 0));
NAMED.set("KERNEL32.dll!GetStdHandle", fn(1, (cpu, [n]) => n));    // pass it through
// Bump allocator from a region of the actual memory buffer. Caller initializes
// the heap window via initHeap(); shims pull from here. Free is a no-op.
let _heapBase = 0, _heapPtr = 0, _heapLimit = 0;
export function initHeap(base, limit) { _heapBase = base; _heapPtr = base; _heapLimit = limit; }
function heapAlloc(size) {
  if (_heapBase === 0) throw new Error("heap not initialized — call initHeap()");
  size = (size + 7) & ~7;
  if (_heapPtr + size > _heapLimit) throw new Error(`heap exhausted (requested ${size}, used ${(_heapPtr - _heapBase).toLocaleString()})`);
  const ptr = _heapPtr; _heapPtr += size;
  return ptr;
}

NAMED.set("KERNEL32.dll!HeapCreate", fn(3, () => 0x10000000));        // arbitrary heap handle
NAMED.set("KERNEL32.dll!GetProcessHeap", fn(0, () => 0x10000000));
NAMED.set("KERNEL32.dll!HeapAlloc", fn(3, (cpu, [hHeap, flags, size]) => heapAlloc(size)));
NAMED.set("KERNEL32.dll!HeapFree", fn(3, () => 1));                   // no-op free
NAMED.set("KERNEL32.dll!HeapReAlloc", fn(4, (cpu, [hHeap, flags, ptr, size]) => heapAlloc(size)));
NAMED.set("KERNEL32.dll!HeapDestroy", fn(1, () => 1));
NAMED.set("KERNEL32.dll!VirtualAlloc", fn(4, (cpu, [addr, size, type, prot]) => {
  // If a specific address was requested, honor it; otherwise alloc from heap.
  if (addr) return addr;
  return heapAlloc(size);
}));
NAMED.set("KERNEL32.dll!VirtualFree", fn(3, () => 1));
NAMED.set("KERNEL32.dll!GlobalAlloc", fn(2, (cpu, [flags, size]) => heapAlloc(size)));
NAMED.set("KERNEL32.dll!GlobalFree", fn(1, () => 0));
NAMED.set("KERNEL32.dll!GlobalLock", fn(1, (cpu, [h]) => h));         // trivial: handle == ptr
NAMED.set("KERNEL32.dll!GlobalUnlock", fn(1, () => 1));
NAMED.set("KERNEL32.dll!LocalAlloc", fn(2, (cpu, [flags, size]) => heapAlloc(size)));
NAMED.set("KERNEL32.dll!LocalFree", fn(1, () => 0));
NAMED.set("KERNEL32.dll!GetModuleFileNameA", fn(3, (cpu, [hMod, buf, size]) => {
  // Write a fake path. Just enough to satisfy callers checking for non-empty.
  const path = "C:\\RCT\\rct.exe";
  for (let i = 0; i < Math.min(path.length, (size | 0) - 1); i++) cpu.memory[buf + i] = path.charCodeAt(i);
  cpu.memory[buf + Math.min(path.length, (size | 0) - 1)] = 0;
  return Math.min(path.length, (size | 0) - 1);
}));
NAMED.set("KERNEL32.dll!TlsAlloc", fn(0, () => 0));
NAMED.set("KERNEL32.dll!TlsGetValue", fn(1, () => 0));
NAMED.set("KERNEL32.dll!TlsSetValue", fn(2, () => 1));
NAMED.set("KERNEL32.dll!TlsFree", fn(1, () => 1));
NAMED.set("KERNEL32.dll!ExitProcess", fn(1, (cpu, [code]) => {
  cpu.exitRequested = code | 0;
  return 0;
}));
NAMED.set("KERNEL32.dll!GetTickCount", fn(0, () => Date.now() & 0xffffffff));
NAMED.set("KERNEL32.dll!Sleep", fn(1, () => 0));
NAMED.set("KERNEL32.dll!QueryPerformanceCounter", fn(1, () => 0));
NAMED.set("KERNEL32.dll!QueryPerformanceFrequency", fn(1, () => 0));
NAMED.set("KERNEL32.dll!LoadLibraryA", fn(1, (cpu, [namePtr]) => {
  // Read the DLL name and pretend we loaded it.
  const dllName = readCStr(cpu.memory, namePtr);
  cpu._dynamicLibs = cpu._dynamicLibs || new Map();
  if (!cpu._dynamicLibs.has(dllName)) {
    cpu._dynamicLibs.set(dllName, 0xE0000000 + cpu._dynamicLibs.size * 0x10000);
  }
  return cpu._dynamicLibs.get(dllName);
}));
NAMED.set("KERNEL32.dll!FreeLibrary", fn(1, () => 1));
// Single-instance mutex: OpenMutexA returns NULL ("no existing instance"),
// CreateMutexA returns a fresh handle ("we created it"). Both signal: we're
// the only instance, please continue.
NAMED.set("KERNEL32.dll!OpenMutexA",   fn(3, () => 0));
NAMED.set("KERNEL32.dll!CreateMutexA", fn(3, () => 0x10010002));
NAMED.set("KERNEL32.dll!CreateMutexW", fn(3, () => 0x10010002));
NAMED.set("KERNEL32.dll!ReleaseMutex", fn(1, () => 1));
NAMED.set("KERNEL32.dll!WaitForSingleObject", fn(2, () => 0));
NAMED.set("KERNEL32.dll!WaitForMultipleObjects", fn(4, () => 0));
NAMED.set("KERNEL32.dll!CreateEventA", fn(4, () => 0x10010003));
NAMED.set("KERNEL32.dll!SetEvent",   fn(1, () => 1));
NAMED.set("KERNEL32.dll!ResetEvent", fn(1, () => 1));
NAMED.set("KERNEL32.dll!GetProcAddress", fn(2, (cpu, [hMod, namePtr]) => {
  // namePtr can be either an actual string or an ordinal (low 16 bits set, high cleared).
  const fnName = (namePtr >>> 16) === 0
    ? `#${namePtr & 0xffff}`
    : readCStr(cpu.memory, namePtr);
  // Try to resolve to a known shim. We need to know which DLL hMod refers to.
  cpu._dynamicLibsByHandle = cpu._dynamicLibsByHandle || new Map();
  // Reverse-lookup the DLL name from the handle.
  let dllName = null;
  if (cpu._dynamicLibs) {
    for (const [name, handle] of cpu._dynamicLibs) if (handle === hMod) { dllName = name; break; }
  }
  // Case-insensitive lookup over all NAMED entries (since IAT names from the
  // binary may differ in casing from our shim keys).
  const wantedLower = (key) => key.toLowerCase();
  const dllPrefix = dllName ? wantedLower(dllName).replace(/\.dll$/, "") : null;
  const fnLower = fnName.toLowerCase();
  let foundSpec = null, foundKey = null;
  for (const [k, spec] of NAMED) {
    const kl = wantedLower(k);
    const [kdll, kfn] = kl.split("!");
    if (kfn !== fnLower) continue;
    if (dllPrefix && !kdll.startsWith(dllPrefix)) continue;
    foundSpec = spec; foundKey = k; break;
  }
  if (foundSpec) {
    const sentinel = makeDynamicShim(foundSpec.name || foundKey);
    SHIMS.set(sentinel, { ...foundSpec, name: foundSpec.name || foundKey, log: false });
    return sentinel;
  }
  for (const key of [`DDRAW.dll!${fnName}`, `DSOUND.dll!${fnName}`, `DINPUT.dll!${fnName}`]) {
    const spec = NAMED.get(key);
    if (spec) {
      // Re-bind to a fresh sentinel so calls reach our spec.
      const sentinel = makeDynamicShim(spec.name || key);
      // Replace the verbose default with the real spec.
      SHIMS.set(sentinel, { ...spec, name: spec.name || key, log: false });
      return sentinel;
    }
  }
  // Unknown — return a verbose-stub sentinel.
  return makeDynamicShim(`dynamic!${fnName}`);
}));
NAMED.set("KERNEL32.dll!GetLastError", fn(0, () => 0));
NAMED.set("KERNEL32.dll!SetLastError", fn(1, () => 0));
NAMED.set("KERNEL32.dll!GetFileType", fn(1, () => 2));            // FILE_TYPE_CHAR (console-like)
NAMED.set("KERNEL32.dll!SetHandleCount", fn(1, (cpu, [n]) => n));
NAMED.set("KERNEL32.dll!GetCPInfo", fn(2, () => 1));
NAMED.set("KERNEL32.dll!GetACP", fn(0, () => 1252));              // Windows-1252
NAMED.set("KERNEL32.dll!GetOEMCP", fn(0, () => 437));
NAMED.set("KERNEL32.dll!GetStringTypeW", fn(5, () => 1));
NAMED.set("KERNEL32.dll!GetStringTypeA", fn(5, () => 1));
NAMED.set("KERNEL32.dll!MultiByteToWideChar", fn(6, (cpu, [cp, flags, srcPtr, srcLenSigned, dstPtr, dstLen]) => {
  // Naive ASCII passthrough: copy each byte as a 16-bit word.
  // srcLen as signed: -1 means "until null terminator", else exact count.
  let srcLen = srcLenSigned | 0;
  if (srcLen === -1) {
    let n = 0; while (cpu.memory[srcPtr + n] !== 0) n++; srcLen = n + 1;
  }
  if (dstLen === 0 || dstPtr === 0) return srcLen;
  const n = Math.min(srcLen, dstLen);
  for (let i = 0; i < n; i++) {
    cpu.memory[dstPtr + i*2] = cpu.memory[srcPtr + i];
    cpu.memory[dstPtr + i*2 + 1] = 0;
  }
  return n;
}));
NAMED.set("KERNEL32.dll!WideCharToMultiByte", fn(8, (cpu, [cp, flags, srcPtr, srcLen, dstPtr, dstLen]) => {
  if (srcLen === 0xffffffff) {
    let n = 0; while ((cpu.memory[srcPtr + n*2] | (cpu.memory[srcPtr + n*2 + 1] << 8)) !== 0) n++; srcLen = n + 1;
  }
  if (dstLen === 0) return srcLen;
  const n = Math.min(srcLen, dstLen);
  for (let i = 0; i < n; i++) cpu.memory[dstPtr + i] = cpu.memory[srcPtr + i*2];
  return n;
}));
NAMED.set("KERNEL32.dll!LCMapStringA", fn(6, () => 1));
NAMED.set("KERNEL32.dll!LCMapStringW", fn(6, () => 1));
NAMED.set("KERNEL32.dll!FreeEnvironmentStringsA", fn(1, () => 1));
NAMED.set("KERNEL32.dll!FreeEnvironmentStringsW", fn(1, () => 1));
NAMED.set("KERNEL32.dll!GetEnvironmentStringsW", fn(0, () => 0));
NAMED.set("KERNEL32.dll!GetCurrentThreadId", fn(0, () => 1));
NAMED.set("KERNEL32.dll!GetCurrentProcessId", fn(0, () => 1));
NAMED.set("KERNEL32.dll!GetCurrentProcess", fn(0, () => 0xffffffff));
NAMED.set("KERNEL32.dll!UnhandledExceptionFilter", fn(1, () => 0));
NAMED.set("KERNEL32.dll!SetUnhandledExceptionFilter", fn(1, () => 0));
NAMED.set("KERNEL32.dll!IsBadReadPtr", fn(2, () => 0));
NAMED.set("KERNEL32.dll!IsBadWritePtr", fn(2, () => 0));
NAMED.set("KERNEL32.dll!FindResourceA", fn(3, () => 0));
NAMED.set("KERNEL32.dll!LoadResource", fn(2, () => 0));
NAMED.set("KERNEL32.dll!LockResource", fn(1, () => 0));
NAMED.set("KERNEL32.dll!FreeResource", fn(1, () => 1));
NAMED.set("KERNEL32.dll!SizeofResource", fn(2, () => 0));
NAMED.set("KERNEL32.dll!RtlUnwind", fn(4, () => 0));
NAMED.set("KERNEL32.dll!InterlockedIncrement", fn(1, (cpu, [ptr]) => {
  const v = (cpu.memory[ptr] | (cpu.memory[ptr+1] << 8) | (cpu.memory[ptr+2] << 16) | (cpu.memory[ptr+3] << 24));
  const r = (v + 1) | 0;
  cpu.memory[ptr] = r & 0xff; cpu.memory[ptr+1] = (r >>> 8) & 0xff;
  cpu.memory[ptr+2] = (r >>> 16) & 0xff; cpu.memory[ptr+3] = (r >>> 24) & 0xff;
  return r;
}));
NAMED.set("KERNEL32.dll!InterlockedDecrement", fn(1, (cpu, [ptr]) => {
  const v = (cpu.memory[ptr] | (cpu.memory[ptr+1] << 8) | (cpu.memory[ptr+2] << 16) | (cpu.memory[ptr+3] << 24));
  const r = (v - 1) | 0;
  cpu.memory[ptr] = r & 0xff; cpu.memory[ptr+1] = (r >>> 8) & 0xff;
  cpu.memory[ptr+2] = (r >>> 16) & 0xff; cpu.memory[ptr+3] = (r >>> 24) & 0xff;
  return r;
}));
NAMED.set("KERNEL32.dll!InitializeCriticalSection", fn(1, () => 0));
NAMED.set("KERNEL32.dll!DeleteCriticalSection", fn(1, () => 0));
NAMED.set("KERNEL32.dll!EnterCriticalSection", fn(1, () => 0));
NAMED.set("KERNEL32.dll!LeaveCriticalSection", fn(1, () => 0));

// ---- Virtual file system ----
// Caller registers (canonical-name → Uint8Array) via setVfs(map). Path lookups
// are case-insensitive and strip any drive/dir prefix down to the basename.
let _vfs = new Map(); // lowercase basename → bytes
let _openHandles = new Map(); // handle id → { name, bytes, offset }
let _nextHandle = 0x10000;
export function setVfs(map) {
  _vfs = new Map();
  for (const [name, bytes] of Object.entries(map)) _vfs.set(name.toLowerCase(), bytes);
}
function vfsBasename(path) {
  // Take everything after the last \ or /
  const i = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
  return (i >= 0 ? path.slice(i + 1) : path).toLowerCase();
}
function vfsLookup(path) { return _vfs.get(vfsBasename(path)); }

NAMED.set("KERNEL32.dll!CreateFileA", fn(7, (cpu, [namePtr, access, share, secAttr, disp, attrs, tmpl]) => {
  const name = readCStr(cpu.memory, namePtr);
  const bytes = vfsLookup(name);
  if (!bytes) return 0xffffffff; // INVALID_HANDLE_VALUE
  const h = _nextHandle++;
  _openHandles.set(h, { name, bytes, offset: 0 });
  return h;
}));
NAMED.set("KERNEL32.dll!ReadFile", fn(5, (cpu, [h, buf, count, retPtr, overlapped]) => {
  const file = _openHandles.get(h);
  if (!file) return 0;
  const remaining = file.bytes.length - file.offset;
  const n = Math.min(count, remaining);
  for (let i = 0; i < n; i++) cpu.memory[buf + i] = file.bytes[file.offset + i];
  file.offset += n;
  if (retPtr) {
    cpu.memory[retPtr]     =  n        & 0xff;
    cpu.memory[retPtr + 1] = (n >>> 8)  & 0xff;
    cpu.memory[retPtr + 2] = (n >>> 16) & 0xff;
    cpu.memory[retPtr + 3] = (n >>> 24) & 0xff;
  }
  return 1; // success
}));
NAMED.set("KERNEL32.dll!WriteFile", fn(5, (cpu, [h, buf, count, retPtr, overlapped]) => {
  // Pretend we wrote everything successfully (silently discard).
  if (retPtr) {
    cpu.memory[retPtr]     =  count        & 0xff;
    cpu.memory[retPtr + 1] = (count >>> 8) & 0xff;
    cpu.memory[retPtr + 2] = (count >>> 16) & 0xff;
    cpu.memory[retPtr + 3] = (count >>> 24) & 0xff;
  }
  return 1;
}));
NAMED.set("KERNEL32.dll!CloseHandle", fn(1, (cpu, [h]) => {
  _openHandles.delete(h);
  return 1;
}));
NAMED.set("KERNEL32.dll!GetFileSize", fn(2, (cpu, [h, hiPtr]) => {
  const file = _openHandles.get(h);
  if (!file) return 0xffffffff;
  if (hiPtr) {
    cpu.memory[hiPtr]     = 0; cpu.memory[hiPtr + 1] = 0;
    cpu.memory[hiPtr + 2] = 0; cpu.memory[hiPtr + 3] = 0;
  }
  return file.bytes.length;
}));
NAMED.set("KERNEL32.dll!SetFilePointer", fn(4, (cpu, [h, distLo, distHiPtr, method]) => {
  const file = _openHandles.get(h);
  if (!file) return 0xffffffff;
  const dist = distLo | 0;
  if (method === 0) file.offset = dist;          // FILE_BEGIN
  else if (method === 1) file.offset += dist;     // FILE_CURRENT
  else if (method === 2) file.offset = file.bytes.length + dist; // FILE_END
  return file.offset;
}));
// Old 16-bit-style _l functions
NAMED.set("KERNEL32.dll!_lopen", fn(2, (cpu, [namePtr, mode]) => {
  const name = readCStr(cpu.memory, namePtr);
  const bytes = vfsLookup(name);
  if (!bytes) return -1;
  const h = _nextHandle++;
  _openHandles.set(h, { name, bytes, offset: 0 });
  return h;
}));
NAMED.set("KERNEL32.dll!_lclose", fn(1, (cpu, [h]) => { _openHandles.delete(h); return 0; }));
NAMED.set("KERNEL32.dll!_lread", fn(3, (cpu, [h, buf, count]) => {
  const file = _openHandles.get(h);
  if (!file) return 0;
  const n = Math.min(count, file.bytes.length - file.offset);
  for (let i = 0; i < n; i++) cpu.memory[buf + i] = file.bytes[file.offset + i];
  file.offset += n;
  return n;
}));
NAMED.set("KERNEL32.dll!_lwrite", fn(3, () => 0));
NAMED.set("KERNEL32.dll!_llseek", fn(3, (cpu, [h, off, origin]) => {
  const file = _openHandles.get(h);
  if (!file) return -1;
  if (origin === 0) file.offset = off;
  else if (origin === 1) file.offset += (off | 0);
  else file.offset = file.bytes.length + (off | 0);
  return file.offset;
}));

// FindFirstFileA / FindNextFileA / FindClose — directory enumeration
const _findHandles = new Map();
let _nextFindHandle = 0x20000;
function fillFindData(cpu, addr, name, bytes) {
  // WIN32_FIND_DATA layout (the parts that matter):
  //   +0   dwFileAttributes
  //   +4..+27  three FILETIMEs
  //   +28  nFileSizeHigh
  //   +32  nFileSizeLow
  //   +36..+43  reserved
  //   +44  cFileName[260]
  //   +304 cAlternateFileName[14]
  for (let i = 0; i < 318; i++) cpu.memory[addr + i] = 0;
  // Set FILE_ATTRIBUTE_NORMAL = 0x80
  cpu.memory[addr] = 0x80;
  // Size low
  const sz = bytes.length;
  cpu.memory[addr + 32]     =  sz        & 0xff;
  cpu.memory[addr + 33]     = (sz >>> 8)  & 0xff;
  cpu.memory[addr + 34]     = (sz >>> 16) & 0xff;
  cpu.memory[addr + 35]     = (sz >>> 24) & 0xff;
  // File name
  for (let i = 0; i < name.length && i < 259; i++) cpu.memory[addr + 44 + i] = name.charCodeAt(i);
  cpu.memory[addr + 44 + Math.min(name.length, 259)] = 0;
}
function findMatchPattern(pattern) {
  // Match "*.dat", "FOO/*.dat", absolute "C:\\path\\*.sc4". Take basename then convert glob → regex.
  const base = vfsBasename(pattern); // already lower-cases
  const re = new RegExp("^" + base.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
  const matches = [];
  for (const [name, bytes] of _vfs) if (re.test(name)) matches.push({ name, bytes });
  return matches;
}
NAMED.set("KERNEL32.dll!FindFirstFileA", fn(2, (cpu, [patternPtr, findDataPtr]) => {
  const pattern = readCStr(cpu.memory, patternPtr);
  const matches = findMatchPattern(pattern);
  if (matches.length === 0) return 0xffffffff; // INVALID_HANDLE_VALUE
  const h = _nextFindHandle++;
  _findHandles.set(h, { matches, idx: 1 });
  fillFindData(cpu, findDataPtr, matches[0].name, matches[0].bytes);
  return h;
}));
NAMED.set("KERNEL32.dll!FindNextFileA", fn(2, (cpu, [h, findDataPtr]) => {
  const f = _findHandles.get(h);
  if (!f || f.idx >= f.matches.length) return 0;
  const m = f.matches[f.idx++];
  fillFindData(cpu, findDataPtr, m.name, m.bytes);
  return 1;
}));
NAMED.set("KERNEL32.dll!FindClose", fn(1, (cpu, [h]) => { _findHandles.delete(h); return 1; }));

// Memory-mapped files. Treat as: allocate a buffer the size of the file,
// memcpy the file contents in, return that address as the "view."
const _mapHandles = new Map();
let _nextMapHandle = 0x30000;
NAMED.set("KERNEL32.dll!CreateFileMappingA", fn(6, (cpu, [hFile, sa, prot, sizeHi, sizeLo, namePtr]) => {
  const file = _openHandles.get(hFile);
  if (!file) return 0;
  const h = _nextMapHandle++;
  _mapHandles.set(h, { file });
  return h;
}));
NAMED.set("KERNEL32.dll!MapViewOfFile", fn(5, (cpu, [hMap, access, offHi, offLo, size]) => {
  const map = _mapHandles.get(hMap);
  if (!map) return 0;
  const want = size === 0 ? map.file.bytes.length : size;
  const ptr = heapAlloc(want);
  for (let i = 0; i < Math.min(want, map.file.bytes.length); i++) cpu.memory[ptr + i] = map.file.bytes[offLo + i] || 0;
  return ptr;
}));
NAMED.set("KERNEL32.dll!UnmapViewOfFile", fn(1, () => 1));
NAMED.set("KERNEL32.dll!FlushViewOfFile", fn(2, () => 1));

// ---- ADVAPI32 (registry — pretend nothing's there) ----
NAMED.set("ADVAPI32.dll!RegOpenKeyA",       fn(3, () => 2)); // ERROR_FILE_NOT_FOUND
NAMED.set("ADVAPI32.dll!RegOpenKeyExA",     fn(5, () => 2));
NAMED.set("ADVAPI32.dll!RegCreateKeyExA",   fn(9, () => 2));
NAMED.set("ADVAPI32.dll!RegCloseKey",       fn(1, () => 0));
NAMED.set("ADVAPI32.dll!RegQueryValueExA",  fn(6, () => 2));
NAMED.set("ADVAPI32.dll!RegSetValueExA",    fn(6, () => 2));
NAMED.set("ADVAPI32.dll!RegDeleteKeyA",     fn(2, () => 2));
NAMED.set("ADVAPI32.dll!RegFlushKey",       fn(1, () => 0));
NAMED.set("ADVAPI32.dll!GetUserNameA",      fn(2, () => 0));

// USER32 / GDI32 / WINMM / DINPUT / DSOUND — default stub: no-op, return 0.
// Specific exits / window-management:
NAMED.set("USER32.dll!MessageBoxA",   fn(4, () => 0));
NAMED.set("USER32.dll!PostQuitMessage", fn(1, (cpu) => { cpu.exitRequested = 0; return 0; }));

// ---- Window / message infrastructure ----
//
// We track:
//   - Window classes registered via RegisterClassA: atom → { wndProc, name }
//   - Window instances created via CreateWindowExA: hwnd → { classAtom, x,y,w,h }
//   - A FIFO message queue: { hwnd, msg, wParam, lParam, time, ptX, ptY }
//
// PostMessage pushes; PeekMessage/GetMessage pop; DispatchMessage invokes the
// class's WindowProc (a binary address) via callIntoBinary.
const _windowClasses = new Map();    // atom → { wndProc, name }
const _classByName   = new Map();    // name → atom
let _nextClassAtom = 0xc001;
const _windows = new Map();          // hwnd → { atom, x, y, w, h }
let _nextHwnd  = 0x10010000;
const _messageQueue = [];            // FIFO of message records
let _firstHwnd = 0;

export function getFirstHwnd() { return _firstHwnd; }
export function getMessageQueueDepth() { return _messageQueue.length; }
export function postWindowMessage(hwnd, msg, wParam = 0, lParam = 0) {
  _messageQueue.push({
    hwnd: hwnd >>> 0, msg: msg >>> 0,
    wParam: wParam >>> 0, lParam: lParam >>> 0,
    time: Date.now() & 0xffffffff, ptX: 0, ptY: 0,
  });
}

function readU32(mem, addr) {
  return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0;
}
function writeMSG(mem, addr, m) {
  const w = (off, v) => { mem[addr+off]=v&0xff; mem[addr+off+1]=(v>>>8)&0xff; mem[addr+off+2]=(v>>>16)&0xff; mem[addr+off+3]=(v>>>24)&0xff; };
  w(0, m.hwnd); w(4, m.msg); w(8, m.wParam); w(12, m.lParam);
  w(16, m.time); w(20, m.ptX); w(24, m.ptY);
}

NAMED.set("USER32.dll!RegisterClassA", fn(1, (cpu, [lpWndClass]) => {
  // WNDCLASS layout: style(0) wndProc(4) cbClsExtra(8) cbWndExtra(12) hInstance(16)
  //                  hIcon(20) hCursor(24) hbrBackground(28) menu(32) className(36)
  const wndProc = readU32(cpu.memory, lpWndClass + 4);
  const namePtr = readU32(cpu.memory, lpWndClass + 36);
  const name = namePtr ? readCStr(cpu.memory, namePtr) : `_anon_${_nextClassAtom}`;
  const atom = _nextClassAtom++;
  _windowClasses.set(atom, { wndProc, name });
  _classByName.set(name, atom);
  return atom;
}));
NAMED.set("USER32.dll!RegisterClassExA", fn(1, (cpu, [lpWndClassEx]) => {
  // WNDCLASSEX: cbSize(0) style(4) wndProc(8) cbClsExtra(12) cbWndExtra(16)
  //             hInstance(20) hIcon(24) hCursor(28) hbrBackground(32) menu(36)
  //             className(40) hIconSm(44)
  const wndProc = readU32(cpu.memory, lpWndClassEx + 8);
  const namePtr = readU32(cpu.memory, lpWndClassEx + 40);
  const name = namePtr ? readCStr(cpu.memory, namePtr) : `_anon_${_nextClassAtom}`;
  const atom = _nextClassAtom++;
  _windowClasses.set(atom, { wndProc, name });
  _classByName.set(name, atom);
  return atom;
}));
NAMED.set("USER32.dll!UnregisterClassA", fn(2, () => 1));

NAMED.set("USER32.dll!CreateWindowExA", fn(12, (cpu, args) => {
  const [, lpClassName, lpWindowName, , x, y, w, h] = args;
  // lpClassName can be a string pointer OR an atom in the low 16 bits with high 16 = 0.
  let atom;
  if ((lpClassName >>> 16) === 0 && lpClassName < 0x10000) {
    atom = lpClassName & 0xffff;
  } else {
    const name = readCStr(cpu.memory, lpClassName);
    atom = _classByName.get(name);
  }
  const hwnd = _nextHwnd++;
  _windows.set(hwnd, { atom, x, y, w, h });
  if (!_firstHwnd) _firstHwnd = hwnd;
  return hwnd;
}));
NAMED.set("USER32.dll!CreateWindowExW", fn(12, (cpu, args) => {
  const hwnd = _nextHwnd++;
  _windows.set(hwnd, { atom: 0xc001 });
  if (!_firstHwnd) _firstHwnd = hwnd;
  return hwnd;
}));

NAMED.set("USER32.dll!PeekMessageA", fn(5, (cpu, [lpMsg, , , , wRemoveMsg]) => {
  if (_messageQueue.length === 0) return 0;
  const m = (wRemoveMsg & 1) ? _messageQueue.shift() : _messageQueue[0];
  writeMSG(cpu.memory, lpMsg, m);
  return 1;
}));
NAMED.set("USER32.dll!GetMessageA", fn(4, (cpu, [lpMsg]) => {
  if (_messageQueue.length === 0) return 0;       // would normally block; we exit the pump
  const m = _messageQueue.shift();
  writeMSG(cpu.memory, lpMsg, m);
  // Return -1 on error, 0 on WM_QUIT, otherwise 1
  return m.msg === 0x12 ? 0 : 1;
}));
NAMED.set("USER32.dll!PostMessageA", fn(4, (cpu, [hwnd, msg, wParam, lParam]) => {
  postWindowMessage(hwnd, msg, wParam, lParam);
  return 1;
}));
NAMED.set("USER32.dll!PostThreadMessageA", fn(4, (cpu, [, msg, wParam, lParam]) => {
  postWindowMessage(_firstHwnd, msg, wParam, lParam);
  return 1;
}));
NAMED.set("USER32.dll!TranslateMessage", fn(1, () => 0));
NAMED.set("USER32.dll!DispatchMessageA", fn(1, (cpu, [lpMsg]) => {
  const m = cpu.memory;
  const hwnd   = readU32(m, lpMsg);
  const msg    = readU32(m, lpMsg + 4);
  const wParam = readU32(m, lpMsg + 8);
  const lParam = readU32(m, lpMsg + 12);
  const win = _windows.get(hwnd);
  if (!win) return 0;
  const cls = _windowClasses.get(win.atom);
  if (!cls || !cls.wndProc) return 0;
  return callIntoBinary(cpu, cls.wndProc, [hwnd, msg, wParam, lParam]);
}));
NAMED.set("USER32.dll!SendMessageA", fn(4, (cpu, [hwnd, msg, wParam, lParam]) => {
  const win = _windows.get(hwnd);
  if (!win) return 0;
  const cls = _windowClasses.get(win.atom);
  if (!cls || !cls.wndProc) return 0;
  return callIntoBinary(cpu, cls.wndProc, [hwnd, msg, wParam, lParam]);
}));
NAMED.set("USER32.dll!CallWindowProcA", fn(5, (cpu, [wndProc, hwnd, msg, wParam, lParam]) => {
  return callIntoBinary(cpu, wndProc, [hwnd, msg, wParam, lParam]);
}));
NAMED.set("USER32.dll!ShowWindow",        fn(2, () => 1));
NAMED.set("USER32.dll!UpdateWindow",      fn(1, () => 1));
NAMED.set("USER32.dll!DefWindowProcA",    fn(4, () => 0));
NAMED.set("USER32.dll!DestroyWindow",     fn(1, () => 1));
NAMED.set("USER32.dll!GetDC",             fn(1, (cpu, [hwnd]) => 0x20000000 | (hwnd & 0xffff)));
NAMED.set("USER32.dll!ReleaseDC",         fn(2, () => 1));
NAMED.set("USER32.dll!IsWindow",          fn(1, () => 1));
NAMED.set("USER32.dll!IsIconic",          fn(1, () => 0));
NAMED.set("USER32.dll!GetActiveWindow",   fn(0, () => 0x10010001));
NAMED.set("USER32.dll!GetForegroundWindow", fn(0, () => 0x10010001));
NAMED.set("USER32.dll!SetWindowLongA",    fn(3, () => 0));
NAMED.set("USER32.dll!GetWindowLongA",    fn(2, () => 0));
NAMED.set("USER32.dll!SetWindowPos",      fn(7, () => 1));
NAMED.set("USER32.dll!GetWindowRect",     fn(2, (cpu, [hwnd, p]) => {
  // Fake 800x600 client rect at (0,0).
  for (let i = 0; i < 16; i++) cpu.memory[p + i] = 0;
  // right=800, bottom=600
  cpu.memory[p+8] = 0x20; cpu.memory[p+9] = 0x03;     // 0x320 = 800
  cpu.memory[p+12] = 0x58; cpu.memory[p+13] = 0x02;   // 0x258 = 600
  return 1;
}));
NAMED.set("USER32.dll!GetClientRect", fn(2, (cpu, [hwnd, p]) => {
  for (let i = 0; i < 16; i++) cpu.memory[p + i] = 0;
  cpu.memory[p+8] = 0x20; cpu.memory[p+9] = 0x03;
  cpu.memory[p+12] = 0x58; cpu.memory[p+13] = 0x02;
  return 1;
}));
NAMED.set("USER32.dll!ClientToScreen", fn(2, () => 1));
NAMED.set("USER32.dll!ScreenToClient", fn(2, () => 1));
NAMED.set("USER32.dll!ValidateRect",   fn(2, () => 1));
NAMED.set("USER32.dll!InvalidateRect", fn(3, () => 1));
NAMED.set("USER32.dll!BeginPaint",     fn(2, () => 0x20000001));
NAMED.set("USER32.dll!EndPaint",       fn(2, () => 1));
NAMED.set("USER32.dll!SetCapture",     fn(1, () => 0));
NAMED.set("USER32.dll!ReleaseCapture", fn(0, () => 1));
NAMED.set("USER32.dll!GetCursorPos",   fn(1, (cpu, [p]) => {
  cpu.memory[p] = 100; cpu.memory[p+1] = 0; cpu.memory[p+2] = 0; cpu.memory[p+3] = 0;
  cpu.memory[p+4] = 100; cpu.memory[p+5] = 0; cpu.memory[p+6] = 0; cpu.memory[p+7] = 0;
  return 1;
}));
NAMED.set("USER32.dll!SetCursorPos",   fn(2, () => 1));
NAMED.set("USER32.dll!ShowCursor",     fn(1, () => 0));

// GDI shims for 8-bit paletted RCT.
NAMED.set("GDI32.dll!GetDeviceCaps", fn(2, (cpu, [hdc, index]) => {
  // Common indices we care about:
  switch (index) {
    case 8:   return 800;          // HORZRES
    case 10:  return 600;          // VERTRES
    case 12:  return 8;            // BITSPIXEL
    case 14:  return 1;            // PLANES
    case 24:  return 256;          // NUMCOLORS
    case 26:  return 256;          // SIZEPALETTE
    case 32:  return 0x40 | 0x100; // RC_PALETTE | RC_BITBLT
    default:  return 0;
  }
}));
NAMED.set("GDI32.dll!GetSystemPaletteUse", fn(1, () => 1));   // SYSPAL_STATIC
NAMED.set("GDI32.dll!SetSystemPaletteUse", fn(2, () => 1));

// Palette capture. Each LOGPALETTE is { palVersion:WORD, palNumEntries:WORD, entries:PALETTEENTRY[] }
// PALETTEENTRY = { red:BYTE, green:BYTE, blue:BYTE, flags:BYTE }.
// We snapshot the entries every time the binary creates or updates a palette;
// the most recent one with 256 entries is treated as "the" game palette.
let _capturedPalette = null;   // Uint8ClampedArray(256*4) RGBA, or null
let _paletteSnapshots = 0;
export function getCapturedPalette() { return _capturedPalette; }
export function getPaletteSnapshotCount() { return _paletteSnapshots; }

// The binary's static palette lives at 0x971ef0 — a 256-entry RGB+pad table
// found by memory scan. Read it on-demand from cpu.memory.
const STATIC_PALETTE_ADDR = 0x971ef0;
export function readStaticPalette(memory) {
  const out = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    out[i*4]     = memory[STATIC_PALETTE_ADDR + i*4];
    out[i*4 + 1] = memory[STATIC_PALETTE_ADDR + i*4 + 1];
    out[i*4 + 2] = memory[STATIC_PALETTE_ADDR + i*4 + 2];
    out[i*4 + 3] = i === 0 ? 0 : 255; // index 0 = transparent/black
  }
  return out;
}
function readLogPalette(cpu, addr) {
  if (!addr) return null;
  const numEntries = cpu.memory[addr + 2] | (cpu.memory[addr + 3] << 8);
  if (numEntries === 0 || numEntries > 256) return null;
  const out = new Uint8ClampedArray(256 * 4);
  // Default alpha = 255 for unfilled
  for (let i = 0; i < 256; i++) out[i*4 + 3] = 255;
  // Fill from entries (4 bytes each, starting at addr + 4)
  const base = addr + 4;
  for (let i = 0; i < numEntries; i++) {
    out[i*4]     = cpu.memory[base + i*4];      // R
    out[i*4 + 1] = cpu.memory[base + i*4 + 1];  // G
    out[i*4 + 2] = cpu.memory[base + i*4 + 2];  // B
    out[i*4 + 3] = 255;
  }
  // Index 0xff is transparent in RCT sprites — keep alpha 255 for canvas
  // (caller decides interpretation).
  return out;
}

NAMED.set("GDI32.dll!CreatePalette",  fn(1, (cpu, [logPalettePtr]) => {
  // Debug: dump first few bytes of LOGPALETTE so we can see what the binary passed
  if (logPalettePtr) {
    const ver = cpu.memory[logPalettePtr] | (cpu.memory[logPalettePtr + 1] << 8);
    const num = cpu.memory[logPalettePtr + 2] | (cpu.memory[logPalettePtr + 3] << 8);
    const e0 = `${cpu.memory[logPalettePtr+4]},${cpu.memory[logPalettePtr+5]},${cpu.memory[logPalettePtr+6]},${cpu.memory[logPalettePtr+7]}`;
    const e10 = `${cpu.memory[logPalettePtr+44]},${cpu.memory[logPalettePtr+45]},${cpu.memory[logPalettePtr+46]}`;
    const e80 = `${cpu.memory[logPalettePtr+4+128*4]},${cpu.memory[logPalettePtr+5+128*4]},${cpu.memory[logPalettePtr+6+128*4]}`;
    console.log(`CreatePalette @0x${logPalettePtr.toString(16)}  ver=${ver} num=${num} e[0]=(${e0}) e[10]=(${e10}) e[128]=(${e80})`);
  }
  const pal = readLogPalette(cpu, logPalettePtr);
  if (pal) { _capturedPalette = pal; _paletteSnapshots++; }
  return 0x30000001;
}));
NAMED.set("GDI32.dll!SetPaletteEntries", fn(4, (cpu, [hPal, iStart, cEntries, lpEntries]) => {
  if (!_capturedPalette) {
    _capturedPalette = new Uint8ClampedArray(256 * 4);
    for (let i = 0; i < 256; i++) _capturedPalette[i*4 + 3] = 255;
  }
  for (let i = 0; i < cEntries && (iStart + i) < 256; i++) {
    const idx = iStart + i;
    _capturedPalette[idx*4]     = cpu.memory[lpEntries + i*4];
    _capturedPalette[idx*4 + 1] = cpu.memory[lpEntries + i*4 + 1];
    _capturedPalette[idx*4 + 2] = cpu.memory[lpEntries + i*4 + 2];
    _capturedPalette[idx*4 + 3] = 255;
  }
  _paletteSnapshots++;
  return cEntries;
}));
NAMED.set("GDI32.dll!GetPaletteEntries", fn(4, (cpu, [hPal, iStart, cEntries, lpEntries]) => {
  if (!_capturedPalette) return 0;
  for (let i = 0; i < cEntries && (iStart + i) < 256; i++) {
    const idx = iStart + i;
    cpu.memory[lpEntries + i*4]     = _capturedPalette[idx*4];
    cpu.memory[lpEntries + i*4 + 1] = _capturedPalette[idx*4 + 1];
    cpu.memory[lpEntries + i*4 + 2] = _capturedPalette[idx*4 + 2];
    cpu.memory[lpEntries + i*4 + 3] = 0;
  }
  return cEntries;
}));
NAMED.set("GDI32.dll!AnimatePalette", fn(4, () => 1));
NAMED.set("GDI32.dll!ResizePalette",  fn(2, () => 1));
NAMED.set("GDI32.dll!SelectPalette",  fn(3, () => 0x30000000));
NAMED.set("GDI32.dll!RealizePalette", fn(1, () => 256));
NAMED.set("GDI32.dll!DeleteObject",   fn(1, () => 1));
NAMED.set("GDI32.dll!GetStockObject", fn(1, (cpu, [n]) => 0x30000100 | (n & 0xff)));
NAMED.set("GDI32.dll!CreateFontIndirectA", fn(1, () => 0x30000200));
NAMED.set("GDI32.dll!SelectObject",   fn(2, (cpu, [hdc, obj]) => obj));
NAMED.set("GDI32.dll!SetTextColor",   fn(2, () => 0));
NAMED.set("GDI32.dll!SetBkColor",     fn(2, () => 0));
NAMED.set("GDI32.dll!SetBkMode",      fn(2, () => 1));
NAMED.set("GDI32.dll!TextOutA",       fn(5, () => 1));
NAMED.set("GDI32.dll!CreateCompatibleDC", fn(1, () => 0x20100000));
NAMED.set("GDI32.dll!DeleteDC",       fn(1, () => 1));
// DIB section tracking: every call to CreateDIBSection allocates a backing
// buffer that the binary writes into. The most recent one is the canonical
// render target. pbmi is a BITMAPINFO struct: BITMAPINFOHEADER first (40 bytes):
//   +0 dwSize, +4 lWidth, +8 lHeight, +12 wPlanes, +14 wBitCount, +16 dwCompression, +20 dwSizeImage, ...
const _dibSections = []; // [{ width, height, bitCount, bufAddr }, ...]
export function getDibSections() { return _dibSections; }
export function getLatestDib() { return _dibSections[_dibSections.length - 1] || null; }
NAMED.set("GDI32.dll!CreateDIBSection", fn(6, (cpu, [hdc, pbmi, usage, ppvBits, hSection, dwOffset]) => {
  const m = cpu.memory;
  // Read BITMAPINFOHEADER fields
  const width    = (m[pbmi+4]  | (m[pbmi+5]<<8)  | (m[pbmi+6]<<16)  | (m[pbmi+7]<<24))  | 0;
  const heightS  = (m[pbmi+8]  | (m[pbmi+9]<<8)  | (m[pbmi+10]<<16) | (m[pbmi+11]<<24)) | 0;
  const height   = Math.abs(heightS);  // negative = top-down
  const bitCount =  m[pbmi+14] | (m[pbmi+15]<<8);
  const w = width || 800, h = height || 600, bc = bitCount || 8;
  const stride = ((w * bc + 31) >> 5) * 4; // DIB rows are dword-aligned
  const bytes = stride * h;
  const buf = heapAlloc(bytes);
  if (ppvBits) {
    m[ppvBits]     =  buf        & 0xff;
    m[ppvBits + 1] = (buf >>> 8) & 0xff;
    m[ppvBits + 2] = (buf >>> 16)& 0xff;
    m[ppvBits + 3] = (buf >>> 24)& 0xff;
  }
  _dibSections.push({ width: w, height: h, bitCount: bc, stride, bufAddr: buf, topDown: heightS < 0 });
  return 0x30000300 + _dibSections.length;
}));
NAMED.set("GDI32.dll!BitBlt",         fn(9, () => 1));
NAMED.set("GDI32.dll!StretchBlt",     fn(11, () => 1));
NAMED.set("GDI32.dll!SetDIBColorTable",   fn(4, () => 0));

// COM
NAMED.set("ole32.dll!CoInitialize",     fn(1, () => 0)); // S_OK
NAMED.set("ole32.dll!CoCreateInstance", fn(5, () => 0x80004005)); // E_FAIL

// DirectX creation. Instead of returning failure, hand back a fake COM object
// whose vtable is populated with method sentinels. Each method defaults to
// returning E_FAIL — the binary's per-method failure handling kicks in.
import { makeComObject } from "./com.js";

// IDirectDraw vtable layout (early DirectDraw, RCT-era):
// QueryInterface, AddRef, Release,
// Compact, CreateClipper, CreatePalette, CreateSurface, DuplicateSurface,
// EnumDisplayModes, EnumSurfaces, FlipToGDISurface, GetCaps, GetDisplayMode,
// GetFourCCCodes, GetGDISurface, GetMonitorFrequency, GetScanLine,
// GetVerticalBlankStatus, Initialize, RestoreDisplayMode,
// SetCooperativeLevel, SetDisplayMode, WaitForVerticalBlank
const IDDRAW_METHODS = [
  { name: "IDirectDraw::QueryInterface",       argCount: 2 },
  { name: "IDirectDraw::AddRef",               argCount: 0, handler: () => 1 },
  { name: "IDirectDraw::Release",              argCount: 0, handler: () => 0 },
  { name: "IDirectDraw::Compact",              argCount: 0, handler: () => 0 },
  { name: "IDirectDraw::CreateClipper",        argCount: 3 },
  { name: "IDirectDraw::CreatePalette",        argCount: 4, handler: (cpu, [thisPtr, dwFlags, lpDDColorArray, lpPalette, pUnkOuter]) => {
    // lpDDColorArray is a 256-entry PALETTEENTRY[] (4 bytes each = 1024 bytes total).
    if (lpDDColorArray) {
      _capturedPalette = new Uint8ClampedArray(256 * 4);
      for (let i = 0; i < 256; i++) {
        _capturedPalette[i*4]     = cpu.memory[lpDDColorArray + i*4];
        _capturedPalette[i*4 + 1] = cpu.memory[lpDDColorArray + i*4 + 1];
        _capturedPalette[i*4 + 2] = cpu.memory[lpDDColorArray + i*4 + 2];
        _capturedPalette[i*4 + 3] = 255;
      }
      _paletteSnapshots++;
    }
    if (lpPalette) {
      // Allocate a placeholder palette object pointer
      const writePtr = (a, v) => { cpu.memory[a]=v&0xff; cpu.memory[a+1]=(v>>>8)&0xff; cpu.memory[a+2]=(v>>>16)&0xff; cpu.memory[a+3]=(v>>>24)&0xff; };
      writePtr(lpPalette, 0x30100000);
    }
    return 0;
  } },
  { name: "IDirectDraw::CreateSurface",        argCount: 3 },
  { name: "IDirectDraw::DuplicateSurface",     argCount: 2 },
  { name: "IDirectDraw::EnumDisplayModes", argCount: 4, handler: (cpu, [thisPtr, dwFlags, lpDDSurfaceDesc, lpContext, lpEnumModesCallback]) => {
    // Build a DDSURFACEDESC (108 bytes) describing one mode: 800x600x8
    const desc = heapAlloc(108);
    for (let i = 0; i < 108; i++) cpu.memory[desc + i] = 0;
    const writeU32 = (off, v) => { cpu.memory[desc+off]=v&0xff; cpu.memory[desc+off+1]=(v>>>8)&0xff; cpu.memory[desc+off+2]=(v>>>16)&0xff; cpu.memory[desc+off+3]=(v>>>24)&0xff; };
    writeU32(0,    108);                 // dwSize
    writeU32(4,    0x00000007);          // dwFlags = DDSD_CAPS|DDSD_HEIGHT|DDSD_WIDTH (we'll be loose)
    writeU32(8,    600);                 // dwHeight
    writeU32(12,   800);                 // dwWidth
    writeU32(16,   800);                 // dwPitch
    writeU32(72,   32);                  // ddpfPixelFormat.dwSize
    writeU32(72+4, 0x40);                // dwFlags = DDPF_PALETTEINDEXED8
    writeU32(72+12, 8);                  // dwRGBBitCount = 8
    // Invoke the binary's callback. Standard DDraw callback signature:
    //   HRESULT CALLBACK Cb(LPDDSURFACEDESC, LPVOID lpContext)
    callIntoBinary(cpu, lpEnumModesCallback, [desc, lpContext]);
    return 0; // S_OK
  } },
  { name: "IDirectDraw::EnumSurfaces",         argCount: 4, handler: () => 0 },
  { name: "IDirectDraw::FlipToGDISurface",     argCount: 0, handler: () => 0 },
  { name: "IDirectDraw::GetCaps",              argCount: 2, handler: () => 0 },
  { name: "IDirectDraw::GetDisplayMode",       argCount: 1, handler: () => 0 },
  { name: "IDirectDraw::GetFourCCCodes",       argCount: 2, handler: () => 0 },
  { name: "IDirectDraw::GetGDISurface",        argCount: 1 },
  { name: "IDirectDraw::GetMonitorFrequency",  argCount: 1, handler: (cpu, [, p]) => { writeU32(cpu.memory, p, 60); return 0; } },
  { name: "IDirectDraw::GetScanLine",          argCount: 1 },
  { name: "IDirectDraw::GetVerticalBlankStatus", argCount: 1, handler: (cpu, [, p]) => { writeU32(cpu.memory, p, 1); return 0; } },
  { name: "IDirectDraw::Initialize",           argCount: 1, handler: () => 0 },
  { name: "IDirectDraw::RestoreDisplayMode",   argCount: 0, handler: () => 0 },
  { name: "IDirectDraw::SetCooperativeLevel",  argCount: 2, handler: () => 0 },
  { name: "IDirectDraw::SetDisplayMode",       argCount: 3, handler: () => 0 },
  { name: "IDirectDraw::WaitForVerticalBlank", argCount: 2, handler: () => 0 },
];

function writeU32(mem, addr, value) {
  mem[addr]     =  value        & 0xff;
  mem[addr + 1] = (value >>> 8)  & 0xff;
  mem[addr + 2] = (value >>> 16) & 0xff;
  mem[addr + 3] = (value >>> 24) & 0xff;
}

// ---- IDirectDrawSurface ----
//
// Each surface owns:
//   - width/height/pitch (uint32 each, stored after the vtable pointer)
//   - a buffer (Uint8Array), tracked in a JS-side Map keyed by object pointer
//
// Vtable offset map (we implement the common ones the binary calls):
//   0x00 QueryInterface, 0x04 AddRef, 0x08 Release
//   0x14 Blt, 0x18 BltBatch, 0x1c BltFast, 0x20 DeleteAttachedSurface
//   0x24 EnumAttachedSurfaces, 0x28 EnumOverlayZOrders, 0x2c Flip
//   0x30 GetAttachedSurface, 0x34 GetBltStatus, 0x38 GetCaps
//   0x3c GetClipper, 0x40 GetColorKey, 0x44 GetDC, 0x48 GetFlipStatus
//   0x4c GetOverlayPosition, 0x50 GetPalette, 0x54 GetPixelFormat
//   0x58 GetSurfaceDesc, 0x5c Initialize, 0x60 IsLost
//   0x64 Lock, 0x68 ReleaseDC, 0x6c Restore
//   0x70 SetClipper, 0x74 SetColorKey, 0x78 SetOverlayPosition
//   0x7c SetPalette, 0x80 Unlock, 0x84 UpdateOverlay
//   0x88 UpdateOverlayDisplay, 0x8c UpdateOverlayZOrder

const _surfaceData = new Map(); // objAddr → { width, height, pitch, buf }

let _primarySurfaceAddr = 0;
export function getPrimarySurfaceAddr() { return _primarySurfaceAddr; }
export function getSurfaceBuffer(addr) { return _surfaceData.get(addr); }

function makeSurface(cpu, width, height) {
  const w = width | 0, h = height | 0;
  const pitch = w; // 8bpp, no row padding
  const buf = new Uint8Array(w * h);
  buf.fill(0); // black
  // Surface object: [vtable*][width][height][pitch][buf_index]
  const alloc = (n) => heapAlloc(n);
  alloc._mem = cpu.memory;
  const objAddr = makeComObject(alloc, (s, sp) => SHIMS.set(s, sp), IDDRAW_SURFACE_METHODS, 16);
  // Stash dimensions in the object's extra-state words (after the vtable ptr).
  const writeU32 = (off, v) => {
    cpu.memory[objAddr + 4 + off]     =  v        & 0xff;
    cpu.memory[objAddr + 4 + off + 1] = (v >>> 8) & 0xff;
    cpu.memory[objAddr + 4 + off + 2] = (v >>> 16)& 0xff;
    cpu.memory[objAddr + 4 + off + 3] = (v >>> 24)& 0xff;
  };
  writeU32(0, w);
  writeU32(4, h);
  writeU32(8, pitch);
  _surfaceData.set(objAddr, { width: w, height: h, pitch, buf });
  return objAddr;
}

const IDDRAW_SURFACE_METHODS = [
  { name: "IDDS::QueryInterface",  argCount: 2 },
  { name: "IDDS::AddRef",          argCount: 0, handler: () => 1 },
  { name: "IDDS::Release",         argCount: 0, handler: () => 0 },
  { name: "IDDS::AddAttachedSurface", argCount: 1, handler: () => 0 },
  { name: "IDDS::AddOverlayDirtyRect", argCount: 1, handler: () => 0 },
  { name: "IDDS::Blt",             argCount: 5, handler: () => 0 },           // we no-op blits for now
  { name: "IDDS::BltBatch",        argCount: 3, handler: () => 0 },
  { name: "IDDS::BltFast",         argCount: 5, handler: () => 0 },
  { name: "IDDS::DeleteAttached",  argCount: 2, handler: () => 0 },
  { name: "IDDS::EnumAttached",    argCount: 2, handler: () => 0 },
  { name: "IDDS::EnumOverlayZOrders", argCount: 3, handler: () => 0 },
  { name: "IDDS::Flip",            argCount: 2, handler: () => { _flipsObserved++; return 0; } },
  { name: "IDDS::GetAttached",     argCount: 2, handler: () => 0 },
  { name: "IDDS::GetBltStatus",    argCount: 1, handler: () => 0 },
  { name: "IDDS::GetCaps",         argCount: 1, handler: () => 0 },
  { name: "IDDS::GetClipper",      argCount: 1, handler: () => 0 },
  { name: "IDDS::GetColorKey",     argCount: 2, handler: () => 0 },
  { name: "IDDS::GetDC",           argCount: 1, handler: (cpu, [, p]) => { writeU32mem(cpu.memory, p, 0x20100000); return 0; } },
  { name: "IDDS::GetFlipStatus",   argCount: 1, handler: () => 0 },
  { name: "IDDS::GetOverlayPos",   argCount: 2, handler: () => 0 },
  { name: "IDDS::GetPalette",      argCount: 1, handler: () => 0 },
  { name: "IDDS::GetPixelFormat",  argCount: 1, handler: (cpu, [, p]) => {
      // Fill DDPIXELFORMAT: 32-byte struct, dwSize=32, dwFlags=DDPF_PALETTEINDEXED8 | DDPF_RGB
      for (let i = 0; i < 32; i++) cpu.memory[p + i] = 0;
      writeU32mem(cpu.memory, p,    32);   // dwSize
      writeU32mem(cpu.memory, p + 4, 0x40); // DDPF_PALETTEINDEXED8
      writeU32mem(cpu.memory, p + 12, 8);  // dwRGBBitCount
      return 0;
  } },
  { name: "IDDS::GetSurfaceDesc",  argCount: 1, handler: (cpu, [thisPtr, p]) => {
      const s = _surfaceData.get(thisPtr);
      // DDSURFACEDESC layout matches what we built for EnumDisplayModes
      for (let i = 0; i < 108; i++) cpu.memory[p + i] = 0;
      writeU32mem(cpu.memory, p,        108);                     // dwSize
      writeU32mem(cpu.memory, p +  4,   0x00000007 | 0x00000008); // DDSD_CAPS|HEIGHT|WIDTH|PITCH
      writeU32mem(cpu.memory, p +  8,   s ? s.height : 600);
      writeU32mem(cpu.memory, p + 12,   s ? s.width  : 800);
      writeU32mem(cpu.memory, p + 16,   s ? s.pitch  : 800);
      writeU32mem(cpu.memory, p + 72,   32);    // ddpfPixelFormat.dwSize
      writeU32mem(cpu.memory, p + 76,   0x40);  // DDPF_PALETTEINDEXED8
      writeU32mem(cpu.memory, p + 84,   8);     // dwRGBBitCount
      return 0;
  } },
  { name: "IDDS::Initialize",      argCount: 2, handler: () => 0 },
  { name: "IDDS::IsLost",          argCount: 0, handler: () => 0 },           // DD_OK = surface not lost
  { name: "IDDS::Lock",            argCount: 4, handler: (cpu, [thisPtr, lpRect, lpDDSDesc, dwFlags, hEvent]) => {
      const s = _surfaceData.get(thisPtr);
      if (!s) return 0x80004005;
      // Allocate a region in our memory for the surface buffer if not already
      // mapped, then write its address into lpDDSDesc.lpSurface (offset 36).
      if (!s.mappedAddr) {
        s.mappedAddr = heapAlloc(s.buf.length);
        // Copy buf contents into mapped region
        for (let i = 0; i < s.buf.length; i++) cpu.memory[s.mappedAddr + i] = s.buf[i];
      }
      // Fill the surface desc the binary passed
      if (lpDDSDesc) {
        for (let i = 0; i < 108; i++) cpu.memory[lpDDSDesc + i] = 0;
        writeU32mem(cpu.memory, lpDDSDesc,        108);
        writeU32mem(cpu.memory, lpDDSDesc + 4,    0x107);
        writeU32mem(cpu.memory, lpDDSDesc + 8,    s.height);
        writeU32mem(cpu.memory, lpDDSDesc + 12,   s.width);
        writeU32mem(cpu.memory, lpDDSDesc + 16,   s.pitch);
        writeU32mem(cpu.memory, lpDDSDesc + 36,   s.mappedAddr); // lpSurface
        writeU32mem(cpu.memory, lpDDSDesc + 72,   32);
        writeU32mem(cpu.memory, lpDDSDesc + 76,   0x40);
        writeU32mem(cpu.memory, lpDDSDesc + 84,   8);
      }
      return 0;
  } },
  { name: "IDDS::ReleaseDC",       argCount: 1, handler: () => 0 },
  { name: "IDDS::Restore",         argCount: 0, handler: () => 0 },
  { name: "IDDS::SetClipper",      argCount: 1, handler: () => 0 },
  { name: "IDDS::SetColorKey",     argCount: 2, handler: () => 0 },
  { name: "IDDS::SetOverlayPos",   argCount: 2, handler: () => 0 },
  { name: "IDDS::SetPalette",      argCount: 1, handler: () => 0 },
  { name: "IDDS::Unlock",          argCount: 1, handler: (cpu, [thisPtr, lpRect]) => {
      // Copy bytes back from mapped region into our buf so we capture writes.
      const s = _surfaceData.get(thisPtr);
      if (!s || !s.mappedAddr) return 0;
      for (let i = 0; i < s.buf.length; i++) s.buf[i] = cpu.memory[s.mappedAddr + i];
      return 0;
  } },
  { name: "IDDS::UpdateOverlay",   argCount: 4, handler: () => 0 },
  { name: "IDDS::UpdateOverlayDisplay", argCount: 1, handler: () => 0 },
  { name: "IDDS::UpdateOverlayZOrder",  argCount: 2, handler: () => 0 },
];

function writeU32mem(mem, addr, value) {
  mem[addr]     =  value        & 0xff;
  mem[addr + 1] = (value >>> 8)  & 0xff;
  mem[addr + 2] = (value >>> 16) & 0xff;
  mem[addr + 3] = (value >>> 24) & 0xff;
}

let _flipsObserved = 0;
export function getFlipsObserved() { return _flipsObserved; }

// Replace the IDirectDraw::CreateSurface stub to actually allocate a surface.
// (The previous IDDRAW_METHODS array has it as a default-fail stub.)

// Lazy-allocate the global IDirectDraw object the first time it's requested.
let _ddrawObjAddr = 0;
export function getDDrawObj(cpu) {
  if (_ddrawObjAddr) return _ddrawObjAddr;
  // Replace the CreateSurface handler with a real allocator before allocating
  // the IDirectDraw object (so its vtable picks up the real handler).
  const csMethod = IDDRAW_METHODS.find(m => m.name === "IDirectDraw::CreateSurface");
  csMethod.handler = (cpu, [thisPtr, lpDDSurfaceDesc, lplpDDSurface, pUnkOuter]) => {
    // Read width/height from the supplied DDSURFACEDESC (the binary fills it).
    const w = readU32mem(cpu.memory, lpDDSurfaceDesc + 12) || 800;
    const h = readU32mem(cpu.memory, lpDDSurfaceDesc + 8)  || 600;
    const surfAddr = makeSurface(cpu, w, h);
    if (!_primarySurfaceAddr) _primarySurfaceAddr = surfAddr; // first one is primary
    if (lplpDDSurface) writeU32mem(cpu.memory, lplpDDSurface, surfAddr);
    return 0;
  };
  const alloc = (n) => heapAlloc(n);
  alloc._mem = cpu.memory;
  const registerShim = (sentinel, spec) => SHIMS.set(sentinel, spec);
  _ddrawObjAddr = makeComObject(alloc, registerShim, IDDRAW_METHODS);
  return _ddrawObjAddr;
}

function readU32mem(mem, addr) {
  return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0;
}

NAMED.set("DDRAW.dll!DirectDrawCreate", fn(3, (cpu, [lpGUID, lplpDD, pUnkOuter]) => {
  if (lplpDD === 0) return 0x80070057; // E_POINTER
  writeU32(cpu.memory, lplpDD, getDDrawObj(cpu));
  return 0; // S_OK
}));
NAMED.set("DDRAW.dll!DirectDrawCreateEx", fn(4, (cpu, [lpGUID, lplpDD, iid, pUnkOuter]) => {
  if (lplpDD === 0) return 0x80070057;
  writeU32(cpu.memory, lplpDD, getDDrawObj(cpu));
  return 0;
}));
NAMED.set("DDRAW.dll!DirectDrawEnumerateA", fn(2, () => 0)); // no enumeration

// DirectSound / DirectInput / DirectPlay — fail outright; binary takes silent/no-input path.
NAMED.set("DSOUND.dll!DirectSoundCreate",      fn(3, () => 0x80004005));
NAMED.set("DSOUND.dll!DirectSoundEnumerateA",  fn(2, () => 0));
NAMED.set("DINPUT.dll!DirectInputCreateA",     fn(4, () => 0x80004005));
NAMED.set("DPLAYX.dll!#1", fn(3, () => 0x80004005)); // DirectPlayCreate
NAMED.set("DPLAYX.dll!#2", fn(2, () => 0));          // DirectPlayEnumerateA

// Default-stub assignment count per DLL. Most Win32 APIs are stdcall and
// take 0..6 args. We don't know argCount precisely without per-API specs, but
// stdcall pops based on the prototype, so getting it wrong corrupts the stack.
// For UNKNOWN imports, default to 0 args (caller will leak whatever args they
// pushed; only safe-ish for cdecl, which Win32 isn't). Add explicit specs as
// you encounter crashes.

function readCStr(mem, addr) {
  if (addr === 0) return "";
  const bytes = [];
  for (let i = 0; i < 256 && mem[addr + i] !== 0; i++) bytes.push(mem[addr + i]);
  return String.fromCharCode(...bytes);
}

// Call back INTO the binary from a shim handler.
//
// Pushes args (right-to-left for stdcall) plus a sentinel return address that
// the callback's `ret` will pop into eip. Dispatches to the callback. The
// dispatcher handles both lifted and interpreted targets — when the callback
// returns, eip == our sentinel and we return.
//
// Returns the eax value the callback set (its return code).
import { dispatch } from "../lifter/runtime.js";
const CALLBACK_RETURN_SENTINEL = 0xCB000000 >>> 0;
export function callIntoBinary(cpu, callbackAddr, args) {
  // Push args right-to-left
  for (let i = args.length - 1; i >= 0; i--) {
    cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
    const v = args[i] >>> 0;
    cpu.memory[cpu.regs.esp]     =  v        & 0xff;
    cpu.memory[cpu.regs.esp + 1] = (v >>> 8) & 0xff;
    cpu.memory[cpu.regs.esp + 2] = (v >>> 16)& 0xff;
    cpu.memory[cpu.regs.esp + 3] = (v >>> 24)& 0xff;
  }
  // Push our sentinel return address
  cpu.regs.esp = (cpu.regs.esp - 4) >>> 0;
  const sent = CALLBACK_RETURN_SENTINEL;
  cpu.memory[cpu.regs.esp]     =  sent        & 0xff;
  cpu.memory[cpu.regs.esp + 1] = (sent >>> 8) & 0xff;
  cpu.memory[cpu.regs.esp + 2] = (sent >>> 16)& 0xff;
  cpu.memory[cpu.regs.esp + 3] = (sent >>> 24)& 0xff;

  dispatch(cpu, callbackAddr, CALLBACK_RETURN_SENTINEL);
  // After dispatch, ret popped sentinel into eip. esp is back where it was
  // before our push of sentinel. The callback (stdcall) popped its args too.
  return cpu.regs.eax >>> 0;
}

let _nextDynamicSentinel = 0xF1000000;
function makeDynamicShim(name) {
  const sentinel = _nextDynamicSentinel; _nextDynamicSentinel += 4;
  // Default: 0-arg, return 0, log so we can see what's being called.
  SHIMS.set(sentinel, verbose(0, 0, name));
  return sentinel;
}

// Bind shim specs to sentinel addresses based on imports list.
// For each import, prefer an explicit shim from NAMED. If absent, look up the
// argCount in the auto-generated WIN32_SPECS table (parsed from Wine specs).
// If still unknown, default argCount=0 with a one-time warning.
import { WIN32_SPECS } from "./win32_specs.js";
export function bindShims(iatEntries) {
  for (const e of iatEntries) {
    const key = e.ordinal !== null ? `${e.dll}!#${e.ordinal}` : `${e.dll}!${e.name}`;
    let spec = NAMED.get(key);
    if (!spec) {
      const wineArgCount = WIN32_SPECS[key];
      if (wineArgCount !== undefined) {
        // Default behavior: stub returning 0 with the correct stack-cleanup count.
        // The binary won't crash from a wrong argCount, but the function does nothing.
        spec = { argCount: wineArgCount, ret: () => 0, name: key, log: false };
      } else {
        // Unknown export — log loudly the first time it's called.
        spec = verbose(0, 0, key + " [UNKNOWN]");
      }
    } else {
      spec = { ...spec, name: spec.name || key };
    }
    SHIMS.set(e.sentinel, spec);
  }
}

export function isShim(addr)  { return addr >= 0xF0000000; }
export function getShim(addr) { return SHIMS.get(addr); }

// Stack args helper: stdcall pops args after return, but cdecl doesn't. For
// our default we assume stdcall (Win32 standard). Caller is responsible for
// popping the return address; we pop args and put result in eax.
export function invokeShim(cpu, sentinel) {
  const spec = SHIMS.get(sentinel);
  if (!spec) {
    throw new Error(`unknown shim 0x${sentinel.toString(16)}`);
  }
  // The shim was called via `call [iat]`. The return address is on top of
  // the stack. Args are above the return address.
  const retAddr = (cpu.memory[cpu.regs.esp] | (cpu.memory[cpu.regs.esp+1] << 8) |
                   (cpu.memory[cpu.regs.esp+2] << 16) | (cpu.memory[cpu.regs.esp+3] << 24)) >>> 0;
  const args = [];
  for (let i = 0; i < spec.argCount; i++) {
    const a = (cpu.memory[cpu.regs.esp + 4 + i*4] | (cpu.memory[cpu.regs.esp + 5 + i*4] << 8) |
               (cpu.memory[cpu.regs.esp + 6 + i*4] << 16) | (cpu.memory[cpu.regs.esp + 7 + i*4] << 24)) >>> 0;
    args.push(a);
  }
  if (spec.log) {
    console.error(`SHIM ${spec.name} args=[${args.map(a => "0x" + a.toString(16)).join(", ")}]`);
  }
  const result = spec.ret(cpu, args);
  cpu.regs.eax = (result | 0) >>> 0;
  // Pop return + args (stdcall): esp += 4 (ret) + argCount * 4
  cpu.regs.esp = (cpu.regs.esp + 4 + spec.argCount * 4) >>> 0;
  cpu.regs.eip = retAddr;
}
