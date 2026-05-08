
undefined4 FUN_00417420(int param_1)

{
  int iVar1;
  int iVar2;
  int iVar3;
  code *pcVar4;
  int iVar5;
  undefined4 *puVar6;
  
  iVar2 = param_1;
  switch(param_1) {
  case 2:
    puVar6 = &DAT_005f0288;
    pcVar4 = DAT_005f0288;
    break;
  default:
    return 0xffffffff;
  case 4:
  case 8:
  case 0xb:
    iVar3 = FUN_004175a0(param_1);
    puVar6 = (undefined4 *)(iVar3 + 8);
    pcVar4 = (code *)*puVar6;
    break;
  case 0xf:
    puVar6 = &DAT_005f0294;
    pcVar4 = DAT_005f0294;
    break;
  case 0x15:
    puVar6 = &DAT_005f028c;
    pcVar4 = DAT_005f028c;
    break;
  case 0x16:
    puVar6 = &DAT_005f0290;
    pcVar4 = DAT_005f0290;
  }
  iVar1 = DAT_005eff0c;
  iVar3 = DAT_005ec364;
  if (pcVar4 == (code *)0x1) {
    return 0;
  }
  if (pcVar4 == (code *)0x0) {
                    /* WARNING: Subroutine does not return */
    __exit(3);
  }
  if (((param_1 == 8) || (param_1 == 0xb)) || (iVar5 = param_1, param_1 == 4)) {
    DAT_005eff0c = 0;
    iVar5 = iVar1;
    if (param_1 == 8) {
      DAT_005ec364 = 0x8c;
      param_1 = iVar3;
      goto LAB_004174df;
    }
  }
  else {
LAB_004174df:
    if (iVar2 == 8) {
      if (DAT_005ec358 < DAT_005ec35c + DAT_005ec358) {
        iVar3 = (DAT_005ec35c + DAT_005ec358) - DAT_005ec358;
        puVar6 = (undefined4 *)(DAT_005ec358 * 0xc + 0x5ec2e8);
        do {
          *puVar6 = 0;
          puVar6 = puVar6 + 3;
          iVar3 = iVar3 + -1;
        } while (iVar3 != 0);
      }
      goto LAB_00417516;
    }
  }
  *puVar6 = 0;
LAB_00417516:
  if (iVar2 == 8) {
    (*pcVar4)(8,DAT_005ec364);
  }
  else {
    (*pcVar4)(iVar2);
    if ((iVar2 != 0xb) && (iVar2 != 4)) {
      return 0;
    }
  }
  if (iVar2 == 8) {
    DAT_005ec364 = param_1;
  }
  DAT_005eff0c = iVar5;
  return 0;
}

