
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042eae0(void)

{
  char *pcVar1;
  char cVar2;
  undefined4 uVar3;
  uint *puVar4;
  byte bVar5;
  int iVar6;
  uint uVar7;
  uint uVar8;
  byte *pbVar9;
  char *pcVar10;
  byte *pbVar11;
  byte *pbVar12;
  char *pcVar13;
  uint *puVar14;
  byte *pbVar15;
  uint *puVar16;
  uint *puVar17;
  bool bVar18;
  
  pcVar10 = DAT_00628cb0;
  if (DAT_00628cb0 == (char *)0xffffffff) {
    if (((_DAT_0099a500 & 1) != 0) && (DAT_005f8897 != '\0')) {
      DAT_005f8897 = 0;
      FUN_0042fdf4();
      FUN_00438a1f();
      return;
    }
    return;
  }
  DAT_00628cb0 = (char *)0xffffffff;
  pcVar13 = &DAT_005f841b;
  while( true ) {
    if (*pcVar10 == '\0') {
      DAT_00628cb0 = (char *)0xffffffff;
      return;
    }
    if (*pcVar10 != ' ') break;
    pcVar10 = pcVar10 + 1;
  }
  do {
    cVar2 = *pcVar10;
    *pcVar13 = cVar2;
    pcVar10 = pcVar10 + 1;
    pcVar13 = pcVar13 + 1;
  } while (cVar2 != '\0');
  iVar6 = FUN_0040844b(&DAT_005f841b,&DAT_005f92e7);
  if (iVar6 != -1) {
    pcVar10 = &DAT_005f841b;
    do {
      pcVar10 = pcVar10 + 1;
    } while (*pcVar10 != '\0');
    do {
      pcVar13 = pcVar10 + -1;
      if (pcVar13 == &DAT_005f841b) break;
      pcVar1 = pcVar10 + -2;
      pcVar10 = pcVar13;
    } while (*pcVar1 != '\\');
    pcVar10 = &DAT_005f9313;
    do {
      cVar2 = *pcVar10;
      *pcVar13 = cVar2;
      pcVar10 = pcVar10 + 1;
      pcVar13 = pcVar13 + 1;
    } while (cVar2 != '\0');
    FUN_00408490(iVar6);
  }
  pbVar11 = &DAT_005f841b;
  puVar16 = (uint *)&DAT_005f841b;
  do {
    puVar14 = (uint *)((int)puVar16 + 1);
    uVar8 = *puVar16;
    puVar16 = puVar14;
  } while ((char)uVar8 != '\0');
  do {
    puVar14 = (uint *)((int)puVar14 + -1);
    if (puVar14 < &DAT_005f841c) {
      return;
    }
  } while (*(char *)puVar14 != '.');
  uVar8 = *puVar14;
  bVar5 = (byte)uVar8;
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = CONCAT31((int3)(uVar8 >> 8),bVar5 - 0x20);
  }
  uVar7 = uVar8 >> 8 | uVar8 << 0x18;
  bVar5 = (byte)(uVar8 >> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = CONCAT31((int3)(uVar7 >> 8),bVar5 - 0x20);
  }
  uVar8 = uVar7 >> 8 | uVar7 << 0x18;
  bVar5 = (byte)(uVar7 >> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = CONCAT31((int3)(uVar8 >> 8),bVar5 - 0x20);
  }
  uVar7 = uVar8 >> 8 | uVar8 << 0x18;
  bVar5 = (byte)(uVar8 >> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = CONCAT31((int3)(uVar7 >> 8),bVar5 - 0x20);
  }
  uVar8 = uVar7 >> 8 | uVar7 << 0x18;
  if (uVar8 == DAT_005f92db) {
    DAT_00628cb9 = 0;
    pbVar12 = &DAT_0099aa88;
    pbVar15 = &DAT_005f91d9;
    do {
      bVar5 = *pbVar11;
      *pbVar12 = bVar5;
      *pbVar15 = bVar5;
      pbVar11 = pbVar11 + 1;
      pbVar12 = pbVar12 + 1;
      pbVar15 = pbVar15 + 1;
    } while (bVar5 != 0);
    FUN_0042f4be();
  }
  else {
    if (uVar8 == s__Scenarios___SC4_005f90b4._12_4_) {
      DAT_00628cb9 = 0;
      pbVar15 = &DAT_0099aa88;
      do {
        bVar5 = *pbVar11;
        *pbVar15 = bVar5;
        pbVar11 = pbVar11 + 1;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0);
      do {
        pbVar15 = pbVar15 + -1;
        if (pbVar15 < &DAT_0099aa88) goto LAB_0042ec7e;
      } while (*pbVar15 != 0x5c);
      pbVar12 = &DAT_005f8fb3;
      pbVar11 = &DAT_0099a888;
      do {
        pbVar9 = pbVar11;
        bVar5 = *pbVar12;
        *pbVar9 = bVar5;
        pbVar12 = pbVar12 + 1;
        pbVar11 = pbVar9 + 1;
      } while (bVar5 != 0x2a);
      do {
        pbVar15 = pbVar15 + 1;
        bVar5 = *pbVar15;
        *pbVar9 = bVar5;
        pbVar9 = pbVar9 + 1;
        bVar18 = false;
      } while (bVar5 != 0);
      FUN_0042fd81();
      if (bVar18) {
        FUN_00438a1f();
        return;
      }
      FUN_0042edaa();
      if (!bVar18) {
        FUN_0042fdf4();
        FUN_00438a1f();
        FUN_00427108();
        return;
      }
LAB_0042ec7e:
      FUN_00438a1f();
      FUN_00427108();
      return;
    }
    if ((uVar8 == s__Tracks___TD4_005f91c6._9_4_) || (uVar8 == DAT_005f91d4)) {
      DAT_00628cb9 = 0;
      pbVar15 = &DAT_0099aa88;
      do {
        bVar5 = *pbVar11;
        *pbVar15 = bVar5;
        pbVar11 = pbVar11 + 1;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0);
      do {
        pbVar11 = pbVar15;
        pbVar15 = pbVar11 + -1;
        if (pbVar15 < &DAT_0099aa88) goto LAB_0042ed71;
      } while (*pbVar15 != 0x5c);
      pbVar12 = &DAT_005f90c5;
      pbVar15 = &DAT_0099a888;
      do {
        bVar5 = *pbVar12;
        *pbVar15 = bVar5;
        pbVar12 = pbVar12 + 1;
        pbVar9 = pbVar15;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0x2a);
      do {
        pbVar12 = pbVar11;
        pbVar15 = pbVar9;
        bVar5 = *pbVar12;
        *pbVar15 = bVar5;
        uVar3 = s__Tracks___TD4_005f91c6._9_4_;
        bVar18 = bVar5 < 0x2e;
        if (bVar5 == 0x2e) break;
        bVar18 = false;
        pbVar9 = pbVar15 + 1;
        pbVar11 = pbVar12 + 1;
      } while (bVar5 != 0);
      *(undefined4 *)pbVar15 = s__Tracks___TD4_005f91c6._9_4_;
      *(undefined4 *)pbVar12 = uVar3;
      pbVar15[4] = 0;
      pbVar12[4] = 0;
      FUN_0042edaa();
      if (bVar18) {
LAB_0042ed71:
        FUN_00427108();
        return;
      }
      puVar16 = (uint *)&DAT_0099aa88;
      do {
        uVar8 = *puVar16;
        puVar14 = (uint *)((int)puVar16 + 1);
        puVar16 = (uint *)((int)puVar16 + 1);
      } while ((char)uVar8 != '\0');
      do {
        puVar16 = puVar14;
        puVar14 = (uint *)((int)puVar16 + -1);
        if (puVar14 < &DAT_0099aa88) goto LAB_0042ed71;
      } while (*(char *)puVar14 != '\\');
      pcVar10 = &DAT_005f90c5;
      puVar14 = (uint *)&DAT_0099a888;
      do {
        cVar2 = *pcVar10;
        *(char *)puVar14 = cVar2;
        pcVar10 = pcVar10 + 1;
        puVar4 = puVar14;
        puVar14 = (uint *)((int)puVar14 + 1);
      } while (cVar2 != '*');
      do {
        puVar17 = puVar16;
        puVar14 = puVar4;
        cVar2 = (char)*puVar17;
        *(char *)puVar14 = cVar2;
        uVar8 = DAT_005f91d4;
        if (cVar2 == '.') break;
        puVar4 = (uint *)((int)puVar14 + 1);
        puVar16 = (uint *)((int)puVar17 + 1);
      } while (cVar2 != '\0');
      *puVar14 = DAT_005f91d4;
      *puVar17 = uVar8;
      *(char *)(puVar14 + 1) = '\0';
      *(char *)(puVar17 + 1) = '\0';
      FUN_0042edaa();
      FUN_00427108();
      return;
    }
  }
  return;
}

