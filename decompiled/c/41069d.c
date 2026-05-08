
void FUN_0041069d(void)

{
  undefined4 *puVar1;
  undefined4 *local_8;
  
  if (DAT_005ec0d8 != (HGDIOBJ)0x0) {
    DeleteObject(DAT_005ec0d8);
    DAT_005ec0d8 = (HGDIOBJ)0x0;
  }
  if (DAT_005ec0d0 != (undefined4 *)0x0) {
    local_8 = DAT_005ec0d0;
    while (local_8 != (undefined4 *)0x0) {
      FUN_0040f8ba(*local_8);
      puVar1 = (undefined4 *)local_8[1];
      FUN_00413470(local_8);
      local_8 = puVar1;
    }
    DAT_005ec0d0 = (undefined4 *)0x0;
  }
  if (DAT_005ec0d4 != 0) {
    FUN_00413c90(&DAT_005ec118,s_C__gsk_DibSect_c_005ec104,0x309);
  }
  if (DAT_005e916c != (HWND)0x0) {
    DestroyWindow(DAT_005e916c);
    DAT_005e916c = (HWND)0x0;
  }
  return;
}

