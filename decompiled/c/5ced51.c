
undefined8 FUN_005ced51(void)

{
  byte *pbVar1;
  char cVar2;
  byte bVar3;
  ushort uVar4;
  uint in_EAX;
  ushort in_CX;
  ushort uVar6;
  ushort uVar7;
  ushort extraout_CX;
  char cVar10;
  uint in_EDX;
  int iVar8;
  int iVar9;
  uint extraout_EDX;
  uint unaff_EBX;
  uint uVar11;
  undefined3 uVar12;
  uint uVar13;
  undefined1 *puVar14;
  uint uVar15;
  int iVar16;
  byte *pbVar17;
  uint uVar5;
  
  DAT_00652466 = (ushort)in_EAX;
  DAT_0065246e = 1;
  uVar13 = in_EDX >> 8 & 0xff;
  uVar15 = unaff_EBX >> 8 & 0xff;
  iVar16 = uVar15 * 0x260;
  pbVar17 = &DAT_00887420 + iVar16;
  bVar3 = (byte)in_EDX;
  uVar5 = in_EAX;
  uVar11 = unaff_EBX;
  DAT_00652468 = in_CX;
  DAT_0065246a = DAT_00652466;
  DAT_0065246c = in_CX;
  if ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar17 * 8) & 8) == 0) {
LAB_005ced9f:
    uVar4 = (short)uVar5 - (&DAT_00652478)[uVar13 * 2];
    uVar5 = (uint)uVar4;
    uVar6 = DAT_00652468 - (&DAT_0065247a)[uVar13 * 2];
    uVar7 = uVar6 * 0x80 | uVar6 >> 9 | uVar4;
    puVar14 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
    do {
      cVar10 = (char)(in_EDX >> 8);
      if ((((bVar3 == puVar14[2]) &&
           (uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff3c, (char)uVar11 == '\b')) &&
          (uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff03, (char)uVar11 == cVar10)) &&
         ((char)(uVar11 >> 8) == puVar14[7])) {
        cVar2 = puVar14[4];
        uVar11 = CONCAT31((int3)(uVar11 >> 8),cVar2);
        if ((cVar2 == '\x02') || (cVar2 == '\x03')) goto LAB_005cee2b;
        if (cVar2 == '\x01') goto code_r0x005cedf5;
      }
      pbVar1 = puVar14 + 1;
      puVar14 = puVar14 + 8;
    } while ((*pbVar1 & 0x80) == 0);
    goto LAB_005cee5d;
  }
  DAT_00652468 = in_CX;
  if (3 < (byte)(&DAT_00887497)[iVar16]) {
LAB_005cf0b8:
    DAT_00991efc = 0x3d4;
    return CONCAT44(in_EDX,in_EAX);
  }
  if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      iVar9 = iVar8;
      iVar8 = iVar9 + 1;
    } while ((&DAT_0088744a)[uVar15 * 0x130 + iVar8] != -1);
    (&DAT_0088744a)[uVar15 * 0x130 + iVar8] = CONCAT11((char)(in_CX >> 5),(char)(DAT_00652466 >> 5))
    ;
    pbVar17[iVar9 + 0x33] = bVar3;
    pbVar17[iVar9 + 0x3b] = 1;
    pbVar17[iVar9 + 0x37] = 0;
    (&DAT_00887497)[iVar16] = (&DAT_00887497)[iVar16] + '\x01';
  }
LAB_005cf068:
  return CONCAT44(in_EDX,in_EAX);
code_r0x005cedf5:
  if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      do {
        iVar9 = iVar8;
        iVar8 = iVar9 + 1;
      } while (CONCAT11((char)(uVar6 >> 5),(char)(uVar4 >> 5)) !=
               (&DAT_0088744a)[uVar15 * 0x130 + iVar8]);
    } while (bVar3 != pbVar17[iVar9 + 0x33]);
    (&DAT_0088744a)[uVar15 * 0x130 + iVar8] = 0xffff;
    (&DAT_00887497)[iVar16] = (&DAT_00887497)[iVar16] + -1;
  }
LAB_005cee2b:
  DAT_0065246e = DAT_0065246e + 1;
  DAT_00652466 = uVar4;
  DAT_00652468 = uVar6;
  goto LAB_005ced9f;
LAB_005cee5d:
  uVar4 = DAT_0065246a + (&DAT_00652478)[uVar13 * 2];
  uVar6 = DAT_0065246c + (&DAT_0065247a)[uVar13 * 2];
  uVar7 = uVar6 * 0x80 | uVar6 >> 9 | uVar4;
  puVar14 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
  do {
    if (((bVar3 == puVar14[2]) &&
        (uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff3c, (char)uVar11 == '\b')) &&
       ((uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff03, (char)uVar11 == cVar10 &&
        ((char)(uVar11 >> 8) == puVar14[7])))) {
      cVar2 = puVar14[4];
      uVar11 = CONCAT31((int3)(uVar11 >> 8),cVar2);
      if ((cVar2 == '\x02') || (cVar2 == '\x03')) goto LAB_005ceee9;
      if (cVar2 == '\x01') goto code_r0x005ceeb3;
    }
    pbVar1 = puVar14 + 1;
    puVar14 = puVar14 + 8;
  } while ((*pbVar1 & 0x80) == 0);
  if (((DAT_00652466 == DAT_0065246a) && (DAT_00652468 == DAT_0065246c)) &&
     (3 < (byte)(&DAT_00887497)[iVar16])) goto LAB_005cf0b8;
  if (0xc < DAT_0065246e) {
    DAT_00991efc = 0x456;
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar5 = in_EDX;
  uVar4 = DAT_0065246a;
  uVar6 = DAT_0065246c;
  if ((unaff_EBX & 1) == 0) goto LAB_005cf068;
LAB_005cef5b:
  uVar7 = uVar6 << 7 | uVar6 >> 9 | uVar4;
  puVar14 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
  do {
    if ((((byte)uVar5 == puVar14[2]) &&
        (uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff3c, (char)uVar11 == '\b')) &&
       ((uVar11 = CONCAT31((int3)(uVar11 >> 8),*puVar14) & 0xffffff03,
        (char)uVar11 == (char)(uVar5 >> 8) && ((char)(uVar11 >> 8) == puVar14[7])))) {
      cVar10 = puVar14[4];
      uVar12 = (undefined3)(uVar11 >> 8);
      uVar11 = CONCAT31(uVar12,cVar10);
      if (((cVar10 == '\x02') || (cVar10 == '\x03')) || (cVar10 == '\x01')) goto LAB_005cefb5;
    }
    puVar14 = puVar14 + 8;
  } while( true );
code_r0x005ceeb3:
  if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      do {
        iVar9 = iVar8;
        iVar8 = iVar9 + 1;
      } while (CONCAT11((char)(uVar6 >> 5),(char)(uVar4 >> 5)) !=
               (&DAT_0088744a)[uVar15 * 0x130 + iVar8]);
    } while (bVar3 != pbVar17[iVar9 + 0x33]);
    (&DAT_0088744a)[uVar15 * 0x130 + iVar8] = 0xffff;
    (&DAT_00887497)[iVar16] = (&DAT_00887497)[iVar16] + -1;
  }
LAB_005ceee9:
  DAT_0065246e = DAT_0065246e + 1;
  DAT_0065246a = uVar4;
  DAT_0065246c = uVar6;
  goto LAB_005cee5d;
LAB_005cefb5:
  if ((uVar4 == DAT_0065246a) && (uVar6 == DAT_0065246c)) {
    iVar8 = -1;
    do {
      iVar9 = iVar8;
      iVar8 = iVar9 + 1;
    } while ((&DAT_0088744a)[uVar15 * 0x130 + iVar8] != -1);
    (&DAT_0088744a)[uVar15 * 0x130 + iVar8] = CONCAT11((char)(uVar6 >> 5),(char)(uVar4 >> 5));
    pbVar17[iVar9 + 0x33] = (byte)uVar5;
    pbVar17[iVar9 + 0x3b] = 1;
    pbVar17[iVar9 + 0x37] = DAT_0065246e;
    (&DAT_00887497)[iVar16] = (&DAT_00887497)[iVar16] + '\x01';
    uVar11 = CONCAT31(uVar12,1);
  }
  else {
    uVar11 = CONCAT31(uVar12,3);
    if ((uVar4 == DAT_00652466) && (uVar6 == DAT_00652468)) {
      uVar11 = CONCAT31(uVar12,2);
    }
  }
  puVar14[4] = (char)uVar11;
  uVar4 = FUN_005e56d3(puVar14);
  if ((uVar4 == DAT_00652466) && (extraout_CX == DAT_00652468)) goto LAB_005cf068;
  uVar5 = extraout_EDX;
  uVar4 = uVar4 - (&DAT_00652478)[uVar13 * 2];
  uVar6 = extraout_CX - (&DAT_0065247a)[uVar13 * 2];
  goto LAB_005cef5b;
}

