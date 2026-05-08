
undefined * FUN_004175a0(int param_1)

{
  int *piVar1;
  undefined *puVar2;
  undefined *puVar3;
  
  puVar2 = &DAT_005ec2e0;
  if (DAT_005ec2e4 != param_1) {
    puVar3 = puVar2;
    do {
      puVar2 = puVar3 + 0xc;
      if (&DAT_005ec2e0 + DAT_005ec360 * 0xc <= puVar2) break;
      piVar1 = (int *)(puVar3 + 0x10);
      puVar3 = puVar2;
    } while (*piVar1 != param_1);
  }
  if ((&DAT_005ec2e0 + DAT_005ec360 * 0xc <= puVar2) || (*(int *)(puVar2 + 4) != param_1)) {
    puVar2 = (undefined *)0x0;
  }
  return puVar2;
}

