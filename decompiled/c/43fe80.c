
void FUN_0043fe80(void)

{
  uint uVar1;
  int unaff_ESI;
  bool bVar2;
  
  bVar2 = 0xff8bc46b < (uint)*(ushort *)(unaff_ESI + 0x30) << 8;
  uVar1 = FUN_0043feb6();
  if (bVar2) {
    uVar1 = uVar1 | 0x10000;
    if ((*(uint *)(unaff_ESI + 0x10) >> 0x10 & 1) != 0) goto LAB_0043feb2;
  }
  else if ((*(uint *)(unaff_ESI + 0x10) >> 0x10 & 1) == 0) goto LAB_0043feb2;
  uVar1 = FUN_005e43de();
LAB_0043feb2:
  *(uint *)(unaff_ESI + 0x10) = uVar1;
  return;
}

