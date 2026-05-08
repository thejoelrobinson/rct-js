
void FUN_004049f2(undefined2 *param_1)

{
  int iVar1;
  HDC hdc;
  uint uVar2;
  int iVar3;
  
  iVar1 = GetSystemMetrics(0);
  *param_1 = (short)iVar1;
  iVar1 = GetSystemMetrics(1);
  param_1[1] = (short)iVar1;
  hdc = GetDC((HWND)0x0);
  if (hdc == (HDC)0x0) {
    *(undefined1 *)(param_1 + 3) = 0;
    *(undefined1 *)((int)param_1 + 7) = 0;
    param_1[6] = 0;
    param_1[8] = 0;
  }
  else {
    uVar2 = GetDeviceCaps(hdc,0x26);
    iVar1 = GetDeviceCaps(hdc,0x68);
    iVar3 = GetDeviceCaps(hdc,0xc);
    *(char *)(param_1 + 3) = (char)iVar3;
    *(bool *)((int)param_1 + 7) = (uVar2 & 0x100) != 0;
    param_1[6] = (short)iVar1;
    iVar1 = GetDeviceCaps(hdc,0x6c);
    param_1[8] = (byte)iVar1 / 3;
    ReleaseDC((HWND)0x0,hdc);
  }
  param_1[4] = 0;
  param_1[5] = 0;
  *(undefined1 *)(param_1 + 2) = 0;
  *(undefined1 *)((int)param_1 + 5) = 0;
  *(undefined1 *)(param_1 + 7) = 0;
  *(undefined1 *)((int)param_1 + 0xf) = 0;
  return;
}

