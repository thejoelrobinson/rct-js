
void FUN_00440659(void)

{
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_006291b0;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 500;
    FUN_005e412c();
    DAT_0062d2fc = 0xffff;
    *(undefined2 *)(unaff_ESI + 0x16a) = 0;
    DAT_0062d2fe = 0;
    DAT_0062d2fa = 0xff;
    *(undefined2 *)(unaff_ESI + 0x16c) = 0;
  }
  return;
}

