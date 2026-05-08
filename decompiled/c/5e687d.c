
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e687d(void)

{
  uint uVar1;
  int unaff_ESI;
  undefined1 uVar2;
  
  uVar1 = DAT_00991f30 >> 3;
  DAT_00991f30 = DAT_00991f30 & 0xfffffff7;
  if ((uVar1 & 1) != 0) {
    FUN_004363f1();
    FUN_0043642b();
    _DAT_0099a020 = 0;
    if (-1 < DAT_00991f5c) {
      uVar2 = (DAT_00991f5a | 0x80) == 0;
      FUN_005e5301();
      FUN_005e3b2b();
      if (!(bool)uVar2) {
        (**(code **)(unaff_ESI + 4))();
      }
    }
  }
  return;
}

