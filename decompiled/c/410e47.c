
undefined4 FUN_00410e47(undefined4 param_1,undefined4 param_2,undefined4 param_3)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  undefined4 uVar3;
  
  puVar2 = (undefined4 *)FUN_004133c0(0x50);
  if (puVar2 == (undefined4 *)0x0) {
    uVar3 = 0;
  }
  else {
    *puVar2 = param_1;
    FUN_00413170(puVar2 + 1,param_2);
    FUN_00413170(puVar2 + 0xe,param_3);
    puVar2[0x13] = 0;
    DAT_005ec148 = DAT_005ec148 + 1;
    puVar1 = puVar2;
    if (DAT_005ec14c != (undefined4 *)0x0) {
      DAT_005ec150[0x13] = puVar2;
      puVar1 = DAT_005ec14c;
    }
    DAT_005ec14c = puVar1;
    uVar3 = 1;
    DAT_005ec150 = puVar2;
  }
  return uVar3;
}

