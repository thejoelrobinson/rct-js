
void FUN_0042cc5f(void)

{
  ushort uVar1;
  ushort extraout_DX;
  short sVar2;
  int unaff_ESI;
  
  (**(code **)(unaff_ESI + 4))();
  uVar1 = (DAT_005f54dc - DAT_005f54da) - 1;
  sVar2 = extraout_DX - uVar1;
  if (extraout_DX < uVar1) {
    sVar2 = 0;
  }
  *(short *)(unaff_ESI + 0x3e) = sVar2;
  FUN_005e4198();
  return;
}

