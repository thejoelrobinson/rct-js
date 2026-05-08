
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00418b60(uint param_1)

{
  HANDLE hFile;
  BOOL BVar1;
  DWORD DVar2;
  
  DVar2 = _DAT_005efec4;
  if ((param_1 < DAT_005f3f60) &&
     ((*(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + (param_1 & 0x1f) * 8) & 1) != 0)) {
    hFile = (HANDLE)FUN_00418ea0(param_1);
    BVar1 = FlushFileBuffers(hFile);
    if (BVar1 == 0) {
      DVar2 = GetLastError();
    }
    else {
      DVar2 = 0;
    }
    if (DVar2 == 0) {
      return 0;
    }
  }
  _DAT_005efec4 = DVar2;
  _DAT_005efec0 = 9;
  return 0xffffffff;
}

