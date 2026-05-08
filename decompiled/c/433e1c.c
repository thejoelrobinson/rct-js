
void FUN_00433e1c(void)

{
  int iVar1;
  int iVar2;
  
  iVar1 = DAT_005f96e4;
  while (iVar1 = *(int *)(iVar1 + 0x20), iVar2 = iVar1, iVar1 != 0) {
    for (; FUN_009b438b(), *(int *)(iVar2 + 0x1c) != 0; iVar2 = *(int *)(iVar2 + 0x1c)) {
    }
    for (iVar2 = *(int *)(iVar2 + 0x18); iVar2 != 0; iVar2 = *(int *)(iVar2 + 8)) {
      FUN_009b438b();
    }
  }
  return;
}

