
undefined4 FUN_00410810(undefined4 param_1,undefined4 param_2)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  undefined4 uVar3;
  
  puVar2 = (undefined4 *)FUN_004133c0(0x10c);
  DAT_005ec120 = DAT_005ec120 + 1;
  if (puVar2 == (undefined4 *)0x0) {
    DAT_005ec120 = -1;
    uVar3 = 0;
  }
  else {
    *puVar2 = param_1;
    FUN_00413170(puVar2 + 1,param_2);
    puVar2[0x42] = 0;
    puVar1 = puVar2;
    if (DAT_005ec124 != (undefined4 *)0x0) {
      DAT_005ec128[0x42] = puVar2;
      puVar1 = DAT_005ec124;
    }
    DAT_005ec124 = puVar1;
    uVar3 = 1;
    DAT_005ec128 = puVar2;
  }
  return uVar3;
}

