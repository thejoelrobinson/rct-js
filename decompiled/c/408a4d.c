
undefined4 FUN_00408a4d(void)

{
  undefined4 uVar1;
  int iVar2;
  
  if (DAT_005ebf2c == (HMODULE)0x0) {
    DAT_005ebf2c = LoadLibraryA(s_DDRAW_DLL_005ebf68);
    if (DAT_005ebf2c == (HMODULE)0x0) {
      uVar1 = 0;
    }
    else {
      DAT_005f0d60 = GetProcAddress(DAT_005ebf2c,s_DirectDrawEnumerateW_005ebf74);
      DAT_005f0958 = GetProcAddress(DAT_005ebf2c,s_DirectDrawEnumerateA_005ebf8c);
      DAT_005f0eec = GetProcAddress(DAT_005ebf2c,s_DirectDrawCreate_005ebfa4);
      iVar2 = FUN_00408a26(0,&DAT_005ebf30,0);
      if (iVar2 == 0) {
        uVar1 = 1;
      }
      else {
        FUN_00408b0b();
        uVar1 = 0;
      }
    }
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}

