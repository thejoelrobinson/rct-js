
void FUN_005e1f70(void)

{
  HWND__ *pHVar1;
  uint uVar2;
  undefined4 uVar3;
  
  if (DAT_0099c16b == 1) {
    uVar2 = FUN_0042d60a();
    pHVar1 = (HWND__ *)(uVar2 & 0xffff);
    uVar2 = FUN_0042d60a();
    DAT_0099fdf4 = pHVar1;
    DAT_0099fdf8 = uVar2 & 0xffff;
    GetNextWindow(DAT_0099fdf4,DAT_0099fdf8);
    return;
  }
  if (DAT_0099c16b < 2) {
    DAT_0099fdf4 = (HWND__ *)DAT_005f1a10;
    DAT_0099fdf8 = DAT_005f1a14;
    return;
  }
  uVar3 = FUN_0042d637();
  DAT_0099fdf8 = FUN_0042d637();
  DAT_0099fdf4 = (HWND__ *)uVar3;
  return;
}

