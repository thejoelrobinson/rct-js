
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00448e26(void)

{
  if (DAT_00630b21 == '\x02') {
    if ((DAT_00630b1a & 1) == 0) {
      if ((DAT_00630b1a & 2) != 0) {
        DAT_00630b1a = DAT_00630b1a & 0xfd;
        FUN_00426f56();
        return;
      }
    }
    else {
      FUN_004490cb();
      FUN_005e5562();
      _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
    }
  }
  return;
}

