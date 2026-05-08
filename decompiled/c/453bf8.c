
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00453bf8(void)

{
  undefined1 uVar1;
  byte bVar2;
  undefined2 uVar3;
  uint uVar4;
  int iVar5;
  short sVar6;
  uint unaff_EBX;
  uint uVar7;
  char *pcVar8;
  char *pcVar9;
  char *unaff_EDI;
  
  if (((((_DAT_006323f8 & 1) != 0) && (DAT_006326bc == '\0')) && ((DAT_006326bd & 1) != 0)) &&
     ((DAT_005f8d5a != '\0' && ((_DAT_0099a500 & 1) == 0)))) {
    while( true ) {
      uVar4 = 0;
      sVar6 = 1;
      for (pcVar9 = &DAT_006325b4; pcVar9 < DAT_006325b0; pcVar9 = pcVar9 + 0xc) {
        if (((*pcVar9 != -1) &&
            (unaff_EBX = (uint)(byte)(&PTR_PTR_006323b8)[(byte)pcVar9[1]][8],
            (&DAT_005f851c)[unaff_EBX] != '\0')) &&
           (uVar4 = uVar4 + 1, *(short *)(pcVar9 + 6) <= sVar6)) {
          sVar6 = *(short *)(pcVar9 + 6);
          unaff_EDI = pcVar9;
        }
      }
      if (uVar4 < 2) break;
      *unaff_EDI = -1;
    }
    while( true ) {
      uVar4 = 0;
      sVar6 = 1;
      for (pcVar9 = &DAT_006325b4; pcVar9 < DAT_006325b0; pcVar9 = pcVar9 + 0xc) {
        if ((*pcVar9 != -1) && (uVar4 = uVar4 + 1, *(short *)(pcVar9 + 6) <= sVar6)) {
          sVar6 = *(short *)(pcVar9 + 6);
          unaff_EDI = pcVar9;
        }
      }
      if (uVar4 < 3) break;
      *unaff_EDI = -1;
    }
    pcVar9 = &DAT_006325f0;
    uVar4 = 0;
    do {
      if (*pcVar9 != -1) {
        uVar3 = *(undefined2 *)pcVar9;
        unaff_EBX = CONCAT22((short)(unaff_EBX >> 0x10),uVar3);
        for (pcVar8 = &DAT_006325b4; pcVar8 < DAT_006325b0; pcVar8 = pcVar8 + 0xc) {
          if (((char)uVar3 == *pcVar8) && ((char)((ushort)uVar3 >> 8) == pcVar8[1])) {
            iVar5 = FUN_0040d8ee(uVar4);
            if (iVar5 != 0) goto LAB_00453d0b;
            break;
          }
        }
        FUN_0040d575(uVar4);
        *pcVar9 = -1;
      }
LAB_00453d0b:
      pcVar9 = pcVar9 + 8;
      uVar4 = uVar4 + 1;
    } while (uVar4 < 2);
    for (pcVar9 = &DAT_006325b4; pcVar9 < DAT_006325b0; pcVar9 = pcVar9 + 0xc) {
      if (*pcVar9 != -1) {
        pcVar8 = &DAT_006325f0;
        uVar4 = 0;
        do {
          if ((*pcVar9 == *pcVar8) && (pcVar9[1] == pcVar8[1])) {
            sVar6 = *(short *)(pcVar9 + 6);
            if (sVar6 != *(short *)(pcVar8 + 2)) {
              *(short *)(pcVar8 + 2) = sVar6;
              FUN_0040d777(uVar4,(int)sVar6,pcVar9,pcVar8,uVar4);
            }
            sVar6 = *(short *)(pcVar9 + 8);
            if (sVar6 != *(short *)(pcVar8 + 4)) {
              *(short *)(pcVar8 + 4) = sVar6;
              FUN_0040d709(uVar4,(int)sVar6,pcVar9,pcVar8,uVar4);
            }
            sVar6 = *(short *)(pcVar9 + 10);
            if (sVar6 != *(short *)(pcVar8 + 6)) {
              *(short *)(pcVar8 + 6) = sVar6;
              FUN_0040d69b(uVar4,(int)sVar6,pcVar9,pcVar8,uVar4);
            }
            goto LAB_00453ecf;
          }
          if (*pcVar8 == -1) {
            unaff_EBX = uVar4;
          }
          pcVar8 = pcVar8 + 8;
          uVar4 = uVar4 + 1;
        } while (uVar4 < 2);
        pcVar8 = &DAT_006325f0 + unaff_EBX * 8;
        uVar7 = (uint)(byte)(&PTR_PTR_006323b8)[(byte)pcVar9[1]][8];
        FUN_0042f239();
        iVar5 = FUN_004083b5(uVar7,pcVar9,pcVar8,unaff_EBX);
        uVar4 = unaff_EBX;
        if (iVar5 != -1) {
          FUN_00408276(iVar5,&DAT_00632602,4,iVar5);
          uVar4 = unaff_EBX;
          unaff_EBX = uVar7;
          FUN_00408387(iVar5);
          uVar7 = unaff_EBX;
          if (DAT_00632602 == 0x78787878) goto LAB_00453ecf;
        }
        unaff_EBX = uVar7;
        uVar7 = *(int *)(pcVar9 + 2) - 10000;
        if ((int)uVar7 < 0) {
          uVar7 = 0;
        }
        iVar5 = FUN_0040d432(uVar4,unaff_EBX,uVar7 & 0xfffffff0,pcVar9,pcVar8,uVar4);
        if (iVar5 == 0) {
          DAT_005f8d5a = '\0';
        }
        else {
          unaff_EBX = (uint)*(ushort *)(pcVar9 + 10);
          iVar5 = FUN_0040d4b8(uVar4,0,(int)*(short *)(pcVar9 + 6),(int)*(short *)(pcVar9 + 8),
                               unaff_EBX,pcVar9,pcVar8,uVar4,(int)*(short *)(pcVar9 + 8),
                               (int)*(short *)(pcVar9 + 6));
          if (iVar5 != 0) {
            if (pcVar9[1] == '\r') {
              uVar1 = (&PTR_PTR_006323b8)[(byte)pcVar9[1]][8];
              FUN_0042f239();
              FUN_0040d7e5(uVar4,uVar1,1,0,pcVar9,pcVar8,uVar4);
            }
            uVar3 = *(undefined2 *)(pcVar9 + 8);
            *(undefined2 *)(pcVar8 + 2) = *(undefined2 *)(pcVar9 + 6);
            *(undefined2 *)(pcVar8 + 4) = uVar3;
            *(undefined2 *)(pcVar8 + 6) = *(undefined2 *)(pcVar9 + 10);
            bVar2 = pcVar9[1];
            unaff_EBX = (uint)bVar2;
            *pcVar8 = *pcVar9;
            pcVar8[1] = bVar2;
          }
        }
      }
LAB_00453ecf:
    }
  }
  return;
}

