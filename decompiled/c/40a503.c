
void FUN_0040a503(void)

{
  int iVar1;
  
  if (((DAT_005ebf54 == 0) && (DAT_005ebf34 != (int *)0x0)) && (DAT_005ebf3c != 0)) {
    iVar1 = (**(code **)(*DAT_005ebf34 + 0x7c))(DAT_005ebf34,DAT_005ebf3c);
    if (iVar1 == -0x7789fe3e) {
      iVar1 = FUN_00408d5d();
      if (iVar1 != 0) {
        (**(code **)(*DAT_005ebf34 + 0x7c))(DAT_005ebf34,DAT_005ebf3c);
      }
    }
  }
  return;
}

