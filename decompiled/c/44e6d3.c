
void FUN_0044e6d3(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_00631a00;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x1dc;
    FUN_005e412c();
    *(undefined1 *)(unaff_ESI + 0x158) = 0;
    *(undefined1 *)(unaff_ESI + 0x159) = 0xff;
    *(undefined2 *)(unaff_ESI + 0x168) = 0;
  }
  DAT_00631d54 = 0;
  *(undefined2 *)(unaff_ESI + 0x16a) = 0;
  return;
}

