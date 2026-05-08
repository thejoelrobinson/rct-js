
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

DWORD FUN_004179a0(uint param_1,LONG param_2,DWORD param_3)

{
  HANDLE hFile;
  DWORD DVar1;
  DWORD DVar2;
  int iVar3;
  
  if (param_1 < DAT_005f3f60) {
    iVar3 = (param_1 & 0x1f) * 8;
    if ((*(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + iVar3) & 1) != 0) {
      hFile = (HANDLE)FUN_00418ea0(param_1);
      if (hFile == (HANDLE)0xffffffff) {
        _DAT_005efec0 = 9;
        return 0xffffffff;
      }
      DVar1 = SetFilePointer(hFile,param_2,(PLONG)0x0,param_3);
      if (DVar1 == 0xffffffff) {
        DVar2 = GetLastError();
      }
      else {
        DVar2 = 0;
      }
      if (DVar2 != 0) {
        FUN_00418d90(DVar2);
        return 0xffffffff;
      }
      *(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + iVar3) =
           *(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + iVar3) & 0xfd;
      return DVar1;
    }
  }
  _DAT_005efec0 = 9;
  _DAT_005efec4 = 0;
  return 0xffffffff;
}

