
void FUN_0044142c(void)

{
  int unaff_ESI;
  int iVar1;
  
  if ((*(char *)(unaff_ESI + 0x2b) == '\a') || (*(char *)(unaff_ESI + 0x2b) == '\x03')) {
    iVar1 = (uint)*(byte *)(unaff_ESI + 0x68) * 0x260;
    (&DAT_0088752b)[iVar1] = (&DAT_0088752b)[iVar1] + -1;
    (&DAT_0088751d)[iVar1] = (&DAT_0088751d)[iVar1] | 0xc;
  }
  return;
}

