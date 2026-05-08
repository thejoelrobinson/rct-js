
int FUN_0040e73b(short param_1,short param_2)

{
  int iVar1;
  int *piVar2;
  int iVar3;
  int local_10;
  
  iVar1 = FUN_004133c0(0xa8);
  if (iVar1 != 0) {
    piVar2 = (int *)FUN_004133c0(8);
    if (piVar2 != (int *)0x0) {
      *piVar2 = iVar1;
      piVar2[1] = 0;
      iVar3 = FUN_0040e814(iVar1,(int)param_1,(int)param_2);
      if (iVar3 != 0) {
        local_10 = (int)DAT_005ec074;
        if (DAT_005ec074 == (int *)0x0) {
          DAT_005ec074 = piVar2;
          return iVar1;
        }
        for (; *(int *)(local_10 + 4) != 0; local_10 = *(int *)(local_10 + 4)) {
        }
        *(int **)(local_10 + 4) = piVar2;
        return iVar1;
      }
      FUN_00413470(piVar2);
    }
    FUN_00413470(iVar1);
  }
  return 0;
}

