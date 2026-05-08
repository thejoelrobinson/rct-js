
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004491eb(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3f31();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_00630cd4;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x1f7804;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0xc003f0;
    FUN_005e412c();
    FUN_005e6bcd();
    FUN_005e0c2f();
    FUN_00424db7();
  }
  FUN_005e687d();
  DAT_00630b21 = 0;
  FUN_005e680e();
  DAT_00991f30 = DAT_00991f30 | 0x40;
  DAT_00630b27 = 0;
  if (_DAT_00630b28 == 0) {
    _DAT_00630b28 = 1;
  }
  FUN_00449904();
  return;
}

