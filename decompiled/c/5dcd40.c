
undefined8 FUN_005dcd40(void)

{
  byte bVar1;
  char cVar2;
  short sVar3;
  ushort uVar4;
  short sVar5;
  uint in_EAX;
  byte bVar6;
  ushort in_CX;
  ushort uVar7;
  byte bVar10;
  short sVar8;
  short sVar9;
  ushort uVar11;
  short sVar12;
  undefined4 in_EDX;
  uint uVar13;
  uint unaff_EBP;
  int *piVar14;
  char *unaff_ESI;
  uint uVar15;
  int iVar16;
  uint uVar17;
  
  if ((*(ushort *)(unaff_ESI + 0x48) & 2) == 0) {
    sVar3 = (short)in_EAX;
    if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x40) != 0) {
      uVar15 = (uint)(ushort)((ushort)((in_EAX & 0xfe0) << 2) | in_CX >> 5 & 0x7f);
      piVar14 = &DAT_0065e7bc;
      do {
        uVar4 = (&DAT_00991f8e)[uVar15 & 0x3fff];
        while (uVar4 != 0xffff) {
          uVar17 = (uint)uVar4;
          iVar16 = uVar17 * 0x100;
          if ((&DAT_00743b94 + iVar16 != unaff_ESI) && ((&DAT_00743b94)[iVar16] == '\0')) {
            uVar4 = (&DAT_00743ba6)[uVar17 * 0x80] - (short)in_EDX;
            if ((short)uVar4 < 0) {
              uVar4 = -uVar4;
            }
            if ((uVar4 < 0x11) &&
               ((*(ushort *)(&DAT_005f7104 + (uint)(byte)(&DAT_00743bc5)[iVar16] * 8) & 0x40) != 0))
            {
              uVar4 = sVar3 - (&DAT_00743ba2)[uVar17 * 0x80];
              if (!SBORROW2(sVar3,(&DAT_00743ba2)[uVar17 * 0x80])) {
                if ((short)uVar4 < 0) {
                  uVar4 = -uVar4;
                }
                uVar7 = in_CX - (&DAT_00743ba4)[uVar17 * 0x80];
                if (!SBORROW2(in_CX,(&DAT_00743ba4)[uVar17 * 0x80])) {
                  if ((short)uVar7 < 0) {
                    uVar7 = -uVar7;
                  }
                  if (!CARRY2(uVar4,uVar7)) {
                    bVar1 = unaff_ESI[0xcd];
                    bVar10 = (&DAT_00743c61)[iVar16];
                    bVar6 = bVar1;
                    if (bVar10 <= bVar1) {
                      bVar6 = bVar10;
                      bVar10 = bVar1;
                    }
                    if ((((bVar6 == bVar10) || (bVar6 != 5)) || (bVar10 != 6)) &&
                       ((ushort)(uVar4 + uVar7) <
                        (ushort)((uint)((ushort)(*(short *)(unaff_ESI + 0x44) +
                                                *(short *)(&DAT_00743bd8 + iVar16)) >> 1) * 0x1e >>
                                8))) {
                      if ((*(ushort *)(&DAT_005f7104 + (uint)(byte)(&DAT_00743bc5)[iVar16] * 8) &
                          0x4000) == 0) {
LAB_005dcf6f:
                        unaff_ESI[0xc4] = unaff_ESI[0xc4] + '\x01';
                        if (199 < (byte)unaff_ESI[0xc4]) {
                          unaff_ESI[0xc4] = unaff_ESI[0xc4] + -1;
                          if (unaff_ESI[0x50] == '\0') {
                            cVar2 = unaff_ESI[0x1e];
                            if (cVar2 == '\0') {
                              if (*(short *)(unaff_ESI + 0xe) <=
                                  (short)(&DAT_00743ba2)[uVar17 * 0x80]) goto LAB_005dcf66;
                            }
                            else if (cVar2 == '\b') {
                              if ((short)(&DAT_00743ba4)[uVar17 * 0x80] <=
                                  *(short *)(unaff_ESI + 0x10)) goto LAB_005dcf66;
                            }
                            else if (cVar2 == '\x10') {
                              if ((short)(&DAT_00743ba2)[uVar17 * 0x80] <=
                                  *(short *)(unaff_ESI + 0xe)) goto LAB_005dcf66;
                            }
                            else if ((cVar2 == '\x18') &&
                                    (*(short *)(unaff_ESI + 0x10) <=
                                     (short)(&DAT_00743ba4)[uVar17 * 0x80])) goto LAB_005dcf66;
                          }
                          if (((&DAT_00743be4)[iVar16] == '\a') &&
                             ((unaff_ESI[0x50] != '\x05' && (unaff_ESI[0x50] != '\x04'))))
                          goto LAB_005dcf66;
                        }
                        *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 0x40;
                        return CONCAT44(in_EDX,in_EAX);
                      }
                      if (0x13 < (((&DAT_00743bb2)[iVar16] - unaff_ESI[0x1e]) - 6U & 0x1f)) {
                        sVar5 = sVar3 - (&DAT_00743ba2)[uVar17 * 0x80];
                        if (sVar5 < 0) {
                          sVar5 = -sVar5;
                        }
                        sVar8 = in_CX - (&DAT_00743ba4)[uVar17 * 0x80];
                        if (sVar8 < 0) {
                          sVar8 = -sVar8;
                        }
                        uVar13 = (byte)unaff_ESI[0x1e] + 4 >> 3;
                        sVar12 = (sVar3 + *(short *)(&DAT_0065eb18 + uVar13 * 4)) -
                                 (&DAT_00743ba2)[uVar17 * 0x80];
                        if (sVar12 < 0) {
                          sVar12 = -sVar12;
                        }
                        sVar9 = (in_CX + *(short *)(&DAT_0065eb1a + uVar13 * 4)) -
                                (&DAT_00743ba4)[uVar17 * 0x80];
                        if (sVar9 < 0) {
                          sVar9 = -sVar9;
                        }
                        if ((ushort)(sVar12 + sVar9) < (ushort)(sVar5 + sVar8)) goto LAB_005dcf6f;
                      }
                    }
                  }
                }
              }
            }
          }
          uVar4 = (&DAT_00743b96)[uVar17 * 0x80];
        }
        uVar15 = (uVar15 & 0x3fff) + *piVar14;
        piVar14 = piVar14 + 1;
      } while (piVar14 < (int *)0x65e7dd);
      unaff_ESI[0xc4] = '\0';
LAB_005dcf66:
      return CONCAT44(in_EDX,in_EAX);
    }
    unaff_ESI[0xc4] = '\0';
    uVar15 = unaff_EBP & 0xffff;
    iVar16 = uVar15 * 0x100;
    if (&DAT_00743b94 + iVar16 != unaff_ESI) {
      uVar4 = sVar3 - (&DAT_00743ba2)[uVar15 * 0x80];
      if (!SBORROW2(sVar3,(&DAT_00743ba2)[uVar15 * 0x80])) {
        if ((short)uVar4 < 0) {
          uVar4 = -uVar4;
        }
        uVar7 = in_CX - (&DAT_00743ba4)[uVar15 * 0x80];
        if (!SBORROW2(in_CX,(&DAT_00743ba4)[uVar15 * 0x80])) {
          if ((short)uVar7 < 0) {
            uVar7 = -uVar7;
          }
          if (!CARRY2(uVar4,uVar7)) {
            uVar11 = (short)in_EDX - (&DAT_00743ba6)[uVar15 * 0x80];
            if ((short)uVar11 < 0) {
              uVar11 = -uVar11;
            }
            if (((!CARRY2(uVar4 + uVar7,uVar11)) &&
                ((ushort)(uVar4 + uVar7 + uVar11) <
                 (ushort)((uint)((ushort)(*(short *)(unaff_ESI + 0x44) +
                                         *(short *)(&DAT_00743bd8 + iVar16)) >> 1) * 0x1e >> 8))) &&
               (((unaff_ESI[0x1e] - (&DAT_00743bb2)[iVar16]) + 7U & 0x1f) < 0xf)) {
              return CONCAT44(in_EDX,in_EAX);
            }
          }
        }
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

