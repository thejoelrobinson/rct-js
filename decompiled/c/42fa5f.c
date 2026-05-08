
void FUN_0042fa5f(void)

{
  uint uVar1;
  uint uVar2;
  uint uVar3;
  
  uVar1 = FUN_00408254(DAT_005f88a4,0);
  if (7 < uVar1) {
    uVar1 = uVar1 - 4;
    FUN_00408210(DAT_005f88a4,0);
    do {
      uVar2 = uVar1;
      if (0x400 < uVar1) {
        uVar2 = 0x400;
      }
      FUN_00408276(DAT_005f88a4,&DAT_005f88b0,uVar2);
      uVar3 = uVar2;
      do {
        uVar3 = uVar3 - 1;
      } while (uVar3 != 0);
      uVar1 = uVar1 - uVar2;
    } while (uVar1 != 0);
    FUN_00408276(DAT_005f88a4,&DAT_005f88b0,4);
  }
  return;
}

