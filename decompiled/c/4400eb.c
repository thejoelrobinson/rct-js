
void FUN_004400eb(void)

{
  undefined2 in_AX;
  int unaff_ESI;
  
  FUN_005e3c3c();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_00628cf0;
  *(undefined4 *)(unaff_ESI + 0xc) = DAT_00629180;
  *(undefined2 *)(unaff_ESI + 0x30) = in_AX;
  *(undefined2 *)(unaff_ESI + 0x164) = 0;
  *(undefined2 *)(unaff_ESI + 0x15c) = 0;
  *(undefined2 *)(unaff_ESI + 0x168) = 0;
  *(undefined2 *)(unaff_ESI + 0x16a) = 0;
  FUN_0043fe80();
  return;
}

