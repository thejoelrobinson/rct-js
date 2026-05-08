
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_009bbb9b(void)

{
  char cVar1;
  short sVar2;
  ushort uVar3;
  int iVar4;
  int iVar5;
  undefined2 uVar6;
  short sVar7;
  char cVar8;
  uint uVar9;
  char *pcVar10;
  undefined1 *puVar11;
  char *pcVar12;
  undefined1 *puVar13;
  
  sVar2 = 1;
  while( true ) {
    pcVar12 = &DAT_0099a888;
    pcVar10 = (char *)&DAT_005f8da3;
    DAT_00971e86._0_2_ = sVar2;
    do {
      cVar1 = *pcVar10;
      *pcVar12 = cVar1;
      pcVar10 = pcVar10 + 1;
      pcVar12 = pcVar12 + 1;
    } while (cVar1 != '\0');
    FUN_00458bcf();
    iVar4 = FUN_004083b5(&DAT_0099a888);
    if (iVar4 == -1) break;
    FUN_00408387(iVar4);
    sVar2 = sVar2 + 1;
  }
  iVar4 = FUN_004083e1(&DAT_0099a888);
  if (iVar4 != -1) {
    puVar11 = &DAT_00981efc;
    sVar7 = 0x80;
    DAT_009a2004 = iVar4;
    do {
      *puVar11 = 0;
      puVar11 = puVar11 + 1;
      sVar7 = sVar7 + -1;
    } while (sVar7 != 0);
    _DAT_00981efc = 0x801050a;
    DAT_00981f04 = CONCAT22(DAT_00971ed8 - 1,DAT_00971ed6 - 1);
    DAT_00981f08 = 0x400040;
    DAT_00981f3c = CONCAT22(DAT_00971ed6,0x100);
    iVar4 = FUN_00408342(DAT_009a2004,&DAT_00981efc,0x80);
    if (iVar4 != -1) {
      pcVar12 = &DAT_00981efc;
      uVar9 = (uint)DAT_00971ed6;
      iVar4 = DAT_00971ed8 * uVar9;
      pcVar10 = DAT_0099fb7c;
      while( true ) {
        if (uVar9 == 0) {
          pcVar10 = pcVar10 + (ushort)((DAT_0099fb88 - DAT_00971ed6) + DAT_0099fb84);
          uVar9 = (uint)DAT_00971ed6;
        }
        if (iVar4 == 0) break;
        if ((char *)0x991e97 < pcVar12) {
          iVar5 = FUN_00408342(DAT_009a2004,&DAT_00981efc,pcVar12 + -0x981efc);
          if (iVar5 == -1) goto LAB_009bbdb0;
          pcVar12 = &DAT_00981efc;
        }
        cVar1 = *pcVar10;
        pcVar10 = pcVar10 + 1;
        iVar4 = iVar4 + -1;
        uVar9 = uVar9 - 1;
        uVar3 = CONCAT11(cVar1,cVar1) & 0xc0ff;
        cVar1 = (char)uVar3;
        if (((char)(uVar3 >> 8) == -0x40) || ((uVar9 != 0 && (cVar1 == *pcVar10)))) {
          cVar8 = -0x3f;
          for (; ((uVar9 != 0 && (cVar8 != -1)) && (cVar1 == *pcVar10)); pcVar10 = pcVar10 + 1) {
            iVar4 = iVar4 + -1;
            uVar9 = uVar9 - 1;
            cVar8 = cVar8 + '\x01';
          }
          *pcVar12 = cVar8;
          pcVar12[1] = cVar1;
          pcVar12 = pcVar12 + 2;
        }
        else {
          *pcVar12 = cVar1;
          pcVar12 = pcVar12 + 1;
        }
      }
      if (pcVar12 + -0x981efc != (char *)0x0) {
        iVar4 = FUN_00408342(DAT_009a2004,&DAT_00981efc,pcVar12 + -0x981efc);
        if (iVar4 == -1) goto LAB_009bbdb0;
      }
      _DAT_00981efc = CONCAT31(_DAT_00981efd,0xc);
      puVar13 = &DAT_00981efd;
      puVar11 = &DAT_005f2000;
      sVar7 = 0x100;
      do {
        puVar13[2] = *puVar11;
        puVar13[1] = puVar11[1];
        *puVar13 = puVar11[2];
        puVar11 = puVar11 + 4;
        puVar13 = puVar13 + 3;
        sVar7 = sVar7 + -1;
      } while (sVar7 != 0);
      iVar4 = FUN_00408342(DAT_009a2004,&DAT_00981efc,0x301);
      if (iVar4 != -1) {
        iVar4 = FUN_00408387(DAT_009a2004);
        if (iVar4 != -1) {
          uVar6 = (undefined2)((uint)iVar4 >> 0x10);
          goto LAB_009bbdbf;
        }
        goto LAB_009bbdbe;
      }
    }
LAB_009bbdb0:
    iVar4 = FUN_00408387(DAT_009a2004);
  }
LAB_009bbdbe:
  uVar6 = (undefined2)((uint)iVar4 >> 0x10);
LAB_009bbdbf:
  return CONCAT22(uVar6,sVar2);
}

