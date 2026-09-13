// runtime/win32/comdlg32.js — common file dialogs.
//
// Browser equivalents:
//   - GetOpenFileNameA / GetSaveFileNameA: ideally trigger an
//     <input type="file"> picker, but synchronous Win32 semantics don't
//     map well to async file pickers. Return cancel for now; the user
//     can drag-and-drop saves via runtime/vfs.js.

export function GetOpenFileNameA(heap, lpofn) { return 0; }
export function GetSaveFileNameA(heap, lpofn) { return 0; }
export function ChooseColorA(heap, lpcc) { return 0; }
export function ChooseFontA(heap, lpcf) { return 0; }
export function CommDlgExtendedError(heap) { return 0; }
