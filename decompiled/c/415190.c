
undefined4 FUN_00415190(void)

{
  int iVar1;
  
  DAT_005f3e44 = HeapCreate(1,0x1000,0);
  if (DAT_005f3e44 == (HANDLE)0x0) {
    return 0;
  }
  iVar1 = FUN_00415410();
  if (iVar1 == 0) {
    HeapDestroy(DAT_005f3e44);
    return 0;
  }
  return 1;
}

