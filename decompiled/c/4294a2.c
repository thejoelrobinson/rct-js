
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004294a2(void)

{
  if (((_DAT_0087c3bc & 1) != 0) && (DAT_0087c3c0 != 0)) {
    if (DAT_0087c3c0 < DAT_0087d0c6 >> 1) {
      FUN_0042c711();
      return;
    }
    if ((ushort)((DAT_0087d0c6 >> 1) + DAT_0087d0c6) < DAT_0087c3c0) {
      FUN_0042c711();
      return;
    }
  }
  return;
}

