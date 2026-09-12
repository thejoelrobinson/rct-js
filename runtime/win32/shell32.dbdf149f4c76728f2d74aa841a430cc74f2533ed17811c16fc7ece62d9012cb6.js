// runtime/win32/shell32.js — system-tray icon, drag/drop file APIs.
//
// All no-ops in the browser context. Drag-drop is wired through real DOM
// events in runtime/vfs.js when needed.

export function Shell_NotifyIconA(heap, dwMessage, lpData) { return 1; }
export function Shell_NotifyIconW(heap, dwMessage, lpData) { return 1; }
export function DragAcceptFiles(heap, hWnd, fAccept) {}
export function DragQueryFileA(heap, hDrop, iFile, lpszFile, cch) {
  // Asking for the count returns 0 (no files dropped).
  if (iFile === 0xffffffff) return 0;
  if (lpszFile && cch > 0) heap.setU8(lpszFile, 0);
  return 0;
}
export function DragFinish(heap, hDrop) {}
export function ShellExecuteA(heap, hwnd, lpOperation, lpFile, lpParameters, lpDirectory, nShowCmd) {
  return 32;   // success per Win32 convention
}
export function SHGetSpecialFolderPathA(heap, hwnd, lpszPath, csidl, fCreate) {
  if (lpszPath) heap.writeCStr(lpszPath, "C:\\RCT\\saves", 260);
  return 1;
}
