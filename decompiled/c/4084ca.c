
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004084ca(int param_1)

{
  BOOL BVar1;
  char local_58;
  char local_54;
  undefined1 local_53 [79];
  
  local_58 = (char)DAT_005ebf1c;
  local_54 = local_58 + (char)param_1 + -1;
  FUN_00413170(local_53,&DAT_005ebf20);
  if (param_1 == 0) {
    BVar1 = GetDiskFreeSpaceA((LPCSTR)0x0,(LPDWORD)&DAT_005f112c,(LPDWORD)&DAT_005f1124,
                              (LPDWORD)&DAT_005f1128,(LPDWORD)&DAT_005f1120);
    if (BVar1 == 0) {
      _DAT_005f112c = 0xffffffff;
    }
  }
  else {
    BVar1 = GetDiskFreeSpaceA(&local_54,(LPDWORD)&DAT_005f112c,(LPDWORD)&DAT_005f1124,
                              (LPDWORD)&DAT_005f1128,(LPDWORD)&DAT_005f1120);
    if (BVar1 == 0) {
      _DAT_005f112c = 0xffffffff;
    }
  }
  return;
}

