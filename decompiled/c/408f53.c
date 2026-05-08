
undefined4 FUN_00408f53(undefined4 *param_1)

{
  int iVar1;
  int iVar2;
  undefined4 uVar3;
  
  if ((*(short *)(param_1 + 3) == 0) && (param_1[0x20] != 0)) {
    do {
      iVar1 = (**(code **)(*(int *)param_1[0x20] + 100))(param_1[0x20],0,param_1 + 5,1,0);
      if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(), iVar2 == 0)) break;
    } while (iVar1 == -0x7789fe3e);
    if (iVar1 == 0) {
      *param_1 = param_1[0xe];
      *(undefined2 *)(param_1 + 1) = 4;
      *(short *)((int)param_1 + 6) = (short)param_1[8];
      *(short *)(param_1 + 2) = (short)param_1[7];
      param_1[4] = param_1[9];
      *(undefined2 *)((int)param_1 + 10) = 1;
      *(undefined2 *)(param_1 + 3) = 1;
      uVar3 = 1;
    }
    else {
      uVar3 = 0;
    }
  }
  else {
    uVar3 = 0;
  }
  return uVar3;
}

