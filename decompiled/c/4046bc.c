
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004046bc(void)

{
  _SYSTEMTIME local_14;
  
  GetSystemTime(&local_14);
  _DAT_005f1fd0 = local_14.wHour;
  _DAT_005f1b2c = local_14.wMinute;
  _DAT_005f1fd8 = local_14.wSecond;
  _DAT_005f1b84 = local_14.wMilliseconds;
  return;
}

