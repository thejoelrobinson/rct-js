
void FUN_00413470(LPVOID param_1)

{
  LPVOID lpMem;
  int iVar1;
  undefined4 local_4;
  
  lpMem = param_1;
  if (param_1 != (LPVOID)0x0) {
    iVar1 = FUN_004156b0(param_1,&local_4,&param_1);
    if (iVar1 != 0) {
      FUN_00415710(local_4,param_1,iVar1);
      return;
    }
    HeapFree(DAT_005f3e44,0,lpMem);
  }
  return;
}

