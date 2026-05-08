
void FUN_00406fca(void)

{
  int iVar1;
  
  if (((DAT_005ebef4 != 0) && (DAT_005ebefc != (int *)0x0)) && (DAT_005e916c != 0)) {
    DAT_005ebf04 = 0;
    iVar1 = (**(code **)(*DAT_005ebefc + 0x34))(DAT_005ebefc,DAT_005e916c,5);
    if ((iVar1 == 0) && (iVar1 = (**(code **)(*DAT_005ebefc + 0x1c))(DAT_005ebefc), iVar1 == 0)) {
      DAT_005ebf04 = 1;
    }
  }
  return;
}

