
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005d58d0(void)

{
  if (((DAT_00652288 != '\x06') && (DAT_00652288 != '\a')) && (DAT_00652288 != '\b')) {
    return;
  }
  if ((DAT_00652292 & 1) != 0) {
    FUN_005e5562();
    _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
  }
  return;
}

