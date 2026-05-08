
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0040179d(void)

{
  int iVar1;
  int local_c;
  int local_8;
  
  local_8 = 0;
  _DAT_005f1fe0 = 0;
  _DAT_005f1fe4 = DAT_005e9158;
  _DAT_005f2404 = 0;
  if (DAT_005e914c != 0) {
    FUN_00402ada();
  }
  iVar1 = FUN_00403a92();
  if ((iVar1 == 0) && (DAT_005e9150 == 0)) {
    if (((DAT_005e9148 != 0) && (2 < DAT_005e910c)) && (DAT_005e910c < 8)) {
      local_8 = FUN_00401f79();
    }
  }
  else if ((2 < DAT_005e910c) && (DAT_005e910c < 8)) {
    local_8 = FUN_0040264b();
  }
  if (local_8 == 0) {
    FUN_004018ec();
  }
  DAT_005e9154 = 0;
  DAT_005e9158 = 0;
  for (local_c = 0; local_c < 0xa00; local_c = local_c + 1) {
    (&DAT_005f2420)[local_c] = 0;
  }
  if (DAT_005e914c != 0) {
    FUN_00402b77();
  }
  GdiFlush();
  return;
}

