
void FUN_00455a66(void)

{
  uint uVar1;
  int unaff_ESI;
  bool bVar2;
  
  bVar2 = (byte)(&DAT_00743bc3)[(uint)*(ushort *)(unaff_ESI + 0x30) * 0x100] < 2;
  uVar1 = FUN_0043feb6();
  if (bVar2) {
    uVar1 = uVar1 | 0x2000;
    if ((*(uint *)(unaff_ESI + 0x10) >> 0xd & 1) != 0) goto LAB_00455aa6;
  }
  else if ((*(uint *)(unaff_ESI + 0x10) >> 0xd & 1) == 0) goto LAB_00455aa6;
  uVar1 = FUN_005e43de();
LAB_00455aa6:
  *(uint *)(unaff_ESI + 0x10) = uVar1;
  return;
}

