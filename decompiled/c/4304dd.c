
void FUN_004304dd(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3f31();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f8130;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 4;
    FUN_005e412c();
    *(undefined2 *)(unaff_ESI + 0x15a) = 0xffff;
    *(undefined2 *)(unaff_ESI + 0x15c) = 0xffff;
  }
  return;
}

