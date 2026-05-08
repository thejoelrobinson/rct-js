
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00410a33(int param_1,undefined4 param_2,undefined4 param_3,int param_4)

{
  int iVar1;
  int iVar2;
  undefined4 uVar3;
  
  if ((param_4 == 1) || (iVar2 = FUN_004133c0(0x10c), iVar2 == 0)) {
    uVar3 = 0;
  }
  else {
    *(undefined4 *)(iVar2 + 0x104) = *(undefined4 *)(param_1 + 0x14);
    FUN_00413170(iVar2,param_1 + 0x24);
    *(undefined4 *)(iVar2 + 0x108) = 0;
    _DAT_005ec134 = _DAT_005ec134 + 1;
    iVar1 = iVar2;
    if (DAT_005ec138 != 0) {
      *(int *)(DAT_005ec13c + 0x108) = iVar2;
      iVar1 = DAT_005ec138;
    }
    DAT_005ec138 = iVar1;
    uVar3 = 1;
    DAT_005ec13c = iVar2;
  }
  return uVar3;
}

