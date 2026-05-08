
bool FUN_004079d3(int param_1,undefined4 *param_2)

{
  int iVar1;
  
  iVar1 = (**(code **)(*DAT_005ec05c + 0x14))(DAT_005ec05c,*param_2,param_1);
  if (iVar1 == 0) {
    *(undefined4 *)(param_1 + 8) = param_2[2];
    *(undefined4 *)(param_1 + 4) = param_2[1];
    *(undefined4 *)(param_1 + 0xc) = param_2[3];
    FUN_0040dcaf(param_1);
  }
  return iVar1 == 0;
}

