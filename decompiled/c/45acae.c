
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0045acae(void)

{
  if (DAT_008d7eac != 0) {
    if (DAT_008d7eac == 0x3c0) {
      _DAT_005f54ec = _DAT_005f54ec | 8;
    }
    DAT_008d7eac = DAT_008d7eac + -1;
    return;
  }
  if ((DAT_0088741c & 0x7f) == 0) {
    if (DAT_008d7eb0 != DAT_008d7eb1) {
      if (DAT_008d7eb1 < DAT_008d7eb0) {
        DAT_008d7eb0 = DAT_008d7eb0 - 1;
      }
      else {
        DAT_008d7eb0 = DAT_008d7eb0 + 1;
      }
      _DAT_005f54ec = _DAT_005f54ec | 8;
      return;
    }
    if (DAT_008d7eb4 != DAT_008d7eb5) {
      if (DAT_008d7eb5 < DAT_008d7eb4) {
        DAT_008d7eb4 = DAT_008d7eb4 - 1;
      }
      else {
        DAT_008d7eb4 = DAT_008d7eb4 + 1;
      }
      FUN_005e6028();
      return;
    }
    if (DAT_008d7eb2 != DAT_008d7eb3) {
      DAT_008d7eb2 = DAT_008d7eb3;
    }
    if (DAT_008d7eb6 != DAT_008d7eb7) {
      if (DAT_008d7eb7 == 3) {
        DAT_008d7eb6 = DAT_008d7eb7;
      }
      else if (DAT_008d7eb7 < DAT_008d7eb6) {
        DAT_008d7eb6 = DAT_008d7eb6 - 1;
      }
      else {
        DAT_008d7eb6 = DAT_008d7eb6 + 1;
      }
      return;
    }
    DAT_008d7eae = DAT_008d7eaf;
    FUN_0045ac19();
    _DAT_005f54ec = _DAT_005f54ec | 8;
  }
  return;
}

