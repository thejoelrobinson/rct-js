
undefined8 FUN_00448331(void)

{
  byte *pbVar1;
  uint3 uVar2;
  ushort uVar3;
  undefined4 in_EAX;
  short extraout_CX;
  ushort uVar4;
  ushort uVar5;
  undefined4 extraout_ECX;
  byte bVar6;
  undefined4 in_EDX;
  uint3 uVar9;
  int iVar8;
  undefined4 extraout_EDX;
  byte bVar10;
  uint uVar11;
  uint uVar12;
  byte *unaff_ESI;
  byte *pbVar13;
  undefined4 unaff_EDI;
  undefined8 uVar14;
  undefined8 uVar15;
  undefined4 uVar7;
  
  uVar14 = FUN_00448c64();
  uVar7 = (undefined4)((ulonglong)uVar14 >> 0x20);
  uVar11 = 0;
LAB_00448339:
  uVar9 = CONCAT21((short)((uint)uVar7 >> 0x10),*unaff_ESI);
  uVar2 = uVar9 & 0xffff3c;
  iVar8 = (uint)uVar2 << 8;
  bVar10 = (byte)uVar11;
  if (((char)uVar2 == '\x04') && ((unaff_ESI[4] & 4) != 0)) {
    uVar12 = CONCAT31(uVar9,unaff_ESI[4]) & 0xffff3c03;
    uVar9 = (uint3)(uVar12 >> 8);
    bVar6 = (char)uVar12 - bVar10;
    uVar7 = CONCAT31(uVar9,bVar6);
    if ((bVar6 & 1) == 0) {
      iVar8 = (uint)uVar9 << 8;
      if ((unaff_ESI[4] & 3) == bVar10) {
        iVar8 = CONCAT31(uVar9,4);
      }
      goto LAB_0044836a;
    }
  }
  else {
LAB_0044836a:
    bVar6 = (char)iVar8 + unaff_ESI[2];
    uVar7 = CONCAT22((short)((uint)iVar8 >> 0x10),CONCAT11(bVar6 - 4,bVar6));
    uVar3 = (short)uVar14 + (&DAT_00652478)[uVar11 * 2];
    uVar4 = extraout_CX + (&DAT_0065247a)[uVar11 * 2];
    uVar5 = uVar4 * 0x80 | uVar4 >> 9 | uVar3;
    pbVar13 = (byte *)(&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)];
    do {
      if ((*pbVar13 & 0x3c) == 4) {
        if (bVar6 == pbVar13[2]) {
          if ((pbVar13[4] & 4) != 0) {
            bVar6 = pbVar13[4] & 3;
            goto joined_r0x004483cb;
          }
        }
        else {
          if ((byte)(bVar6 - 4) != pbVar13[2]) goto LAB_004483ae;
          if ((pbVar13[4] & 4) == 0) break;
          bVar6 = pbVar13[4] & 3 ^ 2;
joined_r0x004483cb:
          if (bVar6 != bVar10) break;
        }
        if ((pbVar13[4] & 0xf0) == 0) {
          FUN_00448d15(uVar7,uVar4,uVar3);
        }
        uVar3 = (ushort)uVar11 ^ 2;
        pbVar13[((int)(short)uVar3 >> 3) + 6] =
             pbVar13[((int)(short)uVar3 >> 3) + 6] & ~('\x01' << (uVar3 & 7));
        uVar3 = uVar3 - 1 & 3;
        uVar4 = uVar3 + 4;
        pbVar13[((int)(short)uVar4 >> 3) + 6] =
             pbVar13[((int)(short)uVar4 >> 3) + 6] & ~('\x01' << (uVar4 & 7));
        uVar3 = (uVar3 + 1 & 3) + 4;
        pbVar13[((int)(short)uVar3 >> 3) + 6] =
             pbVar13[((int)(short)uVar3 >> 3) + 6] & ~('\x01' << (uVar3 & 7));
        uVar15 = FUN_005e56d3(pbVar13,unaff_EDI);
        uVar7 = (undefined4)((ulonglong)uVar15 >> 0x20);
        uVar12 = uVar11 + 1 & 3;
        uVar3 = (short)extraout_ECX + (&DAT_0065247a)[uVar12 * 2];
        uVar3 = uVar3 * 0x80 | uVar3 >> 9 | (short)uVar15 + (&DAT_00652478)[uVar12 * 2];
        pbVar13 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
        goto LAB_00448460;
      }
LAB_004483ae:
      pbVar1 = pbVar13 + 1;
      pbVar13 = pbVar13 + 8;
    } while ((*pbVar1 & 0x80) == 0);
  }
  goto LAB_004484b1;
  while (pbVar1 = pbVar13 + 1, pbVar13 = pbVar13 + 8, (*pbVar1 & 0x80) == 0) {
LAB_00448460:
    if (((*pbVar13 & 0x3c) == 4) && ((byte)((ulonglong)uVar15 >> 0x20) == pbVar13[2])) {
      if ((pbVar13[4] & 4) == 0) {
        uVar3 = ((short)uVar12 + 1U & 3) + 4;
        pbVar13[((int)(short)uVar3 >> 3) + 6] =
             pbVar13[((int)(short)uVar3 >> 3) + 6] & ~('\x01' << (uVar3 & 7));
        FUN_005e56d3(pbVar13,unaff_EDI,extraout_ECX,uVar11,(int)uVar15);
        uVar7 = extraout_EDX;
      }
      break;
    }
  }
LAB_004484b1:
  uVar11 = uVar11 + 1;
  if (3 < uVar11) {
    if ((*unaff_ESI & 0x3c) == 4) {
      unaff_ESI[6] = 0;
    }
    return CONCAT44(in_EDX,in_EAX);
  }
  goto LAB_00448339;
}

