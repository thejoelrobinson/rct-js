
undefined8 FUN_005ce923(void)

{
  byte *pbVar1;
  char cVar2;
  byte bVar3;
  ushort uVar4;
  ushort uVar5;
  uint in_EAX;
  uint uVar6;
  ushort uVar7;
  ushort uVar8;
  ushort uVar9;
  ushort extraout_CX;
  uint in_ECX;
  char cVar12;
  uint in_EDX;
  int iVar10;
  int iVar11;
  uint extraout_EDX;
  uint unaff_EBX;
  uint uVar13;
  undefined3 uVar14;
  uint uVar15;
  undefined1 *puVar16;
  uint uVar17;
  int iVar18;
  byte *pbVar19;
  
  uVar4 = (ushort)in_EAX;
  uVar7 = (ushort)in_ECX;
  DAT_0065246e = 0;
  DAT_0065246f = 0xff;
  uVar15 = in_EDX >> 8 & 0xff;
  uVar17 = unaff_EBX >> 8 & 0xff;
  iVar18 = uVar17 * 0x260;
  pbVar19 = &DAT_00887420 + iVar18;
  bVar3 = (byte)in_EDX;
  cVar12 = (char)(in_EDX >> 8);
  uVar6 = in_EAX;
  uVar13 = unaff_EBX;
  DAT_00652466 = uVar4;
  DAT_00652468 = uVar7;
  DAT_0065246a = uVar4;
  DAT_0065246c = uVar7;
  if ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar19 * 8) & 8) == 0) {
LAB_005ce978:
    uVar9 = (ushort)in_ECX;
    uVar5 = (ushort)uVar6;
    uVar8 = uVar9 << 7 | uVar9 >> 9 | uVar5;
    puVar16 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
    do {
      if (((bVar3 == puVar16[2]) &&
          (uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff3c, (char)uVar13 == '\b')) &&
         ((uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff03, (char)uVar13 == cVar12 &&
          ((char)(uVar13 >> 8) == puVar16[7])))) {
        cVar2 = puVar16[4];
        uVar13 = CONCAT31((int3)(uVar13 >> 8),cVar2);
        if ((cVar2 == '\x02') || (cVar2 == '\x03')) goto LAB_005ce9f8;
        if (cVar2 == '\x01') goto code_r0x005ce9c2;
      }
      pbVar1 = puVar16 + 1;
      puVar16 = puVar16 + 8;
    } while ((*pbVar1 & 0x80) == 0);
    goto LAB_005cea3a;
  }
  uVar5 = uVar7 << 7 | uVar7 >> 9 | uVar4;
  uVar6 = unaff_EBX;
  puVar16 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)];
  do {
    if ((((bVar3 == puVar16[2]) &&
         (uVar6 = CONCAT31((int3)(uVar6 >> 8),*puVar16) & 0xffffff3c, (char)uVar6 == '\b')) &&
        (uVar6 = CONCAT31((int3)(uVar6 >> 8),*puVar16) & 0xffffff03, (char)uVar6 == cVar12)) &&
       ((char)(uVar6 >> 8) == puVar16[7])) {
      if ((unaff_EBX & 1) != 0) {
        iVar10 = -1;
        do {
          do {
            iVar11 = iVar10;
            iVar10 = iVar11 + 1;
          } while (CONCAT11((char)(uVar7 >> 5),(char)(uVar4 >> 5)) !=
                   (&DAT_0088744a)[uVar17 * 0x130 + iVar10]);
        } while (bVar3 != pbVar19[iVar11 + 0x33]);
        (&DAT_0088744a)[uVar17 * 0x130 + iVar10] = 0xffff;
        (&DAT_00887497)[iVar18] = (&DAT_00887497)[iVar18] + -1;
      }
      break;
    }
    pbVar1 = puVar16 + 1;
    puVar16 = puVar16 + 8;
  } while ((*pbVar1 & 0x80) == 0);
LAB_005cecb9:
  return CONCAT44(in_EDX,in_EAX);
code_r0x005ce9c2:
  if ((unaff_EBX & 1) != 0) {
    iVar10 = -1;
    do {
      do {
        iVar11 = iVar10;
        iVar10 = iVar11 + 1;
      } while (CONCAT11((char)(in_ECX >> 5),(char)(uVar5 >> 5)) !=
               (&DAT_0088744a)[uVar17 * 0x130 + iVar10]);
    } while (bVar3 != pbVar19[iVar11 + 0x33]);
    (&DAT_0088744a)[uVar17 * 0x130 + iVar10] = 0xffff;
    (&DAT_00887497)[iVar18] = (&DAT_00887497)[iVar18] + -1;
  }
LAB_005ce9f8:
  DAT_0065246f = DAT_0065246f + 1;
  uVar6 = (uint)(ushort)(uVar5 - (&DAT_00652478)[uVar15 * 2]);
  in_ECX = (uint)(ushort)(uVar9 - (&DAT_0065247a)[uVar15 * 2]);
  DAT_00652466 = uVar5;
  DAT_00652468 = uVar9;
  goto LAB_005ce978;
LAB_005cea3a:
  uVar5 = DAT_0065246a + (&DAT_00652478)[uVar15 * 2];
  uVar9 = DAT_0065246c + (&DAT_0065247a)[uVar15 * 2];
  uVar8 = uVar9 * 0x80 | uVar9 >> 9 | uVar5;
  puVar16 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
  do {
    if ((((bVar3 == puVar16[2]) &&
         (uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff3c, (char)uVar13 == '\b')) &&
        (uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff03, (char)uVar13 == cVar12)) &&
       ((char)(uVar13 >> 8) == puVar16[7])) {
      cVar2 = puVar16[4];
      uVar13 = CONCAT31((int3)(uVar13 >> 8),cVar2);
      if ((cVar2 == '\x02') || (cVar2 == '\x03')) goto LAB_005ceac6;
      if (cVar2 == '\x01') goto code_r0x005cea90;
    }
    pbVar1 = puVar16 + 1;
    puVar16 = puVar16 + 8;
  } while ((*pbVar1 & 0x80) == 0);
  if ((((unaff_EBX & 1) == 0) && ((uVar4 != DAT_00652466 || (uVar7 != DAT_00652468)))) &&
     (((uVar4 != DAT_0065246a || (uVar7 != DAT_0065246c)) && (3 < (byte)(&DAT_00887497)[iVar18]))))
  {
    DAT_00991efc = 0x3d4;
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar6 = in_EDX;
  uVar5 = DAT_0065246a;
  uVar9 = DAT_0065246c;
  if ((unaff_EBX & 1) == 0) goto LAB_005cecb9;
LAB_005ceb42:
  if ((uVar5 != uVar4) || (uVar9 != uVar7)) {
    uVar8 = uVar9 << 7 | uVar9 >> 9 | uVar5;
    puVar16 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
    do {
      if (((((byte)uVar6 == puVar16[2]) &&
           (uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff3c, (char)uVar13 == '\b')) &&
          (uVar13 = CONCAT31((int3)(uVar13 >> 8),*puVar16) & 0xffffff03,
          (char)uVar13 == (char)(uVar6 >> 8))) && ((char)(uVar13 >> 8) == puVar16[7])) {
        cVar12 = puVar16[4];
        uVar14 = (undefined3)(uVar13 >> 8);
        uVar13 = CONCAT31(uVar14,cVar12);
        if (((cVar12 == '\x02') || (cVar12 == '\x03')) || (cVar12 == '\x01')) goto LAB_005cebae;
      }
      puVar16 = puVar16 + 8;
    } while( true );
  }
  goto LAB_005cec8a;
code_r0x005cea90:
  if ((unaff_EBX & 1) != 0) {
    iVar10 = -1;
    do {
      do {
        iVar11 = iVar10;
        iVar10 = iVar11 + 1;
      } while (CONCAT11((char)(uVar9 >> 5),(char)(uVar5 >> 5)) !=
               (&DAT_0088744a)[uVar17 * 0x130 + iVar10]);
    } while (bVar3 != pbVar19[iVar11 + 0x33]);
    (&DAT_0088744a)[uVar17 * 0x130 + iVar10] = 0xffff;
    (&DAT_00887497)[iVar18] = (&DAT_00887497)[iVar18] + -1;
  }
LAB_005ceac6:
  DAT_0065246e = DAT_0065246e + 1;
  DAT_0065246a = uVar5;
  DAT_0065246c = uVar9;
  goto LAB_005cea3a;
LAB_005cebae:
  if (((uVar5 == DAT_0065246a) && (uVar9 == DAT_0065246c)) ||
     (((ushort)(uVar5 + (&DAT_00652478)[uVar15 * 2]) == uVar4 &&
      ((ushort)(uVar9 + (&DAT_0065247a)[uVar15 * 2]) == uVar7)))) {
    iVar10 = -1;
    do {
      iVar11 = iVar10;
      iVar10 = iVar11 + 1;
    } while ((&DAT_0088744a)[uVar17 * 0x130 + iVar10] != -1);
    (&DAT_0088744a)[uVar17 * 0x130 + iVar10] = CONCAT11((char)(uVar9 >> 5),(char)(uVar5 >> 5));
    pbVar19[iVar11 + 0x33] = (byte)uVar6;
    pbVar19[iVar11 + 0x3b] = 1;
    bVar3 = DAT_0065246e;
    LOCK();
    DAT_0065246e = 0;
    UNLOCK();
    if (bVar3 == 0) {
      bVar3 = DAT_0065246f;
    }
    pbVar19[iVar11 + 0x37] = bVar3;
    (&DAT_00887497)[iVar18] = (&DAT_00887497)[iVar18] + '\x01';
    uVar13 = CONCAT31(uVar14,1);
  }
  else if ((((ushort)(uVar5 - (&DAT_00652478)[uVar15 * 2]) == uVar4) &&
           ((ushort)(uVar9 - (&DAT_0065247a)[uVar15 * 2]) == uVar7)) ||
          ((uVar13 = CONCAT31(uVar14,3), uVar5 == DAT_00652466 && (uVar9 == DAT_00652468)))) {
    uVar13 = CONCAT31((int3)(uVar13 >> 8),2);
  }
  puVar16[4] = (char)uVar13;
  uVar5 = FUN_005e56d3(puVar16);
  uVar6 = extraout_EDX;
  uVar9 = extraout_CX;
LAB_005cec8a:
  if ((uVar5 == DAT_00652466) && (uVar9 == DAT_00652468)) goto LAB_005cecb9;
  uVar5 = uVar5 - (&DAT_00652478)[uVar15 * 2];
  uVar9 = uVar9 - (&DAT_0065247a)[uVar15 * 2];
  goto LAB_005ceb42;
}

