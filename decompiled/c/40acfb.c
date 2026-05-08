
void FUN_0040acfb(void)

{
  undefined4 *puVar1;
  HDC hdc;
  int local_10;
  undefined4 *local_8;
  
  local_8 = DAT_005ebf48;
  while (local_8 != (undefined4 *)0x0) {
    puVar1 = (undefined4 *)local_8[2];
    FUN_00413470(*local_8);
    (**(code **)(*(int *)local_8[1] + 8))(local_8[1]);
    FUN_00413470(local_8);
    local_8 = puVar1;
  }
  DAT_005ebf48 = (undefined4 *)0x0;
  if (DAT_005ebf44 != (int *)0x0) {
    (**(code **)(*DAT_005ebf44 + 8))(DAT_005ebf44);
    DAT_005ebf44 = (int *)0x0;
  }
  if (DAT_005ebf38 != 0) {
    for (local_10 = 0; local_10 < DAT_005f0950; local_10 = local_10 + 1) {
      (**(code **)(**(int **)(DAT_005ebf38 + local_10 * 4) + 8))
                (*(undefined4 *)(DAT_005ebf38 + local_10 * 4));
    }
    FUN_00413470(DAT_005ebf38);
    DAT_005ebf38 = 0;
  }
  if (DAT_005ebf34 != (int *)0x0) {
    (**(code **)(*DAT_005ebf34 + 8))(DAT_005ebf34);
    DAT_005ebf34 = (int *)0x0;
  }
  if (DAT_005ebf3c != (int *)0x0) {
    (**(code **)(*DAT_005ebf3c + 8))(DAT_005ebf3c);
    DAT_005ebf3c = (int *)0x0;
  }
  if (DAT_005e916c != (HWND)0x0) {
    hdc = GetDC(DAT_005e916c);
    if (hdc != (HDC)0x0) {
      SetSystemPaletteUse(hdc,1);
      ReleaseDC(DAT_005e916c,hdc);
    }
    DestroyWindow(DAT_005e916c);
    DAT_005e916c = (HWND)0x0;
  }
  return;
}

