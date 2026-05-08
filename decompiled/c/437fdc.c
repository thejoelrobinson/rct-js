
void FUN_00437fdc(void)

{
  int iVar1;
  int unaff_ESI;
  bool bVar2;
  
  bVar2 = true;
  FUN_005e5fcb();
  if (bVar2) {
    iVar1 = FUN_00404656(0x10000,0);
    if (iVar1 == 0) {
      return;
    }
    DAT_00628c44 = iVar1;
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_00628a50;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 4;
    FUN_005e412c();
    *(short *)(unaff_ESI + 0x15a) = (short)DAT_00991f88;
    FUN_0043803e();
  }
  return;
}

