
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00402bef(void)

{
  if (DAT_005e9160 != 0) {
    _DAT_005eee80 = DAT_005e9118;
    DAT_005eee88 = 0;
    DAT_005eee84 = -1;
    _DAT_005e9124 = 0;
    DAT_005e9160 = 0;
  }
  DAT_005e9110 = FUN_0040473c();
  DAT_005e9114 = DAT_005e9110 - _DAT_005eee80;
  _DAT_005e911c = DAT_005e9110 - DAT_005e9118;
  if (DAT_005e9114 == 0) {
    _DAT_005e9120 = 1000;
  }
  else {
    _DAT_005e9120 = (undefined4)(1000 / (ulonglong)DAT_005e9114);
  }
  _DAT_005eee80 = DAT_005e9110;
  DAT_005eee88 = DAT_005eee88 + DAT_005e9114;
  DAT_005eee84 = DAT_005eee84 + 1;
  if (999 < DAT_005eee88) {
    DAT_005eee88 = DAT_005eee88 - 1000;
    _DAT_005e9124 = DAT_005eee84;
    DAT_005eee84 = 0;
  }
  return;
}

