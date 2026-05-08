
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004046fc(void)

{
  _SYSTEMTIME local_14;
  
  GetSystemTime(&local_14);
  DAT_005f1ca4 = local_14.wDay;
  DAT_005f1394 = local_14.wMonth;
  DAT_005f1cbc = local_14.wYear;
  _DAT_005f14c0 = local_14.wDayOfWeek;
  return;
}

