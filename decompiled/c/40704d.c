
void FUN_0040704d(void)

{
  int iVar1;
  
  if ((DAT_005ebf00 != (int *)0x0) && (DAT_005e916c != 0)) {
    DAT_005ebf08 = 0;
    iVar1 = (**(code **)(*DAT_005ebf00 + 0x34))(DAT_005ebf00,DAT_005e916c,6);
    if (iVar1 == 0) {
      iVar1 = (**(code **)(*DAT_005ebf00 + 0x1c))(DAT_005ebf00);
      if (iVar1 == 0) {
        DAT_005ebf08 = 1;
      }
    }
  }
  return;
}

