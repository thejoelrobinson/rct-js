
void FUN_0044bacd(void)

{
  int unaff_ESI;
  
  if ((*(int *)(unaff_ESI + 8) == 0) &&
     (*(short *)(&DAT_00887448 + (uint)*(ushort *)(unaff_ESI + 0x30) * 0x260) != -1)) {
    FUN_005e429d();
    *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 4;
    FUN_005e43de();
  }
  return;
}

