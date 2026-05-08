
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_0045192e(void)

{
  ushort *puVar1;
  undefined4 in_EAX;
  uint in_EDX;
  int unaff_ESI;
  
  FUN_0044a3ba();
  if (*(int *)(unaff_ESI + 8) != 0) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    *puVar1 = *puVar1 | 0x800;
  }
  DAT_00971e86._0_2_ = (&DAT_00887442)[(in_EDX & 0xff) * 0x130];
  unique0x00017200 = (&DAT_00887444)[(in_EDX & 0xff) * 0x98];
  FUN_0042c711();
  return CONCAT44(in_EDX,in_EAX);
}

