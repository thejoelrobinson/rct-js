
void FUN_00416b50(undefined4 *param_1,int param_2,int param_3,undefined4 param_4)

{
  char cVar1;
  char *pcVar2;
  
  DAT_005f0250 = (int *)FUN_004186d0(*param_1,param_1[1]);
  DAT_005f0258 = DAT_005f0250[1] + -1;
  pcVar2 = (char *)((uint)(*DAT_005f0250 == 0x2d) + param_2);
  FUN_00418630(pcVar2,param_3,DAT_005f0250);
  DAT_005f025c = DAT_005f0258 < DAT_005f0250[1] + -1;
  DAT_005f0258 = DAT_005f0250[1] + -1;
  if ((-5 < DAT_005f0258) && (DAT_005f0258 < param_3)) {
    if ((bool)DAT_005f025c) {
      cVar1 = *pcVar2;
      while (cVar1 != '\0') {
        cVar1 = pcVar2[1];
        pcVar2 = pcVar2 + 1;
      }
      pcVar2[-1] = '\0';
    }
    FUN_00416c30(param_1,param_2,param_3);
    return;
  }
  FUN_00416c00(param_1,param_2,param_3,param_4);
  return;
}

