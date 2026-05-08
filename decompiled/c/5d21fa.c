
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005d21fa(void)

{
  bool bVar1;
  
  if (((DAT_00652288 != '\0') && (DAT_00652288 != '\x04')) && (DAT_00652288 != '\x05')) {
    if (DAT_00652288 == '\x03') {
      FUN_005cfe66();
      return;
    }
    if ((DAT_00652292 & 1) == 0) {
      if ((DAT_00652292 & 2) != 0) {
        DAT_00652292 = DAT_00652292 & 0xfd;
        DAT_00652470 = DAT_00652289;
        bVar1 = false;
        if ((DAT_006522a2 & 4) == 0) {
          bVar1 = DAT_0065229e < (ushort)(&DAT_0065247a)[(uint)DAT_006522a2 * 2];
        }
        FUN_005cfac0();
        if (!bVar1) {
          FUN_00426f56();
          return;
        }
      }
    }
    else {
      FUN_005e5562();
      _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
    }
  }
  return;
}

