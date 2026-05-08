
void FUN_00413430(int param_1)

{
  int iVar1;
  uint dwBytes;
  
  dwBytes = param_1 + 0xfU & 0xfffffff0;
  if ((dwBytes <= DAT_005ee524) && (iVar1 = FUN_00415770(param_1 + 0xfU >> 4), iVar1 != 0)) {
    return;
  }
  HeapAlloc(DAT_005f3e44,0,dwBytes);
  return;
}

