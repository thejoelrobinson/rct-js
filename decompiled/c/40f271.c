
int FUN_0040f271(int param_1)

{
  int iVar1;
  HDC hdc;
  uint uVar2;
  
  iVar1 = param_1 * 0x12 + DAT_005ebe38;
  FUN_004049f2(iVar1);
  *(undefined1 *)(iVar1 + 4) = 1;
  hdc = GetDC((HWND)0x0);
  if (hdc != (HDC)0x0) {
    uVar2 = GetDeviceCaps(hdc,0x6a);
    *(short *)(iVar1 + 8) = (short)((int)(uVar2 & 0xffff) >> 1);
    *(undefined2 *)(iVar1 + 10) = *(undefined2 *)(iVar1 + 8);
    ReleaseDC((HWND)0x0,hdc);
  }
  return param_1 + 1;
}

