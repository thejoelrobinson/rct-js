// runtime/win32/advapi32.js — Registry, backed by localStorage where available.
//
// Win32 registry semantics:
//   - HKEY is a handle. Predefined: HKEY_CLASSES_ROOT (0x80000000),
//     HKEY_CURRENT_USER (0x80000001), HKEY_LOCAL_MACHINE (0x80000002),
//     HKEY_USERS (0x80000003), HKEY_CURRENT_CONFIG (0x80000005).
//   - Each key has a path; values are name → (type, bytes).
//   - We flatten the tree: each key+value becomes a localStorage entry
//     named "rct1:<HKEY-prefix>:<sub-path>:<value-name>".
//
// Persistence: localStorage when present (browser); a Map fallback in node so
// tests can exercise the surface without a DOM.
//
// Return values follow Win32: 0 = ERROR_SUCCESS, 2 = ERROR_FILE_NOT_FOUND.

const HKEY_PREFIX = {
  [0x80000000 | 0]: "HKCR",
  [0x80000001 | 0]: "HKCU",
  [0x80000002 | 0]: "HKLM",
  [0x80000003 | 0]: "HKU",
  [0x80000005 | 0]: "HKCC",
};

// Backing store — localStorage in browser, Map elsewhere.
const _fallback = new Map();
function lsGet(k) {
  if (typeof localStorage !== "undefined") return localStorage.getItem(k);
  return _fallback.has(k) ? _fallback.get(k) : null;
}
function lsSet(k, v) {
  if (typeof localStorage !== "undefined") localStorage.setItem(k, v);
  else _fallback.set(k, v);
}
function lsDel(k) {
  if (typeof localStorage !== "undefined") localStorage.removeItem(k);
  else _fallback.delete(k);
}
function lsKeys(prefix) {
  if (typeof localStorage !== "undefined") {
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) out.push(k);
    }
    return out;
  }
  return [..._fallback.keys()].filter(k => k.startsWith(prefix));
}

// Each key handle remembers its full path so values can be looked up under it.
const _keyHandles = new Map();   // hKey → "HKLM:Software\\Foo"
let _nextKey = 0x10030000;

function rootPath(hKey) {
  return HKEY_PREFIX[hKey | 0] || _keyHandles.get(hKey) || null;
}
function combinePath(rootHKey, sub) {
  const root = rootPath(rootHKey);
  if (!root) return null;
  if (!sub) return root;
  return `${root}:${sub}`;
}
function valueKey(keyPath, valueName) {
  return `rct1:${keyPath}:${valueName || ""}`;
}

// ---- Registry APIs ----

export function RegOpenKeyA(heap, hKey, lpSubKey, phkResult) {
  const sub = lpSubKey ? heap.readCStr(lpSubKey) : "";
  const path = combinePath(hKey, sub);
  if (!path) {
    if (phkResult) heap.setU32(phkResult, 0);
    return 6;   // ERROR_INVALID_HANDLE
  }
  // We don't actually require the key to "exist" — Win32 RegOpenKey on a
  // never-written subkey returns ERROR_FILE_NOT_FOUND, which is what callers
  // expect on first run. Check whether *any* value lives under this path:
  const anyValue = lsKeys(`rct1:${path}:`).length > 0;
  if (!anyValue) {
    if (phkResult) heap.setU32(phkResult, 0);
    return 2;   // ERROR_FILE_NOT_FOUND
  }
  const handle = _nextKey++;
  _keyHandles.set(handle, path);
  if (phkResult) heap.setU32(phkResult, handle);
  return 0;
}

export function RegOpenKeyExA(heap, hKey, lpSubKey, ulOptions, samDesired, phkResult) {
  return RegOpenKeyA(heap, hKey, lpSubKey, phkResult);
}

export function RegCreateKeyA(heap, hKey, lpSubKey, phkResult) {
  const sub = lpSubKey ? heap.readCStr(lpSubKey) : "";
  const path = combinePath(hKey, sub);
  if (!path) return 6;
  const handle = _nextKey++;
  _keyHandles.set(handle, path);
  if (phkResult) heap.setU32(phkResult, handle);
  return 0;
}

export function RegCreateKeyExA(heap, hKey, lpSubKey, Reserved, lpClass, dwOptions, samDesired, lpSecurityAttributes, phkResult, lpdwDisposition) {
  const ret = RegCreateKeyA(heap, hKey, lpSubKey, phkResult);
  if (lpdwDisposition) heap.setU32(lpdwDisposition, 1); // REG_CREATED_NEW_KEY
  return ret;
}

export function RegCloseKey(heap, hKey) {
  _keyHandles.delete(hKey);
  return 0;
}

export function RegFlushKey(heap, hKey) { return 0; }

export function RegDeleteKeyA(heap, hKey, lpSubKey) {
  const sub = lpSubKey ? heap.readCStr(lpSubKey) : "";
  const path = combinePath(hKey, sub);
  if (!path) return 6;
  for (const k of lsKeys(`rct1:${path}:`)) lsDel(k);
  return 0;
}

export function RegDeleteValueA(heap, hKey, lpValueName) {
  const path = rootPath(hKey);
  if (!path) return 6;
  const valueName = lpValueName ? heap.readCStr(lpValueName) : "";
  lsDel(valueKey(path, valueName));
  return 0;
}

// REG_SZ = 1, REG_EXPAND_SZ = 2, REG_BINARY = 3, REG_DWORD = 4
export function RegQueryValueExA(heap, hKey, lpValueName, lpReserved, lpType, lpData, lpcbData) {
  const path = rootPath(hKey);
  if (!path) return 6;
  const valueName = lpValueName ? heap.readCStr(lpValueName) : "";
  const stored = lsGet(valueKey(path, valueName));
  if (stored == null) return 2; // ERROR_FILE_NOT_FOUND

  // Stored format: "<typeNum>|<base64-bytes>"
  const sepIdx = stored.indexOf("|");
  const type = parseInt(stored.slice(0, sepIdx), 10);
  const b64 = stored.slice(sepIdx + 1);
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  if (lpType) heap.setU32(lpType, type);
  const cbAvail = lpcbData ? heap.u32(lpcbData) : 0;
  if (lpData && cbAvail >= bytes.length) {
    for (let i = 0; i < bytes.length; i++) heap.setU8(lpData + i, bytes[i]);
  } else if (lpData && cbAvail > 0) {
    // Buffer too small — Win32 returns ERROR_MORE_DATA (234) and writes the
    // required size into lpcbData.
    if (lpcbData) heap.setU32(lpcbData, bytes.length);
    return 234;
  }
  if (lpcbData) heap.setU32(lpcbData, bytes.length);
  return 0;
}

export function RegSetValueExA(heap, hKey, lpValueName, Reserved, dwType, lpData, cbData) {
  const path = rootPath(hKey);
  if (!path) return 6;
  const valueName = lpValueName ? heap.readCStr(lpValueName) : "";
  const bytes = new Uint8Array(cbData);
  for (let i = 0; i < cbData; i++) bytes[i] = heap.u8(lpData + i);
  const b64 = btoa(String.fromCharCode(...bytes));
  lsSet(valueKey(path, valueName), `${dwType}|${b64}`);
  return 0;
}

// Test helper — clear all rct1: entries.
export function _clearRegistry() {
  for (const k of lsKeys("rct1:")) lsDel(k);
}
