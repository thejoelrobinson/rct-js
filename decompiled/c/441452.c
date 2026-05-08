
undefined4 FUN_00441452(void)

{
  undefined4 in_EAX;
  int iVar1;
  int unaff_ESI;
  
  if (*(char *)(unaff_ESI + 0x2e) == '\0') {
    FUN_005e5301();
    if ((*(char *)(unaff_ESI + 0x2b) == '\x03') || (*(char *)(unaff_ESI + 0x2b) == '\a')) {
      iVar1 = (uint)*(byte *)(unaff_ESI + 0x68) * 0x260;
      (&DAT_0088752b)[iVar1] = (&DAT_0088752b)[iVar1] + '\x01';
      (&DAT_0088751d)[iVar1] = (&DAT_0088751d)[iVar1] | 0xc;
    }
    FUN_005e5301();
    return in_EAX;
  }
  FUN_005e5301();
  FUN_005e5301();
  return in_EAX;
}

