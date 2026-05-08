
void FUN_0042cc19(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f54a4;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 4;
    FUN_005e412c();
    *(undefined2 *)(unaff_ESI + 0x15a) = 0xffff;
  }
  FUN_0042cc5f();
  return;
}

