
void FUN_0042f77c(void)

{
  char in_AL;
  
  if (DAT_005f88ae == '\0') {
    DAT_005f8cb4 = in_AL;
    DAT_005f88ae = 1;
    return;
  }
  if (DAT_005f88ae == '\x01') {
    if (in_AL != DAT_005f8cb4) {
      DAT_005f8cb5 = in_AL;
      DAT_005f8cb0 = &DAT_005f8cb5;
      DAT_005f8d34 = 2;
      DAT_005f88ae = 3;
      return;
    }
    DAT_005f8d34 = 2;
    DAT_005f88ae = 2;
    return;
  }
  if (DAT_005f88ae == '\x02') {
    if ((in_AL == DAT_005f8cb4) && (DAT_005f8d34 < 0x7d)) {
      DAT_005f8d34 = DAT_005f8d34 + 1;
      return;
    }
    FUN_0042f6df();
    LOCK();
    UNLOCK();
    DAT_005f8cb4 = in_AL;
    FUN_0042f6df();
    DAT_005f88ae = 1;
    return;
  }
  if (0x7c < DAT_005f8d34) {
    FUN_0042f6df();
    do {
      FUN_0042f6df();
      DAT_005f8d34 = DAT_005f8d34 - 1;
    } while (DAT_005f8d34 != 0);
    DAT_005f8cb4 = in_AL;
    DAT_005f88ae = 1;
    return;
  }
  if (in_AL != *DAT_005f8cb0) {
    DAT_005f8cb0[1] = in_AL;
    DAT_005f8cb0 = DAT_005f8cb0 + 1;
    DAT_005f8d34 = DAT_005f8d34 + 1;
    return;
  }
  DAT_005f8d34 = DAT_005f8d34 - 1;
  FUN_0042f6df();
  do {
    FUN_0042f6df();
    DAT_005f8d34 = DAT_005f8d34 + -1;
  } while (DAT_005f8d34 != '\0');
  DAT_005f8cb4 = in_AL;
  DAT_005f88ae = 2;
  DAT_005f8d34 = 2;
  return;
}

