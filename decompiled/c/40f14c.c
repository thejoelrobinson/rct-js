
void FUN_0040f14c(void)

{
  undefined4 *puVar1;
  undefined4 *local_8;
  
  if (DAT_005ec07c != (HGDIOBJ)0x0) {
    DeleteObject(DAT_005ec07c);
    DAT_005ec07c = (HGDIOBJ)0x0;
  }
  if (DAT_005ec074 != (undefined4 *)0x0) {
    local_8 = DAT_005ec074;
    while (local_8 != (undefined4 *)0x0) {
      FUN_0040eadf(*local_8);
      puVar1 = (undefined4 *)local_8[1];
      FUN_00413470(local_8);
      local_8 = puVar1;
    }
    DAT_005ec074 = (undefined4 *)0x0;
  }
  if (DAT_005ec078 != 0) {
    FUN_00413c90(&DAT_005ec0cc,s_C__gsk_DibGfx_c_005ec0bc,0x2b9);
  }
  if (DAT_005e916c != (HWND)0x0) {
    DestroyWindow(DAT_005e916c);
    DAT_005e916c = (HWND)0x0;
  }
  return;
}

