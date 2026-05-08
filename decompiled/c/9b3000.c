
void FUN_009b3000(void)

{
  int iVar1;
  int iVar2;
  int *piVar3;
  
  FUN_0042f239();
  iVar1 = FUN_004080e0(0,0,0);
  if (iVar1 != 0) {
    DAT_009a2008 = iVar1;
    FUN_0042f239();
    iVar1 = FUN_004083b5(1);
    if (iVar1 != -1) {
      FUN_00408276(iVar1,&DAT_008dc0b4,0x95dd0,iVar1);
      FUN_00408387(iVar1);
      iVar1 = DAT_009a2008;
      piVar3 = &DAT_008dc0b4;
      iVar2 = 0x95dd;
      do {
        *piVar3 = *piVar3 + iVar1;
        piVar3 = piVar3 + 4;
        iVar2 = iVar2 + -1;
      } while (iVar2 != 0);
      if (0x1ffffff < DAT_005f14fc) {
        FUN_009b308d();
      }
      return;
    }
  }
  FUN_005df472();
  return;
}

