
void FUN_004062cb(void)

{
  int iVar1;
  int iVar2;
  HDC hdc;
  uint uVar3;
  undefined4 uVar4;
  
  iVar1 = FUN_00408bba();
  iVar2 = FUN_0040f25c();
  DAT_005ebe34 = iVar1 + iVar2 + 1;
  iVar1 = FUN_004133c0(DAT_005ebe34 * 0x12);
  DAT_005ebe38 = iVar1;
  if (iVar1 != 0) {
    FUN_004049f2(iVar1);
    hdc = GetDC((HWND)0x0);
    if (hdc != (HDC)0x0) {
      uVar3 = GetDeviceCaps(hdc,0x6a);
      *(short *)(iVar1 + 8) = (short)((int)(uVar3 & 0xffff) >> 1);
      *(undefined2 *)(iVar1 + 10) = *(undefined2 *)(iVar1 + 8);
      ReleaseDC((HWND)0x0,hdc);
    }
    uVar4 = FUN_0040f271(1);
    FUN_00408d19(uVar4);
  }
  return;
}

