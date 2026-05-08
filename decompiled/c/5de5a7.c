
void FUN_005de5a7(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005dde9c();
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_006e1d40;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x2fff4;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x3c0000;
    FUN_005e412c();
    FUN_005ded48();
    FUN_00424db7();
    DAT_006e1ec3 = 2;
  }
  return;
}

