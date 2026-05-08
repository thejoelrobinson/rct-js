
void FUN_00455c5b(void)

{
  undefined2 in_AX;
  int unaff_ESI;
  
  FUN_005e3c3c();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_00632b40;
  *(undefined4 *)(unaff_ESI + 0xc) = DAT_00632db0;
  *(undefined2 *)(unaff_ESI + 0x30) = in_AX;
  *(undefined2 *)(unaff_ESI + 0x164) = 0;
  *(undefined2 *)(unaff_ESI + 0x15c) = 0;
  *(undefined2 *)(unaff_ESI + 0x168) = 0;
  FUN_00455a66();
  return;
}

