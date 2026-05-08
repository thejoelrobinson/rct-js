
ushort FUN_005dd960(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort uVar3;
  char cVar4;
  ushort uVar5;
  undefined2 uVar6;
  byte bVar7;
  byte *pbVar8;
  uint uVar9;
  int iVar10;
  ushort uVar11;
  int iVar12;
  int unaff_ESI;
  int iVar13;
  
  uVar11 = (ushort)(&DAT_0088744a)
                   [(uint)*(byte *)(unaff_ESI + 0x30) * 0x130 + (uint)*(byte *)(unaff_ESI + 0x4b)]
           >> 8;
  uVar3 = ((&DAT_0088744a)
           [(uint)*(byte *)(unaff_ESI + 0x30) * 0x130 + (uint)*(byte *)(unaff_ESI + 0x4b)] & 0xff) *
          0x20;
  uVar5 = uVar11 * 0x20;
  bVar7 = (&DAT_00887452)
          [(uint)*(byte *)(unaff_ESI + 0x30) * 0x260 + (uint)*(byte *)(unaff_ESI + 0x4b)];
  for (pbVar8 = (byte *)(&DAT_00971ef4)
                        [(ushort)((ushort)(uVar11 << 0xc | uVar3) >> 5 | (uVar5 >> 9) << 0xb)];
      ((*pbVar8 & 0x3c) != 8 || (bVar7 != pbVar8[2])); pbVar8 = pbVar8 + 8) {
  }
  uVar9 = (byte)(*pbVar8 + 1) & 3;
  uVar3 = uVar3 + (&DAT_00652478)[uVar9 * 2];
  uVar5 = uVar5 + (&DAT_0065247a)[uVar9 * 2];
  uVar11 = uVar5 * 0x80 | uVar5 >> 9 | uVar3;
  pbVar8 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
  do {
    if (((((*pbVar8 & 0x3c) == 8) &&
         (((bVar2 = pbVar8[2], bVar7 == bVar2 || (bVar7 == (byte)(bVar2 + 4))) ||
          (bVar7 == (byte)(bVar2 - 4))))) &&
        (((bVar2 = pbVar8[4], bVar2 == 1 || (bVar2 == 3)) || (bVar2 == 2)))) &&
       (((&DAT_00887496)[(uint)pbVar8[7] * 0x260] & 0x20) != 0)) goto LAB_005ddac9;
    pbVar1 = pbVar8 + 1;
    pbVar8 = pbVar8 + 8;
  } while ((*pbVar1 & 0x80) == 0);
  uVar3 = (uVar3 - (&DAT_00652478)[uVar9 * 2]) - (&DAT_00652478)[uVar9 * 2];
  uVar11 = (uVar5 - (&DAT_0065247a)[uVar9 * 2]) - (&DAT_0065247a)[uVar9 * 2];
  uVar11 = uVar11 * 0x80 | uVar11 >> 9 | uVar3;
  pbVar8 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
  while (((*pbVar8 & 0x3c) != 8 ||
         ((((bVar2 = pbVar8[2], bVar7 != bVar2 && (bVar7 != (byte)(bVar2 + 4))) &&
           (bVar7 != (byte)(bVar2 - 4))) ||
          ((((bVar2 = pbVar8[4], bVar2 != 1 && (bVar2 != 3)) && (bVar2 != 2)) ||
           (((&DAT_00887496)[(uint)pbVar8[7] * 0x260] & 0x20) == 0))))))) {
    pbVar1 = pbVar8 + 1;
    pbVar8 = pbVar8 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return uVar3;
    }
  }
LAB_005ddac9:
  bVar7 = pbVar8[7];
  iVar13 = (uint)bVar7 * 0x260;
  if (((&DAT_00887422)[(uint)bVar7 * 0x130] & 1) == 0) {
    return uVar3;
  }
  for (iVar10 = 0; (byte)iVar10 < (byte)(&DAT_00887498)[iVar13]; iVar10 = iVar10 + 1) {
    if (((*(ushort *)(&DAT_0088747e + iVar10 * 2 + iVar13) != 0xffff) &&
        (iVar12 = (uint)*(ushort *)(&DAT_0088747e + iVar10 * 2 + iVar13) * 0x100,
        (&DAT_00743be4)[iVar12] == '\x02')) &&
       (((&DAT_00743be5)[iVar12] == '\0' &&
        (((*(ushort *)(&DAT_00743bdc + iVar12) >> 2 & 1) != 0 &&
         ((pbVar8[5] & 0x70) >> 4 == (&DAT_00743bdf)[iVar12])))))) {
      *(ushort *)(&DAT_00743bdc + iVar12) = *(ushort *)(&DAT_00743bdc + iVar12) & 0xfffb;
      *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xfffb;
      return uVar3;
    }
  }
  if (bVar7 != *(byte *)(unaff_ESI + 0x30)) {
    if ((((&DAT_00887422)[(uint)bVar7 * 0x130] & 0x80) == 0) &&
       ((&DAT_00887441)[(uint)bVar7 * 0x260] != '\0')) {
      return uVar3;
    }
    *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xfffb;
    return uVar3;
  }
  iVar10 = (uint)bVar7 * 0x260;
  iVar13 = 0;
  uVar6 = 0;
  while( true ) {
    cVar4 = (char)uVar6;
    bVar7 = (byte)((ushort)uVar6 >> 8);
    if ((byte)(&DAT_00887498)[iVar10] <= (byte)iVar13) break;
    if (*(ushort *)(&DAT_0088747e + iVar13 * 2 + iVar10) != 0xffff) {
      iVar12 = (uint)*(ushort *)(&DAT_0088747e + iVar13 * 2 + iVar10) * 0x100;
      if ((&DAT_00743be4)[iVar12] == '\x04') {
        uVar6 = CONCAT11(bVar7 + 1,cVar4);
      }
      else if ((*(char *)(unaff_ESI + 0x4b) == (&DAT_00743bdf)[iVar12]) &&
              (((&DAT_00743be4)[iVar12] == '\x02' || ((&DAT_00743be4)[iVar12] == '\0')))) {
        uVar6 = CONCAT11(bVar7,cVar4 + '\x01');
      }
    }
    iVar13 = iVar13 + 1;
  }
  if ((byte)(cVar4 + bVar7) != (&DAT_00887498)[iVar10]) {
    return uVar3;
  }
  if ((byte)(&DAT_00887498)[iVar10] >> 1 <= bVar7) {
    return uVar3;
  }
  *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xfffb;
  return uVar3;
}

