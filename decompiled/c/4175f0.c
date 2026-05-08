
int FUN_004175f0(undefined4 param_1,undefined4 param_2,undefined4 param_3)

{
  HMODULE hModule;
  int iVar1;
  
  iVar1 = 0;
  if (DAT_005f029c != (FARPROC)0x0) {
LAB_00417640:
    if (DAT_005f02a0 != (FARPROC)0x0) {
      iVar1 = (*DAT_005f02a0)();
    }
    if ((iVar1 != 0) && (DAT_005f02a4 != (FARPROC)0x0)) {
      iVar1 = (*DAT_005f02a4)(iVar1);
    }
    iVar1 = (*DAT_005f029c)(iVar1,param_1,param_2,param_3);
    return iVar1;
  }
  hModule = LoadLibraryA("user32.dll");
  if (hModule != (HMODULE)0x0) {
    DAT_005f029c = GetProcAddress(hModule,"MessageBoxA");
    if (DAT_005f029c != (FARPROC)0x0) {
      DAT_005f02a0 = GetProcAddress(hModule,"GetActiveWindow");
      DAT_005f02a4 = GetProcAddress(hModule,"GetLastActivePopup");
      goto LAB_00417640;
    }
  }
  return 0;
}

