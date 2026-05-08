
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005d5801(void)

{
  ushort uVar1;
  
  if (((DAT_00652288 != '\x06') && (DAT_00652288 != '\a')) && (DAT_00652288 != '\b')) {
    return;
  }
  DAT_00652293 = DAT_00652293 + -1;
  if (DAT_00652293 < '\0') {
    DAT_00652293 = '\x05';
    DAT_00652292 = DAT_00652292 ^ 1;
    DAT_0099a4de = DAT_0065228a & 0xffe0;
    DAT_0099a4e0 = DAT_0065228c & 0xffe0;
    DAT_0099a4e2 = DAT_0065228e + 0xf;
    DAT_0099a4e4 = 4;
    uVar1 = DAT_0065228c & 0x1f;
    if ((((DAT_0065228a & 0x1f) != 0 || uVar1 != 0) &&
        (DAT_0099a4e4 = 6, (uVar1 & DAT_0065228a & 0x1f) == 0)) && (DAT_0099a4e4 = 5, uVar1 == 0)) {
      DAT_0099a4e4 = 7;
    }
    _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
    if ((DAT_00652292 & 1) != 0) {
      _DAT_0099a020 = _DAT_0099a020 | 4;
    }
    FUN_005e5562();
  }
  return;
}

