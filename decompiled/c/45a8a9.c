
short FUN_0045a8a9(void)

{
  char cVar1;
  ushort in_AX;
  ushort uVar2;
  short in_CX;
  char *pcVar3;
  char *pcVar4;
  ushort uVar5;
  char *pcVar6;
  char *pcVar7;
  char *unaff_EDI;
  char *pcVar8;
  
  pcVar3 = &DAT_0087f41c;
  uVar5 = 0;
  pcVar6 = (char *)0x0;
  do {
    uVar2 = uVar5;
    pcVar4 = pcVar3;
    pcVar7 = pcVar3;
    pcVar8 = unaff_EDI;
    if (*pcVar3 != '\0') {
      while (cVar1 = *pcVar8, uVar2 = in_AX, pcVar7 = pcVar6, cVar1 == *pcVar4) {
        pcVar4 = pcVar4 + 1;
        pcVar8 = pcVar8 + 1;
        if (cVar1 == '\0') {
          DAT_00991efc = 0x338;
          return 0;
        }
      }
    }
    pcVar3 = pcVar3 + 0x20;
    uVar5 = uVar5 + 1;
    in_AX = uVar2;
    pcVar6 = pcVar7;
  } while (uVar5 < 0x400);
  if (pcVar7 == (char *)0x0) {
    DAT_00991efc = 0x339;
    return 0;
  }
  uVar5 = 0;
  do {
    pcVar6 = pcVar7;
    cVar1 = *unaff_EDI;
    *pcVar6 = cVar1;
    unaff_EDI = unaff_EDI + 1;
    if (cVar1 == '\0') goto LAB_0045a920;
    uVar5 = uVar5 + 1;
    pcVar7 = pcVar6 + 1;
  } while (uVar5 < 0x20);
  *pcVar6 = '\0';
LAB_0045a920:
  return (uVar2 | in_CX << 9) + 0x8000;
}

