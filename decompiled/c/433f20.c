
void FUN_00433f20(void)

{
  int iVar1;
  int iVar2;
  int iVar3;
  
  iVar2 = DAT_005f96e4;
  while (iVar2 = *(int *)(iVar2 + 0x20), iVar3 = iVar2, iVar2 != 0) {
    while( true ) {
      FUN_009b35b4();
      FUN_00433f8b();
      if (*(int *)(iVar3 + 0x1c) == 0) break;
      iVar3 = *(int *)(iVar3 + 0x1c);
    }
    for (iVar1 = *(int *)(iVar3 + 0x18); iVar1 != 0; iVar1 = *(int *)(iVar1 + 8)) {
      FUN_009b35b4(iVar3);
      FUN_00433f8b();
    }
  }
  return;
}

