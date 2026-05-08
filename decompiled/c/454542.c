
void FUN_00454542(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_00632dc8;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x3ef4;
    FUN_005e412c();
    DAT_00632f00 = 0xffff;
    *(undefined2 *)(unaff_ESI + 0x16a) = 0;
  }
  return;
}

