
undefined8 FUN_004484cb(void)

{
  byte *pbVar1;
  undefined2 uVar2;
  uint3 uVar3;
  byte bVar4;
  ushort uVar5;
  undefined4 in_EAX;
  undefined4 uVar6;
  ushort uVar7;
  ushort uVar8;
  ushort uVar9;
  ushort uVar10;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 extraout_ECX_01;
  undefined4 uVar11;
  byte bVar12;
  undefined4 in_EDX;
  uint uVar13;
  uint3 uVar16;
  int iVar14;
  undefined4 uVar15;
  undefined4 extraout_EDX;
  byte bVar17;
  ushort uVar18;
  uint uVar19;
  uint uVar20;
  undefined2 *puVar21;
  byte *unaff_ESI;
  byte *pbVar22;
  byte *pbVar23;
  byte *pbVar24;
  byte *unaff_EDI;
  ulonglong uVar25;
  ulonglong uVar26;
  
  uVar25 = FUN_00448c64();
  DAT_00630b3c = '\0';
  DAT_00630b30 = &DAT_00630b34;
  uVar19 = 0;
  uVar11 = extraout_ECX;
LAB_004484e4:
  pbVar22 = DAT_00630b30;
  uVar6 = (undefined4)uVar25;
  uVar20 = CONCAT21((short)(uVar25 >> 0x30),*unaff_ESI) & 0xffff3c;
  uVar13 = uVar20 << 8;
  bVar17 = (byte)uVar19;
  if ((char)uVar20 == '\x10') {
    unaff_EDI = (byte *)(uint)(ushort)((ushort)unaff_ESI[4] << 4 | unaff_ESI[5] & 0xf);
    uVar13 = (byte)(bVar17 - *unaff_ESI) & 3;
    uVar26 = (ulonglong)CONCAT14(bVar17 - *unaff_ESI,uVar6) & 0x3ffffffff;
    if ((unaff_EDI[0x5f4970] >> (short)uVar13 & 1) != 0) goto LAB_00448516;
  }
  else {
LAB_00448516:
    uVar20 = CONCAT21((short)(uVar13 >> 0x10),*unaff_ESI) & 0xffff3c;
    uVar13 = uVar20 << 8;
    if ((char)uVar20 == '\b') {
      unaff_EDI = (byte *)((uint)unaff_ESI[4] << 4 | unaff_ESI[5] & 0xf);
      uVar26 = (ulonglong)CONCAT14(unaff_ESI[5],uVar6) & 0xfffffffff;
      if ((unaff_EDI[0x6559d8] & 0x20) != 0) {
        uVar13 = (byte)(bVar17 - *unaff_ESI) & 3;
        uVar26 = (ulonglong)CONCAT14(bVar17 - *unaff_ESI,uVar6) & 0x3ffffffff;
        if ((unaff_EDI[0x6559d8] >> (short)uVar13 & 1) != 0) goto LAB_00448553;
      }
    }
    else {
LAB_00448553:
      uVar16 = CONCAT21((short)(uVar13 >> 0x10),*unaff_ESI);
      uVar3 = uVar16 & 0xffff3c;
      iVar14 = (uint)uVar3 << 8;
      if (((char)uVar3 == '\x04') && ((unaff_ESI[4] & 4) != 0)) {
        uVar20 = CONCAT31(uVar16,unaff_ESI[4]) & 0xffff3c03;
        uVar16 = (uint3)(uVar20 >> 8);
        bVar12 = (char)uVar20 - bVar17;
        uVar26 = CONCAT44(CONCAT31(uVar16,bVar12),uVar6);
        if ((bVar12 & 1) != 0) goto LAB_00448793;
        iVar14 = (uint)uVar16 << 8;
        if ((unaff_ESI[4] & 3) == bVar17) {
          iVar14 = CONCAT31(uVar16,4);
        }
      }
      bVar12 = (char)iVar14 + unaff_ESI[2];
      uVar15 = CONCAT22((short)((uint)iVar14 >> 0x10),CONCAT11(bVar12 - 4,bVar12));
      uVar5 = (short)uVar25 + (&DAT_00652478)[uVar19 * 2];
      uVar7 = (short)uVar11 + (&DAT_0065247a)[uVar19 * 2];
      uVar8 = uVar7 * 0x80 | uVar7 >> 9 | uVar5;
      pbVar23 = (byte *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
      do {
        bVar4 = *pbVar23 & 0x3c;
        uVar8 = (ushort)uVar19;
        if (bVar12 == pbVar23[2]) {
          if (bVar4 == 0x10) {
            uVar26 = CONCAT44(uVar15,uVar6);
            if (((byte)(&DAT_005f4970)
                       [CONCAT31((int3)(((uint)pbVar23[4] << 4) >> 8),
                                 (byte)((uint)pbVar23[4] << 4) | pbVar23[5] & 0xf)] >>
                 (ushort)(bVar17 - *pbVar23 & 3 ^ 2) & 1) == 0) break;
            if (DAT_00630b3c == '\0') {
              *DAT_00630b30 = 8;
              pbVar22[1] = bVar17;
              DAT_00630b30 = DAT_00630b30 + 2;
            }
            if (DAT_00630b3c == '\x01') {
              FUN_00448d15(uVar15,uVar7,uVar5);
            }
          }
          else {
            if (bVar4 != 8) goto LAB_004485cb;
            uVar20 = (uint)pbVar23[4] << 4 | pbVar23[5] & 0xf;
            uVar26 = CONCAT44(uVar15,uVar6);
            if ((((&DAT_006559d8)[uVar20] & 0x20) == 0) ||
               (uVar26 = CONCAT44(uVar15,uVar6),
               ((byte)(&DAT_006559d8)[uVar20] >> (ushort)(bVar17 - *pbVar23 & 3 ^ 2) & 1) == 0))
            break;
            if (DAT_00630b3c == '\0') {
              *DAT_00630b30 = 1;
              pbVar22[1] = bVar17;
              DAT_00630b30 = DAT_00630b30 + 2;
            }
          }
LAB_0044875d:
          uVar20 = CONCAT21((short)((uint)uVar15 >> 0x10),*unaff_ESI) & 0xffff3c;
          iVar14 = uVar20 << 8;
          uVar26 = CONCAT44(iVar14,uVar6);
          if (((char)uVar20 == '\x04') && (uVar26 = CONCAT44(iVar14,uVar6), DAT_00630b3c == '\x01'))
          {
            unaff_ESI[((int)(short)uVar8 >> 3) + 6] =
                 unaff_ESI[((int)(short)uVar8 >> 3) + 6] | '\x01' << (uVar8 & 7);
            uVar26 = FUN_005e56d3(unaff_ESI,unaff_EDI);
            uVar11 = extraout_ECX_00;
          }
          break;
        }
LAB_004485cb:
        if (bVar4 == 4) {
          if (bVar12 == pbVar23[2]) {
            if ((pbVar23[4] & 4) != 0) {
              bVar12 = pbVar23[4] & 3;
              goto joined_r0x004486ae;
            }
          }
          else {
            if ((byte)(bVar12 - 4) != pbVar23[2]) goto LAB_004485e1;
            uVar26 = CONCAT44(uVar15,uVar6);
            if ((pbVar23[4] & 4) == 0) break;
            bVar12 = pbVar23[4] & 3 ^ 2;
joined_r0x004486ae:
            uVar26 = CONCAT44(uVar15,uVar6);
            if (bVar12 != bVar17) break;
          }
          if (DAT_00630b3c == '\0') {
            bVar12 = 2;
            if (pbVar23[4] >> 4 == 0) {
              if (1 < (byte)(&DAT_00630b00)[pbVar23[6] & 0xf]) goto LAB_00448708;
              bVar12 = 3;
            }
            *DAT_00630b30 = bVar12;
            pbVar22[1] = bVar17;
            DAT_00630b30 = DAT_00630b30 + 2;
          }
LAB_00448708:
          if ((DAT_00630b3c == '\x01') &&
             (pbVar23[((int)(short)(uVar8 ^ 2) >> 3) + 6] =
                   pbVar23[((int)(short)(uVar8 ^ 2) >> 3) + 6] | '\x01' << ((uVar8 ^ 2) & 7),
             (pbVar23[4] & 0xf0) == 0)) {
            FUN_00448d15(uVar15,uVar7,uVar5);
          }
          FUN_0044149a(uVar15);
          FUN_005e0650();
          FUN_005e56d3(pbVar23,unaff_EDI);
          uVar15 = extraout_EDX;
          goto LAB_0044875d;
        }
LAB_004485e1:
        pbVar24 = pbVar23 + 1;
        pbVar23 = pbVar23 + 8;
        uVar26 = CONCAT44(uVar15,uVar6);
      } while ((*pbVar24 & 0x80) == 0);
    }
  }
LAB_00448793:
  uVar25 = uVar26;
  uVar20 = (uint)(uVar25 >> 0x20);
  uVar6 = (undefined4)uVar25;
  if (DAT_00630b3c == '\0') goto code_r0x0044879c;
  goto LAB_00448807;
code_r0x0044879c:
  uVar19 = uVar19 + 1;
  if (uVar19 < 4) goto LAB_004484e4;
  DAT_00630b3c = '\x01';
  for (puVar21 = (undefined2 *)&DAT_00630b34; unaff_EDI = (byte *)(puVar21 + 1),
      unaff_EDI < DAT_00630b30; puVar21 = puVar21 + 1) {
    do {
      if ((byte)*puVar21 < *unaff_EDI) {
        LOCK();
        uVar2 = *(undefined2 *)unaff_EDI;
        *(undefined2 *)unaff_EDI = *puVar21;
        UNLOCK();
        *puVar21 = uVar2;
      }
      uVar20 = uVar20 & 0xffff0000;
      unaff_EDI = unaff_EDI + 2;
    } while (unaff_EDI < DAT_00630b30);
  }
  uVar20 = CONCAT31((int3)(uVar20 >> 8),*unaff_ESI) & 0xffffff3c;
  if ((((char)uVar20 == '\x04') &&
      (uVar20 = CONCAT31((int3)(uVar20 >> 8),unaff_ESI[4] >> 4), unaff_ESI[4] >> 4 == 0)) &&
     (&DAT_00630b38 < DAT_00630b30)) {
    DAT_00630b30 = (byte *)&DAT_00630b38;
  }
LAB_00448807:
  uVar25 = CONCAT44(uVar20,uVar6);
  if (&DAT_00630b34 < DAT_00630b30) {
    uVar19 = (uint)DAT_00630b35;
    DAT_00630b34 = (undefined1)DAT_00630b36;
    DAT_00630b35 = (byte)((ushort)DAT_00630b36 >> 8);
    DAT_00630b36 = DAT_00630b38;
    DAT_00630b38 = DAT_00630b3a;
    DAT_00630b30 = DAT_00630b30 + -2;
    goto LAB_004484e4;
  }
  if ((((*unaff_ESI & 0x3c) != 4) || (unaff_ESI[4] >> 4 == 0)) || ((unaff_ESI[4] & 4) != 0)) {
LAB_00448a43:
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar19 = 0;
LAB_00448869:
  bVar17 = unaff_ESI[2];
  uVar5 = (short)uVar6 + (&DAT_00652478)[uVar19 * 2];
  uVar7 = (short)uVar11 + (&DAT_0065247a)[uVar19 * 2];
  uVar8 = uVar7 * 0x80 | uVar7 >> 9 | uVar5;
  pbVar22 = (byte *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
  do {
    if ((((*pbVar22 & 0x3c) == 4) && ((pbVar22[4] & 4) == 0)) &&
       ((pbVar22[4] >> 4 != 0 && (bVar17 == pbVar22[2])))) {
      uVar20 = uVar19 + 1 & 3;
      uVar8 = uVar5 + (&DAT_00652478)[uVar20 * 2];
      uVar9 = uVar7 + (&DAT_0065247a)[uVar20 * 2];
      uVar10 = uVar9 * 0x80 | uVar9 >> 9 | uVar8;
      pbVar23 = (byte *)(&DAT_00971ef4)[(ushort)(uVar10 >> 5 | uVar10 << 0xb)];
      goto LAB_004488f4;
    }
    pbVar23 = pbVar22 + 1;
    pbVar22 = pbVar22 + 8;
  } while ((*pbVar23 & 0x80) == 0);
  goto LAB_00448a39;
  while (pbVar24 = pbVar23 + 1, pbVar23 = pbVar23 + 8, (*pbVar24 & 0x80) == 0) {
LAB_004488f4:
    if (((((*pbVar23 & 0x3c) == 4) && ((pbVar23[4] & 4) == 0)) && (pbVar23[4] >> 4 != 0)) &&
       (bVar17 == pbVar23[2])) {
      uVar20 = uVar20 + 1 & 3;
      uVar10 = (uVar9 + (&DAT_0065247a)[uVar20 * 2]) * 0x80 |
               (ushort)(uVar9 + (&DAT_0065247a)[uVar20 * 2]) >> 9 |
               uVar8 + (&DAT_00652478)[uVar20 * 2];
      pbVar24 = (byte *)(&DAT_00971ef4)[(ushort)(uVar10 >> 5 | uVar10 << 0xb)];
      goto LAB_00448951;
    }
  }
  goto LAB_00448a39;
  while (pbVar1 = pbVar24 + 1, pbVar24 = pbVar24 + 8, (*pbVar1 & 0x80) == 0) {
LAB_00448951:
    if ((((*pbVar24 & 0x3c) == 4) && ((pbVar24[4] & 4) == 0)) &&
       ((pbVar24[4] >> 4 != 0 && (bVar17 == pbVar24[2])))) {
      uVar10 = (short)uVar20 + 1U & 3;
      uVar18 = uVar10 + 4;
      pbVar24[((int)(short)uVar18 >> 3) + 6] =
           pbVar24[((int)(short)uVar18 >> 3) + 6] | '\x01' << (uVar18 & 7);
      FUN_005e56d3(pbVar24,unaff_EDI,pbVar23,uVar9,uVar8,pbVar22,uVar7,uVar5);
      uVar5 = uVar10 - 1 & 3;
      uVar7 = uVar5 + 4;
      pbVar23[((int)(short)uVar7 >> 3) + 6] =
           pbVar23[((int)(short)uVar7 >> 3) + 6] | '\x01' << (uVar7 & 7);
      FUN_005e56d3(pbVar23);
      uVar5 = (uVar5 - 1 & 3) + 4;
      pbVar22[((int)(short)uVar5 >> 3) + 6] =
           pbVar22[((int)(short)uVar5 >> 3) + 6] | '\x01' << (uVar5 & 7);
      FUN_005e56d3(pbVar22);
      uVar5 = ((ushort)uVar19 & 3) + 4;
      unaff_ESI[((int)(short)uVar5 >> 3) + 6] =
           unaff_ESI[((int)(short)uVar5 >> 3) + 6] | '\x01' << (uVar5 & 7);
      uVar6 = FUN_005e56d3();
      uVar11 = extraout_ECX_01;
      break;
    }
  }
LAB_00448a39:
  uVar19 = uVar19 + 1;
  if (3 < uVar19) goto LAB_00448a43;
  goto LAB_00448869;
}

