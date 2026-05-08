
void FUN_0044eff2(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_00631b08;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0xbf4;
    FUN_005e412c();
    FUN_0045163c();
    *(undefined2 *)(unaff_ESI + 0x168) = 0;
  }
  return;
}

