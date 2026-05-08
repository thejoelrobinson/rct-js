
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00451d6e(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort uVar3;
  ushort uVar4;
  ushort uVar5;
  uint uVar6;
  uint uVar7;
  byte *pbVar8;
  byte *pbVar9;
  byte *pbVar10;
  bool bVar11;
  
  pbVar8 = &DAT_00887420;
  DAT_00631d55 = 0;
LAB_00451d7a:
  if (*pbVar8 != 0xff) {
    if (pbVar8[0x15f] != 0) {
      pbVar8[0x15f] = pbVar8[0x15f] - 1;
    }
    if ((pbVar8[0x21] == 1) && (pbVar8[0x15f] == 0)) {
      if ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar8 * 8) & 0x20000) == 0) {
        uVar6 = 0;
        do {
          if ((*(short *)(pbVar8 + uVar6 * 2 + 0x2a) != -1) &&
             (((bVar11 = *(short *)(pbVar8 + uVar6 * 2 + 0x42) != -1,
               *(short *)(pbVar8 + uVar6 * 2 + 0x42) != -1 && (FUN_00451f42(), bVar11)) ||
              ((bVar11 = *(short *)(pbVar8 + uVar6 * 2 + 0x4a) != -1,
               *(short *)(pbVar8 + uVar6 * 2 + 0x4a) != -1 && (FUN_00451f42(), bVar11))))))
          goto LAB_00451f1a;
          uVar6 = uVar6 + 1;
        } while (uVar6 < 4);
      }
      else {
        uVar5 = *(ushort *)(pbVar8 + 0x2a);
        if (uVar5 != 0xffff) {
          uVar3 = (uVar5 & 0xff) * 0x20;
          uVar4 = (uVar5 >> 8) * 0x20;
          uVar6 = (uint)DAT_00631d55 << 8;
          pbVar9 = (byte *)(&DAT_00971ef4)
                           [(ushort)((ushort)((uVar5 >> 8) << 0xc | uVar3) >> 5 |
                                    (uVar4 >> 9) << 0xb)];
          do {
            uVar6 = CONCAT31((int3)(uVar6 >> 8),*pbVar9) & 0xffffff3c;
            if (((char)uVar6 == '\b') && ((byte)(uVar6 >> 8) == pbVar9[7])) {
              bVar2 = (byte)(((byte)(&DAT_006559d8)[(uint)pbVar9[4] * 0x10] & 0xf) << (*pbVar9 & 3))
              ;
              uVar6 = CONCAT11(bVar2 >> 4,bVar2) & 0xffffff0f;
              uVar6 = (uint)(byte)((byte)uVar6 | (byte)(uVar6 >> 8));
              DAT_00631d56 = '\0';
              goto LAB_00451e85;
            }
            pbVar10 = pbVar9 + 1;
            pbVar9 = pbVar9 + 8;
          } while ((*pbVar10 & 0x80) == 0);
        }
      }
    }
  }
  goto LAB_00451de9;
LAB_00451e85:
  uVar7 = 0;
  if (uVar6 != 0) {
    for (; (uVar6 >> uVar7 & 1) == 0; uVar7 = uVar7 + 1) {
    }
  }
  if (uVar6 != 0) {
    uVar6 = uVar6 & ~(1 << (uVar7 & 0x1f));
    uVar7 = uVar7 ^ 2;
    uVar5 = uVar4 - (&DAT_0065247a)[uVar7 * 2];
    uVar5 = uVar5 * 0x80 | uVar5 >> 9 | uVar3 - (&DAT_00652478)[uVar7 * 2];
    pbVar10 = (byte *)(&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)];
    do {
      if ((*pbVar10 & 0x3c) == 4) {
        if ((pbVar10[4] & 4) == 0) {
          bVar2 = pbVar10[2];
        }
        else if ((pbVar10[4] & 3) == (byte)uVar7) {
          bVar2 = pbVar10[2] + 4;
        }
        else {
          if ((pbVar10[4] & 3 ^ 2) != (byte)uVar7) goto LAB_00451eec;
          bVar2 = pbVar10[2];
        }
        if (bVar2 == pbVar9[2]) {
          DAT_00631d56 = DAT_00631d56 + '\x01';
          break;
        }
      }
LAB_00451eec:
      pbVar1 = pbVar10 + 1;
      pbVar10 = pbVar10 + 8;
    } while ((*pbVar1 & 0x80) == 0);
    goto LAB_00451e85;
  }
  if (DAT_00631d56 == '\0') {
LAB_00451f1a:
    DAT_00971e86._0_2_ = *(undefined2 *)(pbVar8 + 0x22);
    unique0x00017200 = *(undefined4 *)(pbVar8 + 0x24);
    FUN_0042c711();
    pbVar8[0x15f] = 3;
    return;
  }
LAB_00451de9:
  pbVar8 = pbVar8 + 0x260;
  DAT_00631d55 = DAT_00631d55 + 1;
  if ((byte *)0x8ad1bf < pbVar8) {
    return;
  }
  goto LAB_00451d7a;
}

