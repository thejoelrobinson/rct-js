
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_005cfe66(void)

{
  undefined *puVar1;
  ushort uVar2;
  undefined4 in_EAX;
  undefined2 uVar5;
  undefined4 uVar3;
  undefined4 uVar4;
  ushort in_CX;
  ushort extraout_CX;
  uint uVar6;
  byte extraout_DL;
  short sVar7;
  undefined4 in_EDX;
  uint uVar8;
  undefined2 uVar11;
  undefined4 uVar10;
  byte unaff_BL;
  byte unaff_BH;
  ushort unaff_BP;
  ushort uVar12;
  int iVar13;
  ushort *puVar14;
  uint uVar15;
  byte *pbVar16;
  ushort *puVar17;
  undefined4 uVar9;
  
  _DAT_006522f0 = unaff_BP;
  uVar2 = (ushort)in_EAX;
  uVar12 = in_CX << 7 | in_CX >> 9 | uVar2;
  uVar8 = CONCAT22((short)((uint)in_EDX >> 0x10),(ushort)in_EDX >> 2);
  puVar17 = (ushort *)0x0;
  puVar14 = (ushort *)(&DAT_00971ef4)[(ushort)(uVar12 >> 5 | uVar12 << 0xb)];
  do {
    if (((((char)uVar8 == (char)puVar14[1]) &&
         (uVar8 = CONCAT22((short)(uVar8 >> 0x10),CONCAT11((char)*puVar14,(char)uVar8)) & 0xffff3cff
         , (char)(uVar8 >> 8) == '\b')) &&
        (uVar8 = CONCAT22((short)(uVar8 >> 0x10),CONCAT11((char)*puVar14,(char)uVar8)) & 0xffff03ff,
        (byte)(uVar8 >> 8) == unaff_BH)) &&
       ((unaff_BL == (byte)puVar14[2] &&
        (puVar17 = puVar14, (*(byte *)((int)puVar14 + 5) & 0xf) == 0)))) goto LAB_005cfec3;
    uVar12 = *puVar14;
    puVar14 = puVar14 + 4;
  } while ((uVar12 & 0x8000) == 0);
  puVar14 = puVar17;
  if (puVar17 == (ushort *)0x0) {
    return CONCAT44(uVar8,in_EAX);
  }
LAB_005cfec3:
  uVar11 = (undefined2)(uVar8 >> 0x10);
  puVar1 = (&PTR_DAT_00652498)[unaff_BL];
  iVar13 = (*(ushort *)((int)puVar14 + 5) & 0xf) * 10;
  uVar15 = *puVar14 & 3;
  uVar5 = (undefined2)((uint)in_EAX >> 0x10);
  switch(uVar15) {
  case 0:
    uVar3 = CONCAT22(uVar5,uVar2 - *(short *)(puVar1 + iVar13 + 1));
    uVar6 = (uint)(ushort)(in_CX - *(short *)(puVar1 + iVar13 + 3));
    break;
  case 1:
    uVar3 = CONCAT22(uVar5,uVar2 - *(short *)(puVar1 + iVar13 + 3));
    uVar6 = (uint)(ushort)(in_CX + *(short *)(puVar1 + iVar13 + 1));
    break;
  case 2:
    uVar3 = CONCAT22(uVar5,uVar2 + *(short *)(puVar1 + iVar13 + 1));
    uVar6 = (uint)(ushort)(in_CX + *(short *)(puVar1 + iVar13 + 3));
    break;
  case 3:
    uVar3 = CONCAT22(uVar5,uVar2 + *(short *)(puVar1 + iVar13 + 3));
    uVar6 = (uint)(ushort)(in_CX - *(short *)(puVar1 + iVar13 + 1));
  }
  sVar7 = ((ushort)(byte)uVar8 * 4 - *(short *)(puVar1 + iVar13 + 5)) + *(short *)(puVar1 + 5);
  uVar9 = CONCAT22(uVar11,sVar7);
  uVar10 = CONCAT22(uVar11,sVar7 - *(short *)(puVar1 + 5));
  uVar4 = uVar3;
  uVar8 = uVar6;
  for (iVar13 = 0; puVar1[iVar13] != -1; iVar13 = iVar13 + 10) {
    switch((&switchD_005cff4c::switchdataD_005cff54)[uVar15]) {
    case (undefined *)0x5cff64:
      break;
    case (undefined *)0x5cff70:
      break;
    case (undefined *)0x5cff7c:
      break;
    case (undefined *)0x5cff88:
    }
    uVar2 = FUN_005e5562(uVar15,uVar10,uVar6,uVar4,uVar9,uVar8);
    uVar2 = extraout_CX << 7 | extraout_CX >> 9 | uVar2;
    for (pbVar16 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
        ((extraout_DL != pbVar16[2] || ((*pbVar16 & 0x3c) != 8)) ||
        (((*pbVar16 & 3) != unaff_BH ||
         (((pbVar16[5] & 0xf) != puVar1[iVar13] || (unaff_BL != pbVar16[4]))))));
        pbVar16 = pbVar16 + 8) {
    }
    if (iVar13 == 0) {
      DAT_006522f2 = pbVar16;
    }
    if ((_DAT_006522f0 & 1) != 0) {
      *pbVar16 = *pbVar16 & 0xbf;
    }
    if ((_DAT_006522f0 & 2) != 0) {
      *pbVar16 = *pbVar16 | 0x40;
    }
  }
  return CONCAT44(uVar9,uVar3);
}

