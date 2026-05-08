
void FUN_00433bae(void)

{
  ushort uVar1;
  ushort uVar2;
  ushort uVar3;
  undefined4 uVar4;
  uint uVar5;
  undefined1 uVar6;
  byte bVar7;
  ushort uVar8;
  int iVar9;
  int iVar10;
  int iVar11;
  uint uVar12;
  
  iVar9 = DAT_005f96e8;
  DAT_005f96e8 = DAT_005f96e8 + 0x30;
  DAT_005f96e4 = iVar9;
  *(undefined4 *)(iVar9 + 0x20) = 0;
  uVar12 = DAT_006288ec;
  if (DAT_006288ec != 0xffffffff) {
    do {
      iVar10 = (&DAT_006284ec)[uVar12];
      if (iVar10 != 0) {
        *(int *)(iVar9 + 0x20) = iVar10;
        do {
          iVar9 = iVar10;
          iVar10 = *(int *)(iVar9 + 0x20);
        } while (*(int *)(iVar9 + 0x20) != 0);
      }
      uVar12 = uVar12 + 1;
      iVar10 = DAT_005f96e4;
    } while (uVar12 <= DAT_006288f0);
    do {
      iVar9 = iVar10;
      iVar10 = *(int *)(iVar9 + 0x20);
      uVar12 = DAT_006288ec;
      if (iVar10 == 0) goto LAB_00433d04;
      uVar8 = (ushort)DAT_006288ec;
    } while (*(ushort *)(iVar10 + 0x14) < uVar8);
    DAT_006288f4 = iVar9;
    while (iVar9 = *(int *)(iVar9 + 0x20), iVar10 = DAT_006288f4, iVar9 != 0) {
      uVar1 = *(ushort *)(iVar9 + 0x14);
      uVar6 = 0;
      if ((ushort)(uVar8 + 1) < uVar1) {
        *(undefined1 *)(iVar9 + 0x17) = 0x80;
        iVar10 = DAT_006288f4;
        break;
      }
      if (uVar1 == (ushort)(uVar8 + 1)) {
        uVar6 = 3;
      }
      if (uVar1 == uVar8) {
        uVar6 = 3;
      }
      *(undefined1 *)(iVar9 + 0x17) = uVar6;
    }
    while ((iVar9 = iVar10, iVar10 = *(int *)(iVar9 + 0x20), uVar12 = DAT_006288ec, iVar10 != 0 &&
           (bVar7 = *(byte *)(iVar10 + 0x17) & 0x81, -1 < (char)bVar7))) {
      if (bVar7 != 0) {
        *(byte *)(iVar10 + 0x17) = *(byte *)(iVar10 + 0x17) & 0xfe;
        uVar8 = *(ushort *)(iVar10 + 4);
        uVar1 = *(ushort *)(iVar10 + 6);
        uVar4 = *(undefined4 *)(iVar10 + 8);
        uVar2 = *(ushort *)(iVar10 + 0xc);
        uVar3 = *(ushort *)(iVar10 + 0xe);
        DAT_006288f8 = iVar9;
        while ((iVar11 = iVar10, iVar9 = *(int *)(iVar11 + 0x20), iVar10 = DAT_006288f8, iVar9 != 0
               && (bVar7 = *(byte *)(iVar9 + 0x17) & 0x82, iVar10 = DAT_006288f8, -1 < (char)bVar7))
              ) {
          iVar10 = iVar9;
          if ((bVar7 != 0) &&
             ((&DAT_0062892c)
              [CONCAT22((short)((uint)DAT_00991f88 >> 0x10),
                        ((((((short)DAT_00991f88 << 1 | (ushort)(uVar8 < *(ushort *)(iVar9 + 0xc)))
                            << 1 | (ushort)(uVar1 < *(ushort *)(iVar9 + 0xe))) << 1 |
                          (ushort)((ushort)uVar4 < *(ushort *)(iVar9 + 10))) << 1 |
                         (ushort)(uVar2 < *(ushort *)(iVar9 + 4))) << 1 |
                        (ushort)(uVar3 < *(ushort *)(iVar9 + 6))) << 1 |
                        (ushort)((ushort)((uint)uVar4 >> 0x10) < *(ushort *)(iVar9 + 8)))] != '\0'))
          {
            *(undefined4 *)(iVar11 + 0x20) = *(undefined4 *)(iVar9 + 0x20);
            LOCK();
            iVar10 = *(int *)(DAT_006288f8 + 0x20);
            *(int *)(DAT_006288f8 + 0x20) = iVar9;
            UNLOCK();
            *(int *)(iVar9 + 0x20) = iVar10;
            iVar10 = iVar11;
          }
        }
      }
    }
LAB_00433d04:
    uVar5 = uVar12;
    uVar12 = uVar5 + 1;
    iVar9 = DAT_005f96e4;
    if (uVar12 < DAT_006288f0) {
      do {
        iVar10 = iVar9;
        iVar9 = *(int *)(iVar10 + 0x20);
        if (iVar9 == 0) goto LAB_00433d04;
      } while (*(ushort *)(iVar9 + 0x14) < (ushort)uVar12);
      uVar8 = (short)uVar5 + 2;
      DAT_006288f4 = iVar10;
      while (iVar10 = *(int *)(iVar10 + 0x20), iVar9 = DAT_006288f4, iVar10 != 0) {
        uVar1 = *(ushort *)(iVar10 + 0x14);
        bVar7 = 0;
        if (uVar8 < uVar1) {
          *(undefined1 *)(iVar10 + 0x17) = 0x80;
          iVar9 = DAT_006288f4;
          break;
        }
        if (uVar1 == uVar8) {
          bVar7 = 3;
        }
        if (uVar1 == (ushort)uVar12) {
          bVar7 = bVar7 | 1;
        }
        *(byte *)(iVar10 + 0x17) = bVar7;
      }
      while ((iVar10 = iVar9, iVar9 = *(int *)(iVar10 + 0x20), iVar9 != 0 &&
             (bVar7 = *(byte *)(iVar9 + 0x17) & 0x81, -1 < (char)bVar7))) {
        if (bVar7 != 0) {
          *(byte *)(iVar9 + 0x17) = *(byte *)(iVar9 + 0x17) & 0xfe;
          uVar8 = *(ushort *)(iVar9 + 4);
          uVar1 = *(ushort *)(iVar9 + 6);
          uVar4 = *(undefined4 *)(iVar9 + 8);
          uVar2 = *(ushort *)(iVar9 + 0xc);
          uVar3 = *(ushort *)(iVar9 + 0xe);
          DAT_006288f8 = iVar10;
          while ((iVar11 = iVar9, iVar10 = *(int *)(iVar11 + 0x20), iVar9 = DAT_006288f8,
                 iVar10 != 0 &&
                 (bVar7 = *(byte *)(iVar10 + 0x17) & 0x82, iVar9 = DAT_006288f8, -1 < (char)bVar7)))
          {
            iVar9 = iVar10;
            if ((bVar7 != 0) &&
               ((&DAT_0062892c)
                [CONCAT22((short)((uint)DAT_00991f88 >> 0x10),
                          ((((((short)DAT_00991f88 << 1 |
                              (ushort)(uVar8 < *(ushort *)(iVar10 + 0xc))) << 1 |
                             (ushort)(uVar1 < *(ushort *)(iVar10 + 0xe))) << 1 |
                            (ushort)((ushort)uVar4 < *(ushort *)(iVar10 + 10))) << 1 |
                           (ushort)(uVar2 < *(ushort *)(iVar10 + 4))) << 1 |
                          (ushort)(uVar3 < *(ushort *)(iVar10 + 6))) << 1 |
                          (ushort)((ushort)((uint)uVar4 >> 0x10) < *(ushort *)(iVar10 + 8)))] !=
                '\0')) {
              *(undefined4 *)(iVar11 + 0x20) = *(undefined4 *)(iVar10 + 0x20);
              LOCK();
              iVar9 = *(int *)(DAT_006288f8 + 0x20);
              *(int *)(DAT_006288f8 + 0x20) = iVar10;
              UNLOCK();
              *(int *)(iVar10 + 0x20) = iVar9;
              iVar9 = iVar11;
            }
          }
        }
      }
      goto LAB_00433d04;
    }
  }
  return;
}

