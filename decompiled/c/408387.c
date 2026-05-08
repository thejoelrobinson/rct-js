
BOOL FUN_00408387(HANDLE param_1)

{
  BOOL BVar1;
  
  if (param_1 == (HANDLE)0x0) {
    BVar1 = 1;
  }
  else {
    BVar1 = CloseHandle(param_1);
  }
  return BVar1;
}

