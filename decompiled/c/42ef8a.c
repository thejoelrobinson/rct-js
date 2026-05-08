
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042ef8a(void)

{
  char cVar1;
  int iVar2;
  uint uVar3;
  uint uVar4;
  char *pcVar5;
  char *pcVar6;
  char *pcVar7;
  
  iVar2 = FUN_00405653(&DAT_005f8540,s_RollerCoaster_Tycoon_Setup_005f8850);
  if (iVar2 == 0) {
    DAT_005f8648 = 0;
    DAT_005f874c = 0;
    _DAT_005f8540 = 0;
  }
  else {
    pcVar5 = &DAT_005f8648;
    pcVar6 = (char *)&DAT_005f8da3;
    do {
      pcVar7 = pcVar6;
      cVar1 = *pcVar5;
      *pcVar7 = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar7[0] = '\\';
    pcVar7[1] = '\0';
    pcVar5 = &DAT_005f8648;
    pcVar6 = &DAT_005f8ea4;
    do {
      pcVar7 = pcVar6;
      cVar1 = *pcVar5;
      *pcVar7 = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = s__Saved_Games__005f8fa5;
    do {
      cVar1 = *pcVar6;
      *pcVar7 = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar5 = &DAT_005f8648;
    pcVar6 = &DAT_005f8fb3;
    do {
      pcVar7 = pcVar6;
      cVar1 = *pcVar5;
      *pcVar7 = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = s__Scenarios___SC4_005f90b4;
    do {
      cVar1 = *pcVar6;
      *pcVar7 = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar5 = &DAT_005f8648;
    pcVar6 = &DAT_005f90c5;
    do {
      pcVar7 = pcVar6;
      cVar1 = *pcVar5;
      *pcVar7 = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = s__Tracks___TD4_005f91c6;
    do {
      cVar1 = *pcVar6;
      *pcVar7 = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
  }
  FUN_0042f199();
  iVar2 = FUN_00405949(s_RollerCoaster_Tycoon_005f886b);
  if (iVar2 != 0) {
    FUN_005df472();
    return;
  }
  do {
    uVar3 = 0;
LAB_0042f06b:
    (&DAT_005f851c)[uVar3] = 0;
    uVar4 = uVar3;
    FUN_0042f239();
    iVar2 = FUN_004083b5(uVar3);
    if (iVar2 != -1) {
LAB_0042f134:
      FUN_00408387(iVar2);
LAB_0042f13f:
      uVar3 = uVar4 + 1;
      if (0x16 < uVar3) {
        DAT_005f8d5f = 0;
        if ((0x1000000 < DAT_005f14fc) && (DAT_005f8d5f = 1, 0x2000000 < DAT_005f14fc)) {
          DAT_005f8d5f = 2;
        }
        DAT_005f8d5d = (&DAT_0063297d)[DAT_005f8d5f];
        DAT_005f8d5e = (&DAT_00632980)[DAT_005f8d5f];
        FUN_0042f1d3();
        return;
      }
      goto LAB_0042f06b;
    }
    if (uVar4 == 0x12) goto LAB_0042f13f;
    (&DAT_005f851c)[uVar4] = 1;
    uVar3 = uVar4;
    FUN_0042f239();
    iVar2 = FUN_004083b5(uVar4);
    uVar4 = uVar3;
    if (iVar2 != -1) goto LAB_0042f134;
    if (DAT_005f8533 != '\0') {
      FUN_005df472();
      return;
    }
    DAT_005f8533 = '\x01';
    FUN_00458bcf();
    FUN_00458bcf();
    pcVar6 = &DAT_005f874c;
    pcVar5 = &DAT_0099aa88;
    do {
      cVar1 = *pcVar6;
      *pcVar5 = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar5 = pcVar5 + 1;
    } while (cVar1 != '\0');
    FUN_004039bc(&DAT_0099a888,&DAT_0099a988,&DAT_0099aa88);
    pcVar6 = &DAT_0099aa88;
    pcVar5 = &DAT_005f874c;
    do {
      cVar1 = *pcVar6;
      *pcVar5 = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar5 = pcVar5 + 1;
    } while (cVar1 != '\0');
  } while( true );
}

