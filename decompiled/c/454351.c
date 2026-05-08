
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00454351(void)

{
  int iVar1;
  
  if ((((_DAT_006323f8 & 1) != 0) && ((DAT_006326bd & 1) != 0)) && ((_DAT_0099a500 & 1) != 0)) {
    if (DAT_0063297c == '\0') {
      FUN_0042f239();
      iVar1 = FUN_0040d432(3,0x15,0);
      if (iVar1 != 0) {
        FUN_0040d4b8(3,1,0,0,0);
      }
      DAT_0063297c = '\x01';
    }
    return;
  }
  if (DAT_0063297c != '\0') {
    FUN_0045432a();
  }
  return;
}

