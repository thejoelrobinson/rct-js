
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042fdf4(void)

{
  char cVar1;
  short sVar2;
  ushort uVar3;
  int iVar4;
  HWND__ *pHVar5;
  HWND__ *pHVar6;
  char *pcVar7;
  char *pcVar8;
  uint uVar9;
  undefined1 *puVar10;
  char *pcVar11;
  bool bVar12;
  undefined1 uVar13;
  
  pcVar7 = &DAT_005f8fb3;
  pcVar8 = &DAT_0099aa88;
  do {
    pcVar11 = pcVar8;
    cVar1 = *pcVar7;
    *pcVar11 = cVar1;
    pcVar7 = pcVar7 + 1;
    pcVar8 = pcVar11 + 1;
  } while (cVar1 != '*');
  pcVar8 = &DAT_005f92e0;
  do {
    cVar1 = *pcVar8;
    *pcVar11 = cVar1;
    pcVar8 = pcVar8 + 1;
    pcVar11 = pcVar11 + 1;
  } while (cVar1 != '\0');
  iVar4 = FUN_004083b5();
  bVar12 = iVar4 != -1;
  if (iVar4 != -1) {
    DAT_005f8d35 = 0;
    DAT_005f88a4 = iVar4;
    FUN_0042fa5f();
    if (!bVar12) {
      FUN_0042f96d();
      FUN_0042f98e();
      FUN_00408387();
      uVar13 = (undefined1 *)0xfffffffb < &stack0xfffffffc;
      FUN_004301a9();
      FUN_004300ea();
      if ((!(bool)uVar13) && (sVar2 = FUN_00430081(), sVar2 != DAT_0099fb6e)) {
        sVar2 = FUN_004300b7();
        uVar3 = sVar2 - DAT_0099fb6e;
        if ((short)uVar3 < 0) {
          uVar3 = -uVar3;
        }
        if (0x78 < uVar3) {
          DAT_0099fb6e = FUN_004300b7();
          _DAT_0099fb78 = 0xffffffe0;
          goto LAB_0042ff47;
        }
      }
      DAT_0099fb6e = FUN_004300b7();
      uVar9 = 0;
      iVar4 = 0;
      pHVar5 = (HWND__ *)FUN_0040844b(&DAT_005f8fb3,&DAT_005f92e7);
      if (pHVar5 != (HWND__ *)0xffffffff) {
        do {
          DAT_005f9427 = pHVar5;
          bVar12 = CARRY4(uVar9,DAT_005f9307);
          uVar9 = uVar9 + DAT_005f9307;
          iVar4 = iVar4 + DAT_005f9303 + (uint)bVar12;
          pHVar6 = GetNextWindow(DAT_005f9427,0x5f92e7);
          pHVar5 = DAT_005f9427;
        } while (pHVar6 == (HWND__ *)0x1);
        FUN_00408490(DAT_005f9427);
      }
      if ((uVar9 == DAT_0099fb70) && (iVar4 == DAT_0099fb74)) {
        return;
      }
      goto LAB_0042ff6e;
    }
    FUN_00408387();
    DAT_0099fb6e = FUN_004300b7();
  }
LAB_0042ff47:
  uVar9 = 0;
  do {
    (&DAT_0099e96c)[uVar9] = 0x80000000;
    uVar9 = uVar9 + 1;
  } while (uVar9 < 0x80);
  puVar10 = &DAT_0099eb6c;
  iVar4 = 0x1000;
  do {
    *puVar10 = 0;
    puVar10 = puVar10 + 1;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
LAB_0042ff6e:
  puVar10 = &DAT_0099c16c;
  iVar4 = 0x800;
  do {
    *puVar10 = 0;
    puVar10 = puVar10 + 1;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
  DAT_0099fb70 = 0;
  DAT_0099fb74 = 0;
  DAT_0099fb6c = '\0';
  pHVar5 = (HWND__ *)FUN_0040844b(&DAT_005f8fb3);
  if (pHVar5 != (HWND__ *)0xffffffff) {
    do {
      DAT_005f9427 = pHVar5;
      bVar12 = CARRY4(DAT_0099fb70,DAT_005f9307);
      DAT_0099fb70 = DAT_0099fb70 + DAT_005f9307;
      DAT_0099fb74 = DAT_0099fb74 + DAT_005f9303 + (uint)bVar12;
      pcVar7 = &DAT_005f8fb3;
      pcVar8 = &DAT_0099aa88;
      do {
        pcVar11 = pcVar8;
        cVar1 = *pcVar7;
        *pcVar11 = cVar1;
        pcVar7 = pcVar7 + 1;
        pcVar8 = pcVar11 + 1;
      } while (cVar1 != '*');
      pcVar8 = &DAT_005f9313;
      do {
        cVar1 = *pcVar8;
        *pcVar11 = cVar1;
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
        bVar12 = false;
      } while (cVar1 != '\0');
      FUN_0042fd81();
      if ((!bVar12) && ((DAT_008dbed2 < 0x28 || (99 < DAT_008dbed2)))) {
        uVar9 = (uint)DAT_008dbed2;
        pcVar7 = &DAT_0099c96c + uVar9 * 0x40;
        pcVar8 = &DAT_008dbe94;
        do {
          cVar1 = *pcVar8;
          *pcVar7 = cVar1;
          pcVar8 = pcVar8 + 1;
          pcVar7 = pcVar7 + 1;
        } while (cVar1 != '\0');
        pcVar7 = &DAT_0099c16c + uVar9 * 0x10;
        pcVar8 = &DAT_005f9313;
        do {
          cVar1 = *pcVar8;
          *pcVar7 = cVar1;
          pcVar8 = pcVar8 + 1;
          pcVar7 = pcVar7 + 1;
        } while (cVar1 != '\0');
        DAT_0099fb6c = DAT_0099fb6c + '\x01';
      }
      pHVar6 = GetNextWindow(DAT_005f9427,0x5f92e7);
      pHVar5 = DAT_005f9427;
    } while (pHVar6 == (HWND__ *)0x1);
    FUN_00408490();
  }
  FUN_00430113();
  return;
}

